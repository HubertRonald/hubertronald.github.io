import crypto from 'node:crypto'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {
  loadTechnicalDocsRegistry,
  repositoryRoot,
  validateTechnicalDocsRegistry
} from './registry.mjs'
import { knownAdapterIds } from './adapters/index.mjs'
import {
  compareStagedToLive,
  createProvenanceRecord,
  getGeneratedTargetDescriptors,
  lockPathForSource,
  publishGeneratedTargets,
  validateStagedOutput
} from './lifecycle.mjs'

const failures = []
const checks = []

function check(name, condition, detail = '') {
  checks.push({ name, condition, detail })
  if (!condition) failures.push(`${name}: ${detail || 'condition failed'}`)
}

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), 'utf8')
}

function sha(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

async function hashTree(root) {
  if (!fs.existsSync(root)) return '<missing>'
  const rows = []

  async function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name))
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) await walk(fullPath)
      else if (entry.isFile()) {
        rows.push(`${path.relative(root, fullPath)}\t${sha(await readFile(fullPath))}`)
      }
    }
  }

  await walk(root)
  return sha(rows.join('\n'))
}

async function runLifecycleSelfTest() {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'rtd4-lifecycle-'))
  const workspaceRoot = path.join(tempRoot, '.vendor/technical-docs/demo')
  const liveSiteRoot = path.join(tempRoot, 'docs/demo')
  const stagingSiteRoot = path.join(workspaceRoot, 'staging/docs/demo')

  const source = {
    project_id: 'demo',
    source_repository: 'https://example.invalid/demo',
    source_mode: 'moving_ref_sync',
    source_ref: 'main',
    sync_strategy: 'git_clone_transform',
    sync_scopes: ['README.md'],
    site_source_path: 'docs/demo',
    ownership: {
      curated_targets: ['docs/demo/index.md'],
      generated_targets: ['docs/demo/package.md', 'docs/demo/reference/**']
    }
  }

  try {
    await mkdir(path.join(liveSiteRoot, 'reference'), { recursive: true })
    await writeFile(path.join(liveSiteRoot, 'index.md'), '# Curated\n', 'utf8')
    await writeFile(path.join(liveSiteRoot, 'package.md'), 'old package\n', 'utf8')
    await writeFile(path.join(liveSiteRoot, 'reference/old.md'), 'old reference\n', 'utf8')

    await mkdir(path.join(stagingSiteRoot, 'reference'), { recursive: true })
    await writeFile(path.join(stagingSiteRoot, 'package.md'), 'new package\n', 'utf8')
    await writeFile(path.join(stagingSiteRoot, 'reference/new.md'), 'new reference\n', 'utf8')

    const beforeDryRun = await hashTree(path.join(tempRoot, 'docs'))
    const staged = await validateStagedOutput(source, stagingSiteRoot, tempRoot)
    const comparison = await compareStagedToLive(source, stagingSiteRoot, tempRoot)
    const afterDryRun = await hashTree(path.join(tempRoot, 'docs'))

    check('self-test staged ownership', staged.stagedFiles.length === 2, 'expected exactly two staged generated files')
    check('self-test drift detection', comparison.changed === true, 'staged/live drift was not detected')
    check('self-test dry-run immutability', beforeDryRun === afterDryRun, 'staging/validation mutated public docs')

    const provenance = createProvenanceRecord(source, 'demo_v1', 'a'.repeat(40))
    await publishGeneratedTargets({
      source,
      stagingSiteRoot,
      provenance,
      root: tempRoot,
      workspaceRoot
    })

    check(
      'self-test curated boundary preserved',
      (await readFile(path.join(liveSiteRoot, 'index.md'), 'utf8')) === '# Curated\n',
      'curated index changed during generated replacement'
    )
    check(
      'self-test generated replacement',
      (await readFile(path.join(liveSiteRoot, 'package.md'), 'utf8')) === 'new package\n' &&
      fs.existsSync(path.join(liveSiteRoot, 'reference/new.md')) &&
      !fs.existsSync(path.join(liveSiteRoot, 'reference/old.md')),
      'generated targets were not replaced as a bounded transaction'
    )
    check(
      'self-test provenance lock',
      fs.existsSync(lockPathForSource('demo', tempRoot)),
      'successful publish did not create deterministic provenance lock'
    )

    const beforeFailedValidation = await hashTree(path.join(tempRoot, 'docs'))
    await rm(path.join(workspaceRoot, 'staging'), { recursive: true, force: true })
    await mkdir(stagingSiteRoot, { recursive: true })
    await writeFile(path.join(stagingSiteRoot, 'package.md'), 'incomplete\n', 'utf8')

    let failedAsExpected = false
    try {
      await validateStagedOutput(source, stagingSiteRoot, tempRoot)
    } catch {
      failedAsExpected = true
    }
    const afterFailedValidation = await hashTree(path.join(tempRoot, 'docs'))

    check('self-test failed stage rejected', failedAsExpected, 'incomplete staging was accepted')
    check(
      'self-test failed lifecycle immutability',
      beforeFailedValidation === afterFailedValidation,
      'failed validation changed public docs'
    )

    let escapeRejected = false
    try {
      getGeneratedTargetDescriptors({
        ...source,
        ownership: {
          curated_targets: ['docs/demo/index.md'],
          generated_targets: ['docs/escape/**']
        }
      }, tempRoot)
    } catch {
      escapeRejected = true
    }
    check('self-test unsafe target rejected', escapeRejected, 'generated target outside site_source_path was accepted')
  } finally {
    await rm(tempRoot, { recursive: true, force: true })
  }
}


