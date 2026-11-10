import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
const site = process.env.DECK_SITE || 'progetti/slide/dist'
const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
// No SPA fallback: refreshes must be served by real static entries, as on Pages.
const serve = require('sirv')(site, { dev: true })
const server = createServer((request, response) => serve(request, response, () => response.writeHead(404).end()))
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}`
const catalog = JSON.parse(await readFile(`${site}/decks.json`, 'utf8'))
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') errors.push(error.message) })
  for (const deck of catalog.decks.filter(deck => deck.id.startsWith('esercitazione-'))) {
    const root = `${base}/lezioni/${deck.id}/`
    for (const route of ['2/', `presenter/${deck.slides.length}/`, `${deck.alias}/`]) {
      assert.equal((await page.request.get(root + route)).status(), 200, 'direct entry exists on a static host')
      await page.goto(root + route)
      await page.locator('.slidev-layout.is-active').first().waitFor()
      assert.equal(new URL(page.url()).hash, '')
      await page.reload()
      await page.locator('.slidev-layout.is-active').first().waitFor()
      assert.equal(new URL(page.url()).hash, '')
    }
    await page.goto(`${root}#/presenter/2?clicks=0`)
    await page.waitForURL(url => url.pathname === new URL(root + 'presenter/2/').pathname && !url.hash)
    await page.locator('[class*="presenter"]').first().waitFor()
    assert.equal(new URL(page.url()).searchParams.get('clicks'), '0')
    await page.goto(root + '2/')
    await page.locator('.slidev-page-2 .slidev-layout').waitFor()
    await page.keyboard.press('ArrowRight')
    await page.waitForURL(url => url.pathname.replace(/\/$/, '').endsWith('/3') && !url.hash)
    await page.goBack()
    await page.waitForURL(url => url.pathname.replace(/\/$/, '').endsWith('/2') && !url.hash)
    await page.goForward()
    await page.waitForURL(url => url.pathname.replace(/\/$/, '').endsWith('/3') && !url.hash)
  }
  await page.goto(`${base}/lezioni/colore/#/2`)
  await page.locator('.slidev-page-2 .slidev-layout').waitFor()
  assert.equal(new URL(page.url()).hash, '#/2', 'theory bookmarks remain unchanged')
  assert.equal((await page.request.get(`${base}/lezioni/colore/presenter/1/`)).status(), 404, 'history entries are scoped to exercises')
  assert.deepEqual(errors, [])
  console.log('Exercise direct entries, refresh, presenter, legacy bookmarks and browser history passed; theory URLs unchanged')
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)) }
