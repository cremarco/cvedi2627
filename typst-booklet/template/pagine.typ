// Contenitori delle pagine speciali. La prosa continua resta nelle pagine
// e nelle colonne native del capitolo; questi componenti non la suddividono.
#import "geometria.typ": (pagina-larghezza, pagina-altezza, margini, discesa-folio,
  gabbia, altezza-gabbia)
#import "editoriale.typ": titolo-apparato

// Documento autonomo senza note: recupera il margine inferiore ordinario,
// anche quando è richiamato dal corpo che riserva la fascia delle note.
#let pagina-documentaria(corpo) = {
  // Il confine fisso deve chiudere i float precedenti, che altrimenti possono
  // entrare nell'inserto. Il salto debole non aggiunge fogli già vuoti.
  pagebreak(weak: true)
  page(columns: 1, margin: margini(), footer-descent: discesa-folio)[
    #set figure(placement: none)
    #corpo
  ]
}

// La tavola conserva un foglio intero, ma non interrompe la prosa nel punto
// d'inserimento: Typst può completare il foglio precedente con il seguito.
// La pagina di sole immagini recupera la fascia inutilizzata delle note;
// la riserva copre tutta la regione effettiva, anche quando un confine fisso
// ripristina i margini ordinari mentre ci sono ancora figure in coda.
#let tavola-mobile(corpo) = place(top, scope: "parent", float: true, clearance: 0pt)[
  #set figure(placement: none, scope: "column")
  #layout(spazio => block(width: gabbia, height: spazio.height,
    above: 0pt, below: 0pt)[
    #block(width: gabbia, height: altezza-gabbia, above: 0pt, below: 0pt)[
      #metadata(true) <booklet-tavola-mobile>
      #corpo
    ]
  ])
]

// L'immagine occupa il foglio; didascalia e fonti appartengono alla prosa
// precedente. Gli apparati sono spenti soltanto su questo inserto.
#let pagina-al-vivo(corpo) = {
  pagebreak(weak: true)
  page(width: pagina-larghezza, height: pagina-altezza, margin: 0pt, columns: 1,
    header: none, footer: none, background: none, foreground: none, corpo)
}

// La pagina puntinata segue l'apparato bibliografico di ogni capitolo.
// Le dimensioni del reticolo riguardano lo spazio per gli appunti, non la prosa.
#let appunti() = page(columns: 1)[
  #set par(justify: false)
  #titolo-apparato[Appunti]
  #v(18pt)
  #block(width: 100%, height: 175mm,
    fill: tiling(size: (5mm, 5mm), circle(radius: 0.3pt, fill: rgb("CDD0D4"))))
]
