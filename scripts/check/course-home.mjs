import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { projectArchiveURL } from '../../utils/project-archive.mjs'

const directory = path.resolve(process.env.COURSE_HOME_SITE || '_site')
const output = process.env.COURSE_HOME_REPORT || 'reports/course-home'
await mkdir(output, { recursive: true })
const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
const serve = require('sirv')(directory, { dev: true })
const server = createServer((request, response) => {
  if (request.url.startsWith('/cvedi2627/')) request.url = request.url.slice('/cvedi2627'.length)
  serve(request, response, () => response.writeHead(404).end())
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch({ headless: true })
const report = { status: 'running', cases: [], errors: [] }
const record = (name, details = {}) => report.cases.push({ name, ...details })
const geometry = JSON.parse(await readFile('assets/metro-map/geometric-animation.json', 'utf8'))
const routes = geometry.lanes.filter(route => route.family !== 'blue')
const animatedScene = '.metro-field,.metro-route,.metro-dot,.metro-packet'
const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
const sceneState = page => page.locator(animatedScene).evaluateAll(elements => elements.map(element => {
  const style = getComputedStyle(element)
  return { kind: element.classList.contains('metro-field') ? 'field' : element.classList.contains('metro-dot') ? 'dot' : element.classList.contains('metro-packet') ? 'packet' : 'route',
    animation: style.animationName, playState: style.animationPlayState, iterations: style.animationIterationCount,
    opacity: style.opacity, transform: style.transform, offset: style.strokeDashoffset,
    times: element.getAnimations().map(animation => animation.currentTime) }
}))
const assertPausedScene = async page => {
  await page.waitForTimeout(50)
  const paused = await sceneState(page)
  assert.ok(paused.every(element => element.animation !== 'none' && element.playState === 'paused'), 'fields, routes, dots and travelling packets pause together')
  await page.waitForTimeout(150)
  assert.deepEqual(await sceneState(page), paused, 'every decorative animation remains still while paused')
  return paused
}
const assertStaticScene = async page => {
  assert.equal(await page.locator('.metro-scene').isVisible(), true)
  const state = await sceneState(page)
  assert.ok(state.every(element => element.animation === 'none'), 'the static scene has no decorative animations')
  assert.ok(state.filter(element => element.kind !== 'packet').every(element => Number(element.opacity) === 1), 'restored fields, routes and dots are visible in the static scene')
  assert.ok(state.filter(element => element.kind === 'route').every(element => parseFloat(element.offset) === 0), 'static routes are completely drawn')
  assert.equal(await page.locator('.metro-packet:visible').count(), 0, 'static scenes omit travelling packets')
}
const assertSharedSlidePalette = async page => {
  const palette = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement)
    const context = new OffscreenCanvas(1, 1).getContext('2d', { willReadFrequently: true })
    const color = value => {
      if (!CSS.supports('color', value)) throw new Error(`Invalid palette color: ${value}`)
      context.clearRect(0, 0, 1, 1)
      context.fillStyle = value
      context.fillRect(0, 0, 1, 1)
      return [...context.getImageData(0, 0, 1, 1).data]
    }
    const pairs = [['indigo', 'opening-canvas'], ['ink', 'opening-canvas'], ['lime', 'opening-accent-vivid'],
      ['orange', 'orange-800'], ['teal', 'teal-800'], ['pink', 'pink-800'], ['muted', 'indigo-700'], ['rule', 'indigo-200']]
      .map(([home, slide]) => ({ home, actual: color(style.getPropertyValue(`--home-${home}`).trim()), expected: color(style.getPropertyValue(`--cvedi-${slide}`).trim()) }))
    return { pairs, band: color(getComputedStyle(document.querySelector('.opening-content'), '::before').backgroundColor),
      accent: color(getComputedStyle(document.querySelector('h1 em')).color), action: color(getComputedStyle(document.querySelector('.slide-action')).backgroundColor) }
  })
  for (const pair of palette.pairs) assert.deepEqual(pair.actual, pair.expected, `home ${pair.home} shares the slide palette`)
  assert.deepEqual(palette.band, palette.pairs.find(pair => pair.home === 'indigo').expected, 'the title band uses the opening slide canvas color')
  for (const actual of [palette.accent, palette.action]) assert.deepEqual(actual, palette.pairs.find(pair => pair.home === 'lime').expected, 'title accent and main action use the opening slide accent')
}
const assertOriginalGeometry = async page => {
  const actual = await page.evaluate(() => {
    const attributes = (selector, names) => [...document.querySelectorAll(selector)].map(element => Object.fromEntries(names.map(name => [name, element.getAttribute(name)])))
    return { viewBox: document.querySelector('.metro-scene svg').getAttribute('viewBox'),
      fields: attributes('path.metro-field', ['d', 'fill']),
      cream: attributes('rect.metro-field', ['x', 'y', 'width', 'height', 'rx', 'fill']),
      routes: [...document.querySelectorAll('.metro-route')].map(element => ({ d: element.getAttribute('d'), color: element.getAttribute('stroke'), width: Number(element.getAttribute('stroke-width')), family: element.closest('.metro-family').dataset.family })),
      dots: [...document.querySelectorAll('.metro-dots .metro-dot')].map(element => ({ cx: Number(element.getAttribute('cx')), cy: Number(element.getAttribute('cy')), r: Number(element.getAttribute('r')) })),
      packets: attributes('.metro-packet', ['d']), families: attributes('.metro-family', ['data-family']) }
  })
  const sortedPaths = paths => [...paths].sort((a, b) => a.d.localeCompare(b.d))
  assert.equal(actual.viewBox, '0 0 1741 903', 'the scene retains the original canvas')
  assert.deepEqual(actual.fields, geometry.lanes.filter(route => route.family === 'blue').map(route => ({ d: route.fillD, fill: route.color })), 'both blue geometric fields retain their original filled paths')
  assert.deepEqual(actual.cream, [{ x: '340', y: '215', width: '405', height: '370', rx: '22', fill: '#F5F3D7' }], 'the cream geometric field matches the first slide')
  assert.deepEqual(sortedPaths(actual.routes), sortedPaths(routes.map(route => ({ d: route.d, color: route.color, width: route.width, family: route.family }))), 'all 23 original routes retain geometry, color, width and family')
  assert.equal(actual.dots.length, 147, 'all original dots are restored')
  assert.deepEqual(actual.dots, geometry.dots.map(dot => ({ cx: dot.cx, cy: dot.cy, r: 3.5 })), 'dots retain the positions and radius of the first slide')
  assert.equal(actual.packets.length, 8)
  assert.ok(actual.packets.every(packet => routes.some(route => route.d === packet.d)), 'travelling packets follow original routes')
  assert.deepEqual(actual.families.map(family => family['data-family']).sort(), [...new Set(routes.map(route => route.family))].sort())
  record('original geometric fields, routes, dots and route families', { fields: actual.fields.length + actual.cream.length, routes: actual.routes.length, dots: actual.dots.length, packets: actual.packets.length })
}
try {
  const html = await readFile(path.join(directory, 'index.html'), 'utf8')
  assert.ok(!/http-equiv=["']refresh/i.test(html), 'the home never redirects to the slides')
  assert.ok(!/localhost|127\.0\.0\.1/.test(html), 'published navigation contains no local addresses')
  for (const prefix of ['/', '/cvedi2627/']) {
    for (const width of [1440, 1280, 768, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
      page.on('pageerror', error => report.errors.push(error.message))
      page.on('response', response => { if (response.status() >= 400) report.errors.push(`${response.status()}: ${response.url()}`) })
      const response = await page.goto(base + prefix)
      assert.equal(response.status(), 200)
      await page.evaluate(() => document.fonts.ready)
      assert.equal(await page.locator('h1').count(), 1)
      assert.match(await page.locator('h1').innerText(), /Comunicazione\s+visiva e design\s+delle interfacce/)
      assert.equal(await page.locator('h1 > span').count(), 3, 'the course title retains its three lines')
      assert.match(await page.locator('.academic-year').innerText(), /A\.A\.\s*2026\/27/)
      assert.equal(await page.locator('.academic-year').isVisible(), true)
      const metrics = await page.evaluate(() => {
        const title = document.querySelector('h1')
        const opening = document.querySelector('.course-opening')
        const rectangle = element => { const { left, right, top, bottom } = element.getBoundingClientRect(); return { left, right, top, bottom } }
        return { scrollWidth: document.documentElement.scrollWidth, width: innerWidth,
          titleRight: title.getBoundingClientRect().right, titleLeft: title.getBoundingClientRect().left, fontSize: getComputedStyle(title).fontSize,
          titleLines: [...title.children].map(rectangle), year: rectangle(document.querySelector('.academic-year')),
          textBlocks: [...document.querySelectorAll('.opening-bottom p,.slide-action')].map(rectangle),
          scene: rectangle(document.querySelector('.metro-scene')),
          openingBottom: opening.getBoundingClientRect().bottom, motion: document.documentElement.dataset.motion }
      })
      assert.ok(metrics.scrollWidth <= width + 1, `no horizontal overflow at ${width}`)
      assert.ok(metrics.titleLeft >= 0 && metrics.titleRight <= width, 'title fits the viewport')
      assert.ok(metrics.year.left >= 0 && metrics.year.right <= width, 'academic year fits the viewport')
      assert.ok(metrics.scene.left <= 0 && metrics.scene.right >= width, 'the geometric scene spans the opening width')
      for (const line of metrics.titleLines) {
        assert.ok(!overlaps(line, metrics.year), 'academic year does not overlap the course title')
        assert.ok(metrics.textBlocks.every(block => !overlaps(line, block)), 'title lines do not overlap introductory copy or action')
      }
      assert.equal(metrics.motion, 'static')
      const contrasts = await page.locator('.academic-year').evaluateAll(elements => {
        const context = new OffscreenCanvas(1, 1).getContext('2d', { willReadFrequently: true })
        const color = value => {
          context.clearRect(0, 0, 1, 1)
          context.fillStyle = value
          context.fillRect(0, 0, 1, 1)
          return [...context.getImageData(0, 0, 1, 1).data]
        }
        const luminance = color => {
          const rgb = color.slice(0, 3).map(value => value / 255)
          return rgb.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
            .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
        }
        return elements.map(element => {
          const style = getComputedStyle(element)
          const foregroundColor = color(style.color), backgroundColor = color(style.backgroundColor)
          const foreground = luminance(foregroundColor), background = luminance(backgroundColor)
          return { text: element.textContent, background: style.backgroundColor, backgroundAlpha: backgroundColor[3],
            ratio: (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05) }
        })
      })
      for (const contrast of contrasts) {
        assert.equal(contrast.backgroundAlpha, 255, 'academic year has an opaque reading surface')
        assert.ok(contrast.ratio >= 4.5, `${contrast.text}: small text stays readable over the animated tracks`)
      }
      assert.equal(await page.locator('.motion-toggle').count(), 0)
      assert.equal(await page.locator('.metro-route').count(), 23, 'original route geometry is preserved')
      assert.equal(await page.locator('.metro-field').count(), 3)
      assert.equal(await page.locator('.metro-dot').count(), 147)
      await assertStaticScene(page)
      if (prefix === '/' && width === 1440) {
        await assertOriginalGeometry(page)
        await assertSharedSlidePalette(page)
      }
      assert.equal(await page.locator('.destination[href]').count(), 3)
      assert.match(await page.locator('.destination-pending').innerText(), /iLMeteo[\s\S]*in preparazione/)
      for (const href of ['slides/', projectArchiveURL, 'web-design-examples/index.html?stile=liquid']) {
        assert.ok(await page.locator(`.destination[href="${href}"]`).isVisible())
        if (href === projectArchiveURL) continue // External archive is verified separately.
        const target = new URL(href, base + prefix)
        assert.equal((await fetch(target)).status, 200, `destination ${target.pathname}`)
      }
      if (prefix === '/' && [1440, 768, 390, 320].includes(width))
        await page.screenshot({ path: `${output}/home-${width}.png`, fullPage: true })
      record(`layout ${prefix} ${width}`, { ...metrics, minimumHeroTextContrast: Math.min(...contrasts.map(value => value.ratio)) })
      await page.close()
    }
  }
  for (const width of [1440, 390]) {
    const motionPage = await browser.newPage({ viewport: { width, height: 900 } })
    motionPage.on('pageerror', error => report.errors.push(error.message))
    await motionPage.goto(base + '/cvedi2627/')
    await motionPage.evaluate(() => document.fonts.ready)
    await motionPage.waitForFunction(() => document.documentElement.dataset.motion === 'running')
    const textBounds = () => motionPage.locator('h1,.academic-year').evaluateAll(elements => elements.map(element => {
      const { x, y, width, height } = element.getBoundingClientRect()
      return { x, y, width, height }
    }))
    const originalTextBounds = await textBounds()
    const started = Date.now()
    await motionPage.waitForTimeout(200)
    await motionPage.screenshot({ path: `${output}/home-motion-${width}-early.png` })
    assert.equal(await motionPage.locator('.motion-toggle').count(), 0)
    const entranceScene = await sceneState(motionPage)
    for (const kind of ['field', 'dot', 'route']) {
      const elements = entranceScene.filter(element => element.kind === kind)
      assert.ok(elements.length > 0 && elements.every(element => element.iterations === '1'), `${kind} entrances are finite`)
    }
    if (width === 1440) {
      record('geometric field, dot and route entrances remain finite', { fields: entranceScene.filter(element => element.kind === 'field').length, dots: entranceScene.filter(element => element.kind === 'dot').length })
    }
    await motionPage.waitForFunction(() => [...document.querySelectorAll('.metro-field,.metro-route,.metro-dot')].every(element => element.getAnimations().every(animation => animation.playState === 'finished')))
    assert.deepEqual(await textBounds(), originalTextBounds, 'title and academic year remain stationary throughout the scenic entrance')
    await motionPage.screenshot({ path: `${output}/home-motion-${width}-settled.png`, fullPage: true })
    const before = await motionPage.locator('.metro-packet').first().evaluate(element => getComputedStyle(element).strokeDashoffset)
    await motionPage.waitForTimeout(150)
    const after = await motionPage.locator('.metro-packet').first().evaluate(element => getComputedStyle(element).strokeDashoffset)
    assert.notEqual(before, after, 'the segment moves on the original path')
    await motionPage.waitForFunction(() => document.documentElement.dataset.motion === 'static', null, { timeout: 5500 })
    assert.ok(Date.now() - started <= 5000, 'the entrance stops automatically within five seconds')
    await assertStaticScene(motionPage)
    await motionPage.screenshot({ path: `${output}/home-motion-${width}-complete.png`, fullPage: true })
    await motionPage.emulateMedia({ reducedMotion: 'reduce' })
    await motionPage.waitForFunction(() => document.documentElement.dataset.motion === 'static')
    await assertStaticScene(motionPage)
    record(width === 1440 ? 'automatic motion completion without a pause control' : 'narrow scenic entrance completes automatically', { width })
    await motionPage.close()
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(base + '/cvedi2627/')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'running')
  await page.evaluate(() => window.scrollTo(0, document.querySelector('.course-opening').offsetHeight + 1))
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'paused')
  await assertPausedScene(page)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'running')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'static')
  await assertStaticScene(page)
  record('offscreen suspension, onscreen resume and live reduced-motion preference')
  const families = ['red', 'orange', 'teal']
  assert.deepEqual(await page.locator('.destination[data-route-family][href]').evaluateAll(elements => elements.map(element => element.dataset.routeFamily)), families)
  const assertSelectedFamily = async family => {
    await page.waitForFunction(expected => document.documentElement.dataset.routeFamily === expected, family)
    const opacities = await page.locator('.metro-family').evaluateAll(elements => elements.map(element => ({ family: element.dataset.family, opacity: Number(getComputedStyle(element).opacity) })))
    const selected = opacities.find(element => element.family === family).opacity
    assert.ok(opacities.filter(element => element.family !== family).every(element => element.opacity < selected), 'hover and focus visibly emphasize the selected route family')
  }
  for (const family of families) {
    const destinationLink = page.locator(`.destination[data-route-family="${family}"]`)
    await page.locator('.course-wordmark').focus()
    await destinationLink.hover()
    await assertSelectedFamily(family)
    await page.mouse.move(0, 0)
    await page.waitForFunction(() => !document.documentElement.dataset.routeFamily)
    await destinationLink.focus()
    await assertSelectedFamily(family)
    await page.locator('.course-wordmark').focus()
    await page.waitForFunction(() => !document.documentElement.dataset.routeFamily)
  }
  await page.locator('.course-wordmark').focus()
  await page.waitForFunction(() => !document.documentElement.dataset.routeFamily)
  record('route family selection by destination hover and keyboard focus')
  await page.keyboard.press('Tab')
  await page.goto(base + '/')
  await page.keyboard.press('Tab')
  assert.equal(await page.locator('.skip-link').evaluate(element => element === document.activeElement), true)
  await page.keyboard.press('Enter')
  assert.ok((await page.locator('#percorsi').boundingBox()).y < 200, 'skip link reaches the destinations')
  record('keyboard skip link')
  await page.emulateMedia({ forcedColors: 'active' })
  assert.equal(await page.locator('.metro-scene').isVisible(), false)
  record('forced colors')
  await page.emulateMedia({ forcedColors: 'none', media: 'print' })
  await page.goto(base + '/')
  assert.equal(await page.locator('.metro-scene').isVisible(), false)
  assert.equal(await page.locator('.destination[href]').count(), 3)
  await page.screenshot({ path: `${output}/home-print.png`, fullPage: true })
  await page.pdf({ path: `${output}/home-print.pdf`, format: 'A4', printBackground: true })
  record('print')
  await page.close()
  const noScript = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  await noScript.goto(base + '/')
  assert.equal(await noScript.locator('h1').isVisible(), true)
  assert.equal(await noScript.locator('.motion-toggle').count(), 0)
  assert.equal(await noScript.locator('.destination[href]').count(), 3)
  assert.equal(await noScript.locator('.metro-field').count(), 3)
  assert.equal(await noScript.locator('.metro-dot').count(), 147)
  await assertStaticScene(noScript)
  await noScript.screenshot({ path: `${output}/home-no-javascript.png`, fullPage: true })
  record('static page without JavaScript')
  await noScript.close()
  assert.deepEqual(report.errors, [])
  report.status = 'passed'
  console.log(JSON.stringify({ status: report.status, cases: report.cases.length, errors: report.errors }))
} catch (error) {
  report.status = 'failed'
  report.errors.push(error.message)
  process.exitCode = 1
  console.error(error)
} finally {
  await writeFile(`${output}/verification.json`, JSON.stringify(report, null, 2) + '\n')
  await browser.close()
  await new Promise(resolve => server.close(resolve))
}
