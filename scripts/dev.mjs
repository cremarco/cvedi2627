import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { mkdir, writeFile } from 'node:fs/promises'
import { deckCatalog } from './build/lesson-decks.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))
const args = process.argv.slice(2)
const full = args.includes('--full')
const catalogFile = fileURLToPath(new URL('../.slidev/decks-dev.json', import.meta.url))
if (!full) {
  await mkdir(fileURLToPath(new URL('../.slidev/', import.meta.url)), { recursive: true })
  await writeFile(catalogFile, JSON.stringify(await deckCatalog('dev')))
}
const env = { ...process.env }
for (const key of ['CVEDI_DECK', 'CVEDI_DECK_ROUTES', 'CVEDI_SHARED_ASSETS', 'VITE_CVEDI_DECK', 'VITE_CVEDI_MENU_BASE', 'VITE_CVEDI_ASSET_BASE']) delete env[key]
if (!full) Object.assign(env, { CVEDI_DECK: 'apertura', VITE_CVEDI_DECK: 'apertura', VITE_CVEDI_MENU_BASE: '/', CVEDI_DECK_ROUTES: catalogFile })
const cssArgs = ['node_modules/@tailwindcss/cli/dist/index.mjs', '-i', 'styles/daisy.css', '-o', 'styles/daisy-built.css']
const initialCSS = spawnSync(process.execPath, cssArgs, { cwd: root, stdio: 'inherit' })
if (initialCSS.status !== 0) process.exit(initialCSS.status ?? 1)

// Compile utility classes added to slides or Vue components without restarting Slidev.
const children = [
  spawn(process.execPath, [...cssArgs, '--watch=always'], { cwd: root, stdio: 'inherit' }),
  spawn(process.execPath, ['node_modules/@slidev/cli/bin/slidev.mjs', ...args.filter(arg => arg !== '--full')], { cwd: root, stdio: 'inherit', env }),
]
let stopping = false
function stop(code = 0) {
  if (stopping) return
  stopping = true
  for (const child of children) child.kill('SIGTERM')
  process.exitCode = code
}
for (const child of children) {
  child.on('error', error => { console.error(error); stop(1) })
  child.on('exit', code => stop(code ?? 0))
}
process.on('SIGINT', () => stop())
process.on('SIGTERM', () => stop())
