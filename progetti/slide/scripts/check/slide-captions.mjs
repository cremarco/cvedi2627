import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { captionLessons, readLessonCaptions } from '../build/lesson-captions.mjs'
import { openSlide } from '../../../../scripts/check/browser.mjs'
import { buildCaptionWordTrack, captionSpokenThrough, captionWordAt } from '../../utils/caption-words.mjs'

const base = (process.env.SLIDEV_URL || 'http://localhost:3057').replace(/\/$/, '')
const specifications = captionLessons.filter(item => !process.env.SLIDE_CAPTIONS_LESSON || item.lesson === process.env.SLIDE_CAPTIONS_LESSON)
assert.ok(specifications.length, 'select a supported narration lesson')
async function checkLesson(specification) {
  const lesson = `${base}/lezioni/${specification.lesson}`
  const output = `${process.env.SLIDE_CAPTIONS_REPORT || 'reports/slide-captions'}/${specification.lesson}`
  const { manifest } = await readLessonCaptions(specification.lesson)
  const lessonManifest = JSON.parse(await readFile(specification.source + '/manifest.json', 'utf8'))
  await mkdir(output, { recursive: true })
  const browser = await chromium.launch()
  const reports = [], errors = []
  const normalize = text => text.replace(/\s+/gu, ' ').trim()

  async function seek(page, time, text) {
    await page.locator('.lesson-audio audio').evaluate((audio, time) => { audio.currentTime = time }, time)
    await page.waitForFunction(text => {
      const audio = document.querySelector('.lesson-audio audio')
      const region = document.querySelector('.lesson-captions')
      return !audio.seeking && !region.hidden && region.textContent.replace(/\s+/gu, ' ').trim() === text
    }, normalize(text))
  }

  async function wordState(page, cue, time) {
    // Media seeking may round to microseconds; compare against the clock actually rendered.
    const actualTime = await page.locator('.lesson-audio audio').evaluate(audio => audio.currentTime)
    assert.ok(Math.abs(actualTime - time) < .002)
    const spoken = captionSpokenThrough(cue.words, actualTime)
    const current = captionWordAt(cue.words, actualTime)
    await page.waitForFunction(({ count, spoken, current }) => {
      const words = [...document.querySelectorAll('.lesson-captions .lesson-caption-word')]
      return words.length === count && words.filter(word => word.classList.contains('is-spoken')).length === spoken + 1
        && words.findIndex(word => word.classList.contains('is-current')) === current
    }, { count: cue.words.length, spoken, current })
  }

  async function geometry(page) {
    return page.locator('.lesson-captions').evaluate(node => {
      const box = node.getBoundingClientRect(), root = node.closest('.slidev-layout'), canvas = root.getBoundingClientRect()
      const overlaps = [...root.querySelectorAll('h1, .lesson-summary-body, .test-import-copy, .lesson-columns, .cvedi-grid, figcaption, .slide-label, .slide-index')]
        .filter(other => {
          const b = other.getBoundingClientRect()
          return b.width && b.height && box.left < b.right && box.right > b.left && box.top < b.bottom && box.bottom > b.top
        }).map(node => node.className || node.tagName)
      return { withinCanvas: box.left >= canvas.left && box.right <= canvas.right && box.top >= canvas.top && box.bottom <= canvas.bottom,
        overlaps, height: box.height * 1280 / canvas.width, text: node.textContent, fontSize: getComputedStyle(node).fontSize }
    })
  }

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' })
    page.setDefaultTimeout(15000)
    page.on('pageerror', error => { if (!error.message.includes('Wake Lock')) errors.push(error.message) })
    for (const [index, [alias, clip]] of Object.entries(manifest.clips).entries()) {
      const alignment = JSON.parse(await readFile(clip.wordsSource, 'utf8'))
      const { cues } = alignment
      const wordCues = buildCaptionWordTrack(alignment).cues
      const root = await openSlide(page, lesson, alias, { settle: true })
      const audio = page.locator('.lesson-audio audio')
      const cc = page.getByRole('button', { name: 'Sottotitoli', exact: true })
      assert.equal(await page.locator('.lesson-audio').count(), 1)
      assert.equal(await cc.getAttribute('aria-pressed'), 'true')
      assert.equal(await audio.evaluate(node => node.paused && node.readyState === 0), true, 'caption loading never fetches audio before play')
      assert.equal(await root.locator('.lesson-captions').isVisible(), false)
      const controls = await audio.getAttribute('src')
      assert.ok(controls.endsWith(clip.web.replace('/captions/', '/audio/').replace(/\.vtt$/, '.mp3')))
      await page.getByRole('button', { name: 'Riproduci audio', exact: true }).click()
      await page.waitForFunction(() => !document.querySelector('.lesson-audio audio').paused)
      await page.getByRole('button', { name: 'Metti in pausa l’audio', exact: true }).click()
      const response = await page.request.get(new URL(await page.locator('track').getAttribute('src'), page.url()).href)
      assert.equal(response.status(), 200)
      assert.equal(await response.text(), await readFile(clip.source, 'utf8'))
      const wordResponse = await page.request.get(new URL((await page.locator('track').getAttribute('src')).replace(/\.vtt$/, '.words.json'), page.url()).href)
      assert.equal(wordResponse.status(), 200)
      assert.deepEqual(await wordResponse.json(), buildCaptionWordTrack(alignment))
      for (const [cueIndex, cue] of cues.entries()) {
        const middle = (cue.start + cue.end) / 2
        await seek(page, middle, cue.text)
        await wordState(page, wordCues[cueIndex], middle)
        const result = await geometry(page)
        assert.ok(result.withinCanvas && result.height <= 56.1, alias + ': two lines fit the canvas')
        assert.deepEqual(result.overlaps, [], alias + ': captions leave content and footer readable')
        const lastWord = wordCues[cueIndex].words.findLast(word => word.end > word.start)
        const endTime = (lastWord.start + lastWord.end) / 2
        await seek(page, endTime, cue.text)
        await wordState(page, wordCues[cueIndex], endTime)
      }
      const before = await root.evaluate(root => [...root.querySelectorAll('h1, .lesson-summary-body, .lesson-columns, .cvedi-grid, .slide-footer')]
        .map(node => { const b = node.getBoundingClientRect(); return [b.x, b.y, b.width, b.height] }))
      const url = page.url()
      await cc.focus(); await page.keyboard.press('Space')
      assert.equal(await cc.getAttribute('aria-pressed'), 'false')
      assert.equal(await page.locator('.lesson-captions').isVisible(), false)
      assert.equal(page.url(), url, 'CC keyboard action never advances the slide')
      assert.deepEqual(await root.evaluate(root => [...root.querySelectorAll('h1, .lesson-summary-body, .lesson-columns, .cvedi-grid, .slide-footer')]
        .map(node => { const b = node.getBoundingClientRect(); return [b.x, b.y, b.width, b.height] })), before, 'toggling captions does not move slide content')
      await cc.click()
      assert.equal(await page.locator('.lesson-captions').isVisible(), true)
      if (index < 3 || index === 6 || index === 29 || index === 30 || index === 49 || index === 50 || index === 109) {
        const cue = cues.find(cue => cue.text.includes('\n')) ?? cues[0]
        await seek(page, (cue.start + cue.end) / 2, cue.text)
        await page.screenshot({ path: `${output}/desktop-${index + 1}.png` })
        await page.setViewportSize({ width: 390, height: 844 })
        const narrow = await geometry(page)
        assert.ok(narrow.withinCanvas)
        assert.deepEqual(narrow.overlaps, [])
        await page.screenshot({ path: `${output}/narrow-${index + 1}.png` })
        await page.setViewportSize({ width: 1280, height: 720 })
      }
      await page.getByRole('button', { name: 'Riproduci dall’inizio', exact: true }).click()
      await page.waitForFunction(() => document.querySelector('.lesson-audio audio').currentTime < .5)
      await page.getByRole('button', { name: 'Metti in pausa l’audio', exact: true }).click()
      await seek(page, (cues[0].start + cues[0].end) / 2, cues[0].text)
      const heldText = await page.locator('.lesson-captions').textContent()
      const heldWords = await page.locator('.lesson-caption-word.is-spoken').allTextContents()
      await page.waitForTimeout(100)
      assert.equal(await page.locator('.lesson-captions').textContent(), heldText, 'pause holds the current caption')
      assert.deepEqual(await page.locator('.lesson-caption-word.is-spoken').allTextContents(), heldWords, 'pause also holds karaoke progress')
      reports.push({ alias, cuesChecked: cues.length, wordsChecked: alignment.words.length, desktop: true, keyboard: true, restart: true, pause: true })
    }
    const aliases = Object.keys(manifest.clips)
    const motion = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'no-preference' })
    await openSlide(motion, lesson, aliases[0])
    await motion.getByRole('button', { name: 'Riproduci audio', exact: true }).click()
    await motion.waitForFunction(() => document.querySelectorAll('.lesson-caption-word.is-spoken').length >= 3)
    await motion.getByRole('button', { name: 'Metti in pausa l’audio', exact: true }).click()
    const motionAlignment = JSON.parse(await readFile(manifest.clips[aliases[0]].wordsSource, 'utf8'))
    const motionCue = motionAlignment.cues[0]
    await seek(motion, (motionCue.start + motionCue.end) / 2, motionCue.text)
    await motion.waitForTimeout(120)
    const karaokeStyle = await motion.locator('.lesson-captions').evaluate(node => {
      const style = getComputedStyle(node), word = node.querySelector('.is-spoken'), wordStyle = getComputedStyle(word)
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1
      const ctx = canvas.getContext('2d'); ctx.fillStyle = wordStyle.color; ctx.fillRect(0, 0, 1, 1)
      const [red, green, blue] = ctx.getImageData(0, 0, 1, 1).data
      const luminance = [red, green, blue].map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
      return { background: style.backgroundColor, opacity: style.opacity, transition: wordStyle.transitionDuration,
        rgb: [red, green, blue], contrast: (luminance[0] * .2126 + luminance[1] * .7152 + luminance[2] * .0722 + .05) / .05 }
    })
    assert.equal(karaokeStyle.background, 'rgb(0, 0, 0)', 'karaoke uses the requested solid black panel')
    assert.equal(karaokeStyle.opacity, '1')
    assert.equal(karaokeStyle.transition, '0.1s')
    assert.ok(karaokeStyle.contrast >= 4.5, 'spoken words have readable contrast on black')
    if (specification.lesson === 'test-usabilita')
      assert.ok(karaokeStyle.rgb[2] > karaokeStyle.rgb[1] && karaokeStyle.rgb[0] > karaokeStyle.rgb[1], 'usability retains its purple spoken words')
    await motion.screenshot({ path: `${output}/karaoke-desktop.png` })
    await motion.locator('.lesson-captions').screenshot({ path: `${output}/karaoke-detail.png` })
    await motion.emulateMedia({ reducedMotion: 'reduce' })
    assert.equal(await motion.locator('.lesson-caption-word').first().evaluate(node => getComputedStyle(node).transitionDuration), '0s')
    assert.ok(await motion.locator('.lesson-caption-word.is-spoken').count() > 0, 'reduced motion retains meaningful karaoke feedback')
    // Slidev retains inactive components: returning to one must start with no stale text.
    await openSlide(page, lesson, aliases[0])
    await page.getByRole('button', { name: 'Riproduci audio', exact: true }).click()
    await page.waitForFunction(() => document.querySelector('.lesson-captions')?.hidden === false)
    await page.locator('.lesson-audio audio').evaluate(audio => { window.__previousAudio = audio })
    await page.locator('.slidev-layout.is-active h1').click()
    await page.keyboard.press('ArrowRight')
    await page.waitForFunction(() => window.__previousAudio.paused && !window.__previousAudio.isConnected)
    assert.equal(await page.locator('.lesson-captions').isVisible(), false, 'new slide waits for Play')
    await page.keyboard.press('ArrowLeft')
    await page.waitForFunction(web => document.querySelector('.lesson-audio audio')?.getAttribute('src')?.endsWith(web), manifest.clips[aliases[0]].web.replace('/captions/', '/audio/').replace(/\.vtt$/, '.mp3'))
    assert.equal(await page.locator('.lesson-captions').isVisible(), false, 'returning to a slide never restores its previous caption before Play')
    await openSlide(page, lesson, aliases[0])
    await page.getByRole('button', { name: 'Sottotitoli', exact: true }).click()
    await openSlide(page, lesson, aliases[1])
    assert.equal(await page.getByRole('button', { name: 'Sottotitoli', exact: true }).getAttribute('aria-pressed'), 'false', 'CC preference persists across slides and page reloads')
    await page.getByRole('button', { name: 'Sottotitoli', exact: true }).click()
    await page.getByRole('button', { name: 'Riproduci audio', exact: true }).click()
    await page.waitForFunction(() => document.querySelector('.lesson-captions')?.hidden === false)
    await page.locator('.lesson-audio audio').evaluate(audio => { window.__previousAudio = audio })
    await page.emulateMedia({ media: 'print' })
    await page.waitForFunction(() => window.__previousAudio.paused && !window.__previousAudio.isConnected)
    assert.equal(await page.locator('.lesson-audio, .lesson-captions').count(), 0, 'print removes media controls and subtitles')
    await page.screenshot({ path: `${output}/print-summary.png` })
    await page.emulateMedia({ media: 'screen' })
    await page.locator('.lesson-audio').waitFor()
    assert.ok(await page.locator('.lesson-audio audio').evaluate(audio => audio.paused && audio.currentTime === 0))
    assert.equal(await page.locator('.lesson-captions').isVisible(), false)
    const unrecorded = lessonManifest.slides.find(slide => !manifest.clips[slide.alias])
    if (unrecorded) {
      await openSlide(page, lesson, unrecorded.alias)
      assert.equal(await page.locator('.lesson-audio, .lesson-captions').count(), 0, 'unrecorded slides have no CC or audio')
    }
    await openSlide(page, `${base}/lezioni/processo-ux-ui`, 'processo-ux-ui')
    assert.equal(await page.locator('.lesson-audio, .lesson-captions').count(), 0, 'lessons without recordings keep their existing behavior')

    const failed = await browser.newPage()
    await failed.route('**/captions/**/*.vtt', route => route.fulfill({ status: 404, body: '' }))
    await openSlide(failed, lesson, aliases[0])
    await failed.getByRole('status').filter({ hasText: 'Sottotitoli non disponibili' }).waitFor()
    assert.equal(await failed.getByRole('button', { name: 'Sottotitoli', exact: true }).isDisabled(), true)
    await failed.getByRole('button', { name: 'Riproduci audio', exact: true }).click()
    await failed.waitForFunction(() => !document.querySelector('.lesson-audio audio').paused)
    const plain = await browser.newPage()
    await plain.route('**/captions/**/*.words.json', route => route.fulfill({ status: 404, body: '' }))
    await openSlide(plain, lesson, aliases[0])
    await plain.getByRole('button', { name: 'Riproduci audio', exact: true }).click()
    await plain.waitForFunction(() => document.querySelector('.lesson-captions')?.hidden === false)
    assert.equal(await plain.locator('.lesson-caption-word').count(), 0, 'missing word data falls back to ordinary captions')
    assert.equal(await plain.getByRole('button', { name: 'Sottotitoli', exact: true }).isEnabled(), true)
    assert.deepEqual(errors, [])
    await writeFile(`${output}/verification.json`, JSON.stringify({ status: 'passed', reports, errors, karaokeStyle, reducedMotion: true, print: true, persistedPreference: true, navigationResetsCaptions: true, unrecordedSlidesUnchanged: true, missingCaptionsAudioWorks: true }, null, 2) + '\n')
    console.log(`Captions ${specification.lesson}: ${reports.length} slides, ${reports.reduce((sum, report) => sum + report.cuesChecked, 0)} cues passed timing, text, geometry, controls, print and error checks.`)
  } catch (error) {
    await writeFile(`${output}/verification.json`, JSON.stringify({ status: 'failed', error: error.message, reports, errors }, null, 2) + '\n')
    throw error
  } finally { await browser.close() }
}

for (const specification of specifications) await checkLesson(specification)
