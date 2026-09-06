import fs from 'node:fs'
import path from 'node:path'
import {
  loadTechnicalDocsRegistry,
  publishedTechnicalDocs,
  repositoryRoot,
  validateTechnicalDocsRegistry
} from './registry.mjs'

const failures = []
const checks = []

function check(name, condition, detail) {
  checks.push({ name, condition, detail })
  if (!condition) failures.push(`${name}: ${detail}`)
}

function read(relativePath) {
  return fs.readFileSync(path.join(repositoryRoot, relativePath), 'utf8')
}

const registry = loadTechnicalDocsRegistry()
const registryErrors = validateTechnicalDocsRegistry(registry)
check('registry schema', registryErrors.length === 0, registryErrors.join('; ') || 'valid')

const published = publishedTechnicalDocs(registry)
check('published docs count', published.length === 5, `expected 5, found ${published.length}`)
check(
  'fde-roadmap disabled',
  registry.candidates.some((candidate) => candidate.project_id === 'fde-roadmap' && candidate.enabled === false),
  'fde-roadmap must remain candidate-only and disabled'
)

check('hub route', fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs/index.md')), 'docs/technical-docs/index.md is missing')
check(
  'no route migration',
  published.every((source) => !fs.existsSync(path.join(repositoryRoot, 'docs/technical-docs', source.project_id))),
  'a project tree was moved under docs/technical-docs/'
)
check(
  'legacy project routes',
  published.every((source) => fs.existsSync(path.join(repositoryRoot, source.site_source_path, 'index.md'))),
  'one or more current project route roots are missing'
)

const config = read('docs/.vitepress/config.mts')
check('desktop Docs nav', config.includes("text: 'Docs'") && config.includes("link: '/technical-docs/'"), 'Docs primary navigation entry is missing')
check(
  'Docs legacy active match',
  config.includes("activeMatch: '^/(technical-docs|retainai|versovector|relationalstats|gradientmesh|luasf)(/|$)'"),
  'Docs does not activate on hub + legacy documentation roots'
)
check(
  'Work no longer owns docs routes',
  config.includes("{ text: 'Work', link: '/projects/', activeMatch: '^/projects(/|$)' }"),
  'Work active match still includes technical documentation roots'
)
check('GitHub VitePress utility', config.includes('socialLinks') && config.includes("icon: 'github'"), 'GitHub social utility is missing')

const mobile = read('docs/.vitepress/theme/components/MobilePortfolioNav.vue')
const mobileIds = [...mobile.matchAll(/\{ id: '([^']+)'/g)].map((match) => match[1])
check(
  'mobile primary nav',
  JSON.stringify(mobileIds) === JSON.stringify(['home', 'work', 'journey', 'docs']),
  `expected home/work/journey/docs, found ${mobileIds.join('/')}`
)
check('mobile Docs internal', mobile.includes("href: '/technical-docs/'") && !mobile.includes("id: 'github'"), 'GitHub still occupies a primary mobile slot')

const header = read('docs/.vitepress/theme/components/LandingHeader.vue')
check('portfolio header Docs', header.includes('href="/technical-docs/"') && header.includes("active === 'docs'"), 'Docs is missing from the custom portfolio header')
check('portfolio header GitHub utility', header.includes('https://github.com/HubertRonald'), 'GitHub utility link is missing from the custom header')

const footer = read('docs/.vitepress/theme/components/LandingFooter.vue')
check('portfolio footer Docs', footer.includes('href="/technical-docs/"'), 'Docs is missing from the portfolio footer navigation')

const layout = read('docs/.vitepress/theme/components/PortfolioThemeLayout.vue')
check('docs layout registry-driven', layout.includes('technical_docs_source_registry.json'), 'docs route context is not sourced from the registry')
check('docs mobile active state', layout.includes('active="docs"'), 'technical-doc routes do not activate Docs on mobile')

const contextStrip = read('docs/.vitepress/theme/components/DepthContextStrip.vue')
check('context back to Docs', contextStrip.includes('Back to Technical Docs'), 'technical-doc context strip lacks hub return link')

const docsFooter = read('docs/.vitepress/theme/components/DocsFooter.vue')
check('compact docs footer hub link', docsFooter.includes('href="/technical-docs/"'), 'compact docs footer lacks Technical Docs link')
check('compact docs footer source link', docsFooter.includes('sourceRepository'), 'compact docs footer lacks source-repository utility')

const hubComponent = read('docs/.vitepress/theme/components/TechnicalDocsPage.vue')
check('hub registry projection', hubComponent.includes('technical_docs_source_registry.json'), 'hub does not project registry data')
check('hub no candidate hardcode', !hubComponent.includes('fde-roadmap'), 'candidate source was hard-coded into the public hub')

for (const item of checks) {
  console.log(`${item.condition ? 'PASS' : 'FAIL'}: ${item.name}`)
}

if (failures.length) {
  console.error('\nTechnical Docs foundation validation: FAIL')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`\nTechnical Docs foundation validation: PASS (${checks.length} checks)`)
