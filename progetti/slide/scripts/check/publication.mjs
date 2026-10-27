import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { readFile, realpath, readdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { publicationExtensions, localAssetDirectories, sharedLessonAssetDirectories } from '../../utils/publication.mjs'
import { readGridsManifest } from './grids-source.mjs'

const root = fileURLToPath(new URL('../../../..', import.meta.url))

export async function checkPublication() {
  const require = createRequire(await realpath(path.join(root, 'node_modules/@slidev/cli/package.json')))
  const { load, injectPreparserExtensionLoader } = await import(require.resolve('@slidev/parser/fs'))
  const curriculum = JSON.parse(await readFile(path.join(root, 'progetti/slide/data/ux-curriculum.json'), 'utf8'))
  const exercises = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/esercitazioni/manifest.json'), 'utf8'))
  const grids = await readGridsManifest()
  const uxIds = new Set(curriculum.lessons.map(lesson => lesson.id))
  const localUxIds = curriculum.lessons.filter(lesson => lesson.localOnly === true).map(lesson => lesson.id)
  assert.deepEqual(localUxIds, [], 'the active historical UX lessons are published')
  const supplementalIds = [grids.lesson, 'composizione-gerarchia']
  const localIds = new Set([...localUxIds, ...exercises.exercises.map(exercise => exercise.id)])
  const options = { roots: [path.join(root, 'progetti/slide')], userRoot: path.join(root, 'progetti/slide'), allowedRoots: [root] }
  injectPreparserExtensionLoader(async (_roots, _headmatter, _file, mode) => publicationExtensions(mode))
  try {
    const local = await load(options, path.join(root, 'progetti/slide/slides.md'), undefined, 'dev')
    const published = await load(options, path.join(root, 'progetti/slide/slides.md'), undefined, 'build')
    for (const deck of [local, published]) {
      for (const file of Object.values(deck.markdownFiles)) assert.deepEqual(file.errors || [], [], `parse: ${file.filepath}`)
      for (const lesson of curriculum.archivedLessons) {
        assert.ok(!Object.hasOwn(deck.markdownFiles, path.join(root, lesson.file)), `${lesson.id}: archived files never enter either parser`)
        assert.ok(!deck.slides.some(slide => slide.frontmatter.lesson === lesson.id || slide.frontmatter.routeAlias === lesson.id), `${lesson.id}: archived slides and routes are absent locally and online`)
        const index = deck.slides.find(slide => slide.title === 'Indice delle lezioni').content
        assert.ok(!index.includes(`to="${lesson.id}"`), `${lesson.id}: archived menu destination is absent locally and online`)
      }
    }
    const localSlides = local.slides.filter(slide => uxIds.has(slide.frontmatter.lesson))
    const declaredUxSlides = curriculum.lessons.reduce((sum, lesson) => sum + lesson.slideCount, 0)
    assert.equal(localSlides.length, declaredUxSlides, 'active UX lessons match the curriculum')
    for (const lesson of curriculum.lessons) {
      const owned = localSlides.filter(slide => slide.frontmatter.lesson === lesson.id)
      assert.equal(owned.length, lesson.slideCount, `${lesson.id}: local publication count matches the curriculum`)
      assert.ok(owned.every(slide => (slide.frontmatter.localOnly === true) === localIds.has(lesson.id)), `${lesson.id}: publication visibility matches the curriculum`)
    }
    assert.equal(local.slides.filter(slide => slide.frontmatter.lesson === grids.lesson).length, grids.slideCount, 'supplementary grids count matches its independent current manifest')
    assert.ok(local.slides.filter(slide => slide.frontmatter.lesson === grids.lesson).every(slide => slide.frontmatter.localOnly !== true), 'all supplementary grids slides are published')
    assert.equal(local.slides.length, 243 + declaredUxSlides + exercises.slideCount + grids.slideCount + 70, 'complete local deck includes the supplementary grids set, index and exercises')
    assert.equal(published.slides.length, 853, 'published deck adds the 70 composition slides and preserves every published lesson')
    for (const deck of [local, published]) {
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'storia-design').length, 67, 'lesson 03 is available locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'storia-design'), 'lesson 03 retains its destination alias')
      assert.match(deck.slides.find(slide => slide.title === 'Indice delle lezioni').content, /<SlideAction\s+to=["']storia-design["']/, 'lesson 03 is linked from both indexes')
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'ricerca-inclusiva').length, 86, 'lesson 04 ends at slide 86 locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'ricerca-inclusiva'), 'lesson 04 retains its destination alias')
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'percezione-gerarchia').length, 105, 'lesson 05 is complete locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'percezione-gerarchia'), 'lesson 05 retains its destination alias')
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'tipografia-griglie').length, 116, 'lesson 08 is complete locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'tipografia-griglie'), 'lesson 08 retains its destination alias')
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === grids.lesson).length, grids.slideCount, 'lesson 09 is complete locally and online')
      assert.ok(deck.slides.filter(slide => slide.frontmatter.lesson === grids.lesson).every(slide => slide.frontmatter.narrationAudio), 'every grids slide keeps its audio locally and online')
      const composition = deck.slides.filter(slide => slide.frontmatter.lesson === 'composizione-gerarchia')
      assert.equal(composition.length, 70, 'composition is complete locally and online')
      assert.ok(composition.every(slide => slide.note?.trim() && !slide.frontmatter.narrationAudio), 'composition publishes its notes without audio')
      assert.ok(!deck.slides.some(slide => slide.frontmatter.routeAlias === 'tipografia-griglie-tipo-prove-esplorative'), 'the removed booklet content is absent locally and online')
    }
    assert.ok(published.slides.every(slide => !localIds.has(slide.frontmatter.lesson)), 'local lessons are absent from routes and overview')
    assert.deepEqual(published.slides.map(slide => slide.title), local.slides.filter(slide => !localIds.has(slide.frontmatter.lesson)).map(slide => slide.title), 'published content order is preserved')
    const localIndex = local.slides.find(slide => slide.title === 'Indice delle lezioni').content
    const publicIndex = published.slides.find(slide => slide.title === 'Indice delle lezioni').content
    const publicTargets = ['presentazione-corso', 'introduzione-teorica', 'storia-design', 'ricerca-inclusiva', 'percezione-gerarchia', 'gestalt', 'colore', 'tipografia-griglie']
    const supplementalTargets = ['brief-progetto', 'approfondimenti']
    const indexTargets = content => [...content.matchAll(/<SlideAction\s+to=["']([^"']+)["']/g)].map(match => match[1])
    const groupedPublicTargets = [...publicTargets.slice(0, 2), ...supplementalTargets, ...publicTargets.slice(2)]
    assert.deepEqual(indexTargets(localIndex), [...groupedPublicTargets, ...supplementalIds, ...localUxIds], 'local lesson index keeps materials grouped and places lesson 09 after typography')
    assert.deepEqual(indexTargets(publicIndex), [...groupedPublicTargets, ...supplementalIds], 'published index includes grids after typography in reading order')
    for (const content of [localIndex, publicIndex]) {
      const lessonTwo = content.match(/<div\s+class="join join-horizontal index-lesson-two"[^>]*>([\s\S]*?)<\/div>/)?.[1]
      assert.ok(lessonTwo, 'lesson 02 has one accessible group')
      assert.deepEqual(indexTargets(lessonTwo), ['introduzione-teorica', ...supplementalTargets], 'lesson 02 contains exactly its three destinations')
    }
    for (const content of [localIndex, publicIndex]) {
      assert.doesNotMatch(content, /index-lesson-type/, 'typography has its own numbered destination')
      assert.match(content, /<SlideAction\s+to="tipografia-griglie"[^>]*>\s*<span class="index-chapter-number">08<\/span>/, 'typography retains lesson 08 in both indexes')
      assert.match(content, /<SlideAction\s+to="griglie-layout"[^>]*>\s*<span class="index-chapter-number">09<\/span>/, 'grids retain lesson 09 in both indexes')
      assert.match(content, /<SlideAction\s+to="griglie-layout"[^>]*aria-label="09 Griglie e layout · Audio disponibile"[^>]*>[\s\S]*?<HeroIcon\s+name="speaker-wave"\s+class="index-audio-icon\s/, 'both indexes announce and show available grids audio')
    }
    assert.ok(Object.keys(published.markdownFiles).includes(path.join(root, 'progetti/slide/lezioni/07-griglie-layout.md')), 'supplementary grids source is imported by the published parser')
    assert.ok(!publicIndex.includes('LocalOnly'), 'no local-only wrapper remains in the public lesson index')
    for (const deck of [local, published]) {
      const index = deck.slides.find(slide => slide.title === 'Indice delle esercitazioni')
      assert.equal(index.index, 3, 'exercise index immediately follows the lesson index')
      assert.deepEqual(indexTargets(index.content), exercises.exercises.map(exercise => exercise.id), 'every exercise remains visible and ordered in both indexes')
      assert.equal([...index.content.matchAll(/<SlideAction\b[^>]*\blocal-only\b/g)].length, 9, 'every exercise action is disabled in production')
    }
    for (const exercise of exercises.exercises) {
      assert.equal(local.slides.filter(slide => slide.frontmatter.lesson === exercise.id).length, exercise.slideCount, 'local exercise count matches its preserved source mapping')
      assert.ok(!Object.keys(published.markdownFiles).includes(path.join(root, exercise.file)), 'exercise contents never enter the published parser')
    }
    for (const lesson of curriculum.lessons) {
      assert.ok(localIndex.includes(`to="${lesson.id}"`), `${lesson.id}: local destination exists`)
      if (!localIds.has(lesson.id)) {
        assert.ok(publicIndex.includes(`to="${lesson.id}"`), `${lesson.id}: published destination exists`)
        assert.ok(Object.keys(published.markdownFiles).includes(path.join(root, lesson.file)), `${lesson.id}: published source is imported`)
        continue
      }
      assert.ok(!publicIndex.includes(`to="${lesson.id}"`), `${lesson.id}: unpublished destination is absent`)
      assert.ok(!Object.keys(published.markdownFiles).includes(path.join(root, lesson.file)), `${lesson.id}: the source is never imported into the published bundle`)
    }
    return { localSlides: local.slides.length, publishedSlides: published.slides.length, localOnlyLessons: localUxIds.length, localOnlySupplementarySets: 0, archivedLessons: curriculum.archivedLessons.length, localOnlyExercises: exercises.exercises.length }
  } finally { injectPreparserExtensionLoader(null) }
}

