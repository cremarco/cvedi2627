// La visuale approvata può sostituire il disegno nativo della singola dimensione.
// Dati alternativi, didascalia, attribuzioni e richiami restano nativi.
#let grafico(dati, didascalia, file: none, consultazione: "9 ottobre 2026") = figure(
  if file != none {
    image(file, width: 100%, alt: "Indici nazionali su una scala lineare da 0 a 100: "
      + dati.map(a => a.italianName + " " + str(a.score)).join("; ")
      + ". Indici relativi aggregati, non percentuali né profili individuali.")
  } else { layout(spazio => {
    let k = spazio.width / 363pt
    let tinta = rgb("C10007")
    block(width: spazio.width, height: 220pt * k)[
      #set par(justify: false, leading: 0pt, spacing: 0pt)
      #set text(hyphenate: false)
      #place(top + left, dy: 196pt * k, dx: 18pt * k,
        line(length: 327pt * k, stroke: 0.6pt + rgb("6A7282")))
      #for n in range(0, 101, step: 20) {
        let x = (18 + 327 * n / 100) * k * 1pt
        place(top + left, dx: x, dy: 192pt*k, line(start: (0pt, 0pt), end: (0pt, 8pt*k), stroke: 0.6pt + rgb("6A7282")))
        place(top + left, dx: x - 10pt*k, dy: 204pt*k, box(width: 20pt*k, align(center, text(size: 8pt*k, str(n)))))
      }
      #for a in dati {
        let x = a.pinCenter * k * 1pt
        let target = (18 + 327 * a.score / 100) * k * 1pt
        place(top + left, dx: x - 27pt*k, dy: 2pt*k,
          box(width: 54pt*k, height: 30pt*k, align(center, text(size: 9pt*k, a.italianName))))
        place(top + left, dx: x - 25pt*k, dy: 35pt*k,
          box(width: 50pt*k, align(center, text(size: 16pt*k, weight: 700, fill: tinta, str(a.score)))))
        place(top + left, dx: x - 21pt*k, dy: 60pt*k,
          block(width: 42pt*k, height: 42pt*k, radius: 50%, stroke: 0.5pt + rgb("6A7282"), clip: true,
            image(path("/risorse-condivise/immagini/figure/ricerca/bandiere/" + a.iso + ".svg"), width: 42pt*k, height: 42pt*k, fit: "cover")))
        place(top + left, curve(
          curve.move((x, 103pt*k)),
          curve.cubic((x, 139pt*k), (target, 151pt*k), (target, 196pt*k)),
          stroke: (paint: tinta, thickness: 0.7pt, dash: "dotted"),
        ))
        place(top + left, dx: target - 1pt, dy: 195pt*k, circle(radius: 1pt, fill: tinta))
      }
    ]
  }) },
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [#didascalia #v(4pt)#text(size: 8pt, style: "italic")[Dati: The Culture Factor, consultati il #consultazione. #if file == none [Bandiere: flag-icons, MIT.] else [Bandiere di riferimento: flag-icons, MIT.]]],
)
#let dati-dimensioni = json(path("/risorse-condivise/immagini/figure/ricerca/dimensioni.json"))

