#import "/progetti/booklet/template/figures.typ": image-figure
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
#image-figure(path("/risorse-condivise/immagini/figure/tipografia/tipi-legno-illustrazione.png"),
  [Tipi di legno, illustrazione di studio.],
  format: "sagoma",
  id: "booklet-prova-classica-note",
  profile: json(path("/risorse-condivise/dati/sagome/tipi-legno-illustrazione.json")),
  width: 70pt,
  alt: "Illustrazione scontornata di caratteri mobili di legno.",
)[
  La prima nota resta accanto alla figura.#website-note([Nota nella regione.], "https://example.com/regione")

  #for i in range(12) {
    [#metadata(i) <booklet-prova-paragrafo>]
    [Passaggio #i. I caratteri di legno rendono visibile il rapporto fra la massa
      del segno e il testo continuo. Il paragrafo prosegue senza righe fissate:
      la composizione restituisce tutto il contenuto che supera la regione
      dell'immagine al flusso ordinario delle due colonne. Questo seguito può
      occupare altre pagine, conservando la prosa, i riferimenti e la leggibilità.]
    if i == 4 {
      website-note([Nota nel seguito della sagoma.], "https://example.com/seguito")
    }
    parbreak()
  }
]

La prosa esterna alla sagoma continua nel flusso nativo.#website-note([Nota nativa successiva.], "https://example.com/nativa")
