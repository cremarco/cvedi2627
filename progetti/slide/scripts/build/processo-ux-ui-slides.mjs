// Editorial data, figure provenance and generated Slidev content stay separate.
import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { normalizeTitle } from '../../utils/normalize-title.mjs'

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
const figure = code => {
  const image = images.get(code)
  if (!image) throw new Error('Missing UX process figure: ' + code)
  const key = image.reconstruction || image.nativeDiagram ? ` :key="'${image.sha256}'"` : ''
  return `<LessonFigure${key} src="${image.web}" alt="${html(image.alt)}" caption="${html(image.caption + ' ' + image.rights)}" />`
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
    body = `<dl class="list ux-step-overview"><div class="list-row ux-step-question"><dt>Domanda</dt><dd>${lead}</dd></div>`
      + `<div class="list-row ux-step-activity"><dt>Attività</dt><dd>${points}</dd></div>`
      + `<div class="list-row ux-step-result"><dt>Risultato</dt><dd><p>${html(slide.output)}</p></dd></div>`
      + `<div class="list-row ux-step-recall"><dt>Dal corso</dt><dd><p><strong>${html(slide.courseRecall.label)}</strong> ${html(slide.courseRecall.application)}</p></dd></div></dl>`
  } else if (slide.kind === 'process-map') {
    classes.push('reading-slide', 'figure-slide', 'figure-comparison', 'ux-process-map-slide')
    const image = images.get(slide.figures[0])
    if (!image) throw new Error('Missing printable process map')
    body = `<UxProcessExplorer intro="${html(slide.lead)}" fallback-src="${image.web}" fallback-alt="${html(image.alt)}" fallback-caption="${html(image.caption + ' ' + image.rights)}" />`
  } else if (slide.kind === 'case-application') {
    classes.push('reading-slide', 'ux-case-slide')
    const stage = serviceCase.stages.find(stage => stage.step === slide.step)
    if (!stage) throw new Error('Missing service application for step ' + slide.step)
    body = `<div class="ux-case-application"><div class="ux-case-columns"><div class="ux-case-decision"><p>${html(stage.context)}</p><h2>Decisione nel caso</h2><p>${html(stage.decision)}</p></div>`
      + `<div class="ux-case-artifact"><h2>${html(stage.artifactTitle)}</h2><table class="table"><tbody>`
      + stage.rows.map(row => `<tr><th scope="row">${html(row.label)}</th><td>${html(row.text)}</td></tr>`).join('')
      + `</tbody></table></div></div><p class="ux-case-handoff"><strong>${html(stage.artifactId)}.</strong> ${html(stage.handoff)}</p>`
      + `<p class="lesson-caption">Caso simulato · Dati, episodi e decisioni sono didattici; da verificare sul campo.</p></div>`
  } else if (slide.kind === 'service-prototype') {
    classes.push('reading-slide', 'ux-service-prototype-slide')
    body = `<UxServicePrototype version="${html(slide.prototypeVersion)}" start-at="${html(slide.prototypeStart)}" />`
  } else if (slide.kind === 'references') {
    classes.push('reading-slide')
    body = '<ul class="list lesson-references">' + slide.references.map(item => `<li class="list-row"><div>${item.url ? `<a class="link" href="${html(item.url)}" target="_blank" rel="noopener noreferrer">${html(item.label)}</a>` : `<strong>${html(item.label)}</strong>`}<p>${html(item.note)}</p></div></li>`).join('') + '</ul>'
  } else if (slide.kind === 'comparison' || slide.kind === 'sequence') {
    classes.push('reading-slide', 'concept-slide')
    if (slide.kind === 'sequence') classes.push('sequence-slide')
    const columns = slide.cards.length === 2 ? 'two' : 'three'
    body = '<div>' + lead + `<div class="cvedi-grid ${columns}">` + slide.cards.map(card => `<CvediCard title="${html(card.title)}"><p>${copy(card.text, slide.emphasis)}</p></CvediCard>`).join('') + '</div>'
      + (slide.notice ? `<CvediNotice class="mt-4" kind="${slide.notice.kind || 'question'}" title="${html(slide.notice.title)}"><p>${copy(slide.notice.text, slide.emphasis)}</p></CvediNotice>` : '') + '</div>'
  } else if (slide.kind === 'decision-table') {
    classes.push('reading-slide')
    body = `<div>${lead}<table class="table lesson-decision-table"><thead><tr><th scope="col">Incertezza</th><th scope="col">Prossima attività</th><th scope="col">Domanda da affrontare</th></tr></thead><tbody>`
      + slide.rows.map(row => `<tr><th scope="row">${html(row.uncertainty)}</th><td>${html(row.activity)}</td><td>${html(row.question)}</td></tr>`).join('') + '</tbody></table></div>'
  } else if (slide.kind === 'takeaway') {
    classes.push('reading-slide', 'process-takeaway')
    body = `<div><div class="lesson-statement">${html(slide.lead)}</div><div class="cvedi-grid three">` + slide.cards.map(card => `<CvediCard title="${html(card.title)}"><p>${copy(card.text, slide.emphasis)}</p></CvediCard>`).join('') + '</div></div>'
  } else {
    classes.push('reading-slide')
    if (slide.kind === 'illustrated') {
      classes.push('figure-slide', 'illustrated-process-slide')
      body = `<div class="lesson-columns"><div>${lead}${points}</div>${figure(slide.figures[0])}</div>`
    } else if (slide.kind === 'image') {
      classes.push('figure-slide', 'figure-comparison', 'screenshot-slide')
      if (slide.figureRole === 'document') classes.push('documentary-slide')
      body = figure(slide.figures[0])
    } else if (slide.kind === 'teaching') {
      classes.push('figure-slide', 'figure-comparison', 'teaching-figure-slide')
      body = `<div class="lesson-teaching-figure"><div class="lesson-teaching-intro">${lead}</div>${figure(slide.figures[0])}</div>`
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
    routeAlias: slide.alias, localOnly: true, bookletChapter: 9,
    bookletSource: plan.sourceFile, bookletFigures: slide.figures,
    ...(slide.step ? { uxStep: slide.step } : {}), ...extra }
  chunks.push('---\n' + Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')
    + '\n---\n\n# ' + slide.title + '\n\n' + body + '\n')
  mapping.push({ lessonSlide: index + 1, ...slide,
    bookPhysicalPages: slide.step ? references.bookStepPhysicalPages[slide.step] : [38, 45],
    preparatorySources: slide.step ? references.preparatoryStepSources[slide.step] : [] })
}
await writeFile(new URL('progetti/slide/lezioni/11-processo-ux-ui.md', root), chunks.join('\n'))
const manifest = { version: 2, lesson: plan.lesson, number: plan.number, palette: plan.palette,
  localOnly: true, sourceFile: plan.sourceFile,
  sourceSha256: createHash('sha256').update(await readFile(new URL(plan.sourceFile, root))).digest('hex'),
  editorialPlan: base + 'content-plan.json', imageManifest: base + 'image-manifest.json',
  references: base + 'references.json', generator: 'progetti/slide/scripts/build/processo-ux-ui-slides.mjs',
  processMapData: 'progetti/slide/data/ux-process-explorer.json',
  serviceCaseData: 'progetti/slide/data/ux-service-case.json',
  servicePrototypeData: 'progetti/slide/data/ux-service-prototype.json',
  designReferences: plan.designReferences,
  slideCount: mapping.length, minutes: mapping.reduce((sum, slide) => sum + slide.minutes, 0),
  activityMinutes: mapping.filter(slide => slide.kind === 'activity').reduce((sum, slide) => sum + slide.minutes, 0),
  slides: mapping }
