import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { loadSlideDeck } from './deck.mjs'
import { openSlide } from '../../../../scripts/check/browser.mjs'

const deck = await loadSlideDeck()
const lessonSlides = deck.slides.filter(s => s.frontmatter.lesson === 'percezione-gerarchia')
assert.equal(lessonSlides.length, 105)
const selected = process.env.LESSON05_SLIDES?.split(',').map(Number)
const slides = selected ? lessonSlides.filter(s => selected.includes(s.frontmatter.lessonSlide)) : lessonSlides
assert.ok(slides.length, 'at least one lesson slide is selected')
if (selected) assert.equal(slides.length, new Set(selected).size, 'every requested lesson slide exists')
const plan = JSON.parse(await readFile(new URL('../../data/lesson-05-accessibility.json', import.meta.url)))
const base = process.env.SLIDEV_URL || 'http://localhost:3079'
const out = process.env.LESSON05_REPORT || 'reports/lesson-05/completeness'
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
const errors = [], reports = []
page.on('pageerror', e => { if (e.message !== 'Wake Lock permission request denied') errors.push(e.message) })
const modes = [['desktop', { width: 1280, height: 720 }, 'screen'], ['narrow', { width: 390, height: 844 }, 'screen'], ['print', { width: 1280, height: 720 }, 'print']]
try {
  for (const [mode, viewport, media] of modes) {
    await page.setViewportSize(viewport); await page.emulateMedia({ media })
    for (const slide of slides) {
      const root = await openSlide(page, base, slide.index + 1, { settle: true })
      const geometry = await root.evaluate(root => {
        const box = root.getBoundingClientRect(), scale = box.width / 1280, footer = root.querySelector('.slide-footer')?.getBoundingClientRect()
        const interactive = root.classList.contains('interactive-example-slide')
        const bottom = (footer?.top ?? box.bottom) - (footer ? 12 * scale : 0)
        const violations = [], walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const parent = node.parentElement
          if (!node.textContent.trim() || parent.closest('.slide-footer, svg, script, style, [aria-hidden="true"], .sr-only') || getComputedStyle(parent).visibility !== 'visible') continue
          // The dedicated interactive suite covers the service and its intentional bad reflow.
          if (interactive && parent.closest('h1, .a11y-ui')) continue
          const range = document.createRange(); range.selectNodeContents(node)
          for (const rect of range.getClientRects()) {
            if (!rect.width || !rect.height) continue
            if (rect.left < box.left - scale || rect.right > box.right + scale || rect.top < box.top - scale || rect.bottom > bottom + scale) {
              violations.push({ text: node.textContent.trim().slice(0, 120), cause: 'canvas/footer' }); break
            }
            for (let ancestor = parent; ancestor && root.contains(ancestor); ancestor = ancestor.parentElement) {
              const style = getComputedStyle(ancestor), bounds = ancestor.getBoundingClientRect()
              const clip = { left: bounds.left + ancestor.clientLeft * scale, top: bounds.top + ancestor.clientTop * scale, right: bounds.left + (ancestor.clientLeft + ancestor.clientWidth) * scale, bottom: bounds.top + (ancestor.clientTop + ancestor.clientHeight) * scale }
              if ((['hidden', 'clip', 'auto', 'scroll'].includes(style.overflowX) && (rect.left < clip.left - scale || rect.right > clip.right + scale)) || (['hidden', 'clip', 'auto', 'scroll'].includes(style.overflowY) && (rect.top < clip.top - scale || rect.bottom > clip.bottom + scale))) {
                violations.push({ text: node.textContent.trim().slice(0, 120), cause: ancestor.className }); break
              }
            }
          }
        }
        const images = [...root.querySelectorAll('img')]
        const brokenImages = images.filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src'))
        for (const image of root.querySelectorAll('.lesson-figure img')) {
          const rect = image.getBoundingClientRect()
          if (rect.left < box.left - scale || rect.right > box.right + scale || rect.top < box.top - scale || rect.bottom > bottom + scale) violations.push({ text: image.alt, cause: 'figure bounds' })
        }
        return { title: root.querySelector('h1')?.textContent.trim(), headings: root.querySelectorAll('h1').length, counter: root.querySelector('.slide-index')?.textContent.trim(), violations, brokenImages,
          links: [...root.querySelectorAll('a[href]')].map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href'), visible: a.getBoundingClientRect().width > 0 })), visibleText: root.innerText }
      })
      const { visibleText, ...record } = geometry
      assert.equal(geometry.headings, 1, `${slide.title}: semantic heading`)
      assert.equal(geometry.counter, `${slide.frontmatter.lessonSlide} / 105`, `${slide.title}: page counter`)
      assert.doesNotMatch(visibleText, /\b(?:Imagen|ImageGen)\b/i, `${slide.title}: generation metadata is outside presentation copy`)
      reports.push({ slide: slide.frontmatter.lessonSlide, alias: slide.frontmatter.routeAlias, mode, ...record })
      await page.mouse.move(1, 1)
      await root.screenshot({ path: `${out}/${mode}-${String(slide.frontmatter.lessonSlide).padStart(3, '0')}.png` })
    }
    console.log(JSON.stringify({ mode, slides: slides.length, violations: reports.filter(r => r.mode === mode && (r.violations.length || r.brokenImages.length)).length }))
  }
  const expectedLinks = new Map(plan.slides.filter(spec => slides.some(slide => slide.title === spec.title))
    .flatMap(spec => [...(spec.links || []), ...(spec.tools || [])]).map(link => [link.label, link.href]))
  for (const mode of modes.map(m => m[0])) for (const [text, href] of expectedLinks) assert.ok(reports.some(r => r.mode === mode && r.links.some(a => a.text === text && a.href === href && a.visible)), `${mode}: primary resource ${text} is available`)
  const findings = reports.filter(r => r.violations.length || r.brokenImages.length)
  const result = { status: findings.length || errors.length ? 'failed' : 'passed', slides: slides.length, renders: reports.length, findings, errors, reports }
  await writeFile(`${out}/report.json`, JSON.stringify(result, null, 2))
  console.log(JSON.stringify({ status: result.status, slides: result.slides, renders: result.renders, findings: findings.length, errors }))
  assert.deepEqual(findings, [], 'all lesson slides retain visible content and loaded assets')
  assert.deepEqual(errors, [])
} finally { await browser.close() }
