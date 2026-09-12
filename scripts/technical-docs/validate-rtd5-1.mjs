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
const manifestPath = path.join(moduleDir, 'rtd5-1-versovector-content-manifest.json')
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

const versovector = registry.sources.find((source) => source.project_id === 'versovector')
check('VersoVector canonical prefix', versovector?.current_public_route === '/technical-docs/versovector/', `found ${versovector?.current_public_route}`)
check('VersoVector legacy prefix', JSON.stringify(versovector?.legacy_routes) === JSON.stringify(['/versovector/']), `found ${JSON.stringify(versovector?.legacy_routes)}`)
check('VersoVector canonical source path', versovector?.site_source_path === 'docs/technical-docs/versovector', `found ${versovector?.site_source_path}`)
check('VersoVector curated ownership path', JSON.stringify(versovector?.ownership?.curated_targets) === JSON.stringify(['docs/technical-docs/versovector/**']), `found ${JSON.stringify(versovector?.ownership?.curated_targets)}`)
check('VersoVector source mode unchanged', versovector?.source_mode === 'local_curated' && versovector?.sync_strategy === 'none' && !versovector?.sync_adapter, 'VersoVector lifecycle ownership changed')

const luasf = registry.sources.find((item) => item.project_id === 'luasf')
check(
  'authorized later migration: LuaSF R-TD5.2',
  luasf?.current_public_route === '/technical-docs/luasf/' &&
    luasf?.site_source_path === 'docs/technical-docs/luasf' &&
    fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/luasf/index.md')) &&
    fs.existsSync(path.join(repositoryRoot, 'docs/luasf/index.md')),
  'LuaSF is not in the authorized R-TD5.2 canonical + legacy compatibility state'
)
const gradientmesh = registry.sources.find((item) => item.project_id === 'gradientmesh')
check(
  'authorized later migration: GradientMesh R-TD5.3',
  gradientmesh?.current_public_route === '/technical-docs/gradientmesh/' &&
    gradientmesh?.site_source_path === 'docs/technical-docs/gradientmesh' &&
    fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/gradientmesh/index.md')) &&
    fs.existsSync(path.join(repositoryRoot, 'docs/gradientmesh/index.md')),
  'GradientMesh is not in the authorized R-TD5.3 canonical + legacy compatibility state'
)
const relationalstats = registry.sources.find((item) => item.project_id === 'relationalstats')
check(
  'authorized later migration: relationalstats R-TD5.4',
  relationalstats?.current_public_route === '/technical-docs/relationalstats/' &&
    relationalstats?.site_source_path === 'docs/technical-docs/relationalstats' &&
    fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/relationalstats/index.md')) &&
    fs.existsSync(path.join(repositoryRoot, 'docs/relationalstats/index.md')),
  'relationalstats is not in the authorized R-TD5.4 canonical + legacy compatibility state'
)

const retainai = registry.sources.find((item) => item.project_id === 'retainai')
check(
  'authorized later migration: RetainAI R-TD5.5',
  retainai?.current_public_route === '/technical-docs/retainai/' &&
    retainai?.site_source_path === 'docs/technical-docs/retainai' &&
    fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/retainai/index.md')) &&
    fs.existsSync(path.join(repositoryRoot, 'docs/retainai/index.md')),
  'RetainAI is not in the authorized R-TD5.5 canonical + legacy compatibility state'
)

const fdeRoadmap = registry.sources.find((source) => source.project_id === 'fde-roadmap')
check(
  'fde-roadmap authorized later-phase onboarding',
  fdeRoadmap?.enabled === true &&
    fdeRoadmap?.publication_status === 'published' &&
    fdeRoadmap?.source_mode === 'snapshot_sync' &&
    fdeRoadmap?.source_ref === 'v0.1.0' &&
    fdeRoadmap?.sync_adapter === 'fde_roadmap_v1' &&
    fdeRoadmap?.site_source_path === 'docs/technical-docs/fde-roadmap' &&
    fdeRoadmap?.current_public_route === '/technical-docs/fde-roadmap/' &&
    fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/fde-roadmap/index.md')) &&
    !fs.existsSync(path.join(repositoryRoot, 'docs/fde-roadmap')) &&
    !registry.candidates.some((candidate) => candidate.project_id === 'fde-roadmap'),
  'authorized R-TD6B state is missing or changed'
)

