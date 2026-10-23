import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { applyAudioDelivery, stripAudioDelivery, resolveSlideAudioSettings } from '../build/audio-delivery.mjs'

test('slide three preserves every script character and has a separate generation identity', async () => {
  const base = new URL('../../assets/booklet/lezione-griglie/', import.meta.url)
  const notes = JSON.parse(await readFile(new URL('speaker-notes-original.json', base), 'utf8'))
  const profile = JSON.parse(await readFile(new URL('audio-delivery-trial.json', base), 'utf8'))
  const text = notes['griglie-layout-obiettivi']
  const history = JSON.parse(await readFile(new URL('../../assets/audio/lezione-griglie/manifest.json', import.meta.url), 'utf8'))
  const baseline = [...history.clips, ...(history.archivedClips ?? [])].find(clip => clip.alias === 'griglie-layout-obiettivi' && clip.text === text && !clip.submittedText)
  assert.ok(baseline, 'the original generation receipt remains preserved')
  const settings = baseline.settings
  const submitted = applyAudioDelivery(text, profile.slides['griglie-layout-obiettivi'])
  assert.equal(submitted.replace(/\[[^\]\r\n]+\]/g, ''), text)
  assert.equal((submitted.match(/\[(?:short pause|pause|long pause)\]/g) || []).length, 6)
  const hash = text => createHash('sha256').update(JSON.stringify({ text, settings })).digest('hex')
  assert.notEqual(hash(submitted), hash(text))
  assert.equal(baseline.fingerprint, hash(text), 'historical identity uses the settings actually used for that recording')
})

test('unmatched or ambiguous anchors cannot submit a changed script', () => {
  const direction = after => ({ tone: 'warm, conversational tone', pauses: [{ after, tag: 'pause' }] })
  assert.throws(() => applyAudioDelivery('Una frase.', direction('Diversa.')), /una sola volta/)
  assert.throws(() => applyAudioDelivery('Una frase. Una frase.', direction('Una frase.')), /una sola volta/)
})

test('duplicate pause positions and embedded markup are rejected before generation', () => {
  const pause = { after: 'Una frase.', tag: 'short pause' }
  assert.throws(() => applyAudioDelivery('Una frase.', { tone: 'warm, conversational tone', pauses: [pause, pause] }), /stesso punto/)
  assert.throws(() => applyAudioDelivery('Una frase.', { tone: '[warm]', pauses: [] }), /non valide/)
  assert.throws(() => applyAudioDelivery('[pause]Una frase.', { tone: 'warm', pauses: [] }), /senza tag/)
})

test('all lesson notes keep the exact original prose under supported voice directions', async () => {
  const base = new URL('../../assets/booklet/lezione-griglie/', import.meta.url)
  const notes = JSON.parse(await readFile(new URL('speaker-notes.json', base), 'utf8'))
  const originals = JSON.parse(await readFile(new URL('speaker-notes-original.json', base), 'utf8'))
  assert.deepEqual(Object.keys(notes), Object.keys(originals))
  assert.equal(Object.keys(notes).length, 63)
  for (const [alias, text] of Object.entries(notes)) {
    assert.ok(text.startsWith('[calm, matter-of-fact delivery]'), alias)
    assert.equal(stripAudioDelivery(text), originals[alias], alias)
  }
  assert.throws(() => stripAudioDelivery('[singing]Una frase.'), /non supportata/)
  assert.throws(() => stripAudioDelivery('Una frase.[pause'), /incompleta/)
})

test('all slides resolve neutral stability without mutating the shared configuration', async () => {
  const base = new URL('../../assets/booklet/lezione-griglie/', import.meta.url)
  const configuration = JSON.parse(await readFile(new URL('audio-settings.json', base), 'utf8'))
  assert.equal(configuration.slideOverrides, undefined, 'one common delivery applies to the complete lesson')
  const snapshot = JSON.stringify(configuration)
  const notes = JSON.parse(await readFile(new URL('speaker-notes.json', base), 'utf8'))
  for (const alias of Object.keys(notes)) {
    const settings = resolveSlideAudioSettings(configuration, alias)
    assert.equal(settings.voiceSettings.stability, .9, alias)
    assert.equal(settings.voiceSettings.similarityBoost, .9, alias)
  }
  assert.equal(JSON.stringify(configuration), snapshot, 'resolving settings cannot mutate the saved configuration')
})
