import assert from 'node:assert/strict'
import { test } from 'node:test'
import { installPresenterNavigation } from '../../utils/presenter-navigation.mjs'

function windowFor(path, hash) {
  const listeners = new Map(), messages = [], visits = []
  const browser = {
    location: { href: `https://example.test${path}${hash}`, origin: 'https://example.test', pathname: path, hash, assign(url) { visits.push(url) } },
    document: { addEventListener(name, fn) { listeners.set(name, fn) }, removeEventListener(name) { listeners.delete(name) } },
    addEventListener(name, fn) { listeners.set(name, fn) },
    removeEventListener(name) { listeners.delete(name) },
    BroadcastChannel: class {
      constructor(name) { messages.push(name) }
      addEventListener(name, fn) { listeners.set(name, fn) }
      postMessage(data) { messages.push(data) }
      close() { listeners.delete('message') }
    },
  }
  return { browser, listeners, messages, visits }
}

function click(href, overrides = {}) {
  return {
    button: 0, defaultPrevented: false,
    target: { closest: () => ({ href, target: '', hasAttribute: () => false }) },
    preventDefault() { this.defaultPrevented = true },
    ...overrides,
  }
}

test('presenter deck changes keep the hosted course base and broadcast once, including after browser back', () => {
  const state = windowFor('/course/slides/', '#/presenter/indice-esercitazioni')
  const dispose = installPresenterNavigation(state.browser, '/course/slides/')
  const href = 'https://example.test/course/slides/lezioni/esercitazione-01/#/esercitazione-01'
  const modified = click(href, { ctrlKey: true })
  state.listeners.get('click')(modified)
  assert.equal(modified.defaultPrevented, false)
  assert.deepEqual(state.visits, [])
  const event = click(href)
  state.listeners.get('click')(event)
  assert.equal(event.defaultPrevented, true)
  assert.deepEqual(state.visits, ['https://example.test/course/slides/lezioni/esercitazione-01/#/presenter/esercitazione-01'])
  assert.equal(state.messages[1].from, '/course/slides/')
  state.listeners.get('click')(click(href))
  assert.equal(state.visits.length, 1, 'no duplicate navigation while leaving')
  state.listeners.get('pageshow')()
  state.listeners.get('click')(click(href))
  assert.equal(state.visits.length, 2, 'navigation works when restored from browser history')
  dispose()
  assert.equal(state.listeners.size, 0)
})

test('only viewers in the departing deck follow valid course destinations', () => {
  for (const [path, hash, to, expected] of [
    ['/course/', '#/3', 'https://example.test/course/lezioni/colore/#/presenter/colore', true],
    ['/course/lezioni/colore/', '#/1', 'https://example.test/course/lezioni/colore/#/colore', false],
    ['/course/', '#/presenter/3', 'https://example.test/course/lezioni/colore/#/colore', false],
    ['/course/', '#/print', 'https://example.test/course/lezioni/colore/#/colore', false],
    ['/course/', '#/3', 'https://other.test/course/lezioni/colore/#/colore', false],
    ['/course/', '#/3', 'https://example.test/other/lezioni/colore/#/colore', false],
    ['/course/', '#/3', 'https://example.test/course/lezioni/missing/#/1', false],
  ]) {
    const state = windowFor(path, hash)
    const dispose = installPresenterNavigation(state.browser, '/course/')
    state.listeners.get('message')({ data: { from: '/course/', to } })
    assert.equal(state.visits.length, expected ? 1 : 0, `${path}${hash}: ${to}`)
    if (expected) assert.equal(new URL(state.visits[0]).hash, '#/colore')
    dispose()
  }
  const state = windowFor('/course/', '#/3')
  installPresenterNavigation(state.browser, '/course/')
  const event = click('https://example.test/course/lezioni/colore/#/colore')
  state.listeners.get('click')(event)
  assert.equal(event.defaultPrevented, false, 'ordinary viewer navigation remains native')
  assert.deepEqual(state.visits, [])
})
