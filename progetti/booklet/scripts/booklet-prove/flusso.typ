// La prosa successiva a una tavola mobile deve completare il foglio precedente.
// I componenti reali conservano formato e numerazione delle figure del volume.
#import "/progetti/booklet/template/layout.typ": booklet
#import "/progetti/booklet/template/geometry.typ": page-margins, footnote-space, footnote-gap
#import "/progetti/booklet/template/pages.typ": document-plate
#import "/progetti/booklet/template/figures.typ": image-figure
#show: booklet
#let caso = sys.inputs.at("caso", default: "ricerca")
#set page(margin: page-margins(bottom: page-margins().bottom + footnote-space + footnote-gap), footer: none)
#assert(caso in ("ricerca", "gestalt", "documentaria", "figura-pagina", "solo-testo"),
  message: "Caso di flusso sconosciuto.")

// Dati della sola prova: il controllo non fissa un numero di pagina assoluto.
#let flow-data() = {
  let position-options(loc) = {
    let p = loc.position()
    ("pagina": p.page, x: p.x / 1pt, y: p.y / 1pt)
  }
  let figure-position(id) = {
    let figure-item = query(id).first()
    let anchors = query(<booklet-figure-anchor>).filter(m => m.value == figure-item.location())
    let blocks = query(<booklet-figure-block-anchor>).filter(m => m.value == figure-item.location())
    let visual = if anchors.len() > 0 { anchors.first().location() }
      else if blocks.len() > 0 { blocks.first().location() } else { figure-item.location() }
    (logica: position-options(figure-item.location()), "visuale": position-options(visual),
      ancore-immagini: anchors.len(), ancore-blocchi: blocks.len())
  }
  let plate = figure-position(<booklet-prova-tavola>)
  (paragrafi: query(<booklet-prova-flusso>).map(m => ("valore": m.value, ..position-options(m.location()))),
    "tavola": plate.visuale, "figura": plate.logica,
    ancore-immagini: plate.ancore-immagini, ancore-blocchi: plate.ancore-blocchi,
    "richiamo": position-options(query(<booklet-prova-richiamo>).first().location()))
}

#metadata("apertura") <booklet-prova-flusso>
Una breve introduzione avvia il confronto. Le figure mantengono il proprio formato, mentre la prosa si distribuisce nelle due colonne e continua nelle pagine successive.

// Una figura precedente conserva il proprio numero anche se la tavola si sposta.
#figure(
  align(center, image(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"), height: 90pt)),
  kind: image, placement: top, scope: "parent", caption: [Confronto precedente.],
) <booklet-prova-prima-figura>

#if caso == "ricerca" {
  image-figure(path("/risorse-condivise/immagini/figure/ricerca/pdi-metafora.png"),
    [Tavola della prova: il testo continua sulle pagine vicine.],
    format: "una-colonna", id: "booklet-prova-tavola", height: 110mm,
    aspect-ratio: 1086 / 1448, alt: "Metafora dei poli PDI.")
} else if caso == "gestalt" {
  image-figure(path("/risorse-condivise/immagini/figure/gestalt/02-black-swan-forma-e-contrasto.png"),
    [Tavola della prova: il testo continua sulle pagine vicine.],
    format: "tutta-pagina", id: "booklet-prova-tavola", alt: "Black Swan: forma e contrasto.")
} else if caso == "documentaria" {
  document-plate[
    #image-figure(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"),
  [Tavola della prova: il testo continua sulle pagine vicine.],
  format: "due-colonne",
  alt: "Superfici e contrasti cromatici.",
  width: 137mm,
  id: "booklet-prova-tavola",
)
  ]
} else if caso == "solo-testo" {
  // Nessun image: l'ancora del blocco deve seguire il campione testuale mobile.
  [#figure(block(width: 100%, height: 449pt, above: 0pt, below: 0pt)[
    #text(size: 28pt, weight: 700)[Un campione composto con testo nativo]
  ], kind: image, placement: top, scope: "parent",
    caption: [Tavola della prova.]) <booklet-prova-tavola>]
} else {
  image-figure(path("/risorse-condivise/immagini/figure/storia-del-design/bibbia-gutenberg-pagina-miniata-1454-1455-loc.png"),
    [Tavola della prova: il testo continua sulle pagine vicine.],
    format: "tutta-pagina", id: "booklet-prova-tavola",
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
