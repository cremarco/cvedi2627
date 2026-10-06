import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'
import { loadSlideDeck } from './deck.mjs'

// Cover checks follow identity, so inserting or removing an ordinary slide
// does not change which compositions are inspected.
const deck = await loadSlideDeck()
const fixtures = deck.slides.filter(slide => /\b(?:cover-slide|chapter-slide|closing-slide)\b/.test(slide.frontmatter.class ?? ''))
const base = process.env.SLIDEV_URL || 'http://localhost:3035'
const output = process.env.SLIDEV_SCREENSHOTS
if (output) await mkdir(output, { recursive: true })
const reports = []
const errors = []
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') errors.push(error.message) })
  for (const [mode, viewport, media] of [
    ['desktop', { width: 1280, height: 720 }, 'screen'],
    ['narrow', { width: 636, height: 778 }, 'screen'],
    ['print', { width: 1280, height: 720 }, 'print'],
  ]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media })
    const signatures = new Set()
    for (const fixture of fixtures) {
      const slide = await openSlide(page, base, fixture.frontmatter.routeAlias || fixture.index + 1, { settle: true })
      const report = await slide.evaluate(root => {
        const box = root.getBoundingClientRect(), scale = box.width / 1280
        const text = []
        const overset = []
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim() || node.parentElement.closest('[aria-hidden="true"]')) continue
          const range = document.createRange()
          range.selectNodeContents(node)
          for (const rect of range.getClientRects()) {
            if (!rect.width || !rect.height) continue
            text.push({ left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom })
            if (rect.left < box.left || rect.right > box.right + 1 || rect.top < box.top || rect.bottom > box.bottom + 1) overset.push(node.textContent.trim())
          }
        }
        const collisions = []
        const tracks = [...root.querySelectorAll('.metro-track')]
        for (const path of tracks) {
          const length = path.getTotalLength(), matrix = path.getScreenCTM()
          const clearance = (parseFloat(getComputedStyle(path).strokeWidth) / 2 + 16) * scale
          for (let distance = 0; distance <= length; distance += 3) {
            const point = path.getPointAtLength(distance).matrixTransform(matrix)
            if (text.some(rect => point.x >= rect.left - clearance && point.x <= rect.right + clearance && point.y >= rect.top - clearance && point.y <= rect.bottom + clearance)) {
              collisions.push({ x: Math.round((point.x - box.left) / scale), y: Math.round((point.y - box.top) / scale) })
              break
            }
          }
        }
        for (const dot of root.querySelectorAll('.metro-station-disc, .metro-stop-disc')) {
          const rect = dot.getBoundingClientRect(), gap = 16 * scale
          if (text.some(text => rect.right + gap > text.left && rect.left - gap < text.right && rect.bottom + gap > text.top && rect.top - gap < text.bottom)) collisions.push({ station: true })
        }
        const original = root.classList.contains('cover-slide')
        const band = original ? getComputedStyle(root, '::before') : null
        const bandTop = band ? box.top + parseFloat(band.top) * scale : 0
        const bandBottom = band ? box.bottom - parseFloat(band.bottom) * scale : 0
        return {
          title: root.querySelector('h1').textContent.trim(),
          route: root.querySelector('[data-cover-route]')?.dataset.coverRoute ?? 'opening-map',
          signature: tracks.map(path => path.getAttribute('d')).join('|'),
          collisions, overset, original,
          bandProtectsText: !original || text.every(rect => rect.top >= bandTop && rect.bottom <= bandBottom),
          bandColor: band?.backgroundColor,
          offsets: [...root.querySelectorAll('.metro-route-reveal, .closing-metro-reveal')].map(path => getComputedStyle(path).strokeDashoffset),
          stationsVisible: [...root.querySelectorAll('.metro-cover-station, .closing-metro-dot')].every(dot => getComputedStyle(dot).opacity === '1'),
          stops: root.querySelectorAll('.metro-cover-stop').length,
          trains: root.querySelectorAll('.metro-cover-train').length,
          stopVisible: [...root.querySelectorAll('.metro-stop-disc')].every(dot => getComputedStyle(dot).opacity === '1'),
          trainsHidden: [...root.querySelectorAll('.metro-cover-train')].every(train => getComputedStyle(train).opacity === '0'),
          animations: root.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith('cvedi-')).length,
        }
      })
      assert.deepEqual(report.collisions, [], `${mode}/${report.title}: routes leave 16px clear around text`)
      assert.deepEqual(report.overset, [], `${mode}/${report.title}: all text fits the canvas`)
      assert.ok(report.bandProtectsText, 'the opening band protects every line of text and attribution')
      assert.ok(report.offsets.length && report.offsets.every(offset => offset === '0px'), `${mode}/${report.title}: complete static paths`)
      assert.ok(report.stationsVisible, `${mode}/${report.title}: static stations visible`)
      assert.equal(report.stops, report.original ? 0 : 1, `${mode}/${report.title}: main stops belong to chapter covers`)
      if (report.original) assert.equal(report.trains, 0, `${mode}/${report.title}: no added journey on the original map`)
      assert.ok(report.stopVisible && report.trainsHidden, `${mode}/${report.title}: static stop remains visible after the train`)
      assert.equal(report.animations, 0, `${mode}/${report.title}: reduced motion and print are static`)
      if (report.signature) {
        assert.ok(!signatures.has(report.signature), `${mode}/${report.title}: unique cover geometry`)
        signatures.add(report.signature)
      }
      reports.push({ mode, page: fixture.index + 1, ...report })
      if (output) await slide.screenshot({ path: `${output}/${mode}-${report.route}.png` })
    }
  }
  assert.deepEqual(errors, [])
  if (output) await writeFile(`${output}/covers.json`, JSON.stringify(reports, null, 2))
  console.log(JSON.stringify({ status: 'passed', covers: fixtures.length, renders: reports.length, textClearance: '16px beyond the stroke', pageErrors: errors }, null, 2))
} finally {
  await browser.close()
}
