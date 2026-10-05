import { chromium } from 'playwright-chromium'
import { readFile, mkdir, writeFile, realpath } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

// Resolve Slidev's installed parser without adding a second parser dependency.
const slidevRequire = createRequire(await realpath(new URL('../node_modules/@slidev/cli/package.json', import.meta.url)))
const { load } = await import(slidevRequire.resolve('@slidev/parser/fs'))

// Run against a dev server or a served static build. Images are optional QA artifacts.
const baseURL = process.env.SLIDEV_URL || 'http://localhost:3035'
const output = process.env.SLIDEV_SCREENSHOTS
const root = fileURLToPath(new URL('..', import.meta.url))
const deck = await load({ roots: [root], userRoot: root, allowedRoots: [root] }, fileURLToPath(new URL('../slides.md', import.meta.url)))
for (const file of Object.values(deck.markdownFiles)) assert.deepEqual(file.errors || [], [], `parse: ${file.filepath}`)
const total = deck.slides.length
const lesson = deck.slides.filter(slide => slide.frontmatter.lesson === 'introduzione')
const history = deck.slides.filter(slide => slide.frontmatter.lesson === 'storia-design')
assert.equal(total, 154, 'resolved deck: 154 slides, including imports')
assert.equal(lesson.length, 50, 'introduction: 50 slides')
assert.equal(lesson.reduce((sum, slide) => sum + slide.frontmatter.lessonMinutes, 0), 120, 'introduction: 120 minutes')
assert.deepEqual(lesson.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: 50 }, (_, i) => i + 1), 'lesson sequence')
assert.equal(lesson[0].index, 53, 'introduction follows the original 53 slides')
assert.equal(deck.slides[52].title, 'Contatti', 'original contact slide precedes introduction')
assert.equal(deck.slides.at(-1).title, 'Domande?', 'original closing follows the teaching chapters')
assert.equal(lesson[0].frontmatter.routeAlias, 'introduzione-teorica', 'stable chapter alias')
assert.equal(deck.slides.filter(slide => slide.frontmatter.routeAlias === 'introduzione-teorica').length, 1, 'unique alias')
assert.equal(history.length, 50, 'history: 50 slides')
assert.equal(history.reduce((sum, slide) => sum + slide.frontmatter.lessonMinutes, 0), 120, 'history: 120 minutes')
assert.deepEqual(history.map(slide => slide.frontmatter.lessonSlide), Array.from({ length: 50 }, (_, i) => i + 1), 'history sequence')
assert.equal(history[0].index, lesson.at(-1).index + 1, 'history immediately follows introduction')
assert.equal(history.at(-1).index, total - 2, 'history immediately precedes closing')
assert.equal(history[0].frontmatter.routeAlias, 'storia-design', 'stable history alias')
assert.equal(deck.slides.filter(slide => slide.frontmatter.routeAlias === 'storia-design').length, 1, 'unique history alias')
assert.equal(history.filter(slide => slide.frontmatter.class.includes('lesson-activity')).length, 3, 'history: three classroom activities')
for (const slide of [...lesson, ...history]) {
  assert.match(slide.note, /Tempo previsto: \d+ min/, `lesson ${slide.frontmatter.lessonSlide}: timing in presenter notes`)
  assert.match(slide.note, /Booklet:.*nodo 198:/, `lesson ${slide.frontmatter.lessonSlide}: booklet reference`)
  assert.match(slide.note, /(?:PDF 2025\/26:|nessuna corrispondenza diretta)/, `lesson ${slide.frontmatter.lessonSlide}: source relation`)
}
const sourceMap = await readFile(new URL('../lezioni/01-introduzione-fonti.md', import.meta.url), 'utf8')
assert.equal((sourceMap.match(/^\| \d+ \/ \d+ \|/gm) || []).length, 50, 'source map: one entry per lesson slide')
const historySources = await readFile(new URL('../lezioni/03-storia-design-fonti.md', import.meta.url), 'utf8')
assert.equal((historySources.match(/^\| \d+ \/ \d+ \|/gm) || []).length, 50, 'history source map: one entry per slide')
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
  await page.goto(`${baseURL.replace(/\/$/, '')}/#/3`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /01.*Introduzione/ }).click()
  await page.locator('.slidev-page-54 .slidev-layout').waitFor()
  assert.equal(await page.locator('.slidev-page-54 h1').textContent(), 'Introduzione', 'index opens theoretical chapter')
  await page.goto(`${baseURL.replace(/\/$/, '')}/#/3`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /02.*Storia del graphic design/ }).click()
  await page.locator('.slidev-page-104 .slidev-layout').waitFor()
  assert.equal(await page.locator('.slidev-page-104 h1').textContent(), 'Storia del design', 'index opens history chapter')
  async function inspect(number, narrow = false, print = false) {
    await page.goto(`${baseURL.replace(/\/$/, '')}/#/${number}`, { waitUntil: 'networkidle' })
    const slide = page.locator(`.slidev-page-${number} .slidev-layout`)
    await slide.waitFor()
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(number => [...document.querySelectorAll(`.slidev-page-${number} img`)].every(img => img.complete && img.naturalWidth), number)
    // A capture must show the settled slide, including outgoing player transitions.
    await page.evaluate(async () => {
      await Promise.all(document.getAnimations().filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map(animation => animation.finished.catch(() => {})))
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    })
    if (print) {
      // The player toolbar fades independently of slide transitions.
      await page.mouse.move(1, 1)
      await page.waitForFunction(() => [...document.querySelectorAll('#page-root nav')]
        .filter(nav => nav.querySelector('button[title="Go to next slide"]'))
        .every(nav => getComputedStyle(nav.parentElement).opacity === '0'))
    }
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
      for (const image of root.querySelectorAll('.lesson-figure img')) {
        const rect = image.getBoundingClientRect()
        if (rect.left < box.left - 1 || rect.right > box.right + 1 || rect.top < box.top - 1 || rect.bottom > footer.top - 12 * scale + 1) violations.push(`image: ${image.alt}`)
      }
      const backgrounds = [...new Set([...root.querySelectorAll('.cvedi-card')].map(card => getComputedStyle(card).backgroundColor))]
      const title = root.querySelector('h1')
      const figures = [...root.querySelectorAll('.lesson-figure img')].map(img => {
        const rect = img.getBoundingClientRect()
        const fit = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight)
        return { src: img.getAttribute('src'), width: Math.round(rect.width / scale), height: Math.round(rect.height / scale), visibleWidth: Math.round(img.naturalWidth * fit / scale), visibleHeight: Math.round(img.naturalHeight * fit / scale), fit: getComputedStyle(img).objectFit }
      })
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
        archiveWall: root.classList.contains('archive-wall-slide'),
        projectSection: root.classList.contains('project-section'),
        reading: root.classList.contains('reading-slide'),
        figures,
      }
    }, number)
    assert.equal(report.headings, 1, `slide ${number}: heading`)
    assert.equal(report.footer, `${String(number).padStart(2, '0')} / ${total}`, `slide ${number}: footer`)
    assert.equal(report.codeBlocks, 0, `slide ${number}: unintended code block`)
    assert.equal(report.brokenImages.length, 0, `slide ${number}: missing images`)
    assert.ok(report.backgrounds.length <= 1, `slide ${number}: inconsistent card surfaces`)
    if (report.reading) assert.equal(report.titleTop, 64, `slide ${number}: stable reading title anchor`)
    for (const figure of report.figures) {
      assert.ok(figure.width > 0 && figure.height > 0, `slide ${number}: visible figure`)
      assert.ok(['contain', 'cover'].includes(figure.fit), `slide ${number}: preserved image proportions`)
    }
    if (number === 85) assert.equal(await slide.locator('.ux-process-map li').count(), 14, 'all fourteen UX phases are rendered')
    if (report.archiveWall) {
      assert.ok(projects.length >= 12, 'archive: enough project screenshots to cycle')
      assert.equal(report.galleryImages, 12, 'archive: twelve full-screen image windows')
    }
    reports.push({ ...report, narrow, print })
    if (output) await page.screenshot({ path: `${output}/${print ? 'print-' : narrow ? 'narrow-' : ''}${number}.png` })
  }
  for (let number = 1; number <= total; number++) await inspect(number)
  async function inspectEnlargement(number, narrow = false) {
    await page.goto(`${baseURL.replace(/\/$/, '')}/#/${number}`, { waitUntil: 'networkidle' })
    const imageButton = page.locator(`.slidev-page-${number} .lesson-image-button`).first()
    await imageButton.focus()
    await page.keyboard.press('Enter')
    const dialog = page.locator('dialog[open]')
    await dialog.waitFor()
    await dialog.evaluate(async root => {
      await Promise.all(root.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {})))
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    })
    assert.equal(await dialog.count(), 1, `slide ${number}: one image enlargement`)
    const route = page.url()
    await page.keyboard.press('ArrowRight')
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    assert.equal(page.url(), route, `slide ${number}: image dialog keeps slide shortcuts out`)
    await page.waitForFunction(() => [...document.querySelectorAll('dialog[open] img')].every(img => img.complete && img.naturalWidth))
    const visible = await dialog.evaluate(root => {
      const box = root.querySelector('.modal-box').getBoundingClientRect()
      return [...root.querySelectorAll('img, header')].every(el => {
        const rect = el.getBoundingClientRect()
        return rect.left >= box.left && rect.right <= box.right + 1 && rect.top >= box.top && rect.bottom <= box.bottom + 1
      })
    })
    assert.ok(visible, `slide ${number}: enlarged image and close action fit the viewport`)
    if (output) await page.screenshot({ path: `${output}/${narrow ? 'narrow-' : ''}enlarged-${number}.png` })
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    assert.ok(await imageButton.evaluate(button => document.activeElement === button), `slide ${number}: closing enlargement restores keyboard focus`)
    await imageButton.click()
    await page.locator('dialog[open]').getByRole('button', { name: 'Chiudi', exact: true }).click()
    assert.equal(await page.locator('dialog[open]').count(), 0, `slide ${number}: visible close action works`)
  }
  for (const number of [62, 90, 124, 130, 151]) await inspectEnlargement(number)
  await page.setViewportSize({ width: 636, height: 778 })
  const narrowNumbers = new Set([
    2, 3, 4, 8, 12, 19,
    // Chapter opening, comparisons, images, six cards, process maps and activities.
    54, 57, 60, 62, 64, 66, 69, 72, 75, 77, 80, 83, 85, 90, 92, 93, 94, 97, 101, 103,
    // New chapter: opening, timeline, images, paired posters, cards, activities and long titles.
    104, 105, 108, 109, 113, 115, 123, 124, 125, 126, 127, 130, 132, 134, 137, 138, 139, 142, 145, 147, 150, 151, 153, total,
    ...reports.filter(report => report.projectSection || report.archiveWall || ['Progetti e approfondimenti', 'Voti finali: sei anni a confronto'].includes(report.title)).map(report => report.page),
  ])
  for (const number of narrowNumbers) await inspect(number, true)
  for (const number of [62, 90, 130, 151]) await inspectEnlargement(number, true)
  // Check print styles without generating a PDF. Slidev's full print route
  // is enabled only for export/download builds.
  await page.emulateMedia({ media: 'print' })
  await page.setViewportSize({ width: 1280, height: 720 })
  for (const number of [54, 85, 94, 103, 104, 124, 138, 151, 153, total]) await inspect(number, false, true)
  assert.equal(await page.getByText('Tempo previsto:', { exact: false }).count(), 0, 'presenter notes are not printed as content')
  await page.emulateMedia({ media: 'screen' })
  await page.close()
  // Open each presenter entry in a fresh page: dev notes are fetched separately
  // and Slidev keeps a per-page note cache when changing between player routes.
  for (const number of [94, 151]) {
    const presenter = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
    presenter.on('pageerror', error => {
      if (error.message !== 'Wake Lock permission request denied') errors.push(error.message)
    })
    await presenter.goto(`${baseURL.replace(/\/$/, '')}/#/presenter/${number}`, { waitUntil: 'networkidle' })
    await presenter.locator('.note').filter({ hasText: number === 151 ? /Slide 48 del capitolo/ : /slide 94 del deck/ }).waitFor()
    const note = await presenter.locator('.note').innerText()
    assert.match(note, /Terza attività/, `presenter ${number}: discussion instructions`)
    assert.match(note, number === 151 ? /Booklet:.*p\. 51/ : /Booklet:.*p\. 15/, `presenter ${number}: booklet pages`)
    if (number === 151) assert.match(note, /Lezione 05, pp\. 91–94/, 'history presenter includes PDF pages')
    await presenter.waitForFunction(number => [...document.querySelectorAll(`.slidev-page-${number} img`)].every(img => img.complete && img.naturalWidth), number)
    if (output) await presenter.screenshot({ path: `${output}/presenter-${number}.png` })
    await presenter.close()
  }
  const overset = reports.filter(report => report.violations.length)
  console.log(JSON.stringify({ slides: total, renders: reports.length, errors, overset, reports }, null, 2))
  if (output) await writeFile(`${output}/report.json`, JSON.stringify(reports, null, 2))
  assert.deepEqual(errors, [], 'browser runtime errors')
  assert.equal(overset.length, 0, 'text must remain above the footer safety zone')
} finally {
  await browser.close()
}
