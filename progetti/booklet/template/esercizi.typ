// Esercizi al piede: contenuti nativi e fondi vettoriali separati.
// Le percentuali riprendono il concept tenue approvato dall’utente.
#import "geometria.typ": gabbia, intercolonna, pagina-larghezza, pagina-altezza
#import "palette.typ": accento-preliminari

#let tinte-esercizio(accento) = (
  fondo: color.mix((accento, 8%), (white, 92%), space: rgb),
  cornice: color.mix((accento, 22%), (white, 78%), space: rgb),
  punti: color.mix((accento, 45%), (white, 55%), space: rgb),
)

#let esercizi-pagina(pagina) = {
  query(<booklet-esercizio>).filter(m => m.location().page() == pagina)
}

// Un float non fornisce un’altezza finita alle colonne annidate. La misura
// nativa della prosa ricava la regione necessaria senza spezzare i paragrafi
// a mano; una linea di tolleranza conserva vedove, orfane e spazi tra capoversi.
#let colonne-esercizio(corpo, numero) = context {
  let larghezza = (gabbia - (numero - 1) * intercolonna) / numero
  let naturale = measure(block(width: larghezza, corpo), width: larghezza).height
  let interlinea = text.size + par.leading
  let altezza = calc.ceil(naturale / numero / interlinea) * interlinea + interlinea
  block(width: gabbia, height: altezza, above: 0pt, below: 0pt)[
    #columns(numero, gutter: intercolonna, corpo)
  ]
}

// Il fondo appartiene alla pagina, dietro prosa, note e folio. La sua quota
// segue l’ancora del box dopo la ricomposizione; nessuna riga è posizionata.
#let sfondo-esercizi() = context {
  let presenti = esercizi-pagina(here().page())
  assert(presenti.len() <= 1, message: "Due esercizi al piede sulla stessa pagina.")
  if presenti.len() == 1 {
    let voce = presenti.first()
    [#metadata((pagina: here().page(), id: voce.value.id,
      ancora: voce.location().page())) <booklet-esercizio-sfondo>]
    let y = voce.location().position().y - voce.value.rispetto
    let altezza = pagina-altezza - y
    let tinta = tinte-esercizio(voce.value.accento)
    let fascia = 10mm
    let reticolo = tiling(size: (5mm, 5mm),
      align(center + horizon, circle(radius: 0.45mm, fill: tinta.punti, stroke: none)))
    place(top + left, dy: y, rect(width: pagina-larghezza, height: altezza,
      fill: tinta.fondo, stroke: none))
    place(top + left, dy: y, rect(width: fascia, height: altezza,
      fill: tinta.cornice, stroke: none))
    place(bottom + left, dx: fascia, rect(width: pagina-larghezza - fascia,
      height: fascia, fill: tinta.cornice, stroke: none))
    place(top + left, dy: y, rect(width: fascia, height: altezza,
      fill: reticolo, stroke: none))
    place(bottom + left, dx: fascia, rect(width: pagina-larghezza - fascia,
      height: fascia, fill: reticolo, stroke: none))
  }
}

// Il float attraversa le due colonne e resta al piede della gabbia. La fascia
// delle note rimane riservata: il solo fondo prosegue fino al bordo del foglio.
// Il salto debole impedisce alle sezioni successive di precedere visivamente
// la consegna e non scarica i float ordinari fra i passaggi del capitolo.
#let esercizio(corpo, id: none, titolo: [], livello: 3, colonne: 2) = {
  assert(id != none, message: "L’esercizio richiede un identificatore stabile.")
  let rispetto = 8mm
  place(bottom, scope: "parent", float: true, clearance: 8mm)[
    #block(width: gabbia, above: 0pt, below: 0pt, breakable: false,
      inset: (top: rispetto, bottom: 2mm))[
      #context [#metadata((id: id, rispetto: rispetto,
        accento: state("colore-capitolo", accento-preliminari).get())) <booklet-esercizio>]
      #show heading.where(level: 3): it => block(above: 0pt, below: 8pt, sticky: true)[
        #set text(size: 14pt, weight: 900, variations: (opsz: 14), hyphenate: false)
        #set par(justify: false, leading: 0pt)
        #context counter(heading).display("1.1.1.")#h(3pt)#it.body
      ]
      #if livello == none {
        block(above: 0pt, below: 8pt,
          text(size: 14pt, weight: 900, variations: (opsz: 14), titolo))
      } else { heading(level: livello, titolo) }
      #if colonne == 1 { corpo } else { colonne-esercizio(corpo, colonne) }
      #metadata((id: id)) <booklet-esercizio-fine>
    ]
  ]
  pagebreak(weak: true)
}
