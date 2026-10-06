import assert from 'node:assert/strict'
import { chromium } from 'playwright-chromium'
import { checkSlideSources } from './slide-source.mjs'

const { deck } = await checkSlideSources()
const base = (process.env.SLIDEV_URL || 'http://localhost:3035').replace(/\/$/, '')
const browser = await chromium.launch()
const checks = []
const errors = []
const warnings = []
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'no-preference' })
  page.on('pageerror', error => {
    // Slidev requests Wake Lock after returning from print. Headless Chromium
    // denies it; the deck and export still work. Keep every other error fatal.
    if (error.message === 'Wake Lock permission request denied') warnings.push(error.message)
    else errors.push(error.message)
  })
  const active = () => page.locator('.slidev-layout.is-active')
  const animations = () => active().evaluate(root => root.getAnimations({ subtree: true })
    .filter(animation => animation.animationName?.startsWith('cvedi-'))
    .map(animation => ({ name: animation.animationName, state: animation.playState, start: animation.startTime, ...animation.effect.getTiming() })))
  async function settle() {
    await active().evaluate(root => Promise.all(root.getAnimations({ subtree: true })
      .filter(animation => Number.isFinite(animation.effect.getComputedTiming().endTime))
      .map(animation => animation.finished.catch(() => {}))))
  }
  async function go(alias) {
    await page.goto(`${base}/#/${alias}`)
    await active().waitFor()
  }
  async function assertStaticMap() {
    assert.equal(await active().evaluate(root => root.classList.contains('motion-enabled')), false)
    assert.equal((await animations()).length, 0)
    const map = await active().evaluate(root => ({
      routes: [...root.querySelectorAll('.closing-metro-reveal')].map(path => getComputedStyle(path).strokeDashoffset),
      dots: [...root.querySelectorAll('.closing-metro-dot')].map(dot => getComputedStyle(dot).opacity),
    }))
    assert.ok(map.routes.length > 0 && map.routes.every(offset => offset === '0px'), 'all map masks reveal the complete paths')
    assert.ok(map.dots.length > 0 && map.dots.every(opacity => opacity === '1'), 'all stations remain visible')
  }

  await go('apertura')
  await active().locator('.closing-metro-reveal').first().waitFor({ state: 'attached' })
  const cover = await animations()
  assert.ok(cover.some(animation => animation.name === 'cvedi-map-route'))
  assert.ok(cover.every(animation => animation.iterations === 1 && animation.duration + animation.delay <= 900), 'cover choreography is finite and settles within 900 ms')
  await settle()
  const firstStart = (await animations()).find(animation => animation.name === 'cvedi-map-route').start
  await page.keyboard.press('ArrowRight')
  await page.waitForFunction(() => document.querySelector('.slidev-layout.is-active h1')?.textContent.includes('rinnova'))
  assert.equal(await page.locator('.cover-slide').evaluate(root => root.getAnimations({ subtree: true }).length), 0, 'leaving cancels even finished entrance effects')
  await page.keyboard.press('ArrowLeft')
  await page.waitForFunction(() => document.querySelector('.cover-slide.motion-enabled'))
  await page.waitForFunction(start => document.querySelector('.cover-slide.motion-enabled')?.getAnimations({ subtree: true })
    .some(animation => animation.animationName === 'cvedi-map-route' && animation.startTime > start), firstStart)
  const repeat = await animations()
  assert.ok(repeat.find(animation => animation.name === 'cvedi-map-route').start > firstStart, 'revisiting restarts the entrance')
  checks.push('finite cover entrance, cancellation on leave and replay on revisit')

  await go('presentazione-corso')
  const chapter = await animations()
  assert.ok(chapter.some(animation => animation.name === 'cvedi-metro-journey'))
  const heading = await active().locator('h1').evaluate(h1 => ({ transform: getComputedStyle(h1).transform, filter: getComputedStyle(h1).filter }))
  assert.deepEqual(heading, { transform: 'none', filter: 'none' }, 'chapter title remains stable and readable')
  checks.push('chapter journey preserves title position and sharpness')

  for (const [className, name] of [['process-slide', 'cvedi-metro-journey'], ['calendar-slide', 'cvedi-calendar-row'], ['grade-slide', 'cvedi-grade-reveal']]) {
    const fixture = deck.slides.find(slide => String(slide.frontmatter.class).split(/\s+/).includes(className))
    assert.ok(fixture, className)
    await go(fixture.frontmatter.routeAlias || fixture.index + 1)
    const entries = await animations()
    assert.ok(entries.some(animation => animation.name === name), `${className} animates its meaningful sequence`)
    assert.ok(entries.every(animation => animation.duration + animation.delay <= 800 && animation.iterations === 1))
    await settle()
  }
  checks.push('timelines, calendars and grade bars use bounded reading-order sequences')

  await go('ux-indizi-comandi-esiti')
  assert.equal((await animations()).filter(animation => animation.name === 'cvedi-reading-focus').length, 3)
  await page.setViewportSize({ width: 636, height: 778 })
  await go('ux-gerarchia')
  const pair = (await animations()).filter(animation => animation.name === 'cvedi-reading-focus')
  assert.equal(pair.length, 2)
  assert.deepEqual(pair.map(animation => animation.delay), [0, 100])
  await settle()
  const zoom = active().locator('.lesson-image-hint').first()
  await zoom.focus()
  await page.keyboard.press('Enter')
  const dialog = page.locator('.lesson-image-dialog[open]')
  await dialog.waitFor()
  assert.equal(await dialog.locator('.modal-box').evaluate(box => getComputedStyle(box).animationName), 'cvedi-image-expand')
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden' })
  assert.ok(await zoom.evaluate(button => document.activeElement === button), 'native dialog restores keyboard focus')
  checks.push('comparison and example images retain reading order; narrow keyboard zoom opens and restores focus')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await go('apertura')
  await assertStaticMap()
  await go('ux-gerarchia')
  assert.equal((await animations()).length, 0)
  await active().locator('.lesson-image-hint').first().click()
  assert.equal(await dialog.locator('.modal-box').evaluate(box => ({ name: getComputedStyle(box).animationName, duration: getComputedStyle(box).animationDuration })).then(a => `${a.name}/${a.duration}`), 'cvedi-reading-focus/0.1s')
  await page.keyboard.press('Escape')
  checks.push('reduced motion keeps static slides and a gentle non-spatial dialog acknowledgment')

  await page.emulateMedia({ reducedMotion: 'no-preference', media: 'print' })
  await go('apertura')
  await assertStaticMap()
  checks.push('native print always shows the finished map')

  await page.emulateMedia({ media: 'screen' })
  await page.goto(`${base}/?print=true&range=1#/1`)
  await page.locator('.cover-slide').waitFor()
  await assertStaticMap()
  checks.push('Slidev screen-media export is static without an arbitrary capture delay')

  // Model background-tab lifecycle in this isolated test page, not the user's UI.
  await go('apertura')
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await assertStaticMap()
  await page.evaluate(() => {
    delete document.hidden
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await page.waitForFunction(() => document.querySelector('.cover-slide.motion-enabled'))
  assert.ok((await animations()).some(animation => animation.name === 'cvedi-map-route'))
  checks.push('hidden tabs cancel playback and visibility restores it')
  assert.deepEqual(errors, [])
  console.log(JSON.stringify({ status: 'passed', checks, pageErrors: errors, warnings }, null, 2))
} finally {
  await browser.close()
}
