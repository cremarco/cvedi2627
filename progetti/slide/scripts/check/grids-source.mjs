import assert from 'node:assert/strict'
import { readFile, readdir, realpath, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripAudioDelivery, resolveSlideAudioSettings } from '../build/audio-delivery.mjs'

const root = fileURLToPath(new URL('../../../..', import.meta.url))
export const gridsManifestPath = 'progetti/slide/assets/booklet/lezione-griglie/manifest.json'
export const readGridsManifest = async () => JSON.parse(await readFile(path.join(root, gridsManifestPath), 'utf8'))

/** Lesson 09 follows the current chapter, independently of the historical UX curriculum. */
export async function checkGridsSources(deck) {
  const manifest = await readGridsManifest()
  assert.equal(manifest.lesson, 'griglie-layout', 'grids: explicit independent lesson identity')
  assert.equal(manifest.slideCount, 63, 'grids: nine intentionally redundant slides are excluded from the active lesson')
  assert.equal(manifest.minutes, 78, 'grids: the simplified lesson retains its worked examples and activity budgets')
  const plan = JSON.parse(await readFile(path.join(root, manifest.editorialPlan), 'utf8'))
  assert.equal(manifest.speakerNotesSource, 'progetti/slide/assets/booklet/lezione-griglie/speaker-notes.json', 'grids: narration has its own reproducible source')
  const speakerNotes = JSON.parse(await readFile(path.join(root, manifest.speakerNotesSource), 'utf8'))
  assert.equal(manifest.speakerNotesOriginalSource, 'progetti/slide/assets/booklet/lezione-griglie/speaker-notes-original.json')
  const originalNotes = JSON.parse(await readFile(path.join(root, manifest.speakerNotesOriginalSource), 'utf8'))
  assert.deepEqual(Object.keys(speakerNotes), Object.keys(originalNotes), 'grids: all original notes remain preserved')
  assert.deepEqual(Object.keys(speakerNotes).sort(), manifest.slides.map(slide => slide.alias).sort(), 'grids: one narration for every active alias, with no archived or orphan entries')
  const narrationWords = Object.values(speakerNotes).reduce((sum, text) => sum + stripAudioDelivery(text).trim().split(/\s+/u).length, 0)
  assert.ok(narrationWords >= 7800 && narrationWords <= 8400, 'grids: the complete lesson narration stays within the agreed 7,800–8,400-word estimate')
  const coverNarration = stripAudioDelivery(speakerNotes['griglie-layout'])
  assert.match(coverNarration, /^Buongiorno a tutte e a tutti\./u, 'grids: the cover opens with the class greeting')
  assert.ok(coverNarration.split(/\s+/u).length <= 50 && !coverNarration.includes('\n'), 'grids: the cover keeps a brief spoken introduction')
  for (const [alias, text] of Object.entries(speakerNotes)) {
    assert.ok(typeof text === 'string' && text.trim() === text && text.length > 0, `${alias}: narration is clean nonempty prose`)
    assert.ok(text.startsWith('[calm, matter-of-fact delivery]'), `${alias}: every note uses the requested neutral delivery`)
    const plainText = stripAudioDelivery(text)
    assert.equal(plainText, originalNotes[alias], `${alias}: every original character is preserved under the voice directions`)
    assert.doesNotMatch(plainText, /[\d`*_<>$%≈=+×÷\[\]]|https?:\/\/|www\.|\\(?:frac|mathrm|varphi)|^\s*(?:#{1,6}\s|[-•]\s)/mu, `${alias}: spoken prose has no markup, digits or formula code`)
  }
  for (const [slug, duration] of [['esercizio-ricomposizione', 'otto'], ['esercizio-due-larghezze', 'sette']]) {
    const text = speakerNotes[`griglie-layout-${slug}`]
    assert.match(text, /sospend|pausa|fermat|interromp/i, `${slug}: the spoken instructions invite an autonomous pause`)
    assert.ok(text.includes(`${duration} minuti`), `${slug}: narration preserves the activity duration`)
  }
  assert.equal(manifest.archivedSlides, 'progetti/slide/assets/booklet/lezione-08-tipografia/griglie-interfacce-archive.json', 'grids: the earlier typography archive remains separate')
  assert.equal(manifest.simplifiedContentArchive, 'progetti/slide/assets/booklet/lezione-griglie/simplification-archive.json', 'grids: the simplification has its own explicit archive')
  const simplified = JSON.parse(await readFile(path.join(root, manifest.simplifiedContentArchive), 'utf8'))
  assert.equal(simplified.lesson, manifest.lesson, 'grids: the simplification archive identifies lesson 09')
  assert.equal(simplified.sourceFile, manifest.sourceFile, 'grids: archived material retains the current chapter source')
  assert.equal(simplified.sourceSlideCount, 72, 'grids: the archive records the complete lesson before simplification')
  assert.equal(simplified.sourceMinutes, 84.5, 'grids: the previous teaching budget is recorded')
  assert.ok(simplified.purpose?.trim(), 'grids: the simplification archive states its purpose')
  assert.deepEqual(simplified.slides.map(saved => saved.plan?.slug), [
    'storia-foglio-schermo', 'anatomia-box-sizing', 'terzi-documenti-critici', 'terzi-documenti-confronto',
    'aureo-originale', 'responsive-adaptive-lettura-critica', 'golden-grid-documento',
    'osservare-ipotizzare-verificare', 'interfaccia-gioco',
  ], 'grids: all nine intentional exclusions retain their original editorial records')
  assert.equal(manifest.slideCount + simplified.slides.length, simplified.sourceSlideCount, 'grids: every removed slide is accounted for')
  const slidevRequire = createRequire(await realpath(new URL('../../../../node_modules/@slidev/cli/package.json', import.meta.url)))
  const { parseSlide } = await import(slidevRequire.resolve('@slidev/parser/fs'))
  assert.equal(manifest.sourceFile, 'progetti/booklet/capitoli/07-griglia.typ', 'grids: the current booklet chapter is the source')
  const chapter = await readFile(path.join(root, manifest.sourceFile), 'utf8')
  const registry = JSON.parse(await readFile(path.join(root, manifest.assetManifest), 'utf8'))
  const canonical = new Map(registry.immagini.map(image => [String(image.codice), image]))
  const captions = JSON.parse(await readFile(path.join(root, 'risorse-condivise/dati/figure/griglia/figure.json'), 'utf8'))
  assert.equal(canonical.size, registry.immagini.length, 'grids: canonical figure codes are unique')
  const imageManifest = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/booklet/lezione-griglie/image-manifest.json'), 'utf8'))
  const images = new Map(imageManifest.images.map(image => [String(image.code), image]))
  assert.equal(images.size, imageManifest.images.length, 'grids: web figure codes are unique')
  const teaching = JSON.parse(await readFile(path.join(root, manifest.teachingMaterials), 'utf8'))
  const teachingCodes = new Set(teaching.images.map(image => image.code))
  assert.equal(teachingCodes.size, 7, 'grids: seven original teaching images have separate provenance')
  for (const image of teaching.images) {
    assert.ok(!canonical.has(image.code) && !images.has(image.code), `${image.code}: supplement never replaces a booklet figure`)
    canonical.set(image.code, { percorso: image.source, sha256: image.sourceSha256, attribuzione: image.attribution, diritti: image.rights })
    captions[image.code] = { didascalia: image.caption, alt: image.alt, diritti: ' ' + image.attribution + '.' }
    images.set(image.code, image)
  }
  const kitBytes = await readFile(path.join(root, teaching.exerciseKit.source))
  const kit = JSON.parse(kitBytes)
  assert.equal(kit.text.split(/\s+/).length, 80, 'grids: the exercise has its complete 80-word text')
  assert.equal(kit.appointments.length, 3, 'grids: three common appointments are supplied')
  assert.ok(kit.note && kit.focalDetail, 'grids: service note and image detail are supplied')
  assert.deepEqual(kit.widths, [960, 360], 'grids: the exercise has common wide and narrow formats')
  assert.equal(createHash('sha256').update(kitBytes).digest('hex'), teaching.exerciseKit.sourceSha256, 'grids: kit source hash')
  const archive = await readFile(path.join(root, 'progetti/slide/public', teaching.exerciseKit.download))
  assert.equal(createHash('sha256').update(archive).digest('hex'), teaching.exerciseKit.sha256, 'grids: downloadable kit preserves its registered bytes')
  const slides = deck.slides.filter(slide => slide.frontmatter.lesson === manifest.lesson)
  assert.equal(slides.length, manifest.slideCount, 'grids: slide count matches the current manifest')
  assert.equal(manifest.slides.length, slides.length, 'grids: every slide has its own source record')
  assert.equal(manifest.audioSelectionSource, 'progetti/slide/assets/booklet/lezione-griglie/audio-approved.json', 'grids: approved audio has an explicit selection source')
  const approvedAudio = JSON.parse(await readFile(path.join(root, manifest.audioSelectionSource), 'utf8'))
  assert.equal(approvedAudio.version, 1, 'grids: approved audio uses its supported schema')
  assert.equal(approvedAudio.lesson, manifest.lesson, 'grids: approved audio belongs to this lesson')
  assert.deepEqual(Object.keys(approvedAudio.clips), manifest.slides.map(slide => slide.alias), 'grids: every active slide has its approved audio in lesson order')
  const pendingRegeneration = approvedAudio.pendingRegeneration ?? []
  assert.deepEqual(pendingRegeneration, [], 'grids: every audio reflects the current narration and delivery settings')
  const audioHistory = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/audio/lezione-griglie/manifest.json'), 'utf8'))
  const audioSettings = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json'), 'utf8'))
  assert.equal(audioHistory.lesson, manifest.lesson, 'grids: audio generation receipts belong to this lesson')
  assert.equal(audioHistory.notesSource, manifest.speakerNotesSource, 'grids: audio receipts identify the canonical narration source')
  assert.equal(audioHistory.settingsSource, 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json', 'grids: audio receipts identify the common generation settings')
  assert.ok(Array.isArray(audioHistory.clips), 'grids: current audio generation receipts are recorded')
  assert.equal(audioHistory.clips.length, slides.length, 'grids: exactly one current generation receipt exists for each slide')
  assert.deepEqual(audioHistory.clips.map(clip => clip.alias).sort(), manifest.slides.map(slide => slide.alias).sort(), 'grids: current generation receipts have no duplicate, missing or archived aliases')
  const selectedFiles = Object.values(approvedAudio.clips).map(clip => clip.source)
  assert.equal(new Set(selectedFiles).size, slides.length, 'grids: every slide has its own complete audio file')
  assert.deepEqual(audioHistory.clips.map(clip => clip.file).sort(), [...selectedFiles].sort(), 'grids: current generation receipts contain only the selected files')
  assert.ok(Array.isArray(audioHistory.archivedClips), 'grids: metadata from previous generations remains preserved separately')
  for (const receipt of audioHistory.archivedClips) {
    assert.ok(!selectedFiles.includes(receipt.file), `${receipt.alias}: previous generations are not selected as current audio`)
    assert.equal(receipt.fileRemoved, true, `${receipt.alias}: archived metadata records the removal of the previous MP3`)
  }
  const sourceAudioDirectory = path.join(root, 'progetti/slide/assets/audio/lezione-griglie')
  const audioFiles = (await readdir(sourceAudioDirectory)).filter(file => file.endsWith('.mp3')).sort()
  assert.deepEqual(audioFiles, selectedFiles.map(file => path.basename(file)).sort(), 'grids: previous MP3 files have been removed after the complete replacement')
  for (const [index, slide] of slides.entries()) {
    const alias = slide.frontmatter.routeAlias
    const clip = approvedAudio.clips[alias]
    assert.ok(clip, `${alias}: the slide has its approved narration audio`)
    assert.match(clip.source, /^progetti\/slide\/assets\/audio\/lezione-griglie\/[a-z0-9][a-z0-9._-]*\.mp3$/, `${alias}: the approved source is a canonical local MP3`)
    assert.equal(clip.web, '/audio/lezione-griglie/' + path.basename(clip.source), `${alias}: the public mirror preserves the approved filename`)
    assert.equal(slide.frontmatter.narrationAudio, clip.web, `${alias}: the slide selects exactly its approved audio`)
    const receipt = audioHistory.clips.find(record => record.alias === alias && record.file === clip.source)
    assert.ok(receipt, `${alias}: the approved audio has a preserved generation receipt`)
    assert.equal(receipt.slide, index + 1, `${alias}: the receipt identifies the correct slide`)
    assert.equal(receipt.title, slide.title, `${alias}: the receipt identifies the correct slide title`)
    const recordedText = receipt.submittedText ?? receipt.text
    assert.equal(recordedText, speakerNotes[alias], `${alias}: the recording uses exactly the current narration and voice directions`)
    assert.equal(stripAudioDelivery(recordedText), originalNotes[alias], `${alias}: the selected recording retains the same spoken words`)
    assert.equal(stripAudioDelivery(receipt.text), originalNotes[alias], `${alias}: the generation text preserves the original spoken prose`)
    assert.equal(receipt.textSha256, createHash('sha256').update(receipt.text).digest('hex'), `${alias}: the original generation text retains its recorded hash`)
    assert.equal(receipt.submittedTextSha256 ?? receipt.textSha256, createHash('sha256').update(recordedText).digest('hex'), `${alias}: the submitted payload retains its recorded hash`)
    assert.equal(receipt.submittedCharacters, recordedText.length, `${alias}: the receipt preserves the complete submitted text length`)
    assert.equal(receipt.plainText, originalNotes[alias], `${alias}: the original spoken prose remains preserved in the receipt`)
    assert.equal(receipt.plainTextSha256, createHash('sha256').update(originalNotes[alias]).digest('hex'), `${alias}: the original spoken prose retains its recorded hash`)
    const settings = resolveSlideAudioSettings(audioSettings, alias)
    assert.deepEqual(receipt.settings, settings, `${alias}: the recording uses exactly the current shared voice settings`)
    assert.equal(receipt.fingerprint, createHash('sha256').update(JSON.stringify({ text: recordedText, settings: receipt.settings })).digest('hex'), `${alias}: preserved generation identity uses its actual submitted text and settings`)
    assert.match(clip.sha256, /^[a-f0-9]{64}$/, `${alias}: the approved audio has a SHA-256 hash`)
    assert.equal(receipt.audioSha256, clip.sha256, `${alias}: selection and generation receipt identify the same audio bytes`)
    const bytes = await readFile(path.join(root, clip.source))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), clip.sha256, `${alias}: approved audio bytes remain unchanged`)
    assert.ok(Number.isInteger(receipt.bytes) && receipt.bytes >= 1000, `${alias}: the generation receipt records a complete MP3 response`)
    assert.equal(bytes.length, receipt.bytes, `${alias}: the complete recorded audio file is preserved`)
    assert.ok(Number.isFinite(clip.durationSeconds) && clip.durationSeconds > 0, `${alias}: a positive playback duration is recorded`)
    assert.equal(clip.durationSeconds, receipt.durationSeconds, `${alias}: the approved duration agrees with its verified receipt`)
  }
  assert.equal(slides.filter(slide => slide.frontmatter.narrationAudio !== undefined).length, slides.length, 'grids: every slide has audio controls')
  assert.deepEqual(slides.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: slides.length }, (_, index) => index + 1), 'grids: complete autonomous pagination')
  assert.equal(slides[0]?.title, 'Griglie e layout', 'grids: chapter title')
  assert.equal(slides[0]?.frontmatter.routeAlias, manifest.lesson, 'grids: stable menu destination')
  assert.match(slides[0]?.frontmatter.class ?? '', /\bchapter-slide\b/, 'grids: original metro cover composition')
  assert.match(slides[0]?.content ?? '', /<ChapterMetro\s+section="ux-grid"\s*\/>/, 'grids: the lesson has its own metro geometry')
  assert.equal(slides[1]?.frontmatter.layout, 'summary', 'grids: opening summary immediately follows the cover')
  assert.equal(slides.filter(slide => slide.frontmatter.layout === 'summary').length, 1, 'grids: exactly one opening summary')
  assert.ok(slides[1]?.frontmatter.summaryStatement?.trim() && slides[1]?.frontmatter.summarySupport?.trim(), 'grids: the summary has its statement and support')
  assert.match(slides[1]?.content.trim() ?? '', /^# [^\n]+$/, 'grids: the summary keeps one Markdown heading')
  const objectives = slides[2]
  assert.equal(objectives?.frontmatter.routeAlias, 'griglie-layout-obiettivi', 'grids: objectives follow the opening summary')
  assert.match(objectives?.frontmatter.class ?? '', /\bconcept-slide\b/, 'grids: objectives use the shared concept composition')
  assert.match(objectives?.content ?? '', /class="cvedi-grid three"/, 'grids: objectives use the shared three-card grid')
  assert.equal([...objectives.content.matchAll(/<CvediCard\b/g)].length, 3, 'grids: three teaching objectives')
  const escaped = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  for (const planned of plan.slides) {
    const alias = planned.alias ?? `griglie-layout-${planned.slug}`
    const slide = slides.find(slide => slide.frontmatter.routeAlias === alias)
    assert.ok(slide, `${alias}: the editorial plan keeps its active destination`)
    for (const source of planned.sources ?? []) {
      assert.ok(slide.content.includes(`href="${escaped(source.url)}"`), `${alias}: the planned source URL remains visible on its slide`)
      assert.ok(slide.content.includes(escaped(source.label)), `${alias}: the planned source label is retained`)
    }
  }
  for (const [index, group] of plan.references.entries()) {
    const slide = slides.find(slide => slide.frontmatter.routeAlias === `griglie-layout-fonti-${index + 1}`)
    assert.ok(slide, `${group.title}: the source list remains active`)
    for (const source of group.items) {
      assert.ok(slide.content.includes(`href="${escaped(source.url)}"`), `${group.title}: the source URL is retained`)
      assert.ok(slide.content.includes(escaped(source.label)) && slide.content.includes(escaped(source.note)), `${group.title}: source label and explanation are retained`)
    }
  }
  const activities = ['esercizio-ricomposizione', 'esercizio-due-larghezze'].map(slug => slides.find(slide => slide.frontmatter.routeAlias === `griglie-layout-${slug}`))
  for (const activity of activities) {
    assert.ok(activity, 'grids: both activity destinations remain available')
    assert.match(activity.frontmatter.class, /\blesson-activity\b/, 'grids: activities use the shared teaching composition')
    assert.match(activity.content, new RegExp(`<p class="aside">Attività · ${activity.frontmatter.lessonMinutes} minuti<\\/p>`), 'grids: a separate activity note agrees with the teaching budget')
    assert.doesNotMatch(activity.content.match(/<p class="lead">([\s\S]*?)<\/p>/)?.[1] ?? '', /^\d+ minuti/, 'grids: the lead is the task rather than its duration')
  }
  assert.equal(activities.reduce((sum, activity) => sum + activity.frontmatter.lessonMinutes, 0), 15, 'grids: the activities retain their fifteen-minute budget')
  const dividers = slides.filter(slide => slide.frontmatter.sectionDivider === true)
  assert.equal(dividers.length, 0, 'grids: no intermediate section openings')
  assert.equal(slides.filter(slide => /\bchapter-slide\b/.test(slide.frontmatter.class ?? '')).length, 1, 'grids: only the lesson cover uses the metro opening')
  assert.equal(slides[0]?.index, deck.slides.filter(slide => slide.frontmatter.lesson === 'tipografia-griglie').at(-1)?.index + 1, 'grids: independent set immediately follows typography')
  assert.equal(slides.at(-1)?.index + 1, deck.slides.find(slide => slide.frontmatter.lesson === 'composizione-gerarchia')?.index, 'grids: composition follows the grid lesson')
  const used = new Set()
  const archivedUsed = new Set()
  const checkFigures = (slide, saved, context, collection) => {
    const callsites = [...slide.content.matchAll(/<LessonFigure\b[^>]*>/g)].map(match => match[0])
    assert.equal(callsites.length, saved.figures.length, context + ': every example uses the shared figure and enlargement')
    for (const [figureIndex, code] of saved.figures.map(String).entries()) {
      const original = canonical.get(code), image = images.get(code), callsite = callsites[figureIndex]
      assert.ok(original && image, `${context}/${code}: figure exists in canonical and web source registries`)
      assert.equal(image.source, original.percorso, `${context}/${code}: the original source is retained`)
      assert.ok(original.attribuzione && original.diritti, `${context}/${code}: attribution and rights remain recorded`)
      assert.match(callsite, /\balt="[^"]+"/, `${context}/${code}: meaningful alternative text is present`)
      assert.match(callsite, /\bcaption="[^"]+"/, `${context}/${code}: caption is present`)
      assert.ok(captions[code]?.didascalia && captions[code]?.alt, `${context}/${code}: the current booklet caption and alternative text are preserved`)
      const adapted = saved.figureTexts?.[code]
      if (adapted) {
        // This slide shows the overview; the booklet's additional detail is
        // omitted, so the description must name only the view actually present.
        assert.equal(code, '391', context + ': only the documented Greiman view has adapted text')
        assert.equal(adapted.caption, captions[code].didascalia.replace('Vista complessiva e dettaglio del rapporto fra pixel, immagine e segni.', 'Vista complessiva dell’opera.'), context + ': overview adaptation preserves author, title and date')
      }
      const caption = (adapted?.caption ?? captions[code].didascalia) + (captions[code].diritti ? ' ' + captions[code].diritti : '')
      assert.equal(callsite.match(/\bcaption="([^"]+)"/)?.[1], escaped(caption), `${context}/${code}: caption describes the shown source view and retains every credit`)
      assert.equal(callsite.match(/\balt="([^"]+)"/)?.[1], escaped(adapted?.alt ?? captions[code].alt), `${context}/${code}: alternative text describes the shown source view`)
      assert.equal(callsite.match(/\bsrc="([^"]+)"/)?.[1], image.web, `${context}/${code}: the registered figure is displayed in source order`)
      collection.add(code)
    }
    assert.ok(!/<(?:input|select|textarea)\b/.test(slide.content), context + ': didactic UI examples remain images')
  }
  const archivedAliases = new Set()
  const archivedSlides = new Map()
  for (const saved of simplified.slides) {
    const originalPlan = saved.plan, mapping = saved.mapping, context = `grids/archive/${originalPlan.slug}`
    assert.ok(saved.reason?.trim(), context + ': the intentional exclusion has a reason')
    assert.ok(typeof saved.markdown === 'string' && saved.markdown.trim(), context + ': original Markdown is retained')
    const slide = parseSlide(saved.markdown), matter = slide.frontmatter
    assert.equal(mapping.alias, originalPlan.alias ?? `griglie-layout-${originalPlan.slug}`, context + ': original planned alias is preserved')
    assert.ok(!archivedAliases.has(mapping.alias), context + ': each removed alias is archived once')
    archivedAliases.add(mapping.alias)
    archivedSlides.set(mapping.alias, slide)
    assert.ok(!deck.slides.some(active => active.frontmatter.routeAlias === mapping.alias), context + ': removed alias stays outside the active deck')
    assert.ok(!plan.slides.some(active => (active.alias ?? `griglie-layout-${active.slug}`) === mapping.alias), context + ': removed slide stays outside the active plan')
    assert.equal(mapping.title, originalPlan.title, context + ': original plan and mapping agree on the title')
    assert.equal(slide.title, mapping.title, context + ': original Markdown title is retained')
    assert.equal(matter.routeAlias, mapping.alias, context + ': original Markdown alias is retained')
    assert.equal(matter.lesson, manifest.lesson, context + ': original lesson identity is retained')
    assert.equal(matter.lessonSlide, mapping.lessonSlide, context + ': original slide number is retained')
    assert.equal(matter.lessonMinutes, mapping.minutes, context + ': original Markdown budget is retained')
    assert.equal(mapping.minutes, originalPlan.minutes, context + ': original plan budget is retained')
    assert.equal(mapping.section, originalPlan.section, context + ': original thematic section is retained')
    assert.equal(mapping.sourceHeading, originalPlan.sourceHeading, context + ': original source mapping is retained')
    assert.ok(mapping.sourceHeading?.trim() && chapter.includes(mapping.sourceHeading), context + ': a genuine chapter heading is cited')
    assert.deepEqual(mapping.figures, originalPlan.figures ?? [], context + ': all original figure mappings are retained')
    assert.deepEqual((matter.bookletFigures ?? []).map(String), mapping.figures.map(String).filter(code => !teachingCodes.has(code)), context + ': original booklet figure identities are retained')
    assert.deepEqual((matter.teachingFigures ?? []).map(String), mapping.figures.map(String).filter(code => teachingCodes.has(code)), context + ': original teaching figure identities are retained')
    assert.equal(matter.bookletChapter, 7, context + ': original chapter identity is retained')
    assert.equal(matter.bookletSource, manifest.sourceFile, context + ': original chapter provenance is retained')
    assert.ok(!slide.note?.trim(), context + ': the archived version remains without speaker notes')
    assert.ok(Array.isArray(saved.retainedIn) && saved.retainedIn.length > 0, context + ': related active destinations are recorded')
    for (const alias of saved.retainedIn)
      assert.ok(slides.some(active => active.frontmatter.routeAlias === alias), context + ': each related destination remains active')
    if (originalPlan.formula)
      assert.ok(slide.content.includes(originalPlan.formula), context + ': original mathematical notation is retained')
    for (const source of originalPlan.sources ?? []) {
      assert.ok(slide.content.includes(`href="${escaped(source.url)}"`), context + ': original source URL is retained')
      assert.ok(slide.content.includes(escaped(source.label)), context + ': original source label is retained')
    }
    checkFigures(slide, mapping, context, archivedUsed)
  }
  const archivedComparison = archivedSlides.get('griglie-layout-terzi-documenti-confronto')
  const archivedExplanation = archivedSlides.get('griglie-layout-terzi-documenti-critici')
  assert.equal(archivedComparison.frontmatter.lessonSlide, archivedExplanation.frontmatter.lessonSlide + 1, 'grids: the original document sequence is preserved in the archive')
  assert.match(archivedComparison.frontmatter.class, /\bfigure-pair\b/, 'grids: the archived documents preserve their full-width pair composition')
  assert.doesNotMatch(archivedComparison.frontmatter.class, /\btypography-slide\b/, 'grids: the archived documents preserve their original reading space')
  assert.deepEqual(archivedExplanation.frontmatter.bookletFigures, [], 'grids: the archived explanation remains separate from its figures')
  assert.deepEqual(archivedComparison.frontmatter.bookletFigures, ['2024-107-attenzione', '2024-107-terzi'], 'grids: both historical documents and their order remain in the archive')
  assert.equal(archivedExplanation.frontmatter.lessonMinutes + archivedComparison.frontmatter.lessonMinutes, 1, 'grids: the archived document budget is preserved')
  const boxModel = slides.find(slide => slide.frontmatter.routeAlias === 'griglie-layout-anatomia-box-sizing-confronto')
  const archivedBoxModel = simplified.slides.find(saved => saved.plan.slug === 'anatomia-box-sizing')
  assert.ok(boxModel?.content.includes(archivedBoxModel.plan.formula), 'grids: the box model calculation is retained in its comparison')
  assert.equal(boxModel.frontmatter.lessonMinutes, 1.5, 'grids: the combined box model example retains time for the calculation')
  const removedMinutes = simplified.slides.reduce((sum, saved) => sum + saved.mapping.minutes, 0)
  assert.equal(manifest.minutes, simplified.sourceMinutes - removedMinutes + .5, 'grids: the shorter budget accounts for exclusions and the expanded box model example')
  let minutes = 0
  for (const [index, slide] of slides.entries()) {
    const saved = manifest.slides[index], matter = slide.frontmatter, context = `grids/${index + 1}`
    assert.equal(saved.lessonSlide, matter.lessonSlide, context + ': source pagination')
    assert.equal(saved.title, slide.title, context + ': source title')
    assert.equal(saved.alias, matter.routeAlias, context + ': source alias')
    assert.ok(typeof saved.alias === 'string' && saved.alias.trim(), context + ': every slide has an alias')
    assert.equal(deck.slides.filter(other => other.frontmatter.routeAlias === saved.alias).length, 1, context + ': alias is unique throughout the complete deck')
    assert.ok(Number.isInteger(saved.section) && saved.section >= 0 && saved.section <= 7, context + ': thematic section is explicit')
    assert.ok(saved.sourceHeading?.trim() && chapter.includes(saved.sourceHeading), context + ': a genuine heading in the current chapter is cited')
    assert.notEqual(matter.localOnly, true, context + ': lesson 09 is published')
    assert.equal(matter.lessonNumber, index === 0 ? 9 : undefined, context + ': the cover identifies lesson 09')
    assert.equal(slide.note?.trim(), speakerNotes[saved.alias], context + ': parsed speaker notes match their alias source exactly')
    assert.equal(matter.bookletChapter, 7, context + ': current chapter identity')
    assert.equal(matter.bookletSource, manifest.sourceFile, context + ': current chapter provenance')
    for (const field of ['bookletPages', 'bookletFolios', 'bookletAssets', 'bookletNodes'])
      assert.equal(matter[field], undefined, context + ': historical source identities are not invented')
    assert.deepEqual((matter.bookletFigures ?? []).map(String), saved.figures.map(String).filter(code => !teachingCodes.has(code)), context + ': booklet figures retain their source identity')
    assert.deepEqual((matter.teachingFigures ?? []).map(String), saved.figures.map(String).filter(code => teachingCodes.has(code)), context + ': teaching figures remain distinct from the booklet')
    assert.ok(Number.isFinite(matter.lessonMinutes) && matter.lessonMinutes >= 0, context + ': valid teaching budget')
    assert.equal(matter.lessonMinutes, saved.minutes, context + ': teaching budget matches the source record')
    minutes += matter.lessonMinutes
    assert.equal(matter.sectionNumber, undefined, context + ': no intermediate section number')
    assert.doesNotMatch(matter.class ?? '', /\bsection-divider\b/, context + ': no intermediate divider styling')
    checkFigures(slide, saved, context, used)
  }
  assert.ok(Number.isFinite(manifest.minutes) && Math.abs(minutes - manifest.minutes) < 1e-6, 'grids: total teaching budget matches the source manifest')
  assert.deepEqual([...canonical.keys()].sort(), [...images.keys()].sort(), 'grids: the web source registry preserves every canonical figure, including inactive originals')
  for (const code of new Set([...used, ...archivedUsed])) {
    const original = canonical.get(code), image = images.get(code)
    const bytes = await readFile(path.join(root, image.source))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), image.sourceSha256, `${code}: original bytes remain unchanged`)
    assert.equal(image.sourceSha256, original.sha256, `${code}: source hash agrees with the canonical registry`)
    assert.match(image.web, /^\/images\/shared\//, `${code}: figure uses the existing shared-asset pipeline`)
    const web = path.join(root, 'progetti/slide/public', image.web)
    assert.ok((await stat(web)).size > 0, `${code}: web image exists`)
    assert.equal(createHash('sha256').update(await readFile(web)).digest('hex'), image.sha256, `${code}: selected web bytes match their manifest`)
    if (image.transformation === 'identical-bytes') assert.equal(image.sha256, image.sourceSha256, `${code}: unmodified figures retain their source bytes`)
    else {
      assert.equal(image.transformation, 'outlined-source-text', `${code}: the SVG derivative has an explicit transformation`)
      assert.ok(image.fonts.length > 0, `${code}: SVG fonts have preserved provenance`)
      const svg = await readFile(web, 'utf8')
      assert.match(svg, /<(?:[\w.-]+:)?path\b/i, `${code}: the SVG retains authentic glyph outlines as paths`)
      assert.doesNotMatch(svg, /<(?:[\w.-]+:)?(?:text|tspan)\b/i, `${code}: no live SVG text can use a substitute font`)
      assert.doesNotMatch(svg, /@font-face\b|<(?:[\w.-]+:)?font-face\b/i, `${code}: no embedded font remains after outlining`)
    }
    for (const font of image.fonts) {
      assert.equal(createHash('sha256').update(await readFile(path.join(root, font.source))).digest('hex'), font.sourceSha256, `${code}: original font bytes remain unchanged`)
      assert.ok((await stat(path.join(root, font.license))).size > 0, `${code}: font license remains preserved`)
    }
  }
  return { lesson: manifest.lesson, slides: slides.length, minutes, sections: dividers.length, figures: used.size,
    speakerNotes: Object.keys(speakerNotes).length, narrationWords, audioClips: Object.keys(approvedAudio.clips).length, pendingAudioClips: pendingRegeneration.length,
    archivedSlides: simplified.slides.length, archivedFigures: archivedUsed.size,
    archivedOnlyFigures: [...archivedUsed].filter(code => !used.has(code)).length }
}
