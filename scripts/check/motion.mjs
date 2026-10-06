import assert from 'node:assert/strict'
import { chromium } from 'playwright-chromium'
import { loadSlideDeck } from './deck.mjs'

const deck = await loadSlideDeck()
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
  async function assertStopArrival() {
    const report = await active().evaluate(async root => {
      const journey = root.getAnimations({ subtree: true }).find(animation => animation.animationName === 'cvedi-cover-journey')
      if (!journey) return { missingJourney: true }
      const timing = journey.effect.getTiming()
      journey.pause()
      journey.currentTime = timing.delay + timing.duration * .85
      await new Promise(resolve => requestAnimationFrame(resolve))
      const train = root.querySelector('.metro-cover-train')
      const style = getComputedStyle(train)
      const head = train.getPointAtLength((parseFloat(style.strokeDasharray) - parseFloat(style.strokeDashoffset)) * train.getTotalLength()).matrixTransform(train.getScreenCTM())
      const stop = root.querySelector('.metro-stop-disc')
      const box = stop.getBoundingClientRect(), scale = root.getBoundingClientRect().width / 1280
      const error = Math.hypot(head.x - (box.left + box.right) / 2, head.y - (box.top + box.bottom) / 2) / scale
      const diameter = box.width / scale + parseFloat(getComputedStyle(stop).strokeWidth) * stop.getScreenCTM().a / scale
      const visible = Number(style.opacity) > .9
      journey.play()
      return { missingJourney: false, error, diameter, visible, stops: root.querySelectorAll('.metro-cover-stop').length }
    })
    assert.equal(report.missingJourney, false, 'a segment travels to the main stop')
    assert.equal(report.stops, 1, 'one main stop per cover')
    assert.ok(report.visible && report.error < 1, `the visible segment reaches the stop (${report.error}px)`)
    assert.ok(Math.abs(report.diameter - 56) < 1, `the stop matches the timeline's 56px circle (${report.diameter}px)`)
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
  assert.equal(await active().locator('.metro-cover-stop, .metro-cover-train').count(), 0, 'the original opening map has no added main stop or journey')
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
  assert.equal(chapter.filter(animation => animation.name === 'cvedi-cover-route').length, 2)
  assert.ok(chapter.some(animation => animation.name === 'cvedi-cover-station'))
  assert.ok(chapter.every(animation => animation.iterations === 1 && animation.duration + animation.delay <= 900))
  const heading = await active().locator('h1').evaluate(h1 => ({ transform: getComputedStyle(h1).transform, filter: getComputedStyle(h1).filter }))
  assert.deepEqual(heading, { transform: 'none', filter: 'none' }, 'chapter title remains stable and readable')
  checks.push('two finite cover routes and station arrivals preserve title position and sharpness')

  const routeCovers = deck.slides.filter(slide => /\b(?:chapter-slide|closing-slide)\b/.test(slide.frontmatter.class ?? ''))
  for (const fixture of routeCovers) {
    await go(fixture.frontmatter.routeAlias || fixture.index + 1)
    const entries = await animations()
    assert.equal(entries.filter(animation => animation.name === 'cvedi-cover-route').length, 2)
    assert.equal(entries.filter(animation => animation.name === 'cvedi-cover-journey').length, 1)
    assert.equal(entries.filter(animation => animation.name === 'cvedi-metro-arrival').length, 1)
    assert.ok(entries.every(animation => animation.iterations === 1 && animation.duration + animation.delay <= 900), `${fixture.title}: bounded cover entrance`)
    await assertStopArrival()
    await settle()
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.waitForFunction(() => !document.querySelector('.slidev-layout.is-active')?.classList.contains('motion-enabled'))
    const staticCover = await active().evaluate(root => ({
      enabled: root.classList.contains('motion-enabled'),
      offsets: [...root.querySelectorAll('.metro-route-reveal')].map(path => getComputedStyle(path).strokeDashoffset),
      stations: [...root.querySelectorAll('.metro-cover-station')].map(dot => getComputedStyle(dot).opacity),
      stopVisible: getComputedStyle(root.querySelector('.metro-stop-disc')).opacity,
      trainHidden: getComputedStyle(root.querySelector('.metro-cover-train')).opacity,
    }))
    assert.equal(staticCover.enabled, false)
    assert.ok(staticCover.offsets.every(offset => offset === '0px') && staticCover.stations.every(opacity => opacity === '1'), `${fixture.title}: complete reduced-motion composition`)
    assert.equal(staticCover.stopVisible, '1')
    assert.equal(staticCover.trainHidden, '0')
    await page.emulateMedia({ reducedMotion: 'no-preference' })
  }
  checks.push('chapter and closing cover segments reach their 56px stops, with one arrival pulse and a complete reduced-motion alternative')

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
