// Rebuild the complete lesson from its editorial data, preserved figures and script.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { stripAudioDelivery } from './audio-delivery.mjs'
const root = new URL('../../../../', import.meta.url)
const base = 'progetti/slide/assets/booklet/lezione-composizione/'
const read = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'))
const plan = await read(base + 'content-plan.json')
const notes = await read(base + 'speaker-notes.json')
const original = await read(base + 'speaker-notes-original.json')
const images = new Map((await read(base + 'image-manifest.json')).images.map(item => [item.code, item]))
const html = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const figure = code => {
  const image = images.get(code)
  if (!image) throw new Error('Missing composition figure: ' + code)
  return `<LessonFigure src="${image.web}" alt="${html(image.alt)}" caption="${html([image.caption, image.rights].filter(Boolean).join(' '))}" />`
}
const chunks = [], mapping = []
const kitWeb = '/materials/composizione/invito.txt'
for (const [index, slide] of plan.slides.entries()) {
  if (!notes[slide.alias]?.trim() || stripAudioDelivery(notes[slide.alias]) !== original[slide.alias])
    throw new Error(slide.alias + ': original and delivered script differ')
  const classes = ['content-slide', 'ux-process-lesson', 'lesson-slide', 'composizione-slide']
  const lead = slide.lead ? `<p class="lead">${html(slide.lead)}</p>` : ''
  const points = slide.points.length ? '<ul class="cvedi-list">' + slide.points.map(point => `<li><span>${html(point)}</span></li>`).join('') + '</ul>' : ''
  const extra = {}
  let body = ''
  if (slide.kind === 'cover') {
    classes.push('chapter-slide')
    extra.lessonNumber = 10
    body = '<ChapterMetro section="ux-composition" />'
  } else if (slide.kind === 'summary') {
    extra.layout = 'summary'
    extra.summaryStatement = slide.lead
    extra.summarySupport = slide.points[0]
  } else if (slide.kind === 'objectives') {
    classes.push('reading-slide', 'concept-slide')
    body = '<div class="cvedi-grid three">' + plan.objectives.map(card => `<CvediCard title="${html(card.title)}"><p>${html(card.text)}</p></CvediCard>`).join('') + '</div>'
  } else if (slide.kind === 'references') {
    classes.push('reading-slide')
    body = '<ul class="list lesson-references">' + slide.references.map(item => `<li class="list-row"><div><a class="link" href="${html(item.url)}" target="_blank" rel="noreferrer">${html(item.label)}</a><p>${html(item.note)}</p></div></li>`).join('') + '</ul>'
    if (slide.slug === 'fonti-3') body += '<p class="aside"><LessonDownload src="/materials/composizione/fonti.txt">Riferimenti completi e attribuzioni</LessonDownload></p>'
  } else {
    classes.push('reading-slide')
    if (slide.kind === 'pair') {
      classes.push('figure-slide', 'figure-pair', 'figure-comparison')
      body = `<div class="lesson-columns">${slide.figures.map(figure).join('')}</div>`
    } else if (slide.kind === 'teaching') {
      classes.push('figure-slide', 'figure-comparison', 'teaching-figure-slide')
      body = `<div class="lesson-teaching-figure"><div class="lesson-teaching-intro">${lead}</div>${figure(slide.figures[0])}</div>`
    } else if (slide.figures.length) {
      classes.push('figure-slide', 'figure-comparison')
      body = `<div class="lesson-columns"><div>${lead}${points}</div>${figure(slide.figures[0])}</div>`
    } else {
      body = `<div>${lead}${points}</div>`
      if (slide.kind === 'activity') {
        classes.push('lesson-activity')
        body = `<div>${lead}${points}<p class="aside">Attività · ${slide.minutes} minuti</p></div>`
      }
      if (slide.kind === 'materials') body = `<div>${lead}${points}<p class="aside">Dati simulati per l’esercizio. <LessonDownload src="${kitWeb}">Scarica testi e scheda</LessonDownload> · <LessonDownload src="/materials/composizione/invito-iniziale.svg">Scarica il layout iniziale</LessonDownload></p></div>`
    }
  }
  const fields = { layout: 'default', class: classes.join(' '), footer: plan.slides[0].title,
    lesson: plan.lesson, lessonSlide: index + 1, lessonMinutes: slide.minutes,
    routeAlias: slide.alias, bookletChapter: 8, bookletSource: plan.sourceFile,
    bookletFigures: slide.figures, ...extra }
  chunks.push('---\n' + Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')
    + '\n---\n\n# ' + slide.title + '\n\n' + body + '\n\n<!--\n' + notes[slide.alias] + '\n-->\n')
  mapping.push({ lessonSlide: index + 1, ...slide })
}
if (Object.keys(notes).length !== mapping.length) throw new Error('Unexpected narration aliases')
const manifest = { version: 1, lesson: plan.lesson, number: 10, palette: 'indigo',
  sourceFile: plan.sourceFile, sourceSha256: createHash('sha256').update(await readFile(new URL(plan.sourceFile, root))).digest('hex'),
  editorialPlan: base + 'content-plan.json', imageManifest: base + 'image-manifest.json',
  speakerNotesSource: base + 'speaker-notes.json', speakerNotesOriginalSource: base + 'speaker-notes-original.json',
  generator: 'progetti/slide/scripts/build/composizione-slides.mjs',
  slideCount: mapping.length, minutes: mapping.reduce((sum, slide) => sum + slide.minutes, 0), activityMinutes: 15,
  spokenWords: Object.values(original).reduce((sum, note) => sum + note.split(/\s+/u).length, 0), slides: mapping }
