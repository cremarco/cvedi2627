// Pubblica le immagini condivise da booklet e slide senza mantenerne due originali.
// I file canonici sono in risorse-condivise/immagini; progetti/slide/public/images/shared è una copia generata.
import { copyFile, lstat, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../..', import.meta.url))
const sourceDirectory = path.join(root, 'risorse-condivise/immagini')
const outputDirectory = path.join(root, 'progetti/slide/public/images/shared')
const slideFigureDirectory = path.join(root, 'progetti/slide/assets/figure/griglia-didattica')
const slideFigurePrefix = 'figure/griglia-didattica/'
const sourceFile = file => file.startsWith(slideFigurePrefix)
  ? path.join(slideFigureDirectory, file.slice(slideFigurePrefix.length))
  : path.join(sourceDirectory, file)
const imageExtension = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i
const audioLessons = [
  { directory: 'lezione-griglie', lesson: 'griglie-layout' },
  { directory: 'lezione-composizione', lesson: 'composizione-gerarchia' },
]

/** Espone soltanto gli audio approvati, senza esportare le prove precedenti. */
export async function prepareSlideAudioAssets({ check = false } = {}) {
  const files = []
  for (const specification of audioLessons)
    files.push(...await prepareLessonAudioAssets(specification, { check }))
  return files
}

async function prepareLessonAudioAssets({ directory, lesson }, { check }) {
  const audioOutputDirectory = path.join(root, 'progetti/slide/public/audio', directory)
  const sourcePrefix = `progetti/slide/assets/audio/${directory}/`
  const webPrefix = `/audio/${directory}/`
  const selection = JSON.parse(await readFile(path.join(root, 'progetti/slide/assets/booklet', directory, 'audio-approved.json'), 'utf8'))
  if (selection.version !== 1 || selection.lesson !== lesson || !selection.clips ||
    typeof selection.clips !== 'object' || Array.isArray(selection.clips) || !Object.keys(selection.clips).length)
    throw new Error('Selezione degli audio approvati non valida.')

  const selected = new Map()
  // Tutti i percorsi e gli hash vengono verificati prima di cancellare il mirror.
  for (const [alias, clip] of Object.entries(selection.clips)) {
    if (!(alias === lesson || alias.startsWith(lesson + '-')) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(alias) || !clip || typeof clip !== 'object' ||
      typeof clip.source !== 'string' || !clip.source.startsWith(sourcePrefix) || !/^[a-z0-9][a-z0-9._-]*\.mp3$/.test(clip.source.slice(sourcePrefix.length)) ||
      clip.web !== webPrefix + path.basename(clip.source) ||
      typeof clip.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(clip.sha256) ||
      !Number.isFinite(clip.durationSeconds) || clip.durationSeconds <= 0)
      throw new Error(`${alias}: riferimento all'audio approvato non valido.`)
    const filename = path.basename(clip.source)
    if (selected.has(filename)) throw new Error(`Audio approvato duplicato: ${filename}`)
    if (!(await lstat(path.join(root, clip.source))).isFile())
      throw new Error(`${alias}: la sorgente audio deve essere un file originale.`)
    const bytes = await readFile(path.join(root, clip.source))
    if (createHash('sha256').update(bytes).digest('hex') !== clip.sha256)
      throw new Error(`${alias}: l'audio non corrisponde all'originale approvato.`)
    selected.set(filename, bytes)
  }

  if (check) {
    const entries = await readdir(audioOutputDirectory, { withFileTypes: true })
    const filenames = entries.map(entry => entry.name).sort()
    if (entries.some(entry => !entry.isFile()) || JSON.stringify(filenames) !== JSON.stringify([...selected.keys()].sort()))
      throw new Error('Il mirror audio contiene file non approvati: eseguire pnpm prepare:assets.')
    for (const [filename, bytes] of selected)
      if (!bytes.equals(await readFile(path.join(audioOutputDirectory, filename))))
        throw new Error(`Audio diverso dall'originale approvato: ${filename}`)
    return filenames
  }

  await rm(audioOutputDirectory, { recursive: true, force: true })
  await mkdir(audioOutputDirectory, { recursive: true })
  // Conserviamo i byte già verificati anche se la sorgente cambia durante la copia.
  for (const [filename, bytes] of selected)
    await writeFile(path.join(audioOutputDirectory, filename), bytes)
  return [...selected.keys()].sort()
}

/** Riconosce il formato dai byte: l'estensione non basta per importare una figura. */
function imageFormat(bytes) {
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'png'
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'jpeg'
  if (/^GIF8[79]a$/.test(bytes.toString('ascii', 0, 6))) return 'gif'
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') return 'webp'
  if (bytes.length >= 16 && bytes.toString('ascii', 4, 8) === 'ftyp') {
    const boxEnd = Math.min(bytes.readUInt32BE(0), bytes.length)
    const brands = [bytes.toString('ascii', 8, 12)]
    for (let offset = 16; offset + 4 <= boxEnd; offset += 4) brands.push(bytes.toString('ascii', offset, offset + 4))
    if (brands.includes('avif') || brands.includes('avis')) return 'avif'
  }
  const xml = bytes.toString('utf8', 0, 4096).replace(/^\uFEFF/, '').trimStart()
  if (xml.startsWith('<') && /<svg(?:\s|>)/i.test(xml)) return 'svg'
  return 'sconosciuto'
}

/** Blocca estensioni incoerenti prima della pubblicazione; non converte i file. */
export function verifyImageFormat(file, bytes) {
  const extension = path.extname(file).slice(1).toLowerCase()
  const expected = extension === 'jpg' ? 'jpeg' : extension
  const actual = imageFormat(bytes)
  if (actual !== expected)
    throw new Error(`Estensione incoerente per ${file}: .${extension}, formato effettivo ${actual}. Rinominare l'originale senza ricomprimerlo.`)
  return actual
}

/** Restituisce i percorsi delle sole immagini; manifest e contorni JSON restano locali. */
async function imageFiles(directory, prefix = '') {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.join(prefix, entry.name)
    if (entry.isDirectory()) files.push(...await imageFiles(path.join(directory, entry.name), relative))
    else if (entry.isFile() && imageExtension.test(entry.name)) files.push(relative)
  }
  return files.sort()
}

