import path from 'node:path'
import { runProcess } from './process.mjs'

export const retainaiAdapter = {
  id: 'retainai_v1',
  supportedModes: ['snapshot_sync'],

  async stage({ repositoryRoot, source, sourceRoot, stagingSiteRoot }) {
    const script = path.join(repositoryRoot, 'scripts/sync-retainai-docs.mjs')

    await runProcess(process.execPath, [script], {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        RETAINAI_REPO: sourceRoot,
        RETAINAI_REF: source.source_ref,
        TECHNICAL_DOCS_TARGET_ROOT: stagingSiteRoot
      }
    })
  }
}