function runCommand(command, args, { cwd }) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe']
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => { stdout += chunk })
    child.stderr.on('data', (chunk) => { stderr += chunk })
    child.on('error', reject)
    child.on('exit', (code) => {
      resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() })
    })
  })
}

async function createSyntheticSyncRepository(repoRoot) {
  const files = {
    'README.md': '# Synthetic package\n',
    'docs/README.md': '# Synthetic docs\n',
    'docs/qap/formulas.md': '# QAP formulas\n',
    'docs/ergm/formulas.md': '# ERGM formulas\n',
    'docs/stergm/formulas.md': '# STERGM formulas\n',
    'docs/linkprediction/metrics.md': '# Metrics\n',
    'examples/linkprediction/experimental-ml-workflow.md': '# Workflow\n'
  }

  for (const [relativePath, content] of Object.entries(files)) {
    const target = path.join(repoRoot, relativePath)
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, content, 'utf8')
  }

  for (const [command, args] of [
    ['git', ['init']],
    ['git', ['checkout', '-b', 'main']],
    ['git', ['config', 'user.email', 'rtd4-synthetic@example.invalid']],
    ['git', ['config', 'user.name', 'R-TD4 Synthetic Test']],
    ['git', ['add', '.']],
    ['git', ['commit', '-m', 'synthetic source']]
  ]) {
    const result = await runCommand(command, args, { cwd: repoRoot })
    if (result.code !== 0) {
      throw new Error(`synthetic repository setup failed: ${command} ${args.join(' ')}\n${result.stderr}`)
    }
  }
}

