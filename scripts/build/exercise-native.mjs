import { copyFile, mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { rebuildImportedSlide, nativeCorrections } from '../../data/esercitazioni/native-examples.mjs'
import { curriculum } from '../../data/esercitazioni/framework-curriculum.mjs'

const json = async file => JSON.parse(await readFile(file, 'utf8'))
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + '\n')
const digest = async file => createHash('sha256').update(await readFile(file)).digest('hex')
const folder = 'assets/esercitazioni/native-rebuild'
const manifest = await json('assets/esercitazioni/manifest.json')
await mkdir(`${folder}/images`, { recursive: true })
let rebuilt = 0
for (const exercise of manifest.exercises) {
  const number = String(exercise.number).padStart(2, '0')
  if (!exercise.nativeRebuild) {
    const data = `${folder}/${number}.json`, markdown = `${folder}/${number}.md`
    await copyFile(`data/esercitazioni/${number}.json`, data)
    await copyFile(exercise.file, markdown)
    exercise.nativeRebuild = { archive: { data, markdown, dataSha256: await digest(data), markdownSha256: await digest(markdown) } }
  }
  const before = await json(exercise.nativeRebuild.archive.data)
  const specification = curriculum.find(module => module.number === exercise.number)
  const slides = specification ? structuredClone(specification.slides) : before.map(slide => rebuildImportedSlide(slide, number))
  exercise.nativeRebuild.slides = before.filter(slide => slide.blocks.some(block => block.kind === 'image')).map(slide => slide.number)
  exercise.nativeRebuild.specification = 'data/esercitazioni/native-examples.mjs'
  exercise.nativeRebuild.renderer = 'components/ExerciseNative.vue'
  exercise.nativeRebuild.corrections = Object.keys(nativeCorrections).filter(key => key.startsWith(number + '/')).map(key => Number(key.split('/')[1]))
  rebuilt += exercise.nativeRebuild.slides.length
  await save(`data/esercitazioni/${number}.json`, slides)
}
manifest.archivedImages ??= []
for (const file of await readdir('public/images/esercitazioni').catch(error => { if (error.code === 'ENOENT') return []; throw error })) {
  const web = `/images/esercitazioni/${file}`, retained = `${folder}/images/${file}`
  const sha256 = await digest(`public${web}`)
  await rename(`public${web}`, retained)
  if (!manifest.archivedImages.some(image => image.web === web)) manifest.archivedImages.push({ web, retained, sha256 })
}
manifest.nativeRebuild = { requested: 'Estrarre i contenuti dalle immagini e ricostruire le slide con elementi nativi', slides: rebuilt, specification: 'data/esercitazioni/native-examples.mjs', renderer: 'components/ExerciseNative.vue', sourceBitmapsActive: 0 }
await save('assets/esercitazioni/manifest.json', manifest)
console.log(`${rebuilt} slides reconstructed; all source images retained in the archive`)
