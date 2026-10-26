// Native numbered footnotes in a measured band on the same physical page.
// References and entries are rendered separately so measurement cannot duplicate notes.

#import "geometry.typ": (footnote-space, footnote-gap, grid-width, column-width, column-gutter,
  grid-bottom, left-margin, ink)
#let footnote-width = grid-width
#let entry-gap = 3.5pt
#let footnote-head = 4.4pt

#let footnote-height(heights) = if heights.len() == 0 { 0pt } else {
  footnote-head + heights.sum() + entry-gap * (heights.len() - 1)
}

// Resolve repeated references and reject cycles or missing original notes.
#let original-note(note-item) = {
  let original = note-item
  let visited = ()
  while type(original.body) == label {
    assert(original.body not in visited, message: "Circular reference between repeated footnotes.")
    visited.push(original.body)
    let original-items = query(original.body)
    assert(original-items.len() == 1 and original-items.first().func() == footnote,
      message: "A repeated reference must identify exactly one original footnote: " + repr(original.body))
    original = original-items.first()
  }
  original
}

#let note-number(note-item) = numbering(note-item.numbering,
  ..counter(footnote).at(note-item.location()))

#let draw-reference(note-item, destination) = {
  sym.wj
  super(link(destination, note-number(note-item)))
}

#let note-label(note-item) = {
  let chapter = counter(heading).at(note-item.location()).first()
  label("booklet-nota-" + str(chapter) + "-"
    + str(counter(footnote).at(note-item.location()).first()))
}

// Render a reference during measurement without constructing another note entry.
#let reference-only(note-item) = context {
  let original = original-note(note-item)
  draw-reference(original, note-label(original))
}

#let wrapped-reference(note-item, region) = context {
  [#metadata(("regione": region, "origine": note-item.location()))<booklet-richiamo-sagomato>]
  reference-only(note-item)
}

#let entry-style(width, body) = block(width: width, above: 0pt, below: 0pt)[
  #set text(font: ("DM Sans 9pt", "Noto Sans JP", "Noto Sans SC"), size: 7.5pt,
    weight: 400, style: "normal", variations: (opsz: 9), fill: ink)
  #show cite: set text(size: 7.5pt, fill: ink)
  #set par(justify: false, leading: 1.5pt, spacing: 3pt, first-line-indent: 0pt)
  #body
]

// Measure the printed entry style, not the default footnote apparatus.
#let entry-height(note-item, width: footnote-width) = measure(
  entry-style(width)[
    #super(note-number(note-item))#h(0.2em)#note-item.body
  ], width: width).height

#let note-entry(note-item, width: footnote-width) = entry-style(width)[
  #metadata(note-item.location()) <booklet-note-entry>
  #metadata(note-item.location())#note-label(note-item)
  #show footnote.entry: entry => [
    #link(note-item.location(), super(note-number(note-item)))#h(0.2em)#note-item.body
  ]
  #footnote.entry(note-item)
]

// Build one page index instead of rescanning all notes for each entry.
#let note-index() = {
  let pages = (:)
  for note-item in query(footnote) {
    if type(note-item.body) != label {
      let page-number = str(note-item.location().page())
      pages.insert(page-number, pages.at(page-number, default: ()) + (note-item,))
    }
  }
  pages
}

// Compute entry heights and offsets inside the available footnote band.
#let compose-notes(page-number, width: footnote-width) = {
  let note = note-index().at(str(page-number), default: ())
  let heights = note.map(n => entry-height(n, width: width))
  let total-height = footnote-height(heights)
  assert(total-height <= footnote-space,
    message: "Footnotes on page " + str(page-number)
      + " exceed the reserved footnote area (" + repr(total-height) + ").")
  let offset = ()
  let previous = 0pt
  for (index, height) in heights.enumerate() {
    offset.push(previous + if index == 0 { 0pt } else { footnote-head })
    previous += height + entry-gap
  }
  (note: note, "altezze": heights, offset: offset, "totale": total-height, gap: entry-gap)
}

#let outer-note-pages() = query(<booklet-note-esterne>).map(m => m.location().page())

#let note-separator(width) = [
  #rect(width: 0.3 * width, height: 0.4pt, fill: ink, stroke: none)
  #v(4pt, weak: false)
]

// Place the real entry once, respecting local caption and spread reservations.
#let place-entry(note-item) = {
  let origin = note-item.location()
  box(width: 0pt, height: 0pt)[#context {
    let position-options = here().position()
    let page-number = origin.page()
    let outer = page-number in outer-note-pages()
    let width = if outer { column-width } else { footnote-width }
    let composition = compose-notes(page-number, width: width)
    let note = composition.note
    let index = note.position(n => n.location() == origin)
    let x = left-margin(page-number) + if outer and calc.odd(page-number) { column-width + column-gutter } else { 0pt }
    let captions = query(<booklet-didascalia-al-piede>)
      .filter(m => m.location().page() == page-number)
    let caption-reserve = if captions.len() == 0 { 0pt }
      else { captions.first().value.altezza + footnote-gap }
    let y = (grid-bottom - caption-reserve
      - composition.totale + composition.offset.at(index))
    place(top + left, dx: x - position-options.x, dy: y - position-options.y)[
      #block(width: width, above: 0pt, below: 0pt)[
        #if index == 0 {
          if captions.len() == 0 { note-separator(width) }
            else { v(footnote-head, weak: false) }
        }
        #metadata(("pagina": page-number, note: note.len(), "indice": index,
          "origine": origin, altezza_voce: composition.altezze.at(index),
          "larghezza": width, "altezza": composition.totale, "spazio": footnote-space)) <booklet-note-region>
        #note-entry(note-item, width: width)
      ]
    ]
  }]
}

// Render measured entries outside the Meander region that places references.
#let wrap-entries(region) = context {
  let origins = query(<booklet-richiamo-sagomato>)
    .filter(m => m.value.regione == region).map(m => m.value.origine)
  for note-item in query(footnote) {
    if type(note-item.body) != label and note-item.location() in origins {
      place-entry(note-item)
    }
  }
}

// Keep the reference anchor on the same line as the visible number.
#let note-reference(note-item) = context {
  let repeated = type(note-item.body) == label
  let original = original-note(note-item)
  let origin = original.location()
  let anchors = query(selector(<booklet-note-entry>).and(metadata.where(value: origin)))
  let destination = if anchors.len() == 0 { origin } else { anchors.first().location() }
  draw-reference(original, destination)
  if not repeated { sym.wj; place-entry(note-item) }
}
