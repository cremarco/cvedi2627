import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'
import { createWriteStream } from 'node:fs'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { parseArgs } from 'node:util'

const root = new URL('../../../../', import.meta.url)
const settingsSource = 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json'
const notesSource = 'progetti/slide/assets/booklet/lezione-griglie/speaker-notes.json'
const directory = 'progetti/slide/assets/audio/lezione-griglie/'
const manifestPath = directory + 'manifest.json'
const json = async path => JSON.parse(await readFile(new URL(path, root), 'utf8'))
const hash = value => createHash('sha256').update(value).digest('hex')

async function generate() {
  const { values } = parseArgs({ options: {
    slides: { type: 'string' }, generate: { type: 'boolean', default: false },
  } })
  if (!values.slides || !/^\d+(,\d+)*$/.test(values.slides))
    throw new Error('Indicare esplicitamente --slides 1,2,3; --generate abilita le chiamate a consumo.')

  const [lesson, notes, settings] = await Promise.all([
    json('progetti/slide/assets/booklet/lezione-griglie/manifest.json'), json(notesSource), json(settingsSource),
  ])
  const selection = [...new Set(values.slides.split(',').map(Number))].sort((a, b) => a - b)
  const jobs = selection.map(number => {
    const slide = lesson.slides.find(slide => slide.lessonSlide === number)
    if (!slide || !/^[a-z0-9-]+$/.test(slide.alias) || !notes[slide.alias]?.trim())
      throw new Error(`Slide ${number}: alias o copione mancante.`)
    const text = notes[slide.alias]
    const fingerprint = hash(JSON.stringify({ text, settings }))
    return { slide, text, fingerprint }
  })
  console.log(`Selezione: ${selection.join(', ')}; ${jobs.reduce((sum, job) => sum + job.text.length, 0)} caratteri; ${settings.voiceName}, ${settings.modelId}.`)
  if (!values.generate) return console.log('Solo anteprima: nessun audio richiesto all’API.')
  if (!process.env.ELEVENLABS_API_KEY) throw new Error('Chiave ElevenLabs non caricata nell’ambiente.')

  let manifest
  try { manifest = await json(manifestPath) }
  catch (error) {
    if (error.code !== 'ENOENT') throw error
    manifest = { version: 1, lesson: lesson.lesson, notesSource, settingsSource, clips: [] }
  }
  if (manifest.version !== 1 || manifest.lesson !== lesson.lesson || !Array.isArray(manifest.clips))
    throw new Error('Manifest audio non compatibile.')

  await mkdir(new URL(directory, root), { recursive: true })
  const client = new ElevenLabsClient()
  for (const { slide, text, fingerprint } of jobs) {
    const existing = manifest.clips.find(clip => clip.alias === slide.alias && clip.fingerprint === fingerprint)
    if (existing) {
      if (hash(await readFile(new URL(existing.file, root))) !== existing.audioSha256)
        throw new Error(`Slide ${slide.lessonSlide}: il file audio esistente non corrisponde al manifest.`)
      console.log(`Slide ${slide.lessonSlide}: audio già presente; nessuna chiamata API.`)
      continue
    }
    const file = `${directory}${String(slide.lessonSlide).padStart(2, '0')}-${slide.alias}-${fingerprint.slice(0, 12)}.mp3`
    const target = new URL(file, root)
    // Keep interrupted downloads separate and preserve previous generations.
    const temporary = new URL(`${file}.${Date.now()}.part`, root)
    console.log(`Slide ${slide.lessonSlide}: generazione in corso.`)
    const audio = await client.textToSpeech.convert(settings.voiceId, {
      text, modelId: settings.modelId, languageCode: settings.languageCode,
      outputFormat: settings.outputFormat, voiceSettings: settings.voiceSettings,
    }, { maxRetries: 0, timeoutInSeconds: 180 })
    await pipeline(Readable.fromWeb(audio), createWriteStream(temporary, { flags: 'wx' }))
    const bytes = await readFile(temporary)
    if (bytes.length < 1000) throw new Error(`Slide ${slide.lessonSlide}: risposta audio incompleta.`)
    await rename(temporary, target)
    manifest.clips.push({
      slide: slide.lessonSlide, alias: slide.alias, title: slide.title,
      file, generatedAt: new Date().toISOString(), settings,
      text, submittedCharacters: text.length, textSha256: hash(text),
      fingerprint, bytes: bytes.length, audioSha256: hash(bytes),
    })
    const manifestTemporary = new URL(manifestPath + '.tmp', root)
    await writeFile(manifestTemporary, JSON.stringify(manifest, null, 2) + '\n')
    await rename(manifestTemporary, new URL(manifestPath, root))
    console.log(`Slide ${slide.lessonSlide}: salvata (${bytes.length} byte).`)
  }
}

generate().catch(error => {
  // Do not serialize SDK errors: they can contain request or credential details.
  if (error.statusCode) {
    const detail = error.body?.detail
    console.error(`ElevenLabs: HTTP ${error.statusCode}${typeof detail?.status === 'string' ? ` (${detail.status})` : ''}.`)
  } else console.error(error.message || 'Generazione audio non riuscita.')
  process.exitCode = 1
})
