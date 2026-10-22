// Componenti specifici della ricerca: tavole al vivo, documenti e grafici culturali.
// Le sezioni importano solo le funzioni usate; stili e quote restano nei template condivisi.
// Capitolo 02: prosa corrente Figma, perimetro delle 86 slide attive.
// Dati, originali, esclusioni e copertura: reports/typst-booklet/02-ricerca/.
#import "editoriale.typ": didascalia as componi-didascalia

// Le sei metafore erano tavole a tutta pagina nella fonte Figma.
// Il float occupa tutta la gabbia: la prosa può riempire il foglio precedente.
// La caption nativa resta solidale alla visuale, nella fascia bianca originale.
#import "geometria.typ": spazio-note, distacco-note, gabbia, altezza-gabbia, pagina-larghezza, pagina-altezza, margine-superiore, margine-sinistro
#let tavola-intera(file, didascalia, etichetta, alt) = {
  set figure(gap: 0pt)
  show figure.caption: cap => {
    let testo-caption = componi-didascalia(cap.body,
      prefisso: [#cap.supplement #context cap.counter.display(cap.numbering)])
    // place è riferito alla regione del float, non al punto logico della caption.
    // Una regione ordinaria alta 205 mm allinea il testo al bordo sopra il folio.
    place(top + left,
      block(width: gabbia, height: altezza-gabbia, above: 0pt, below: 0pt)[
        #align(bottom + left, testo-caption)
      ])
  }
  [
    #figure(
      block(width: 100%, height: altezza-gabbia - spazio-note - distacco-note,
        above: 0pt, below: 0pt)[
        #context {
          let sinistra = margine-sinistro(here().page())
          place(top + left, dx: -sinistra, dy: -margine-superiore,
            image(file, width: pagina-larghezza, height: pagina-altezza, fit: "contain", alt: alt))
        }
      ],
      kind: image, caption: didascalia, placement: top, scope: "parent",
    )
    #etichetta
  ]
}

// Le figure conservano proporzioni e dettagli; l'altezza limita la sola visuale.
// I contenuti restano nel flusso nativo, senza righe o colonne precomposte.
#import "figure.typ": documento-mobile
#let documento = documento-mobile

// Grafico puntuale nativo: etichette, valori e tracciati rimangono modificabili.
#let grafico(dati, didascalia) = figure(
  layout(spazio => {
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
  }),
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [#didascalia #v(4pt)#text(size: 8pt, style: "italic")[Dati: The Culture Factor, consultati il 9 ottobre 2026. Bandiere: flag-icons, MIT.]],
)
#let dati-dimensioni = json(path("/risorse-condivise/immagini/figure/ricerca/dimensioni.json"))

