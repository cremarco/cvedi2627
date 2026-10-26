// Campione autonomo: gli stessi elenchi nativi e gli stessi stili del volume.
#import "../template/stile.typ": booklet, elenchi
#import "../template/palette.typ": accento-capitolo

#show: booklet
#show: elenchi.with(accento: accento-capitolo(2))
#set page(height: 145mm, columns: 1, footer: none, background: none)
#set text(size: 11pt)
#set par(leading: 2.5pt)

#text(font: "Sora", size: 20pt, weight: 800)[Elenchi numerati]

#text(size: 9pt, fill: rgb("626872"))[Capitolo 02 · Ricerca, persone e culture]

#v(8pt)
#grid(columns: (1fr, 1fr), gutter: 5mm,
  [
    *Elenco puntato*

    - Quali ruoli e competenze rendono credibile il servizio?
    - Come viene interpretato un tono istituzionale?
    - È utile esplicitare chi decide e chi risponde delle informazioni?
  ],
  [
    *Elenco numerato*

    + Quali ruoli e competenze rendono credibile il servizio?
    + Come viene interpretato un tono istituzionale?
    + È utile esplicitare chi decide e chi risponde delle informazioni?
  ],
)

#v(10pt)
*Il passaggio a due cifre*

#enum(start: 9,
  [Raccogli le osservazioni.],
  [Confronta le evidenze.],
  [Formula le domande successive.],
)
