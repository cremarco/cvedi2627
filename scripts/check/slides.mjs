import { chromium } from 'playwright-chromium'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { checkSlideSources } from './slide-source.mjs'

const { deck, total, lesson, history, course, projects } = await checkSlideSources()
const baseURL = process.env.SLIDEV_URL || 'http://localhost:3035'
const output = process.env.SLIDEV_SCREENSHOTS
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
  await page.getByRole('button', { name: /02.*Introduzione a UX e UI/ }).click()
  await page.locator('.slidev-page-53 .slidev-layout').waitFor()
  assert.equal(await page.locator('.slidev-page-53 h1').textContent(), 'Introduzione a UX e UI', 'index opens theoretical chapter')
  await page.goto(`${baseURL.replace(/\/$/, '')}/#/3`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /03.*Storia del graphic design/ }).click()
  await page.locator('.slidev-page-103 .slidev-layout').waitFor()
  assert.equal(await page.locator('.slidev-page-103 h1').textContent(), 'Storia del design', 'index opens history chapter')
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
        footerLabel: root.querySelector('.slide-index')?.getAttribute('aria-label'),
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
    const current = deck.slides[number - 1]
    const set = current.frontmatter.lesson === 'introduzione' ? lesson : current.frontmatter.lesson === 'storia-design' ? history : course
    const lessonPage = set.indexOf(current) + 1
    const label = `Slide ${lessonPage} di ${set.length}`
    assert.equal(report.headings, 1, `slide ${number}: heading`)
    assert.equal(report.footer, `${String(lessonPage).padStart(2, '0')} / ${set.length}`, `slide ${number}: lesson footer`)
    assert.equal(report.footerLabel, label, `slide ${number}: accessible lesson footer`)
    const progress = page.locator('.presentation-progress-rail progress')
    assert.equal(await progress.getAttribute('max'), String(set.length), `slide ${number}: lesson progress total`)
    assert.equal(await progress.getAttribute('value'), String(lessonPage), `slide ${number}: lesson progress position`)
    assert.equal(await progress.getAttribute('aria-valuetext'), label, `slide ${number}: accessible lesson progress`)
    assert.equal(report.codeBlocks, 0, `slide ${number}: unintended code block`)
    assert.equal(report.brokenImages.length, 0, `slide ${number}: missing images`)
    assert.ok(report.backgrounds.length <= 1, `slide ${number}: inconsistent card surfaces`)
    if (report.reading) assert.equal(report.titleTop, 64, `slide ${number}: stable reading title anchor`)
    for (const figure of report.figures) {
      assert.ok(figure.width > 0 && figure.height > 0, `slide ${number}: visible figure`)
      assert.ok(['contain', 'cover'].includes(figure.fit), `slide ${number}: preserved image proportions`)
    }
    if (number === 84) assert.equal(await slide.locator('.ux-process-map li').count(), 14, 'all fourteen UX phases are rendered')
    if (report.archiveWall) {
      assert.ok(projects.length >= 12, 'archive: enough project screenshots to cycle')
      assert.equal(report.galleryImages, 12, 'archive: twelve full-screen image windows')
    }
    reports.push({ ...report, narrow, print })
    if (output) await page.screenshot({ path: `${output}/${print ? 'print-' : narrow ? 'narrow-' : ''}${number}.png` })
  }
  for (let number = 1; number <= total; number++) await inspect(number)
  const uxExamples = JSON.parse(await readFile(new URL('../../data/ux-examples.json', import.meta.url), 'utf8'))
  const uxPage = deck.slides.find(slide => slide.content.includes('<UxExamples />')).index + 1
  await page.goto(`${baseURL.replace(/\/$/, '')}/#/${uxPage}`, { waitUntil: 'networkidle' })
  const uxSelector = page.getByRole('combobox', { name: 'Scegli un esempio' })
  assert.equal(await uxSelector.locator('option').count(), uxExamples.length, 'all UX examples can be selected')
  for (const [index, example] of uxExamples.entries()) {
    await uxSelector.selectOption(String(index))
    await page.waitForFunction(src => {
      const img = document.querySelector('.ux-examples .lesson-image-button img')
      return img?.getAttribute('src')?.endsWith(src) && img.complete && img.naturalWidth > 0
    }, example.src)
    assert.equal(await page.locator('.ux-examples h2').textContent(), example.title, 'example text follows its photo')
  }
  assert.equal(await page.getByRole('button', { name: 'Successivo', exact: true }).isEnabled(), false, 'last example has no next item')
  await page.getByRole('button', { name: 'Precedente', exact: true }).click()
  assert.equal(await uxSelector.inputValue(), String(uxExamples.length - 2), 'previous example works')
  await page.getByRole('button', { name: 'Successivo', exact: true }).click()
  assert.equal(await uxSelector.inputValue(), String(uxExamples.length - 1), 'next example works')
  assert.equal(new URL(page.url()).hash.split('?')[0], `#/${uxPage}`, 'example navigation stays on its slide')
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
    const captionButton = page.locator(`.slidev-page-${number} .lesson-image-hint`).first()
    await captionButton.click()
    await page.locator('dialog[open]').waitFor()
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    assert.ok(await captionButton.evaluate(button => document.activeElement === button), `slide ${number}: caption enlargement restores focus`)
    await captionButton.press('Enter')
    await page.locator('dialog[open]').waitFor()
    await page.locator('dialog[open]').getByRole('button', { name: 'Chiudi', exact: true }).click()
  }
  for (const number of [61, 89, 123, 129, 150]) await inspectEnlargement(number)
  await page.setViewportSize({ width: 636, height: 778 })
  const narrowNumbers = new Set([
    2, 3, 4, 8, 12, 19,
    // Chapter opening, comparisons, images, six cards, process maps and activities.
    53, 56, 59, 61, 63, 65, 68, 71, 74, 76, 79, 82, 84, 89, 91, 92, 93, 96, 100, 102,
    // New chapter: opening, timeline, images, paired posters, cards, activities and long titles.
    103, 104, 107, 108, 112, 114, 122, 123, 124, 125, 126, 129, 131, 133, 136, 137, 138, 141, 144, 146, 149, 150, 152, total,
    ...reports.filter(report => report.projectSection || report.archiveWall || ['Progetti e approfondimenti', 'Voti finali: sei anni a confronto'].includes(report.title)).map(report => report.page),
  ])
  for (const number of narrowNumbers) await inspect(number, true)
  for (const number of [61, 89, 129, 150]) await inspectEnlargement(number, true)
  // Check print styles without generating a PDF. Slidev's full print route
  // is enabled only for export/download builds.
  await page.emulateMedia({ media: 'print' })
  await page.setViewportSize({ width: 1280, height: 720 })
  for (const number of [53, 84, 93, 102, 103, 123, 137, 150, 152, total]) await inspect(number, false, true)
  assert.equal(await page.getByText('Tempo previsto:', { exact: false }).count(), 0, 'presenter notes are not printed as content')
  await page.emulateMedia({ media: 'screen' })
  await page.close()
  // Open each presenter entry in a fresh page: dev notes are fetched separately
  // and Slidev keeps a per-page note cache when changing between player routes.
  for (const number of [93, 150]) {
    const presenter = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
    presenter.on('pageerror', error => {
      if (error.message !== 'Wake Lock permission request denied') errors.push(error.message)
    })
    await presenter.goto(`${baseURL.replace(/\/$/, '')}/#/presenter/${number}`, { waitUntil: 'networkidle' })
    await presenter.locator('.note').filter({ hasText: number === 150 ? /Slide 48 del capitolo/ : /slide 93 del deck/ }).waitFor()
    const note = await presenter.locator('.note').innerText()
    assert.match(note, /Terza attività/, `presenter ${number}: discussion instructions`)
    assert.match(note, number === 150 ? /Booklet:.*p\. 51/ : /Booklet:.*p\. 15/, `presenter ${number}: booklet pages`)
    if (number === 150) assert.match(note, /Lezione 05, pp\. 91–94/, 'history presenter includes PDF pages')
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
