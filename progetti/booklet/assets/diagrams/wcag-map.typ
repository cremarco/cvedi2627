// Native graphic source. Figure placement and editorial metadata belong to the chapter.

#import "/progetti/booklet/template/palette.typ": chapter-accent

#let wcag-data = json(path("/progetti/booklet/assets/mappa-wcag-vettoriale/criteri.json"))
#let wcag-criteria = wcag-data.criteri.filter(c => not c.rimosso)

#let wcag-group(principle, guideline, first: false) = block(above: 0pt, below: 0pt)[
  #set align(left)
  #set text(font: "DM Sans 9pt", size: 7.5pt, weight: 400, variations: (opsz: 9))
  #set par(justify: false, leading: 1.5pt, spacing: 0pt)
  #if first [
    #text(font: "Sora", size: 10pt, weight: 700)[#principle.numero. #principle.titolo]
    #v(3pt)
    #principle.definizione
    #v(6pt)
  ]
  #block(above: 3pt, below: 3pt)[
    #text(size: 8.5pt, weight: 700)[#guideline.id #guideline.titolo]
  ]
  #grid(columns: (25pt, 20pt, 1fr), column-gutter: 3pt, row-gutter: 2pt,
    ..wcag-criteria.filter(c => c.id.starts-with(guideline.id + ".")).map(c => (
      text(c.id),
      box(inset: (x: 2pt, y: 0.5pt), fill: chapter-accent(3),
        text(size: 7pt, weight: 700, c.livello)),
      [#c.titolo#if c.nuovo { [~#text(weight: 700, "*")] }],
    )).flatten())
]
