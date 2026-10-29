#import "/progetti/booklet/template/editorial.typ": panel-letter
#import "/progetti/booklet/template/geometry.typ": ink
#set page(width: 528pt, height: auto, margin: 1pt)
#set text(font: "DM Sans 9pt", size: 10pt, weight: 400, variations: (opsz: 18))
#set par(justify: false, leading: 2pt, spacing: 7pt)
#let balance-comparison() = {
  let panel(symmetric) = layout(space => {
    let scale = space.width / 172
    let disks = if symmetric { ((46, 16), (126, 16)) }
      else { ((64, 20), (142, 12)) }
    box(width: space.width, height: 88 * scale)[
      #place(top + left, line(start: (86 * scale, 8 * scale),
        end: (86 * scale, 80 * scale),
        stroke: (paint: rgb("9CA3AF"), thickness: 0.5pt, dash: "dashed")))
      #for (x, radius) in disks {
        place(top + left, dx: (x - radius) * scale,
          dy: (44 - radius) * scale,
          circle(radius: radius * scale, fill: ink, stroke: none))
      }
    ]
  })
  grid(columns: (1fr, 1fr), column-gutter: 30pt,
    [*#panel-letter[a] · Simmetria*#v(6pt)#panel(true)],
    [*#panel-letter[b] · Pesi e distanze*#v(6pt)#panel(false)])
}
#balance-comparison()
