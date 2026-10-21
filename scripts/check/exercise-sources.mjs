import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { curriculum, sources as officialSources } from '../../data/esercitazioni/framework-curriculum.mjs'
import { nativeExamples, rebuildImportedSlide } from '../../data/esercitazioni/native-examples.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))
const json = async file => JSON.parse(await readFile(path.join(root, file), 'utf8'))
const normalize = text => text.replace(/\s+/g, ' ').trim().toLocaleLowerCase('it')

/** Validate every supplied page against its reflowed content, not just totals. */
export async function checkExerciseSources() {
  const manifest = await json('assets/esercitazioni/manifest.json')
  assert.equal(manifest.exercises.length, 9)
  assert.equal(manifest.sourceSlides, 349, 'all nine original presentations are retained')
  const palettes = ['course', 'introduction', 'history', 'ux-research', 'ux-perception', 'ux-gestalt', 'ux-color', 'ux-type', 'ux-prototype']
  const usedImages = new Set()
  const archivedImages = new Map((manifest.archivedImages || []).map(image => [image.web, image]))
  const digest = async file => createHash('sha256').update(await readFile(path.join(root, file))).digest('hex')
  for (const image of archivedImages.values()) assert.equal(await digest(image.retained), image.sha256, 'retired documentary assets remain intact')
  const catalog = await json('assets/esercitazioni/tailwind-daisyui/sources.json')
  for (const [id, [title, url]] of Object.entries(officialSources)) assert.deepEqual(catalog.sources.find(source => source.id === id), { id, title, url })
  for (const asset of catalog.assets) {
    assert.equal(await digest(archivedImages.get(asset.web)?.retained || `public${asset.web}`), asset.sha256, 'retained example matches its recorded rendering')
    assert.equal(await digest(asset.original), asset.originalSha256, 'original PNG retained')
    assert.ok((await readFile(path.join(root, asset.source), 'utf8')).includes('<!doctype html>'), 'editable example HTML retained')
  }
  let total = 0, links = 0
  for (const [index, exercise] of manifest.exercises.entries()) {
    const number = String(exercise.number).padStart(2, '0')
    assert.equal(exercise.palette, palettes[index], 'exercise colors follow the lesson sequence')
    for (const [file, hash] of [[exercise.original, exercise.sha256], [exercise.pdf, exercise.pdfSha256]])
      assert.equal(createHash('sha256').update(await readFile(path.join(root, file))).digest('hex'), hash, 'original file bytes remain unchanged')
    const source = await json(`assets/esercitazioni/${number}-source.json`)
    const slides = await json(`data/esercitazioni/${number}.json`)
    assert.equal(source.length, exercise.sourceSlides)
    assert.equal(slides.length, exercise.slideCount)
    assert.deepEqual(slides.map(slide => slide.number), Array.from({ length: slides.length }, (_, i) => i + 1))
    let imported = slides
    if (exercise.nativeRebuild) {
      const archive = exercise.nativeRebuild.archive
      assert.equal(await digest(archive.data), archive.dataSha256, 'pre-reconstruction content retained')
      assert.equal(await digest(archive.markdown), archive.markdownSha256, 'pre-reconstruction Markdown retained')
      imported = await json(archive.data)
      const expected = curriculum.find(module => module.number === exercise.number)?.slides || imported.map(slide => rebuildImportedSlide(slide, number))
      for (const block of slides.flatMap(slide => slide.blocks).filter(block => block.kind === 'native' && !block.example.startsWith('framework:'))) {
        assert.ok(nativeExamples[block.example], 'every retired figure has a native reconstruction')
        assert.ok(!/<img\b/i.test(nativeExamples[block.example].html), 'native reconstructions contain no raster teaching content')
      }
      assert.deepEqual(slides, expected, 'reconstruction matches the native specification and preserves other blocks')
      assert.ok(slides.every(slide => slide.blocks.every(block => block.kind !== 'image')), 'exercise slides contain no bitmap content')
      for (const slide of slides.filter(slide => slide.blocks.some(block => block.kind === 'resources'))) {
        const page = source.find(page => page.sourceSlide === slide.sourceSlide)
        const links = page.blocks.flatMap(block => block.paragraphs?.flatMap(paragraph => paragraph.runs.filter(run => run.href).map(run => ({ title: run.text, url: run.href }))) || [])
        assert.deepEqual(slide.blocks.flatMap(block => block.resources || []), links, 'resource lists preserve the labels, order and destinations of their own source page')
      }
    }
    let preserved = imported
    if (exercise.replacement) {
      assert.equal(await digest(exercise.archive.data), exercise.archive.dataSha256, 'archived imported data preserved')
      assert.equal(await digest(exercise.archive.markdown), exercise.archive.markdownSha256, 'archived imported Markdown preserved')
      const archive = await json(exercise.archive.data)
      assert.equal(archive.length, exercise.archive.slideCount)
      if (exercise.replacement.kind === 'complete') {
        preserved = archive
        const specification = curriculum.find(module => module.number === exercise.number)
        assert.deepEqual(slides, specification.slides, 'active course matches its authored specification')
        assert.ok(slides.every(slide => slide.sourceSlide === null && slide.sourceKind === 'official-docs'), 'new slides do not claim historical source pages')
        for (const slide of slides.filter(slide => slide.kind !== 'cover')) {
          assert.ok(slide.sources?.length, 'every new content slide identifies its sources')
          for (const source of slide.sources) {
            assert.ok(catalog.sources.some(entry => entry.url === source.url && entry.title === source.title))
            assert.ok(['tailwindcss.com', 'daisyui.com', 'developer.mozilla.org', 'www.w3.org'].includes(new URL(source.url).hostname))
          }
        }
      } else {
        preserved = imported.map(slide => exercise.replacement.slides.includes(slide.number) ? archive[slide.number - 1] : slide)
        for (const slide of imported.filter(slide => !exercise.replacement.slides.includes(slide.number))) assert.deepEqual(slide, archive[slide.number - 1], 'unrevised imported content is unchanged')
      }
    }
    assert.deepEqual(exercise.mapping.flatMap(entry => entry.slides), preserved.map(slide => slide.number), 'source mapping covers the retained import once, in order')
    for (const page of source) {
      const mapping = exercise.mapping.find(entry => entry.sourceSlide === page.sourceSlide)
      assert.ok(mapping?.slides.length, 'each original page has a destination')
      const adapted = mapping.slides.map(no => preserved[no - 1])
      assert.ok(adapted.every(slide => slide.sourceSlide === page.sourceSlide))
      const blocks = adapted.flatMap(slide => slide.blocks)
      if (page.sourceSlide !== 1 && page.sourceSlide !== source.length) {
        const text = normalize([...adapted.map(slide => slide.title), ...blocks.flatMap(block => block.kind === 'text'
          ? block.paragraphs.map(p => p.text) : block.kind === 'table' ? block.rows.flat() : block.text || block.alt || '')].join(' '))
        for (const original of page.originalText) assert.ok(text.includes(normalize(original)), `${number}/${page.sourceSlide}: original text is preserved: ${original.slice(0, 80)}`)
        const originalLinks = page.blocks.flatMap(block => block.paragraphs?.flatMap(p => p.runs.filter(run => run.href).map(run => run.href)) || [])
        const adaptedLinks = new Set(blocks.flatMap(block => block.paragraphs?.flatMap(p => p.runs.filter(run => run.href).map(run => run.href)) || []))
        for (const link of originalLinks) { assert.ok(adaptedLinks.has(link), 'source links remain active'); links++ }
      }
      for (const block of blocks.filter(block => block.kind === 'image')) {
        assert.ok(block.alt?.trim(), 'each documentary image has alternative text')
        await readFile(path.join(root, archivedImages.get(block.src)?.retained || `public${block.src}`))
      }
    }
    assert.ok(!/bootstrap|getbootstrap/i.test(JSON.stringify(slides)), 'active exercise content no longer teaches Bootstrap')
    assert.ok(!/bootstrap|getbootstrap/i.test(await readFile(path.join(root, exercise.file), 'utf8')), 'active Markdown uses updated titles')
    for (const block of slides.flatMap(slide => slide.blocks).filter(block => block.kind === 'image')) {
      assert.ok(block.alt?.trim(), 'each active figure has alternative text')
      await readFile(path.join(root, 'public', block.src))
      usedImages.add(path.basename(block.src))
    }
    total += slides.length
  }
  assert.equal(total, manifest.slideCount)
  const publicImages = await readdir(path.join(root, 'public/images/esercitazioni')).catch(error => { if (error.code === 'ENOENT') return []; throw error })
  assert.deepEqual(publicImages.sort(), [...usedImages].sort(), 'no unused extracted media are published locally')
  return { originals: manifest.sourceSlides, adapted: total, images: usedImages.size, links, rewritten: curriculum.reduce((sum, module) => sum + module.slides.length, 0), officialSources: catalog.sources.length, examples: catalog.assets.length, nativeSlides: manifest.nativeRebuild?.slides || 0 }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(await checkExerciseSources())
