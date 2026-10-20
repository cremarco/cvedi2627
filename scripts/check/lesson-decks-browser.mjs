import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'
import { deckCatalog } from '../build/lesson-decks.mjs'
import { lessonAssetInventory } from './lesson-deck-assets.mjs'

const site = path.resolve(process.env.DECK_SITE || 'dist'), prefix = process.env.DECK_BASE || '/'
const output = path.resolve(process.env.DECK_REPORT || 'reports/lesson-decks/browser')
await mkdir(output, { recursive: true })
const local = Boolean(process.env.DECK_URL)
const catalog = local ? await deckCatalog('dev') : JSON.parse(await readFile(path.join(site, 'decks.json'), 'utf8'))
const inventory = await lessonAssetInventory(local ? 'dev' : 'build')
let server, base = process.env.DECK_URL
if (!base) {
  const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
  const serve = require('sirv')(site, { dev: true })
  server = createServer((req, res) => {
    if (!req.url.startsWith(prefix)) { res.writeHead(404).end(); return }
    req.url = '/' + req.url.slice(prefix.length)
    serve(req, res, () => res.writeHead(404).end())
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  base = `http://127.0.0.1:${server.address().port}${prefix}`
}
base = base.replace(/\/?$/, '/')
const browser = await chromium.launch()
const report = { status: 'running', mode: local ? 'dev' : 'build', decks: [], profiles: [], errors: [], failedRequests: [] }
function trackErrors(page) {
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') report.errors.push(error.message) })
  page.on('response', response => { if (response.status() >= 400) report.failedRequests.push({ status: response.status(), url: response.url() }) })
}
function imagePath(url) {
  const pathname = decodeURIComponent(new URL(url).pathname), index = pathname.indexOf('/images/')
  return index < 0 ? undefined : pathname.slice(index)
}
async function assertOwner(page, owner) {
  const owners = await page.locator('.slidev-layout[data-lesson]').evaluateAll(nodes => [...new Set(nodes.map(node => node.dataset.lesson))])
  assert.deepEqual(owners, [owner], 'Mounted slides belong only to the selected presentation')
  assert.equal(await page.locator('link[rel="preload"][as="image"]').count(), 0, 'No global image preload')
}
async function navigationMetrics(page) {
  const link = page.getByRole('link', { name: 'Torna al menu delle lezioni', exact: true })
  await link.waitFor({ state: 'visible' })
  const box = await link.boundingBox()
  assert.ok(box.width >= 44 && box.height >= 44, 'Menu link has a touch target of at least 44px')
  assert.ok(box.x >= 0 && box.y >= 0 && box.x + box.width <= page.viewportSize().width, 'Menu link fits the viewport')
  assert.equal(await link.innerText(), 'Menu lezioni', 'Destination is visible without hovering')
  await page.keyboard.press('Tab')
  await link.focus()
  assert.equal(await link.evaluate(node => node.matches(':focus-visible')), true, 'Keyboard focus is visible')
  const outline = await link.evaluate(node => getComputedStyle(node).outlineWidth)
  assert.ok(parseFloat(outline) >= 2)
  async function contrast() {
    return link.evaluate(node => {
      const style = getComputedStyle(node), context = document.createElement('canvas').getContext('2d')
      function luminance(color) {
        context.fillStyle = color; context.fillRect(0, 0, 1, 1)
        return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map(value => {
          const c = value / 255
          return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4
        }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
      }
      const [low, high] = [luminance(style.color), luminance(style.backgroundColor)].sort((a, b) => a - b)
      return (high + .05) / (low + .05)
    })
  }
  const normalContrast = await contrast()
  await link.hover()
  await link.evaluate(node => Promise.all(node.getAnimations().map(animation => animation.finished.catch(() => {}))))
  const hoverContrast = await contrast()
  assert.ok(Math.min(normalContrast, hoverContrast) >= 4.5, 'Menu text meets AA contrast in normal and hover states')
  await page.mouse.move(200, 0)
  return { width: box.width, height: box.height, normalContrast, hoverContrast }
}
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  trackErrors(page)
  for (const [profile, viewport] of [['desktop', { width: 1280, height: 720 }], ['narrow', { width: 636, height: 778 }]]) {
    await page.setViewportSize(viewport)
    const menu = await openSlide(page, base, 3, { settle: true })
    await assertOwner(page, 'apertura')
    assert.equal(await menu.locator('.index-grid a').count(), catalog.decks.filter(deck => deck.id !== 'apertura' && !deck.id.startsWith('esercitazione-')).length)
    assert.equal(await page.locator('.lesson-deck-menu').count(), 0, 'Menu does not link to itself')
    const bounds = await menu.locator('.index-grid a').evaluateAll(nodes => nodes.map(node => {
      const box = node.getBoundingClientRect(), root = node.closest('.slidev-layout').getBoundingClientRect()
      return box.left >= root.left && box.right <= root.right + 1 && box.top >= root.top && box.bottom <= root.bottom
    }))
    assert.ok(bounds.every(Boolean), 'All menu destinations fit the canvas')
    await page.screenshot({ path: path.join(output, `menu-${profile}.png`), animations: 'disabled' })
    // Test the menu control on both a cover and an ordinary slide at each size.
    const colorBase = `${base}lezioni/colore/`
    const cover = await openSlide(page, colorBase, 1, { settle: true })
    const control = await navigationMetrics(page)
    const overlap = await cover.locator('h1').evaluate(heading => {
      const a = heading.getBoundingClientRect(), b = document.querySelector('.lesson-deck-menu').getBoundingClientRect()
      return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    })
    assert.equal(overlap, false, 'Menu control does not overlap the cover title')
    await page.screenshot({ path: path.join(output, `navigation-cover-${profile}.png`), animations: 'disabled' })
    await openSlide(page, colorBase, 2, { settle: true })
    await navigationMetrics(page)
    await page.screenshot({ path: path.join(output, `navigation-content-${profile}.png`), animations: 'disabled' })
    await page.getByRole('link', { name: 'Torna al menu delle lezioni', exact: true }).click()
    await page.waitForURL(`${base}#/3`)
    report.profiles.push({ profile, links: bounds.length, control })
  }
  await page.emulateMedia({ media: 'print' })
  await openSlide(page, `${base}lezioni/colore/`, 2, { settle: true })
  assert.equal(await page.locator('.lesson-deck-menu').isVisible(), false, 'Menu control is omitted in print')
  await page.screenshot({ path: path.join(output, 'navigation-print.png'), animations: 'disabled' })
  await page.close()

  const requestedDecks = process.env.DECK_IDS?.split(',')
  for (const deck of catalog.decks.filter(deck => deck.id !== 'apertura' && (!requestedDecks || requestedDecks.includes(deck.id)))) {
    // A fresh context for every lesson prevents a warm cache from masking requests.
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
    trackErrors(page)
    let phase = 'menu'
    const requests = []
    page.on('request', request => requests.push({ phase, type: request.resourceType(), url: request.url() }))
    const exercise = deck.id.startsWith('esercitazione-')
    const menuTarget = exercise ? 'indice-esercitazioni' : 3
    const menu = await openSlide(page, base, menuTarget, { settle: true })
    phase = 'lesson'
    await menu.locator(`a[href$="#/${deck.alias}"]`).click()
    await page.waitForURL(`**/lezioni/${deck.id}/**`)
    await page.locator('.slidev-page-1 .slidev-layout').waitFor({ state: 'visible' })
    await assertOwner(page, deck.lesson)
    const lessonBase = `${base}lezioni/${deck.id}/`
    const second = await openSlide(page, lessonBase, 2, { settle: true })
    assert.equal(await second.locator('.slide-index').textContent(), `2 / ${deck.slides.length}`)
    const fixture = inventory.get(deck.id).slides.find(slide => slide.no > 2 && slide.images > 0)
    if (fixture) await openSlide(page, lessonBase, fixture.no, { settle: true })
    const last = await openSlide(page, lessonBase, deck.slides.length, { settle: true })
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(120)
    assert.equal(await last.isVisible(), true, 'Last slide stays inside its own presentation')
    await assertOwner(page, deck.lesson)
    const scripts = requests.filter(request => request.phase === 'lesson' && request.type === 'script')
    assert.ok(scripts.every(request => !new URL(request.url).pathname.includes('/lezioni/') || new URL(request.url).pathname.includes(`/lezioni/${deck.id}/`)), 'Only selected lesson scripts are requested')
    const allowedImages = inventory.get(deck.id).images
    const lessonImages = [...new Set(requests.filter(request => request.phase === 'lesson' && request.type === 'image').map(request => imagePath(request.url)).filter(Boolean))]
    for (const image of lessonImages) assert.ok(allowedImages.has(image), `${deck.id}: image belongs to selected lesson: ${image}`)
    if (fixture) assert.ok(lessonImages.length > 0, `${deck.id}: image-bearing fixture actually downloads media`)
    phase = 'return'
    const returnLink = page.getByRole('link', { name: `Torna al menu delle ${exercise ? 'esercitazioni' : 'lezioni'}`, exact: true })
    assert.equal(await returnLink.getAttribute('href'), `${local ? '/' : prefix}#/${menuTarget}`)
    if (report.decks.length % 2 === 0) { await returnLink.focus(); await page.keyboard.press('Enter') }
    else await returnLink.click()
    await page.waitForURL(`${base}#/${menuTarget}`)
    await page.getByRole('heading', { name: `Indice delle ${exercise ? 'esercitazioni' : 'lezioni'}`, exact: true }).waitFor()
    await assertOwner(page, 'apertura')
    for (const request of requests.filter(request => request.phase !== 'lesson' && request.type === 'image')) {
      const image = imagePath(request.url)
      if (image) assert.ok(inventory.get('apertura').images.has(image), 'Returning to menu does not load lesson images')
    }
    await writeFile(path.join(output, `${deck.id}-requests.json`), JSON.stringify(requests, null, 2) + '\n')
    report.decks.push({ id: deck.id, slides: deck.slides.length, scripts: scripts.length, images: lessonImages.length, imageFixture: fixture?.no, returnBy: report.decks.length % 2 === 0 ? 'keyboard' : 'mouse' })
    console.log(`${deck.id}: ${deck.slides.length} slides, ${lessonImages.length} lesson images; return passed`)
    await page.close()
  }
  const legacy = await browser.newPage()
  trackErrors(legacy)
  await legacy.goto(`${base}#/colore-schema-analogo`)
  await legacy.waitForURL('**/lezioni/colore/#/colore-schema-analogo')
  await legacy.getByRole('heading', { name: 'Schema analogo', exact: true }).waitFor()
  const number = Object.entries(catalog.legacy).find(([number, route]) => /^\d+$/.test(number) && route.deck === 'gestalt')
  await legacy.goto(`${base}#/${number[0]}`)
  await legacy.waitForURL(`**/lezioni/gestalt/#/${number[1].target}`)
  assert.deepEqual(report.errors, [])
  assert.deepEqual(report.failedRequests, [])
  report.status = 'passed'
} finally {
  await browser.close()
  if (server) await new Promise(resolve => server.close(resolve))
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n')
}
console.log(JSON.stringify(report, null, 2))
