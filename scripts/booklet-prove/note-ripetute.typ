#import "/typst-booklet/template/stile.typ": booklet
#import "/typst-booklet/template/note.typ": richiamo-nota, spazio-note, distacco-note
#show: booklet
#set page(margin: (inside: 18mm, outside: 15mm, top: 15mm,
  bottom: 20mm + spazio-note + distacco-note), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: richiamo-nota
Primo richiamo#footnote[Nota unica con #link("https://example.com")[collegamento].]<nota-unica>.
Una ripetizione#footnote(<nota-unica>) e un rimando nativo @nota-unica.
#pagebreak()
La ripetizione sulla pagina successiva#footnote(<nota-unica>) conserva la prima voce.
