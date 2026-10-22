import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from '../../../../scripts/check/browser.mjs'

const base = (process.env.SLIDEV_URL || 'http://localhost:3047').replace(/\/$/, '')
const lesson = `${base}/lezioni/griglie-layout`
const output = process.env.SLIDE_AUDIO_REPORT || 'reports/slide-audio'
const selection = JSON.parse(await readFile('progetti/slide/assets/booklet/lezione-griglie/audio-approved.json', 'utf8'))
const lessonManifest = JSON.parse(await readFile('progetti/slide/assets/booklet/lezione-griglie/manifest.json', 'utf8'))
const clips = Object.entries(selection.clips)
assert.deepEqual(clips.map(([alias]) => alias), lessonManifest.slides.slice(0, 2).map(slide => slide.alias))
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const reports = [], errors = [], requests = []
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const state = audio => audio.evaluate(node => ({ paused: node.paused, time: node.currentTime, duration: node.duration, ended: node.ended }))
async function playing(page) {
  await page.waitForFunction(() => {
    const audio = document.querySelector('.lesson-audio audio')
    return audio && !audio.paused && audio.currentTime > .15
  })
}
async function paused(page) {
  await page.waitForFunction(() => document.querySelector('.lesson-audio audio')?.paused)
}
function observe(page, { expectedMediaError = false } = {}) {
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') errors.push(error.message) })
  page.on('console', message => {
    if (message.type() === 'error' && !expectedMediaError && !message.text().includes('Wake Lock permission request denied'))
      errors.push(message.text())
  })
  page.on('request', request => { if (/\/audio\/.*\.mp3(?:\?|$)/.test(request.url())) requests.push({ url: request.url(), method: request.method() }) })
}
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  page.setDefaultTimeout(15_000)
  observe(page)
  for (const [index, [alias, clip]] of clips.entries()) {
    const root = await openSlide(page, lesson, alias, { settle: true })
    const player = root.locator('.lesson-audio'), audio = player.locator('audio')
    assert.equal(await page.locator('.lesson-audio').count(), 1, `${alias}: only the active slide owns a player`)
    assert.equal(await audio.getAttribute('preload'), 'none')
    assert.equal(await audio.getAttribute('autoplay'), null)
    assert.equal(await audio.evaluate(node => node.paused && node.currentTime === 0 && node.readyState === 0), true)
    await audio.evaluate(node => {
      window.__audioEvents = []
      for (const event of ['play', 'playing', 'pause', 'seeking', 'seeked', 'error']) node.addEventListener(event, () => {
        window.__audioEvents.push({ event, time: node.currentTime, paused: node.paused, at: performance.now() })
      })
    })
    const src = await audio.getAttribute('src')
    assert.ok(src.endsWith(clip.web), 'the pinned approved recording is used')
    const geometry = await player.evaluate(node => {
      const root = node.closest('.slidev-layout'), canvas = root.getBoundingClientRect(), bounds = node.getBoundingClientRect()
      const intersects = other => {
        const b = other.getBoundingClientRect()
        return b.width > 0 && b.height > 0 && bounds.left < b.right && bounds.right > b.left && bounds.top < b.bottom && bounds.bottom > b.top
      }
      return {
        withinCanvas: bounds.left >= canvas.left && bounds.right <= canvas.right && bounds.top >= canvas.top && bounds.bottom <= canvas.bottom,
        rightInset: (canvas.right - bounds.right) * 1280 / canvas.width,
        centerOffset: (bounds.top + bounds.height / 2 - canvas.top - canvas.height / 2) * 1280 / canvas.width,
        overlap: [...root.querySelectorAll('h1, .lesson-summary-body, .slide-label, .slide-index, .chapter-lesson-number')].filter(intersects).map(node => node.className || node.tagName),
        buttons: [...node.querySelectorAll('button')].map(button => ({ label: button.getAttribute('aria-label'), text: button.textContent.trim(), height: button.offsetHeight, width: button.offsetWidth, x: button.offsetLeft, y: button.offsetTop })),
      }
    })
    assert.ok(geometry.withinCanvas, `${alias}: controls fit canvas`)
    assert.ok(Math.abs(geometry.rightInset - 24) < 1 && Math.abs(geometry.centerOffset) < 1, 'controls sit at the right edge and vertical center')
    assert.deepEqual(geometry.overlap, [], `${alias}: controls do not cover content or footer labels`)
    assert.ok(geometry.buttons.every(button => button.height === 32 && button.width === 32 && !button.text), 'controls use compact icon-only 32px buttons')
    assert.ok(geometry.buttons.every(button => button.x === geometry.buttons[0].x), 'controls share a vertical axis')
    assert.ok(geometry.buttons.every((button, index) => index === 0 || button.y > geometry.buttons[index - 1].y), 'controls form a vertical column')
    await page.screenshot({ path: `${output}/desktop-${index + 1}.png` })
    const idleRequests = requests.length
    await page.waitForTimeout(250)
    assert.equal(requests.length, idleRequests, 'no media fetch occurs before play')
    const play = player.getByRole('button', { name: 'Riproduci audio', exact: true })
    const pause = player.getByRole('button', { name: 'Metti in pausa l’audio', exact: true })
    const restart = player.getByRole('button', { name: 'Riproduci dall’inizio', exact: true })
    const initialUrl = page.url()
    await play.click(); await playing(page)
    const started = await state(audio)
    assert.ok(started.duration > 0)
    assert.ok(Math.abs(started.duration - clip.durationSeconds) < .15)
    assert.ok(await play.isDisabled())
    await pause.click(); await paused(page)
    const held = await state(audio)
    await page.waitForTimeout(300)
    assert.ok(Math.abs((await state(audio)).time - held.time) < .04, 'pause keeps position')
    await play.focus(); await page.keyboard.press('Space'); await playing(page)
    assert.equal(page.url(), initialUrl, 'Space activates the button without advancing the slide')
    await pause.focus(); await page.keyboard.press('Enter'); await paused(page)
    assert.equal(page.url(), initialUrl, 'Enter pauses without advancing the slide')
    await audio.evaluate(node => { node.currentTime = 4 })
    await page.waitForFunction(() => {
      const audio = document.querySelector('.lesson-audio audio')
      return audio && !audio.seeking && Math.abs(audio.currentTime - 4) < .1
    })
    await restart.focus()
    assert.ok(await restart.evaluate(node => document.activeElement === node), 'restart receives keyboard focus')
    await page.keyboard.press('Enter'); await playing(page)
    const restarted = await state(audio)
    assert.ok(restarted.time < 2, 'restart begins at the start of the recording')
    assert.equal(page.url(), initialUrl, 'restart does not change the slide')
    await player.evaluate(node => { window.__slideAudioPrevious = node.querySelector('audio') })
    await root.locator('h1').click()
    await page.keyboard.press('ArrowRight')
    await page.waitForFunction(() => window.__slideAudioPrevious?.paused)
    assert.equal(await page.evaluate(() => window.__slideAudioPrevious.isConnected), false, 'previous audio is unmounted after navigation')
    assert.equal(await page.locator('.lesson-audio').count(), index === 0 ? 1 : 0)
    reports.push({ alias, geometry, started, held, restarted, keyboard: true, navigationPausedAndUnmounted: true, autoplay: false, preload: 'none' })
  }
  // A direct visit must not attach a player to slide three or another lesson.
  for (const target of [lessonManifest.slides[2].alias, lessonManifest.slides.at(-1).alias]) {
    await openSlide(page, lesson, target)
    assert.equal(await page.locator('.lesson-audio, audio').count(), 0, `${target}: no narration attached`)
  }
  await openSlide(page, base, 1)
  assert.equal(await page.locator('.lesson-audio, audio').count(), 0, 'menu has no audio')

  // HTTP bodies and byte ranges must serve precisely the selected original files.
  for (const [alias, clip] of clips) {
    const local = await readFile(clip.source)
    const response = await page.request.get(`${lesson}${clip.web}`)
    assert.equal(response.status(), 200)
    assert.equal(hash(await response.body()), clip.sha256)
    assert.equal(hash(local), clip.sha256)
    const range = await page.request.get(`${lesson}${clip.web}`, { headers: { Range: 'bytes=0-127' } })
    assert.equal(range.status(), 206)
    assert.equal(range.headers()['content-range'], `bytes 0-127/${local.length}`)
    assert.deepEqual(await range.body(), local.subarray(0, 128))
    reports.find(report => report.alias === alias).http = { sha256: clip.sha256, bytes: local.length, range: true }
  }
  for (const [index, [alias]] of clips.entries()) {
    await page.setViewportSize({ width: 390, height: 844 })
    const root = await openSlide(page, lesson, alias, { settle: true })
    const within = await root.locator('.lesson-audio').evaluate(node => {
      const box = node.getBoundingClientRect(), root = node.closest('.slidev-layout').getBoundingClientRect()
      return box.left >= root.left - 1 && box.right <= root.right + 1 && box.top >= root.top - 1 && box.bottom <= root.bottom + 1
    })
    assert.ok(within, 'narrow viewport: controls remain within scaled canvas')
    await page.screenshot({ path: `${output}/narrow-${index + 1}.png` })
  }
  await page.setViewportSize({ width: 1280, height: 720 })
  const summary = await openSlide(page, lesson, clips[1][0], { settle: true })
  const contentGeometry = root => [...root.querySelectorAll('h1, .lesson-summary-body, .slide-label, .slide-index')].map(node => {
    const { x, y, width, height } = node.getBoundingClientRect()
    return { selector: node.className || node.tagName, x, y, width, height }
  })
  const withPlayer = await summary.evaluate(contentGeometry)
  await summary.locator('.lesson-audio').evaluate(node => node.remove())
  assert.deepEqual(await summary.evaluate(contentGeometry), withPlayer, 'absolute player does not move existing title, summary or footer')
  reports.push({ summaryGeometry: withPlayer, unchangedWithPlayer: true })

  await page.reload({ waitUntil: 'domcontentloaded' })
  await openSlide(page, lesson, clips[1][0])
  await page.getByRole('button', { name: 'Riproduci audio', exact: true }).click(); await playing(page)
  await page.locator('audio').evaluate(node => { window.__slideAudioPrevious = node })
  await page.emulateMedia({ media: 'print' })
  await page.waitForFunction(() => window.__slideAudioPrevious.paused && !window.__slideAudioPrevious.isConnected)
  assert.equal(await page.locator('.lesson-audio, audio').count(), 0, 'print pauses and removes audio controls')
  await page.screenshot({ path: `${output}/print-summary.png` })
  await page.emulateMedia({ media: 'screen' })
  await page.locator('.lesson-audio').waitFor()
  assert.ok(await page.locator('audio').evaluate(node => node.paused && node.currentTime === 0), 'return from print never resumes automatically')
  reports.push({ printPausedAndUnmounted: true, printReturnNoAutoplay: true })

  for (const [alias] of clips) {
    await openSlide(page, lesson, `presenter/${alias}`)
    assert.equal(await page.locator('.lesson-audio').count(), 1, 'presenter and previews mount exactly one audio player')
    assert.ok(await page.locator('.lesson-audio audio').evaluate(node => node.paused && node.currentTime === 0))
  }
  reports.push({ presenterSinglePlayer: true })

  // One failed media request exposes a readable recovery action; retry is a real playback request.
  const failedPage = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
  observe(failedPage, { expectedMediaError: true })
  let blocked = 0
  await failedPage.route('**/audio/**/*.mp3', async route => {
    if (blocked++ === 0) await route.abort('failed')
    else await route.continue()
  })
  await openSlide(failedPage, lesson, clips[1][0])
  await failedPage.getByRole('button', { name: 'Riproduci audio', exact: true }).click()
  await failedPage.getByRole('status').filter({ hasText: 'Audio non disponibile' }).waitFor()
  assert.ok(await failedPage.getByRole('button', { name: 'Riproduci audio', exact: true }).isEnabled())
  const errorGeometry = await failedPage.locator('.lesson-audio-error').evaluate(node => {
    const box = node.getBoundingClientRect(), root = node.closest('.slidev-layout'), canvas = root.getBoundingClientRect()
    return { withinCanvas: box.left >= canvas.left && box.right <= canvas.right && box.top >= canvas.top && box.bottom <= canvas.bottom,
      overlap: [...root.querySelectorAll('h1, .lesson-summary-body, .slide-label, .slide-index')].filter(other => {
        const b = other.getBoundingClientRect()
        return box.left < b.right && box.right > b.left && box.top < b.bottom && box.bottom > b.top
      }).map(node => node.className || node.tagName) }
  })
  assert.ok(errorGeometry.withinCanvas, 'error message fits canvas')
  assert.deepEqual(errorGeometry.overlap, [], 'error message leaves the lesson text visible')
  await failedPage.screenshot({ path: `${output}/error-summary.png` })
  await failedPage.getByRole('button', { name: 'Riproduci audio', exact: true }).click(); await playing(failedPage)
  assert.equal(await failedPage.locator('.lesson-audio-error').count(), 0)
  await failedPage.getByRole('button', { name: 'Metti in pausa l’audio', exact: true }).click()
  assert.ok(blocked >= 2, 'retry requested the recording again')
  reports.push({ errorAndRetry: true, errorGeometry })
  assert.deepEqual(errors, [], 'no unexpected browser or console errors')
  await writeFile(`${output}/verification.json`, JSON.stringify({ status: 'passed', base, reports, requests, errors }, null, 2) + '\n')
  console.log('Slide audio: approved bytes/ranges, playback, keyboard, navigation, print, presenter, narrow viewport and error/retry passed.')
} catch (error) {
  const failurePages = []
  for (const page of browser.contexts().flatMap(context => context.pages())) {
    failurePages.push(await page.evaluate(() => ({ url: location.href, active: { tag: document.activeElement?.tagName, label: document.activeElement?.getAttribute('aria-label') }, events: window.__audioEvents,
      audio: [...document.querySelectorAll('audio')].map(node => ({ paused: node.paused, time: node.currentTime, duration: node.duration, readyState: node.readyState, networkState: node.networkState, error: node.error?.message })),
      controls: [...document.querySelectorAll('.lesson-audio button')].map(node => ({ label: node.getAttribute('aria-label'), disabled: node.disabled })),
    })).catch(() => ({})))
  }
  await writeFile(`${output}/verification.json`, JSON.stringify({ status: 'failed', base, error: error.message, failurePages, reports, requests, errors }, null, 2) + '\n')
  throw error
} finally { await browser.close() }
