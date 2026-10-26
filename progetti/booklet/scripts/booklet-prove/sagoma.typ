#import "/progetti/booklet/template/figures.typ": image-figure
#import "/progetti/booklet/template/layout.typ": booklet, website-note
#import "/progetti/booklet/template/footnotes.typ": note-reference, footnote-space, footnote-gap
#show: booklet
#set page(margin: (inside: 18mm, outside: 15mm, top: 15mm,
  bottom: 20mm + footnote-space + footnote-gap), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: note-reference
#let caso = sys.inputs.at("caso", default: "overflow")
#let lunghezza = if caso in ("breve", "pari") { 3 } else { 30 }
#if caso == "pari" { [Pagina preliminare.] ; pagebreak() }
#image-figure(path("/risorse-condivise/immagini/figure/tipografia/duomo-firenze-illustrazione.png"),
  [Didascalia della prova.],
  format: "sagoma-pagina",
  id: "booklet-prova-sagoma",
  profile: json(path("/risorse-condivise/dati/sagome/duomo-firenze.json")),
  width: 150pt,
  image-start: 50mm,
  image-bottom: 120mm,
  alt: "Illustrazione trasparente del Duomo.",
)[
  #for i in range(lunghezza) {
    [#metadata(i) <booklet-prova-paragrafo>]
    [Paragrafo #i. Qui si verifica la continuità della prosa sagomata e delle note anche quando il contenuto prosegue nelle colonne e nelle pagine successive. Un elemento modificabile permette di controllare come la composizione conserva testi e riferimenti.]
    if caso != "senza-note" and (i == 0 or (caso != "iniziale" and i in (8, 20))) {
      website-note([Nota #i], "https://example.com")
    }
    parbreak()
  }
]
