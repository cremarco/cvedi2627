import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'
import { openSlide } from '../../../../scripts/check/browser.mjs'

const data = JSON.parse(await readFile('progetti/slide/data/ux-service-architecture.json', 'utf8'))
const manifest = JSON.parse(await readFile('progetti/slide/assets/booklet/lezione-processo-ux-ui/manifest.json', 'utf8'))
const slide = manifest.slides.find(slide => slide.slug === 'sitemap')
const base = (process.env.SLIDEV_URL || 'http://localhost:3030').replace(/\/$/, '') + '/lezioni/processo-ux-ui'
const output = 'reports/processo-ux-ui-slidev/architecture'
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const report = { profiles: [], checks: [], errors: [] }
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: 'no-preference' })
  page.on('pageerror', error => { if (error.message !== 'Wake Lock permission request denied') report.errors.push(error.message) })
  const figure = () => page.locator('.slidev-layout.is-active .ux-service-architecture')
  async function seek(time) {
    return figure().evaluate(async (root, time) => {
      const animations = root.getAnimations({ subtree: true })
      for (const animation of animations) { animation.pause(); animation.currentTime = time }
      await new Promise(resolve => requestAnimationFrame(resolve))
      return {
        timings: animations.map(animation => animation.effect.getComputedTiming().endTime),
        root: getComputedStyle(root.querySelector('.architecture-root')).opacity,
        groups: [...root.querySelectorAll('.architecture-group')].map(node => getComputedStyle(node).opacity),
        lines: [...root.querySelectorAll('.architecture-connector')].map(node => parseFloat(getComputedStyle(node).strokeDashoffset)),
      }
    }, time)
  }
  async function assertStatic(target = figure()) {
    assert.deepEqual(await target.evaluate(root => ({
      animations: root.getAnimations({ subtree: true }).length,
      visible: [...root.querySelectorAll('.architecture-root, .architecture-group, .architecture-item')].every(node => getComputedStyle(node).opacity === '1'),
      lines: [...root.querySelectorAll('.architecture-connector')].every(node => parseFloat(getComputedStyle(node).strokeDashoffset) === 0),
    })), { animations: 0, visible: true, lines: true }, 'static environments show the entire hierarchy immediately')
  }
  await openSlide(page, base, slide.alias)
  const start = await seek(0)
  assert.ok(start.timings.length > 0 && start.timings.every(time => Number.isFinite(time) && time <= 2500))
  assert.ok(start.root === '0' && start.groups.every(opacity => opacity === '0') && start.lines.every(offset => offset === 1))
  const middle = await seek(1000)
  assert.ok(middle.root === '1' && Number(middle.groups[0]) > 0 && middle.groups[2] === '0' && middle.lines[0] === 0, 'service and first branch precede later groups')
  const final = await seek(2500)
  assert.ok(final.groups.every(opacity => opacity === '1') && final.lines.every(offset => offset === 0))
  await figure().evaluate(root => root.getAnimations({ subtree: true }).forEach(animation => animation.finish()))
  assert.ok(await figure().evaluate(root => root.getAnimations({ subtree: true }).every(animation => animation.playState === 'finished')), 'construction stops without looping')
  const replay = figure().getByRole('button', { name: 'Rianima l’architettura del servizio', exact: true })
  for (const key of ['Enter', 'Space']) {
    const previous = await figure().locator('.architecture-diagram').elementHandle()
    await replay.focus(); await page.keyboard.press(key)
    assert.equal(await previous.evaluate(node => node.isConnected), false, 'replay restarts the construction')
    assert.equal(await replay.evaluate(node => document.activeElement === node), true)
    assert.ok(page.url().endsWith('/' + slide.alias), 'replay preserves the slide')
    assert.equal((await seek(0)).root, '0')
  }
  report.checks.push('finite progressive hierarchy, complete paths, Enter/Space replay and stable focus')
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await assertStatic()
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')) })
  const inactive = await figure().elementHandle()
  await page.keyboard.press('ArrowRight')
  await page.waitForURL('**/#/' + manifest.slides.find(next => next.lessonSlide === slide.lessonSlide + 1).alias)
  await assertStatic(inactive)
  report.checks.push('hidden tab and inactive slide cancel playback')
  for (const [mode, viewport, media] of [
    ['desktop', { width: 1280, height: 720 }, 'screen'],
    ['narrow', { width: 636, height: 778 }, 'screen'],
    ['print', { width: 1280, height: 720 }, 'print'],
  ]) {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ media, reducedMotion: 'reduce' })
    await openSlide(page, base, slide.alias)
    await assertStatic()
    const layout = await figure().evaluate(root => {
      const canvas = root.closest('.slidev-layout'), box = canvas.getBoundingClientRect()
      const footer = canvas.querySelector('.slide-footer').getBoundingClientRect().top
      return {
        sections: [...root.querySelectorAll('.architecture-group')].map(group => ({ title: group.querySelector('h3').textContent, items: [...group.querySelectorAll('.architecture-item')].map(item => item.textContent) })),
        overflow: [...root.querySelectorAll('h2, h3, p, .architecture-item')].filter(node => {
          const range = document.createRange(); range.selectNodeContents(node)
          return [...range.getClientRects()].some(rect => rect.left < box.left || rect.right > box.right || rect.top < box.top || rect.bottom > footer)
        }).map(node => node.textContent),
        headingSizes: [...root.querySelectorAll('h2, h3')].map(node => parseFloat(getComputedStyle(node).fontSize)),
        bodySizes: [...root.querySelectorAll('.architecture-item')].map(node => parseFloat(getComputedStyle(node).fontSize)),
        captions: root.querySelectorAll('.lesson-caption').length,
        images: root.querySelectorAll('img').length,
        selectable: getComputedStyle(root).userSelect === 'text',
      }
    })
    assert.deepEqual(layout.sections, data.sections.map(({ title, items }) => ({ title, items })))
    assert.deepEqual(layout.overflow, [])
    assert.ok(layout.headingSizes.every(size => size === 24) && layout.bodySizes.every(size => size === 20))
    assert.ok(layout.selectable && layout.images === 0 && layout.captions === 1)
    assert.equal(await replay.count(), 0)
    report.profiles.push({ mode, ...layout })
  }
  await page.emulateMedia({ media: 'screen', reducedMotion: 'no-preference' })
  await page.goto(`${base}/?print=true&range=${slide.lessonSlide}#/${slide.lessonSlide}`)
  const exported = page.locator(`.slidev-page-${slide.lessonSlide} .ux-service-architecture`)
  await exported.waitFor(); await assertStatic(exported)
  report.checks.push('reduced motion, print and screen-media export remain complete and static')
  assert.deepEqual(report.errors, [])
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2) + '\n')
  await browser.close()
}
console.log('Service architecture: construction, replay, keyboard, inactive/hidden state, desktop, narrow viewport, reduced motion, print and export passed.')
