import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {
  loadTechnicalDocsRegistry,
  repositoryRoot,
  validateTechnicalDocsRegistry
} from './registry.mjs'
import { validateProvenanceRecord } from './lifecycle.mjs'

const manifestPath = path.join(repositoryRoot, 'scripts/technical-docs/rtd6-fde-roadmap-content-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const registry = loadTechnicalDocsRegistry()
const failures = []
const checks = []
const requireBuild = process.argv.includes('--require-build')
const distRoot = path.join(repositoryRoot, 'docs/.vitepress/dist')
const buildOutputAvailable = fs.existsSync(distRoot)
const publicRoot = path.join(repositoryRoot, 'docs/technical-docs/fde-roadmap')
const vendorSourceRoot = path.join(repositoryRoot, '.vendor/technical-docs/fde-roadmap/source')

const protectedTreeDigests = {
  versovector: '2525fa968b624350cc2410dc469ca74b7ff4e578f4d541760d53817065100aa2',
  luasf: '63677cb83c1716c3b97a746f079c524215a118cc84c36c1b5ebfefa520ca37af',
  gradientmesh: '040e787d9eb38cdca4aa385714c2f74b63314db2a0425d489d7f88b8199d5d30',
  relationalstats: '487bc9c51074ee257e1c4943783cbd745e6efdcf1499875614950debd99fa01b',
  retainai: '87d70527e30e591454befea08c982baa0be66ac9cb3b70723bf69927cf49b870'
}

const frozenArchitectureHashes = {
  'scripts/technical-docs/lifecycle.mjs': '72f4d2f150c2430e83c980efe5e6724eb6beed71e39ed0d71c74e035b5c07af1',
  'scripts/technical-docs/runner.mjs': 'b9b0706859f8f57dca6a097b9390c95246510dcac568ca01286768718f81ff01',
  'technical_docs_source_lock.schema.json': '4f66190b14f7cad65f0f536dafc8bb7759449c36f5c6a7c2bfb877773af08430'
}

function check(name, condition, detail = '') {
  checks.push({ name, condition, detail })
  if (!condition) failures.push(`${name}: ${detail || 'condition failed'}`)
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
}

function treeDigest(root) {
  const rows = []
  function walk(dir) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.isFile()) rows.push(`${path.relative(root, full).split(path.sep).join('/')}\0${sha256(full)}\n`)
    }
  }
  walk(root)
  return crypto.createHash('sha256').update(rows.join('')).digest('hex')
}

function markdownFiles(root) {
  if (!fs.existsSync(root)) return []
  const files = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full)
    }
  }
  walk(root)
  return files.sort()
}

function pngFiles(root) {
  if (!fs.existsSync(root)) return []
  const files = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.isFile() && entry.name.endsWith('.png')) files.push(full)
    }
  }
  walk(root)
  return files.sort()
}

function extractMarkdownLinks(text) {
  return [...text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1].trim().replace(/^<|>$/g, ''))
}

function localMarkdownLinkResolves(filePath, href) {
  if (!href || href.startsWith('#') || href.startsWith('/') || /^(https?:|mailto:|tel:|data:)/i.test(href)) return true
  const pathname = href.split('#', 1)[0]
  if (!pathname) return true
  const target = path.resolve(path.dirname(filePath), pathname)
  const candidates = [target]
  if (!path.extname(target)) candidates.push(`${target}.md`, path.join(target, 'index.md'))
  return candidates.some((candidate) => fs.existsSync(candidate))
}