await save(base + 'manifest.json', manifest)

const catalogFile = 'progetti/slide/data/card-artwork-local.json'
const catalog = await read(catalogFile)
catalog.mappings[plan.lesson] = Object.fromEntries([
  ...plan.slides.flatMap(slide => (slide.cards ?? []).map(card => [normalizeTitle(card.title), null])),
  ...plan.objectives.map(card => [normalizeTitle(card.title), plan.lesson + '-' + card.icon]),
])
for (const icon of assets.objectiveArtwork) catalog.assets[icon.id] = icon.web
await save(catalogFile, catalog)

const doc = `# Processo UX e UI · fonti della lezione 11

${manifest.slideCount} slide, ${manifest.minutes} minuti pianificati, inclusi ${manifest.activityMinutes} minuti di attività e 3 di restituzione. Presentazione locale, successiva a Composizione, con palette violet/Cedro e numerazione autonoma.

La struttura segue le quattordici attività del capitolo 3 di Matteo Di Pascale (2019), consultato nelle pagine fisiche 38–45 del PDF fornito. Carlo, Giovanni e Viola appartengono al caso narrativo del libro. Il capitolo 09 Typst è la fonte editoriale corrente; le lezioni 03–06 e 08 del 2025/26 e il booklet di dicembre 2024 contribuiscono ai contenuti. Percorsi, pagine fisiche, hash e fonti primarie sono in references.json. I richiami all’autore e al manuale sono omessi dai contenuti visibili su richiesta dell’utente; la provenienza completa rimane nei registri locali.

Le quattordici aperture usano domanda, tre attività, risultato atteso e richiamo applicato a una lezione precedente. Subito dopo ciascuna apertura, un’applicazione sviluppa lo stesso servizio: rete locale coordinata di fisioterapisti a domicilio. Il caso cumulativo è in data/ux-service-case.json; ogni elaborato ha un identificativo e usa il risultato del passo precedente. Requisiti R1–R5, criteri C1–C4 e tre episodi E1–E3 collegano struttura, prove e revisioni. Tutti gli episodi di ricerca e valutazione, gli indirizzi, i professionisti aggiunti, le disponibilità, le condizioni e i prezzi sono simulati. Nessun risultato didattico è presentato come ricerca svolta o dimostrazione dell’efficacia sul campo.

V0 mostra la prima bozza; V1 anticipa zona, fascia serale e totale; V2 distingue invio, attesa e accettazione del professionista; V3 conserva i dati durante il recupero e rende gestibili richieste e visite. UxServicePrototype dimostra tutte e quattro le versioni con controlli reali e dati locali in data/ux-service-prototype.json. La ricerca controlla la zona simulata scelta, senza geocodificare il domicilio. Le simulazioni di slot perso e conferma umana sono controlli didattici esterni all’interfaccia del servizio. Non viene inviata alcuna richiesta. Stampa ed export mostrano un riepilogo deterministico. La proposta finale conserva i limiti: disponibilità e tempi reali, condizioni effettive e prove con persone e tecnologie assistive.

Le 39 figure comprendono 25 ricostruzioni per la proiezione, sei nuovi elaborati del caso, tre documenti attribuiti e cinque illustrazioni IA; tre motivi vettoriali illustrano gli obiettivi. Le ricostruzioni mantengono gli originali in reconstruction.original. I nuovi esempi sono registrati in nativeDiagram con renderer, font e hash. Tutti i 31 schemi usano gabbia da 800 pt, canvas da 842 pt con 40 pt liberi per lo zoom, Nunito Sans in tracciati, corpo 15,5 pt e note 14 pt. Il font deriva dai contorni web con istanze 400/600/700 e famiglia CVeDI Diagram Sans; originale, licenza e ricevute restano in ricostruite/font/. Le verifiche misurano almeno 20 px per il corpo e 18 per le note nel canvas. I tre documenti conservano le attribuzioni: persona di Iulian Corunga, wireframe NS di Jolanda Dekker e dettaglio dichiarato WCC Properties di JH Specialty, con originale integrale conservato. Le cinque illustrazioni ImageGen conservano PNG, prompt, WebP lossless e hash. Caption, alternative e ingrandimento seguono il sistema condiviso. Nessun PDF del booklet viene compilato o aperto.

La mappa interattiva usa UxProcessExplorer con quattordici passi in cinque righe e pannello laterale. Frecce, Home, End, Tab ed Escape conservano la navigazione; stampa ed export usano la mappa nativa completa. La selezione mantiene il focus e collegamenti con contrasto almeno 3:1. Il piano conserva i riferimenti alle lezioni precedenti e tutti gli 80 alias originali nel medesimo ordine relativo. L’estensione intenzionale aggiunge 14 applicazioni, sei figure del caso e quattro versioni navigabili: 24 slide e 24 minuti. Le due attività rimangono di 8 e 10 minuti. Non sono aggiunte note del relatore o registrazioni. La lezione e i suoi asset esclusivi restano localOnly.

## Corrispondenze

| Slide | Titolo | Passaggio della fonte | Sezione del capitolo | Figure |
| --- | --- | --- | --- | --- |
` + mapping.map(slide => `| ${slide.lessonSlide} | ${slide.title} | ${slide.step ?? '—'} | ${slide.sourceHeading} | ${slide.figures.join(', ')} |`).join('\n') + '\n'
await writeFile(new URL('progetti/slide/docs/fonti/11-processo-ux-ui.md', root), doc)
console.log(`Processo UX/UI: ${manifest.slideCount} slides, ${manifest.minutes} minutes, ${manifest.activityMinutes} activity minutes.`)
