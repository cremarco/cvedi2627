import { readFile, realpath, readdir, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { normalizeTitle } from '../../utils/normalize-title.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))

/** Structural checks also run without a server or browser. */
export async function checkSlideSources() {
  // Resolve Slidev's installed parser without adding a second parser dependency.
  const slidevRequire = createRequire(await realpath(new URL('../../node_modules/@slidev/cli/package.json', import.meta.url)))
  const { load } = await import(slidevRequire.resolve('@slidev/parser/fs'))

  const entry = path.join(root, 'slides.md')
  const options = { roots: [root], userRoot: root, allowedRoots: [root] }
  const source = await readFile(entry, 'utf8')
  const historyDisabled = /src: \.\/lezioni\/03-storia-design\.md\s*\ndisabled: true\b/.test(source)
  const visibleDeck = await load(options, entry)
  // Validate the preserved chapter too, without enabling it in the real deck.
  const reviewSource = source.replace(/(src: \.\/lezioni\/03-storia-design\.md)\s*\ndisabled: true\b/, '$1')
  const deck = await load(options, entry, { [entry]: reviewSource })
  for (const file of Object.values(deck.markdownFiles)) assert.deepEqual(file.errors || [], [], `parse: ${file.filepath}`)
  assert.equal(deck.slides[0].frontmatter.presenter, false, 'presenter mode is disabled')
  assert.ok(deck.slides.every(slide => !slide.note?.trim()), 'presenter notes are absent, including hidden chapters')
  const total = deck.slides.length
  const lesson = deck.slides.filter(slide => slide.frontmatter.lesson === 'introduzione')
  const history = deck.slides.filter(slide => slide.frontmatter.lesson === 'storia-design')
  const brief = deck.slides.filter(slide => slide.frontmatter.lesson === 'brief-progetto')
  const approfondimenti = deck.slides.filter(slide => slide.frontmatter.lesson === 'approfondimenti')
  const topicSource = JSON.parse(await readFile(path.join(root, 'assets/approfondimenti/source-elearning.json'), 'utf8'))
  const addedSlides = topicSource.topics.length + 1
  const course = deck.slides.filter(slide => !slide.frontmatter.lesson)
  assert.equal(total, 220 + addedSlides, 'resolved deck includes the topic section and omits the removed evaluation question slide')
  assert.equal(lesson.length, 82, 'introduction: 82 slides')
  const lessonMinutes = set => set.reduce((sum, slide) => sum + slide.frontmatter.lessonMinutes, 0)
  assert.ok(Math.abs(lessonMinutes(lesson) - 120) < 1e-6, 'introduction: 120 minutes')
  assert.deepEqual(lesson.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: lesson.length }, (_, i) => i + 1), 'lesson sequence')
  assert.equal(topicSource.topics.length, 20, 'eLearning: twenty official topics')
  assert.equal(approfondimenti.length, addedSlides, 'topic section: cover and one slide per topic')
  assert.equal(approfondimenti[0].index, brief.at(-1).index + 1, 'topics immediately follow the brief')
  assert.equal(approfondimenti[0].frontmatter.routeAlias, 'approfondimenti', 'stable topic section alias')
  assert.deepEqual(approfondimenti.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: addedSlides }, (_, i) => i + 1), 'topic section sequence')
  const topicImages = new Set()
  for (const [index, topic] of topicSource.topics.entries()) {
    const slide = approfondimenti[index + 1]
    assert.equal(slide.frontmatter.topicCode, topic.code, `official topic ${topic.code}: identity`)
    assert.equal(slide.title, `${topic.code} · ${topic.title}`, `official topic ${topic.code}: title`)
    assert.ok(slide.content.includes(topic.question), `official topic ${topic.code}: original question`)
    const figures = [...slide.content.matchAll(/<LessonFigure\b[^>]*\bsrc="([^"]+)"/g)]
    assert.equal(figures.length, 1, `official topic ${topic.code}: one illustration`)
    topicImages.add(figures[0][1])
  }
  assert.equal(topicImages.size, topicSource.topics.length, 'each official topic has its own image')
  assert.equal(lesson[0].index, approfondimenti.at(-1).index + 1, 'introduction follows the topic section')
  assert.equal(deck.slides.at(-1).title, 'Domande?', 'original closing follows the teaching chapters')
  assert.equal(lesson[0].frontmatter.routeAlias, 'introduzione-teorica', 'stable chapter alias')
  assert.equal(deck.slides.filter(slide => slide.frontmatter.routeAlias === 'introduzione-teorica').length, 1, 'unique alias')
  assert.equal(history.length, 68, 'history: 68 slides')
  assert.equal(visibleDeck.slides.length, total - (historyDisabled ? history.length : 0), 'visible deck excludes the suspended chapter')
  if (historyDisabled) {
    assert.ok(visibleDeck.slides.every(slide => slide.frontmatter.lesson !== 'storia-design'), 'history is absent from navigation and overview')
    assert.equal(visibleDeck.slides.at(-2).title, lesson.at(-1).title, 'introduction leads directly to closing')
  }
  assert.equal(course.length, 39, 'course presentation: 39 slides, including closing')
  assert.equal(course[0].index, 6, 'course presentation starts at deck slide 7')
  assert.equal(course[0].frontmatter.routeAlias, 'presentazione-corso', 'course alias opens its first slide')
  assert.deepEqual(deck.slides.filter(slide => slide.frontmatter.lesson === 'apertura').map(slide => slide.index),
    [0, 1, 2, 3, 4, 5], 'opening: six preliminary slides')
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

  // The history lesson cites the current 66-page chapter, rather than the
  // original 38-frame import. Check page identities so a reordered chapter
  // cannot leave plausible-looking but obsolete references in the notes.
  const chapterSnapshot = JSON.parse(await readFile(path.join(root, 'assets/booklet/capitolo-2/testo-figma-aggiornato.json'), 'utf8'))
  assert.equal(chapterSnapshot.fileKey, 'WLdDzbdqP3P5rpYbK1OxYC', 'current history booklet: source file')
  assert.equal(chapterSnapshot.pages.length, 66, 'current history booklet: complete page registry')
  assert.deepEqual(chapterSnapshot.pages.map(page => page.ordinal), Array.from({ length: 66 }, (_, i) => i + 1), 'current history booklet: frame sequence')
  assert.deepEqual(chapterSnapshot.pages.map(page => page.folio), Array.from({ length: 66 }, (_, i) => i + 21), 'current history booklet: folio sequence')
  const chapterPages = new Map(chapterSnapshot.pages.map(page => [page.id, page]))
  assert.equal(chapterPages.size, 66, 'current history booklet: distinct page identities')

  // These eleven slides demonstrate their subject through the whole page.
  // An explicit class keeps this coverage stable when lesson slides move.
  const historyStyleNames = ['html', 'web2', 'scheu', 'flat', 'material', 'neumo', 'glass', 'minimal', 'y2k', 'max', 'neo']
  const historyStyleSlides = history.filter(slide => String(slide.frontmatter.class).split(/\s+/).includes('web-style-slide'))
  assert.equal(historyStyleSlides.length, historyStyleNames.length, 'history: eleven complete style compositions')
  for (const name of historyStyleNames) {
    const matches = deck.slides.filter(slide => String(slide.frontmatter.class).split(/\s+/).includes(`web-style-${name}`))
    assert.equal(matches.length, 1, `history style ${name}: one slide`)
    assert.ok(historyStyleSlides.includes(matches[0]), `history style ${name}: belongs to a complete history composition`)
  }
  for (const slide of historyStyleSlides) {
    const styleClasses = String(slide.frontmatter.class).split(/\s+/).filter(name => /^web-style-(?!slide$)/.test(name))
    assert.equal(styleClasses.length, 1, `history ${slide.frontmatter.lessonSlide}: one visual language per style slide`)
    assert.ok(!/Apri percorso|Percorsi di lettura/.test(slide.content), `history ${slide.frontmatter.lessonSlide}: no rejected interface demo boxes`)
  }

  const historyFigures = []
  for (const slide of history) {
    for (const figure of slide.content.matchAll(/<LessonFigure\b[\s\S]*?\/>/g)) {
      const attributes = Object.fromEntries([...figure[0].matchAll(/\b(src|alt|caption)\s*=\s*(["'])(.*?)\2/g)].map(match => [match[1], match[3]]))
      for (const attribute of ['src', 'alt', 'caption'])
        assert.ok(attributes[attribute]?.trim(), `history ${slide.frontmatter.lessonSlide}: figure ${attribute}`)
      assert.match(attributes.src, /^\/images\/storia-design\//, `history ${slide.frontmatter.lessonSlide}: local historical figure`)
      const metadata = JSON.parse(await readFile(path.join(root, 'public', `${attributes.src.replace(/^\//, '')}.json`), 'utf8'))
      assert.ok(typeof metadata.prompt === 'string' && metadata.prompt.trim(), `history ${slide.frontmatter.lessonSlide}: figure provenance`)
      assert.ok(Number.isFinite(Date.parse(metadata.createdAt)), `history ${slide.frontmatter.lessonSlide}: asset metadata date`)
      if (metadata.assetSourceFile) {
        assert.ok((await stat(path.join(root, metadata.assetSourceFile))).isFile(), `history ${slide.frontmatter.lessonSlide}: original figure source`)
        assert.ok(metadata.sourceURLs?.length > 0, `history ${slide.frontmatter.lessonSlide}: source URLs for revised figure`)
        for (const source of metadata.sourceURLs)
          assert.match(new URL(source).protocol, /^https?:$/, `history ${slide.frontmatter.lessonSlide}: source URL`)
        assert.equal(metadata.sourceFigmaFile, chapterSnapshot.fileKey, `history ${slide.frontmatter.lessonSlide}: source Figma file`)
        const page = chapterPages.get(metadata.sourceFigmaNode)
        assert.ok(page, `history ${slide.frontmatter.lessonSlide}: source Figma page for revised figure`)
        assert.equal(metadata.bookletFolio, page.folio, `history ${slide.frontmatter.lessonSlide}: figure source folio`)
      }
      historyFigures.push({ lessonSlide: slide.frontmatter.lessonSlide, ...attributes })
    }
  }
  const briefAliases = [
    'brief-progetto', 'brief-obiettivo', 'brief-tema', 'brief-concept', 'brief-ai',
    'brief-spunti', 'brief-sito', 'brief-percorso', 'brief-requisiti', 'brief-decisioni',
    'brief-ricerca', 'brief-profili', 'brief-moodboard', 'brief-architettura', 'brief-wireframe',
    'brief-flusso', 'brief-look-feel', 'brief-mockup', 'brief-revisioni', 'brief-consegna',
    'brief-codice', 'brief-design-system', 'brief-documentazione', 'brief-valutazione', 'brief-verifica',
  ]
  assert.equal(brief.length, 25, 'standalone project brief: twenty-five slides')
  assert.deepEqual(brief.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: 25 }, (_, i) => i + 1), 'project brief lesson sequence')
  assert.deepEqual(brief.map(slide => slide.index), Array.from({ length: 25 }, (_, i) => 44 + i), 'project brief: consecutive slides 45–69')
  assert.deepEqual(brief.map(slide => slide.frontmatter.routeAlias), briefAliases, 'project brief: stable aliases in lesson order')
  assert.equal(deck.slides[brief[0].index - 1].title, 'Contatti', 'course contacts precede project brief')
  assert.equal(brief.at(-1).index + 1, approfondimenti[0].index, 'topic section immediately follows project brief')
  assert.match(deck.slides[2].content, /<SlideAction\s+to=["']brief-progetto["']/, 'course index opens the standalone project brief')
  assert.ok(deck.slides.every(slide => !('briefStep' in slide.frontmatter)), 'project brief uses lessonSlide instead of obsolete briefStep')
  const briefMap = await readFile(new URL('../../docs/fonti/00-brief-progetto.md', import.meta.url), 'utf8')
  const briefRows = [...briefMap.matchAll(/^\| (\d+) \/ (\d+) \| ([^|]+) \|/gm)]
  assert.deepEqual(briefRows.map(row => ({ lessonSlide: Number(row[1]), page: Number(row[2]), title: row[3].trim() })),
    brief.map(slide => ({ lessonSlide: slide.frontmatter.lessonSlide, page: slide.index + 1, title: slide.title })), 'project brief: source map covers all twenty-five lesson slides')
  for (const slide of brief) {
    assert.ok(String(slide.frontmatter.class).split(/\s+/).includes('project-section'), 'project brief shares the project section palette')
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

  const artwork = JSON.parse(await readFile(path.join(root, 'data/card-artwork.json'), 'utf8'))
  const generations = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-v1.json'), 'utf8'))
  const cardGenerations = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-cards-v2.json'), 'utf8'))
  assert.equal(generations.jobs.length, generations.counts.images, 'complete shared illustration family')
  assert.equal(cardGenerations.jobs.length, cardGenerations.counts.images, 'complete selective card illustration family')
  assert.equal(Object.keys(artwork.assets).length, cardGenerations.jobs.length, 'only refreshed motifs populate the card catalog')
  for (const generation of [...generations.jobs, ...cardGenerations.jobs]) {
    assert.equal(generation.status, 'complete', `generated asset ${generation.id}: selected`)
    assert.ok(generation.prompt.trim(), `generated asset ${generation.id}: prompt provenance`)
    const publicImage = await readFile(path.join(root, generation.web))
    assert.equal(createHash('sha256').update(publicImage).digest('hex'), generation.sha256, `generated asset ${generation.id}: selected public pixels`)
    assert.ok((await stat(path.join(root, generation.original))).isFile(), `generated asset ${generation.id}: original PNG retained`)
  }
  for (const generation of cardGenerations.jobs)
    assert.equal(artwork.assets[generation.id], '/' + generation.web.replace(/^public\//, ''), `card motif ${generation.id}: registered public path`)
  for (const [id, src] of Object.entries(artwork.thematicAssets))
    assert.ok(generations.jobs.some(job => job.id === id && '/' + job.web.replace(/^public\//, '') === src), `retained thematic figure ${id}: original provenance`)
  const palette = { 'presentazione-corso': 'course', 'brief-progetto': 'brief', introduzione: 'introduction' }
  let illustratedCards = 0
  let directCards = 0
  for (const slide of visibleDeck.slides) {
    for (const card of slide.content.matchAll(/<CvediCard\b[^>]*\btitle="([^"]+)"/g)) {
      const title = normalizeTitle(card[1])
      const family = palette[slide.frontmatter.lesson ?? 'presentazione-corso']
      const id = artwork.mappings[family]?.[title]
      assert.ok(Object.hasOwn(artwork.mappings[family] ?? {}, title), `card ${card[1]}: explicit illustration decision`)
      assert.ok(id === null || (artwork.assets[id] && id.startsWith(`${family}-`)), `card ${card[1]}: intentionally plain or illustrated in the owning palette`)
      directCards++
      if (id) illustratedCards++
    }
  }
  assert.equal(directCards, cardGenerations.counts.totalDirectCards, 'complete card inventory')
  assert.equal(illustratedCards, cardGenerations.counts.directCardUses, 'selected direct cards have semantic motifs')
  assert.ok(illustratedCards > 0 && illustratedCards < directCards / 4, 'illustrations remain selective')

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
  const visibleHistory = visibleDeck.slides.filter(slide => slide.frontmatter.lesson === 'storia-design')
  const report = { slides: visibleDeck.slides.length, sourceSlides: total, course: course.length, introduction: lesson.length,
    history: visibleHistory.length, preservedHistory: history.length,
    lessonMinutes: [lesson, history].map(set => Math.round(lessonMinutes(set) * 1e6) / 1e6),
    publicImages: assets.size, uxExamples: uxExamples.length, bookletPages: booklet.pages.length,
    historyBookletPages: chapterPages.size, historyStyles: historyStyleSlides.length, historyFigures: historyFigures.length,
    recoveredSlides: audit.integratedSlides.length, projectBriefSlides: brief.length, approfondimentiSlides: approfondimenti.length, officialTopics: topicSource.topics.length }
  return { deck: visibleDeck, total: visibleDeck.slides.length, lesson, history: visibleHistory, brief, course, approfondimenti, topicSource,
    projects, uxExamples, uxSlides, audit: { ...audit, integratedSlides: audit.integratedSlides.filter(entry =>
      visibleDeck.slides.some(slide => slide.frontmatter.routeAlias === entry.alias)) }, report }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { report } = await checkSlideSources()
  console.log(JSON.stringify(report, null, 2))
}
