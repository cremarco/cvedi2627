import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright-chromium'

const folder = path.resolve('esempi/caffe-luce')
const output = path.resolve(process.env.CAFFE_NOTES_REPORT || 'reports/ttc-design-notes')
const styles = JSON.parse(await readFile(path.join(folder, 'stili.json'), 'utf8')).styles
const routes = ['index.html', 'menu.html', 'locale.html', 'contatti.html']
const viewports = [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]
await mkdir(output, { recursive: true })
const report = { status: 'running', cases: [], errors: [], screenshots: [] }
const browser = await chromium.launch({ headless: true })
const accessibilitySessions = new WeakMap()

async function disclosureAccessibility(page) {
  if (!accessibilitySessions.has(page)) accessibilitySessions.set(page, await page.context().newCDPSession(page))
  const session = accessibilitySessions.get(page)
  const { root } = await session.send('DOM.getDocument')
  const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector: '#design-notes summary' })
  const { nodes } = await session.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false })
  return Object.fromEntries(nodes[0].properties.map(property => [property.name, property.value.value]))
}

const url = (route, style) => `${pathToFileURL(path.join(folder, route)).href}?stile=${style}`
async function ready(page, style) {
  await page.waitForFunction(id => document.querySelector('#cafe')?.dataset.ready === 'true' && document.querySelector('#design-notes')?.dataset.style === id, style)
  await page.evaluate(() => document.fonts.ready)
}
async function inspect(page, label) {
  const info = await page.evaluate(() => {
    const notes = document.querySelector('#design-notes')
    const tab = notes.querySelector('summary')
    const panel = notes.querySelector('.design-notes-panel')
    return {
      viewport: { width: innerWidth, height: innerHeight },
      tab: tab.getBoundingClientRect().toJSON(), panel: panel.getBoundingClientRect().toJSON(),
      open: notes.open,
      visible: getComputedStyle(panel).display !== 'none',
      horizontalOverflow: panel.scrollWidth > panel.clientWidth + 1,
      font: getComputedStyle(notes).fontFamily,
      title: notes.querySelector('h2').textContent,
      features: notes.querySelectorAll('dt').length,
      source: notes.querySelector('.design-notes-reference').href,
      animation: getComputedStyle(panel).animationName,
    }
  })
  assert.equal(info.open, true, `${label}: native disclosure opens`)
  const accessibility = await disclosureAccessibility(page)
  assert.equal(accessibility.expanded, true, `${label}: native accessibility state follows disclosure`)
  assert.equal(accessibility.focusable, true, `${label}: native disclosure is focusable`)
  assert.equal(info.visible, true, `${label}: panel is visible`)
  assert.equal(info.features, 4, `${label}: explanation includes four distinct characteristics`)
  assert.ok(info.source.startsWith('https://'), `${label}: source remains accessible`)
  assert.ok(info.tab.width >= 44 && info.tab.height >= 44, `${label}: tab has a usable hit area`)
  assert.ok(info.tab.left >= -1 && info.panel.left >= 0, `${label}: disclosure fits horizontally`)
  assert.ok(Math.abs(info.panel.right - info.viewport.width) <= 1, `${label}: panel touches the viewport edge`)
  assert.ok(info.panel.top >= 0 && info.panel.bottom <= info.viewport.height + 1, `${label}: panel fits vertically`)
  assert.equal(info.horizontalOverflow, false, `${label}: text does not overflow the panel`)
  assert.match(info.font, /Inter/, `${label}: teaching typography stays independent of the skin`)
  return info
}

