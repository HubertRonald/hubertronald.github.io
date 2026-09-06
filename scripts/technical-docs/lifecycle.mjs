import crypto from 'node:crypto'
import {
  cp,
  lstat,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile
} from 'node:fs/promises'
import path from 'node:path'
import { repositoryRoot } from './registry.mjs'

export const provenanceLockRoot = 'technical_docs_source_locks'

export function normalizePath(value) {
  return value.split(path.sep).join('/')
}

export async function pathExists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

export function generatedTargetBase(target) {
  if (typeof target !== 'string' || !target.trim()) {
    throw new Error(`Invalid generated target: ${String(target)}`)
  }

  if (target.includes('*') && !target.endsWith('/**')) {
    throw new Error(`Unsupported generated target pattern: ${target}`)
  }

  return target.endsWith('/**') ? target.slice(0, -3) : target
}

export function isPathWithin(parent, child) {
  const relative = path.relative(path.resolve(parent), path.resolve(child))
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

export function getGeneratedTargetDescriptors(source, root = repositoryRoot) {
  const siteRoot = path.resolve(root, source.site_source_path)
  const curatedTargets = source.ownership?.curated_targets ?? []
  const generatedTargets = source.ownership?.generated_targets ?? []

  return generatedTargets.map((target) => {
    const base = generatedTargetBase(target)
    const livePath = path.resolve(root, base)

    if (!isPathWithin(siteRoot, livePath)) {
      throw new Error(`${source.project_id}: generated target escapes site_source_path: ${target}`)
    }

    for (const curatedTarget of curatedTargets) {
      const curatedBase = path.resolve(root, generatedTargetBase(curatedTarget))
      if (isPathWithin(curatedBase, livePath) || isPathWithin(livePath, curatedBase)) {
        throw new Error(`${source.project_id}: generated target overlaps curated target: ${target}`)
      }
    }

    return {
      declared: target,
      base,
      livePath,
      relativeToSite: normalizePath(path.relative(siteRoot, livePath))
    }
  })
}

export function lifecycleWorkspacePaths(sourceId, root = repositoryRoot) {
  const workspaceRoot = path.join(root, '.vendor', 'technical-docs', sourceId)
  return {
    workspaceRoot,
    sourceRoot: path.join(workspaceRoot, 'source'),
    stagingRoot: path.join(workspaceRoot, 'staging'),
    fetchProvenancePath: path.join(workspaceRoot, 'fetch-provenance.json'),
    transactionBackupRoot: path.join(workspaceRoot, 'transaction-backup')
  }
}

export function lockPathForSource(sourceId, root = repositoryRoot) {
  return path.join(root, provenanceLockRoot, `${sourceId}.json`)
}

export function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}

export function createProvenanceRecord(source, adapterId, resolvedSha) {
  if (!/^[0-9a-f]{40}$/i.test(resolvedSha)) {
    throw new Error(`${source.project_id}: resolved SHA must be a full 40-character Git commit SHA`)
  }

  return {
    schema_version: 1,
    source_id: source.project_id,
    source_repository: source.source_repository,
    source_mode: source.source_mode,
    requested_ref: source.source_ref,
    resolved_sha: resolvedSha.toLowerCase(),
    source_scopes: [...(source.sync_scopes ?? [])],
    generated_targets: [...(source.ownership?.generated_targets ?? [])],
    sync_strategy: source.sync_strategy,
    sync_adapter: adapterId
  }
}

export async function writeFetchProvenance(source, adapterId, resolvedSha, root = repositoryRoot) {
  const paths = lifecycleWorkspacePaths(source.project_id, root)
  await mkdir(paths.workspaceRoot, { recursive: true })
  const record = createProvenanceRecord(source, adapterId, resolvedSha)
  await writeFile(paths.fetchProvenancePath, stableJson(record), 'utf8')
  return record
}

