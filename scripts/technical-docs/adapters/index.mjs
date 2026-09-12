import { retainaiAdapter } from './retainai.mjs'
import { relationalstatsAdapter } from './relationalstats.mjs'
import { fdeRoadmapAdapter } from './fde-roadmap.mjs'

const adapters = new Map([
  [retainaiAdapter.id, retainaiAdapter],
  [relationalstatsAdapter.id, relationalstatsAdapter],
  [fdeRoadmapAdapter.id, fdeRoadmapAdapter]
])

export function getAdapter(source) {
  const adapterId = source.sync_adapter

  if (!adapterId) {
    throw new Error(`${source.project_id}: no sync_adapter is declared`)
  }

  const adapter = adapters.get(adapterId)

  if (!adapter) {
    throw new Error(`${source.project_id}: unknown sync_adapter ${adapterId}`)
  }

  if (!adapter.supportedModes.includes(source.source_mode)) {
    throw new Error(
      `${source.project_id}: adapter ${adapterId} does not support source_mode ${source.source_mode}`
    )
  }

  return adapter
}

export function knownAdapterIds() {
  return [...adapters.keys()].sort()
}
