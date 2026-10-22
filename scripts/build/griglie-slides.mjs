// Rebuild the local grid lesson from its editorial plan and preserved figures.
// Content and source selection are data; the existing Slidev layouts own style.
import { readFile, writeFile } from 'node:fs/promises'
const root = new URL('../../', import.meta.url)
const base = 'assets/booklet/lezione-griglie/'
const read = async file => JSON.parse(await readFile(new URL(file, root), 'utf8'))
const plan = await read(base + 'content-plan.json')
const originals = await read('assets/dati/figure/griglia/figure.json')
const images = new Map((await read(base + 'image-manifest.json')).images.map(image => [image.code, image]))
const html = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const inline = value => html(value).replace(/`([^`]+)`/g, '<code>$1</code>')
const q = value => JSON.stringify(value)
const chunks = [], mappings = []

function append(slide, body, extra = {}) {
  const number = chunks.length + 1
  const alias = slide.alias ?? `griglie-layout-${slide.slug}`
  const classes = 'content-slide ux-process-lesson lesson-slide griglie-slide ' + (slide.classes ?? 'reading-slide')
  const fields = { layout: slide.layout ?? 'default', class: classes, footer: 'Griglie e layout',
    lesson: 'griglie-layout', lessonSlide: number, lessonMinutes: slide.minutes,
    routeAlias: alias, bookletChapter: 7, bookletSource: plan.sourceFile,
    bookletFigures: slide.figures ?? [], ...extra }
  chunks.push('---\n' + Object.entries(fields).map(([k, v]) => `${k}: ${q(v)}`).join('\n') + '\n---\n\n# ' + slide.title + '\n\n' + body.trim() + '\n')
  mappings.push({ lessonSlide: number, title: slide.title, alias, section: slide.section ?? 0,
    sourceHeading: slide.sourceHeading ?? 'Dallo spazio alla struttura', figures: slide.figures ?? [], minutes: slide.minutes,
    ...(slide.figureTexts ? { figureTexts: slide.figureTexts } : {}) })
}

function figure(code, texts = {}) {
  const original = originals[code]
  const caption = (texts[code]?.caption ?? original.didascalia) + (original.diritti ? ' ' + original.diritti : '')
  return `<LessonFigure src="${images.get(code).web}" alt="${html(texts[code]?.alt ?? original.alt)}" caption="${html(caption)}" />`
}

append({ title: 'Griglie e layout', alias: 'griglie-layout', minutes: .5,
  classes: 'chapter-slide' }, '<ChapterMetro section="ux-type" />')
append({ title: 'Organizzare, adattare, verificare', slug: 'sintesi', minutes: .5, layout: 'summary' }, '', {
  summaryStatement: 'La griglia mette in relazione contenuti, spazio e priorità.',
  summarySupport: 'Dalla pagina al viewport: costruire regole, adattare il layout e verificarlo con testi, immagini e azioni reali.',
})

for (const section of plan.sections) {
  append({ title: section.title, slug: `sezione-${section.number}`, section: section.number,
    minutes: 0, classes: 'chapter-slide section-divider', sourceHeading: section.sourceHeading },
  `${section.description}\n\n<ChapterMetro section="ux-type" />`, { sectionDivider: true, sectionNumber: section.number })
  for (const slide of plan.slides.filter(slide => slide.section === section.number)) {
    let copy = `<p class="lead">${inline(slide.lead)}</p>`
    const points = '<ul class="cvedi-list">' + slide.points.map(point => `<li><span>${inline(point)}</span></li>`).join('') + '</ul>'
    const links = slide.sources?.length ? '<p class="aside">' + slide.sources.map(source => `<a class="link" href="${html(source.url)}" target="_blank" rel="noreferrer">${html(source.label)}</a>`).join(' · ') + '</p>' : ''
    if (slide.figures.length) {
      slide.classes = 'reading-slide figure-slide figure-comparison'
      if (slide.fullWidth) {
        slide.classes += ' image-panels'
        copy = `<div class="lesson-columns"><div>${copy}<p>${slide.points.map(inline).join(' ')}</p></div>${figure(slide.figures[0], slide.figureTexts)}</div>`
      } else if (slide.figures.length > 1) {
        slide.classes += ' typography-slide'
        copy = `<div class="lesson-columns"><div>${copy}${points}${links}</div><div class="typography-gallery"><div class="typography-images typography-images-${slide.figures.length}">${slide.figures.map(code => figure(code, slide.figureTexts)).join('')}</div></div></div>`
      } else {
        copy = `<div class="lesson-columns"><div>${copy}${points}${links}</div>${figure(slide.figures[0], slide.figureTexts)}</div>`
      }
    } else copy = `<div>${copy}${points}${links}</div>`
    append(slide, copy)
  }
}
for (const [index, group] of plan.references.entries()) {
  append({ title: group.title, slug: `fonti-${index + 1}`, minutes: .5, section: 7,
    sourceHeading: 'Lettura delle fonti' },
  '<ul class="list griglie-references">' + group.items.map(item => `<li class="list-row"><div><a class="link" href="${html(item.url)}" target="_blank" rel="noreferrer">${html(item.label)}</a><p>${html(item.note)}</p></div></li>`).join('') + '</ul>')
}

const manifest = { version: 1, lesson: 'griglie-layout', sourceFile: plan.sourceFile,
  assetManifest: 'assets/images/figure/griglia/manifest.json', imageManifest: base + 'image-manifest.json',
  editorialPlan: base + 'content-plan.json', generator: 'scripts/build/griglie-slides.mjs',
  archivedSlides: 'assets/booklet/lezione-08-tipografia/griglie-interfacce-archive.json',
  slideCount: mappings.length, minutes: mappings.reduce((sum, slide) => sum + slide.minutes, 0), slides: mappings }
await writeFile(new URL('lezioni/07-griglie-layout.md', root), chunks.join('\n'))
await writeFile(new URL(base + 'manifest.json', root), JSON.stringify(manifest, null, 2) + '\n')

let doc = '# Griglie e layout · fonti delle slide\n\n'
doc += `Il set autonomo locale segue Tipografia, senza cambiare la numerazione delle lezioni esistenti. Comprende ${manifest.slideCount} slide, sette sezioni e ${manifest.minutes} minuti pianificati, inclusi 15 minuti di attività.\n\n`
doc += 'La fonte testuale corrente è `typst-booklet/capitoli/07-griglia.typ`, comprese le integrazioni locali successive alla Page Figma `4954:42`. Non si attribuiscono ai nuovi contenuti ordinali o folio dello snapshot storico. Il piano editoriale e la mappa delle slide sono in `assets/booklet/lezione-griglie/`; le 19 slide precedenti restano nell’archivio di Tipografia con le loro attribuzioni e note.\n\n'
doc += 'Le figure riusano gli originali del capitolo. Negli SVG per le slide, il testo diventa tracciato del font DM Sans originale: geometrie, testi, immagini e colori restano quelli della fonte. Originali, hash, font e licenze sono registrati in `image-manifest.json`; la ricostruzione avviene con `scripts/build/griglie-assets.py` e `scripts/build/griglie-slides.mjs`. Tutte le figure conservano alternativa testuale, didascalia, diritti e ingrandimento condiviso. La descrizione di Greiman indica la sola vista complessiva mostrata nella slide; la caption originale con il dettaglio resta nel catalogo. Le caselle vuote della matrice 398, assenti nel font originale, sono segni geometrici documentati nel manifest.\n\n'
doc += 'Gli schemi storici su responsive/adaptive, percentuali di attenzione e «Area aurea» sono accompagnati dalla lettura critica del capitolo. Vogue è un confronto storico, non una descrizione del sito attuale; le immagini non consentono di ricostruire breakpoint, tracce CSS o voci nascoste. Reflow, ingrandimento e spaziatura sono prove distinte del prodotto implementato.\n\n'
doc += '| Slide | Titolo | Sezione della fonte | Figure |\n|---|---|---|---|\n'
doc += mappings.map(slide => `| ${slide.lessonSlide} | ${slide.title} | ${slide.sourceHeading} | ${slide.figures.join(', ') || '—'} |`).join('\n')
doc += '\n\nLe fonti primarie del capitolo sono in `typst-booklet/bibliografia/07-griglia.yml`; i collegamenti didattici delle slide sono conservati nel piano editoriale. Le attribuzioni delle opere non vengono sostituite dalle fonti tecniche.\n'
await writeFile(new URL('docs/fonti/07-griglie-layout.md', root), doc)
console.log(`Griglie e layout: ${manifest.slideCount} slide, ${manifest.minutes} minuti.`)
