import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { knownAdapterIds } from './adapters/index.mjs'
import { getGeneratedTargetDescriptors } from './lifecycle.mjs'
import {
  loadTechnicalDocsRegistry,
  repositoryRoot,
  validateTechnicalDocsRegistry
} from './registry.mjs'

const moduleDir = path.dirname(fileURLToPath(import.meta.url))
const manifestPath = path.join(moduleDir, 'rtd5-5-retainai-content-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const registry = loadTechnicalDocsRegistry()
const failures = []
const checks = []
const requireBuild = process.argv.includes('--require-build')
const distRoot = path.join(repositoryRoot, 'docs/.vitepress/dist')
const buildOutputAvailable = fs.existsSync(distRoot)

const frozenHashes = {
  'scripts/technical-docs/adapters/retainai.mjs': 'a6bafcb00acb66c9d8e57437fb6b52abefd725f795108501e1462235b2562926',
  'scripts/technical-docs/adapters/index.mjs': '066412e84caf6bb5a5ddcae602b870c2c7c42c17786435a79505bad8b386d6c0',
  'scripts/technical-docs/adapters/process.mjs': '4c7dab6e1170562cb97d6238e5ac110cde186e59e25ab0cf7b05d203cf0632e7',
  'scripts/technical-docs/adapters/relationalstats.mjs': '9a167cafb83b5da78e22e64ee8057ffb7b28f19f813b6607d022628cbd8d4570',
  'scripts/technical-docs/runner.mjs': 'b9b0706859f8f57dca6a097b9390c95246510dcac568ca01286768718f81ff01',
  'scripts/technical-docs/lifecycle.mjs': '72f4d2f150c2430e83c980efe5e6724eb6beed71e39ed0d71c74e035b5c07af1',
  'technical_docs_source_lock.schema.json': '4f66190b14f7cad65f0f536dafc8bb7759449c36f5c6a7c2bfb877773af08430',
  'technical_docs_source_locks/README.md': 'b4fa71231f66b47de666db8b46f717af62e5ef214ab00daeed8a82bd24e89f68',
  'scripts/fetch-retainai-docs.sh': 'a4d2b14f46531ca050d1f12f57e9f334089a1afa0c0e41ebb8fe24219c67bb90'
}

function check(group, name, condition, detail = '') {
  checks.push({ group, name, condition, detail })
  if (!condition) failures.push(`${name}: ${detail || 'condition failed'}`)
}
function sourceCheck(name, condition, detail = '') { check('source', name, condition, detail) }
function buildCheck(name, condition, detail = '') { check('build', name, condition, detail) }
function read(relativePath) { return fs.readFileSync(path.join(repositoryRoot, relativePath), 'utf8') }
function sha256(filePath) { return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex') }

function walkFiles(root) {
  if (!fs.existsSync(root)) return []
  const output = []
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) visit(full)
      else if (entry.isFile()) output.push(path.relative(root, full).split(path.sep).join('/'))
    }
  }
  visit(root)
  return output.sort()
}
function walkMarkdown(root) { return walkFiles(root).filter((item) => item.endsWith('.md')) }
function routeFor(relativePath, prefix) {
  if (relativePath === 'index.md') return `${prefix}/`
  if (relativePath.endsWith('/index.md')) return `${prefix}/${relativePath.slice(0, -9)}/`
  return `${prefix}/${relativePath.replace(/\.md$/, '')}`
}
function distFileFor(relativePath, prefix) {
  const root = path.join(distRoot, ...prefix.split('/').filter(Boolean))
  if (relativePath === 'index.md') return path.join(root, 'index.html')
  if (relativePath.endsWith('/index.md')) return path.join(root, relativePath.slice(0, -9), 'index.html')
  return path.join(root, `${relativePath.replace(/\.md$/, '')}.html`)
}
function metadataUrl(canonicalRoute) {
  return `https://hubertronald.dev${canonicalRoute.endsWith('/') ? canonicalRoute : `${canonicalRoute}/`}`
}
function hasCanonical(html, url) {
  return html.includes(`rel="canonical" href="${url}"`) || html.includes(`href="${url}" rel="canonical"`)
}
function staleLegacySiteHref(markdown) {
  return /\]\(\/retainai(?:\/|\))/.test(markdown) || /href=["']\/retainai(?:\/|["'])/.test(markdown)
}

const registryErrors = validateTechnicalDocsRegistry(registry)
sourceCheck('registry schema', registryErrors.length === 0, registryErrors.join('; ') || 'valid')

