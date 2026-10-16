import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'

const base = process.env.SLIDEV_URL || 'http://localhost:3045'
const out = process.env.A11Y_SPEECH_REPORT || 'reports/lesson-05/media-speech'
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
const errors = [], checks = []
page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') errors.push(error.message) })
await page.addInitScript(() => {
  let current, sequence = 0
  const events = []
  window.SpeechSynthesisUtterance = class {
    constructor(text) { this.text = text }
  }
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    speak(utterance) {
      const item = { utterance, sequence: ++sequence, end: utterance.onend, error: utterance.onerror }
      current = item
      events.push({ type: 'speak', sequence: item.sequence, text: utterance.text, time: Date.now() })
      // A cancelled engine may still deliver a queued completion event.
      // Keep it scheduled so the component must guard utterance identity.
      setTimeout(() => {
        events.push({ type: 'end', sequence: item.sequence, time: Date.now() })
        if (current === item) current = undefined
        item.end?.({})
      }, 4500)
    },
    cancel() {
      if (!current) return
      const item = current; current = undefined
      events.push({ type: 'cancel', sequence: item.sequence, time: Date.now() })
      item.error?.({ error: 'canceled' })
    },
  } })
  window.__mediaSpeech = {
    events,
    failCurrent() {
      if (!current) return
      const item = current; current = undefined
      events.push({ type: 'error', sequence: item.sequence, time: Date.now() })
      item.error?.({ error: 'synthesis-failed' })
    },
    clearEvents() { events.splice(0) },
  }
})

