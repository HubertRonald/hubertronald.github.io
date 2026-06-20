// scripts/sync-relationalstats-docs.mjs

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const sourceRoot = process.env.RELATIONALSTATS_REPO
  ? path.resolve(process.env.RELATIONALSTATS_REPO)
  : path.resolve('../relationalstats')

const targetRoot = path.resolve('docs/relationalstats')
const referenceRoot = path.join(targetRoot, 'reference')

const sourceScopes = ['docs', 'examples', 'notebooks']

async function exists(filePath) {
  try {
    await readFile(filePath)
    return true
  } catch {
    return false
  }
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join('/')
}

function isExternalLink(href) {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('#') ||
    href.startsWith('tel:')
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

function sourceToTargetPath(sourceFilePath) {
  const relativeSource = normalizePath(path.relative(sourceRoot, sourceFilePath))

  if (relativeSource === 'README.md') {
    return path.join(targetRoot, 'package.md')
  }

  for (const scope of sourceScopes) {
    if (relativeSource === `${scope}/README.md`) {
      return path.join(referenceRoot, scope, 'index.md')
    }

    if (relativeSource.startsWith(`${scope}/`)) {
      const scopedRelative = relativeSource.slice(scope.length + 1)
      const outputRelative =
        scopedRelative === 'README.md'
          ? 'index.md'
          : scopedRelative.replace(/\/README\.md$/g, '/index.md')

      return path.join(referenceRoot, scope, outputRelative)
    }
  }

  return path.join(referenceRoot, relativeSource)
}

function resolveSourceLink(currentSourceFile, hrefPathname) {
  const cleanHref = decodeURI(hrefPathname)

  if (!cleanHref || cleanHref === '.') {
    return currentSourceFile
  }

  if (cleanHref === 'README.md') {
    return path.join(path.dirname(currentSourceFile), 'README.md')
  }

  const normalizedHref = cleanHref.replace(/\\/g, '/')

  const startsAtKnownScope = sourceScopes.some(
    (scope) =>
      normalizedHref === scope ||
      normalizedHref.startsWith(`${scope}/`)
  )

  if (normalizedHref === 'README.md') {
    return path.join(sourceRoot, 'README.md')
  }

  if (startsAtKnownScope) {
    return path.join(sourceRoot, normalizedHref)
  }

  return path.resolve(path.dirname(currentSourceFile), normalizedHref)
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

async function rewriteLinks(markdown, currentSourceFile) {
  const currentTargetFile = sourceToTargetPath(currentSourceFile)
  const missingLinks = []

  const rewritten = markdown.replace(
    /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g,
    (match, label, rawHref) => {
      const href = rawHref.trim()

      if (isExternalLink(href)) {
        return match
      }

      const { pathname, hash } = splitHref(href)

      if (!pathname.endsWith('.md') && pathname !== 'README.md') {
        return match
      }

      const linkedSourceFile = resolveSourceLink(currentSourceFile, pathname)
      const linkedTargetFile = sourceToTargetPath(linkedSourceFile)
      const rewrittenHref = toVitePressLink(
        currentTargetFile,
        linkedTargetFile,
        hash
      )

      missingLinks.push({
        from: normalizePath(path.relative(sourceRoot, currentSourceFile)),
        original: href,
        resolved: normalizePath(path.relative(sourceRoot, linkedSourceFile)),
        vitepress: rewrittenHref
      })

      return `[${label}](${rewrittenHref})`
    }
  )

  return { rewritten, links: missingLinks }
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
  const { rewritten } = await rewriteLinks(original, sourceFile)

  await mkdir(path.dirname(targetFile), { recursive: true })
  await writeFile(targetFile, rewritten, 'utf8')

  return {
    source: normalizePath(path.relative(sourceRoot, sourceFile)),
    target: normalizePath(path.relative(process.cwd(), targetFile))
  }
}

async function main() {
  const rootReadme = path.join(sourceRoot, 'README.md')

  if (!(await exists(rootReadme))) {
    throw new Error(
      `RelationalStats repo was not found at ${sourceRoot}. ` +
      `Set RELATIONALSTATS_REPO=/path/to/relationalstats.`
    )
  }

  await mkdir(targetRoot, { recursive: true })
  await rm(referenceRoot, { recursive: true, force: true })
  await rm(path.join(targetRoot, 'package.md'), { force: true })

  const copied = []

  copied.push(await copyMarkdownFile(rootReadme))

  for (const scope of sourceScopes) {
    const scopeDir = path.join(sourceRoot, scope)

    if (await exists(path.join(scopeDir, 'README.md'))) {
      const files = await collectMarkdownFiles(scopeDir)

      for (const file of files) {
        copied.push(await copyMarkdownFile(file))
      }
    }
  }

  console.log('RelationalStats documentation synced.')
  console.log('Source:', sourceRoot)
  console.log('Target:', targetRoot)
  console.log('')
  console.log('Copied Markdown files:')

  for (const item of copied) {
    console.log(`- ${item.source} -> ${item.target}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})