const retainai = registry.sources.find((source) => source.project_id === 'retainai')
sourceCheck('RetainAI canonical prefix', retainai?.current_public_route === '/technical-docs/retainai/', `found ${retainai?.current_public_route}`)
sourceCheck('RetainAI legacy prefix', JSON.stringify(retainai?.legacy_routes) === JSON.stringify(['/retainai/']), `found ${JSON.stringify(retainai?.legacy_routes)}`)
sourceCheck('RetainAI canonical generated target', retainai?.site_source_path === 'docs/technical-docs/retainai', `found ${retainai?.site_source_path}`)
sourceCheck(
  'RetainAI canonical ownership paths',
  JSON.stringify(retainai?.ownership?.curated_targets) === JSON.stringify([
    'docs/technical-docs/retainai/index.md',
    'docs/technical-docs/retainai/releases.md'
  ]) &&
  JSON.stringify(retainai?.ownership?.generated_targets) === JSON.stringify([
    'docs/technical-docs/retainai/package.md',
    'docs/technical-docs/retainai/reference/**'
  ]),
  `found ${JSON.stringify(retainai?.ownership)}`
)
sourceCheck(
  'RetainAI source mode unchanged',
  retainai?.source_mode === 'snapshot_sync' &&
    retainai?.sync_strategy === 'git_clone_transform' &&
    retainai?.sync_adapter === 'retainai_v1' &&
    JSON.stringify(retainai?.sync_scopes) === JSON.stringify(['README.md', 'docs/**/*.md', 'artifacts/reports/**/*.md', 'figs/**']),
  'snapshot_sync lifecycle declaration changed'
)
sourceCheck('RetainAI requested ref unchanged', retainai?.source_ref === 'v0.4.0-alpha.1', `found ${retainai?.source_ref}`)
sourceCheck('RetainAI source repository unchanged', retainai?.source_repository === 'https://github.com/HubertRonald/RetainAI', `found ${retainai?.source_repository}`)
sourceCheck('RetainAI display identity unchanged', retainai?.display_name === 'RetainAI', `found ${retainai?.display_name}`)
sourceCheck('RetainAI proposed route unchanged', retainai?.proposed_public_route === '/technical-docs/retainai/', `found ${retainai?.proposed_public_route}`)
sourceCheck('RetainAI publication state unchanged', retainai?.enabled === true && retainai?.publication_status === 'published' && retainai?.integration_state === 'confirmed_current', 'publication state changed')
sourceCheck(
  'RetainAI evidence semantics unchanged',
  retainai?.documentation_type === 'project_documentation' &&
    JSON.stringify(retainai?.technical_domain) === JSON.stringify(['ML', 'MLOps', 'AI-native products', 'Multicloud']) &&
    retainai?.documentation_scope === 'Synchronized project README, technical documentation, reports, and release notes for the published snapshot.' &&
    retainai?.evidence_scope === 'Frozen portfolio evidence boundary remains tied to v0.4.0-alpha.1.' &&
    retainai?.project_atlas_relationship === 'confirmed_frozen_boundary' &&
    JSON.stringify(retainai?.builder_journey_stages) === JSON.stringify([
      { label: 'ML / NLP & MLOps', href: '/journey/#stage-06' },
      { label: 'AI-native Products & Platforms', href: '/journey/#stage-07' }
    ]),
  'evidence/Atlas/Journey semantics changed'
)
sourceCheck(
  'RetainAI provenance semantics unchanged',
  retainai?.provenance === 'Fetch and link rewriting are pinned by default to v0.4.0-alpha.1.' &&
    retainai?.update_policy === 'explicit_ref_change_only; Atlas evidence boundary must not move implicitly' &&
    retainai?.provenance_lock_policy === 'required_when_sync_is_normalized_in_rtd4',
  'provenance/update policy changed'
)

const provenanceLockPath = path.join(repositoryRoot, 'technical_docs_source_locks/retainai.json')
sourceCheck('RetainAI provenance lock baseline absent', manifest.provenance_lock_state_before === 'absent', `manifest says ${manifest.provenance_lock_state_before}`)
sourceCheck('RetainAI provenance lock remains absent', !fs.existsSync(provenanceLockPath) && manifest.provenance_lock_state_after === 'absent', 'retainai.json exists or manifest state changed')
sourceCheck('no RetainAI provenance lock created', !fs.existsSync(provenanceLockPath), 'technical_docs_source_locks/retainai.json was created')
sourceCheck('resolved provenance state unchanged', !fs.existsSync(provenanceLockPath) && retainai?.provenance === 'Fetch and link rewriting are pinned by default to v0.4.0-alpha.1.', 'checkpoint provenance representation changed')

