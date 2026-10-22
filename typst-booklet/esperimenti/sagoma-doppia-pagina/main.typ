// Doppia pagina: una sola immagine al centro e quattro colonne concatenate.
// Modifica i paragrafi in contenuto.typ: il testo si ricompone.
#import "../vendor/meander/src/lib.typ" as meander
#import "contenuto.typ": contenuti

#let scala-duomo = float(sys.inputs.at("scala-duomo", default: "1.0")) // Prova 0.9.
#let sposta-duomo = 0pt // Spostamento orizzontale comune a immagine e contorno.
#let profilo = json(path("/assets/archivio/typst/dati/duomo-profilo-sperimentale.json"))
#let accento = rgb("#AFC7E8")
#set document(title: "344–345 · Testo attorno al Duomo", author: "CVeDI")
#set page(width: 963.78pt, height: 680.315pt, margin: 0pt)
#set text(font: "DM Sans 9pt", size: 12pt, lang: "it", fill: rgb("#2E3138"), top-edge: 0.9em, bottom-edge: 0.1em)
#set par(justify: false, leading: 2pt, spacing: 10pt)

#let titolo(t) = block(above: 10pt, below: 4pt, sticky: true)[
  #set text(size: 14pt, weight: "black", fill: accento)
  #set par(leading: 0pt)
  #t
]
#let didascalia(t) = block(width: 187.09pt)[
  #set text(size: 9pt, weight: "light")
  #set par(leading: 1.8pt, spacing: 0pt)
  #t
]
#let folio(n, x) = place(top + left, dx: x, dy: 639.465pt,
  rect(width: 32pt, height: 22pt, fill: accento, stroke: none)[
    #align(center + horizon, text(size: 12pt, weight: "medium", str(n)))
  ])

#folio(344, 42.52pt)
#folio(345, 889.26pt)

#meander.reflow({
  import meander: *
  // L'ostacolo ha la sagoma dell'alpha: le parti trasparenti restano leggibili.
  // L'immagine è unica sul dorso, con una sola scala e una sola quota.
  placed(top + left, dx: 243.78pt + sposta-duomo,
    dy: 680.315pt - 303.698pt * scala-duomo,
    boundary: contour.horiz(div: profilo.len(), y => {
      let indice = calc.min(profilo.len() - 1, int(calc.floor(y * profilo.len())))
      let r = profilo.at(indice)
      let l = r.at(0)
      let r = r.at(1)
      let origine = 243.78pt + sposta-duomo
      let larghezza = 476pt * scala-duomo
      // Evita colonne residue illeggibili: giustezza minima 108 pt.
      let bordo-sx = origine + l * larghezza
      let bordo-dx = origine + r * larghezza
      if bordo-sx > 243.78pt and bordo-sx < 351.78pt {
        l = (243.78pt - origine) / larghezza
      }
      if bordo-dx < 720pt and bordo-dx > 612pt {
        r = (720pt - origine) / larghezza
      }
      (l, r)
    }),
    image(path("/assets/images/figure/tipografia/duomo-firenze-illustrazione.png"),
      width: 476pt * scala-duomo),
  )
  placed(top + left, dx: 42.52pt, dy: 585pt, boundary: contour.margin(8pt),
    didascalia[*Figura 3.245b* — Firenze e il complesso del Duomo. Illustrazione di studio, 2026.])
  placed(top + left, dx: 42.52pt, dy: 614pt, boundary: contour.margin(5pt),
    didascalia[Vasari: figg. 3.245c–d, p. 342.])
  placed(top + left, dx: 734.17pt, dy: 370pt, boundary: contour.margin(8pt),
    block(width: 187.09pt)[
      #image(path("/assets/images/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg"),
        width: 187.09pt)
      #v(8pt)
      #didascalia[*Figura 3.246* — Manuale tipografico, vol. I, 1818: contrasto dei tratti e grazie sottili, fra tondo e corsivo. Giambattista Bodoni, edizione postuma. Biblioteca Bodoni, Universidad de Salamanca.]
    ])
  placed(top + left, dx: 734.17pt, dy: 614pt, boundary: contour.margin(5pt),
    didascalia[Caslon/Baskerville: figg. 3.246a–b, p. 346.])

  // Solo le gabbie hanno una posizione; parole e righe sono calcolate da Meander.
  for x in (42.52pt, 243.78pt, 532.91pt, 734.17pt) {
    container(dx: x, dy: 42.52pt, width: 187.09pt, height: 581.10pt,
      margin: 0pt, style: (min-width: 108pt))
  }
  content(contenuti(titolo), size: 12pt, leading: 2pt, spacing: 10pt, lang: "it")
  // Nessun testo viene eliminato se si superano le quattro colonne.
  opt.overflow.custom(data => {
    panic("Testo oltre la doppia pagina: ampliare la gabbia o ridurre l'ingombro delle figure.")
  })
})
