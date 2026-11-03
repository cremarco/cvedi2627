// Historical transcription, presentation and user-requested redrawn figures stay separate.
import { readFile, writeFile } from 'node:fs/promises'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
import { stripAudioDelivery } from './audio-delivery.mjs'
import { readUsabilityCaptions, usabilityCaptionManifest } from './lesson-captions.mjs'
const root = new URL('../../../../', import.meta.url)
const base = 'progetti/slide/assets/lezione-test-usabilita/'
const read = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'))
const save = (file, value) => writeFile(new URL(file, root), JSON.stringify(value, null, 2) + '\n')
const source = await read(base + 'fonte-originale.json')
const assets = await read(base + 'immagini.json')
const redrawn = await read(base + 'ricostruite/manifest.json')
const criteria = await read(base + 'integrazioni-criteri.json')
const testing = await read(base + 'integrazioni-test.json')
const illustratedLayoutSource = base + 'layout-illustrato.json'
const illustratedLayouts = await read(illustratedLayoutSource)
const illustratedScenes = await read(illustratedLayouts.sceneManifest)
const principlesOpeningSource = base + 'apertura-principi.json'
const principlesOpening = await read(principlesOpeningSource)
const testingOpeningSource = base + 'apertura-test.json'
const testingOpening = await read(testingOpeningSource)
const cardOpenings = new Map([principlesOpening, testingOpening].map(opening => [opening.sourcePage, opening]))
const heuristicsOpeningSource = base + 'apertura-euristiche.json'
const heuristicsOpening = await read(heuristicsOpeningSource)
const notes = await read(base + 'speaker-notes.json')
const originalNotes = await read(base + 'speaker-notes-original.json')
const cardIllustrations = await read(base + 'card-artwork.json')
const audioSelectionSource = base + 'audio-approved.json'
const audioSelection = await read(audioSelectionSource)
const { manifest: captionSelection } = await readUsabilityCaptions()
const integrations = { sources: [...criteria.sources, ...testing.sources], slides: [...criteria.slides, ...testing.slides] }
const references = new Map(integrations.sources.map(source => [source.id, source]))
const images = new Map([...assets.images, ...redrawn.images, ...illustratedScenes.images].map(image => [image.id, image]))
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
    const opening = cardOpenings.get(page.page)
    slides.push({ ...common, kind: 'section', ...(opening
      ? { lead: opening.lead, panels: opening.panels, takeaway: opening.takeaway }
      : page.page === heuristicsOpening.sourcePage
        ? { lead: heuristicsOpening.lead, takeaway: heuristicsOpening.takeaway,
          heuristics: heuristicsOpening.heuristicPages.map(sourcePage => ({ sourcePage,
            title: source.pages.find(page => page.page === sourcePage).blocks.find(block => block.type === 'subtitle').text })) }
        : {}) })
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
  // Reload revised role icons in already-open decks when their SVG bytes change.
  const src = image.icons?.length ? `${image.web}?v=${image.sha256.slice(0, 12)}` : image.web
  return `<LessonFigure src="${html(src)}" alt="${html(image.alt)}"${image.caption ? ` caption="${html(image.caption)}"` : ''} />`
}
const sourceLine = slide => '<p class="aside test-import-source">'
  + slide.sources.map(id => {
    const source = references.get(id)
    return `<a class="link" href="${html(source.url)}" target="_blank" rel="noreferrer">${html(source.label)}</a>`
  }).join(' · ') + '</p>'
