import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { loadSlideDeck } from './deck.mjs'
import { openSlide } from './browser.mjs'

const base = process.env.SLIDEV_URL || 'http://localhost:3035'
const output = new URL('../../reports/gestalt-lesson/', import.meta.url)
await mkdir(output, { recursive: true })
const deck = await loadSlideDeck()
const slides = deck.slides.filter(s => s.frontmatter.lesson === 'gestalt')
const snapshot = JSON.parse(await readFile(new URL('../../assets/booklet/lezione-06-gestalt/figma-source.json', import.meta.url)))
const plan = JSON.parse(await readFile(new URL('../../assets/booklet/lezione-06-gestalt/content-plan.json', import.meta.url)))
const images = JSON.parse(await readFile(new URL('../../assets/booklet/lezione-06-gestalt/image-manifest.json', import.meta.url)))
const selection = JSON.parse(await readFile(new URL('../../assets/booklet/lezione-06-gestalt/asset-sources.json', import.meta.url)))
const chapterFigures = JSON.parse(await readFile(new URL('../../assets/booklet/capitolo-3/figure-index.json', import.meta.url)))
  .figures.filter(figure => figure.pageId === snapshot.pageId)
assert.equal(slides.length, 111)
assert.deepEqual([...new Set(plan.map(row => row.boardId))], snapshot.frames.map(frame => frame.id), 'all current boards stay in their editorial order')
assert.deepEqual(plan.filter(row => row.kind === 'diagram' && row.folio >= 236 && row.folio <= 305).map(row => row.folio),
  [236, 245, 254, 262, 270, 279, 288, 296, 305], 'common region follows figure-ground and past experience')
assert.equal(selection.currentDiagramExports.length, 12, 'all twelve current native schematics are imported')
assert.equal(chapterFigures.length, 94)
const numbered = new Set(slides.flatMap(slide => slide.frontmatter.bookletFigures || []))
const references = new Set(slides.flatMap(slide => slide.frontmatter.bookletFigureReferences || []))
for (const figure of chapterFigures) {
  assert.ok(numbered.has(figure.number), `${figure.number}: current booklet figure included`)
  assert.ok(references.has(figure.number), `${figure.number}: pertinent prose reference retained`)
  assert.ok(slides.some(slide => slide.content.includes(`Figura ${figure.number} —`)), `${figure.number}: numbered caption visible`)
}
assert.equal(numbered.size, 94, 'no stale figure numbers from the previous booklet snapshot')
assert.ok(slides.some(slide => slide.content.includes('https://www.nngroup.com/articles/anchoring-principle/'))
  || plan.some(row => row.folio === 304 && row.links.includes('https://www.nngroup.com/articles/anchoring-principle/')),
  'the Oxfam case cites its corrected primary source')
const selected = new Set(plan.flatMap(row => row.figureCandidates))
for (const frame of snapshot.frames)
  for (const image of frame.images) assert.ok(selected.has(image.id), `retained source image ${image.id}`)
assert.ok(images.assets.every(a => a.sha256 && a.publicationSha256 && a.retainedSources.length), 'all figures preserve originals and publication hashes')

