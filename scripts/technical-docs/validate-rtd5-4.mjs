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
const manifestPath = path.join(moduleDir, 'rtd5-4-relationalstats-content-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const registry = loadTechnicalDocsRegistry()
const failures = []
const checks = []
const requireBuild = process.argv.includes('--require-build')
const distRoot = path.join(repositoryRoot, 'docs/.vitepress/dist')
const buildOutputAvailable = fs.existsSync(distRoot)

const frozenHashes = {
  'scripts/technical-docs/adapters/relationalstats.mjs': '9a167cafb83b5da78e22e64ee8057ffb7b28f19f813b6607d022628cbd8d4570',
  'scripts/technical-docs/adapters/index.mjs': '066412e84caf6bb5a5ddcae602b870c2c7c42c17786435a79505bad8b386d6c0',
  'scripts/technical-docs/adapters/process.mjs': '4c7dab6e1170562cb97d6238e5ac110cde186e59e25ab0cf7b05d203cf0632e7',
  'scripts/technical-docs/runner.mjs': 'b9b0706859f8f57dca6a097b9390c95246510dcac568ca01286768718f81ff01',
  'scripts/technical-docs/lifecycle.mjs': '72f4d2f150c2430e83c980efe5e6724eb6beed71e39ed0d71c74e035b5c07af1',
  'technical_docs_source_lock.schema.json': '4f66190b14f7cad65f0f536dafc8bb7759449c36f5c6a7c2bfb877773af08430',
  'technical_docs_source_locks/README.md': 'b4fa71231f66b47de666db8b46f717af62e5ef214ab00daeed8a82bd24e89f68'
}

function check(group, name, condition, detail = '') {
  checks.push({ group, name, condition, detail })
  if (!condition) failures.push(`${name}: ${detail || 'condition failed'}`)
}

function sourceCheck(name, condition, detail = '') {
  check('source', name, condition, detail)
}

function buildCheck(name, condition, detail = '') {
  check('build', name, condition, detail)
}

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), 'utf8')
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
}

function walkMarkdown(root) {
  if (!fs.existsSync(root)) return []
  const output = []
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) visit(full)
      else if (entry.isFile() && entry.name.endsWith('.md')) output.push(path.relative(root, full).split(path.sep).join('/'))
    }
  }
  visit(root)
  return output.sort()
}

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
  return /\]\(\/relationalstats(?:\/|\))/.test(markdown) || /href=["']\/relationalstats(?:\/|["'])/.test(markdown)
}

const registryErrors = validateTechnicalDocsRegistry(registry)
sourceCheck('registry schema', registryErrors.length === 0, registryErrors.join('; ') || 'valid')

