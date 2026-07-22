import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const sourceRoot = process.env.RETAINAI_REPO
  ? path.resolve(process.env.RETAINAI_REPO)
  : path.resolve('.vendor/retainai')

const sourceRef = process.env.RETAINAI_REF ?? 'v0.4.0-alpha.1'

const sourceRepoBlobBase =
  process.env.RETAINAI_BLOB_BASE ??
  `https://github.com/HubertRonald/RetainAI/blob/${sourceRef}`

const sourceRepoRawBase =
  process.env.RETAINAI_RAW_BASE ??
  `https://raw.githubusercontent.com/HubertRonald/RetainAI/${sourceRef}`

const targetRoot = path.resolve('docs/retainai')
const referenceRoot = path.join(targetRoot, 'reference')

const sourceScopes = [
  {
    source: 'docs',
    target: 'docs',
    title: 'Documentation'
  },
  {
    source: 'artifacts/reports',
    target: 'reports',
    title: 'Reports'
  }
]

const assetScopes = [
  {
    source: 'figs',
    target: 'figs',
    title: 'Figures'
  }
]

const allScopes = [
  ...sourceScopes,
  ...assetScopes
]


function normalizePath(filePath) {
  return filePath.split(path.sep).join('/')
}

function titleFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

async function pathExists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

async function isDirectory(filePath) {
  try {
    const info = await stat(filePath)
    return info.isDirectory()
  } catch {
    return false
  }
}

async function resolveExistingSourcePath(sourceFile) {
  const candidates = [
    sourceFile,
    `${sourceFile}.md`,
    path.join(sourceFile, 'README.md'),
    path.join(sourceFile, 'index.md')
  ]

  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      return candidate
    }
  }

  return null
}

function isExternalLink(href) {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('#') ||
    href.startsWith('tel:') ||
    href.startsWith('data:')
  )
}

function splitHref(href) {
  const hashIndex = href.indexOf('#')

  if (hashIndex === -1) {
    return { pathname: href, hash: '' }
  }

  return {
    pathname: href.slice(0, hashIndex),
    hash: href.slice(hashIndex)
  }
}

function getScopeForRelativeSource(relativeSource) {
  return allScopes.find((scope) => {
    return (
      relativeSource === scope.source ||
      relativeSource.startsWith(`${scope.source}/`)
    )
  })
}

function sourceToTargetPath(sourceFilePath) {
  const relativeSource = normalizePath(path.relative(sourceRoot, sourceFilePath))

  if (relativeSource === 'README.md') {
    return path.join(targetRoot, 'package.md')
  }

  const scope = getScopeForRelativeSource(relativeSource)

  if (!scope) {
    return path.join(referenceRoot, relativeSource)
  }

  const scopedRelative = relativeSource.slice(scope.source.length + 1)

  if (scopedRelative === 'README.md') {
    return path.join(referenceRoot, scope.target, 'index.md')
  }

  const outputRelative = scopedRelative.replace(/\/README\.md$/g, '/index.md')

  return path.join(referenceRoot, scope.target, outputRelative)
}

function resolveSourceLink(currentSourceFile, hrefPathname) {
  const cleanHref = decodeURI(hrefPathname).replace(/\\/g, '/')

  if (!cleanHref || cleanHref === '.') {
    return currentSourceFile
  }

  if (cleanHref === 'README.md') {
    return path.join(path.dirname(currentSourceFile), 'README.md')
  }

  const startsAtKnownScope = allScopes.some(
    (scope) => cleanHref === scope.source || cleanHref.startsWith(`${scope.source}/`)
  )

  if (startsAtKnownScope) {
    return path.join(sourceRoot, cleanHref)
  }

  return path.resolve(path.dirname(currentSourceFile), cleanHref)
}

function toVitePressLink(currentTargetFile, linkedTargetFile, hash = '') {
  let relative = normalizePath(
    path.relative(path.dirname(currentTargetFile), linkedTargetFile)
  )

  if (!relative.startsWith('.')) {
    relative = `./${relative}`
  }

  if (relative.endsWith('/index.md')) {
    relative = relative.slice(0, -'index.md'.length)
  } else if (relative.endsWith('.md')) {
    relative = relative.slice(0, -'.md'.length)
  }

  if (relative === './') {
    return `.${hash}`
  }

  return `${relative}${hash}`
}

