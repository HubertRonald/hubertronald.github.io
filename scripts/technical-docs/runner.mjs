#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdir, readFile, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import {
  loadTechnicalDocsRegistry,
  repositoryRoot,
  validateTechnicalDocsRegistry
} from './registry.mjs'
import { getAdapter } from './adapters/index.mjs'
import {
  compareStagedToLive,
  getGeneratedTargetDescriptors,
  lifecycleWorkspacePaths,
  lockPathForSource,
  pathExists,
  publishGeneratedTargets,
  readFetchProvenance,
  validateProvenanceRecord,
  validateStagedOutput,
  writeFetchProvenance
} from './lifecycle.mjs'

const SYNC_MODES = new Set(['snapshot_sync', 'moving_ref_sync'])

function usage() {
  console.log(`Technical Docs lifecycle\n\nUsage:\n  node scripts/technical-docs/runner.mjs fetch <source-id>\n  node scripts/technical-docs/runner.mjs sync <source-id> [--dry-run] [--accept-content-change]\n  node scripts/technical-docs/runner.mjs update <source-id> [--dry-run] [--accept-content-change]\n  node scripts/technical-docs/runner.mjs validate <source-id>\n\nNotes:\n  - complete disabled/candidate sources in registry.sources may validate, fetch, and dry-run before publication\n  - fetch never mutates docs/\n  - dry-run never mutates docs/ or tracked provenance locks\n  - public sync/update requires enabled=true and publication_status=published\n  - any staged public-content drift requires --accept-content-change before publication\n`)
}

function parseArgs(argv) {
  const positional = []
  const flags = new Set()

  for (const arg of argv) {
    if (arg.startsWith('--')) flags.add(arg)
    else positional.push(arg)
  }

  return {
    command: positional[0],
    sourceId: positional[1],
    dryRun: flags.has('--dry-run'),
    acceptContentChange: flags.has('--accept-content-change')
  }
}

function loadSource(sourceId) {
  const registry = loadTechnicalDocsRegistry()
  const registryErrors = validateTechnicalDocsRegistry(registry)
  if (registryErrors.length) {
    throw new Error(`Registry is invalid:\n- ${registryErrors.join('\n- ')}`)
  }

  const source = registry.sources.find((item) => item.project_id === sourceId)
  if (source) return source

  const candidate = registry.candidates.find((item) => item.project_id === sourceId)
  if (candidate) {
    throw new Error(`${sourceId}: candidate source is disabled and cannot enter the R-TD4 lifecycle`)
  }

  throw new Error(`Unknown Technical Docs source: ${sourceId}`)
}

function assertLifecycleEligible(source) {
  if (!SYNC_MODES.has(source.source_mode)) {
    throw new Error(
      `${source.project_id}: source_mode ${source.source_mode} is not remotely synchronized; local editorial ownership is preserved`
    )
  }

  if (!source.source_ref) {
    throw new Error(`${source.project_id}: synchronized source requires source_ref`)
  }

  getGeneratedTargetDescriptors(source)
  getAdapter(source)
}

function assertPublicationEligible(source) {
  assertLifecycleEligible(source)

  if (!source.enabled || source.publication_status !== 'published') {
    throw new Error(
      `${source.project_id}: public synchronization requires enabled=true and publication_status=published`
    )
  }
}

function runCapture(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      stdio: ['ignore', 'pipe', 'pipe']
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => { stdout += chunk })
    child.stderr.on('data', (chunk) => { stderr += chunk })
    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve({ stdout: stdout.trim(), stderr: stderr.trim() })
        return
      }

      reject(new Error(
        `${command} ${args.join(' ')} failed${signal ? ` with signal ${signal}` : ` with exit code ${code}`}\n${stderr.trim()}`
      ))
    })
  })
}

function normalizeRepositoryUrl(value) {
  return value
    .trim()
    .replace(/\.git$/i, '')
    .replace(/\/$/, '')
    .toLowerCase()
}

