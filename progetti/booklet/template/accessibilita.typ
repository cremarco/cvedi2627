// La mappa completa mantiene testi e livelli nativi in due parti nel flusso.
// La sola prima parte è una figura numerata; la seconda ne continua il contenuto.
#import "geometria.typ": gabbia, colonna, intercolonna, altezza-corpo
#import "editoriale.typ": didascalia as disegna-didascalia, contenuto-didascalia
#import "palette.typ": accento-capitolo
#import "note.typ": richiamo-solo

#let dati-wcag = json(path("/progetti/booklet/assets/mappa-wcag-vettoriale/criteri.json"))
#let criteri-wcag = dati-wcag.criteri.filter(c => not c.rimosso)

#let gruppo-wcag(principio, guida, primo: false) = block(above: 0pt, below: 0pt)[
  #set align(left)
  #set text(font: "DM Sans 9pt", size: 7.5pt, weight: 400, variations: (opsz: 9))
  #set par(justify: false, leading: 1.5pt, spacing: 0pt)
  #if primo [
    #text(font: "Sora", size: 10pt, weight: 700)[#principio.numero. #principio.titolo]
    #v(3pt)
    #principio.definizione
    #v(6pt)
  ]
  #block(above: 3pt, below: 3pt)[
    #text(size: 8.5pt, weight: 700)[#guida.id #guida.titolo]
  ]
  #grid(columns: (25pt, 20pt, 1fr), column-gutter: 3pt, row-gutter: 2pt,
    ..criteri-wcag.filter(c => c.id.starts-with(guida.id + ".")).map(c => (
      text(c.id),
      box(inset: (x: 2pt, y: 0.5pt), fill: accento-capitolo(3),
        text(size: 7pt, weight: 700, c.livello)),
      [#c.titolo#if c.nuovo { [~#text(weight: 700, "*")] }],
    )).flatten())
]

#let mappa-a-pagina(file, didascalia, diritti, alt) = context {
  assert(criteri-wcag.len() == 86, message: "La mappa WCAG deve conservare tutti gli 86 criteri attivi.")
  let gruppi = ()
  for principio in dati-wcag.principi {
    for (i, guida) in principio.linee_guida.enumerate() {
      gruppi.push(gruppo-wcag(principio, guida, primo: i == 0))
    }
  }
  let altezze = gruppi.map(g => measure(g, width: colonna).height)
  // Quattro intervalli contigui conservano l'ordine 1.1–4.1 e bilanciano le
  // due colonne di ciascuna parte senza comprimere caratteri o interlinea.
  let tagli = none
  let massimo = 10000pt
  for a in range(1, gruppi.len() - 2) {
    for b in range(a + 1, gruppi.len() - 1) {
      for c in range(b + 1, gruppi.len()) {
        let quote = (altezze.slice(0, a).sum(), altezze.slice(a, b).sum(),
          altezze.slice(b, c).sum(), altezze.slice(c).sum())
        let prova = calc.max(..quote)
        if prova < massimo { massimo = prova; tagli = (0, a, b, c, gruppi.len()) }
      }
    }
  }
  let colonna-mappa(i) = block(width: colonna)[
    #for g in gruppi.slice(tagli.at(i), tagli.at(i + 1)) { g }
  ]
  let legenda = text(size: 7.5pt, "A, AA e AAA indicano i livelli; * indica i criteri introdotti in WCAG 2.2. Il criterio 4.1.1 è rimosso da WCAG 2.2.")
  let cap = contenuto-didascalia(didascalia, diritti: diritti)
  let cap-misurata = measure(block(width: gabbia)[
    #show footnote: richiamo-solo
    #disegna-didascalia(cap, prefisso: [Figura #counter(figure.where(kind: image)).display(figure.numbering)])
  ], width: gabbia).height
  assert(massimo + cap-misurata + 28pt < altezza-corpo,
    message: "La parte della mappa WCAG supera il corpo: " + repr(massimo))
  [
    #figure(
      [
        #metadata((criteri: criteri-wcag.map(c => (id: c.id, livello: c.livello)),
          parti: 2, alt: alt, originale: file)) <booklet-mappa-wcag>
        #grid(columns: (colonna, colonna), column-gutter: intercolonna,
          colonna-mappa(0), colonna-mappa(1))
        #v(5pt)
        #legenda
      ],
      kind: image, supplement: [Figura], caption: cap,
      placement: top, scope: "parent",
    ) <fig-a03-46>
    #place(top, scope: "parent", float: true, clearance: 8pt)[
      #block(width: gabbia)[
        #grid(columns: (colonna, colonna), column-gutter: intercolonna,
          colonna-mappa(2), colonna-mappa(3))
        #v(5pt)
        #legenda
        #v(8pt)
        #disegna-didascalia([Mappa WCAG 2.2 · continuazione.],
          prefisso: [#ref(<fig-a03-46>)])
      ]
    ]
  ]
}
