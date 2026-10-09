import assert from 'node:assert/strict'
import { chromium } from 'playwright-chromium'
import { checkSlideSources } from './slide-source.mjs'
import { openSlide } from './browser.mjs'

const { deck, approfondimenti } = await checkSlideSources()
const base = (process.env.SLIDEV_URL || 'http://localhost:3035').replace(/\/$/, '')
const browser = await chromium.launch()
const reports = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  const fixtures = deck.slides.filter(slide => (slide.content.match(/<CvediCard\b/g) || []).length > 1
    || slide.content.includes('<ProcessTimeline') || slide.content.includes('<LessonFigure') || slide.frontmatter.exampleId || slide.frontmatter.topicCode)
  async function inspectSlide(slide, mode = "desktop") {
    const root = await openSlide(page, base, slide.index + 1, { settle: true })
    const report = await root.evaluate(root => {
      const scale = root.getBoundingClientRect().width / 1280
      const rows = []
      for (const grid of root.querySelectorAll('.cvedi-grid')) {
        const cards = [...grid.children].filter(card => card.classList.contains('cvedi-card'))
        const byRow = new Map()
        for (const card of cards) {
          const top = Math.round(card.getBoundingClientRect().top / scale)
          const group = byRow.get(top) || []
          group.push(card.querySelector('.card-copy').getBoundingClientRect().top / scale)
          byRow.set(top, group)
        }
        rows.push(...[...byRow.values()].filter(row => row.length > 1).map(row => Math.max(...row) - Math.min(...row)))
      }
      const captions = [...root.querySelectorAll('.lesson-figure:has(figcaption)')].map(figure => {
        const bottom = Math.max(...[...figure.querySelectorAll('img')].map(image => image.getBoundingClientRect().bottom))
        return (figure.querySelector('figcaption').getBoundingClientRect().top - bottom) / scale
      })
      const topic = root.querySelector('.topic-layout')
      const cardMotifs = [...root.querySelectorAll('.cvedi-card:has(.card-background)')].map(card => {
        const image = card.querySelector('.card-background')
        const visible = getComputedStyle(image).display !== 'none'
        const expectedHistory = ['storia-design', 'ricerca-inclusiva'].includes(root.dataset.lesson)
        if (!visible) return { visible, expectedHistory, width: parseFloat(getComputedStyle(card).width), equivalentPair: card.parentElement.children.length === 2 && [...card.parentElement.children].every(child => child.classList.contains('cvedi-card')), interactionExample: Boolean(card.closest('.interaction-examples')) }
        const box = card.getBoundingClientRect()
        const art = image.getBoundingClientRect()
        const copyBoxes = [...card.querySelectorAll('.card-heading, .card-copy')].map(el => el.getBoundingClientRect())
        const copyClear = copyBoxes.every(copy => copy.right <= art.left || copy.bottom <= art.top)
        return { visible, expectedHistory, copyClear, cropped: art.right > box.right && art.bottom > box.bottom,
          overflow: getComputedStyle(card).overflow, decorative: image.alt === '' && image.getAttribute('aria-hidden') === 'true' }
      })
      const formula = root.querySelector('.formula-flow')
      let formulaAlignment = null
      if (formula) {
        const arrow = formula.querySelector('.formula-connector').getBoundingClientRect()
        const card = formula.querySelector('.cvedi-card').getBoundingClientRect()
        formulaAlignment = Math.abs((arrow.top + arrow.bottom - card.top - card.bottom) / (2 * scale))
      }
      let readingOrder = null
      if (topic) {
        const question = topic.querySelector('.topic-question')
        const columns = topic.querySelector('.lesson-columns')
        const output = topic.querySelector('.topic-output')
        readingOrder = {
          questionBeforeBody: question.getBoundingClientRect().bottom <= columns.getBoundingClientRect().top,
          resultAfterBody: output.getBoundingClientRect().top >= columns.getBoundingClientRect().bottom,
          dom: [...topic.children].map(child => child.className),
          copyFits: topic.querySelector('.topic-copy').getBoundingClientRect().bottom <= columns.getBoundingClientRect().bottom + 1,
        }
      }
      const timelines = [...root.querySelectorAll('.cvedi-metro-timeline')].map(timeline => {
        const canvas = root.getBoundingClientRect(), footer = root.querySelector('.slide-footer').getBoundingClientRect()
        const boxes = [...timeline.querySelectorAll('.cvedi-process-timeline li')].map(li => li.getBoundingClientRect())
        const circles = [...timeline.querySelectorAll('.metro-station')].map(el => el.getBoundingClientRect())
        const copies = [...timeline.querySelectorAll('.timeline-end')].map(el => el.getBoundingClientRect())
        return { count: circles.length, circles: circles.map(rect => ({ width: rect.width / scale, height: rect.height / scale, y: (rect.top + rect.bottom) / (2 * scale) })),
          equalColumns: boxes.every(box => Math.abs(box.width - boxes[0].width) / scale < 1),
          fits: copies.every((rect, i) => rect.left >= boxes[i].left - 1 && rect.right <= boxes[i].right + 1 && rect.top >= circles[i].bottom && rect.bottom <= footer.top - 12 * scale + 1 && rect.left >= canvas.left && rect.right <= canvas.right + 1),
          label: timeline.querySelector('ul').getAttribute('aria-label') }
      })
      return { rows, captions, readingOrder, formulaAlignment, cardMotifs, timelines }
    })
    for (const timeline of report.timelines) {
      assert.ok(timeline.count >= 3 && timeline.count <= 5 && timeline.equalColumns && timeline.fits && timeline.label, `slide ${slide.index + 1}: timeline columns and copy fit`)
      assert.ok(timeline.circles.every(circle => Math.abs(circle.width - 56) < 1 && Math.abs(circle.height - 56) < 1 && Math.abs(circle.y - timeline.circles[0].y) < 1), `slide ${slide.index + 1}: shared 56px station baseline`)
    }
    for (const delta of report.rows) assert.ok(delta < 1, `slide ${slide.index + 1}: explanations start on a common row (${delta}px)`)
    for (const gap of report.captions) assert.ok(Math.abs(gap - 12) <= 2, `slide ${slide.index + 1}: caption follows actual image (${gap}px)`)
    for (const motif of report.cardMotifs) {
      if (motif.expectedHistory) assert.ok(motif.visible, `slide ${slide.index + 1}: illustrated lesson card has its icon`)
      if (motif.visible) assert.ok(motif.copyClear && motif.cropped && motif.overflow === 'hidden' && motif.decorative,
        `slide ${slide.index + 1}: decorative corner is cropped and separate from text`)
      else assert.ok(motif.width < 420 || !motif.equivalentPair || motif.interactionExample, `slide ${slide.index + 1}: compact and non-pair compositions omit motifs`)
    }
    if (report.formulaAlignment !== null) assert.ok(report.formulaAlignment < 1, 'formula connector remains centered across both card rows')
    if (report.readingOrder) {
      assert.ok(report.readingOrder.questionBeforeBody && report.readingOrder.resultAfterBody && report.readingOrder.copyFits, `slide ${slide.index + 1}: topic groups fit in reading order`)
      assert.deepEqual(report.readingOrder.dom, ['lead topic-question', 'lesson-columns', 'topic-output'])
    }
    reports.push({ page: slide.index + 1, mode, ...report })
  }
  for (const slide of fixtures) await inspectSlide(slide)
  const timelineFixtures = fixtures.filter(slide => slide.content.includes('<ProcessTimeline'))
  for (const [mode, viewport, media] of [
    ['narrow', { width: 636, height: 778 }, 'screen'],
    ['print', { width: 1280, height: 720 }, 'print'],
  ]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media })
    for (const slide of timelineFixtures) await inspectSlide(slide, mode)
  }
  await page.emulateMedia({ media: 'screen' })
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto(`${base}/#/ux-indizi-comandi-esiti`, { waitUntil: 'networkidle' })
  const opener = page.locator('.is-active .lesson-image-hint').first()
  await opener.click()
  const dialog = page.locator('dialog[open]')
  await dialog.waitFor()
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  const overlay = await dialog.evaluate(dialog => {
    const box = dialog.querySelector('.modal-box').getBoundingClientRect()
    const close = dialog.querySelector('.lesson-image-close').getBoundingClientRect()
    const image = dialog.querySelector('img').getBoundingClientRect()
    return { withinViewport: box.top >= 0 && box.bottom <= innerHeight + 1, closeVisible: close.top >= 0 && close.bottom <= innerHeight, imageHeight: image.height }
  })
  assert.ok(overlay.withinViewport && overlay.closeVisible && overlay.imageHeight >= 100, 'short viewport retains image and close control')
  await page.keyboard.press('Escape')
  assert.ok(await opener.evaluate(button => document.activeElement === button), 'dialog returns keyboard focus')
  console.log(JSON.stringify({ status: 'passed', renders: reports.length, alignedRows: reports.reduce((n,r) => n + r.rows.length, 0), topicLayouts: approfondimenti.length - 1, captions: reports.reduce((n,r) => n + r.captions.length, 0), shortViewportDialog: overlay, reports }, null, 2))
} finally {
  await browser.close()
}
