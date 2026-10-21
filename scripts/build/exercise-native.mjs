import { copyFile, mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { rebuildImportedSlide, nativeCorrections } from '../../data/esercitazioni/native-examples.mjs'
import { curriculum } from '../../data/esercitazioni/framework-curriculum.mjs'
import { workedExamples } from '../../data/esercitazioni/worked-examples.mjs'

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
  if (specification) {
    exercise.slideCount = slides.length
    const markdown = slides.map(slide => {
      const cover = ['cover', 'divider'].includes(slide.kind)
      const matter = ['layout: default', `class: ${cover ? 'chapter-slide' : 'content-slide exercise-slide reading-slide'}`, `lesson: ${exercise.id}`, `lessonSlide: ${slide.number}`, `exerciseNumber: ${exercise.number}`, 'sourceKind: official-docs', `footer: Esercitazione ${number} · CVeDI 2026/27`]
      if (slide.number === 1) matter.push(`routeAlias: ${exercise.id}`)
      const body = cover ? `<ChapterMetro section="${exercise.palette}" />\n\n# ${slide.title}\n\n<p>Materiali del corso · fonti ufficiali Tailwind CSS e daisyUI</p>` : `# ${slide.title}\n\n<ExerciseContent exercise="${number}" :slide="${slide.number}" />`
      return `---\n${matter.join('\n')}\n---\n\n${body}\n`
    }).join('\n')
    await writeFile(exercise.file, markdown)
  }
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
manifest.slideCount = manifest.exercises.reduce((sum, exercise) => sum + exercise.slideCount, 0)
manifest.editorialRevision.newSlides = curriculum.reduce((sum, module) => sum + module.slides.length, 0)
manifest.editorialRevision.workedExamples = { specification: 'data/esercitazioni/worked-examples.mjs', scenarios: workedExamples.length, addedSlides: workedExamples.length * 2, method: 'Codice, risultato nativo, osservazione e modifica guidata' }
await save('assets/esercitazioni/manifest.json', manifest)
console.log(`${rebuilt} slides reconstructed; all source images retained in the archive`)
