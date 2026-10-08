import { execFile } from 'node:child_process'
import { readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import vm from 'node:vm'

const folder = path.resolve('esempi/caffe-luce')
const sandbox = { window: {} }
vm.runInNewContext(await readFile(path.join(folder, 'immagini.js'), 'utf8'), sandbox)
vm.runInNewContext(await readFile(path.join(folder, 'stili.js'), 'utf8'), sandbox)
const compile = promisify(execFile)
const cli = path.resolve('node_modules/@tailwindcss/cli/dist/index.mjs')
for (const name of ['transitions','design-notes']) {
  await compile(process.execPath, [cli,
    '-i', path.join(folder, 'styles', `${name}.source.css`),
    '-o', path.join(folder, 'styles', `${name}.css`),
    '--minify',
  ])
}

for (const { id } of sandbox.window.CAFFE_STYLES) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`Invalid stylesheet ID: ${id}`)
  await compile(process.execPath, [cli,
    '-i', path.join(folder, 'styles', `${id}.source.css`),
    '-o', path.join(folder, 'styles', `${id}.css`),
    '--minify',
  ])
}
await rm(path.join(folder, 'styles.css'), { force: true })
console.log(`Caffè TTC: ${sandbox.window.CAFFE_STYLES.length} CSS autonomi compilati.`)
