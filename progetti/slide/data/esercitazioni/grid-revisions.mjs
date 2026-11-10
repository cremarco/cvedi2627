// Exercise 03 applies the approved exercise compositions to the retained import.
const mdn = name => `https://developer.mozilla.org/en-US/docs/Web/CSS/${name}`
const terms = /\b(grid-template-columns|grid-template-rows|grid-template-areas|grid-column-start|grid-column-end|grid-row-start|grid-row-end|grid-column|grid-row|grid-area|column-count|column-width|column-gap|row-gap|object-position|object-fit|background-image|aspect-ratio|clip-path|margin-block-start|margin-block-end|margin-inline|display: grid|srcset|sizes|ps-\*|pe-\*|block|inline)\b/g
function mark(paragraph) {
  return { ...paragraph, runs: paragraph.runs.flatMap(run => run.href || run.mono ? [run] : run.text.split(terms).map((text, index) => ({ ...run, text, ...(index % 2 ? { mono: true } : {}) })).filter(run => run.text)) }
}
export const gridRemovedCopy = ['Un sito utile per creare particolari forme', 'Per approfondire']
export const gridTextRevision = value => value.replaceAll('2025', '2026').replace('indicati in grigio', 'contrassegnati con una X')
const text = paragraphs => ({ kind: 'text', paragraphs: paragraphs.map(mark) })

