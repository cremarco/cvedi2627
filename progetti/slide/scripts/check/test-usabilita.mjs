import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { loadSlideDeck } from './deck.mjs'
import { checkUsabilitySources } from './test-usabilita-source.mjs'
import { openSlide } from '../../../../scripts/check/browser.mjs'
const manifest = JSON.parse(await readFile('progetti/slide/assets/lezione-test-usabilita/manifest.json', 'utf8'))
const notes = JSON.parse(await readFile(manifest.speakerNotesSource, 'utf8'))
const summary = await checkUsabilitySources(await loadSlideDeck())
const base = (process.env.SLIDEV_URL || 'http://localhost:3056/lezioni/test-usabilita').replace(/\/$/, '')
const output = process.env.USABILITY_REPORT_DIR || 'reports/test-usabilita'
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
    for (const specification of manifest.slides) {
      const root = await openSlide(page, base, specification.lessonSlide)
      const result = await root.evaluate(root => {
        const canvas = root.getBoundingClientRect(), scale = canvas.width / 1280
        const footer = root.querySelector('.slide-footer')
        const bottom = footer ? footer.getBoundingClientRect().top - 12 * scale : canvas.bottom
        const overflow = [], walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim() || node.parentElement.closest('.slide-footer, .sr-only, [aria-hidden="true"], dialog:not([open])')) continue
          const range = document.createRange(); range.selectNodeContents(node)
          for (const box of range.getClientRects()) if (box.width && (box.left < canvas.left - 1 || box.right > canvas.right + 1 || box.top < canvas.top - 1 || box.bottom > bottom + 1)) overflow.push(node.textContent.trim().slice(0, 100))
        }
        const title = root.querySelector('h1')
        return { lesson: root.dataset.lesson, overflow: [...new Set(overflow)],
          titleTop: (title.getBoundingClientRect().top - canvas.top) / scale,
          titleSize: parseFloat(getComputedStyle(title).fontSize),
          paragraphSizes: [...root.querySelectorAll('.test-import-copy p, .test-criteria-copy > p:not(.aside)')].map(node => parseFloat(getComputedStyle(node).fontSize)),
          tableSizes: [...root.querySelectorAll('.lesson-native-table :is(th, td)')].map(node => parseFloat(getComputedStyle(node).fontSize)),
          images: [...root.querySelectorAll('img')].map(image => ({ loaded: image.complete && image.naturalWidth > 0, alt: image.alt, decorative: image.getAttribute('aria-hidden') === 'true' })),
          cards: [...root.querySelectorAll('.cvedi-card')].map(card => {
            const image = card.querySelector('.card-background'), copy = card.querySelector('.card-body')
            const three = card.parentElement.classList.contains('three')
            const style = image && getComputedStyle(image), body = getComputedStyle(copy)
            const imageBox = image?.getBoundingClientRect()
            const textBoxes = [...card.querySelectorAll('.card-title, .card-copy p')].map(node => node.getBoundingClientRect())
            return { loaded: !!image && image.complete && image.naturalWidth > 0,
              visible: !!style && style.display !== 'none', width: style && parseFloat(style.width), expectedWidth: three ? 96 : 168,
              paddingBottom: parseFloat(body.paddingBottom), three,
              overlapsCopy: !!imageBox && textBoxes.some(box => box.width && box.height && box.left < imageBox.right && box.right > imageBox.left && box.top < imageBox.bottom && box.bottom > imageBox.top) }
          }),
          counter: root.querySelector('.slide-index')?.textContent.trim().replace(/\s+/g, ' '),
          audio: root.querySelectorAll('audio').length,
        }
      })
      const problems = []
      if (result.lesson !== manifest.lesson) problems.push('wrong lesson identity')
      if (result.overflow.length) problems.push('overflow: ' + result.overflow.join(' | '))
      if (specification.kind !== 'cover' && specification.kind !== 'summary' && (Math.abs(result.titleTop - 52) > 1 || result.titleSize !== 47)) problems.push('shared title geometry')
      if (result.paragraphSizes.some(size => size < 23)) problems.push('reduced reading scale')
      if (result.tableSizes.some(size => size < 20)) problems.push('reduced shared table scale')
      if (result.images.some(image => !image.loaded || (!image.alt && !image.decorative))) problems.push('missing image or alt')
      if (result.cards.some(card => !card.loaded || !card.visible || card.width !== card.expectedWidth || (card.three && card.paddingBottom !== 112) || card.overlapsCopy)) problems.push('missing or overlapping shared card artwork')
      if (result.counter && result.counter !== `${specification.lessonSlide} / ${manifest.slideCount}`) problems.push('wrong lesson pagination')
      if (result.audio !== (mode !== 'print' && specification.narrationEnabled ? 1 : 0)) problems.push('audio selection does not match the first ten slides or print state')
      const report = { mode, slide: specification.lessonSlide, sourcePage: specification.sourcePage, title: specification.title, ...result, problems }
      reports.push(report)
      if (problems.length) failures.push(report)
      if (mode === 'desktop' && (specification.editorial || [1, 3, 4, 6, 11, 18, 25, 34, 50, manifest.slideCount].includes(specification.lessonSlide))) await root.screenshot({ path: `${output}/slide-${specification.lessonSlide}.png` })
    }
  }
  await page.emulateMedia({ media: 'screen' })
  await page.setViewportSize({ width: 1280, height: 720 })
  const figureSlide = manifest.slides.find(slide => slide.kind === 'diagram')
  const figureRoot = await openSlide(page, base, figureSlide.lessonSlide)
  const zoom = figureRoot.getByRole('button', { name: /^Ingrandisci:/ }).first()
  await zoom.focus(); await page.keyboard.press('Enter')
  const dialog = page.locator('dialog[open]')
  await dialog.waitFor({ state: 'visible' })
  await page.keyboard.press('Escape')
  assert.equal(await page.locator('dialog[open]').count(), 0, 'zoom closes with Escape')
  assert.equal(await zoom.evaluate(button => document.activeElement === button), true, 'zoom returns keyboard focus')
  const presenterSlides = [1, 12, 41, 79, 89, 103, manifest.slideCount]
  for (const number of presenterSlides) {
    const specification = manifest.slides[number - 1]
    await page.goto(`${base}/#/presenter/${specification.alias}`)
    await page.waitForFunction(expected => [...document.querySelectorAll('.slidev-note')]
      .some(element => element.textContent.replace(/\s+/g, ' ').trim() === expected),
    (notes[specification.alias] ?? 'No notes for this slide').replace(/\s+/g, ' ').trim())
  }
  await page.screenshot({ path: `${output}/presenter.png` })
  await writeFile(`${output}/verifica.json`, JSON.stringify({ summary, reports, failures, errors, zoomKeyboard: true, presenterSlides }, null, 2) + '\n')
  console.log(JSON.stringify({ ...summary, inspectedViews: reports.length, failures: failures.length, errors, zoomKeyboard: true, presenterSlides }, null, 2))
  assert.deepEqual(errors, [], 'no browser runtime errors')
  assert.equal(failures.length, 0, 'all imported content fits at the shared reading scale; see reports/test-usabilita/verifica.json')
} finally { await browser.close() }
