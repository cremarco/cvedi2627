import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { componentDraft, curriculum, sources as officialSources, examples, themeDraft } from '../../data/esercitazioni/framework-curriculum.mjs'
import { themeSources } from '../../data/esercitazioni/tailwind-theme.mjs'
import { reviseExercise } from '../../data/esercitazioni/editorial-revisions.mjs'
import { reviseGitExercise } from '../../data/esercitazioni/git-revisions.mjs'
import { gridRemovedCopy, gridRemovedLinks, gridTextRevision } from '../../data/esercitazioni/grid-revisions.mjs'
import { workedExamples } from '../../data/esercitazioni/worked-examples.mjs'
import { nativeExamples, rebuildImportedSlide } from '../../data/esercitazioni/native-examples.mjs'

const root = fileURLToPath(new URL('../../../..', import.meta.url))
const json = async file => JSON.parse(await readFile(path.join(root, file), 'utf8'))
const normalize = text => text.replace(/\s+/g, ' ').trim().toLocaleLowerCase('it')

/** Validate every supplied page against its reflowed content, not just totals. */
export async function checkExerciseSources() {
  const manifest = await json('progetti/slide/assets/esercitazioni/manifest.json')
  assert.equal(manifest.exercises.length, 9)
  assert.equal(manifest.sourceSlides, 349, 'all nine original presentations are retained')
  const palettes = ['course', 'introduction', 'history', 'ux-research', 'ux-perception', 'ux-gestalt', 'ux-color', 'ux-type', 'ux-grid']
  const usedImages = new Set()
  const archivedImages = new Map((manifest.archivedImages || []).map(image => [image.web, image]))
  const digest = async file => createHash('sha256').update(await readFile(path.join(root, file))).digest('hex')
  const diagram = await json('progetti/slide/assets/esercitazioni/schemi/manifest.json')
  for (const asset of [...diagram.diagrams, ...(diagram.demos || []), ...(diagram.screenshots || [])]) {
    assert.equal(await digest(`progetti/slide/assets/esercitazioni/schemi/${asset.source}`), asset.sha256, 'authored diagram matches its manifest')
    assert.equal(await digest(`progetti/slide/public${asset.web}`), asset.sha256, 'local diagram mirror preserves its source')
  }
  for (const asset of diagram.archivedDiagrams || []) assert.equal(await digest(`progetti/slide/assets/esercitazioni/schemi/${asset.source}`), asset.sha256, 'retired diagram preserves its captured bytes')
  for (const asset of diagram.archivedScreenshots || []) {
    assert.equal(await digest(`progetti/slide/assets/esercitazioni/schemi/${asset.source}`), asset.sha256, 'retired screenshot preserves its captured bytes')
    await readFile(path.join(root, 'progetti/slide/assets/esercitazioni/schemi', asset.original))
  }
  for (const image of archivedImages.values()) assert.equal(await digest(image.retained), image.sha256, 'retired documentary assets remain intact')
  const catalog = await json('progetti/slide/assets/esercitazioni/tailwind-daisyui/sources.json')
  for (const [id, [title, url]] of Object.entries(officialSources)) assert.deepEqual(catalog.sources.find(source => source.id === id), { id, title, url })
  assert.deepEqual(catalog.nativeExamples.map(example => example.id), Object.keys(examples), 'every runnable example is catalogued')
  for (const example of catalog.nativeExamples) {
    assert.equal(await digest(example.source), example.sourceSha256, 'native HTML matches its catalogued source')
    assert.ok((await readFile(path.join(root, example.source), 'utf8')).includes(examples[example.id].html), 'catalogued HTML contains the current runnable example')
  }
  for (const example of workedExamples) {
    // Module 05 was replaced by the beginner path. Its earlier examples remain
    // hash-checked in the retained catalogue above, outside the active lesson.
    if (example.module === 5) continue
    const { slides } = [componentDraft, themeDraft].find(module => module.number === example.module)
    const result = slides.findIndex(slide => slide.blocks.some(block => block.example === `framework:${example.id}`))
    assert.ok(result > 0 && example.observe && example.task, 'each worked example has an observation and guided task')
    assert.equal(slides[result - 1].blocks[0].text, example.html, 'the exact running HTML is shown immediately before its result')
    assert.ok(slides[result].blocks[0].caption.includes(example.task))
  }
  for (const asset of catalog.assets) {
    assert.equal(await digest(archivedImages.get(asset.web)?.retained || `progetti/slide/public${asset.web}`), asset.sha256, 'retained example matches its recorded rendering')
    assert.equal(await digest(asset.original), asset.originalSha256, 'original PNG retained')
    assert.ok((await readFile(path.join(root, asset.source), 'utf8')).includes('<!doctype html>'), 'editable example HTML retained')
  }
  let total = 0, links = 0
  for (const [index, exercise] of manifest.exercises.entries()) {
    const number = String(exercise.number).padStart(2, '0')
    assert.equal(exercise.palette, palettes[index], 'exercise colors follow the lesson sequence')
    for (const [file, hash] of [[exercise.original, exercise.sha256], [exercise.pdf, exercise.pdfSha256]])
      assert.equal(createHash('sha256').update(await readFile(path.join(root, file))).digest('hex'), hash, 'original file bytes remain unchanged')
    const source = await json(`progetti/slide/assets/esercitazioni/${number}-source.json`)
    const slides = await json(`progetti/slide/data/esercitazioni/${number}.json`)
    assert.equal(source.length, exercise.sourceSlides)
    assert.equal(slides.length, exercise.slideCount)
    assert.deepEqual(slides.map(slide => slide.number), Array.from({ length: slides.length }, (_, i) => i + 1))
    let imported = slides
    if (exercise.nativeRebuild) {
      const archive = exercise.nativeRebuild.archive
      assert.equal(await digest(archive.data), archive.dataSha256, 'pre-reconstruction content retained')
      assert.equal(await digest(archive.markdown), archive.markdownSha256, 'pre-reconstruction Markdown retained')
      imported = await json(archive.data)
      const expected = number === '08' ? reviseGitExercise(source) : reviseExercise(curriculum.find(module => module.number === exercise.number)?.slides || imported.map(slide => rebuildImportedSlide(slide, number)), number)
      for (const block of slides.flatMap(slide => slide.blocks.flatMap(block => block.kind === 'original-layout' && block.content.example ? [{ kind: 'native', example: block.content.example }] : [block])).filter(block => block.kind === 'native' && !block.example.startsWith('framework:'))) {
        assert.ok(nativeExamples[block.example], 'every retired figure has a native reconstruction')
        assert.ok(!/<img\b/i.test(nativeExamples[block.example].html), 'native reconstructions contain no raster teaching content')
      }
      assert.deepEqual(slides, expected, 'reconstruction matches the native specification and preserves other blocks')
      if (number === '03') {
        const rendered = JSON.stringify(slides)
        for (const link of imported.flatMap(slide => slide.blocks.flatMap(block => (block.paragraphs || []).flatMap(p => p.runs.filter(run => run.href)))).filter(run => !gridRemovedLinks.includes(run.href)))
          assert.ok(rendered.includes(link.href), 'exercise 03 retains every original outbound destination')
        assert.ok(gridRemovedLinks.every(url => !rendered.includes(url)), 'exercise 03 omits the premature Tailwind reference and redundant MDN Try it links')
        assert.ok(!rendered.includes('https://tailwindcss.com/docs/padding') && !rendered.includes('2025'), 'exercise 03 omits the premature Tailwind reference and uses 2026')
        const compact = text => text.replace(/\s+/g, '')
        const strings = value => typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : []
        for (const sourceSlide of new Set(imported.map(slide => slide.sourceSlide))) {
          const original = imported.filter(slide => slide.sourceSlide === sourceSlide)
          const current = slides.filter(slide => slide.sourceSlides.includes(sourceSlide))
          const originalCode = original.flatMap(slide => slide.blocks.filter(block => block.kind === 'code').map(block => block.text)).join('\n').replace(/<!--[\s\S]*?-->/g, '').replaceAll('parentRule', '.parent-rule').replaceAll('childRule', '.child-rule')
          const currentCode = current.flatMap(slide => slide.blocks.flatMap(block => block.kind === 'code' ? [block.text] : (block.items || []).flatMap(item => item.example ? [item.example] : []))).join('\n')
          assert.equal(compact(currentCode), compact(originalCode), `03/${sourceSlide}: complete code preserved apart from whitespace and explanatory HTML comments`)
          for (const paragraph of original.flatMap(slide => slide.blocks.filter(block => block.kind === 'text').flatMap(block => block.paragraphs))) {
            if (paragraph.runs.some(run => run.href) || gridRemovedCopy.includes(paragraph.text.trim())) continue
            assert.ok(normalize(strings(current).join(' ')).includes(normalize(gridTextRevision(paragraph.text)).replace(/[.,;:!?…]+$/, '')), `03/${sourceSlide}: original explanation preserved apart from requested editorial corrections`)
          }
        }
      }
      assert.ok(slides.every(slide => slide.blocks.every(block => block.kind !== 'image')), 'active images use catalogued figures rather than untracked bitmap blocks')
      for (const slide of slides.filter(slide => slide.blocks.some(block => block.kind === 'resources'))) {
        if (slide.sourceKind === 'official-docs') {
          const blocks = slide.blocks.filter(block => block.kind === 'resources')
          assert.ok(blocks.every(block => (block.resourceLayout === 'list' || block.resourceLayout === 'plain' && block.resources.length === 1) && block.showHint === false), 'authored references use the shared list or a single plain link')
          for (const resource of blocks.flatMap(block => block.resources)) {
            assert.ok(resource.title.trim() && !/^https?:/.test(resource.title), 'authored references have meaningful labels')
            if (resource.url.startsWith('/')) await readFile(`progetti/slide/public${resource.url}`)
          }
          continue
        }
        const page = source.find(page => page.sourceSlide === slide.sourceSlide)
        const links = page.blocks.flatMap(block => block.paragraphs?.flatMap(paragraph => paragraph.runs.filter(run => run.href).map(run => ({ title: run.text, url: run.href }))) || [])
        const resources = slide.blocks.flatMap(block => block.resources || [])
        if (number === '03') {
          assert.deepEqual(resources.map(resource => resource.url), links.map(link => link.url), 'exercise 03 reference lists preserve source order and destinations')
          assert.ok(resources.every(resource => resource.title.trim() && !/^https?:/.test(resource.title)), 'exercise 03 references use meaningful labels')
          assert.ok(slide.blocks.every(block => block.kind !== 'resources' || block.resourceLayout === 'list' && block.showHint === false), 'exercise 03 references use the shared vertical list')
        } else assert.deepEqual(resources, links, 'resource lists preserve the labels, order and destinations of their own source page')
      }
    }
    if (number === '08') {
      assert.deepEqual([...new Set(slides.filter(slide => slide.sourceSlide !== null).map(slide => slide.sourceSlide))], source.map(page => page.sourceSlide), 'Git retains the original page order')
      const revisedTextPages = new Set([1, 17, 21, 22, 27, 32, 40])
      for (const page of source) {
        const parts = slides.filter(slide => slide.sourceSlide === page.sourceSlide)
        if (![1, 40].includes(page.sourceSlide))
          assert.ok(parts.every(slide => slide.title.replace(/ \[\d+\]$/, '') === page.title), 'Git keeps the original titles')
        const paragraphs = blocks => blocks.filter(block => block.kind === 'text').flatMap(block => block.paragraphs)
        if (!revisedTextPages.has(page.sourceSlide))
          assert.deepEqual(paragraphs(parts.flatMap(slide => slide.blocks)), paragraphs(page.blocks), 'Git preserves original text and links outside the requested edits')
        if (page.sourceSlide !== 1)
          assert.deepEqual(parts.flatMap(slide => slide.blocks.filter(block => block.kind === 'figure').map(block => block.src)),
            page.blocks.filter(block => block.kind === 'image').map(block => exercise.editorialRevision.figures[block.src].src), 'Git keeps every original figure slot')
      }
    }
    if (exercise.currentMapping) {
      for (const slide of slides.filter(slide => slide.sourceSlide === null)) {
        assert.deepEqual(slide.sourceSlides, [], 'new additions do not claim historical source pages')
        if (number === '08') {
          assert.equal(slide.sourceKind, 'course-addition')
          assert.equal(slides[slide.number - 2].sourceSlide, 20, 'the gitignore extension follows repository initialization')
        } else {
          assert.equal(slide.sourceKind, 'course-assignment', 'new exercise additions identify their authored role')
          assert.ok(slide.adaptedFrom?.length, 'continued assignments identify the preceding exercises')
        }
      }
      assert.deepEqual([...new Set(exercise.currentMapping.flatMap(entry => entry.slides))].sort((a, b) => a - b), slides.filter(slide => slide.sourceSlide !== null).map(slide => slide.number), 'current mapping covers every slide, including intentionally reordered source pages')
      for (const entry of exercise.currentMapping) assert.ok(entry.slides.every(no => (slides[no - 1].sourceSlides || [slides[no - 1].sourceSlide]).includes(entry.sourceSlide)), 'current destinations retain their source page')
    }
    for (const block of slides.flatMap(slide => slide.blocks.flatMap(block => [block, ...(block.figures || []).map(figure => ({ kind: 'figure', ...figure })), ...(block.items || []).flatMap(item => item.figure ? [{ kind: 'figure', ...item.figure }] : [])])).filter(block => block.kind === 'figure')) {
      assert.ok(block.alt, 'every figure retains alternative text')
      const localFigure = number === '08' && Object.values(exercise.editorialRevision.figures).find(asset => asset.src === block.src)
      if (localFigure) {
        const original = archivedImages.get(localFigure.original)
        assert.equal(original.sha256, localFigure.originalSha256, 'Git figure retains the original hash')
        assert.equal(await digest(localFigure.source), localFigure.sha256)
        assert.equal(await digest(`progetti/slide/public${block.src}`), localFigure.sha256)
        if (localFigure.kind === 'capture') {
          assert.ok(localFigure.captures.length > 0, 'Git screenshot links to its macOS captures')
          for (const capture of localFigure.captures) assert.equal(await digest(capture.source), capture.sha256)
          continue
        }
        if (localFigure.kind === 'screenshot') {
          assert.equal(localFigure.sha256, original.sha256, 'Git screenshots preserve the original bytes')
          continue
        }
      }
      if (!(diagram.screenshots || []).some(asset => asset.web === block.src)) assert.ok(block.caption, 'new diagrams retain captions')
      const screenshot = (diagram.screenshots || []).find(asset => asset.web === block.src)
      if (screenshot) {
        assert.equal(await digest(`progetti/slide/public${block.src}`), screenshot.sha256, 'restored editor screenshot retains its exact archived bytes')
        if (screenshot.sourceKind === 'browser-capture') {
          assert.ok(screenshot.capturedFrom && screenshot.generator && screenshot.original, 'new site screenshots retain capture provenance')
          await readFile(path.join(root, 'progetti/slide/assets/esercitazioni/schemi', screenshot.original))
        } else assert.ok(archivedImages.has(block.src), 'restored screenshots remain in the historical asset archive')
      } else {
        const svg = await readFile(path.join(root, 'progetti/slide/public', block.src), 'utf8')
        assert.ok(svg.includes('<svg') && !/<image\b/.test(svg), 'new teaching diagrams are native vectors')
      }
      if (!localFigure) usedImages.add(path.basename(block.src))
    }
    for (const item of slides.flatMap(slide => slide.blocks).flatMap(block => block.items || [])) {
      if (item.result?.tag === 'img') {
        assert.ok(item.result.alt, 'demonstration image has alternative text')
        assert.ok(diagram.diagrams.some(asset => asset.web === item.result.src), 'demonstration image is catalogued')
        usedImages.add(path.basename(item.result.src))
      }
      for (const sample of item.samples || []) if (sample.result.href.startsWith('/')) assert.ok((diagram.demos || []).some(asset => asset.web === sample.result.href), 'local link destinations are catalogued')
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
        if (number === '07') {
          assert.equal(exercise.editorialRevision.priorDraft.slideCount, themeDraft.slides.length)
          const visibleURLs = slides.filter(slide => slide.showSources !== false)
            .flatMap(slide => slide.sources.filter(source => source.visible !== false).map(source => source.url))
          assert.equal(new Set(visibleURLs).size, visibleURLs.length, 'exercise 07 shows each reference once')
          const exercise06 = await json('progetti/slide/data/esercitazioni/06.json')
          const drawingBlocks = deck => deck.filter(slide => slide.layout === 'figure')
            .flatMap(slide => slide.blocks.map(({ caption, ...drawing }) => drawing))
          assert.deepEqual(drawingBlocks(slides), drawingBlocks(exercise06), 'exercise 07 uses the previous layout references')
        }
        assert.ok(slides.every(slide => slide.sourceSlide === null && ['official-docs', 'retained-import'].includes(slide.sourceKind)), 'authored and explicitly retained slides identify their origin')
        for (const slide of slides.filter(slide => slide.kind !== 'cover')) {
          if (slide.sourceKind === 'retained-import') {
            assert.equal(number, '05')
            assert.equal(slide.retainedFrom.file, exercise.archive.data)
            const original = archive.find(entry => entry.number === slide.retainedFrom.number)
            assert.equal(original.sourceSlide, slide.retainedFrom.sourceSlide)
            assert.ok(original.sourceSlide >= 5 && original.sourceSlide <= 10)
            assert.equal(slide.title, slide.retainedFrom.omittedBlocks ? 'Esempi di librerie e framework per applicazioni web' : original.title)
            if (slide.retainedFrom.omittedBlocks) {
              assert.equal(original.sourceSlide, 10)
              assert.deepEqual(slide.retainedFrom.omittedBlocks, [1])
              assert.deepEqual(slide.blocks, original.blocks.filter((block, index) => index !== 1), 'retained examples preserve the two requested categories exactly')
            } else if (slide.retainedFrom.numbers) {
              assert.deepEqual(slide.retainedFrom.numbers, [9, 10])
              assert.equal(original.number, 9)
              assert.deepEqual(slide.retainedFrom.editorialChanges, ['elapsed-years', 'fowler-citation', 'separate-diagrams'])
              const expectedText = structuredClone(original.blocks)
              expectedText[0].paragraphs[0].text = expectedText[0].paragraphs[0].text.replace('10 anni', '20 anni')
              expectedText[0].paragraphs[0].runs[0].text = expectedText[0].paragraphs[0].runs[0].text.replace('10 anni', '20 anni')
              const currentText = structuredClone(slide.blocks.filter(block => block.kind === 'text'))
              const opening = currentText[0].paragraphs[0]
              const citation = opening.runs.filter(run => run.superscript)
              assert.deepEqual(citation, [{ text: '1', superscript: true, href: 'https://martinfowler.com/bliki/InversionOfControl.html' }])
              opening.runs = opening.runs.filter(run => !run.superscript)
              opening.text = opening.runs.map(run => run.text).join('')
              assert.deepEqual(currentText, expectedText, 'comparison preserves original prose except the requested date and citation')
              assert.ok(archive.find(entry => entry.number === 10).blocks.some(block => block.kind === 'image'))
              assert.deepEqual(slide.blocks.find(block => block.kind === 'figure-group').figures.map(figure => figure.src), ['/images/esercitazioni/framework-controllo.svg', '/images/esercitazioni/librerie-controllo.svg'])
              assert.ok(slide.blocks.find(block => block.kind === 'citation').paragraphs[0].text.includes('Fowler, M. (2005, 26 giugno).'))
            } else if (original.blocks.some(block => block.kind === 'image')) {
              assert.equal(slide.blocks[0].src, '/images/esercitazioni/librerie-framework.svg')
            } else assert.deepEqual(slide.blocks, original.blocks, 'restored definitions, comparisons and examples preserve every source run')
            continue
          }
          assert.ok(slide.sources?.length, 'every new content slide identifies its sources')
          for (const source of slide.sources) {
            if (number === '06') {
              assert.deepEqual(themeSources[source.id], [source.title, source.url])
              continue
            }
            assert.ok(catalog.sources.some(entry => entry.url === source.url && entry.title === source.title))
            assert.ok(['tailwindcss.com', 'play.tailwindcss.com', 'daisyui.com', 'developer.mozilla.org', 'www.w3.org', 'nodejs.org', 'code.visualstudio.com', 'docs.npmjs.com', 'learn.microsoft.com', 'github.com'].includes(new URL(source.url).hostname))
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
        await readFile(path.join(root, archivedImages.get(block.src)?.retained || `progetti/slide/public${block.src}`))
      }
    }
    const activeContent = JSON.stringify(slides.map(({ retainedFrom, ...slide }) => slide))
    assert.ok(!/bootstrap|getbootstrap/i.test(activeContent), 'active exercises do not teach Bootstrap')
    if (number === '05') assert.ok(!/toolkit/i.test(activeContent), 'exercise 05 contains only the requested categories')
    assert.ok(!/bootstrap|getbootstrap/i.test(await readFile(path.join(root, exercise.file), 'utf8')), 'active Markdown uses updated titles')
    for (const block of slides.flatMap(slide => slide.blocks).filter(block => block.kind === 'image')) {
      assert.ok(block.alt?.trim(), 'each active figure has alternative text')
      await readFile(path.join(root, 'progetti/slide/public', block.src))
      usedImages.add(path.basename(block.src))
    }
    total += slides.length
  }
  assert.equal(total, manifest.slideCount)
  const publicImages = await readdir(path.join(root, 'progetti/slide/public/images/esercitazioni')).catch(error => { if (error.code === 'ENOENT') return []; throw error })
  assert.deepEqual(publicImages.filter(file => /\.(svg|png|webp|jpe?g|gif|avif)$/i.test(file)).sort(), [...usedImages].sort(), 'no unused extracted media are published locally')
  return { originals: manifest.sourceSlides, adapted: total, images: usedImages.size, links, rewritten: curriculum.reduce((sum, module) => sum + module.slides.length, 0), officialSources: catalog.sources.length, examples: catalog.nativeExamples.length, archivedExamples: catalog.assets.length, workedExamples: workedExamples.length, nativeSlides: manifest.nativeRebuild?.slides || 0 }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(await checkExerciseSources())