for (const [relativePath, expectedHash] of Object.entries(frozenHashes)) {
  const full = path.join(repositoryRoot, relativePath)
  sourceCheck(`R-TD4 lifecycle/provenance frozen: ${relativePath}`, fs.existsSync(full) && sha256(full) === expectedHash, `${relativePath} differs from the R-TD5.5 baseline`)
}
sourceCheck('provenance schema unchanged', sha256(path.join(repositoryRoot, 'technical_docs_source_lock.schema.json')) === frozenHashes['technical_docs_source_lock.schema.json'], 'provenance schema changed')
sourceCheck('no new sync adapter', JSON.stringify(knownAdapterIds()) === JSON.stringify(['relationalstats_v1', 'retainai_v1']), `found ${knownAdapterIds().join(', ')}`)

const syncScript = read('scripts/sync-retainai-docs.mjs')
sourceCheck(
  'RetainAI transformer public-target guard migrated path-only',
  syncScript.includes("const publicTargetRoot = path.resolve('docs/technical-docs/retainai')") &&
    syncScript.includes('RetainAI transformer refuses to write directly to docs/technical-docs/retainai.') &&
    !syncScript.includes("const publicTargetRoot = path.resolve('docs/retainai')") &&
    syncScript.includes('sync-retainai-docs.mjs is a stage-only transformer.') &&
    sha256(path.join(repositoryRoot, 'scripts/sync-retainai-docs.mjs')) === '88d62e919b1718db06958fbebdcde8199c46f4178ff1891951b213510a2e74fb',
  'transformer differs from the authorized path-only target adjustment'
)
sourceCheck('no remote RetainAI content incorporated', manifest.source_checkpoint === '968e76aff8397d96c3ca066b6c07458a4f74b579', 'content manifest is not anchored to the supplied checkpoint')

for (const [id, expected] of Object.entries({
  versovector: { route: '/technical-docs/versovector/', sourcePath: 'docs/technical-docs/versovector', legacy: 'docs/versovector/index.md' },
  luasf: { route: '/technical-docs/luasf/', sourcePath: 'docs/technical-docs/luasf', legacy: 'docs/luasf/index.md' },
  gradientmesh: { route: '/technical-docs/gradientmesh/', sourcePath: 'docs/technical-docs/gradientmesh', legacy: 'docs/gradientmesh/index.md' },
  relationalstats: { route: '/technical-docs/relationalstats/', sourcePath: 'docs/technical-docs/relationalstats', legacy: 'docs/relationalstats/index.md' }
})) {
  const source = registry.sources.find((item) => item.project_id === id)
  sourceCheck(
    `${id} prior migration closed unchanged`,
    source?.current_public_route === expected.route &&
      source?.site_source_path === expected.sourcePath &&
      fs.existsSync(path.join(repositoryRoot, expected.sourcePath, 'index.md')) &&
      fs.existsSync(path.join(repositoryRoot, expected.legacy)),
    `${id} route/source boundary changed`
  )
}

const fdeCandidate = registry.candidates.find((candidate) => candidate.project_id === 'fde-roadmap')
sourceCheck(
  'fde-roadmap hard stop',
  fdeCandidate?.integration_state === 'candidate_future' &&
    fdeCandidate?.publication_status === 'candidate' &&
    fdeCandidate?.enabled === false &&
    fdeCandidate?.site_source_path === null &&
    fdeCandidate?.current_public_route === null &&
    !fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/fde-roadmap')),
  'candidate state or route boundary changed'
)

const canonicalRoot = path.join(repositoryRoot, manifest.canonical_root_after)
const legacyRoot = path.join(repositoryRoot, manifest.legacy_root_after)
const expectedDocuments = manifest.documents.map((document) => document.relative_path).sort()
const expectedAllFiles = manifest.all_files.map((item) => item.relative_path).sort()
const canonicalDocuments = walkMarkdown(canonicalRoot)
const canonicalFiles = walkFiles(canonicalRoot)
const legacyDocuments = walkMarkdown(legacyRoot)
const legacyFiles = walkFiles(legacyRoot)
sourceCheck('before manifest document count', manifest.document_count === 28 && manifest.documents.length === 28, `manifest has ${manifest.documents.length} documents`)
sourceCheck('before manifest total file count', manifest.total_file_count === 39 && manifest.all_files.length === 39, `manifest has ${manifest.all_files.length} files`)
sourceCheck('canonical document inventory', JSON.stringify(canonicalDocuments) === JSON.stringify(expectedDocuments), `expected ${expectedDocuments.length}, found ${canonicalDocuments.length}`)
sourceCheck('canonical complete file inventory', JSON.stringify(canonicalFiles) === JSON.stringify(expectedAllFiles), `expected ${expectedAllFiles.length}, found ${canonicalFiles.length}`)
sourceCheck('legacy compatibility stub inventory', JSON.stringify(legacyDocuments) === JSON.stringify(expectedDocuments) && JSON.stringify(legacyFiles) === JSON.stringify(expectedDocuments), `legacy files=${legacyFiles.length}, markdown=${legacyDocuments.length}`)
sourceCheck('nested route inventory', manifest.documents.some((document) => document.nested_depth >= 4) && Math.max(...manifest.documents.map((document) => document.nested_depth)) >= 4, 'nested/deep route inventory was flattened or not recorded')

