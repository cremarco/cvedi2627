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
  const localIds = new Set(curriculum.lessons.filter(lesson => lesson.number >= 5).map(lesson => lesson.id))
  const options = { roots: [root], userRoot: root, allowedRoots: [root] }
  injectPreparserExtensionLoader(async (_roots, _headmatter, _file, mode) => publicationExtensions(mode))
  try {
    const local = await load(options, path.join(root, 'slides.md'), undefined, 'dev')
    const published = await load(options, path.join(root, 'slides.md'), undefined, 'build')
    for (const deck of [local, published])
      for (const file of Object.values(deck.markdownFiles)) assert.deepEqual(file.errors || [], [], `parse: ${file.filepath}`)
    const localSlides = local.slides.filter(slide => uxIds.has(slide.frontmatter.lesson))
    assert.equal(localSlides.length, 293, 'all retained slides of the six lessons remain available locally')
    assert.ok(localSlides.filter(slide => localIds.has(slide.frontmatter.lesson)).every(slide => slide.frontmatter.localOnly === true), 'unpublished lesson imports remain explicitly marked')
    assert.equal(local.slides.length, 535, 'complete local deck')
    assert.equal(published.slides.length, 328, 'published deck includes lessons 03 and 04')
    for (const deck of [local, published]) {
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'storia-design').length, 67, 'lesson 03 is available locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'storia-design'), 'lesson 03 retains its destination alias')
      assert.match(deck.slides.find(slide => slide.title === 'Indice delle lezioni').content, /<SlideAction\s+to=["']storia-design["']/, 'lesson 03 is linked from both indexes')
      assert.equal(deck.slides.filter(slide => slide.frontmatter.lesson === 'ricerca-inclusiva').length, 86, 'lesson 04 ends at slide 86 locally and online')
      assert.ok(deck.slides.some(slide => slide.frontmatter.routeAlias === 'ricerca-inclusiva'), 'lesson 04 retains its destination alias')
    }
    assert.ok(published.slides.every(slide => !localIds.has(slide.frontmatter.lesson)), 'local lessons are absent from routes and overview')
    assert.deepEqual(published.slides.map(slide => slide.title), local.slides.filter(slide => !localIds.has(slide.frontmatter.lesson)).map(slide => slide.title), 'published content order is preserved')
    const localIndex = local.slides.find(slide => slide.title === 'Indice delle lezioni').content
    const publicIndex = published.slides.find(slide => slide.title === 'Indice delle lezioni').content
    const publicTargets = ['presentazione-corso', 'introduzione-teorica', 'storia-design', 'ricerca-inclusiva']
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
  const assets = path.join(output, 'assets')
  const references = (await Promise.all((await readdir(assets)).filter(file => /\.(js|css)$/.test(file))
    .map(file => readFile(path.join(assets, file), 'utf8')))).join('\n')
  for (const directory of localAssetDirectories)
    assert.ok(!references.includes('/' + directory + '/'), 'no published code references local figures')
  for (const directory of sharedLessonAssetDirectories) {
    const expected = [...new Set([...references.matchAll(new RegExp('/' + directory + '/[^"\'\\s<>`)]+', 'g'))].map(match => match[0]))].sort()
    assert.ok(expected.length > 0, 'published lesson 04 retains its shared figures')
    const actual = (await readdir(path.join(output, directory))).map(file => '/' + directory + '/' + file).sort()
    assert.deepEqual(actual, expected, 'only figures referenced by published lessons are exported')
  }
  return { output, localAssetsExcluded: true }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await checkPublication()
  if (process.argv[2]) Object.assign(report, await checkPublishedBuild(process.argv[2]))
  console.log(JSON.stringify(report, null, 2))
}
