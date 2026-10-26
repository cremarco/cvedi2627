#import "/progetti/booklet/template/layout.typ": booklet
#import "/progetti/booklet/template/footnotes.typ": note-reference, footnote-space, footnote-gap
#show: booklet
#set page(margin: (inside: 18mm, outside: 15mm, top: 15mm,
  bottom: 20mm + footnote-space + footnote-gap), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: note-reference
Primo richiamo#footnote[Nota unica con #link("https://example.com")[collegamento].]<nota-unica>.
Una ripetizione#footnote(<nota-unica>) e un rimando nativo @nota-unica.
#pagebreak()
Sulla pagina successiva lo stesso URL ha una nuova nota locale#footnote[
  Nota locale con #link("https://example.com")[collegamento].
]<nota-seconda-pagina>.
Un altro richiamo su questa pagina#footnote(<nota-seconda-pagina>) riutilizza il nuovo numero.
