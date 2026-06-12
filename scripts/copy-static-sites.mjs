import { access, cp, mkdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const repoRoot = process.cwd()
const distDir = path.resolve(repoRoot, 'docs/.vitepress/dist')

const copyTasks = [
  {
    name: 'Root under construction page',
    source: 'static-sites/root-under-construction',
    target: '.',
    mode: 'overlay-root',
    ignore: [
      '.github',
      'README.md',
      'LICENSE'
    ]
  },
  {
    name: 'LiaSoft static site',
    source: 'static-sites/liasoft',
    target: 'liasoft',
    mode: 'replace-target'
  },
  {
    name: 'SuperWariBrosWebPlayer game build',
    source: 'static-apps/liasoft/games/SuperWariBrosWebPlayer',
    target: 'liasoft/games/SuperWariBrosWebPlayer',
    mode: 'replace-target'
  }
]

function resolveFromRoot(relativePath) {
  return path.resolve(repoRoot, relativePath)
}

function assertInside(parentDir, childPath) {
  const relative = path.relative(parentDir, childPath)

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Unsafe path outside expected directory: ${childPath}`)
  }
}

async function pathExists(targetPath) {
  try {
    await access(targetPath)
    return true
  } catch {
    return false
  }
}

async function assertDirectoryExists(targetPath, label) {
  const info = await stat(targetPath).catch(() => null)

  if (!info) {
    throw new Error(`${label} does not exist: ${targetPath}`)
  }

  if (!info.isDirectory()) {
    throw new Error(`${label} is not a directory: ${targetPath}`)
  }
}

async function safeRemoveGeneratedTarget(targetAbs) {
  assertInside(distDir, targetAbs)

  if (targetAbs === distDir) {
    throw new Error('Refusing to delete the entire VitePress dist directory.')
  }

  if (await pathExists(targetAbs)) {
    console.log(`Removing generated target: ${path.relative(repoRoot, targetAbs)}`)
    await rm(targetAbs, { recursive: true, force: true })
  }
}

function shouldCopyPath(sourceAbs, currentPath, ignore = []) {
  const relativePath = path
    .relative(sourceAbs, currentPath)
    .split(path.sep)
    .join('/')

  if (relativePath === '') {
    return true
  }

  return !ignore.some((ignoredPath) => {
    return relativePath === ignoredPath || relativePath.startsWith(`${ignoredPath}/`)
  })
}

async function copyDirectory(task) {
  const sourceAbs = resolveFromRoot(task.source)
  const targetAbs = path.resolve(distDir, task.target)

  await assertDirectoryExists(sourceAbs, `Source for ${task.name}`)

  if (sourceAbs.startsWith(distDir + path.sep)) {
    throw new Error(`Refusing to copy from generated dist directory: ${sourceAbs}`)
  }

  if (task.mode === 'replace-target') {
    await safeRemoveGeneratedTarget(targetAbs)
    await mkdir(path.dirname(targetAbs), { recursive: true })
  }

  if (task.mode === 'overlay-root') {
    if (targetAbs !== distDir) {
      throw new Error('overlay-root mode can only target the dist root.')
    }

    console.log(`Overlaying root static page from: ${path.relative(repoRoot, sourceAbs)}`)
  } else {
    console.log(`Copying ${task.name}`)
    console.log(`  from: ${path.relative(repoRoot, sourceAbs)}`)
    console.log(`  to:   ${path.relative(repoRoot, targetAbs)}`)
  }

  await cp(sourceAbs, targetAbs, {
    recursive: true,
    force: true,
    dereference: false,
    filter: (currentPath) => shouldCopyPath(sourceAbs, currentPath, task.ignore ?? [])
  })
}

async function main() {
  await assertDirectoryExists(distDir, 'VitePress dist directory')

  for (const task of copyTasks) {
    await copyDirectory(task)
  }

  await writeFile(path.join(distDir, '.nojekyll'), '', 'utf8')

  console.log('Static root, static sites, and apps copied successfully.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})