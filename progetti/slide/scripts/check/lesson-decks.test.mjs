import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { readFile, realpath, mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { lessonDecks, lessonDeckExtensions, deckDirectory, deckForTarget } from '../../utils/lesson-decks.mjs'
import { publicationExtensions } from '../../utils/publication.mjs'
const root = fileURLToPath(new URL('../../../..', import.meta.url))
const require = createRequire(await realpath(path.join(root, 'node_modules/@slidev/cli/package.json')))
const { load, injectPreparserExtensionLoader } = await import(require.resolve('@slidev/parser/fs'))
const slideRoot = path.join(root, 'progetti/slide')
const options = { roots: [slideRoot], userRoot: slideRoot, allowedRoots: [root] }

test('the first exercise is published while the remaining exercises stay local', async () => {
  const curriculum = JSON.parse(await readFile(path.join(root, 'progetti/slide/data/ux-curriculum.json'), 'utf8'))
  const exercises = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/esercitazioni/manifest.json'), 'utf8'))
  assert.deepEqual(lessonDecks.filter(deck => deck.localOnly).map(deck => deck.id), exercises.exercises.slice(1).map(exercise => exercise.id))
  const gridsIndex = lessonDecks.findIndex(deck => deck.id === 'griglie-layout')
  assert.equal(lessonDecks[gridsIndex - 1].id, 'tipografia-griglie', 'grids are a separate set immediately after typography')
  assert.equal(lessonDecks[gridsIndex + 1].id, 'composizione-gerarchia', 'composition follows grids')
  assert.equal(lessonDecks[gridsIndex + 2].id, exercises.exercises[0].id, 'exercises follow the last active theory lesson')
  assert.equal(lessonDecks[gridsIndex + 1].file, 'lezioni/10-composizione-gerarchia.md')
  assert.equal(lessonDecks[gridsIndex + 1].localOnly, undefined, 'composition is published')
  assert.equal(lessonDecks[gridsIndex].file, 'lezioni/07-griglie-layout.md', 'grids have their own source file')
  assert.equal(lessonDecks[gridsIndex].localOnly, undefined, 'grids are included in public builds')
  for (const lesson of curriculum.lessons) {
    const presentation = lessonDecks.find(deck => deck.id === lesson.id)
    assert.ok(presentation, `${lesson.id}: presentation exists`)
    assert.equal(Boolean(presentation.localOnly), lesson.localOnly === true, `${lesson.id}: deck and curriculum agree on publication`)
  }
  for (const lesson of curriculum.archivedLessons) {
    assert.ok(!lessonDecks.some(deck => deck.id === lesson.id), `${lesson.id}: removed lesson is not a registered presentation`)
    assert.equal(deckForTarget(lesson.id), undefined, `${lesson.id}: removed lesson has no active destination`)
  }
})

test('each presentation imports only its own lesson and preserves every source slide', async () => {
  try {
    for (const mode of ['dev', 'build']) {
      injectPreparserExtensionLoader(async (_r, _h, _f, mode) => publicationExtensions(mode))
      const full = await load(options, path.join(root, 'progetti/slide/slides.md'), undefined, mode)
      let total = 0
      for (const deck of lessonDecks.filter(d => mode === 'dev' || !d.localOnly)) {
        injectPreparserExtensionLoader(async (_r, _h, file, mode) => [...publicationExtensions(mode), ...lessonDeckExtensions(deck.id, file)])
        const selected = await load(options, path.join(root, 'progetti/slide/slides.md'), undefined, mode)
        const expected = full.slides.filter(s => (s.frontmatter.lesson ?? 'presentazione-corso') === deck.lesson)
        assert.deepEqual(selected.slides.map(s => [s.title, s.content, s.note]), expected.map(s => [s.title, s.content, s.note]), `${mode}/${deck.id}: exact source content, notes, order and count`)
        assert.ok(selected.slides.length > 0)
        assert.ok(selected.slides.every(s => (s.frontmatter.lesson ?? 'presentazione-corso') === deck.lesson))
        const sources = Object.keys(selected.markdownFiles).map(f => path.relative(slideRoot, f)).sort()
        assert.deepEqual(sources, ['slides.md', ...(deck.file ? [deck.file] : [])].sort(), `${deck.id}: other source files are never imported`)
        assert.equal(selected.headmatter.presenter, true)
        assert.equal(selected.headmatter.preloadImages, false, `${deck.id}: no global image preload`)
        total += selected.slides.length
      }
      assert.equal(total, full.slides.length, 'no lost, duplicated or additional slides')
    }
  } finally { injectPreparserExtensionLoader(null) }
})

test('menu destinations resolve to a presentation and keep stable aliases', () => {
  assert.equal(deckForTarget('introduzione-teorica').id, 'introduzione')
  assert.equal(deckForTarget('colore').id, 'colore')
  assert.equal(deckForTarget('griglie-layout').id, 'griglie-layout')
  assert.equal(deckDirectory('apertura'), '')
  assert.equal(deckDirectory('colore'), 'lezioni/colore/')
  assert.throws(() => lessonDeckExtensions('../../missing', 'progetti/slide/slides.md'), /Unknown lesson deck/)
})

test('existing bookmarks redirect both on entry and after changing the menu hash', async () => {
  const { runInNewContext } = await import('node:vm')
  const { legacyRedirectScript } = await import('../build/lesson-decks.mjs')
  const catalog = { legacy: { '3': { deck: 'apertura', target: 3 }, 'colore': { deck: 'colore', target: 'colore' }, '500': { deck: 'gestalt', target: 'gestalt-030' } } }
  let destination, onHashChange
  const location = { hash: '#/3', replace(value) { destination = value } }
  runInNewContext(legacyRedirectScript(catalog, '/cvedi2627/slides/'), { location, addEventListener(event, listener) { assert.equal(event, 'hashchange'); onHashChange = listener } })
  assert.equal(destination, undefined)
  location.hash = '#/colore'; onHashChange()
  assert.equal(destination, '/cvedi2627/slides/lezioni/colore/#/colore')
  destination = undefined
  location.hash = '#/500/2?clicks=1'
  runInNewContext(legacyRedirectScript(catalog, '/'), { location, addEventListener() {} })
  assert.equal(destination, '/lezioni/gestalt/#/gestalt-030/2?clicks=1')
})

test('local menu redirects are injected into Slidev HTML without changing other pages', async () => {
  const { lessonDecksDevPlugin } = await import('../../utils/lesson-decks-dev.mjs')
  const directory = await mkdtemp(path.join(tmpdir(), 'cvedi-menu-'))
  const before = { deck: process.env.CVEDI_DECK, routes: process.env.CVEDI_DECK_ROUTES }
  try {
    process.env.CVEDI_DECK = 'apertura'
    process.env.CVEDI_DECK_ROUTES = path.join(directory, 'decks.json')
    await writeFile(process.env.CVEDI_DECK_ROUTES, JSON.stringify({ legacy: { colore: { deck: 'colore', target: 'colore' } } }))
    let middleware, upgrade
    const plugin = lessonDecksDevPlugin()
    assert.equal(plugin.enforce, 'pre', 'the lesson proxy runs before Slidev’s absolute metadata handler')
    await plugin.configureServer({ middlewares: { use(handler) { middleware = handler } }, httpServer: { once() {}, on(event, handler) { if (event === 'upgrade') upgrade = handler } } })
    const html = '<html><head></head><body>Slidev</body></html>'
    for (const url of ['/', '/?preview=true', '/index.html', '/web-design-examples/index.html']) {
      let response
      const res = { end(body) { response = body }, getHeader() { return 'text/html; charset=utf-8' }, removeHeader() {} }
      await middleware({ url }, res, () => res.end(html))
      assert.equal(response.includes('id="cvedi-deck-redirect"'), !url.startsWith('/web-design-examples/'), url)
      assert.ok(response.includes('<body>Slidev</body>'))
    }
    for (const [method, referer, expectedStatus] of [
      ['POST', 'http://localhost:3047/lezioni/griglie-layout/', 405],
      ['POST', 'http://localhost:3047/lezioni/tipografia-griglie/', 405],
      ['GET', 'http://localhost:3047/lezioni/not-a-lesson/', 404],
      ['GET', 'http://example.com/lezioni/griglie-layout/', undefined],
      ['GET', 'http://localhost:3047/', undefined],
    ]) {
      let status, passed = false
      const headers = new Map()
      const req = { url: '/__slidev/slides/1.json', method, headers: { host: 'localhost:3047', referer } }
      const res = { setHeader(key, value) { headers.set(key, value) }, writeHead(code, values) { status = code; for (const [key, value] of Object.entries(values)) headers.set(key, value) }, end() {} }
      await middleware(req, res, () => { passed = true })
      assert.equal(status, expectedStatus, `${method}/${referer}: metadata routing respects the referring lesson`)
      assert.equal(passed, expectedStatus === undefined, 'only ordinary menu requests fall through to its metadata handler')
      assert.equal(headers.get('Cache-Control'), 'no-store', 'metadata cannot reuse another lesson’s cached response')
      assert.equal(headers.get('Vary'), 'Referer', 'metadata is scoped to its referring page')
      if (status === 405) assert.equal(headers.get('Allow'), 'GET', 'a child notes editor cannot write to the menu source')
    }
    const curriculum = JSON.parse(await readFile(path.join(root, 'progetti/slide/data/ux-curriculum.json'), 'utf8'))
    for (const lesson of curriculum.archivedLessons) {
      let status, response, destroyed = false
      const req = { url: `/lezioni/${lesson.id}/` }
      const res = { writeHead(code) { status = code }, end(body) { response = body } }
      await middleware(req, res, () => assert.fail('archived lesson requests must not fall through to Slidev'))
      assert.equal(status, 404, `${lesson.id}: its direct local path is unavailable`)
      assert.equal(response, 'Presentazione non disponibile.')
      await upgrade(req, { destroy() { destroyed = true } }, Buffer.alloc(0))
      assert.equal(destroyed, true, `${lesson.id}: its websocket cannot start an archived lesson`)
    }
  } finally {
    for (const [key, value] of [['CVEDI_DECK', before.deck], ['CVEDI_DECK_ROUTES', before.routes]]) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
    await rm(directory, { recursive: true, force: true })
  }
})
