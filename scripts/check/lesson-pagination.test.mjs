import assert from 'node:assert/strict'
import { realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { after, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { ref } from 'vue'

const root = fileURLToPath(new URL('../..', import.meta.url))
const require = createRequire(await realpath(new URL('../../node_modules/@slidev/cli/package.json', import.meta.url)))
const { createServer } = await import(require.resolve('vite'))
const server = await createServer({ root, configFile: false, server: { middlewareMode: true }, logLevel: 'silent' })
after(() => server.close())
const { lessonPagination } = await server.ssrLoadModule('/utils/lesson-pagination.ts')
const { useLessonPagination } = await server.ssrLoadModule('/composables/use-lesson-pagination.ts')

function slide(no, lesson) {
  return { no, meta: { slide: { frontmatter: { lesson } } } }
}

test('keeps numbering within each set, including the non-contiguous course closing', () => {
  const slides = [slide(1, 'apertura'), slide(2), slide(3, 'introduzione'), slide(4, 'custom-set'), slide(5)]
  assert.deepEqual(lessonPagination(slides, 1), { lesson: 'apertura', page: 1, total: 1 })
  assert.deepEqual(lessonPagination(slides, 2), { lesson: 'presentazione-corso', page: 1, total: 2 })
  assert.deepEqual(lessonPagination(slides, 3), { lesson: 'introduzione', page: 1, total: 1 })
  assert.deepEqual(lessonPagination(slides, 4), { lesson: 'custom-set', page: 1, total: 1 })
  assert.deepEqual(lessonPagination(slides, 5), { lesson: 'presentazione-corso', page: 2, total: 2 })
})

test('preserves fallback behavior for an absent slide and an empty deck', () => {
  assert.deepEqual(lessonPagination([slide(2), slide(4, null)], 3), { lesson: 'presentazione-corso', page: 0, total: 2 })
  assert.deepEqual(lessonPagination([], 1), { lesson: 'presentazione-corso', page: 0, total: 0 })
})

test('shares the same index across layout and progress consumers', () => {
  const slides = ref([slide(1, 'apertura'), slide(2), slide(3)])
  const first = useLessonPagination(slides, 2)
  const second = useLessonPagination(() => slides.value, ref(2))
  assert.strictEqual(first.value, second.value)
})

test('invalidates totals and positions when slide metadata or deck structure changes', () => {
  const slides = ref([slide(1), slide(2, 'introduzione'), slide(3)])
  const pagination = useLessonPagination(slides, 3)
  assert.deepEqual(pagination.value, { lesson: 'presentazione-corso', page: 2, total: 2 })
  slides.value[1].meta.slide.frontmatter.lesson = 'presentazione-corso'
  assert.deepEqual(pagination.value, { lesson: 'presentazione-corso', page: 3, total: 3 })
  slides.value.push(slide(4))
  assert.deepEqual(pagination.value, { lesson: 'presentazione-corso', page: 3, total: 4 })
  slides.value.splice(0, 1)
  assert.deepEqual(pagination.value, { lesson: 'presentazione-corso', page: 2, total: 3 })
})

test('uses the new deck after replacement and reacts to the requested page', () => {
  const slides = ref([slide(1), slide(2)])
  const current = ref(2)
  const pagination = useLessonPagination(slides, current)
  assert.deepEqual(pagination.value, { lesson: 'presentazione-corso', page: 2, total: 2 })
  slides.value = [slide(1, 'apertura'), slide(2, 'introduzione'), slide(3, 'introduzione')]
  assert.deepEqual(pagination.value, { lesson: 'introduzione', page: 1, total: 2 })
  current.value = 3
  assert.deepEqual(pagination.value, { lesson: 'introduzione', page: 2, total: 2 })
})
