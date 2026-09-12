import crypto from 'node:crypto'
import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const moduleDir = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(moduleDir, '..')
const manifestPath = path.join(repositoryRoot, 'scripts/technical-docs/rtd6-fde-roadmap-content-manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

const sourceRootEnv = process.env.FDE_ROADMAP_REPO
const targetRootEnv = process.env.TECHNICAL_DOCS_TARGET_ROOT
const sourceRef = process.env.FDE_ROADMAP_REF
const resolvedSha = process.env.FDE_ROADMAP_RESOLVED_SHA

if (!sourceRootEnv) throw new Error('FDE_ROADMAP_REPO must be provided by the lifecycle adapter.')
if (!targetRootEnv) {
  throw new Error(
    'sync-fde-roadmap-docs.mjs is a stage-only transformer. ' +
    'Use the generic Technical Docs lifecycle runner.'
  )
}
if (sourceRef !== manifest.requested_ref) {
  throw new Error(`fde-roadmap requested ref mismatch: expected ${manifest.requested_ref}, found ${sourceRef}`)
}
if (resolvedSha !== manifest.expected_resolved_sha) {
  throw new Error(`fde-roadmap resolved SHA mismatch: expected ${manifest.expected_resolved_sha}, found ${resolvedSha}`)
}

const sourceRoot = path.resolve(sourceRootEnv)
const targetRoot = path.resolve(targetRootEnv)
const publicTargetRoot = path.resolve(repositoryRoot, 'docs/technical-docs/fde-roadmap')

if (targetRoot === publicTargetRoot) {
  throw new Error('fde-roadmap transformer refuses direct writes to docs/technical-docs/fde-roadmap.')
}

function normalize(value) {
  return value.split(path.sep).join('/')
}

async function pathExists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

async function sha256(filePath) {
  const bytes = await readFile(filePath)
  return crypto.createHash('sha256').update(bytes).digest('hex')
}

const approved = new Set(manifest.approved_source_inventory)
const routeMap = new Map(manifest.route_producing_markdown_mapping.map((entry) => [entry.source, entry]))
const assetMap = new Map(manifest.png_assets.map((entry) => [entry.source, entry]))
const nonRoute = new Set(manifest.non_route_source_metadata)

async function walkSourceFiles(rootDir, baseDir = rootDir) {
  const files = []
  for (const entry of await readdir(rootDir, { withFileTypes: true })) {
    if (entry.name === '.git') continue
    const fullPath = path.join(rootDir, entry.name)
    if (entry.isDirectory()) files.push(...await walkSourceFiles(fullPath, baseDir))
    else if (entry.isFile()) files.push(normalize(path.relative(baseDir, fullPath)))
  }
  return files
}

function assertApproved(relativeSource) {
  if (!approved.has(relativeSource)) {
    throw new Error(`fde-roadmap source path is not manifest-approved: ${relativeSource}`)
  }
}

function sourceRelative(filePath) {
  const relative = normalize(path.relative(sourceRoot, filePath))
  if (!relative || relative.startsWith('../') || path.isAbsolute(relative)) {
    throw new Error(`Source path escapes fde-roadmap checkout: ${filePath}`)
  }
  return relative
}

function resolveLocalSource(currentSource, hrefPathname) {
  const clean = decodeURI(hrefPathname).replace(/\\/g, '/')
  if (!clean || clean === '.') return currentSource
  return path.resolve(path.dirname(currentSource), clean)
}

function toRelativeTargetLink(currentTarget, linkedTarget, hash = '') {
  let relative = normalize(path.relative(path.dirname(currentTarget), linkedTarget))
  if (!relative.startsWith('.')) relative = `./${relative}`
  if (relative.endsWith('.md')) relative = relative.slice(0, -3)
  return `${relative}${hash}`
}

function immutableBlob(relativeSource, hash = '') {
  return `${manifest.immutable_non_route_blob_base}/${encodeURI(relativeSource)}${hash}`
}

function splitHref(href) {
  const index = href.indexOf('#')
  return index === -1
    ? { pathname: href, hash: '' }
    : { pathname: href.slice(0, index), hash: href.slice(index) }
}

function shouldSkip(href) {
  return !href || href.startsWith('#') || href.startsWith('/') || /^(https?:|mailto:|tel:|data:)/i.test(href)
}

async function rewriteHref(currentSource, currentTarget, href) {
  if (shouldSkip(href)) return href
  const { pathname, hash } = splitHref(href)
  if (!pathname) return href

  const resolved = resolveLocalSource(currentSource, pathname)
  const relative = sourceRelative(resolved)

  if (routeMap.has(relative)) {
    const linkedTarget = path.join(targetRoot, routeMap.get(relative).target)
    return toRelativeTargetLink(currentTarget, linkedTarget, hash)
  }

  if (assetMap.has(relative)) {
    const linkedTarget = path.join(targetRoot, assetMap.get(relative).target)
    return toRelativeTargetLink(currentTarget, linkedTarget, hash)
  }

  if (nonRoute.has(relative)) return immutableBlob(relative, hash)

  if (await pathExists(resolved)) {
    throw new Error(`Local source link points to an approved-but-unpublished path without deterministic mapping: ${relative}`)
  }

  throw new Error(`Unresolved local source link in ${sourceRelative(currentSource)}: ${href}`)
}

async function rewriteMarkdown(sourceFile, targetFile, text) {
  const markdownLink = /(!?\[[^\]]*\])\(([^)]+)\)/g
  let output = ''
  let cursor = 0

  for (const match of text.matchAll(markdownLink)) {
    output += text.slice(cursor, match.index)
    const prefix = match[1]
    const rawDestination = match[2]
    const angleWrapped = rawDestination.startsWith('<') && rawDestination.endsWith('>')
    const destination = angleWrapped ? rawDestination.slice(1, -1) : rawDestination
    const rewritten = await rewriteHref(sourceFile, targetFile, destination)
    output += `${prefix}(${angleWrapped ? `<${rewritten}>` : rewritten})`
    cursor = match.index + match[0].length
  }
  output += text.slice(cursor)
  return output
}

