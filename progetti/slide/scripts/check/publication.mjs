import assert from 'node:assert/strict'
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
  const supplementalIds = [grids.lesson]
  const localIds = new Set([...localUxIds, ...supplementalIds, ...exercises.exercises.map(exercise => exercise.id)])
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
    assert.ok(local.slides.filter(slide => slide.frontmatter.lesson === grids.lesson).every(slide => slide.frontmatter.localOnly === true), 'all supplementary grids slides inherit local visibility')
    assert.equal(local.slides.length, 243 + declaredUxSlides + exercises.slideCount + grids.slideCount, 'complete local deck includes the supplementary grids set, index and exercises')
    assert.equal(published.slides.length, 720, 'published deck includes the exercise index and preserves the published lessons')
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
    assert.deepEqual(indexTargets(publicIndex), groupedPublicTargets, 'published index preserves available destinations in reading order')
    for (const content of [localIndex, publicIndex]) {
      const lessonTwo = content.match(/<div\s+class="join join-horizontal index-lesson-two"[^>]*>([\s\S]*?)<\/div>/)?.[1]
      assert.ok(lessonTwo, 'lesson 02 has one accessible group')
      assert.deepEqual(indexTargets(lessonTwo), ['introduzione-teorica', ...supplementalTargets], 'lesson 02 contains exactly its three destinations')
    }
    const localLessonGroup = localIndex.match(/<div\s+class="index-ux-lessons"[^>]*>([\s\S]*?)<\/div>/)?.[1]
    assert.deepEqual(indexTargets(localLessonGroup ?? ''), [...supplementalIds, ...localUxIds], 'lesson 09 remains the only local theory destination')
    for (const content of [localIndex, publicIndex]) {
      assert.doesNotMatch(content, /index-lesson-type/, 'typography has its own numbered destination')
      assert.match(content, /<SlideAction\s+to="tipografia-griglie"[^>]*>\s*<span class="index-chapter-number">08<\/span>/, 'typography retains lesson 08 in both indexes')
    }
    for (const [id, number] of [[grids.lesson, 9], ...curriculum.lessons.filter(lesson => lesson.localOnly).map(lesson => [lesson.id, lesson.number])])
      assert.match(localLessonGroup ?? '', new RegExp(`<SlideAction\\s+to="${id}"[^>]*>\\s*<span class="index-chapter-number">${String(number).padStart(2, '0')}<\\/span>`), `${id}: the local menu shows lesson ${number}`)
    assert.ok(!Object.keys(published.markdownFiles).includes(path.join(root, 'progetti/slide/lezioni/07-griglie-layout.md')), 'supplementary grids source never enters the published parser')
    assert.ok(localIndex.includes('index-ux-lessons'), 'local lesson index remains available')
    assert.ok(!publicIndex.includes('LocalOnly') && !publicIndex.includes('index-ux-lessons'), 'local index is removed before compilation')
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
    return { localSlides: local.slides.length, publishedSlides: published.slides.length, localOnlyLessons: localUxIds.length, localOnlySupplementarySets: supplementalIds.length, archivedLessons: curriculum.archivedLessons.length, localOnlyExercises: exercises.exercises.length }
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
  assert.ok(catalog.decks.every(deck => deck.id !== 'griglie-layout'), 'the supplementary grids deck is absent online')
  await assert.rejects(access(path.join(output, 'lezioni/griglie-layout')), { code: 'ENOENT' }, 'the direct supplementary grids path is absent online')
  const gridsImages = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/booklet/lezione-griglie/image-manifest.json'), 'utf8'))
  assert.ok(!references.includes('/images/shared/figure/griglia-slidev/'), 'exclusive supplementary grids SVGs are absent from published JavaScript')
  for (const image of gridsImages.images.filter(image => image.transformation !== 'identical-bytes'))
    await assert.rejects(access(path.join(output, image.web)), { code: 'ENOENT' }, 'exclusive supplementary grids SVGs are absent from the published files')
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
  const unpublishedCardIds = new Set(Object.values(lessonArtwork.mappings['griglie-layout']))
  for (const [id, asset] of Object.entries(lessonArtwork.assets)) {
    if (unpublishedCardIds.has(id)) {
      assert.ok(!references.includes(asset), `unpublished grid illustration is absent from the bundle: ${asset}`)
      await assert.rejects(access(path.join(output, asset)), { code: 'ENOENT' }, `unpublished grid illustration is absent from the files: ${asset}`)
      continue
    }
    assert.ok(references.includes(asset), `lesson 05 card icon is registered in the published bundle: ${asset}`)
    assert.deepEqual(await readFile(path.join(output, asset)), await readFile(path.join(root, 'progetti/slide/public', asset)), `lesson 05 icon preserves its source bytes: ${asset}`)
  }
  return { output, localAssetsExcluded: true, exerciseDecksExcluded: exercises.exercises.length, exerciseDataExcluded: true }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await checkPublication()
  if (process.argv[2]) Object.assign(report, await checkPublishedBuild(process.argv[2]))
  console.log(JSON.stringify(report, null, 2))
}
