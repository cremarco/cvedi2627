import { chromium } from 'playwright-chromium'
import { mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { checkSlideSources } from './slide-source.mjs'

const { deck, total, lesson, history, brief, approfondimenti, projects, uxExamples, uxSlides, audit } = await checkSlideSources()
const baseURL = process.env.SLIDEV_URL || 'http://localhost:3035'
const output = process.env.SLIDEV_SCREENSHOTS
const pageNumber = slide => slide.index + 1
const introductionStart = pageNumber(lesson[0])
const briefStart = pageNumber(brief[0])
const lessonOf = slide => String(slide.frontmatter.lesson ?? 'presentazione-corso')
// Fixtures follow slide identity, so insertions do not silently change their coverage.
function resolveFixture(lesson, title) {
  const matches = deck.slides.filter(slide => slide.frontmatter.lesson === lesson && slide.title === title)
  assert.equal(matches.length, 1, `unique fixture: ${lesson} / ${title}`)
  return pageNumber(matches[0])
}
const fixtures = {
  enlargement: [
    ["introduzione", "Oggetti che comunicano"],
    ["introduzione", "3 · Organizzare l’esperienza"],
    ["storia-design", "Due strategie di persuasione"],
    ["storia-design", "La rivista come ritmo di lettura"],
    ["storia-design", "Attività · Un controllo è riconoscibile?"],
  ],
  narrowIntroduction: [
    ["introduzione", "Introduzione a UX e UI"],
    ["introduzione", "Design e società"],
    ["introduzione", "Una forma può cambiare significato"],
    ["introduzione", "Oggetti che comunicano"],
    ["introduzione", "Come riconoscere un buon design"],
    ["introduzione", "Attività · Leggere una porta"],
    ["introduzione", "Istruzioni che guidano l’azione"],
    ["introduzione", "Dal bisogno alla risposta"],
    ["introduzione", "L’esperienza attraversa il servizio"],
    ["introduzione", "La UI è parte della UX"],
    ["introduzione", "Dove finisce il pavimento?"],
    ["introduzione", "Attività · UX, UI o usabilità?"],
    ["introduzione", "Quattordici fasi, cinque nuclei"],
    ["introduzione", "3 · Organizzare l’esperienza"],
    ["introduzione", "4 · Strutturare il sistema"],
    ["introduzione", "Il wireframe organizza la schermata"],
    ["introduzione", "5 · Verificare con un prototipo"],
    ["introduzione", "Cinque modalità del Design Thinking"],
    ["introduzione", "UX e Design Thinking si incontrano"],
    ["introduzione", "Verifica finale · Spiegare una scelta"],
  ],
  narrowHistory: [
    ["storia-design", "Storia del design"],
    ["storia-design", "Cosa impareremo"],
    ["storia-design", "Un percorso, molte continuità"],
    ["storia-design", "Prima della pagina"],
    ["storia-design", "Cina: riprodurre e ricomporre"],
    ["storia-design", "Il carattere progetta la lettura"],
    ["storia-design", "Quando il design persuade"],
    ["storia-design", "Due strategie di persuasione"],
    ["storia-design", "Attività · Leggere la persuasione"],
    ["storia-design", "Bauhaus: arte, tecnica, progetto"],
    ["storia-design", "Moholy-Nagy: comporre relazioni"],
    ["storia-design", "La rivista come ritmo di lettura"],
    ["storia-design", "Il tavolo di lavoro diventa software"],
    ["storia-design", "Dal leggere all’interagire"],
    ["storia-design", "Xerox: ambienti grafici da sperimentare"],
    ["storia-design", "WIMP: quattro elementi coordinati"],
    ["storia-design", "Attività · La metafora della scrivania"],
    ["storia-design", "Il primo web: testo e collegamenti"],
    ["storia-design", "Web 2.0: partecipazione e volume"],
    ["storia-design", "Scheumorfismo: riconoscere una funzione"],
    ["storia-design", "Flat design: ridurre il rilievo"],
    ["storia-design", "Material Design: superfici e comportamento"],
    ["storia-design", "Neumorfismo: oggetti dalla superficie"],
    ["storia-design", "Glassmorfismo: livelli e trasparenze"],
    ["storia-design", "Minimalismo: scegliere che cosa resta"],
    ["storia-design", "Y2K: reinterpretare un immaginario"],
    ["storia-design", "Massimalismo: coordinare la densità"],
    ["storia-design", "Brutalismo web e neobrutalismo"],
    ["storia-design", "Attività · Un controllo è riconoscibile?"],
    ["storia-design", "Verifica finale · Motivare uno stile"],
  ],
  narrowEnlargement: [
    ["introduzione", "Oggetti che comunicano"],
    ["introduzione", "3 · Organizzare l’esperienza"],
    ["storia-design", "La rivista come ritmo di lettura"],
    ["storia-design", "Attività · Un controllo è riconoscibile?"],
  ],
  print: [
    ["introduzione", "Introduzione a UX e UI"],
    ["introduzione", "Quattordici fasi, cinque nuclei"],
    ["introduzione", "5 · Verificare con un prototipo"],
    ["introduzione", "Verifica finale · Spiegare una scelta"],
    ["storia-design", "Storia del design"],
    ["storia-design", "Due strategie di persuasione"],
    ["storia-design", "WIMP: quattro elementi coordinati"],
    ["storia-design", "Attività · Un controllo è riconoscibile?"],
    ["storia-design", "Verifica finale · Motivare uno stile"],
  ],
}
const fixturePages = name => fixtures[name]
  .filter(([lesson]) => lesson !== 'storia-design' || history.length)
  .map(([lesson, title]) => resolveFixture(lesson, title))
const webStyleFonts = {
  html: ['Cvedi Noto Serif', 'Cvedi Noto Serif', 'Cvedi Noto Serif'],
  web2: ['Cvedi Nunito', 'Cvedi Roboto', 'Cvedi Roboto'],
  scheu: ['Cvedi Lora', 'Cvedi Lora', 'Cvedi Lora'],
  flat: ['Inter', 'Inter', 'Inter'],
  material: ['Cvedi Roboto', 'Cvedi Roboto', 'Cvedi Roboto'],
  neumo: ['Cvedi Nunito', 'Cvedi Nunito', 'Cvedi Nunito'],
  glass: ['Inter', 'Inter', 'Inter'],
  minimal: ['Inter', 'Inter', 'Inter'],
  y2k: ['Cvedi Audiowide', 'Cvedi Space Grotesk', 'Cvedi IBM Plex Mono'],
  max: ['Cvedi Fraunces', 'Cvedi Space Grotesk', 'Cvedi IBM Plex Mono'],
  neo: ['Cvedi Archivo Black', 'Cvedi IBM Plex Mono', 'Cvedi IBM Plex Mono'],
}
const recoveredPages = audit.integratedSlides.map(entry => {
  const slide = deck.slides.find(slide => slide.frontmatter.routeAlias === entry.alias)
  assert.ok(slide, `recovered fixture: ${entry.alias}`)
  return pageNumber(slide)
})
const uxPages = uxSlides.map(pageNumber)
const briefPages = brief.map(pageNumber)
const topicPages = approfondimenti.map(pageNumber)
const introductionDiscussion = lesson.filter(slide => String(slide.frontmatter.class).includes('lesson-activity'))[2]
const historyDiscussion = history.filter(slide => String(slide.frontmatter.class).includes('lesson-activity'))[2]
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
  await page.getByRole('button', { name: /Introduzione a UX e UI/ }).click()
  await page.locator(`.slidev-page-${introductionStart} .slidev-layout`).waitFor()
  assert.equal(await page.locator(`.slidev-page-${introductionStart} h1`).textContent(), 'Introduzione a UX e UI', 'index opens theoretical chapter')
  await page.goto(`${baseURL.replace(/\/$/, '')}/#/3`, { waitUntil: 'networkidle' })
  assert.equal(await page.locator('.slidev-page-3 .index-grid .index-button').count(), 2, 'index shows only the two available lessons')
  assert.equal(await page.getByRole('button', { name: /Storia del design/ }).count(), 0, 'history index entry stays hidden')
  await page.locator('.slidev-page-3').getByRole('button', { name: /Brief/i }).click()
  await page.locator(`.slidev-page-${briefStart} .slidev-layout`).waitFor()
  assert.equal(await page.locator(`.slidev-page-${briefStart} h1`).textContent(), brief[0].title, 'index opens standalone project brief')
  await page.goto(`${baseURL.replace(/\/$/, '')}/#/3`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Approfondimenti individuali/ }).click()
  await page.locator(`.slidev-page-${topicPages[0]} .slidev-layout`).waitFor()
  assert.equal(await page.locator(`.slidev-page-${topicPages[0]} h1`).textContent(), 'Approfondimenti', 'index opens the official topic section')
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
      let contentCenterError = null
      if (root.classList.contains('centered-content-slide')) {
        const content = [...root.children].filter(element => {
          const style = getComputedStyle(element)
          return element !== title && !element.classList.contains('slide-footer')
            && !['absolute', 'fixed'].includes(style.position) && style.display !== 'none'
        }).map(element => element.getBoundingClientRect()).filter(rect => rect.width && rect.height)
        if (content.length) {
          const titleBox = title.getBoundingClientRect()
          const areaTop = titleBox.bottom + parseFloat(getComputedStyle(title).marginBottom) * scale
          const areaBottom = box.bottom - parseFloat(getComputedStyle(root).paddingBottom) * scale
          const contentTop = Math.min(...content.map(rect => rect.top))
          const contentBottom = Math.max(...content.map(rect => rect.bottom))
          contentCenterError = Math.abs((contentTop + contentBottom - areaTop - areaBottom) / (2 * scale))
        }
      }
      const webStyle = [...root.classList].find(name => name.startsWith('web-style-') && name !== 'web-style-slide')?.replace('web-style-', '')
      const webTypography = webStyle ? [title, root.querySelector('p'), root.querySelector('.lesson-caption')].map(element => {
        if (!element) return null
        const family = getComputedStyle(element).fontFamily
        return { family, loaded: document.fonts.check(`16px ${family.split(',')[0]}`) }
      }) : null
      const figures = [...root.querySelectorAll('.lesson-figure img')].map(img => {
        const rect = img.getBoundingClientRect()
        const fit = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight)
        return { src: img.getAttribute('src'), width: Math.round(rect.width / scale), height: Math.round(rect.height / scale), visibleWidth: Math.round(img.naturalWidth * fit / scale), visibleHeight: Math.round(img.naturalHeight * fit / scale), fit: getComputedStyle(img).objectFit }
      })
      return {
        page: expected,
        title: title?.textContent.trim(),
        titleTop: Math.round((title.getBoundingClientRect().top - box.top) / scale),
        titleLeft: Math.round((title.getBoundingClientRect().left - box.left) / scale),
        cover: root.classList.contains('cover-slide') || root.classList.contains('chapter-slide'),
        contentCenterError,
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
        webStyle,
        webTypography,
      }
    }, number)
    const current = deck.slides[number - 1]
    const set = deck.slides.filter(slide => lessonOf(slide) === lessonOf(current))
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
    if (!report.cover) {
      assert.equal(report.titleTop, 52, `slide ${number}: stable title top`)
      assert.equal(report.titleLeft, 72, `slide ${number}: stable title left`)
    }
    if (report.contentCenterError !== null)
      assert.ok(report.contentCenterError <= 1, `slide ${number}: vertically centered content (${report.contentCenterError.toFixed(2)}px offset)`)
    if (report.webStyle) {
      const expectedFonts = webStyleFonts[report.webStyle]
      assert.ok(expectedFonts, `slide ${number}: known interface style`)
      for (const [index, typography] of report.webTypography.entries()) {
        if (!typography) continue
        assert.ok(typography.family.includes(expectedFonts[index]), `slide ${number}: style typeface for role ${index}`)
        assert.ok(typography.loaded, `slide ${number}: local style font loaded for role ${index}`)
      }
    }
    for (const figure of report.figures) {
      assert.ok(figure.width > 0 && figure.height > 0, `slide ${number}: visible figure`)
      assert.ok(['contain', 'cover'].includes(figure.fit), `slide ${number}: preserved image proportions`)
    }
    if (current.content.includes('<UxProcessMap')) assert.equal(await slide.locator('.ux-process-map li').count(), 14, 'all fourteen UX phases are rendered')
    if (report.archiveWall) {
      assert.ok(projects.length >= 12, 'archive: enough project screenshots to cycle')
      assert.equal(report.galleryImages, 12, 'archive: twelve full-screen image windows')
    }
    reports.push({ ...report, lesson: lessonOf(current), lessonPage, lessonTotal: set.length, narrow, print })
    if (output) await page.screenshot({ path: `${output}/${print ? 'print-' : narrow ? 'narrow-' : ''}${number}.png` })
  }
  for (let number = 1; number <= total; number++) await inspect(number)
  for (const [index, example] of uxExamples.entries()) {
    const number = uxPages[index]
    await page.goto(`${baseURL.replace(/\/$/, '')}/#/${number}`, { waitUntil: 'networkidle' })
    const slide = page.locator(`.slidev-page-${number} .slidev-layout`)
    await slide.waitFor()
    await page.waitForFunction(({ number, src }) => {
      const img = document.querySelector(`.slidev-page-${number} .lesson-image-button img`)
      return img?.getAttribute('src')?.endsWith(src) && img.complete && img.naturalWidth > 0
    }, { number, src: example.src })
    assert.equal(await slide.locator('h1').textContent(), example.title, `UX example ${example.id}: heading`)
    assert.equal(await slide.locator('.lesson-image-button img').count(), 1, `UX example ${example.id}: one photo`)
    assert.equal(await slide.locator('.lesson-image-button img').getAttribute('alt'), example.alt, `UX example ${example.id}: image description`)
    assert.equal(await slide.locator('select, .ux-example-controls').count(), 0, `UX example ${example.id}: no selector or carousel controls`)
  }
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
  for (const number of [...fixturePages('enlargement'), uxPages[0], uxPages[9], topicPages[1], topicPages[9], topicPages.at(-1)]) await inspectEnlargement(number)
  await page.setViewportSize({ width: 636, height: 778 })
  const narrowNumbers = new Set([
    2, 3, 4, 8, 12, 19,
    // Chapter opening, comparisons, images, six cards, process maps and activities.
    ...fixturePages('narrowIntroduction'),
    // History: opening, timeline, images, paired posters, cards, activities and long titles.
    ...fixturePages('narrowHistory'),
    ...uxPages, ...recoveredPages, ...briefPages, ...topicPages, total,
    ...reports.filter(report => report.projectSection || report.archiveWall || ['Progetti e approfondimenti', 'Voti finali: sei anni a confronto'].includes(report.title)).map(report => report.page),
  ])
  for (const number of narrowNumbers) await inspect(number, true)
  for (const number of [...fixturePages('narrowEnlargement'), uxPages[9], topicPages[9], topicPages.at(-1)]) await inspectEnlargement(number, true)
  // Check print styles without generating a PDF. Slidev's full print route
  // is enabled only for export/download builds.
  await page.emulateMedia({ media: 'print' })
  await page.setViewportSize({ width: 1280, height: 720 })
  for (const number of new Set([...fixturePages('print'), ...uxPages, ...recoveredPages, ...briefPages, ...topicPages, total])) await inspect(number, false, true)
  assert.equal(await page.getByText('Tempo previsto:', { exact: false }).count(), 0, 'presenter notes are not printed as content')
  await page.emulateMedia({ media: 'screen' })
  await page.close()
  // Open each presenter entry in a fresh page: dev notes are fetched separately
  // and Slidev keeps a per-page note cache when changing between player routes.
  for (const discussion of [introductionDiscussion, historyDiscussion].filter(Boolean)) {
    assert.ok(discussion, 'each chapter has a third classroom activity')
    const number = pageNumber(discussion)
    const isHistory = discussion.frontmatter.lesson === 'storia-design'
    const presenter = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
    presenter.on('pageerror', error => {
      if (error.message !== 'Wake Lock permission request denied') errors.push(error.message)
    })
    await presenter.goto(`${baseURL.replace(/\/$/, '')}/#/presenter/${number}`, { waitUntil: 'networkidle' })
    await presenter.locator('.note').filter({ hasText: new RegExp(`Slide ${discussion.frontmatter.lessonSlide} del capitolo`) }).waitFor()
    const note = await presenter.locator('.note').innerText()
    assert.match(note, /Terza attività/, `presenter ${number}: discussion instructions`)
    const bookletReference = discussion.note.match(/^Booklet:.*$/m)?.[0]
    assert.ok(bookletReference, `presenter ${number}: booklet reference in source`)
    assert.ok(note.includes(bookletReference), `presenter ${number}: current booklet reference is rendered`)
    if (isHistory) assert.match(note, /Lezione 05, pp\. 91–94/, 'history presenter includes PDF pages')
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