const browser = await chromium.launch()
const reports = []
const zooms = []
const errors = []
const fixtures = new Set([1, 2, 5, 7, 11, 12, 15, 16, 23, 36, 38, 39, 42, 43, 57, 63, 80, 100, 106, 107, 109, 111])
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') errors.push(error.message) })
  for (const [mode, viewport, media] of [
    ['desktop', { width: 1280, height: 720 }, 'screen'],
    ['narrow', { width: 390, height: 844 }, 'screen'],
    ['print', { width: 1280, height: 720 }, 'print'],
  ]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media, reducedMotion: 'reduce' })
    for (const slide of slides) {
      const root = await openSlide(page, base, slide.index + 1, { settle: true })
      const report = await root.evaluate(root => {
        const box = root.getBoundingClientRect()
        const scale = box.width / 1280
        const title = root.querySelector('h1').getBoundingClientRect()
        const footer = root.querySelector('.slide-footer')?.getBoundingClientRect()
        const cover = root.classList.contains('chapter-slide')
        const bottom = cover ? box.bottom : footer.top - 12 * scale
        const violations = []
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim() || node.parentElement.closest('.slide-footer, [aria-hidden="true"]')) continue
          const range = document.createRange()
          range.selectNodeContents(node)
          for (const rect of range.getClientRects()) if (rect.width && rect.height &&
            (rect.left < box.left - 1 || rect.right > box.right + 1 || rect.top < box.top - 1 || rect.bottom > bottom + 1)) {
            violations.push(node.textContent.trim().slice(0, 130)); break
          }
        }
        const images = [...root.querySelectorAll('.lesson-figure img')].map(img => {
          const rect = img.getBoundingClientRect()
          return { src: img.getAttribute('src'), width: rect.width / scale, height: rect.height / scale,
            naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
            loaded: img.complete && img.naturalWidth > 0,
            fits: rect.left >= box.left - 1 && rect.right <= box.right + 1 && rect.top >= title.bottom - 1 && rect.bottom <= bottom + 1,
            border: getComputedStyle(img).borderStyle }
        })
        return { title: root.querySelector('h1').textContent, violations, images,
          titleX: (title.left - box.left) / scale, titleY: (title.top - box.top) / scale, cover,
          page: root.querySelector('.slide-footer')?.textContent, palette: getComputedStyle(root).getPropertyValue('--section-primary').trim() }
      })
      reports.push({ slide: slide.frontmatter.lessonSlide, mode, ...report })
      if (fixtures.has(slide.frontmatter.lessonSlide)) await root.screenshot({ path: new URL(`${mode}-${String(slide.frontmatter.lessonSlide).padStart(3, '0')}.png`, output).pathname })
    }
    if (media !== 'print') {
      for (const alias of ['gestalt-010', 'gestalt-037', 'gestalt-078']) {
        const root = await openSlide(page, base, alias, { settle: true })
        const opener = root.locator('.lesson-image-hint').first()
        await opener.focus()
        await opener.press('Enter')
        const dialog = page.locator('.lesson-image-dialog[open]')
        await dialog.waitFor({ state: 'visible' })
        await dialog.locator('img').evaluate(img => img.complete ? null : new Promise(resolve => img.addEventListener('load', resolve, { once: true })))
        const result = await dialog.evaluate(dialog => {
          const close = dialog.querySelector('.lesson-image-close').getBoundingClientRect()
          const image = dialog.querySelector('img').getBoundingClientRect()
          return { closeVisible: close.top >= 0 && close.bottom <= innerHeight,
            imageVisible: image.width > 0 && image.height > 0,
            palette: getComputedStyle(dialog).getPropertyValue('--section-primary').trim() }
        })
        await page.keyboard.press('Escape')
        await dialog.waitFor({ state: 'hidden' })
        const focusReturned = await opener.evaluate(el => el === document.activeElement)
        const palette = await root.evaluate(el => getComputedStyle(el).getPropertyValue('--section-primary').trim())
        zooms.push({ mode, alias, ...result, focusReturned, paletteMatches: palette === result.palette })
      }
    }
  }
} finally { await browser.close() }

const failures = reports.filter(r => r.violations.length || r.images.some(i => !i.loaded || !i.fits || i.border !== 'none')
  || (!r.cover && (Math.abs(r.titleX - 72) > 1 || Math.abs(r.titleY - 52) > 1)))
const failedZooms = zooms.filter(r => !r.closeVisible || !r.imageVisible || !r.focusReturned || !r.paletteMatches)
await writeFile(new URL('browser-verification.json', output), JSON.stringify({ status: failures.length || errors.length || failedZooms.length ? 'failed' : 'passed',
  renders: reports.length, boards: snapshot.frames.length, sourceImageNodes: snapshot.frames.reduce((n,f) => n+f.images.length,0),
  failures, failedZooms, errors, zooms, reports }, null, 2) + '\n')
console.log(JSON.stringify({ renders: reports.length, failures, failedZooms, errors }, null, 2))
assert.deepEqual(failures, [], 'all Gestalt slides fit desktop, narrow viewport and print')
assert.deepEqual(failedZooms, [], 'keyboard enlargement, Escape, focus and palette remain shared')
assert.deepEqual(errors, [], 'no browser runtime errors')
