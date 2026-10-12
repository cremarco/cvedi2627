import { lstat, readdir, readFile, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const outputs = ['dist', '_site', '.slidev', 'slides-export', 'output',
  '.impeccable/review', '.impeccable/critique', '.impeccable/hook.cache.json']
const excluded = new Set(['.git', 'node_modules', '.pnpm-store'])

/** Remove generated output while retaining reports referenced by provenance or docs. */
export async function cleanProject(root, { dryRun = false } = {}) {
  root = path.resolve(root)
  const protectedReports = new Set()
  async function readReferences(file) {
    const text = await readFile(file, 'utf8')
    for (const match of text.matchAll(/reports\/[A-Za-z0-9_./-]+/g)) {
      const relative = match[0].replace(/[./]+$/, '')
      if (relative === 'reports' || relative.split('/').includes('..')) continue
      try {
        await stat(path.join(root, relative))
        protectedReports.add(relative)
      } catch (error) { if (error.code !== 'ENOENT') throw error }
    }
  }
  async function scanReferences(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (excluded.has(entry.name)) continue
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) await scanReferences(file)
      else if (entry.isFile() && /\.(md|json)$/.test(entry.name)) await readReferences(file)
    }
  }
  for (const file of ['README.md', 'DESIGN.md', 'PRODUCT.md']) {
    try { await readReferences(path.join(root, file)) }
    catch (error) { if (error.code !== 'ENOENT') throw error }
  }
  for (const directory of ['assets', 'docs', 'esempi']) {
    try { await scanReferences(path.join(root, directory)) }
    catch (error) { if (error.code !== 'ENOENT') throw error }
  }

  const removed = new Set()
  let removedBytes = 0
  let removedFiles = 0
  async function measure(relative) {
    if (removed.has(relative)) return
    const file = path.join(root, relative)
    const info = await lstat(file)
    if (info.isDirectory()) {
      for (const entry of await readdir(file)) await measure(`${relative}/${entry}`)
    } else { removedBytes += info.size; removedFiles++ }
  }
  async function remove(relative) {
    try { await measure(relative) }
    catch (error) { if (error.code === 'ENOENT') return; throw error }
    if (!dryRun) await rm(path.join(root, relative), { recursive: true, force: true })
    removed.add(relative)
  }
  for (const relative of outputs) await remove(relative)

  async function pruneReports(relative) {
    if (protectedReports.has(relative)) return
    if ((await lstat(path.join(root, relative))).isSymbolicLink()) { await remove(relative); return }
    if (![...protectedReports].some(file => file.startsWith(`${relative}/`))) {
      await remove(relative)
      return
    }
    for (const entry of await readdir(path.join(root, relative))) await pruneReports(`${relative}/${entry}`)
  }
  try { await pruneReports('reports') }
  catch (error) { if (error.code !== 'ENOENT') throw error }

  async function pruneMetadata(relative = '') {
    let empty = true
    for (const entry of await readdir(path.join(root, relative), { withFileTypes: true })) {
      const child = relative ? `${relative}/${entry.name}` : entry.name
      if (removed.has(child)) continue
      if (excluded.has(entry.name) || entry.isSymbolicLink()) { empty = false; continue }
      if (entry.name === '.DS_Store' || entry.name.startsWith('._')) await remove(child)
      else if (entry.isDirectory()) { if (!await pruneMetadata(child)) empty = false }
      else empty = false
    }
    if (empty && relative) {
      if (protectedReports.has(relative)) return false
      await remove(relative)
    }
    return empty
  }
  await pruneMetadata()
  return { dryRun, removedFiles, removedBytes, removedPaths: [...removed], preservedReports: [...protectedReports].sort() }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const result = await cleanProject(fileURLToPath(new URL('..', import.meta.url)), { dryRun: process.argv.includes('--dry-run') })
  console.log(JSON.stringify(result, null, 2))
}