async function runPrepublicationEligibilitySelfTest() {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'rtd4-prepublication-'))
  const projectRoot = path.join(tempRoot, 'project')
  const repoRoot = path.join(tempRoot, 'synthetic-repo')
  const sourceId = 'synthetic-disabled-sync'
  const minimalCandidateId = 'synthetic-minimal-candidate'

  try {
    await mkdir(path.join(projectRoot, 'scripts'), { recursive: true })
    await cp(
      path.join(repositoryRoot, 'scripts/technical-docs'),
      path.join(projectRoot, 'scripts/technical-docs'),
      { recursive: true }
    )
    await cp(
      path.join(repositoryRoot, 'scripts/sync-relationalstats-docs.mjs'),
      path.join(projectRoot, 'scripts/sync-relationalstats-docs.mjs')
    )
    await mkdir(path.join(projectRoot, 'docs'), { recursive: true })
    await mkdir(path.join(projectRoot, 'technical_docs_source_locks'), { recursive: true })
    await writeFile(
      path.join(projectRoot, 'technical_docs_source_locks/README.md'),
      'synthetic tracked lock sentinel\n',
      'utf8'
    )

    await mkdir(repoRoot, { recursive: true })
    await createSyntheticSyncRepository(repoRoot)

    const baseRegistry = loadTechnicalDocsRegistry()
    const syntheticSource = {
      project_id: sourceId,
      display_name: 'Synthetic Disabled Sync',
      integration_state: 'candidate_future_authorized',
      source_repository: repoRoot,
      source_ref: 'main',
      source_mode: 'moving_ref_sync',
      site_source_path: `docs/${sourceId}`,
      current_public_route: `/${sourceId}/`,
      proposed_public_route: `/technical-docs/${sourceId}/`,
      legacy_routes: [],
      sync_strategy: 'git_clone_transform',
      sync_adapter: 'relationalstats_v1',
      sync_scopes: ['README.md', 'docs/**/*.md', 'examples/**/*.md'],
      publication_status: 'candidate',
      documentation_type: 'project_documentation',
      technical_domain: ['Synthetic validation'],
      documentation_scope: 'Synthetic R-TD4 prepublication lifecycle validation source.',
      evidence_scope: 'Synthetic only; carries no portfolio evidence meaning.',
      provenance: 'Synthetic local Git repository used only by R-TD4 validation.',
      project_atlas_relationship: 'synthetic_test_only',
      builder_journey_stages: [],
      update_policy: 'synthetic_test_only',
      ownership: {
        curated_targets: [`docs/${sourceId}/index.md`],
        generated_targets: [`docs/${sourceId}/package.md`, `docs/${sourceId}/reference/**`]
      },
      provenance_lock_policy: 'required_on_publication',
      enabled: false
    }
    const syntheticRegistry = {
      ...baseRegistry,
      sources: [...baseRegistry.sources, syntheticSource],
      candidates: [
        ...baseRegistry.candidates,
        {
          project_id: minimalCandidateId,
          display_name: 'Synthetic Minimal Candidate',
          integration_state: 'candidate_future',
          publication_status: 'candidate',
          enabled: false
        }
      ]
    }
    await writeFile(
      path.join(projectRoot, 'technical_docs_source_registry.json'),
      `${JSON.stringify(syntheticRegistry, null, 2)}\n`,
      'utf8'
    )

    const runner = path.join(projectRoot, 'scripts/technical-docs/runner.mjs')
    const docsRoot = path.join(projectRoot, 'docs')
    const locksRoot = path.join(projectRoot, 'technical_docs_source_locks')
    const docsBefore = await hashTree(docsRoot)
    const locksBefore = await hashTree(locksRoot)

    const validateResult = await runCommand(process.execPath, [runner, 'validate', sourceId], { cwd: projectRoot })
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_VALIDATE',
      validateResult.code === 0,
      validateResult.stderr || validateResult.stdout
    )

    const fetchResult = await runCommand(process.execPath, [runner, 'fetch', sourceId], { cwd: projectRoot })
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_FETCH',
      fetchResult.code === 0 && fs.existsSync(path.join(projectRoot, `.vendor/technical-docs/${sourceId}/fetch-provenance.json`)),
      fetchResult.stderr || fetchResult.stdout
    )

    const dryRunResult = await runCommand(process.execPath, [runner, 'sync', sourceId, '--dry-run'], { cwd: projectRoot })
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_DRY_RUN',
      dryRunResult.code === 0,
      dryRunResult.stderr || dryRunResult.stdout
    )

    const updateDryRunResult = await runCommand(process.execPath, [runner, 'update', sourceId, '--dry-run'], { cwd: projectRoot })
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_UPDATE_DRY_RUN',
      updateDryRunResult.code === 0,
      updateDryRunResult.stderr || updateDryRunResult.stdout
    )

    const publicSyncResult = await runCommand(process.execPath, [runner, 'sync', sourceId], { cwd: projectRoot })
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_PUBLIC_SYNC',
      publicSyncResult.code !== 0 && publicSyncResult.stderr.includes('public synchronization requires enabled=true and publication_status=published'),
      publicSyncResult.stderr || publicSyncResult.stdout
    )

    const acceptChangeResult = await runCommand(
      process.execPath,
      [runner, 'sync', sourceId, '--accept-content-change'],
      { cwd: projectRoot }
    )
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_ACCEPT_CONTENT_CHANGE',
      acceptChangeResult.code !== 0 && acceptChangeResult.stderr.includes('public synchronization requires enabled=true and publication_status=published'),
      acceptChangeResult.stderr || acceptChangeResult.stdout
    )

    const updatePublicResult = await runCommand(process.execPath, [runner, 'update', sourceId], { cwd: projectRoot })
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_PUBLIC_UPDATE',
      updatePublicResult.code !== 0 && updatePublicResult.stderr.includes('public synchronization requires enabled=true and publication_status=published'),
      updatePublicResult.stderr || updatePublicResult.stdout
    )

    const candidateResult = await runCommand(process.execPath, [runner, 'validate', minimalCandidateId], { cwd: projectRoot })
    check(
      'MINIMAL_REGISTRY_CANDIDATE_LIFECYCLE',
      candidateResult.code !== 0 && candidateResult.stderr.includes('candidate source is disabled and cannot enter the R-TD4 lifecycle'),
      candidateResult.stderr || candidateResult.stdout
    )

    const docsAfter = await hashTree(docsRoot)
    const locksAfter = await hashTree(locksRoot)
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_DOCS_MUTATION',
      docsBefore === docsAfter,
      'disabled prepublication lifecycle mutated docs/'
    )
    check(
      'DISABLED_COMPLETE_SYNC_SOURCE_TRACKED_LOCK_MUTATION',
      locksBefore === locksAfter,
      'disabled prepublication lifecycle mutated tracked provenance locks'
    )
  } finally {
    await rm(tempRoot, { recursive: true, force: true })
  }
}

