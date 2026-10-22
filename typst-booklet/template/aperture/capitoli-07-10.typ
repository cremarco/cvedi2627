// Proposte tipografiche per Gestalt, Linguaggio visivo, Gerarchia e Colore.
// Il contenitore esterno fornisce la gabbia di 137 × 205 mm e il fondo SVG.
// Titolo e numero rimangono testo nativo: queste quote riguardano solo l’apertura.
#import "../geometria.typ": inchiostro

#let apertura-visive(tema, numero, titolo) = {
  assert(tema in (7, 8, 9, 10), message: "Questa variante copre i temi originali 7–10.")
  let codice = "0" + str(numero)
  set text(font: "Sora", fill: inchiostro, hyphenate: false,
    top-edge: "bounds", bottom-edge: "bounds")
  set par(justify: false, leading: 0pt, spacing: 0pt)

  if tema == 7 {
    // Numero e parola formano un solo gruppo nella chiusura suggerita dal fondo.
    show heading.where(level: 1): it => place(top + center, dy: 119mm)[
      #block(width: 100%, above: 0pt, below: 0pt)[
        #align(center, text(size: 54pt, weight: 700, it.body))
      ]
    ]
    heading(level: 1, titolo)
    place(top + center, dy: 63mm)[
      #text(size: 172pt, weight: 700, codice)
    ]
  } else if tema == 8 {
    // Le parole restano quelle del titolo; il salto locale le tratta come segni.
    show heading.where(level: 1): it => place(top + left, dy: 17mm)[
      #block(width: 100%, above: 0pt, below: 0pt)[
        #set par(leading: 13pt)
        #show regex("\\s+"): linebreak()
        #text(size: 44pt, weight: 700, tracking: -0.8pt, it.body)
      ]
    ]
    heading(level: 1, titolo)
    // Il numero conserva il peso leggero della composizione originale.
    place(top + right, dy: 105mm)[
      #text(size: 230pt, weight: 400, codice)
    ]
  } else if tema == 9 {
    // Il numero domina per scala e peso; il titolo occupa un secondo livello.
    show heading.where(level: 1): it => place(top + left, dy: 122mm)[
      #block(width: 100%, above: 0pt, below: 0pt)[
        #text(size: 38pt, weight: 400, it.body)
      ]
    ]
    heading(level: 1, titolo)
    place(top + right, dy: 1mm)[
      #text(size: 270pt, weight: 800, codice)
    ]
  } else {
    // Il contorno lascia attraversare il numero dal colore del fondo.
    // Il titolo pieno e il numero vuoto usano lo stesso unico inchiostro.
    show heading.where(level: 1): it => place(top + left, dy: 122mm)[
      #block(width: 100%, above: 0pt, below: 0pt)[
        #text(size: 65pt, weight: 800, it.body)
      ]
    ]
    heading(level: 1, titolo)
    place(top + center, dy: 36mm)[
      #text(size: 200pt, weight: 800, fill: rgb("2E313800"),
        stroke: 2.4pt + inchiostro, codice)
    ]
  }
}
