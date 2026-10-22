import { readFile, realpath, readdir, stat } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
import { checkPublication } from './publication.mjs'
import { checkExerciseSources } from './exercise-sources.mjs'
import { checkGridsSources } from './grids-source.mjs'

const root = fileURLToPath(new URL('../..', import.meta.url))

/** Structural checks also run without a server or browser. */
export async function checkSlideSources() {
  const exerciseReport = await checkExerciseSources()
  // Resolve Slidev's installed parser without adding a second parser dependency.
  const slidevRequire = createRequire(await realpath(new URL('../../node_modules/@slidev/cli/package.json', import.meta.url)))
  const { load, parseSlide } = await import(slidevRequire.resolve('@slidev/parser/fs'))

  const entry = path.join(root, 'slides.md')
  const options = { roots: [root], userRoot: root, allowedRoots: [root] }
  const source = await readFile(entry, 'utf8')
  const visibleDeck = await load(options, entry)
  const deck = visibleDeck
  for (const file of Object.values(deck.markdownFiles)) assert.deepEqual(file.errors || [], [], `parse: ${file.filepath}`)
  assert.equal(deck.slides[0].frontmatter.presenter, true, 'presenter mode is available in development and builds')
  const notedSlides = deck.slides.filter(slide => slide.note?.trim())
  assert.equal(notedSlides.length, deck.slides.filter(slide => slide.frontmatter.lesson === 'tipografia-griglie').length, 'every active typography slide retains its requested speaker notes')
  assert.ok(notedSlides.every(slide => slide.frontmatter.lesson === 'tipografia-griglie'), 'speaker notes remain limited to the requested typography lesson')
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
  const exercises = JSON.parse(await readFile(path.join(root, 'assets/esercitazioni/manifest.json'), 'utf8'))
  const addedExerciseSlides = exercises.slideCount
  const gridsReport = await checkGridsSources(deck)
  const addedGridsSlides = gridsReport.slides
  const addedOpeningSlides = 1
  const course = deck.slides.filter(slide => !slide.frontmatter.lesson)

  const summaryLessonIds = ['presentazione-corso', 'introduzione', 'storia-design', ...curriculum.lessons.map(spec => spec.id), 'griglie-layout']
  const summaries = deck.slides.filter(slide => slide.frontmatter.layout === 'summary')
  assert.equal(summaries.length, summaryLessonIds.length, 'one opening summary for each numbered lesson and the supplementary grids set')
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
  assert.equal(total, 221 + addedSlides + addedUxSlides + addedExerciseSlides + addedOpeningSlides + addedGridsSlides, 'resolved deck includes topics, UX lessons, supplementary grids, exercise index and imported exercises')
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
  assert.equal(visibleDeck.slides.length, total, 'active chapters include every declared lesson and exercise')
  assert.equal(visibleDeck.slides.at(-2).frontmatter.lesson, exercises.exercises.at(-1).id, 'the exercises lead to the original closing')
  assert.equal(course.length, 40, 'course presentation: 40 slides, including closing')
  assert.equal(course[0].index, 7, 'course presentation starts after the seven opening slides')
  assert.equal(course[0].frontmatter.routeAlias, 'presentazione-corso', 'course alias opens its first slide')
  assert.deepEqual(deck.slides.filter(slide => slide.frontmatter.lesson === 'apertura').map(slide => slide.index),
    [0, 1, 2, 3, 4, 5, 6], 'opening: seven preliminary slides including the exercise index')
  assert.ok(Math.abs(lessonMinutes(history) - 120) < 1e-6, 'history: 120 minutes')
  assert.deepEqual(history.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: history.length }, (_, i) => i + 1), 'history sequence')
  assert.equal(history[0].index, lesson.at(-1).index + 1, 'history immediately follows introduction')
  assert.equal(history.at(-1).index, total - addedUxSlides - addedExerciseSlides - addedGridsSlides - 2, 'the preserved history chapter precedes the UX course, supplementary grids and exercises')
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
  const removedMapping = JSON.parse(await readFile(path.join(root, 'assets/booklet/capitolo-3/lesson-04-removed-slides.json'), 'utf8'))
  const perceptionArchive = JSON.parse(await readFile(path.join(root, 'assets/booklet/lezione-05-accessibilita/perception-archive.json'), 'utf8'))
  assert.equal(perceptionArchive.active, false, 'perception is preserved outside the active lesson')
  assert.equal(perceptionArchive.lessons.length, 52, 'all former perception slide mappings are retained')
  const archivedDeck = await load(options, path.join(root, perceptionArchive.file))
  assert.equal(archivedDeck.slides.length, 52, 'all former perception contents are retained')
  assert.ok(!Object.hasOwn(deck.markdownFiles, path.join(root, perceptionArchive.file)), 'perception archive is not imported into the deck')
  const typographySpecification = curriculum.lessons.find(lesson => lesson.id === 'tipografia-griglie')
  const typographyRevision = typographySpecification.typographyRevision
  assert.ok(typographyRevision && !typographySpecification.currentSource, 'the typography lesson distinguishes its current revision from retained historical source references')
  assert.equal(typographySpecification.slideCount, 116, 'the typography lesson includes expanded classification examples and excludes removed content')
  assert.equal(typographySpecification.lessonMinutes, 71.5, 'the typography teaching budget includes two additional classification examples')
  const typographyArchive = JSON.parse(await readFile(path.join(root, typographyRevision.previousMapping), 'utf8'))
  assert.equal(typographyArchive.file, typographyRevision.archive, 'the previous typography mapping identifies its archived contents')
  assert.equal(typographyArchive.source.snapshot, curriculum.source.snapshot, 'the typography archive retains its historical snapshot')
  assert.equal(typographyArchive.lessons.length, 22, 'all twenty-two former typography slide mappings are retained')
  const typographyArchivedDeck = await load(options, path.join(root, typographyArchive.file))
  assert.equal(typographyArchivedDeck.slides.length, 22, 'all former typography contents are retained')
  assert.ok(!Object.hasOwn(deck.markdownFiles, path.join(root, typographyArchive.file)), 'the previous typography contents are excluded from the active deck')
  assert.ok(typeof typographyRevision.excludedContentArchive === 'string' && typographyRevision.excludedContentArchive.length > 0, 'the removed grids and interfaces have an explicit archive')
  const typographyExcludedArchive = JSON.parse(await readFile(path.join(root, typographyRevision.excludedContentArchive), 'utf8'))
  assert.equal(typographyExcludedArchive.active, false, 'grids and interfaces remain outside the typography-only lesson')
  assert.ok(typographyExcludedArchive.reason?.trim(), 'the intentional removal retains its reason')
  assert.equal(typographyExcludedArchive.source.snapshot, curriculum.source.snapshot, 'excluded content retains its historical snapshot')
  assert.equal(typographyExcludedArchive.source.fileKey, curriculum.source.fileKey, 'excluded content retains the original Figma file')
  assert.equal(typographyExcludedArchive.sourceFile, typographySpecification.file, 'excluded content records its original lesson file')
  assert.deepEqual(typographyExcludedArchive.slides.map(slide => slide.originalSlide), Array.from({ length: 19 }, (_, index) => index + 114), 'all nineteen removed source slides 114–132 are preserved in order')
  assert.deepEqual(typographyExcludedArchive.lessons.map(entry => [entry.lesson, entry.lessonNumber, entry.lessonSlide]), Array.from({ length: 19 }, (_, index) => ['tipografia-griglie', 8, index + 114]), 'all nineteen original source mappings are preserved in order')
  const typographyExcludedSlides = typographyExcludedArchive.slides.map(saved => {
    assert.ok(typeof saved.raw === 'string' && saved.raw.trim(), 'each removed slide retains its original Markdown')
    const slide = parseSlide(saved.raw)
    assert.equal(slide.title, saved.title, 'the saved Markdown retains its original title')
    assert.equal(slide.frontmatter.lessonSlide, saved.originalSlide, 'the saved Markdown retains its original slide number')
    assert.equal(slide.frontmatter.routeAlias, saved.alias, 'the saved Markdown retains its original alias')
    assert.ok(!deck.slides.some(active => active.frontmatter.routeAlias === saved.alias), 'removed grids and interface aliases are absent from the active deck')
    assert.ok(slide.note?.trim(), 'the excluded content retains its original speaker notes')
    return slide
  })
  assert.equal(typographyRevision.bookletExcludedContentArchive, 'assets/booklet/lezione-08-tipografia/booklet-esclusioni-archive.json', 'current booklet removals have their own archive, separate from historical grids and interfaces')
  const typographyBookletExcludedArchive = JSON.parse(await readFile(path.join(root, typographyRevision.bookletExcludedContentArchive), 'utf8'))
  assert.equal(typographyBookletExcludedArchive.active, false, 'removed booklet material remains outside the active typography lesson')
  assert.ok(typographyBookletExcludedArchive.reason?.trim(), 'the booklet removal retains its reason')
  assert.equal(typographyBookletExcludedArchive.source.snapshot, typographyRevision.snapshot, 'booklet removals retain their acquired current typography snapshot')
  assert.equal(typographyBookletExcludedArchive.source.fileKey, curriculum.source.fileKey, 'booklet removals retain the original Figma file')
  assert.equal(typographyBookletExcludedArchive.sourceFile, typographySpecification.file, 'booklet removals record their original lesson source file')
  assert.deepEqual(typographyBookletExcludedArchive.slides.map(slide => slide.originalSlide), [93], 'the removed exploratory proof slide retains its original number')
  assert.deepEqual(typographyBookletExcludedArchive.lessons.map(entry => [entry.lesson, entry.lessonNumber, entry.lessonSlide]), [['tipografia-griglie', 8, 93]], 'the original exploratory proof source mapping is retained')
  const typographyBookletExcludedSlides = typographyBookletExcludedArchive.slides.map(saved => {
    assert.ok(typeof saved.raw === 'string' && saved.raw.trim(), 'each booklet removal retains its complete original Markdown')
    const slide = parseSlide(saved.raw)
    assert.equal(slide.title, saved.title, 'booklet removal preserves its original title')
    assert.equal(slide.frontmatter.lessonSlide, saved.originalSlide, 'booklet removal preserves its original slide number')
    assert.equal(slide.frontmatter.routeAlias, saved.alias, 'booklet removal preserves its original alias')
    assert.equal(saved.alias, 'tipografia-griglie-tipo-prove-esplorative', 'the intended exploratory proof alias is archived')
    assert.ok(!deck.slides.some(active => active.frontmatter.routeAlias === saved.alias), 'the removed booklet alias is absent from the active deck')
    assert.ok(slide.note?.trim(), 'booklet removal preserves the original speaker notes')
    return slide
  })
  const uxAssets = JSON.parse(await readFile(path.join(root, 'assets/booklet/capitolo-3/slide-assets.json'), 'utf8'))
  assert.equal(uxSource.fileKey, 'WLdDzbdqP3P5rpYbK1OxYC', 'new lessons use the requested Figma file')
  assert.equal(uxSource.pageId, '2008:1741', 'new lessons use the requested UX chapter')
  assert.deepEqual(uxSource.pages.map(page => page.ordinal), Array.from({ length: 260 }, (_, i) => i + 1), 'all 260 source pages are preserved')
  assert.deepEqual(curriculum.lessons.map(lesson => lesson.number), Array.from({ length: curriculum.lessons.length }, (_, index) => index + 4), 'UX lessons retain consecutive numbers after history')
  assert.deepEqual(curriculum.lessons.map(lesson => lesson.palette), ['green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo'], 'UX lessons continue the Tailwind palette sequence of the index')
  const tokenSource = await readFile(path.join(root, 'styles/tokens.css'), 'utf8')
  const tokens = new Map([...tokenSource.matchAll(/--cvedi-([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value]))
  const tailwindSource = await readFile(path.join(root, 'node_modules/tailwindcss/theme.css'), 'utf8')
  const officialColors = [...tailwindSource.matchAll(/--color-([\w-]+):\s*(oklch\([^;]+\));/g)]
  for (const [, name, color] of officialColors) assert.equal(tokens.get(name), color, `${name}: official installed Tailwind value`)
  const setPalettes = [
    ['opening', 'indigo'], ['course', 'red'], ['introduction', 'orange'],
    ['brief', 'amber'], ['research', 'yellow'], ['history', 'lime'],
    ...curriculum.lessons.map(lesson => [lesson.paletteAlias, lesson.palette]),
  ]
  const paletteRoles = { base: '800', canvas: '900', deep: '950', light: '100', surface: '50', accent: 'accent', 'accent-light': 'accent-light', 'accent-vivid': 'accent-vivid' }
  for (const [alias, family] of setPalettes) {
    for (const [role, shade] of Object.entries(paletteRoles)) {
      assert.equal(tokens.get(`${alias}-${role}`), `var(--cvedi-${family}-${shade})`, `${alias}: ${role} follows its assigned family`)
    }
  }
  const sourcePages = new Map(uxSource.pages.map(page => [page.ordinal, page]))
  const assetRegistry = new Map(uxAssets.assets.map(asset => [asset.id, asset]))
  const coveredPages = new Set()
  const usedAssets = new Set()
  const currentSources = new Map(await Promise.all(curriculum.lessons.filter(lesson => lesson.currentSource).map(async lesson => {
    const snapshot = JSON.parse(await readFile(path.join(root, lesson.currentSource.snapshot), 'utf8'))
    const [firstFolio, lastFolio] = lesson.currentSource.folios
    const frames = new Map(snapshot.frames.map((frame, index) => [frame.id, { ...frame, folio: frame.folio ?? firstFolio + index }]))
    assert.equal(snapshot.fileKey, curriculum.source.fileKey, `${lesson.id}: current Figma source file`)
    assert.equal(snapshot.sectionId, lesson.currentSource.sectionId, `${lesson.id}: current Figma section`)
    assert.equal(frames.size, lastFolio - firstFolio + 1, `${lesson.id}: every current Figma board retained`)
    assert.deepEqual([...frames.values()].map(frame => frame.folio), Array.from({ length: frames.size }, (_, index) => firstFolio + index), `${lesson.id}: current folios remain complete and ordered`)
    return [lesson.id, { frames, covered: new Set() }]
  })))
  assert.equal(currentSources.get('percezione-gerarchia').frames.size, 56, 'lesson 05: all current Figma accessibility boards retained')
  assert.equal(currentSources.get('gestalt').frames.size, 89, 'lesson 06: all current Figma Gestalt boards retained')
  // A focused revision can cite current boards while retaining its original
  // historical mapping. It does not require migrating the entire lesson.
  const supplementaryCurrentSources = new Map(await Promise.all([...new Set(uxMapping.lessons
    .filter(entry => entry.currentSourceNodes).map(entry => entry.currentSource))].map(async snapshotPath => {
    assert.ok(typeof snapshotPath === 'string' && snapshotPath.length > 0, 'supplementary current snapshot is explicit')
    const snapshot = JSON.parse(await readFile(path.join(root, snapshotPath), 'utf8'))
    assert.equal(snapshot.fileKey, curriculum.source.fileKey, 'supplementary source uses the requested Figma file')
    const frames = new Map(snapshot.frames.map(frame => [frame.id, frame]))
    assert.equal(frames.size, snapshot.frames.length, 'supplementary current source has unique board identities')
    return [snapshotPath, frames]
  })))
  const typographySnapshot = JSON.parse(await readFile(path.join(root, typographyRevision.snapshot), 'utf8'))
  const typographyFrames = supplementaryCurrentSources.get(typographyRevision.snapshot)
  assert.equal(typographySnapshot.pageId, typographyRevision.pageId, 'typography uses the requested current Figma Page')
  assert.equal(typographyFrames?.size, 150, 'the current typography source retains every one of its 150 boards')
  assert.equal(typographyRevision.frameCount, typographyFrames.size, 'the declared typography board count matches the source')
  assert.deepEqual(typographyRevision.folios, [332, 481], 'the acquired typography folio range is explicit')
  assert.deepEqual(typographySnapshot.frames.map(frame => frame.folio), Array.from({ length: 150 }, (_, index) => index + 332), 'current typography folios are complete and ordered')
  const typographyLinks = JSON.parse(await readFile(path.join(root, typographyRevision.sourceLinks), 'utf8'))
  assert.equal(typographyLinks.fileKey, curriculum.source.fileKey, 'typography credits use the requested Figma file')
  assert.equal(typographyLinks.pageId, typographyRevision.pageId, 'typography credits use the current Figma Page')
  assert.deepEqual(typographyLinks.frames.map(frame => frame.id), typographySnapshot.frames.map(frame => frame.id), 'credits account for every acquired typography board')
  for (const [index, frame] of typographyLinks.frames.entries()) {
    assert.deepEqual(typographySnapshot.frames[index].sourceLinks, frame.sourceLinks, 'current typography credits are preserved in the source snapshot')
    assert.equal(new Set(frame.sourceLinks).size, frame.sourceLinks.length, 'typography source URLs are unique within each board')
    for (const url of frame.sourceLinks) assert.match(new URL(url).protocol, /^https?:$/, 'typography credits retain web source URLs')
  }
  const externalBibliographies = new Map(await Promise.all([...new Set(uxMapping.lessons
    .filter(entry => entry.externalSources).map(entry => entry.sourceBibliography))].map(async file => {
    assert.ok(typeof file === 'string' && file.length > 0, 'external source catalog is explicit')
    const catalog = JSON.parse(await readFile(path.join(root, file), 'utf8'))
    const sources = new Map(catalog.sources.map(source => [source.id, source]))
    assert.equal(sources.size, catalog.sources.length, 'external source identities are unique')
    for (const source of sources.values()) assert.ok(source.title && /^https:\/\//.test(source.url), 'external source has a title and primary URL')
    return [file, sources]
  })))
  const lessonVideos = JSON.parse(await readFile(path.join(root, 'data/lesson-videos.json'), 'utf8'))
  for (const specification of curriculum.lessons) {
    const slides = deck.slides.filter(slide => slide.frontmatter.lesson === specification.id)
    const mapping = uxMapping.lessons.filter(slide => slide.lesson === specification.id)
    assert.equal(slides.length, specification.slideCount, `${specification.id}: declared slide count`)
    assert.deepEqual(slides.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: slides.length }, (_, i) => i + 1), `${specification.id}: complete pagination`)
    assert.equal(slides[0].title, specification.title, `${specification.id}: chapter title`)
    assert.equal(slides[0].frontmatter.lessonNumber, specification.number, `${specification.id}: real lesson number`)
    assert.equal(slides[0].frontmatter.routeAlias, specification.id, `${specification.id}: stable index target`)
    assert.ok(Math.abs(lessonMinutes(slides) - (specification.lessonMinutes ?? curriculum.lessonMinutes)) < 1e-6, `${specification.id}: planned lecture duration`)
    assert.equal(mapping.length, slides.length, `${specification.id}: every slide has a source mapping`)
    for (const [index, slide] of slides.entries()) {
      const entry = mapping[index]
      assert.equal(slide.title, entry.title, `${specification.id}/${index + 1}: source map title`)
      const videoCalls = [...slide.content.matchAll(/<LessonVideo\b[^>]*\bvideo="([^"]+)"/g)].map(match => match[1])
      assert.deepEqual(videoCalls, slide.frontmatter.lessonVideo ? [slide.frontmatter.lessonVideo] : [], 'lesson videos have an explicit source identity')
      if (slide.frontmatter.lessonVideo || entry.lessonVideo) {
        assert.equal(slide.frontmatter.lessonVideo, entry.lessonVideo, 'the lesson video matches its provenance map')
        const video = lessonVideos[entry.lessonVideo]
        assert.ok(video, 'the lesson video has registered display data')
        assert.equal(entry.videoSource?.url, video.url, 'the mapped video retains its original URL')
        assert.equal(entry.videoSource.provenance, video.source, 'the video identifies its source record')
        const provenance = JSON.parse(await readFile(path.join(root, video.source), 'utf8'))
        assert.equal(video.youtubeId, provenance.videoId, 'the player uses the verified video identity')
        assert.equal(video.url, provenance.watchUrl, 'the player links to the verified video')
        assert.equal(video.title, provenance.title, 'the video retains its verified title')
        assert.equal(video.author, provenance.author, 'the video retains its author attribution')
        assert.equal(entry.videoSource.originalMaterial, provenance.priorCourseSource.path, 'the video preserves its earlier course source')
        assert.equal(entry.videoSource.originalMaterialPage, provenance.priorCourseSource.page, 'the video preserves its earlier source page')
        const original = await readFile(path.join(root, provenance.priorCourseSource.path))
        assert.equal(createHash('sha256').update(original).digest('hex'), provenance.priorCourseSource.sha256, 'the original PDF containing the video link is retained')
      }
      if (slide.frontmatter.externalSources || entry.externalSources) {
        assert.deepEqual(slide.frontmatter.externalSources, entry.externalSources, 'external sources match slide metadata')
        const bibliography = externalBibliographies.get(entry.sourceBibliography)
        assert.ok(bibliography && entry.externalSources.length > 0, 'external sources have a registered bibliography')
        for (const id of entry.externalSources) assert.ok(bibliography.has(id), `known external source ${id}`)
        if (entry.sourceRelation === 'context-only') {
          assert.equal(slide.frontmatter.bookletRelation, 'context-only', 'external extension distinguishes its thematic booklet reference')
          assert.equal(entry.currentSourceNodes, undefined, 'external extension does not invent a current Figma board')
        }
      }
      if (specification.currentSource) {
        const current = currentSources.get(specification.id)
        assert.equal(entry.currentSource, specification.currentSource.snapshot, `${specification.id}: current snapshot is explicit`)
        assert.deepEqual(slide.frontmatter.bookletNodes, entry.sourceNodes, 'current Figma node identities match the slide')
        assert.deepEqual(slide.frontmatter.bookletFolios, entry.sourceFolios, 'current booklet folios match the slide')
        assert.ok(entry.sourceNodes.length > 0, `${specification.id}: current content has a source`)
        entry.sourceNodes.forEach((node, i) => {
          assert.ok(current.frames.has(node), `${specification.id}: genuine current Figma node`)
          assert.equal(entry.sourceFolios[i], current.frames.get(node).folio, `${specification.id}: current booklet folio`)
          current.covered.add(node)
        })
      } else if (entry.sourceRelation === 'current-only' || slide.frontmatter.bookletRelation === 'current-only') {
        assert.equal(entry.sourceRelation, 'current-only', `${specification.id}/${index + 1}: current-only source relation is explicit in the map`)
        assert.equal(slide.frontmatter.bookletRelation, 'current-only', `${specification.id}/${index + 1}: current-only source relation matches the slide`)
        assert.equal(slide.frontmatter.bookletPages, undefined, 'current-only content does not invent historical booklet pages')
        assert.deepEqual(entry.sourcePages, [], 'current-only content has no historical page mapping')
        assert.deepEqual(entry.sourceNodes, [], 'current-only content has no historical node mapping')
        assert.ok(typeof entry.currentSource === 'string' && entry.currentSource.length > 0, 'current-only content names its current Figma snapshot')
        assert.ok(Array.isArray(entry.currentSourceNodes) && entry.currentSourceNodes.length > 0, 'current-only content cites genuine current Figma boards')
      } else {
        assert.deepEqual(slide.frontmatter.bookletPages, entry.sourcePages, `${specification.id}/${index + 1}: source page identities`)
        assert.deepEqual(entry.sourceNodes, entry.sourcePages.map(page => sourcePages.get(page)?.id), `${specification.id}/${index + 1}: genuine Figma nodes`)
        assert.ok(entry.sourcePages.length > 0, `${specification.id}/${index + 1}: content has a source`)
      }
      if (slide.frontmatter.bookletCurrentNodes || slide.frontmatter.bookletCurrentFolios || entry.currentSourceNodes || entry.currentSourceFolios) {
        assert.ok(Array.isArray(entry.currentSourceNodes) && entry.currentSourceNodes.length > 0, `${specification.id}/${index + 1}: supplementary current source nodes`)
        assert.ok(Array.isArray(entry.currentSourceFolios), `${specification.id}/${index + 1}: supplementary current folios`)
        assert.equal(entry.currentSourceNodes.length, entry.currentSourceFolios.length, 'one current folio per cited board')
        assert.deepEqual(slide.frontmatter.bookletCurrentNodes, entry.currentSourceNodes, 'supplementary current nodes match the slide')
        assert.deepEqual(slide.frontmatter.bookletCurrentFolios, entry.currentSourceFolios, 'supplementary current folios match the slide')
        const frames = supplementaryCurrentSources.get(entry.currentSource)
        assert.ok(frames, 'supplementary current snapshot is registered')
        entry.currentSourceNodes.forEach((node, i) => {
          const frame = frames.get(node)
          assert.ok(frame, `${specification.id}/${index + 1}: genuine supplementary current Figma board`)
          const nativeFolios = frame.texts.map(text => String(text.text).trim()).filter(text => /^\d{3}$/.test(text)).map(Number)
          const folio = frame.folio ?? (nativeFolios.length === 1 ? nativeFolios[0] : undefined)
          assert.equal(entry.currentSourceFolios[i], folio, `${specification.id}/${index + 1}: supplementary current booklet folio`)
        })
      }
      entry.sourcePages.forEach(page => { assert.ok(sourcePages.has(page), `known source page ${page}`); coveredPages.add(page) })
      const figures = [...slide.content.matchAll(/<LessonFigure\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1])
      if (entry.currentSourceNodes) assert.deepEqual(slide.frontmatter.bookletAssets ?? [], entry.assets, 'supplementary current figures match the slide metadata')
      const declared = entry.assets.map(id => {
        usedAssets.add(id)
        assert.ok(assetRegistry.has(id), `registered figure ${id}`)
        const asset = assetRegistry.get(id)
        if (asset.currentSource) {
          assert.equal(asset.currentSource, entry.currentSource, `${id}: figure uses the cited current snapshot`)
          const boardIndex = entry.currentSourceNodes?.indexOf(asset.pageId) ?? -1
          assert.ok(boardIndex >= 0, `${id}: figure belongs to a cited current board`)
          assert.equal(asset.page, entry.currentSourceFolios[boardIndex], `${id}: figure has the current booklet folio`)
        }
        return asset.web
      })
      assert.deepEqual(figures, declared, `${specification.id}/${index + 1}: correct original figure callsites`)
      assert.ok(!/<(?:input|select|textarea)\b/.test(slide.content), `${specification.id}/${index + 1}: UI examples are images`)
    }
  }
  for (const [id, { frames, covered }] of currentSources)
    assert.deepEqual([...covered].sort(), [...frames.keys()].sort(), `${id}: every current Figma board is represented in its lesson`)
  const typographySlides = deck.slides.filter(slide => slide.frontmatter.lesson === typographySpecification.id)
  const typographyMapping = uxMapping.lessons.filter(entry => entry.lesson === typographySpecification.id)
  assert.ok(typographyMapping.every(entry => entry.lessonNumber === 8), 'all current typography mappings use lesson number 08')
  assert.deepEqual([...new Set([...typographyMapping, ...typographyBookletExcludedArchive.lessons].flatMap(entry => entry.currentSourceNodes ?? []))].sort(), [...typographyFrames.keys()].sort(), 'active typography content and booklet removals preserve all 150 acquired source boards')
  const typographySourceMap = await readFile(path.join(root, 'docs/fonti/07-tipografia-griglie.md'), 'utf8')
  const typographySourceRows = [...typographySourceMap.matchAll(/^\| (\d+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([\d.]+) \|$/gm)]
  const sourceNumbers = value => value.trim() === '—' ? [] : value.split(',').map(Number)
  assert.deepEqual(typographySourceRows.map(row => ({ slide: Number(row[1]), title: row[2].trim(), current: sourceNumbers(row[3]), historical: sourceNumbers(row[4]), minutes: Number(row[5]) })),
    typographySlides.map(slide => ({ slide: slide.frontmatter.lessonSlide, title: slide.title, current: slide.frontmatter.bookletCurrentFolios ?? [], historical: slide.frontmatter.bookletPages ?? [], minutes: slide.frontmatter.lessonMinutes })),
    `the typography source document distinguishes current folios and historical boards for all ${typographySpecification.slideCount} slides`)
  const liveExamples = deck.slides.filter(slide => slide.frontmatter.interactiveExample)
  const accessibilityLesson = deck.slides.filter(slide => slide.frontmatter.lesson === 'percezione-gerarchia')
  assert.equal(accessibilityLesson.length, 105, 'lesson 05 contains only accessibility and its live examples')
  assert.ok(accessibilityLesson.every(slide => slide.frontmatter.lessonSection === 'accessibility'), 'no perception content remains active in lesson 05')
  assert.equal(curriculum.lessons.find(lesson => lesson.number === 5).title, 'Accessibilità e design inclusivo', 'lesson 05 has the accessibility-only identity')
  assert.deepEqual(curriculum.lessons.find(lesson => lesson.number === 5).sections, [3], 'only the accessibility section belongs to lesson 05')
  const exampleSource = JSON.parse(await readFile(path.join(root, 'assets/booklet/accessibilita-commenti-2026-10/esempi.json'), 'utf8'))
  assert.equal(liveExamples.length, 17, 'one live scenario comparison for each requested accessibility example')
  assert.deepEqual(liveExamples.map(slide => slide.frontmatter.interactiveExample).sort(), exampleSource.map(example => example.key).sort(), 'all seventeen example identities have a live comparison')
  for (const slide of liveExamples) {
    const id = slide.frontmatter.interactiveExample
    assert.equal(slide.frontmatter.lesson, 'percezione-gerarchia', 'live examples belong only to the requested lesson')
    assert.equal(deck.slides[slide.index - 1].frontmatter.routeAlias, 'accessibilita-esempio-' + id, 'the live comparison immediately follows its preserved image example')
    assert.ok(slide.content.includes(`<AccessibilityExample example-id="${id}" />`), 'the live component agrees with its source identity')
  }
  assert.deepEqual(removedMapping.lessons.map(slide => [slide.lesson, slide.lessonSlide]),
    Array.from({ length: 23 }, (_, i) => ['ricerca-inclusiva', i + 87]), 'only requested lesson 04 slides are removed')
  const preservedPages = new Set(coveredPages)
  const preservedAssets = new Set(usedAssets)
  for (const entry of [...removedMapping.lessons, ...perceptionArchive.lessons, ...typographyArchive.lessons, ...typographyExcludedArchive.lessons, ...typographyBookletExcludedArchive.lessons]) {
    entry.sourcePages.forEach(page => { assert.ok(sourcePages.has(page)); preservedPages.add(page) })
    assert.deepEqual(entry.sourceNodes, entry.sourcePages.map(page => sourcePages.get(page).id), 'removed slides retain genuine source identities')
    entry.assets.forEach(id => { assert.ok(assetRegistry.has(id)); preservedAssets.add(id) })
  }
  for (const [index, slide] of archivedDeck.slides.entries()) {
    const entry = perceptionArchive.lessons[index]
    assert.equal(slide.title, entry.title, 'archive keeps the perception slide title')
    assert.deepEqual(slide.frontmatter.bookletPages, entry.sourcePages, 'archive keeps source identities')
    const figures = [...slide.content.matchAll(/<LessonFigure\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1])
    assert.deepEqual(figures, entry.assets.map(id => assetRegistry.get(id).web), 'archive retains every original perception figure')
    assert.ok(!slide.note?.trim(), 'archive contains no speaker notes')
  }
  assert.deepEqual(typographyArchivedDeck.slides.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: 22 }, (_, index) => index + 5), 'the typography archive preserves its original slide numbers 5–26')
  for (const [index, slide] of typographyArchivedDeck.slides.entries()) {
    const entry = typographyArchive.lessons[index]
    assert.equal(slide.title, entry.title, 'the typography archive preserves its original slide title')
    assert.equal(slide.frontmatter.lessonSlide, entry.lessonSlide, 'the typography archive preserves its source mapping order')
    assert.equal(slide.frontmatter.lessonMinutes, entry.minutes, 'the typography archive preserves its original planned duration')
    assert.deepEqual(slide.frontmatter.bookletPages, entry.sourcePages, 'the typography archive keeps its genuine historical board identities')
    const figures = [...slide.content.matchAll(/<LessonFigure\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1])
    assert.deepEqual(figures, entry.assets.map(id => assetRegistry.get(id).web), 'the typography archive retains every original figure')
    assert.ok(!slide.note?.trim(), 'the typography archive contains no speaker notes')
  }
  for (const [index, slide] of typographyExcludedSlides.entries()) {
    const entry = typographyExcludedArchive.lessons[index]
    assert.equal(slide.frontmatter.lesson, entry.lesson, 'excluded content retains its original lesson identity')
    assert.equal(slide.title, entry.title, 'excluded content agrees with its source map title')
    assert.equal(slide.frontmatter.routeAlias, entry.routeAlias, 'excluded content agrees with its source map alias')
    assert.equal(slide.frontmatter.lessonMinutes, entry.minutes, 'excluded content retains its original teaching duration')
    assert.deepEqual(slide.frontmatter.bookletPages, entry.sourcePages, 'excluded content retains its original booklet references')
    assert.deepEqual(slide.frontmatter.bookletAssets ?? [], entry.assets, 'excluded content retains its declared original assets')
    const figures = [...slide.content.matchAll(/<LessonFigure\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1])
    assert.deepEqual(figures, entry.assets.map(id => assetRegistry.get(id).web), 'excluded content preserves every original figure callsite')
  }
  for (const [index, slide] of typographyBookletExcludedSlides.entries()) {
    const entry = typographyBookletExcludedArchive.lessons[index]
    assert.equal(slide.frontmatter.lesson, entry.lesson, 'booklet removal retains its original lesson identity')
    assert.equal(slide.title, entry.title, 'booklet removal agrees with its original source-map title')
    assert.equal(slide.frontmatter.routeAlias, entry.routeAlias, 'booklet removal agrees with its original source-map alias')
    assert.equal(slide.frontmatter.lessonMinutes, entry.minutes, 'booklet removal retains its original teaching duration')
    assert.equal(entry.currentSource, typographyRevision.snapshot, 'booklet removal keeps the acquired typography snapshot')
    assert.deepEqual(slide.frontmatter.bookletCurrentNodes, entry.currentSourceNodes, 'booklet removal preserves every current source node')
    assert.deepEqual(slide.frontmatter.bookletCurrentFolios, entry.currentSourceFolios, 'booklet removal preserves every acquired current folio')
    assert.ok(entry.currentSourceNodes.length > 0, 'booklet removal has genuine source-board references')
    entry.currentSourceNodes.forEach((id, sourceIndex) => {
      const frame = typographyFrames.get(id)
      assert.ok(frame, 'the removed booklet source board exists in the preserved snapshot')
      assert.equal(frame.folio, entry.currentSourceFolios[sourceIndex], 'the removed booklet board keeps its acquired folio')
    })
    assert.deepEqual(slide.frontmatter.bookletPages ?? [], entry.sourcePages, 'booklet removal preserves its historical references')
    assert.deepEqual(slide.frontmatter.bookletAssets ?? [], entry.assets, 'booklet removal preserves its declared original assets')
    const figures = [...slide.content.matchAll(/<LessonFigure\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1])
    assert.deepEqual(figures, entry.assets.map(id => assetRegistry.get(id).web), 'booklet removal preserves every original figure callsite')
  }
  assert.deepEqual([...preservedPages].sort((a, b) => a - b), Array.from({ length: 260 }, (_, i) => i + 1), 'active and removed slide mappings preserve every source page')
  assert.equal(preservedAssets.size, assetRegistry.size, 'all original figures and supplementary examples remain accounted for')
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
  assert.deepEqual(brief.map(slide => slide.index), Array.from({ length: 25 }, (_, i) => 46 + i), 'project brief: consecutive slides 47–71')
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

  const sharedArtwork = JSON.parse(await readFile(path.join(root, 'data/card-artwork.json'), 'utf8'))
  const localArtwork = JSON.parse(await readFile(path.join(root, 'data/card-artwork-local.json'), 'utf8'))
  const artwork = { ...sharedArtwork, assets: { ...sharedArtwork.assets, ...localArtwork.assets }, mappings: { ...sharedArtwork.mappings, ...localArtwork.mappings } }
  const generations = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-v1.json'), 'utf8'))
  const cardGenerations = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-cards-v2.json'), 'utf8'))
  const outlineGenerations = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-outline-v3.json'), 'utf8'))
  const chapterGenerations = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-chapters-v1.json'), 'utf8'))
  const historyIcons = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-history-icons-v1.json'), 'utf8'))
  const researchIcons = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/manifest-lesson-04-cards-v1.json'), 'utf8'))
  const perceptionIcons = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/lesson-05-icons/manifest.json'), 'utf8'))
  const typographyIcons = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/lesson-08-cards/manifest.json'), 'utf8'))
  const paletteRefresh = JSON.parse(await readFile(path.join(root, 'assets/theme-imagegen/card-palette-refresh/manifest.json'), 'utf8'))
  const refreshedCardFamilies = [
    { lesson: 'storia-design', mapping: 'history', family: 'lime', manifest: 'assets/theme-imagegen/manifest-history-icons-v1.json', jobs: historyIcons.jobs },
    { lesson: 'ricerca-inclusiva', mapping: 'ricerca-inclusiva', family: 'green', manifest: 'assets/theme-imagegen/manifest-lesson-04-cards-v1.json', jobs: researchIcons.jobs },
    { lesson: 'percezione-gerarchia', mapping: 'percezione-gerarchia', family: 'emerald', manifest: 'assets/theme-imagegen/lesson-05-icons/manifest.json', jobs: perceptionIcons.jobs },
  ]
  const legacyCardRegistry = new Map(refreshedCardFamilies.flatMap(family => family.jobs.map(generation => [generation.id, { ...family, generation }])))
  assert.ok(Array.isArray(paletteRefresh.jobs), 'card palette refresh: job registry')
  const refreshedCards = new Map(paletteRefresh.jobs.map(generation => [generation.id, generation]))
  assert.equal(refreshedCards.size, paletteRefresh.jobs.length, 'card palette refresh: unique asset IDs')
  for (const generation of paletteRefresh.jobs) {
    const legacy = legacyCardRegistry.get(generation.id)
    assert.ok(legacy, `${generation.id}: refresh belongs to a known card motif`)
    assert.equal(generation.family, legacy.family, `${generation.id}: current owning lesson palette`)
    assert.equal(generation.previousManifest, legacy.manifest, `${generation.id}: original manifest retained`)
    assert.equal(generation.previousWeb, legacy.generation.web, `${generation.id}: original public image retained`)
    assert.notEqual(generation.web, generation.previousWeb, `${generation.id}: refreshed image does not overwrite the original`)
    assert.notEqual(generation.original, legacy.generation.original, `${generation.id}: refreshed PNG does not overwrite the original`)
    assert.equal(generation.status, 'complete', `${generation.id}: card palette refresh complete`)
    assert.ok(typeof generation.subject === 'string' && generation.subject.trim(), `${generation.id}: semantic subject recorded`)
    assert.ok(typeof generation.prompt === 'string' && generation.prompt.trim(), `${generation.id}: exact prompt recorded`)
    assert.ok(typeof generation.generatedSource === 'string' && generation.generatedSource.trim(), `${generation.id}: generation source recorded`)
    for (const role of ['outline', 'primary', 'pale', 'accent'])
      assert.ok(typeof generation.palette?.[role] === 'string' && generation.palette[role].trim(), `${generation.id}: palette ${role} recorded`)
    assert.equal(generation.visualReview?.status, 'accepted', `${generation.id}: refreshed image visually reviewed`)
    assert.equal(generation.publicationEncoding?.format, 'webp', `${generation.id}: WebP publication format`)
    for (const property of ['lossless', 'pixelPreserved', 'alphaPreserved'])
      assert.equal(generation.publicationEncoding?.[property], true, `${generation.id}: ${property} publication`)
    assert.match(generation.original, /^assets\/theme-imagegen\/card-palette-refresh\/originals\/[^/]+\.png$/, `${generation.id}: preserved refresh PNG path`)
    assert.match(generation.promptFile, /^assets\/theme-imagegen\/card-palette-refresh\/prompts\/[^/]+\.txt$/, `${generation.id}: preserved refresh prompt path`)
    assert.match(generation.web, /^public\/images\/generated\/theme-2026\/cards\/refresh\/[^/]+\.webp$/, `${generation.id}: refreshed public image path`)
    assert.equal((await readFile(path.join(root, generation.promptFile), 'utf8')).trim(), generation.prompt.trim(), `${generation.id}: exact refresh prompt retained`)
    const original = await readFile(path.join(root, generation.original))
    const publicImage = await readFile(path.join(root, generation.web))
    assert.equal(createHash('sha256').update(original).digest('hex'), generation.originalSha256, `${generation.id}: original refresh PNG hash`)
    assert.equal(createHash('sha256').update(publicImage).digest('hex'), generation.sha256, `${generation.id}: refreshed public image hash`)
    assert.deepEqual([...original.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], `${generation.id}: original is a PNG`)
    assert.equal(original.toString('ascii', 12, 16), 'IHDR', `${generation.id}: original PNG dimensions header`)
    assert.deepEqual(generation.dimensions, [original.readUInt32BE(16), original.readUInt32BE(20)], `${generation.id}: dimensions match original PNG`)
    assert.ok(generation.dimensions.every(dimension => Number.isInteger(dimension) && dimension > 0), `${generation.id}: positive image dimensions`)
    assert.equal(publicImage.toString('ascii', 0, 4), 'RIFF', `${generation.id}: public image container`)
    assert.equal(publicImage.toString('ascii', 8, 12), 'WEBP', `${generation.id}: public image is WebP`)
    assert.ok(Array.isArray(generation.owners) && generation.owners.length > 0, `${generation.id}: active owning cards recorded`)
    for (const owner of generation.owners) {
      assert.equal(owner.lesson, legacy.lesson, `${generation.id}: owner belongs to its lesson`)
      assert.equal(artwork.mappings[legacy.mapping]?.[normalizeTitle(owner.card)], generation.id, `${generation.id}: owner matches card catalog`)
    }
  }
  const selectedCardGeneration = generation => refreshedCards.get(generation.id) ?? generation
  assert.equal(perceptionIcons.jobs.length, 13, 'all requested lesson 05 icons are retained')
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
  assert.equal(Object.keys(artwork.assets).length, cardGenerations.jobs.length + historyIcons.jobs.length + researchIcons.jobs.length + perceptionIcons.jobs.length + typographyIcons.jobs.length, 'only registered motifs populate the card catalog')
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
    assert.equal(artwork.assets[generation.id], '/' + selectedCardGeneration(generation).web.replace(/^public\//, ''), `${generation.id}: history icon registered`)
    assert.equal(generation.visualReview.status, 'accepted')
    assert.ok(generation.publicationEncoding.pixelPreserved && generation.publicationEncoding.alphaPreserved)
    assert.ok(generation.owners.length > 0)
  }
  for (const generation of [...researchIcons.jobs, ...perceptionIcons.jobs, ...typographyIcons.jobs]) {
    assert.equal(generation.status, 'complete', generation.id + ': generated artwork selected')
    assert.equal(artwork.assets[generation.id], '/' + selectedCardGeneration(generation).web.replace(/^public\//, ''), generation.id + ': card icon registered')
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
  let perceptionCardUses = 0
  let typographyCardUses = 0
  const activeRefreshedCardOwners = new Map()
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
      if (id && legacyCardRegistry.has(id)) {
        const owners = activeRefreshedCardOwners.get(id) ?? []
        owners.push({ slide: slide.index + 1, title: slide.title, card: card[1], lesson: slide.frontmatter.lesson })
        activeRefreshedCardOwners.set(id, owners)
      }
      if (slide.frontmatter.lesson === 'ricerca-inclusiva') {
        assert.ok(id, card[1] + ': lesson 04 card has a semantic motif')
        researchCardUses++
      }
      if (slide.frontmatter.lesson === 'percezione-gerarchia') {
        assert.ok(id, card[1] + ': requested lesson 05 card has a semantic motif')
        perceptionCardUses++
      }
      if (slide.frontmatter.lesson === 'tipografia-griglie' && id) {
        assert.ok(typographyIcons.jobs.some(job => job.id === id), card[1] + ': typography motif has registered provenance')
        typographyCardUses++
      }
    }
  }
  assert.equal(directCards - addedCards, cardGenerations.counts.totalDirectCards, 'the existing card inventory is preserved')
  assert.equal(researchCardUses, researchIcons.counts.activeDirectCardUses, 'all retained lesson 04 card uses have their requested illustrations')
  assert.equal(typographyCardUses, typographyIcons.jobs.reduce((sum, job) => sum + job.owners.length, 0), 'the requested typography card illustrations have their active owners')
  assert.equal(illustratedCards, cardGenerations.counts.directCardUses + historyIcons.counts.directCardUses + researchCardUses + perceptionCardUses + typographyCardUses, 'selected direct cards have semantic motifs')
  assert.ok(illustratedCards - researchCardUses - perceptionCardUses > 0 && illustratedCards - researchCardUses - perceptionCardUses < (directCards - researchCardUses - perceptionCardUses) / 4, 'illustrations in the other lessons remain selective')
  assert.deepEqual([...refreshedCards.keys()].sort(), [...activeRefreshedCardOwners.keys()].sort(), 'palette refresh covers exactly the active card motifs in its lessons')
  const ownerKey = owner => JSON.stringify([owner.lesson, owner.slide, owner.title, normalizeTitle(owner.card)])
  for (const [id, owners] of activeRefreshedCardOwners)
    assert.deepEqual(refreshedCards.get(id).owners.map(ownerKey).sort(), owners.map(ownerKey).sort(), `${id}: refreshed owners match the active slides and cards`)

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
    publication, exercises: exerciseReport, grids: gridsReport,
    history: visibleHistory.length, preservedHistory: history.length,
    lessonMinutes: [lesson, history].map(set => Math.round(lessonMinutes(set) * 1e6) / 1e6),
    publicImages: assets.size, uxExamples: uxExamples.length, bookletPages: booklet.pages.length,
    historyBookletPages: chapterPages.size, historyStyles: historyStyleSlides.length, historyFigures: historyFigures.length,
    recoveredSlides: recoveredSlides.length, projectBriefSlides: brief.length, approfondimentiSlides: approfondimenti.length, officialTopics: topicSource.topics.length,
    uxCourse: curriculum.lessons.map(spec => ({ lesson: spec.id, slides: spec.slideCount, minutes: spec.lessonMinutes ?? curriculum.lessonMinutes })), uxSourcePages: coveredPages.size, uxFigures: usedAssets.size }
  return { deck: visibleDeck, total: visibleDeck.slides.length, lesson, history: visibleHistory, brief, course, approfondimenti, topicSource,
    projects, uxExamples, uxSlides, curriculum, audit: { ...audit, integratedSlides: audit.integratedSlides.filter(entry =>
      visibleDeck.slides.some(slide => slide.frontmatter.routeAlias === entry.alias)) }, report }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { report } = await checkSlideSources()
  console.log(JSON.stringify(report, null, 2))
}
