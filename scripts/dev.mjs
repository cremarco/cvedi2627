import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const cssArgs = ['node_modules/@tailwindcss/cli/dist/index.mjs', '-i', 'styles/daisy.css', '-o', 'styles/daisy-built.css']
const initialCSS = spawnSync(process.execPath, cssArgs, { cwd: root, stdio: 'inherit' })
if (initialCSS.status !== 0) process.exit(initialCSS.status ?? 1)

// Compile utility classes added to slides or Vue components without restarting Slidev.
const children = [
  spawn(process.execPath, [...cssArgs, '--watch=always'], { cwd: root, stdio: 'inherit' }),
  spawn(process.execPath, ['node_modules/@slidev/cli/bin/slidev.mjs', '--open', ...process.argv.slice(2)], { cwd: root, stdio: 'inherit' }),
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
