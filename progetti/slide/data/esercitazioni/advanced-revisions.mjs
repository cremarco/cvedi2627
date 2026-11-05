import { applyOriginalLayouts } from './original-layouts.mjs'
// Exercise 02 follows the approved exercise 01 compositions, without changing other sets.
const mdn = name => `https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/${name}`
const cssTerms = /\b(flex-direction|flex-wrap|flex-flow|flex-start|flex-end|justify-content|align-items|align-content|flex-grow|flex-shrink|flex-basis|align-self|box-sizing|content-box|border-box|row|column|nowrap|wrap-reverse|wrap|stretch|baseline)\b/g
const paragraph = (text, bullet = false) => ({ text: text.replaceAll('`', ''), runs: text.split(/(`[^`]+`)/).filter(Boolean).flatMap(part => part.startsWith('`') ? [{ text: part.slice(1, -1), mono: true }] : part.split(cssTerms).flatMap((fragment, index) => fragment ? [{ text: fragment, ...(index % 2 ? { mono: true } : {}) }] : [])), bullet, level: 0 })
const copy = (...texts) => ({ kind: 'text', paragraphs: texts.map(text => paragraph(text)) })
const bullets = (...texts) => ({ kind: 'text', paragraphs: texts.map(text => paragraph(text, true)) })
const code = text => ({ kind: 'code', text })
const native = (example, caption = '') => ({ kind: 'native', example, caption })
const property = (name, title, example, result, texts = [], traits = []) => ({ kind: 'tag-reference', arrangement: result ? 'example-result' : undefined, items: [{ tags: [name], title, url: mdn(name), example, traits, ...(texts.length ? { introduction: texts.map(text => ({ runs: paragraph(text).runs })) } : {}), ...(result ? { native: result } : {}) }] })

export function reviseAdvancedExercise(imported) {
  const groups = Map.groupBy(imported, slide => slide.sourceSlide)
  const result = []
  const page = (source, title, blocks, layout) => {
    const original = groups.get(source)[0]
    const slide = { ...original, title, blocks, part: 1, parts: 1, number: result.length + 1, sourceSlides: [source] }
    delete slide.layout
    delete slide.sources
    if (layout) slide.layout = layout
    result.push(slide)
    return slide
  }
  const originalText = source => groups.get(source).flatMap(slide => slide.blocks.filter(block => block.kind === 'text').flatMap(block => block.paragraphs))
  const originalLinks = source => originalText(source).flatMap(p => p.runs.filter(r => r.href).map(r => ({ title: r.text.trim(), url: r.href })))
  const keep = source => page(source, groups.get(source)[0].title, groups.get(source).flatMap(slide => slide.blocks))
  keep(1); keep(2); keep(3)
  for (const [source, name, title] of [[4,'margin','Margini'],[5,'font','Caratteri'],[6,'border','Bordi'],[7,'background','Sfondi']]) {
    const text = groups.get(source).flatMap(s => s.blocks).find(b => b.kind === 'code').text
    const split = text.indexOf('\n}', text.indexOf('{')) + 2
    const slide = page(source, `${title}: sintassi estesa e abbreviata`, [copy(source === 4 ? 'Le proprietà singole e la sintassi abbreviata possono descrivere lo stesso stile.' : 'Le due regole esprimono lo stesso stile con una sintassi diversa.'), code(text.slice(0,split)), code(text.slice(split).trim())], 'code-columns')
    slide.sources = [{ title: `MDN · ${name}`, url: mdn(name) }]
    if (source === 7) slide.blocks.push(copy('Attenzione: una proprietà abbreviata reimposta anche i valori omessi.'))
    if (source === 7) slide.sources.push(...originalLinks(7))
  }
  for (const source of [8,9]) {
    page(source, 'Gerarchia della specificità', [
      { kind: 'text', paragraphs: originalText(8).slice(0, 2) },
      bullets('Il selettore universale `*` (0)', 'I nomi dei tag: `p`, `div`, … (1)', 'Classi, pseudoclassi e selettori di attributo (10)', 'ID (100)', 'Stili inline (1000)'),
      { kind: 'specificity-examples', example: source === 9 ? 'reveal' : 'question' },
    ])
  }
  keep(10)
  const exerciseOne = keep(11)
  for (const block of exerciseOne.blocks) {
    for (const p of block.paragraphs || []) {
      p.text = p.text.replace('inspector di Chrome', 'inspector del browser')
      for (const run of p.runs) run.text = run.text.replace('inspector di Chrome', 'inspector del browser')
    }
  }
  keep(12)
  page(13, 'Il flusso degli elementi HTML', [property('display', 'Flusso normale', '<div id="header">\n  <h1>Titolo</h1>\n  <ul>\n    <li><a>Voce</a></li>\n    <li><a>Voce</a></li>\n  </ul>\n</div>\n<div id="main">\n  <h2>Sottotitolo</h2>\n  <p>Testo <span>in linea</span></p>\n  <p>Testo</p>\n</div>', 'advanced:flow', ['Gli elementi block si dispongono uno sotto l’altro; gli elementi annidati seguono il flusso del proprio contenitore. Gli elementi inline partecipano alla riga di testo.'])])
  page(14, 'Elementi block e inline', [property('display', 'Dimensioni nel flusso', '/* Elemento block */\ndiv {\n  display: block;\n  width: auto;\n  height: auto;\n}\n/* Elemento inline */\nspan { display: inline; }', 'advanced:dimensions', ['Nel flusso normale un block con larghezza automatica occupa lo spazio orizzontale disponibile; l’altezza segue i contenuti.', 'Per gli inline non sostituiti, come `span`, `width` e `height` non determinano le dimensioni del box.'])])
  page(15, 'Le quattro aree del box model', [copy('Il contenuto, il padding e il bordo determinano le dimensioni del box; il margine lo separa dagli altri elementi.'), { kind: 'figure', src: '/images/esercitazioni/box-model-avanzato.svg', showCaption: false, caption: 'Il margine è esterno al bordo. Con content-box, larghezza del box = contenuto + padding laterali + bordi laterali.', alt: 'Quattro rettangoli annidati: margin esterno, border, padding e content. Width e height misurano il contenuto con content-box; padding distanzia il contenuto dal bordo.' }], 'diagram')
  keep(16)
  keep(17)
  page(18, 'Box-sizing · esempio', [
    property('box-sizing', 'Stesse misure, ingombri diversi', '.box {\n  width: 100px;\n  height: 100px;\n  padding: 10px;\n}\n\n.content { box-sizing: content-box; }\n.border { box-sizing: border-box; }', 'advanced:sizing'),
    { kind: 'text', paragraphs: originalText(18) },
  ], 'sizing-example')
  page(19, 'Cambiare la visualizzazione del flusso', [
    { kind: 'text', paragraphs: [
      { ...paragraph('DISPLAY'), runs: [{ text: 'DISPLAY', bold: true }] },
      paragraph('`display: none`\nNasconde gli elementi e li rimuove dal flusso', true),
      paragraph('`display: inline` | `block` | `inline-block`\nCambia il tipo di comportamento del blocco rispetto al suo normale comportamento', true),
    ] },
    native('advanced:display'),
    { kind: 'text', paragraphs: originalText(19).filter(p => p.runs.some(run => run.href)) },
  ], 'display-overview')
  const display = keep(20)
  display.title = 'Inline, inline-block e block'
  display.blocks = [{ kind: 'display-comparison', rows: display.blocks.find(block => block.kind === 'table').rows,
    caption: display.blocks.find(block => block.kind === 'text').paragraphs[0].text }]
  page(21, 'Float: far scorrere il testo accanto a un box', [property('float', 'Elemento flottante', '.item { float: left; }\n.item {\n  float: left;\n  width: 100%;\n}\n.item {\n  float: left;\n  width: 50%;\n}', 'advanced:float', ['`left` o `right` sposta il box sul lato scelto e lascia scorrere il contenuto successivo attorno. Senza una larghezza dichiarata il box si adatta al contenuto.'])])
  page(22, 'Float, contenitore e clear', [property('clear', 'Passare sotto i float', '.item {\n  float: left;\n  width: 50%;\n}\n\n.after { clear: both; }', 'advanced:clear', ['Un float esce dal flusso normale e può lasciare il genitore senza altezza. Altri float possono affiancarsi, se trovano spazio.', '`clear: left`, `right` o `both` spinge un elemento block sotto i float del lato indicato.'])])
  const position = page(23, 'Position: static e relative', [property('position', 'Posizione nel flusso', '.item { position: static; }\n\n.item {\n  position: relative;\n  top: 18px;\n  left: 24px;\n}', 'advanced:position', ['`static` segue il flusso normale e non applica gli offset. `relative` conserva il proprio spazio e accetta `top`, `right`, `bottom` e `left`.'])])
  position.sources = originalLinks(23)
  page(23, 'Position: absolute e fixed', [property('position', 'Posizione fuori dal flusso', '.container { position: relative; }\n.item {\n  position: absolute;\n  top: 18px;\n  left: 24px;\n}\n\n.item { position: fixed; }', 'advanced:position', ['`absolute` si riferisce al proprio containing block, spesso stabilito dall’antenato posizionato più vicino.', '`fixed` si riferisce normalmente al viewport. Alcune proprietà degli antenati possono cambiare il containing block; entrambi escono dal flusso normale.'])])
  keep(24).title = 'Centrare elementi e testo'
  keep(25)
  page(26, 'Esercizio 2: il risultato da riprodurre', [native('02-026-diagram.webp', 'Testo attorno al box flottante. Ricostruire la disposizione applicando le proprietà del box model.')])
  keep(27)
  page(28, 'Un contenitore, più elementi flex', [property('display: flex', 'Contenitore flex', '.container {\n  display: flex;\n  gap: 8px;\n}', 'advanced:flex', ['Flexbox dispone, allinea e distribuisce lo spazio tra i figli diretti di un contenitore, anche quando le dimensioni sono dinamiche.'])])
  result.at(-1).blocks[0].items[0].url = mdn('display')
  keep(29).title = 'Le proprietà del contenitore flex'
  const flexPages = [
    [30,'flex-direction','Asse principale','row','row | row-reverse |\n    column | column-reverse', 'advanced:flex-direction'],
    [31,'flex-wrap','Andare a capo','wrap','nowrap | wrap | wrap-reverse','advanced:flex-wrap'],
    [32,'flex-flow','Direzione e ritorno a capo','column wrap',null,'advanced:flex-flow'],
    [33,'justify-content','Allineamento principale','center','flex-start | flex-end | center |\n    space-between | space-around |\n    space-evenly | start | end | left','advanced:justify-content'],
    [35,'align-items','Allineamento trasversale','center','stretch | flex-start | flex-end |\n    center | baseline','advanced:align-items'],
    [36,'align-content','Distribuire le righe','space-between','flex-start | flex-end | center |\n    space-between | space-around |\n    space-evenly | stretch |\n    start | end | baseline','advanced:align-content'],
  ]
  for (let source = 30; source <= 36; source++) {
    if (source === 34) {
      const spacing = page(34, 'Justify-content: distribuire lo spazio', [bullets('`space-between`: primo e ultimo elemento sui margini, spazio uguale tra gli elementi.', '`space-around`: stesso spazio su entrambi i lati di ogni elemento; tra due elementi lo spazio è doppio rispetto ai margini.', '`space-evenly`: stesso spazio tra gli elementi e sui margini.')])
      spacing.sources = originalLinks(34)
      page(34, 'Tre modi di distribuire lo spazio', [property('justify-content', 'Spazi interni ed esterni', '.container {\n  display: flex;\n  justify-content: space-between;\n}\n\n/* Confrontare anche: */\n/* space-around, space-evenly */', 'advanced:spacing')])
      continue
    }
    const [,name,title,value,syntax,demo] = flexPages.find(entry => entry[0] === source)
    const texts = originalText(source).map(p => p.text.trim()).filter(text => text !== name && !/^stretch$|^space-between$/.test(text))
    const example = `.container {\n  display: flex;\n  ${name}: ${value};\n}` + (syntax ? `\n\n/* Valori: ${syntax} */` : '')
    page(source, `${name}: ${title.toLowerCase()}`, [property(name,title,example,demo,texts)])
  }
  const alignment = keep(37)
  alignment.title = 'Align-items e align-content'
  page(37, 'Allineare elementi o distribuire righe', [property('align-items', 'Due livelli di allineamento', '.container {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n}\n\n/* Confrontare con: */\n/* align-content: flex-end; */', 'advanced:alignment', ['Con più righe, `align-items` dispone ogni elemento nella sua riga; `align-content` distribuisce le righe nello spazio trasversale disponibile.'])])
  keep(38).title = 'Le proprietà degli elementi flex'
  page(39, 'Order: cambiare l’ordine visivo', [property('order', 'Ordine degli elementi', '.item { order: 0; }\n\n.item:nth-child(2) {\n  order: 4;\n}', 'advanced:order', ['Il valore iniziale è `0`. Gli elementi sono ordinati per valore crescente; a parità di valore conservano l’ordine del documento.', '`order: 4` non significa “quarto posto”. Cambia l’ordine visivo, lasciando invariati ordine del DOM e navigazione da tastiera.'])])
  page(40, 'Flex-grow: distribuire lo spazio libero', [property('flex-grow', 'Fattore di crescita', '.item { flex-basis: 0; }\n.item { flex-grow: 1; }\n.item:nth-child(2) {\n  flex-grow: 4;\n}', 'advanced:flex-grow', ['Il valore iniziale è `0`. Un valore positivo permette di crescere: lo spazio libero è distribuito in proporzione ai fattori di crescita.', 'Con basi uguali, un fattore `2` riceve il doppio dello spazio libero di un fattore `1`, non necessariamente il doppio della larghezza finale.'])])
  page(41, 'Flex-shrink: assorbire la riduzione', [property('flex-shrink', 'Fattore di restringimento', '.item {\n  flex-basis: 45%;\n  flex-shrink: 1;\n}\n.item:nth-child(2) {\n  flex-shrink: 0;\n}', 'advanced:flex-shrink', ['Se le basi superano lo spazio del contenitore, gli elementi si restringono secondo il fattore e la propria base. Il valore iniziale è `1`.', 'Un elemento con `flex-shrink: 0` conserva la base e lascia agli altri la riduzione.'])])
  page(42, 'Flex-basis: la dimensione di partenza', [property('flex-basis', 'Base prima della distribuzione', '.item {\n  flex-basis: 20%;\n}', 'advanced:flex-basis', originalText(42).map(p => p.text.trim()).slice(1))])
  page(43, 'Flex: crescita, riduzione e base', [property('flex', 'Sintassi abbreviata', '/* grow | shrink | basis */\n.item { flex: 1 0 200px; }\n.item { flex: 0 1 200px; }\n.item { flex: 1 0 auto; }\n.item { flex: 0 1 auto; }', 'advanced:flex-shorthand', ['`flex` indica crescita, riduzione e base: `1 0 200px` può crescere, `0 1 200px` può restringersi. Con `auto` la base segue la dimensione principale o il contenuto. Il valore iniziale è `0 1 auto`.'])])
  page(44, 'Align-self: allineare un solo elemento', [property('align-self', 'Eccezione sul singolo figlio', '.container {\n  display: flex;\n  align-items: flex-start;\n}\n.item:nth-child(2) {\n  align-self: flex-end;\n}', 'advanced:align-self', ['Sovrascrive per un singolo elemento l’allineamento impostato con `align-items` sul contenitore.', '`auto`, `flex-start`, `flex-end`, `center`, `baseline` e `stretch` sono i valori principali. `float`, `clear` e `vertical-align` non determinano la posizione degli elementi flex.'])])
  for (const source of [45,46]) {
    const block = groups.get(source).flatMap(s => s.blocks).find(b => b.kind === 'resources')
    page(source, groups.get(source)[0].title, [{ ...block, resourceLayout: 'list', showHint: false }])
  }
  keep(47)
  // Preserve every original outbound destination, including examples embedded in prose.
  for (const [source] of groups) {
    const destinations = result.filter(s => s.sourceSlide === source)
    const known = new Set(JSON.stringify(destinations).match(/https?:[^"\s]+/g))
    const missing = originalLinks(source).filter(link => !known.has(link.url))
    if (missing.length) destinations.at(-1).sources = [...(destinations.at(-1).sources || []), ...missing]
  }
  const laidOut = applyOriginalLayouts(result, imported)
  const assignment = {
    ...laidOut.find(slide => slide.number === 26),
    title: 'Esercizio 2 · Il sito con Flexbox',
    sourceSlides: [25, 26],
    adaptedFrom: { exercise: '01', slide: 64, file: 'progetti/slide/esercitazioni/01-html-css-base.md' },
    blocks: [
      copy('Ripartite dal sito a tre pagine dell’esercizio 1, Home, Chi siamo e Contatti, e riorganizzate menu e gruppi di contenuti con Flexbox.'),
      bullets(
        'Conservate contenuti, collegamenti e footer; mantenete la voce attiva del menu evidenziata con `::after`',
        'Usate `display: flex` e `gap` nel menu e nei gruppi a due o tre colonne; gestite gli allineamenti con `justify-content` e `align-items`',
        'In almeno un gruppo, assegnate al contenuto principale il doppio dello spazio libero degli altri con `flex` o `flex-grow`',
        'Usate `flex-wrap` e `flex-basis` per far andare a capo i blocchi quando lo spazio non basta; verificate il risultato su una finestra ampia e una stretta',
      ),
      { kind: 'text', paragraphs: [{ text: 'Riapri l’esempio dell’esercizio 1', runs: [{ text: 'Riapri l’esempio dell’esercizio 1', href: '/images/esercitazioni/esercizio-01/index.html' }] }] },
    ],
  }
  const reordered = laidOut.filter(slide => ![26, 27].includes(slide.number))
  reordered.splice(reordered.findIndex(slide => slide.number === 47) + 1, 0, assignment)
  // The flow example follows box-sizing; the block/inline recap is intentionally removed.
  const flow = reordered.find(slide => slide.number === 13)
  const finalOrder = reordered.filter(slide => ![13, 14].includes(slide.number))
  finalOrder.splice(finalOrder.findIndex(slide => slide.number === 18) + 1, 0, flow)
  const alignmentSlides = finalOrder.filter(slide => slide.sourceSlide === 37)
  const alignmentExample = alignmentSlides.find(slide => slide.blocks.some(block => block.kind === 'original-layout'))
  const practice = alignmentSlides.flatMap(slide => slide.blocks)
    .filter(block => block.kind === 'text').flatMap(block => block.paragraphs)
    .find(p => p.text.startsWith('Provate a modificare le proprietà'))
  alignmentExample.blocks.find(block => block.kind === 'original-layout').content.paragraphs.push(practice)
  return finalOrder.filter(slide => !alignmentSlides.includes(slide) || slide === alignmentExample)
    .map((slide, index) => ({ ...slide, number: index + 1 }))
}
