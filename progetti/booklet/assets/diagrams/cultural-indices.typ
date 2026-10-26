// Native graphic source. Figure placement and editorial metadata belong to the chapter.

#import "/progetti/booklet/template/geometry.typ": grid-width
#import "/progetti/booklet/template/palette.typ": chapter-accent

#let chart-geometry = (
  "larghezza": 363pt, "altezza": 211.3pt,
  centri: (38.5, 88.5, 138.5, 220.5, 270.5, 320.5),
  asse-x: 33, asse-y: 187.5, asse-larghezza: 293.5,
  bandiera-y: 65.5, bandiera-diametro: 37.5,
)

#let cultural-chart(data, width: grid-width) = {
  assert(data.len() == 6, message: "Ogni schema culturale richiede sei paesi.")
  let g = chart-geometry
  let k = width / g.larghezza
  let axis = rgb("626872")
  let accent = chapter-accent(2)
  let score-x(n) = (g.asse-x + g.asse-larghezza * n / 100) * k * 1pt
  block(width: width, height: g.altezza * k, above: 0pt, below: 0pt)[
    #set par(justify: false, leading: 2pt * k, spacing: 0pt)
    #set text(font: "DM Sans 9pt", size: 8.5pt * k, fill: rgb("2E3138"),
      weight: 400, variations: (opsz: 9), hyphenate: false)
    #place(top + left, dx: score-x(0), dy: g.asse-y * k * 1pt,
      line(length: g.asse-larghezza * k * 1pt, stroke: 0.5pt * k + axis))
    #for n in range(0, 101, step: 20) {
      let x = score-x(n)
      place(top + left, dx: x, dy: (g.asse-y - 3.5) * k * 1pt,
        line(end: (0pt, 7pt * k), stroke: 0.5pt * k + axis))
      place(top + left, dx: x - 10pt * k, dy: 196pt * k,
        box(width: 20pt * k, align(center, text(size: 8pt * k, fill: axis, str(n)))))
    }
    #for (i, a) in data.enumerate() {
      assert(a.score >= 0 and a.score <= 100, message: "Punteggio fuori dalla scala 0–100.")
      let x = g.centri.at(i) * k * 1pt
      let target = score-x(a.score)
      let name = if a.italianName == "Nuova Zelanda" { [Nuova#linebreak()Zelanda] } else { a.italianName }
      place(top + left, dx: x - 27pt * k, dy: 12pt * k,
        box(width: 54pt * k, height: 27pt * k, align(top + center, name)))
      place(top + left, dx: x - 25pt * k, dy: 43pt * k,
        box(width: 50pt * k, align(center,
          text(font: "Sora", size: 15.5pt * k, weight: 700, fill: accent, str(a.score)))))
      let diameter = g.bandiera-diametro * k * 1pt
      place(top + left, dx: x - diameter / 2, dy: g.bandiera-y * k * 1pt,
        block(width: diameter, height: diameter, radius: 50%, clip: true,
          stroke: 0.35pt * k + axis,
          image(path("/risorse-condivise/immagini/figure/ricerca/bandiere/" + a.iso + ".svg"),
            width: diameter, height: diameter, fit: "cover", alt: "Bandiera: " + a.italianName)))
      place(top + left, curve(
        curve.move((x, (g.bandiera-y + g.bandiera-diametro) * k * 1pt)),
        curve.cubic((x, 139pt * k), (target, 151pt * k), (target, g.asse-y * k * 1pt)),
        stroke: ("paint": accent, thickness: 0.6pt * k, dash: "dotted", cap: "round"),
      ))
    }
    #for n in data.map(a => a.score).dedup() {
      place(top + left, dx: score-x(n) - 1pt * k, dy: (g.asse-y - 1) * k * 1pt,
        circle(radius: 1pt * k, fill: accent))
    }
  ]
}

#let dimension-data = json(path("/risorse-condivise/immagini/figure/ricerca/dimensioni.json"))