export async function readFetchProvenance(source, root = repositoryRoot) {
  const paths = lifecycleWorkspacePaths(source.project_id, root)
  if (!(await pathExists(paths.fetchProvenancePath))) {
    throw new Error(`${source.project_id}: fetch provenance is missing; run fetch first`)
  }
  return JSON.parse(await readFile(paths.fetchProvenancePath, 'utf8'))
}

export function validateProvenanceRecord(source, adapterId, record) {
  const errors = []

  if (record.schema_version !== 1) errors.push('schema_version must be 1')
  if (record.source_id !== source.project_id) errors.push('source_id mismatch')
  if (record.source_repository !== source.source_repository) errors.push('source_repository mismatch')
  if (record.source_mode !== source.source_mode) errors.push('source_mode mismatch')
  if (record.requested_ref !== source.source_ref) errors.push('requested_ref mismatch')
  if (!/^[0-9a-f]{40}$/i.test(record.resolved_sha ?? '')) errors.push('resolved_sha must be an immutable 40-character SHA')
  if (record.sync_adapter !== adapterId) errors.push('sync_adapter mismatch')

  const expectedScopes = JSON.stringify(source.sync_scopes ?? [])
  if (JSON.stringify(record.source_scopes ?? []) !== expectedScopes) {
    errors.push('source_scopes mismatch')
  }

  const expectedTargets = JSON.stringify(source.ownership?.generated_targets ?? [])
  if (JSON.stringify(record.generated_targets ?? []) !== expectedTargets) {
    errors.push('generated_targets mismatch')
  }
  if (record.sync_strategy !== source.sync_strategy) errors.push('sync_strategy mismatch')

  return errors
}

async function walkFiles(rootDir) {
  const files = []

  if (!(await pathExists(rootDir))) return files

  const entries = await readdir(rootDir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name)
    const info = await lstat(fullPath)

    if (info.isSymbolicLink()) {
      throw new Error(`Symlink is not allowed in staged generated output: ${fullPath}`)
    }

    if (entry.isDirectory()) {
      files.push(...await walkFiles(fullPath))
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }

  return files
}

export async function validateStagedOutput(source, stagingSiteRoot, root = repositoryRoot) {
  const descriptors = getGeneratedTargetDescriptors(source, root)

  if (descriptors.length === 0) {
    throw new Error(`${source.project_id}: synchronized source declares no generated targets`)
  }

  for (const descriptor of descriptors) {
    const stagedPath = path.join(stagingSiteRoot, descriptor.relativeToSite)
    if (!(await pathExists(stagedPath))) {
      throw new Error(`${source.project_id}: staged generated target is missing: ${descriptor.declared}`)
    }
  }

  const stagedFiles = await walkFiles(stagingSiteRoot)
  if (stagedFiles.length === 0) {
    throw new Error(`${source.project_id}: staging output is empty`)
  }

  for (const stagedFile of stagedFiles) {
    const relative = normalizePath(path.relative(stagingSiteRoot, stagedFile))
    const owned = descriptors.some((descriptor) => {
      const base = descriptor.relativeToSite
      return relative === base || relative.startsWith(`${base}/`)
    })

    if (!owned) {
      throw new Error(`${source.project_id}: adapter produced undeclared output: ${relative}`)
    }
  }

  return { descriptors, stagedFiles }
}

async function hashPath(targetPath, label) {
  const rows = []

  if (!(await pathExists(targetPath))) {
    rows.push(`${label}\t<MISSING>`)
  } else {
    const info = await stat(targetPath)
    if (info.isFile()) {
      const digest = crypto.createHash('sha256').update(await readFile(targetPath)).digest('hex')
      rows.push(`${label}\t${digest}`)
    } else {
      const files = (await walkFiles(targetPath)).sort()
      for (const file of files) {
        const relative = normalizePath(path.relative(targetPath, file))
        const digest = crypto.createHash('sha256').update(await readFile(file)).digest('hex')
        rows.push(`${label}/${relative}\t${digest}`)
      }
    }
  }

  return rows
}

