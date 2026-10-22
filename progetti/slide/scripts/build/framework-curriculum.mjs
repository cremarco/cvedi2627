import { copyFile, mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { curriculum } from '../../data/esercitazioni/framework-curriculum.mjs'

const json = async file => JSON.parse(await readFile(file, 'utf8'))
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + '\n')
const archive = 'progetti/slide/assets/esercitazioni/bootstrap-archive'
const manifest = await json('progetti/slide/assets/esercitazioni/manifest.json')
if (manifest.nativeRebuild) throw new Error('Usare progetti/slide/scripts/build/exercise-native.mjs per applicare la specifica ai contenuti nativi correnti.')
await mkdir(`${archive}/images`, { recursive: true })
let root = await readFile('progetti/slide/slides.md', 'utf8')
let registry = await readFile('progetti/slide/utils/lesson-decks.mjs', 'utf8')
const digest = async file => createHash('sha256').update(await readFile(file)).digest('hex')
async function preserve(exercise) {
  if (exercise.archive) return
  const number = String(exercise.number).padStart(2, '0')
  const data = `${archive}/${number}.json`, markdown = `${archive}/${number}.md`
  await copyFile(`progetti/slide/data/esercitazioni/${number}.json`, data)
  await copyFile(exercise.file, markdown)
  exercise.archive = { data, markdown, slideCount: exercise.slideCount, title: exercise.title, dataSha256: await digest(data), markdownSha256: await digest(markdown) }
}
for (const module of curriculum) {
  const exercise = manifest.exercises.find(exercise => exercise.number === module.number)
  await preserve(exercise)
  const number = String(module.number).padStart(2, '0')
  const previousFile = exercise.file, previousTitle = exercise.title
  exercise.originalTitle ??= previousTitle
  exercise.title = `Esercitazione ${module.number} - ${module.title}`
  exercise.slug = module.slug
  exercise.file = `progetti/slide/esercitazioni/${number}-${module.slug}.md`
  exercise.slideCount = module.slides.length
  exercise.mappingScope = 'archived-import'
  exercise.replacement = { id: 'tailwind-daisyui-2026-10', kind: 'complete', specification: 'progetti/slide/data/esercitazioni/framework-curriculum.mjs', catalog: 'progetti/slide/assets/esercitazioni/tailwind-daisyui/sources.json', checkedOn: '2026-10-21' }
  await save(`progetti/slide/data/esercitazioni/${number}.json`, module.slides)
  const markdown = module.slides.map(slide => {
    const cover = ['cover', 'divider'].includes(slide.kind)
    const matter = ['layout: default', `class: ${cover ? 'chapter-slide' : 'content-slide exercise-slide reading-slide'}`, `lesson: ${exercise.id}`, `lessonSlide: ${slide.number}`, `exerciseNumber: ${module.number}`, 'sourceKind: official-docs', `footer: Esercitazione ${number} · CVeDI 2026/27`]
    if (slide.number === 1) matter.push(`routeAlias: ${exercise.id}`)
    const body = cover ? `<ChapterMetro section="${exercise.coverRoute ?? exercise.palette}" />\n\n# ${slide.title}\n\n<p>Materiali del corso · fonti ufficiali Tailwind CSS e daisyUI</p>` : `# ${slide.title}\n\n<ExerciseContent exercise="${number}" :slide="${slide.number}" />`
    return `---\n${matter.join('\n')}\n---\n\n${body}\n`
  }).join('\n')
  await writeFile(exercise.file, markdown)
  root = root.replaceAll(previousFile, exercise.file).replaceAll(`<span>${previousTitle.replace(/^Esercitazione \d+\s*-\s*/, '').trim()}</span>`, `<span>${module.title}</span>`)
  registry = registry.replaceAll(previousFile, exercise.file).replaceAll(previousTitle, exercise.title)
  if (previousFile !== exercise.file) await unlink(previousFile)
}
const third = manifest.exercises.find(exercise => exercise.number === 3)
await preserve(third)
third.replacement = { id: 'tailwind-daisyui-2026-10', kind: 'partial', slides: [11], reason: 'Rimando alle proprietà logiche aggiornato a Tailwind', catalog: 'progetti/slide/assets/esercitazioni/tailwind-daisyui/sources.json' }
const thirdData = await json('progetti/slide/data/esercitazioni/03.json')
const slide = thirdData.find(slide => slide.number === 11)
const replacement = 'Tailwind usa ps-* e pe-* per il padding logico: la direzione segue il contesto di scrittura.'
slide.blocks[1].paragraphs[1] = { text: replacement, runs: [{ text: replacement, href: 'https://tailwindcss.com/docs/padding', underline: true }], bullet: false, level: 0 }
slide.revision = 'tailwind-daisyui-2026-10'
slide.sourceKind = 'revised-import'
await save('progetti/slide/data/esercitazioni/03.json', thirdData)
root = root.replace('<s class="syllabus-retired">Analisi e utilizzo del framework <strong>Bootstrap</strong></s>', 'Utility e layout con <strong>Tailwind CSS</strong>; componenti e temi con <strong>daisyUI</strong>')
root = root.replace('Cenni di <strong>JavaScript</strong> per i componenti di <s class="syllabus-retired">Bootstrap</s>', 'Cenni di <strong>JavaScript</strong> per il comportamento delle interfacce')
await writeFile('progetti/slide/slides.md', root)
await writeFile('progetti/slide/utils/lesson-decks.mjs', registry)

// The original source mapping describes the retained import, not the new prose.
const activeImages = new Set()
for (const exercise of manifest.exercises) for (const slide of await json(`progetti/slide/data/esercitazioni/${String(exercise.number).padStart(2, '0')}.json`))
  for (const block of slide.blocks) if (block.kind === 'image') activeImages.add(block.src)
manifest.archivedImages ??= []
for (const file of await readdir('progetti/slide/public/images/esercitazioni')) {
  const web = `/images/esercitazioni/${file}`
  if (activeImages.has(web)) continue
  const retained = `${archive}/images/${file}`
  const hash = await digest(`progetti/slide/public${web}`)
  await rename(`progetti/slide/public${web}`, retained)
  if (!manifest.archivedImages.some(image => image.web === web)) manifest.archivedImages.push({ web, retained, sha256: hash })
}
manifest.slideCount = manifest.exercises.reduce((sum, exercise) => sum + exercise.slideCount, 0)
manifest.editorialRevision = { id: 'tailwind-daisyui-2026-10', requested: 'Sostituire Bootstrap con Tailwind CSS e daisyUI, arricchendo le slide con fonti online', specification: 'progetti/slide/data/esercitazioni/framework-curriculum.mjs', catalog: 'progetti/slide/assets/esercitazioni/tailwind-daisyui/sources.json', newSlides: curriculum.reduce((sum, module) => sum + module.slides.length, 0), archivedOriginalsUnchanged: true }
await save('progetti/slide/assets/esercitazioni/manifest.json', manifest)
console.log(`${manifest.editorialRevision.newSlides} slides updated; original imports archived`)
