// Editorial data, figure provenance and generated Slidev content stay separate.
import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
import { lessonDecks } from '../../utils/lesson-decks.mjs'
import { processTables } from '../../data/lesson-tables.mjs'

const root = new URL('../../../../', import.meta.url)
const base = 'progetti/slide/assets/booklet/lezione-processo-ux-ui/'
const read = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'))
const save = (file, value) => writeFile(new URL(file, root), JSON.stringify(value, null, 2) + '\n')
const plan = await read(base + 'content-plan.json')
const assets = await read(base + 'image-manifest.json')
const references = await read(base + 'references.json')
const serviceCase = await read('progetti/slide/data/ux-service-case.json')
const images = new Map(assets.images.map(image => [image.code, image]))
const html = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const copy = (value, emphasis = []) => emphasis.reduce((text, phrase) => text.replaceAll(html(phrase), `<strong>${html(phrase)}</strong>`), html(value))
const figureCaption = image => [image.caption, image.displayRights ?? image.rights].filter(Boolean).join(' ')
const figure = (code, showCaption = true) => {
  const image = images.get(code)
  if (!image) throw new Error('Missing UX process figure: ' + code)
  const key = image.reconstruction || image.nativeDiagram ? ` :key="'${image.sha256}'"` : ''
  const caption = showCaption ? ` caption="${html(figureCaption(image))}"` : ''
  if (processTables[code]) return `<UxProcessTable code="${code}"${caption} />`
  return `<UxProcessFigure${key} src="${image.web}" alt="${html(image.alt)}"${caption} />`
}
const chunks = [], mapping = []
for (const [index, slide] of plan.slides.entries()) {
  const classes = ['content-slide', 'ux-process-lesson', 'lesson-slide', 'processo-ux-ui-slide']
  const extra = {}
  const lead = slide.lead ? `<p class="lead">${copy(slide.lead, slide.emphasis)}</p>` : ''
  const points = slide.points.length ? '<ul class="cvedi-list">' + slide.points.map(point => `<li><span>${copy(point, slide.emphasis)}</span></li>`).join('') + '</ul>' : ''
  let body = ''
  if (slide.kind === 'cover') {
    classes.push('chapter-slide')
    extra.lessonNumber = plan.number
    body = '<ChapterMetro section="ux-process" />'
  } else if (slide.kind === 'summary') {
    extra.layout = 'summary'
    extra.summaryStatement = slide.lead
    extra.summarySupport = slide.points[0]
  } else if (slide.kind === 'objectives') {
    classes.push('reading-slide', 'concept-slide')
    body = '<div class="cvedi-grid three">' + plan.objectives.map(card => `<CvediCard title="${html(card.title)}"><p>${html(card.text)}</p></CvediCard>`).join('') + '</div>'
  } else if (slide.kind === 'step-intro') {
    classes.push('reading-slide', 'ux-step-slide')
    const recall = slide.courseRecall
    const priorLesson = lessonDecks.find(deck => 'progetti/slide/' + deck.file === recall.source)
    if (!priorLesson) throw new Error('Missing course recall lesson: ' + recall.source)
    body = `<dl class="list ux-step-overview"><div class="list-row ux-step-question"><dt>Domanda</dt><dd>${lead}</dd></div>`
      + `<div class="list-row ux-step-activity"><dt>Attività</dt><dd>${points}</dd></div>`
      + `<div class="list-row ux-step-result"><dt>Risultato</dt><dd><p>${html(slide.output)}</p></dd></div></dl>`
      + `<CourseRecall lesson="${priorLesson.id}" target="${html(recall.alias)}" label="${html(recall.label.replace(/:$/, ''))}" application="${html(recall.application)}" />`
  } else if (slide.kind === 'process-map') {
    classes.push('reading-slide', 'figure-slide', 'figure-comparison', 'ux-process-map-slide')
    const image = images.get(slide.figures[0])
    if (!image) throw new Error('Missing printable process map')
    body = `<UxProcessExplorer fallback-src="${image.web}" fallback-alt="${html(image.alt)}" fallback-caption="${html(figureCaption(image))}" />`
  } else if (slide.kind === 'case-application') {
    classes.push('reading-slide', 'ux-case-slide')
    const stage = serviceCase.stages.find(stage => stage.step === slide.step)
    if (!stage) throw new Error('Missing service application for step ' + slide.step)
    if (slide.caseLayout === 'comparison') {
      body = `<div class="ux-case-application ux-case-comparison"><p class="lead">${html(stage.context)}</p>`
        + `<div class="ux-case-artifact"><table class="table"><thead><tr><th scope="col">Alternativa</th><th scope="col">${html(stage.artifactTitle)}</th></tr></thead><tbody>`
        + stage.rows.map(row => `<tr><th scope="row">${html(row.label)}</th><td>${html(row.text)}</td></tr>`).join('')
        + `</tbody></table></div><CvediNotice kind="explore" title="Ipotesi da provare"><p>${html(stage.decision)}</p></CvediNotice></div>`
    } else body = `<div class="ux-case-application"><div class="ux-case-columns"><div class="ux-case-decision"><p>${html(stage.context)}</p><h2>Decisione nel caso</h2><p>${html(stage.decision)}</p></div>`
      + `<div class="ux-case-artifact"><h2>${html(stage.artifactTitle)}</h2><table class="table"><tbody>`
      + stage.rows.map(row => `<tr><th scope="row">${html(row.label)}</th><td>${html(row.text)}</td></tr>`).join('')
      + `</tbody></table></div></div><p class="ux-case-handoff"><strong>${html(stage.artifactId)}.</strong> ${html(stage.handoff)}</p>`
      + `</div>`
  } else if (slide.kind === 'service-prototype') {
    classes.push('reading-slide', 'ux-service-prototype-slide')
    body = `<UxServicePrototype version="${html(slide.prototypeVersion)}" start-at="${html(slide.prototypeStart)}" />`
  } else if (slide.kind === 'booking-sitemap') {
    classes.push('reading-slide', 'teaching-figure-slide', 'ux-booking-sitemap-slide')
    body = `<div class="lesson-teaching-figure"><div class="lesson-teaching-intro">${lead}</div><UxBookingSitemap /></div>`
  } else if (slide.kind === 'persona-sheet') {
    classes.push('reading-slide', 'ux-persona-slide')
    const portrait = images.get(slide.figures[0])
    if (!portrait) throw new Error('Missing persona portrait')
    body = `<UxPersonaSheet portrait-src="${portrait.web}" portrait-alt="${html(portrait.alt)}" />`
  } else if (slide.kind === 'persona-decision') {
    classes.push('reading-slide', 'ux-persona-decision-slide')
    body = '<UxPersonaDecision />'
  } else if (slide.kind === 'references') {
    classes.push('reading-slide')
    body = '<ul class="list lesson-references">' + slide.references.map(item => `<li class="list-row"><div>${item.url ? `<a class="link" href="${html(item.url)}" target="_blank" rel="noopener noreferrer">${html(item.label)}</a>` : `<strong>${html(item.label)}</strong>`}<p>${html(item.note)}</p></div></li>`).join('') + '</ul>'
  } else if (slide.kind === 'cast') {
    classes.push('reading-slide', 'ux-cast-slide')
    body = `<div class="ux-cast-layout"><p class="lead">${html(slide.lead)}</p><div class="ux-cast-groups">`
      + slide.groups.map(group => `<section class="ux-cast-group"><div class="ux-cast-people">`
        + group.people.map(person => `<div class="ux-cast-person">${figure(person.figure, false)}<h2>${html(person.name)}</h2></div>`).join('')
        + `</div><div class="ux-cast-copy">${group.paragraphs.map(text => `<p>${html(text)}</p>`).join('')}</div></section>`).join('')
      + `</div><p class="ux-cast-service">${html(slide.service)}</p></div>`
  } else if (slide.kind === 'comparison' || slide.kind === 'sequence') {
    classes.push('reading-slide', 'concept-slide')
    if (slide.kind === 'sequence') classes.push('sequence-slide')
    const columns = slide.cards.length === 2 ? 'two' : 'three'
    body = '<div>' + lead + `<div class="cvedi-grid ${columns}">` + slide.cards.map(card => `<CvediCard title="${html(card.title)}"><p>${copy(card.text, slide.emphasis)}</p></CvediCard>`).join('') + '</div></div>'
      + (slide.notice ? `<CvediNotice kind="${slide.notice.kind || 'question'}" title="${html(slide.notice.title)}"><p>${copy(slide.notice.text, slide.emphasis)}</p></CvediNotice>` : '')
  } else if (slide.kind === 'decision-table') {
    classes.push('reading-slide')
    body = `<div>${lead}<table class="table lesson-decision-table"><thead><tr><th scope="col">Incertezza</th><th scope="col">Prossima attività</th><th scope="col">Domanda da affrontare</th></tr></thead><tbody>`
      + slide.rows.map(row => `<tr><th scope="row">${html(row.uncertainty)}</th><td>${html(row.activity)}</td><td>${html(row.question)}</td></tr>`).join('') + '</tbody></table></div>'
  } else if (slide.kind === 'takeaway') {
    classes.push('reading-slide', 'process-takeaway')
    body = `<div><div class="lesson-statement">${html(slide.lead)}</div><div class="cvedi-grid three">` + slide.cards.map(card => `<CvediCard title="${html(card.title)}"><p>${copy(card.text, slide.emphasis)}</p></CvediCard>`).join('') + '</div></div>'
  } else {
    classes.push('reading-slide')
    if (slide.kind === 'animated-portrait') {
      classes.push('figure-slide', 'illustrated-process-slide', 'viola-portrait-slide')
      const [illustration, photo] = slide.figures.map(code => images.get(code))
      if (!illustration || !photo) throw new Error('Missing Viola portrait frames')
      body = `<div class="lesson-columns"><div>${lead}${points}</div><ViolaPortraitReveal illustration-src="${illustration.web}" photo-src="${photo.web}" alt="${html(photo.alt)}" /></div>`
    } else if (slide.kind === 'illustrated') {
      classes.push('figure-slide', 'illustrated-process-slide')
      body = `<div class="lesson-columns"><div>${lead}${points}</div>${figure(slide.figures[0], slide.showFigureCaption !== false)}</div>`
    } else if (slide.kind === 'image') {
      classes.push('figure-slide', 'figure-comparison', 'screenshot-slide')
      if (slide.figureRole === 'document') classes.push('documentary-slide')
      body = figure(slide.figures[0])
    } else if (slide.kind === 'teaching') {
      classes.push('figure-slide', 'figure-comparison', 'teaching-figure-slide')
      body = `<div class="lesson-teaching-figure"><div class="lesson-teaching-intro">${lead}</div>${figure(slide.figures[0], slide.showFigureCaption !== false)}</div>`
    } else {
      body = `<div>${lead}${points}</div>`
      if (slide.kind === 'activity') {
        classes.push('lesson-activity')
        body = `<div>${lead}${points}<p class="aside">Attività · ${slide.minutes} minuti</p></div>`
      } else if (slide.kind !== 'text') throw new Error('Unknown UX process layout: ' + slide.kind)
    }
  }
  const fields = { layout: 'default', class: classes.join(' '), footer: plan.title,
    lesson: plan.lesson, lessonSlide: index + 1, lessonMinutes: slide.minutes,
    routeAlias: slide.alias, localOnly: plan.localOnly === true, bookletChapter: 9,
    bookletSource: plan.sourceFile, bookletFigures: slide.figures,
    ...(slide.step ? { uxStep: slide.step } : {}), ...(slide.showTitle === false ? { title: slide.title } : {}), ...extra }
  chunks.push('---\n' + Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')
    + '\n---\n\n' + (slide.showTitle === false ? '' : '# ' + slide.title + '\n\n') + body + '\n')
  mapping.push({ lessonSlide: index + 1, ...slide,
    bookPhysicalPages: slide.bookPhysicalPages ?? (slide.step ? references.bookStepPhysicalPages[slide.step] : [38, 45]),
    preparatorySources: slide.step ? references.preparatoryStepSources[slide.step] : [] })
}
await writeFile(new URL('progetti/slide/lezioni/11-processo-ux-ui.md', root), chunks.join('\n'))
const manifest = { version: 2, lesson: plan.lesson, number: plan.number, palette: plan.palette,
  localOnly: plan.localOnly === true, sourceFile: plan.sourceFile,
  sourceSha256: createHash('sha256').update(await readFile(new URL(plan.sourceFile, root))).digest('hex'),
  editorialPlan: base + 'content-plan.json', imageManifest: base + 'image-manifest.json',
  references: base + 'references.json', generator: 'progetti/slide/scripts/build/processo-ux-ui-slides.mjs',
  processMapData: 'progetti/slide/data/ux-process-explorer.json',
  serviceCaseData: 'progetti/slide/data/ux-service-case.json',
  servicePrototypeData: 'progetti/slide/data/ux-service-prototype.json',
  bookingSitemapData: 'progetti/slide/data/ux-booking-sitemap.json',
  designReferences: plan.designReferences,
  slideCount: mapping.length, minutes: mapping.reduce((sum, slide) => sum + slide.minutes, 0),
  activityMinutes: mapping.filter(slide => slide.kind === 'activity').reduce((sum, slide) => sum + slide.minutes, 0),
  slides: mapping }
