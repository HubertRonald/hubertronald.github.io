import path from 'node:path'
import { runProcess } from './process.mjs'

export const relationalstatsAdapter = {
  id: 'relationalstats_v1',
  supportedModes: ['moving_ref_sync'],

  async stage({ repositoryRoot, source, sourceRoot, stagingSiteRoot }) {
    const script = path.join(repositoryRoot, 'scripts/sync-relationalstats-docs.mjs')

    await runProcess(process.execPath, [script], {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        RELATIONALSTATS_REPO: sourceRoot,
        RELATIONALSTATS_BLOB_BASE: `${source.source_repository}/blob/${source.source_ref}`,
        TECHNICAL_DOCS_TARGET_ROOT: stagingSiteRoot
      }
    })
  }
}
