import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-chromium'

const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
const serve = require('sirv')(path.resolve('dist'), { dev: true })
const server = createServer((request, response) => {
  if (request.url.startsWith('/cvedi2627/')) request.url = request.url.slice('/cvedi2627'.length)
  serve(request, response, () => { response.writeHead(404).end() })
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const staticBase = `http://127.0.0.1:${server.address().port}`
const output = process.env.WEB_EXAMPLES_REPORT || 'reports/web-design-examples'
await mkdir(output, { recursive: true })
const styles = JSON.parse(await readFile('esempi/caffe-luce/stili.json', 'utf8')).styles
const pages = ['index.html', 'menu.html', 'locale.html', 'contatti.html']
const profiles = [
  { name: 'dev', base: (process.env.SLIDEV_URL || 'http://localhost:3049') + '/web-design-examples/' },
  { name: 'build', base: staticBase + '/web-design-examples/' },
  { name: 'pages', base: staticBase + '/cvedi2627/web-design-examples/' },
]
const browser = await chromium.launch({ headless: true })
const report = { status: 'running', cases: [], errors: [] }
try {
  for (const profile of profiles) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
    page.on('pageerror', error => report.errors.push(`${profile.name}: ${error.message}`))
    page.on('response', response => {
      if (response.status() >= 400) report.errors.push(`${profile.name}: ${response.status()} ${response.url()}`)
    })
    for (const [index, style] of styles.entries()) {
      const file = pages[index % pages.length]
      const response = await page.goto(`${profile.base}${file}?stile=${style.id}`)
      assert.equal(response.status(), 200, `${profile.name}: ${file}`)
      await page.waitForFunction(id => document.querySelector('#cafe')?.dataset.ready === 'true'
        && document.querySelector('#cafe')?.dataset.style === id, style.id)
      await page.evaluate(() => document.fonts.ready)
      await page.waitForFunction(() => [...document.images].filter(image => image.getAttribute('src'))
        .every(image => image.complete && image.naturalWidth > 0))
      assert.equal(await page.locator('#style-select option').count(), styles.length)
      assert.equal(await page.locator('#load-error').isVisible(), false)
      const links = await page.locator('#cafe a[href]').evaluateAll(links => links
        .filter(link => /(?:index|menu|locale|contatti)\.html/.test(link.getAttribute('href')))
        .map(link => ({ href: link.href, keepsStyle: link.matches('.cafe-nav a, .cafe-brand') })))
      assert.ok(links.length > 0)
      for (const link of links) {
        assert.ok(link.href.startsWith(profile.base), `${profile.name}: page navigation retains its directory`)
        if (link.keepsStyle)
          assert.equal(new URL(link.href).searchParams.get('stile'), style.id, 'page navigation retains the selected style')
      }
      report.cases.push({ profile: profile.name, file, style: style.id })
    }
    // Exercise actual navigation, including query persistence between destinations.
    await page.goto(profile.base + 'index.html?stile=y2k')
    await page.waitForFunction(() => document.querySelector('#cafe')?.dataset.ready === 'true')
    await page.locator('.cafe-nav a[href^="menu.html"]').click()
    await page.waitForFunction(() => document.querySelector('#cafe')?.dataset.page === 'menu'
      && document.querySelector('#cafe')?.dataset.ready === 'true')
    assert.ok(page.url().startsWith(profile.base + 'menu.html?stile=y2k'))
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(profile.base + 'index.html?stile=flat')
    await page.waitForFunction(() => document.querySelector('#cafe')?.dataset.ready === 'true')
    await page.screenshot({ path: `${output}/${profile.name}-mobile.png` })
    await page.emulateMedia({ media: 'print' })
    assert.ok((await page.locator('#cafe').innerText()).includes('Caffè TTC'))
    await page.close()
  }
  const response = await fetch(profiles[0].base.slice(0, -1) + '?stile=html', { redirect: 'manual' })
  assert.equal(response.status, 308, 'bare directory redirects before relative navigation')
  assert.equal(response.headers.get('location'), '/web-design-examples/?stile=html', 'redirect preserves the selected style')
  const missing = await fetch(profiles[0].base + 'missing.js')
  assert.equal(missing.status, 404, 'missing example resources never fall back to Slidev')
  assert.deepEqual(report.errors, [], 'every requested image, font and script is available')
  report.status = 'passed'
  await writeFile(`${output}/route-check.json`, JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify({ status: report.status, profiles: profiles.length, styles: styles.length,
    pages: pages.length, cases: report.cases.length, errors: report.errors }, null, 2))
} finally {
  await browser.close()
  await new Promise(resolve => server.close(resolve))
}
