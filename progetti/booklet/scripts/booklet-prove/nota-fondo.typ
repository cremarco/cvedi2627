// Il richiamo a tre cifre chiude l'ultima riga della seconda colonna.
// Il seguito passa alla pagina successiva: l'ancora vuota deve restare al richiamo.
#import "/progetti/booklet/template/layout.typ": booklet, website-note
#import "/progetti/booklet/template/footnotes.typ": note-reference, footnote-space, footnote-gap
#show: booklet
#set text(size: 11pt)
#set par(leading: 2.5pt)
#set page(margin: (inside: 18mm, outside: 15mm, top: 15mm,
  bottom: 20mm + footnote-space + footnote-gap), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: note-reference
#counter(footnote).update(128)
Prima colonna della prova.
#colbreak()
#v(240mm - 20mm - footnote-space - footnote-gap - 15mm - (11pt + 2 * 13.5pt), weak: false)
Prima riga.#linebreak()
Seconda riga.#linebreak()
#box(width: 60mm)[Ultima riga della colonna.]#website-note([David Airey, Logo Design Love, 2ª ed., p. 61.], "https://www.pearson.de/media/muster/ext/9780133812770.pdf") La fotografia continua nella pagina successiva e conserva il rapporto fra il nome del prodotto e il profilo delle lettere.