export function reviseGridExercise(imported) {
  const groups = Map.groupBy(imported, slide => slide.sourceSlide)
  const result = []
  const blocks = source => groups.get(source).flatMap(slide => slide.blocks)
  const paragraphs = source => blocks(source).filter(block => block.kind === 'text').flatMap(block => block.paragraphs || [])
  const links = source => {
    const combined = paragraphs(source).flatMap(paragraph => {
      const entries = []
      for (const run of paragraph.runs) {
        if (!run.href || source === 8 && run.href === 'https://tailwindcss.com/docs/padding') continue
        const previous = entries.at(-1)
        if (previous?.url === run.href) previous.title += run.text
        else entries.push({ title: run.text, url: run.href })
      }
      return entries.map(entry => ({ ...entry, title: entry.title.trim() }))
    })
    return combined.filter((entry, index) => combined.findIndex(other => other.url === entry.url) === index)
  }
  const prose = source => paragraphs(source).filter(p => !p.runs.some(run => run.href) && !gridRemovedCopy.includes(p.text.trim()))
  const syntax = source => blocks(source).filter(block => block.kind === 'code').map(block => block.text).join('\n')
  const page = (source, title, content, layout) => {
    const slide = { ...groups.get(source)[0], title, blocks: content, sourceSlides: [source], part: 1, parts: 1, number: result.length + 1 }
    delete slide.layout
    if (layout) slide.layout = layout
    result.push(slide)
    return slide
  }
  const keep = source => page(source, groups.get(source)[0].title, blocks(source).map(block => block.kind === 'text' ? text(block.paragraphs) : block))
  const property = (source, name, title, value, introduction = [], native, url = mdn(name)) => {
    const slide = page(source, groups.get(source)[0].title, [{ kind: 'tag-reference', ...(native ? { arrangement: 'example-result' } : {}), items: [{ tags: [name], title, url, ...(value ? { example: value } : {}), introduction: introduction.map(mark), traits: [], ...(native ? { native } : {}) }] }])
    return slide
  }
  const references = (source, labels) => page(source, groups.get(source)[0].title, [{ kind: 'resources', resourceLayout: 'list', showHint: false, resources: links(source).map((link, index) => ({ ...link, title: labels?.[index] || link.title })) }])
  keep(1); keep(2); keep(3)
  // Keep the long historical explanation in two complete reading steps.
  for (const slide of groups.get(4)) page(4, slide.part === 1 ? 'Proprietà CSS, compatibilità e prefissi' : 'Prefissi e compatibilità', slide.blocks.map(block => block.kind === 'text' ? text(block.paragraphs) : block))
  references(5, ['MDN · Container Queries', 'MDN · Dynamic Viewport Units', 'MDN · Logical Properties', 'MDN · CSS nesting'])
  for (const [source, name, title] of [[6,'@container','Query del contenitore'],[7,'dvh · lvh · svh','Unità del viewport'],[8,'margin-block · margin-inline','Proprietà logiche']]) {
    property(source, name, title, syntax(source), prose(source), undefined, links(source)[0].url)
  }
  const nesting = page(9, 'CSS Nesting', [text(prose(9))])
  nesting.sources = links(9)
  const nestingSyntax = page(9, 'CSS Nesting · sintassi a confronto', blocks(9).filter(block => block.kind === 'code').map(block => ({ ...block, text: block.text.replaceAll('parentRule', '.parent-rule').replaceAll('childRule', '.child-rule') })), 'code-columns')
  nestingSyntax.sources = links(9)
  references(10, ['MDN · object-fit', 'MDN · clip-path', 'MDN · aspect-ratio', 'MDN · columns'])
  const objectText = page(11, 'Object-fit', [text(prose(11))])
  objectText.sources = links(11)
  const objectCode = property(11, 'object-fit', 'Adattare immagini e video', syntax(11))
  objectCode.sources = links(11)
  for (const [source, name, title] of [[12,'clip-path','Regione visibile'],[13,'aspect-ratio','Rapporto di aspetto'],[14,'columns','Colonne di testo']]) {
    const slide = property(source, name, title, syntax(source), prose(source))
    slide.sources = links(source)
    if ([12, 14].includes(source)) slide.blocks[0].arrangement = 'explanation-code'
  }
  keep(15); keep(16); keep(17)
  page(18, 'Definire righe e colonne', [text(prose(18))])
  const gridSyntax = source => syntax(source).replaceAll('grid-template-columns: ', 'grid-template-columns:\n    ').replaceAll('grid-template-rows: ', 'grid-template-rows:\n    ')
  property(18, 'grid-template-columns', 'Righe e colonne', gridSyntax(18), [], '03-018-diagram.webp').title = 'Grid · righe e colonne'
  property(19, 'grid-template-columns', 'Linee nominate', gridSyntax(19).replace('auto [col2]', 'auto\n    [col2]').replace('auto [col3]', 'auto\n    [col3]').replace('auto [col4]', 'auto\n    [col4]').replace('[row2]', '\n    [row2]').replace('[row3]', '\n    [row3]'), prose(19), '03-019-diagram.webp').title = 'Grid · nominare le linee'
  const areas = property(20, 'grid-template-areas', 'Aree della griglia', undefined, prose(20))
  areas.title = 'Grid · definire le aree'
  const areaSyntax = property(20, 'grid-template-areas', 'Sintassi delle aree', syntax(20).replace(/\}\n\n\.header \{\n  grid-area: header;\n\}\n\.main \{\n  grid-area: main;\n\}/, '}\n\n.header { grid-area: header; }\n.main { grid-area: main; }'))
  areaSyntax.title = 'Grid · assegnare le aree'
  areaSyntax.sources = links(20)
  property(21, 'column-gap', 'Spazi fra righe e colonne', syntax(21), prose(21))
  keep(22)
  property(23, 'grid-column', 'Posizionare gli elementi', syntax(23).replaceAll(' | ', '\n    | '), prose(23))
  property(24, 'grid-area', 'Area di un elemento', undefined, prose(24))
  keep(25); keep(26)
  // Keep the original destination while replacing its raw URL with a readable label.
  for (const block of result.at(-1).blocks) for (const paragraph of block.paragraphs || []) {
    if (paragraph.runs.length === 1 && paragraph.runs[0].href) {
      paragraph.text = paragraph.runs[0].text = 'MDN · srcset'
    }
  }
  for (const source of [27,28,29,30,31,32,33]) {
    const slide = keep(source)
    for (const block of slide.blocks.filter(block => block.kind === 'code')) {
      block.text = block.text.replace(/\t/g, '  ')
      if (source === 31) block.text = '<img ... sizes="[media query] [length],\n                [media query] [length],\n                ...\n                [default length]"\n>'
      if (source === 32) block.text = block.text.replace('<!-- ', '<!--\n  ').replace(' una larghezza', '\n  una larghezza').replace(' di 440px', '\n  di 440px').replace(' Il browser', '\n  Il browser').replace(' scegliendo', '\n  scegliendo').replace(' -->', '\n-->').replace('300w,image-medium', '300w,\n             image-medium').replace('460w, image-large', '460w,\n             image-large').replace('280px, (max-width', '280px,\n            (max-width').replace('440px,  800px', '440px,\n            800px').replace('src="image-small.jpg" alt="An image"', 'src="image-small.jpg"\n     alt="An image"')
    }
    if (source === 32) {
      const example = slide.blocks.find(block => block.kind === 'code')
      // The long original comment stays beside the syntax as ordinary explanation.
      const comment = example.text.match(/<!--([\s\S]*?)-->/)[1].replace(/\s+/g, ' ').trim()
      example.text = example.text.replace(/<!--[\s\S]*?-->\n?/, '')
      slide.blocks = [text([...prose(source), { text: comment, runs: [{ text: comment }], bullet: false, level: 0 }]), example]
    }
  }
  references(34, ['CSS-Tricks · A Guide to the Responsive Images Syntax in HTML', 'Smashing Magazine · Responsive Images Done Right: A Guide To picture And srcset']).title = 'Riferimenti · immagini responsive'
  keep(35); keep(36)
  const assignmentParagraph = (value, bullet = false) => ({
    text: value.replaceAll('`', ''), bullet, level: 0,
    runs: value.split(/(`[^`]+`)/).filter(Boolean).map(fragment => fragment.startsWith('`') ? { text: fragment.slice(1, -1), mono: true } : { text: fragment }),
  })
  result.push({
    kind: 'content', title: 'Esercizio 2 · Il sito con Grid e srcset',
    sourceSlide: null, sourceSlides: [], sourceKind: 'course-assignment',
    number: result.length + 1, part: 1, parts: 1,
    adaptedFrom: [{ exercise: '01', slide: 64 }, { exercise: '02', slide: 44 }],
    blocks: [
      text([assignmentParagraph('Ripartite dal sito a tre pagine, Home, Chi siamo e Contatti, già riorganizzato con Flexbox nella lezione precedente.')]),
      text([
        assignmentParagraph('Conservate contenuti, collegamenti, menu e footer; usate Grid per disporre le aree principali con `grid-template-areas` e `grid-area`', true),
        assignmentParagraph('In un gruppo di contenuti definite righe, colonne e spazi con `grid-template-columns`, `grid-template-rows` e `gap`; posizionate un elemento con `grid-column` o `grid-row`', true),
        assignmentParagraph('Inserite un’immagine con `srcset`, descrittori `w` e `sizes` coerenti con il layout; usate `aspect-ratio` e `object-fit` per gestirne il riquadro', true),
        assignmentParagraph('Verificate il sito su una finestra ampia e una stretta: controllate disposizione dei contenuti, ritaglio e risorsa immagine scelta dal browser', true),
      ]),
      text([{ text: 'Esercizio', runs: [{ text: 'Esercizio', href: '/images/esercitazioni/esercizio-03/index.html' }], bullet: false, level: 0 }]),
    ],
  })
  result.push({
    kind: 'content', title: 'Esercizio 2 · Il sito aggiornato',
    sourceSlide: null, sourceSlides: [], sourceKind: 'course-assignment',
    number: result.length + 1, part: 1, parts: 1, layout: 'screenshot',
    adaptedFrom: [{ exercise: '03', slide: 42 }],
    blocks: [{ kind: 'figure', src: '/images/esercitazioni/sito-grid-responsive.webp',
      alt: 'Evoluzione del sito precedente: menu Home, Chi siamo e Contatti, introduzione e immagine affiancate con Grid, tre blocchi sotto e footer blu.',
      caption: 'Il sito precedente con layout Grid e un’immagine responsive. Su schermi stretti introduzione, immagine e blocchi si dispongono in una colonna.',
      showCaption: false }],
  })
  keep(37)
  for (const slide of result) {
    slide.title = gridTextRevision(slide.title)
    for (const block of slide.blocks) for (const paragraph of block.paragraphs || []) {
      paragraph.text = gridTextRevision(paragraph.text)
      paragraph.runs = paragraph.runs.map(run => ({ ...run, text: gridTextRevision(run.text), ...(paragraph.text === 'Non è consigliato inserire immagini diverse' ? { bold: true } : {}) }))
    }
  }
  // The Grid diagrams preserve the original tracks and line names as zoomable SVGs.
  for (const source of [18, 19]) {
    const slide = result.find(slide => slide.sourceSlide === source && slide.blocks.some(block => block.items?.[0].native))
    const item = slide.blocks[0].items[0]
    delete item.native
    item.figure = {
      src: `/images/esercitazioni/grid-${source === 18 ? 'righe-colonne' : 'linee-nominate'}.svg`,
      alt: source === 18 ? 'Griglia con quattro colonne uguali e tre righe di 100, 250 e 150 pixel. Cinque linee verticali rosa e quattro orizzontali ambra delimitano le celle.' : 'Griglia con quattro colonne e tre righe. Le cinque linee verticali rosa sono col1, col2, col3, col4 e col5; le quattro linee orizzontali ambra sono row1, row2, row3 e row4.',
      caption: source === 18 ? 'Quattro colonne e tre righe, con proporzioni verticali 100:250:150.' : 'I nomi indicano le linee di inizio e fine delle colonne e delle righe.',
    }
  }
  // Preserve every original outbound destination, including linked service labels.
  for (const source of groups.keys()) {
    const destinations = result.filter(slide => slide.sourceSlides.includes(source))
    const known = new Set(JSON.stringify(destinations).match(/https?:[^"\s]+/g))
    const missing = links(source).filter(link => !known.has(link.url))
    if (missing.length) destinations.at(-1).sources = [...(destinations.at(-1).sources || []), ...missing]
  }
  return result
}