await writeFile(new URL('progetti/slide/lezioni/10-composizione-gerarchia.md', root), chunks.join('\n'))
await writeFile(new URL(base + 'manifest.json', root), JSON.stringify(manifest, null, 2) + '\n')
const materials = new URL('progetti/slide/public/materials/composizione/', root)
await mkdir(materials, { recursive: true })
await writeFile(new URL('invito.txt', materials), `CVeDI · Lezione 10 · Materiale simulato per l’esercizio\n\nLaboratorio di fotografia\nSabato 14 novembre\nDalle 10 alle 13\nSpazio Officina\nVia del Parco 8\nIscrizione gratuita\nAzione: Iscriviti\n\nIdea guida: sperimentare con la luce.\n\n1. Versione iniziale: usare il layout invito-iniziale.svg fornito con la lezione.\n2. Scrivere compito, priorità e informazioni da mantenere disponibili. Conservare testi, colori e comandi.\n3. Modificare una relazione (scala, posizione di un gruppo o enfasi). Annotare ciò che cambia e ciò che resta invariato.\n4. Affiancare le due versioni alla stessa dimensione.\n\nScheda di confronto\nRiferimento: quale proprietà interessa?\nScelta: dove intervengo e quale relazione voglio rendere riconoscibile?\nVerifica: quale compito permette di osservarne l’effetto?\n\nAttività: 8 minuti per la variazione, 7 per la prova. I tempi comprendono consegne e confronto.\nConsegna: trovare giorno, orario, luogo e modalità di iscrizione.\nAnnotare ordine di presentazione, risposte, esitazioni, associazioni ambigue e correzione.\nMostrare una versione per volta. Al primo giro una coppia comincia dalla versione iniziale, l’altra dalla variazione. Annotare l’ordine: il secondo tentativo risente della memoria. La prova è didattica, non un esperimento generalizzabile.\n`)
const bibliography = await read(base + 'references.json')
if (createHash('sha256').update(await readFile(new URL(bibliography.source, root))).digest('hex') !== bibliography.sourceSha256)
  throw new Error('Rebuild composition assets: bibliography changed')
