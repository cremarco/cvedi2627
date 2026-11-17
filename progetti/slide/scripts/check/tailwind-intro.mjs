import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile, copyFile, chmod, mkdir, rm } from 'node:fs/promises'
import { execFileSync, spawn } from 'node:child_process'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { introCommands, introDocument, introFragments, introInputCSS, introOutline, introPlayURL } from '../../data/esercitazioni/tailwind-intro.mjs'
import { openSlide } from '../../../../scripts/check/browser.mjs'

const base = (process.env.EXERCISE_URL || 'http://localhost:3055').replace(/\/$/, '')
const output = 'reports/esercitazione05'
await mkdir(output, { recursive: true })
const report = { status: 'running', checks: [], screenshots: [] }
const temp = await mkdtemp(path.join(tmpdir(), 'cvedi-tailwind-'))
const slides = JSON.parse(await readFile('progetti/slide/data/esercitazioni/05.json', 'utf8'))
const browser = await chromium.launch()
let watcher
try {
  const sections = slides.filter(slide => slide.kind === 'divider')
  assert.deepEqual(sections.map(slide => slide.title), introOutline, 'the active lesson follows the three agreed sections in order')
  const order = ['Tre modi per usare Tailwind', 'Proviamo Tailwind nel playground', 'Che cos’è una CDN', 'CDN', 'Installare Tailwind sul computer', 'Che cos’è il terminale', '1 · Scarichiamo la CLI standalone'].map(title => slides.findIndex(slide => slide.title === title))
  assert.ok(order.every((index, i) => index >= 0 && (i === 0 || index > order[i - 1])), 'the same example is taught in Play before CDN and local installation')
  const playground = JSON.parse(await readFile('progetti/slide/assets/esercitazioni/tailwind-intro/esempio/playground.json', 'utf8'))
  assert.equal(playground.url, introPlayURL)
  assert.equal(playground.css, introInputCSS)
  assert.equal(playground.html, `<body class="font-sans text-emerald-950">\n${introFragments.first}\n</body>`)
  const cdn = introDocument('cdn'), local = introDocument('local')
  assert.equal(cdn.split('<body')[1], local.split('<body')[1], 'the first local page preserves the exact CDN body')
  assert.ok(!local.includes('cdn.jsdelivr.net') && local.includes('./output.css'), 'the local page replaces the CDN with the generated stylesheet')
  const sourceDirectory = 'progetti/slide/assets/esercitazioni/tailwind-intro/esempio'
  assert.equal(await readFile(`${sourceDirectory}/cdn/index.html`, 'utf8'), cdn)
  assert.equal(await readFile(`${sourceDirectory}/locale/index.html`, 'utf8'), local)
  assert.ok(!slides.some(slide => /Node\.js|\bnpm (?:init|install)|\bnpx |package\.json/.test(JSON.stringify(slide.blocks))), 'the active deck needs no Node.js or npm')
  report.checks.push('three sections in order; identical page body from CDN to local installation')

  // Exercise the downloaded standalone executable in an empty student project.
  const binary = process.env.TAILWIND_STANDALONE
  assert.ok(binary, 'set TAILWIND_STANDALONE to an official downloaded executable')
  const executable = process.platform === 'win32' ? 'tailwindcss.exe' : 'tailwindcss'
  await copyFile(path.resolve(binary), `${temp}/${executable}`)
  await chmod(`${temp}/${executable}`, 0o755)
  await writeFile(`${temp}/index.html`, local)
  await writeFile(`${temp}/input.css`, introInputCSS)
  const build = process.platform === 'win32' ? introCommands.windowsBuild : introCommands.build
  const watch = process.platform === 'win32' ? introCommands.windowsWatch : introCommands.watch
  execFileSync(`${temp}/${executable}`, build.split(' ').slice(1), { cwd: temp, stdio: 'pipe' })
  assert.ok((await readFile(`${temp}/output.css`, 'utf8')).includes('.p-4'))
  watcher = spawn(`${temp}/${executable}`, watch.split(' ').slice(1), { cwd: temp, stdio: ['pipe', 'pipe', 'pipe'] })
  let messages = ''
  watcher.stderr.on('data', data => { messages += data })
  const until = async predicate => {
    const deadline = Date.now() + 15000
    while (!(await predicate())) {
      assert.ok(Date.now() < deadline, 'the compilation completes within 15 seconds')
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  await until(() => messages.includes('Done'))
  await writeFile(`${temp}/index.html`, local.replace('p-4', 'p-8'))
  await until(async () => (await readFile(`${temp}/output.css`, 'utf8')).includes('.p-8'))
  await new Promise(resolve => { watcher.once('close', resolve); watcher.kill('SIGINT') })
  assert.ok(watcher.signalCode === 'SIGINT' || watcher.exitCode === 0)
  watcher = undefined
  report.checks.push('standalone CLI in an empty project without packages; --watch rebuild after saving HTML; Ctrl+C stops the process')

  const page = await browser.newPage({ viewport: { width: 1000, height: 720 }, reducedMotion: 'reduce' })
  const articleStyles = () => page.evaluate(() => {
    const styles = selector => {
      const style = getComputedStyle(document.querySelector(selector))
      return Object.fromEntries(['paddingTop', 'backgroundColor', 'fontSize', 'fontWeight', 'marginTop', 'color', 'fontFamily'].map(key => [key, style[key]]))
    }
    return { article: styles('body > article'), title: styles('article h1'), paragraph: styles('article p') }
  })
  await page.goto(`${base}/images/esercitazioni/esercizio-05/cdn/index.html`)
  await page.waitForFunction(() => getComputedStyle(document.querySelector('article')).paddingTop === '16px', { timeout: 30000 })
  const cdnStyles = await articleStyles()
  await page.screenshot({ path: `${output}/pagina-cdn.png` })
  await page.goto(`${base}/images/esercitazioni/esercizio-05/locale/index.html`)
  await page.waitForFunction(() => getComputedStyle(document.querySelector('article')).paddingTop === '16px')
  assert.deepEqual(await articleStyles(), cdnStyles, 'the browser result is the same with the live Play CDN and local CSS')
  await page.screenshot({ path: `${output}/pagina-locale.png` })
  report.checks.push('live Play CDN and compiled local CSS produce identical computed article styles')

  for (const [width, columns] of [[390, 1], [680, 2], [1280, 4]]) {
    await page.setViewportSize({ width, height: 720 })
    await page.goto(`${base}/images/esercitazioni/esercizio-05/responsive/index.html`)
    const program = page.locator('section[aria-label="Programma"] > div')
    assert.equal(await program.evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length), columns)
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    await page.screenshot({ path: `${output}/pagina-responsive-${width}.png` })
  }
  report.checks.push('the developed example uses 1, 2 and 4 program columns at actual narrow, medium and wide viewports')

  const inspection = ['Introduzione a Tailwind CSS', 'Tre modi per usare Tailwind', 'Proviamo Tailwind nel playground', 'CDN', 'Prompt, comando e risposta', '1 · Scarichiamo la CLI standalone', '2 · Prepariamo l’eseguibile', '4 · Generiamo il CSS', '6 · Aggiorniamo il CSS a ogni modifica', 'I breakpoint predefiniti']
  await page.setViewportSize({ width: 1280, height: 720 })
  for (const title of inspection) {
    const no = slides.find(slide => slide.title === title && slide.kind === 'content').number
    const root = await openSlide(page, `${base}/lezioni/esercitazione-05`, no, { settle: true })
    await root.locator('[data-exercise-slide]').waitFor()
    const screenshot = `${output}/slide-${no}-desktop.png`
    await page.screenshot({ path: screenshot })
    report.screenshots.push(screenshot)
  }
  const archive = await page.request.get(`${base}/images/esercitazioni/esercizio-05/laboratorio-tailwind.zip`)
  assert.equal(archive.status(), 200)
  assert.equal((await archive.body()).subarray(0, 2).toString(), 'PK')
  report.checks.push('downloadable example archive is accessible')
  report.status = 'passed'
} catch (error) {
  report.status = 'failed'
  report.error = error.stack
  throw error
} finally {
  watcher?.kill('SIGINT')
  await browser.close()
  await rm(temp, { recursive: true, force: true })
  await writeFile(`${output}/workflow.json`, JSON.stringify(report, null, 2) + '\n')
}
console.log(JSON.stringify(report, null, 2))
