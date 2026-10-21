import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { readFile } from 'node:fs/promises'
import { examples } from '../../data/esercitazioni/framework-curriculum.mjs'
import { renderNativeDocument } from '../../data/esercitazioni/native-examples.mjs'
import { chromium } from 'playwright-chromium'
import { checkExerciseSources } from './exercise-sources.mjs'

const report = { sources: await checkExerciseSources(), checks: [], errors: [] }
const browser = await chromium.launch()
const baseCSS = await readFile('assets/esercitazioni/tailwind-daisyui/render.css', 'utf8')
const customCSS = await readFile('assets/esercitazioni/tailwind-daisyui/custom.css', 'utf8')
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 420 } })
  page.on('pageerror', error => report.errors.push(error.message))
  const go = example => page.setContent(renderNativeDocument(examples[example], baseCSS, customCSS))
  await go('buttons')
  assert.equal(await page.getByRole('button', { name: 'Non disponibile' }).isDisabled(), true)
  report.checks.push('disabled button is native')
  await go('form')
  const name = page.getByLabel('Nome e cognome', { exact: true }), email = page.getByLabel('Email', { exact: true })
  assert.equal(await email.evaluate(node => node.checkValidity()), false)
  await page.getByRole('button', { name: 'Iscriviti', exact: true }).click()
  assert.equal(await page.getByRole('status').textContent(), '', 'invalid data must not produce a success message')
  await name.fill('Esempio didattico')
  await email.fill('studente@example.org')
  assert.equal(await email.evaluate(node => node.checkValidity()), true)
  await page.getByRole('button', { name: 'Iscriviti', exact: true }).click()
  assert.equal(await page.getByRole('status').textContent(), 'Dati ricevuti nell’esempio locale.')
  assert.ok(await page.locator('main').evaluate(node => node.scrollHeight <= 396), 'submitted form fits its example viewport')
  report.checks.push('visible labels, native constraints and announced local confirmation')
  await go('validation')
  assert.equal(await page.getByLabel('Email', { exact: true }).getAttribute('aria-invalid'), 'true')
  assert.equal(await page.getByLabel('Email', { exact: true }).getAttribute('aria-describedby'), 'email-errore')
  assert.ok((await page.locator('#email-errore').textContent()).includes('nome@esempio.it'))
  report.checks.push('error is linked to the input and gives a correction')
  await go('selection')
  await page.getByLabel('Scegli un turno').selectOption({ label: 'Pomeriggio' })
  await page.getByLabel('Ricevi il promemoria').uncheck()
  assert.equal(await page.getByLabel('Ricevi il promemoria').isChecked(), false)
  report.checks.push('native select and checkbox work independently')
  await go('dropdown')
  await page.locator('summary').focus()
  await page.keyboard.press('Enter')
  assert.equal(await page.locator('details').evaluate(node => node.open), false)
  await page.keyboard.press('Enter')
  assert.equal(await page.locator('details').evaluate(node => node.open), true)
  report.checks.push('disclosure opens and closes from the keyboard')
  await go('modal')
  assert.equal(await page.locator('dialog').evaluate(node => node.open), false, 'entering the slide must not open a modal')
  await page.getByRole('button', { name: 'Apri', exact: true }).focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Posto prenotato' })
  await dialog.waitFor()
  await page.keyboard.press('Escape')
  assert.equal(await page.locator('dialog').evaluate(node => node.open), false)
  assert.equal(await page.getByRole('button', { name: 'Apri', exact: true }).evaluate(node => document.activeElement === node), true)
  await page.emulateMedia({ media: 'print' })
  await page.waitForFunction(() => document.querySelector('dialog').open)
  await page.emulateMedia({ media: 'screen' })
  await page.waitForFunction(() => !document.querySelector('dialog').open)
  report.checks.push('dialog opens on request, Escape restores focus and print retains its contents')
  report.contrast = []
  for (const example of ['colors', 'validation', 'buttons', 'themes']) {
    await go(example)
    const nodes = page.locator('button:not(:disabled), .text-error')
    for (const node of await nodes.all()) {
      for (const state of ['rest', 'hover']) {
        if (state === 'hover') await node.hover()
        await node.evaluate(node => Promise.all(node.getAnimations().filter(animation => Number.isFinite(animation.effect?.getComputedTiming().endTime)).map(animation => animation.finished.catch(() => {}))))
        const measurement = await node.evaluate(node => {
          const context = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
          const rgb = color => { context.clearRect(0, 0, 1, 1); context.fillStyle = color; context.fillRect(0, 0, 1, 1); return [...context.getImageData(0, 0, 1, 1).data] }
          const luminance = color => color.slice(0, 3).map(value => { const v = value / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0)
          let background = [255, 255, 255]
          const ancestors = []; for (let n = node; n; n = n.parentElement) ancestors.unshift(n)
          for (const element of ancestors) { const c = rgb(getComputedStyle(element).backgroundColor), alpha = c[3] / 255; background = background.map((v, i) => c[i] * alpha + v * (1 - alpha)) }
          const foreground = rgb(getComputedStyle(node).color), alpha = foreground[3] / 255
          const text = foreground.slice(0, 3).map((value, i) => value * alpha + background[i] * (1 - alpha))
          const values = [luminance(text), luminance(background)].sort((a, b) => b - a)
          return { text: node.textContent.trim(), ratio: (values[0] + .05) / (values[1] + .05) }
        })
        report.contrast.push({ example, state, ...measurement })
      }
      await page.mouse.move(0, 0)
    }
  }
  assert.ok(report.contrast.every(item => item.ratio >= 4.5), `Text contrast below 4.5: ${JSON.stringify(report.contrast.filter(item => item.ratio < 4.5))}`)
  report.checks.push('text/background pairs in the revised examples reach 4.5:1 at rest and on hover')
  await go('themes')
  const backgrounds = await page.locator('[data-theme] section, section[data-theme]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor))
  assert.equal(backgrounds.length, 2)
  assert.notEqual(backgrounds[0], backgrounds[1])
  report.checks.push('light and dark sections use distinct semantic surfaces')
  await go('responsive')
  const wide = page.locator('iframe[title="Viewport ampio"]').contentFrame()
  const narrow = page.locator('iframe[title="Viewport stretto"]').contentFrame()
  const columns = async frame => frame.locator('main > div').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length)
  assert.equal(await columns(wide), 2)
  assert.equal(await columns(narrow), 1)
  report.checks.push('the same Grid changes from two columns to one at a real narrow viewport')
  assert.deepEqual(report.errors, [])
  report.status = 'passed'
} finally {
  await browser.close()
  await mkdir('reports/frameworks', { recursive: true })
  await writeFile('reports/frameworks/examples-check.json', JSON.stringify(report, null, 2) + '\n')
}
console.log(JSON.stringify(report, null, 2))
