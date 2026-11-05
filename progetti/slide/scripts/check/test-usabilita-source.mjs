import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { stripAudioDelivery, resolveSlideAudioSettings } from '../build/audio-delivery.mjs'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
import { readUsabilityCaptions } from '../build/lesson-captions.mjs'
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
  const illustratedLayouts = await read(manifest.illustratedLayoutSource)
  const scenes = await read(manifest.illustratedSceneManifest)
  const tables = await read(manifest.tableDefinitionsSource)
  const criteria = await read(manifest.integrations)
  const testing = await read(manifest.testingIntegrations)
  const notes = await read(manifest.speakerNotesSource)
  const originalNotes = await read(manifest.speakerNotesOriginalSource)
  const principlesOpening = await read(manifest.principlesOpeningSource)
  const audioSelection = await read(manifest.audioSelectionSource)
  const { manifest: captionSelection } = await readUsabilityCaptions()
  const audioHistory = await read('progetti/slide/assets/audio/lezione-test-usabilita/manifest.json')
  const audioSettings = await read(manifest.audioSettingsSource)
  const requestedAudio = manifest.slides.slice(0, 110)
  assert.equal(manifest.audioSettingsSource, 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json', 'usability shares the exact previous voice settings')
  assert.equal(audioHistory.settingsSource, manifest.audioSettingsSource)
  assert.equal(audioHistory.notesSource, manifest.speakerNotesSource)
  assert.equal(audioSelection.lesson, manifest.lesson)
  assert.deepEqual(Object.keys(audioSelection.clips), requestedAudio.map(slide => slide.alias), 'only the first 110 requested slides select audio')
  assert.deepEqual(audioSelection.pendingGeneration, [], 'all 110 requested recordings are complete')
  for (const slide of requestedAudio) {
    const clip = audioSelection.clips[slide.alias]
    const settings = resolveSlideAudioSettings(audioSettings, slide.alias)
    const fingerprint = createHash('sha256').update(JSON.stringify({ text: notes[slide.alias], settings })).digest('hex')
    const receipt = audioHistory.clips.findLast(item => item.alias === slide.alias && item.fingerprint === fingerprint)
    assert.ok(receipt, 'selected audio matches the complete current script and voice settings')
    assert.equal(receipt.text, notes[slide.alias])
    assert.deepEqual(receipt.settings, settings)
    assert.equal(clip.source, receipt.file)
    assert.equal(clip.web, '/audio/lezione-test-usabilita/' + clip.source.split('/').at(-1))
    assert.equal(await sha(clip.source), receipt.audioSha256, 'original audio matches its generation receipt')
    assert.equal(clip.sha256, receipt.audioSha256)
    assert.equal(await sha('progetti/slide/public' + clip.web), clip.sha256, 'public audio mirror retains the approved bytes')
    assert.ok(clip.durationSeconds > 0, 'selected audio has verified duration')
  }
  const cardArtwork = await read(manifest.cardArtworkManifest)
  const catalog = await read('progetti/slide/data/card-artwork-local.json')
  const cardTitles = manifest.slides.flatMap(slide => [...(slide.cards ?? []), ...(slide.panels ?? []).map(panel => panel.title)])
  assert.deepEqual(Object.keys(cardArtwork.mappings), [...new Set(cardTitles.map(normalizeTitle))], 'all usability card titles retain an explicit illustration')
  assert.deepEqual(catalog.mappings[manifest.lesson], cardArtwork.mappings, 'generator retains the complete card mapping')
  for (const title of cardTitles) {
    const id = cardArtwork.mappings[normalizeTitle(title)]
    assert.ok(cardArtwork.images.some(image => image.id === id), 'every card has an illustration from the lesson family')
  }
  for (const image of cardArtwork.images) {
    assert.equal(catalog.assets[image.id], image.web, 'card artwork is registered in the shared component catalog')
    assert.equal(await sha(image.original), image.originalSha256, 'original card illustration is retained')
    assert.equal(await sha('progetti/slide/public' + image.web), image.sha256, 'lossless card derivative matches the selected illustration')
    assert.equal((await readFile(new URL(image.promptFile, root), 'utf8')).trim(), image.prompt, 'exact generation prompt is retained')
    assert.deepEqual(image.alpha.range, [0, 255], 'card illustration retains transparency and opaque interiors')
    assert.ok(image.owners.length > 0 && image.owners.every(owner => cardArtwork.mappings[normalizeTitle(owner.card)] === image.id), 'each illustration has matching active cards')
  }
  for (const collection of [notes, originalNotes])
    assert.deepEqual(Object.keys(collection), manifest.slides.filter(slide => slide.kind !== 'criteria-references').map(slide => slide.alias), 'requested notes cover the lesson in order, excluding references')
  const spokenWords = Object.values(originalNotes).reduce((sum, note) => sum + note.split(/\s+/u).length, 0)
  assert.equal(manifest.spokenWords, spokenWords, 'word count is derived from the complete spoken script')
  const integrations = {
    sources: [...criteria.sources, ...testing.sources],
    slides: [...criteria.slides, ...testing.slides].sort((a, b) => a.afterSourcePage - b.afterSourcePage),
  }
  const references = new Map(integrations.sources.map(source => [source.id, source]))
  const activeImages = new Map([...assets.images, ...redrawn.images, ...scenes.images].map(image => [image.id, image]))
  const slides = deck.slides.filter(slide => slide.frontmatter.lesson === manifest.lesson)
  const opening = manifest.slides.find(slide => slide.alias === principlesOpening.alias)
  const openingContent = slides.find(slide => slide.frontmatter.routeAlias === principlesOpening.alias).content
  assert.equal(opening.sourcePage, principlesOpening.sourcePage, 'the filled opening retains its historical page')
  assert.deepEqual(opening.panels, principlesOpening.panels, 'the requested opening contains all three questions')
  assert.ok(openingContent.includes(principlesOpening.lead) && openingContent.includes(principlesOpening.takeaway), 'the opening retains its introduction and bridge')
  for (const panel of principlesOpening.panels) {
    assert.ok(openingContent.includes(panel.title) && openingContent.includes(panel.text), 'the former blank divider displays each question')
    assert.ok(originalNotes[principlesOpening.alias].toLocaleLowerCase('it').includes(panel.text.toLocaleLowerCase('it')), 'opening questions match the recorded speaker script')
  }
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
    assert.notEqual(slide.frontmatter.localOnly, true, 'lesson 12 is available in public builds')
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
        assert.deepEqual(expected.readingPages, testing.slides.find(item => item.id === expected.id).readingPages, 'book pagination remains in local provenance')
        assert.ok(!/di pascale|PDF pp\./iu.test(slide.content), 'preparatory book citations are omitted from the visible lesson on request')
        assert.ok(!slide.content.includes(testing.reading.file), 'the local book is not exposed as a downloadable asset')
      }
    }
    if (expected.kind === 'criteria-references') {
      assert.equal(slide.frontmatter.speakerNotesEnabled, false, 'reference slides explicitly exclude speaker notes')
      assert.ok(!slide.note?.trim(), 'reference slides contain no speaker notes')
    } else {
      assert.notEqual(slide.frontmatter.speakerNotesEnabled, false, 'teaching slides retain speaker notes')
      assert.equal(slide.note?.trim(), notes[expected.alias], 'Slidev retains the full requested speaker script')
      assert.equal(stripAudioDelivery(notes[expected.alias]), originalNotes[expected.alias], 'delivery tags preserve every spoken character')
      assert.ok(originalNotes[expected.alias].trim(), 'each teaching slide has a spoken script')
      assert.ok(!/https?:\/\/|<!--|-->|\*\*|\[[^\]]*\]/u.test(originalNotes[expected.alias]), 'spoken copy contains prose rather than links, markup or stage directions')
      assert.ok(notes[expected.alias].startsWith('[calm, matter-of-fact delivery]'), 'neutral delivery matches lessons 09–10')
    }
    assert.equal(expected.narrationEnabled, i < 110, 'generation is limited to the first 110 slides')
    assert.equal(slide.frontmatter.narrationAudio, audioSelection.clips[expected.alias]?.web, 'each slide uses only its selected requested recording')
    assert.equal(slide.frontmatter.narrationCaptions, captionSelection.clips[expected.alias]?.web, 'captions follow exactly the selected recordings')
    if (expected.presentation) {
      assert.deepEqual(expected.presentation, illustratedLayouts.slides.find(layout => layout.alias === expected.alias), 'visible summaries use the explicit requested presentation registry')
      assert.equal(createHash('sha256').update(JSON.stringify(expected.blocks)).digest('hex'), expected.presentation.originalBlocksSha256, 'the complete original paragraphs remain unchanged in the source manifest')
      assert.equal(createHash('sha256').update(originalNotes[expected.alias]).digest('hex'), expected.presentation.scriptSha256, 'the full spoken explanation remains unchanged')
      const visibleCopy = expected.presentation.preserveOriginal
        ? expected.blocks.map(block => block.text.replace(/^❏\s*/, ''))
        : [expected.presentation.lead, ...expected.presentation.items]
      for (const text of visibleCopy)
        assert.ok(slide.content.includes(text.replaceAll('&', '&amp;').replaceAll('"', '&quot;')), 'the visible concise explanation remains selectable')
      assert.ok(slide.content.includes(activeImages.get(expected.presentation.scene).web), 'the matching explanatory scene is rendered on the right')
    } else for (const block of expected.blocks ?? []) {
      const escaped = block.text.replace(/^❏\s*/, '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
      assert.ok(slide.content.includes(escaped), `source page ${expected.sourcePage}: complete selectable copy`)
    }
    if (expected.attribution === 'Steve Krug · Don’t Make Me Think')
      assert.ok(!slide.content.includes(expected.attribution), 'the repeated Krug credit is omitted on request and retained in source metadata')
    else if (expected.attribution) assert.ok(slide.content.includes(expected.attribution), 'source attribution remains visible')
    if (expected.kind === 'table' || expected.kind === 'testing-table') {
      assert.ok(slide.content.includes(`<TestUsabilityTable code="${expected.alias}" />`), 'tables use the shared native LessonTable presentation')
      assert.deepEqual(tables[expected.alias].rows, expected.rows, 'every historical table cell is preserved in the native component data')
      assert.deepEqual(tables[expected.alias].headers, expected.columns.map(text => text || 'Aspetto'), 'all original column headings are preserved')
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
  for (const scene of scenes.images) {
    assert.equal(await sha(scene.original), scene.originalSha256, 'the original teaching scene is retained')
    assert.equal(await sha('progetti/slide/public' + scene.web), scene.sha256, 'the scene derivative matches the selected original')
    assert.ok(scene.alt && scene.prompt && scene.owners.length, 'scenes retain alt text, prompt and active owners')
  }
  assert.deepEqual(redrawn.preservedDocumentaryImages, ['figura-12', 'figura-30'], 'the two author portraits remain documentary images')
  assert.deepEqual(redrawn.images.map(image => image.id).sort(), assets.images.filter(image => !redrawn.preservedDocumentaryImages.includes(image.id)).map(image => image.id).sort(), 'every teaching illustration has a new version')
  for (const image of redrawn.images) {
    const historical = assets.images.find(original => original.id === image.id)
    assert.equal(image.historicalOriginal, historical.original, 'redrawn figures retain their source reference')
    if (image.kind === 'documentary-screenshot') {
      assert.equal(image.sourceUrl, 'https://www.google.com/?hl=it', 'Google is captured from the actual website')
      assert.equal(image.capture.pixelEditing, false, 'the screenshot preserves original page pixels')
      assert.ok(image.rights.includes('Google') && !image.caption.includes('Ricostruzione'), 'actual screenshot retains Google attribution')
    } else assert.equal(image.rights, historical.rights, 'historical attribution is preserved')
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
  return { slides: slides.length, originalPages: source.pages.length, editorialSlides: editorial.length, figures: assets.images.length, redrawnFigures: redrawn.images.length, illustratedCards: cardTitles.length, cardIllustrations: cardArtwork.images.length, minutes: manifest.minutes, speakerNotes: Object.keys(notes).length, spokenWords, audioClips: Object.keys(audioSelection.clips).length, audioDurationSeconds: Object.values(audioSelection.clips).reduce((sum, clip) => sum + clip.durationSeconds, 0) }
}
