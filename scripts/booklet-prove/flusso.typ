// La prosa successiva a una tavola mobile deve completare il foglio precedente.
// I componenti reali conservano formato e numerazione delle figure del volume.
#import "/typst-booklet/template/stile.typ": booklet
#import "/typst-booklet/template/geometria.typ": margini, spazio-note, distacco-note
#import "/typst-booklet/template/ricerca.typ": tavola-intera
#import "/typst-booklet/template/gestalt.typ": tavola-gestalt
#import "/typst-booklet/template/documenti.typ": tavola-documentaria
#import "/typst-booklet/template/figure.typ": figura-pagina, immagine
#show: booklet
#let caso = sys.inputs.at("caso", default: "ricerca")
#set page(margin: margini(bottom: margini().bottom + spazio-note + distacco-note), footer: none)
#assert(caso in ("ricerca", "gestalt", "documentaria", "figura-pagina", "solo-testo"),
  message: "Caso di flusso sconosciuto.")

// Dati della sola prova: il controllo non fissa un numero di pagina assoluto.
#let dati-flusso() = {
  let posizione(loc) = {
    let p = loc.position()
    (pagina: p.page, x: p.x / 1pt, y: p.y / 1pt)
  }
  let posizione-figura(id) = {
    let figura = query(id).first()
    let ancore = query(<booklet-figure-anchor>).filter(m => m.value == figura.location())
    let blocchi = query(<booklet-figure-block-anchor>).filter(m => m.value == figura.location())
    let visuale = if ancore.len() > 0 { ancore.first().location() }
      else if blocchi.len() > 0 { blocchi.first().location() } else { figura.location() }
    (logica: posizione(figura.location()), visuale: posizione(visuale),
      ancore-immagini: ancore.len(), ancore-blocchi: blocchi.len())
  }
  let tavola = posizione-figura(<booklet-prova-tavola>)
  (paragrafi: query(<booklet-prova-flusso>).map(m => (valore: m.value, ..posizione(m.location()))),
    tavola: tavola.visuale, figura: tavola.logica,
    ancore-immagini: tavola.ancore-immagini, ancore-blocchi: tavola.ancore-blocchi,
    richiamo: posizione(query(<booklet-prova-richiamo>).first().location()))
}

#metadata("apertura") <booklet-prova-flusso>
Una breve introduzione avvia il confronto. Le figure mantengono il proprio formato, mentre la prosa si distribuisce nelle due colonne e continua nelle pagine successive.

// Una figura precedente conserva il proprio numero anche se la tavola si sposta.
#figure(
  align(center, image(path("/assets/images/figure/colore/albers-superfici-sovrapposte.svg"), height: 90pt)),
  kind: image, placement: top, scope: "parent", caption: [Confronto precedente.],
) <booklet-prova-prima-figura>

#if caso == "ricerca" {
  tavola-intera(path("/assets/images/figure/ricerca/pdi-metafora.png"),
    [Tavola della prova: il testo continua sulle pagine vicine.],
    <booklet-prova-tavola>, "Metafora dei poli PDI.")
} else if caso == "gestalt" {
  tavola-gestalt((
    (file: path("/assets/images/figure/gestalt/02-black-swan-forma-e-contrasto.png"),
      didascalia: [Tavola della prova: il testo continua sulle pagine vicine.],
      diritti: none, alt: "Black Swan: forma e contrasto.",
      rapporto: 0.7542735042735043, larghezza-fonte: 363,
      etichetta: <booklet-prova-tavola>),
  ))
} else if caso == "documentaria" {
  tavola-documentaria[
    #immagine(path("/assets/images/figure/colore/albers-superfici-sovrapposte.svg"),
      [Tavola della prova: il testo continua sulle pagine vicine.],
      alt: "Superfici e contrasti cromatici.", width: 137mm) <booklet-prova-tavola>
  ]
} else if caso == "solo-testo" {
  // Nessun image: l'ancora del blocco deve seguire il campione testuale mobile.
  [#figure(block(width: 100%, height: 449pt, above: 0pt, below: 0pt)[
    #text(size: 28pt, weight: 700)[Un campione composto con testo nativo]
  ], kind: image, placement: top, scope: "parent",
    caption: [Tavola della prova.]) <booklet-prova-tavola>]
} else {
  figura-pagina(id: "booklet-prova-tavola",
    file: path("/assets/images/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
    didascalia: [Tavola della prova: il testo continua sulle pagine vicine.],
    alt: "Pagina della Bibbia di Gutenberg.")
}
// Solo il controllo negativo ricrea la barriera che causava i vuoti.
#if sys.inputs.at("barriera", default: "no") == "si" { place.flush() }

#for i in range(16) {
  [#metadata(i) <booklet-prova-flusso>]
  [Passaggio #i. Il seguito del testo deve occupare lo spazio ancora disponibile sul foglio, senza fermarsi al punto in cui è richiamata la tavola. La figura conserva dimensioni e didascalia; i paragrafi restano modificabili e mantengono il proprio ordine.]
  if i == 0 { [ La #metadata(true) <booklet-prova-richiamo>@booklet-prova-tavola resta raggiungibile dal richiamo.] }
  parbreak()
}
