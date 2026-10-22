// Stesso ingresso per terminale, attività dell'editor e CI.
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../../', import.meta.url))
const local = `${root}progetti/booklet/.venv/${process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python3'}`
const python = process.env.BOOKLET_PYTHON || (existsSync(local) ? local : 'python3')
const result = spawnSync(python, [`${root}progetti/booklet/scripts/booklet.py`, ...process.argv.slice(2)], {
  cwd: root, stdio: 'inherit',
})
if (result.error) console.error(`Impossibile avviare Python: ${result.error.message}`)
process.exit(result.status ?? 1)
