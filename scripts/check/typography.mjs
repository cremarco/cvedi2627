import assert from 'node:assert/strict'
import { chromium } from 'playwright-chromium'
import { checkSlideSources } from './slide-source.mjs'

const { deck, approfondimenti } = await checkSlideSources()
const base = (process.env.SLIDEV_URL || 'http://localhost:3035').replace(/\/$/, '')
const browser = await chromium.launch()
const checks = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  const fontRequests = []
  page.on('request', request => { if (request.resourceType() === 'font') fontRequests.push(request.url()) })
  await page.goto(`${base}/#/brief-decisioni`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const delivery = await page.evaluate(async () => {
    for (const weight of [400, 500, 600, 700]) await document.fonts.load(`${weight} 24px "Nunito Sans"`, 'È già così: perché? 26/27 · 50 €')
    await document.fonts.load('italic 400 18px "Nunito Sans"', 'È già così')
    return [...document.fonts].filter(face => face.family === 'Nunito Sans').map(face => ({ style: face.style, weights: face.weight, status: face.status }))
  })
  assert.ok(delivery.some(face => face.style === 'normal' && face.status === 'loaded'))
  assert.ok(delivery.some(face => face.style === 'italic' && face.status === 'loaded'))
  assert.ok(fontRequests.every(url => new URL(url).origin === new URL(base).origin), 'all fonts load from the local presentation')
  assert.equal(fontRequests.filter(url => url.includes('nunito-sans-latin-wght-normal')).length, 1, 'one variable file supplies all reading weights')
  checks.push('normal, medium, semibold, bold and true italic load locally, including Italian glyphs')

  const grade = deck.slides.find(slide => String(slide.frontmatter.class).split(/\s+/).includes('grade-slide'))
  await page.goto(`${base}/#/${grade.index + 1}`, { waitUntil: 'networkidle' })
  const numbers = await page.locator('.stat-value').first().evaluate(value => {
    const style = getComputedStyle(value)
    const span = document.createElement('span')
    span.style.cssText = 'position:absolute;left:-9999px'
    // The computed font shorthand can be empty when numeric features are set.
    // Copy its longhands so the measurement uses the actual statistic face.
    span.style.fontFamily = style.fontFamily
    span.style.fontSize = style.fontSize
    span.style.fontWeight = style.fontWeight
    span.style.fontStyle = style.fontStyle
    span.style.letterSpacing = style.letterSpacing
    span.style.fontVariantNumeric = style.fontVariantNumeric
    document.body.append(span)
    span.textContent = '111111'
    const ones = span.getBoundingClientRect().width
    span.textContent = '888888'
    const eights = span.getBoundingClientRect().width
    span.remove()
    return { ones, eights, feature: style.fontVariantNumeric, family: getComputedStyle(value).fontFamily, size: style.fontSize }
  })
  assert.ok(numbers.feature.includes('tabular-nums'))
  assert.ok(Math.abs(numbers.ones - numbers.eights) < .1, 'tabular figures have equal actual advance widths')
  checks.push('statistical numerals are physically aligned, not only declared tabular')

  const fallback = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  await fallback.route('**/fonts/deck/*.woff2', route => route.abort())
  const fixtures = [
    deck.slides.find(slide => slide.frontmatter.routeAlias === 'brief-decisioni'),
    ...[approfondimenti[7], approfondimenti[10], approfondimenti.at(-1)],
    deck.slides.find(slide => slide.frontmatter.routeAlias === 'ux-gerarchia'),
  ]
  for (const viewport of [{ width: 1280, height: 720 }, { width: 636, height: 778 }]) {
    await fallback.setViewportSize(viewport)
    for (const slide of fixtures) {
      assert.ok(slide)
      await fallback.goto(`${base}/#/${slide.index + 1}`, { waitUntil: 'networkidle' })
      await fallback.evaluate(() => document.fonts.ready)
      const result = await fallback.locator('.slidev-layout.is-active').evaluate(root => {
        const box = root.getBoundingClientRect()
        const bottom = root.querySelector('.slide-footer').getBoundingClientRect().top - 12 * box.width / 1280
        const violations = []
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim() || node.parentElement.closest('.slide-footer, [aria-hidden="true"]')) continue
          const range = document.createRange()
          range.selectNodeContents(node)
          for (const r of range.getClientRects()) if (r.width && (r.left < box.left - 1 || r.right > box.right + 1 || r.top < box.top - 1 || r.bottom > bottom + 1)) violations.push(node.textContent.trim().slice(0, 50))
        }
        return { violations, fonts: [...document.fonts].filter(face => face.family === 'Nunito Sans').map(face => face.status), fallbackLoaded: [...document.fonts].some(face => face.family === 'Inter' && face.status === 'loaded') }
      })
      assert.ok(result.fonts.includes('error'), 'the test really blocked the primary face')
      assert.ok(result.fallbackLoaded, 'local Inter fallback is available')
      assert.deepEqual(result.violations, [], `fallback preserves visible text: slide ${slide.index + 1}, ${viewport.width}px`)
    }
  }
  checks.push('font failure keeps long headings, prose and comparisons readable on desktop and narrow viewports')
  console.log(JSON.stringify({ status: 'passed', checks, delivery, numbers, fontRequests }, null, 2))
} finally {
  await browser.close()
}
