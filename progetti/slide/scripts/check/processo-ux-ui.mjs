import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from '../../../../scripts/check/browser.mjs'
import { loadSlideDeck } from './deck.mjs'
import { checkUxProcessSources } from './processo-ux-ui-source.mjs'

const manifest = JSON.parse(await readFile('progetti/slide/assets/booklet/lezione-processo-ux-ui/manifest.json', 'utf8'))
const assets = JSON.parse(await readFile(manifest.imageManifest, 'utf8'))
const reconstructed = assets.images.filter(image => image.reconstruction || image.nativeDiagram)
const hypothesis = JSON.parse(await readFile('progetti/slide/data/ux-hypothesis.json', 'utf8'))
const persona = JSON.parse(await readFile('progetti/slide/data/ux-persona.json', 'utf8'))
const bookingFlow = JSON.parse(await readFile('progetti/slide/data/ux-booking-flow.json', 'utf8'))
const deck = await loadSlideDeck()
const summary = await checkUxProcessSources(deck)
const base = (process.env.SLIDEV_URL || 'http://localhost:3048').replace(/\/$/, '')
const lesson = base + '/lezioni/processo-ux-ui'
const output = 'reports/processo-ux-ui-slidev'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = [], failures = [], errors = []
let motion
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') errors.push(error.message) })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const cover = await openSlide(page, lesson, 1)
  motion = await cover.evaluate(async root => {
    const journey = root.getAnimations({ subtree: true }).find(animation => animation.animationName === 'cvedi-cover-journey')
    if (!journey) return { missingJourney: true }
    const timing = journey.effect.getTiming()
    journey.pause(); journey.currentTime = timing.delay + timing.duration * .85
    await new Promise(resolve => requestAnimationFrame(resolve))
    const train = root.querySelector('.metro-cover-train'), css = getComputedStyle(train)
    const head = train.getPointAtLength((parseFloat(css.strokeDasharray) - parseFloat(css.strokeDashoffset)) * train.getTotalLength()).matrixTransform(train.getScreenCTM())
    const anchor = new DOMPoint(0, 0).matrixTransform(root.querySelector('.metro-cover-stop').getScreenCTM())
    const error = Math.hypot(head.x - anchor.x, head.y - anchor.y) / (root.getBoundingClientRect().width / 1280)
    journey.play()
    return { missingJourney: false, error, visible: Number(css.opacity) > .9, duration: timing.duration + timing.delay }
  })
  assert.ok(!motion.missingJourney && motion.visible && motion.error < 1 && motion.duration <= 900, 'cover train reaches the station in a finite entrance')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const [mode, viewport, media] of [
    ['desktop', { width: 1280, height: 720 }, 'screen'],
    ['narrow', { width: 636, height: 778 }, 'screen'],
    ['print', { width: 1280, height: 720 }, 'print'],
  ]) {
    let stepGeometry
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
            if (rect.width && (rect.left < canvas.left - 1 || rect.right > canvas.right + 1 || rect.top < canvas.top - 1 || rect.bottom > bottom + 1)) overflow.push(node.textContent.trim().slice(0, 120))
        }
        const title = root.querySelector('h1'), style = title ? getComputedStyle(title) : null
        return {
          lesson: root.dataset.lesson, title: title?.textContent.trim() ?? null,
          titleTop: title ? (title.getBoundingClientRect().top - canvas.top) / scale : null, titleSize: style ? parseFloat(style.fontSize) : null,
          footer: footer?.textContent.trim(), overflow: [...new Set(overflow)],
          audio: root.querySelectorAll('audio, .lesson-audio').length,
          conceptCards: [...root.querySelectorAll('.cvedi-card')].map(card => ({ textSize: parseFloat(getComputedStyle(card.querySelector('.card-copy p')).fontSize) })),
          decisionTextSize: root.querySelector('.lesson-decision-table td') ? parseFloat(getComputedStyle(root.querySelector('.lesson-decision-table td')).fontSize) : null,
          statementSize: root.querySelector('.lesson-statement') ? parseFloat(getComputedStyle(root.querySelector('.lesson-statement')).fontSize) : null,
          emphasis: root.querySelectorAll('strong').length,
          persona: root.querySelector('.ux-persona-sheet') ? {
            text: root.querySelector('.ux-persona-sheet').textContent,
            fields: [...root.querySelectorAll('.ux-persona-field dt')].map(node => node.textContent),
            bodySizes: [...root.querySelectorAll('.ux-persona-field dd')].map(node => parseFloat(getComputedStyle(node).fontSize)),
            selectable: getComputedStyle(root.querySelector('.ux-persona-sheet')).userSelect === 'text',
          } : null,
          hypothesis: root.querySelector('.ux-hypothesis') ? {
            fields: [...root.querySelectorAll('.ux-hypothesis-field')].map(field => ({
              title: field.querySelector('dt').textContent, text: field.querySelector('dd').textContent,
              titleSize: parseFloat(getComputedStyle(field.querySelector('dt')).fontSize),
              bodySize: parseFloat(getComputedStyle(field.querySelector('dd')).fontSize),
            })),
            selectable: getComputedStyle(root.querySelector('.ux-hypothesis')).userSelect === 'text',
            images: root.querySelectorAll('.ux-hypothesis img, .ux-hypothesis svg, .lesson-image-button').length,
          } : null,
          bookingFlow: root.querySelector('.ux-booking-flow') ? {
            nodes: [...root.querySelectorAll('.booking-node')].map(node => ({
              title: node.querySelector('h2').textContent, text: node.querySelector('p').textContent,
              titleSize: parseFloat(getComputedStyle(node.querySelector('h2')).fontSize),
              bodySize: parseFloat(getComputedStyle(node.querySelector('p')).fontSize),
              fits: node.scrollHeight <= node.clientHeight + 1,
            })),
            arrows: root.querySelectorAll('.booking-route[marker-end]').length,
            labels: [...root.querySelectorAll('.booking-label')].map(label => label.textContent),
            relationships: [...root.querySelectorAll('.ux-booking-flow .sr-only li')].map(item => item.textContent),
            selectable: getComputedStyle(root.querySelector('.ux-booking-flow')).userSelect === 'text',
            images: root.querySelectorAll('.ux-booking-flow img').length,
            animations: root.querySelector('.ux-booking-flow').getAnimations({ subtree: true }).length,
          } : null,
          stepFields: [...root.querySelectorAll('.ux-step-overview > .list-row')].map(row => {
            const rect = row.getBoundingClientRect(), content = row.querySelector('dd')
            return { label: row.querySelector('dt').textContent, top: (rect.top - canvas.top) / scale,
              rowLeft: (rect.left - canvas.left) / scale, rowRight: (rect.right - canvas.left) / scale,
              bottom: (rect.bottom - canvas.top) / scale, contentBottom: (content.getBoundingClientRect().bottom - canvas.top) / scale,
              headingGap: (content.getBoundingClientRect().top - row.querySelector('dt').getBoundingClientRect().bottom) / scale,
              left: (content.getBoundingClientRect().left - canvas.left) / scale,
              textSize: parseFloat(getComputedStyle(content.querySelector('p, li')).fontSize) }
          }),
          courseRecall: root.querySelector('.ux-step-recall') ? (() => {
            const box = root.querySelector('.ux-step-recall'), link = box.querySelector('a')
            return { title: box.querySelector('h2').textContent, text: box.querySelector('p').textContent,
              textSize: parseFloat(getComputedStyle(box.querySelector('p')).fontSize), href: link.href,
              newTab: link.target === '_blank' && link.relList.contains('noopener') && link.relList.contains('noreferrer') }
          })() : null,
          caseDocument: root.querySelector('.ux-case-artifact') ? {
            labels: [...root.querySelectorAll('.ux-case-artifact th')].map(cell => parseFloat(getComputedStyle(cell).fontSize)),
            body: [...root.querySelectorAll('.ux-case-artifact td')].map(cell => parseFloat(getComputedStyle(cell).fontSize)),
          } : null,
          noticeGap: root.querySelector(':scope > .cvedi-notice') ? (root.querySelector(':scope > .cvedi-notice').getBoundingClientRect().top - root.querySelector(':scope > .cvedi-notice').previousElementSibling.getBoundingClientRect().bottom) / scale : null,
          noticeBottom: root.querySelector(':scope > .cvedi-notice') ? (canvas.bottom - root.querySelector(':scope > .cvedi-notice').getBoundingClientRect().bottom) / scale : null,
          zoomHintOpacity: [...root.querySelectorAll('.lesson-image-hint')].map(node => parseFloat(getComputedStyle(node).opacity)),
          cards: [...root.querySelectorAll('.card-background')].map(image => ({ loaded: image.complete && image.naturalWidth > 0, width: parseFloat(getComputedStyle(image).width) })),
          captions: [...root.querySelectorAll('.lesson-caption')].map(caption => parseFloat(getComputedStyle(caption).fontSize)),
          figures: [...root.querySelectorAll('.lesson-figure')].filter(figure => figure.getClientRects().length > 0).map(figure => {
            const image = figure.querySelector('img'), rect = image.getBoundingClientRect(), css = getComputedStyle(image)
            return { src: image.src, loaded: image.complete && image.naturalWidth > 0, alt: !!image.alt,
              width: rect.width / scale, height: rect.height / scale, naturalWidth: image.naturalWidth,
              fits: rect.top >= canvas.top && rect.bottom <= bottom + 1,
              ratioDelta: Math.abs(rect.width / rect.height - image.naturalWidth / image.naturalHeight),
              noFrame: css.borderTopWidth === '0px' && css.boxShadow === 'none' }
          }),
          scroll: [...root.querySelectorAll('div, ul')].some(element => ['auto', 'scroll'].includes(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight + 1),
        }
      })
      reports.push({ mode, slide: slide.lessonSlide, ...report })
      const context = `${mode}/${slide.lessonSlide} ${slide.title}`
      const require = (condition, description) => { if (!condition) failures.push(context + ': ' + description) }
      require(report.lesson === manifest.lesson, 'owning lesson identity')
      require(report.overflow.length === 0, 'text overflow: ' + report.overflow.join(' | '))
      require(!report.scroll && report.audio === 0, 'no internal scrolling or unrequested narration')
      require(report.captions.every(size => size === 18), 'common caption scale')
      for (const figure of report.figures) {
        require(figure.loaded && figure.alt && figure.fits && figure.noFrame, 'intact visible figure, alt and no frame')
        require(['cast', 'persona-sheet'].includes(slide.kind) ? figure.width >= 120 && figure.height >= 180 : figure.width > 500 && figure.height > 100, 'readable figure at the scale of its role')
        require(figure.ratioDelta < .01, 'original proportions')
        const graphic = reconstructed.find(image => new URL(figure.src).pathname.endsWith(image.web))
        const reconstruction = graphic?.reconstruction ?? graphic?.nativeDiagram
        if (reconstruction) {
          figure.readingSize = figure.width / reconstruction.canvasWidth * reconstruction.bodySize
          figure.noteSize = figure.width / reconstruction.canvasWidth * reconstruction.noteSize
          figure.zoomClearance = figure.width / reconstruction.canvasWidth * reconstruction.zoomClearance
          require(figure.readingSize >= 20, 'diagram body reads at least 20 px: ' + figure.readingSize.toFixed(1))
          require(figure.noteSize >= 18, 'diagram notes read at least 18 px: ' + figure.noteSize.toFixed(1))
          require(figure.zoomClearance >= 48, 'zoom control has space beside the diagram text')
        }
      }
      if (report.footer) {
        require(report.footer.includes(`${slide.lessonSlide} / ${manifest.slideCount}`), 'autonomous pagination')
        if (slide.showTitle === false) require(report.title === null, 'the map has no visible title')
        else require(Math.abs(report.titleTop - 52) < 1 && report.titleSize === 47, 'common title position and scale')
      }
      if (slide.kind === 'objectives') require(report.cards.length === 3 && report.cards.every(card => card.loaded && card.width === 96), 'three illustrated objectives')
      if (slide.kind === 'persona-sheet') {
        require(report.persona?.selectable && !report.persona.text.includes('Claudia'), 'the persona is native selectable Viola content')
        require([persona.name, persona.profile, persona.quote, persona.goal, persona.openQuestion, ...persona.fields.map(field => field.text)].every(text => report.persona?.text.includes(text)), 'the complete persona profile is readable')
        require(JSON.stringify(report.persona?.fields) === JSON.stringify(persona.fields.map(field => field.title)) && report.persona?.bodySizes.every(size => size >= 20), 'the persona fields retain readable type and order')
        require(report.figures.length === 1 && report.figures[0].src.endsWith('/viola-realistica.webp'), 'the approved Viola portrait is present')
      }
      if (slide.slug === 'ipotesi') {
        require(report.hypothesis?.selectable && report.hypothesis.images === 0, 'the hypothesis is selectable native content without an image or zoom control')
        require(JSON.stringify(report.hypothesis?.fields.map(({ title, text }) => ({ title, text }))) === JSON.stringify(hypothesis.fields.map(({ title, text }) => ({ title, text }))), 'all four hypothesis parts retain their exact wording')
        require(report.hypothesis?.fields.every(field => field.titleSize === 24 && field.bodySize === 23), 'native hypothesis headings and body retain the shared type scales')
      }
      if (slide.alias === 'processo-ux-ui-flow-esempio') {
        const flow = report.bookingFlow
        require(flow?.selectable && flow.images === 0 && flow.animations === 0, 'flow uses native selectable text and is static in reduced motion and print')
        require(flow?.arrows === bookingFlow.connections.length && JSON.stringify(flow.relationships) === JSON.stringify(bookingFlow.connections.map(edge => edge.description)), 'all directed relationships have an accessible description')
        require(JSON.stringify(flow?.nodes.map(({ title, text }) => ({ title, text }))) === JSON.stringify(bookingFlow.nodes.map(({ title, text }) => ({ title, text }))), 'all booking states retain their wording')
        require(flow?.nodes.every(node => node.fits && node.titleSize === 24 && node.bodySize === 20), 'flow content fits at the shared card scales')
        require(['Sì', 'No', 'Correggi', 'Rivedi', 'Accetta'].every(label => flow?.labels.includes(label)), 'decision, correction and conditional acceptance labels are explicit')
      }
      if (slide.kind === 'step-intro') {
        require(JSON.stringify(report.stepFields.map(field => field.label)) === JSON.stringify(['Domanda', 'Attività', 'Risultato']), 'same three fields before the course recall box in every step')
        require(JSON.stringify(report.stepFields.map(field => field.textSize)) === JSON.stringify([27, 23, 23]), 'shared question and body type scales')
        require(report.courseRecall?.title === 'Argomenti già affrontati' && report.courseRecall.text.includes(slide.courseRecall.application), 'clear course recall box retains the applied connection')
        require(report.courseRecall?.textSize === 20 && report.courseRecall.newTab && report.courseRecall.href.endsWith('#/' + slide.courseRecall.alias), 'readable course recall opens the relevant earlier slide separately')
        require(Math.abs(report.noticeBottom - 82) < .1 && report.noticeGap >= 15.9, 'course recall box keeps a common footer-safe baseline and space above')
        const [question, activities, outcome] = report.stepFields
        require(activities.top - question.bottom >= 23.9 && Math.abs(activities.top - outcome.top) < .5, 'question leads the aligned activities and outcome columns')
        require(outcome.rowLeft - activities.rowRight >= 47.9, 'activities and outcome have the shared 48 px column gap')
        require([activities, outcome].every(field => field.headingGap >= 11.9 && field.contentBottom <= field.bottom + .5), 'headings group with their complete content above the course recall')
        stepGeometry ??= report.stepFields
        require(report.stepFields.every((field, index) => Math.abs(field.top - stepGeometry[index].top) < .5 && Math.abs(field.left - stepGeometry[index].left) < .5), 'all fourteen steps align to the same field positions')
      }
      if (slide.kind === 'case-application') {
        require(report.figures.length === 0 && report.captions.length === 0, 'application keeps its own readable document without the removed caption')
        require(report.caseDocument?.labels.every(size => size === 18) && report.caseDocument?.body.every(size => size === 20), 'case documents keep readable labels and body')
      }
      if (slide.cards) require(report.conceptCards.length === slide.cards.length && report.conceptCards.every(card => card.textSize === 20), 'complete comparison at the shared card-body scale')
      if (slide.cards?.some(card => card.artwork)) require(report.cards.length === slide.cards.length && report.cards.every(card => card.loaded && card.width === (slide.cards.length === 2 ? 168 : 96)), 'all card illustrations load at the shared scale for their column count')
      if (slide.notice) {
        require(Math.abs(report.noticeBottom - 82) < .1, 'notice aligns to the common footer-safe baseline')
        require(report.noticeGap >= 24, 'centered body keeps at least 24 px before the bottom notice')
      }
      if (slide.figureRole === 'document' && mode !== 'print') require(report.zoomHintOpacity.every(opacity => opacity >= .8), 'document zoom remains easy to discover')
      if (slide.kind === 'decision-table') require(report.decisionTextSize === 23, 'decision table uses the shared body scale')
      if (slide.kind === 'takeaway') require(report.statementSize === 42, 'closing statement keeps the existing display role')
      if (slide.emphasis?.length) require(report.emphasis > 0, 'semantic emphasis is visible')
      if (mode === 'desktop') await page.screenshot({ path: `${output}/slide-${String(slide.lessonSlide).padStart(2, '0')}.png` })
      else if (slide.figures.some(code => reconstructed.some(image => image.code === code)) || ['step-intro', 'teaching', 'illustrated', 'comparison', 'sequence', 'takeaway', 'decision-table', 'persona-sheet'].includes(slide.kind) || ['mappe-diverse', 'ui', 'caso', 'mappa', 'attivita-prova'].includes(slide.slug)) await page.screenshot({ path: `${output}/${mode}-${slide.lessonSlide}.png` })
    }
    console.log(`Processo UX/UI: ${mode}, ${manifest.slideCount} slides inspected.`)
  }
  await page.emulateMedia({ media: 'screen' })
  await page.setViewportSize({ width: 1280, height: 720 })
  const firstStep = manifest.slides.find(slide => slide.kind === 'step-intro')
  await openSlide(page, lesson, firstStep.lessonSlide)
  const recallLink = page.locator('.slidev-layout.is-active .ux-step-recall a')
  await recallLink.focus()
  const popupPromise = page.waitForEvent('popup')
  await page.keyboard.press('Enter')
  const priorLesson = await popupPromise
  await priorLesson.locator('.slidev-layout.is-active h1').waitFor()
  const recalledSlide = deck.slides.find(slide => slide.frontmatter.routeAlias === firstStep.courseRecall.alias)
  assert.equal((await priorLesson.locator('.slidev-layout.is-active h1').textContent()).trim(), recalledSlide.title, 'keyboard link opens the actual earlier slide')
  assert.ok(page.url().endsWith('/' + firstStep.lessonSlide), 'the process lesson remains at the same step')
  await priorLesson.close()
  await openSlide(page, lesson, manifest.slides.find(slide => slide.slug === 'persona-documento').lessonSlide)
  const zoom = page.locator('.slidev-layout.is-active .lesson-image-button').first()
  await zoom.focus(); await page.keyboard.press('Enter')
  await page.locator('dialog[open]').waitFor({ state: 'visible' })
  await page.keyboard.press('Escape')
  await page.locator('dialog[open]').waitFor({ state: 'detached' })
  assert.equal(await zoom.evaluate(node => document.activeElement === node), true, 'figure focus restored')
  // Verify the added row without changing the shared menu's geometry.
  await openSlide(page, base, 3)
  const link = page.getByRole('link').filter({ hasText: 'Processo UX e UI' })
  await link.waitFor({ state: 'visible' })
  assert.ok(await link.evaluate(node => {
    const root = node.closest('.slidev-layout').getBoundingClientRect(), rect = node.getBoundingClientRect()
    const footer = node.closest('.slidev-layout').querySelector('.slide-footer').getBoundingClientRect()
    return rect.left >= root.left && rect.right <= root.right && rect.bottom <= footer.top - 6
  }), 'lesson 11 fits in the menu')
  await page.screenshot({ path: `${output}/indice.png` })
  await link.focus(); await page.keyboard.press('Enter')
  await page.waitForURL(/lezioni\/processo-ux-ui/)
  await page.locator('.chapter-slide.is-active').waitFor({ state: 'visible' })
  await page.keyboard.press('ArrowRight')
  await page.locator('.slidev-page-2 .slidev-layout').waitFor({ state: 'visible' })
  await openSlide(page, lesson, manifest.slideCount)
  await page.keyboard.press('ArrowRight')
  assert.equal(await page.locator('.slidev-layout.is-active').getAttribute('data-lesson'), manifest.lesson)
  const back = page.getByRole('link', { name: 'Torna al menu delle lezioni', exact: true })
  await back.focus(); await page.keyboard.press('Enter')
  await page.waitForURL(base + '/#/3')
  assert.deepEqual(errors, [], 'no page errors')
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({ summary, motion, failures, errors, reports }, null, 2) + '\n')
  await browser.close()
}
assert.deepEqual(failures, [])
console.log('Processo UX/UI: desktop, narrow viewport, print, figures, keyboard, index, zoom and return passed.')