try {
  await Promise.all(routes.map(async route => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.on('pageerror', error => report.errors.push({ route, error: error.message }))
    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      for (const style of styles) {
        const label = `${route}/${style.id}/${viewport.width}`
        try {
          await page.goto(url(route, style.id))
          await ready(page, style.id)
          const notes = page.locator('#design-notes')
          const tab = notes.locator('summary')
          assert.equal(await notes.evaluate(el => el.open), false, `${label}: closed on arrival`)
          const mainBefore = await page.locator('#cafe').boundingBox()
          await tab.click()
          const info = await inspect(page, label)
          assert.equal(info.title, style.label, `${label}: text matches the active style`)
          assert.equal(info.animation, 'none', `${label}: reduced motion is respected`)
          assert.deepEqual(await page.locator('#cafe').boundingBox(), mainBefore, `${label}: opening does not move the site`)
          await notes.locator('.design-notes-reference').scrollIntoViewIfNeeded()
          await page.emulateMedia({ media: 'print' })
          assert.equal(await notes.evaluate(el => getComputedStyle(el).display), 'none', `${label}: educational control is absent from print`)
          await page.emulateMedia({ media: 'screen' })
          await notes.locator('.design-notes-close').click()
          assert.equal(await notes.evaluate(el => el.open), false, `${label}: close button works`)
          assert.equal(await tab.evaluate(el => el === document.activeElement), true, `${label}: close returns focus to tab`)
          await tab.press('Enter')
          await page.waitForFunction(() => document.querySelector('#design-notes').open)
          await page.keyboard.press('Escape')
          assert.equal(await notes.evaluate(el => el.open), false, `${label}: keyboard opens and closes the disclosure`)
          report.cases.push({ label, status: 'passed' })
        } catch (error) {
          report.errors.push({ label, error: error.message })
        }
      }
    }
    await context.close()
  }))

  const context = await browser.newContext({ viewport: { width: 1032, height: 703 } })
  const page = await context.newPage()
  await page.goto(url('index.html', 'adattabile'))
  await ready(page, 'adattabile')
  await page.locator('#design-notes summary').click()
  await page.waitForTimeout(250)
  const screenshot = path.join(output, 'adattabile-desktop.png')
  await page.screenshot({ path: screenshot })
  report.screenshots.push(screenshot)
  for (const style of ['html', 'spaziale', 'generativa', 'olografica', 'minimal']) {
    await page.locator('#style-select').selectOption(style)
    await ready(page, style)
    await page.waitForFunction(() => !document.getAnimations().some(animation => animation.effect?.pseudoElement?.startsWith('::view-transition')))
    assert.equal(await page.locator('#design-notes').evaluate(el => el.open), true, `switch/${style}: open explanation stays open`)
    assert.equal((await inspect(page, `switch/${style}`)).title, styles.find(entry => entry.id === style).label)
  }
  await page.locator('#cafe-title').click()
  assert.equal(await page.locator('#design-notes').evaluate(el => el.open), false, 'click outside closes the explanation')
  report.cases.push({ label: 'live-style-change-and-outside-close', status: 'passed' })
  await page.setViewportSize({ width: 320, height: 480 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(url('menu.html', 'web2'))
  await ready(page, 'web2')
  await page.locator('#design-notes summary').click()
  await inspect(page, 'short-viewport')
  await page.evaluate(() => scrollTo(700, 600))
  await inspect(page, 'legacy-scroll')
  const mobileScreenshot = path.join(output, 'web2-mobile.png')
  await page.screenshot({ path: mobileScreenshot })
  report.screenshots.push(mobileScreenshot)
  report.cases.push({ label: 'short-viewport-and-legacy-scroll', status: 'passed' })
  await context.close()

  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: viewports[1] })
  const fallback = await noScript.newPage()
  await fallback.goto(url('index.html', 'flat'))
  await fallback.locator('#design-notes summary').click()
  assert.equal(await fallback.locator('#design-notes').evaluate(el => el.open), true, 'native disclosure works without JavaScript')
  assert.equal((await disclosureAccessibility(fallback)).expanded, true, 'no-JavaScript disclosure has a truthful accessibility state')
  assert.equal(await fallback.locator('#design-notes-title').textContent(), styles.find(style => style.id === 'flat').label)
  report.cases.push({ label: 'no-javascript-fallback', status: 'passed' })
  await noScript.close()
  report.status = report.errors.length ? 'failed' : 'passed'
} catch (error) {
  report.status = 'failed'
  report.errors.push({ error: error.message })
} finally {
  await browser.close()
  await writeFile(path.join(output, 'review.json'), `${JSON.stringify(report, null, 2)}\n`)
}
console.log(`Design notes: ${report.cases.length} cases passed; ${report.errors.length} errors. Report: ${output}`)
if (report.errors.length) {
  for (const error of report.errors) console.error(error.label || error.route || 'interaction', error.error)
  process.exitCode = 1
}
