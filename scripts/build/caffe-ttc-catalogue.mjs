import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'

const folder = path.resolve('esempi/caffe-luce')
const catalogue = JSON.parse(await readFile(path.join(folder, 'stili.json'), 'utf8'))
const sandbox = { window: {} }
vm.runInNewContext(await readFile(path.join(folder, 'immagini.js'), 'utf8'), sandbox)
const ids = new Set()
const styles = catalogue.styles.map(style => {
  if (!/^[a-z0-9-]+$/.test(style.id) || ids.has(style.id)) throw new Error(`Invalid or duplicate style: ${style.id}`)
  ids.add(style.id)
  if (!/^\d{4}–\d{4}$/.test(style.years)) throw new Error(`Missing year range: ${style.id}`)
  const image = style.image || (style.imageId ? sandbox.window.CAFFE_IMAGES[style.imageId] : undefined)
  if (style.imageId && !image) throw new Error(`Missing image set: ${style.id}`)
  return { ...style, image }
})
await writeFile(path.join(folder, 'stili.js'), `/* Generated from stili.json. */\nwindow.CAFFE_STYLES = ${JSON.stringify(styles, null, 2)};\n`)
console.log(`Catalogo TTC: ${styles.length} varianti, con anni e fonti.`)
