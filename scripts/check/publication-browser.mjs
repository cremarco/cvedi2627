import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'

const curriculum = JSON.parse(await readFile('data/ux-curriculum.json', 'utf8'))
const publicLessons = [
  { id: 'presentazione-corso', number: 1, title: 'Il corso' },
  { id: 'introduzione-teorica', number: 2, title: 'Introduzione a UX e UI' },
  { id: 'storia-design', number: 3, title: 'Storia del design' },
]
const supplementalMaterials = [
  { id: 'brief-progetto', title: 'Brief di progetto', label: 'Brief di progetto · WHAT IF? 2050' },
  { id: 'approfondimenti', title: 'Approfondimenti', label: 'Approfondimenti individuali · 20 tracce' },
]
const output = process.env.SLIDEV_SCREENSHOTS || 'reports/publication'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = []
const errors = []
const warnings = []
try {
  for (const profile of [
    { name: 'local', base: process.env.SLIDEV_URL || 'http://localhost:3035', total: 558, buttons: 11 },
    { name: 'published', base: process.env.PUBLISHED_SLIDEV_URL || 'http://localhost:3046', total: 242, buttons: 5 },
  ]) {
    const destinations = [...publicLessons.slice(0, 2), ...supplementalMaterials, publicLessons[2], ...(profile.name === 'local' ? curriculum.lessons : [])]
    const page = await browser.newPage({ reducedMotion: 'reduce' })
    page.on('pageerror', error => {
      // Headless Chromium denies Slidev's Wake Lock when leaving print media.
      if (error.message === 'Wake Lock permission request denied') warnings.push(`${profile.name}: ${error.message}`)
      else errors.push(`${profile.name}: ${error.message}`)
    })
    for (const [mode, viewport, media] of [
      ['desktop', { width: 1280, height: 720 }, 'screen'],
      ['narrow', { width: 390, height: 844 }, 'screen'],
      ['print', { width: 1280, height: 720 }, 'print'],
    ]) {
      await page.setViewportSize(viewport)
      await page.emulateMedia({ media })
      const index = await openSlide(page, profile.base, 3, { settle: true })
      assert.equal(await index.locator('.index-grid button').count(), profile.buttons, `${profile.name} ${mode}: only available destinations appear`)
      assert.equal(await index.locator('.index-ux-lessons').count(), profile.name === 'local' ? 1 : 0, `${profile.name}: local-only index visibility`)
      assert.equal(await index.getByRole('group', { name: 'Lezione 02 · Introduzione, brief e approfondimenti' }).count(), 1, `${profile.name} ${mode}: lesson 02 is one accessible group`)
      const geometry = await index.evaluate(root => {
        const stage = root.getBoundingClientRect()
        const scale = stage.width / 1280
        const rect = element => {
          const box = element.getBoundingClientRect()
          return { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: box.width, height: box.height }
        }
        const buttons = [...root.querySelectorAll('.index-grid button')].map(button => {
          const number = button.querySelector('.index-chapter-number')
          const label = button.cloneNode(true)
          label.querySelector('.index-chapter-number')?.remove()
          return {
            ...rect(button),
            grouped: Boolean(button.closest('.index-lesson-two')),
            number: number?.textContent.trim() ?? null,
            label: label.textContent.replace(/\s+/g, ' ').trim(),
          }
        })
        const items = [...root.querySelectorAll('.index-grid > .index-button, .index-lesson-two, .index-ux-lessons > .index-button')].map(rect)
        const segments = buttons.filter(button => button.grouped)
        const group = rect(root.querySelector('.index-lesson-two'))
        const textFits = [...root.querySelectorAll('.index-grid button')].every(button => {
          const box = button.getBoundingClientRect()
          const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT)
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            if (!node.textContent.trim()) continue
            const range = document.createRange()
            range.selectNodeContents(node)
            if ([...range.getClientRects()].some(text => text.left < box.left - 1 || text.right > box.right + 1 || text.top < box.top - 1 || text.bottom > box.bottom + 1)) return false
          }
          return true
        })
        const footer = root.querySelector('.slide-footer').getBoundingClientRect()
        return {
          buttons,
          textFits,
          inside: buttons.every(box => box.left >= stage.left && box.right <= stage.right + 1 && box.top >= stage.top && box.bottom <= footer.top - 12 * scale + 1),
          sizes: buttons.every(box => (box.grouped || Math.abs(box.width - buttons[0].width) < 1) && Math.abs(box.height / scale - 72) < 1),
          joined: segments.length === 3 && Math.abs(segments[0].left - group.left) < 1 && Math.abs(segments[2].right - group.right) < 1 && segments.every((box, i) => Math.abs(box.top - group.top) < 1 && Math.abs(box.bottom - group.bottom) < 1 && (i === 0 || Math.abs(box.left - segments[i - 1].right) < 1)),
          twoColumns: Math.abs(items[0].left - items[1].left) > 1 && items.every(box => Math.abs(box.width - items[0].width) < 1 && [items[0].left, items[1].left].some(left => Math.abs(box.left - left) < 1)),
          readingOrder: items.every((box, i) => i === 0 || box.top > items[i - 1].top + 1 || (Math.abs(box.top - items[i - 1].top) < 1 && box.left > items[i - 1].left)),
          equalRows: items.every((box, i) => Math.abs(box.height / scale - 72) < 1 && (i % 2 === 0 || Math.abs(box.top - items[i - 1].top) < 1)),
        }
      })
      assert.ok(geometry.inside, `${profile.name} ${mode}: index remains inside the canvas`)
      assert.ok(geometry.textFits, `${profile.name} ${mode}: every label fits its button`)
      assert.ok(geometry.sizes && geometry.equalRows, `${profile.name} ${mode}: every index button and the entire lesson 02 group have the same 72px height`)
      assert.ok(geometry.joined, `${profile.name} ${mode}: lesson 02 is one block with three adjoining columns and vertical divisions`)
      assert.ok(geometry.twoColumns && geometry.readingOrder, `${profile.name} ${mode}: two columns preserve lesson reading order`)
      assert.deepEqual(geometry.buttons.map(button => button.number), destinations.map(destination => destination.number ? String(destination.number).padStart(2, '0') : null), `${profile.name} ${mode}: lessons appear in numeric order`)
      assert.deepEqual(geometry.buttons.map(button => button.label), destinations.map(destination => destination.label ?? destination.title), `${profile.name} ${mode}: labels preserve the ordered destinations`)
      const nav = await page.evaluate(() => {
        const nav = document.querySelector('#app').__vue_app__._context.provides['$$slidev-context'].nav
        const slides = nav.slides.value ?? nav.slides
        return { total: nav.total.value ?? nav.total, slides: slides.map(slide => ({ lesson: slide.meta.slide.frontmatter.lesson, alias: slide.meta.slide.frontmatter.routeAlias })) }
      })
      assert.equal(nav.total, profile.total, `${profile.name}: actual runtime total`)
      assert.equal(nav.slides.filter(slide => slide.lesson === 'storia-design').length, 67, 'lesson 03 is available locally and online')
      assert.ok(nav.slides.some(slide => slide.alias === 'storia-design'), 'lesson 03 retains its alias')
      for (const lesson of curriculum.lessons) {
        const owned = nav.slides.filter(slide => slide.lesson === lesson.id)
        assert.equal(owned.length, profile.name === 'local' ? lesson.slideCount : 0, `${profile.name}: ${lesson.id} navigation and overview`)
        assert.equal(nav.slides.some(slide => slide.alias === lesson.id), profile.name === 'local', `${profile.name}: ${lesson.id} alias`)
      }
      await page.screenshot({ path: `${output}/${profile.name}-${mode}-index.png` })
      reports.push({ profile: profile.name, mode, total: nav.total, indexButtons: profile.buttons })
    }
    await page.emulateMedia({ media: 'screen' })
    await page.setViewportSize({ width: 1280, height: 720 })
    for (const [position, destination] of destinations.entries()) {
      const index = await openSlide(page, profile.base, 3, { settle: true })
      await index.locator('.index-grid button').nth(position).click()
      await page.waitForFunction(alias => {
        const nav = document.querySelector('#app').__vue_app__._context.provides['$$slidev-context'].nav
        const slides = nav.slides.value ?? nav.slides
        const target = slides.find(slide => slide.meta.slide.frontmatter.routeAlias === alias)
        return !!target && document.querySelector('.slidev-layout.is-active')?.closest('.slidev-page')?.classList.contains(`slidev-page-${target.no}`)
      }, destination.id)
      const cover = page.locator('.slidev-layout.is-active')
      await assert.doesNotReject(() => cover.locator('h1').filter({ hasText: destination.title }).waitFor({ state: 'visible' }))
      if (destination.number) assert.ok((await cover.innerText()).includes(String(destination.number).padStart(2, '0')), `${profile.name}: cover preserves lesson ${destination.number}`)
      if (destination.id === 'storia-design') {
        const progress = page.locator('.presentation-progress-rail progress')
        assert.equal(await progress.getAttribute('max'), '67', 'history progress counts the complete lesson')
      }
    }
    const closing = await openSlide(page, profile.base, profile.total, { settle: true })
    assert.equal(await closing.locator('h1').innerText(), 'Domande?', `${profile.name}: original closing remains reachable`)
    await page.close()
  }
  assert.deepEqual(errors, [], 'no browser runtime errors')
  const report = { status: 'passed', profiles: reports, localLessonLinks: 6, errors, warnings }
  await writeFile(`${output}/browser-check.json`, JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify(report, null, 2))
} finally { await browser.close() }
