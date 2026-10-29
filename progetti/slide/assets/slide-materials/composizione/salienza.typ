#import "/progetti/booklet/template/editorial.typ": panel-letter
#import "/progetti/booklet/template/geometry.typ": ink
#set page(width: 488pt, height: auto, margin: 1pt)
#set text(font: "DM Sans 9pt", size: 10pt, weight: 400, variations: (opsz: 18))
#set par(justify: false, leading: 2pt, spacing: 7pt)
#let visual-search() = [
    #grid(columns: (1fr, 1fr), column-gutter: 30pt,
      [*#panel-letter[a] · Un segnale distinto*#v(10pt)#grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr), gutter: 8pt,
        ..range(20).map(i => circle(radius: 6pt, fill: if i == 12 { rgb("46ECD5") } else { rgb("626872") }, stroke: none)))],
      [*#panel-letter[b] · Segnali concorrenti*#v(10pt)#grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr), gutter: 8pt,
        ..range(20).map(i => circle(radius: if calc.rem(i, 3) == 0 { 8pt } else { 6pt },
          fill: (rgb("46ECD5"), rgb("FFB86A"), rgb("626872"), rgb("FFA2A2")).at(calc.rem(i, 4)), stroke: none)))])
  ]
#visual-search()
