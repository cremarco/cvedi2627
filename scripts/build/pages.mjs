import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { optimizePagesMedia } from './pages-media.mjs'
import { checkPublishedBuild } from '../check/publication.mjs'
import { copyWebDesignExamples } from './web-design-examples.mjs'
import { webDesignExamplesDirectory } from '../../utils/web-design-examples.mjs'
import { copyCourseHome } from './course-home.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))
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
await checkPublishedBuild(path.join(output, 'slides'))
await copyWebDesignExamples(path.join(output, webDesignExamplesDirectory))

await cp(path.join(root, 'progetti'), path.join(output, 'project'), {
  recursive: true,
  filter: source => !['.ds_store', 'desktop.ini', 'thumbs.db', '.git', 'node_modules', '__pycache__'].includes(path.basename(source).toLowerCase())
    && !path.basename(source).startsWith('._'),
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
await copyCourseHome(output)
// Publish only images used by the visible deck. Hidden chapters and older
// variants stay in the source tree and return automatically when referenced.
const slideAssets = path.join(output, 'slides/assets')
const references = (await Promise.all((await readdir(slideAssets)).filter(name => /\.(?:js|css)$/.test(name))
  .map(name => readFile(path.join(slideAssets, name), 'utf8')))).join('\n')
async function pruneUnusedSlideImages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name)
    if (entry.isDirectory()) await pruneUnusedSlideImages(location)
    else if (/\.(?:png|webp|jpe?g|gif|avif|svg)$/i.test(entry.name) && !references.includes(entry.name))
      await rm(location)
  }
}
// Only the derived export is pruned. Source and provenance assets stay in Git.
await pruneUnusedSlideImages(path.join(output, 'slides/images'))
const media = await optimizePagesMedia(output)
await writeFile(path.join(output, 'media-optimization.json'), JSON.stringify(media, null, 2) + '\n')
const revision = process.env.GITHUB_SHA || spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout.trim()
await writeFile(path.join(output, 'build-info.json'), JSON.stringify({ commit: revision, base }, null, 2) + '\n')

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
