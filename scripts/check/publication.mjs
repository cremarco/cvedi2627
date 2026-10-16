import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFile, realpath, readdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { publicationExtensions, localAssetDirectories, sharedLessonAssetDirectories } from '../../utils/publication.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))

export async function checkPublication() {
  const require = createRequire(await realpath(path.join(root, 'node_modules/@slidev/cli/package.json')))
  const { load, injectPreparserExtensionLoader } = await import(require.resolve('@slidev/parser/fs'))
  const curriculum = JSON.parse(await readFile(path.join(root, 'data/ux-curriculum.json'), 'utf8'))
  const uxIds = new Set(curriculum.lessons.map(lesson => lesson.id))
  const localIds = new Set(curriculum.lessons.filter(lesson => lesson.localOnly === true).map(lesson => lesson.id))
  const options = { roots: [root], userRoot: root, allowedRoots: [root] }
  injectPreparserExtensionLoader(async (_roots, _headmatter, _file, mode) => publicationExtensions(mode))
  try {
    const local = await load(options, path.join(root, 'slides.md'), undefined, 'dev')
    const published = await load(options, path.join(root, 'slides.md'), undefined, 'build')
    for (const deck of [local, published])
      for (const file of Object.values(deck.markdownFiles)) assert.deepEqual(file.errors || [], [], `parse: ${file.filepath}`)
    const localSlides = local.slides.filter(slide => uxIds.has(slide.frontmatter.lesson))
    const declaredUxSlides = curriculum.lessons.reduce((sum, lesson) => sum + lesson.slideCount, 0)
    assert.equal(localSlides.length, declaredUxSlides, 'active UX lessons match the curriculum')
    for (const lesson of curriculum.lessons) {
      const owned = localSlides.filter(slide => slide.frontmatter.lesson === lesson.id)
      assert.equal(owned.length, lesson.slideCount, `${lesson.id}: local publication count matches the curriculum`)
      assert.ok(owned.every(slide => (slide.frontmatter.localOnly === true) === localIds.has(lesson.id)), `${lesson.id}: publication visibility matches the curriculum`)
    }
    assert.equal(local.slides.length, 242 + declaredUxSlides, 'complete local deck')
    assert.equal(published.slides.length, 603, 'published deck includes lessons 01–07')
    for (const deck of [local, published]) {
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'storia-design').length, 67, 'lesson 03 is available locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'storia-design'), 'lesson 03 retains its destination alias')
      assert.match(deck.slides.find(slide => slide.title === 'Indice delle lezioni').content, /<SlideAction\s+to=["']storia-design["']/, 'lesson 03 is linked from both indexes')
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'ricerca-inclusiva').length, 86, 'lesson 04 ends at slide 86 locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'ricerca-inclusiva'), 'lesson 04 retains its destination alias')
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'percezione-gerarchia').length, 105, 'lesson 05 is complete locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'percezione-gerarchia'), 'lesson 05 retains its destination alias')
    }
    assert.ok(published.slides.every(slide => !localIds.has(slide.frontmatter.lesson)), 'local lessons are absent from routes and overview')
    assert.deepEqual(published.slides.map(slide => slide.title), local.slides.filter(slide => !localIds.has(slide.frontmatter.lesson)).map(slide => slide.title), 'published content order is preserved')
    const localIndex = local.slides.find(slide => slide.title === 'Indice delle lezioni').content
    const publicIndex = published.slides.find(slide => slide.title === 'Indice delle lezioni').content
    const publicTargets = ['presentazione-corso', 'introduzione-teorica', 'storia-design', 'ricerca-inclusiva', 'percezione-gerarchia', 'gestalt', 'colore']
    const supplementalTargets = ['brief-progetto', 'approfondimenti']
    const indexTargets = content => [...content.matchAll(/<SlideAction\s+to=["']([^"']+)["']/g)].map(match => match[1])
    const groupedPublicTargets = [...publicTargets.slice(0, 2), ...supplementalTargets, ...publicTargets.slice(2)]
    assert.deepEqual(indexTargets(localIndex), [...groupedPublicTargets, ...localIds], 'local index groups lesson 02 materials before continuing in lesson number order')
    assert.deepEqual(indexTargets(publicIndex), groupedPublicTargets, 'published index preserves available destinations in reading order')
    for (const content of [localIndex, publicIndex]) {
      const lessonTwo = content.match(/<div\s+class="join join-horizontal index-lesson-two"[^>]*>([\s\S]*?)<\/div>/)?.[1]
      assert.ok(lessonTwo, 'lesson 02 has one accessible group')
      assert.deepEqual(indexTargets(lessonTwo), ['introduzione-teorica', ...supplementalTargets], 'lesson 02 contains exactly its three destinations')
    }
    assert.ok(localIndex.includes('index-ux-lessons'), 'local lesson index remains available')
    assert.ok(!publicIndex.includes('LocalOnly') && !publicIndex.includes('index-ux-lessons'), 'local index is removed before compilation')
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
    return { localSlides: local.slides.length, publishedSlides: published.slides.length, localOnlyLessons: localIds.size }
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
  for (const directory of localAssetDirectories)
    assert.ok(!references.includes('/' + directory + '/'), 'no published code references local figures')
  for (const directory of sharedLessonAssetDirectories) {
    const expected = [...new Set([...references.matchAll(new RegExp('/' + directory + '/[^"\'\\s<>`)]+', 'g'))].map(match => match[0]))].sort()
    assert.ok(expected.length > 0, 'published UX lessons retain their shared figures')
    const actual = (await readdir(path.join(output, directory))).map(file => '/' + directory + '/' + file).sort()
    assert.deepEqual(actual, expected, 'only figures referenced by published lessons are exported')
  }
  const lessonArtwork = JSON.parse(await readFile(path.join(root, 'data/card-artwork-local.json'), 'utf8'))
  for (const asset of Object.values(lessonArtwork.assets)) {
    assert.ok(references.includes(asset), `lesson 05 card icon is registered in the published bundle: ${asset}`)
    assert.deepEqual(await readFile(path.join(output, asset)), await readFile(path.join(root, 'public', asset)), `lesson 05 icon preserves its source bytes: ${asset}`)
  }
  return { output, localAssetsExcluded: true }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await checkPublication()
  if (process.argv[2]) Object.assign(report, await checkPublishedBuild(process.argv[2]))
  console.log(JSON.stringify(report, null, 2))
}