try {
  await page.clock.install({ time: new Date('2026-10-13T12:00:00Z') })
  const root = await openSlide(page, base, 'accessibilita-demo-media')
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 100))
  const demo = root.locator('.a11y-demo')
  const good = demo.locator('[data-variant="good"]'), bad = demo.locator('[data-variant="bad"]')
  const speechEvents = () => page.evaluate(() => [...window.__mediaSpeech.events])
  const spokenTexts = async () => (await speechEvents()).filter(event => event.type === 'speak').map(event => event.text)
  const caption = () => good.locator('.a11y-captions').textContent()
  const reset = async () => {
    await demo.getByRole('button', { name: 'Reimposta gli scenari', exact: true }).click()
    await page.evaluate(() => window.__mediaSpeech.clearEvents())
  }
  const play = scenario => scenario.getByRole('button', { name: 'Riproduci', exact: true }).click()

  assert.deepEqual(await speechEvents(), [], 'opening the slide does not start speech')
  assert.equal(await good.locator('.process-video-caption span').textContent(), 'Clip · 2 passaggi')
  await play(good)
  await page.clock.runFor(3100)
  assert.equal(await good.getByRole('button', { name: 'Pausa', exact: true }).count(), 1)
  assert.doesNotMatch(await caption(), /Destinazione selezionata/)
  assert.equal((await speechEvents()).filter(event => event.type === 'cancel').length, 0, 'nominal cue expiry cannot truncate the voice')
  assert.deepEqual(await spokenTexts(), ['Scegli l’uscita B. Il docente indica il corridoio a destra.'])
  await page.clock.runFor(1600)
  assert.match(await caption(), /Destinazione selezionata/)
  assert.equal((await spokenTexts()).length, 2)
  await page.clock.runFor(3100)
  assert.equal(await good.getByRole('button', { name: 'Pausa', exact: true }).count(), 1, 'the last cue also waits for the end of its speech')
  await page.clock.runFor(1600)
  assert.equal(await good.getByRole('button', { name: 'Riproduci', exact: true }).count(), 1)
  checks.push('complete first description and final speech before advancing or ending')

  await reset(); await play(good); await page.clock.runFor(3100)
  await good.getByLabel('Audio', { exact: true }).uncheck()
  assert.match(await caption(), /Destinazione selezionata/, 'turning off audio releases a cue waiting for its voice')
  await page.clock.runFor(3100)
  assert.equal(await good.getByRole('button', { name: 'Riproduci', exact: true }).count(), 1)
  assert.equal((await spokenTexts()).length, 1, 'the silent second cue cannot start speech')
  checks.push('audio off releases the speech wait and silent playback finishes')

  await reset(); await play(good); await page.clock.runFor(1000)
  await good.getByLabel('Descrizione visiva', { exact: true }).uncheck()
  assert.equal((await spokenTexts()).at(-1), 'Scegli l’uscita B.')
  await page.clock.runFor(100)
  await good.getByLabel('Descrizione visiva', { exact: true }).check()
  assert.equal((await spokenTexts()).at(-1), 'Scegli l’uscita B. Il docente indica il corridoio a destra.')
  await page.clock.runFor(3600)
  assert.doesNotMatch(await caption(), /Destinazione selezionata/, 'completion of a replaced utterance cannot advance the current track')
  await page.clock.runFor(1000)
  assert.match(await caption(), /Destinazione selezionata/)
  checks.push('description changes replace the active track and ignore stale completion')

  await reset(); await play(good); await page.clock.runFor(3100)
  await good.getByRole('button', { name: 'Pausa', exact: true }).click()
  const pausedCaption = await caption()
  await page.clock.runFor(6000)
  assert.equal(await caption(), pausedCaption)
  assert.equal(await good.getByRole('button', { name: 'Riprendi', exact: true }).count(), 1)
  await good.getByRole('button', { name: 'Riprendi', exact: true }).click()
  await page.clock.runFor(3100)
  assert.equal(await caption(), pausedCaption, 'resuming the interrupted phrase must finish it before changing cue')
  await page.clock.runFor(1500)
  assert.match(await caption(), /Destinazione selezionata/)
  checks.push('pause and resume preserve the current cue including a speech wait')

  await reset(); await play(good); await page.clock.runFor(3100)
  await page.evaluate(() => window.__mediaSpeech.failCurrent())
  assert.match(await caption(), /Destinazione selezionata/, 'a synthesis error releases the current cue without hanging')
  await good.getByRole('button', { name: 'Ricomincia', exact: true }).click()
  await page.clock.runFor(6000)
  assert.equal(await good.locator('.a11y-captions').count(), 0)
  assert.equal(await good.getByRole('button', { name: 'Riproduci', exact: true }).count(), 1)
  checks.push('speech errors do not hang the player; restart ignores late callbacks')

  await reset(); await play(good); await page.clock.runFor(1000)
  await demo.getByRole('button', { name: 'Reimposta gli scenari', exact: true }).click()
  const resetSpeakCount = (await spokenTexts()).length
  await page.clock.runFor(6000)
  assert.equal(await good.locator('.a11y-captions').count(), 0)
  assert.equal((await spokenTexts()).length, resetSpeakCount)
  checks.push('reset cancels the previous instance without restarting media')

  await reset(); await play(good); await page.clock.runFor(3100)
  await play(bad)
  assert.equal(await good.locator('.a11y-captions').count(), 0)
  assert.equal(await good.getByRole('button', { name: 'Riproduci', exact: true }).count(), 1)
  await page.clock.runFor(1600)
  assert.equal((await spokenTexts()).length, 2, 'the stopped first player cannot start another cue on a late completion')
  await page.clock.runFor(3000)
  assert.equal((await spokenTexts()).length, 3)
  assert.equal(await good.locator('.a11y-captions').count(), 0)
  checks.push('playing the other scenario stops the first independently')

  await reset(); await play(good); await page.clock.runFor(3100)
  await page.emulateMedia({ media: 'print' })
  await good.locator('.a11y-captions').waitFor({ state: 'hidden' })
  const printSpeakCount = (await spokenTexts()).length
  await page.clock.runFor(6000)
  assert.equal(await good.locator('.a11y-captions').count(), 0)
  assert.equal((await spokenTexts()).length, printSpeakCount)
  await page.emulateMedia({ media: 'screen' })
  assert.equal(await good.getByRole('button', { name: 'Riproduci', exact: true }).count(), 1)
  checks.push('print stops playback and queued voice callbacks cannot resume it')

  // Slidev's screenshot/PDF exporter can keep screen media. Its print query
  // must protect the lab just like the browser's native print media query.
  await page.clock.resume()
  await page.goto(`${base.replace(/\/$/, '')}/?print=true#/accessibilita-demo-media`, { waitUntil: 'domcontentloaded' })
  const exportedDemo = page.locator('.slidev-layout.is-active .a11y-demo')
  await exportedDemo.waitFor({ state: 'visible' })
  const exportedGood = exportedDemo.locator('[data-variant="good"]')
  await play(exportedGood)
  assert.deepEqual(await speechEvents(), [], 'screen-media export cannot start speech')
  assert.equal(await exportedGood.locator('.a11y-captions').count(), 0)
  assert.equal(await exportedGood.getByRole('button', { name: 'Riproduci', exact: true }).count(), 1)
  checks.push('Slidev screen-media export also disables interactive media playback')

  assert.deepEqual(errors, [])
  const report = { status: 'passed', checks, errors, simulatedUtteranceMs: 4500 }
  await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report))
} finally { await browser.close() }
