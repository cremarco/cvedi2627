import { readFile, writeFile, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const directory = 'progetti/slide/assets/esercitazioni/schemi'
const manifest = JSON.parse(await readFile(`${directory}/manifest.json`, 'utf8'))
const previous = manifest.diagrams.find(asset => asset.source === 'librerie-framework.svg')
if (previous) {
  manifest.archivedDiagrams = [...(manifest.archivedDiagrams || []), previous]
  manifest.diagrams = manifest.diagrams.filter(asset => asset !== previous)
  await rm(`progetti/slide/public${previous.web}`, { force: true })
}
const frame = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="285" viewBox="0 0 520 285" role="img" aria-labelledby="title"><title id="title">${title}</title><rect width="520" height="285" rx="12" fill="#18181b"/><path d="M0 38H520" stroke="#3f3f46"/><g fill="#71717a"><circle cx="24" cy="19" r="5"/><circle cx="44" cy="19" r="5"/><circle cx="64" cy="19" r="5"/></g><g font-family="Arial,sans-serif" font-size="28" text-anchor="middle" fill="#fafafa">${body}</g></svg>\n`
const diagrams = [
  ['framework', 'Framework', '<rect x="20" y="56" width="480" height="175" rx="12" fill="#27272a" stroke="#f9a8d4" stroke-width="3"/><text x="260" y="94">Framework</text><rect x="70" y="121" width="380" height="85" fill="#3f3f46" stroke="#fbbf24" stroke-width="3"/><text x="260" y="173">Application</text><rect x="20" y="241" width="480" height="34" rx="8" fill="#3f3f46"/><text x="260" y="267">Platform</text>'],
  ['librerie', 'Librerie', '<rect x="20" y="56" width="130" height="170" fill="#3f3f46" stroke="#fbbf24" stroke-width="3"/><text x="85" y="141" transform="rotate(-90 85 141)">Application</text><g fill="#27272a" stroke="#f9a8d4" stroke-width="3"><rect x="170" y="56" width="330" height="46" rx="8"/><rect x="170" y="118" width="330" height="46" rx="8"/><rect x="170" y="180" width="330" height="46" rx="8"/></g><text x="335" y="89">Library 1</text><text x="335" y="151">Library 2</text><text x="335" y="213">Library 3</text><rect x="20" y="241" width="480" height="34" rx="8" fill="#3f3f46"/><text x="260" y="267">Platform</text>'],
]
for (const [name, title, body] of diagrams) {
  const svg = frame(title, body), source = `${name}-controllo.svg`
  await writeFile(`${directory}/${source}`, svg)
  const asset = { source, web: `/images/esercitazioni/${source}`, sha256: createHash('sha256').update(svg).digest('hex'), historicalDiagram: 'progetti/slide/assets/esercitazioni/bootstrap-archive/images/05-009-diagram.webp', derivedFrom: 'librerie-framework.svg', generator: 'progetti/slide/scripts/build/exercise-framework-diagrams.mjs', description: `${title}: schema separato con etichette e relazioni originali.` }
  const index = manifest.diagrams.findIndex(item => item.source === source)
  if (index < 0) manifest.diagrams.push(asset); else manifest.diagrams[index] = asset
}
await writeFile(`${directory}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n')
