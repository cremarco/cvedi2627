// Pubblica le immagini condivise da booklet e slide senza mantenerne due originali.
// I file canonici sono in assets/images; public/images/shared è una copia generata.
import { copyFile, mkdir, readdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../..', import.meta.url))
const sourceDirectory = path.join(root, 'assets/images')
const outputDirectory = path.join(root, 'public/images/shared')
const imageExtension = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i

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
  const files = await imageFiles(sourceDirectory)
  if (check) {
    for (const file of files) {
      const source = await readFile(path.join(sourceDirectory, file))
      const output = await readFile(path.join(outputDirectory, file))
      verifyImageFormat(file, source)
      if (!source.equals(output)) throw new Error(`Immagine condivisa diversa dall'originale: ${file}`)
    }
    const generated = await imageFiles(outputDirectory)
    if (JSON.stringify(files) !== JSON.stringify(generated))
      throw new Error('Il mirror web contiene immagini obsolete: eseguire pnpm prepare:assets.')
    return files
  }

  // Si convalidano tutti gli originali prima di cancellare il mirror precedente.
  for (const file of files) verifyImageFormat(file, await readFile(path.join(sourceDirectory, file)))

  // La cartella è interamente generata: ricrearla elimina copie obsolete dopo rinomine.
  await rm(outputDirectory, { recursive: true, force: true })
  await mkdir(outputDirectory, { recursive: true })
  for (const file of files) {
    const output = path.join(outputDirectory, file)
    await mkdir(path.dirname(output), { recursive: true })
    await copyFile(path.join(sourceDirectory, file), output)
  }
  return files
}

// Uso diretto: node scripts/build/shared-assets.mjs [--check].
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check')
  const files = await prepareSharedAssets({ check })
  console.log(`Immagini condivise ${check ? 'verificate' : 'preparate'}: ${files.length}.`)
}
