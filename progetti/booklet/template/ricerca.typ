// Componenti specifici della ricerca: tavole al vivo, documenti e grafici culturali.
// Le sezioni importano solo le funzioni usate; stili e quote restano nei template condivisi.
// Capitolo 02: prosa corrente Figma, perimetro delle 86 slide attive.
// Dati, originali, esclusioni e copertura: reports/typst-booklet/02-ricerca/.
// Le sei metafore erano tavole a tutta pagina nella fonte Figma.
// Il float occupa tutta la gabbia: la prosa può riempire il foglio precedente.
// La fascia bianca originale identifica la dimensione, senza didascalia visibile.
// La figura nativa conserva contatore e destinazione dei richiami nella prosa.
#import "geometria.typ": (gabbia, altezza-gabbia, altezza-corpo, pagina-larghezza,
  pagina-altezza, margine-superiore, margine-sinistro, colonna)
#import "figure.typ": figura-nel-testo
#let tavola-intera(file, dimensione, etichetta, alt) = context {
  // La metafora e il solo nome mantengono la propria quota nella colonna.
  let titolo = block(width: colonna, above: 0pt, below: 0pt)[
    #set par(justify: false, leading: 0pt, spacing: 0pt)
    #text(size: 14pt, weight: 900, variations: (opsz: 14), dimensione)
  ]
  let altezza-titolo = measure(titolo, width: colonna).height
  let altezza-visuale = colonna * 1448 / 1086
  block(width: 0pt, height: 1pt, above: 0pt, below: 0pt)[
    #rect(width: 0pt, height: 1pt, fill: none, stroke: none)
  ]
  block(width: colonna, height: altezza-visuale + altezza-titolo + 8pt,
    breakable: false, above: 0pt, below: 0pt)[
    #metadata((figura: etichetta, colonne: 1, larghezza: colonna,
      altezza-visuale: altezza-visuale,
      altezza-totale: altezza-visuale + altezza-titolo + 8pt,
      fondo-corpo: margine-superiore + altezza-corpo)) <booklet-figura-nel-testo>
    #show figure.caption: cap => titolo
    #figure(image(file, width: colonna, height: altezza-visuale, alt: alt),
      kind: image, supplement: [Figura], placement: none, caption: dimensione)
    #etichetta
  ]
}

// Le figure conservano proporzioni e dettagli; l'altezza limita la sola visuale.
// I contenuti restano nel flusso nativo, senza righe o colonne precomposte.
#import "figure.typ": documento-mobile
#import "palette.typ": accento-capitolo
#let documento = documento-mobile

// Geometria del riferimento approvato: asse e callout hanno ruoli distinti.
// Le coordinate sono misure della visuale; i punteggi arrivano dal catalogo.
#let geometria-grafico = (
  larghezza: 363pt, altezza: 211.3pt,
  centri: (38.5, 88.5, 138.5, 220.5, 270.5, 320.5),
  asse-x: 33, asse-y: 187.5, asse-larghezza: 293.5,
  bandiera-y: 65.5, bandiera-diametro: 37.5,
)

// Stessa visuale per il volume e gli SVG autonomi; nessun raster nei grafici.
#let disegno-grafico(dati, larghezza: gabbia) = {
  assert(dati.len() == 6, message: "Ogni schema culturale richiede sei paesi.")
  let g = geometria-grafico
  let k = larghezza / g.larghezza
  let asse = rgb("626872")
  let accento = accento-capitolo(2)
  let x-punteggio(n) = (g.asse-x + g.asse-larghezza * n / 100) * k * 1pt
  block(width: larghezza, height: g.altezza * k, above: 0pt, below: 0pt)[
    #set par(justify: false, leading: 2pt * k, spacing: 0pt)
    #set text(font: "DM Sans 9pt", size: 8.5pt * k, fill: rgb("2E3138"),
      weight: 400, variations: (opsz: 9), hyphenate: false)
    #place(top + left, dx: x-punteggio(0), dy: g.asse-y * k * 1pt,
      line(length: g.asse-larghezza * k * 1pt, stroke: 0.5pt * k + asse))
    #for n in range(0, 101, step: 20) {
      let x = x-punteggio(n)
      place(top + left, dx: x, dy: (g.asse-y - 3.5) * k * 1pt,
        line(end: (0pt, 7pt * k), stroke: 0.5pt * k + asse))
      place(top + left, dx: x - 10pt * k, dy: 196pt * k,
        box(width: 20pt * k, align(center, text(size: 8pt * k, fill: asse, str(n)))))
    }
    #for (i, a) in dati.enumerate() {
      assert(a.score >= 0 and a.score <= 100, message: "Punteggio fuori dalla scala 0–100.")
      let x = g.centri.at(i) * k * 1pt
      let target = x-punteggio(a.score)
      let nome = if a.italianName == "Nuova Zelanda" { [Nuova#linebreak()Zelanda] } else { a.italianName }
      place(top + left, dx: x - 27pt * k, dy: 12pt * k,
        box(width: 54pt * k, height: 27pt * k, align(top + center, nome)))
      place(top + left, dx: x - 25pt * k, dy: 43pt * k,
        box(width: 50pt * k, align(center,
          text(font: "Sora", size: 15.5pt * k, weight: 700, fill: accento, str(a.score)))))
      let diametro = g.bandiera-diametro * k * 1pt
      place(top + left, dx: x - diametro / 2, dy: g.bandiera-y * k * 1pt,
        block(width: diametro, height: diametro, radius: 50%, clip: true,
          stroke: 0.35pt * k + asse,
          image(path("/risorse-condivise/immagini/figure/ricerca/bandiere/" + a.iso + ".svg"),
            width: diametro, height: diametro, fit: "cover", alt: "Bandiera: " + a.italianName)))
      place(top + left, curve(
        curve.move((x, (g.bandiera-y + g.bandiera-diametro) * k * 1pt)),
        curve.cubic((x, 139pt * k), (target, 151pt * k), (target, g.asse-y * k * 1pt)),
        stroke: (paint: accento, thickness: 0.6pt * k, dash: "dotted", cap: "round"),
      ))
    }
    // Un solo punto per valore: i punteggi coincidenti condividono la destinazione.
    #for n in dati.map(a => a.score).dedup() {
      place(top + left, dx: x-punteggio(n) - 1pt * k, dy: (g.asse-y - 1) * k * 1pt,
        circle(radius: 1pt * k, fill: accento))
    }
  ]
}

#let grafico(dati, didascalia, consultazione: "25 ottobre 2026") = figure(
  [
    #metadata((
      valori: dati.map(a => (paese: a.italianName, iso: a.iso, punteggio: a.score)),
      asse: (minimo: 0, massimo: 100),
      destinazioni: dati.map(a => (geometria-grafico.asse-x
        + geometria-grafico.asse-larghezza * a.score / 100)),
    )) <booklet-grafico-culturale>
    #disegno-grafico(dati)
  ],
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [#didascalia #v(4pt)#text(size: 8pt, style: "italic")[Dati: The Culture Factor, consultati il #consultazione. Bandiere: flag-icons, MIT.]],
)
#let dati-dimensioni = json(path("/risorse-condivise/immagini/figure/ricerca/dimensioni.json"))

