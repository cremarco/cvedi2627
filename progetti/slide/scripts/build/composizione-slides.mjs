// Rebuild the complete lesson from its editorial data, preserved figures and script.
import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { stripAudioDelivery } from './audio-delivery.mjs'
const root = new URL('../../../../', import.meta.url)
const base = 'progetti/slide/assets/booklet/lezione-composizione/'
const read = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'))
const plan = await read(base + 'content-plan.json')
const notes = await read(base + 'speaker-notes.json')
const original = await read(base + 'speaker-notes-original.json')
const audioSelectionSource = base + 'audio-approved.json'
const audioSelection = await read(audioSelectionSource)
const pendingAudio = audioSelection.pendingGeneration ?? []
const disabledAudio = plan.slides.filter(slide => slide.narrationEnabled === false)
if (audioSelection.version !== 1 || audioSelection.lesson !== plan.lesson
  || JSON.stringify(Object.keys(audioSelection.clips)) !== JSON.stringify(plan.slides.filter(slide => audioSelection.clips[slide.alias]).map(slide => slide.alias))
  || disabledAudio.some(slide => audioSelection.clips[slide.alias])
  || JSON.stringify(pendingAudio) !== JSON.stringify(plan.slides.filter(slide => slide.narrationEnabled !== false && !audioSelection.clips[slide.alias]).map(slide => slide.alias)))
  throw new Error('Composition requires an ordered selection and an explicit list of missing recordings')
const images = new Map((await read(base + 'image-manifest.json')).images.map(item => [item.code, item]))
const html = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const figure = (code, showCaption = true) => {
  const image = images.get(code)
  if (!image) throw new Error('Missing composition figure: ' + code)
  const caption = showCaption ? ` caption="${html([image.caption, image.rights].filter(Boolean).join(' '))}"` : ''
  return `<LessonFigure src="${image.web}" alt="${html(image.alt)}"${caption} />`
}
const chunks = [], mapping = []
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
  } else {
    classes.push('reading-slide')
    if (slide.kind === 'image') {
      classes.push('figure-slide', 'figure-comparison', 'screenshot-slide')
      body = figure(slide.figures[0], slide.showCaption !== false)
    } else if (slide.kind === 'pair') {
      classes.push('figure-slide', 'figure-pair', 'figure-comparison')
      body = `<div class="lesson-columns">${slide.figures.map(code => figure(code)).join('')}</div>`
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
    }
  }
  const fields = { layout: 'default', class: classes.join(' '), footer: plan.slides[0].title,
    lesson: plan.lesson, lessonSlide: index + 1, lessonMinutes: slide.minutes,
    routeAlias: slide.alias, bookletChapter: 8, bookletSource: plan.sourceFile,
    ...(audioSelection.clips[slide.alias] ? { narrationAudio: audioSelection.clips[slide.alias].web } : {}),
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
  audioSelectionSource,
  excludedSlidesSource: plan.excludedSlidesSource,
  generator: 'progetti/slide/scripts/build/composizione-slides.mjs',
  slideCount: mapping.length, minutes: mapping.reduce((sum, slide) => sum + slide.minutes, 0),
  activityMinutes: mapping.filter(slide => slide.kind === 'activity').reduce((sum, slide) => sum + slide.minutes, 0),
  spokenWords: Object.values(original).reduce((sum, note) => sum + note.split(/\s+/u).length, 0), slides: mapping }
await writeFile(new URL('progetti/slide/lezioni/10-composizione-gerarchia.md', root), chunks.join('\n'))
await writeFile(new URL(base + 'manifest.json', root), JSON.stringify(manifest, null, 2) + '\n')
const doc = `# Composizione e gerarchia visiva · fonti delle slide\n\nLezione 10: ${manifest.slideCount} slide, ${manifest.minutes} minuti, ${manifest.activityMinutes} minuti di attività. Fonte corrente: capitolo 08 Typst; nessun folio Figma storico attribuito ai nuovi contenuti.\n\nIl filo conduce dal compito del lettore alla scelta di immagini e segni, poi allo spazio, alle priorità e alla verifica. L’invito al laboratorio ritorna come caso guida e si conclude con la proposta finale generata con IA nella slide 59; Sara distingue riconoscimento, scelta e attivazione. Il confronto di arte e cinema conserva contesto e limiti dei documenti. Gli esempi Fortnite, Dead Space, le due tavole moodboard e il blocco conclusivo di materiali, attività, restituzione e chiusura sono esclusi; piano, Markdown, copioni e provenienza delle figure restano in excluded-slides.json. Gli audio non selezionati e i download non più collegati sono eliminati su richiesta; le ricevute restano nel manifest audio.\n\nPiano, copione originale, copione con tag vocali e mapping sono in assets/booklet/lezione-composizione. Il generatore conserva integralmente note e sequenza. Il copione comprende ${manifest.spokenWords} parole; i tag di tono e pausa sono quelli della lezione 09. ${Object.keys(audioSelection.clips).length} slide selezionano una registrazione in audio-approved.json tramite narrationAudio e riusano il player condiviso. ${pendingAudio.length ? pendingAudio.length + ' alias restano esplicitamente in pendingGeneration, senza player con file mancanti.' : 'La selezione copre tutti gli alias abilitati, senza registrazioni in attesa.'} ${disabledAudio.length ? disabledAudio.length + ' slide hanno l’audio disattivato; i copioni e le ricevute restano conservati.' : ''} Le ricevute con testo, parametri, durata e hash sono in assets/audio/lezione-composizione; voce e impostazioni coincidono con audio-settings.json della lezione Griglie e layout. La sintesi resta separata dalla build.\n\nLe didascalie e i diritti derivano dal capitolo corrente; i manifest storici conservano provenienza e originali. La figura della slide 22 applica la correzione didattica dichiarata in figure-overrides.json: ritratto generato con IA, looking room orizzontale e headroom verticale sopra la testa intera. Il raster acquisito resta conservato; della registrazione precedente rimane la ricevuta dopo la pulizia richiesta; didascalia, copione e audio correnti descrivono l’esempio corretto. Le moodboard escluse provengono dai JPEG incorporati alle pagine fisiche 93 e 94 del booklet 2024, già registrati nel manifest locale. Gli originali restano conservati; la seconda riproduzione è parziale alla fonte. Gli schemi sono esportati direttamente in SVG con DM Sans 9pt, mantenendo testo come contorni; Russell conserva i tre cerchi del capitolo. Il confronto controllato sposta soltanto il gruppo del luogo; i sorgenti del confronto restano conservati. I pannelli nativi di equilibrio e salienza sono ricomposti in orizzontale senza alterare i singoli disegni. Il confronto sfocato è un diagramma didattico alla stessa scala, non una misurazione del comportamento.\n\n## Mappa\n\n| Slide | Titolo | Sezione del capitolo | Figure |\n| --- | --- | --- | --- |\n` + mapping.map(slide => `| ${slide.lessonSlide} | ${slide.title} | ${slide.sourceHeading} | ${slide.figures.join(', ')} |`).join('\n') + '\n'
await writeFile(new URL('progetti/slide/docs/fonti/10-composizione-gerarchia.md', root), doc)
console.log(`Composition: ${manifest.slideCount} slides, ${manifest.minutes} minutes, ${manifest.spokenWords} spoken words.`)
