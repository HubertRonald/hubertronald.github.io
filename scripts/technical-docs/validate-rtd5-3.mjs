import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  loadTechnicalDocsRegistry,
  repositoryRoot,
  validateTechnicalDocsRegistry
} from './registry.mjs'

const moduleDir = path.dirname(fileURLToPath(import.meta.url))
const manifestPath = path.join(moduleDir, 'rtd5-3-gradientmesh-content-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const registry = loadTechnicalDocsRegistry()
const failures = []
const checks = []
const requireBuild = process.argv.includes('--require-build')
const distRoot = path.join(repositoryRoot, 'docs/.vitepress/dist')
const buildOutputAvailable = fs.existsSync(distRoot)

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

function markdownFiles(root) {
  if (!fs.existsSync(root)) return []
  return fs.readdirSync(root)
    .filter((name) => name.endsWith('.md') && fs.statSync(path.join(root, name)).isFile())
    .sort()
}

function routeFor(relativePath, prefix) {
  const stem = relativePath.replace(/\.md$/, '')
  return stem === 'index' ? `${prefix}/` : `${prefix}/${stem}`
}

function distFileFor(relativePath, prefix) {
  const stem = relativePath.replace(/\.md$/, '')
  const root = path.join(distRoot, ...prefix.split('/').filter(Boolean))
  return stem === 'index' ? path.join(root, 'index.html') : path.join(root, `${stem}.html`)
}

function extractRemoteUrls(source) {
  return [...source.matchAll(/https?:\/\/[^\s)"<>]+/g)].map((match) => match[0])
}

function canonicalMetadataUrl(canonicalRoute) {
  return `https://hubertronald.dev${canonicalRoute === '/technical-docs/gradientmesh/' ? canonicalRoute : `${canonicalRoute}/`}`
}

const registryErrors = validateTechnicalDocsRegistry(registry)
sourceCheck('registry schema', registryErrors.length === 0, registryErrors.join('; ') || 'valid')

const gradientmesh = registry.sources.find((source) => source.project_id === 'gradientmesh')
sourceCheck('GradientMesh canonical prefix', gradientmesh?.current_public_route === '/technical-docs/gradientmesh/', `found ${gradientmesh?.current_public_route}`)
sourceCheck('GradientMesh legacy prefix', JSON.stringify(gradientmesh?.legacy_routes) === JSON.stringify(['/gradientmesh/']), `found ${JSON.stringify(gradientmesh?.legacy_routes)}`)
sourceCheck('GradientMesh canonical source path', gradientmesh?.site_source_path === 'docs/technical-docs/gradientmesh', `found ${gradientmesh?.site_source_path}`)
sourceCheck('GradientMesh curated ownership path', JSON.stringify(gradientmesh?.ownership?.curated_targets) === JSON.stringify(['docs/technical-docs/gradientmesh/**']), `found ${JSON.stringify(gradientmesh?.ownership?.curated_targets)}`)
sourceCheck(
  'GradientMesh source mode unchanged',
  gradientmesh?.source_mode === 'local_curated_remote_assets' &&
    gradientmesh?.sync_strategy === 'none' &&
    !gradientmesh?.sync_adapter &&
    JSON.stringify(gradientmesh?.sync_scopes) === JSON.stringify([]),
  'GradientMesh sync/source-mode boundary changed'
)
sourceCheck('GradientMesh source repository unchanged', gradientmesh?.source_repository === 'https://github.com/HubertRonald/GradientMesh' && gradientmesh?.source_ref === 'master', 'source repository/ref changed')
sourceCheck('GradientMesh display identity unchanged', gradientmesh?.display_name === 'GradientMesh', `found ${gradientmesh?.display_name}`)
sourceCheck('GradientMesh proposed route unchanged', gradientmesh?.proposed_public_route === '/technical-docs/gradientmesh/', `found ${gradientmesh?.proposed_public_route}`)
sourceCheck('GradientMesh publication state unchanged', gradientmesh?.enabled === true && gradientmesh?.publication_status === 'published' && gradientmesh?.integration_state === 'confirmed_current', 'publication state changed')
sourceCheck(
  'GradientMesh evidence semantics unchanged',
  gradientmesh?.documentation_type === 'library_reference' &&
    JSON.stringify(gradientmesh?.technical_domain) === JSON.stringify(['Lua', 'Gideros', 'Creative coding']) &&
    gradientmesh?.documentation_scope === 'Getting started, examples, mesh behavior, API reference, architecture, and releases for the Gideros Lua utility.' &&
    gradientmesh?.evidence_scope === 'Creative Roots evidence inside the main portfolio; not a current product showcase.' &&
    gradientmesh?.project_atlas_relationship === 'confirmed_existing_context' &&
    JSON.stringify(gradientmesh?.builder_journey_stages) === JSON.stringify([{ label: 'Creative Software & Product Instinct', href: '/journey/#stage-01' }]),
  'evidence/Atlas/Journey semantics changed'
)
sourceCheck(
  'GradientMesh remote-asset provenance unchanged',
  gradientmesh?.provenance === 'Local documentation links to the source repository; some visual assets are referenced from the moving master branch.' &&
    gradientmesh?.update_policy === 'manual_curated; pin remote asset URLs to immutable commit/tag when practical' &&
    gradientmesh?.provenance_lock_policy === 'not_applicable_local_curated',
  'remote-asset provenance semantics changed'
)

const versovector = registry.sources.find((source) => source.project_id === 'versovector')
sourceCheck(
  'R-TD5.1 closed unchanged',
  versovector?.current_public_route === '/technical-docs/versovector/' &&
    versovector?.site_source_path === 'docs/technical-docs/versovector' &&
    JSON.stringify(versovector?.legacy_routes) === JSON.stringify(['/versovector/']),
  'VersoVector R-TD5.1 route state changed'
)

const luasf = registry.sources.find((source) => source.project_id === 'luasf')
sourceCheck(
  'R-TD5.2 closed unchanged',
  luasf?.current_public_route === '/technical-docs/luasf/' &&
    luasf?.site_source_path === 'docs/technical-docs/luasf' &&
    JSON.stringify(luasf?.legacy_routes) === JSON.stringify(['/luasf/']),
  'LuaSF R-TD5.2 route state changed'
)

for (const [id, expected] of Object.entries({
  retainai: { route: '/retainai/', sourcePath: 'docs/retainai' },
  relationalstats: { route: '/relationalstats/', sourcePath: 'docs/relationalstats' }
})) {
  const source = registry.sources.find((item) => item.project_id === id)
  sourceCheck(`no R-TD5.4+ migration: ${id}`, source?.current_public_route === expected.route && source?.site_source_path === expected.sourcePath && !fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs', id)), `route/source path changed for ${id}`)
}

const fdeCandidate = registry.candidates.find((candidate) => candidate.project_id === 'fde-roadmap')
sourceCheck(
  'fde-roadmap hard stop preserved',
  fdeCandidate?.integration_state === 'candidate_future' &&
    fdeCandidate?.publication_status === 'candidate' &&
    fdeCandidate?.enabled === false &&
    fdeCandidate?.site_source_path === null &&
    fdeCandidate?.current_public_route === null &&
    !fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/fde-roadmap')),
  'candidate state or route boundary changed'
)

const adapters = read('scripts/technical-docs/adapters/index.mjs')
sourceCheck('no GradientMesh sync adapter introduced', !/gradientmesh/i.test(adapters), 'GradientMesh was added to sync adapters')

const canonicalRoot = path.join(repositoryRoot, manifest.canonical_root_after)
const legacyRoot = path.join(repositoryRoot, manifest.source_root_before)
const manifestPaths = manifest.documents.map((document) => document.relative_path).sort()
const canonicalPaths = markdownFiles(canonicalRoot)
const legacyPaths = markdownFiles(legacyRoot)
sourceCheck('before manifest document count', manifest.document_count === 7 && manifest.documents.length === 7, `manifest has ${manifest.documents.length}`)
sourceCheck('canonical document inventory', JSON.stringify(canonicalPaths) === JSON.stringify(manifestPaths), `canonical=${JSON.stringify(canonicalPaths)}, manifest=${JSON.stringify(manifestPaths)}`)
sourceCheck('legacy compatibility stub inventory', JSON.stringify(legacyPaths) === JSON.stringify(manifestPaths), `legacy=${JSON.stringify(legacyPaths)}, manifest=${JSON.stringify(manifestPaths)}`)

for (const document of manifest.documents) {
  const canonicalFile = path.join(canonicalRoot, document.relative_path)
  const legacyFile = path.join(legacyRoot, document.relative_path)
  const legacyRoute = routeFor(document.relative_path, '/gradientmesh')
  const canonicalRoute = routeFor(document.relative_path, '/technical-docs/gradientmesh')
  const expectedTarget = canonicalRoute

  sourceCheck(`content hash preserved: ${document.relative_path}`, fs.existsSync(canonicalFile) && sha256(canonicalFile) === document.sha256, `expected ${document.sha256}${fs.existsSync(canonicalFile) ? `, got ${sha256(canonicalFile)}` : ', file missing'}`)

  const canonicalSource = fs.existsSync(canonicalFile) ? fs.readFileSync(canonicalFile, 'utf8') : ''
  sourceCheck(`canonical source links: ${canonicalRoute}`, !/(?:href=["']|\]\()\/gradientmesh(?:\/|["')])/.test(canonicalSource), 'canonical source contains an absolute legacy GradientMesh link')
  sourceCheck(`remote references preserved: ${document.relative_path}`, JSON.stringify(extractRemoteUrls(canonicalSource)) === JSON.stringify(document.remote_urls), 'remote URL list changed')

  const stub = fs.existsSync(legacyFile) ? fs.readFileSync(legacyFile, 'utf8') : ''
  sourceCheck(
    `legacy stub source: ${legacyRoute}`,
    stub.includes('layout: false') &&
      stub.includes('search: false') &&
      stub.includes('http-equiv: refresh') &&
      stub.includes('name: robots') &&
      stub.includes('noindex,follow') &&
      stub.includes(expectedTarget),
    `legacy stub does not redirect to ${expectedTarget}`
  )

  if (buildOutputAvailable) {
    const canonicalDist = distFileFor(document.relative_path, '/technical-docs/gradientmesh')
    const legacyDist = distFileFor(document.relative_path, '/gradientmesh')
    buildCheck(`canonical resolution: ${canonicalRoute}`, fs.existsSync(canonicalDist), `missing ${path.relative(repositoryRoot, canonicalDist)}`)
    buildCheck(`legacy resolution: ${legacyRoute}`, fs.existsSync(legacyDist), `missing ${path.relative(repositoryRoot, legacyDist)}`)

    if (fs.existsSync(canonicalDist)) {
      const canonicalHtml = fs.readFileSync(canonicalDist, 'utf8')
      const expectedCanonicalUrl = canonicalMetadataUrl(canonicalRoute)
      buildCheck(`canonical metadata: ${canonicalRoute}`, canonicalHtml.includes(`rel="canonical" href="${expectedCanonicalUrl}"`) || canonicalHtml.includes(`href="${expectedCanonicalUrl}" rel="canonical"`), `canonical metadata does not point to ${expectedCanonicalUrl}`)
      buildCheck(`canonical internal links: ${canonicalRoute}`, !/href="\/gradientmesh(?:\/|\")/.test(canonicalHtml), 'canonical page emits a legacy GradientMesh href')
      buildCheck(`remote asset output: ${canonicalRoute}`, document.remote_urls.every((url) => canonicalHtml.includes(url)), 'one or more preserved remote references are absent from canonical HTML')
    }

    if (fs.existsSync(legacyDist)) {
      const legacyHtml = fs.readFileSync(legacyDist, 'utf8')
      const expectedCanonicalUrl = canonicalMetadataUrl(canonicalRoute)
      buildCheck(`legacy redirect output: ${legacyRoute}`, /http-equiv="refresh"/i.test(legacyHtml) && legacyHtml.includes(expectedTarget), `built legacy page does not redirect to ${expectedTarget}`)
      buildCheck(`legacy canonical metadata: ${legacyRoute}`, legacyHtml.includes(`rel="canonical" href="${expectedCanonicalUrl}"`) || legacyHtml.includes(`href="${expectedCanonicalUrl}" rel="canonical"`), `legacy canonical metadata does not point to ${expectedCanonicalUrl}`)
      buildCheck(`legacy noindex output: ${legacyRoute}`, /name="robots"[^>]*content="noindex,follow"/i.test(legacyHtml) || /content="noindex,follow"[^>]*name="robots"/i.test(legacyHtml), 'legacy page is not noindex,follow')
    }
  }
}

const config = read('docs/.vitepress/config.mts')
const canonicalLinks = [
  '/technical-docs/gradientmesh/',
  '/technical-docs/gradientmesh/getting-started',
  '/technical-docs/gradientmesh/examples',
  '/technical-docs/gradientmesh/how-it-works',
  '/technical-docs/gradientmesh/api-reference',
  '/technical-docs/gradientmesh/architecture',
  '/technical-docs/gradientmesh/releases'
]
sourceCheck('sidebar canonical prefix', config.includes("'/technical-docs/gradientmesh/': [") && !config.includes("        '/gradientmesh/': ["), 'GradientMesh sidebar is not keyed by the canonical prefix')
sourceCheck('sidebar canonical targets', canonicalLinks.every((link) => config.includes(`link: '${link}'`)), 'one or more GradientMesh sidebar links are not canonical')
sourceCheck('Docs active-state matching', config.includes("activeMatch: '^/(technical-docs|retainai|versovector|relationalstats|gradientmesh|luasf)(/|$)'"), 'Docs active match no longer covers canonical + legacy technical docs')
sourceCheck('legacy canonical metadata mapping', config.includes("normalized.startsWith('/gradientmesh/')") && config.includes("'/technical-docs/gradientmesh/'"), 'legacy GradientMesh canonical mapping is missing')

const hub = read('docs/.vitepress/theme/components/TechnicalDocsPage.vue')
sourceCheck('hub canonical target remains registry-driven', hub.includes(':href="source.current_public_route"') && !hub.includes('/technical-docs/gradientmesh/'), 'hub route was hard-coded instead of projected from registry')

const layout = read('docs/.vitepress/theme/components/PortfolioThemeLayout.vue')
sourceCheck('docs context uses current registry prefix', layout.includes('prefix: source.current_public_route') && layout.includes('route.path.startsWith(item.prefix)'), 'docs context matching stopped using current_public_route')
sourceCheck('mobile Docs active state', layout.includes('<MobilePortfolioNav v-if="context" active="docs" />'), 'canonical docs context does not activate mobile Docs')

const css = read('docs/.vitepress/theme/styles/sections/gradientmesh.css')
sourceCheck('GradientMesh route-specific CSS migrated', css.includes('href="/technical-docs/gradientmesh') && !css.includes('href="/gradientmesh') && !css.includes('href^="/gradientmesh'), 'sidebar icon selectors still target the legacy prefix')

const portfolio = read('docs/.vitepress/theme/content/portfolio.content.ts')
sourceCheck('portfolio documentation target canonical', portfolio.includes('"documentation": "/technical-docs/gradientmesh/"') && !portfolio.includes('"documentation": "/gradientmesh/"'), 'GradientMesh portfolio documentation link is not canonical')

const quality = read('scripts/audit/landing-quality-check.py')
sourceCheck('landing quality route canonical', quality.includes('"/technical-docs/gradientmesh/": DIST / "technical-docs" / "gradientmesh" / "index.html"') && !quality.includes('"/gradientmesh/": DIST / "gradientmesh" / "index.html"'), 'landing quality gate still targets the legacy GradientMesh route')

const packageJson = JSON.parse(read('package.json'))
sourceCheck('R-TD5.3 npm validation entry', packageJson.scripts?.['technical-docs:validate-rtd5-3'] === 'node scripts/technical-docs/validate-rtd5-3.mjs', 'technical-docs:validate-rtd5-3 command is missing')

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
    console.log('NOT RUN: canonical/legacy route resolution, generated canonical metadata, canonical internal links, remote asset output, legacy redirects, legacy canonical metadata, and legacy noindex checks — docs/.vitepress/dist is absent')
  }
} else {
  for (const item of checks.filter((item) => item.group === 'build')) {
    console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.condition || !item.detail ? '' : ` — ${item.detail}`}`)
  }
}

if (failures.length) {
  console.error(`\nTechnical Docs R-TD5.3 validation: FAIL (${failures.length} failures)`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

const sourceCount = checks.filter((item) => item.group === 'source').length
const buildCount = checks.filter((item) => item.group === 'build').length
console.log(`\nTechnical Docs R-TD5.3 validation: PASS (${sourceCount} source checks${buildOutputAvailable ? ` + ${buildCount} build checks` : '; build-output checks NOT RUN'}; ${manifest.document_count} canonical documents + ${manifest.document_count} legacy compatibility stubs)`)