for (const item of manifest.all_files) {
  const canonicalFile = path.join(canonicalRoot, item.relative_path)
  sourceCheck(`content hash preserved: ${item.relative_path}`, fs.existsSync(canonicalFile) && sha256(canonicalFile) === item.sha256, `expected ${item.sha256}`)
}
for (const document of manifest.documents) {
  const canonicalFile = path.join(canonicalRoot, document.relative_path)
  const legacyFile = path.join(legacyRoot, document.relative_path)
  const expectedCanonicalRoute = routeFor(document.relative_path, '/technical-docs/retainai')
  const expectedLegacyRoute = routeFor(document.relative_path, '/retainai')
  const canonicalMarkdown = read(path.relative(repositoryRoot, canonicalFile))
  const legacyMarkdown = read(path.relative(repositoryRoot, legacyFile))
  sourceCheck(`route manifest canonical: ${document.relative_path}`, document.canonical_route === expectedCanonicalRoute && document.old_route === expectedLegacyRoute, 'route matrix seed changed')
  sourceCheck(`canonical source links: ${expectedCanonicalRoute}`, !staleLegacySiteHref(canonicalMarkdown), `legacy absolute /retainai href remains in ${document.relative_path}`)
  sourceCheck(
    `legacy stub source: ${expectedLegacyRoute}`,
    legacyMarkdown.includes('layout: false') &&
      legacyMarkdown.includes('search: false') &&
      legacyMarkdown.includes('name: robots') &&
      legacyMarkdown.includes('content: "noindex,follow"') &&
      legacyMarkdown.includes(`content: "0; url=${expectedCanonicalRoute}"`) &&
      legacyMarkdown.includes(`href="${expectedCanonicalRoute}"`),
    `${document.relative_path} is not a canonical redirect/noindex compatibility stub`
  )
}

const config = read('docs/.vitepress/config.mts')
const canonicalSidebarLinks = [
  '/technical-docs/retainai/',
  '/technical-docs/retainai/package',
  '/technical-docs/retainai/reference/docs/',
  '/technical-docs/retainai/reference/reports/',
  '/technical-docs/retainai/releases'
]
sourceCheck('sidebar canonical prefix', config.includes("'/technical-docs/retainai/': [") && !config.includes("        '/retainai/': ["), 'RetainAI sidebar is not keyed by the canonical prefix')
sourceCheck('sidebar canonical targets', canonicalSidebarLinks.every((link) => config.includes(`link: '${link}'`)), 'one or more RetainAI sidebar links are not canonical')
sourceCheck('legacy canonical metadata mapping', config.includes("normalized.startsWith('/retainai/')") && config.includes("'/technical-docs/retainai/'"), 'legacy RetainAI canonical mapping is missing')
sourceCheck('Docs active-state matching', config.includes("activeMatch: '^/(technical-docs|retainai|versovector|relationalstats|gradientmesh|luasf)(/|$)'"), 'Docs active match no longer covers canonical + legacy technical docs')

const hub = read('docs/.vitepress/theme/components/TechnicalDocsPage.vue')
sourceCheck('hub canonical target remains registry-driven', hub.includes('current_public_route') && !hub.includes("'/retainai/'"), 'Technical Docs hub hardcodes the legacy RetainAI route')
const css = read('docs/.vitepress/theme/styles/sections/retainai.css')
sourceCheck('RetainAI route-specific CSS migrated', css.includes('href="/technical-docs/retainai') && !css.includes('href="/retainai') && !css.includes('href^="/retainai') && !css.includes('href*="/retainai'), 'sidebar icon selectors still target the legacy prefix')
const portfolio = read('docs/.vitepress/theme/content/portfolio.content.ts')
sourceCheck('portfolio documentation target canonical', portfolio.includes('"documentation": "/technical-docs/retainai/"') && !portfolio.includes('"documentation": "/retainai/"'), 'portfolio RetainAI documentation link is not canonical')
const caseStudies = read('docs/.vitepress/theme/components/CaseStudiesPage.vue')
sourceCheck('case-study documentation target canonical', caseStudies.includes('href="/technical-docs/retainai/"') && !caseStudies.includes('href="/retainai/"'), 'case-study RetainAI link is not canonical')
const quality = read('scripts/audit/landing-quality-check.py')
sourceCheck('landing quality route canonical', quality.includes('"/technical-docs/retainai/": DIST / "technical-docs" / "retainai" / "index.html"') && !quality.includes('"/retainai/": DIST / "retainai" / "index.html"'), 'landing quality gate still targets the legacy RetainAI route')

