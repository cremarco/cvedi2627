import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../..', import.meta.url))
export const gridsManifestPath = 'assets/booklet/lezione-griglie/manifest.json'
export const readGridsManifest = async () => JSON.parse(await readFile(path.join(root, gridsManifestPath), 'utf8'))

/** The supplementary lesson follows the current chapter, independently of the historical UX curriculum. */
export async function checkGridsSources(deck) {
  const manifest = await readGridsManifest()
  assert.equal(manifest.lesson, 'griglie-layout', 'grids: explicit independent lesson identity')
  assert.equal(manifest.sourceFile, 'typst-booklet/capitoli/07-griglia.typ', 'grids: the current booklet chapter is the source')
  const chapter = await readFile(path.join(root, manifest.sourceFile), 'utf8')
  const registry = JSON.parse(await readFile(path.join(root, manifest.assetManifest), 'utf8'))
  const canonical = new Map(registry.immagini.map(image => [String(image.codice), image]))
  const captions = JSON.parse(await readFile(path.join(root, 'assets/dati/figure/griglia/figure.json'), 'utf8'))
  assert.equal(canonical.size, registry.immagini.length, 'grids: canonical figure codes are unique')
  const imageManifest = JSON.parse(await readFile(path.join(root, 'assets/booklet/lezione-griglie/image-manifest.json'), 'utf8'))
  const images = new Map(imageManifest.images.map(image => [String(image.code), image]))
  assert.equal(images.size, imageManifest.images.length, 'grids: web figure codes are unique')
  const slides = deck.slides.filter(slide => slide.frontmatter.lesson === manifest.lesson)
  assert.equal(slides.length, manifest.slideCount, 'grids: slide count matches the current manifest')
  assert.equal(manifest.slides.length, slides.length, 'grids: every slide has its own source record')
  assert.deepEqual(slides.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: slides.length }, (_, index) => index + 1), 'grids: complete autonomous pagination')
  assert.equal(slides[0]?.title, 'Griglie e layout', 'grids: chapter title')
  assert.equal(slides[0]?.frontmatter.routeAlias, manifest.lesson, 'grids: stable menu destination')
  assert.match(slides[0]?.frontmatter.class ?? '', /\bchapter-slide\b/, 'grids: original metro cover composition')
  assert.match(slides[0]?.content ?? '', /<ChapterMetro\s+section="ux-type"\s*\/>/, 'grids: the existing sky/amber metro')
  assert.equal(slides[1]?.frontmatter.layout, 'summary', 'grids: opening summary immediately follows the cover')
  assert.equal(slides.filter(slide => slide.frontmatter.layout === 'summary').length, 1, 'grids: exactly one opening summary')
  assert.ok(slides[1]?.frontmatter.summaryStatement?.trim() && slides[1]?.frontmatter.summarySupport?.trim(), 'grids: the summary has its statement and support')
  assert.match(slides[1]?.content.trim() ?? '', /^# [^\n]+$/, 'grids: the summary keeps one Markdown heading')
  const dividers = slides.filter(slide => slide.frontmatter.sectionDivider === true)
  assert.equal(dividers.length, 7, 'grids: seven thematic section openings')
  assert.deepEqual(dividers.map(slide => slide.frontmatter.sectionNumber), Array.from({ length: 7 }, (_, index) => index + 1), 'grids: section numbers retain reading order')
  assert.equal(slides[0]?.index, deck.slides.filter(slide => slide.frontmatter.lesson === 'tipografia-griglie').at(-1)?.index + 1, 'grids: independent set immediately follows typography')
  assert.equal(slides.at(-1)?.index + 1, deck.slides.find(slide => slide.frontmatter.lesson === 'prototipi-interfacce')?.index, 'grids: prototypes retain their following position')
  const used = new Set()
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
    assert.equal(matter.localOnly, true, context + ': supplementary set stays local')
    assert.equal(matter.lessonNumber, undefined, context + ': numbered lessons retain their existing numbers')
    assert.ok(!slide.note?.trim(), context + ': no speaker notes are introduced')
    assert.equal(matter.bookletChapter, 7, context + ': current chapter identity')
    assert.equal(matter.bookletSource, manifest.sourceFile, context + ': current chapter provenance')
    for (const field of ['bookletPages', 'bookletFolios', 'bookletAssets', 'bookletNodes'])
      assert.equal(matter[field], undefined, context + ': historical source identities are not invented')
    assert.deepEqual((matter.bookletFigures ?? []).map(String), saved.figures.map(String), context + ': declared current figures match the source map')
    assert.ok(Number.isFinite(matter.lessonMinutes) && matter.lessonMinutes >= 0, context + ': valid teaching budget')
    assert.equal(matter.lessonMinutes, saved.minutes, context + ': teaching budget matches the source record')
    minutes += matter.lessonMinutes
    if (matter.sectionDivider === true) {
      assert.equal(matter.lessonMinutes, 0, context + ': divider preserves the teaching budget')
      assert.match(matter.class ?? '', /\bchapter-slide\b/, context + ': divider keeps the original composition')
      assert.match(matter.class ?? '', /\bsection-divider\b/, context + ': divider is explicitly styled')
      assert.match(slide.content, /<ChapterMetro\s+section="ux-type"\s*\/>/, context + ': divider reuses the owning metro')
    }
    const callsites = [...slide.content.matchAll(/<LessonFigure\b[^>]*>/g)].map(match => match[0])
    assert.equal(callsites.length, saved.figures.length, context + ': every example uses the shared figure and enlargement')
    for (const [figureIndex, code] of saved.figures.map(String).entries()) {
      const original = canonical.get(code), image = images.get(code), callsite = callsites[figureIndex]
      assert.ok(original && image, `${context}/${code}: figure exists in canonical and web source registries`)
      assert.equal(image.source, original.percorso, `${context}/${code}: the original source is retained`)
      assert.ok(original.attribuzione && original.diritti, `${context}/${code}: attribution and rights remain recorded`)
      assert.match(callsite, /\balt="[^"]+"/, `${context}/${code}: meaningful alternative text is present`)
      assert.match(callsite, /\bcaption="[^"]+"/, `${context}/${code}: caption is present`)
      const escaped = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
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
      used.add(code)
    }
    assert.ok(!/<(?:input|select|textarea)\b/.test(slide.content), context + ': didactic UI examples remain images')
  }
  assert.ok(Number.isFinite(manifest.minutes) && Math.abs(minutes - manifest.minutes) < 1e-6, 'grids: total teaching budget matches the source manifest')
  assert.deepEqual([...canonical.keys()].sort(), [...images.keys()].sort(), 'grids: the web source registry preserves every canonical figure, including inactive originals')
  for (const code of used) {
    const original = canonical.get(code), image = images.get(code)
    const bytes = await readFile(path.join(root, image.source))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), image.sourceSha256, `${code}: original bytes remain unchanged`)
    assert.equal(image.sourceSha256, original.sha256, `${code}: source hash agrees with the canonical registry`)
    assert.match(image.web, /^\/images\/shared\//, `${code}: figure uses the existing shared-asset pipeline`)
    const web = path.join(root, 'public', image.web)
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
  return { lesson: manifest.lesson, slides: slides.length, minutes, sections: dividers.length, figures: used.size }
}