const canonicalRoot = path.join(repositoryRoot, manifest.canonical_root_after)
const legacyRoot = path.join(repositoryRoot, manifest.source_root_before)
check('before manifest document count', manifest.document_count === 9 && manifest.documents.length === 9, `manifest has ${manifest.documents.length}`)
check('canonical document count', fs.existsSync(canonicalRoot) && fs.readdirSync(canonicalRoot).filter((name) => name.endsWith('.md')).length === manifest.document_count, 'canonical document count differs from baseline')
check('legacy compatibility stub count', fs.existsSync(legacyRoot) && fs.readdirSync(legacyRoot).filter((name) => name.endsWith('.md')).length === manifest.document_count, 'legacy stub count differs from route inventory')

for (const document of manifest.documents) {
  const canonicalFile = path.join(canonicalRoot, document.relative_path)
  const legacyFile = path.join(legacyRoot, document.relative_path)
  const legacyRoute = routeFor(document.relative_path, '/versovector')
  const canonicalRoute = routeFor(document.relative_path, '/technical-docs/versovector')
  const expectedTarget = canonicalRoute

  check(`content hash preserved: ${document.relative_path}`, fs.existsSync(canonicalFile) && sha256(canonicalFile) === document.sha256, `expected ${document.sha256}${fs.existsSync(canonicalFile) ? `, got ${sha256(canonicalFile)}` : ', file missing'}`)

  const stub = fs.existsSync(legacyFile) ? fs.readFileSync(legacyFile, 'utf8') : ''
  check(`legacy stub source: ${legacyRoute}`, stub.includes('layout: false') && stub.includes('search: false') && stub.includes('http-equiv: refresh') && stub.includes('name: robots') && stub.includes(expectedTarget), `legacy stub does not redirect to ${expectedTarget}`)

  if (buildOutputAvailable) {
    const canonicalDist = distFileFor(document.relative_path, '/technical-docs/versovector')
    const legacyDist = distFileFor(document.relative_path, '/versovector')
    check(`canonical resolution: ${canonicalRoute}`, fs.existsSync(canonicalDist), `missing ${path.relative(repositoryRoot, canonicalDist)}`)
    check(`legacy resolution: ${legacyRoute}`, fs.existsSync(legacyDist), `missing ${path.relative(repositoryRoot, legacyDist)}`)

    if (fs.existsSync(canonicalDist)) {
      const canonicalHtml = fs.readFileSync(canonicalDist, 'utf8')
      const canonicalMetadataUrl = `https://hubertronald.dev${canonicalRoute === '/technical-docs/versovector/' ? canonicalRoute : `${canonicalRoute}/`}`
      check(`canonical metadata: ${canonicalRoute}`, canonicalHtml.includes(`rel="canonical" href="${canonicalMetadataUrl}"`) || canonicalHtml.includes(`href="${canonicalMetadataUrl}" rel="canonical"`), `canonical metadata does not point to ${canonicalMetadataUrl}`)
      check(`canonical internal links: ${canonicalRoute}`, !/href="\/versovector(?:\/|\")/.test(canonicalHtml), 'canonical page emits a legacy VersoVector href')
    }

    if (fs.existsSync(legacyDist)) {
      const legacyHtml = fs.readFileSync(legacyDist, 'utf8')
      const canonicalMetadataUrl = `https://hubertronald.dev${canonicalRoute === '/technical-docs/versovector/' ? canonicalRoute : `${canonicalRoute}/`}`
      check(`legacy redirect output: ${legacyRoute}`, /http-equiv="refresh"/i.test(legacyHtml) && legacyHtml.includes(expectedTarget), `built legacy page does not redirect to ${expectedTarget}`)
      check(`legacy canonical metadata: ${legacyRoute}`, legacyHtml.includes(`rel="canonical" href="${canonicalMetadataUrl}"`) || legacyHtml.includes(`href="${canonicalMetadataUrl}" rel="canonical"`), `legacy canonical metadata does not point to ${canonicalMetadataUrl}`)
    }
  }

}

const config = read('docs/.vitepress/config.mts')
const canonicalLinks = [
  '/technical-docs/versovector/',
  '/technical-docs/versovector/setup',
  '/technical-docs/versovector/data',
  '/technical-docs/versovector/notebooks',
  '/technical-docs/versovector/model-topology',
  '/technical-docs/versovector/pipeline',
  '/technical-docs/versovector/architecture',
  '/technical-docs/versovector/results',
  '/technical-docs/versovector/serving'
]
check('sidebar canonical prefix', config.includes("'/technical-docs/versovector/': [") && !config.includes("        '/versovector/': ["), 'VersoVector sidebar is not keyed by the canonical prefix')
check('sidebar canonical targets', canonicalLinks.every((link) => config.includes(`link: '${link}'`)), 'one or more VersoVector sidebar links are not canonical')
check('Docs active-state matching', config.includes("activeMatch: '^/(technical-docs|retainai|versovector|relationalstats|gradientmesh|luasf)(/|$)'"), 'Docs active match no longer covers canonical + legacy technical docs')
check('legacy canonical metadata mapping', config.includes("normalized.startsWith('/versovector/')") && config.includes("'/technical-docs/versovector/'"), 'legacy page canonical mapping is missing')

const hub = read('docs/.vitepress/theme/components/TechnicalDocsPage.vue')
check('hub canonical target remains registry-driven', hub.includes(':href="source.current_public_route"') && !hub.includes('/technical-docs/versovector/'), 'hub route was hard-coded instead of projected from registry')

const layout = read('docs/.vitepress/theme/components/PortfolioThemeLayout.vue')
check('docs context uses current registry prefix', layout.includes('prefix: source.current_public_route') && layout.includes('route.path.startsWith(item.prefix)'), 'docs context matching stopped using current_public_route')
check('mobile Docs active state', layout.includes('<MobilePortfolioNav v-if="context" active="docs" />'), 'canonical docs context does not activate mobile Docs')

const css = read('docs/.vitepress/theme/styles/sections/versovector.css')
check('VersoVector route-specific CSS migrated', css.includes('href="/technical-docs/versovector/') && !css.includes('href="/versovector'), 'sidebar icon selectors still target the legacy prefix')

const portfolio = read('docs/.vitepress/theme/content/portfolio.content.ts')
const cases = read('docs/.vitepress/theme/components/CaseStudiesPage.vue')
check('portfolio documentation target canonical', portfolio.includes('"documentation": "/technical-docs/versovector/"') && !portfolio.includes('"documentation": "/versovector/"'), 'Project Atlas documentation link is not canonical')
check('case-study documentation target canonical', cases.includes('href="/technical-docs/versovector/"') && !cases.includes('href="/versovector/"'), 'case-study docs action is not canonical')

const packageJson = JSON.parse(read('package.json'))
check('R-TD5.1 npm validation entry', packageJson.scripts?.['technical-docs:validate-rtd5-1'] === 'node scripts/technical-docs/validate-rtd5-1.mjs', 'technical-docs:validate-rtd5-1 command is missing')

if (!buildOutputAvailable) {
  if (requireBuild) {
    check('built route validation required', false, 'docs/.vitepress/dist is absent; run npm run docs:build first')
  } else {
    console.log('NOT RUN: built canonical/legacy route resolution and generated canonical metadata — docs/.vitepress/dist is absent')
  }
}

for (const item of checks) {
  console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.condition || !item.detail ? '' : ` — ${item.detail}`}`)
}

if (failures.length) {
  console.error(`\nTechnical Docs R-TD5.1 validation: FAIL (${failures.length} failures)`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`\nTechnical Docs R-TD5.1 validation: PASS (${checks.length} source${buildOutputAvailable ? ' + build' : ''} checks; ${manifest.document_count} canonical documents + ${manifest.document_count} legacy compatibility stubs${buildOutputAvailable ? '' : '; build-output checks NOT RUN'})`)