await save(base + 'manifest.json', manifest)

const catalogFile = 'progetti/slide/data/card-artwork-local.json'
const catalog = await read(catalogFile)
const conceptCards = plan.slides.flatMap(slide => slide.cards ?? [])
const cardAssetId = card => plan.lesson + '-' + normalizeTitle(card.title).replaceAll(' ', '-')
catalog.mappings[plan.lesson] = Object.fromEntries([
  ...conceptCards.map(card => [normalizeTitle(card.title), card.artwork ? cardAssetId(card) : null]),
  ...plan.objectives.map(card => [normalizeTitle(card.title), plan.lesson + '-' + card.icon]),
])
for (const card of conceptCards.filter(card => card.artwork)) catalog.assets[cardAssetId(card)] = card.artwork
for (const icon of assets.objectiveArtwork) catalog.assets[icon.id] = icon.web
await save(catalogFile, catalog)
const mapArtworkFile = 'progetti/slide/assets/theme-imagegen/lesson-11-map/manifest.json'
const mapArtwork = await read(mapArtworkFile)
const cardMotifs = new Map()
for (const slide of plan.slides) for (const card of (slide.cards ?? []).filter(card => card.artwork)) {
  const source = mapArtwork.images.find(image => image.web === card.artwork)
  if (!source) throw new Error('Missing card illustration provenance: ' + card.artwork)
  const id = cardAssetId(card)
  if (!cardMotifs.has(id)) cardMotifs.set(id, { id, web: card.artwork, source: source.source,
    sourceSha256: source.sourceSha256, sha256: source.sha256, sourceManifest: mapArtworkFile, owners: [] })
  cardMotifs.get(id).owners.push({ lesson: plan.lesson, slideAlias: slide.alias, card: card.title })
}
await save(base + 'card-artwork.json', { version: 1, lesson: plan.lesson, images: [...cardMotifs.values()] })

