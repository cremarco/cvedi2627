// Frontespizio, crediti e indice: testo condiviso con il volume.
#import "../template/layout.typ": booklet, folio, chapter-color
#import "../template/palette.typ": front-matter-accent
#import "../template/plan.typ": volume-status, import-notice

#let front-matter(include-outline: true) = [
#chapter-color.update(front-matter-accent)
// I preliminari hanno folio ed etichette PDF in numeri romani.
#set page(numbering: "i", footer: folio(roman: true))
#page(columns: 1)[
  #set par(justify: false, leading: 0pt)
  #set text(hyphenate: false)
  #text(font: "Sora", size: 10pt, weight: 600)[CVeDI · A.A. 2026/27]
  #v(45pt)
  #text(font: "Sora", size: 35pt, weight: 700)[
    Comunicazione visiva e design delle interfacce
  ]
  #v(24pt)
  #v(1fr)
  #v(10pt)
  #text(size: 9pt, volume-status())
]

#[
// Avviso della prima tavola Figma, conservato una sola volta nel volume.
// Le pagine native lasciano il testo modificabile e i contatti cliccabili.
#page(columns: 1)[
  #set par(justify: false)
  // Lo spazio flessibile sopra il blocco lo mantiene in fondo alla gabbia.
  #v(1fr)
  #text(font: "Sora", size: 20pt, weight: 800)[Tutti i diritti riservati]
  #v(18pt)

  Salvi gli utilizzi consentiti dalla legge, è vietato condividere, distribuire,
  stampare, riprodurre o modificare questo libro, in tutto o in parte, senza la
  preventiva autorizzazione scritta dell’autore.

  Per richiedere l’autorizzazione:
  #link("mailto:marco.cremaschi@unimib.it")[marco.cremaschi\@unimib.it]

  Restano salvi i diritti e le licenze applicabili ai materiali di terzi.

  #v(18pt)
  #text(size: 9pt)[L. 22 aprile 1941, n. 633 e successive modificazioni,
    artt. 13, 16, 17 e 18.]
]
]

#if include-outline [
#page(columns: 1)[
  #set par(justify: false)
  #text(font: "Sora", size: 30pt, weight: 700)[Indice]
  #v(20pt)
  // Un solo indice nativo, con destinazioni e folio del testo importato.
  #show outline.entry: set text(size: 11pt, weight: 400)
  #show outline.entry.where(level: 1): set text(size: 13pt, weight: 600)
  #outline(title: none, depth: 2)
  #v(1fr)
  #text(size: 9pt, import-notice())
]
]
// Anche l’eventuale foglio di raccordo conserva la numerazione dei preliminari.
#pagebreak(to: "odd", weak: true)
]

#let content = front-matter()

#show: booklet
#front-matter(include-outline: false)
