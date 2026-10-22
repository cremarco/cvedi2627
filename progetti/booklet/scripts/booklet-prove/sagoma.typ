#import "/progetti/booklet/template/stile.typ": booklet, sito
#import "/progetti/booklet/template/note.typ": richiamo-nota, spazio-note, distacco-note
#import "/progetti/booklet/template/doppia-pagina.typ": sagoma-pagina
#show: booklet
#set page(margin: (inside: 18mm, outside: 15mm, top: 15mm,
  bottom: 20mm + spazio-note + distacco-note), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: richiamo-nota
#let caso = sys.inputs.at("caso", default: "overflow")
#let lunghezza = if caso in ("breve", "pari") { 3 } else { 30 }
#if caso == "pari" { [Pagina preliminare.] ; pagebreak() }
#sagoma-pagina(
  id: "booklet-prova-sagoma",
  file: path("/risorse-condivise/immagini/figure/tipografia/duomo-firenze-illustrazione.png"),
  profilo: json(path("/risorse-condivise/dati/sagome/duomo-firenze.json")),
  larghezza: 150pt, inizio-immagine: 50mm, fondo-immagine: 120mm,
  didascalia: [Didascalia della prova.], alt: "Illustrazione trasparente del Duomo.",
)[
  #for i in range(lunghezza) {
    [#metadata(i) <booklet-prova-paragrafo>]
    [Paragrafo #i. Qui si verifica la continuità della prosa sagomata e delle note anche quando il contenuto prosegue nelle colonne e nelle pagine successive. Un elemento modificabile permette di controllare come la composizione conserva testi e riferimenti.]
    if caso != "senza-note" and (i == 0 or (caso != "iniziale" and i in (8, 20))) {
      sito([Nota #i], "https://example.com")
    }
    parbreak()
  }
]