function distFileForRoute(route) {
  const clean = route.replace(/^\//, '').replace(/\/$/, '')
  if (!clean) return path.join(distRoot, 'index.html')
  if (route.endsWith('/')) return path.join(distRoot, clean, 'index.html')
  return path.join(distRoot, `${clean}.html`)
}

function canonicalUrl(route) {
  return `https://hubertronald.dev${route.endsWith('/') ? route : `${route}/`}`
}

const registryErrors = validateTechnicalDocsRegistry(registry)
check('registry schema', registryErrors.length === 0, registryErrors.join('; ') || 'valid')

const fde = registry.sources.find((source) => source.project_id === 'fde-roadmap')
check('registry source present', Boolean(fde), 'fde-roadmap missing from registry.sources')
check('registry source candidate removed', !registry.candidates.some((candidate) => candidate.project_id === 'fde-roadmap'), 'obsolete candidate entry remains')
check('source repository', fde?.source_repository === manifest.source_repository, `found ${fde?.source_repository}`)
check('source mode', fde?.source_mode === 'snapshot_sync', `found ${fde?.source_mode}`)
check('requested ref', fde?.source_ref === manifest.requested_ref, `found ${fde?.source_ref}`)
check('adapter id', fde?.sync_adapter === 'fde_roadmap_v1', `found ${fde?.sync_adapter}`)
check('sync strategy', fde?.sync_strategy === 'git_clone_transform', `found ${fde?.sync_strategy}`)
check('published state', fde?.enabled === true && fde?.publication_status === 'published', 'fde-roadmap is not enabled/published')
check('canonical public root', fde?.current_public_route === '/technical-docs/fde-roadmap/' && fde?.proposed_public_route === '/technical-docs/fde-roadmap/', 'canonical route mismatch')
check('no legacy route', Array.isArray(fde?.legacy_routes) && fde.legacy_routes.length === 0 && !fs.existsSync(path.join(repositoryRoot, 'docs/fde-roadmap')), 'legacy route or tree exists')
check('no Journey linkage', Array.isArray(fde?.builder_journey_stages) && fde.builder_journey_stages.length === 0, 'builder_journey_stages must remain empty')
check('field-guide type', fde?.documentation_type === 'field_guide', `found ${fde?.documentation_type}`)
check('evidence boundary registry', /does not upgrade Project Atlas evidence classification/i.test(fde?.evidence_scope ?? ''), 'registry evidence scope does not preserve the non-upgrade boundary')
check('update policy immutable', /explicit_owner_approved_immutable_snapshot_change_only/.test(fde?.update_policy ?? '') && /never follow main implicitly/.test(fde?.update_policy ?? ''), 'update policy is not immutable-owner-approved only')
check('provenance lock policy', fde?.provenance_lock_policy === 'required_when_sync_is_normalized_in_rtd4', `found ${fde?.provenance_lock_policy}`)

check('manifest project', manifest.project_id === 'fde-roadmap', `found ${manifest.project_id}`)
check('manifest repository', manifest.source_repository === 'https://github.com/HubertRonald/fde-roadmap', 'repository mismatch')
check('manifest requested ref', manifest.requested_ref === 'v0.1.0', `found ${manifest.requested_ref}`)
check('manifest resolved SHA', manifest.expected_resolved_sha === 'f896c19d182f8df03918f2c73a402e27a80ded16', `found ${manifest.expected_resolved_sha}`)
check('manifest source markdown count', manifest.route_producing_markdown_mapping?.length === 6 && manifest.expected_source_markdown_count === 6 && manifest.expected_synchronized_markdown_count === 6, 'expected six source/generated Markdown documents')
check('manifest public document count', manifest.expected_public_markdown_count === 7 && manifest.expected_curated_markdown_count === 1, 'expected seven public Markdown documents including curated root')
check('manifest PNG inventory count', manifest.png_assets?.length === 7 && manifest.expected_asset_count === 7, 'expected seven PNG assets')
check('manifest canonical route count', manifest.canonical_public_routes?.length === 7 && new Set(manifest.canonical_public_routes).size === 7, 'expected seven unique canonical routes')
check('manifest no reference/docs route', !manifest.canonical_public_routes.some((route) => route.includes('/reference/docs/')), 'reference/docs route leaked into manifest')
check('manifest excluded artifacts exact', JSON.stringify(manifest.intentionally_excluded_artifacts) === JSON.stringify(['docs/source-map.md', 'docs/image-generation-prompts.md', 'docs/fde-visual-system-contact-sheet.png']), 'excluded artifact contract changed')

const expectedCurated = ['docs/technical-docs/fde-roadmap/index.md']
const expectedGenerated = ['docs/technical-docs/fde-roadmap/guide.md', 'docs/technical-docs/fde-roadmap/reference/**', 'docs/technical-docs/fde-roadmap/assets/**']
check('ownership curated exact', JSON.stringify(fde?.ownership?.curated_targets) === JSON.stringify(expectedCurated), 'curated ownership mismatch')
check('ownership generated exact', JSON.stringify(fde?.ownership?.generated_targets) === JSON.stringify(expectedGenerated), 'generated ownership mismatch')
check('ownership manifest aligned', JSON.stringify(manifest.ownership?.curated) === JSON.stringify(expectedCurated) && JSON.stringify(manifest.ownership?.generated) === JSON.stringify(expectedGenerated), 'manifest ownership mismatch')

for (const [relativePath, expectedHash] of Object.entries(frozenArchitectureHashes)) {
  const full = path.join(repositoryRoot, relativePath)
  check(`frozen architecture: ${relativePath}`, fs.existsSync(full) && sha256(full) === expectedHash, `${relativePath} changed during R-TD6B`)
}

for (const [projectId, expectedDigest] of Object.entries(protectedTreeDigests)) {
  const root = path.join(repositoryRoot, 'docs/technical-docs', projectId)
  check(`no existing Technical Docs drift: ${projectId}`, treeDigest(root) === expectedDigest, `${projectId} content tree changed`)
}

const publicMarkdown = markdownFiles(publicRoot)
const expectedPublicRelative = [
  'guide.md',
  'index.md',
  'reference/changelog.md',
  'reference/citation.md',
  'reference/contributing.md',
  'reference/sources-and-provenance.md',
  'reference/visual-rationale.md'
].sort()
const actualPublicRelative = publicMarkdown.map((file) => path.relative(publicRoot, file).split(path.sep).join('/')).sort()
check('exact public Markdown inventory', JSON.stringify(actualPublicRelative) === JSON.stringify(expectedPublicRelative), `found ${actualPublicRelative.join(', ')}`)
check('public Markdown count', publicMarkdown.length === 7, `found ${publicMarkdown.length}`)
check('no public reference/docs tree', !fs.existsSync(path.join(publicRoot, 'reference/docs')), 'reference/docs tree exists')

const generatedPng = pngFiles(path.join(publicRoot, 'assets'))
check('exact generated PNG count', generatedPng.length === 7, `found ${generatedPng.length}`)
let generatedHashMatches = 0
let sourceHashMatches = 0
let byteEqualityMatches = 0
for (const asset of manifest.png_assets) {
  const target = path.join(publicRoot, asset.target)
  const targetExists = fs.existsSync(target)
  const generatedHash = targetExists ? sha256(target) : '<missing>'
  const generatedOk = generatedHash === asset.sha256
  if (generatedOk) generatedHashMatches += 1
  check(`generated PNG hash: ${path.basename(asset.target)}`, generatedOk, `expected ${asset.sha256}, found ${generatedHash}`)

  const source = path.join(vendorSourceRoot, asset.source)
  if (fs.existsSync(source)) {
    const sourceHash = sha256(source)
    const sourceOk = sourceHash === asset.sha256
    if (sourceOk) sourceHashMatches += 1
    if (sourceOk && targetExists && fs.readFileSync(source).equals(fs.readFileSync(target))) byteEqualityMatches += 1
    check(`source PNG hash: ${path.basename(asset.source)}`, sourceOk, `expected ${asset.sha256}, found ${sourceHash}`)
    check(`source/generated PNG byte equality: ${path.basename(asset.source)}`, sourceOk && targetExists && fs.readFileSync(source).equals(fs.readFileSync(target)), 'source and generated bytes differ')
  }
}
check('generated PNG hashes 7/7', generatedHashMatches === 7, `${generatedHashMatches}/7`)
if (fs.existsSync(vendorSourceRoot)) {
  check('source PNG hashes 7/7', sourceHashMatches === 7, `${sourceHashMatches}/7`)
  check('source/generated byte equality 7/7', byteEqualityMatches === 7, `${byteEqualityMatches}/7`)
}

const allPublicText = publicMarkdown.map((file) => fs.readFileSync(file, 'utf8')).join('\n')
let brokenLinks = []
for (const file of publicMarkdown) {
  const text = fs.readFileSync(file, 'utf8')
  for (const href of extractMarkdownLinks(text)) {
    if (!localMarkdownLinkResolves(file, href)) brokenLinks.push(`${path.relative(repositoryRoot, file)} -> ${href}`)
  }
}
check('generated/local Markdown links resolve', brokenLinks.length === 0, brokenLinks.join('; ') || 'all local links resolve')
check('reference/docs path segment absent', !allPublicText.includes('/reference/docs/') && !allPublicText.includes('reference/docs/'), 'reference/docs path leaked into public Markdown')
for (const excluded of manifest.intentionally_excluded_artifacts) {
  const basename = path.basename(excluded)
  check(`excluded artifact absent: ${basename}`, !fs.existsSync(path.join(publicRoot, basename)) && !allPublicText.includes(excluded) && !allPublicText.includes(basename), `${excluded} was created or referenced`)
}

const indexText = fs.readFileSync(path.join(publicRoot, 'index.md'), 'utf8')
const guideText = fs.readFileSync(path.join(publicRoot, 'guide.md'), 'utf8')
const provenanceText = fs.readFileSync(path.join(publicRoot, 'reference/sources-and-provenance.md'), 'utf8')
check('independent synthesis disclosure', /independent visual field guide/i.test(indexText) && /independent/i.test(guideText) && /independently curated synthesis/i.test(provenanceText), 'independent-synthesis boundary is incomplete')
check('source-corpus attribution disclosure', /Primary Source Corpus/.test(provenanceText) && /Source corpus/.test(provenanceText) && /Editorial synthesis/.test(provenanceText), 'source-corpus attribution boundary is incomplete')
check('Atlas evidence non-upgrade disclosure', /without changing the Project Atlas evidence map/i.test(indexText) && /not evidence that every activity described/i.test(indexText), 'Atlas evidence boundary disclosure is missing')
check('no Journey links in fde public Markdown', !/\]\(\/journey\//.test(allPublicText) && !/href=["']\/journey\//.test(allPublicText), 'FDE docs link into Builder Journey')

const lockPath = path.join(repositoryRoot, 'technical_docs_source_locks/fde-roadmap.json')
check('provenance lock present', fs.existsSync(lockPath), 'technical_docs_source_locks/fde-roadmap.json is missing')
if (fs.existsSync(lockPath) && fde) {
  const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'))
  const lockErrors = validateProvenanceRecord(fde, 'fde_roadmap_v1', lock)
  check('provenance lock valid', lockErrors.length === 0, lockErrors.join('; ') || 'valid')
  check('provenance requested ref exact', lock.requested_ref === 'v0.1.0', `found ${lock.requested_ref}`)
  check('provenance resolved SHA exact', lock.resolved_sha === 'f896c19d182f8df03918f2c73a402e27a80ded16', `found ${lock.resolved_sha}`)
}

const adapters = fs.readFileSync(path.join(repositoryRoot, 'scripts/technical-docs/adapters/index.mjs'), 'utf8')
check('adapter registered', adapters.includes("import { fdeRoadmapAdapter } from './fde-roadmap.mjs'") && adapters.includes('[fdeRoadmapAdapter.id, fdeRoadmapAdapter]'), 'fde-roadmap adapter is not registered')
const transformer = fs.readFileSync(path.join(repositoryRoot, 'scripts/sync-fde-roadmap-docs.mjs'), 'utf8')
check('transformer stage-only guard', transformer.includes('refuses direct writes to docs/technical-docs/fde-roadmap'), 'direct-public-write guard is missing')
check('transformer manifest-driven', transformer.includes('rtd6-fde-roadmap-content-manifest.json') && transformer.includes('Unexpected route-producing Markdown inventory'), 'manifest/inventory gate is missing')

const hub = fs.readFileSync(path.join(repositoryRoot, 'docs/.vitepress/theme/components/TechnicalDocsPage.vue'), 'utf8')
check('hub registry projection', hub.includes('technical_docs_source_registry.json') && !hub.includes('fde-roadmap'), 'hub is not purely registry-driven for FDE')
check('Field guide presentation label', hub.includes("if (type === 'field_guide') return 'Field guide'"), 'field_guide label mapping is missing')

const config = fs.readFileSync(path.join(repositoryRoot, 'docs/.vitepress/config.mts'), 'utf8')
const sidebarRoutes = [
  '/technical-docs/fde-roadmap/',
  '/technical-docs/fde-roadmap/guide',
  '/technical-docs/fde-roadmap/reference/sources-and-provenance',
  '/technical-docs/fde-roadmap/reference/visual-rationale',
  '/technical-docs/fde-roadmap/reference/citation',
  '/technical-docs/fde-roadmap/reference/contributing',
  '/technical-docs/fde-roadmap/reference/changelog'
]
check('sidebar group present', config.includes("'/technical-docs/fde-roadmap/': ["), 'fde-roadmap sidebar group is missing')
for (const route of sidebarRoutes) check(`sidebar route: ${route}`, config.includes(`link: '${route}'`), `${route} is missing from sidebar`)
check('sidebar no reference/docs', !config.includes('/technical-docs/fde-roadmap/reference/docs/'), 'reference/docs route appears in config')
check('global navigation unchanged', config.includes("{ text: 'Work', link: '/projects/', activeMatch: '^/projects(/|$)' }") && config.includes("text: 'Journey'") && config.includes("link: '/journey/'") && config.includes("text: 'Docs'") && config.includes("link: '/technical-docs/'"), 'global Home/Work/Journey/Docs navigation contract changed')

const packageJson = JSON.parse(fs.readFileSync(path.join(repositoryRoot, 'package.json'), 'utf8'))
check('R-TD6 npm validation entry', packageJson.scripts?.['technical-docs:validate-rtd6'] === 'node scripts/technical-docs/validate-rtd6.mjs', 'technical-docs:validate-rtd6 command is missing')

const qualityMode = fs.statSync(path.join(repositoryRoot, 'scripts/audit/landing-quality-check.py')).mode & 0o777
check('landing-quality mode preserved', qualityMode === 0o755, `found ${qualityMode.toString(8)}`)

console.log('\nBUILD-OUTPUT CHECKS')
if (!buildOutputAvailable) {
  if (requireBuild) check('built route validation required', false, 'docs/.vitepress/dist is absent; run npm run docs:build first')
  else console.log('NOT RUN: R-TD6 build-output route/internal-link checks — docs/.vitepress/dist is absent')
} else {
  for (const route of manifest.canonical_public_routes) {
    const distFile = distFileForRoute(route)
    check(`built canonical route: ${route}`, fs.existsSync(distFile), `missing ${path.relative(repositoryRoot, distFile)}`)
    if (fs.existsSync(distFile)) {
      const html = fs.readFileSync(distFile, 'utf8')
      const expectedCanonical = canonicalUrl(route)
      check(`built canonical metadata: ${route}`, html.includes(`rel="canonical" href="${expectedCanonical}"`) || html.includes(`href="${expectedCanonical}" rel="canonical"`), `missing canonical ${expectedCanonical}`)
      check(`built no legacy FDE href: ${route}`, !/href=["']\/fde-roadmap(?:\/|["'])/.test(html), 'legacy /fde-roadmap href emitted')
      check(`built no reference/docs href: ${route}`, !html.includes('/technical-docs/fde-roadmap/reference/docs/'), 'reference/docs href emitted')
    }
  }
  check('no built reference/docs directory', !fs.existsSync(path.join(distRoot, 'technical-docs/fde-roadmap/reference/docs')), 'build emitted reference/docs tree')
  check('no built legacy FDE route', !fs.existsSync(path.join(distRoot, 'fde-roadmap')), 'build emitted /fde-roadmap route')
}

for (const item of checks) console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}${item.condition || !item.detail ? '' : ` — ${item.detail}`}`)

if (failures.length) {
  console.error(`\nTechnical Docs R-TD6 validation: FAIL (${failures.length} failures)`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`\nTechnical Docs R-TD6 validation: PASS (${checks.length} checks; 7 canonical Markdown routes; 7 PNG assets; build-output checks ${buildOutputAvailable ? 'PASS' : 'NOT RUN'})`)