const tableDefinitionsSource = 'progetti/slide/data/test-usabilita-tables.json'
const tableDefinitions = {}
const lessonTable = slide => {
  tableDefinitions[slide.alias] = {
    title: slide.title,
    headers: slide.columns.map(text => text || 'Aspetto'),
    widths: slide.columns.length === 3 ? [26, 37, 37] : [26, 74],
    rows: slide.rows,
    note: '', caption: '',
  }
  return `<TestUsabilityTable code="${slide.alias}" />`
}
const chunks = []
for (const [index, slide] of slides.entries()) {
  slide.lessonSlide = index + 1
  slide.alias ??= index === 0 ? 'test-usabilita' : slide.sourcePage ? `test-usabilita-p${slide.sourcePage}-${(seen.get(slide.sourcePage) ?? 0) + 1}` : `test-usabilita-${slide.kind}`
  slide.minutes = units[index] / 2
  const presentation = illustratedLayouts.slides.find(layout => layout.alias === slide.alias)
  if (presentation) slide.presentation = presentation
  slide.narrationEnabled = index < 110
  const notesEnabled = slide.kind !== 'criteria-references'
  if (notesEnabled && (!notes[slide.alias]?.trim() || stripAudioDelivery(notes[slide.alias]) !== originalNotes[slide.alias]))
    throw new Error(slide.alias + ': original and delivered speaker notes differ')
  if (slide.sourcePage) seen.set(slide.sourcePage, (seen.get(slide.sourcePage) ?? 0) + 1)
  const classes = ['content-slide', 'lesson-slide', 'test-usabilita-slide']
  const fields = { layout: 'default', footer: 'Test di usabilità', lesson: 'test-usabilita',
    lessonSlide: index + 1, lessonMinutes: slide.minutes, routeAlias: slide.alias, localOnly: true,
    ...(slide.sourcePage ? { sourceSlide: slide.sourcePage } : {}),
    ...(slide.editorial ? { integrationId: slide.id } : {}) }
  if (!notesEnabled) fields.speakerNotesEnabled = false
  if (slide.alias === 'test-usabilita-p12-1') {
    classes.push('test-norman-intro-static')
  }
  if (audioSelection.clips[slide.alias]) {
    if (!slide.narrationEnabled) throw new Error('Audio is only requested for the first 110 usability slides')
    fields.narrationAudio = audioSelection.clips[slide.alias].web
    fields.narrationCaptions = captionSelection.clips[slide.alias].web
  }
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
    if (slide.presentation) {
      classes.push('test-illustrated-reading')
      const copy = slide.presentation.preserveOriginal
        ? blockHtml(slide.blocks)
        : `<p class="lead">${html(slide.presentation.lead)}</p><ul class="cvedi-list">`
          + slide.presentation.items.map(text => `<li><span>${html(text)}</span></li>`).join('') + '</ul>'
      body = `<div class="lesson-columns test-illustrated-summary${slide.presentation.preserveOriginal ? ' test-illustrated-original' : ''}"><div class="test-import-copy">`
        + copy + `</div>${figure(slide.presentation.scene)}</div>`
    } else if (slide.kind === 'section' && slide.panels) {
      classes.push('concept-slide')
      body = `<div class="test-criteria-copy"><p class="lead">${html(slide.lead)}</p><div class="cvedi-grid three">`
        + slide.panels.map(panel => `<CvediCard title="${html(panel.title)}"><p>${html(panel.text)}</p></CvediCard>`).join('')
        + `</div><div class="mt-4"><p class="aside">${html(slide.takeaway)}</p></div></div>`
    } else if (slide.alias === heuristicsOpening.alias) {
      body = `<div class="test-heuristics-overview"><p class="lead">${html(slide.lead)}</p><div class="lesson-columns">`
        + [0, 5].map(start => `<ol class="list test-heuristics-list" start="${start + 1}">`
          + slide.heuristics.slice(start, start + 5).map(item => `<li class="list-row">${html(item.title)}</li>`).join('') + '</ol>').join('')
        + `</div><p class="aside">${html(slide.takeaway)}</p></div>`
    } else if (slide.alias === 'test-usabilita-p10-1') {
      const [question, principle, ...benefits] = slide.blocks
      classes.push('test-friendly-slide')
      body = '<div class="lesson-columns test-friendly-layout"><div class="test-friendly-intro">'
        + `<p class="lead">${html(question.text)}</p><div class="lesson-statement">${html(principle.text)}</div></div>`
        + '<ul class="list test-friendly-benefits">'
        + benefits.map(block => `<li class="list-row"><p>${html(block.text)}</p></li>`).join('') + '</ul></div>'
    } else if (slide.kind === 'criteria') {
      classes.push('concept-slide')
      body = `<div class="test-criteria-copy"><p class="lead">${html(slide.lead)}</p><div class="cvedi-grid ${slide.panels.length === 2 ? 'two' : 'three'}">`
        + slide.panels.map(panel => `<CvediCard title="${html(panel.title)}"><p>${html(panel.text)}</p></CvediCard>`).join('')
        + `</div><div class="mt-4"><p>${html(slide.takeaway)}</p><p class="aside">${html(slide.question)}</p></div></div>`
      body += sourceLine(slide)
    } else if (slide.kind === 'testing-table') {
      body = `<div class="test-import-table test-method-table"><p class="lead">${html(slide.lead)}</p>`
        + lessonTable(slide) + `<p class="aside mt-4">${html(slide.takeaway)}</p></div>` + sourceLine(slide)
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
      body = '<div class="test-import-table">' + lessonTable(slide) + '</div>'
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
    // The repeated Krug credit is omitted from slides on the user's request;
    // its attribution remains in the original transcription and source manifest.
    if (slide.attribution && slide.attribution !== 'Steve Krug · Don’t Make Me Think')
      body += `<p class="aside test-import-source">${html(slide.attribution)}</p>`
  }
  fields.class = classes.join(' ')
  chunks.push('---\n' + Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n') + '\n---\n\n# ' + slide.title + '\n\n' + body + '\n' + (notesEnabled ? '\n<!--\n' + notes[slide.alias] + '\n-->\n' : ''))
}
for (const collection of [notes, originalNotes]) {
  if (JSON.stringify(Object.keys(collection)) !== JSON.stringify(slides.filter(slide => slide.kind !== 'criteria-references').map(slide => slide.alias)))
    throw new Error('Usability speaker notes must cover the lesson in order, excluding reference slides')
}
await writeFile(new URL('progetti/slide/lezioni/12-test-usabilita.md', root), chunks.join('\n'))
await save(tableDefinitionsSource, tableDefinitions)
const manifest = { version: 1, lesson: 'test-usabilita', number: 12, title: 'Test di usabilità',
  localOnly: true, palette: 'ux-usability', sourceFile: source.file, sourceSha256: source.sha256,
  transcription: base + 'fonte-originale.json', imageManifest: base + 'immagini.json', redrawnImageManifest: base + 'ricostruite/manifest.json',
  integrations: base + 'integrazioni-criteri.json', testingIntegrations: base + 'integrazioni-test.json', editorialSlides: slides.filter(slide => slide.editorial).length,
  principlesOpeningSource,
  testingOpeningSource,
  heuristicsOpeningSource,
  illustratedLayoutSource,
  tableDefinitionsSource,
  illustratedSceneManifest: illustratedLayouts.sceneManifest,
  speakerNotesSource: base + 'speaker-notes.json', speakerNotesOriginalSource: base + 'speaker-notes-original.json',
  cardArtworkManifest: base + 'card-artwork.json',
  audioSelectionSource, audioSettingsSource: 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json',
  captionSelectionSource: usabilityCaptionManifest,
  spokenWords: Object.values(originalNotes).reduce((sum, note) => sum + note.split(/\s+/u).length, 0),
  generator: 'progetti/slide/scripts/build/test-usabilita-slides.mjs', importer: 'progetti/slide/scripts/build/test-usabilita-import.py',
  importedPhysicalPages: source.physicalPages, importedPages: source.pages.length,
  structuralSlides: slides.filter(slide => slide.structural).length,
  slideCount: slides.length, minutes: slides.reduce((sum, slide) => sum + slide.minutes, 0), slides }
await save(base + 'manifest.json', manifest)
const artworkFile = 'progetti/slide/data/card-artwork-local.json'
const artwork = await read(artworkFile)
artwork.mappings['test-usabilita'] = Object.fromEntries(slides.flatMap(slide => [...(slide.cards ?? []), ...(slide.panels ?? []).map(panel => panel.title)]).map(text => {
  const key = normalizeTitle(text)
  const id = cardIllustrations.mappings[key]
  if (!cardIllustrations.images.some(image => image.id === id)) throw new Error('Missing usability card artwork: ' + text)
  return [key, id]
}))
for (const image of cardIllustrations.images) artwork.assets[image.id] = image.web
await save(artworkFile, artwork)
const doc = [
  '# Lezione 12 · Test di usabilità',
  `Le 110 registrazioni dispongono di sottotitoli WebVTT in \`${usabilityCaptionManifest}\`, allineati localmente con Whisper medium tramite stable-ts sul copione approvato. Le tracce conservano il testo completo senza tag vocali; hash audio, hash testo, tempi delle parole e versioni degli strumenti restano negli asset. Il player usa \`narrationCaptions\`, CC attivo al primo utilizzo e preferenza persistente; pausa e riavvio seguono la traccia nativa, senza chiamate esterne. La build prepara soltanto il mirror locale e verifica l'integrità; non esegue Whisper.`,
  `Importazione conservativa delle pagine fisiche 8–86 di \`${source.file}\`, nella raccolta 2025/26: principi di usabilità, Norman, dieci euristiche di Nielsen e test. Il titolo interno del PDF reca «${source.originalTitle}»; il manifest conserva entrambe le informazioni senza modificare la fonte.`,
  `${slides.length} slide, budget indicativo di 120 minuti, disponibili soltanto nell’anteprima locale. Il testo, i dati storici, i consigli e l’ordine delle pagine originali sono conservati; la revisione scientifica dei testi resta separata. Le pagine dense e la tabella sono distribuite su più slide; il testo rimane selezionabile. La copertina appartiene al sistema attuale; sintesi e obiettivi iniziali riprendono soltanto frasi già presenti alle pagine 48 e 52. Nessuna nuova attività.`,
  `Su richiesta esplicita, le ${Object.keys(notes).length} slide di contenuto hanno un copione italiano da pronunciare integralmente: ${manifest.spokenWords} parole, paragrafi brevi, lettura delle figure e raccordi al caso Passo. Il testo originale è in \`${manifest.speakerNotesOriginalSource}\`; \`${manifest.speakerNotesSource}\` aggiunge tono neutro e pause come nelle lezioni 09–10, senza cambiare i caratteri del parlato. La slide finale delle fonti è esclusa dalle note su richiesta dell’utente. Il generatore conserva le note per alias e i controlli verificano la corrispondenza completa. Il copione contestualizza dati economici storici, numerosità e cadenza dei test, formule enfatiche, distinzione fra affordance e significanti e fra gravità e priorità, senza modificare la trascrizione visibile. I riferimenti di verifica sono in \`${base}speaker-notes-sources.json\`. Su richiesta dell’utente, soltanto le prime 110 slide selezionano una registrazione in \`${audioSelectionSource}\`: voce Cremarco, modello eleven_v4, italiano, stabilità e somiglianza 0,90, MP3 44,1 kHz a 128 kbps, dalle stesse impostazioni delle lezioni precedenti. Originali e ricevute sono in assets/audio/lezione-test-usabilita; il mirror espone solo i file selezionati. La sintesi è separata dalla build; la configurazione del presenter rimane invariata.`,
  `Le cinque integrazioni sui criteri sono separate in \`${base}integrazioni-criteri.json\`: dopo Nielsen, tre criteri applicati al caso Passo (Shneiderman, Tognazzini, Bastien e Scapin) precedono il raccordo fra valutazione euristica e test con utenti. La bibliografia conclusiva include ISO 9241-110:2020 come standard distinto dagli elenchi di euristiche. Occupano 8 minuti.`,
  `Le quattro integrazioni operative in \`${base}integrazioni-test.json\` sviluppano componenti dell’usabilità, preparazione e consenso, criteri di successo e gravità dei problemi. Derivano dal confronto richiesto con Matteo di Pascale, *Manuale di sopravvivenza per UX designer. Guida pratica alla progettazione*, Hoepli, 2019, ISBN 978-88-203-9010-5, pagine fisiche PDF 142–148; le fonti primarie sono collegate nelle slide pertinenti. Il registro conserva provenienza, pagine e correzioni metodologiche rispetto al libro. Su richiesta dell’utente, autore, anno e pagine del manuale sono omessi nelle quattro slide; rimangono i collegamenti alle fonti primarie. SUS resta facoltativo e fuori dal percorso. Le nuove slide occupano 10 minuti; insieme ai criteri assegnano 18 minuti alle integrazioni e 102 ad aperture e percorso importato, entro le due ore. Alias storici, trascrizioni e figure sono conservati.`,
  `Su richiesta dell’utente, ${redrawn.images.filter(image => image.kind !== 'documentary-screenshot').length} immagini didattiche sono ridisegnate nella palette purple/Verde prato della lezione: nove immagini con ImageGen integrato e otto interfacce e schemi SVG con Nunito Sans. I due ritratti documentari rimangono originali. La slide 35 usa uno screenshot reale di Google acquisito dal browser, con colori originali e provenienza in \`${base}screenshot-reali/manifest.json\`. Il registro \`${base}ricostruite/manifest.json\` seleziona le figure; PNG ImageGen, prompt, SVG modificabili, screenshot, etichette e relazioni dirette restano separati dalle risorse web. Le interfacce ricostruite hanno una didascalia esplicita. Tutte le figure attive usano l’ingrandimento condiviso.`,
  `Le sette tabelle riusano il componente condiviso \`LessonTable\` tramite \`TestUsabilityTable\`; i dati per alias in \`${tableDefinitionsSource}\` conservano tutte le intestazioni e celle originali, con scope, selezione del testo e stile del corso anche in stampa.`,
  `Tutte le card hanno un’illustrazione decorativa pertinente della famiglia purple/Verde prato: nove originali ImageGen trasparenti per 29 card in dieci slide. Il manifest in \`${base}card-artwork.json\` conserva soggetti, prompt, originali, hash e proprietari; il generatore ripristina il mapping completo. Il componente \`CvediCard\` applica i ruoli condivisi: 96 px e riserva inferiore 112 px nelle tre colonne, 168 px nelle due colonne.`,
  `La slide 42 «Test di usabilità» completa su richiesta dell’utente il divisorio della pagina 41 con tre passaggi illustrati: scegliere la situazione, condurre la sessione e migliorare il progetto. \`${testingOpeningSource}\` registra contenuti e provenienza, coerenti con il copione già registrato. Alias, durata, audio e sottotitoli rimangono invariati.`,
  `Su richiesta dell’utente, ${illustratedLayouts.slides.length} spiegazioni testuali hanno un’immagine pertinente a destra; dove entra nella colonna sinistra, il testo originale rimane integralmente visibile, altrimenti usa una sintesi esplicita. \`${illustratedLayoutSource}\` registra i testi visibili, i riferimenti e gli hash dei paragrafi originali e dei copioni; la trascrizione completa resta conservata nei blocchi del manifest e nella fonte. \`${illustratedLayouts.sceneManifest}\` conserva ${illustratedScenes.images.length} illustrazioni originali ImageGen, prompt, hash e slide proprietarie. Titoli, attribuzioni, ordine, durate, copioni e registrazioni restano invariati.`,
  `La slide 4 «Principi di usabilità» completa su richiesta dell’utente l’apertura della pagina 8 con tre card illustrate: riconoscere le azioni, prevedere le conseguenze e correggere gli errori. Le domande riprendono testualmente il copione già registrato; \`${principlesOpeningSource}\` separa l’integrazione dalla trascrizione storica. Titolo, alias, note, audio e durata restano invariati.`,
  `La slide 26 «Le euristiche di Jakob Nielsen» completa su richiesta dell’utente il divisorio della pagina 29 con una panoramica delle dieci euristiche. Le intestazioni sono ricavate dalle pagine 31–40 e disposte in due liste numerate native; introduzione, raccordo e provenienza sono in \`${heuristicsOpeningSource}\`. Copione, audio, sottotitoli, alias e durata rimangono invariati.`,
  `Il PDF originale, le trascrizioni per pagina, gli hash, i ${assets.images.length} ritagli e le attribuzioni NN/g e Steve Krug sono conservati separatamente in \`${base}\`. Su richiesta dell’utente, la dicitura ripetuta «Steve Krug · Don’t Make Me Think» è omessa dalle slide e conservata nei registri delle fonti. Le attribuzioni non indicate nella fonte restano esplicitamente non determinate nei metadati. Il set archiviato \`test-implementazione\` rimane invariato e inattivo.`,
  '| Slide | Pagina originale | Titolo |\n| --- | --- | --- |\n' + slides.map(slide => `| ${slide.lessonSlide} | ${slide.sourcePage ?? (slide.editorial ? 'Integrazione verificata' : 'Raccordo iniziale')} | ${slide.title} |`).join('\n'),
].join('\n\n') + '\n'
await writeFile(new URL('progetti/slide/docs/fonti/12-test-usabilita.md', root), doc)
console.log(JSON.stringify({ slides: slides.length, sourcePages: source.pages.length, minutes: manifest.minutes }))
