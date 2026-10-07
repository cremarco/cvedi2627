import assert from 'node:assert/strict'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'

const curriculum = JSON.parse(await readFile('data/ux-curriculum.json', 'utf8'))
const output = process.env.SLIDEV_SCREENSHOTS || 'reports/publication'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = []
const errors = []
const warnings = []
try {
  for (const profile of [
    { name: 'local', base: process.env.SLIDEV_URL || 'http://localhost:3035', total: 491, buttons: 11 },
    { name: 'published', base: process.env.PUBLISHED_SLIDEV_URL || 'http://localhost:3046', total: 241, buttons: 5 },
  ]) {
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
      const geometry = await index.evaluate(root => {
        const stage = root.getBoundingClientRect()
        return [...root.querySelectorAll('.index-grid button')].every(button => {
          const box = button.getBoundingClientRect()
          return box.left >= stage.left && box.right <= stage.right + 1 && box.top >= stage.top && box.bottom <= stage.bottom + 1
        })
      })
      assert.ok(geometry, `${profile.name} ${mode}: index remains inside the canvas`)
      assert.ok(await index.evaluate(root => Math.abs(root.querySelector('.index-history').getBoundingClientRect().width - root.querySelector('.index-grid').getBoundingClientRect().width) < 1), `${profile.name} ${mode}: history link spans its row`)
      const nav = await page.evaluate(() => {
        const nav = document.querySelector('#app').__vue_app__._context.provides['$$slidev-context'].nav
        const slides = nav.slides.value ?? nav.slides
        return { total: nav.total.value ?? nav.total, slides: slides.map(slide => ({ lesson: slide.meta.slide.frontmatter.lesson, alias: slide.meta.slide.frontmatter.routeAlias })) }
      })
      assert.equal(nav.total, profile.total, `${profile.name}: actual runtime total`)
      assert.equal(nav.slides.filter(slide => slide.lesson === 'storia-design').length, 68, 'lesson 03 is available locally and online')
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
    const index = await openSlide(page, profile.base, 3, { settle: true })
    await index.locator('.index-history').click()
    await page.locator('.slidev-layout.is-active h1').filter({ hasText: 'Storia del design' }).waitFor({ state: 'visible' })
    const progress = page.locator('.presentation-progress-rail progress')
    assert.equal(await progress.getAttribute('max'), '68', 'history progress counts the complete lesson')
    if (profile.name === 'local') {
      for (const lesson of curriculum.lessons) {
        const index = await openSlide(page, profile.base, 3, { settle: true })
        await index.locator('.index-ux-lessons button').filter({ hasText: lesson.title }).click()
        const cover = page.locator('.slidev-layout.is-active')
        await assert.doesNotReject(() => cover.locator('h1').filter({ hasText: lesson.title }).waitFor({ state: 'visible' }))
        assert.ok((await cover.innerText()).includes(String(lesson.number).padStart(2, '0')), 'local cover preserves its lesson number')
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
