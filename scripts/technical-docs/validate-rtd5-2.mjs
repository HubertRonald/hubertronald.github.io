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
const manifestPath = path.join(moduleDir, 'rtd5-2-luasf-content-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const registry = loadTechnicalDocsRegistry()
const failures = []
const checks = []
const requireBuild = process.argv.includes('--require-build')
const distRoot = path.join(repositoryRoot, 'docs/.vitepress/dist')
const buildOutputAvailable = fs.existsSync(distRoot)

function check(name, condition, detail = '') {
  checks.push({ name, condition, detail })
  if (!condition) failures.push(`${name}: ${detail || 'condition failed'}`)
}

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), 'utf8')
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
}

function markdownFiles(root) {
  const output = []
  function walk(current, relative = '') {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const next = path.join(current, entry.name)
      const nextRelative = relative ? path.posix.join(relative, entry.name) : entry.name
      if (entry.isDirectory()) walk(next, nextRelative)
      else if (entry.isFile() && entry.name.endsWith('.md')) output.push(nextRelative)
    }
  }
  if (fs.existsSync(root)) walk(root)
  return output
}

function routeFor(relativePath, prefix) {
  const stem = relativePath.replace(/\.md$/, '')
  return stem === 'index' ? `${prefix}/` : `${prefix}/${stem}`
}

function distFileFor(relativePath, prefix) {
  const stem = relativePath.replace(/\.md$/, '')
  const root = path.join(repositoryRoot, 'docs/.vitepress/dist', ...prefix.split('/').filter(Boolean))
  return stem === 'index' ? path.join(root, 'index.html') : path.join(root, `${stem}.html`)
}

const registryErrors = validateTechnicalDocsRegistry(registry)
check('registry schema', registryErrors.length === 0, registryErrors.join('; ') || 'valid')

const luasf = registry.sources.find((source) => source.project_id === 'luasf')
check('LuaSF canonical prefix', luasf?.current_public_route === '/technical-docs/luasf/', `found ${luasf?.current_public_route}`)
check('LuaSF legacy prefix', JSON.stringify(luasf?.legacy_routes) === JSON.stringify(['/luasf/']), `found ${JSON.stringify(luasf?.legacy_routes)}`)
check('LuaSF canonical source path', luasf?.site_source_path === 'docs/technical-docs/luasf', `found ${luasf?.site_source_path}`)
check('LuaSF curated ownership path', JSON.stringify(luasf?.ownership?.curated_targets) === JSON.stringify(['docs/technical-docs/luasf/**']), `found ${JSON.stringify(luasf?.ownership?.curated_targets)}`)
check('LuaSF source mode unchanged', luasf?.source_mode === 'local_curated' && luasf?.sync_strategy === 'none' && !luasf?.sync_adapter, 'LuaSF lifecycle ownership changed')

const versovector = registry.sources.find((source) => source.project_id === 'versovector')
check(
  'R-TD5.1 closed unchanged',
  versovector?.current_public_route === '/technical-docs/versovector/' &&
    versovector?.site_source_path === 'docs/technical-docs/versovector' &&
    JSON.stringify(versovector?.legacy_routes) === JSON.stringify(['/versovector/']),
  'VersoVector R-TD5.1 route state changed'
)

