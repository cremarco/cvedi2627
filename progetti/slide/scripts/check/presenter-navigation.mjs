import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { realpathSync } from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-chromium'

// Use an isolated browser context so checks never touch the user's tabs.
let server
let base = process.env.DECK_URL
if (!base) {
  const require = createRequire(realpathSync('node_modules/@slidev/cli/package.json'))
  const serve = require('sirv')(path.resolve('progetti/slide/dist'), { dev: true })
  server = createServer((req, res) => serve(req, res, () => res.writeHead(404).end()))
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  base = `http://127.0.0.1:${server.address().port}/`
}
base = base.replace(/\/?$/, '/')
let browser
try {
  browser = await chromium.launch(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {})
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const viewer = await context.newPage(), presenter = await context.newPage(), unrelated = await context.newPage()
  context.setDefaultTimeout(12000)
  context.setDefaultNavigationTimeout(15000)
  const errors = []
  for (const page of [viewer, presenter, unrelated]) page.on('pageerror', error => errors.push(error.message))
  await unrelated.goto(`${base}lezioni/colore/#/1`)
  await unrelated.locator('.slidev-layout').first().waitFor()
  const unrelatedURL = unrelated.url()
  await viewer.goto(`${base}#/indice-esercitazioni`)
  await presenter.goto(`${base}#/presenter/indice-esercitazioni`)
  const exercise = presenter.locator('a[href*="/lezioni/esercitazione-01/"]').first()
  await exercise.waitFor()
  await exercise.click()
  await presenter.waitForURL(`${base}lezioni/esercitazione-01/#/presenter/**`)
  await viewer.waitForURL(`${base}lezioni/esercitazione-01/#/**`)
  assert.ok(!new URL(viewer.url()).hash.includes('/presenter/'), 'the public window keeps its role')
  console.log('PASS: both windows enter the exercise and preserve their roles')
  await presenter.locator('.slidev-layout').first().waitFor()
  await viewer.locator('.slidev-layout').first().waitFor()
  await presenter.keyboard.press('ArrowRight')
  await presenter.waitForURL(url => url.pathname === new URL(`${base}lezioni/esercitazione-01/`).pathname && url.hash.split('?')[0] === '#/presenter/2')
  await viewer.waitForURL(url => url.pathname === new URL(`${base}lezioni/esercitazione-01/`).pathname && url.hash.split('?')[0] === '#/2')
  console.log('PASS: native slide synchronization continues inside the exercise')
  await presenter.getByRole('link', { name: 'Torna al menu delle esercitazioni', exact: true }).click()
  await presenter.waitForURL(`${base}#/presenter/indice-esercitazioni`)
  await viewer.waitForURL(`${base}#/indice-esercitazioni`)
  console.log('PASS: both windows return to the exercise menu')
  assert.equal(unrelated.url(), unrelatedURL, 'other decks keep their slide as well as their document')
  await context.close()
  // A fresh session avoids carrying pending native updates into the next scenario.
  const theory = await browser.newContext({ reducedMotion: 'reduce' })
  theory.setDefaultTimeout(12000)
  theory.setDefaultNavigationTimeout(15000)
  const theoryViewer = await theory.newPage(), theoryPresenter = await theory.newPage()
  for (const page of [theoryViewer, theoryPresenter]) page.on('pageerror', error => errors.push(error.message))
  await theoryViewer.goto(`${base}#/3`)
  await theoryViewer.getByRole('heading', { name: 'Indice delle lezioni', exact: true }).waitFor()
  await theoryPresenter.goto(`${base}#/presenter/3`)
  await theoryPresenter.locator('a[href*="/lezioni/colore/"]:visible').first().click()
  await theoryPresenter.waitForURL(`${base}lezioni/colore/#/presenter/**`)
  await theoryViewer.waitForURL(`${base}lezioni/colore/#/**`)
  console.log('PASS: theory lessons also preserve synchronized deck navigation')
  await theory.close()

  // Reproduce stale saved switches and a viewer that reloads or navigates
  // independently. Neither may prevent the presenter from driving the lesson.
  const lesson = await browser.newContext({ reducedMotion: 'reduce' })
  lesson.setDefaultTimeout(12000)
  lesson.setDefaultNavigationTimeout(15000)
  await lesson.addInitScript(() => {
    if (!sessionStorage.getItem('cvedi-sync-test')) {
      localStorage.setItem('slidev-sync-directions', JSON.stringify({
        presenterSend: false, presenterReceive: true, viewerSend: true, viewerReceive: false,
      }))
      sessionStorage.setItem('cvedi-sync-test', 'true')
    }
  })
  const lessonViewer = await lesson.newPage(), lessonPresenter = await lesson.newPage()
  for (const page of [lessonViewer, lessonPresenter]) page.on('pageerror', error => errors.push(error.message))
  const lessonURL = `${base}lezioni/griglie-layout/`
  await lessonViewer.goto(`${lessonURL}#/1`)
  await lessonViewer.locator('.slidev-layout').first().waitFor()
  await lessonPresenter.goto(`${lessonURL}#/presenter/1`)
  await lessonPresenter.locator('.slidev-layout').first().waitFor()
  for (const alias of ['griglie-layout-sintesi', 'griglie-layout-obiettivi', 'griglie-layout-relazioni-struttura']) {
    await lessonPresenter.keyboard.press('ArrowDown')
    await lessonPresenter.waitForURL(url => url.hash.split('?')[0] === `#/presenter/${alias}`)
    await lessonViewer.waitForURL(url => url.hash.split('?')[0] === `#/${alias}`)
  }
  const presenterSlide = new URL(lessonPresenter.url()).hash.split('?')[0]
  await lessonViewer.reload()
  await lessonViewer.locator('.slidev-layout:visible').first().waitFor()
  await lessonViewer.goto(`${lessonURL}#/1`)
  await lessonViewer.locator('.slidev-layout:visible').first().waitFor()
  // Allow delayed native navigation echoes to arrive before checking stability.
  await lessonPresenter.waitForTimeout(500)
  assert.equal(new URL(lessonPresenter.url()).hash.split('?')[0], presenterSlide, 'viewer navigation cannot rewind the presenter')
  await lessonPresenter.keyboard.press('ArrowDown')
  await lessonPresenter.waitForURL(url => url.hash.split('?')[0] === '#/presenter/griglie-layout-relazioni-appuntamenti')
  await lessonViewer.waitForURL(url => url.hash.split('?')[0] === '#/griglie-layout-relazioni-appuntamenti')
  await lessonPresenter.keyboard.press('ArrowUp')
  await lessonPresenter.waitForURL(url => url.hash.split('?')[0] === presenterSlide)
  await lessonViewer.waitForURL(url => url.hash.split('?')[0] === presenterSlide.replace('/presenter/', '/'))
  console.log('PASS: presenter controls forward/back navigation despite stale settings and viewer reloads')
  await lesson.close()
  assert.deepEqual(errors.filter(message => message !== 'Wake Lock permission request denied'), [])
} finally {
  await browser?.close()
  if (server) await new Promise(resolve => server.close(resolve))
}
