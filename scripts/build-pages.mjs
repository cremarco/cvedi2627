import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const output = path.join(root, '_site')
const base = process.env.PAGES_BASE || '/cvedi2627/'
if (!/^\/(?:[^?#\s]+\/)?$/.test(base)) throw new Error('PAGES_BASE must start and end with /')

await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
const build = spawnSync(process.execPath, [
  'node_modules/@slidev/cli/bin/slidev.mjs', 'build', 'slides.md',
  '--base', `${base}slides/`, '--out', '_site/slides',
], { cwd: root, stdio: 'inherit' })
if (build.status !== 0) process.exit(build.status ?? 1)

await cp(path.join(root, 'progetti'), path.join(output, 'project'), {
  recursive: true,
  filter: source => !['.DS_Store', '.git', 'node_modules'].includes(path.basename(source)),
})
// Legacy shared navigation uses archive-root URLs. Rewrite those for Pages.
async function prefixArchiveURLs(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name)
    if (entry.isDirectory()) await prefixArchiveURLs(location)
    else if (/\.(?:html|htm|css|js)$/i.test(entry.name)) {
      const original = await readFile(location, 'utf8')
      const updated = original.replace(/(?<![\w./-])\/a\.a\./g, `${base}project/a.a.`)
      if (updated !== original) await writeFile(location, updated)
    }
  }
}
await prefixArchiveURLs(path.join(output, 'project'))
// The PDF is generated manually at the end and is optional for publication.
const pdf = path.join(root, 'cvedi-2026-2027.pdf')
if (existsSync(pdf))
  await cp(pdf, path.join(output, 'slides/cvedi-2026-2027.pdf'))
await writeFile(path.join(output, '.nojekyll'), '')
await writeFile(path.join(output, 'index.html'), '<!doctype html><html lang="it"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=slides/"><title>CVeDI 2026/27</title><body><a class="link" href="slides/">Presentazione CVeDI 2026/27</a> · <a class="link" href="project/">Progetti</a></body></html>\n')

async function measure(directory) {
  let bytes = 0, files = 0
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      const child = await measure(location)
      bytes += child.bytes; files += child.files
    } else if (entry.isFile()) {
      bytes += (await stat(location)).size; files++
    } else throw new Error(`Unsupported Pages entry: ${location}`)
  }
  return { bytes, files }
}
const size = await measure(output)
console.log(`Pages: ${size.files} files, ${(size.bytes / 1e6).toFixed(2)} MB (${size.bytes} bytes)`)
// Keep room below GitHub Pages' published-site limit.
if (size.bytes > 990_000_000) throw new Error('The published site exceeds the 990 MB deployment budget')
