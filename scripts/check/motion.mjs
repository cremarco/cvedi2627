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
  async function assertTimelineArrival(fixture, expectedStations) {
    await active().locator('.cvedi-metro-timeline').waitFor({ state: 'attached' })
    await page.waitForFunction(() => {
      const timeline = document.querySelector('.slidev-layout.is-active .cvedi-metro-timeline')
      return timeline && [...timeline.querySelectorAll('.metro-station')]
        .every(station => parseFloat(getComputedStyle(station, '::after').animationDelay) > 0)
    })
    const entries = await animations()
    assert.equal(entries.filter(animation => animation.name === 'cvedi-metro-journey').length, 1, `${fixture.title}: one finite journey`)
    assert.equal(entries.filter(animation => animation.name === 'cvedi-metro-arrival').length, expectedStations, `${fixture.title}: one pulse per station`)
    assert.ok(entries.every(animation => animation.iterations === 1 && animation.duration + animation.delay <= 800), `${fixture.title}: the timeline settles within 800 ms`)
    const report = await active().evaluate(async root => {
      const timeline = root.querySelector('.cvedi-metro-timeline')
      const train = timeline.querySelector('.metro-train')
      const stations = [...timeline.querySelectorAll('.metro-station')]
      const journey = timeline.getAnimations({ subtree: true }).find(animation => animation.animationName === 'cvedi-metro-journey')
      const scale = root.getBoundingClientRect().width / 1280
      const timing = journey.effect.getTiming()
      const labels = [...timeline.querySelectorAll('.timeline-title, .timeline-detail')]
      const isSteady = element => {
        const style = getComputedStyle(element)
        return style.opacity === '1' && style.transform === 'none' && style.filter === 'none' && style.animationName === 'none'
      }
      const arrivals = []
      journey.pause()
      for (const station of stations) {
        const delay = parseFloat(getComputedStyle(station, '::after').animationDelay) * 1000
        journey.currentTime = delay
        await new Promise(resolve => requestAnimationFrame(resolve))
        const style = getComputedStyle(train)
        const headProgress = parseFloat(style.strokeDasharray) - parseFloat(style.strokeDashoffset)
        const head = train.getPointAtLength(headProgress * train.getTotalLength()).matrixTransform(train.getScreenCTM())
        const box = station.getBoundingClientRect()
        arrivals.push({
          delay,
          error: Math.hypot(head.x - (box.left + box.right) / 2, head.y - (box.top + box.bottom) / 2) / scale,
          diameter: box.width / scale,
          visible: Number(style.opacity) > .9,
          steady: stations.every(isSteady) && labels.every(isSteady),
        })
      }
      journey.play()
      return { arrivals, duration: timing.duration, trains: timeline.querySelectorAll('.metro-train').length, titles: timeline.querySelectorAll('.timeline-title').length }
    })
    assert.equal(report.trains, 1, `${fixture.title}: one moving segment`)
    assert.equal(report.titles, expectedStations, `${fixture.title}: every station keeps its title`)
    assert.equal(report.arrivals.length, expectedStations, `${fixture.title}: every station is checked`)
    assert.equal(report.duration, 800, `${fixture.title}: the shared journey duration is preserved`)
    for (const [index, arrival] of report.arrivals.entries()) {
      assert.ok(arrival.visible && arrival.error < 1, `${fixture.title}: segment head reaches station ${index + 1} at its pulse (${arrival.error}px)`)
      assert.ok(Math.abs(arrival.diameter - 56) < 1, `${fixture.title}: station ${index + 1} retains its 56px circle`)
      assert.ok(arrival.steady, `${fixture.title}: labels and station numbers remain fixed during the journey`)
    }
    assert.ok(report.arrivals.every((arrival, index) => index === 0 || arrival.delay > report.arrivals[index - 1].delay), `${fixture.title}: station arrivals follow reading order`)
  }
  async function assertStaticTimeline(fixture, expectedStations) {
    await active().locator('.cvedi-metro-timeline').waitFor({ state: 'attached' })
    await page.waitForFunction(() => !document.querySelector('.slidev-layout.is-active')?.classList.contains('motion-enabled'))
    assert.equal((await animations()).length, 0, `${fixture.title}: static playback has no entrance effects`)
    const report = await active().evaluate(root => {
      const timeline = root.querySelector('.cvedi-metro-timeline')
      const stations = [...timeline.querySelectorAll('.metro-station')]
      const labels = [...timeline.querySelectorAll('.timeline-title, .timeline-detail')]
      const isVisible = element => {
        const style = getComputedStyle(element)
        return style.opacity === '1' && style.display !== 'none' && style.visibility === 'visible' && style.transform === 'none'
      }
      return {
        stations: stations.length,
        titles: timeline.querySelectorAll('.timeline-title').length,
        visible: stations.every(isVisible) && labels.every(isVisible),
        pulsesHidden: stations.every(station => getComputedStyle(station, '::after').opacity === '0'),
        trains: [...timeline.querySelectorAll('.metro-train')].map(train => getComputedStyle(train).opacity),
        tracks: [...timeline.querySelectorAll('.metro-track')].map(track => getComputedStyle(track).opacity),
      }
    })
    assert.equal(report.stations, expectedStations, `${fixture.title}: all static stations remain present`)
    assert.equal(report.titles, expectedStations, `${fixture.title}: all static titles remain present`)
    assert.ok(report.visible && report.pulsesHidden, `${fixture.title}: complete static labels and circles without arrival pulses`)
    assert.deepEqual(report.trains, ['0'], `${fixture.title}: static playback hides the moving segment`)
    assert.ok(report.tracks.length > 0 && report.tracks.every(opacity => opacity === '1'), `${fixture.title}: static playback keeps the full track`)
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

  const timelineFixtures = deck.slides.filter(slide => slide.content.includes('<ProcessTimeline'))
  const timelineCounts = [4, 4, 3, 5, 5, 4, 5]
  assert.equal(timelineFixtures.length, timelineCounts.length, 'all seven authored timelines use the shared component')
  for (const [index, fixture] of timelineFixtures.entries()) {
    await go(fixture.frontmatter.routeAlias || fixture.index + 1)
    await assertTimelineArrival(fixture, timelineCounts[index])
    await settle()
  }
  checks.push('all seven timelines preserve their 3–5 stations, keep labels fixed and synchronize every finite pulse to the segment head')

  for (const mode of [
    { name: 'reduced motion', reducedMotion: 'reduce', media: 'screen' },
    { name: 'native print', reducedMotion: 'no-preference', media: 'print' },
    { name: 'screen-media export', reducedMotion: 'no-preference', media: 'screen', export: true },
  ]) {
    await page.emulateMedia({ reducedMotion: mode.reducedMotion, media: mode.media })
    for (const [index, fixture] of timelineFixtures.entries()) {
      if (mode.export) {
        const slideNumber = fixture.index + 1
        await page.goto(`${base}/?print=true&range=${slideNumber}#/${slideNumber}`)
        await active().waitFor()
      } else await go(fixture.frontmatter.routeAlias || fixture.index + 1)
      await assertStaticTimeline(fixture, timelineCounts[index])
    }
    checks.push(`${mode.name} keeps all seven timelines complete and still`)
  }

  await page.emulateMedia({ reducedMotion: 'no-preference', media: 'screen' })
  const historyIndex = timelineFixtures.findIndex(slide => slide.frontmatter.lesson === 'storia-design')
  assert.ok(historyIndex >= 0, 'the history lesson uses the shared timeline')
  const historyTimeline = timelineFixtures[historyIndex]
  await go(historyTimeline.frontmatter.routeAlias || historyTimeline.index + 1)
  await settle()
  const historyStart = (await animations()).find(animation => animation.name === 'cvedi-metro-journey').start
  const historyRoot = await active().elementHandle()
  await page.keyboard.press('ArrowRight')
  await page.waitForFunction(() => !document.querySelector('.slidev-layout.is-active .cvedi-metro-timeline'))
  assert.equal(await historyRoot.evaluate(root => root.getAnimations({ subtree: true }).length), 0, 'leaving the history timeline cancels its completed entrance')
  await page.keyboard.press('ArrowLeft')
  await page.waitForFunction(start => document.querySelector('.slidev-layout.is-active .cvedi-metro-timeline')?.getAnimations({ subtree: true })
    .some(animation => animation.animationName === 'cvedi-metro-journey' && animation.startTime > start), historyStart)
  assert.ok((await animations()).find(animation => animation.name === 'cvedi-metro-journey').start > historyStart, 'revisiting the history timeline restarts its journey')
  await historyRoot.dispose()
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await assertStaticTimeline(historyTimeline, timelineCounts[historyIndex])
  await page.evaluate(() => {
    delete document.hidden
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await page.waitForFunction(() => document.querySelector('.slidev-layout.is-active .cvedi-metro-timeline')?.getAnimations({ subtree: true })
    .some(animation => animation.animationName === 'cvedi-metro-journey'))
  await settle()
  checks.push('history timeline cancels on leave and hidden tabs, then replays on revisit and restored visibility')

  for (const [className, name] of [['calendar-slide', 'cvedi-calendar-row'], ['grade-slide', 'cvedi-grade-reveal']]) {
    const fixture = deck.slides.find(slide => String(slide.frontmatter.class).split(/\s+/).includes(className))
    assert.ok(fixture, className)
    await go(fixture.frontmatter.routeAlias || fixture.index + 1)
    const entries = await animations()
    assert.ok(entries.some(animation => animation.name === name), `${className} animates its meaningful sequence`)
    assert.ok(entries.every(animation => animation.duration + animation.delay <= 800 && animation.iterations === 1))
    await settle()
  }
  checks.push('calendars and grade bars use bounded reading-order sequences')

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
