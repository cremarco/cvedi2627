import assert from 'node:assert/strict'
import { mkdir, readFile, realpath, stat, writeFile } from 'node:fs/promises'
import { resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'
import catalog from '../../data/font-previews.json' with { type: 'json' }
import { annotateFontNames, splitFontNames } from '../../utils/font-previews.mjs'
import { openSlide } from './browser.mjs'
import { loadSlideDeck } from './deck.mjs'

// The contract is the reader's original text, authentic samples, and a popup
// that can be read using a pointer, keyboard, or touch without leaving a slide.
const named = text => splitFontNames(text).filter(part => part.fontId).map(part => part.text)
const plain = text => splitFontNames(text).map(part => part.text).join('')
const example = 'Helvetica Neue, Helvetica; Noto Sans Arabic / Noto Sans. EB Garamond e Bodoni Moda.'
assert.equal(plain(example), example, 'annotation preserves every original character')
assert.deepEqual(named(example), ['Helvetica Neue', 'Helvetica', 'Noto Sans Arabic', 'Noto Sans', 'EB Garamond', 'Bodoni Moda'], 'complete names win over shorter aliases')
assert.deepEqual(named('éHelvetica Helveticaé Helvetica_1 Helvetica7 HELVETICA helvetica'), [], 'Unicode word boundaries and curated spelling prevent incidental matches')
assert.deepEqual(named('«Helvetica» — (Helvetica).'), ['Helvetica', 'Helvetica'], 'punctuation does not hide a real font name')
assert.deepEqual(named('Giambattista Bodoni, John Baskerville, William Caslon, Adrian Frutiger e Nicolas Jenson'), [], 'full personal names do not masquerade as font references')
assert.deepEqual(named('https://example.org/Helvetica www.example.org/Helvetica Helvetica@example.org'), [], 'addresses are preserved')

const excluded = [
  '<pre><code>Helvetica</code></pre>',
  '<svg><text>Helvetica</text></svg>',
  '<math><mi>Helvetica</mi></math>',
  '<style>.Helvetica { color: red }</style>',
  '<script>const Helvetica = "Helvetica"</script>',
  '<textarea>Helvetica</textarea>',
  '<p data-no-font-previews>Helvetica</p>',
  '<div v-pre>Helvetica {{ Helvetica }}</div>',
  '<p>{{ Helvetica }}</p>',
  '<a href="https://example.org/Helvetica">Helvetica</a>',
  '<button>Helvetica</button>',
  '<span role="button">Helvetica</span>',
  '<SlideAcronym term="Helvetica">Helvetica</SlideAcronym>',
  '<AcronymText text="Helvetica">Helvetica</AcronymText>',
].join('')
assert.equal(annotateFontNames(excluded), excluded, 'code, links, controls, and existing glossary components remain untouched')
const input = '<p title="Helvetica" data-url="/Helvetica">Helvetica <strong>EB Garamond</strong></p><!-- Helvetica -->'
const annotated = annotateFontNames(input)
assert.ok(annotated.includes('title="Helvetica" data-url="/Helvetica"'), 'attributes remain byte-for-byte unchanged')
assert.ok(annotated.endsWith('<!-- Helvetica -->'), 'comments remain unchanged')
assert.equal((annotated.match(/<SlideFont\b/g) || []).length, 2, 'visible names are annotated within ordinary emphasis')
assert.equal(annotateFontNames(annotated), annotated, 'repeated compilation does not nest previews')
const restored = annotated.replace(/<SlideFont\b[^>]*label="([^"]*)"[^>]*\/>/g, '$1')
assert.equal(restored, input, 'replacing annotations with their labels restores the source HTML')

