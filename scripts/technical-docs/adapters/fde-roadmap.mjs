import path from 'node:path'
import { runProcess } from './process.mjs'

export const fdeRoadmapAdapter = {
  id: 'fde_roadmap_v1',
  supportedModes: ['snapshot_sync'],

  async stage({ repositoryRoot, source, sourceRoot, stagingSiteRoot, provenance }) {
    const script = path.join(repositoryRoot, 'scripts/sync-fde-roadmap-docs.mjs')

    await runProcess(process.execPath, [script], {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        FDE_ROADMAP_REPO: sourceRoot,
        FDE_ROADMAP_REF: source.source_ref,
        FDE_ROADMAP_RESOLVED_SHA: provenance.resolved_sha,
        TECHNICAL_DOCS_TARGET_ROOT: stagingSiteRoot
      }
    })
  }
}
