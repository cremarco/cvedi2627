import { readFile, realpath, readdir, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../..', import.meta.url))

/** Structural checks also run without a server or browser. */
export async function checkSlideSources() {
  // Resolve Slidev's installed parser without adding a second parser dependency.
  const slidevRequire = createRequire(await realpath(new URL('../../node_modules/@slidev/cli/package.json', import.meta.url)))
  const { load } = await import(slidevRequire.resolve('@slidev/parser/fs'))

  const deck = await load({ roots: [root], userRoot: root, allowedRoots: [root] }, path.join(root, 'slides.md'))
  for (const file of Object.values(deck.markdownFiles)) assert.deepEqual(file.errors || [], [], `parse: ${file.filepath}`)
  const total = deck.slides.length
  const lesson = deck.slides.filter(slide => slide.frontmatter.lesson === 'introduzione')
  const history = deck.slides.filter(slide => slide.frontmatter.lesson === 'storia-design')
  const course = deck.slides.filter(slide => !slide.frontmatter.lesson)
  assert.equal(total, 202, 'resolved deck: 202 slides, including imports')
  assert.equal(lesson.length, 82, 'introduction: 82 slides')
  const lessonMinutes = set => set.reduce((sum, slide) => sum + slide.frontmatter.lessonMinutes, 0)
  assert.ok(Math.abs(lessonMinutes(lesson) - 120) < 1e-6, 'introduction: 120 minutes')
  assert.deepEqual(lesson.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: lesson.length }, (_, i) => i + 1), 'lesson sequence')
  assert.equal(lesson[0].index, 67, 'introduction follows the expanded course presentation')
  assert.equal(deck.slides[lesson[0].index - 1].title, 'Contatti', 'contact slide precedes introduction')
  assert.equal(deck.slides.at(-1).title, 'Domande?', 'original closing follows the teaching chapters')
  assert.equal(lesson[0].frontmatter.routeAlias, 'introduzione-teorica', 'stable chapter alias')
  assert.equal(deck.slides.filter(slide => slide.frontmatter.routeAlias === 'introduzione-teorica').length, 1, 'unique alias')
  assert.equal(history.length, 52, 'history: 52 slides')
  assert.equal(course.length, 68, 'course presentation: 68 slides, including closing')
  assert.ok(Math.abs(lessonMinutes(history) - 120) < 1e-6, 'history: 120 minutes')
  assert.deepEqual(history.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: history.length }, (_, i) => i + 1), 'history sequence')
  assert.equal(history[0].index, lesson.at(-1).index + 1, 'history immediately follows introduction')
  assert.equal(history.at(-1).index, total - 2, 'history immediately precedes closing')
  assert.equal(history[0].frontmatter.routeAlias, 'storia-design', 'stable history alias')
  assert.equal(deck.slides.filter(slide => slide.frontmatter.routeAlias === 'storia-design').length, 1, 'unique history alias')
  assert.equal(history.filter(slide => slide.frontmatter.class.includes('lesson-activity')).length, 3, 'history: three classroom activities')
  for (const slide of [...lesson, ...history]) {
    const minutes = slide.frontmatter.lessonMinutes
    assert.ok(typeof minutes === 'number' && Number.isFinite(minutes) && minutes > 0,
      `lesson ${slide.frontmatter.lessonSlide}: positive duration`)
    const timing = slide.note.match(/Tempo previsto: (\d+(?:[.,]\d+)?)\s+(min|s|sec(?:ondi)?)(?=[\s.])/)
    assert.ok(timing, `lesson ${slide.frontmatter.lessonSlide}: timing in presenter notes`)
    const noteSeconds = Number(timing[1].replace(',', '.')) * (timing[2] === 'min' ? 60 : 1)
    assert.ok(Math.abs(noteSeconds - minutes * 60) < 1e-6,
      `lesson ${slide.frontmatter.lessonSlide}: note duration agrees with frontmatter`)
    assert.match(slide.note, /Booklet:.*nodo 198:/, `lesson ${slide.frontmatter.lessonSlide}: booklet reference`)
    assert.match(slide.note, /(?:PDF 2025\/26:|nessuna corrispondenza diretta)/, `lesson ${slide.frontmatter.lessonSlide}: source relation`)
  }
  async function checkSourceMap(file, slides) {
    const sourceMap = await readFile(new URL(`../../docs/fonti/${file}`, import.meta.url), 'utf8')
    const rows = [...sourceMap.matchAll(/^\| (\d+) \/ (\d+) \| ([^|]+) \|.*\| ([\d.]+) \|$/gm)]
    assert.deepEqual(rows.map(row => ({ lessonSlide: Number(row[1]), page: Number(row[2]), title: row[3].trim(), minutes: Number(row[4]) })),
      slides.map(slide => ({ lessonSlide: slide.frontmatter.lessonSlide, page: slide.index + 1, title: slide.title, minutes: slide.frontmatter.lessonMinutes })),
      `${file}: one matching source-map entry per slide, including duration`)
  }
  await checkSourceMap('01-introduzione.md', lesson)
  await checkSourceMap('03-storia-design.md', history)
  const brief = deck.slides.filter(slide => slide.frontmatter.briefStep)
  assert.equal(brief.length, 15, 'project brief: fifteen operational slides')
  assert.deepEqual(brief.map(slide => slide.frontmatter.briefStep), Array.from({ length: 15 }, (_, i) => i + 1), 'project brief sequence')
  assert.deepEqual(brief.map(slide => slide.index), Array.from({ length: 15 }, (_, i) => 30 + i), 'project brief follows WHAT IF requirements')
  assert.equal(brief[0].frontmatter.routeAlias, 'brief-progetto', 'stable project brief alias')
  const briefMap = await readFile(new URL('../../docs/fonti/00-brief-progetto.md', import.meta.url), 'utf8')
  const briefRows = [...briefMap.matchAll(/^\| (\d+) \/ (\d+) \| ([^|]+) \|/gm)]
  assert.deepEqual(briefRows.map(row => ({ step: Number(row[1]), page: Number(row[2]), title: row[3].trim() })),
    brief.map(slide => ({ step: slide.frontmatter.briefStep, page: slide.index + 1, title: slide.title })), 'project brief source map')
  for (const slide of brief) {
    assert.ok(!slide.frontmatter.lesson, 'project brief belongs to the course presentation')
    assert.match(slide.note, /Fonte: CVeDI 2526 - Brief progetti, slide/, 'project brief source in presenter notes')
    assert.ok(!/(ristorante|piatt[oi]|22 Ottobre|29 Ottobre|13 Novembre|26 Novembre|21 dicembre)/i.test(slide.content), 'project brief removes obsolete subject and dates')
  }
  const audit = JSON.parse(await readFile(new URL('../../assets/slide-audit/2025-2026.json', import.meta.url), 'utf8'))
  assert.equal(audit.sources.length, 9, 'previous academic year: nine source PDFs')
  assert.equal(audit.sources.reduce((sum, source) => sum + source.pages, 0), 982, 'previous academic year: 982 reviewed pages')
  assert.equal(audit.integratedSlides.length, 20, 'previous academic year: twenty recovered slides')
  assert.equal(new Set(audit.integratedSlides.map(slide => slide.alias)).size, audit.integratedSlides.length, 'distinct recovered aliases')
  assert.deepEqual(audit.integratedSlides.map(entry => {
    const slide = deck.slides.find(slide => slide.frontmatter.routeAlias === entry.alias)
    assert.ok(slide, `recovered alias: ${entry.alias}`)
    return { alias: entry.alias, lesson: slide.frontmatter.lesson, lessonSlide: slide.frontmatter.lessonSlide, deckSlide: slide.index + 1, title: slide.title }
  }), audit.integratedSlides.map(({ alias, lesson, lessonSlide, deckSlide, title }) => ({ alias, lesson, lessonSlide, deckSlide, title })),
  'recovery audit agrees with resolved slides')
  const summary = JSON.parse(await readFile(new URL('../../data/grade-summary.json', import.meta.url), 'utf8'))
  const projects = JSON.parse(await readFile(new URL('../../data/projects.json', import.meta.url), 'utf8'))
  for (const [category, data] of Object.entries(summary.categories)) {
    assert.equal(data.bins.reduce((a, b) => a + b, 0), data.n, `${category}: total bins`)
    assert.equal(data.byYear.reduce((a, row) => a + row.n, 0), data.n, `${category}: total years`)
    for (const row of data.byYear) assert.equal(row.bins.reduce((a, b) => a + b, 0), row.n, `${category} ${row.year}`)
  }

  const aliases = deck.slides.map(slide => slide.frontmatter.routeAlias).filter(Boolean)
  assert.equal(new Set(aliases).size, aliases.length, 'unique slide aliases')
  const uxExamples = JSON.parse(await readFile(path.join(root, 'data/ux-examples.json'), 'utf8'))
  assert.equal(uxExamples.length, 16, 'sixteen UX examples')
  for (const example of uxExamples) {
    for (const field of ['id', 'src', 'title', 'description', 'question', 'alt'])
      assert.ok(typeof example[field] === 'string' && example[field].trim(), `UX example: ${field}`)
    if (example.caption !== undefined)
      assert.ok(typeof example.caption === 'string' && example.caption.trim(), 'UX example: optional caption')
    assert.equal(example.id, path.basename(example.src, path.extname(example.src)), 'stable UX example ID follows its image basename')
  }
  for (const field of ['id', 'src', 'title'])
    assert.equal(new Set(uxExamples.map(example => example[field])).size, uxExamples.length, `distinct UX example ${field}`)
  const uxSlides = lesson.filter(slide => String(slide.frontmatter.class).split(/\s+/).includes('ux-examples-slide'))
  assert.equal(uxSlides.length, uxExamples.length, 'one standalone slide per UX example')
  assert.deepEqual(uxSlides.map(slide => slide.frontmatter.exampleId), uxExamples.map(example => example.id), 'UX slides include every example in order')
  assert.equal(deck.slides.filter(slide => slide.frontmatter.exampleId).length, uxSlides.length, 'example IDs belong only to UX example slides')
  assert.deepEqual(uxSlides.map(slide => slide.index), Array.from({ length: uxSlides.length }, (_, i) => uxSlides[0].index + i), 'UX example slides are consecutive')
  for (const [index, slide] of uxSlides.entries()) {
    const example = uxExamples[index]
    assert.equal(slide.title, example.title, `UX example ${example.id}: slide title`)
    const component = slide.content.match(/<UxExampleSlide\b[^>]*\bexample-id\s*=\s*(["'])(.*?)\1/)
    assert.ok(component, `UX example ${example.id}: standalone component`)
    assert.equal(component[2], example.id, `UX example ${example.id}: component agrees with frontmatter`)
    assert.ok(!/<(?:UxExamples|select)\b/.test(slide.content), `UX example ${example.id}: no carousel or selector`)
  }
  const uxComponent = await readFile(path.join(root, 'components/UxExampleSlide.vue'), 'utf8')
  assert.ok(!/<(?:UxExamples|select)\b/.test(uxComponent), 'standalone UX component has no selector or carousel')
  const booklet = JSON.parse(await readFile(path.join(root, 'assets/booklet-preview/manifest.json'), 'utf8'))
  assert.equal(booklet.pages.length % 2, 0, 'booklet pages form complete spreads')
  assert.deepEqual(booklet.pages.map(page => page.number),
    Array.from({ length: booklet.pages.length }, (_, i) => booklet.pages[0].number + i), 'booklet page sequence')

  // Check literal public image paths in slide content, components and data.
  const files = [...Object.values(deck.markdownFiles).map(file => file.filepath)]
  for (const directory of ['components', 'data']) {
    for (const name of await readdir(path.join(root, directory))) {
      if (/\.(?:vue|json|ts)$/.test(name)) files.push(path.join(root, directory, name))
    }
  }
  const assets = new Set([booklet.cover.src, ...booklet.pages.map(page => page.src)])
  for (const file of files) {
    const content = await readFile(file, 'utf8')
    for (const match of content.matchAll(/(?:["'(=]|^)(\/?images\/[^"'\s<>`)]+)/gm)) {
      if (!/[${}]/.test(match[1])) assets.add('/' + match[1].replace(/^\//, ''))
    }
  }
  for (const asset of assets) {
    const location = path.join(root, 'public', asset.replace(/^\//, ''))
    assert.ok((await stat(location)).isFile(), `public asset: ${asset}`)
    assert.ok((await stat(location)).size > 0, `nonempty asset: ${asset}`)
  }
  const report = { slides: total, course: course.length, introduction: lesson.length, history: history.length,
    lessonMinutes: [lesson, history].map(set => Math.round(lessonMinutes(set) * 1e6) / 1e6),
    publicImages: assets.size, uxExamples: uxExamples.length, bookletPages: booklet.pages.length, recoveredSlides: audit.integratedSlides.length, projectBriefSlides: brief.length }
  return { deck, total, lesson, history, course, projects, uxExamples, uxSlides, audit, report }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { report } = await checkSlideSources()
  console.log(JSON.stringify(report, null, 2))
}
