import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { stripAudioDelivery, resolveSlideAudioSettings } from '../build/audio-delivery.mjs'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
const read = async file => JSON.parse(await readFile(file, 'utf8'))
const hash = async file => createHash('sha256').update(await readFile(file)).digest('hex')

/** Check editorial coverage, preservation and recorded narration without an audio service. */
export async function checkCompositionSources(deck) {
  const base = 'progetti/slide/assets/booklet/lezione-composizione/'
  const manifest = await read(base + 'manifest.json')
  const plan = await read(manifest.editorialPlan)
  assert.equal(manifest.excludedSlidesSource, base + 'excluded-slides.json')
  assert.equal(plan.excludedSlidesSource, manifest.excludedSlidesSource)
  const excluded = await read(manifest.excludedSlidesSource)
  const history = await read('progetti/slide/assets/audio/lezione-composizione/manifest.json')
  async function checkRemovedAudio(audio) {
    const receipt = history.archivedClips.find(clip => clip.file === audio.source)
    assert.ok(receipt, 'removed audio retains its generation receipt')
    assert.equal(receipt.audioSha256, audio.sha256)
    assert.equal(receipt.fileRemoved, true)
    await assert.rejects(access(audio.source), { code: 'ENOENT' })
  }
  assert.equal(excluded.version, 1)
  assert.equal(excluded.lesson, manifest.lesson)
  assert.equal(excluded.sourceFile, manifest.sourceFile)
  assert.equal(excluded.sourceSlideCount, 70)
  assert.equal(excluded.originalOrder.length, excluded.sourceSlideCount)
  assert.equal(new Set(excluded.originalOrder).size, excluded.sourceSlideCount)
  const excludedAliases = excluded.slides.map(saved => saved.plan.alias)
  assert.deepEqual(excludedAliases, ['composizione-gerarchia-hud', 'composizione-gerarchia-diegesi', 'composizione-gerarchia-moodboard', 'composizione-gerarchia-moodboard-sistema', 'composizione-gerarchia-materiali', 'composizione-gerarchia-attivita-variazione', 'composizione-gerarchia-attivita-verifica', 'composizione-gerarchia-restituzione', 'composizione-gerarchia-chiusura'])
  assert.deepEqual(excluded.slides.map(saved => saved.mapping.lessonSlide), [49, 50, 55, 56, 59, 60, 61, 62, 63])
  const historicalOrders = [excluded.originalOrder, ...(excluded.previousOrders ?? []).map(order => order.aliases)]
  for (const order of excluded.previousOrders ?? []) {
    assert.equal(order.aliases.length, order.slideCount)
    assert.equal(new Set(order.aliases).size, order.slideCount)
    assert.ok(order.aliases.every(alias => excluded.originalOrder.includes(alias)))
  }
  const finalInvitationAlias = 'composizione-gerarchia-invito-finale'
  assert.deepEqual(plan.slides.filter(slide => slide.alias !== finalInvitationAlias).map(slide => slide.alias), excluded.originalOrder.filter(alias => !excludedAliases.includes(alias)), 'requested removals and final invitation preserve the remaining order')
  assert.equal(plan.slides[58].alias, finalInvitationAlias, 'the requested final invitation is slide 59')
  assert.equal(plan.slides[58].kind, 'image')
  assert.equal(plan.slides[58].minutes, 1.5)
  for (const saved of excluded.slides) {
    assert.ok(saved.reason && saved.markdown.includes(`routeAlias: "${saved.plan.alias}"`))
    assert.ok(saved.markdown.includes(saved.speakerNotes))
    assert.equal(stripAudioDelivery(saved.speakerNotes), saved.speakerNotesOriginal)
    await checkRemovedAudio(saved.audio)
    for (const figure of saved.figures) assert.equal(await hash(figure.source), figure.sourceSha256)
  }
  for (const saved of excluded.adjustedNarrations) {
    assert.equal(stripAudioDelivery(saved.previousNote), saved.previousOriginal)
    await checkRemovedAudio(saved.previousAudio)
  }
  const notes = await read(manifest.speakerNotesSource)
  const original = await read(manifest.speakerNotesOriginalSource)
  assert.equal(manifest.audioSelectionSource, base + 'audio-approved.json')
  const selection = await read(manifest.audioSelectionSource)
  const settingsSource = 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json'
  const settings = await read(settingsSource)
  assert.equal(selection.version, 1)
  assert.equal(selection.lesson, manifest.lesson)
  assert.equal(history.version, 1)
  assert.equal(history.lesson, manifest.lesson)
  assert.equal(history.notesSource, manifest.speakerNotesSource)
  assert.equal(history.settingsSource, settingsSource)
  const selectedFiles = Object.values(selection.clips).map(clip => clip.source)
  assert.deepEqual(history.clips.map(clip => clip.file).sort(), [...selectedFiles].sort(), 'current generation receipts contain only selected audio')
  assert.deepEqual((await readdir('progetti/slide/assets/audio/lezione-composizione')).filter(file => file.endsWith('.mp3')).sort(), selectedFiles.map(file => file.split('/').at(-1)).sort(), 'unused MP3 files stay removed')
  for (const receipt of history.archivedClips) {
    assert.equal(receipt.fileRemoved, true)
    assert.ok(!selectedFiles.includes(receipt.file))
    await assert.rejects(access(receipt.file), { code: 'ENOENT' })
    assert.equal(receipt.textSha256, createHash('sha256').update(receipt.text).digest('hex'))
    assert.equal(receipt.fingerprint, createHash('sha256').update(JSON.stringify({ text: receipt.text, settings: receipt.settings })).digest('hex'))
  }
  for (const removed of excluded.removedAssets) {
    assert.equal(removed.fileRemoved, true)
    await assert.rejects(access(removed.file), { code: 'ENOENT' })
  }
  assert.deepEqual(Object.keys(selection.clips), manifest.slides.filter(slide => selection.clips[slide.alias]).map(slide => slide.alias))
  assert.deepEqual(manifest.slides.filter(slide => slide.narrationEnabled === false).map(slide => slide.alias), ['composizione-gerarchia-fonti-1', 'composizione-gerarchia-fonti-2', 'composizione-gerarchia-fonti-3'])
  assert.deepEqual(selection.pendingGeneration ?? [], manifest.slides.filter(slide => slide.narrationEnabled !== false && !selection.clips[slide.alias]).map(slide => slide.alias))
  const imageManifest = await read(manifest.imageManifest)
  const overridesSource = base + 'figure-overrides.json'
  const overrides = await read(overridesSource)
  assert.equal(overrides.version, 1)
  assert.equal(overrides.lesson, manifest.lesson)
  const additionsSource = base + 'lesson-figures.json'
  const additions = await read(additionsSource)
  assert.equal(additions.version, 1)
  assert.equal(additions.lesson, manifest.lesson)
  const images = new Map(imageManifest.images.map(image => [image.code, image]))
  const slides = deck.slides.filter(slide => slide.frontmatter.lesson === manifest.lesson)
  assert.equal(manifest.palette, 'indigo', 'composition follows blue with indigo')
  assert.equal(manifest.number, 10)
  assert.equal(manifest.sourceFile, 'progetti/booklet/capitoli/08-composizione-gerarchia.typ')
  assert.equal(await hash(manifest.sourceFile), manifest.sourceSha256, 'current booklet source fingerprint')
  assert.equal(slides.length, 62, 'the final invitation follows the 58 preserved teaching slides before the sources')
  assert.equal(slides.length, manifest.slideCount)
  assert.equal(plan.slides.length, slides.length)
  assert.deepEqual(Object.keys(notes), plan.slides.map(slide => slide.alias), 'one script per alias, in lesson order')
  assert.deepEqual(Object.keys(original), Object.keys(notes))
  const chapter = await readFile(manifest.sourceFile, 'utf8')
  for (const section of plan.sections.filter(section => section.number < 9))
    assert.ok(chapter.includes('== ' + section.title), section.title + ': current chapter section covered')
  assert.deepEqual([...new Set(plan.slides.map(slide => slide.section))], [0,1,2,3,4,5,6,7,8,9])
  let words = 0
  for (const [index, slide] of slides.entries()) {
    const expected = plan.slides[index], alias = expected.alias
    assert.equal(manifest.slides[index].narrationEnabled, expected.narrationEnabled)
    if (expected.narrationEnabled === false) assert.equal(selection.clips[alias], undefined, alias + ': intentionally disabled audio stays unselected')
    assert.equal(slide.frontmatter.routeAlias, alias)
    assert.equal(slide.frontmatter.lessonSlide, index + 1)
    assert.equal(slide.frontmatter.lessonMinutes, expected.minutes)
    assert.equal(slide.frontmatter.bookletChapter, 8)
    assert.equal(slide.frontmatter.bookletSource, manifest.sourceFile)
    assert.equal(slide.title, expected.title)
    assert.equal(slide.note.trim(), notes[alias], alias + ': presenter retains the full submitted script')
    assert.equal(stripAudioDelivery(notes[alias]), original[alias], alias + ': delivery preserves every original character')
    assert.ok(notes[alias].startsWith('[calm, matter-of-fact delivery]'))
    assert.doesNotMatch(original[alias], /https?:|www\.|<!--|-->|\*\*|\$\$|<\/?\w|\[|\]/u, alias + ': pronounceable plain text')
    assert.ok(original[alias].split(/\s+/u).length >= 75, alias + ': complete narration')
    words += original[alias].split(/\s+/u).length
    const clip = selection.clips[alias]
    if (clip) {
      assert.match(clip.source, /^progetti\/slide\/assets\/audio\/lezione-composizione\/[a-z0-9][a-z0-9._-]*\.mp3$/u)
      assert.equal(clip.web, '/audio/lezione-composizione/' + clip.source.split('/').at(-1))
      assert.equal(slide.frontmatter.narrationAudio, clip.web, alias + ': selects its complete recording')
      const receipt = history.clips.find(record => record.alias === alias && record.file === clip.source)
      assert.ok(receipt, alias + ': preserved generation receipt')
      assert.ok([index + 1, ...historicalOrders.map(order => order.indexOf(alias) + 1)].includes(receipt.slide), alias + ': preserve the slide position recorded at generation time')
      assert.equal(receipt.title, slide.title)
      assert.equal(receipt.text, notes[alias], alias + ': exact tagged generation script')
      assert.equal(receipt.plainText, original[alias])
      assert.equal(receipt.textSha256, createHash('sha256').update(notes[alias]).digest('hex'))
      assert.equal(receipt.plainTextSha256, createHash('sha256').update(original[alias]).digest('hex'))
      assert.equal(receipt.submittedCharacters, notes[alias].length)
      assert.deepEqual(receipt.settings, resolveSlideAudioSettings(settings, alias), alias + ': same parameters as Griglie')
      assert.equal(receipt.fingerprint, createHash('sha256').update(JSON.stringify({ text: receipt.text, settings: receipt.settings })).digest('hex'))
      assert.equal(receipt.audioSha256, clip.sha256)
      assert.equal(await hash(clip.source), clip.sha256)
      const bytes = await readFile(clip.source)
      assert.ok(bytes.length >= 1000)
      assert.equal(bytes.length, receipt.bytes)
      assert.ok(Number.isFinite(clip.durationSeconds) && clip.durationSeconds > 0)
      assert.equal(clip.durationSeconds, receipt.durationSeconds)
    } else assert.equal(slide.frontmatter.narrationAudio, undefined, alias + ': disabled or pending audio has no player')
    assert.doesNotMatch(slide.content, /LessonAudio|<audio|\.mp3|section-divider/u)
    for (const code of expected.figures) {
      const image = images.get(code)
      assert.ok(image?.caption && image?.alt, code + ': caption and alternative from current chapter')
      assert.ok(slide.content.includes(image.web), code + ': correct published figure')
    }
  }
  assert.ok(words >= 8500 && words <= 9000, 'narration fits the remaining explanation time')
  assert.equal(words, manifest.spokenWords)
  const minutes = slides.reduce((sum, slide) => sum + slide.frontmatter.lessonMinutes, 0)
  assert.equal(minutes, plan.targetMinutes)
  assert.equal(minutes, excluded.sourceMinutes - excluded.slides.reduce((sum, saved) => sum + saved.plan.minutes, 0) + plan.slides[58].minutes)
  const activityMinutes = plan.slides.filter(slide => slide.kind === 'activity').reduce((sum, slide) => sum + slide.minutes, 0)
  assert.equal(activityMinutes, 0, 'the requested activity block is excluded')
  assert.equal(plan.activityMinutes, activityMinutes)
  assert.equal(manifest.activityMinutes, activityMinutes)
  assert.equal(slides.filter(slide => /chapter-slide/u.test(slide.frontmatter.class)).length, 1)
  assert.equal(slides[1].frontmatter.layout, 'summary')
  for (const image of images.values()) {
    assert.equal(await hash(image.file), image.sha256, image.code + ': published bytes')
    assert.equal(await hash(image.source), image.sourceSha256, image.code + ': preserved source bytes')
    if (image.origin === 'lesson-correction') {
      const correction = overrides.figures.find(item => item.code === image.code)
      assert.ok(correction, image.code + ': explicit lesson correction')
      assert.equal(image.metadataSource, overridesSource)
      for (const field of ['source', 'nativeSource', 'caption', 'rights', 'alt', 'slideAlias'])
        assert.equal(image[field], correction[field], image.code + ': correction retains its authored metadata')
      assert.equal(await hash(image.preservedOriginal.source), image.preservedOriginal.sourceSha256, 'the acquired original remains intact')
      assert.equal(image.preservedOriginal.metadataSource, manifest.sourceFile)
      assert.deepEqual(image.inputs.map(input => input.file), correction.inputs)
    } else if (image.origin === 'lesson-imagegen') {
      const added = additions.images.find(item => item.code === image.code)
      assert.ok(added, image.code + ': declared lesson example')
      assert.equal(image.metadataSource, additionsSource)
      for (const field of ['source', 'caption', 'rights', 'alt', 'slideAlias']) assert.equal(image[field], added[field])
      assert.deepEqual(image.inputs.map(input => input.file), added.inputs)
      const generated = await read(added.inputs.find(file => file.endsWith('/manifest.json')))
      assert.equal(generated.origin, 'imagegen')
      assert.equal(generated.mode, 'built-in')
      assert.equal(generated.source, image.source)
      assert.equal(generated.sha256, image.sourceSha256)
      assert.equal(generated.visualReview.status, 'accepted')
      assert.equal(await hash(generated.promptSource), generated.promptSha256)
      assert.deepEqual(generated.text, ['Laboratorio di fotografia', 'Sperimentare con la luce', 'Sabato 14 novembre', 'Dalle 10 alle 13', 'Spazio Officina', 'Via del Parco 8', 'Iscrizione gratuita', 'Iscriviti'])
    } else assert.equal(image.metadataSource, manifest.sourceFile)
    if (image.nativeSource) {
      assert.equal(await hash(image.nativeSource), image.nativeSourceSha256)
      assert.ok((await readFile(image.nativeSource, 'utf8')).includes('DM Sans 9pt'))
    }
    for (const input of image.inputs ?? []) assert.equal(await hash(input.file), input.sha256)
  }
  const bibliography = await read(base + 'references.json')
  assert.equal(await hash(bibliography.source), bibliography.sourceSha256, 'reader bibliography derives from current source')
  for (const publication of Object.values(bibliography.publications)) assert.ok(publication.title, 'bibliographic metadata remains intact')
  assert.deepEqual(imageManifest.materials, [], 'removed downloads are no longer generated')
  assert.deepEqual([...images.keys()].sort(), [...new Set(plan.slides.flatMap(slide => slide.figures))].sort(), 'only active figures have web copies')
  for (const image of imageManifest.archivedImages) {
    assert.equal(await hash(image.source), image.sourceSha256, 'inactive figure retains its canonical source')
    assert.equal(image.fileRemoved, true)
    await assert.rejects(access(image.file), { code: 'ENOENT' })
  }
  const controlled = images.get('invito-variazione')
  assert.equal(controlled.origin, 'lesson-diagram', 'new comparison distinguished from documentary originals')
  assert.deepEqual(plan.slides.find(slide => slide.slug === 'variazione').figures, ['invito-variazione'])
  const cards = await read('progetti/slide/assets/theme-imagegen/lesson-10-cards/manifest.json')
  const artwork = await read('progetti/slide/data/card-artwork-local.json')
  assert.equal(cards.jobs.length, 3)
  for (const job of cards.jobs) {
    assert.equal(job.family, 'indigo')
    assert.equal(job.visualReview.status, 'accepted')
    assert.equal(await hash(job.original), job.sha256)
    assert.equal(await hash(job.web), job.publicationSha256)
    assert.equal((await readFile(job.promptFile, 'utf8')).trim(), job.prompt.trim())
    assert.equal(artwork.mappings[manifest.lesson][normalizeTitle(job.card)], job.id)
    assert.equal(job.owners[0].slideAlias, plan.slides[2].alias)
    assert.deepEqual(job.alpha.range, [0,255])
  }
  const archivedMaterials = excluded.slides.find(slide => slide.plan.alias.endsWith('-materiali'))
  assert.ok(archivedMaterials.markdown.includes('/materials/composizione/invito.txt'))
  assert.ok(archivedMaterials.markdown.includes('/materials/composizione/invito-iniziale.svg'))
  return { slides: slides.length, minutes, activityMinutes, spokenWords: words, audioClips: Object.keys(selection.clips).length, pendingAudioClips: (selection.pendingGeneration ?? []).length, archivedSlides: excluded.slides.length, figures: new Set(plan.slides.flatMap(slide => slide.figures)).size }
}
