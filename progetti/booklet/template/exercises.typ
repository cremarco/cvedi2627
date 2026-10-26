// Generic exercise boxes anchored to the bottom of a page.
// The background follows the floated content instead of positioning individual prose lines.

#import "geometry.typ": grid-width, column-gutter, page-width, page-height
#import "palette.typ": front-matter-accent

#let exercise-tints(accent) = (
  "fondo": color.mix((accent, 8%), (white, 92%), space: rgb),
  cornice: color.mix((accent, 22%), (white, 78%), space: rgb),
  "punti": color.mix((accent, 45%), (white, 55%), space: rgb),
)

#let page-exercises(page-number) = {
  query(<booklet-esercizio>).filter(m => m.location().page() == page-number)
}

// Measure native prose to determine the height of a multi-column exercise.
#let exercise-columns(body, number) = context {
  let width = (grid-width - (number - 1) * column-gutter) / number
  let natural = measure(block(width: width, body), width: width).height
  let line-height = text.size + par.leading
  let height = calc.ceil(natural / number / line-height) * line-height + line-height
  block(width: grid-width, height: height, above: 0pt, below: 0pt)[
    #columns(number, gutter: column-gutter, body)
  ]
}

// Follow the exercise anchor with the shared three-tone background.
#let exercise-background() = context {
  let present = page-exercises(here().page())
  assert(present.len() <= 1, message: "Two bottom exercises occupy the same page.")
  if present.len() == 1 {
    let entry = present.first()
    [#metadata(("pagina": here().page(), id: entry.value.id,
      ancora: entry.location().page())) <booklet-esercizio-sfondo>]
    let y = entry.location().position().y - entry.value.rispetto
    let height = page-height - y
    let tint = exercise-tints(entry.value.accento)
    let band-height = 10mm
    let grid = tiling(size: (5mm, 5mm),
      align(center + horizon, circle(radius: 0.45mm, fill: tint.punti, stroke: none)))
    place(top + left, dy: y, rect(width: page-width, height: height,
      fill: tint.fondo, stroke: none))
    place(top + left, dy: y, rect(width: band-height, height: height,
      fill: tint.cornice, stroke: none))
    place(bottom + left, dx: band-height, rect(width: page-width - band-height,
      height: band-height, fill: tint.cornice, stroke: none))
    place(top + left, dy: y, rect(width: band-height, height: height,
      fill: grid, stroke: none))
    place(bottom + left, dx: band-height, rect(width: page-width - band-height,
      height: band-height, fill: grid, stroke: none))
  }
}

// Float editable exercise content at the foot of the body region.
#let exercise(body, id: none, title: [], level: 3, columns: 2) = {
  assert(id != none, message: "An exercise requires a stable ID.")
  let clearance = 8mm
  place(bottom, scope: "parent", float: true, clearance: 8mm)[
    #block(width: grid-width, above: 0pt, below: 0pt, breakable: false,
      inset: (top: clearance, bottom: 2mm))[
      #context [#metadata((id: id, "rispetto": clearance,
        "accento": state("colore-capitolo", front-matter-accent).get())) <booklet-esercizio>]
      #show heading.where(level: 3): it => block(above: 0pt, below: 8pt, sticky: true)[
        #set text(size: 14pt, weight: 900, variations: (opsz: 14), hyphenate: false)
        #set par(justify: false, leading: 0pt)
        #context counter(heading).display("1.1.1.")#h(3pt)#it.body
      ]
      #if level == none {
        block(above: 0pt, below: 8pt,
          text(size: 14pt, weight: 900, variations: (opsz: 14), title))
      } else { heading(level: level, title) }
      #if columns == 1 { body } else { exercise-columns(body, columns) }
      #metadata((id: id)) <booklet-esercizio-fine>
    ]
  ]
  pagebreak(weak: true)
}
