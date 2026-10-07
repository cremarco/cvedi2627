import assert from 'node:assert/strict'
import { chromium } from 'playwright-chromium'
import { checkSlideSources } from './slide-source.mjs'

const { deck, course, lesson, curriculum } = await checkSlideSources()
const base = (process.env.SLIDEV_URL || 'http://localhost:3035').replace(/\/$/, '')
const browser = await chromium.launch()
const checks = []
const colors = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'no-preference' })
  async function sample() {
    return page.locator('.presentation-progress-rail').evaluate(rail => {
      const progress = rail.querySelector('progress')
      const fill = rail.querySelector('.presentation-progress-fill')
      const box = rail.getBoundingClientRect()
      return {
        lesson: rail.dataset.lesson,
        page: progress.value,
        total: progress.max,
        now: Number(progress.getAttribute('aria-valuenow')),
        text: progress.getAttribute('aria-valuetext'),
        fraction: fill.getBoundingClientRect().width / box.width,
        duration: getComputedStyle(fill).transitionDuration,
        centered: Math.abs(box.left - (innerWidth - box.right)) < 1,
      }
    })
  }
  async function waitForCounter(current, total) {
    await page.waitForFunction(({ current, total }) => {
      const p = document.querySelector('.presentation-progress-rail progress')
      return p?.getAttribute('aria-valuetext') === `Slide ${current} di ${total}`
    }, { current, total })
    const s = await sample()
    assert.equal(s.page, current, 'native progress exposes the actual page during animation')
    assert.equal(s.now, current, 'ARIA and native progress agree')
    assert.equal(s.total, total)
    assert.ok(s.centered, 'rail remains centered')
    return s
  }
  async function waitForFraction(target) {
    await page.waitForFunction(target => {
      const rail = document.querySelector('.presentation-progress-rail')
      const fill = rail?.querySelector('.presentation-progress-fill')
      return fill && Math.abs(fill.getBoundingClientRect().width / rail.getBoundingClientRect().width - target) < .001
    }, target)
  }

  await page.goto(`${base}/#/apertura`, { waitUntil: 'networkidle' })
  await waitForCounter(1, 6)
  const initialFill = await page.locator('.presentation-progress-fill').elementHandle()
  await page.keyboard.press('ArrowRight')
  await waitForCounter(2, 6)
  assert.ok(await initialFill.evaluate(fill => fill === document.querySelector('.presentation-progress-fill')), 'same set retains its animated element')
  await waitForFraction(2 / 6)
  checks.push('accessible counter updates independently of animation')

  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowLeft')
  await waitForCounter(3, 6)
  await waitForFraction(3 / 6)
  checks.push('rapid forward and backward navigation settles correctly')

  await page.goto(`${base}/#/presentazione-corso`)
  const courseState = await waitForCounter(1, course.length)
  assert.ok(Math.abs(courseState.fraction - 1 / course.length) < .001, 'new set jumps to its own initial fraction')
  assert.equal(await initialFill.evaluate(fill => fill.isConnected), false, 'previous set animation is replaced')
  checks.push('set changes reset without an old-set transition')

  await page.goto(`${base}/#/${deck.slides.at(-1).index + 1}`)
  await waitForCounter(course.length, course.length)
  await waitForFraction(1)
  checks.push('non-contiguous closing reaches 100 percent of its own set')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(`${base}/#/introduzione-teorica`)
  await waitForCounter(1, lesson.length)
  await page.keyboard.press('ArrowRight')
  const reduced = await waitForCounter(2, lesson.length)
  assert.equal(reduced.duration, '0s')
  assert.ok(Math.abs(reduced.fraction - 2 / lesson.length) < .001)
  checks.push('reduced motion is immediate')

  await page.emulateMedia({ reducedMotion: 'no-preference', media: 'print' })
  await page.keyboard.press('ArrowRight')
  const print = await waitForCounter(3, lesson.length)
  assert.equal(print.duration, '0s')
  assert.ok(Math.abs(print.fraction - 3 / lesson.length) < .001)
  checks.push('print does not animate')

  await page.emulateMedia({ media: 'screen' })
  await page.setViewportSize({ width: 636, height: 778 })
  assert.ok((await sample()).centered)
  checks.push('narrow viewport retains alignment')

  await page.setViewportSize({ width: 1280, height: 720 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const fixtures = deck.slides.filter(slide => String(slide.frontmatter.class).split(/\s+/).some(name => ['chapter-slide', 'cover-slide', 'archive-wall-slide'].includes(name)))
  fixtures.push(...['apertura', 'presentazione-corso', 'brief-progetto', 'approfondimenti', 'introduzione', ...curriculum.lessons.map(lesson => lesson.id)].map(lesson =>
    deck.slides.find(slide => (slide.frontmatter.lesson ?? 'presentazione-corso') === lesson && !String(slide.frontmatter.class).split(/\s+/).includes('chapter-slide') && !String(slide.frontmatter.class).split(/\s+/).includes('cover-slide'))))
  for (const slide of fixtures) {
    assert.ok(slide, 'each visible set has a progress color fixture')
    await page.goto(`${base}/#/${slide.index + 1}`, { waitUntil: 'domcontentloaded' })
    const root = page.locator(`.slidev-page-${slide.index + 1} .slidev-layout`)
    await root.waitFor({ state: 'visible' })
    const result = await page.locator('.presentation-progress-rail').evaluate(rail => {
      const context = document.createElement('canvas').getContext('2d')
      const rgb = color => {
        context.fillStyle = color
        context.fillRect(0, 0, 1, 1)
        return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3)
      }
      const luminance = rgb => rgb.map(value => {
        const c = value / 255
        return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4
      }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
      const fill = rgb(getComputedStyle(rail.querySelector('.presentation-progress-fill')).backgroundColor)
      const track = rgb(getComputedStyle(rail).backgroundColor)
      const [low, high] = [luminance(fill), luminance(track)].sort((a, b) => a - b)
      return { lesson: rail.dataset.lesson, onDark: rail.dataset.onDark, fill, track, contrast: (high + .05) / (low + .05) }
    })
    const classes = String(slide.frontmatter.class).split(/\s+/)
    assert.equal(result.onDark, String(classes.includes('chapter-slide') || classes.includes('archive-wall-slide')))
    assert.ok(result.contrast >= 3, `slide ${slide.index + 1}: progress contrast ${result.contrast.toFixed(2)}:1`)
    colors.push({ page: slide.index + 1, ...result })
  }
  checks.push('owning-set accents remain distinguishable at 3:1 or better on light slides and dark covers')
  console.log(JSON.stringify({ status: 'passed', checks, colors }, null, 2))
} finally {
  await browser.close()
}