export async function checkPublishedBuild(directory) {
  const output = path.resolve(root, directory)
  for (const directory of localAssetDirectories)
    await assert.rejects(access(path.join(output, directory)), { code: 'ENOENT' }, 'local figures are absent from the published output')
  async function bundleReferences(directory) {
    let result = ''
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, item.name)
      if (item.isDirectory() && (item.name === 'assets' || item.name === 'lezioni' || directory.endsWith(path.sep + 'lezioni'))) result += await bundleReferences(file)
      else if (item.isFile() && /\.(?:js|css)$/.test(item.name)) result += await readFile(file, 'utf8')
    }
    return result
  }
  const references = await bundleReferences(output)
  assert.ok(!references.includes('data-exercise-slide'), 'exercise content renderer is absent from published JavaScript')
  assert.ok(!references.includes('/data/esercitazioni/'), 'exercise data is absent from published JavaScript')
  const catalog = JSON.parse(await readFile(path.join(output, 'decks.json'), 'utf8'))
  const curriculum = JSON.parse(await readFile(path.join(root, 'progetti/slide/data/ux-curriculum.json'), 'utf8'))
  for (const lesson of curriculum.archivedLessons) {
    assert.ok(catalog.decks.every(deck => deck.id !== lesson.id), `${lesson.id}: archived lesson is absent from the published catalog`)
    await assert.rejects(access(path.join(output, 'lezioni', lesson.id)), { code: 'ENOENT' }, `${lesson.id}: direct archived lesson path is absent online`)
  }
  const grids = await readGridsManifest()
  const publishedGrids = catalog.decks.find(deck => deck.id === grids.lesson)
  assert.ok(publishedGrids, 'the supplementary grids deck is registered online')
  assert.equal(publishedGrids.slides.length, grids.slideCount, 'all 63 grids slides enter the published catalog')
  assert.deepEqual(publishedGrids.slides.map(slide => slide.alias), grids.slides.map(slide => slide.alias), 'the public grids route aliases preserve the lesson order')
  await access(path.join(output, 'lezioni/griglie-layout/index.html'))
  const gridsImages = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/booklet/lezione-griglie/image-manifest.json'), 'utf8'))
  const teaching = JSON.parse(await readFile(path.join(root, grids.teachingMaterials), 'utf8'))
  const selectedFigureCodes = new Set(grids.slides.flatMap(slide => slide.figures).map(String))
  const selectedFigures = [...gridsImages.images, ...teaching.images].filter(image => selectedFigureCodes.has(String(image.code)))
  for (const image of selectedFigures) {
    assert.ok(references.includes(image.web), `${image.code}: the active grids figure is referenced online`)
    assert.deepEqual(await readFile(path.join(output, image.web)), await readFile(path.join(root, 'progetti/slide/public', image.web)), `${image.code}: publication preserves selected grids figure bytes`)
  }
  assert.ok(references.includes(teaching.exerciseKit.download), 'the grids exercise download is referenced online')
  assert.deepEqual(await readFile(path.join(output, teaching.exerciseKit.download)), await readFile(path.join(root, 'progetti/slide/public', teaching.exerciseKit.download)), 'the online grids kit preserves its registered bytes')
  const approved = JSON.parse(await readFile(path.join(root, grids.audioSelectionSource), 'utf8'))
  assert.deepEqual(Object.keys(approved.clips), grids.slides.map(slide => slide.alias), 'every published grids slide has one selected recording')
  const audioFiles = await readdir(path.join(output, 'audio/lezione-griglie'))
  assert.deepEqual(audioFiles.sort(), Object.values(approved.clips).map(clip => path.basename(clip.web)).sort(), 'only the 63 selected audio files are published, without previous recordings')
  for (const [alias, clip] of Object.entries(approved.clips)) {
    assert.ok(references.includes(clip.web), `${alias}: the published slide references its selected recording`)
    const bytes = await readFile(path.join(output, clip.web))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), clip.sha256, `${alias}: the online recording matches its approved hash`)
    assert.deepEqual(bytes, await readFile(path.join(root, clip.source)), `${alias}: publication preserves the original MP3 bytes`)
  }
  assert.ok(catalog.decks.every(deck => !deck.id.startsWith('esercitazione-')), 'no exercise deck is registered online')
  const exercises = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/esercitazioni/manifest.json'), 'utf8'))
  for (const exercise of exercises.exercises)
    await assert.rejects(access(path.join(output, 'lezioni', exercise.id)), { code: 'ENOENT' }, 'direct exercise paths are absent online')
  for (const directory of localAssetDirectories)
    assert.ok(!references.includes('/' + directory + '/'), 'no published code references local figures')
  for (const directory of [...sharedLessonAssetDirectories, 'images/tipografia', 'images/font-previews']) {
    const expected = [...new Set([...references.matchAll(new RegExp('/' + directory + '/[^"\'\\s<>`)]+', 'g'))].map(match => match[0]))].sort()
    assert.ok(expected.length > 0, `${directory}: published lessons retain their selected figures and font specimens`)
    const actual = (await readdir(path.join(output, directory))).map(file => '/' + directory + '/' + file).sort()
    assert.deepEqual(actual, expected, `${directory}: only images referenced by published lessons are exported`)
    for (const asset of actual)
      assert.deepEqual(await readFile(path.join(output, asset)), await readFile(path.join(root, 'progetti/slide/public', asset)), `${asset}: publication preserves the original selected image bytes`)
  }
  const lessonArtwork = JSON.parse(await readFile(path.join(root, 'progetti/slide/data/card-artwork-local.json'), 'utf8'))
  for (const [id, asset] of Object.entries(lessonArtwork.assets)) {
    assert.ok(references.includes(asset), `${id}: lesson card artwork is registered in the published bundle`)
    assert.deepEqual(await readFile(path.join(output, asset)), await readFile(path.join(root, 'progetti/slide/public', asset)), `${id}: lesson artwork preserves its source bytes`)
  }
  return { output, publishedGridsSlides: grids.slideCount, publishedAudioClips: audioFiles.length, publishedGridsFigures: selectedFigures.length, localAssetsExcluded: true, exerciseDecksExcluded: exercises.exercises.length, exerciseDataExcluded: true }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await checkPublication()
  if (process.argv[2]) Object.assign(report, await checkPublishedBuild(process.argv[2]))
  console.log(JSON.stringify(report, null, 2))
}
