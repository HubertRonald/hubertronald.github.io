import fs from 'node:fs'
import path from 'node:path'
import {
  loadTechnicalDocsRegistry,
  publishedTechnicalDocs,
  repositoryRoot,
  validateTechnicalDocsRegistry
} from './registry.mjs'

const registry = loadTechnicalDocsRegistry()
const errors = validateTechnicalDocsRegistry(registry)
const expectedPublishedIds = ['gradientmesh', 'luasf', 'relationalstats', 'retainai', 'versovector']
const published = publishedTechnicalDocs(registry)
const publishedIds = published.map((source) => source.project_id).sort()

if (JSON.stringify(publishedIds) !== JSON.stringify(expectedPublishedIds)) {
  errors.push(`published source set mismatch: expected ${expectedPublishedIds.join(', ')}, got ${publishedIds.join(', ')}`)
}

const fdeCandidate = registry.candidates.find((candidate) => candidate.project_id === 'fde-roadmap')
if (!fdeCandidate || fdeCandidate.enabled !== false || fdeCandidate.integration_state !== 'candidate_future') {
  errors.push('fde-roadmap must remain a disabled candidate_future entry')
}

for (const source of published) {
  const sourcePath = path.join(repositoryRoot, source.site_source_path)
  const routeIndex = path.join(sourcePath, 'index.md')
  if (!fs.existsSync(sourcePath)) errors.push(`${source.project_id}: site_source_path does not exist: ${source.site_source_path}`)
  if (!fs.existsSync(routeIndex)) errors.push(`${source.project_id}: current route index does not exist: ${path.relative(repositoryRoot, routeIndex)}`)
}

const retainai = registry.sources.find((source) => source.project_id === 'retainai')
if (retainai?.source_ref !== 'v0.4.0-alpha.1' || retainai?.source_mode !== 'snapshot_sync') {
  errors.push('retainai: frozen v0.4.0-alpha.1 snapshot boundary changed')
}

const relationalstats = registry.sources.find((source) => source.project_id === 'relationalstats')
if (relationalstats?.source_ref !== 'main' || relationalstats?.source_mode !== 'moving_ref_sync') {
  errors.push('relationalstats: current main moving-ref declaration changed')
}

const gitignorePath = path.join(repositoryRoot, '.gitignore')
if (!fs.existsSync(gitignorePath)) {
  errors.push('.gitignore is missing; .vendor transient-work policy is not enforced')
} else {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8')
  if (!gitignore.split(/\r?\n/).some((line) => line.trim() === '.vendor/' || line.trim() === '.vendor')) {
    errors.push('.gitignore must ignore .vendor/')
  }
}

const hubIndex = path.join(repositoryRoot, 'docs/technical-docs/index.md')
if (!fs.existsSync(hubIndex)) errors.push('Technical Docs hub index is missing')

const approvedMigratedProjectIds = new Set(['versovector', 'luasf', 'gradientmesh', 'relationalstats', 'retainai'])
for (const source of published) {
  const migratedPath = path.join(repositoryRoot, 'docs/technical-docs', source.project_id)
  if (approvedMigratedProjectIds.has(source.project_id)) {
    if (!fs.existsSync(migratedPath)) {
      errors.push(`${source.project_id}: approved migrated source tree is missing at docs/technical-docs/${source.project_id}`)
    }
  } else if (fs.existsSync(migratedPath)) {
    errors.push(`${source.project_id}: unapproved route migration detected at docs/technical-docs/${source.project_id}`)
  }
}

if (errors.length) {
  console.error('Technical Docs registry validation: FAIL')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Technical Docs registry validation: PASS (${published.length} published sources; fde-roadmap disabled candidate)`)
console.log('Ownership boundaries, current routes, and .vendor policy validated.')
