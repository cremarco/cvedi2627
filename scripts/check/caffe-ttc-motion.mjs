import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-chromium'

const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
const serve = require('sirv')(path.resolve('esempi/caffe-luce'), { dev: true })
const server = createServer((request, response) => {
  request.url = request.url.replace(/^\/web-design-examples\//, '/')
  serve(request, response, () => response.writeHead(404).end())
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const base = process.env.CAFFE_MOTION_URL || `http://127.0.0.1:${server.address().port}/web-design-examples/`
const output = process.env.CAFFE_MOTION_REPORT || 'reports/caffe-motion'
const styles = JSON.parse(await readFile('esempi/caffe-luce/stili.json', 'utf8')).styles
const browser = await chromium.launch({ headless: true })
const report = { status: 'running', url: base, cases: [], errors: [] }
const traceKey = 'caffe-motion-check'

async function instrument(page, fallback = false) {
  page.on('pageerror', error => report.errors.push(error.message))
  page.on('response', response => {
    if (response.status() >= 400) report.errors.push(`${response.status()} ${response.url()}`)
  })
  await page.addInitScript(({ traceKey, fallback }) => {
    if (fallback) document.startViewTransition = undefined
    window.motionTrace = []
    new MutationObserver(records => {
      for (const record of records) {
        if (record.target !== document.documentElement || !['data-cafe-motion', 'data-cafe-navigation'].includes(record.attributeName)) continue
        for (const value of [record.oldValue, record.target.getAttribute(record.attributeName)]) {
          if (value) window.motionTrace.push(value)
        }
      }
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true })
    window.addEventListener('click', event => {
      const link = event.target.closest?.('a[href]')
      if (!link || !/\/(index|menu|locale|contatti)\.html$/.test(new URL(link.href).pathname)) return
      sessionStorage.setItem(traceKey, JSON.stringify({
        prevented: event.defaultPrevented,
        navigation: document.documentElement.dataset.cafeNavigation || null,
        handoff: sessionStorage.getItem('caffe-ttc-page-transition'),
      }))
    })
  }, { traceKey, fallback })
}

async function ready(page, style) {
  await page.waitForFunction(id => document.querySelector('#cafe')?.dataset.ready === 'true'
    && document.querySelector('#cafe')?.dataset.style === id, style)
}

async function idle(page) {
  await page.waitForFunction(() => !document.documentElement.dataset.cafeMotion
    && !document.documentElement.dataset.cafeNavigation)
}

async function navigate(page, file, style, href = `${file}?stile=${style}`) {
  // These are the same source links preserved by app.js, including variants
  // whose own scene replaces the ordinary header navigation.
  await Promise.all([
    page.waitForURL(url => url.pathname.endsWith('/' + file)),
    page.locator(`#cafe a[href^="${file}"]`).first().evaluate((link, href) => {
      link.setAttribute('href', href)
      link.click()
    }, href),
  ])
  await ready(page, style)
  return page.evaluate(key => ({ click: JSON.parse(sessionStorage.getItem(key)), arrival: window.motionTrace }), traceKey)
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' })
  await instrument(page)
  for (const style of styles) {
    await page.goto(base + 'index.html?stile=' + style.id)
    await ready(page, style.id)
    assert.deepEqual(await page.evaluate(() => window.motionTrace), [], `${style.id}: direct opening is static`)
    for (const file of ['menu.html', 'locale.html', 'contatti.html', 'index.html']) {
      const trace = await navigate(page, file, style.id)
      assert.deepEqual(trace, { click: { prevented: false, navigation: null, handoff: null }, arrival: [] }, `${style.id}/${file}: native same-style navigation`)
      report.cases.push({ style: style.id, page: file, transition: false })
    }
  }

  // Missing or unknown style parameters resolve to Flat, as in app.js.
  await page.goto(base + 'index.html?stile=flat')
  await ready(page, 'flat')
  for (const href of ['menu.html', 'locale.html?stile=unknown']) {
    const file = href.split('?')[0]
    const trace = await navigate(page, file, 'flat', href)
    assert.equal(trace.click.prevented, false)
    assert.deepEqual(trace.arrival, [])
  }
  await page.reload()
  await ready(page, 'flat')
  assert.deepEqual(await page.evaluate(() => window.motionTrace), [], 'reload is static')

  // Old versions handed off every page click. Discard those pending records.
  await page.evaluate(url => sessionStorage.setItem('caffe-ttc-page-transition', JSON.stringify({
    to: url, color: '#1648ac', created: Date.now(),
  })), base + 'index.html?stile=flat')
  await page.goto(base + 'index.html?stile=flat')
  await ready(page, 'flat')
  assert.deepEqual(await page.evaluate(() => window.motionTrace), [], 'legacy handoff is ignored')

  // Links that change the visual world still get the shared curtain.
  const crossStyle = await navigate(page, 'menu.html', 'material', 'menu.html?stile=material')
  assert.equal(crossStyle.click.prevented, true)
  assert.equal(crossStyle.click.navigation, 'leaving')
  assert.ok(crossStyle.arrival.includes('arriving'))
  assert.ok(crossStyle.arrival.includes('revealing'))
  await idle(page)
  report.cases.push({ interaction: 'cross-style-link', transition: true })

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    await page.evaluate(() => { window.motionTrace = [] })
    await page.locator('#style-select').selectOption('flat')
    await ready(page, 'flat')
    await idle(page)
    assert.ok((await page.evaluate(() => window.motionTrace)).includes('style'), 'selector animates the style change')
    await page.evaluate(() => { window.motionTrace = [] })
    await page.locator('#style-select').selectOption('flat')
    await ready(page, 'flat')
    assert.deepEqual(await page.evaluate(() => window.motionTrace), [], 'selecting the current style is static')
    await page.locator('#style-select').selectOption('material')
    await ready(page, 'material')
    await idle(page)
    report.cases.push({ interaction: 'style-select', viewport, transition: true })
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.evaluate(() => { window.motionTrace = [] })
  await page.locator('#style-select').selectOption('flat')
  await ready(page, 'flat')
  assert.deepEqual(await page.evaluate(() => window.motionTrace), [], 'reduced motion omits the transition')
  await page.close()

  const fallback = await browser.newPage({ reducedMotion: 'no-preference' })
  await instrument(fallback, true)
  await fallback.goto(base + 'index.html?stile=flat')
  await ready(fallback, 'flat')
  await fallback.locator('#style-select').selectOption('material')
  await ready(fallback, 'material')
  await idle(fallback)
  const fallbackTrace = await fallback.evaluate(() => window.motionTrace)
  assert.ok(fallbackTrace.includes('style-cover'))
  assert.ok(fallbackTrace.includes('style-reveal'))
  const sameStyle = await navigate(fallback, 'menu.html', 'material')
  assert.equal(sameStyle.click.prevented, false)
  assert.deepEqual(sameStyle.arrival, [])
  await fallback.close()
  report.cases.push({ interaction: 'fallback-style-select', transition: true })
  assert.deepEqual(report.errors, [])
  report.status = 'passed'
  console.log(JSON.stringify({ status: report.status, cases: report.cases.length, errors: report.errors }))
} finally {
  await mkdir(output, { recursive: true })
  await writeFile(path.join(output, 'motion-check.json'), JSON.stringify(report, null, 2) + '\n')
  await browser.close()
  await new Promise(resolve => server.close(resolve))
}
