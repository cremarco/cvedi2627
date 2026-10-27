import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from '../../../../scripts/check/browser.mjs'
import { loadSlideDeck } from './deck.mjs'
import { checkCompositionSources } from './composition-source.mjs'

const manifest = JSON.parse(await readFile('progetti/slide/assets/booklet/lezione-composizione/manifest.json', 'utf8'))
const notes = JSON.parse(await readFile(manifest.speakerNotesSource, 'utf8'))
const summary = await checkCompositionSources(await loadSlideDeck())
const base = (process.env.SLIDEV_URL || 'http://localhost:3047').replace(/\/$/, '')
const lesson = `${base}/lezioni/composizione-gerarchia`
const output = 'reports/composizione-slidev'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = [], failures = [], errors = []
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
    for (const slide of manifest.slides) {
      const root = await openSlide(page, lesson, slide.lessonSlide, { settle: true })
      const report = await root.evaluate(root => {
        const canvas = root.getBoundingClientRect(), scale = canvas.width / 1280
        const footer = root.querySelector('.slide-footer')
        const bottom = footer ? footer.getBoundingClientRect().top - 12 * scale : canvas.bottom
        const overflow = [], walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim() || node.parentElement.closest('.slide-footer, .sr-only, [aria-hidden="true"]')) continue
          const range = document.createRange(); range.selectNodeContents(node)
          for (const rect of range.getClientRects())
            if (rect.width && (rect.left < canvas.left - 1 || rect.right > canvas.right + 1 || rect.top < canvas.top - 1 || rect.bottom > bottom + 1)) overflow.push(node.textContent.trim().slice(0,120))
        }
        const title = root.querySelector('h1'), style = getComputedStyle(title)
        return {
          lesson: root.dataset.lesson, title: title.textContent.trim(), titleTop: (title.getBoundingClientRect().top - canvas.top) / scale,
          titleSize: parseFloat(style.fontSize), titleFamily: style.fontFamily,
          footer: footer?.textContent.trim(), overflow: [...new Set(overflow)],
          audio: root.querySelectorAll('audio, .lesson-audio').length,
          cards: [...root.querySelectorAll('.card-background')].map(image => ({ loaded: image.complete && image.naturalWidth > 0, width: parseFloat(getComputedStyle(image).width) })),
          captions: [...root.querySelectorAll('.lesson-caption')].map(caption => parseFloat(getComputedStyle(caption).fontSize)),
          figures: [...root.querySelectorAll('.lesson-figure')].map(figure => {
            const image=figure.querySelector('img'), rect=image.getBoundingClientRect(), css=getComputedStyle(image)
            return { loaded: image.complete && image.naturalWidth > 0, alt: !!image.alt,
              width: rect.width/scale, height: rect.height/scale,
              fits: rect.top >= canvas.top && rect.bottom <= bottom+1,
              ratioDelta: Math.abs(rect.width/rect.height-image.naturalWidth/image.naturalHeight),
              noFrame: css.borderTopWidth === '0px' && css.boxShadow === 'none' }
          }),
          scroll: [...root.querySelectorAll('div, ul')].some(element => ['auto','scroll'].includes(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight+1),
        }
      })
      reports.push({ mode, slide: slide.lessonSlide, ...report })
      const context = `${mode}/${slide.lessonSlide} ${slide.title}`
      const require = (condition, description) => { if (!condition) failures.push(context + ': ' + description) }
      require(report.lesson === manifest.lesson, 'owning identity')
      require(report.overflow.length === 0, 'text overflow: ' + report.overflow.join(' | '))
      require(!report.scroll, 'no internal scrolling')
      require(report.audio === 0, 'no audio')
      require(report.captions.every(size => size === 18), 'shared caption scale')
      for (const figure of report.figures) {
        require(figure.loaded && figure.alt && figure.fits && figure.noFrame, 'preserved visible figure with alt and no frame')
        require(figure.width > 80 && figure.height > 80, 'visible figure size')
        require(figure.ratioDelta < .01, 'original proportions')
      }
      if ([34,40,61].includes(slide.lessonSlide)) require(report.figures[0].width > 850, 'comparison uses the wide teaching area')
      if (slide.lessonSlide === 60) require(report.figures[0].width > 800 && report.figures[0].height > 350, 'controlled invitation uses a dominant readable comparison')
      if (report.footer) {
        require(report.footer.includes(`${slide.lessonSlide} / ${manifest.slideCount}`), 'autonomous pagination')
        require(Math.abs(report.titleTop-52) < 1 && report.titleSize === 47, 'common title anchor and scale')
      }
      if (slide.kind === 'objectives') require(report.cards.length === 3 && report.cards.every(card => card.loaded && card.width === 96), 'three registered objective illustrations')
      if (mode === 'desktop') await page.screenshot({ path: `${output}/slide-${String(slide.lessonSlide).padStart(2,'0')}.png` })
      else if ([34,40,60,61,63,64,65].includes(slide.lessonSlide)) await page.screenshot({ path: `${output}/${mode}-${slide.lessonSlide}.png` })
    }
  }
  await page.emulateMedia({ media: 'screen' })
  await page.setViewportSize({ width: 1280, height: 720 })
  await openSlide(page, lesson, 5)
  const zoom = page.locator('.slidev-layout.is-active .lesson-image-button').first()
  await zoom.focus(); await page.keyboard.press('Enter')
  await page.locator('dialog[open]').waitFor({ state: 'visible' })
  await page.keyboard.press('Escape')
  await page.locator('dialog[open]').waitFor({ state: 'detached' })
  assert.equal(await zoom.evaluate(node => document.activeElement === node), true, 'Escape restores figure focus')
  // Check a preserved and a revised script in the native presenter.
  for (const number of [5,60]) {
    await page.goto(`${lesson}/#/presenter/${number}`)
    await page.waitForFunction(expected => [...document.querySelectorAll('*')].some(element => element.classList?.contains('slidev-note') && element.textContent.replace(/\s+/g,' ').trim() === expected), notes[manifest.slides[number-1].alias].replace(/\s+/g,' ').trim())
  }
  await page.screenshot({ path: `${output}/presenter.png` })
  for (const material of ['invito.txt','invito-iniziale.svg','fonti.txt']) {
    const response = await page.request.get(`${base}/materials/composizione/${material}`)
    assert.equal(response.status(), 200, material + ': downloadable common material')
    assert.ok((await response.body()).length > 100, material + ': complete response')
  }
  await page.goto(`${base}/#/3`)
  const link = page.getByRole('link').filter({ hasText: 'Composizione e gerarchia visiva' })
  await link.waitFor({ state: 'visible' })
  await link.focus(); await page.keyboard.press('Enter')
  await page.waitForURL(/lezioni\/composizione-gerarchia/)
  await page.locator('.chapter-slide.is-active').waitFor({ state: 'visible' })
  await page.keyboard.press('ArrowRight')
  await page.locator('.slidev-page-2 .slidev-layout').waitFor({ state: 'visible' })
  assert.deepEqual(errors, [], 'no page errors')
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ summary, failures, errors, reports }, null, 2)+'\n')
  await browser.close()
}
assert.deepEqual(failures, [])
console.log('Composition: all 70 slides passed desktop, narrow viewport, print, figures, keyboard, index and presenter checks.')
