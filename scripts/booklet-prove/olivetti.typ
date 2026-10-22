// La stessa sagoma deve restare al vivo quando il testo a monte cambia parità.
// L'asset e le quote sono quelli dell'annuncio attivo; la prosa verifica anche
// il seguito oltre la regione sagomata, senza coordinate per le singole righe.
#import "/typst-booklet/template/stile.typ": booklet, sito
#import "/typst-booklet/template/note.typ": richiamo-nota, spazio-note, distacco-note
#import "/typst-booklet/template/doppia-pagina.typ": sagoma-pagina
#show: booklet
#set text(size: 11pt)
#set par(leading: 2.5pt)
#set page(margin: (inside: 18mm, outside: 15mm, top: 15mm,
  bottom: 20mm + spazio-note + distacco-note), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: richiamo-nota
#let caso = sys.inputs.at("caso", default: "dispari")
#assert(caso in ("dispari", "pari", "sinistra"), message: "Parità della prova Olivetti sconosciuta.")
#if caso == "pari" { [Pagina preliminare.] ; pagebreak() }
#if caso == "sinistra" {
  [Prima riga a monte.#linebreak()Seconda riga a monte.#linebreak()Terza riga a monte.]
}

#sagoma-pagina(
  id: "booklet-prova-olivetti",
  file: path("/assets/images/figure/tipografia/esempi/manifesti/olivetti-lettera-32-annuncio.png"),
  profilo: json(path("/assets/dati/sagome/olivetti-lettera-32-annuncio.json")),
  larghezza: 240pt, al-vivo-sinistro: true,
  partenza: if caso == "sinistra" { "even" } else { auto },
  fondo-immagine: 15mm + 240pt * 425 / 611,
  didascalia: [Olivetti Lettera 32: testo e immagine conservano le proprie proporzioni.],
  alt: "Annuncio trasparente Olivetti Lettera 32, allineato al bordo sinistro.",
)[
  === Olivetti: parola e immagine

  #for i in range(30) {
    [#metadata(i) <booklet-prova-paragrafo>]
    [Passaggio #i. La comunicazione di un prodotto mette in relazione il nome,
      l'immagine e le informazioni necessarie a riconoscerlo. Il testo continua
      nelle colonne seguendo il profilo dell'annuncio e prosegue nelle pagine
      successive quando lo spazio della composizione termina. Le righe restano
      native, modificabili e ordinate da sinistra a destra.]
    if i in (0, 8, 20) {
      sito([Nota della prova #i.], "https://example.com/olivetti")
    }
    if i == 0 {
      [ Il #metadata(true) <booklet-prova-richiamo>@booklet-prova-olivetti
        conserva il collegamento alla figura.]
    }
    parbreak()
  }
]

#let dati-olivetti() = {
  let posizione(loc) = {
    let p = loc.position()
    (pagina: p.page, x: p.x / 1pt, y: p.y / 1pt)
  }
  let figura = query(<booklet-prova-olivetti>).first()
  let ancore = query(<booklet-figure-anchor>).filter(m => m.value == figura.location())
  (tavola: posizione(ancore.first().location()),
    richiamo: posizione(query(<booklet-prova-richiamo>).first().location()),
    paragrafi: query(<booklet-prova-paragrafo>).map(m =>
      (indice: m.value, ..posizione(m.location()))))
}
