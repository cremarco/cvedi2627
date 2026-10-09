import { readFile, realpath, readdir, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
import { checkPublication } from './publication.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))

/** Structural checks also run without a server or browser. */
export async function checkSlideSources() {
  // Resolve Slidev's installed parser without adding a second parser dependency.
  const slidevRequire = createRequire(await realpath(new URL('../../node_modules/@slidev/cli/package.json', import.meta.url)))
  const { load } = await import(slidevRequire.resolve('@slidev/parser/fs'))

  const entry = path.join(root, 'slides.md')
  const options = { roots: [root], userRoot: root, allowedRoots: [root] }
  const source = await readFile(entry, 'utf8')
  const visibleDeck = await load(options, entry)
  const deck = visibleDeck
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
  const curriculum = JSON.parse(await readFile(path.join(root, 'data/ux-curriculum.json'), 'utf8'))
  const uxLessonIds = new Set(curriculum.lessons.map(lesson => lesson.id))
  const addedUxSlides = curriculum.lessons.reduce((sum, lesson) => sum + lesson.slideCount, 0)
  const course = deck.slides.filter(slide => !slide.frontmatter.lesson)

  const summaryLessonIds = ['presentazione-corso', 'introduzione', 'storia-design', ...curriculum.lessons.map(spec => spec.id)]
  const summaries = deck.slides.filter(slide => slide.frontmatter.layout === 'summary')
  assert.equal(summaries.length, summaryLessonIds.length, 'one opening summary for each numbered lesson')
  for (const id of summaryLessonIds) {
    const slides = deck.slides.filter(slide => (slide.frontmatter.lesson ?? 'presentazione-corso') === id)
    const summary = slides[1]
    assert.equal(slides.filter(slide => slide.frontmatter.layout === 'summary').length, 1, id + ': one summary')
    assert.ok(String(slides[0].frontmatter.class).split(/\s+/).includes('chapter-slide'), id + ': chapter cover opens the lesson')
    assert.equal(summary?.frontmatter.layout, 'summary', id + ': summary immediately follows the cover')
    assert.ok(summary.frontmatter.summaryStatement?.trim(), id + ': summary statement is present')
    assert.ok(summary.frontmatter.summarySupport?.trim(), id + ': summary support is present')
    assert.match(summary.content.trim(), /^# [^\n]+$/, id + ': summary content remains one Markdown heading')
  }
  assert.equal(total, 221 + addedSlides + addedUxSlides, 'resolved deck includes the topics and six new UX lessons')
  assert.equal(lesson.length, 83, 'introduction: 83 slides')
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
  assert.equal(history.length, 67, 'history: 67 slides')
  assert.equal(visibleDeck.slides.length, 558, 'all teaching chapters are available locally')
  assert.equal(visibleDeck.slides.at(-2).frontmatter.lesson, curriculum.lessons.at(-1).id, 'the UX course leads to the original closing')
  assert.equal(course.length, 40, 'course presentation: 40 slides, including closing')
  assert.equal(course[0].index, 6, 'course presentation starts at deck slide 7')
  assert.equal(course[0].frontmatter.routeAlias, 'presentazione-corso', 'course alias opens its first slide')
  assert.deepEqual(deck.slides.filter(slide => slide.frontmatter.lesson === 'apertura').map(slide => slide.index),
    [0, 1, 2, 3, 4, 5], 'opening: six preliminary slides')
  assert.ok(Math.abs(lessonMinutes(history) - 120) < 1e-6, 'history: 120 minutes')
  assert.deepEqual(history.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: history.length }, (_, i) => i + 1), 'history sequence')
  assert.equal(history[0].index, lesson.at(-1).index + 1, 'history immediately follows introduction')
  assert.equal(history.at(-1).index, total - addedUxSlides - 2, 'the preserved history chapter precedes the added UX course')
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

  const uxSource = JSON.parse(await readFile(path.join(root, curriculum.source.snapshot), 'utf8'))
  const uxMapping = JSON.parse(await readFile(path.join(root, 'assets/booklet/capitolo-3/slide-mapping.json'), 'utf8'))
  const uxAssets = JSON.parse(await readFile(path.join(root, 'assets/booklet/capitolo-3/slide-assets.json'), 'utf8'))
  assert.equal(uxSource.fileKey, 'WLdDzbdqP3P5rpYbK1OxYC', 'new lessons use the requested Figma file')
  assert.equal(uxSource.pageId, '2008:1741', 'new lessons use the requested UX chapter')
  assert.deepEqual(uxSource.pages.map(page => page.ordinal), Array.from({ length: 260 }, (_, i) => i + 1), 'all 260 source pages are preserved')
  assert.deepEqual(curriculum.lessons.map(lesson => lesson.number), [4, 5, 6, 7, 8, 9], 'the UX chapter is split into six lessons')
  assert.deepEqual(curriculum.lessons.map(lesson => lesson.palette), ['lime', 'green', 'emerald', 'teal', 'cyan', 'sky'], 'new index colors continue Tailwind order')
  const sourcePages = new Map(uxSource.pages.map(page => [page.ordinal, page]))
  const assetRegistry = new Map(uxAssets.assets.map(asset => [asset.id, asset]))
  const coveredPages = new Set()
  const usedAssets = new Set()
  for (const specification of curriculum.lessons) {
    const slides = deck.slides.filter(slide => slide.frontmatter.lesson === specification.id)
    const mapping = uxMapping.lessons.filter(slide => slide.lesson === specification.id)
    assert.equal(slides.length, specification.slideCount, `${specification.id}: declared slide count`)
    assert.deepEqual(slides.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: slides.length }, (_, i) => i + 1), `${specification.id}: complete pagination`)
    assert.equal(slides[0].title, specification.title, `${specification.id}: chapter title`)
    assert.equal(slides[0].frontmatter.lessonNumber, specification.number, `${specification.id}: real lesson number`)
    assert.equal(slides[0].frontmatter.routeAlias, specification.id, `${specification.id}: stable index target`)
    assert.ok(Math.abs(lessonMinutes(slides) - curriculum.lessonMinutes) < 1e-6, `${specification.id}: planned lecture duration`)
    assert.equal(mapping.length, slides.length, `${specification.id}: every slide has a source mapping`)
    for (const [index, slide] of slides.entries()) {
      const entry = mapping[index]
      assert.equal(slide.title, entry.title, `${specification.id}/${index + 1}: source map title`)
      assert.deepEqual(slide.frontmatter.bookletPages, entry.sourcePages, `${specification.id}/${index + 1}: source page identities`)
      assert.deepEqual(entry.sourceNodes, entry.sourcePages.map(page => sourcePages.get(page)?.id), `${specification.id}/${index + 1}: genuine Figma nodes`)
      assert.ok(entry.sourcePages.length > 0, `${specification.id}/${index + 1}: content has a source`)
      entry.sourcePages.forEach(page => { assert.ok(sourcePages.has(page), `known source page ${page}`); coveredPages.add(page) })
      const figures = [...slide.content.matchAll(/<LessonFigure\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1])
      const declared = entry.assets.map(id => { usedAssets.add(id); assert.ok(assetRegistry.has(id), `registered figure ${id}`); return assetRegistry.get(id).web })
      assert.deepEqual(figures, declared, `${specification.id}/${index + 1}: correct original figure callsites`)
      assert.ok(!/<(?:input|select|textarea)\b/.test(slide.content), `${specification.id}/${index + 1}: UI examples are images`)
    }
  }
  assert.deepEqual([...coveredPages].sort((a, b) => a - b), Array.from({ length: 260 }, (_, i) => i + 1), 'the new course covers every source page')
  assert.equal(usedAssets.size, assetRegistry.size, 'all original figures and supplementary examples are used')
  for (const asset of uxAssets.assets) {
    const original = await readFile(path.join(root, asset.original))
    assert.equal(createHash('sha256').update(original).digest('hex'), asset.sha256, `${asset.id}: original export preserved`)
    assert.ok(asset.caption.trim() && asset.nodeId, `${asset.id}: attribution and source provenance`)
    assert.ok(asset.encoding.lossless && asset.encoding.exactAlpha, `${asset.id}: lossless publication`)
    if (asset.publicationSource) assert.equal(createHash('sha256').update(await readFile(path.join(root, asset.publicationSource))).digest('hex'), asset.publicationSourceSha256, `${asset.id}: publication uses an unchanged Figma original`)
    assert.ok((await stat(path.join(root, 'public', asset.web.replace(/^\//, '')))).size > 0, `${asset.id}: visible WebP exists`)
    if (asset.publicationSha256) {
      const published = await readFile(path.join(root, 'public', asset.web.replace(/^\//, '')))
      assert.equal(createHash('sha256').update(published).digest('hex'), asset.publicationSha256, `${asset.id}: the selected public bitmap is unchanged`)
      const cacheKey = asset.provenance?.kind === 'browser-screenshot' ? asset.sha256 : asset.publicationSha256
      assert.ok(asset.web.includes(cacheKey.slice(0, 12)), `${asset.id}: a changed screenshot cannot reuse an old cached URL`)
    }
    for (const file of asset.retainedSources) assert.ok((await stat(path.join(root, file))).size > 0, `${asset.id}: source file retained`)
  }

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
  assert.deepEqual(brief.map(slide => slide.index), Array.from({ length: 25 }, (_, i) => 45 + i), 'project brief: consecutive slides 46–70')
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
  const recoveredSlides = audit.integratedSlides.filter(entry => entry.status !== 'removed')
  assert.equal(recoveredSlides.length, 19, 'nineteen recovered slides remain after the requested removal')
  assert.equal(new Set(recoveredSlides.map(slide => slide.alias)).size, recoveredSlides.length, 'distinct recovered aliases')
  assert.deepEqual(recoveredSlides.map(entry => {
    const slide = deck.slides.find(slide => slide.frontmatter.routeAlias === entry.alias)
    assert.ok(slide, `recovered alias: ${entry.alias}`)
    return { alias: entry.alias, lesson: slide.frontmatter.lesson, lessonSlide: slide.frontmatter.lessonSlide, deckSlide: slide.index + 1, title: slide.title }
  }), recoveredSlides.map(({ alias, lesson, lessonSlide, deckSlide, title }) => ({ alias, lesson, lessonSlide, deckSlide, title })),
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
  const outlineGenerations = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-outline-v3.json'), 'utf8'))
  const chapterGenerations = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-chapters-v1.json'), 'utf8'))
  const historyIcons = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-history-icons-v1.json'), 'utf8'))
  const researchIcons = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-lesson-04-cards-v1.json'), 'utf8'))
  assert.equal(researchIcons.jobs.length, researchIcons.counts.images, 'complete lesson 04 icon family')
  assert.equal(Object.keys(artwork.mappings['ricerca-inclusiva']).length, researchIcons.counts.cardTitles, 'all lesson 04 card titles have artwork')
  assert.equal(historyIcons.jobs.length, historyIcons.counts.images, 'complete history icon family')
  const chapterArtwork = { ...JSON.parse(await readFile(path.join(root, 'data/chapter-artwork.json'), 'utf8')), ...JSON.parse(await readFile(path.join(root, 'data/chapter-artwork-local.json'), 'utf8')) }
  assert.equal(chapterGenerations.jobs.length, 13, 'all thirteen generated chapter illustrations are retained')
  assert.equal(Object.keys(chapterArtwork).length, chapterGenerations.jobs.length, 'all retained chapter illustrations are catalogued')
  for (const job of chapterGenerations.jobs) {
    assert.equal(chapterArtwork[job.id], '/' + job.web.replace(/^public\//, ''), `${job.id}: chapter image is registered`)
    assert.equal(job.visualReview.status, 'accepted', `${job.id}: chapter image visually reviewed`)
    assert.ok(job.publicationEncoding.pixelPreserved && job.publicationEncoding.alphaPreserved, `${job.id}: chapter image keeps RGBA pixels`)
  }
  assert.equal(outlineGenerations.jobs.length, outlineGenerations.counts.images, 'complete outline restyling inventory')
  const activeOutline = outlineGenerations.jobs.filter(job => job.published)
  assert.equal(generations.jobs.length, generations.counts.images, 'complete shared illustration family')
  assert.equal(cardGenerations.jobs.length, cardGenerations.counts.images, 'complete selective card illustration family')
  assert.equal(Object.keys(artwork.assets).length, cardGenerations.jobs.length + historyIcons.jobs.length + researchIcons.jobs.length, 'only registered motifs populate the card catalog')
  for (const generation of [...generations.jobs, ...cardGenerations.jobs, ...activeOutline, ...chapterGenerations.jobs, ...historyIcons.jobs]) {
    assert.equal(generation.status, 'complete', `generated asset ${generation.id}: selected`)
    assert.ok(generation.prompt.trim(), `generated asset ${generation.id}: prompt provenance`)
    const publicImage = await readFile(path.join(root, generation.web))
    assert.equal(createHash('sha256').update(publicImage).digest('hex'), generation.sha256, `generated asset ${generation.id}: selected public pixels`)
    assert.ok((await stat(path.join(root, generation.original))).isFile(), `generated asset ${generation.id}: original PNG retained`)
  }
  for (const generation of cardGenerations.jobs)
    assert.equal(artwork.assets[generation.id], '/' + (activeOutline.find(job => job.group === 'card' && job.key === generation.id) ?? generation).web.replace(/^public\//, ''), `card motif ${generation.id}: registered public path`)
  for (const generation of historyIcons.jobs) {
    assert.equal(artwork.assets[generation.id], '/' + generation.web.replace(/^public\//, ''), `${generation.id}: history icon registered`)
    assert.equal(generation.visualReview.status, 'accepted')
    assert.ok(generation.publicationEncoding.pixelPreserved && generation.publicationEncoding.alphaPreserved)
    assert.ok(generation.owners.length > 0)
  }
  for (const generation of researchIcons.jobs) {
    assert.equal(generation.status, 'complete', generation.id + ': generated artwork selected')
    assert.equal(artwork.assets[generation.id], '/' + generation.web.replace(/^public\//, ''), generation.id + ': card icon registered')
    assert.equal(generation.visualReview.status, 'accepted', generation.id + ': visually reviewed')
    assert.ok(generation.publicationEncoding.pixelPreserved && generation.publicationEncoding.alphaPreserved, generation.id + ': RGBA pixels preserved')
    assert.ok(generation.owners.length > 0, generation.id + ': owning cards recorded')
    assert.equal(createHash('sha256').update(await readFile(path.join(root, generation.original))).digest('hex'), generation.sha256, generation.id + ': original PNG retained')
    assert.equal(createHash('sha256').update(await readFile(path.join(root, generation.web))).digest('hex'), generation.publicationSha256, generation.id + ': selected public pixels')
    assert.equal((await readFile(path.join(root, generation.promptFile), 'utf8')).trim(), generation.prompt.trim(), generation.id + ': exact prompt retained')
  }
  for (const [id, src] of Object.entries(artwork.thematicAssets))
    assert.ok([...generations.jobs, ...activeOutline.filter(job => job.group === 'thematic')].some(job => (job.key ?? job.id) === id && '/' + job.web.replace(/^public\//, '') === src), `retained thematic figure ${id}: original provenance`)
  for (const generation of activeOutline) {
    assert.equal(generation.visualReview.status, 'accepted', `outline illustration ${generation.id}: visually reviewed before publication`)
    assert.ok(generation.publicationEncoding.pixelPreserved && generation.publicationEncoding.alphaPreserved, `outline illustration ${generation.id}: lossless publication`)
    assert.ok(generation.owners.length > 0, `outline illustration ${generation.id}: owning slide recorded`)
  }
  const palette = { 'presentazione-corso': 'course', 'brief-progetto': 'brief', introduzione: 'introduction', 'storia-design': 'history', ...Object.fromEntries(curriculum.lessons.map(lesson => [lesson.id, lesson.id])) }
  let illustratedCards = 0
  let directCards = 0
  let addedCards = 0
  let researchCardUses = 0
  for (const slide of visibleDeck.slides) {
    for (const card of slide.content.matchAll(/<CvediCard\b[^>]*\btitle="([^"]+)"/g)) {
      const title = normalizeTitle(card[1])
      const family = palette[slide.frontmatter.lesson ?? 'presentazione-corso']
      const id = artwork.mappings[family]?.[title]
      assert.ok(Object.hasOwn(artwork.mappings[family] ?? {}, title), `card ${card[1]}: explicit illustration decision`)
      assert.ok(id === null || (artwork.assets[id] && id.startsWith(`${family}-`)), `card ${card[1]}: intentionally plain or illustrated in the owning palette`)
      directCards++
      if (uxLessonIds.has(slide.frontmatter.lesson) || slide.frontmatter.lesson === 'storia-design') addedCards++
      if (id) illustratedCards++
      if (slide.frontmatter.lesson === 'ricerca-inclusiva') {
        assert.ok(id, card[1] + ': lesson 04 card has a semantic motif')
        researchCardUses++
      }
    }
  }
  assert.equal(directCards - addedCards, cardGenerations.counts.totalDirectCards, 'the existing card inventory is preserved')
  assert.equal(researchCardUses, researchIcons.counts.directCardUses, 'all lesson 04 card uses have their requested illustrations')
  assert.equal(illustratedCards, cardGenerations.counts.directCardUses + historyIcons.counts.directCardUses + researchCardUses, 'selected direct cards have semantic motifs')
  assert.ok(illustratedCards - researchCardUses > 0 && illustratedCards - researchCardUses < (directCards - researchCardUses) / 4, 'illustrations in the other lessons remain selective')

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
  const publication = await checkPublication()
  const report = { slides: visibleDeck.slides.length, sourceSlides: total, course: course.length, introduction: lesson.length,
    publication,
    history: visibleHistory.length, preservedHistory: history.length,
    lessonMinutes: [lesson, history].map(set => Math.round(lessonMinutes(set) * 1e6) / 1e6),
    publicImages: assets.size, uxExamples: uxExamples.length, bookletPages: booklet.pages.length,
    historyBookletPages: chapterPages.size, historyStyles: historyStyleSlides.length, historyFigures: historyFigures.length,
    recoveredSlides: recoveredSlides.length, projectBriefSlides: brief.length, approfondimentiSlides: approfondimenti.length, officialTopics: topicSource.topics.length,
    uxCourse: curriculum.lessons.map(spec => ({ lesson: spec.id, slides: spec.slideCount, minutes: curriculum.lessonMinutes })), uxSourcePages: coveredPages.size, uxFigures: usedAssets.size }
  return { deck: visibleDeck, total: visibleDeck.slides.length, lesson, history: visibleHistory, brief, course, approfondimenti, topicSource,
    projects, uxExamples, uxSlides, curriculum, audit: { ...audit, integratedSlides: audit.integratedSlides.filter(entry =>
      visibleDeck.slides.some(slide => slide.frontmatter.routeAlias === entry.alias)) }, report }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { report } = await checkSlideSources()
  console.log(JSON.stringify(report, null, 2))
}
