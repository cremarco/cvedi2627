import assert from 'node:assert/strict'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import { deckHref, deckLocation, lessonDeckExtensions } from '../../utils/lesson-decks.mjs'
import { exerciseHashRedirectScript, exerciseHistoryPaths } from '../../utils/exercise-history.mjs'

test('only standalone exercises use path routing', () => {
  assert.equal(deckHref('esercitazione-03', 'presenter/1', '/course/slides/'), '/course/slides/lezioni/esercitazione-03/presenter/1/')
  assert.equal(deckHref('colore', 'presenter/1', '/course/slides/'), '/course/slides/lezioni/colore/#/presenter/1')
  for (const [id, expected] of [['esercitazione-01','history'],['esercitazione-03','history'],['colore','hash']]) {
    const matter = { theme: 'default', routerMode: 'hash' }
    lessonDeckExtensions(id, '/project/progetti/slide/slides.md')[0].transformSlide('', matter)
    assert.equal(matter.routerMode, expected)
  }
})

test('exercise entries include slide numbers, aliases and presenter pages', () => {
  const paths = exerciseHistoryPaths([{no:1, alias:'esercitazione-03'},{no:2}])
  for (const route of ['1','2','esercitazione-03','presenter/1','presenter/2','presenter/esercitazione-03','print','overview']) assert.ok(paths.includes(route))
  assert.equal(paths.length, new Set(paths).size)
})

test('old exercise bookmarks preserve slide, presenter mode and query without a fragment', () => {
  for (const [hash, expected] of [['#/presenter/1','presenter/1/'],['#/42?clicks=2','42/?clicks=2'],['#/esercitazione-03','esercitazione-03/']]) {
    let destination
    runInNewContext(exerciseHashRedirectScript('/course/lezioni/esercitazione-03/'), { location:{hash,search:'',replace(value){destination=value}}, URLSearchParams, addEventListener(){} })
    assert.equal(destination, '/course/lezioni/esercitazione-03/' + expected)
  }
  const base = new URL('https://example.test/course/')
  const location = deckLocation('https://example.test/course/lezioni/esercitazione-03/presenter/42/?clicks=2', base)
  assert.equal(location.root, '/course/lezioni/esercitazione-03/')
  assert.equal(location.route, 'presenter/42')
  assert.equal(deckLocation('https://other.test/course/lezioni/esercitazione-03/1/', base), undefined)
})
