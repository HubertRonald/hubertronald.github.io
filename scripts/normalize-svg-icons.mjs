import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const iconsRoot = path.resolve('docs/public/icons')

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      await walk(fullPath)
      continue
    }

    if (!entry.name.endsWith('.svg')) {
      continue
    }

    const original = await readFile(fullPath, 'utf8')

    const updated = original
      .replaceAll('stroke="#111827"', 'stroke="currentColor"')
      .replaceAll("stroke='#111827'", "stroke='currentColor'")
      .replaceAll('fill="#111827"', 'fill="currentColor"')
      .replaceAll("fill='#111827'", "fill='currentColor'")

    if (updated !== original) {
      await writeFile(fullPath, updated, 'utf8')
      console.log(`Updated ${path.relative(process.cwd(), fullPath)}`)
    }
  }
}

await walk(iconsRoot)