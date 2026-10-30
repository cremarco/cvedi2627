import assert from 'node:assert/strict'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from '../../../../scripts/check/browser.mjs'

const map = JSON.parse(await readFile('progetti/slide/data/ux-process-explorer.json', 'utf8'))
const base = (process.env.SLIDEV_URL || 'http://localhost:3048').replace(/\/$/, '')
const lesson = base + '/lezioni/processo-ux-ui'
const output = 'reports/processo-ux-ui-slidev'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = [], errors = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') errors.push(error.message) })
  for (const [mode, viewport] of [['desktop', { width: 1280, height: 720 }], ['narrow', { width: 636, height: 778 }]]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media: 'screen' })
    const root = await openSlide(page, lesson, 'processo-ux-ui-mappa', { settle: true })
    const buttons = root.locator('.ux-explorer-node')
    assert.equal(await buttons.count(), 14)
    assert.equal(await root.locator('.ux-explorer-connections > path').count(), 13, 'all adjacent steps have visible connections')
    const location = page.url()
    for (const step of map.steps) {
      await buttons.filter({ hasText: step.label }).click()
      assert.equal(await root.locator(`.ux-explorer-node[data-step="${step.number}"]`).evaluate(node => document.activeElement === node), true, 'pointer selection keeps focus on the selected step')
      assert.equal(await root.locator(`.ux-explorer-node[data-step="${step.number}"]`).getAttribute('aria-pressed'), 'true')
      assert.equal(await root.locator('.ux-explorer-node[aria-pressed="true"]').count(), 1)
      const detail = root.locator('.ux-explorer-detail')
      assert.ok((await detail.innerText()).includes(step.title))
      for (const text of [step.goal, step.activity, step.output]) assert.ok((await detail.innerText()).includes(text))
      assert.equal(page.url(), location, 'selecting a step does not advance the deck')
      const report = await root.evaluate(root => {
        const canvas = root.getBoundingClientRect(), scale = canvas.width / 1280
        const bottom = root.querySelector('.slide-footer').getBoundingClientRect().top - 12 * scale
        const failures = [], walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        const map = root.querySelector('.ux-explorer-map').getBoundingClientRect()
        const detailElement = root.querySelector('.ux-explorer-detail'), detail = detailElement.getBoundingClientRect()
        const nodeRects = [...root.querySelectorAll('.ux-explorer-node')].map(node => node.getBoundingClientRect())
        const rgb = value => value.match(/[\d.]+/g).slice(0, 3).map(Number)
        const luminance = rgb => rgb.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
        const background = rgb(getComputedStyle(root).backgroundColor)
        const connectionContrast = [...root.querySelectorAll('.ux-explorer-connections > path')].map(path => {
          const css = getComputedStyle(path), opacity = Number(css.opacity)
          const color = rgb(css.stroke).map((value, index) => value * opacity + background[index] * (1 - opacity))
          const values = [luminance(color), luminance(background)].sort((a, b) => b - a)
          return (values[0] + .05) / (values[1] + .05)
        })
        const crossedButtons = [...root.querySelectorAll('.ux-explorer-connections > path')].some(path => {
          const length = path.getTotalLength(), matrix = path.getScreenCTM()
          for (let t = 1; t < 20; t++) {
            const point = path.getPointAtLength(length * t / 20).matrixTransform(matrix)
            if (nodeRects.some(rect => point.x > rect.left + scale && point.x < rect.right - scale && point.y > rect.top + scale && point.y < rect.bottom - scale)) return true
          }
          return false
        })
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim() || node.parentElement.closest('.slide-footer, .sr-only, [aria-hidden="true"]')) continue
          const range = document.createRange(); range.selectNodeContents(node)
          for (const rect of range.getClientRects())
            if (rect.width && (rect.left < canvas.left - 1 || rect.right > canvas.right + 1 || rect.top < canvas.top - 1 || rect.bottom > bottom + 1)) failures.push(node.textContent.trim())
        }
        return {
          failures: [...new Set(failures)],
          sideBySide: detail.left - map.right >= 31.9 * scale && Math.abs(detail.top - map.top) < scale,
          detailFits: detailElement.scrollHeight <= detailElement.clientHeight + 1,
          phaseHeadings: [...root.querySelectorAll('.ux-explorer-phase-title')].map(node => parseFloat(getComputedStyle(node).fontSize)),
          crossedButtons,
          connectionContrast,
          nodes: [...root.querySelectorAll('.ux-explorer-node')].map(node => ({ width: node.getBoundingClientRect().width / scale, height: node.getBoundingClientRect().height / scale, font: parseFloat(getComputedStyle(node).fontSize), selected: node.getAttribute('aria-pressed') === 'true', background: getComputedStyle(node).backgroundColor, color: getComputedStyle(node).color, classes: node.className })),
          fields: [...root.querySelectorAll('.ux-explorer-fields dd')].map(node => parseFloat(getComputedStyle(node).fontSize)),
        }
      })
      reports.push({ mode, step: step.number, ...report })
      assert.deepEqual(report.failures, [], `${mode}/${step.number}: text stays inside the safe area`)
      assert.ok(report.sideBySide && report.detailFits, 'side inspector has room for every selected step')
      assert.ok(report.phaseHeadings.every(font => font === 24), 'phase names use the shared compact heading role')
      assert.equal(report.crossedButtons, false, 'connections stay in the gaps between rows')
      assert.ok(report.connectionContrast.every(value => value >= 3), 'connections keep at least 3:1 contrast')
      assert.ok(report.nodes.every(node => node.width >= 43.99 && node.height >= 43.99 && node.font === 20))
      assert.ok(report.fields.every(font => font === 20), 'detail keeps the shared reading scale')
      assert.notEqual(report.nodes.find(node => node.selected).background, report.nodes.find(node => !node.selected).background, 'selection is immediately visible even with reduced motion')
      if (step.number === 7) await page.screenshot({ path: `${output}/mappa-${mode}-07.png` })
    }
    await page.screenshot({ path: `${output}/mappa-${mode}.png` })
    await root.locator('.ux-explorer-return').click()
    assert.equal(await root.locator('.ux-explorer-node[data-step="4"]').getAttribute('aria-pressed'), 'true', 'the last verification can reopen the problem')
    await root.locator('.ux-explorer-node[data-step="1"]').click()
    await page.keyboard.press('ArrowRight')
    assert.equal(await root.locator('.ux-explorer-node[data-step="2"]').getAttribute('aria-pressed'), 'true')
    await page.keyboard.press('End')
    assert.equal(await root.locator('.ux-explorer-node[data-step="14"]').getAttribute('aria-pressed'), 'true')
    await page.keyboard.press('Home')
    assert.equal(await root.locator('.ux-explorer-node[data-step="1"]').getAttribute('aria-pressed'), 'true')
    await page.keyboard.press('Enter')
    await page.keyboard.press('Space')
    assert.equal(page.url(), location, 'native button activation stays in the graph')
    await page.keyboard.press('Tab')
    assert.equal(await root.locator('.ux-explorer-open').evaluate(node => document.activeElement === node), true, 'Tab leaves the map for the explanation')
    await page.keyboard.press('Tab')
    assert.equal(await root.locator('.ux-explorer-return').evaluate(node => document.activeElement === node), true, 'the return action follows the explanation in keyboard order')
    await page.keyboard.press('Shift+Tab')
    await page.keyboard.press('Enter')
    await page.waitForURL(new RegExp('/#/' + map.steps[0].target + '$'))
    await openSlide(page, lesson, 'processo-ux-ui-mappa')
    await root.locator('.ux-explorer-node[aria-pressed="true"]').focus()
    await page.keyboard.press('Escape')
    await page.keyboard.press('ArrowRight')
    await page.waitForURL(/\/#\/processo-ux-ui-iterazione$/)
    console.log(`UX process map: ${mode}, all 14 steps, iteration, explanation and keyboard passed.`)
  }
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.emulateMedia({ media: 'print' })
  const printed = await openSlide(page, lesson, 'processo-ux-ui-mappa', { settle: true })
  assert.equal(await printed.locator('.ux-explorer-node').count(), 0, 'print has no partially selected interactive view')
  assert.equal(await printed.locator('.ux-explorer-print .lesson-figure img').isVisible(), true, 'all fourteen steps remain in the complete print map')
  await page.screenshot({ path: `${output}/mappa-print.png` })
  await page.emulateMedia({ media: 'screen' })
  await printed.locator('.ux-explorer-node').first().waitFor({ state: 'visible' })
  assert.equal(await printed.locator('.ux-explorer-connections > path').count(), 13, 'connections return after print')
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, reducedMotion: 'reduce' })
  const touchRoot = await openSlide(touch, lesson, 'processo-ux-ui-mappa', { settle: true })
  await touchRoot.locator('.ux-explorer-node[data-step="11"]').tap()
  assert.equal(await touchRoot.locator('.ux-explorer-node[data-step="11"]').getAttribute('aria-pressed'), 'true')
  await touch.close()
  assert.deepEqual(errors, [])
} finally {
  await writeFile(`${output}/mappa-interattiva.json`, JSON.stringify({ reports, errors }, null, 2) + '\n')
  await browser.close()
}
console.log('UX process map: print, touch, desktop, narrow viewport and keyboard passed.')