function toGitHubBlobLink(sourceFile, hash = '') {
  const relative = normalizePath(path.relative(sourceRoot, sourceFile))
  return `${sourceRepoBlobBase}/${encodeURI(relative)}${hash}`
}

function toGitHubRawLink(sourceFile, hash = '') {
  const relative = normalizePath(path.relative(sourceRoot, sourceFile))
  return `${sourceRepoRawBase}/${encodeURI(relative)}${hash}`
}

function shouldSkipRewritingHref(href) {
  return (
    !href ||
    isExternalLink(href) ||
    href.startsWith('/') ||
    href.startsWith('{{')
  )
}


function isCopiedAssetSourcePath(sourceFile) {
  const relativeSource = normalizePath(path.relative(sourceRoot, sourceFile))

  return assetScopes.some((scope) => {
    return (
      relativeSource === scope.source ||
      relativeSource.startsWith(`${scope.source}/`)
    )
  })
}

async function copyAssetTree(sourceDir, targetDir) {
  const copied = []

  if (!(await isDirectory(sourceDir))) {
    return copied
  }

  await mkdir(targetDir, { recursive: true })

  const entries = await readdir(sourceDir, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name)
    const targetPath = path.join(targetDir, entry.name)

    if (entry.isDirectory()) {
      copied.push(...await copyAssetTree(sourcePath, targetPath))
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    if (entry.name === '.DS_Store') {
      continue
    }

    await mkdir(path.dirname(targetPath), { recursive: true })
    await writeFile(targetPath, await readFile(sourcePath))

    copied.push({
      source: normalizePath(path.relative(sourceRoot, sourcePath)),
      target: normalizePath(path.relative(process.cwd(), targetPath))
    })
  }

  return copied
}

async function copyAssetScope(scope) {
  const sourceDir = path.join(sourceRoot, scope.source)
  const targetDir = path.join(referenceRoot, scope.target)

  if (!(await isDirectory(sourceDir))) {
    console.warn(`Skipping missing asset scope: ${scope.source}`)
    return []
  }

  return await copyAssetTree(sourceDir, targetDir)
}


function rewriteRetainAIRootReferenceLinks(markdown, currentSourceFile) {
  const relativeSource = normalizePath(path.relative(sourceRoot, currentSourceFile))

  if (relativeSource !== 'README.md') {
    return markdown
  }

  const knownRootReferenceFiles = [
    'CHANGELOG',
    'CONTRIBUTING'
  ]

  let output = markdown

  for (const fileName of knownRootReferenceFiles) {
    const blobUrl = `${sourceRepoBlobBase}/reference/${fileName}`

    output = output
      .replaceAll(`(./reference/${fileName})`, `(${blobUrl})`)
      .replaceAll(`(reference/${fileName})`, `(${blobUrl})`)
      .replaceAll(`href="./reference/${fileName}"`, `href="${blobUrl}"`)
      .replaceAll(`href="reference/${fileName}"`, `href="${blobUrl}"`)
  }

  return output
}


async function rewriteHref(currentSourceFile, currentTargetFile, rawHref, options = {}) {
  const href = rawHref.trim()
  const isImage = Boolean(options.isImage)

  if (shouldSkipRewritingHref(href)) {
    return rawHref
  }

  const { pathname, hash } = splitHref(href)

  if (!pathname) {
    return rawHref
  }

  const linkedSourceFile = resolveSourceLink(currentSourceFile, pathname)
  const existingSourceFile = await resolveExistingSourcePath(linkedSourceFile)

  if (existingSourceFile && isCopiedAssetSourcePath(existingSourceFile)) {
    const linkedTargetFile = sourceToTargetPath(existingSourceFile)
    return toVitePressLink(currentTargetFile, linkedTargetFile, hash)
  }

  if (isImage) {
    return toGitHubRawLink(existingSourceFile ?? linkedSourceFile, hash)
  }

  if (existingSourceFile && existingSourceFile.endsWith('.md')) {
    const linkedTargetFile = sourceToTargetPath(existingSourceFile)
    return toVitePressLink(currentTargetFile, linkedTargetFile, hash)
  }

  return toGitHubBlobLink(existingSourceFile ?? linkedSourceFile, hash)
}