const actualSourceFiles = (await walkSourceFiles(sourceRoot)).sort()
const actualMarkdown = actualSourceFiles.filter((file) => file.endsWith('.md'))
const approvedMarkdown = [...routeMap.keys()].sort()
if (JSON.stringify(actualMarkdown) !== JSON.stringify(approvedMarkdown)) {
  throw new Error(
    `Unexpected route-producing Markdown inventory. Expected ${approvedMarkdown.join(', ')}; found ${actualMarkdown.join(', ')}`
  )
}
for (const metadata of nonRoute) {
  if (!actualSourceFiles.includes(metadata)) throw new Error(`Missing non-route source metadata: ${metadata}`)
}

await rm(targetRoot, { recursive: true, force: true })
await mkdir(targetRoot, { recursive: true })

for (const entry of manifest.route_producing_markdown_mapping) {
  assertApproved(entry.source)
  const sourceFile = path.join(sourceRoot, entry.source)
  const targetFile = path.join(targetRoot, entry.target)
  if (!(await pathExists(sourceFile))) throw new Error(`Missing manifest-approved source document: ${entry.source}`)
  const sourceText = await readFile(sourceFile, 'utf8')
  const transformed = await rewriteMarkdown(sourceFile, targetFile, sourceText)
  await mkdir(path.dirname(targetFile), { recursive: true })
  await writeFile(targetFile, transformed)
}

for (const entry of manifest.png_assets) {
  assertApproved(entry.source)
  const sourceFile = path.join(sourceRoot, entry.source)
  const targetFile = path.join(targetRoot, entry.target)
  if (!(await pathExists(sourceFile))) throw new Error(`Missing manifest-approved PNG: ${entry.source}`)
  const actual = await sha256(sourceFile)
  if (actual !== entry.sha256) {
    throw new Error(`Source PNG hash mismatch for ${entry.source}: expected ${entry.sha256}, found ${actual}`)
  }
  await mkdir(path.dirname(targetFile), { recursive: true })
  await copyFile(sourceFile, targetFile)
  const copied = await sha256(targetFile)
  if (copied !== entry.sha256) throw new Error(`Generated PNG bytes changed for ${entry.target}`)
}

for (const excluded of manifest.intentionally_excluded_artifacts) {
  if (approved.has(excluded)) throw new Error(`Excluded artifact entered approved inventory: ${excluded}`)
}

console.log(`FDE Roadmap stage PASS: ${manifest.expected_synchronized_markdown_count} Markdown documents + ${manifest.expected_asset_count} PNG assets.`)
console.log(`Pinned source: ${manifest.requested_ref} -> ${manifest.expected_resolved_sha}`)
