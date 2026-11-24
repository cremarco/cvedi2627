import { copyFile, mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises'
import { dirname, basename } from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { rebuildImportedSlide, nativeCorrections } from '../../data/esercitazioni/native-examples.mjs'
import { reviseExercise, reviseExerciseMarkdown, revisedExerciseNumber } from '../../data/esercitazioni/editorial-revisions.mjs'
import { componentDraft, curriculum, themeDraft } from '../../data/esercitazioni/framework-curriculum.mjs'
import { themeExampleStyles, themeRevision } from '../../data/esercitazioni/tailwind-theme.mjs'
import { studioThemeCSS, studioThemePath, workshopRevision } from '../../data/esercitazioni/daisy-workshop.mjs'
import { workedExamples } from '../../data/esercitazioni/worked-examples.mjs'

const json = async file => JSON.parse(await readFile(file, 'utf8'))
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + '\n')
const digest = async file => createHash('sha256').update(await readFile(file)).digest('hex')
const folder = 'progetti/slide/assets/esercitazioni/native-rebuild'
const manifest = await json('progetti/slide/assets/esercitazioni/manifest.json')
execFileSync(process.execPath, [
  'node_modules/@tailwindcss/cli/dist/index.mjs', '-i', '-',
  '-o', 'progetti/slide/assets/esercitazioni/tailwind-daisyui/theme-exercise.css', '--minify',
], { input: themeExampleStyles })
await mkdir(`${folder}/images`, { recursive: true })
const diagram = await json('progetti/slide/assets/esercitazioni/schemi/manifest.json')
await mkdir('progetti/slide/public/images/esercitazioni', { recursive: true })
const studioThemeFile = `progetti/slide/public${studioThemePath}`
await mkdir(dirname(studioThemeFile), { recursive: true })
await writeFile(studioThemeFile, `${studioThemeCSS}\n`)
for (const asset of [...diagram.diagrams, ...(diagram.demos || []), ...(diagram.screenshots || [])]) {
  await mkdir(dirname(`progetti/slide/public${asset.web}`), { recursive: true })
  await copyFile(`progetti/slide/assets/esercitazioni/schemi/${asset.source}`, `progetti/slide/public${asset.web}`)
}
let rebuilt = 0
for (const exercise of manifest.exercises) {
  const number = String(exercise.number).padStart(2, '0')
  if (!exercise.nativeRebuild) {
    const data = `${folder}/${number}.json`, markdown = `${folder}/${number}.md`
    await copyFile(`progetti/slide/data/esercitazioni/${number}.json`, data)
    await copyFile(exercise.file, markdown)
    exercise.nativeRebuild = { archive: { data, markdown, dataSha256: await digest(data), markdownSha256: await digest(markdown) } }
  }
  const before = await json(exercise.nativeRebuild.archive.data)
  const specification = curriculum.find(module => module.number === exercise.number)
  const slides = reviseExercise(specification ? structuredClone(specification.slides) : before.map(slide => rebuildImportedSlide(slide, number)), number)
  if (specification) {
    if (number === '06') {
      exercise.slug = specification.slug
      exercise.title = `Esercitazione ${exercise.number} - ${specification.title}`
      exercise.file = `progetti/slide/esercitazioni/${number}-${exercise.slug}.md`
      exercise.replacement = {
        id: themeRevision, kind: 'complete', specification: 'progetti/slide/data/esercitazioni/tailwind-theme.mjs',
        catalog: 'progetti/slide/docs/fonti/esercitazione-06-temi-tailwind.md', checkedOn: '2026-11-19',
      }
      exercise.editorialRevision = {
        reference: '01-html-css-base.md', adaptedFrom: { exercise: '07', slides: [3, 4, 5, 6, 9, 12, 13] },
        priorDraft: { specification: 'progetti/slide/data/esercitazioni/framework-curriculum.mjs', export: 'componentDraft', slideCount: componentDraft.slides.length },
      }
    }
    if (number === '07') {
      exercise.title = `Esercitazione ${exercise.number} - ${specification.title}`
      const workshopSpecification = 'progetti/slide/data/esercitazioni/daisy-workshop.mjs'
      exercise.replacement = {
        id: workshopRevision, kind: 'complete', specification: workshopSpecification,
        catalog: 'progetti/slide/assets/esercitazioni/tailwind-daisyui/sources.json', checkedOn: '2026-11-23',
      }
      exercise.editorialRevision = {
        reference: '01-html-css-base.md',
        adaptedFrom: { exercise: '06', slides: [28, 29, 30, 31] },
        priorDraft: { specification: 'progetti/slide/data/esercitazioni/framework-curriculum.mjs', export: 'themeDraft', slideCount: themeDraft.slides.length },
      }
    }
    const courseAuthor = ['05', '06'].includes(number)
    const credit = courseAuthor ? 'Elia Guarnieri · elia.guarnieri@unimib.it' : 'Materiali del corso · fonti ufficiali Tailwind CSS e daisyUI'
    exercise.slideCount = slides.length
    const markdown = slides.map(slide => {
      const cover = ['cover', 'divider'].includes(slide.kind)
      const matter = ['layout: default', `class: ${cover ? 'chapter-slide' : 'content-slide exercise-slide reading-slide'}`, `lesson: ${exercise.id}`, `lessonSlide: ${slide.number}`, `exerciseNumber: ${exercise.number}`, `sourceKind: ${slide.sourceKind ?? 'official-docs'}`, `footer: Esercitazione ${number} · ${courseAuthor ? 'Elia Guarnieri' : 'CVeDI 2026/27'}`]
      if (slide.number === 1) matter.push(`routeAlias: ${exercise.id}`)
      const coverCredit = slide.kind === 'cover' ? `\n\n<p>${credit}</p>` : ''
      const body = cover ? `<ChapterMetro section="${exercise.coverRoute ?? exercise.palette}" />\n\n# ${slide.title}${coverCredit}` : `# ${slide.title}\n\n<ExerciseContent exercise="${number}" :slide="${slide.number}" />`
      return `---\n${matter.join('\n')}\n---\n\n${body}\n`
    }).join('\n')
    await writeFile(exercise.file, markdown)
    if (number === '05') exercise.editorialRevision = {
      id: 'tailwind-intro-2026-11', specification: 'progetti/slide/data/esercitazioni/tailwind-intro.mjs',
      reference: '01-html-css-base.md', sourcesCheckedOn: '2026-11-16',
      path: ['frameworks-to-css', 'tailwind-playground-cdn-terminal-installation', 'utilities-responsive-and-exercises'],
      originalExercisePages: [5, 6, 9, 10, 12, 18, 20, 21, 22, 23, 24, 28, 29, 30, 31],
      archive: 'progetti/slide/assets/esercitazioni/tailwind-intro/archivio',
    }
  }
  if (number === '01') {
    exercise.slideCount = slides.length
    await writeFile(exercise.file, reviseExerciseMarkdown(await readFile(exercise.nativeRebuild.archive.markdown, 'utf8'), number))
    exercise.currentMapping = exercise.mapping.map(entry => ({ ...entry, slides: [...new Set(entry.slides.map(no => revisedExerciseNumber(no)))] }))
    exercise.editorialRevision = { specification: 'progetti/slide/data/esercitazioni/editorial-revisions.mjs', merges: [{ originalSlides: [5, 6], destination: 5 }, { originalSlides: [7, 8], destination: 6 }, { originalSlides: [10, 11], destination: 8 }, { originalSlides: [12, 13], destination: 9 }, { originalSlides: [20, 21], destination: 16 }, { originalSlides: [22, 23], destination: 17 }, { originalSlides: [24, 25], destination: 18 }, { originalSlides: [28, 29, 30], destination: 21 }, { originalSlides: [31, 32], destination: 22 }, { originalSlides: [34, 35], destination: 24 }, { originalSlides: [36, 37], destination: 25 }, { originalSlides: [38, 39, 40], destination: 26 }, { originalSlides: [41, 42, 43], destination: 27 }, { originalSlides: [45, 46], destination: 29 }, { originalSlides: [57, 58], destination: 40 }, { originalSlides: [61, 62, 63], destination: 43 }, { originalSlides: [67, 68, 69], destination: 47 }, { originalSlides: [71, 72, 73], destination: 49 }, { originalSlides: [74, 75, 76], destination: 50 }, { originalSlides: [81, 82], destination: 55 }, { originalSlides: [83, 84, 85], destination: 56 }, { originalSlides: [86, 87, 88], destination: 57 }, { originalSlides: [89, 90], destination: 58 }, { originalSlides: [91, 92, 93], destination: 59 }, { originalSlides: [94, 95, 96], destination: 60 }, { originalSlides: [97, 98, 99, 100], destination: 61 }, { originalSlides: [101, 102], destination: 62 }, { originalSlides: [104, 105], destination: 64 }, { originalSlides: [106, 107], destination: 65 }], diagram: 'progetti/slide/assets/esercitazioni/schemi/manifest.json' }
  }
  if (number === '02' || number === '03' || number === '04') {
    exercise.slideCount = slides.length
    const markdown = slides.map(slide => {
      const cover = ['cover', 'divider'].includes(slide.kind)
      const matter = ['layout: default', `class: ${cover ? 'chapter-slide' : 'content-slide exercise-slide reading-slide'}`, `lesson: ${exercise.id}`, `lessonSlide: ${slide.number}`, `exerciseNumber: ${exercise.number}`, `sourceSlide: ${slide.sourceSlide}`, `sourceSlides: [${slide.sourceSlides.join(', ')}]`, `footer: Esercitazione ${number} · Elia Guarnieri`]
      if (slide.number === 1) matter.push(`routeAlias: ${exercise.id}`)
      const body = cover ? `<ChapterMetro section="${exercise.palette}" />\n\n# ${slide.title}${slide.number === 1 ? '\n\n<p>Elia Guarnieri · elia.guarnieri@unimib.it</p>' : ''}` : `# ${slide.title}\n\n<ExerciseContent exercise="${number}" :slide="${slide.number}" />`
      return `---\n${matter.join('\n')}\n---\n\n${body}\n`
    }).join('\n')
    await writeFile(exercise.file, markdown)
    exercise.currentMapping = exercise.mapping.map(entry => ({ ...entry, slides: slides.filter(slide => slide.sourceSlides.includes(entry.sourceSlide)).map(slide => slide.number) }))
    exercise.editorialRevision = { specification: `progetti/slide/data/esercitazioni/${number === '02' ? 'advanced' : number === '03' ? 'grid' : 'responsive'}-revisions.mjs`, reference: '01-html-css-base.md', ...(number === '02' ? { nativeExamples: 'progetti/slide/data/esercitazioni/advanced-examples.mjs' } : {}) }
  }
  exercise.nativeRebuild.slides = before.filter(slide => slide.blocks.some(block => block.kind === 'image')).map(slide => slide.number)
  exercise.nativeRebuild.specification = 'progetti/slide/data/esercitazioni/native-examples.mjs'
  exercise.nativeRebuild.renderer = 'progetti/slide/components/ExerciseNative.vue'
  exercise.nativeRebuild.corrections = Object.keys(nativeCorrections).filter(key => key.startsWith(number + '/')).map(key => Number(key.split('/')[1]))
  rebuilt += exercise.nativeRebuild.slides.length
  await save(`progetti/slide/data/esercitazioni/${number}.json`, slides)
}
manifest.archivedImages ??= []
for (const entry of await readdir('progetti/slide/public/images/esercitazioni', { withFileTypes: true }).catch(error => { if (error.code === 'ENOENT') return []; throw error })) {
  const file = entry.name
  if (!entry.isFile() || /\.(svg|html)$/.test(file) || (diagram.screenshots || []).some(asset => basename(asset.web) === file)) continue
  const web = `/images/esercitazioni/${file}`, retained = `${folder}/images/${file}`
  const sha256 = await digest(`progetti/slide/public${web}`)
  await rename(`progetti/slide/public${web}`, retained)
  if (!manifest.archivedImages.some(image => image.web === web)) manifest.archivedImages.push({ web, retained, sha256 })
}
manifest.nativeRebuild = { ...manifest.nativeRebuild, requested: 'Estrarre i contenuti dalle immagini e ricostruire le slide con elementi nativi', slides: rebuilt, specification: 'progetti/slide/data/esercitazioni/native-examples.mjs', renderer: 'progetti/slide/components/ExerciseNative.vue', sourceBitmapsActive: (diagram.screenshots || []).length }
manifest.slideCount = manifest.exercises.reduce((sum, exercise) => sum + exercise.slideCount, 0)
manifest.editorialRevision.newSlides = curriculum.reduce((sum, module) => sum + module.slides.length, 0)
manifest.editorialRevision.workedExamples = { ...manifest.editorialRevision.workedExamples, specification: 'progetti/slide/data/esercitazioni/worked-examples.mjs', scenarios: workedExamples.length, addedSlides: workedExamples.length * 2, method: 'Codice, risultato nativo, osservazione e modifica guidata' }
await save('progetti/slide/assets/esercitazioni/manifest.json', manifest)
console.log(`${rebuilt} slides reconstructed; all source images retained in the archive`)
