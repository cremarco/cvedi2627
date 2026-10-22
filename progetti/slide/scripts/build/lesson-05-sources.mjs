import { readFile, writeFile } from 'node:fs/promises'
import { loadSlideDeck } from '../check/deck.mjs'
const root = new URL('../../../..', import.meta.url)
const deck = await loadSlideDeck()
const curriculum = JSON.parse(await readFile(new URL('progetti/slide/data/ux-curriculum.json',root),'utf8'))
const snapshot = JSON.parse(await readFile(new URL('progetti/slide/assets/booklet/lezione-05-accessibilita/figma-source.json',root),'utf8'))
const sourceLinks = new Map()
for (const f of snapshot.frames) for (const t of f.texts) for (const l of t.links || []) if (l.type==='URL') sourceLinks.set(l.value,t.text)
const slides = deck.slides.filter(s=>s.frontmatter.lesson==='percezione-gerarchia')
let doc = '# Lezione 05 · Accessibilità e design inclusivo\n\n'
doc += 'La lezione riguarda esclusivamente la sezione [Accessibilità e design inclusivo](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC?node-id=2188-1088), estratta il 12 ottobre 2026: 56 tavole, folio 168–223. Il percorso precedente di Percezione e gerarchia visiva è conservato in `progetti/slide/lezioni/archivio/05-percezione-gerarchia.md`, con la mappa `progetti/slide/assets/booklet/lezione-05-accessibilita/perception-archive.json`, e non è importato nel deck.\n\n'
doc += '105 slide: copertina e sintesi, 86 slide sull’accessibilità e 17 confronti HTML interattivi. Durata pianificata: 129,5 minuti. Requisiti, livelli, eccezioni, natura simulata degli esempi e attribuzioni sono mantenuti. WCAG e indicazioni supplementari COGA restano distinte.\n\n'
doc += '`bookletNodes` e `bookletFolios` identificano tutte le fonti attive. L’identità tecnica e l’alias `percezione-gerarchia` sono conservati per compatibilità con i collegamenti esistenti; titolo e contenuti della lezione sono solo sull’accessibilità. Snapshot completo: `progetti/slide/assets/booklet/lezione-05-accessibilita/figma-source.json`; figure: `image-manifest.json` nella stessa cartella. Gli originali, prompt e diritti degli asset sono conservati nei manifest del booklet. La famiglia di 13 icone ImageGen resta in `progetti/slide/assets/theme-imagegen/lesson-05-icons/manifest.json`, con PNG originali, prompt e WebP lossless.\n\n'
doc += '| Slide | Titolo | Fonte | Minuti |\n| --- | --- | --- | --- |\n'
for (const s of slides) doc += `| ${s.frontmatter.lessonSlide} | ${s.title.replaceAll('|','/')} | ${s.frontmatter.bookletFolios ? 'Folio '+s.frontmatter.bookletFolios.join(', ') : 'Tavole storiche '+s.frontmatter.bookletPages.join(', ')} | ${s.frontmatter.lessonMinutes} |\n`
doc += '\nFonti collegate nelle tavole Figma:\n\n'
for(const [url,label] of sourceLinks) doc += `- [${label.replace(/ — .*/, '').replaceAll('[','').replaceAll(']','')}](${url})\n`
await writeFile(new URL('progetti/slide/docs/fonti/05-percezione-gerarchia.md',root),doc)
console.log(JSON.stringify({slides:slides.length,linkedSources:sourceLinks.size}))
