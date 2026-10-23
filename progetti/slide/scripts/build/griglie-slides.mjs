// Rebuild the grid lesson from its editorial plan and preserved figures.
// Content and source selection are data; the existing Slidev layouts own style.
import { readFile, writeFile } from 'node:fs/promises'
import { stripAudioDelivery } from './audio-delivery.mjs'
const root = new URL('../../../../', import.meta.url)
const base = 'progetti/slide/assets/booklet/lezione-griglie/'
const read = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'))
const plan = await read(base + 'content-plan.json')
const notesSource = base + 'speaker-notes.json'
const speakerNotesOriginalSource = base + 'speaker-notes-original.json'
const notes = await read(notesSource)
const audioSelectionSource = base + 'audio-approved.json'
const audioSelection = await read(audioSelectionSource)
const teaching = await read('progetti/slide/assets/slide-materials/griglie/manifest.json')
const teachingCodes = new Set(teaching.images.map(image => image.code))
const kit = await read(teaching.exerciseKit.source)
const originals = { ...await read('risorse-condivise/dati/figure/griglia/figure.json'),
  ...Object.fromEntries(teaching.images.map(image => [image.code, { didascalia: image.caption, alt: image.alt, diritti: ' ' + image.attribution + '.' }])) }
const images = new Map([...(await read(base + 'image-manifest.json')).images, ...teaching.images].map(image => [image.code, image]))
const html = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const inline = value => html(value).replace(/`([^`]+)`/g, '<code>$1</code>')
const q = value => JSON.stringify(value)
const chunks = [], mappings = []
// Blank lines let Slidev parse native KaTeX blocks within the HTML layout.
const equation = (tex, variant = 'rule') => tex
  ? `\n\n<div class="lesson-equation lesson-equation-${variant}">\n\n$$\n${tex}\n$$\n\n</div>\n\n`
  : ''

function append(slide, body, extra = {}) {
  const number = chunks.length + 1
  const alias = slide.alias ?? `griglie-layout-${slide.slug}`
  const narration = notes[alias]
  if (typeof narration !== 'string' || !narration.trim() || /<!--|-->/.test(narration))
    throw new Error(`${alias}: a complete plain-text narration is required`)
  stripAudioDelivery(narration)
  const classes = 'content-slide ux-process-lesson lesson-slide griglie-slide ' + (slide.classes ?? 'reading-slide')
  const fields = { layout: slide.layout ?? 'default', class: classes, footer: 'Griglie e layout',
    lesson: 'griglie-layout', lessonSlide: number, lessonMinutes: slide.minutes,
    routeAlias: alias, bookletChapter: 7, bookletSource: plan.sourceFile,
    ...(audioSelection.clips[alias] ? { narrationAudio: audioSelection.clips[alias].web } : {}),
    bookletFigures: (slide.figures ?? []).filter(code => !teachingCodes.has(code)),
    ...((slide.figures ?? []).some(code => teachingCodes.has(code)) ? { teachingFigures: slide.figures.filter(code => teachingCodes.has(code)) } : {}),
    ...(slide.origin ? { teachingSource: 'progetti/slide/assets/slide-materials/griglie/manifest.json' } : {}), ...extra }
  chunks.push('---\n' + Object.entries(fields).map(([k, v]) => `${k}: ${q(v)}`).join('\n') + '\n---\n\n# ' + slide.title + '\n\n' + body.trim() + '\n\n<!--\n' + narration.trim() + '\n-->\n')
  mappings.push({ lessonSlide: number, title: slide.title, alias, section: slide.section ?? 0,
    sourceHeading: slide.sourceHeading ?? 'Dallo spazio alla struttura', figures: slide.figures ?? [], minutes: slide.minutes,
    ...(slide.figureTexts ? { figureTexts: slide.figureTexts } : {}), ...(slide.origin ? { origin: slide.origin } : {}) })
}

function figure(code, texts = {}) {
  const original = originals[code]
  const caption = (texts[code]?.caption ?? original.didascalia) + (original.diritti ? ' ' + original.diritti : '')
  return `<LessonFigure src="${images.get(code).web}" alt="${html(texts[code]?.alt ?? original.alt)}" caption="${html(caption)}" />`
}

append({ title: 'Griglie e layout', alias: 'griglie-layout', minutes: .5,
  classes: 'chapter-slide' }, '<ChapterMetro section="ux-grid" />', { lessonNumber: 9 })
append({ title: 'Organizzare, adattare, verificare', slug: 'sintesi', minutes: .5, layout: 'summary' }, '', {
  summaryStatement: 'La griglia mette in relazione contenuti, spazio e priorità.',
  summarySupport: 'Dalla pagina al viewport: costruire regole, adattare il layout e verificarlo con testi, immagini e azioni reali.',
})
append({ ...plan.objectives, slug: 'obiettivi', classes: 'reading-slide concept-slide' },
  '<div class="cvedi-grid three">' + plan.objectives.cards.map(card => `<CvediCard title="${html(card.title)}"><p>${inline(card.text)}</p></CvediCard>`).join('') + '</div>')

for (const section of plan.sections) {
  for (const slide of plan.slides.filter(slide => slide.section === section.number)) {
    let copy = `<p class="lead">${inline(slide.lead)}</p>${equation(slide.formula)}`
    const points = '<ul class="cvedi-list">' + slide.points.map(point => `<li><span>${inline(point)}</span></li>`).join('') + '</ul>'
    const links = slide.sources?.length ? '<p class="aside">' + slide.sources.map(source => `<a class="link" href="${html(source.url)}" target="_blank" rel="noreferrer">${html(source.label)}</a>`).join(' · ') + '</p>' : ''
    const activity = Number.isFinite(slide.activityMinutes) ? `<p class="aside">Attività · ${slide.activityMinutes} minuti</p>` : ''
    const example = slide.example ? `<p class="lesson-equation-context">${inline(slide.example.text)}</p>${equation(slide.example.tex, 'example')}` : ''
    const supporting = `${points}${example}${links}${activity}`
    const classes = ['reading-slide', ...(slide.formula ? ['formula-slide'] : []), ...(activity ? ['lesson-activity'] : [])]
    if (slide.kind === 'exercise-material') {
      copy += `<div class="lesson-materials"><div><p>${html(kit.text)}</p></div><div><h2>Tre appuntamenti</h2><ul class="cvedi-list">${kit.appointments.map(item => `<li><span>${html(item)}</span></li>`).join('')}</ul><h2>Nota di servizio</h2><p>${html(kit.note)}</p><p class="aside">Contenuti simulati per l’esercizio.</p><LessonDownload src="${teaching.exerciseKit.download}">Scarica testo e immagine</LessonDownload></div></div>`
    } else if (slide.kind === 'teaching-figure') {
      classes.push('figure-slide', 'figure-comparison', 'teaching-figure-slide')
      copy = `<div class="lesson-teaching-figure"><div class="lesson-teaching-intro${slide.formula ? ' with-equation' : ''}"><p class="lead">${inline(slide.lead)}</p>${equation(slide.formula)}</div>${figure(slide.figures[0], slide.figureTexts)}${links}</div>`
    } else if (slide.kind === 'figure-pair') {
      classes.push('figure-slide', 'figure-pair')
      copy = `<div class="lesson-columns">${slide.figures.map(code => figure(code, slide.figureTexts)).join('')}</div>`
    } else if (slide.figures.length) {
      classes.push('figure-slide', 'figure-comparison')
      if (slide.fullWidth) {
        classes.push('image-panels')
        copy = `<div class="lesson-columns"><div>${copy}<div>${supporting}</div></div>${figure(slide.figures[0], slide.figureTexts)}</div>`
      } else if (slide.figures.length > 1) {
        throw new Error(`${slide.slug}: declare an explicit figure-pair slide for a full-width documentary comparison`)
      } else {
        copy = `<div class="lesson-columns"><div>${copy}${supporting}</div>${figure(slide.figures[0], slide.figureTexts)}</div>`
      }
    } else copy = `<div>${copy}${supporting}</div>`
    append({ ...slide, classes: classes.join(' ') }, copy)
  }
}
for (const [index, group] of plan.references.entries()) {
  append({ title: group.title, slug: `fonti-${index + 1}`, minutes: .5, section: 7,
    sourceHeading: 'Lettura delle fonti' },
  '<ul class="list griglie-references">' + group.items.map(item => `<li class="list-row"><div><a class="link" href="${html(item.url)}" target="_blank" rel="noreferrer">${html(item.label)}</a><p>${html(item.note)}</p></div></li>`).join('') + '</ul>')
}

const manifest = { version: 1, lesson: 'griglie-layout', sourceFile: plan.sourceFile,
  assetManifest: 'risorse-condivise/immagini/figure/griglia/manifest.json', imageManifest: base + 'image-manifest.json',
  editorialPlan: base + 'content-plan.json', generator: 'progetti/slide/scripts/build/griglie-slides.mjs',
  speakerNotesSource: notesSource,
  speakerNotesOriginalSource,
  audioSelectionSource,
  teachingMaterials: 'progetti/slide/assets/slide-materials/griglie/manifest.json',
  simplifiedContentArchive: base + 'simplification-archive.json',
  archivedSlides: 'progetti/slide/assets/booklet/lezione-08-tipografia/griglie-interfacce-archive.json',
  slideCount: mappings.length, minutes: mappings.reduce((sum, slide) => sum + slide.minutes, 0), slides: mappings }
const activeAliases = new Set(mappings.map(slide => slide.alias))
for (const alias of Object.keys(notes))
  if (!activeAliases.has(alias)) throw new Error(`${alias}: narration has no active slide`)
for (const alias of Object.keys(audioSelection.clips))
  if (!activeAliases.has(alias)) throw new Error(`${alias}: approved audio has no active slide`)
await writeFile(new URL('progetti/slide/lezioni/07-griglie-layout.md', root), chunks.join('\n'))
await writeFile(new URL(base + 'manifest.json', root), JSON.stringify(manifest, null, 2) + '\n')

let doc = '# Griglie e layout · fonti delle slide\n\n'
doc += `La lezione 09, autonoma e pubblicata online, segue Tipografia (08) e conclude il percorso delle lezioni. Comprende ${manifest.slideCount} slide senza divisori intermedi e ${manifest.minutes} minuti pianificati, inclusi 15 minuti di attività.\n\n`
doc += 'La fonte testuale corrente è `progetti/booklet/capitoli/07-griglia.typ`, comprese le integrazioni locali successive alla Page Figma `4954:42`. Non si attribuiscono ai nuovi contenuti ordinali o folio dello snapshot storico. Il piano editoriale e la mappa delle slide sono in `progetti/slide/assets/booklet/lezione-griglie/`; le 19 slide precedenti restano nell’archivio di Tipografia con le loro attribuzioni e note.\n\n'
doc += 'Le figure riusano gli originali del capitolo. Negli SVG per le slide, il testo diventa tracciato del font DM Sans originale: geometrie, testi, immagini e colori restano quelli della fonte. Originali, hash, font e licenze sono registrati in `image-manifest.json`; la ricostruzione avviene con `progetti/slide/scripts/build/griglie-assets.py` e `progetti/slide/scripts/build/griglie-slides.mjs`. Tutte le figure conservano alternativa testuale, didascalia, diritti e ingrandimento condiviso. La descrizione di Greiman indica la sola vista complessiva mostrata nella slide; la caption originale con il dettaglio resta nel catalogo. Le caselle vuote della matrice 398, assenti nel font originale, sono segni geometrici documentati nel manifest.\n\n'
doc += 'Le integrazioni didattiche originali sono distinte dalle figure del booklet: confronti su box model, ordine delle colonne, query, Grid/Flexbox, immagini e rapporto aureo, più il kit simulato «Luce e spazio». Sorgenti SVG, font, hash, riferimenti e contenuti del kit sono in `progetti/slide/assets/slide-materials/griglie/manifest.json`; il generatore è `progetti/slide/scripts/build/griglie-teaching-assets.py`. Non hanno folio o nodi Figma attribuiti.\n\n'
doc += 'I nove passaggi accorpati o esclusi sono conservati in `simplification-archive.json`, con piano, mapping, Markdown e rimandi ai contenuti attivi. Fra questi restano gli schemi storici su responsive/adaptive, percentuali di attenzione e «Area aurea», insieme alla precedente lettura critica. Vogue rimane un confronto storico, non una descrizione del sito attuale; le immagini non consentono di ricostruire breakpoint, tracce CSS o voci nascoste. Reflow, ingrandimento e spaziatura restano prove distinte del prodotto implementato.\n\n'
doc += 'Le 63 note del relatore autorizzate sono un copione italiano per sintesi vocale, conservato per alias in `speaker-notes.json` e inserito dal generatore nei commenti Slidev. Approfondiscono i contenuti attivi con il capitolo corrente, senza riattivare i passaggi archiviati. Numeri e formule sono pronunciabili, le attività invitano a sospendere l’audio e le fonti non vengono lette come indirizzi. Tutte le note includono direttamente `[calm, matter-of-fact delivery]` e pause più distese, con stabilità comune 0,90; rimuovendo i soli tag si recupera il testo integrale conservato in `speaker-notes-original.json`. Ogni slide dispone di una nuova registrazione coerente con queste note e di controlli di riproduzione condivisi. Dopo la verifica integrale dei 63 file, le registrazioni precedenti sono rimosse su richiesta; i relativi metadati restano separati in `archivedClips` del manifest audio. La selezione non contiene rigenerazioni in attesa. Il copione mira a circa 60 minuti di parlato; i 15 minuti di attività restano autonomi e il budget della presentazione resta 78 minuti.\n\n'
doc += '| Slide | Titolo | Sezione della fonte | Figure |\n|---|---|---|---|\n'
doc += mappings.map(slide => `| ${slide.lessonSlide} | ${slide.title} | ${slide.sourceHeading} | ${slide.figures.join(', ') || '—'} |`).join('\n')
doc += '\n\nLe fonti primarie del capitolo sono in `progetti/booklet/bibliografia/07-griglia.yml`; i collegamenti didattici delle slide sono conservati nel piano editoriale. Le attribuzioni delle opere non vengono sostituite dalle fonti tecniche.\n'
await writeFile(new URL('progetti/slide/docs/fonti/07-griglie-layout.md', root), doc)
console.log(`Griglie e layout: ${manifest.slideCount} slide, ${manifest.minutes} minuti.`)
