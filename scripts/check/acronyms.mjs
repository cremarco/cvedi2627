import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { annotateAcronyms, splitAcronyms } from '../../utils/acronyms.mjs'
import { loadSlideDeck } from './deck.mjs'
import { openSlide } from './browser.mjs'

const example = 'UX, UI; CSS3 / HTML5. A.A. CVeDI. UXR AA AAA A01 WHAT IF? https://example.org/UI UX@example.org'
assert.equal(splitAcronyms(example).map(part => part.text).join(''), example)
assert.deepEqual(splitAcronyms(example).filter(part => part.expansion).map(part => part.text), ['UX', 'UI', 'CSS3', 'HTML5', 'A.A.', 'CVeDI'])
const excluded = '<pre><code>CSS</code></pre><svg><text>UI</text></svg><p data-no-acronyms>UX</p><p>{{ UI }}</p><script>const UI = "UX"</script>'
assert.equal(annotateAcronyms(excluded), excluded)
const annotated = annotateAcronyms('<p title="UX" data-url="https://example.org/UI">UX <strong>UI</strong></p>')
assert.equal(annotated, '<p title="UX" data-url="https://example.org/UI"><SlideAcronym term="UX" /> <strong><SlideAcronym term="UI" /></strong></p>')
assert.equal(annotateAcronyms(annotated), annotated)

const base = process.env.SLIDEV_URL || 'http://localhost:3035'
const output = process.env.ACRONYMS_REPORT || 'reports/acronyms'
await mkdir(output, { recursive: true })
const deck = await loadSlideDeck()
const browser = await chromium.launch()
const reports = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => { if (!error.message.includes('Wake Lock permission')) errors.push(error.message) })
  const fixtures = ['brief-decisioni', 'introduzione-teorica', 'introduzione-sintesi', 'ux-ui-esperienza', 'approfondimento-a08', 'accessibilita-198-3924-1']
  for (const alias of fixtures) {
    const root = await openSlide(page, base, alias)
    const count = await root.locator('.slide-acronym').count()
    assert.ok(count > 0, `${alias}: glossary is applied`)
    const before = await root.evaluate(root => ({
      text: root.textContent,
      boxes: [...root.querySelectorAll('h1, .card-title, .cvedi-card, .lead, .lesson-caption')].map(el => el.getBoundingClientRect().toJSON()),
    }))
    // Compare actual wrapping and geometry with the original plain text.
    const after = await root.evaluate(root => {
      const originals = [...root.querySelectorAll('.slide-acronym')].map(abbr => {
        const plain = document.createTextNode(abbr.textContent)
        abbr.replaceWith(plain)
        return { abbr, plain }
      })
      const result = { text: root.textContent, boxes: [...root.querySelectorAll('h1, .card-title, .cvedi-card, .lead, .lesson-caption')].map(el => el.getBoundingClientRect().toJSON()) }
      for (const { abbr, plain } of originals) plain.replaceWith(abbr)
      return result
    })
    assert.deepEqual(after, before, `${alias}: content and text layout are unchanged`)
    reports.push({ alias, acronyms: count, unchangedLayout: true })
  }

  for (const [mode, viewport] of [['desktop', { width: 1280, height: 720 }], ['narrow', { width: 636, height: 778 }]]) {
    await page.setViewportSize(viewport)
    const root = await openSlide(page, base, 'brief-decisioni')
    const trigger = root.locator('.card-title .slide-acronym').first()
    await trigger.hover()
    const popup = page.locator('.slide-acronym-tooltip .tooltip-content')
    await popup.waitFor({ state: 'visible' })
    assert.match(await popup.innerText(), /Artificial Intelligence/)
    const style = await trigger.evaluate(el => {
      const own = getComputedStyle(el), parent = getComputedStyle(el.parentElement)
      return { dashed: own.textDecorationStyle, thickness: own.textDecorationThickness, sameFont: own.font === parent.font, sameColor: own.color === parent.color }
    })
    assert.deepEqual(style, { dashed: 'dashed', thickness: '1px', sameFont: true, sameColor: true })
    const bounds = await popup.boundingBox()
    assert.ok(bounds.x >= 11 && bounds.x + bounds.width <= viewport.width - 11 && bounds.y >= 0 && bounds.y + bounds.height <= viewport.height, `${mode}: tooltip fits the viewport`)
    await page.screenshot({ path: `${output}/${mode}-card-hover.png` })
    await popup.hover()
    await page.waitForTimeout(180)
    assert.equal(await popup.count(), 1, 'tooltip remains available under the pointer')
    await page.keyboard.press('Escape')
    assert.equal(await popup.count(), 0, 'Escape dismisses without navigating')
    await page.mouse.move(0, 0)
    await trigger.focus()
    await popup.waitFor({ state: 'visible' })
    await page.keyboard.press('Escape')
    assert.equal(await popup.count(), 0, 'keyboard focus can open and dismiss the tooltip')
    assert.ok(await trigger.evaluate(el => document.activeElement === el), 'Escape preserves focus')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Escape')
    await trigger.hover()
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(180)
    assert.equal(await popup.count(), 0, 'navigation closes the tooltip')
    reports.push({ mode, tooltipBounds: bounds, pointerAndKeyboard: true })
  }

  await page.setViewportSize({ width: 1280, height: 720 })
  let root = await openSlide(page, base, 3)
  const nested = root.locator('button .slide-acronym').first()
  assert.equal(await nested.getAttribute('tabindex'), null, 'acronyms do not nest tab stops inside controls')
  await nested.hover()
  assert.equal(await page.locator('.slide-acronym-tooltip').count(), 1)
  await nested.locator('xpath=ancestor::button').click()
  await page.waitForTimeout(180)
  assert.equal(await page.locator('.slide-acronym-tooltip').count(), 0, 'index navigation still works')

  const wimp = deck.slides.find(slide => slide.title === 'WIMP: quattro elementi coordinati')
  root = await openSlide(page, base, wimp.index + 1)
  await root.locator('.lesson-image-hint').first().click()
  const dialog = page.locator('dialog[open]')
  await dialog.locator('.slide-acronym').first().hover()
  assert.equal(await dialog.locator('.slide-acronym-tooltip').count(), 1, 'tooltip remains in the native dialog top layer')
  await page.keyboard.press('Escape')
  assert.equal(await dialog.count(), 1, 'first Escape dismisses the tooltip only')
  await page.keyboard.press('Escape')
  assert.equal(await dialog.count(), 0, 'second Escape closes the image normally')

  root = await openSlide(page, base, 'ux-ui-esperienza')
  await root.locator('h1 .slide-acronym').first().hover()
  await page.emulateMedia({ media: 'print' })
  assert.equal(await root.locator('.slide-acronym').first().evaluate(el => getComputedStyle(el).textDecorationLine), 'none')
  assert.ok(await page.locator('.slide-acronym-tooltip').count() === 0 || await page.locator('.slide-acronym-tooltip').evaluate(el => getComputedStyle(el).display === 'none'), 'tooltips are absent in print')
  await page.screenshot({ path: `${output}/print.png` })
  await page.emulateMedia({ media: 'screen' })
  assert.deepEqual(errors, [], 'no application errors')
  const report = { status: 'passed', parserIsolation: true, fixtures: reports, indexControls: true, imageDialog: true, print: true }
  await writeFile(`${output}/verification.json`, JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify(report, null, 2))
} finally {
  await browser.close()
}
