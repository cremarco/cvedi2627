import assert from 'node:assert/strict'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'
import { loadSlideDeck } from './deck.mjs'

// Cover checks follow identity, so inserting or removing an ordinary slide
// does not change which compositions are inspected.
const deck = await loadSlideDeck()
const fixtures = deck.slides.filter(slide => /\b(?:cover-slide|chapter-slide|closing-slide)\b/.test(slide.frontmatter.class ?? ''))
const sectionDividers = deck.slides.filter(slide => slide.frontmatter.sectionDivider === true)
const chapterCovers = fixtures.filter(slide => /\bchapter-slide\b/.test(slide.frontmatter.class ?? '') && slide.frontmatter.sectionDivider !== true)
const curriculum = JSON.parse(await readFile(new URL('../../data/ux-curriculum.json', import.meta.url), 'utf8'))
assert.equal(chapterCovers.length, 7 + curriculum.lessons.length, 'all original and UX chapter openings remain present')
assert.equal(sectionDividers.length, 8, 'the typography-only lesson retains its eight section openings')
assert.deepEqual(sectionDividers.map(slide => slide.frontmatter.sectionNumber), Array.from({ length: 8 }, (_, index) => index + 1), 'section numbers follow the presentation order')
assert.equal(deck.slides.filter(slide => /\bsection-divider\b/.test(slide.frontmatter.class ?? '')).length, sectionDividers.length, 'section-divider classes have explicit section metadata')
for (const divider of sectionDividers) {
  assert.equal(divider.frontmatter.lesson, 'tipografia-griglie', 'section openings belong to the typography lesson')
  assert.match(divider.frontmatter.class ?? '', /\bchapter-slide\b/, 'section openings retain the chapter cover composition')
  assert.match(divider.frontmatter.class ?? '', /\bsection-divider\b/, 'section openings have a distinct class')
  assert.equal(divider.frontmatter.lessonMinutes, 0, 'section openings preserve the teaching budget')
  assert.match(divider.content, /<ChapterMetro\s+section="ux-type"\s*\/>/, 'section openings reuse the typography metro')
  assert.ok(chapterCovers.some(cover => cover.frontmatter.lesson === divider.frontmatter.lesson), 'each section opening retains its lesson cover')
}
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
    const lessonGeometry = new Map()
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
        for (const dot of root.querySelectorAll('.metro-station-tick')) {
          const rect = dot.getBoundingClientRect(), gap = 16 * scale
          if (text.some(text => rect.right + gap > text.left && rect.left - gap < text.right && rect.bottom + gap > text.top && rect.top - gap < text.bottom)) collisions.push({ station: true })
        }
        const chapter = root.classList.contains('chapter-slide')
        const images = root.querySelectorAll('img, svg image, .chapter-illustration').length
        const original = root.classList.contains('cover-slide')
        const band = original ? getComputedStyle(root, '::before') : null
        const bandTop = band ? box.top + parseFloat(band.top) * scale : 0
        const bandBottom = band ? box.bottom - parseFloat(band.bottom) * scale : 0
        return {
          title: root.querySelector('h1').textContent.trim(),
          sectionDivider: root.classList.contains('section-divider'),
          chapterLabel: root.querySelector('.chapter-lesson-number')?.textContent.trim().replace(/\s+/g, ' ') ?? '',
          route: root.querySelector('[data-cover-route]')?.dataset.coverRoute ?? 'opening-map',
          signature: tracks.map(path => path.getAttribute('d')).join('|'),
          collisions, overset, original, chapter, images,
          bandProtectsText: !original || text.every(rect => rect.top >= bandTop && rect.bottom <= bandBottom),
          bandColor: band?.backgroundColor,
          offsets: [...root.querySelectorAll('.metro-route-reveal, .closing-metro-reveal')].map(path => getComputedStyle(path).strokeDashoffset),
          stationsVisible: [...root.querySelectorAll('.metro-cover-station, .closing-metro-dot')].every(dot => getComputedStyle(dot).opacity === '1'),
          stops: root.querySelectorAll('.metro-cover-stop').length,
          ticks: root.querySelectorAll('.metro-station-tick').length,
          stationCircles: root.querySelectorAll('.chapter-metro-route circle').length,
          counter: root.querySelectorAll('.slide-index').length,
          footer: root.querySelectorAll('.slide-footer').length,
          progress: document.querySelectorAll('.presentation-progress-rail').length,
          trains: root.querySelectorAll('.metro-cover-train').length,
          stopVisible: [...root.querySelectorAll('.metro-cover-stop .metro-station-tick')].every(dot => getComputedStyle(dot).opacity === '1'),
          trainsHidden: [...root.querySelectorAll('.metro-cover-train')].every(train => getComputedStyle(train).opacity === '0'),
          animations: root.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith('cvedi-')).length,
        }
      })
      assert.deepEqual(report.collisions, [], `${mode}/${report.title}: routes leave 16px clear around text`)
      assert.deepEqual(report.overset, [], `${mode}/${report.title}: all text fits the canvas`)
      assert.equal(report.images, 0, `${mode}/${report.title}: covers use typography and metro without images`)
      assert.ok(report.bandProtectsText, 'the opening band protects every line of text and attribution')
      assert.ok(report.offsets.length && report.offsets.every(offset => offset === '0px'), `${mode}/${report.title}: complete static paths`)
      assert.ok(report.stationsVisible, `${mode}/${report.title}: static stations visible`)
      assert.equal(report.stops, report.original ? 0 : 1, `${mode}/${report.title}: main stops belong to chapter covers`)
      assert.equal(report.stationCircles, 0, `${mode}/${report.title}: chapter stations use ticks instead of circles`)
      if (!report.original) assert.ok(report.ticks >= 3, `${mode}/${report.title}: every route retains its station ticks`)
      if (report.original || report.chapter) {
        assert.equal(report.footer, 0, `${mode}/${report.title}: no cover footer`)
        assert.equal(report.counter, 0, `${mode}/${report.title}: no cover page counter`)
        assert.equal(report.progress, 0, `${mode}/${report.title}: no cover progress rail`)
      }
      if (report.original) assert.equal(report.trains, 0, `${mode}/${report.title}: no added journey on the original map`)
      assert.ok(report.stopVisible && report.trainsHidden, `${mode}/${report.title}: static stop remains visible after the train`)
      assert.equal(report.animations, 0, `${mode}/${report.title}: reduced motion and print are static`)
      const isDivider = fixture.frontmatter.sectionDivider === true
      assert.equal(report.sectionDivider, isDivider, `${mode}/${report.title}: section identity matches the source`)
      if (isDivider) {
        assert.equal(report.chapterLabel, `Lezione 08 · Sezione ${String(fixture.frontmatter.sectionNumber).padStart(2, '0')}`, `${mode}/${report.title}: lesson and section remain identifiable`)
        assert.equal(report.route, 'ux-type', `${mode}/${report.title}: typography metro route`)
        assert.ok(lessonGeometry.has(fixture.frontmatter.lesson), `${mode}/${report.title}: lesson cover geometry was inspected`)
        assert.equal(report.signature, lessonGeometry.get(fixture.frontmatter.lesson), `${mode}/${report.title}: same metro geometry as its lesson cover`)
      } else if (report.signature) {
        assert.ok(!signatures.has(report.signature), `${mode}/${report.title}: unique cover geometry`)
        signatures.add(report.signature)
        if (report.chapter) lessonGeometry.set(fixture.frontmatter.lesson, report.signature)
      }
      reports.push({ mode, page: fixture.index + 1, ...report })
      if (output) await slide.screenshot({ path: `${output}/${mode}-${report.route}${isDivider ? `-section-${String(fixture.frontmatter.sectionNumber).padStart(2, '0')}` : ''}.png` })
    }
  }
  assert.deepEqual(errors, [])
  if (output) await writeFile(`${output}/covers.json`, JSON.stringify(reports, null, 2))
  console.log(JSON.stringify({ status: 'passed', covers: fixtures.length, chapterCovers: chapterCovers.length, sectionDividers: sectionDividers.length, coverImages: 0, renders: reports.length, textClearance: '16px beyond the stroke', pageErrors: errors }, null, 2))
} finally {
  await browser.close()
}
