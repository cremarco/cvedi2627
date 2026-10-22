import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { loadSlideDeck } from './deck.mjs'
import { openSlide } from '../../../../scripts/check/browser.mjs'

const deck = await loadSlideDeck()
const slides = deck.slides.filter(s => s.frontmatter.interactiveExample)
assert.equal(slides.length, 17)
const exampleSources = JSON.parse(await readFile(new URL('../../../../risorse-condivise/fonti/booklet/accessibilita-commenti-2026-10/esempi.json', import.meta.url), 'utf8'))
const base = process.env.SLIDEV_URL || 'http://localhost:3045'
const out = process.env.A11Y_REPORT || 'reports/lesson-05/interactive'
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
const errors = [], reports = []
const expectedPhotos = { tastiera: 'course.webp', autenticazione: 'course.webp', immagini: 'product.webp', semantica: 'product.webp', media: 'campus.webp', feedback: 'course.webp', movimento: 'course.webp', personalizzazione: 'library.webp' }
const serviceAssets = new Set()
const renderModes = [['desktop', { width: 1280, height: 720 }, 'screen'], ['narrow', { width: 390, height: 844 }, 'screen'], ['print', { width: 1280, height: 720 }, 'print']]
const hasFocus = locator => locator.evaluate(e => e === document.activeElement)
const insight = scenario => scenario.locator('.a11y-scenario-insight').textContent()
const taskState = demo => demo.locator('.a11y-ui, .a11y-scenario-tools').evaluateAll(nodes => nodes.map(node => ({
  text: node.textContent.replace(/\s+/g, ' ').trim(),
  controls: [...node.querySelectorAll('button, input, select, textarea')].map(control => ({ tag: control.tagName, type: control.type, value: control.value, checked: control.checked, disabled: control.disabled,
    expanded: control.getAttribute('aria-expanded'), pressed: control.getAttribute('aria-pressed') })),
})))
const serviceContentGeometry = demo => {
  const layout = demo.closest('.slidev-layout'), canvas = layout.getBoundingClientRect(), scale = canvas.width / 1280
  const footerTop = layout.querySelector('.slide-footer').getBoundingClientRect().top, clipped = [], focusClipped = []
  const clippingValues = new Set(['auto', 'scroll', 'hidden', 'clip'])
  const describe = node => node.className || node.tagName.toLowerCase()
  for (const ui of demo.querySelectorAll('.a11y-ui, .a11y-scenario-lab')) {
    const isService = ui.matches('.a11y-ui')
    const variant = ui.closest('[data-variant]').dataset.variant, uiBox = ui.getBoundingClientRect(), uiStyle = getComputedStyle(ui)
    const contentBox = { left: uiBox.left + parseFloat(uiStyle.paddingLeft) * scale, right: uiBox.right - parseFloat(uiStyle.paddingRight) * scale,
      top: uiBox.top + parseFloat(uiStyle.paddingTop) * scale, bottom: uiBox.bottom - parseFloat(uiStyle.paddingBottom) * scale }
    const checkRect = (node, rect, type, text, focusMargin = 0) => {
      const intendedReflow = variant === 'bad' && Boolean(node.closest('.perception-rigid'))
      const paint = { left: rect.left - focusMargin * scale, right: rect.right + focusMargin * scale, top: rect.top - focusMargin * scale, bottom: rect.bottom + focusMargin * scale }
      const results = type === 'focus' ? focusClipped : clipped
      const taskBounds = isService ? type === 'control' ? contentBox : uiBox : type === 'focus'
        ? { left: uiBox.left - 6 * scale, right: uiBox.right + 6 * scale, top: uiBox.top - 6 * scale, bottom: uiBox.bottom + 6 * scale } : uiBox
      const taskCutX = Math.max(taskBounds.left - paint.left, paint.right - taskBounds.right), taskCutY = Math.max(taskBounds.top - paint.top, paint.bottom - taskBounds.bottom)
      if (!intendedReflow && taskCutX > scale) results.push({ variant, type, text, axis: 'horizontal', ancestor: 'service content area', cut: taskCutX / scale })
      if (taskCutY > scale) results.push({ variant, type, text, axis: 'vertical', ancestor: 'service content area', cut: taskCutY / scale })
      if (paint.bottom > footerTop + scale) results.push({ variant, type, text, axis: 'vertical', ancestor: 'slide footer', cut: (paint.bottom - footerTop) / scale })
      for (let ancestor = type === 'text' ? node : node.parentElement; ancestor && layout.contains(ancestor); ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor), box = ancestor.getBoundingClientRect()
        const clip = { left: box.left + ancestor.clientLeft * scale, top: box.top + ancestor.clientTop * scale,
          right: box.left + (ancestor.clientLeft + ancestor.clientWidth) * scale, bottom: box.top + (ancestor.clientTop + ancestor.clientHeight) * scale }
        const cutX = Math.max(clip.left - paint.left, paint.right - clip.right), cutY = Math.max(clip.top - paint.top, paint.bottom - clip.bottom)
        if (!intendedReflow && clippingValues.has(style.overflowX) && cutX > scale) results.push({ variant, type, text, axis: 'horizontal', ancestor: describe(ancestor), cut: cutX / scale })
        if (clippingValues.has(style.overflowY) && cutY > scale) results.push({ variant, type, text, axis: 'vertical', ancestor: describe(ancestor), cut: cutY / scale })
      }
    }
    const walker = document.createTreeWalker(ui, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const textNode = walker.currentNode, node = textNode.parentElement, text = textNode.textContent.replace(/\s+/g, ' ').trim()
      if (!text || node.closest('svg, style, script, input, textarea, select, option, [aria-hidden="true"], .sr-only') || getComputedStyle(node).visibility !== 'visible') continue
      const range = document.createRange(); range.selectNodeContents(textNode)
      for (const rect of range.getClientRects()) if (rect.width > 0 && rect.height > 0) checkRect(node, rect, 'text', text.slice(0, 100))
    }
    for (const control of ui.querySelectorAll('button, input, select, textarea, .a11y-fake-link, .a11y-mouse-select, [draggable="true"]')) {
      const rect = control.getBoundingClientRect(), style = getComputedStyle(control)
      if (!rect.width || !rect.height || style.visibility !== 'visible') continue
      const text = control.getAttribute('aria-label') || control.labels?.[0]?.textContent.trim() || control.textContent.trim() || control.type
      checkRect(control, rect, 'control', text)
      if (control.matches('button, input, select, textarea') && !control.disabled) checkRect(control, rect, 'focus', text, 6)
      if (control === document.activeElement && style.outlineStyle !== 'none' && style.outlineColor !== 'rgba(0, 0, 0, 0)') checkRect(control, rect, 'focus', text, Math.max(0, parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset)))
    }
  }
  return { clippedServiceContent: clipped, clippedFocusPaint: focusClipped }
}
async function assertServiceContent(target, label) {
  const geometry = await target.evaluate(serviceContentGeometry)
  assert.deepEqual(geometry.clippedServiceContent, [], label + ': text and controls are fully visible: ' + JSON.stringify(geometry.clippedServiceContent.slice(0, 8)))
  assert.deepEqual(geometry.clippedFocusPaint, [], label + ': focus paint remains visible: ' + JSON.stringify(geometry.clippedFocusPaint.slice(0, 8)))
}
page.on('pageerror', e => { if (e.message !== 'Wake Lock permission request denied') errors.push(e.message) })
try {
  for (const slide of slides) {
    const root = await openSlide(page, base, slide.index + 1, { settle: true })
    const demo = root.locator('.a11y-demo'), good = demo.locator('[data-variant="good"]'), bad = demo.locator('[data-variant="bad"]')
    const source = exampleSources.find(example => example.key === slide.frontmatter.interactiveExample)
    assert.ok(source, slide.title + ': source example exists')
    assert.equal(await demo.count(), 1, slide.title)
    assert.equal(await demo.locator('.a11y-scenario').count(), 2)
    assert.equal(await demo.locator('.a11y-demo-task').count(), 0, slide.title + ': the redundant task paragraph is removed from the DOM')
    for (const scenario of [bad, good]) {
      assert.equal(await scenario.locator('.a11y-service-header, .a11y-service-brand').count(), 0, slide.title + ': redundant service names and their headers are removed')
      assert.equal(await scenario.locator('.a11y-service-section').count(), 0, slide.title + ': the redundant service note is removed')
      assert.equal(await scenario.locator('.a11y-app').count(), 1)
      assert.equal(await scenario.locator('.a11y-ui .a11y-lab-control-group').count(), 0, slide.title + ': teaching controls are outside the service')
      assert.equal(await scenario.locator('.a11y-scenario-lab > .a11y-scenario-tools').count(), 1)
      assert.doesNotMatch(await scenario.locator('.a11y-ui').textContent(), /Inizia (?:dalla Email|la prova)|Simula l’incolla|Simula aggiornamento|Password della prova:|Restringi a 320 CSS px|Prova senza foto|Quale uscita nomina\?|Puoi capire il colore/, slide.title + ': the service has no exercise commands or questions')
      if (expectedPhotos[slide.frontmatter.interactiveExample] && slide.frontmatter.interactiveExample !== 'immagini') assert.ok(await scenario.locator(`.a11y-ui img[src$="/${expectedPhotos[slide.frontmatter.interactiveExample]}"]`).count(), slide.title + ': the task uses its service photo')
    }
    assert.deepEqual(await bad.locator('.a11y-ui img').evaluateAll(nodes => nodes.map(node => node.getAttribute('src'))), await good.locator('.a11y-ui img').evaluateAll(nodes => nodes.map(node => node.getAttribute('src'))), slide.title + ': both variants use the same original images')
    const initialTaskState = await taskState(demo)
    assert.equal(await demo.locator('.a11y-scenario-insight[role="note"]').count(), 2)
    assert.equal(await demo.locator('.a11y-scenario-insight[aria-live]').count(), 0, 'teaching notes do not impersonate the service feedback')
    const helpButton = demo.getByRole('button', { name: 'Come verificare questo esempio', exact: true })
    const helpPanel = demo.locator('.a11y-verification-panel')
    const helpFitsCanvas = () => helpPanel.evaluate(node => {
      const panel = node.getBoundingClientRect(), canvas = node.closest('.slidev-layout').getBoundingClientRect()
      return panel.left >= canvas.left - 1 && panel.right <= canvas.right + 1 && panel.top >= canvas.top - 1 && panel.bottom <= canvas.bottom + 1
    })
    assert.equal(await helpButton.count(), 1)
    assert.equal(await helpButton.getAttribute('aria-expanded'), 'false')
    assert.equal(await helpPanel.isVisible(), false, slide.title + ': verification starts closed')
    assert.ok(await helpButton.evaluate(node => Boolean(node.closest('[data-tip]')?.getAttribute('data-tip'))), slide.title + ': verification icon has a tooltip')
    for (const scenario of [bad, good]) {
      assert.ok(await scenario.getByRole('heading', { level: 2 }).isVisible(), slide.title + ': scenario heading is visible')
      assert.ok((await scenario.locator('.a11y-scenario-summary').textContent()).trim(), slide.title + ': scenario barrier or design choice is explained')
      assert.equal(await scenario.locator('.a11y-scenario-heading .a11y-scenario-summary').count(), 0, slide.title + ': the explanation does not consume the header area')
    }
    async function inspectModes(phase = 'initial') {
      for (const [mode, viewport, media] of renderModes) {
        await page.setViewportSize(viewport); await page.emulateMedia({ media })
        await demo.locator('.a11y-ui').evaluateAll(nodes => { for (const node of nodes) node.scrollTop = 0 })
        await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))
        const geometry = await demo.evaluate(e => {
          const box = e.getBoundingClientRect(), layout = e.closest('.slidev-layout'), canvas = layout.getBoundingClientRect()
          const footer = layout.querySelector('.slide-footer').getBoundingClientRect()
          const goodUi = e.querySelector('[data-variant="good"] .a11y-ui'), goodBox = goodUi.getBoundingClientRect()
          const goodApp = goodUi.querySelector('.a11y-app'), goodAppBox = goodApp.getBoundingClientRect()
          const scale = canvas.width / 1280, comparison = e.querySelector('.a11y-demo-comparison')
          const goodStyle = getComputedStyle(goodUi), contentBox = { left: goodBox.left + parseFloat(goodStyle.paddingLeft) * scale, right: goodBox.right - parseFloat(goodStyle.paddingRight) * scale,
            top: goodBox.top + parseFloat(goodStyle.paddingTop) * scale, bottom: goodBox.bottom - parseFloat(goodStyle.paddingBottom) * scale }
          const divider = getComputedStyle(comparison, '::after'), toolbar = e.querySelector('.a11y-demo-toolbar'), toolbarBox = toolbar.getBoundingClientRect()
          const counter = layout.querySelector('.slide-index'), counterBox = counter.getBoundingClientRect()
          const rail = document.querySelector('.presentation-progress-rail'), railBox = rail.getBoundingClientRect()
          const withinCanvas = node => {
            const rect = node.getBoundingClientRect()
            return rect.height > 0 && rect.left >= canvas.left - 1 && rect.right <= canvas.right + 1 && rect.bottom <= footer.top + 1
          }
          return {
            bottom: box.bottom, footerTop: footer.top,
            scrollers: [...e.querySelectorAll('.a11y-ui')].map(node => ({
              variant: node.closest('[data-variant]').dataset.variant,
              vertical: node.scrollHeight > node.clientHeight + 1,
              overflowY: getComputedStyle(node).overflowY,
            })),
            goodHorizontalOverflow: goodUi.scrollWidth > goodUi.clientWidth + 1,
            flatTaskSurfaces: [...e.querySelectorAll('.a11y-ui')].every(node => {
              const style = getComputedStyle(node)
              return ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'].every(name => parseFloat(style[name]) === 0)
                && style.borderRadius === '0px' && style.backgroundColor === 'rgba(0, 0, 0, 0)' && style.boxShadow === 'none'
            }),
            focusGuardInsets: [...e.querySelectorAll('.a11y-ui')].every(node => {
              const style = getComputedStyle(node)
              return ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].every(name => parseFloat(style[name]) === 6)
                && ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].every(name => parseFloat(style[name]) === -6)
                && style.overflowX === 'visible' && style.overflowY === 'visible'
            }),
            equalColumns: Math.abs(e.querySelector('[data-variant="bad"]').getBoundingClientRect().width - e.querySelector('[data-variant="good"]').getBoundingClientRect().width) / scale <= 1,
            divider: { width: parseFloat(divider.width), visible: !['none', 'normal'].includes(divider.content) && divider.display !== 'none' && divider.backgroundColor !== 'rgba(0, 0, 0, 0)',
              centered: Math.abs(parseFloat(divider.left) + parseFloat(divider.width) / 2 - comparison.clientWidth / 2) <= 1,
              fullHeight: Math.abs(parseFloat(divider.height) - comparison.clientHeight) <= 1 },
            serviceHeadersAbsent: e.querySelectorAll('.a11y-service-header, .a11y-service-brand').length === 0,
            taskContentFirst: [...e.querySelectorAll('.a11y-ui')].every(ui => {
              const firstVisibleChild = [...ui.children].find(node => node.getBoundingClientRect().height > 0 && getComputedStyle(node).visibility === 'visible')
              return firstVisibleChild?.matches('.a11y-app') && firstVisibleChild.parentElement === ui
            }),
            teachingControlsExternal: e.querySelectorAll('.a11y-ui .a11y-lab-control-group').length === 0,
            goodAppContained: goodAppBox.left >= contentBox.left - scale && goodAppBox.right <= contentBox.right + scale && goodAppBox.top >= contentBox.top - scale && goodAppBox.bottom <= contentBox.bottom + scale,
            appsFillServiceArea: [...e.querySelectorAll('.a11y-ui')].every(ui => {
              const style = getComputedStyle(ui), bounds = ui.getBoundingClientRect(), app = ui.querySelector('.a11y-app').getBoundingClientRect()
              return Math.abs(app.top - bounds.top - parseFloat(style.paddingTop) * scale) <= scale
                && Math.abs(app.bottom - bounds.bottom + parseFloat(style.paddingBottom) * scale) <= scale
            }),
            formFields: [...goodApp.querySelectorAll('label[for]')].map(label => {
              const control = label.control, region = label.closest('.action-field, .understanding-field, .process-field')
              if (!control || !goodApp.contains(control)) return { text: label.textContent.trim(), associated: false }
              const l = label.getBoundingClientRect(), c = control.getBoundingClientRect(), r = region?.getBoundingClientRect()
              const above = l.bottom <= c.top + 1 && Math.abs(l.left - c.left) <= 1
              const beside = l.right <= c.left + 1 && l.top <= c.bottom && l.bottom >= c.top
              return { text: label.textContent.trim(), associated: true,
                controlWidth: c.width / scale,
                ordered: Boolean(label.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_FOLLOWING),
                arranged: l.height > 0 && c.height > 0 && (above || beside),
                grouped: !region || region.contains(control) && l.left >= r.left - 1 && l.right <= r.right + 1 && c.left >= r.left - 1 && c.right <= r.right + 1 && l.top >= r.top - 1 && c.bottom <= r.bottom + 1,
              }
            }),
            fullWidthFieldGroups: [...e.querySelectorAll('.a11y-ui .action-field-grid, .a11y-ui .understanding-fields, .a11y-ui .process-field')].filter(group => group.parentElement?.matches('form')).map(group => {
              const form = group.parentElement, style = getComputedStyle(form), bounds = form.getBoundingClientRect(), app = group.closest('.a11y-app').getBoundingClientRect(), rect = group.getBoundingClientRect()
              const formWidth = bounds.width / scale - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
              return { variant: group.closest('[data-variant]').dataset.variant, group: group.className, width: rect.width / scale, formWidth, appWidth: app.width / scale }
            }),
            actionPhotoFrames: [...e.querySelectorAll('.action-course-photo')].map(frame => {
              const bounds = frame.getBoundingClientRect(), figure = frame.querySelector('.a11y-service-media'), image = frame.querySelector('img'), figureBox = figure?.getBoundingClientRect(), imageBox = image?.getBoundingClientRect()
              return { variant: frame.closest('[data-variant]').dataset.variant,
                figureFillsFrame: Boolean(figureBox && Math.abs(figureBox.width - bounds.width) <= scale && Math.abs(figureBox.height - bounds.height) <= scale),
                imageFitsFrame: Boolean(imageBox && imageBox.left >= bounds.left - scale && imageBox.right <= bounds.right + scale && imageBox.top >= bounds.top - scale && imageBox.bottom <= bounds.bottom + scale && getComputedStyle(image).objectFit === 'contain') }
            }),
            servicePhotos: [...e.querySelectorAll('.a11y-ui img')].map(node => ({
              src: node.getAttribute('src'), loaded: node.complete && node.naturalWidth > 0 && node.naturalHeight > 0,
              unframed: parseFloat(getComputedStyle(node).borderWidth) === 0 && getComputedStyle(node).borderRadius === '0px' && getComputedStyle(node).boxShadow === 'none',
            })),
            mediaFrames: [...e.querySelectorAll('.process-video-image')].map(frame => {
              const media = frame.closest('.process-media'), img = frame.querySelector('img'), image = img.getBoundingClientRect(), bounds = frame.getBoundingClientRect(), style = getComputedStyle(img)
              const fit = Math.min(image.width / img.naturalWidth, image.height / img.naturalHeight), width = img.naturalWidth * fit, height = img.naturalHeight * fit
              const position = style.objectPosition.split(' ').map(value => parseFloat(value) / 100)
              const pixels = { left: image.left + (image.width - width) * position[0], top: image.top + (image.height - height) * position[1] }
              pixels.right = pixels.left + width; pixels.bottom = pixels.top + height
              const contains = (outer, inner) => inner.left >= outer.left - scale && inner.right <= outer.right + scale && inner.top >= outer.top - scale && inner.bottom <= outer.bottom + scale
              let pixelsClipped = false
              for (let ancestor = img.parentElement; ancestor && layout.contains(ancestor); ancestor = ancestor.parentElement) {
                const ancestorStyle = getComputedStyle(ancestor), rect = ancestor.getBoundingClientRect()
                const clip = { left: rect.left + ancestor.clientLeft * scale, top: rect.top + ancestor.clientTop * scale,
                  right: rect.left + (ancestor.clientLeft + ancestor.clientWidth) * scale, bottom: rect.top + (ancestor.clientTop + ancestor.clientHeight) * scale }
                if (['hidden', 'clip', 'auto', 'scroll'].includes(ancestorStyle.overflowX) && (pixels.left < clip.left - scale || pixels.right > clip.right + scale)) pixelsClipped = true
                if (['hidden', 'clip', 'auto', 'scroll'].includes(ancestorStyle.overflowY) && (pixels.top < clip.top - scale || pixels.bottom > clip.bottom + scale)) pixelsClipped = true
              }
              const subtitles = media.querySelector('.process-video-subtitles'), slot = subtitles?.getBoundingClientRect(), caption = media.querySelector('.a11y-captions'), captionBox = caption?.getBoundingClientRect()
              const metadata = media.querySelector('.process-video-caption')?.getBoundingClientRect(), captionStyle = caption && getComputedStyle(caption)
              return { variant: frame.closest('[data-variant]').dataset.variant, objectFit: style.objectFit, frameWidth: bounds.width / scale, frameHeight: bounds.height / scale,
                originalSource: img.getAttribute('src').endsWith('/images/accessibility-services/campus.webp'), naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
                renderedWidth: width / scale, renderedHeight: height / scale,
                completeImage: img.complete && img.naturalWidth > 0 && img.naturalHeight > 0 && style.clipPath === 'none' && style.maskImage === 'none'
                  && contains(bounds, pixels) && !pixelsClipped && Math.abs(width / height - img.naturalWidth / img.naturalHeight) < .0001,
                metadataAboveImage: Boolean(metadata && metadata.bottom <= bounds.top + scale),
                subtitleHeight: slot ? slot.height / scale : 0,
                subtitlesSeparate: Boolean(subtitles && !frame.contains(subtitles) && slot.top >= bounds.bottom - scale),
                captionWithinSlot: !caption || subtitles.contains(caption) && contains(slot, captionBox),
                captionLines: caption ? Math.round((captionBox.height / scale - parseFloat(captionStyle.paddingTop) - parseFloat(captionStyle.paddingBottom)) / parseFloat(captionStyle.lineHeight)) : 0,
              }
            }),
            goodUiVisible: goodBox.height > 70 * canvas.width / 1280 && withinCanvas(goodUi),
            goodUiHeight: (contentBox.bottom - contentBox.top) / scale,
            goodUiWidth: (contentBox.right - contentBox.left) / scale,
            comparisonHeight: e.querySelector('.a11y-demo-comparison').getBoundingClientRect().height / (canvas.width / 1280),
            headingCount: layout.querySelectorAll('h1').length,
            titleHidden: layout.querySelector('h1').getBoundingClientRect().width / (canvas.width / 1280) <= 1.1
              && layout.querySelector('h1').getBoundingClientRect().height / (canvas.width / 1280) <= 1.1,
            headingsVisible: [...e.querySelectorAll('.a11y-scenario h2')].every(withinCanvas),
            summariesVisible: [...e.querySelectorAll('.a11y-scenario-summary')].every(withinCanvas),
            insightsWithinFooter: [...e.querySelectorAll('.a11y-scenario-insight')].filter(node => node.getBoundingClientRect().height > 0).every(withinCanvas),
            explanations: [...e.querySelectorAll('.a11y-scenario')].map(scenario => {
              const caption = scenario.querySelector('.a11y-scenario-caption'), summary = scenario.querySelector('.a11y-scenario-summary'), note = scenario.querySelector('.a11y-scenario-insight')
              const lab = scenario.querySelector('.a11y-scenario-lab'), summaryStyle = getComputedStyle(summary), noteStyle = getComputedStyle(note)
              const summaryBox = summary.getBoundingClientRect(), noteBox = note.getBoundingClientRect(), captionBox = caption.getBoundingClientRect(), labBox = lab.getBoundingClientRect()
              return { variant: scenario.dataset.variant, summarySize: parseFloat(summaryStyle.fontSize), noteSize: parseFloat(noteStyle.fontSize), summaryWeight: summaryStyle.fontWeight,
                summaryLeading: parseFloat(summaryStyle.lineHeight) / parseFloat(summaryStyle.fontSize), noteLeading: parseFloat(noteStyle.lineHeight) / parseFloat(noteStyle.fontSize),
                outsideService: !scenario.querySelector('.a11y-ui').contains(caption) && caption.parentElement === lab && summary.parentElement === caption && note.parentElement === caption,
                noteLast: caption.lastElementChild === note && summaryBox.bottom <= noteBox.top + scale,
                noteLines: Math.round(noteBox.height / scale / parseFloat(noteStyle.lineHeight)),
                captionBottom: captionBox.bottom / scale, noteBottom: noteBox.bottom / scale, labBottom: labBox.bottom / scale }
            }),
            labsBelowService: [...e.querySelectorAll('.a11y-scenario')].every(scenario => {
              const ui = scenario.querySelector('.a11y-ui').getBoundingClientRect(), lab = scenario.querySelector('.a11y-scenario-lab').getBoundingClientRect()
              return lab.top >= ui.bottom - 1 && withinCanvas(scenario.querySelector('.a11y-scenario-lab'))
            }),
            teachingToolsHidden: [...e.querySelectorAll('.a11y-scenario-tools')].every(node => node.getBoundingClientRect().height === 0),
            toolbarVisible: toolbarBox.height > 0,
            toolbarOutOfFlow: getComputedStyle(toolbar).position === 'absolute',
            toolsWithinCanvas: toolbarBox.left >= canvas.left - 1 && toolbarBox.right <= canvas.right + 1 && toolbarBox.top >= canvas.top - 1 && toolbarBox.bottom <= canvas.bottom + 1,
            toolbarCenterDelta: Math.abs((toolbarBox.top + toolbarBox.bottom - railBox.top - railBox.bottom) / (2 * scale)),
            pagination: { size: parseFloat(getComputedStyle(counter).fontSize), centerDelta: Math.abs((counterBox.top + counterBox.bottom - railBox.top - railBox.bottom) / (2 * scale)),
              progressCompact: rail.dataset.compact === 'true', progressClearsCounter: railBox.right <= counterBox.left - 8 * scale,
              progressBeforeTools: railBox.right <= toolbarBox.left - 8 * scale,
              toolsBeforeCounter: toolbarBox.right <= counterBox.left - 8 * scale },
            toolIconsHidden: [...e.querySelectorAll('.a11y-lab-tools button')].every(node => node.getBoundingClientRect().width === 0 || getComputedStyle(node).visibility === 'hidden'),
            idsUnique: new Set([...e.querySelectorAll('[id]')].map(node => node.id)).size === e.querySelectorAll('[id]').length,
            brokenImages: [...e.querySelectorAll('img')].filter(node => !node.complete || !node.naturalWidth).length,
          }
        })
        Object.assign(geometry, await demo.evaluate(serviceContentGeometry))
        const label = `${slide.title}: ${phase} on ${mode}`
        assert.ok(geometry.bottom <= geometry.footerTop + 1, label + ': safe footer')
        assert.ok(geometry.idsUnique, label + ': unique field identifiers'); assert.equal(geometry.brokenImages, 0, label + ': images load')
        assert.equal(geometry.goodHorizontalOverflow, false, label + ': functioning scenario fits horizontally')
        assert.ok(geometry.flatTaskSurfaces, label + ': outer task regions have no card surface, border, radius or shadow')
        assert.ok(geometry.focusGuardInsets, label + ': six compensated pixels preserve focus paint without shrinking or clipping the task')
        assert.ok(geometry.goodAppContained, label + ': all functioning service content stays inside the reserved content area')
        assert.ok(geometry.appsFillServiceArea, label + ': both applications use the full height available for the service')
        assert.ok(geometry.equalColumns, label + ': the two scenarios have equal widths')
        assert.equal(geometry.divider.width, 1, label + ': comparison divider is one CSS pixel')
        assert.ok(geometry.divider.visible && geometry.divider.centered && geometry.divider.fullHeight, label + ': one divider separates the full comparison')
        assert.equal(geometry.pagination.size, 12, label + ': compact page counter')
        assert.ok(geometry.pagination.progressCompact && geometry.pagination.centerDelta <= 1, label + ': counter and compact progress share their vertical center')
        assert.ok(geometry.pagination.progressClearsCounter, label + ': progress reserves space for the counter')
        assert.ok(geometry.serviceHeadersAbsent && geometry.taskContentFirst, label + ': task content starts directly inside the UI without service headings')
        assert.ok(geometry.teachingControlsExternal, label + ': teaching commands remain in the separate bottom area')
        for (const field of geometry.formFields) {
          assert.ok(field.associated && field.ordered && field.arranged && field.grouped, label + ': field label and control form one readable region: ' + field.text)
          if (['Nota', 'Promemoria della consegna', 'Ostacolo osservato'].includes(field.text)) assert.ok(field.controlWidth >= 559, label + ': the main text field uses the service width: ' + field.text)
        }
        for (const group of geometry.fullWidthFieldGroups) assert.ok(group.width >= group.formWidth - 1 && group.formWidth >= group.appWidth - 1 && group.width >= 559, label + ': the top field group stretches across its form while its internal columns remain independent: ' + group.group)
        for (const frame of geometry.actionPhotoFrames) assert.ok(frame.figureFillsFrame && frame.imageFitsFrame, label + ': the nested laboratory photograph fills its frame without an inherited compact crop')
        for (const photo of geometry.servicePhotos) {
          assert.ok(photo.loaded && photo.unframed, label + ': the service photo loads without an added image frame')
          serviceAssets.add(photo.src.split('/').at(-1))
        }
        if (slide.frontmatter.interactiveExample === 'media') {
          assert.equal(geometry.mediaFrames.length, 2, label + ': both players preserve their full photograph')
          for (const frame of geometry.mediaFrames) {
            assert.equal(frame.objectFit, 'contain', label + ': the media photograph is fitted without cropping')
            assert.ok(frame.originalSource && frame.completeImage, label + ': the original image pixels retain their proportions and remain inside every clipping ancestor')
            assert.ok(frame.frameHeight >= 239, label + ': the full photograph keeps at least its reserved frame height')
            assert.ok(Math.abs(frame.renderedWidth - frame.frameWidth) <= 1 || Math.abs(frame.renderedHeight - frame.frameHeight) <= 1, label + ': the rendered photograph fills one frame dimension at its natural fit')
            assert.ok(frame.metadataAboveImage && frame.subtitlesSeparate && frame.subtitleHeight >= 63 && frame.captionWithinSlot, label + ': metadata and subtitles occupy their own areas outside the photograph')
          }
          if (phase === 'caption-cue' && mode !== 'print') assert.equal(geometry.mediaFrames.find(frame => frame.variant === 'good').captionLines, 2, label + ': the second cue remains fully readable on two lines')
        }
        assert.equal(geometry.headingCount, 1, label + ': the semantic slide identity is retained')
        assert.ok(geometry.titleHidden, label + ': the large slide title does not consume the task area')
        assert.ok(geometry.goodUiVisible && geometry.headingsVisible && geometry.summariesVisible && geometry.insightsWithinFooter && geometry.labsBelowService, label + ': task and bottom teaching area stay inside the slide without overlap')
        for (const explanation of geometry.explanations) {
          assert.equal(explanation.summarySize, 14, label + ': the summary uses the smaller explanation text')
          assert.equal(explanation.noteSize, 14, label + ': the teaching note uses the smaller explanation text')
          assert.equal(explanation.summaryWeight, '600', label + ': the summary retains its visual emphasis')
          assert.ok(Math.abs(explanation.summaryLeading - 1.4) < .01 && Math.abs(explanation.noteLeading - 1.4) < .01, label + ': explanations retain readable line spacing')
          assert.ok(explanation.outsideService && explanation.noteLast && Math.abs(explanation.noteBottom - explanation.labBottom) <= 1 && Math.abs(explanation.captionBottom - explanation.labBottom) <= 1, label + ': the note is the last paragraph aligned to the bottom teaching area')
        }
        assert.ok(Math.abs(geometry.explanations[0].noteBottom - geometry.explanations[1].noteBottom) <= 1, label + ': the two explanation paragraphs end on the same horizontal baseline')
        assert.deepEqual(geometry.clippedServiceContent, [], label + ': every rendered text fragment and control is fully visible: ' + JSON.stringify(geometry.clippedServiceContent.slice(0, 8)))
        assert.deepEqual(geometry.clippedFocusPaint, [], label + ': controls reserve their full focus outline: ' + JSON.stringify(geometry.clippedFocusPaint.slice(0, 8)))
        if (phase === 'initial' && mode !== 'print') {
          const minimumHeight = geometry.explanations.find(explanation => explanation.variant === 'good').noteLines >= 3 ? 425 : 440
          assert.ok(geometry.goodUiHeight >= minimumHeight - 1, label + ': the service uses the area above the compact teaching controls')
          assert.ok(geometry.goodUiWidth >= 560 - 1, label + ': task content uses the wider columns')
          assert.ok(geometry.comparisonHeight >= 520 - 1, label + ': the comparison remains the main part of the slide')
        }
        if (mode !== 'print') {
          assert.ok(geometry.toolbarOutOfFlow && geometry.toolsWithinCanvas && geometry.toolbarCenterDelta <= 1, label + ': the two icon controls remain usable on the bottom navigation row')
          assert.ok(geometry.pagination.progressBeforeTools, label + ': progress ends before the icon controls')
          assert.ok(geometry.pagination.toolsBeforeCounter, label + ': the icon controls end before the page counter')
        }
        if (phase === 'initial') {
          assert.equal(geometry.scrollers.some(node => node.variant === 'good' && node.vertical), false, label + ': the initial task is visible without internal scrolling')
          assert.ok(geometry.goodAppContained, label + ': the initial service content fits inside its panel')
        }
        if (mode === 'print') assert.equal(geometry.scrollers.some(node => node.vertical), false, label + ': printed service content is complete without scrolling')
        if (mode === 'print') {
          assert.ok(!geometry.toolbarVisible && geometry.toolIconsHidden, label + ': print omits the help and reset toolbar')
          assert.equal(await helpPanel.isVisible(), false, label + ': the verification popup is not opened for print')
          assert.ok(geometry.teachingToolsHidden, label + ': print omits interactive teaching controls')
          for (const scenario of [bad, good]) {
            const note = scenario.locator('.a11y-scenario-lab > .a11y-scenario-caption > .a11y-scenario-insight')
            assert.ok(await note.isVisible()); assert.ok((await note.textContent()).trim(), label + ': the bottom instructions remain available in print')
          }
        }
        if (phase === 'initial' && mode === 'narrow') {
          await helpButton.click(); assert.ok(await helpPanel.locator('p').isVisible(), label + ': the bottom help icon opens its panel')
          assert.ok(await helpFitsCanvas(), label + ': the help popup stays inside the narrow canvas')
          await page.keyboard.press('Escape'); assert.equal(await helpPanel.isVisible(), false)
        }
        await page.mouse.move(1, 1)
        await page.evaluate(() => { if (document.activeElement?.closest('.a11y-lab-tools')) document.activeElement.blur() })
        await page.screenshot({ path: `${out}/${mode}-${phase === 'initial' ? '' : phase + '-'}${slide.frontmatter.interactiveExample}.png` })
        reports.push({ id: slide.frontmatter.interactiveExample, page: slide.index + 1, phase, mode, ...geometry })
      }
      await page.emulateMedia({ media: 'screen' }); await page.setViewportSize({ width: 1280, height: 720 })
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    }
    switch (slide.frontmatter.interactiveExample) {
      case 'contrasto-testo': {
        await good.getByRole('button', { name: '10:00', exact: true }).click(); await bad.getByRole('button', { name: '10:00', exact: true }).click()
        assert.match(await good.getByRole('status').textContent(), /Esaurito/); assert.equal(await bad.getByRole('status').count(), 0)
        assert.equal(await good.locator('.perception-availability').getAttribute('data-availability'), 'unavailable')
        assert.notEqual(await good.locator('.perception-copy h3').evaluate(e => getComputedStyle(e).color), await bad.locator('.perception-copy h3').evaluate(e => getComputedStyle(e).color))
        for (const scenario of [good, bad]) await scenario.getByLabel('Rendi grigio l’indicatore di stato', { exact: true }).check()
        const grayDot = await bad.locator('.perception-state-dot').evaluate(e => getComputedStyle(e).backgroundColor)
        assert.match(await good.getByRole('status').textContent(), /Esaurito/)
        assert.match(await insight(bad), /grigio.*significato si perde/)
        for (const scenario of [good, bad]) await scenario.getByRole('button', { name: '11:30', exact: true }).click()
        assert.match(await good.getByRole('status').textContent(), /Disponibile/); assert.equal(await bad.getByRole('status').count(), 0)
        assert.equal(await bad.locator('.perception-state-dot').evaluate(e => getComputedStyle(e).backgroundColor), grayDot, 'the flawed colorless view gives the same signal for opposite states')
        assert.match(await insight(good), /11:30.*parole/)
        break
      }
      case 'contrasto-controlli':
        for (const scenario of [good, bad]) {
          await scenario.getByLabel('Ricordami l’appuntamento via email', { exact: true }).check()
          assert.ok(await scenario.getByRole('checkbox').isChecked())
          await scenario.getByRole('button', { name: 'Salva preferenza', exact: true }).click()
          assert.match(await scenario.getByRole('status').textContent(), /attivato/)
        }
        assert.notEqual(await good.getByRole('checkbox').evaluate(e => getComputedStyle(e).borderColor), await bad.getByRole('checkbox').evaluate(e => getComputedStyle(e).borderColor))
        assert.notEqual(await good.getByRole('checkbox').evaluate(e => getComputedStyle(e).color), await bad.getByRole('checkbox').evaluate(e => getComputedStyle(e).color))
        assert.match(await insight(bad), /prima di salvare.*spunta tenue/)
        await good.getByRole('checkbox').uncheck(); assert.equal(await good.getByRole('status').count(), 0)
        await good.getByRole('button', { name: 'Salva preferenza', exact: true }).click(); assert.match(await good.getByRole('status').textContent(), /disattivato/)
        break
      case 'adattamento': {
        const fits = s => s.locator('.a11y-viewport').evaluate(e => {
          const box = e.getBoundingClientRect()
          return [...e.querySelectorAll('.perception-booking-line > p > span, button')].every(child => {
            const rect = child.getBoundingClientRect(); return rect.right <= box.right + 1 && rect.left >= box.left - 1
          })
        })
        assert.ok(await fits(good)); assert.ok(await fits(bad), 'the flawed initial layout is usable before the space changes')
        for (const scenario of [good, bad]) {
          assert.match(await scenario.locator('.perception-reflow-lab > p').textContent(), /400 CSS px · 100%/)
          await scenario.getByRole('button', { name: 'Restringi a 320 CSS px', exact: true }).click()
          assert.equal(await scenario.getByRole('button', { name: 'Ripristina 400 CSS px', exact: true }).getAttribute('aria-pressed'), 'true')
          await scenario.getByRole('button', { name: 'Testo 200%', exact: true }).click()
          assert.equal(await scenario.getByRole('button', { name: 'Testo 100%', exact: true }).getAttribute('aria-pressed'), 'true')
          assert.equal(await scenario.locator('.perception-booking-line > p > span').first().evaluate(e => getComputedStyle(e).fontSize), '36px')
          assert.match(await scenario.locator('.perception-reflow-lab > p').textContent(), /320 CSS px · 200%/)
        }
        assert.ok(await fits(good)); assert.ok(!await fits(bad))
        await good.getByRole('button', { name: 'Conferma', exact: true }).focus(); await page.keyboard.press('Enter')
        assert.match(await good.getByRole('status').textContent(), /confermato.*14 ottobre, 10:00/)
        assert.match(await insight(good), /completato.*prenotazione/)
        await inspectModes('reflow')
        break
      }
      case 'tastiera':
        await good.getByLabel('Corso', { exact: true }).selectOption('Comunicazione')
        await good.getByRole('button', { name: 'Inizia dalla Email', exact: true }).click(); assert.ok(await hasFocus(good.getByLabel('Email', { exact: true })))
        assert.equal(await good.getByLabel('Corso', { exact: true }).inputValue(), '', 'starting a keyboard trial clears an earlier mouse selection')
        await page.keyboard.press('Tab'); assert.ok(await hasFocus(good.getByLabel('Corso', { exact: true })))
        await page.keyboard.press('d'); assert.equal(await good.getByLabel('Corso', { exact: true }).inputValue(), 'Design')
        await page.keyboard.press('Tab'); assert.ok(await hasFocus(good.getByRole('button', { name: 'Iscriviti', exact: true })))
        await page.keyboard.press('Enter'); assert.match(await good.getByRole('status').textContent(), /Iscrizione a Design registrata per sara@example.test/)
        await bad.getByRole('button', { name: 'Inizia dalla Email', exact: true }).click(); await page.keyboard.press('Tab')
        assert.ok(await hasFocus(bad.getByRole('button', { name: 'Iscriviti', exact: true }))); assert.equal(await bad.getByRole('combobox').count(), 0)
        await page.keyboard.press('Enter'); assert.match(await bad.getByRole('status').textContent(), /interrotta.*manca il corso/)
        assert.match(await insight(bad), /Senza mouse.*non puoi scegliere/)
        await bad.locator('.a11y-mouse-select').click(); await bad.locator('.a11y-mouse-options').getByText('Design', { exact: true }).click()
        await bad.getByRole('button', { name: 'Iscriviti', exact: true }).click(); assert.match(await bad.getByRole('status').textContent(), /Iscrizione a Design registrata/)
        await bad.getByRole('button', { name: 'Inizia dalla Email', exact: true }).click()
        assert.equal(await bad.locator('.a11y-mouse-options').count(), 0); assert.equal(await bad.getByRole('status').count(), 0)
        assert.match(await bad.locator('.a11y-mouse-select').textContent(), /Scegli il corso/)
        await page.keyboard.press('Tab'); assert.ok(await hasFocus(bad.getByRole('button', { name: 'Iscriviti', exact: true })))
        await page.keyboard.press('Enter'); assert.match(await bad.getByRole('status').textContent(), /interrotta.*manca il corso/, 'a previous mouse choice cannot make the keyboard-only trial succeed')
        break
      case 'puntamento':
        for (const scenario of [good, bad]) {
          await scenario.getByRole('button', { name: 'Salva l’itinerario', exact: true }).click()
          assert.match(await scenario.getByRole('status').textContent(), /Itinerario salvato: Roma → Milano → Torino/)
        }
        assert.match(await insight(good), /Milano è in posizione 2.*usa Su/)
        assert.match(await insight(bad), /ordine è stato salvato.*Milano non è al primo posto.*non puoi completare la prova di riordino/)
        await good.getByRole('button', { name: 'Sposta Milano su', exact: true }).focus(); await page.keyboard.press('Enter')
        assert.match(await good.locator('.a11y-city-list li > span').first().textContent(), /1\.\s*Milano/)
        assert.ok(await hasFocus(good.getByRole('button', { name: 'Sposta Milano giù', exact: true })), 'moving to the first position keeps focus on the same city’s enabled action')
        await page.keyboard.press('Enter')
        assert.ok(await hasFocus(good.getByRole('button', { name: 'Sposta Milano giù', exact: true })), 'moving a DOM row retains focus on its chosen direction')
        await page.keyboard.press('Enter')
        assert.match(await good.locator('.a11y-city-list li > span').last().textContent(), /3\.\s*Milano/)
        assert.ok(await hasFocus(good.getByRole('button', { name: 'Sposta Milano su', exact: true })), 'moving to the last position keeps an enabled action focused')
        await page.keyboard.press('Enter'); await page.keyboard.press('Enter')
        assert.match(await good.locator('.a11y-city-list li > span').first().textContent(), /1\.\s*Milano/)
        assert.equal(await bad.getByRole('button', { name: /Sposta/ }).count(), 0); assert.equal(await bad.locator('[draggable="true"]').count(), 3)
        await bad.locator('.a11y-city-list li').filter({ hasText: 'Milano' }).dragTo(bad.locator('.a11y-city-list li').filter({ hasText: 'Roma' }))
        assert.match(await bad.locator('.a11y-city-list li > span').first().textContent(), /1\.\s*Milano/)
        for (const scenario of [good, bad]) {
          await scenario.getByRole('button', { name: 'Salva l’itinerario', exact: true }).click()
          assert.match(await scenario.getByRole('status').textContent(), /Itinerario salvato: Milano → Roma → Torino/)
        }
        assert.match(await insight(good), /senza.*trascinamento/); assert.match(await insight(bad), /solo dopo un trascinamento/)
        break
      case 'immagini':
        for (const scenario of [good, bad]) {
          assert.equal(await scenario.getByRole('img').count(), 0, 'the first comparison does not let the photo reveal the answer')
          assert.match(await scenario.locator('.perception-product-copy').textContent(), /Zaino urbano.*39,00/s)
          assert.doesNotMatch(await scenario.locator('.perception-product-copy').textContent(), /rosso|\bdue\b|frontali|cerniera/i, 'static product details do not reveal the alternative text being compared')
          assert.ok(await scenario.locator('.perception-alt-frame').getByText('Foto non disponibile', { exact: true }).isVisible())
          assert.ok(await scenario.locator('.perception-alt-frame').evaluate(node => node.getBoundingClientRect().width >= node.parentElement.getBoundingClientRect().width - 1), 'the available text uses the full product width')
        }
        assert.match(await good.locator('.a11y-alt-preview').textContent(), /Zaino rosso con due tasche/); assert.equal(await bad.locator('.a11y-alt-preview').textContent(), 'foto_018.jpg')
        for (const scenario of [good, bad]) {
          await scenario.getByRole('button', { name: 'Mostra la foto', exact: true }).click()
          const photo = scenario.locator('.a11y-product-frame img')
          await page.waitForFunction(image => image.complete && image.naturalWidth > 0, await photo.elementHandle(), { timeout: 5000 })
          assert.ok((await photo.getAttribute('src')).endsWith('/images/accessibility-services/product.webp'))
        }
        assert.equal(await good.getByRole('img').getAttribute('alt'), 'Zaino rosso con due tasche frontali con cerniera.'); assert.equal(await bad.getByRole('img').getAttribute('alt'), 'foto_018.jpg')
        for (const scenario of [good, bad]) {
          await scenario.getByRole('button', { name: 'Prova senza foto', exact: true }).click()
          assert.equal(await scenario.getByRole('img').count(), 0)
          assert.ok(await scenario.getByRole('button', { name: 'Mostra la foto', exact: true }).isVisible())
        }
        assert.match(await good.locator('.a11y-alt-preview').textContent(), /Zaino rosso con due tasche/); assert.equal(await bad.locator('.a11y-alt-preview').textContent(), 'foto_018.jpg')
        assert.match(await insight(good), /colore e numero delle tasche/)
        assert.match(await insight(bad), /nome del file.*non puoi capire colore o tasche/)
        for (const scenario of [good, bad]) {
          await scenario.locator('.a11y-ui').getByRole('button', { name: 'Seleziona il modello', exact: true }).click()
          assert.equal(await scenario.locator('.a11y-ui').getByRole('status').textContent(), 'Modello 018 selezionato.')
          assert.ok(await scenario.getByRole('button', { name: 'Seleziona il modello', exact: true }).isDisabled())
        }
        assert.match(await insight(good), /selezionato il modello.*verificare colore e tasche/)
        break
      case 'media': {
        assert.equal(await good.getByRole('checkbox').count(), 3); assert.equal(await bad.getByRole('checkbox').count(), 1)
        for (const scenario of [good, bad]) {
          await scenario.getByLabel('Audio', { exact: true }).uncheck()
          for (const exit of ['A', 'B']) assert.ok(await scenario.getByRole('button', { name: exit, exact: true }).isDisabled(), 'the exit choice requires playing the clip first')
        }
        assert.equal(await good.locator('.a11y-captions').count(), 0); assert.equal(await good.locator('.process-description').count(), 0)
        await good.getByRole('button', { name: 'Riproduci', exact: true }).focus(); await page.keyboard.press('Enter')
        assert.match(await good.locator('.a11y-captions').textContent(), /Scegli l’uscita B/)
        assert.match(await good.locator('.process-description').textContent(), /Il docente indica il corridoio a destra/)
        await good.getByRole('button', { name: 'A', exact: true }).click(); assert.match(await insight(good), /nomina B.*correggere/)
        await good.getByRole('button', { name: 'B', exact: true }).click(); assert.equal(await good.getByRole('button', { name: 'B', exact: true }).getAttribute('aria-pressed'), 'true')
        assert.match(await insight(good), /B anche senza audio/)
        await good.getByLabel('Descrizione visiva', { exact: true }).uncheck(); assert.equal(await good.locator('.process-description').count(), 0)
        assert.match(await good.locator('.a11y-captions').textContent(), /Scegli l’uscita B/)
        assert.equal(await good.locator('.process-video-image').getAttribute('aria-label'), 'Video del percorso')
        await good.getByLabel('Descrizione visiva', { exact: true }).check()
        await page.waitForFunction(e => e.textContent.includes('Destinazione selezionata'), await good.locator('.a11y-captions').elementHandle(), { timeout: 5000 })
        await good.getByRole('button', { name: 'Pausa', exact: true }).click()
        const pausedCaptions = await good.locator('.a11y-captions').textContent()
        assert.match(pausedCaptions, /\[suono di conferma\]/)
        assert.match(pausedCaptions, /Scegli l’uscita B/, 'the second passage retains the information needed to choose an exit')
        assert.ok(await good.getByRole('button', { name: 'Riprendi', exact: true }).isVisible())
        await page.waitForTimeout(350)
        assert.equal(await good.locator('.a11y-captions').textContent(), pausedCaptions)
        await good.getByRole('button', { name: 'Riprendi', exact: true }).click(); assert.equal(await good.locator('.a11y-captions').textContent(), pausedCaptions)
        await good.getByRole('button', { name: 'Pausa', exact: true }).click()
        await inspectModes('caption-cue')
        await good.getByRole('button', { name: 'Ricomincia', exact: true }).click(); assert.equal(await good.locator('.a11y-captions').count(), 0)
        assert.ok(await good.getByRole('button', { name: 'Riproduci', exact: true }).isVisible())
        for (const exit of ['A', 'B']) {
          const choice = good.getByRole('button', { name: exit, exact: true })
          assert.equal(await choice.getAttribute('aria-pressed'), 'false'); assert.ok(await choice.isDisabled(), 'restarting clears the previous answer')
        }
        await good.getByRole('button', { name: 'Riproduci', exact: true }).click(); assert.match(await good.locator('.a11y-captions').textContent(), /Scegli l’uscita B/)
        await good.getByLabel('Sottotitoli', { exact: true }).uncheck(); assert.equal(await good.locator('.a11y-captions').count(), 0)
        assert.match(await good.locator('.process-description').textContent(), /a destra/)
        await good.getByRole('button', { name: 'B', exact: true }).click()
        assert.match(await insight(good), /Audio e Sottotitoli sono spenti.*attiva un’alternativa/)
        assert.doesNotMatch(await insight(good), /riconosciuto B anche senza audio/, 'a correct guess does not claim that an unavailable alternative was used')
        await good.getByRole('button', { name: 'A', exact: true }).click(); assert.match(await insight(good), /Attiva Audio o Sottotitoli/)
        await good.getByRole('button', { name: 'Ricomincia', exact: true }).click(); await good.getByRole('button', { name: 'Riproduci', exact: true }).click()
        assert.match(await insight(good), /Audio e Sottotitoli sono spenti.*attiva un’alternativa/, 'playback guidance reflects the current channel choices')
        await good.getByLabel('Sottotitoli', { exact: true }).check()
        await bad.getByRole('button', { name: 'Riproduci', exact: true }).click()
        assert.ok(await good.getByRole('button', { name: 'Riproduci', exact: true }).isVisible(), 'playing the other scenario stops and resets the first')
        assert.equal(await good.locator('.a11y-captions').count(), 0); assert.equal(await good.locator('.process-description').count(), 0)
        assert.equal(await bad.locator('.a11y-captions').count(), 0); assert.equal(await bad.locator('.process-description').count(), 0)
        assert.match(await insight(bad), /audio spento.*manca l’alternativa/)
        await bad.getByRole('button', { name: 'Ricomincia', exact: true }).click()
        await good.getByRole('button', { name: 'Riproduci', exact: true }).click(); await good.getByRole('button', { name: 'Pausa', exact: true }).click()
        await inspectModes('channels')
        break
      }
      case 'semantica': {
        const button = good.getByRole('button', { name: 'Dettagli consegna', exact: true })
        assert.equal(await button.getAttribute('aria-expanded'), 'false')
        assert.equal(await button.getAttribute('aria-controls'), await good.locator('.a11y-delivery').getAttribute('id'))
        assert.equal(await good.locator('.a11y-delivery').isVisible(), false)
        await good.getByRole('button', { name: 'Conferma consegna', exact: true }).click()
        assert.match(await good.getByRole('status').textContent(), /Apri i dettagli prima di confermare la consegna/)
        const goodStart = good.getByRole('button', { name: 'Inizia la prova con Tab', exact: true })
        await goodStart.click(); assert.ok(await hasFocus(good.locator('.action-order-summary')))
        await page.keyboard.press('Tab'); await page.keyboard.press('Space')
        assert.equal(await button.getAttribute('aria-expanded'), 'true')
        await page.keyboard.press('Space'); assert.equal(await button.getAttribute('aria-expanded'), 'false'); assert.equal(await good.locator('.a11y-delivery').isVisible(), false)
        await goodStart.click(); assert.ok(await hasFocus(good.locator('.action-order-summary')), 'the teaching control starts keyboard navigation before the service details')
        await page.keyboard.press('Tab'); assert.ok(await hasFocus(button), 'Tab reaches the real details control')
        await page.keyboard.press('Enter'); assert.equal(await button.getAttribute('aria-expanded'), 'true')
        assert.ok(await good.locator('.a11y-delivery').isVisible()); assert.match(await good.locator('.a11y-delivery').textContent(), /14 ottobre.*10:00/s)
        assert.match(await insight(good), /puoi leggere data e ora.*espanso/)
        await page.keyboard.press('Tab'); assert.ok(await hasFocus(good.getByRole('button', { name: 'Conferma consegna', exact: true })))
        await page.keyboard.press('Enter'); assert.match(await good.getByRole('status').textContent(), /Consegna confermata: 14 ottobre, 10:00/)
        assert.equal(await bad.getByRole('button', { name: 'Dettagli consegna', exact: true }).count(), 0)
        for (const attribute of ['tabindex', 'role', 'aria-expanded', 'aria-controls']) assert.equal(await bad.locator('.a11y-fake-link').getAttribute(attribute), null)
        const badStart = bad.getByRole('button', { name: 'Inizia la prova con Tab', exact: true })
        await badStart.click(); assert.ok(await hasFocus(bad.locator('.action-order-summary'))); await page.keyboard.press('Tab')
        assert.ok(await hasFocus(bad.getByRole('button', { name: 'Conferma consegna', exact: true })), 'Tab skips the fake control and reaches confirmation with the details still closed')
        await page.keyboard.press('Enter'); assert.match(await bad.getByRole('status').textContent(), /Apri i dettagli prima di confermare la consegna/)
        assert.equal(await bad.locator('.a11y-delivery').isVisible(), false)
        await inspectModes('keyboard-reading')
        await bad.locator('.a11y-fake-link').click(); assert.ok(await bad.locator('.a11y-delivery').isVisible())
        await bad.getByRole('button', { name: 'Conferma consegna', exact: true }).click(); assert.match(await bad.getByRole('status').textContent(), /Consegna confermata: 14 ottobre, 10:00/)
        assert.match(await insight(bad), /dopo il clic del mouse.*percorso con Tab/)
        break
      }
      case 'feedback':
        for (const scenario of [good, bad]) await scenario.getByLabel('Promemoria della consegna', { exact: true }).fill('Revisione del progetto · lunedì alle 09:30')
        await good.getByRole('button', { name: 'Salva promemoria', exact: true }).focus(); await page.keyboard.press('Enter')
        assert.equal(await good.getByRole('status').getAttribute('aria-live'), 'polite')
        assert.match(await good.getByRole('status').textContent(), /Revisione del progetto · lunedì alle 09:30/)
        assert.ok(await hasFocus(good.getByRole('button', { name: 'Salva promemoria', exact: true })))
        await bad.getByRole('button', { name: 'Salva promemoria', exact: true }).click()
        assert.equal(await bad.getByRole('status').count(), 0); assert.equal(await bad.locator('.process-save-result').textContent(), 'Fatto.')
        assert.equal(await bad.locator('.process-save-result').getAttribute('aria-live'), null)
        assert.equal(await bad.locator('.process-save-result').evaluate(e => getComputedStyle(e).position), 'absolute')
        assert.match(await insight(good), /descrive ciò che hai salvato.*non sposta il focus/)
        assert.match(await insight(bad), /lontano.*senza ruolo di stato/)
        await inspectModes('saved')
        break
      case 'cognitiva':
        assert.equal(await good.locator('ol.steps > li').count(), 3); assert.equal(await bad.locator('ol.steps').count(), 0)
        assert.match(await good.locator('ol.steps [aria-current="step"]').textContent(), /Nuovo orario/)
        for (const scenario of [good, bad]) {
          await scenario.getByLabel('Nuova data', { exact: true }).fill('2026-10-16')
          await scenario.getByLabel('Nuova ora', { exact: true }).selectOption('14:00')
        }
        await good.getByRole('button', { name: 'Controlla il nuovo orario', exact: true }).click()
        assert.ok(await hasFocus(good.getByRole('heading', { name: 'Controlla il nuovo orario', exact: true })), 'the review receives keyboard focus')
        await bad.getByRole('button', { name: 'Continua', exact: true }).click()
        assert.match(await good.locator('.a11y-booking-summary').textContent(), /16 ottobre 2026 · 14:00/)
        assert.equal(await bad.locator('.a11y-booking-summary').count(), 0); assert.doesNotMatch(await bad.locator('.a11y-ui').textContent(), /16 ottobre|14:00/)
        assert.match(await good.locator('ol.steps [aria-current="step"]').textContent(), /Riepilogo/)
        await inspectModes('review')
        await good.getByRole('button', { name: 'Modifica', exact: true }).click()
        assert.ok(await hasFocus(good.getByLabel('Nuova data', { exact: true })), 'returning to edit restores focus to the date')
        await bad.getByRole('button', { name: 'Torna indietro', exact: true }).click()
        assert.equal(await good.getByLabel('Nuova data', { exact: true }).inputValue(), '2026-10-16')
        assert.equal(await good.getByLabel('Nuova ora', { exact: true }).inputValue(), '14:00')
        assert.equal(await bad.getByLabel('Nuova data', { exact: true }).inputValue(), ''); assert.equal(await bad.getByLabel('Nuova ora', { exact: true }).inputValue(), '')
        assert.match(await insight(good), /conserva data e ora/); assert.match(await insight(bad), /svuotato entrambi/)
        await good.getByRole('button', { name: 'Controlla il nuovo orario', exact: true }).click(); await good.getByRole('button', { name: 'Conferma il nuovo orario', exact: true }).click()
        assert.match(await good.getByRole('status').textContent(), /16 ottobre 2026 · 14:00/)
        assert.ok(await hasFocus(good.getByRole('heading', { name: 'Appuntamento spostato', exact: true })))
        assert.match(await good.locator('ol.steps [aria-current="step"]').textContent(), /Esito/)
        break
      case 'movimento': {
        for (const scenario of [good, bad]) {
          assert.ok(await scenario.getByLabel('Codice aula', { exact: true }).isDisabled(), 'the transcription task starts with the notices')
          assert.ok(await scenario.getByRole('button', { name: 'Conferma aula', exact: true }).isDisabled())
        }
        await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(100)
        await good.getByRole('button', { name: 'Avvia avvisi', exact: true }).click(); await bad.getByRole('button', { name: 'Avvia avvisi', exact: true }).click(); await page.waitForTimeout(1700)
        const count = s => s.locator('p').filter({ hasText: /^Aggiornamenti:/ }).textContent()
        const room = s => s.locator('.process-notice-copy > p > strong').textContent()
        await good.getByRole('button', { name: 'Pausa avvisi', exact: true }).click()
        assert.equal(await bad.getByRole('button', { name: 'Pausa avvisi', exact: true }).count(), 0)
        const frozen = await count(good), frozenRoom = await room(good), beforeBad = await count(bad), previousBadRoom = await room(bad)
        await page.waitForTimeout(1700)
        assert.equal(await count(good), frozen); assert.notEqual(await count(bad), beforeBad)
        assert.equal(await room(good), frozenRoom); assert.notEqual(await room(bad), previousBadRoom)
        await good.getByLabel('Codice aula', { exact: true }).fill('ZZ99'); await good.getByRole('button', { name: 'Conferma aula', exact: true }).click()
        assert.match(await good.getByRole('status').textContent(), /Il codice aula non corrisponde/)
        assert.match(await insight(good), /fermo.*non corrisponde/, 'pausing an incorrect transcription does not claim that the task succeeded')
        await good.getByLabel('Codice aula', { exact: true }).fill(frozenRoom)
        await bad.getByLabel('Codice aula', { exact: true }).fill(previousBadRoom)
        for (const scenario of [good, bad]) await scenario.getByRole('button', { name: 'Conferma aula', exact: true }).click()
        assert.match(await good.getByRole('status').textContent(), /Aula .* confermata/)
        assert.equal(await bad.locator('.process-news > p').filter({ hasText: 'Il codice aula non corrisponde' }).count(), 1)
        assert.match(await insight(good), /pausa conserva il riferimento/)
        await good.getByRole('button', { name: 'Riprendi avvisi', exact: true }).click(); await page.waitForTimeout(1700); assert.notEqual(await count(good), frozen)
        assert.equal(await good.getByRole('status').count(), 0, 'a new notice clears the result for the previous code')
        await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(50)
        assert.equal(await good.getByRole('button', { name: 'Avvia avvisi', exact: true }).count(), 1)
        const reducedCount = await count(good)
        for (const scenario of [good, bad]) await scenario.getByRole('button', { name: 'Avvia avvisi', exact: true }).click()
        assert.equal(await count(good), reducedCount); assert.match(await insight(good), /Prova manuale/)
        for (const scenario of [good, bad]) await scenario.getByRole('button', { name: 'Simula aggiornamento', exact: true }).click()
        const manualCount = await count(good)
        await good.getByRole('button', { name: 'Pausa avvisi', exact: true }).click()
        assert.ok(await good.getByRole('button', { name: 'Simula aggiornamento', exact: true }).isDisabled())
        await bad.getByRole('button', { name: 'Simula aggiornamento', exact: true }).click()
        assert.equal(await count(good), manualCount)
        assert.notEqual(await count(bad), manualCount)
        break
      }
      case 'moduli': {
        const date = good.getByLabel('Data dell’appuntamento', { exact: true })
        await good.getByRole('button', { name: 'Salva i dati', exact: true }).click()
        assert.ok(await hasFocus(date))
        await bad.getByRole('button', { name: 'Salva i dati', exact: true }).click()
        assert.match(await good.getByRole('alert').textContent(), /quattro cifre.*14\/10\/2026/)
        assert.equal(await date.getAttribute('aria-invalid'), 'true')
        const descriptions = (await date.getAttribute('aria-describedby')).split(' ')
        assert.equal(descriptions.length, 2)
        for (const id of descriptions) assert.equal(await good.locator('[id]').evaluateAll((nodes, id) => nodes.filter(e => e.id === id).length, id), 1)
        assert.equal(await good.getByLabel('Nota', { exact: true }).inputValue(), 'Portare il documento.')
        assert.equal(await bad.getByLabel('Nota', { exact: true }).inputValue(), ''); assert.equal(await bad.getByRole('alert').count(), 0)
        assert.match(await insight(good), /nota resta compilata/); assert.match(await insight(bad), /cancellato una nota valida/)
        await inspectModes('error')
        await date.fill('31/02/2026'); await good.getByRole('button', { name: 'Salva i dati', exact: true }).click()
        assert.match(await good.getByRole('alert').textContent(), /data non esiste.*giorno e mese/); assert.equal(await good.getByRole('status').count(), 0)
        await date.fill('14/10/2026'); await good.getByRole('button', { name: 'Salva i dati', exact: true }).click()
        assert.equal(await date.getAttribute('aria-invalid'), 'false'); assert.equal(await good.getByRole('alert').count(), 0)
        assert.match(await good.getByRole('status').textContent(), /14 ottobre 2026.*Nota: Portare il documento\./s)
        await bad.getByPlaceholder('Data', { exact: true }).fill('14/10/2026'); await bad.getByRole('button', { name: 'Salva i dati', exact: true }).click()
        assert.match(await bad.locator('.a11y-understanding-result').textContent(), /Nota: nessuna/)
        break
      }
      case 'autenticazione': {
        const allowsPaste = s => s.getByLabel('Password', { exact: true }).evaluate(e => e.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true })))
        assert.equal(await good.getByLabel('Email', { exact: true }).getAttribute('autocomplete'), 'username')
        assert.equal(await good.getByLabel('Email', { exact: true }).getAttribute('name'), 'username')
        assert.equal(await good.getByLabel('Password', { exact: true }).getAttribute('autocomplete'), 'current-password')
        assert.equal(await bad.getByLabel('Password', { exact: true }).getAttribute('autocomplete'), 'off')
        assert.ok(await allowsPaste(good)); assert.ok(!await allowsPaste(bad))
        for (const scenario of [good, bad]) await scenario.getByRole('button', { name: 'Simula l’incolla', exact: true }).click()
        assert.equal(await good.getByLabel('Password', { exact: true }).inputValue(), 'design-2026'); assert.equal(await bad.getByLabel('Password', { exact: true }).inputValue(), '')
        for (const scenario of [good, bad]) {
          await scenario.getByRole('button', { name: 'Accedi', exact: true }).click()
          if (scenario === good) {
            assert.equal(await scenario.getByRole('status').textContent(), 'Accesso riuscito.')
            assert.ok(await hasFocus(scenario.getByRole('heading', { name: 'Bentornata Sara', exact: true })), 'successful sign-in opens and focuses the member area')
            assert.equal(await scenario.getByLabel('Password', { exact: true }).count(), 0); assert.equal(await scenario.getByRole('button', { name: 'Simula l’incolla', exact: true }).count(), 0)
            await assertServiceContent(scenario, slide.title + ': good member area after sign-in')
          } else {
            assert.match(await scenario.getByRole('status').textContent(), /interrotto.*password è vuota/)
            assert.match(await insight(scenario), /blocco dell’incolla.*accesso si interrompe/)
          }
        }
        await bad.getByLabel('Password', { exact: true }).fill('design-2026'); await bad.getByRole('button', { name: 'Accedi', exact: true }).click()
        assert.equal(await bad.getByRole('status').textContent(), 'Accesso riuscito.')
        assert.ok(await hasFocus(bad.getByRole('heading', { name: 'Bentornata Sara', exact: true })))
        assert.match(await insight(bad), /riesce trascrivendo.*sforzo evitabile/)
        await assertServiceContent(bad, slide.title + ': bad member area after manual sign-in')
        for (const scenario of [good, bad]) {
          const variant = scenario === good ? 'good' : 'bad'
          for (const course of ['Design', 'Comunicazione']) {
            await scenario.getByRole('button', { name: `Apri ${course}`, exact: true }).focus(); await page.keyboard.press('Enter')
            assert.ok(await hasFocus(scenario.getByRole('heading', { name: `Laboratorio di ${course}`, exact: true })), 'the chosen laboratory opens as a real local view')
            assert.ok(await scenario.getByText('Accesso disponibile per Sara.', { exact: true }).isVisible())
            assert.equal(await scenario.getByRole('button', { name: `Apri ${course}`, exact: true }).count(), 0)
            await assertServiceContent(scenario, `${slide.title}: ${variant} member view of ${course}`)
            await scenario.getByRole('button', { name: 'Torna ai laboratori', exact: true }).click()
            assert.ok(await hasFocus(scenario.getByRole('heading', { name: 'I tuoi laboratori', exact: true })))
            assert.equal(await scenario.getByRole('button', { name: /^Apri (Design|Comunicazione)$/ }).count(), 2)
            await assertServiceContent(scenario, `${slide.title}: ${variant} laboratory list after returning from ${course}`)
          }
          await scenario.getByRole('button', { name: 'Esci', exact: true }).click()
          assert.ok(await hasFocus(scenario.getByLabel('Email', { exact: true }))); assert.equal(await scenario.getByLabel('Password', { exact: true }).inputValue(), '')
          assert.equal(await scenario.getByRole('heading', { name: 'Bentornata Sara', exact: true }).count(), 0); assert.equal(await scenario.getByRole('status').count(), 0)
          assert.ok(await scenario.locator('.a11y-scenario-tools').getByRole('button', { name: 'Simula l’incolla', exact: true }).isVisible())
        }
        break
      }
      case 'personalizzazione':
        await good.getByRole('button', { name: 'Ingrandisci il testo', exact: true }).click(); assert.equal(await good.locator('.understanding-library-copy > p').first().evaluate(e => getComputedStyle(e).fontSize), '22px')
        await good.getByLabel('Più contrasto', { exact: true }).check(); assert.equal(await good.locator('.high-contrast').count(), 1)
        for (const scenario of [good, bad]) await scenario.getByRole('button', { name: 'Apri orari', exact: true }).click()
        assert.match(await good.locator('.a11y-understanding-hours').textContent(), /9:00–19:00.*9:00–13:00/s)
        assert.equal(await good.locator('.a11y-understanding-hours p').first().evaluate(e => getComputedStyle(e).fontSize), '22px')
        assert.match(await insight(good), /22 px.*elevato/)
        await inspectModes('reading')
        for (let increase = 0; increase < 3; increase++) await good.getByRole('button', { name: 'Ingrandisci il testo', exact: true }).click()
        assert.equal(await good.locator('.a11y-understanding-hours p').first().evaluate(e => getComputedStyle(e).fontSize), '28px')
        assert.ok(await good.getByRole('button', { name: 'Ingrandisci il testo', exact: true }).isDisabled())
        assert.ok(await good.locator('.high-contrast').isVisible()); assert.match(await good.locator('.a11y-understanding-hours').textContent(), /Domenica.*chiusa/)
        await inspectModes('reading-max')
        await good.getByRole('button', { name: 'Ripristina lettura', exact: true }).click(); assert.equal(await good.locator('.a11y-understanding-hours p').first().evaluate(e => getComputedStyle(e).fontSize), '20px')
        assert.equal(await good.locator('.high-contrast').count(), 0); assert.ok(await good.locator('.a11y-understanding-hours').isVisible())
        assert.match(await insight(good), /20 px.*conservando gli orari aperti/)
        assert.equal(await bad.getByRole('button', { name: 'Ingrandisci il testo', exact: true }).count(), 0)
        break
      case 'lingua':
        for (const scenario of [good, bad]) await scenario.getByRole('button', { name: 'Invia richiesta', exact: true }).click()
        assert.match(await good.getByRole('status').textContent(), /Richiesta ricevuta per Ana María O’Neill/)
        assert.equal(await good.getByLabel('Nome completo', { exact: true }).inputValue(), 'Ana María O’Neill')
        assert.match(await bad.locator('.a11y-form > p').filter({ hasText: 'Sono ammesse' }).textContent(), /solo lettere A–Z, senza spazi/)
        assert.equal(await bad.getByRole('status').count(), 0)
        await good.getByLabel('Lingua del messaggio', { exact: true }).selectOption('en'); await good.getByRole('button', { name: 'Invia richiesta', exact: true }).click()
        assert.equal(await good.getByRole('status').getAttribute('lang'), 'en'); assert.match(await good.getByRole('status').textContent(), /Request received for Ana María O’Neill/)
        await bad.getByLabel('Nome completo', { exact: true }).fill('Ana'); await bad.getByLabel('Lingua del messaggio', { exact: true }).selectOption('en')
        await bad.getByRole('button', { name: 'Invia richiesta', exact: true }).click()
        assert.match(await bad.locator('.a11y-form > p[lang="it"]').textContent(), /Request received for Ana\./)
        assert.match(await insight(bad), /inglese.*dichiara italiano/)
        await good.getByLabel('Nome completo', { exact: true }).fill(''); await good.getByRole('button', { name: 'Invia richiesta', exact: true }).click()
        assert.match(await good.getByRole('alert').textContent(), /Enter your full name/); assert.equal(await good.getByRole('alert').getAttribute('lang'), 'en')
        assert.ok(await hasFocus(good.getByLabel('Nome completo', { exact: true })))
        break
      case 'verifica-wcag': {
        for (const scenario of [good, bad]) {
          assert.equal(await scenario.locator('.a11y-audit-steps li').filter({ hasText: 'Da verificare' }).count(), 3, 'untried steps start as unverified')
          assert.equal(await scenario.locator('.a11y-audit-steps li').filter({ hasText: 'Escluso' }).count(), 0)
        }
        await good.getByRole('button', { name: 'Controlla l’accesso', exact: true }).click()
        assert.ok(await hasFocus(good.getByLabel('Data da prenotare', { exact: true })))
        assert.equal(await good.locator('.a11y-audit-steps li').filter({ hasText: 'Coperto' }).count(), 1)
        assert.equal(await good.locator('.a11y-audit-steps li').filter({ hasText: 'Da verificare' }).count(), 2)
        await bad.getByRole('button', { name: 'Controlla l’accesso', exact: true }).click()
        assert.equal(await bad.locator('.a11y-audit-steps li').filter({ hasText: 'Coperto' }).count(), 1)
        assert.equal(await bad.locator('.a11y-audit-steps li').filter({ hasText: 'Escluso' }).count(), 2)
        assert.equal(await bad.getByLabel('Data da prenotare', { exact: true }).count(), 0)
        assert.equal(await bad.locator('.process-audit > p').filter({ hasText: 'nessun errore rilevato' }).count(), 1)
        await bad.getByRole('button', { name: 'Apri modulo', exact: true }).click()
        for (const scenario of [good, bad]) {
          await scenario.getByRole('button', { name: 'Conferma appuntamento', exact: true }).click()
          assert.match(await scenario.getByRole('alert').textContent(), /quattro cifre.*14\/10\/2026/)
          assert.equal(await scenario.getByLabel('Data da prenotare', { exact: true }).getAttribute('aria-invalid'), 'true')
          assert.equal(await scenario.getByRole('button', { name: 'Salva verifica', exact: true }).count(), 0, 'invalid data cannot advance to confirmation')
        }
        assert.match(await insight(good), /secondo passaggio.*stato di errore/); assert.match(await insight(bad), /passaggio escluso.*non copriva/)
        assert.equal(await good.locator('.a11y-audit-steps li').filter({ hasText: 'Coperto' }).count(), 1, 'an invalid submission does not mark the module complete')
        await inspectModes('audit-error')
        for (const scenario of [good, bad]) {
          await scenario.getByLabel('Data da prenotare', { exact: true }).fill('31/02/2026')
          await scenario.getByRole('button', { name: 'Conferma appuntamento', exact: true }).click()
          assert.match(await scenario.getByRole('alert').textContent(), /data non esiste.*giorno, mese e anno/)
          assert.doesNotMatch(await scenario.getByRole('alert').textContent(), /quattro cifre/, 'a correctly formatted nonexistent date has its own diagnostic')
          assert.ok(await hasFocus(scenario.getByLabel('Data da prenotare', { exact: true })))
          await scenario.getByLabel('Data da prenotare', { exact: true }).fill('14/10/2026')
          await scenario.getByRole('button', { name: 'Conferma appuntamento', exact: true }).click()
          assert.equal(await scenario.getByRole('alert').count(), 0)
          await scenario.getByRole('button', { name: 'Salva verifica', exact: true }).click()
        }
        assert.equal(await good.locator('.a11y-audit-steps li').filter({ hasText: 'Coperto' }).count(), 3)
        assert.equal(await bad.locator('.a11y-audit-steps li').filter({ hasText: 'Coperto' }).count(), 1)
        assert.match(await good.getByRole('status').textContent(), /Verifica salvata: accesso, gestione dell’errore nel modulo e conferma/)
        assert.doesNotMatch(await good.getByRole('status').textContent(), /(?:conforme|conformità|certificat)/i, 'including all steps does not declare WCAG conformity')
        assert.equal(await bad.locator('.process-audit > p').filter({ hasText: 'include solo l’accesso' }).count(), 1)
        await demo.getByRole('button', { name: 'Reimposta gli scenari' }).click()
        await good.getByRole('button', { name: 'Controlla l’accesso', exact: true }).click()
        await good.getByLabel('Data da prenotare', { exact: true }).fill('14/10/2026'); await good.getByRole('button', { name: 'Conferma appuntamento', exact: true }).click()
        assert.match(await insight(good), /recupero da un errore non è stato ancora provato/)
        await good.getByRole('button', { name: 'Salva verifica', exact: true }).click()
        assert.equal(await good.locator('.a11y-audit-steps li').filter({ hasText: 'Coperto' }).count(), 3)
        assert.match(await good.getByRole('status').textContent(), /invio valido del modulo.*gestione degli errori non è stata verificata/)
        assert.doesNotMatch(await good.getByRole('status').textContent(), /errore nel modulo.*inclus/i, 'the result reports the error state only when that state was actually tested')
        break
      }
      case 'valutazione': {
        assert.equal(await bad.locator('.a11y-mouse-select').count(), 1); assert.equal(await good.getByRole('combobox', { name: 'Corso', exact: true }).count(), 0)
        assert.equal(await bad.locator('.a11y-mouse-select').getAttribute('tabindex'), null)
        await good.getByLabel('Ostacolo osservato', { exact: true }).fill('Con Tab non riesco a scegliere il corso.')
        await good.getByRole('button', { name: 'Registra segnalazione', exact: true }).click()
        assert.ok((await good.locator('.a11y-ui').textContent()).includes('Con Tab non riesco a scegliere il corso.'), 'the recorded observation reflects the entered evidence')
        await good.locator('.a11y-scenario-tools').getByRole('button', { name: 'Apri versione corretta', exact: true }).click()
        const courseMenu = good.getByLabel('Corso', { exact: true }), site = good.locator('.a11y-ui'), newTrial = good.locator('.a11y-scenario-tools').getByRole('button', { name: 'Registra la nuova prova', exact: true })
        const trialResult = good.locator('.process-retest-result')
        assert.ok(await hasFocus(courseMenu))
        await site.getByRole('button', { name: 'Iscriviti', exact: true }).click()
        assert.match(await site.getByRole('alert').textContent(), /Scegli un corso per completare l’iscrizione/)
        assert.equal(await courseMenu.getAttribute('aria-invalid'), 'true')
        assert.equal(await courseMenu.getAttribute('aria-describedby'), await site.getByRole('alert').getAttribute('id'))
        await newTrial.click(); assert.match(await trialResult.textContent(), /prima completa l’iscrizione nel sito/)
        assert.equal(await site.locator('.process-enrollment-result').count(), 0, 'the teaching action cannot complete an enrollment')
        await courseMenu.focus(); await page.keyboard.press('c'); assert.equal(await courseMenu.inputValue(), 'Comunicazione')
        await page.keyboard.press('Tab'); await page.keyboard.press('Enter')
        assert.equal(await site.locator('.process-enrollment-result').textContent(), 'Iscrizione completata al corso Comunicazione.')
        assert.equal(await courseMenu.getAttribute('aria-invalid'), 'false', 'Comunicazione is a valid service choice even though the exercise requires Design')
        await newTrial.click(); assert.match(await trialResult.textContent(), /iscrizione a Comunicazione.*compito richiede Design/)
        assert.match(await insight(good), /scelta diversa non verifica lo stesso esito/)
        await courseMenu.focus(); await page.keyboard.press('d'); assert.equal(await courseMenu.inputValue(), 'Design')
        await newTrial.click(); assert.match(await trialResult.textContent(), /iscrizione a Comunicazione/, 'changing the menu alone does not replace the course actually registered')
        await courseMenu.focus()
        await page.keyboard.press('Tab'); await page.keyboard.press('Enter')
        assert.equal(await site.locator('.process-enrollment-result').textContent(), 'Iscrizione completata al corso Design.')
        await newTrial.click(); assert.match(await trialResult.textContent(), /Nuova prova completata.*iscrizione al corso Design registrata/)
        assert.equal(await site.locator('.process-retest-result').count(), 0, 'the trial report remains outside the service')
        await bad.getByLabel('Segnalazione', { exact: true }).fill('Il menu Corso viene saltato da Tab.')
        await bad.getByRole('button', { name: 'Archivia segnalazione', exact: true }).click()
        assert.equal(await bad.getByRole('button', { name: 'Apri versione corretta', exact: true }).count(), 0)
        assert.equal(await bad.getByRole('combobox').count(), 0); assert.equal(await bad.getByRole('status').count(), 0)
        assert.match(await bad.locator('.a11y-ui').textContent(), /Segnalazione archiviata: Il menu Corso viene saltato da Tab\./)
        assert.match(await insight(good), /stesso compito.*menu corretto/); assert.match(await insight(bad), /Il menu Corso viene saltato da Tab.*senza una modifica e senza una nuova prova/)
        break
      }
      default: throw new Error('Unverified example: ' + slide.frontmatter.interactiveExample)
    }
    const completedGeometry = await demo.evaluate(serviceContentGeometry)
    assert.deepEqual(completedGeometry.clippedServiceContent, [], slide.title + ': the final service result has no clipped text or controls: ' + JSON.stringify(completedGeometry.clippedServiceContent.slice(0, 8)))
    assert.deepEqual(completedGeometry.clippedFocusPaint, [], slide.title + ': the final controls keep their focus outline inside the task: ' + JSON.stringify(completedGeometry.clippedFocusPaint.slice(0, 8)))
    await helpButton.focus(); await page.keyboard.press('Enter')
    assert.ok(await helpPanel.locator('p').isVisible(), slide.title + ': live verification opens from the keyboard')
    assert.ok((await helpPanel.locator('p').textContent()).trim(), slide.title + ': the panel contains the specific verification guidance')
    assert.ok(await helpFitsCanvas(), slide.title + ': the bottom icon opens its verification panel inside the canvas')
    assert.equal(await helpButton.getAttribute('aria-expanded'), 'true')
    await page.keyboard.press('Escape'); assert.equal(await helpPanel.isVisible(), false, slide.title + ': Escape closes the verification panel')
    assert.ok(await hasFocus(helpButton), slide.title + ': closing verification restores focus to the icon')
    await helpButton.click(); await bad.locator('.a11y-scenario-heading').click()
    assert.equal(await helpPanel.isVisible(), false, slide.title + ': clicking outside closes verification')
    await helpButton.click()
    await demo.getByRole('button', { name: 'Reimposta gli scenari' }).click()
    assert.deepEqual(await taskState(demo), initialTaskState, slide.title + ': reset restores the actual controls and results')
    assert.equal(await helpPanel.isVisible(), false, slide.title + ': reset closes the verification')
    assert.equal(await helpButton.getAttribute('aria-expanded'), 'false')
    await inspectModes()
  }
  assert.deepEqual(errors, [])
  assert.deepEqual([...serviceAssets].sort(), ['campus.webp', 'course.webp', 'library.webp', 'product.webp'], 'the seventeen live tasks load all four shared service assets')
  await writeFile(`${out}/report.json`, JSON.stringify({ status: 'passed', examples: slides.length, renders: reports.length, errors, reports }, null, 2))
  console.log(JSON.stringify({ status: 'passed', examples: slides.length, renders: reports.length, errors }))
} finally { await browser.close() }
