import { chromium } from 'playwright-chromium'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { openSlide } from './browser.mjs'

const manifest = JSON.parse(await readFile('assets/theme-imagegen/manifest-outline-v3.json', 'utf8'))
const requestedPages = process.argv.slice(2).map(Number)
assert.ok(requestedPages.every(Number.isInteger), 'focused illustration checks require numeric slide pages')
const jobs = manifest.jobs.filter(job => job.published && (!requestedPages.length || job.owners.some(owner => requestedPages.includes(owner.page))))
const base = process.env.SLIDEV_URL || 'http://127.0.0.1:3047'
const output = process.env.SLIDEV_SCREENSHOTS || 'reports/outline-v3'
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const results = []
try {
  for (const [mode, viewport, media] of [
    ['desktop', { width: 1440, height: 1000 }, 'screen'],
    ['narrow', { width: 636, height: 778 }, 'screen'],
    ['print', { width: 1440, height: 1000 }, 'print'],
  ]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.emulateMedia({ media })
    for (const number of [...new Set(jobs.flatMap(job => job.owners.map(owner => owner.page)))].sort((a, b) => a - b)) {
      const root = await openSlide(page, base, number, { settle: true })
      const expected = jobs.filter(job => job.owners.some(owner => owner.page === number))
      const data = await root.evaluate((root, expectedPaths) => {
        const rect = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom } }
        const stage = rect(root)
        const intersect = (a, b) => ({ x: Math.max(a.x, b.x), y: Math.max(a.y, b.y), right: Math.min(a.right, b.right), bottom: Math.min(a.bottom, b.bottom) })
        const overlaps = (a, b) => a.x < b.right - 1 && a.right > b.x + 1 && a.y < b.bottom - 1 && a.bottom > b.y + 1
        const images = expectedPaths.map(src => {
          const image = [...root.querySelectorAll('img')].find(image => new URL(image.currentSrc || image.src).pathname.endsWith(src))
          if (!image) return { src, found: false }
          const box = rect(image)
          const visible = getComputedStyle(image).display !== 'none' && box.width > 0 && box.height > 0
          const card = image.closest('.cvedi-card, .ux-process-station')
          const visibleBox = card ? intersect(box, rect(card)) : box
          const copy = []
          if (card) {
            const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT)
            while (walker.nextNode()) {
              const node = walker.currentNode
              if (!node.textContent.trim() || node.parentElement.closest('svg, [hidden], [aria-hidden="true"]')) continue
              const range = document.createRange()
              range.selectNodeContents(node)
              for (const r of range.getClientRects())
                if (r.width && r.height) copy.push({ x: r.x, y: r.y, right: r.right, bottom: r.bottom })
            }
          }
          return { src, found: true, loaded: image.complete && image.naturalWidth > 0, naturalSize: [image.naturalWidth, image.naturalHeight], visible, decorative: image.alt === '' && !!image.closest('[aria-hidden="true"]'),
            intentionallyOmitted: !visible && !!card, box, insideSlide: !visible || (visibleBox.x >= stage.x - 1 && visibleBox.y >= stage.y - 1 && visibleBox.right <= stage.right + 1 && visibleBox.bottom <= stage.bottom + 1),
            textOverlap: visible && copy.some(text => overlaps(visibleBox, text)), opacity: getComputedStyle(image).opacity }
        })
        return { stage, images, title: root.querySelector('h1')?.textContent?.trim() }
      }, expected.map(job => '/' + job.web.replace(/^public\//, '')))
      for (const image of data.images) {
        assert.ok(image.found && image.loaded, `${mode} slide ${number}: real image loaded: ${image.src}`)
        assert.ok(image.visible || image.intentionallyOmitted, `${mode} slide ${number}: image visibility: ${image.src}`)
        assert.ok(image.insideSlide, `${mode} slide ${number}: image inside slide: ${image.src}`)
        assert.ok(!image.textOverlap, `${mode} slide ${number}: illustration clear of text: ${image.src}`)
      }
      const zoom = []
      if (mode !== 'print') {
        for (const job of expected.filter(job => job.group === 'figure' && !['renewal-materials', 'syllabus-update'].includes(job.id))) {
          const src = '/' + job.web.replace(/^public\//, '')
          const figure = root.locator('.lesson-figure').filter({ has: page.locator(`img[src$="${src}"]`) })
          const opener = figure.locator('.lesson-image-hint')
          if (!(await opener.count())) {
            const image = data.images.find(image => image.src === src)
            assert.ok(image?.decorative, `${mode} slide ${number}: only a decorative illustration may omit enlargement: ${job.id}`)
            zoom.push({ id: job.id, decorative: true, enlargementIntentionallyAbsent: true })
            continue
          }
          assert.equal(await opener.count(), 1, `${mode} slide ${number}: one shared enlargement control for ${job.id}`)
          await opener.click()
          const dialog = page.locator('dialog[open]')
          await dialog.waitFor({ state: 'visible' })
          const large = dialog.locator('img')
          await large.evaluate(image => image.complete ? undefined : new Promise(resolve => image.addEventListener('load', resolve, { once: true })))
          const enlarged = await large.evaluate(image => {
            const box = image.getBoundingClientRect()
            return { loaded: image.complete && image.naturalWidth > 0, width: box.width, height: box.height, withinViewport: box.top >= -1 && box.bottom <= innerHeight + 1 }
          })
          assert.ok(enlarged.loaded && enlarged.width > 100 && enlarged.height > 60, `${mode} slide ${number}: enlarged image remains readable: ${job.id}`)
          await page.keyboard.press('Escape')
          await dialog.waitFor({ state: 'hidden' })
          assert.ok(await opener.evaluate(button => document.activeElement === button), `${mode} slide ${number}: enlargement returns focus: ${job.id}`)
          zoom.push({ id: job.id, ...enlarged, escapeCloses: true, focusReturns: true })
        }
      }
      const screenshot = `${output}/${mode}-${number}.png`
      await root.screenshot({ path: screenshot, animations: 'disabled' })
      results.push({ mode, page: number, screenshot, zoom, ...data })
    }
    await context.close()
  }
} finally {
  await browser.close()
  await writeFile(`${output}/render-check.json`, JSON.stringify({ publishedImages: jobs.length, results }, null, 2) + '\n')
}
for (const job of jobs) {
  const src = '/' + job.web.replace(/^public\//, '')
  for (const mode of ['desktop', 'narrow', 'print'])
    assert.ok(results.some(result => result.mode === mode && result.images.some(image => image.src === src && image.visible)), `${job.id}: rendered visibly in ${mode}`)
}
console.log(JSON.stringify({ images: jobs.length, slides: new Set(results.map(result => result.page)).size, captures: results.length, output }))
