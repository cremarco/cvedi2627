import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createRequire } from 'node:module'
import { realpath } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { lessonDecks, lessonDeckExtensions, deckDirectory, deckForTarget } from '../../utils/lesson-decks.mjs'
import { publicationExtensions } from '../../utils/publication.mjs'
const root = fileURLToPath(new URL('../..', import.meta.url))
const require = createRequire(await realpath(path.join(root, 'node_modules/@slidev/cli/package.json')))
const { load, injectPreparserExtensionLoader } = await import(require.resolve('@slidev/parser/fs'))
const options = { roots: [root], userRoot: root, allowedRoots: [root] }

test('each presentation imports only its own lesson and preserves every source slide', async () => {
  try {
    for (const mode of ['dev', 'build']) {
      injectPreparserExtensionLoader(async (_r, _h, _f, mode) => publicationExtensions(mode))
      const full = await load(options, path.join(root, 'slides.md'), undefined, mode)
      let total = 0
      for (const deck of lessonDecks.filter(d => mode === 'dev' || !d.localOnly)) {
        injectPreparserExtensionLoader(async (_r, _h, file, mode) => [...publicationExtensions(mode), ...lessonDeckExtensions(deck.id, file)])
        const selected = await load(options, path.join(root, 'slides.md'), undefined, mode)
        const expected = full.slides.filter(s => (s.frontmatter.lesson ?? 'presentazione-corso') === deck.lesson)
        assert.deepEqual(selected.slides.map(s => [s.title, s.content]), expected.map(s => [s.title, s.content]), `${mode}/${deck.id}: exact source content, order and count`)
        assert.ok(selected.slides.length > 0)
        assert.ok(selected.slides.every(s => (s.frontmatter.lesson ?? 'presentazione-corso') === deck.lesson))
        const sources = Object.keys(selected.markdownFiles).map(f => path.relative(root, f)).sort()
        assert.deepEqual(sources, ['slides.md', ...(deck.file ? [deck.file] : [])].sort(), `${deck.id}: other source files are never imported`)
        assert.equal(selected.headmatter.presenter, false)
        total += selected.slides.length
      }
      assert.equal(total, full.slides.length, 'no lost, duplicated or additional slides')
    }
  } finally { injectPreparserExtensionLoader(null) }
})

test('menu destinations resolve to a presentation and keep stable aliases', () => {
  assert.equal(deckForTarget('introduzione-teorica').id, 'introduzione')
  assert.equal(deckForTarget('colore').id, 'colore')
  assert.equal(deckDirectory('apertura'), '')
  assert.equal(deckDirectory('colore'), 'lezioni/colore/')
  assert.throws(() => lessonDeckExtensions('../../missing', 'slides.md'), /Unknown lesson deck/)
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
