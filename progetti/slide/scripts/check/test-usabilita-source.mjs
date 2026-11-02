import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const root = new URL('../../../../', import.meta.url)
const base = 'progetti/slide/assets/lezione-test-usabilita/'
const read = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'))
const sha = async file => createHash('sha256').update(await readFile(new URL(file, root))).digest('hex')
const compact = text => text.replace(/❏/g, '').replace(/\s+/g, '')

export async function checkUsabilitySources(deck) {
  const manifest = await read(base + 'manifest.json')
  const source = await read(manifest.transcription)
  const assets = await read(manifest.imageManifest)
  const redrawn = await read(manifest.redrawnImageManifest)
  const criteria = await read(manifest.integrations)
  const testing = await read(manifest.testingIntegrations)
  const integrations = {
    sources: [...criteria.sources, ...testing.sources],
    slides: [...criteria.slides, ...testing.slides].sort((a, b) => a.afterSourcePage - b.afterSourcePage),
  }
  const references = new Map(integrations.sources.map(source => [source.id, source]))
  const activeImages = new Map([...assets.images, ...redrawn.images].map(image => [image.id, image]))
  const slides = deck.slides.filter(slide => slide.frontmatter.lesson === manifest.lesson)
  assert.equal(await sha(source.file), source.sha256, 'historical source PDF is unchanged')
  assert.equal(manifest.sourceSha256, source.sha256)
  assert.equal(slides.length, manifest.slideCount)
  assert.equal(manifest.minutes, 120, 'requested two-hour budget')
  assert.equal(manifest.structuralSlides, 3, 'only the shared cover, opening summary and objectives are added')
  const editorial = manifest.slides.filter(slide => slide.editorial)
  assert.equal(manifest.editorialSlides, 9, 'five criteria slides and four operational testing additions are intentional')
  assert.deepEqual(editorial.map(slide => slide.id), integrations.slides.map(slide => slide.id), 'all requested integrations retain their order and identity')
  assert.equal(editorial.reduce((sum, slide) => sum + slide.minutes, 0), 18, 'integrations occupy eighteen minutes within the two-hour budget')
  assert.equal(testing.reading.author, 'Matteo di Pascale', 'the requested book retains its attribution')
  assert.equal(testing.reading.isbn, '978-88-203-9010-5')
  assert.deepEqual(source.pages.map(page => page.page), Array.from({ length: 79 }, (_, i) => i + 8), 'all principles, Norman, Nielsen and testing pages are imported')
  assert.equal(source.transcriptionChecks.length, 79)
  assert.ok(source.transcriptionChecks.every(check => check.completeText), 'all source characters are accounted for before reflow')
  assert.deepEqual([...new Set(manifest.slides.map(slide => slide.sourcePage).filter(Boolean))], source.pages.map(page => page.page), 'original page order and coverage')
  for (const [i, slide] of slides.entries()) {
    const expected = manifest.slides[i]
    assert.equal(slide.frontmatter.lessonSlide, i + 1)
    assert.equal(slide.frontmatter.routeAlias, expected.alias)
    assert.equal(slide.frontmatter.sourceSlide, expected.sourcePage)
    assert.equal(slide.title, expected.title)
    assert.equal(slide.frontmatter.localOnly, true, 'the import stays local for review')
    assert.equal(slide.frontmatter.lessonMinutes, expected.minutes)
    if (expected.editorial) {
      assert.equal(slide.frontmatter.integrationId, expected.id)
      assert.equal(expected.sourcePage, undefined, 'new teaching copy is distinct from the historical transcription')
      assert.ok(slide.content.includes(expected.lead), 'integration retains its lead')
      for (const panel of expected.panels ?? []) {
        assert.ok(slide.content.includes(panel.title) && slide.content.includes(panel.text), 'applied example remains selectable')
      }
      for (const id of expected.sources) assert.ok(slide.content.includes(references.get(id).url), 'primary source is linked from the relevant slide')
      if (expected.readingPages) {
        assert.ok(slide.content.includes(`Di Pascale, 2019 · PDF pp. ${expected.readingPages.join(', ')}`), 'book attribution uses explicit PDF pagination')
        assert.ok(!slide.content.includes(testing.reading.file), 'the local book is not exposed as a downloadable asset')
      }
    }
    assert.ok(!slide.note?.trim() && !slide.frontmatter.narrationAudio, 'no unrequested notes or audio')
    for (const block of expected.blocks ?? []) {
      const escaped = block.text.replace(/^❏\s*/, '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
      assert.ok(slide.content.includes(escaped), `source page ${expected.sourcePage}: complete selectable copy`)
    }
    if (expected.attribution) assert.ok(slide.content.includes(expected.attribution), 'source attribution remains visible')
    if (expected.kind === 'table' || expected.kind === 'testing-table') {
      assert.match(slide.content, /<table class="table">/)
      for (const text of expected.rows.flat()) assert.ok(slide.content.includes(text.replaceAll('&', '&amp;').replaceAll('"', '&quot;')), 'every historical table cell stays selectable')
      assert.equal((slide.content.match(/scope="row"/g) ?? []).length, expected.rows.length)
    }
    if (expected.figure) assert.ok(slide.content.includes(activeImages.get(expected.figure).web), 'selected figure remains zoomable')
  }
  for (const page of source.pages) {
    const owned = manifest.slides.filter(slide => slide.sourcePage === page.page)
    if (page.blocks.length) assert.equal(compact(owned.flatMap(slide => slide.blocks ?? []).map(block => block.text).join(' ')) || compact(owned.map(slide => slide.lead ?? '').join(' ')), compact(page.blocks.map(block => block.text).join(' ')), `page ${page.page}: no omitted or rewritten paragraph`)
    if (page.kind === 'table') assert.deepEqual(owned.flatMap(slide => slide.rows), page.rows, 'no omitted, reordered or rewritten table cell')
    if (page.kind === 'objectives') assert.deepEqual(owned[0].cards, page.cards)
    if (page.kind === 'problems') assert.equal(compact(owned.flatMap(slide => slide.blocks).map(block => block.text).join(' ')), compact(page.cards.flatMap(card => [card.title, card.text]).join(' ')))
  }
  for (const image of assets.images) {
    assert.equal(await sha(image.original), image.originalSha256, 'original figure crop is retained')
    assert.equal(await sha('progetti/slide/public' + image.web), image.sha256, 'lossless web figure matches its manifest')
    for (const original of image.embeddedOriginals ?? []) assert.equal(await sha(original.file), original.sha256, 'embedded original bitmap is preserved byte for byte')
    assert.ok(image.alt && image.rights)
  }
  assert.deepEqual(redrawn.preservedDocumentaryImages, ['figura-12', 'figura-30'], 'the two author portraits remain documentary images')
  assert.deepEqual(redrawn.images.map(image => image.id).sort(), assets.images.filter(image => !redrawn.preservedDocumentaryImages.includes(image.id)).map(image => image.id).sort(), 'every teaching illustration has a new version')
  for (const image of redrawn.images) {
    const historical = assets.images.find(original => original.id === image.id)
    assert.equal(image.historicalOriginal, historical.original, 'redrawn figures retain their source reference')
    assert.equal(image.rights, historical.rights, 'historical attribution is preserved')
    assert.equal(await sha(image.original), image.originalSha256, 'new original matches its manifest')
    assert.equal(await sha('progetti/slide/public' + image.web), image.sha256, 'active web asset matches its manifest')
    assert.ok(image.alt && image.webSize.every(size => size > 0))
    if (image.kind === 'native-svg') {
      const editable = await readFile(new URL(image.original, root), 'utf8')
      const published = await readFile(new URL('progetti/slide/public' + image.web, root), 'utf8')
      for (const label of image.labels) {
        assert.ok(editable.includes(label), 'editable diagram retains every label')
        assert.ok(published.includes(label), 'outlined SVG retains text semantics')
      }
      assert.ok(!published.includes('<text'), 'portable SVG uses the verified Nunito glyph outlines')
    }
  }
  for (const font of redrawn.fonts) assert.equal(await sha(font.file), font.sha256, 'shared Nunito Sans font is unchanged')
  assert.deepEqual(redrawn.images.find(image => image.id === 'componenti-test').relationships, [
    { from: 'facilitatore', to: 'compiti', label: 'Amministra' },
    { from: 'partecipante', to: 'compiti', label: 'Esegue' },
    { from: 'facilitatore', to: 'partecipante', label: 'Osserva e intervista' },
    { from: 'partecipante', to: 'facilitatore', label: 'Dà feedback' },
  ], 'all four directed relationships in the NN/g diagram are retained')
  return { slides: slides.length, originalPages: source.pages.length, editorialSlides: editorial.length, figures: assets.images.length, redrawnFigures: redrawn.images.length, minutes: manifest.minutes }
}
