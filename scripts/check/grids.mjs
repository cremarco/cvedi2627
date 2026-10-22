import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'

const manifest = JSON.parse(await readFile('assets/booklet/lezione-griglie/manifest.json', 'utf8'))
const base = (process.env.SLIDEV_URL || 'http://localhost:3047').replace(/\/$/, '')
const lesson = `${base}/lezioni/griglie-layout`
const output = 'reports/griglie-slidev'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = [], errors = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  // Headless Chromium denies Slidev's screen wake lock after print emulation.
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
        const overflow = []
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim() || node.parentElement.closest('.slide-footer, [aria-hidden="true"], .sr-only')) continue
          const range = document.createRange()
          range.selectNodeContents(node)
          for (const box of range.getClientRects()) if (box.width && (box.left < canvas.left - 1 || box.right > canvas.right + 1 || box.top < canvas.top - 1 || box.bottom > bottom + 1)) overflow.push(node.textContent.trim().slice(0, 90))
        }
        const figures = [...root.querySelectorAll('.lesson-figure')].map(figure => {
          const image = figure.querySelector('img'), img = image.getBoundingClientRect()
          const caption = figure.querySelector('figcaption')?.getBoundingClientRect()
          const style = getComputedStyle(image)
          const range = image.style.objectFit === 'cover'
          return { loaded: image.complete && image.naturalWidth > 0, alt: !!image.alt,
            height: img.height / scale, width: img.width / scale,
            ratioDelta: range ? 0 : Math.abs(img.width / img.height - image.naturalWidth / image.naturalHeight),
            captionGap: caption ? (caption.top - img.bottom) / scale : null,
            fits: img.top >= canvas.top && img.bottom <= bottom + 1,
            noFrame: style.borderTopWidth === '0px' && style.boxShadow === 'none',
          }
        })
        const body = root.querySelector('.lesson-columns > div')
        const copy = body && getComputedStyle(body).fontFamily
        return { overflow: [...new Set(overflow)], figures, copy, footer: footer?.textContent.trim(),
          title: root.querySelector('h1')?.textContent.trim(),
          titleTop: (root.querySelector('h1').getBoundingClientRect().top - canvas.top) / scale,
          lesson: root.dataset.lesson,
          scroll: [...root.querySelectorAll('div, ul')].some(element => ['auto', 'scroll'].includes(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight + 1) }
      })
      report.slide = slide.lessonSlide
      report.mode = mode
      reports.push(report)
      assert.equal(report.lesson, manifest.lesson)
      assert.deepEqual(report.overflow, [], `${mode}/${slide.lessonSlide} ${slide.title}: visible text fits`)
      assert.equal(report.scroll, false, `${mode}/${slide.lessonSlide}: no internal content scrolling`)
      for (const figure of report.figures) {
        assert.ok(figure.loaded && figure.alt && figure.fits && figure.noFrame, `${mode}/${slide.lessonSlide}: source image, alt, framing and fit`)
        assert.ok(figure.height > 80 && figure.width > 80, `${mode}/${slide.lessonSlide}: figures remain visible`)
        assert.ok(figure.ratioDelta < .01, `${mode}/${slide.lessonSlide}: original proportions`)
        assert.ok(figure.captionGap === null || Math.abs(figure.captionGap - 12) < 2, `${mode}/${slide.lessonSlide}: caption follows the image`)
      }
      if (report.footer) {
        assert.ok(report.footer.includes(`${slide.lessonSlide} / ${manifest.slideCount}`), `${mode}/${slide.lessonSlide}: autonomous footer pagination`)
        assert.ok(Math.abs(report.titleTop - 52) < 1, `${mode}/${slide.lessonSlide}: common title anchor`)
      }
      if (mode === 'desktop' && [6, 10, 17, 29, 39, 50, 55, 58, 65, 71].includes(slide.lessonSlide))
        await page.screenshot({ path: `${output}/slide-${slide.lessonSlide}.png` })
    }
    console.log(`${mode}: ${manifest.slideCount} slide verificate`)
  }
  await page.emulateMedia({ media: 'screen' })
  await page.setViewportSize({ width: 844, height: 390 })
  for (const figure of ['365', '370', 'materiali-caso-responsive']) {
    const slide = manifest.slides.find(slide => slide.figures.includes(figure))
    const root = await openSlide(page, lesson, slide.lessonSlide)
    const opener = root.locator('.lesson-image-hint').first()
    await opener.focus()
    await page.keyboard.press('Enter')
    const dialog = page.locator('dialog[open]')
    await dialog.waitFor()
    const visible = await dialog.evaluate(dialog => {
      const box = dialog.querySelector('.modal-box').getBoundingClientRect()
      const close = dialog.querySelector('.lesson-image-close').getBoundingClientRect()
      return box.top >= 0 && box.bottom <= innerHeight + 1 && close.top >= 0 && close.bottom <= innerHeight
    })
    assert.ok(visible, `${figure}: zoom controls stay in a short viewport`)
    await page.keyboard.press('Escape')
    assert.ok(await opener.evaluate(button => document.activeElement === button), `${figure}: Escape restores focus`)
  }
  await page.setViewportSize({ width: 1280, height: 720 })
  await openSlide(page, lesson, manifest.slideCount)
  await page.keyboard.press('ArrowRight')
  assert.equal(await page.locator('.slidev-layout.is-active h1').textContent(), manifest.slides.at(-1).title, 'navigation ends at this lesson')
  const progress = await page.locator('.presentation-progress-rail progress').evaluate(progress => ({ value: progress.value, max: progress.max }))
  assert.deepEqual(progress, { value: manifest.slideCount, max: manifest.slideCount }, 'progress is autonomous')
  await openSlide(page, base, 3)
  const gridLink = page.getByRole('link', { name: 'Griglie e layout', exact: true })
  await gridLink.waitFor()
  await gridLink.focus()
  await page.keyboard.press('Enter')
  await page.waitForURL('**/lezioni/griglie-layout/**')
  assert.equal(await page.locator('.slidev-layout.is-active h1').textContent(), 'Griglie e layout', 'menu keyboard opens the new autonomous set')
  assert.deepEqual(errors, [], 'no browser runtime errors')
  await writeFile(`${output}/verifica.json`, JSON.stringify({ status: 'passed', slides: manifest.slideCount, profiles: 3, renders: reports.length, keyboardAndZoom: true, reports }, null, 2) + '\n')
  console.log(`Griglie e layout: ${reports.length} render, ingrandimenti, tastiera e avanzamento verificati.`)
} catch (error) {
  await writeFile(`${output}/verifica.json`, JSON.stringify({ status: 'failed', error: error.message, reports, errors }, null, 2) + '\n')
  throw error
} finally { await browser.close() }
