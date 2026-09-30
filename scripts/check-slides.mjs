import { chromium } from 'playwright-chromium'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

// Run against a dev server or a served static build. Images are optional QA artifacts.
const baseURL = process.env.SLIDEV_URL || 'http://localhost:3035'
const output = process.env.SLIDEV_SCREENSHOTS
const markdown = await readFile(new URL('../slides.md', import.meta.url), 'utf8')
const total = (markdown.match(/^# /gm) || []).length
const summary = JSON.parse(await readFile(new URL('../data/grade-summary.json', import.meta.url), 'utf8'))
const projects = JSON.parse(await readFile(new URL('../data/projects.json', import.meta.url), 'utf8'))
for (const [category, data] of Object.entries(summary.categories)) {
  assert.equal(data.bins.reduce((a, b) => a + b, 0), data.n, `${category}: total bins`)
  assert.equal(data.byYear.reduce((a, row) => a + row.n, 0), data.n, `${category}: total years`)
  for (const row of data.byYear) assert.equal(row.bins.reduce((a, b) => a + b, 0), row.n, `${category} ${row.year}`)
}
if (output) await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = []
const errors = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  // Headless Chromium cannot keep a display awake; this is a Slidev capability warning.
  page.on('pageerror', error => {
    if (error.message !== 'Wake Lock permission request denied') errors.push(error.message)
  })
  async function inspect(number, narrow = false) {
    await page.goto(`${baseURL.replace(/\/$/, '')}/#/${number}`, { waitUntil: 'networkidle' })
    const slide = page.locator(`.slidev-page-${number} .slidev-layout`)
    await slide.waitFor()
    await page.evaluate(() => document.fonts.ready)
    const report = await slide.evaluate((root, expected) => {
      const box = root.getBoundingClientRect()
      const scale = box.width / 1280
      const footer = root.querySelector('.slide-footer')?.getBoundingClientRect()
      const galleryBar = root.querySelector('.project-gallery-linkbar')?.getBoundingClientRect()
      const violations = []
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent.trim() || node.parentElement.closest('.slide-footer, [aria-hidden="true"]')) continue
        const range = document.createRange()
        range.selectNodeContents(node)
        const inGalleryBar = galleryBar && node.parentElement.closest('h1, .project-gallery-linkbar')
        const topLimit = inGalleryBar ? galleryBar.top : box.top
        const bottomLimit = inGalleryBar ? galleryBar.bottom : footer.top - 12 * scale
        for (const rect of range.getClientRects()) {
          if (!rect.width || !rect.height) continue
          if (rect.left < box.left - 1 || rect.right > box.right + 1 || rect.top < topLimit - 1 || rect.bottom > bottomLimit + 1) {
            violations.push(node.textContent.trim().slice(0, 90))
            break
          }
        }
      }
      const brokenImages = [...root.querySelectorAll('img')].filter(img => !img.complete || !img.naturalWidth).map(img => img.src)
      const backgrounds = [...new Set([...root.querySelectorAll('.cvedi-card')].map(card => getComputedStyle(card).backgroundColor))]
      const title = root.querySelector('h1')
      return {
        page: expected,
        title: title?.textContent.trim(),
        titleTop: Math.round((title.getBoundingClientRect().top - box.top) / scale),
        footer: root.querySelector('.slide-index')?.textContent.trim(),
        headings: root.querySelectorAll('h1').length,
        codeBlocks: root.querySelectorAll('pre').length,
        violations,
        brokenImages,
        backgrounds,
        galleryImages: root.querySelectorAll('.project-gallery img').length,
      }
    }, number)
    assert.equal(report.headings, 1, `slide ${number}: heading`)
    assert.equal(report.footer, `${String(number).padStart(2, '0')} / ${total}`, `slide ${number}: footer`)
    assert.equal(report.codeBlocks, 0, `slide ${number}: unintended code block`)
    assert.equal(report.brokenImages.length, 0, `slide ${number}: missing images`)
    assert.ok(report.backgrounds.length <= 1, `slide ${number}: inconsistent card surfaces`)
    if (number === 44) {
      assert.ok(projects.length >= 12, 'archive: enough project screenshots to cycle')
      assert.equal(report.galleryImages, 12, 'archive: twelve full-screen image windows')
    }
    reports.push({ ...report, narrow })
    if (output) await page.screenshot({ path: `${output}/${narrow ? 'narrow-' : ''}${number}.png` })
  }
  for (let number = 1; number <= total; number++) await inspect(number)
  await page.setViewportSize({ width: 636, height: 778 })
  for (const number of [2, 6, 10, 17, 23, 37, 41, 44]) await inspect(number, true)
  const overset = reports.filter(report => report.violations.length)
  console.log(JSON.stringify({ slides: total, renders: reports.length, errors, overset, reports }, null, 2))
  if (output) await writeFile(`${output}/report.json`, JSON.stringify(reports, null, 2))
  assert.deepEqual(errors, [], 'browser runtime errors')
  assert.equal(overset.length, 0, 'text must remain above the footer safety zone')
} finally {
  await browser.close()
}
