import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildLessonDecks } from '../../progetti/slide/scripts/build/lesson-decks.mjs'
import { optimizePagesMedia } from './pages-media.mjs'
import { checkPublishedBuild } from '../../progetti/slide/scripts/check/publication.mjs'
import { copyWebDesignExamples } from '../../progetti/slide/scripts/build/web-design-examples.mjs'
import { webDesignExamplesDirectory } from '../lib/web-design-examples.mjs'
import { copyCourseHome } from '../../progetti/home/scripts/build/course-home.mjs'
import { preventSiteIndexing } from './noindex.mjs'
import { copyProjectArchiveRedirects } from './project-archive-redirects.mjs'
import { copyIlmeteo } from '../../progetti/ilmeteo/scripts/build/ilmeteo.mjs'
import { ilmeteoDirectory } from '../lib/ilmeteo.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))
const output = path.join(root, '_site')
const base = process.env.PAGES_BASE || '/cvedi2627/'
if (!/^\/(?:[^?#\s]+\/)?$/.test(base)) throw new Error('PAGES_BASE must start and end with /')

await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
await buildLessonDecks(path.join(output, 'slides'), `${base}slides/`)
await checkPublishedBuild(path.join(output, 'slides'))
await copyWebDesignExamples(path.join(output, webDesignExamplesDirectory))
await copyIlmeteo(path.join(output, ilmeteoDirectory))
await cp(path.join(root, 'progetti/fisioterapia/dist'), path.join(output, 'fisioterapia'), { recursive: true })

// The PDF is generated manually at the end and is optional for publication.
const pdf = path.join(root, 'cvedi-2026-2027.pdf')
if (existsSync(pdf))
  await cp(pdf, path.join(output, 'slides/cvedi-2026-2027.pdf'))
await writeFile(path.join(output, '.nojekyll'), '')
await copyCourseHome(output)
await copyProjectArchiveRedirects(output, base)
await preventSiteIndexing(output)
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
