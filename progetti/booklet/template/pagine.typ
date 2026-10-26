// Contenitori delle pagine speciali. La prosa continua resta nelle pagine
// e nelle colonne native del capitolo; questi componenti non la suddividono.
#import "geometria.typ": (pagina-larghezza, pagina-altezza, margini, discesa-folio,
  gabbia, altezza-gabbia, altezza-corpo)
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

// Le pagine mobili conservano la geometria del corpo per poter scorrere nella
// coda dei float. Il disegno si estende invece fino ai quattro bordi fisici.
// Il marker permette agli apparati del documento di riconoscere il foglio.
#let pagine-al-vivo-mobili() = {
  query(<booklet-pagina-al-vivo-mobile>).map(m => m.location().page())
}

#let pagina-al-vivo-mobile(corpo) = {
  place(top, scope: "parent", float: true, clearance: 0pt)[
    #set figure(placement: none, scope: "column")
    // L'intera gabbia del corpo deve essere libera: l'altezza residua fornita
    // da layout potrebbe permettere di condividere il foglio con un altro float.
    #block(width: gabbia, height: altezza-corpo,
      above: 0pt, below: 0pt)[
      #context {
        let posizione = here().position()
        place(top + left, dx: -posizione.x, dy: -posizione.y)[
          #block(width: pagina-larghezza, height: pagina-altezza,
            above: 0pt, below: 0pt)[
            #metadata(true) <booklet-pagina-al-vivo-mobile>
            #corpo
          ]
        ]
      }
    ]
  ]
  // Typst 0.15.1 forza il primo float di colonna anche nella regione vuota
  // lasciata da un float parent a foglio intero. La riserva nativa occupa
  // quello slot senza disegnare contenuto; le figure successive proseguono
  // sul foglio seguente. Nel corpo a una colonna la riserva non serve.
  context {
    if page.columns > 1 {
      figure(block(width: 1pt, height: 1pt, above: 0pt, below: 0pt)[
        #metadata(true) <booklet-al-vivo-barriera>
        #rect(width: 0pt, height: 0pt, fill: none, stroke: none)
      ], kind: "booklet-riserva-colonna", placement: top, scope: "column",
        caption: none, numbering: none, supplement: none, outlined: false)
    }
  }
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