const registry = loadTechnicalDocsRegistry()
const registryErrors = validateTechnicalDocsRegistry(registry)
check('registry contract', registryErrors.length === 0, registryErrors.join('; '))

const publishedIds = registry.sources
  .filter((source) => source.enabled && source.publication_status === 'published')
  .map((source) => source.project_id)
  .sort()
check(
  'published source set',
  JSON.stringify(publishedIds) === JSON.stringify(['gradientmesh', 'luasf', 'relationalstats', 'retainai', 'versovector']),
  `unexpected published source set: ${publishedIds.join(', ')}`
)

const fde = registry.candidates.find((candidate) => candidate.project_id === 'fde-roadmap')
check(
  'fde-roadmap hard stop',
  Boolean(fde) && fde.enabled === false && fde.integration_state === 'candidate_future' && fde.publication_status === 'candidate' && fde.site_source_path === null && fde.current_public_route === null,
  'fde-roadmap candidate state changed'
)
check(
  'FDE_ROADMAP_LIFECYCLE',
  Boolean(fde) && !registry.sources.some((source) => source.project_id === 'fde-roadmap') &&
    read('scripts/technical-docs/runner.mjs').includes('candidate source is disabled and cannot enter the R-TD4 lifecycle'),
  'fde-roadmap is not isolated to the blocked candidate contract'
)

const retainai = registry.sources.find((source) => source.project_id === 'retainai')
check(
  'RetainAI frozen boundary',
  retainai?.source_mode === 'snapshot_sync' && retainai?.source_ref === 'v0.4.0-alpha.1' && retainai?.sync_adapter === 'retainai_v1',
  'RetainAI snapshot contract changed'
)

