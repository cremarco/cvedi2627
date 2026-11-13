// Apply the approved exercise 01–03 compositions without changing the retained import.
const terms = /(@media|width=device-width|initial-scale|meta viewport|font-size|min-width|max-width|min-height|max-height|aspect-ratio|orientation|resolution|head|margin|padding|clamp\(\)|\b(?:rem|ch|vw|vh|screen|print|projection|tv)\b)/g
const mark = paragraph => ({ ...paragraph, runs: paragraph.runs.flatMap(run => run.href ? [{ ...run, mono: false }] : run.mono ? [run] : run.text.split(terms).filter(Boolean).map(text => ({ ...run, text, ...(new RegExp(`^(?:${terms.source})$`).test(text) ? { mono: true } : {}) }))) })
const text = paragraphs => ({ kind: 'text', paragraphs: paragraphs.map(mark) })
const prose = blocks => blocks.filter(block => block.kind === 'text').flatMap(block => block.paragraphs)
const simplifyMedia = value => value.replaceAll('only screen and ', '')
const code = value => ({ kind: 'code', text: simplifyMedia(value) })
const figure = (name, alt, caption) => ({ kind: 'figure', src: `/images/esercitazioni/responsive-${name}.svg`, alt, caption })

export function reviseResponsiveExercise(imported) {
  const groups = Map.groupBy(imported, slide => slide.sourceSlide)
  const result = []
  const add = (source, blocks, layout, title) => {
    const original = groups.get(source)[0]
    const slide = { ...original, number: result.length + 1, sourceSlides: [source], part: 1, parts: 1, blocks, ...(title ? { title } : {}) }
    if (layout) slide.layout = layout
    result.push(slide)
    return slide
  }
  for (const [source, originals] of groups) {
    const blocks = originals.flatMap(slide => slide.blocks)
    if (source === 8) {
      const paragraphs = prose(blocks).map(paragraph => ({
        ...paragraph,
        text: paragraph.text.replace('meta viewport', 'meta con il name viewport'),
        runs: paragraph.runs.flatMap(run => run.text === 'meta viewport' ? [
          { ...run, text: 'meta', mono: true },
          { text: ' con il name ' },
          { ...run, text: 'viewport', mono: true },
        ] : [run]),
      }))
      add(source, [text(paragraphs)])
    } else if (source === 6) {
      add(source, [text(prose(blocks)), figure('responsive-adaptive', 'Responsive: il contenuto si adatta in modo fluido a tre larghezze. Adaptive: tre layout distinti per desktop, tablet e telefono.', 'Responsive e adaptive: flusso continuo e layout dedicati a confronto.')], 'diagram', 'Responsive e adaptive')
    } else if (source === 10) {
      // These two explanatory captions were incorrectly imported as executable code.
      add(source, [text(prose(blocks)), figure('viewport', 'Due schermi della stessa dimensione: con meta viewport i quadrati di 50 pixel mantengono la scala; senza meta viewport la pagina virtuale più larga viene ridotta.', 'La stessa schermata con il controllo del viewport (sinistra) e senza (destra). Nota: Ogni quadratino è di 50px. Schema concettuale: la scala senza meta dipende dal browser e dal dispositivo.')], 'diagram')
    } else if ([9, 12, 13, 14, 26, 28].includes(source)) {
      const paragraphs = prose(blocks)
      const linkedCode = blocks.filter(block => block.kind === 'code' && block.paragraphs?.some(p => p.runs.some(run => run.href)))
      const syntax = blocks.filter(block => block.kind === 'code' && !linkedCode.includes(block)).map(block => block.text).join('\n')
      paragraphs.push(...linkedCode.flatMap(block => block.paragraphs))
      const item = {
        tags: [source === 9 ? '<meta name="viewport">' : [12, 13, 14].includes(source) ? '@media' : source === 26 ? 'em' : 'clamp()'],
        title: source === 9 ? 'Dimensioni e scala' : source === 12 ? 'Regole condizionali' : source === 13 ? 'Visibilità su mobile' : source === 14 ? 'Sintassi della query' : source === 26 ? 'Dimensioni ereditate' : 'Tipografia fluida',
        url: source === 9 ? 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport' : [12, 13, 14].includes(source) ? 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media' : source === 26 ? 'https://developer.mozilla.org/en-US/docs/Web/CSS/length' : 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp',
        introduction: paragraphs.filter(p => !p.runs.some(run => run.href)).map(mark), traits: [], example: simplifyMedia(syntax).replaceAll('14.39px', '14.4px'),
      }
      // Keep the examples readable at the shared code size.
      if (source === 9) item.example = '<meta name="viewport"\n      content="width=device-width,\n               initial-scale=1.0">'
      if (source === 12) item.example = item.example.replace('/* .box ha larghezza 100% su schermi minori di 768 px */', '/* Fino a 768px: larghezza 100% */').replace('/* .box ha larghezza 400px su schermi maggiori di 768 px */', '/* Da 768px: larghezza 400px */')
      if (source === 14) item.example = item.example.replace(' and (', '\n  and (')
      if (source === 26) item.example = item.example.replace(' /* se p è dentro al div, 14.4px */', '\n/* se p è dentro al div, 14.4px */')
      add(source, [{ kind: 'tag-reference', arrangement: 'explanation-code', items: [item] }, ...paragraphs.filter(p => p.runs.some(run => run.href)).map(p => text([p]))])
    } else if (source === 19) {
      const syntax = blocks.find(block => block.kind === 'code')
      const note = blocks.filter(block => block.kind === 'code' && block !== syntax).map(block => ({ text: block.text, runs: [{ text: block.text }], bullet: false, level: 0 }))
      add(source, [text(prose(blocks)), text(note)], undefined, 'Mobile first · dalle regole base ai breakpoint')
      add(source, [code(syntax.text.replace(/\/\* Cambiamo la dimensione di h1\nsu schermi più grandi di (\d+)px \*\//g, '/* h1 su schermi più grandi di $1px */'))], undefined, 'Mobile first · esempio CSS')
    } else if (source === 29) {
      add(source, [{ kind: 'resources', resourceLayout: 'list', showHint: false, resources: prose(blocks).flatMap(p => p.runs.filter(run => run.href).map(run => ({ title: run.text, url: run.href }))) }])
    } else if ([32, 33].includes(source)) {
      add(source, [figure(source === 32 ? 'layout-desktop' : 'layout-mobile', source === 32 ? 'Layout desktop. Testata larga 100 con altezza 60 e rientri 15, 15 e 25. Sotto: due voci a sinistra, aree 1 e 2 impilate al centro, area 3 accanto e immagine a destra. Una linea tratteggiata indica il fold.' : 'Layout mobile. Testata alta 100 con rientro superiore 10 e laterali 5. Seguono due voci, immagine e regioni 1, 2 e 3 impilate. Il fold segue la testata.', source === 32 ? 'Consegna desktop: proporzioni e contenuti della pagina originale 32.' : 'Consegna mobile: il flusso prosegue nella seconda colonna della tavola.')], 'figure')
    } else {
      add(source, blocks.map(block => block.kind === 'text' ? text(block.paragraphs) : block))
    }
  }
  return applyReview(result)
}

const paragraph = (value, bullet = false) => ({ text: value.replaceAll('`', ''), bullet, level: 0, runs: value.split(/(`[^`]+`)/).filter(Boolean).map(part => part.startsWith('`') ? { text: part.slice(1,-1), mono: true } : { text: part }) })
const copy = (...values) => text(values.map(value => paragraph(value)))
function applyReview(slides) {
  const at = source => slides.find(slide => slide.sourceSlide === source)
  // Keep one continuous list rather than separating the first item from its siblings.
  at(4).blocks = [text(prose(at(4).blocks))]
  const viewport = at(9).blocks[0]
  delete viewport.arrangement
  for (const p of viewport.items[0].introduction) {
    p.text = p.text.replace(/ inserire meta viewport$/, ' inserire:')
    p.runs = p.runs.flatMap(run => run.text === 'meta viewport' ? [{ text: ':' }] : [{...run, text: run.text.replace(/inserire $/, 'inserire')}])
  }
  at(10).layout = 'columns'
  at(10).blocks[0].paragraphs = at(10).blocks[0].paragraphs.map(p => ({ ...p, text: p.text.replace(/^L[’']attributo/, 'Il valore'), runs: p.runs.map(run => ({...run,text:run.text.replace(/^L[’']attributo/, 'Il valore')})) }))
  at(10).blocks[1].alt = 'Stesso smartphone: con meta viewport la pagina usa la larghezza del dispositivo e il testo rifluisce; senza meta viewport viene ridotta una pagina con viewport virtuale più ampio.'
  at(10).blocks[1].showCaption = false
  at(12).blocks[0].items[0].example = '/* Valore di default */\n.box { width: 100%; }\n\n/* Da 768px */\n@media (min-width: 768px) {\n  .box { width: 400px; }\n}'
  for (const source of [13,14]) delete at(source).blocks[0].arrangement
  for (const p of prose(at(15).blocks)) p.runs = p.runs.flatMap(run => run.text === 'all ' ? [{...run,text:'all',mono:true},{text:' '}] : [run])
  // Match complete feature names, including min-/max-, in a single inline token.
  for (const block of at(16).blocks) for (const p of block.paragraphs || []) {
    p.runs = p.text.split(/((?:min-|max-)?(?:width|height|color|aspect-ratio|resolution)|orientation)/g).filter(Boolean).map(value => ({text:value, ...(/^(?:(?:min-|max-)?(?:width|height|color|aspect-ratio|resolution)|orientation)$/.test(value) ? {mono:true,bold:true} : {})}))
  }
  const historical = prose(at(17).blocks).find(p => p.text.startsWith('La visualizzazione'))
  at(18).blocks.unshift(text([historical]))
  at(18).sourceSlides = [17,18]
  const link = prose(at(17).blocks).filter(p=>p.runs.some(run=>run.href))
  at(17).title = 'Breakpoint · mobile first'
  at(17).blocks = [copy('Il Responsive Design si basa sui vari breakpoint.'), {
    kind:'table', italicCells:['none'], codeColumns:[0,3], rows:[
      ['Breakpoint prefix','Dispositivo indicativo','Larghezza minima','CSS'],
      ['none','Smartphone / default','0','Stili di base, senza @media'],
      ['sm','Smartphone ampio','40rem (640px)','@media (width >= 40rem)'],
      ['md','Tablet','48rem (768px)','@media (width >= 48rem)'],
      ['lg','Laptop','64rem (1024px)','@media (width >= 64rem)'],
      ['xl','Desktop','80rem (1280px)','@media (width >= 80rem)'],
      ['2xl','Desktop ampio','96rem (1536px)','@media (width >= 96rem)'],
    ]
  }, copy('Dispositivi indicativi: conta la larghezza disponibile. Pixel calcolati con font iniziale di 16px.')]
  at(17).sources = [{title:'Tailwind CSS · Responsive design',url:'https://tailwindcss.com/docs/responsive-design'}, ...link.flatMap(p=>p.runs.filter(run=>run.href).map(run=>({title:run.text,url:run.href}))) ]
  const merged = at(19), syntax = slides.find(slide=>slide.sourceSlide===19&&slide!==merged)
  merged.layout = 'columns'
  merged.blocks = [copy('Definite prima il CSS di base per gli schermi piccoli, poi sovrascrivete gli stili che cambiano sugli schermi più grandi.', 'Nell’esempio il titolo parte da 2rem, passa a 3rem da 48rem e a 5rem da 80rem.', 'Da 80rem valgono entrambe le query: a parità di specificità prevale la regola scritta dopo.'),code('/* Valore di default */\nh1 { font-size: 2rem; }\n\n/* Da 48rem (768px) */\n@media (width >= 48rem) {\n  h1 { font-size: 3rem; }\n}\n\n/* Da 80rem (1280px) */\n@media (width >= 80rem) {\n  h1 { font-size: 5rem; }\n}')]
  slides.splice(slides.indexOf(syntax),1)
  at(23).blocks.at(-1).paragraphs.push(paragraph('`ch`',true))
  const ch = {...structuredClone(at(23)),title:'L’unità ch · una misura legata al font',sourceKind:'course-supplement',blocks:[copy('1ch corrisponde alla misura di avanzamento del glifo “0” nel font usato dall’elemento.', 'È utile per limitare la larghezza di un testo in relazione al font e mantenere righe leggibili anche su schermi ampi. Può aiutare anche a dimensionare campi per dati di lunghezza prevedibile.', 'Con un font proporzionale, 60ch non significa esattamente 60 caratteri: lettere e spazi hanno larghezze diverse.'),code('.testo {\n  max-inline-size: 60ch;\n}'),text([{text:'Eric A. Meyer · What is the CSS ch Unit?',runs:[{text:'Eric A. Meyer · What is the CSS ch Unit?',href:'https://medium.com/@meyerweb/what-is-the-css-ch-unit-20b999426ac0'}]}])],sources:[{title:'MDN · ch',url:'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length#ch'}]}
  slides.splice(slides.indexOf(at(23))+1,0,ch)
  return finishReview(slides, ch).map((slide,index)=>({...slide,number:index+1}))
}

function finishReview(slides, ch) {
  const at = source => slides.find(s=>s.sourceSlide===source)
  at(6).layout = 'columns'
  at(6).blocks[1].showCaption = false
  at(6).blocks[1].alt = 'La stessa pagina in finestre da 900 e 1100 pixel: responsive usa tutto lo spazio e allarga i contenuti; adaptive mantiene un layout largo 800 pixel in entrambe le finestre, lasciando margini diversi.'
  for (const p of prose(at(8).blocks)) {
    p.text = p.text.replaceAll("'head'",'head')
    p.runs = p.runs.map(run=>({...run,text:run.text.replace(/'$/,'').replace(/^' del/,' del')}))
  }
  at(9).blocks[0].items[0].example = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
  at(14).blocks[0].items[0].example = '@media not|only mediatype and (mediafeature and|or|not mediafeature) {\n  CSS-Code;\n}'
  at(16).blocks = [text(prose(at(16).blocks))]
  const first=slides.indexOf(at(17)), second=slides.indexOf(at(18));[slides[first],slides[second]]=[slides[second],slides[first]]
  // Follow the overview: percentages, em/rem, viewport units, then ch.
  slides.splice(slides.indexOf(ch),1)
  slides.splice(slides.indexOf(at(27))+1,0,ch)
  const supplement = (title,blocks,url) => ({...structuredClone(at(19)),title,sourceKind:'course-supplement',blocks,sources:[{title:'MDN',url}]})
  const order=supplement('Media query · conta anche l’ordine', [
    copy('A 90rem entrambe le condizioni sono vere. Il browser non sceglie automaticamente la soglia più alta: applica la cascata.', 'Negli esempi origine, importanza, layer e specificità coincidono. Vince quindi la dichiarazione scritta dopo.'),
    code('/* Soglie crescenti: a 90rem vince 5rem */\n@media (width >= 48rem) {\n  h1 { font-size: 3rem; }\n}\n@media (width >= 80rem) {\n  h1 { font-size: 5rem; }\n}'),
    code('/* Ordine invertito: a 90rem vince 3rem */\n@media (width >= 80rem) {\n  h1 { font-size: 5rem; }\n}\n@media (width >= 48rem) {\n  h1 { font-size: 3rem; }\n}'),
  ], 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction')
  order.layout='code-columns'
  const nesting=supplement('Media query · riunirle con CSS nesting',[
    copy('Con il nesting nativo le media query possono stare dentro il selettore. Le regole responsive del componente restano vicine agli stili di base.', 'Le due forme sono equivalenti. Anche nelle query annidate la cascata e l’ordine continuano a valere.'),
    code('/* Forma estesa */\nh1 { font-size: 2rem; }\n\n@media (width >= 48rem) {\n  h1 { font-size: 3rem; }\n}\n@media (width >= 80rem) {\n  h1 { font-size: 5rem; }\n}'),
    code('/* Con CSS nesting */\nh1 {\n  font-size: 2rem;\n\n  @media (width >= 48rem) {\n    font-size: 3rem;\n  }\n  @media (width >= 80rem) {\n    font-size: 5rem;\n  }\n}'),
  ], 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/At-rules')
  nesting.layout='code-columns'
  slides.splice(slides.indexOf(at(19))+1,0,order,nesting)
  // Editorial review: unit names in prose use the ordinary text treatment.
  for (const source of [23,25,27]) {
    for (const p of prose(at(source).blocks)) {
      p.runs = p.runs.map(run => /^(rem|vw|vh|ch)$/.test(run.text)
        ? { ...run, mono: false } : run)
    }
  }
  ch.sources[0].title = 'MDN'
  at(31).blocks = at(31).blocks.map(block => block.kind === 'text'
    ? { ...block, paragraphs: block.paragraphs.filter(p => p.text.trim().toLowerCase() !== 'soluzione') }
    : block).filter(block => block.kind !== 'text' || block.paragraphs.length)
  for (const source of [32,33]) at(source).blocks[0].showCaption = false
  for (const p of prose(at(26).blocks)) {
    p.text = p.text.replaceAll('Try!', 'esempio')
    p.runs = p.runs.map(run=>({...run,text:run.text.replaceAll('Try!', 'esempio')}))
  }
  for (const p of prose(at(23).blocks)) p.runs = p.runs.map(run=>run.text==='ch' ? {...run,bold:true} : run)
  for (const p of prose(at(25).blocks)) {
    p.text = p.text.replace('solitamente è ', '')
    p.runs = p.runs.map(run=>({...run,text:run.text.replace('solitamente è ', '')}))
  }
  const removedCopy = ['La stringa di testo nel riquadro azzurro', 'I numeri grigi', 'Potete adattare la visualizzazione']
  at(31).blocks = at(31).blocks.map(block=>block.kind==='text' ? {...block,paragraphs:block.paragraphs.filter(p=>!removedCopy.some(prefix=>p.text.startsWith(prefix)))} : block).filter(block=>block.kind!=='text'||block.paragraphs.length)
  at(16).blocks[0].paragraphs.push(paragraph('`prefers-reduced-motion` (preferenza per un movimento ridotto)',true))
  at(16).sources = [{title:'MDN',url:'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion'}]
  at(6).blocks[1].alt = 'Tre colonne come nel riferimento: Responsive collega X a desktop, tablet e smartphone; Adaptive collega separatamente X, Y e Z ai tre dispositivi; Hybrid distribuisce una base XYZ comune nelle tre varianti X, Y e Z.'
  at(32).blocks[0].alt = 'Layout desktop: riquadro del titolo centrato nella testata, titolo e paragrafo allineati a sinistra; sotto due voci, regioni 1, 2 e 3 e immagine. La linea tratteggiata indica il fold.'
  at(33).blocks[0].alt = 'Layout mobile: testata, due voci, immagine e regioni 1, 2 e 3 in sequenza. La seconda colonna prosegue il flusso della prima.'
  for (const p of prose(at(16).blocks)) {
    p.text = p.text.replace('(La min/max', '(la min/max')
    p.runs = p.runs.map(run=>({...run,text:run.text.replace('(La min/max', '(la min/max')}))
  }
  for (const source of [6,32,33]) at(source).blocks.find(block=>block.kind==='figure').showDialogTitle = false
  at(6).blocks.find(block=>block.kind==='figure').alt = 'Responsive: X condiviso fra desktop, tablet e smartphone. Adaptive: varianti X, Y e Z dedicate ai tre dispositivi.'
  return slides
}