const publicRoot = await realpath(fileURLToPath(new URL('../../public', import.meta.url)))
const assets = []
for (const [id, entry] of Object.entries(catalog)) {
  assert.ok(entry.name?.trim(), `${id}: font has a readable name`)
  assert.ok(entry.sample?.alt?.trim(), `${id}: sample has a useful alternative text`)
  assert.ok(['word', 'document'].includes(entry.sample.kind), `${id}: sample distinguishes composed word from documentary detail`)
  assert.ok(entry.sample.src?.startsWith('/') && !entry.sample.src.startsWith('//'), `${id}: sample is served locally`)
  const path = await realpath(resolve(publicRoot, `.${entry.sample.src}`))
  assert.ok(path.startsWith(publicRoot + sep), `${id}: sample stays within public assets`)
  assert.ok((await stat(path)).size > 0, `${id}: sample is not empty`)
  if (entry.sample.kind === 'word') {
    assert.ok(path.endsWith('.svg'), `${id}: the composed sample is a portable vector`)
    const svg = await readFile(path, 'utf8')
    assert.match(svg, /<svg\b/, `${id}: sample is an SVG`)
    assert.doesNotMatch(svg, /<text\b|<foreignObject\b|@font-face/i, `${id}: the word uses original outlines and cannot silently fall back to a different font`)
    assert.doesNotMatch(svg, /(?:href|url\()\s*[="']?https?:/i, `${id}: sample does not depend on a remote service`)
  }
  assets.push({ id, name: entry.name, kind: entry.sample.kind, src: entry.sample.src })
}
assert.ok(assets.some(asset => asset.kind === 'word'), 'catalog includes genuine composed specimens')
assert.ok(assets.some(asset => asset.kind === 'document'), 'unavailable fonts retain documentary specimens')

const base = process.env.SLIDEV_URL || 'http://localhost:3042'
const output = process.env.FONT_PREVIEWS_REPORT || 'reports/font-previews'
await mkdir(output, { recursive: true })
const deck = await loadSlideDeck()
function route(title) {
  const slide = deck.slides.find(slide => slide.title === title)
  assert.ok(slide, `${title}: teaching slide exists`)
  return slide.frontmatter?.routeAlias || slide.index + 1
}
const fixtures = [
  'tipografia-griglie-tipo-caslon-baskerville-bodoni',
  'tipografia-griglie-tipo-new-alphabet-swift',
  'tipografia-griglie-tipo-serif-antichi-didoni',
  'tipografia-griglie-tipo-times-georgia',
  route('IKEA: continuità e sostituzione'),
  'tipografia-griglie-tipo-morris-revival',
  route('Lettere e potere'),
  'tipografia-griglie-tipo-legno-manifesti',
]
const browser = await chromium.launch({ executablePath: process.env.CHROME_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const reports = []
const errors = []
const requests = []
const fontPopup = page => page.locator('.slide-font-tooltip .tooltip-content')
const fontTrigger = root => root.locator('.slide-font-trigger').first()
function watchPage(page) {
  page.on('pageerror', error => { if (!error.message.includes('Wake Lock permission')) errors.push(error.message) })
  page.on('requestfailed', request => { if (/font-preview/.test(request.url())) requests.push({ url: request.url(), error: request.failure()?.errorText }) })
}
async function assertSample(page, trigger) {
  const popup = fontPopup(page)
  await popup.waitFor({ state: 'visible' })
  const id = await trigger.getAttribute('data-font-id')
  const entry = catalog[id]
  assert.ok(entry, `${id}: trigger resolves to a curated specimen`)
  assert.ok((await popup.innerText()).includes(entry.name), `${id}: popup identifies the actual font`)
  const describedBy = await trigger.getAttribute('aria-describedby')
  assert.ok(describedBy, `${id}: assistive technology can find the popup`)
  assert.equal(await popup.getAttribute('id'), describedBy, `${id}: description belongs to the open tooltip`)
  assert.equal(await popup.getAttribute('role'), 'tooltip')
  const image = popup.locator('img.slide-font-sample')
  await image.waitFor({ state: 'visible' })
  await image.evaluate(el => el.decode())
  assert.ok(await image.evaluate(el => el.naturalWidth > 0 && el.naturalHeight > 0), `${id}: specimen actually loads`)
  assert.equal(await image.getAttribute('alt'), entry.sample.alt)
  assert.ok(new URL(await image.getAttribute('src'), base).pathname.endsWith(entry.sample.src), `${id}: popup uses the registered specimen`)
  return { id, name: entry.name, kind: entry.sample.kind }
}
async function assertViewport(page, mode) {
  const box = await fontPopup(page).boundingBox()
  const viewport = page.viewportSize()
  assert.ok(box && box.x >= 10 && box.x + box.width <= viewport.width - 10 && box.y >= 0 && box.y + box.height <= viewport.height, `${mode}: complete tooltip fits the viewport`)
  return box
}
async function dismiss(page) {
  await page.keyboard.press('Escape')
  await fontPopup(page).waitFor({ state: 'detached' })
  await page.mouse.move(0, 0)
}
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  watchPage(page)
  for (const alias of fixtures) {
    const root = await openSlide(page, base, alias)
    const triggers = root.locator('.slide-font-trigger')
    assert.ok(await triggers.count() > 0, `${alias}: fonts in the teaching text can be explored`)
    assert.equal(await root.locator('.slide-font-trigger .slide-font-trigger, a .slide-font-trigger, button .slide-font-trigger').count(), 0, `${alias}: font controls neither nest nor replace existing links`)
    const unchanged = await root.evaluate(root => {
      const selectors = 'h1, p, li, .lesson-figure, .lesson-columns, .lesson-columns > div'
      const snapshot = () => ({ text: root.textContent, boxes: [...root.querySelectorAll(selectors)].map(el => el.getBoundingClientRect().toJSON()) })
      const before = snapshot()
      const originals = [...root.querySelectorAll('.slide-font-trigger')].map(trigger => {
        const text = document.createTextNode(trigger.textContent)
        trigger.replaceWith(text)
        return { trigger, text }
      })
      const after = snapshot()
      for (const { trigger, text } of originals) text.replaceWith(trigger)
      return { before, after }
    })
    assert.deepEqual(unchanged.after, unchanged.before, `${alias}: names retain text, wrapping, and the geometry of the original slide`)
    reports.push({ alias, triggers: await triggers.count(), unchangedTextAndGeometry: true })
  }

  // These references were missing from the original catalog. Keep a concrete
  // coverage contract so a complete-looking gallery cannot hide an omission.
  let coverageRoot = await openSlide(page, base, 'tipografia-griglie-tipo-morris-revival')
  assert.deepEqual(await coverageRoot.locator('.lead .slide-font-trigger').allTextContents(), ['Golden', 'Jenson', 'Troy', 'Chaucer'], 'all four type references in the Morris explanation are available')
  const jenson = coverageRoot.locator('.slide-font-trigger').filter({ hasText: /^Jenson$/ })
  await jenson.hover()
  assert.equal((await assertSample(page, jenson)).kind, 'document', 'the historical Jenson model uses its authentic document')
  await dismiss(page)
  coverageRoot = await openSlide(page, base, 'tipografia-griglie-tipo-venezia-jenson')
  assert.equal(await coverageRoot.locator('.lead .slide-font-trigger').count(), 0, 'Nicolas Jenson as a person remains ordinary text')
  assert.deepEqual(await coverageRoot.locator('.slide-font-trigger').allTextContents(), ['Jenson', 'Jenson'], 'the type model named in the explanation and the specimen caption remains explorable')
  coverageRoot = await openSlide(page, base, route('Lettere e potere'))
  for (const name of ['Fraktur', 'Antiqua']) {
    const trigger = coverageRoot.locator('.slide-font-trigger').filter({ hasText: new RegExp(`^${name}$`) }).first()
    await trigger.hover()
    assert.equal((await assertSample(page, trigger)).kind, 'document', `${name}: the category is illustrated with a documentary specimen`)
    await dismiss(page)
  }
  coverageRoot = await openSlide(page, base, 'tipografia-griglie-tipo-legno-manifesti')
  const wood = coverageRoot.locator('.slide-font-trigger').filter({ hasText: /^No\.117$/ }).first()
  await wood.hover()
  await assertSample(page, wood)
  await dismiss(page)
  coverageRoot = await openSlide(page, base, 'tipografia-griglie-tipo-times-georgia')
  assert.deepEqual(await coverageRoot.locator('.lead .slide-font-trigger').allTextContents(), ['Times New Roman'], 'the complete font name in the explanation is explorable')
  assert.equal(await coverageRoot.locator('[data-no-font-previews] .slide-font-trigger').count(), 0, 'the Times newspaper remains ordinary text')
  assert.equal(await coverageRoot.locator('h1 .slide-font-trigger').filter({ hasText: /^Times$/ }).count(), 1, 'the Times typeface named in the heading is explorable')
  coverageRoot = await openSlide(page, base, route('Lettere come spazio'))
  assert.equal(await coverageRoot.locator('.slide-font-trigger').count(), 0, 'the Chicago poster title is not the Chicago font')

  for (const [mode, viewport] of [['desktop', { width: 1280, height: 720 }], ['narrow', { width: 636, height: 778 }]]) {
    await page.setViewportSize(viewport)
    let root = await openSlide(page, base, fixtures[0])
    let trigger = fontTrigger(root)
    const beforeUrl = page.url()
    await trigger.hover()
    const sample = await assertSample(page, trigger)
    const bounds = await assertViewport(page, mode)
    const treatment = await trigger.evaluate(el => {
      const own = getComputedStyle(el), parent = getComputedStyle(el.parentElement)
      const colorProbe = document.createElement('span')
      colorProbe.style.color = own.getPropertyValue('--section-primary')
      el.append(colorProbe)
      const primary = getComputedStyle(colorProbe).color
      colorProbe.remove()
      return { line: own.textDecorationLine, style: own.textDecorationStyle, color: own.textDecorationColor, primary, font: [own.fontFamily, own.fontSize, own.fontWeight, own.lineHeight, own.letterSpacing], inherited: [parent.fontFamily, parent.fontSize, parent.fontWeight, parent.lineHeight, parent.letterSpacing], ink: own.color, inheritedInk: parent.color }
    })
    assert.ok(treatment.line.includes('underline'), `${mode}: font names are visually identifiable`)
    assert.equal(treatment.style, 'dashed', `${mode}: font previews differ from ordinary links`)
    assert.equal(treatment.color, treatment.primary, `${mode}: underline follows the owning slide palette`)
    assert.deepEqual(treatment.font, treatment.inherited, `${mode}: labels preserve their typography`)
    assert.equal(treatment.ink, treatment.inheritedInk, `${mode}: label text preserves its original color`)
    await page.screenshot({ path: `${output}/${mode}-font-hover.png` })
    await fontPopup(page).hover()
    await page.waitForTimeout(180)
    assert.equal(await fontPopup(page).count(), 1, 'popup remains readable when the pointer enters it')
    await dismiss(page)
    await trigger.focus()
    await assertSample(page, trigger)
    await page.keyboard.press('Escape')
    await fontPopup(page).waitFor({ state: 'detached' })
    assert.ok(await trigger.evaluate(el => document.activeElement === el), 'Escape preserves the reading position and keyboard focus')
    assert.equal(page.url(), beforeUrl, 'exploring or dismissing a font does not navigate')
    await trigger.evaluate(el => el.blur())
    await trigger.hover()
    await assertSample(page, trigger)
    await page.keyboard.press('ArrowRight')
    await fontPopup(page).waitFor({ state: 'detached' })

    root = await openSlide(page, base, fixtures[1])
    trigger = fontTrigger(root)
    await trigger.hover()
    const documentarySample = await assertSample(page, trigger)
    await assertViewport(page, `${mode}-documentary`)
    await dismiss(page)
    root = await openSlide(page, base, fixtures[2])
    const first = root.locator('.slide-font-trigger').first()
    const second = root.locator('.slide-font-trigger').filter({ hasText: 'Bodoni Moda' }).first()
    await first.hover()
    await assertSample(page, first)
    await second.hover()
    await assertSample(page, second)
    assert.equal(await fontPopup(page).count(), 1, 'moving between fonts replaces the prior preview')
    await dismiss(page)

    root = await openSlide(page, base, fixtures[4])
    const acronym = root.locator('.slide-acronym').first()
    assert.ok(await acronym.count(), 'shared glossary fixture includes an acronym and fonts')
    await acronym.hover()
    await page.locator('.slide-acronym-tooltip .tooltip-content').waitFor({ state: 'visible' })
    await fontTrigger(root).hover()
    await assertSample(page, fontTrigger(root))
    assert.equal(await page.locator('.slide-acronym-tooltip').count(), 0, 'font preview replaces an acronym tooltip')
    // Keyboard focus can reach a reference covered by the open preview panel.
    await acronym.focus()
    await page.locator('.slide-acronym-tooltip .tooltip-content').waitFor({ state: 'visible' })
    assert.equal(await fontPopup(page).count(), 0, 'acronym tooltip replaces a font preview')
    await page.keyboard.press('Escape')
    reports.push({ mode, sample, documentarySample, tooltipBounds: bounds, pointerAndKeyboard: true, sharedGlossary: true })
  }

  const touch = await browser.newContext({ viewport: { width: 636, height: 778 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' })
  const touchPage = await touch.newPage()
  watchPage(touchPage)
  const touchRoot = await openSlide(touchPage, base, fixtures[0])
  const touchUrl = touchPage.url()
  await fontTrigger(touchRoot).tap()
  await assertSample(touchPage, fontTrigger(touchRoot))
  await assertViewport(touchPage, 'touch')
  assert.equal(touchPage.url(), touchUrl, 'touch explores the font without changing the slide')
  await touchRoot.locator('.slide-footer').tap()
  await fontPopup(touchPage).waitFor({ state: 'detached' })
  await touch.close()

  await page.setViewportSize({ width: 1280, height: 720 })
  const root = await openSlide(page, base, fixtures[0])
  await fontTrigger(root).hover()
  await assertSample(page, fontTrigger(root))
  await page.emulateMedia({ media: 'print' })
  assert.ok((await root.locator('.slide-font-trigger').evaluateAll(elements => elements.every(el => getComputedStyle(el).textDecorationLine === 'none'))), 'printed font names retain the unadorned teaching text')
  assert.ok(await page.locator('.slide-font-tooltip').evaluateAll(elements => elements.every(el => getComputedStyle(el).display === 'none')), 'no popup is printed')
  await page.screenshot({ path: `${output}/print.png` })
  assert.deepEqual(requests, [], 'preview samples do not fail to load')
  assert.deepEqual(errors, [], 'no application errors')
  const report = { status: 'passed', parserIsolation: true, localAssets: assets, fixtures: reports, touch: true, print: true }
  await writeFile(`${output}/verification.json`, JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify({ ...report, localAssets: assets.length }, null, 2))
} finally {
  await browser.close()
}