const relationalstats = registry.sources.find((source) => source.project_id === 'relationalstats')
check(
  'relationalstats moving-ref contract',
  relationalstats?.source_mode === 'moving_ref_sync' && relationalstats?.source_ref === 'main' && relationalstats?.sync_adapter === 'relationalstats_v1',
  'relationalstats moving-ref contract changed'
)

for (const source of registry.sources) {
  const syncMode = source.source_mode === 'snapshot_sync' || source.source_mode === 'moving_ref_sync'
  const generated = source.ownership?.generated_targets ?? []
  check(
    `${source.project_id} ownership mode`,
    syncMode ? generated.length > 0 : generated.length === 0,
    syncMode ? 'sync source must declare generated targets' : 'non-sync source must retain curated ownership'
  )

  if (syncMode) {
    let safe = true
    try { getGeneratedTargetDescriptors(source) } catch { safe = false }
    check(`${source.project_id} generated target boundary`, safe, 'generated target escapes site_source_path or overlaps curated ownership')
  }
}

const adapterIds = knownAdapterIds()
check(
  'adapter registry',
  JSON.stringify(adapterIds) === JSON.stringify(['relationalstats_v1', 'retainai_v1']),
  `unexpected adapter set: ${adapterIds.join(', ')}`
)

const packageJson = JSON.parse(read('package.json'))
for (const id of ['retainai', 'relationalstats']) {
  for (const verb of ['fetch', 'sync', 'update']) {
    check(
      `${id}:${verb} compatibility wrapper`,
      packageJson.scripts?.[`${id}:${verb}`]?.includes(`runner.mjs ${verb} ${id}`),
      `npm command ${id}:${verb} is not routed through the generic lifecycle runner`
    )
  }
}
check(
  'generic lifecycle npm entry',
  packageJson.scripts?.['technical-docs:lifecycle'] === 'node scripts/technical-docs/runner.mjs',
  'technical-docs:lifecycle command is missing'
)

for (const transformer of ['scripts/sync-retainai-docs.mjs', 'scripts/sync-relationalstats-docs.mjs']) {
  const body = read(transformer)
  check(
    `${transformer} stage-only guard`,
    body.includes('TECHNICAL_DOCS_TARGET_ROOT') && body.includes('refuses to write directly'),
    'transformer can still default to direct public docs writes'
  )
}

check(
  'provenance lock schema',
  fs.existsSync(path.join(repositoryRoot, 'technical_docs_source_lock.schema.json')),
  'technical_docs_source_lock.schema.json is missing'
)
check(
  '.vendor ignore policy',
  read('.gitignore').split(/\r?\n/).some((line) => line.trim() === '.vendor/' || line.trim() === '.vendor'),
  '.vendor/ is not ignored'
)

const currentRoutes = Object.fromEntries(registry.sources.map((source) => [source.project_id, source.current_public_route]))
check('route state: VersoVector (authorized R-TD5.1)', currentRoutes.versovector === '/technical-docs/versovector/', 'unexpected route state')
check('route freeze: RetainAI', currentRoutes.retainai === '/retainai/', 'route changed')
check('route freeze: relationalstats', currentRoutes.relationalstats === '/relationalstats/', 'route changed')
check('route state: LuaSF (authorized R-TD5.2)', currentRoutes.luasf === '/technical-docs/luasf/', 'unexpected route state')
check('route freeze: GradientMesh', currentRoutes.gradientmesh === '/gradientmesh/', 'route changed')

await runLifecycleSelfTest()
await runPrepublicationEligibilitySelfTest()

for (const item of checks) {
  console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.detail && !item.condition ? ` — ${item.detail}` : ''}`)
}

if (failures.length) {
  console.error(`\nTechnical Docs R-TD4 validation: FAIL (${failures.length} failures)`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`\nTechnical Docs R-TD4 validation: PASS (${checks.length} checks)`)