export async function generatedContentManifest(source, siteRoot, root = repositoryRoot) {
  const descriptors = getGeneratedTargetDescriptors(source, root)
  const rows = []

  for (const descriptor of descriptors) {
    const targetPath = path.join(siteRoot, descriptor.relativeToSite)
    rows.push(...await hashPath(targetPath, descriptor.declared))
  }

  return rows.sort()
}

export async function compareStagedToLive(source, stagingSiteRoot, root = repositoryRoot) {
  const liveSiteRoot = path.resolve(root, source.site_source_path)
  const staged = await generatedContentManifest(source, stagingSiteRoot, root)
  const live = await generatedContentManifest(source, liveSiteRoot, root)

  return {
    changed: JSON.stringify(staged) !== JSON.stringify(live),
    staged,
    live
  }
}

export async function publishGeneratedTargets({
  source,
  stagingSiteRoot,
  provenance,
  root = repositoryRoot,
  workspaceRoot
}) {
  const descriptors = getGeneratedTargetDescriptors(source, root)
  const effectiveWorkspace = workspaceRoot ?? lifecycleWorkspacePaths(source.project_id, root).workspaceRoot
  const backupRoot = path.join(effectiveWorkspace, 'transaction-backup')
  const lockPath = lockPathForSource(source.project_id, root)
  const stagedLock = path.join(effectiveWorkspace, 'staged-provenance-lock.json')
  const lockBackup = path.join(backupRoot, '__provenance_lock__.json')
  const moved = []
  let newLockInstalled = false

  await validateStagedOutput(source, stagingSiteRoot, root)
  await rm(backupRoot, { recursive: true, force: true })
  await mkdir(backupRoot, { recursive: true })
  await mkdir(path.dirname(stagedLock), { recursive: true })
  await writeFile(stagedLock, stableJson(provenance), 'utf8')

  try {
    for (const [index, descriptor] of descriptors.entries()) {
      const stagedPath = path.join(stagingSiteRoot, descriptor.relativeToSite)
      const backupPath = path.join(backupRoot, String(index))
      const existed = await pathExists(descriptor.livePath)

      const transactionItem = { descriptor, backupPath, existed, installed: false }
      moved.push(transactionItem)

      if (existed) {
        await mkdir(path.dirname(backupPath), { recursive: true })
        await rename(descriptor.livePath, backupPath)
      }

      await mkdir(path.dirname(descriptor.livePath), { recursive: true })
      await rename(stagedPath, descriptor.livePath)
      transactionItem.installed = true
    }

    await mkdir(path.dirname(lockPath), { recursive: true })
    if (await pathExists(lockPath)) {
      await rename(lockPath, lockBackup)
    }
    await rename(stagedLock, lockPath)
    newLockInstalled = true
  } catch (error) {
    if (newLockInstalled && await pathExists(lockPath)) {
      await rm(lockPath, { recursive: true, force: true })
    }
    if (await pathExists(lockBackup)) {
      await mkdir(path.dirname(lockPath), { recursive: true })
      await rename(lockBackup, lockPath)
    }

    for (const item of [...moved].reverse()) {
      if (item.installed && await pathExists(item.descriptor.livePath)) {
        await rm(item.descriptor.livePath, { recursive: true, force: true })
      }
      if (item.existed && await pathExists(item.backupPath)) {
        await mkdir(path.dirname(item.descriptor.livePath), { recursive: true })
        await rename(item.backupPath, item.descriptor.livePath)
      }
    }

    throw error
  } finally {
    await rm(backupRoot, { recursive: true, force: true })
    await rm(stagedLock, { force: true })
  }
}

export async function copyTree(source, destination) {
  await rm(destination, { recursive: true, force: true })
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(source, destination, { recursive: true, force: true })
}
