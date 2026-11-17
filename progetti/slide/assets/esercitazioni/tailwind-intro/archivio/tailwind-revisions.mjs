// Exercise 01 compositions applied to the authored Tailwind curriculum.
export const tailwindPairs = ['first', 'flex', 'grid', 'wrappingItems', 'focus']

export function reviseTailwindExercise(slides) {
  const revised = []
  for (let index = 0; index < slides.length; index++) {
    const slide = structuredClone(slides[index])
    slide.curriculumSlides = [slide.number]
    const next = slides[index + 1]
    const example = next?.blocks.length === 1 && next.blocks[0].example?.replace('framework:', '')
    if (slide.blocks.length === 1 && slide.blocks[0].kind === 'code' && tailwindPairs.includes(example)) {
      slide.blocks = [{ ...next.blocks[0], example: `tailwind:${example}` }]
      if (example === 'flex') slide.blocks[0].caption = 'La base dispone titolo e orario in colonna; da sm: condividono una riga.'
      if (example === 'grid') slide.blocks[0].caption = 'Le tre fasi usano una colonna come base; da md: condividono tre colonne con intervalli regolari.'
      slide.sources = [...new Map([...slide.sources, ...next.sources].map(source => [source.url, source])).values()]
      slide.curriculumSlides.push(next.number)
      index++
    }
    if (slide.title === 'I breakpoint predefiniti') slide.blocks[0].codeColumns = [0]
    if (slide.title === 'Le classi devono essere riconoscibili') {
      slide.blocks.push(...structuredClone(next.blocks))
      slide.curriculumSlides.push(next.number)
      slide.layout = 'columns'
      index++
    }
    for (const block of slide.blocks) for (const paragraph of block.paragraphs || []) {
      paragraph.runs = paragraph.runs.flatMap(run => run.href || run.mono ? [run] : run.text.split(/(md:grid-cols-2|grid-cols-2|motion-reduce:|@source|p-\*|m-\*|gap-\*|ps-\*|pe-\*|p-6|font-bold|md:|sm:|\bgrid\b|\bh1\b|\bh2\b)/g).filter(Boolean).map((text, index) => ({ ...run, text, ...(index % 2 ? { mono: true } : {}) })))
    }
    revised.push({ ...slide, number: revised.length + 1 })
  }
  return revised
}
