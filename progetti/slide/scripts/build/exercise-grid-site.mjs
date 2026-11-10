// Rebuild and catalogue the Grid evolution of the existing Flexbox teaching site.
import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
const root = 'progetti/slide/assets/esercitazioni'
const folder = `${root}/esempio-03`
const manifestPath = `${root}/schemi/manifest.json`
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const hash = async path => createHash('sha256').update(await readFile(path)).digest('hex')
const illustration = (await readFile(`${root}/schemi/image.svg`, 'utf8'))
  .replace(/<rect[^>]*\/>/g, '').replace(/<circle[^>]*r="4"[^>]*\/>/g, '')
  .replace('</title>', '</title><rect width="360" height="180" fill="#292c38"/>')
await writeFile(`${folder}/paesaggio.svg`, illustration)
for (const width of [480, 960, 1440]) {
  const process = spawnSync('magick', ['-density', '384', `${folder}/paesaggio.svg`, '-resize', `${width}x${width / 2}`, '-quality', '86', `${folder}/immagine-${width}.webp`], { stdio: 'inherit' })
  if (process.status !== 0) throw new Error('Could not prepare responsive image candidates')
}
const files = ['index.html','chi-siamo.html','contatti.html','stile.css',...['480','960','1440'].map(width => `immagine-${width}.webp`)]
for (const file of [...files, 'tokens.css']) {
  const source = file === 'tokens.css' ? 'risorse-condivise/stili/tokens.css' : `${folder}/${file}`
  const entry = { source: file === 'tokens.css' ? '../../../../../risorse-condivise/stili/tokens.css' : `../esempio-03/${file}`, web: `/images/esercitazioni/esercizio-03/${file}`, sha256: await hash(source), exercise: '03' }
  const index = manifest.demos.findIndex(asset => asset.web === entry.web)
  if (index < 0) manifest.demos.push(entry)
  else manifest.demos[index] = entry
  await mkdir('progetti/slide/public/images/esercitazioni/esercizio-03', {recursive:true})
  await copyFile(source, `progetti/slide/public${entry.web}`)
}
manifest.gridExerciseDemo = {
  entry: '/images/esercitazioni/esercizio-03/index.html',
  evolvesFrom: 'progetti/slide/assets/esercitazioni/esempio-01',
  description: 'Stessi testi, colori, menu Flexbox e tre pagine del sito precedente; layout con Grid e immagine responsive nella home.',
  image: { original: 'image.svg', derivative: '../esempio-03/paesaggio.svg', adaptation: 'Paesaggio geometrico conservato, con rimozione della cornice e dei controlli della finestra per l’impiego come immagine del sito', author: manifest.author, widths: [480, 960, 1440], format: 'WebP', generator: 'progetti/slide/scripts/build/exercise-grid-site.mjs' },
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log('Grid teaching site prepared; three responsive image candidates catalogued')