async function fetchSource(source) {
  assertLifecycleEligible(source)
  const adapter = getAdapter(source)
  const paths = lifecycleWorkspacePaths(source.project_id)

  await rm(paths.workspaceRoot, { recursive: true, force: true })
  await mkdir(paths.workspaceRoot, { recursive: true })

  console.log(`Fetching ${source.project_id}`)
  console.log(`Repository: ${source.source_repository}`)
  console.log(`Requested ref: ${source.source_ref}`)
  console.log(`Workspace: ${path.relative(repositoryRoot, paths.sourceRoot)}`)

  await runCapture('git', [
    'clone',
    '--depth', '1',
    '--branch', source.source_ref,
    source.source_repository,
    paths.sourceRoot
  ], { cwd: repositoryRoot })

  const { stdout: resolvedSha } = await runCapture(
    'git', ['-C', paths.sourceRoot, 'rev-parse', 'HEAD'], { cwd: repositoryRoot }
  )
  const { stdout: origin } = await runCapture(
    'git', ['-C', paths.sourceRoot, 'remote', 'get-url', 'origin'], { cwd: repositoryRoot }
  )

  if (normalizeRepositoryUrl(origin) !== normalizeRepositoryUrl(source.source_repository)) {
    throw new Error(`${source.project_id}: fetched origin does not match registry source_repository`)
  }

  const provenance = await writeFetchProvenance(source, adapter.id, resolvedSha)
  console.log(`Resolved SHA: ${provenance.resolved_sha}`)
  console.log('FETCH PASS: docs/ was not mutated by the lifecycle runner.')
  return provenance
}

async function validateWorkspaceGitState(source, provenance) {
  const paths = lifecycleWorkspacePaths(source.project_id)
  const { stdout: head } = await runCapture(
    'git', ['-C', paths.sourceRoot, 'rev-parse', 'HEAD'], { cwd: repositoryRoot }
  )
  if (head.toLowerCase() !== provenance.resolved_sha.toLowerCase()) {
    throw new Error(`${source.project_id}: workspace HEAD no longer matches fetch provenance`)
  }

  const { stdout: status } = await runCapture(
    'git', ['-C', paths.sourceRoot, 'status', '--porcelain', '--untracked-files=all', '--ignored'], { cwd: repositoryRoot }
  )
  if (status.trim()) {
    throw new Error(`${source.project_id}: workspace contains changes after fetch; immutable provenance cannot be asserted`)
  }
}

async function validateExistingLock(source, adapterId, provenance) {
  const lockPath = lockPathForSource(source.project_id)
  if (!(await pathExists(lockPath))) return { exists: false, lock: null }

  const lock = JSON.parse(await readFile(lockPath, 'utf8'))
  const errors = validateProvenanceRecord(source, adapterId, lock)
  if (errors.length) {
    throw new Error(`${source.project_id}: existing provenance lock is invalid:\n- ${errors.join('\n- ')}`)
  }

  if (
    source.source_mode === 'snapshot_sync' &&
    lock.requested_ref === provenance.requested_ref &&
    lock.resolved_sha !== provenance.resolved_sha
  ) {
    throw new Error(
      `${source.project_id}: frozen snapshot ref ${source.source_ref} resolved to a different SHA than the existing provenance lock; publication is blocked`
    )
  }

  return { exists: true, lock }
}

