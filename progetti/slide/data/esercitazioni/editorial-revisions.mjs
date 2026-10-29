import { basicSelectors, selectorContexts } from './selector-references.mjs'
import { documentaryExamples } from './documentary-examples.mjs'
import { tagReferenceBlocks } from './tag-references.mjs'
import { browserMarketShare } from './browser-market-share.mjs'

const mergedAway = [6, 8, 11, 13, 21, 23, 25, 29, 30, 32, 35, 37, 39, 40, 42, 43, 46, 58, 62, 63, 68, 69, 72, 73, 75, 76, 82, 84, 85, 87, 88, 90, 92, 93, 95, 96, 98, 99, 100, 102, 105, 107]
export const revisedExerciseNumber = number => number - mergedAway.filter(removed => removed <= number).length

/** Remove sentence punctuation at the end of editorial list items. */
export function reviseListPunctuation(slides) {
  const strip = text => text.replace(/[.,;:!?…]+(?=\s*$)/u, '')
  for (const slide of slides) for (const block of slide.blocks) {
    for (const paragraph of block.paragraphs || []) {
      if (!paragraph.bullet) continue
      const text = strip(paragraph.text)
      if (text === paragraph.text) continue
      const end = paragraph.text.trimEnd().length
      const start = text.trimEnd().length
      let offset = 0
      for (const run of paragraph.runs) {
        const next = offset + run.text.length
        run.text = run.text.slice(0, Math.max(0, start - offset))
          + run.text.slice(Math.max(0, end - offset))
        offset = next
      }
      paragraph.text = text
    }
    if (block.kind === 'tag-reference') {
      for (const item of block.items || []) item.traits = item.traits.map(strip)
      if (block.sharedTraits) block.sharedTraits = block.sharedTraits.map(strip)
    }
  }
  return slides
}

/** Revisions after the retained historical import and native reconstruction. */
export function reviseExercise(slides, exercise) {
  return reviseListPunctuation(reviseExerciseContent(structuredClone(slides), exercise))
}

