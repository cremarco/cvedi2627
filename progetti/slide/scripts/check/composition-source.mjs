import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { stripAudioDelivery } from '../build/audio-delivery.mjs'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
const read = async file => JSON.parse(await readFile(file, 'utf8'))
const hash = async file => createHash('sha256').update(await readFile(file)).digest('hex')

/** Check editorial coverage, preservation and future narration without an audio service. */
export async function checkCompositionSources(deck) {
  const base = 'progetti/slide/assets/booklet/lezione-composizione/'
  const manifest = await read(base + 'manifest.json')
  const plan = await read(manifest.editorialPlan)
  const notes = await read(manifest.speakerNotesSource)
  const original = await read(manifest.speakerNotesOriginalSource)
  const imageManifest = await read(manifest.imageManifest)
  const images = new Map(imageManifest.images.map(image => [image.code, image]))
  const slides = deck.slides.filter(slide => slide.frontmatter.lesson === manifest.lesson)
  assert.equal(manifest.palette, 'indigo', 'composition follows blue with indigo')
  assert.equal(manifest.number, 10)
  assert.equal(manifest.sourceFile, 'progetti/booklet/capitoli/08-composizione-gerarchia.typ')
  assert.equal(await hash(manifest.sourceFile), manifest.sourceSha256, 'current booklet source fingerprint')
  assert.equal(slides.length, 70, 'the reviewed seventy-slide sequence is complete')
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
    assert.equal(slide.frontmatter.narrationAudio, undefined, alias + ': no generated audio')
    assert.doesNotMatch(slide.content, /LessonAudio|<audio|\.mp3|section-divider/u)
    for (const code of expected.figures) {
      const image = images.get(code)
      assert.ok(image?.caption && image?.alt, code + ': caption and alternative from current chapter')
      assert.ok(slide.content.includes(image.web), code + ': correct published figure')
    }
  }
  assert.ok(words >= 9000 && words <= 10000, 'narration fits the planned seventy-five minutes')
  assert.equal(words, manifest.spokenWords)
  assert.equal(slides.reduce((sum, slide) => sum + slide.frontmatter.lessonMinutes, 0), 90)
  assert.deepEqual(plan.slides.filter(slide => slide.kind === 'activity').map(slide => slide.minutes), [8,7])
  assert.equal(slides.filter(slide => /chapter-slide/u.test(slide.frontmatter.class)).length, 1)
  assert.equal(slides[1].frontmatter.layout, 'summary')
  for (const image of images.values()) {
    assert.equal(await hash(image.file), image.sha256, image.code + ': published bytes')
    assert.equal(await hash(image.source), image.sourceSha256, image.code + ': preserved source bytes')
    assert.equal(image.metadataSource, manifest.sourceFile)
    if (image.nativeSource) {
      assert.equal(await hash(image.nativeSource), image.nativeSourceSha256)
      assert.ok((await readFile(image.nativeSource, 'utf8')).includes('DM Sans 9pt'))
    }
    for (const input of image.inputs ?? []) assert.equal(await hash(input.file), input.sha256)
  }
  const bibliography = await read(base + 'references.json')
  assert.equal(await hash(bibliography.source), bibliography.sourceSha256, 'reader bibliography derives from current source')
  const referencesText = await readFile('progetti/slide/public/materials/composizione/fonti.txt', 'utf8')
  for (const publication of Object.values(bibliography.publications)) assert.ok(referencesText.includes(publication.title))
  assert.doesNotMatch(referencesText, /compArnheim:|type: Book|Originale: progetti\//u, 'download is reader-facing prose, without YAML or internal paths')
  for (const material of imageManifest.materials) {
    assert.equal(await hash(material.file), material.sha256, 'common starting layout is intact')
    assert.equal(await hash(material.nativeSource), material.nativeSourceSha256)
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
  const kit = await readFile('progetti/slide/public/materials/composizione/invito.txt', 'utf8')
  assert.ok(kit.includes('Via del Parco 8') && kit.includes('8 minuti') && kit.includes('7 per la prova'))
  assert.ok(slides.find(slide => slide.frontmatter.routeAlias.endsWith('-materiali')).content.includes('/materials/composizione/invito.txt'))
  assert.ok(slides.find(slide => slide.frontmatter.routeAlias.endsWith('-materiali')).content.includes('/materials/composizione/invito-iniziale.svg'))
  return { slides: slides.length, minutes: 90, activityMinutes: 15, spokenWords: words, figures: new Set(plan.slides.flatMap(slide => slide.figures)).size }
}
