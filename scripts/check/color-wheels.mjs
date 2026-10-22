import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from './browser.mjs'

const base = (process.env.COLOR_WHEELS_URL || 'http://localhost:3035/lezioni/colore').replace(/\/$/, '')
const output = 'reports/color-wheels'
const variants = [
  ['confronto', 'colore-ruote-cromatiche', ['ruota-hsv', 'ruota-ryb'], 7],
  ['monocromatico', 'colore-schema-monocromatico', ['schema-monocromatico'], 8],
  ['analogo', 'colore-schema-analogo', ['schema-analogo'], 10],
  ['complementare', 'colore-schema-complementare', ['schema-complementare'], 12],
  ['divergente', 'colore-schema-complementare-divergente', ['schema-complementare-divergente'], 14],
  ['triadico', 'colore-schema-triadico', ['schema-triadico'], 16],
]
await mkdir(output, { recursive: true })
const report = { variants: [], profiles: [], motion: [], errors: [] }
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'no-preference' })
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') report.errors.push(error.message) })
  for (const [variant, alias, files] of variants) {
    const root = await openSlide(page, base, alias, { settle: true })
    const originals = await Promise.all(files.map(file => readFile(`assets/booklet/colore-schemi-slide/native/${file}.svg`, 'utf8')))
    const geometry = await root.evaluate((root, originals) => {
      const attributes = node => Object.fromEntries(['cx', 'cy', 'r', 'fill', 'd', 'stroke', 'stroke-width'].map(name => [name, node.getAttribute(name)]))
      return {
        expected: originals.flatMap(svg => [...new DOMParser().parseFromString(svg, 'image/svg+xml').querySelectorAll('circle, path')].map(attributes)),
        actual: [...root.querySelectorAll('.color-wheel-diagram circle, .color-wheel-diagram path')].map(attributes),
        animations: root.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith('cvedi-wheel-')).map(animation => ({ name: animation.animationName, state: animation.playState, end: animation.effect.getComputedTiming().endTime })),
      }
    }, originals)
    assert.deepEqual(geometry.actual, geometry.expected, `${variant}: native geometry and colors preserved`)
    assert.ok(geometry.animations.length >= 3, `${variant}: a bounded teaching sequence runs`)
    assert.ok(geometry.animations.every(animation => animation.state === 'finished' && animation.end <= 2200), `${variant}: animation stops on complete diagram`)
    const replay = root.getByRole('button', { name: 'Rianima', exact: true })
    await replay.focus()
    await replay.press('Enter')
    const restarted = await root.evaluate(root => root.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith('cvedi-wheel-')).some(animation => animation.playState === 'running' && animation.currentTime < 500))
    assert.ok(restarted, `${variant}: keyboard replay restarts the sequence`)
    await root.evaluate(root => Promise.all(root.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith('cvedi-wheel-')).map(animation => animation.finished)))
    report.variants.push({ variant, nativeShapes: geometry.actual.length, animations: geometry.animations.length, replay: 'keyboard' })
    await page.screenshot({ path: `${output}/${variant}-desktop.png` })
  }

  const root = await openSlide(page, base, 'colore-schema-complementare', { settle: true })
  await root.getByRole('button', { name: 'Rianima', exact: true }).click()
  for (const [stage, time] of [['start', 0], ['selection', 850], ['complete', 2200]]) {
    await root.evaluate((root, time) => {
      for (const animation of root.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith('cvedi-wheel-'))) { animation.pause(); animation.currentTime = time }
    }, time)
    await page.screenshot({ path: `${output}/complementare-${stage}.png` })
  }
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  assert.equal(await root.locator('.color-wheel-diagram.is-playing').count(), 0, 'hidden document cancels motion')
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  assert.equal(await root.locator('.color-wheel-diagram.is-playing').count(), 1, 'visible document can play again')
  await openSlide(page, base, 'colore-schema-complementare-esempi', { settle: true })
  await page.locator('.slidev-layout.is-active h1').filter({ hasText: 'Complementare: esempi' }).waitFor()
  assert.equal(await page.locator('.color-wheel-diagram.is-playing').count(), 0, 'inactive wheels cancel motion')
  report.motion.push('keyboard replay', 'finite sequences', 'hidden document', 'inactive slide')

  for (const [profile, viewport, media] of [
    ['narrow', { width: 390, height: 844 }, 'screen'],
    ['print', { width: 1280, height: 720 }, 'print'],
  ]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media, reducedMotion: 'reduce' })
    for (const [variant, alias] of variants) {
      const root = await openSlide(page, base, alias, { settle: true })
      const metrics = await root.evaluate(root => {
        const figure = root.querySelector('.lesson-figure').getBoundingClientRect()
        const stage = root.getBoundingClientRect()
        const overlay = root.querySelector('.lesson-image-overlay').getBoundingClientRect()
        const image = root.querySelector('.lesson-figure img').getBoundingClientRect()
        return { contained: figure.left >= stage.left - 1 && figure.right <= stage.right + 1 && figure.bottom < stage.bottom - 15 * stage.width / 1280,
          overlayMatchesImage: Math.abs(overlay.width - image.width) < 1 && Math.abs(overlay.height - image.height) < 1,
          imageOpacity: getComputedStyle(root.querySelector('.lesson-figure img')).opacity,
          overlayDisplay: getComputedStyle(root.querySelector('.lesson-image-overlay')).display,
          animations: root.querySelector('.color-wheel-diagram').getAnimations({ subtree: true }).length }
      })
      assert.ok(metrics.contained, `${variant}/${profile}: figure fits canvas`)
      assert.equal(metrics.animations, 0, `${variant}/${profile}: static complete diagram`)
      if (profile === 'print') {
        assert.equal(metrics.imageOpacity, '1', 'print keeps original image')
        assert.equal(metrics.overlayDisplay, 'none', 'print hides vector animation')
      } else {
        assert.ok(metrics.overlayMatchesImage, `${variant}: vector matches measured original`)
        assert.equal(await root.getByRole('button', { name: 'Rianima', exact: true }).isDisabled(), true)
      }
      await page.screenshot({ path: `${output}/${variant}-${profile}.png` })
      report.profiles.push({ variant, profile, ...metrics })
    }
  }
  await page.emulateMedia({ media: 'screen', reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1280, height: 720 })
  for (const [variant, , , number] of variants) {
    await page.goto(`${base}/?print=true#/${number}`)
    const root = page.locator(`.slidev-page-${number} .slidev-layout`)
    await root.waitFor()
    assert.equal(await root.locator('.color-wheel-diagram.is-playing').count(), 0, `${variant}: screen export cancels motion`)
    assert.equal(await root.locator('.lesson-image-overlay').isVisible(), false)
    assert.equal(await root.locator('.lesson-image-replay').isVisible(), false)
    assert.equal(await root.locator('.lesson-image-hint').isVisible(), false)
    assert.equal(await root.locator('.lesson-figure img').evaluate(node => getComputedStyle(node).opacity), '1')
    report.profiles.push({ variant, profile: 'screen-export', original: true, controls: false })
  }
  const zoomRoot = await openSlide(page, base, 'colore-schema-triadico', { settle: true })
  const imageButton = zoomRoot.locator('.lesson-image-button')
  await imageButton.focus()
  await imageButton.press('Enter')
  const dialog = page.locator('.lesson-image-dialog[open]')
  await dialog.waitFor()
  assert.ok(await dialog.locator('img').isVisible(), 'shared enlargement preserves original')
  assert.equal(await zoomRoot.locator('.color-wheel-diagram.is-playing').count(), 0, 'enlargement stops underlying motion')
  await dialog.press('Escape')
  assert.ok(await imageButton.evaluate(node => document.activeElement === node), 'Escape restores focus')
  report.motion.push('shared enlargement and focus restoration', 'reduced motion', 'print originals', 'screen-media export originals')
  assert.deepEqual(report.errors, [])
  report.status = 'passed'
} finally {
  await browser.close()
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2) + '\n')
}
console.log(JSON.stringify(report, null, 2))
