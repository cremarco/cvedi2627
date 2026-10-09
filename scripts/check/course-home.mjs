import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-chromium'

const directory = path.resolve(process.env.COURSE_HOME_SITE || '_site')
const output = process.env.COURSE_HOME_REPORT || 'reports/course-home'
await mkdir(output, { recursive: true })
const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
const serve = require('sirv')(directory, { dev: true })
const server = createServer((request, response) => {
  if (request.url.startsWith('/cvedi2627/')) request.url = request.url.slice('/cvedi2627'.length)
  serve(request, response, () => response.writeHead(404).end())
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({ headless: true })
const report = { status: 'running', cases: [], errors: [] }
const record = (name, details = {}) => report.cases.push({ name, ...details })
try {
  const html = await readFile(path.join(directory, 'index.html'), 'utf8')
  assert.ok(!/http-equiv=["']refresh/i.test(html), 'the home never redirects to the slides')
  assert.ok(!/localhost|127\.0\.0\.1/.test(html), 'published navigation contains no local addresses')
  for (const prefix of ['/', '/cvedi2627/']) {
    for (const width of [1440, 1280, 768, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
      page.on('pageerror', error => report.errors.push(error.message))
      page.on('response', response => { if (response.status() >= 400) report.errors.push(`${response.status()}: ${response.url()}`) })
      const response = await page.goto(base + prefix)
      assert.equal(response.status(), 200)
      await page.evaluate(() => document.fonts.ready)
      assert.equal(await page.locator('h1').count(), 1)
      assert.match(await page.locator('h1').innerText(), /Comunicazione\s+visiva e design\s+delle interfacce/)
      const metrics = await page.evaluate(() => {
        const title = document.querySelector('h1')
        const nav = document.querySelector('.station-nav')
        return { scrollWidth: document.documentElement.scrollWidth, width: innerWidth,
          titleRight: title.getBoundingClientRect().right, fontSize: getComputedStyle(title).fontSize,
          navBottom: nav.getBoundingClientRect().bottom, motion: document.documentElement.dataset.motion }
      })
      assert.ok(metrics.scrollWidth <= width + 1, `no horizontal overflow at ${width}`)
      assert.ok(metrics.titleRight <= width, 'title fits the viewport')
      assert.equal(metrics.motion, 'static')
      const contrasts = await page.locator('.academic-year,.station-label').evaluateAll(elements => {
        const luminance = color => {
          const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => value / 255)
          return rgb.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
            .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
        }
        return elements.map(element => {
          const style = getComputedStyle(element)
          const foreground = luminance(style.color), background = luminance(style.backgroundColor)
          return { text: element.textContent, background: style.backgroundColor,
            ratio: (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05) }
        })
      })
      for (const contrast of contrasts) {
        assert.ok(!contrast.background.startsWith('rgba'), 'route labels have an opaque reading surface')
        assert.ok(contrast.ratio >= 4.5, `${contrast.text}: small text stays readable over the animated tracks`)
      }
      assert.equal(await page.locator('.motion-toggle').isVisible(), false)
      assert.equal(await page.locator('.metro-route').count(), 23, 'original route geometry is preserved')
      assert.equal(await page.locator('.destination[href]').count(), 3)
      assert.match(await page.locator('.destination-pending').innerText(), /iLMeteo[\s\S]*in preparazione/)
      for (const href of ['slides/', 'project/', 'web-design-examples/index.html?stile=liquid']) {
        assert.ok(await page.locator(`.destination[href="${href}"]`).isVisible())
        const target = new URL(href, base + prefix)
        assert.equal((await fetch(target)).status, 200, `destination ${target.pathname}`)
      }
      if (prefix === '/' && [1440, 768, 390, 320].includes(width))
        await page.screenshot({ path: `${output}/home-${width}.png`, fullPage: true })
      record(`layout ${prefix} ${width}`, { ...metrics, minimumHeroTextContrast: Math.min(...contrasts.map(value => value.ratio)) })
      await page.close()
    }
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(base + '/cvedi2627/')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() => [...document.querySelectorAll('.metro-route')].every(route => parseFloat(getComputedStyle(route).strokeDashoffset) === 0))
  assert.equal(await page.locator('html').getAttribute('data-motion'), 'running')
  const before = await page.locator('.metro-packet').first().evaluate(element => getComputedStyle(element).strokeDashoffset)
  await page.waitForTimeout(150)
  const after = await page.locator('.metro-packet').first().evaluate(element => getComputedStyle(element).strokeDashoffset)
  assert.notEqual(before, after, 'the segment moves on the original path')
  await page.locator('.motion-toggle').click()
  assert.equal(await page.locator('html').getAttribute('data-motion'), 'paused')
  assert.equal(await page.locator('.motion-toggle').getAttribute('aria-pressed'), 'true')
  const paused = await page.locator('.metro-packet').first().evaluate(element => getComputedStyle(element).strokeDashoffset)
  await page.waitForTimeout(150)
  assert.equal(await page.locator('.metro-packet').first().evaluate(element => getComputedStyle(element).strokeDashoffset), paused)
  await page.screenshot({ path: `${output}/home-motion-paused.png`, fullPage: true })
  await page.locator('.motion-toggle').click()
  assert.equal(await page.locator('html').getAttribute('data-motion'), 'running')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'static')
  assert.equal(await page.locator('html').getAttribute('data-motion'), 'static')
  assert.equal(await page.locator('.metro-packet').first().evaluate(element => getComputedStyle(element).animationName), 'none')
  record('motion, pause, resume and live reduced-motion preference')
  await page.keyboard.press('Tab')
  await page.goto(base + '/')
  await page.keyboard.press('Tab')
  assert.equal(await page.locator('.skip-link').evaluate(element => element === document.activeElement), true)
  await page.keyboard.press('Enter')
  assert.ok((await page.locator('#percorsi').boundingBox()).y < 200, 'skip link reaches the destinations')
  record('keyboard skip link')
  await page.emulateMedia({ forcedColors: 'active' })
  assert.equal(await page.locator('.metro-scene').isVisible(), false)
  record('forced colors')
  await page.emulateMedia({ forcedColors: 'none', media: 'print' })
  await page.goto(base + '/')
  assert.equal(await page.locator('.metro-scene').isVisible(), false)
  assert.equal(await page.locator('.destination[href]').count(), 3)
  await page.screenshot({ path: `${output}/home-print.png`, fullPage: true })
  await page.pdf({ path: `${output}/home-print.pdf`, format: 'A4', printBackground: true })
  record('print')
  await page.close()
  const noScript = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  await noScript.goto(base + '/')
  assert.equal(await noScript.locator('h1').isVisible(), true)
  assert.equal(await noScript.locator('.motion-toggle').isVisible(), false)
  assert.equal(await noScript.locator('.destination[href]').count(), 3)
  record('static page without JavaScript')
  await noScript.close()
  assert.deepEqual(report.errors, [])
  report.status = 'passed'
  console.log(JSON.stringify({ status: report.status, cases: report.cases.length, errors: report.errors }))
} catch (error) {
  report.status = 'failed'
  report.errors.push(error.message)
  process.exitCode = 1
  console.error(error)
} finally {
  await writeFile(`${output}/verification.json`, JSON.stringify(report, null, 2) + '\n')
  await browser.close()
  await new Promise(resolve => server.close(resolve))
}
