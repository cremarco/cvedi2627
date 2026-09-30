import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const run = promisify(execFile)
const root = process.cwd()
const sourceDir = path.join(root, 'progetti')
const outputDir = path.join(root, 'public/images/project-gallery')
const manifestPath = path.join(root, 'data/projects.json')
const galleryPath = path.join(sourceDir, 'gallery-data.json')

const gallery = JSON.parse(await readFile(galleryPath, 'utf8'))
const projects = gallery.photos.map(photo => ({
  title: photo.name,
  year: photo['A.A.'].replace('-', '/'),
  source: path.posix.join('progetti', photo.url.replace(/^\//, ''), 'screenshot.webp'),
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
for (const [index, project] of ordered.entries()) {
  const file = `${String(index + 1).padStart(3, '0')}.jpg`
  const destination = path.join(outputDir, file)
  await run('sips', [
    '-s', 'format', 'jpeg',
    '-s', 'formatOptions', '74',
    '-Z', '320',
    path.join(root, project.source),
    '--out', destination,
  ])
  manifest.push({ ...project, image: `/images/project-gallery/${file}` })
}
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Prepared ${manifest.length} project screenshots for the gallery.`)