/**
 * Ricrea il mirror web degli originali condivisi, conservando nomi, cartelle e byte.
 * Con check:true verifica il mirror senza scrivere file, anche dopo una build.
 */
export async function prepareSharedAssets({ check = false } = {}) {
  // Prima leggiamo l'elenco completo: una sorgente mancante non cancella l'output.
  const files = [...await imageFiles(sourceDirectory),
    ...(await imageFiles(slideFigureDirectory)).map(file => slideFigurePrefix + file)].sort()
  if (check) {
    for (const file of files) {
      const source = await readFile(sourceFile(file))
      const output = await readFile(path.join(outputDirectory, file))
      verifyImageFormat(file, source)
      if (!source.equals(output)) throw new Error(`Immagine condivisa diversa dall'originale: ${file}`)
    }
    const generated = await imageFiles(outputDirectory)
    if (JSON.stringify(files) !== JSON.stringify(generated))
      throw new Error('Il mirror web contiene immagini obsolete: eseguire pnpm prepare:assets.')
    await prepareSlideAudioAssets({ check })
    return files
  }

  // Si convalidano tutti gli originali prima di cancellare il mirror precedente.
  for (const file of files) verifyImageFormat(file, await readFile(sourceFile(file)))

  // La cartella è interamente generata: ricrearla elimina copie obsolete dopo rinomine.
  await rm(outputDirectory, { recursive: true, force: true })
  await mkdir(outputDirectory, { recursive: true })
  for (const file of files) {
    const output = path.join(outputDirectory, file)
    await mkdir(path.dirname(output), { recursive: true })
    await copyFile(sourceFile(file), output)
  }
  await prepareSlideAudioAssets({ check })
  return files
}

// Uso diretto: node scripts/build/shared-assets.mjs [--check].
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check')
  const files = await prepareSharedAssets({ check })
  console.log(`Immagini condivise ${check ? 'verificate' : 'preparate'}: ${files.length}.`)
}
