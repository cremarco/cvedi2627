// Documento autonomo della tavola Figma 346: originali e dettagli conservati.
#import "../../template/stile.typ": immagine
#import "../../template/documenti.typ": dettaglio, tavola-documentaria, campione-storico

// La spiegazione resta insieme ai documenti a cui si riferisce.
// Il testo è ordinario e modificabile: nessuna riga o quota di pagina è imposta.
#tavola-documentaria[
  Nel _Manuale tipografico_ di _Giambattista Bodoni_, pubblicato postumo a Parma nel 1818, tondo e corsivo mostrano ritmo e costruzione diversi. I due dettagli provengono dalla stessa apertura riprodotta nella @fig-bodoni. Il confronto riguarda i caratteri stampati nel documento storico, non una loro versione digitale. Il foglio di _Caslon_ del 1734 e il frontespizio del _Virgilio_ di _Baskerville_ (@fig-tipo-caslon; @fig-tipo-baskerville) documentano altri due repertori del Settecento.

  #v(10pt)

  #campione-storico(titolo: [Bodoni · Tondo · 1818],
    didascalia: [Dettaglio della @fig-bodoni: «Quousque», dal _Manuale tipografico_, vol. I, Parma, 1818, pubblicato postumo. Riproduzione Biblioteca Bodoni, Università di Salamanca.])[
    #dettaglio(path("/assets/images/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg"),
      width: 154.286pt, height: 54pt, originale-width: 1131.429pt, originale-height: 856.286pt,
      dx: -704.57pt, dy: -267.43pt, alt: "Quousque, dettaglio fotografico in tondo dal Manuale di Bodoni.")
  ]
  #v(14pt)
  #campione-storico(titolo: [Bodoni · Corsivo · 1818],
    didascalia: [Dettaglio della @fig-bodoni: «diu etiam furor», dal _Manuale tipografico_, vol. I, Parma, 1818, pubblicato postumo. Riproduzione Biblioteca Bodoni, Università di Salamanca.])[
    #dettaglio(path("/assets/images/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg"),
      width: 270pt, height: 54pt, originale-width: 1320pt, originale-height: 999pt,
      dx: -819pt, dy: -523.5pt, alt: "diu etiam furor, dettaglio fotografico in corsivo dal Manuale di Bodoni.")
  ]
  #v(14pt)
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#immagine(path("/assets/images/figure/tipografia/caslon-campioni-1734-columbia.jpg"),
      [_William Caslon_, foglio di campioni, 1734 (Ironmonger-Row).],
      diritti: [Columbia University Libraries, RBML.],
      width: 138.975pt, alt: "Foglio di campioni di William Caslon del 1734.") <fig-tipo-caslon>],
    [#immagine(path("/assets/images/figure/tipografia/baskerville-virgilio-1757-frontespizio.jpg"),
      [_Virgilio_, 1757: frontespizio. Stampa _John Baskerville_, Birmingham.],
      diritti: [Columbia University Libraries, RBML.],
      width: 138.607pt, alt: "Frontespizio del Virgilio stampato da Baskerville a Birmingham nel 1757.") <fig-tipo-baskerville>],
  )
]

Le etichette «antico», «transizionale» e «moderno» aiuteranno più avanti a descrivere queste differenze. Qui conta riconoscere una trasformazione graduale, non una gara in cui il nuovo disegno rende sbagliato il precedente. Un carattere contemporaneo ispirato a Bodoni deve inoltre essere identificato con la propria versione: condividerne il nome non basta a renderlo uguale ai tipi incisi nella sua officina.