const relationalstats = registry.sources.find((source) => source.project_id === 'relationalstats')
sourceCheck('relationalstats canonical prefix', relationalstats?.current_public_route === '/technical-docs/relationalstats/', `found ${relationalstats?.current_public_route}`)
sourceCheck('relationalstats legacy prefix', JSON.stringify(relationalstats?.legacy_routes) === JSON.stringify(['/relationalstats/']), `found ${JSON.stringify(relationalstats?.legacy_routes)}`)
sourceCheck('relationalstats canonical generated target', relationalstats?.site_source_path === 'docs/technical-docs/relationalstats', `found ${relationalstats?.site_source_path}`)
sourceCheck(
  'relationalstats canonical ownership paths',
  JSON.stringify(relationalstats?.ownership?.curated_targets) === JSON.stringify([
    'docs/technical-docs/relationalstats/index.md',
    'docs/technical-docs/relationalstats/releases.md'
  ]) &&
  JSON.stringify(relationalstats?.ownership?.generated_targets) === JSON.stringify([
    'docs/technical-docs/relationalstats/package.md',
    'docs/technical-docs/relationalstats/reference/**'
  ]),
  `found ${JSON.stringify(relationalstats?.ownership)}`
)
sourceCheck(
  'relationalstats source mode unchanged',
  relationalstats?.source_mode === 'moving_ref_sync' &&
    relationalstats?.sync_strategy === 'git_clone_transform' &&
    relationalstats?.sync_adapter === 'relationalstats_v1' &&
    JSON.stringify(relationalstats?.sync_scopes) === JSON.stringify(['README.md', 'docs/**/*.md', 'examples/**/*.md', 'notebooks/**/*.md']),
  'moving_ref_sync lifecycle declaration changed'
)
sourceCheck('relationalstats requested ref unchanged', relationalstats?.source_ref === 'main', `found ${relationalstats?.source_ref}`)
sourceCheck('relationalstats source repository unchanged', relationalstats?.source_repository === 'https://github.com/HubertRonald/relationalstats', `found ${relationalstats?.source_repository}`)
sourceCheck('relationalstats display identity unchanged', relationalstats?.display_name === 'relationalstats', `found ${relationalstats?.display_name}`)
sourceCheck('relationalstats proposed route unchanged', relationalstats?.proposed_public_route === '/technical-docs/relationalstats/', `found ${relationalstats?.proposed_public_route}`)
sourceCheck('relationalstats publication state unchanged', relationalstats?.enabled === true && relationalstats?.publication_status === 'published' && relationalstats?.integration_state === 'confirmed_current', 'publication state changed')
sourceCheck(
  'relationalstats evidence semantics unchanged',
  relationalstats?.documentation_type === 'library_reference' &&
    JSON.stringify(relationalstats?.technical_domain) === JSON.stringify(['Python', 'Network statistics', 'Applied mathematics', 'Data science']) &&
    relationalstats?.documentation_scope === 'Package overview plus synchronized link prediction, QAP, ERGM/STERGM approximation, methodology, examples, notebooks, and releases.' &&
    relationalstats?.evidence_scope === 'Atlas context describes 2026 Python network-statistical software with explicit approximation boundaries.' &&
    relationalstats?.project_atlas_relationship === 'confirmed_existing_context' &&
    JSON.stringify(relationalstats?.builder_journey_stages) === JSON.stringify([{ label: 'Applied Mathematics, Simulation & Data Science', href: '/journey/#stage-02' }]),
  'evidence/Atlas/Journey semantics changed'
)
sourceCheck(
  'relationalstats provenance semantics unchanged',
  relationalstats?.provenance === 'Current fetch follows the moving main branch; generated output is not reproducible from a stable ref alone until an immutable resolved commit is recorded.' &&
    relationalstats?.update_policy === 'resolve and record immutable commit for every future normalized update; retain explicit release/evidence boundaries' &&
    relationalstats?.provenance_lock_policy === 'required_when_sync_is_normalized_in_rtd4',
  'provenance/update policy changed'
)

const provenanceLockPath = path.join(repositoryRoot, 'technical_docs_source_locks/relationalstats.json')
sourceCheck('relationalstats provenance lock unchanged', !fs.existsSync(provenanceLockPath), 'a relationalstats provenance lock was created or modified during route migration')
sourceCheck('relationalstats resolved provenance state unchanged', manifest.provenance_lock_state === 'absent_historical_pre_rtd4' && !fs.existsSync(provenanceLockPath), 'historical pre-lock provenance state changed')

for (const [relativePath, expectedHash] of Object.entries(frozenHashes)) {
  const full = path.join(repositoryRoot, relativePath)
  sourceCheck(`R-TD4 lifecycle/provenance frozen: ${relativePath}`, fs.existsSync(full) && sha256(full) === expectedHash, `${relativePath} differs from the R-TD5.4 baseline`)
}
sourceCheck('no new sync adapter', JSON.stringify(knownAdapterIds()) === JSON.stringify(['relationalstats_v1', 'retainai_v1']), `found ${knownAdapterIds().join(', ')}`)

