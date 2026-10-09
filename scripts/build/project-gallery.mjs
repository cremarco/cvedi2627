import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, mkdir, writeFile, mkdtemp, rm } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { projectArchiveURL } from '../../utils/project-archive.mjs'

const run = promisify(execFile)
const root = process.cwd()
const outputDir = path.join(root, 'public/images/project-gallery')
const manifestPath = path.join(root, 'data/projects.json')

async function download(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`)
  return response
}
const gallery = await (await download(new URL('gallery-data.json', projectArchiveURL))).json()
const projects = gallery.photos.map(photo => ({
  title: photo.name,
  year: photo['A.A.'].replace('-', '/'),
  source: new URL(`${photo.url.replace(/^\/+/, '')}screenshot.webp`, projectArchiveURL).href,
}))
const bySource = new Map(projects.map(project => [project.source, project]))
const previous = JSON.parse(await readFile(manifestPath, 'utf8').catch(() => '[]'))
const previousSources = previous.map(project => project.source).filter(source => bySource.has(source))
const ordered = [
  ...previousSources.map(source => bySource.get(source)),
  ...projects.filter(project => !previousSources.includes(project.source))
    .sort((a, b) => a.year.localeCompare(b.year) || a.title.localeCompare(b.title, 'it')),
]

await mkdir(outputDir, { recursive: true })
const manifest = []
const temporary = await mkdtemp(path.join(os.tmpdir(), 'cvedi-project-gallery-'))
try {
  for (const [index, project] of ordered.entries()) {
    const file = `${String(index + 1).padStart(3, '0')}.jpg`
    const destination = path.join(outputDir, file)
    const screenshot = path.join(temporary, 'screenshot.webp')
    await writeFile(screenshot, Buffer.from(await (await download(project.source)).arrayBuffer()))
    await run('sips', [
      '-s', 'format', 'jpeg',
      '-s', 'formatOptions', '74',
      '-Z', '320',
      screenshot,
      '--out', destination,
    ])
    manifest.push({ ...project, image: `/images/project-gallery/${file}` })
  }
} finally { await rm(temporary, { recursive: true, force: true }) }
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Prepared ${manifest.length} project screenshots for the gallery.`)
