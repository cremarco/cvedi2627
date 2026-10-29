const mdn = element => `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/${element}`

/** Keep each use context together, using the examples from its original page. */
export function tagReferenceBlocks(slides) {
  const layout = slides.find(slide => slide.sourceSlide === 21)
  const textBlocks = slides.filter(slide => slide.sourceSlide === 22).flatMap(slide => slide.blocks)
  const examples = textBlocks.filter(block => block.kind === 'code')
  const emphasisExamples = slides.find(slide => slide.sourceSlide === 23).blocks.filter(block => block.kind === 'code').map(block => block.text.split('\t')[0])
  const comments = slides.find(slide => slide.sourceSlide === 24)
  const listReference = (sourceSlide, tag, title) => {
    const slide = slides.find(slide => slide.sourceSlide === sourceSlide)
    const example = slide.blocks.find(block => block.kind === 'code').text.split('\n').map(line => line.split('\t')[0]).join('\n')
    return { kind: 'tag-reference', arrangement: 'example-result', items: [{
      tags: [`<${tag}>`], title, url: mdn(tag), example,
      result: { tag, items: [...example.matchAll(/<li>(.*?)<\/li>/g)].map(match => match[1]) },
      traits: slide.blocks.find(block => block.kind === 'text').paragraphs.map(paragraph => paragraph.text.replace(/“(<\/?li>)”/g, '$1')),
    }] }
  }
  const tableSlide = slides.find(slide => slide.sourceSlide === 27 && slide.blocks.some(block => block.kind === 'code'))
  const formSlide = slides.find(slide => slide.sourceSlide === 28)
  const imageSlide = slides.find(slide => slide.sourceSlide === 29)
  const linkSlides = slides.filter(slide => slide.sourceSlide === 30)
  const linkCode = linkSlides.flatMap(slide => slide.blocks).filter(block => block.kind === 'code')
  const linkLabels = linkSlides.flatMap(slide => slide.blocks).filter(block => block.kind === 'text').flatMap(block => block.paragraphs).filter(paragraph => paragraph.runs.some(run => run.bold))
  const bodySlide = slides.find(slide => slide.sourceSlide === 41)
  return {
    body: { kind: 'tag-reference', items: [{
      tags: ['<body>'], title: 'Contenuto della pagina', url: mdn('body'), introduction: bodySlide.blocks[0].paragraphs,
      example: '<body>\n  <header></header>\n  <main>\n    <article>\n      Titolo e contenuti della pagina\n    </article>\n  </main>\n  <footer></footer>\n</body>',
      traits: [],
    }] },
    image: { kind: 'tag-reference', arrangement: 'example-result', items: [{
      tags: ['<img>'], title: 'Immagine', url: mdn('img'), introduction: imageSlide.blocks[0].paragraphs,
      example: imageSlide.blocks.find(block => block.kind === 'code').text.replace('image.png', 'image.svg'),
      result: { tag: 'img', src: '/images/esercitazioni/image.svg', alt: 'Immagine dimostrativa' },
      traits: imageSlide.blocks.at(-1).paragraphs.map(paragraph => paragraph.text),
    }] },
    links: { kind: 'tag-reference', arrangement: 'samples', items: [{
      tags: ['<a>'], title: 'Collegamento', url: mdn('a'), introduction: linkSlides[0].blocks[0].paragraphs,
      samples: linkCode.map((block, index) => ({ example: block.text.replace('>Wikipedia</a>', '>\n  Wikipedia</a>'), description: linkLabels[index].text,
        result: { tag: 'a', text: ['Wikipedia', 'Pagina 1', 'Pagina 2'][index], href: ['https://it.wikipedia.org/', '/images/esercitazioni/links/pagina1.html', '/images/esercitazioni/links/pages/pagina2.html'][index] } })),
      traits: linkSlides.at(-1).blocks.at(-1).paragraphs.map(paragraph => paragraph.text),
    }] },
    unordered: listReference(25, 'ul', 'Elenco puntato'),
    ordered: listReference(26, 'ol', 'Elenco numerato'),
    table: { kind: 'tag-reference', arrangement: 'example-result', items: [{
      tags: ['<table>'], title: 'Tabella', url: mdn('table'),
      example: tableSlide.blocks.find(block => block.kind === 'code').text,
      native: '01-027-diagram.webp', traits: [],
    }] },
    form: { kind: 'tag-reference', arrangement: 'example-result', items: [{
      tags: ['<form>'], title: 'Modulo', url: mdn('form'),
      introduction: formSlide.blocks.find(block => block.kind === 'text').paragraphs,
      example: formSlide.blocks.find(block => block.kind === 'code').text,
      native: '01-028-diagram.webp', traits: [],
    }] },
    layout: { kind: 'tag-reference', items: [{
      tags: ['<div>'], title: 'Divisore', url: mdn('div'),
      example: layout.blocks.find(block => block.kind === 'code').text,
      traits: ['Uno dei tag più utilizzati per strutturare le pagine web', 'Elemento blocco', 'Necessita chiusura'],
    }] },
    comments: { kind: 'tag-reference', items: [{
      tags: ['<!-- -->'], title: 'Commento', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Comments',
      example: comments.blocks.find(block => block.kind === 'code').text,
      traits: comments.blocks.at(-1).paragraphs.map(paragraph => paragraph.text),
    }] },
    emphasis: { kind: 'tag-reference', arrangement: 'rows', sharedTraits: ['Elementi inline', 'Necessitano di chiusura'], items: [
      { tags: ['<u>'], title: 'Sottolineato', url: mdn('u'), example: emphasisExamples[0], result: { tag: 'u', text: 'Lorem ipsum' },
        traits: [] },
      { tags: ['<em>'], title: 'Corsivo / Enfasi', url: mdn('em'), example: emphasisExamples[1], result: { tag: 'em', text: 'Lorem ipsum' },
        traits: [] },
      { tags: ['<strong>'], title: 'Grassetto / Importanza', url: mdn('strong'), example: emphasisExamples[2], result: { tag: 'strong', text: 'Lorem ipsum' },
        traits: [] },
    ] },
    text: { kind: 'tag-reference', arrangement: 'stacked-pair', items: [
      { tags: ['<p>'], title: 'Paragrafo', url: mdn('p'), example: examples[0].text,
        traits: ['Il browser aggiunge margini prima e dopo.', 'Elemento blocco.', 'Nell’esempio usiamo la chiusura </p>.'] },
      { tags: ['<br>'], title: 'A capo', url: mdn('br'), example: examples[2].text.replace('<br/>', '<br />'),
        traits: ['Interrompe la riga.', 'Non ha contenuto né tag di chiusura.'] },
      { tags: ['<h1>', '<h6>'], title: 'Headings / Titoli', url: mdn('Heading_Elements'), example: examples[1].text,
        traits: ['Da <h1> a <h6>: sei livelli gerarchici.', 'Elementi blocco.', 'Necessitano chiusura.'] },
    ] },
  }
}