const doc = `# Processo UX e UI · fonti della lezione 11

${manifest.slideCount} slide, ${manifest.minutes} minuti pianificati, inclusi ${manifest.activityMinutes} minuti di attività e 3 di restituzione. Presentazione pubblicata su GitHub Pages, successiva a Composizione, con palette violet/Cedro e numerazione autonoma.

La slide contenuti-realistici precede wireframe-documento e introduce l’uso di nomi, durata, indirizzo, costo e stati prima degli esempi. La slide sketch-wireframe-mockup definisce schizzo esplorativo, schema strutturale e proposta visiva statica, distinguendoli dal prototipo che simula azioni e risposte. Le sedici tavole ImageGen del percorso di Passo seguono wireframe-documento: quattro sketch a mano, quattro wireframe a bassa fedeltà con blocchi segnaposto, quattro wireframe digitali a media fedeltà e quattro mockup ad alta fedeltà. Ogni livello mostra le stesse otto schermate, raccolte in home/visite, ricerca/risultati, dettaglio/riepilogo e richiesta/conferma. Domicilio, professionista, data, orari, durata e costo provengono dai dati dello scenario. L’invio resta una richiesta in attesa; la conferma dipende dall’accettazione del professionista. data/ux-wireframe-sequence.json separa contenuti e sequenza dalle immagini; assets/theme-imagegen/lesson-11-wireframes/ conserva PNG, WebP lossless, prompt e riferimenti fra i livelli con hash. Le tavole sono statiche e usano LessonFigure per didascalia, alternativa testuale e ingrandimento. Il confronto wireframe-progressione riprende lo stesso riepilogo in quattro passaggi: sketch, blocchi segnaposto, media fedeltà con contenuti e mockup. La bassa fedeltà mostra soltanto struttura, campi e azioni; dati e comandi realistici sono conservati negli altri elaborati. Il precedente confronto a tre pannelli resta nel manifest revisioni/prima-bassa-fedelta; il precedente SVG generico è conservato in archivedImages. La slide revisione-v1 confronta la stessa proposta nei risultati: V0 mostra Giulia Riva e l’orario; V1 anticipa domicilio, fascia serale e totale prima di «Vedi visita». La tavola ImageGen segue le schermate di ricerca e risultati approvate; il manifest della serie conserva originale, prompt e i due riferimenti. Il precedente SVG resta in archivedImages. La distinzione tra richiesta e conferma resta nella revisione V2.

La struttura segue le quattordici attività del capitolo 3 di Matteo Di Pascale (2019), consultato nelle pagine fisiche 38–45 del PDF fornito. Carlo, Giovanni e Viola appartengono al caso narrativo del libro. Il capitolo 09 Typst è la fonte editoriale corrente; le lezioni 03–06 e 08 del 2025/26 e il booklet di dicembre 2024 contribuiscono ai contenuti. Percorsi, pagine fisiche, hash e fonti primarie sono in references.json. I richiami all’autore e al manuale sono omessi dai contenuti visibili su richiesta dell’utente; la provenienza completa rimane nei registri locali.

Le quattordici aperture usano domanda, tre attività, risultato atteso e richiamo applicato a una lezione precedente. Subito dopo ciascuna apertura, un’applicazione sviluppa lo stesso servizio: rete locale coordinata di fisioterapisti a domicilio. Il caso cumulativo è in data/ux-service-case.json; ogni elaborato ha un identificativo e usa il risultato del passo precedente. Requisiti R1–R5, criteri C1–C4 e tre episodi E1–E3 collegano struttura, prove e revisioni. Tutti gli episodi di ricerca e valutazione, gli indirizzi, i professionisti aggiunti, le disponibilità, le condizioni e i prezzi sono simulati. Nessun risultato didattico è presentato come ricerca svolta o dimostrazione dell’efficacia sul campo.

V0 mostra la prima bozza; V1 anticipa zona, fascia serale e totale; V2 distingue invio, attesa e accettazione del professionista; V3 conserva i dati durante il recupero e rende gestibili richieste e visite. UxServicePrototype dimostra tutte e quattro le versioni con controlli reali e dati locali in data/ux-service-prototype.json. La presentazione segue i wireframe approvati: marchio Passo, intestazione bianca, risultati con fotografie e orari selezionabili, dettaglio della visita prima del riepilogo con contatti e consenso e azioni principali in evidenza. V0 usa i grigi; V1–V3 usano violetto e Cedro. Titoli e comandi sono condivisi con data/ux-wireframe-sequence.json. La prima bozza conserva il costo tardivo e «Prenota», mentre V2–V3 distinguono richiesta e conferma. La ricerca controlla il CAP della copertura illustrativa, senza geocodificare il domicilio. Le simulazioni di slot perso e conferma umana sono controlli didattici esterni all’interfaccia del servizio. Non viene inviata alcuna richiesta. Stampa ed export mostrano un riepilogo deterministico. La proposta finale conserva i limiti: disponibilità e tempi reali, condizioni effettive e prove con persone e tecnologie assistive.

Le ${assets.images.length} figure comprendono ${assets.images.filter(image => image.reconstruction).length} ricostruzioni per la proiezione, ${assets.images.filter(image => image.nativeDiagram && !image.smartCriterion).length} elaborati nativi del caso, sei schemi SMART, un documento attribuito, cinque illustrazioni di scena e tre ritratti, un’infografica SMART e un ritratto realistico di Viola e ${assets.images.filter(image => image.wireframeLevel || image.wireframeComparison || image.wireframeRevision).length} tavole di wireframe e confronto generate con ImageGen; tre motivi vettoriali illustrano gli obiettivi. Le ricostruzioni mantengono gli originali in reconstruction.original. I nuovi esempi sono registrati in nativeDiagram con renderer, font e hash. Tutti i ${assets.images.filter(image => image.reconstruction || image.nativeDiagram).length} schemi usano gabbia da 800 pt, canvas da 842 pt con 40 pt liberi per lo zoom, Nunito Sans in tracciati, corpo 15,5 pt e note 14 pt. Il font deriva dai contorni web con istanze 400/600/700 e famiglia CVeDI Diagram Sans; originale, licenza e ricevute restano in ricostruite/font/. Le verifiche misurano almeno 20 px per il corpo e 18 per le note nel canvas. Il documento attivo conserva l’attribuzione: wireframe NS di Jolanda Dekker. Il dettaglio WCC Properties di JH Specialty è escluso su richiesta; ritaglio, attribuzione e originale integrale restano conservati in archivedImages e negli asset originali. La scheda persona di Iulian Corunga è conservata in archivedImages; la slide persona-documento usa UxPersonaSheet e data/ux-persona.json, con testi italiani nativi e il ritratto realistico già approvato di Viola. Obiettivo, contesto, bisogni, comportamenti, ostacoli e domande da approfondire seguono il caso delle visite serali a domicilio. Le cinque illustrazioni di scena e i tre ritratti ImageGen conservano PNG, prompt, WebP lossless e hash. I ritratti di Carlo, Giovanni e Viola sono registrati separatamente in assets/theme-imagegen/lesson-11-cast/manifest.json; la slide del caso mantiene nomi e spiegazioni come testo nativo, senza didascalie aggiuntive. Caption, alternative e ingrandimento seguono il sistema condiviso. Nessun PDF del booklet viene compilato o aperto.

Le ${Object.keys(processTables).length} tabelle dai registri sono richiamate come UxProcessTable con codice semantico, senza src immagine. Le ${plan.slides.filter(slide => slide.kind === 'case-application').length} applicazioni e la tabella delle decisioni usano HTML diretto. Il componente condiviso LessonTable mantiene intestazioni, scope, dati selezionabili e stampa. pnpm check:ux-tables verifica contenuti e geometria di tutte le tabelle nei tre formati; i controlli delle sorgenti impediscono il ripristino dei riferimenti SVG nel contenuto visibile. Gli originali grafici e le attribuzioni rimangono conservati.

L’estensione SMART comprende un’introduzione illustrata, l’esempio del compito conservato, cinque criteri applicati e una sintesi. Rispetto alle 104 slide precedenti, aggiunge sette slide e 10,5 minuti. L’infografica ImageGen è registrata in assets/theme-imagegen/lesson-11-smart/manifest.json, con originale, prompt e derivato lossless. La variante Specific, Measurable, Actionable, Realistic e Time-based segue le pagine fisiche 57–59 del manuale allegato; fonte, copia consultata e hash sono nel registro locale. I contenuti sono in data/ux-smart.json e il renderer smart.typ riusa il sistema dei diagrammi. Ogni criterio riguarda Carlo, Giovanni e Viola. Cinque partecipanti e due settimane sono una proposta di pianificazione da concordare: gli esiti devono ancora essere raccolti. L’alias processo-ux-ui-obiettivo mantiene l’introduzione e l’alias processo-ux-ui-obiettivo-caso conserva l’esempio precedente; seguono i cinque criteri e la sintesi, prima di processo-ux-ui-misure.

La mappa interattiva usa UxProcessExplorer con quattordici card illustrate in cinque nuclei e pannello laterale da 300 px, nell’intera area di contenuto. Il manifest assets/theme-imagegen/lesson-11-map/manifest.json registra sei riusi e otto nuove illustrazioni decorative, con originali, prompt, alpha e hash. Titolo e introduzione visibili, pulsante di ritorno e guida testuale sono omessi su richiesta. Frecce, Home, End, Tab ed Escape conservano la navigazione; stampa ed export usano la mappa nativa completa. La selezione mantiene il focus e collegamenti con contrasto almeno 3:1. Il piano conserva i riferimenti alle lezioni precedenti e i 78 alias originali rimasti nel medesimo ordine relativo; le due slide rimosse su richiesta restano in archivedSlides. L’estensione intenzionale aggiunge 14 applicazioni, sei figure del caso e quattro versioni navigabili: 24 slide e 24 minuti. Le due attività rimangono di 8 e 10 minuti. Non sono aggiunte note del relatore o registrazioni. La lezione e le figure attive sono pubblicate anche su GitHub Pages; gli originali e gli asset archiviati restano conservati nei sorgenti.

La sitemap del sito da realizzare segue il confronto fra journey, flow e sitemap. UxBookingSitemap presenta Home, Il servizio, Trova una visita, Le mie visite e Assistenza con pagine distinte per ricerca, risultati, dettaglio, riepilogo, accesso e gestione. I contenuti sono in data/ux-booking-sitemap.json e sviluppano IA-01. Attesa e conferma restano stati del dettaglio; modifica e annullamento sono azioni. Il footer comune raccoglie privacy, cookie, accessibilità e condizioni.

## Corrispondenze

| Slide | Titolo | Passaggio della fonte | Sezione del capitolo | Figure |
| --- | --- | --- | --- | --- |
` + mapping.map(slide => `| ${slide.lessonSlide} | ${slide.title} | ${slide.step ?? '—'} | ${slide.sourceHeading} | ${slide.figures.join(', ')} |`).join('\n') + '\n'
await writeFile(new URL('progetti/slide/docs/fonti/11-processo-ux-ui.md', root), doc)
console.log(`Processo UX/UI: ${manifest.slideCount} slides, ${manifest.minutes} minutes, ${manifest.activityMinutes} activity minutes.`)
