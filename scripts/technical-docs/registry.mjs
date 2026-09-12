import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const moduleDir = path.dirname(fileURLToPath(import.meta.url))
export const repositoryRoot = path.resolve(moduleDir, '../..')
export const registryPath = path.join(repositoryRoot, 'technical_docs_source_registry.json')

export function loadTechnicalDocsRegistry() {
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'))
}

export function publishedTechnicalDocs(registry = loadTechnicalDocsRegistry()) {
  return registry.sources.filter((source) => source.enabled && source.publication_status === 'published')
}

export function validateTechnicalDocsRegistry(registry = loadTechnicalDocsRegistry()) {
  const errors = []
  const allowedModes = new Set([
    'local_curated',
    'local_curated_remote_assets',
    'snapshot_sync',
    'moving_ref_sync',
    'external_link',
    'undecided'
  ])
  const allowedSyncStrategies = new Set(['none', 'git_clone_transform', 'external_link'])

  if (registry.schema_version !== 1) errors.push('schema_version must be 1')
  if (registry.public_hub_route !== '/technical-docs/') errors.push('public_hub_route must be /technical-docs/')
  if (!Array.isArray(registry.sources)) errors.push('sources must be an array')
  if (!Array.isArray(registry.candidates)) errors.push('candidates must be an array')
  if (errors.length) return errors

  const ids = new Set()
  for (const source of registry.sources) {
    const required = [
      'project_id', 'display_name', 'source_repository', 'source_mode', 'site_source_path',
      'current_public_route', 'proposed_public_route', 'sync_strategy', 'publication_status',
      'documentation_type', 'documentation_scope', 'evidence_scope', 'project_atlas_relationship',
      'builder_journey_stages', 'update_policy', 'ownership', 'provenance_lock_policy', 'enabled'
    ]

    for (const field of required) {
      if (source[field] === undefined || source[field] === '') {
        errors.push(`${source.project_id || '<unknown>'}: missing ${field}`)
      }
    }

    if (ids.has(source.project_id)) errors.push(`${source.project_id}: duplicate project_id`)
    ids.add(source.project_id)

    if (!allowedModes.has(source.source_mode)) errors.push(`${source.project_id}: unsupported source_mode ${source.source_mode}`)
    if (!allowedSyncStrategies.has(source.sync_strategy)) errors.push(`${source.project_id}: unsupported sync_strategy ${source.sync_strategy}`)
    if (!source.current_public_route?.startsWith('/') || !source.current_public_route?.endsWith('/')) {
      errors.push(`${source.project_id}: current_public_route must be an absolute trailing-slash route`)
    }
    if (!source.proposed_public_route?.startsWith('/technical-docs/')) {
      errors.push(`${source.project_id}: proposed_public_route must remain under /technical-docs/`)
    }
    if (!Array.isArray(source.builder_journey_stages)) errors.push(`${source.project_id}: builder_journey_stages must be an array`)
    if (!Array.isArray(source.technical_domain) || source.technical_domain.length === 0) {
      errors.push(`${source.project_id}: technical_domain must be non-empty`)
    }

    const curated = source.ownership?.curated_targets
    const generated = source.ownership?.generated_targets
    if (!Array.isArray(curated) || !Array.isArray(generated)) {
      errors.push(`${source.project_id}: ownership must declare curated_targets and generated_targets arrays`)
    } else {
      for (const generatedTarget of generated) {
        if (curated.some((curatedTarget) => targetsOverlap(curatedTarget, generatedTarget))) {
          errors.push(`${source.project_id}: generated target overlaps curated ownership: ${generatedTarget}`)
        }
      }
      for (let index = 0; index < generated.length; index += 1) {
        for (let other = index + 1; other < generated.length; other += 1) {
          if (targetsOverlap(generated[index], generated[other])) {
            errors.push(`${source.project_id}: generated targets overlap each other: ${generated[index]} / ${generated[other]}`)
          }
        }
      }
    }

    const synchronizedMode = source.source_mode === 'snapshot_sync' || source.source_mode === 'moving_ref_sync'

    if (source.source_mode === 'snapshot_sync' && !source.source_ref) {
      errors.push(`${source.project_id}: snapshot_sync requires source_ref`)
    }
    if (source.source_mode === 'moving_ref_sync' && !source.provenance_lock_policy.startsWith('required_')) {
      errors.push(`${source.project_id}: moving_ref_sync requires a provenance lock policy`)
    }
    if (synchronizedMode && (typeof source.sync_adapter !== 'string' || !source.sync_adapter)) {
      errors.push(`${source.project_id}: synchronized source requires sync_adapter`)
    }
    if (synchronizedMode && (!Array.isArray(source.sync_scopes) || source.sync_scopes.length === 0)) {
      errors.push(`${source.project_id}: synchronized source requires non-empty sync_scopes`)
    }
    if (!synchronizedMode && source.sync_adapter) {
      errors.push(`${source.project_id}: sync_adapter is only valid for synchronized source modes`)
    }
    if (source.source_mode.startsWith('local_curated') && generated?.length) {
      errors.push(`${source.project_id}: local-curated sources must not declare generated targets in this foundation phase`)
    }
    if (source.source_mode === 'undecided' && (source.enabled || source.publication_status === 'published')) {
      errors.push(`${source.project_id}: undecided sources cannot be enabled or published`)
    }
  }

  return errors
}

function targetsOverlap(a, b) {
  const normalize = (value) => value.replace(/\/\*\*$/, '').replace(/\/$/, '')
  const left = normalize(a)
  const right = normalize(b)
  return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`)
}