async function stageAndMaybePublish(source, { dryRun, acceptContentChange }) {
  assertLifecycleEligible(source)
  if (!dryRun) assertPublicationEligible(source)
  const adapter = getAdapter(source)
  const paths = lifecycleWorkspacePaths(source.project_id)

  if (!(await pathExists(paths.sourceRoot))) {
    throw new Error(`${source.project_id}: source workspace is missing; run fetch first`)
  }

  const sourceInfo = await stat(paths.sourceRoot)
  if (!sourceInfo.isDirectory()) {
    throw new Error(`${source.project_id}: source workspace is not a directory`)
  }

  const provenance = await readFetchProvenance(source)
  const provenanceErrors = validateProvenanceRecord(source, adapter.id, provenance)
  if (provenanceErrors.length) {
    throw new Error(`${source.project_id}: fetch provenance is invalid:\n- ${provenanceErrors.join('\n- ')}`)
  }

  await validateWorkspaceGitState(source, provenance)
  await validateExistingLock(source, adapter.id, provenance)

  await rm(paths.stagingRoot, { recursive: true, force: true })
  const stagingSiteRoot = path.join(paths.stagingRoot, source.site_source_path)
  await mkdir(stagingSiteRoot, { recursive: true })

  console.log(`Staging ${source.project_id} with adapter ${adapter.id}`)
  await adapter.stage({
    repositoryRoot,
    source,
    sourceRoot: paths.sourceRoot,
    stagingSiteRoot,
    provenance
  })

  const staged = await validateStagedOutput(source, stagingSiteRoot)
  const comparison = await compareStagedToLive(source, stagingSiteRoot)

  console.log(`STAGE PASS: ${staged.stagedFiles.length} generated files are inside declared ownership.`)
  console.log(`Generated content drift: ${comparison.changed ? 'YES' : 'NO'}`)

  if (dryRun) {
    console.log('DRY RUN PASS: public docs and tracked provenance locks were not changed.')
    return { provenance, comparison, published: false }
  }

  if (comparison.changed && !acceptContentChange) {
    throw new Error(
      `${source.project_id}: staged generated content differs from the accepted public snapshot. Publication is blocked by default; review the staged output and rerun with --accept-content-change only when the documentation refresh is intentionally approved.`
    )
  }

  await publishGeneratedTargets({
    source,
    stagingSiteRoot,
    provenance,
    workspaceRoot: paths.workspaceRoot
  })

  console.log(`PUBLISH PASS: replaced only declared generated targets for ${source.project_id}.`)
  console.log(`Provenance lock: ${path.relative(repositoryRoot, lockPathForSource(source.project_id))}`)
  return { provenance, comparison, published: true }
}

async function validateSource(source) {
  const descriptors = getGeneratedTargetDescriptors(source)
  console.log(`${source.project_id}: source_mode=${source.source_mode}`)

  if (!SYNC_MODES.has(source.source_mode)) {
    if (descriptors.length !== 0) {
      throw new Error(`${source.project_id}: non-sync source must not declare generated targets`)
    }
    console.log('VALIDATE PASS: local/external ownership is not routed through generated synchronization.')
    return
  }

  assertLifecycleEligible(source)
  const adapter = getAdapter(source)

  if (!source.enabled || source.publication_status !== 'published') {
    console.log('VALIDATE PASS: complete synchronized source is lifecycle-eligible for prepublication validation; public targets and tracked lock are not required until publication.')
    return
  }

  for (const descriptor of descriptors) {
    if (!(await pathExists(descriptor.livePath))) {
      throw new Error(`${source.project_id}: current generated target is missing: ${descriptor.declared}`)
    }
  }

  const lockPath = lockPathForSource(source.project_id)
  if (await pathExists(lockPath)) {
    const lock = JSON.parse(await readFile(lockPath, 'utf8'))
    const errors = validateProvenanceRecord(source, adapter.id, lock)
    if (errors.length) {
      throw new Error(`${source.project_id}: provenance lock invalid:\n- ${errors.join('\n- ')}`)
    }
    console.log(`VALIDATE PASS: generated ownership + provenance lock (${lock.resolved_sha}).`)
  } else {
    console.log('VALIDATE PASS: generated ownership is valid; historical content predates normalized lock creation.')
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (!args.command || !args.sourceId || !['fetch', 'sync', 'update', 'validate'].includes(args.command)) {
    usage()
    process.exit(args.command || args.sourceId ? 2 : 0)
  }

  const source = loadSource(args.sourceId)

  switch (args.command) {
    case 'fetch':
      await fetchSource(source)
      break
    case 'sync':
      await stageAndMaybePublish(source, args)
      break
    case 'update':
      if (!args.dryRun) assertPublicationEligible(source)
      await fetchSource(source)
      await stageAndMaybePublish(source, args)
      break
    case 'validate':
      await validateSource(source)
      break
  }
}

main().catch((error) => {
  console.error(`Technical Docs lifecycle: FAIL\n${error.message}`)
  process.exit(1)
})
