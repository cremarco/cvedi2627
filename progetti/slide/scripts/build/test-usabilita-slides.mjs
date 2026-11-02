// Historical transcription, presentation and user-requested redrawn figures stay separate.
import { readFile, writeFile } from 'node:fs/promises'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
const root = new URL('../../../../', import.meta.url)
const base = 'progetti/slide/assets/lezione-test-usabilita/'
const read = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'))
const save = (file, value) => writeFile(new URL(file, root), JSON.stringify(value, null, 2) + '\n')
const source = await read(base + 'fonte-originale.json')
const assets = await read(base + 'immagini.json')
const redrawn = await read(base + 'ricostruite/manifest.json')
const criteria = await read(base + 'integrazioni-criteri.json')
const testing = await read(base + 'integrazioni-test.json')
const integrations = { sources: [...criteria.sources, ...testing.sources], slides: [...criteria.slides, ...testing.slides] }
const references = new Map(integrations.sources.map(source => [source.id, source]))
const images = new Map([...assets.images, ...redrawn.images].map(image => [image.id, image]))
const html = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

// Long historical pages are divided at paragraph/sentence boundaries, never shortened.
function fragments(blocks, limit = 650) {
  const result = [[]]
  for (const block of blocks) {
    const parts = block.text.length > limit
      ? block.text.match(/[^.!?]+[.!?]+(?:[”"’'](?=\s|$))?|[^.!?]+$/g) ?? [block.text]
      : [block.text]
    for (const part of parts) {
      const text = part.trim()
      if (!text) continue
      const current = result.at(-1)
      if (current.length && current.reduce((sum, item) => sum + item.text.length, 0) + text.length > limit) result.push([])
      result.at(-1).push({ ...block, text })
    }
  }
  return result.filter(group => group.length)
}

const slides = [
  { kind: 'cover', title: 'Test di usabilità', structural: true },
  { kind: 'summary', title: 'Osservare l’uso', structural: true,
    statement: 'Gli elementi centrali nella maggior parte dei test di usabilità sono il facilitatore, i compiti e il partecipante',
    support: 'Individuare i problemi nella progettazione del prodotto o del servizio' },
  { kind: 'opening-objectives', title: 'Gli obiettivi dei test di usabilità', structural: true,
    cards: source.pages.find(page => page.page === 48).cards },
]
for (const page of source.pages) {
  const common = { title: page.title, sourcePage: page.page, attribution: page.attribution }
  if (page.kind === 'table') {
    let rows = []
    const groups = []
    for (const row of page.rows) {
      const length = rows.flat().join('').length + row.join('').length
      if (rows.length && (length > 530 || rows.length === 3)) { groups.push(rows); rows = [] }
      rows.push(row)
    }
    if (rows.length) groups.push(rows)
    for (const rows of groups) slides.push({ ...common, kind: 'table', columns: page.columns, rows })
  } else if (page.kind === 'objectives') {
    slides.push({ ...common, kind: 'objectives', lead: page.blocks[0].text, cards: page.cards })
  } else if (page.kind === 'diagram' || page.kind === 'image') {
    slides.push({ ...common, kind: page.kind, figure: page.figure })
  } else if (page.kind === 'problems') {
    // Each dense example keeps a whole readable slide instead of tiny source columns.
    for (const card of page.cards) slides.push({ ...common, kind: 'text', blocks: [{ type: 'subtitle', text: card.title }, { type: 'paragraph', text: card.text }] })
  } else if (page.kind === 'section') {
    slides.push({ ...common, kind: 'section' })
  } else {
    for (const blocks of fragments(page.blocks, ['role', 'illustrated'].includes(page.kind) ? 460 : 650))
      slides.push({ ...common, kind: page.kind, blocks, ...(page.figure ? { figure: page.figure } : {}) })
  }
  slides.push(...integrations.slides.filter(slide => slide.afterSourcePage === page.page).map(slide => ({ ...slide, editorial: true })))
}
const seen = new Map()
const weights = slides.map(slide => slide.kind === 'cover' || slide.kind === 'section' ? .3 : slide.kind === 'summary' ? .5 : Math.max(1, (slide.blocks ?? []).map(block => block.text).join(' ').length / 350))
const fixedUnits = integrations.slides.reduce((sum, slide) => sum + slide.minutes * 2, 0)
const sumWeights = weights.reduce((sum, value, index) => sum + (slides[index].editorial ? 0 : value), 0)
const units = weights.map((weight, index) => slides[index].editorial ? slides[index].minutes * 2 : Math.max(1, Math.floor(weight / sumWeights * (240 - fixedUnits))))
let remaining = 240 - units.reduce((sum, value) => sum + value, 0)
for (let i = 0; remaining > 0; i = (i + 1) % units.length) {
  if (!slides[i].editorial) { units[i]++; remaining-- }
}
if (remaining < 0) throw new Error('Too many slides for the requested 120-minute budget')

const blockHtml = blocks => blocks.map(block => {
  if (block.type === 'subtitle') return `<h2>${html(block.text)}</h2>`
  if (block.type === 'item') return `<ul class="cvedi-list"><li><span>${html(block.text.replace(/^❏\s*/, ''))}</span></li></ul>`
  return `<p>${html(block.text)}</p>`
}).join('')
const figure = id => {
  const image = images.get(id)
  return `<LessonFigure src="${html(image.web)}" alt="${html(image.alt)}"${image.caption ? ` caption="${html(image.caption)}"` : ''} />`
}
const sourceLine = slide => '<p class="aside test-import-source">'
  + (slide.readingPages ? `Di Pascale, 2019 · PDF pp. ${slide.readingPages.join(', ')} · ` : '')
  + slide.sources.map(id => {
    const source = references.get(id)
    return `<a class="link" href="${html(source.url)}" target="_blank" rel="noreferrer">${html(source.label)}</a>`
  }).join(' · ') + '</p>'
const chunks = []
for (const [index, slide] of slides.entries()) {
  slide.lessonSlide = index + 1
  slide.alias ??= index === 0 ? 'test-usabilita' : slide.sourcePage ? `test-usabilita-p${slide.sourcePage}-${(seen.get(slide.sourcePage) ?? 0) + 1}` : `test-usabilita-${slide.kind}`
  slide.minutes = units[index] / 2
  if (slide.sourcePage) seen.set(slide.sourcePage, (seen.get(slide.sourcePage) ?? 0) + 1)
  const classes = ['content-slide', 'lesson-slide', 'test-usabilita-slide']
  const fields = { layout: 'default', footer: 'Test di usabilità', lesson: 'test-usabilita',
    lessonSlide: index + 1, lessonMinutes: slide.minutes, routeAlias: slide.alias, localOnly: true,
    ...(slide.sourcePage ? { sourceSlide: slide.sourcePage } : {}),
    ...(slide.editorial ? { integrationId: slide.id } : {}) }
  let body = ''
  if (slide.kind === 'cover') {
    classes.push('chapter-slide')
    fields.lessonNumber = 12
    body = '<ChapterMetro section="ux-usability" />'
  } else if (slide.kind === 'summary') {
    fields.layout = 'summary'
    fields.summaryStatement = slide.statement
    fields.summarySupport = slide.support
  } else {
    classes.push('reading-slide')
    if (slide.kind === 'criteria') {
      classes.push('concept-slide')
      body = `<div class="test-criteria-copy"><p class="lead">${html(slide.lead)}</p><div class="cvedi-grid ${slide.panels.length === 2 ? 'two' : 'three'}">`
        + slide.panels.map(panel => `<CvediCard title="${html(panel.title)}"><p>${html(panel.text)}</p></CvediCard>`).join('')
        + `</div><div class="mt-4"><p>${html(slide.takeaway)}</p><p class="aside">${html(slide.question)}</p></div></div>`
      body += sourceLine(slide)
    } else if (slide.kind === 'testing-table') {
      body = `<div class="test-import-table test-method-table"><p class="lead">${html(slide.lead)}</p><table class="table"><thead><tr>`
        + slide.columns.map(text => `<th scope="col">${html(text)}</th>`).join('') + '</tr></thead><tbody>'
        + slide.rows.map(row => `<tr><th scope="row">${html(row[0])}</th><td>${html(row[1])}</td></tr>`).join('')
        + `</tbody></table><p class="aside mt-4">${html(slide.takeaway)}</p></div>` + sourceLine(slide)
    } else if (slide.kind === 'criteria-references') {
      body = `<div><p class="lead">${html(slide.lead)}</p><ul class="list lesson-references">`
        + slide.sources.map(id => {
          const source = references.get(id)
          return `<li class="list-row"><div><a class="link" href="${html(source.url)}" target="_blank" rel="noreferrer">${html(source.label)}</a><p>${html(source.description)}</p></div></li>`
        }).join('') + '</ul></div>'
    } else if (slide.kind === 'objectives' || slide.kind === 'opening-objectives') {
      classes.push('concept-slide')
      body = `<div>${slide.lead ? `<p class="lead">${html(slide.lead)}</p>` : ''}<div class="cvedi-grid three">`
        + slide.cards.map(text => `<CvediCard title="${html(text)}" />`).join('') + '</div></div>'
    } else if (slide.kind === 'table') {
      body = '<div class="test-import-table"><table class="table"><thead><tr>' + slide.columns.map((text, i) => `<th scope="col">${html(text || 'Aspetto')}</th>`).join('') + '</tr></thead><tbody>'
        + slide.rows.map(row => `<tr><th scope="row">${html(row[0])}</th>${row.slice(1).map(text => `<td>${html(text)}</td>`).join('')}</tr>`).join('') + '</tbody></table></div>'
    } else if (slide.kind === 'diagram' || slide.kind === 'image') {
      classes.push('figure-slide', 'figure-comparison', 'screenshot-slide')
      body = figure(slide.figure)
    } else if (slide.kind === 'role' || slide.kind === 'illustrated') {
      classes.push('test-import-illustrated')
      body = `<div class="lesson-columns"><div>${blockHtml(slide.blocks)}</div>${figure(slide.figure)}</div>`
    } else if (slide.kind === 'section') {
      // Retain the source's section opener, using the ordinary shared title position.
      body = ''
    } else body = `<div class="test-import-copy">${blockHtml(slide.blocks)}</div>`
    if (slide.attribution) body += `<p class="aside test-import-source">${html(slide.attribution)}</p>`
  }
  fields.class = classes.join(' ')
  chunks.push('---\n' + Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n') + '\n---\n\n# ' + slide.title + '\n\n' + body + '\n')
}
await writeFile(new URL('progetti/slide/lezioni/12-test-usabilita.md', root), chunks.join('\n'))
const manifest = { version: 1, lesson: 'test-usabilita', number: 12, title: 'Test di usabilità',
  localOnly: true, palette: 'ux-usability', sourceFile: source.file, sourceSha256: source.sha256,
  transcription: base + 'fonte-originale.json', imageManifest: base + 'immagini.json', redrawnImageManifest: base + 'ricostruite/manifest.json',
  integrations: base + 'integrazioni-criteri.json', testingIntegrations: base + 'integrazioni-test.json', editorialSlides: slides.filter(slide => slide.editorial).length,
  generator: 'progetti/slide/scripts/build/test-usabilita-slides.mjs', importer: 'progetti/slide/scripts/build/test-usabilita-import.py',
  importedPhysicalPages: source.physicalPages, importedPages: source.pages.length,
  structuralSlides: slides.filter(slide => slide.structural).length,
  slideCount: slides.length, minutes: slides.reduce((sum, slide) => sum + slide.minutes, 0), slides }
await save(base + 'manifest.json', manifest)
const artworkFile = 'progetti/slide/data/card-artwork-local.json'
const artwork = await read(artworkFile)
artwork.mappings['test-usabilita'] = Object.fromEntries(slides.flatMap(slide => [...(slide.cards ?? []), ...(slide.panels ?? []).map(panel => panel.title)]).map(text => [normalizeTitle(text), null]))
await save(artworkFile, artwork)
const doc = [
  '# Lezione 12 · Test di usabilità',
  `Importazione conservativa delle pagine fisiche 8–86 di \`${source.file}\`, nella raccolta 2025/26: principi di usabilità, Norman, dieci euristiche di Nielsen e test. Il titolo interno del PDF reca «${source.originalTitle}»; il manifest conserva entrambe le informazioni senza modificare la fonte.`,
  `${slides.length} slide, budget indicativo di 120 minuti, disponibili soltanto nell’anteprima locale. Il testo, i dati storici, i consigli e l’ordine delle pagine originali sono conservati; la revisione scientifica dei testi resta separata. Le pagine dense e la tabella sono distribuite su più slide; il testo rimane selezionabile. La copertina appartiene al sistema attuale; sintesi e obiettivi iniziali riprendono soltanto frasi già presenti alle pagine 48 e 52. Nessuna nuova attività, nota del relatore o registrazione.`,
  `Le cinque integrazioni sui criteri sono separate in \`${base}integrazioni-criteri.json\`: dopo Nielsen, tre criteri applicati al caso Passo (Shneiderman, Tognazzini, Bastien e Scapin) precedono il raccordo fra valutazione euristica e test con utenti. La bibliografia conclusiva include ISO 9241-110:2020 come standard distinto dagli elenchi di euristiche. Occupano 8 minuti.`,
  `Le quattro integrazioni operative in \`${base}integrazioni-test.json\` sviluppano componenti dell’usabilità, preparazione e consenso, criteri di successo e gravità dei problemi. Derivano dal confronto richiesto con Matteo di Pascale, *Manuale di sopravvivenza per UX designer. Guida pratica alla progettazione*, Hoepli, 2019, ISBN 978-88-203-9010-5, pagine fisiche PDF 142–148; le fonti primarie sono collegate nelle slide pertinenti. Il registro conserva provenienza, pagine e correzioni metodologiche rispetto al libro. SUS resta facoltativo e fuori dal percorso. Le nuove slide occupano 10 minuti; insieme ai criteri assegnano 18 minuti alle integrazioni e 102 ad aperture e percorso importato, entro le due ore. Alias storici, trascrizioni e figure sono conservati.`,
  `Su richiesta dell’utente, ${redrawn.images.length} immagini didattiche sono ridisegnate nella palette purple/Verde prato della lezione: sei tavole con ImageGen integrato e dodici interfacce e schemi SVG con Nunito Sans. I due ritratti documentari rimangono originali. Il registro \`${base}ricostruite/manifest.json\` seleziona le nuove figure; PNG ImageGen, prompt, SVG modificabili, etichette e relazioni dirette restano separati dalle risorse web. Le interfacce ricostruite hanno una didascalia esplicita. Tutte le figure attive usano l’ingrandimento condiviso.`,
  `Il PDF originale, le trascrizioni per pagina, gli hash, i ${assets.images.length} ritagli e le attribuzioni NN/g e Steve Krug sono conservati separatamente in \`${base}\`. Le attribuzioni non indicate nella fonte restano esplicitamente non determinate nei metadati. Il set archiviato \`test-implementazione\` rimane invariato e inattivo.`,
  '| Slide | Pagina originale | Titolo |\n| --- | --- | --- |\n' + slides.map(slide => `| ${slide.lessonSlide} | ${slide.sourcePage ?? (slide.editorial ? 'Integrazione verificata' : 'Raccordo iniziale')} | ${slide.title} |`).join('\n'),
].join('\n\n') + '\n'
await writeFile(new URL('progetti/slide/docs/fonti/12-test-usabilita.md', root), doc)
console.log(JSON.stringify({ slides: slides.length, sourcePages: source.pages.length, minutes: manifest.minutes }))
