import { readFile, writeFile } from 'node:fs/promises'
import { normalizeTitle } from '../../utils/normalize-title.mjs'
import { readFileSync } from 'node:fs'

const root = new URL('../..', import.meta.url)
const read = async p => JSON.parse(await readFile(new URL(p, root), 'utf8'))
const save = async (p, d) => writeFile(new URL(p, root), JSON.stringify(d, null, 2) + '\n')
const source = await read('assets/booklet/lezione-05-accessibilita/figma-source.json')
const plan = await read('data/lesson-05-accessibility.json')
const imageManifest = await read('assets/booklet/lezione-05-accessibilita/image-manifest.json')
const assets = new Map(imageManifest.assets.map(a => [a.id, a]))
const examples = await read('assets/booklet/accessibilita-commenti-2026-10/esempi.json')
const exampleManifest = await read('assets/booklet/accessibilita-commenti-2026-10/imagegen-esempi-v2/manifest.json')
const demoInstructionsSource = readFileSync(new URL('data/accessibility-demos.ts', root), 'utf8')
const demoInstructions = Object.fromEntries([...demoInstructionsSource.matchAll(/^\s*(?:'([^']+)'|(\w+)): '([^']+)',/gm)].map(m => [m[1] || m[2], m[3]]))
const title = 'Accessibilità e design inclusivo'
const escape = s => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
// Generation metadata stays in the manifests, outside presented figure copy.
const presentationText = value => String(value).replace(/\s*\b(?:Imagen|ImageGen)\b/gi, '').replace(/\s+([.,;:!?])/g, '$1').trim()
const figure = (asset, caption) => `<LessonFigure src="${asset.web}" alt="${escape(presentationText(asset.alt || asset.caption))}" caption="${escape(presentationText(caption || asset.caption))}" />`
const sourceRows = new Map(source.frames.map((f, i) => [f.id, { ...f, folio: Number(f.texts.find(t => t.name.startsWith('Numero pagina'))?.text || (168 + i)) }]))
const added = []
for (const frame of source.frames) {
  const specs = plan.slides.filter(s => s.sourceNodes.includes(frame.id))
  const example = exampleManifest.assets.find(a => a.pageId === frame.id)
  if (example) {
    const e = examples.find(e => e.key === example.key)
    specs.push({ sourceNodes: [frame.id], title: e.title, alias: 'accessibilita-esempio-' + e.key, exampleKey: e.key,
      images: [{ asset: `l05-${e.key}-barriere`, caption: 'Barriera · ' + e.barrier }, { asset: `l05-${e.key}-scelte`, caption: 'Scelta di progetto · ' + e.choice }],
      notice: e.verify, simulated: true })
  }
  for (const [index, spec] of specs.entries()) {
    const imageIds = spec.images?.map(i => i.asset) || []
    const classes = ['content-slide', 'ux-process-lesson', 'lesson-slide', 'reading-slide', 'accessibility-slide']
    if (spec.cards) classes.push('concept-slide')
    if (spec.statement) classes.push('statement-slide')
    if (spec.images) classes.push('figure-slide', spec.images.length > 1 ? 'figure-pair' : 'figure-dominant')
    if (spec.images?.length === 1) classes.push('screenshot-slide')
    if (spec.simulated) classes.push('figure-comparison')
    let body = `# ${spec.title}\n\n`
    if (spec.statement) body += `<div class="lesson-statement">${escape(spec.statement)}</div>\n<p class="lead">${escape(spec.support)}</p>\n`
    else if (spec.lead) body += `<p class="lead">${escape(spec.lead)}</p>\n`
    if (spec.cards) body += `<div class="cvedi-grid${spec.cards.length === 3 ? ' three' : spec.cards.length === 4 ? ' four' : ''}">` + spec.cards.map(c => `<CvediCard title="${escape(c.title)}"><p>${escape(c.text)}</p></CvediCard>`).join('') + '</div>\n'
    if (spec.points?.length) body += '<ul class="cvedi-list">' + spec.points.map(p => `<li><span>${escape(p)}</span></li>`).join('') + '</ul>\n'
    if (spec.images) {
      const figures = spec.images.map(i => { const a = assets.get(i.asset); if (!a) throw new Error(i.asset); return figure(a, i.caption && (spec.triptych ? i.caption + ' · ' + a.caption.split(' · ')[0] : i.caption)) })
      body += spec.images.length === 1 ? figures[0] + '\n' : `<div class="${spec.triptych ? 'lesson-columns figure-triptych' : 'lesson-columns'}">${figures.join('')}</div>\n`
    }
    if (spec.notice) body += `<CvediNotice kind="explore" title="${spec.simulated ? 'Come verificare · esempio simulato' : 'Da tenere presente'}"><p>${escape(spec.notice)}</p></CvediNotice>\n`
    const frontmatter = { layout: 'default', class: classes.join(' '), footer: title, lesson: 'percezione-gerarchia', lessonMinutes: spec.simulated ? 1.5 : 1,
      lessonSection: 'accessibility', routeAlias: spec.alias || `accessibilita-${frame.id.replace(':', '-')}-${index + 1}`, bookletNodes: spec.sourceNodes,
      bookletFolios: spec.sourceNodes.map(id => sourceRows.get(id).folio), bookletAssets: imageIds }
    added.push({ title: spec.title, content: body, frontmatter, spec })
    if (spec.simulated) {
      if (!demoInstructions[spec.exampleKey]) throw new Error('Missing live task: ' + spec.exampleKey)
      added.push({ title: 'Prova · ' + spec.title,
        content: `# Prova · ${spec.title}\n\n<AccessibilityExample example-id="${spec.exampleKey}" />\n`,
        frontmatter: { ...frontmatter, class: 'content-slide ux-process-lesson lesson-slide reading-slide accessibility-slide interactive-example-slide',
          routeAlias: 'accessibilita-demo-' + spec.exampleKey, interactiveExample: spec.exampleKey, lessonMinutes: 2, bookletAssets: [] }, spec: {} })
    }
  }
}
if (added.length !== 103 || new Set(added.flatMap(s => s.frontmatter.bookletNodes)).size !== 56) throw new Error('Incomplete current Figma coverage')
// Keep the established route and palette identity; the active content is now
// exclusively accessibility. The former perception sequence is archived.
const openingMatter = { footer: title, lesson: 'percezione-gerarchia', lessonSection: 'accessibility', lessonMinutes: 0.5,
  bookletNodes: ['198:3435', '198:3877'], bookletFolios: [168, 169], bookletAssets: [] }
const opening = [
  { title, content: `# ${title}\n\n<ChapterMetro section="ux-perception" />\n`,
    frontmatter: { ...openingMatter, layout: 'default', class: 'content-slide ux-process-lesson lesson-slide chapter-slide', lessonNumber: 5, routeAlias: 'percezione-gerarchia' } },
  { title: 'Progettare l’accesso', content: '# Progettare l’accesso\n', frontmatter: { ...openingMatter, layout: 'summary',
    class: 'content-slide ux-process-lesson lesson-slide reading-slide', routeAlias: 'percezione-gerarchia-sintesi',
    summaryStatement: 'L’accessibilità rende possibile lo stesso compito con modalità diverse.',
    summarySupport: 'Design inclusivo, WCAG, tecnologie assistive e prove d’uso aiutano a individuare le barriere e a verificare che informazioni e azioni restino disponibili nelle diverse condizioni d’uso.' } },
]
const combined = [...opening, ...added]
combined.forEach((s, i) => { s.frontmatter.lessonSlide = i + 1; s.frontmatter.footer = title })
const yaml = f => Object.entries(f).filter(([k]) => !['localOnly', 'src', 'disabled'].includes(k)).map(([k,v]) => `${k}: ${JSON.stringify(v)}`).join('\n')
await writeFile(new URL('lezioni/05-percezione-gerarchia.md', root), combined.map(s => `---\n${yaml(s.frontmatter)}\n---\n\n${s.content.trim()}\n`).join('\n'))
const curriculum = await read('data/ux-curriculum.json')
const spec = curriculum.lessons.find(s => s.number === 5)
delete spec.sourceRange
Object.assign(spec, { title, subtitle: 'Rendere possibili informazioni e azioni per persone diverse', sections: [3], slideCount: combined.length, lessonMinutes: combined.reduce((n,s) => n + s.frontmatter.lessonMinutes, 0),
  currentSource: { snapshot: plan.source, sectionId: source.sectionId, folios: [168, 223], accessibilitySlides: 86, interactiveSlides: 17 },
  perceptionArchive: 'assets/booklet/lezione-05-accessibilita/perception-archive.json' })
await save('data/ux-curriculum.json', curriculum)
const map = await read('assets/booklet/capitolo-3/slide-mapping.json')
const entries = combined.map((s,i) => ({
  lesson:spec.id, lessonSlide:i+1, title:s.title, routeAlias:s.frontmatter.routeAlias, currentSource:plan.source,
  sourcePages:[], sourceNodes:s.frontmatter.bookletNodes, sourceFolios:s.frontmatter.bookletFolios, assets:s.frontmatter.bookletAssets, minutes:s.frontmatter.lessonMinutes
}))
const at = map.lessons.findIndex(s => s.lesson === spec.id)
map.lessons.splice(at, map.lessons.filter(s=>s.lesson===spec.id).length, ...entries)
await save('assets/booklet/capitolo-3/slide-mapping.json', map)
let main = await readFile(new URL('slides.md',root),'utf8')
main = main.replace(/(<SlideAction to="percezione-gerarchia"[^\n]+?<span>)[^<]+(<\/span><\/SlideAction>)/, '$1'+title+'$2')
await writeFile(new URL('slides.md', root), main)
const localArtwork = { assets: {}, mappings: { 'percezione-gerarchia': {} } }
for (const s of added) for (const c of s.spec.cards || []) localArtwork.mappings[spec.id][normalizeTitle(c.title)] = spec.id + '-' + c.icon
for (const [name,icon] of Object.entries({ 'Leggere le relazioni':'relazioni', 'Costruire un linguaggio':'linguaggio', 'Dare priorità':'priorita', Forma:'linguaggio', Colore:'percezione', Immagine:'linguaggio', Spazio:'relazioni', Relazioni:'relazioni', Linguaggio:'linguaggio', Priorità:'priorita' })) localArtwork.mappings[spec.id][normalizeTitle(name)] = spec.id+'-'+icon
for (const icon of new Set(Object.values(localArtwork.mappings[spec.id]))) localArtwork.assets[icon] = '/images/generated/theme-2026/cards/lesson-05-local/' + icon + '.webp'
await save('data/card-artwork-local.json', localArtwork)
console.log(JSON.stringify({slides:combined.length,accessibility:86,interactive:17,minutes:spec.lessonMinutes,icons:Object.keys(localArtwork.assets).length}))