const syncScript = read('scripts/sync-relationalstats-docs.mjs')
sourceCheck(
  'relationalstats transformer public-target guard migrated path-only',
  syncScript.includes("const publicTargetRoot = path.resolve('docs/technical-docs/relationalstats')") &&
    syncScript.includes('relationalstats transformer refuses to write directly to docs/technical-docs/relationalstats.') &&
    !syncScript.includes("const publicTargetRoot = path.resolve('docs/relationalstats')") &&
    syncScript.includes('sync-relationalstats-docs.mjs is a stage-only transformer.'),
  'transformer guard does not protect the canonical public target'
)

for (const [id, expected] of Object.entries({
  versovector: { route: '/technical-docs/versovector/', sourcePath: 'docs/technical-docs/versovector', legacy: 'docs/versovector/index.md' },
  luasf: { route: '/technical-docs/luasf/', sourcePath: 'docs/technical-docs/luasf', legacy: 'docs/luasf/index.md' },
  gradientmesh: { route: '/technical-docs/gradientmesh/', sourcePath: 'docs/technical-docs/gradientmesh', legacy: 'docs/gradientmesh/index.md' }
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

const retainai = registry.sources.find((source) => source.project_id === 'retainai')
sourceCheck(
  'authorized later migration: RetainAI R-TD5.5',
  retainai?.current_public_route === '/technical-docs/retainai/' &&
    retainai?.site_source_path === 'docs/technical-docs/retainai' &&
    retainai?.source_mode === 'snapshot_sync' &&
    retainai?.source_ref === 'v0.4.0-alpha.1' &&
    fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/retainai/index.md')) &&
    fs.existsSync(path.join(repositoryRoot, 'docs/retainai/index.md')),
  'RetainAI is not in the authorized R-TD5.5 canonical + legacy compatibility state'
)

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
const legacyRoot = path.join(repositoryRoot, manifest.source_root_before)
const expectedInventory = manifest.documents.map((document) => document.relative_path).sort()
const canonicalInventory = walkMarkdown(canonicalRoot)
const legacyInventory = walkMarkdown(legacyRoot)
sourceCheck('before manifest document count', manifest.source_checkpoint === '34d16fb358fcde799dd989b9424f0fb43b3498f8' && manifest.document_count === 37 && manifest.documents.length === 37, `manifest has ${manifest.documents.length} documents`)
sourceCheck('canonical document inventory', JSON.stringify(canonicalInventory) === JSON.stringify(expectedInventory), `expected ${expectedInventory.length}, found ${canonicalInventory.length}`)
sourceCheck('legacy stub inventory', JSON.stringify(legacyInventory) === JSON.stringify(expectedInventory), `expected ${expectedInventory.length}, found ${legacyInventory.length}`)
sourceCheck('nested route inventory', manifest.documents.some((document) => document.nested_depth >= 3) && Math.max(...manifest.documents.map((document) => document.nested_depth)) >= 3, 'nested/deep route inventory was flattened or not recorded')

for (const document of manifest.documents) {
  const canonicalFile = path.join(canonicalRoot, document.relative_path)
  const legacyFile = path.join(legacyRoot, document.relative_path)
  const expectedLegacyRoute = routeFor(document.relative_path, '/relationalstats')
  const expectedCanonicalRoute = routeFor(document.relative_path, '/technical-docs/relationalstats')

  sourceCheck(
    `content hash preserved: ${document.relative_path}`,
    document.legacy_route === expectedLegacyRoute &&
      document.canonical_route === expectedCanonicalRoute &&
      fs.existsSync(canonicalFile) &&
      sha256(canonicalFile) === document.sha256,
    `canonical content differs from baseline hash ${document.sha256}`
  )

  const canonicalMarkdown = fs.existsSync(canonicalFile) ? fs.readFileSync(canonicalFile, 'utf8') : ''
  sourceCheck(`canonical source links: ${expectedCanonicalRoute}`, !staleLegacySiteHref(canonicalMarkdown), 'canonical Markdown contains a legacy site-route link')

  const stub = fs.existsSync(legacyFile) ? fs.readFileSync(legacyFile, 'utf8') : ''
  sourceCheck(
    `legacy stub source: ${expectedLegacyRoute}`,
    stub.includes('layout: false') &&
      stub.includes('search: false') &&
      stub.includes('http-equiv: refresh') &&
      stub.includes('name: robots') &&
      stub.includes('noindex,follow') &&
      stub.includes(expectedCanonicalRoute),
    `legacy stub does not redirect/noindex to ${expectedCanonicalRoute}`
  )
}

const config = read('docs/.vitepress/config.mts')
sourceCheck('sidebar canonical prefix', config.includes("'/technical-docs/relationalstats/': [") && !config.includes("        '/relationalstats/': ["), 'relationalstats sidebar is not keyed by the canonical prefix')
sourceCheck('sidebar canonical targets', !config.includes("link: '/relationalstats/") && config.includes("link: '/technical-docs/relationalstats/"), 'one or more relationalstats sidebar links remain legacy')
sourceCheck('legacy canonical metadata mapping', config.includes("normalized.startsWith('/relationalstats/')") && config.includes("normalized.replace('/relationalstats/', '/technical-docs/relationalstats/')"), 'legacy relationalstats canonical mapping is missing')
sourceCheck('Docs active-state matching', config.includes("activeMatch: '^/(technical-docs|retainai|versovector|relationalstats|gradientmesh|luasf)(/|$)'"), 'Docs active match no longer covers canonical + legacy docs')

const hub = read('docs/.vitepress/theme/components/TechnicalDocsPage.vue')
sourceCheck('hub canonical target remains registry-driven', hub.includes(':href="source.current_public_route"') && !hub.includes('/technical-docs/relationalstats/'), 'hub route was hard-coded instead of projected from registry')

const layout = read('docs/.vitepress/theme/components/PortfolioThemeLayout.vue')
sourceCheck('docs context uses current registry prefix', layout.includes('prefix: source.current_public_route') && layout.includes('route.path.startsWith(item.prefix)'), 'docs context matching stopped using current_public_route')
sourceCheck('mobile Docs active state', layout.includes('<MobilePortfolioNav v-if="context" active="docs" />'), 'canonical docs context does not activate mobile Docs')

const css = read('docs/.vitepress/theme/styles/sections/relationalstats.css')
sourceCheck('relationalstats route-specific CSS migrated', css.includes('href="/technical-docs/relationalstats') && !css.includes('href="/relationalstats') && !css.includes('href^="/relationalstats') && !css.includes('href*="/relationalstats'), 'sidebar icon selectors still target the legacy prefix')

const portfolio = read('docs/.vitepress/theme/content/portfolio.content.ts')
sourceCheck('portfolio documentation target canonical', portfolio.includes('"documentation": "/technical-docs/relationalstats/"') && !portfolio.includes('"documentation": "/relationalstats/"'), 'portfolio relationalstats documentation link is not canonical')

const caseStudies = read('docs/.vitepress/theme/components/CaseStudiesPage.vue')
sourceCheck('case-study documentation target canonical', caseStudies.includes('href="/technical-docs/relationalstats/"') && !caseStudies.includes('href="/relationalstats/"'), 'case-study relationalstats link is not canonical')

const quality = read('scripts/audit/landing-quality-check.py')
sourceCheck('landing quality route canonical', quality.includes('"/technical-docs/relationalstats/": DIST / "technical-docs" / "relationalstats" / "index.html"') && !quality.includes('"/relationalstats/": DIST / "relationalstats" / "index.html"'), 'landing quality gate still targets the legacy relationalstats route')

const descriptors = getGeneratedTargetDescriptors(relationalstats)
sourceCheck(
  'lifecycle owns canonical generated target',
  descriptors.length === 2 && descriptors.every((descriptor) => descriptor.base.startsWith('docs/technical-docs/relationalstats/')),
  `generated targets: ${descriptors.map((descriptor) => descriptor.declared).join(', ')}`
)
sourceCheck('legacy tree excluded from generated ownership', descriptors.every((descriptor) => !descriptor.base.startsWith('docs/relationalstats/')), 'legacy tree remains lifecycle-owned')

const packageJson = JSON.parse(read('package.json'))
sourceCheck('R-TD5.4 npm validation entry', packageJson.scripts?.['technical-docs:validate-rtd5-4'] === 'node scripts/technical-docs/validate-rtd5-4.mjs', 'technical-docs:validate-rtd5-4 command is missing')

console.log('SOURCE CHECKS')
for (const item of checks.filter((item) => item.group === 'source')) {
  console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.condition || !item.detail ? '' : ` — ${item.detail}`}`)
}

console.log('\nBUILD-OUTPUT CHECKS')
if (!buildOutputAvailable) {
  if (requireBuild) {
    buildCheck('built route validation required', false, 'docs/.vitepress/dist is absent; run npm run docs:build first')
    console.log('FAIL: built route validation required — docs/.vitepress/dist is absent; run npm run docs:build first')
  } else {
    console.log('NOT RUN: all 37 canonical/legacy route resolutions, canonical metadata/internal links, legacy redirects/canonical metadata/noindex — docs/.vitepress/dist is absent')
  }
} else {
  for (const document of manifest.documents) {
    const legacyRoute = routeFor(document.relative_path, '/relationalstats')
    const canonicalRoute = routeFor(document.relative_path, '/technical-docs/relationalstats')
    const canonicalDist = distFileFor(document.relative_path, '/technical-docs/relationalstats')
    const legacyDist = distFileFor(document.relative_path, '/relationalstats')
    const expectedMetadata = metadataUrl(canonicalRoute)

    buildCheck(`canonical resolution: ${canonicalRoute}`, fs.existsSync(canonicalDist), `missing ${path.relative(repositoryRoot, canonicalDist)}`)
    buildCheck(`legacy resolution: ${legacyRoute}`, fs.existsSync(legacyDist), `missing ${path.relative(repositoryRoot, legacyDist)}`)

    if (fs.existsSync(canonicalDist)) {
      const html = fs.readFileSync(canonicalDist, 'utf8')
      buildCheck(`canonical metadata: ${canonicalRoute}`, hasCanonical(html, expectedMetadata), `canonical metadata does not point to ${expectedMetadata}`)
      buildCheck(`canonical internal links: ${canonicalRoute}`, !/href="\/relationalstats(?:\/|\")/.test(html), 'canonical page emits a legacy relationalstats href')
    }

    if (fs.existsSync(legacyDist)) {
      const html = fs.readFileSync(legacyDist, 'utf8')
      buildCheck(`legacy redirect output: ${legacyRoute}`, /http-equiv="refresh"/i.test(html) && html.includes(canonicalRoute), `built legacy page does not redirect to ${canonicalRoute}`)
      buildCheck(`legacy canonical metadata: ${legacyRoute}`, hasCanonical(html, expectedMetadata), `legacy canonical metadata does not point to ${expectedMetadata}`)
      buildCheck(`legacy noindex: ${legacyRoute}`, /name="robots"[^>]*content="noindex,follow"/i.test(html) || /content="noindex,follow"[^>]*name="robots"/i.test(html), 'legacy page is not noindex,follow')
    }
  }

  for (const item of checks.filter((item) => item.group === 'build')) {
    console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.condition || !item.detail ? '' : ` — ${item.detail}`}`)
  }
}

if (failures.length) {
  console.error(`\nTechnical Docs R-TD5.4 validation: FAIL (${failures.length} failures)`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

const sourceCount = checks.filter((item) => item.group === 'source').length
const buildCount = checks.filter((item) => item.group === 'build').length
console.log(`\nTechnical Docs R-TD5.4 validation: PASS (${sourceCount} source checks; ${manifest.document_count} canonical documents + ${manifest.document_count} legacy compatibility stubs; build-output checks ${buildOutputAvailable ? `PASS (${buildCount})` : 'NOT RUN'})`)