function reviseExerciseContent(slides, exercise) {
  if (exercise !== '01') return slides
  const revised = structuredClone(slides)
  const explanation = revised.find(slide => slide.number === 5)
  explanation.layout = 'diagram'
  explanation.part = explanation.parts = 1
  explanation.blocks.push({
    kind: 'figure', src: '/images/esercitazioni/architettura-web.svg',
    alt: 'Il client è un browser. Invia una richiesta HTTP al web server, che restituisce una risposta HTTP con i contenuti richiesti.',
    caption: 'Il browser invia una richiesta HTTP; il server restituisce una risposta.'
  })
  const marketShare = revised.find(slide => slide.number === 9)
  const sourceRun = marketShare.blocks[0].paragraphs[0].runs[0]
  sourceRun.href = browserMarketShare.source
  sourceRun.text = marketShare.blocks[0].paragraphs[0].text = `Fonte: StatCounter · ${browserMarketShare.period}`
  marketShare.blocks[1] = { kind: 'native', example: 'browser-share-2026-09', caption: '' }
  const browser = revised.find(slide => slide.number === 7)
  const continuation = revised.find(slide => slide.number === 8)
  browser.blocks[0].paragraphs.push(...continuation.blocks[0].paragraphs)
  browser.part = browser.parts = 1
  const webPage = revised.find(slide => slide.number === 10)
  const webPageContinuation = revised.find(slide => slide.number === 11)
  webPage.blocks[0].paragraphs.push(...webPageContinuation.blocks[0].paragraphs)
  webPage.part = webPage.parts = 1
  const hypertext = revised.find(slide => slide.number === 12)
  hypertext.layout = 'diagram'
  hypertext.part = hypertext.parts = 1
  hypertext.blocks.push({ kind: 'figure', src: '/images/esercitazioni/ipertesti.svg',
    alt: 'Sei documenti collegati: A verso B, D ed E; B verso C ed E; C verso F; E verso D; F verso C ed E.',
    caption: 'I collegamenti permettono percorsi di lettura non sequenziali fra documenti.' })
  const tagExample = revised.find(slide => slide.sourceSlide === 15)
  tagExample.blocks = [{ kind: 'annotated-code', text: tagExample.blocks[0].text,
    opening: '<tag>', closing: '</tag>', labels: tagExample.blocks.slice(1).map(block => block.paragraphs[0].text) }]
  const elements = revised.find(slide => slide.number === 20)
  elements.blocks.push(...revised.find(slide => slide.number === 21).blocks)
  elements.part = elements.parts = 1
  const rendering = revised.find(slide => slide.number === 22)
  // The native comparison already contains the exact code and its rendered result.
  rendering.blocks = [...rendering.blocks.filter(block => block.kind !== 'code'), ...revised.find(slide => slide.number === 23).blocks]
  rendering.part = rendering.parts = 1
  const attributes = revised.find(slide => slide.number === 25)
  for (const paragraph of attributes.blocks[0].paragraphs.slice(1, 3)) {
    paragraph.runs = paragraph.runs.flatMap(run => run.text.replace('“=”', '=').replace("' '", "''")
      .split(/(=|""|'')/).filter(Boolean).map(text => ({ ...run, text, ...(['=', '""', "''"].includes(text) ? { mono: true } : {}) })))
    paragraph.text = paragraph.runs.map(run => run.text).join('')
  }
  const attributeExample = revised.find(slide => slide.number === 24)
  attributeExample.blocks = [...attributes.blocks, ...attributeExample.blocks]
  attributeExample.sourceSlides = [18, 19]
  const emptyTags = revised.find(slide => slide.sourceSlide === 20)
  for (const block of emptyTags.blocks.filter(block => block.kind === 'code' && /<(br|img)\/>/.test(block.text))) {
    block.text = block.text.replace(/<(br|img)\/>/g, '<$1 />')
    for (const paragraph of block.paragraphs) {
      paragraph.text = paragraph.text.replace(/<(br|img)\/>/g, '<$1 />')
      for (const run of paragraph.runs) if (run.text === '/') run.text = ' /'
    }
  }
  const references = tagReferenceBlocks(revised)
  revised.find(slide => slide.sourceSlide === 21).blocks = [references.layout]
  const textTags = revised.find(slide => slide.sourceSlide === 22)
  textTags.blocks = [references.text]
  textTags.part = textTags.parts = 1
  const emphasisTags = revised.find(slide => slide.sourceSlide === 23)
  emphasisTags.blocks = [references.emphasis]
  emphasisTags.part = emphasisTags.parts = 1
  revised.find(slide => slide.sourceSlide === 24).blocks = [references.comments]
  for (const [sourceSlide, key] of [[25, 'unordered'], [26, 'ordered'], [27, 'table'], [28, 'form']]) {
    const slide = revised.find(slide => slide.sourceSlide === sourceSlide)
    slide.blocks = [references[key]]
    slide.part = slide.parts = 1
  }
  revised.find(slide => slide.sourceSlide === 29).blocks = [references.image]
  const links = revised.find(slide => slide.sourceSlide === 30)
  links.blocks = [references.links]
  links.part = links.parts = 1
  for (const [sourceSlide, file, alt, caption] of [
    [32, 'url-assoluto.svg', 'URL assoluto https://www.sitoweb.it/cartella/risorsa.ext, scomposto in protocollo, sottodominio, dominio, dominio di primo livello e percorso.', 'Le parti dell’URL assoluto: protocollo, sottodominio, dominio, dominio di primo livello e percorso.'],
    [33, 'url-radice.svg', 'Il percorso /cartella/risorsa.ext parte dalla radice del sito. Protocollo e host del documento corrente sono sottintesi.', 'Percorso relativo alla radice: protocollo e host sono quelli del documento corrente.'],
  ]) {
    const slide = revised.find(slide => slide.sourceSlide === sourceSlide)
    slide.layout = 'figure'
    slide.blocks = [{ kind: 'figure', src: `/images/esercitazioni/${file}`, alt, caption }]
  }
  const paths = revised.find(slide => slide.sourceSlide === 34)
  const titles = ['Stessa cartella', 'Sottocartella', 'Radice del sito', 'Cartella genitore']
  paths.blocks = [{ kind: 'path-reference', paths: paths.blocks[0].rows.slice(1).map(([example, description], index) => ({ title: titles[index], example: example.replaceAll('”', '"'), description })) }]
  for (const example of documentaryExamples) {
    const slide = revised.find(slide => slide.sourceSlide === example.sourceSlide)
    slide.layout = 'screenshot'
    slide.blocks = [{ kind: 'figure', src: example.src, alt: example.alt, ...(example.crop ? { crop: example.crop } : {}) }]
  }
  const body = revised.find(slide => slide.number === 57)
  body.blocks = [references.body]
  body.part = body.parts = 1
  const indentation = revised.find(slide => slide.number === 61)
  indentation.title = 'Indentazione dei tag'
  indentation.layout = 'columns'
  indentation.part = indentation.parts = 1
  const indentationText = revised.find(slide => slide.number === 63).blocks[0]
  indentation.blocks = [indentationText, { kind: 'code', text: [
    '<div id="wrapper">',
    '  <div id="header">',
    '    <ul>',
    '      <li>Menu Item</li>',
    '      <li>Menu Item',
    '        <ul>',
    '          <li>Sub Menu Item</li>',
    '          <li>Sub Menu Item</li>',
    '        </ul>',
    '      </li>',
    '    </ul>',
    '  </div>',
    '  <div id="main-content"><p>lorem ipsum</p></div>',
    '  <div id="sidebar"><p>lorem ipsum</p></div>',
    '</div>',
  ].join('\n') }]
  const historicalFormatting = revised.find(slide => slide.number === 67)
  historicalFormatting.blocks = [historicalFormatting.blocks[0], ...revised.find(slide => slide.number === 69).blocks]
  historicalFormatting.blocks[1].caption = ''
  historicalFormatting.part = historicalFormatting.parts = 1
  const cssExample = revised.find(slide => slide.number === 71)
  const cssDescription = revised.find(slide => slide.sourceSlide === 49).blocks[0].paragraphs[1]
  const [beforeTag, afterTag] = cssDescription.text.split('“p”')
  cssDescription.runs = [{ text: beforeTag }, { text: 'p', mono: true }, { text: afterTag }]
  cssDescription.text = cssDescription.runs.map(run => run.text).join('')
  const cssCode = revised.find(slide => slide.number === 72).blocks[0]
  const htmlCode = revised.find(slide => slide.number === 73).blocks[0]
  cssExample.layout = 'code-columns'
  cssExample.part = cssExample.parts = 1
  cssExample.blocks = [{ kind: 'text', paragraphs: cssExample.blocks.flatMap(block => block.paragraphs) },
    { kind: 'code', text: cssCode.text.replaceAll('\n\n', '\n').replace('/* styles.css */\n', '/* styles.css */\n\n') },
    { kind: 'code', text: htmlCode.text.replaceAll('”', '"').replace(/(<p(?: class="blu")?>)([^<]+)(<\/p>)/g, '$1\n  $2\n$3') }]

  const cssApplication = revised.find(slide => slide.number === 74)
  cssApplication.blocks = revised.find(slide => slide.number === 76).blocks
  cssApplication.blocks[0].caption = ''
  cssApplication.part = cssApplication.parts = 1
  const inlineStyle = revised.find(slide => slide.sourceSlide === 53)
  const inlineDescription = inlineStyle.blocks[0].paragraphs[0]
  inlineDescription.text = 'Quando lo stile viene specificato in linea con l’elemento, dentro l’attributo style'
  inlineDescription.runs = [{ text: 'Quando lo stile viene specificato in linea con l’elemento, dentro l’attributo ' }, { text: 'style', mono: true }]
  const cssRule = revised.find(slide => slide.number === 81)
  cssRule.layout = 'figure'
  cssRule.part = cssRule.parts = 1
  cssRule.blocks = [{ kind: 'figure', src: '/images/esercitazioni/regola-css.svg',
    alt: 'Una regola CSS comprende il selettore e il blocco tra parentesi graffe. Ogni dichiarazione associa una proprietà a un valore: proprietà1: valore1; proprietà2: valore2;.',
    caption: 'Una dichiarazione associa una proprietà a un valore; il selettore e il blocco delle dichiarazioni formano la regola CSS.' }]
  const selectors = revised.find(slide => slide.number === 83)
  selectors.blocks = [basicSelectors]
  selectors.part = selectors.parts = 1
  for (const [sourceSlide, block] of Object.entries(selectorContexts)) {
    const context = revised.find(slide => slide.sourceSlide === Number(sourceSlide))
    context.blocks = [block]
    context.part = context.parts = 1
  }
  const resources = revised.find(slide => slide.number === 106)
  resources.blocks = revised.find(slide => slide.number === 107).blocks
  resources.blocks[0].resourceLayout = 'list'
  resources.blocks[0].showHint = false
  resources.part = resources.parts = 1
  const assignment = revised.find(slide => slide.number === 104)
  assignment.sourceSlides = [65, 66]
  const paragraph = text => ({ text, runs: [{ text }], bullet: true, level: 0 })
  assignment.blocks = [{ kind: 'text', paragraphs: [
    { ...paragraph('Creare tre pagine collegate tra loro, seguendo la struttura dell’esempio interattivo.'), bullet: false },
    paragraph('Mantenere lo stesso menu e footer; disporre i contenuti come nelle tre pagine dell’esempio.'),
    paragraph('Utilizzare selettori di relazione per assegnare stili al menu.'),
    { text: 'Inserire uno pseudoelemento ::after dopo gli elementi di una classe a scelta.', runs: [
      { text: 'Inserire uno pseudoelemento ' }, { text: '::after', mono: true },
      { text: ' dopo gli elementi di una classe a scelta.' },
    ], bullet: true, level: 0 },
  ] }, { kind: 'text', paragraphs: [{ text: 'Apri l’esempio interattivo', runs: [{ text: 'Apri l’esempio interattivo', href: '/images/esercitazioni/esercizio-01/index.html' }], bullet: false, level: 0 }] }]
  return revised.filter(slide => !mergedAway.includes(slide.number)).map(slide => ({ ...slide, number: revisedExerciseNumber(slide.number) }))
}

export function reviseExerciseMarkdown(markdown, exercise) {
  if (exercise !== '01') return markdown
  let revised = markdown
  for (const number of mergedAway) {
    const pattern = new RegExp(`---\\nlayout: default\\nclass: content-slide exercise-slide reading-slide\\nlesson: esercitazione-01\\nlessonSlide: ${number}\\n[\\s\\S]*?<ExerciseContent exercise="01" :slide="${number}" \\/>\\n\\n`)
    revised = revised.replace(pattern, '')
  }
  revised = revised.replace('lessonSlide: 24\nexerciseNumber: 1\nsourceSlide: 18', 'lessonSlide: 24\nexerciseNumber: 1\nsourceSlide: 18\nsourceSlides: [18, 19]')
  revised = revised.replace('lessonSlide: 104\nexerciseNumber: 1\nsourceSlide: 65', 'lessonSlide: 104\nexerciseNumber: 1\nsourceSlide: 65\nsourceSlides: [65, 66]')
  revised = revised.replace('# Gerarchia dei tag (2) · esempio', '# Indentazione dei tag')
  return revised.replace(/(lessonSlide: |:slide=")(\d+)/g, (_, prefix, value) => prefix + revisedExerciseNumber(Number(value)))
}
