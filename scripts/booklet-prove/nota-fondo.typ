// Il richiamo a tre cifre chiude l'ultima riga della seconda colonna.
// Il seguito passa alla pagina successiva: l'ancora vuota deve restare al richiamo.
#import "/typst-booklet/template/stile.typ": booklet, sito
#import "/typst-booklet/template/note.typ": richiamo-nota, spazio-note, distacco-note
#show: booklet
#set text(size: 11pt)
#set par(leading: 2.5pt)
#set page(margin: (inside: 18mm, outside: 15mm, top: 15mm,
  bottom: 20mm + spazio-note + distacco-note), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: richiamo-nota
#counter(footnote).update(128)
Prima colonna della prova.
#colbreak()
#v(240mm - 20mm - spazio-note - distacco-note - 15mm - (11pt + 2 * 13.5pt), weak: false)
Prima riga.#linebreak()
Seconda riga.#linebreak()
#box(width: 60mm)[Ultima riga della colonna.]#sito([David Airey, Logo Design Love, 2ª ed., p. 61.], "https://www.pearson.de/media/muster/ext/9780133812770.pdf") La fotografia continua nella pagina successiva e conserva il rapporto fra il nome del prodotto e il profilo delle lettere.
