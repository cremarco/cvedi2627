import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { loadSlideDeck } from './deck.mjs'
import { openSlide } from './browser.mjs'

const curriculum = JSON.parse(await readFile(new URL('../../data/ux-curriculum.json', import.meta.url), 'utf8'))
const registry = JSON.parse(await readFile(new URL('../../assets/booklet/capitolo-3/slide-assets.json', import.meta.url), 'utf8'))
const assets = new Map(registry.assets.map(asset => [asset.web, asset]))
const deck = await loadSlideDeck()
const owners = new Set(curriculum.lessons.map(lesson => lesson.id))
const slides = deck.slides.filter(slide => owners.has(slide.frontmatter.lesson))
const base = process.env.SLIDEV_URL || 'http://localhost:3035'
const browser = await chromium.launch()
let figures = 0
let tables = 0
const zoom = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  const index = await openSlide(page, base, 3)
  await page.mouse.move(0, 0)
  await page.evaluate(() => Promise.all(document.getAnimations().filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map(animation => animation.finished.catch(() => {}))))
  const colors = await index.evaluate(root => {
    const context = document.createElement('canvas').getContext('2d')
    const rgb = color => { context.fillStyle = color; context.fillRect(0, 0, 1, 1); return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3) }
    const style = getComputedStyle(root)
    return [...root.querySelectorAll('.index-grid button')].map((button, index) => ({
      text: button.textContent.trim(),
      actual: rgb(getComputedStyle(button).backgroundColor),
      expected: rgb(style.getPropertyValue(`--cvedi-${['red','orange','amber','yellow','blue','lime','green','emerald','teal','cyan','sky'][index]}-800`)),
    }))
  })
  assert.equal(colors.length, 11, 'all local index groups are available')
  for (const color of colors) assert.deepEqual(color.actual, color.expected, `${color.text}: destination palette in the ordered index`)

  for (const slide of slides) {
    const root = await openSlide(page, base, slide.index + 1, { settle: true })
    for (const image of await root.locator('.lesson-figure img').all()) {
      const geometry = await image.evaluate(image => ({ src: image.getAttribute('src'), naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, width: parseFloat(image.style.width), height: parseFloat(image.style.height), fit: getComputedStyle(image).objectFit, border: getComputedStyle(image).borderStyle }))
      const asset = assets.get(geometry.src)
      assert.ok(asset, `slide ${slide.index + 1}: original image is registered`)
      assert.ok(geometry.naturalWidth > 0 && geometry.naturalHeight > 0 && geometry.width > 0 && geometry.height > 0, 'real pixels occupy the figure slot')
      assert.ok(Math.abs(geometry.width / geometry.height - geometry.naturalWidth / geometry.naturalHeight) < .01, `${asset.id}: original proportions`)
      assert.equal(geometry.fit, 'contain', `${asset.id}: original is never cropped to the slide`)
      assert.equal(geometry.border, 'none', `${asset.id}: image has no added frame`)
      figures++
    }
    for (const table of await root.locator('table').all()) {
      assert.ok(await table.evaluate(table => parseFloat(getComputedStyle(table).fontSize) >= 20), `slide ${slide.index + 1}: readable table scale`)
      assert.ok(await table.evaluate(table => [...table.querySelectorAll('th, td')].every(cell => parseFloat(getComputedStyle(cell).fontSize) >= 20)), `slide ${slide.index + 1}: headers and cells preserve the readable scale`)
      tables++
    }
  }

  const targets = curriculum.lessons.map(spec => deck.slides.find(slide => slide.frontmatter.lesson === spec.id && slide.content.includes('<LessonFigure')))
  targets.push(deck.slides.find(slide => slide.frontmatter.lesson === 'test-implementazione' && slide.content.includes('c03-250-01')))
  for (const viewport of [{ width: 1280, height: 720 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    for (const slide of targets) {
      const root = await openSlide(page, base, slide.index + 1, { settle: true })
      const opener = root.locator('.lesson-image-hint').first()
      await opener.focus(); await opener.press('Enter')
      const dialog = page.locator('.lesson-image-dialog[open]')
      await dialog.waitFor({ state: 'visible' })
      await dialog.locator('img').evaluate(image => image.complete ? Promise.resolve() : new Promise(resolve => image.addEventListener('load', resolve, { once: true })))
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      const report = await dialog.evaluate(dialog => {
        const close = dialog.querySelector('.lesson-image-close').getBoundingClientRect()
        const image = dialog.querySelector('img').getBoundingClientRect()
        return { imageHeight: image.height, closeVisible: close.top >= 0 && close.bottom <= innerHeight, primary: getComputedStyle(dialog).getPropertyValue('--section-primary').trim() }
      })
      assert.ok(report.closeVisible && report.imageHeight >= 100, 'the real image and close action fit the dialog')
      const expected = await root.evaluate(root => getComputedStyle(root).getPropertyValue('--section-primary').trim())
      assert.equal(report.primary, expected, 'the dialog inherits its lesson palette')
      await page.keyboard.press('Escape')
      await dialog.waitFor({ state: 'hidden' })
      assert.ok(await opener.evaluate(button => button === document.activeElement), 'closing restores keyboard focus')
      zoom.push({ slide: slide.index + 1, viewport, ...report })
    }
  }
  console.log(JSON.stringify({ status: 'passed', lessons: curriculum.lessons.length, slides: slides.length, originalFigures: figures, readableTables: tables, indexColors: colors, keyboardZooms: zoom.length }, null, 2))
} finally { await browser.close() }