async function rewriteInlineMarkdownLinks(markdown, currentSourceFile) {
  const currentTargetFile = sourceToTargetPath(currentSourceFile)
  const pattern = /(!?)\[([^\]]*)\]\(([^)\n]+)\)/g
  const matches = [...markdown.matchAll(pattern)]

  if (matches.length === 0) {
    return markdown
  }

  let output = ''
  let lastIndex = 0

  for (const match of matches) {
    const [original, bang, label, rawHref] = match
    const start = match.index ?? 0
    const isImage = Boolean(bang)

    output += markdown.slice(lastIndex, start)

    const rewrittenHref = await rewriteHref(
      currentSourceFile,
      currentTargetFile,
      rawHref,
      { isImage }
    )

    if (rewrittenHref === rawHref) {
      output += original
    } else {
      output += `${isImage ? '!' : ''}[${label}](${rewrittenHref})`
    }

    lastIndex = start + original.length
  }

  output += markdown.slice(lastIndex)

  return output
}

async function rewriteReferenceDefinitions(markdown, currentSourceFile) {
  const currentTargetFile = sourceToTargetPath(currentSourceFile)
  const pattern = /^(\s{0,3}\[[^\]]+\]:\s*)(\S+)(.*)$/gm
  const matches = [...markdown.matchAll(pattern)]

  if (matches.length === 0) {
    return markdown
  }

  let output = ''
  let lastIndex = 0

  for (const match of matches) {
    const [original, prefix, rawHref, suffix] = match
    const start = match.index ?? 0

    output += markdown.slice(lastIndex, start)

    const rewrittenHref = await rewriteHref(
      currentSourceFile,
      currentTargetFile,
      rawHref,
      { isImage: false }
    )

    output += `${prefix}${rewrittenHref}${suffix}`

    lastIndex = start + original.length
  }

  output += markdown.slice(lastIndex)

  return output
}

async function rewriteHtmlResourceAttributes(markdown, currentSourceFile) {
  const currentTargetFile = sourceToTargetPath(currentSourceFile)
  const pattern = /\b(src|href)=["']([^"']+)["']/g
  const matches = [...markdown.matchAll(pattern)]

  if (matches.length === 0) {
    return markdown
  }

  let output = ''
  let lastIndex = 0

  for (const match of matches) {
    const [original, attr, rawHref] = match
    const start = match.index ?? 0
    const href = rawHref.trim()

    output += markdown.slice(lastIndex, start)

    if (shouldSkipRewritingHref(href) || href.startsWith('#')) {
      output += original
      lastIndex = start + original.length
      continue
    }

    const rewrittenHref = await rewriteHref(
      currentSourceFile,
      currentTargetFile,
      rawHref,
      { isImage: attr === 'src' }
    )

    if (rewrittenHref === rawHref) {
      output += original
    } else {
      output += `${attr}="${rewrittenHref}"`
    }

    lastIndex = start + original.length
  }

  output += markdown.slice(lastIndex)

  return output
}

async function rewriteLinks(markdown, currentSourceFile) {
  let output = markdown

  output = await rewriteInlineMarkdownLinks(output, currentSourceFile)
  output = await rewriteReferenceDefinitions(output, currentSourceFile)
  output = await rewriteHtmlResourceAttributes(output, currentSourceFile)
  output = rewriteRetainAIRootReferenceLinks(output, currentSourceFile)

  return output
}

async function collectMarkdownFiles(dir) {
  const output = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      output.push(...await collectMarkdownFiles(fullPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      output.push(fullPath)
    }
  }

  return output
}

async function copyMarkdownFile(sourceFile) {
  const targetFile = sourceToTargetPath(sourceFile)
  const original = await readFile(sourceFile, 'utf8')
  const rewritten = await rewriteLinks(original, sourceFile)

  await mkdir(path.dirname(targetFile), { recursive: true })
  await writeFile(targetFile, rewritten, 'utf8')

  return {
    source: normalizePath(path.relative(sourceRoot, sourceFile)),
    target: normalizePath(path.relative(process.cwd(), targetFile))
  }
}

