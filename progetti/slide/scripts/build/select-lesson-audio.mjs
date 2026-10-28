// Select complete, verified generations without making any API calls.
import assert from 'node:assert/strict'
import { readFile, writeFile, rename } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { parseArgs } from 'node:util'
import { resolveSlideAudioSettings, stripAudioDelivery } from './audio-delivery.mjs'

const { values } = parseArgs({ options: { lesson: { type: 'string' }, 'allow-partial': { type: 'boolean', default: false } } })
const directory = { 'griglie-layout': 'lezione-griglie', 'composizione-gerarchia': 'lezione-composizione' }[values.lesson]
assert.ok(directory, 'Indicare --lesson griglie-layout oppure composizione-gerarchia')
const base = `progetti/slide/assets/booklet/${directory}/`
const historyPath = `progetti/slide/assets/audio/${directory}/manifest.json`
const read = async file => JSON.parse(await readFile(file, 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const manifest = await read(base + 'manifest.json')
const history = await read(historyPath)
const notes = await read(manifest.speakerNotesSource)
const original = await read(manifest.speakerNotesOriginalSource)
const settingsSource = 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json'
const configuration = await read(settingsSource)
assert.equal(history.lesson, manifest.lesson)
assert.equal(history.notesSource, manifest.speakerNotesSource)
assert.equal(history.settingsSource, settingsSource)
const clips = {}
const pendingGeneration = []
for (const slide of manifest.slides) {
  if (slide.narrationEnabled === false) continue
  const settings = resolveSlideAudioSettings(configuration, slide.alias)
  const fingerprint = hash(JSON.stringify({ text: notes[slide.alias], settings }))
  const receipt = history.clips.findLast(clip => clip.alias === slide.alias && clip.fingerprint === fingerprint)
  if (!receipt && values['allow-partial']) {
    pendingGeneration.push(slide.alias)
    continue
  }
  assert.ok(receipt, slide.alias + ': generazione corrente mancante')
  assert.ok(receipt.file.startsWith(`progetti/slide/assets/audio/${directory}/`))
  assert.equal(receipt.text, notes[slide.alias])
  assert.equal(stripAudioDelivery(receipt.text), original[slide.alias])
  assert.deepEqual(receipt.settings, settings)
  const bytes = await readFile(receipt.file)
  assert.equal(hash(bytes), receipt.audioSha256)
  assert.equal(bytes.length, receipt.bytes)
  const probe = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'a:0', '-show_entries',
    'stream=codec_name,sample_rate,bit_rate:format=duration', '-of', 'json', receipt.file], { encoding: 'utf8' })
  assert.equal(probe.status, 0, receipt.file + ': metadati audio illeggibili')
  const metadata = JSON.parse(probe.stdout), stream = metadata.streams[0]
  assert.equal(stream.codec_name, 'mp3')
  assert.equal(Number(stream.sample_rate), 44100)
  assert.equal(Number(stream.bit_rate), 128000)
  const decoded = spawnSync('ffmpeg', ['-v', 'error', '-i', receipt.file, '-f', 'null', '-'], { encoding: 'utf8' })
  assert.equal(decoded.status, 0, receipt.file + ': decodifica incompleta')
  assert.equal(decoded.stderr.trim(), '', receipt.file + ': errore nella registrazione')
  receipt.durationSeconds = Number(metadata.format.duration)
  assert.ok(Number.isFinite(receipt.durationSeconds) && receipt.durationSeconds > 0)
  clips[slide.alias] = { source: receipt.file, web: `/audio/${directory}/` + receipt.file.split('/').at(-1),
    sha256: receipt.audioSha256, durationSeconds: receipt.durationSeconds }
}
assert.equal(Object.keys(clips).length + pendingGeneration.length, manifest.slides.filter(slide => slide.narrationEnabled !== false).length)
assert.ok(Object.keys(clips).length > 0, 'Nessuna registrazione corrente verificata')
// Commit only after every recording has passed; preserve interrupted generation receipts.
await writeFile(historyPath + '.tmp', JSON.stringify(history, null, 2) + '\n')
await rename(historyPath + '.tmp', historyPath)
await writeFile(base + 'audio-approved.json.tmp', JSON.stringify({ version: 1, lesson: manifest.lesson, clips, pendingGeneration }, null, 2) + '\n')
await rename(base + 'audio-approved.json.tmp', base + 'audio-approved.json')
console.log(JSON.stringify({ lesson: manifest.lesson, clips: Object.keys(clips).length, pendingGeneration: pendingGeneration.length,
  durationSeconds: Object.values(clips).reduce((sum, clip) => sum + clip.durationSeconds, 0),
  decoded: true, settingsSource }, null, 2))
