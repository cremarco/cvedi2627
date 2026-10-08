import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
const folder = path.resolve('esempi/caffe-luce')
const directory = path.join(folder, 'assets/ttc-v3')
const images = {}
for (const file of await readdir(directory)) {
  if (!/^provenance-[a-z0-9]+\.json$/.test(file)) continue
  const id = file.match(/^provenance-(.+)\.json$/)[1]
  const provenance = JSON.parse(await readFile(path.join(directory, file), 'utf8'))
  const dimensions = provenance.runtime?.dimensions || provenance.dimensions || provenance.output?.dimensions
  let width = provenance.runtime?.width || dimensions?.width || provenance.width || 1024
  let height = provenance.runtime?.height || dimensions?.height || provenance.height || 1536
  const runtimePath = path.join(directory, `${id}.webp`)
  const bytes = (await stat(runtimePath)).size
  const w = Math.floor(width / 2), h = Math.floor(height / 3)
  images[id] = { src: `assets/ttc-v3/${id}.webp`, width, height, bytes,
    regions: provenance.runtime?.regions || provenance.regions || { hero: [0,0,w,h], locale: [w,0,w,h], coffee: [0,h,w,h], croissant: [w,h,w,h], tea: [0,2*h,w,h], frontage: [w,2*h,w,h] } }
}
await writeFile(path.join(folder, 'immagini.js'), `window.CAFFE_IMAGES = ${JSON.stringify(images, null, 2)};\n`)
console.log(`Metadati immagini TTC: ${Object.keys(images).length} serie.`)
