// Ingresso del booklet: il piano contiene soltanto le sei lezioni richieste.
// I testi restano in file separati; i capitoli in preparazione non hanno pagine vuote.
#import "template/stile.typ": booklet, capitolo
#import "template/piano.typ": piano, dati-capitolo, stato-volume, avviso-importazione
#show: booklet

#page(columns: 1, footer: none)[
  #set par(justify: false, leading: 0pt)
  #set text(hyphenate: false)
  #text(font: "Sora", size: 10pt, weight: 600)[CVeDI · A.A. 2026/27]
  #v(45pt)
  #text(font: "Sora", size: 35pt, weight: 700)[
    Comunicazione visiva e design delle interfacce
  ]
  #v(24pt)
  #text(size: 15pt)[Booklet · Sei lezioni]
  #v(1fr)
  #text(size: 10pt)[Marco Cremaschi · Elia Guarnieri · Andrea Primo Pierotti]
  #v(10pt)
  #text(size: 9pt, stato-volume())
]

#include "apparati/crediti.typ"

#page(columns: 1)[
  #set par(justify: false)
  #text(font: "Sora", size: 30pt, weight: 700)[I sei capitoli]
  #v(20pt)
  // Il piano espone l’ordine completo; l’indice nativo collega il testo già importato.
  #for voce in piano [
    #block(above: 0pt, below: 10pt)[
      #text(size: 15pt, weight: 600)[#voce.codice]
      #h(8pt)#text(size: 14pt)[#voce.titolo]
    ]
  ]
  #v(12pt)
  #text(size: 14pt, weight: 600)[Indice dei contenuti presenti]
  #v(10pt)
  #show outline.entry: set text(size: 11pt, weight: 400)
  #show outline.entry.where(level: 1): set text(size: 13pt, weight: 600)
  #outline(title: none, depth: 2)
  #v(1fr)
  #text(size: 9pt, avviso-importazione())
]

// Il tema grafico approvato è indipendente dal nuovo numero del capitolo.
#for voce in piano {
  if voce.file != none {
    capitolo(..dati-capitolo(voce))[
      #include voce.file
    ]
  }
}