const expectedOtherRoutes = {
  retainai: { route: '/retainai/', sourcePath: 'docs/retainai' },
  relationalstats: { route: '/relationalstats/', sourcePath: 'docs/relationalstats' },
  gradientmesh: { route: '/gradientmesh/', sourcePath: 'docs/gradientmesh' }
}
for (const [id, expected] of Object.entries(expectedOtherRoutes)) {
  const source = registry.sources.find((item) => item.project_id === id)
  check(`no R-TD5.3+ migration: ${id}`, source?.current_public_route === expected.route && source?.site_source_path === expected.sourcePath && !fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs', id)), `route/source path changed for ${id}`)
}

const fdeCandidate = registry.candidates.find((candidate) => candidate.project_id === 'fde-roadmap')
check(
  'fde-roadmap hard stop preserved',
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
const manifestPaths = manifest.documents.map((document) => document.relative_path).sort()
const canonicalPaths = markdownFiles(canonicalRoot)
const legacyPaths = markdownFiles(legacyRoot)
check('before manifest document count', manifest.document_count === 7 && manifest.documents.length === 7, `manifest has ${manifest.documents.length}`)
check('canonical document inventory', JSON.stringify(canonicalPaths) === JSON.stringify(manifestPaths), `canonical=${JSON.stringify(canonicalPaths)}, manifest=${JSON.stringify(manifestPaths)}`)
check('legacy compatibility stub inventory', JSON.stringify(legacyPaths) === JSON.stringify(manifestPaths), `legacy=${JSON.stringify(legacyPaths)}, manifest=${JSON.stringify(manifestPaths)}`)

for (const document of manifest.documents) {
  const canonicalFile = path.join(canonicalRoot, document.relative_path)
  const legacyFile = path.join(legacyRoot, document.relative_path)
  const legacyRoute = routeFor(document.relative_path, '/luasf')
  const canonicalRoute = routeFor(document.relative_path, '/technical-docs/luasf')
  const expectedTarget = canonicalRoute

  check(`content hash preserved: ${document.relative_path}`, fs.existsSync(canonicalFile) && sha256(canonicalFile) === document.sha256, `expected ${document.sha256}${fs.existsSync(canonicalFile) ? `, got ${sha256(canonicalFile)}` : ', file missing'}`)

  const canonicalSource = fs.existsSync(canonicalFile) ? fs.readFileSync(canonicalFile, 'utf8') : ''
  check(`canonical source links: ${canonicalRoute}`, !/(?:href=["']|\]\()\/luasf(?:\/|["')])/.test(canonicalSource), 'canonical source contains an absolute legacy LuaSF link')

  const stub = fs.existsSync(legacyFile) ? fs.readFileSync(legacyFile, 'utf8') : ''
  check(`legacy stub source: ${legacyRoute}`, stub.includes('layout: false') && stub.includes('search: false') && stub.includes('http-equiv: refresh') && stub.includes('name: robots') && stub.includes(expectedTarget), `legacy stub does not redirect to ${expectedTarget}`)

  if (buildOutputAvailable) {
    const canonicalDist = distFileFor(document.relative_path, '/technical-docs/luasf')
    const legacyDist = distFileFor(document.relative_path, '/luasf')
    check(`canonical resolution: ${canonicalRoute}`, fs.existsSync(canonicalDist), `missing ${path.relative(repositoryRoot, canonicalDist)}`)
    check(`legacy resolution: ${legacyRoute}`, fs.existsSync(legacyDist), `missing ${path.relative(repositoryRoot, legacyDist)}`)

    if (fs.existsSync(canonicalDist)) {
      const canonicalHtml = fs.readFileSync(canonicalDist, 'utf8')
      const canonicalMetadataUrl = `https://hubertronald.dev${canonicalRoute === '/technical-docs/luasf/' ? canonicalRoute : `${canonicalRoute}/`}`
      check(`canonical metadata: ${canonicalRoute}`, canonicalHtml.includes(`rel="canonical" href="${canonicalMetadataUrl}"`) || canonicalHtml.includes(`href="${canonicalMetadataUrl}" rel="canonical"`), `canonical metadata does not point to ${canonicalMetadataUrl}`)
      check(`canonical internal links: ${canonicalRoute}`, !/href="\/luasf(?:\/|\")/.test(canonicalHtml), 'canonical page emits a legacy LuaSF href')
    }

    if (fs.existsSync(legacyDist)) {
      const legacyHtml = fs.readFileSync(legacyDist, 'utf8')
      const canonicalMetadataUrl = `https://hubertronald.dev${canonicalRoute === '/technical-docs/luasf/' ? canonicalRoute : `${canonicalRoute}/`}`
      check(`legacy redirect output: ${legacyRoute}`, /http-equiv="refresh"/i.test(legacyHtml) && legacyHtml.includes(expectedTarget), `built legacy page does not redirect to ${expectedTarget}`)
      check(`legacy canonical metadata: ${legacyRoute}`, legacyHtml.includes(`rel="canonical" href="${canonicalMetadataUrl}"`) || legacyHtml.includes(`href="${canonicalMetadataUrl}" rel="canonical"`), `legacy canonical metadata does not point to ${canonicalMetadataUrl}`)
    }
  }
}

const config = read('docs/.vitepress/config.mts')
const canonicalLinks = [
  '/technical-docs/luasf/',
  '/technical-docs/luasf/getting-started',
  '/technical-docs/luasf/api-overview',
  '/technical-docs/luasf/architecture',
  '/technical-docs/luasf/examples',
  '/technical-docs/luasf/contributing',
  '/technical-docs/luasf/releases'
]
check('sidebar canonical prefix', config.includes("'/technical-docs/luasf/': [") && !config.includes("        '/luasf/': ["), 'LuaSF sidebar is not keyed by the canonical prefix')
check('sidebar canonical targets', canonicalLinks.every((link) => config.includes(`link: '${link}'`)), 'one or more LuaSF sidebar links are not canonical')
check('Docs active-state matching', config.includes("activeMatch: '^/(technical-docs|retainai|versovector|relationalstats|gradientmesh|luasf)(/|$)'"), 'Docs active match no longer covers canonical + legacy technical docs')
check('legacy canonical metadata mapping', config.includes("normalized.startsWith('/luasf/')") && config.includes("'/technical-docs/luasf/'"), 'legacy LuaSF canonical mapping is missing')

const hub = read('docs/.vitepress/theme/components/TechnicalDocsPage.vue')
check('hub canonical target remains registry-driven', hub.includes(':href="source.current_public_route"') && !hub.includes('/technical-docs/luasf/'), 'hub route was hard-coded instead of projected from registry')

const layout = read('docs/.vitepress/theme/components/PortfolioThemeLayout.vue')
check('docs context uses current registry prefix', layout.includes('prefix: source.current_public_route') && layout.includes('route.path.startsWith(item.prefix)'), 'docs context matching stopped using current_public_route')
check('mobile Docs active state', layout.includes('<MobilePortfolioNav v-if="context" active="docs" />'), 'canonical docs context does not activate mobile Docs')

const css = read('docs/.vitepress/theme/styles/sections/luasf.css')
check('LuaSF route-specific CSS migrated', css.includes('href="/technical-docs/luasf') && !css.includes('href="/luasf') && !css.includes('href^="/luasf'), 'sidebar icon selectors still target the legacy prefix')

const portfolio = read('docs/.vitepress/theme/content/portfolio.content.ts')
const atlas = read('docs/.vitepress/theme/components/ProjectAtlasPage.vue')
check('portfolio documentation target canonical', portfolio.includes('"documentation": "/technical-docs/luasf/"') && !portfolio.includes('"documentation": "/luasf/"'), 'LuaSF portfolio documentation link is not canonical')
check('Atlas bridge target canonical', atlas.includes('href="/technical-docs/luasf/">LuaSF</a>') && !atlas.includes('href="/luasf/">LuaSF</a>'), 'Project Atlas LuaSF bridge link is not canonical')

const packageJson = JSON.parse(read('package.json'))
check('R-TD5.2 npm validation entry', packageJson.scripts?.['technical-docs:validate-rtd5-2'] === 'node scripts/technical-docs/validate-rtd5-2.mjs', 'technical-docs:validate-rtd5-2 command is missing')

if (!buildOutputAvailable) {
  if (requireBuild) {
    check('built route validation required', false, 'docs/.vitepress/dist is absent; run npm run docs:build first')
  } else {
    console.log('NOT RUN: built canonical/legacy route resolution, redirect output, generated canonical metadata, and built internal-link checks — docs/.vitepress/dist is absent')
  }
}

for (const item of checks) {
  console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.condition || !item.detail ? '' : ` — ${item.detail}`}`)
}

if (failures.length) {
  console.error(`\nTechnical Docs R-TD5.2 validation: FAIL (${failures.length} failures)`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`\nTechnical Docs R-TD5.2 validation: PASS (${checks.length} source${buildOutputAvailable ? ' + build' : ''} checks; ${manifest.document_count} canonical documents + ${manifest.document_count} legacy compatibility stubs${buildOutputAvailable ? '' : '; build-output checks NOT RUN'})`)