const publicationText = publication => {
  const author = publication.author ?? publication.affiliated?.flatMap(person => person.names) ?? publication.publisher
  const authors = Array.isArray(author) ? author.join('; ') : author
  const serial = publication['serial-number'] ?? {}, parent = publication.parent ?? {}
  return [
    `${authors} (${String(publication.date).slice(0,4)}). ${publication.title}.`,
    publication.edition ? `${publication.edition}ª edizione.` : '',
    [parent.title, parent.volume, parent.issue ? `(${parent.issue})` : '', publication['page-range'] ? `pp. ${publication['page-range']}` : '', publication.publisher].filter(Boolean).join(', '),
    serial.isbn ? `ISBN: ${serial.isbn}` : '',
    serial.doi ? `https://doi.org/${serial.doi}` : publication.url,
  ].filter(Boolean).join('\n')
}
const links = new Map(mapping.flatMap(slide => slide.references ?? []).map(item => [item.url,item]))
await writeFile(new URL('fonti.txt', materials), 'CVeDI · Lezione 10 · Riferimenti e attribuzioni\n\nPubblicazioni\n\n'
  + Object.values(bibliography.publications).map(publicationText).join('\n\n')
  + '\n\nCollegamenti delle slide\n\n' + [...links.values()].map(item => [item.label,item.note,item.url].join('\n')).join('\n\n')
  + '\n\nAttribuzioni delle figure attive\n\n' + [...new Set(mapping.flatMap(slide => slide.figures))].map(code => {
    const image = images.get(code)
    return [image.caption, image.rights].join('\n')
  }).join('\n\n') + '\n')
const doc = `# Composizione e gerarchia visiva · fonti delle slide\n\nLezione 10: ${manifest.slideCount} slide, ${manifest.minutes} minuti, 15 minuti di attività. Fonte corrente: capitolo 08 Typst; nessun folio Figma storico attribuito ai nuovi contenuti.\n\nIl filo conduce dal compito del lettore alla scelta di immagini e segni, poi allo spazio, alle priorità e alla verifica. L’invito al laboratorio ritorna come caso guida; Sara distingue riconoscimento, scelta e attivazione. Il confronto di arte, cinema e videogiochi conserva contesto e limiti dei documenti.\n\nPiano, copione originale, copione con tag vocali e mapping sono in assets/booklet/lezione-composizione. Il generatore conserva integralmente note e sequenza. Il copione comprende ${manifest.spokenWords} parole; i tag di tono e pausa sono quelli della lezione 09. Non sono generati audio, selezioni o player.\n\nLe didascalie e i diritti derivano dal capitolo corrente; i manifest storici conservano provenienza e originali. Le moodboard provengono dai JPEG incorporati alle pagine fisiche 93 e 94 del booklet 2024, già registrati nel manifest locale. La seconda riproduzione è parziale alla fonte. Gli schemi sono esportati direttamente in SVG con DM Sans 9pt, mantenendo testo come contorni; Russell conserva i tre cerchi del capitolo. Il confronto controllato sposta soltanto il gruppo del luogo; il suo layout iniziale è scaricabile. I pannelli nativi di equilibrio e salienza sono ricomposti in orizzontale senza alterare i singoli disegni. Il confronto sfocato è un diagramma didattico alla stessa scala, non una misurazione del comportamento.\n\n## Mappa\n\n| Slide | Titolo | Sezione del capitolo | Figure |\n| --- | --- | --- | --- |\n` + mapping.map(slide => `| ${slide.lessonSlide} | ${slide.title} | ${slide.sourceHeading} | ${slide.figures.join(', ')} |`).join('\n') + '\n'
await writeFile(new URL('progetti/slide/docs/fonti/10-composizione-gerarchia.md', root), doc)
console.log(`Composition: ${manifest.slideCount} slides, ${manifest.minutes} minutes, ${manifest.spokenWords} spoken words.`)
