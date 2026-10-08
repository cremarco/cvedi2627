import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const folder = path.resolve('esempi/caffe-luce')
const catalogue = JSON.parse(await readFile(path.join(folder, 'stili.json'), 'utf8'))
const notes = JSON.parse(await readFile(path.join(folder, 'design-notes.json'), 'utf8')).styles
const ids = catalogue.styles.map(style => style.id)
if (Object.keys(notes).length !== ids.length) throw new Error('Design notes must match the active catalogue')
for (const id of ids) {
  if (!notes[id]?.intro?.trim() || !Array.isArray(notes[id].features) || notes[id].features.length !== 4 || notes[id].features.some(feature => !feature.label?.trim() || !feature.text?.trim())) throw new Error(`Incomplete design notes: ${id}`)
}
await writeFile(path.join(folder, 'design-notes-data.js'), `/* Generated from design-notes.json. */\nwindow.CAFFE_STYLE_NOTES_DATA = ${JSON.stringify(notes, null, 2)};\n`)
console.log(`Note di design: ${ids.length} varianti.`)
