// Reconstruct the retained exercise 03 Grid diagrams as editable vectors.
import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const directory = 'progetti/slide/assets/esercitazioni/schemi'
const manifest = JSON.parse(await readFile(`${directory}/manifest.json`, 'utf8'))
for (const named of [false, true]) {
  const name = named ? 'linee-nominate' : 'righe-colonne'
  const title = named ? 'Le linee nominate della griglia' : 'Righe e colonne della griglia'
  const xs = [145, 265, 385, 505, 625], ys = [80, 142, 297, 390]
  const cells = ys.slice(0, -1).flatMap((y, row) => xs.slice(0, -1).map((x, col) => `<rect x="${x + 8}" y="${y + 8}" width="104" height="${ys[row + 1] - y - 16}" rx="4" fill="#3f3f46"/><text x="${x + 60}" y="${(y + ys[row + 1]) / 2}" dominant-baseline="central" text-anchor="middle" fill="#fafafa" font-size="27">${row * 4 + col + 1}</text>`)).join('\n')
  const verticals = xs.map((x, col) => `<path d="M${x} 64V406" stroke="#f9a8d4" stroke-width="2"/><text x="${x}" y="438" text-anchor="middle" fill="#f9a8d4" font-size="26">${named ? `col${col + 1}` : col + 1}</text>`).join('\n')
  const horizontals = ys.map((y, row) => `<path d="M136 ${y}H660" stroke="#fbbf24" stroke-width="2"/><text x="119" y="${y}" dominant-baseline="central" text-anchor="end" fill="#fbbf24" font-size="26">${named ? `row${row + 1}` : row + 1}</text>`).join('\n')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="460" viewBox="0 0 720 460" role="img" aria-labelledby="title desc">
<title id="title">${title}</title><desc id="desc">Quattro colonne uguali e tre righe proporzionali a 100, 250 e 150 pixel. Le cinque linee verticali sono rosa; le quattro orizzontali sono ambra.${named ? ' Nomi delle linee: col1–col5 e row1–row4.' : ''}</desc>
<rect width="720" height="460" rx="12" fill="#18181b"/>
<path d="M0 48H720" stroke="#3f3f46"/>
<g fill="#71717a"><circle cx="25" cy="24" r="5"/><circle cx="44" cy="24" r="5"/><circle cx="63" cy="24" r="5"/></g>
<g font-family="ui-monospace, SFMono-Regular, Consolas, monospace">
${cells}
${verticals}
${horizontals}
</g></svg>\n`
  const source = `grid-${name}.svg`
  await writeFile(`${directory}/${source}`, svg)
  const entry = {
    source, web: `/images/esercitazioni/${source}`, sha256: createHash('sha256').update(svg).digest('hex'),
    historicalDiagram: `progetti/slide/assets/esercitazioni/native-rebuild/images/03-${named ? '019' : '018'}-diagram.webp`,
    sourceSlides: [named ? 19 : 18], exercise: '03', generator: 'progetti/slide/scripts/build/exercise-grid-diagrams.mjs',
    description: `${title}; quattro colonne uguali e tre righe nelle proporzioni 100:250:150, con linee verticali rosa e orizzontali ambra`,
    labels: named ? ['col1','col2','col3','col4','col5','row1','row2','row3','row4'] : ['1','2','3','4','5'],
  }
  const index = manifest.diagrams.findIndex(entry => entry.source === source)
  if (index < 0) manifest.diagrams.push(entry)
  else manifest.diagrams[index] = entry
}
await writeFile(`${directory}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n')
console.log('Exercise 03: two Grid diagrams reconstructed; originals retained')
