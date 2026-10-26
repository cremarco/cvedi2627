#import "/progetti/booklet/template/stile.typ": booklet
#import "/progetti/booklet/template/note.typ": richiamo-nota, spazio-note, distacco-note
#show: booklet
#set page(margin: (inside: 18mm, outside: 15mm, top: 15mm,
  bottom: 20mm + spazio-note + distacco-note), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: richiamo-nota
Primo richiamo#footnote[Nota unica con #link("https://example.com")[collegamento].]<nota-unica>.
Una ripetizione#footnote(<nota-unica>) e un rimando nativo @nota-unica.
#pagebreak()
Sulla pagina successiva lo stesso URL ha una nuova nota locale#footnote[
  Nota locale con #link("https://example.com")[collegamento].
]<nota-seconda-pagina>.
Un altro richiamo su questa pagina#footnote(<nota-seconda-pagina>) riutilizza il nuovo numero.
