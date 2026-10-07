import { readFile, writeFile, readdir } from 'node:fs/promises'
const manifestPath = 'assets/theme-imagegen/manifest-outline-v3.json'
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const selected = process.argv.slice(2)
const files = ['slides.md', ...await Promise.all(['lezioni', 'components'].map(async directory =>
  (await readdir(directory)).filter(name => /\.(md|vue)$/.test(name)).map(name => `${directory}/${name}`))).then(groups => groups.flat())]
const artworkPath = 'data/card-artwork.json'
const artwork = JSON.parse(await readFile(artworkPath, 'utf8'))
for (const job of manifest.jobs.filter(job => (!selected.length || selected.includes(job.id)) && !job.published)) {
  if (job.visualReview.status !== 'accepted') continue
  const oldPath = '/' + job.previous.web.replace(/^public\//, '')
  const newPath = '/' + job.web.replace(/^public\//, '')
  if (job.group === 'card') artwork.assets[job.key] = newPath
  else if (job.group === 'thematic') artwork.thematicAssets[job.key] = newPath
  else {
    let references = 0
    for (const file of files) {
      const source = await readFile(file, 'utf8')
      if (!source.includes(oldPath)) continue
      references += source.split(oldPath).length - 1
      await writeFile(file, source.replaceAll(oldPath, newPath))
    }
    if (!references) throw new Error(`No literal runtime reference for ${job.id}`)
  }
  job.published = true
  console.log(JSON.stringify({ id: job.id, path: newPath, slideUses: job.owners.length }))
}
await writeFile(artworkPath, JSON.stringify(artwork, null, 2) + '\n')
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
