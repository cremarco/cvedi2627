import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { chromium } from 'playwright-chromium'
import { examples, sources, customTheme, exampleThemeSetup, exampleThemeOverrides } from '../../data/esercitazioni/framework-curriculum.mjs'

const folder = 'assets/esercitazioni/tailwind-daisyui'
const manifest = JSON.parse(await readFile('assets/esercitazioni/manifest.json', 'utf8'))
await mkdir(`${folder}/examples`, { recursive: true })
await mkdir(`${folder}/originals`, { recursive: true })
const withSources = css => css.replace('@import "tailwindcss";', '@import "tailwindcss" source(none);\n@source "./examples";\n@source "../../../data/esercitazioni/native-examples.mjs";')
const baseCSS = withSources(exampleThemeSetup)
const customCSS = withSources(customTheme + '\n' + exampleThemeOverrides)
for (const [key, example] of Object.entries(examples)) {
  const html = `<!doctype html><html lang="it" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="../${example.custom ? 'custom' : 'render'}.css"><style>html{font-size:24px}body{margin:0;background:var(--color-base-100);color:var(--color-base-content);font-family:ui-sans-serif,system-ui,sans-serif}.demo-stage{box-sizing:border-box;width:100%;height:420px;padding:32px;display:grid;align-items:center}*,*::before,*::after{animation-play-state:paused!important}table{font-size:24px!important}form{margin:0}dialog .modal-box{max-height:390px}</style></head><body><main class="demo-stage">${example.html}</main></body></html>`
  await writeFile(`${folder}/examples/${key}.html`, html)
}
for (const [name, css] of [['render', baseCSS], ['custom', customCSS]]) {
  await writeFile(`${folder}/${name}.source.css`, css)
  execFileSync(process.execPath, ['node_modules/@tailwindcss/cli/dist/index.mjs', '-i', `${folder}/${name}.source.css`, '-o', `${folder}/${name}.css`, '--minify'], { stdio: 'inherit' })
}
if (manifest.nativeRebuild) {
  const catalog = JSON.parse(await readFile(`${folder}/sources.json`, 'utf8'))
  catalog.sources = Object.entries(sources).map(([id, [title, url]]) => ({ id, title, url }))
  catalog.nativeExamples = await Promise.all(Object.keys(examples).map(async id => {
    const source = `${folder}/examples/${id}.html`
    return { id, source, sourceSha256: createHash('sha256').update(await readFile(source)).digest('hex'), renderer: 'data/esercitazioni/native-examples.mjs', rights: 'Esempio originale CVeDI, HTML e CSS nativi.' }
  }))
  await writeFile(`${folder}/sources.json`, JSON.stringify(catalog, null, 2) + '\n')
  console.log('Native HTML and CSS regenerated; retained bitmap archive unchanged.')
  process.exit(0)
}
const browser = await chromium.launch()
const assets = []
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 420 }, deviceScaleFactor: 2 })
  for (const [key, example] of Object.entries(examples)) {
    const file = `${process.cwd()}/${folder}/examples/${key}.html`
    await page.goto(`file://${file}`)
    await page.evaluate(() => document.fonts.ready)
    if (example.focus) await page.locator(example.focus).focus()
    if (example.modal) await page.locator(`#${example.modal}`).evaluate(dialog => dialog.showModal())
    if (example.comparison) {
      // Each iframe has its own real viewport, so responsive media queries run.
      const html = await readFile(file, 'utf8')
      const document = html.replace('../render.css', `file://${process.cwd()}/${folder}/render.css`)
      const escaped = document.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
      await page.setViewportSize({ width: 1228, height: 474 })
      await page.setContent(`<html><body style="margin:0;font:24px system-ui;background:white"><div style="display:flex;gap:24px"><div><p style="margin:8px 0">Viewport: 820px</p><iframe title="Ampio" style="border:0;width:820px;height:420px" srcdoc="${escaped}"></iframe></div><div><p style="margin:8px 0">Viewport: 360px</p><iframe title="Stretto" style="border:0;width:360px;height:420px" srcdoc="${escaped}"></iframe></div></div></body></html>`)
      await Promise.all(page.frames().map(frame => frame.evaluate(() => document.fonts.ready)))
    }
    await page.evaluate(async () => {
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      for (const animation of document.getAnimations()) {
        if (animation.timeline?.constructor.name !== 'DocumentTimeline') continue
        if (Number.isFinite(animation.effect.getComputedTiming().endTime)) animation.finish()
        else animation.currentTime = 500
      }
      await new Promise(resolve => requestAnimationFrame(resolve))
    })
    const png = `${folder}/originals/${key}.png`
    const web = `public/images/esercitazioni/framework-${key}.webp`
    await page.screenshot({ path: png })
    execFileSync('/opt/homebrew/bin/cwebp', ['-quiet', '-lossless', '-exact', png, '-o', web])
    const sha = path => readFile(path).then(data => createHash('sha256').update(data).digest('hex'))
    assets.push({ id: key, source: `${folder}/examples/${key}.html`, original: png, web: `/${web.replace(/^public\//, '')}`, sha256: await sha(web), originalSha256: await sha(png), rights: 'Esempio originale CVeDI, reso localmente con Tailwind CSS e daisyUI. Nessuna schermata di terzi.' })
    await page.setViewportSize({ width: 1000, height: 420 })
  }
} finally { await browser.close() }
await writeFile(`${folder}/sources.json`, JSON.stringify({ checkedOn: '2026-10-21', scope: 'Tailwind CSS 4; daisyUI 5', sources: Object.entries(sources).map(([id, [title, url]]) => ({ id, title, url })), assets }, null, 2) + '\n')
console.log(`${assets.length} original examples rendered`)
