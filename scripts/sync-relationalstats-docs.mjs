import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const sourceRoot = process.env.RELATIONALSTATS_REPO
  ? path.resolve(process.env.RELATIONALSTATS_REPO)
  : path.resolve('../relationalstats')

const targetRoot = path.resolve('docs/relationalstats')
const referenceRoot = path.join(targetRoot, 'reference')

async function exists(filePath) {
  try {
    await readFile(filePath)
    return true
  } catch {
    return false
  }
}

function rewriteLinks(markdown) {
  return markdown
    .replaceAll('(README.md)', '(index.md)')
    .replaceAll('(./README.md)', '(./index.md)')
    .replaceAll('(../README.md)', '(../index.md)')
    .replaceAll('(../../README.md)', '(../../index.md)')
    .replaceAll('(docs/README.md)', '(reference/docs/index.md)')
    .replaceAll('(examples/README.md)', '(reference/examples/index.md)')
    .replaceAll('(notebooks/README.md)', '(reference/notebooks/index.md)')
    .replaceAll('(docs/linkprediction/README.md)', '(reference/docs/linkprediction/index.md)')
    .replaceAll('(docs/qap/README.md)', '(reference/docs/qap/index.md)')
    .replaceAll('(docs/ergm/README.md)', '(reference/docs/ergm/index.md)')
    .replaceAll('(docs/stergm/README.md)', '(reference/docs/stergm/index.md)')
}

async function copyMarkdownTree(srcDir, dstDir) {
  await mkdir(dstDir, { recursive: true })

  const entries = await readdir(srcDir, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const outputName = entry.name === 'README.md' ? 'index.md' : entry.name
    const dstPath = path.join(dstDir, outputName)

    if (entry.isDirectory()) {
      await copyMarkdownTree(srcPath, dstPath)
      continue
    }

    if (!entry.name.endsWith('.md')) {
      continue
    }

    const original = await readFile(srcPath, 'utf8')
    const updated = rewriteLinks(original)

    await mkdir(path.dirname(dstPath), { recursive: true })
    await writeFile(dstPath, updated, 'utf8')
  }
}

async function main() {
  const readmePath = path.join(sourceRoot, 'README.md')

  if (!(await exists(readmePath))) {
    throw new Error(
      `RelationalStats repo was not found at ${sourceRoot}. ` +
      `Set RELATIONALSTATS_REPO=/path/to/relationalstats.`
    )
  }

  await mkdir(targetRoot, { recursive: true })
  await rm(referenceRoot, { recursive: true, force: true })
  await mkdir(referenceRoot, { recursive: true })

  const packageReadme = rewriteLinks(await readFile(readmePath, 'utf8'))
  await writeFile(path.join(targetRoot, 'package.md'), packageReadme, 'utf8')

  await copyMarkdownTree(
    path.join(sourceRoot, 'docs'),
    path.join(referenceRoot, 'docs')
  )

  await copyMarkdownTree(
    path.join(sourceRoot, 'examples'),
    path.join(referenceRoot, 'examples')
  )

  await copyMarkdownTree(
    path.join(sourceRoot, 'notebooks'),
    path.join(referenceRoot, 'notebooks')
  )

  console.log('RelationalStats documentation synced from:', sourceRoot)
  console.log('Output:', targetRoot)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})