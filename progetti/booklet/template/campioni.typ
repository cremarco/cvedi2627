// Fascia comune per i campioni di font: etichetta 10/12, visuale e caption nativa.
// I glifi provengono dagli originali Figma, senza sostituire o simulare i caratteri.
#import "geometria.typ": gabbia
#import "editoriale.typ": contenuto-didascalia, dettaglio-editoriale
#let campione(titolo: [], didascalia: [], diritti: none, fascia: 54pt, corpo) = figure([
  #set par(justify: false, leading: 2pt, spacing: 0pt)
  #align(left, text(size: 10pt, weight: 500, titolo))
  #v(4pt)
  #box(width: 100%, height: fascia, align(center + horizon, corpo))
], kind: image, placement: none, caption: contenuto-didascalia(didascalia, diritti: diritti))

// L'offset verticale conserva la linea di base del campione nella fascia di 54 pt.
// Queste quote riguardano soltanto il glifo illustrato, non il testo del capitolo.
#let campione-font(file, titolo: [], larghezza: 70pt, da-alto: 0pt,
  didascalia: [], diritti: none, alt: none) = campione(
  titolo: titolo, didascalia: didascalia, diritti: diritti,
)[
  #box(width: 100%, height: 54pt)[
    #place(top + center, dy: da-alto, image(file, width: larghezza, alt: alt))
  ]
]

// Un confronto resta unito e può occupare tutta la gabbia delle due colonne.
// Le figure interne conservano didascalie, contatori e collegamenti nativi.
#let confronto(corpo) = place(top, scope: "parent", float: true,
  block(width: gabbia, breakable: false)[
    #set figure(placement: none, scope: "column")
    #corpo
  ])

// Una riga di esempi: le etichette crescono con il testo; i glifi mantengono
// la fascia e il corpo comuni. La griglia non governa i paragrafi del capitolo.
#let riga-campioni(celle, intervallo: 14.17pt) = {
  assert(celle.len() > 0, message: "Una riga di campioni richiede almeno un esempio.")
  grid(
    columns: (1fr,) * celle.len(), column-gutter: intervallo, row-gutter: 4pt,
    ..celle.map(cella => block[
      #set text(size: 10pt, weight: 500)
      #set par(justify: false, leading: 2pt, spacing: 0pt)
      #cella.titolo
    ]),
    ..celle.map(cella => box(height: 54pt,
      align(left + horizon, cella.visuale))),
  )
}

// Un ingrandimento della stessa opera non crea una seconda figura numerata.
// Il collegamento rimanda alla visuale completa, anche dopo la ricomposizione.
#let dettaglio-figura(titolo: [], riferimento: none, didascalia: [], corpo) = {
  assert(type(riferimento) == label,
    message: "Il dettaglio richiede l'etichetta della figura completa.")
  dettaglio-editoriale(titolo: titolo,
    didascalia: [Dettaglio della #ref(riferimento) — #didascalia], corpo)
}