async function collectGeneratedMarkdownFiles(dir) {
  if (!(await pathExists(dir))) {
    return []
  }

  const output = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      output.push(...await collectGeneratedMarkdownFiles(fullPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      output.push(fullPath)
    }
  }

  return output
}

async function ensureDirectoryIndexes(rootDir, sectionTitle) {
  if (!(await pathExists(rootDir))) {
    return
  }

  const files = await collectGeneratedMarkdownFiles(rootDir)
  const directories = new Set(files.map((file) => path.dirname(file)))

  for (const dir of [...directories].sort()) {
    const indexFile = path.join(dir, 'index.md')

    if (await pathExists(indexFile)) {
      continue
    }

    const localFiles = files
      .filter((file) => path.dirname(file) === dir)
      .filter((file) => path.basename(file) !== 'index.md')
      .sort()

    if (localFiles.length === 0) {
      continue
    }

    const relativeDir = normalizePath(path.relative(rootDir, dir))
    const title =
      relativeDir === ''
        ? sectionTitle
        : titleFromSlug(path.basename(dir))

    const links = localFiles
      .map((file) => {
        const basename = path.basename(file, '.md')
        const title = titleFromSlug(basename)
        return `- [${title}](./${basename})`
      })
      .join('\n')

    const body = `# ${title}\n\nGenerated index for the synchronized RetainAI documentation snapshot.\n\n${links}\n`

    await writeFile(indexFile, body, 'utf8')
  }
}

async function assertGeneratedFiles() {
  const requiredFiles = [
    'docs/retainai/package.md',
    'docs/retainai/reference/docs/index.md',
    'docs/retainai/reference/reports/index.md',
    'docs/retainai/reference/figs'
  ]

  const missing = []

  for (const file of requiredFiles) {
    if (!(await pathExists(path.resolve(file)))) {
      missing.push(file)
    }
  }

  if (missing.length > 0) {
    console.error('\nMissing generated files:')
    for (const file of missing) {
      console.error(`- ${file}`)
    }

    throw new Error('RetainAI documentation sync is incomplete.')
  }

  console.log('\nRequired generated files OK:')
  for (const file of requiredFiles) {
    console.log(`- ${file}`)
  }
}

async function main() {
  const rootReadme = path.join(sourceRoot, 'README.md')

  if (!(await pathExists(rootReadme))) {
    throw new Error(
      `RetainAI repo was not found at ${sourceRoot}. ` +
      `Run npm run retainai:fetch first or set RETAINAI_REPO=/path/to/RetainAI.`
    )
  }

  await mkdir(targetRoot, { recursive: true })
  await rm(referenceRoot, { recursive: true, force: true })
  await rm(path.join(targetRoot, 'package.md'), { force: true })

  const copied = []

  copied.push(await copyMarkdownFile(rootReadme))

  for (const scope of sourceScopes) {
    const scopeDir = path.join(sourceRoot, scope.source)

    if (!(await isDirectory(scopeDir))) {
      console.warn(`Skipping missing source scope: ${scope.source}`)
      continue
    }

    const files = await collectMarkdownFiles(scopeDir)

    for (const file of files) {
      copied.push(await copyMarkdownFile(file))
    }
  }

  const copiedAssets = []

  for (const scope of assetScopes) {
    copiedAssets.push(...await copyAssetScope(scope))
  }

  await ensureDirectoryIndexes(path.join(referenceRoot, 'docs'), 'Documentation')
  await ensureDirectoryIndexes(path.join(referenceRoot, 'reports'), 'Reports')

  console.log('\nRetainAI documentation synced.')
  console.log('Source:', sourceRoot)
  console.log('Target:', targetRoot)
  console.log('\nCopied Markdown files:')

  for (const item of copied) {
    console.log(`- ${item.source} -> ${item.target}`)
  }

  if (copiedAssets.length > 0) {
    console.log('\nCopied asset files:')

    for (const item of copiedAssets) {
      console.log(`- ${item.source} -> ${item.target}`)
    }
  }

  await assertGeneratedFiles()
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