const descriptors = getGeneratedTargetDescriptors(retainai)
sourceCheck(
  'lifecycle owns canonical generated tree',
  descriptors.length === 2 && descriptors.every((descriptor) => descriptor.base.startsWith('docs/technical-docs/retainai/')),
  `generated targets: ${descriptors.map((descriptor) => descriptor.declared).join(', ')}`
)
sourceCheck('legacy tree excluded from generated ownership', descriptors.every((descriptor) => !descriptor.base.startsWith('docs/retainai/')), 'legacy tree remains lifecycle-owned')
const packageJson = JSON.parse(read('package.json'))
sourceCheck('R-TD5.5 npm validation entry', packageJson.scripts?.['technical-docs:validate-rtd5-5'] === 'node scripts/technical-docs/validate-rtd5-5.mjs', 'technical-docs:validate-rtd5-5 command is missing')

console.log('SOURCE CHECKS')
for (const item of checks.filter((item) => item.group === 'source')) {
  console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.condition || !item.detail ? '' : ` — ${item.detail}`}`)
}

if (!buildOutputAvailable) {
  console.log('\nBUILD-OUTPUT CHECKS')
  console.log('NOT RUN: canonical/legacy route resolution, canonical metadata, redirect output, legacy noindex, and built internal-link checks — docs/.vitepress/dist is absent')
  if (requireBuild) failures.push('build-output checks were required but docs/.vitepress/dist is absent')
} else {
  for (const document of manifest.documents) {
    const canonicalRoute = routeFor(document.relative_path, '/technical-docs/retainai')
    const legacyRoute = routeFor(document.relative_path, '/retainai')
    const canonicalDist = distFileFor(document.relative_path, '/technical-docs/retainai')
    const legacyDist = distFileFor(document.relative_path, '/retainai')
    const canonicalExists = fs.existsSync(canonicalDist)
    const legacyExists = fs.existsSync(legacyDist)
    buildCheck(`canonical resolution: ${canonicalRoute}`, canonicalExists, canonicalDist)
    buildCheck(`legacy resolution: ${legacyRoute}`, legacyExists, legacyDist)
    if (canonicalExists) {
      const html = fs.readFileSync(canonicalDist, 'utf8')
      const url = metadataUrl(canonicalRoute)
      buildCheck(`canonical metadata: ${canonicalRoute}`, hasCanonical(html, url), url)
      buildCheck(`canonical internal links: ${canonicalRoute}`, !/href=["']\/retainai(?:\/|["'])/.test(html), 'built canonical HTML links back to legacy RetainAI routes')
    }
    if (legacyExists) {
      const html = fs.readFileSync(legacyDist, 'utf8')
      const url = metadataUrl(canonicalRoute)
      buildCheck(`legacy redirect output: ${legacyRoute}`, html.includes(`url=${canonicalRoute}`) && html.includes(`href="${canonicalRoute}"`), canonicalRoute)
      buildCheck(`legacy canonical metadata: ${legacyRoute}`, hasCanonical(html, url), url)
      buildCheck(`legacy noindex: ${legacyRoute}`, html.includes('name="robots"') && html.includes('content="noindex,follow"'), 'robots noindex,follow missing')
    }
  }
  console.log('\nBUILD-OUTPUT CHECKS')
  for (const item of checks.filter((item) => item.group === 'build')) {
    console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.condition || !item.detail ? '' : ` — ${item.detail}`}`)
  }
}

if (failures.length) {
  console.error(`\nTechnical Docs R-TD5.5 validation: FAIL (${failures.length} failures)`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

const sourceCount = checks.filter((item) => item.group === 'source').length
const buildCount = checks.filter((item) => item.group === 'build').length
console.log(`\nTechnical Docs R-TD5.5 validation: PASS (${sourceCount} source checks; ${manifest.document_count} canonical documents + ${manifest.document_count} legacy compatibility stubs; build-output checks ${buildOutputAvailable ? `PASS (${buildCount})` : 'NOT RUN'})`)
