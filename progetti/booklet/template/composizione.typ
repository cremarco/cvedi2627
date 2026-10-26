// Catalogo, visuali e apparati del capitolo 08. La prosa resta nel capitolo.
#import "figure.typ": immagine, figura-pagina, figura-al-vivo, figura-nel-testo
#import "documenti.typ": dettaglio
#import "geometria.typ": colonna
#let catalogo = json(path("/risorse-condivise/fonti/booklet/composizione-gerarchia/figure.json"))
#let pagine-intere = json(path("/risorse-condivise/dati/figure/composizione-tutta-pagina.json"))
#let base = "/risorse-condivise/immagini/figure/composizione/"

// Il foglio autonomo è riservato alle composizioni artistiche e pubblicitarie.
// Fotografie di esempio, marchi, schemi e screenshot rientrano nel testo.
#let opere-a-pagina = ("julius-caesar", "barbie-dune", "moma-tipografia",
  "melbourne", "adidas", "haagen-dazs", "cocacola", "linee-direzione",
  "triennale", "manifesto-modulare", "manifesto-denso",
  "prospettiva-tipografica", "diesel-contrasto")
#let visuali-dense = ("allbirds-headspace", "ibm-pittogrammi", "sguardo-spazio",
  "aesop-percorso", "fotografia-illustrazione")

// Solo brevi capoversi del percorso con figure ordinarie su concept e moodboard.
// Il resto della prosa conserva il flusso nativo fra colonne e pagine.
#let capoverso(corpo, distacco: 10pt) = block(
  breakable: false, above: distacco, below: 10pt, corpo)


// I nomi propri mantengono il corsivo anche nelle didascalie dal catalogo.
#let nomi-e-opere = regex("Robert Doisneau|Jeff Widener|Tang Yau Hoong|Steve McCurry|Paula Scher|Rebecca Nolte|Ernst Scheidegger|Kirstin Rocke-Huber|Richard Fonteneau|Le Baiser de l’Hôtel de Ville|Afghan Girl|Lunch Atop a Skyscraper|Tank Man|Negative Spaces|Spartan Golf|Julius Caesar|Barbie|Dune|MoMA Poster Series|Shakespeare in the Park 2013|The Public Theater, 95–96 Season")
#let testo-editoriale(testo) = {
  let pezzi = testo.split(nomi-e-opere)
  let occorrenze = testo.matches(nomi-e-opere)
  for (i, pezzo) in pezzi.enumerate() {
    pezzo
    if i < occorrenze.len() { emph(occorrenze.at(i).text) }
  }
}

#let originale(nome, colonne: auto) = {
  assert(colonne == auto or colonne in (1, 2), message: "Usare una o due colonne per la figura di Composizione.")
  let dato = catalogo.at(nome)
  let caption = testo-editoriale(dato.didascalia)
  let diritti = if dato.diritti == "" { none } else { testo-editoriale(dato.diritti) }
  let pagina = nome in opere-a-pagina and colonne == auto
  if pagina and nome in pagine-intere {
    // Lo stesso raster originale del wrapper, alle proporzioni naturali:
    // nessun bianco della tela Figma entra nel formato del documento.
    let originale = pagine-intere.at(nome)
    figura-al-vivo(id: "fig-comp-" + nome, file: path(originale.file),
      didascalia: caption, diritti: diritti, alt: dato.didascalia,
      rapporto: originale.rapporto, rifilo: originale.rifilo)
  } else if pagina {
    figura-pagina(id: "fig-comp-" + nome, file: path(dato.file),
      didascalia: caption, diritti: diritti, alt: dato.didascalia,
      rapporto: dato.rapporto)
  } else {
    let colonne = if colonne == auto { if nome in visuali-dense { 2 } else { 1 } } else { colonne }
    let fonte = if nome in pagine-intere { pagine-intere.at(nome) }
      else { (file: dato.file, rapporto: dato.rapporto) }
    figura-nel-testo(id: "fig-comp-" + nome, file: path(fonte.file),
      didascalia: caption, diritti: diritti, alt: dato.didascalia,
      rapporto: fonte.rapporto, colonne: colonne)
  }
}

// Le due figure della medesima tavola conservano il proprio progressivo.
#let coppia-originale(prima, seconda) = {
  for nome in (prima, seconda) { originale(nome, colonne: 1) }
}

#let confronto(id, didascalia, corpo, diritti: none, colonne: 2) = [
  #figure(block(width: 100%)[
    #set text(size: 10pt, weight: 400, variations: (opsz: 18))
    #set par(justify: false, leading: 2pt, spacing: 7pt)
    #corpo
  ], kind: image, caption: {
    import "editoriale.typ": contenuto-didascalia
    contenuto-didascalia(didascalia, diritti: diritti)
  }, placement: top, scope: if colonne == 1 { "column" } else { "parent" })#label("fig-comp-" + id)
]

// Le due metà dell'originale conservano forme e lettere a/b alla stessa scala.
// Cambia soltanto la sequenza: nessun segno viene eliminato o ricostruito.
#let takete-maluma-colonna() = {
  let dato = catalogo.at("takete-maluma")
  let altezza = colonna * 2 / dato.rapporto
  confronto("takete-maluma", testo-editoriale(dato.didascalia), [
    #stack(dir: ttb, spacing: 8pt,
      dettaglio(path(dato.file), width: colonna, height: altezza,
        originale-width: 2 * colonna, originale-height: altezza,
        alt: "Profilo spigoloso, contrassegnato dalla lettera a."),
      dettaglio(path(dato.file), width: colonna, height: altezza,
        originale-width: 2 * colonna, originale-height: altezza, dx: -colonna,
        alt: "Profilo curvilineo, contrassegnato dalla lettera b."))
  ], colonne: 1)
}

#let documento(id, file, didascalia, diritti, alt: none, posizione: top) = [
  #immagine(path(base + file), didascalia, diritti: diritti,
    alt: if alt == none { "Documento: " + file } else { alt },
    placement: posizione, scope: "parent")#label("fig-comp-" + id)
]

// Esempi simulati: i controlli e le campiture sono contenuto della figura.
#let pannello(corpo) = rect(fill: rgb("F0F4F3"), stroke: none, inset: 9pt,
  width: 100%, corpo)
#let azione(testo, primaria: true) = rect(
  fill: if primaria { rgb("46ECD5") } else { white },
  stroke: if primaria { none } else { 0.6pt + rgb("626872") },
  inset: (x: 6pt, y: 5pt), text(size: 9pt, weight: 700, testo))

#let invito(variante) = pannello[
  #if variante == 0 {
    text(size: 10pt)[Laboratorio di fotografia]
    parbreak()
    [Sabato 14 novembre]
    parbreak()
    [Dalle 10 alle 13]
    parbreak()
    [Spazio Officina]
    parbreak()
    [Via del Parco 8]
    parbreak()
    [Iscrizione gratuita]
  } else {
    text(size: 17pt, weight: 700)[Laboratorio#linebreak()di fotografia]
    v(8pt)
    text(weight: 700)[Sabato 14 novembre]
    linebreak()
    [Dalle 10 alle 13]
    v(8pt)
    [Spazio Officina]
    linebreak()
    text(size: 9pt)[Via del Parco 8]
    v(8pt)
    if variante == 1 { [Iscrizione gratuita] }
    else {
      text(size: 9pt)[Iscrizione gratuita]
      v(5pt)
      azione([Iscriviti])
    }
  }
]

#let esempio-invito() = confronto("invito",
  [Lo stesso contenuto in tre composizioni simulate: a. informazioni con peso simile; b. titolo, data e luogo distinti; c. invito all’azione riconoscibile. La trasformazione rende esplicite le priorità.], [
    #grid(columns: (1fr, 1fr, 1fr), gutter: 8pt,
      [*a · Elenco*#v(6pt)#invito(0)],
      [*b · Relazioni*#v(6pt)#invito(1)],
      [*c · Azione*#v(6pt)#invito(2)])
  ])

#let batteria() = image(bytes("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'><rect x='24' y='35' width='142' height='75' fill='none' stroke='#2E3138' stroke-width='7'/><rect x='166' y='55' width='14' height='35' fill='#2E3138'/><rect x='36' y='47' width='33' height='51' fill='#46ECD5'/><rect x='79' y='47' width='33' height='51' fill='#46ECD5'/><rect x='122' y='47' width='32' height='51' fill='#46ECD5'/></svg>"), width: 100%, alt: "Batteria carica, segno usato per rappresentare una pausa caffè.")
#let tazza() = image(bytes("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'><path d='M150 49H164C194 49 194 94 164 94H150' fill='none' stroke='#2E3138' stroke-width='7'/><path d='M24 32H153V112H24Z' fill='none' stroke='#2E3138' stroke-width='7'/><rect x='36' y='47' width='31' height='51' fill='#46ECD5'/><rect x='77' y='47' width='31' height='51' fill='#46ECD5'/><rect x='118' y='47' width='23' height='51' fill='#46ECD5'/><path d='M15 126H170' stroke='#2E3138' stroke-width='7'/></svg>"), width: 100%, alt: "Tazza con le barre di una batteria: fusione di due soggetti.")
#let esempio-metafore() = confronto("metafore",
  [Due immagini per l’ipotetico messaggio «Una pausa caffè per ripartire»: a. la batteria sostituisce la tazza; b. tazza e batteria sono fuse. Il riferimento all’energia è figurato e dipende dal contesto del messaggio.], [
    #grid(columns: (1fr, 1fr), gutter: 18pt,
      [*a · Sostituzione*#batteria()#align(center)[Una pausa caffè per ripartire]],
      [*b · Fusione*#tazza()#align(center)[Una pausa caffè per ripartire]])
  ], colonne: 1)

#let esempio-salienza() = confronto("salienza",
  [Ricerca visiva in due campi simulati. Nel primo un solo disco è diverso dagli altri; nel secondo più differenze competono. Il diagramma confronta le condizioni, senza rappresentare tempi o risultati misurati.], [
    #grid(columns: 1, row-gutter: 14pt,
      [*Un segnale distinto*#v(10pt)#grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr), gutter: 8pt,
        ..range(20).map(i => circle(radius: 6pt, fill: if i == 12 { rgb("46ECD5") } else { rgb("626872") }, stroke: none)))],
      [*Segnali concorrenti*#v(10pt)#grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr), gutter: 8pt,
        ..range(20).map(i => circle(radius: if calc.rem(i, 3) == 0 { 8pt } else { 6pt },
          fill: (rgb("46ECD5"), rgb("FFB86A"), rgb("626872"), rgb("FFA2A2")).at(calc.rem(i, 4)), stroke: none)))])
  ], colonne: 1)

#let appuntamento(competizione: false) = pannello[
  #text(size: 14pt, weight: 700)[Visita di controllo]
  #v(8pt)
  *Martedì 17 novembre · 09:30*
  #linebreak()Ambulatorio 2 · Via del Parco 8
  #v(14pt)
  #if competizione {
    stack(dir: ttb, spacing: 7pt,
      azione([Modifica appuntamento]), azione([Indicazioni]), azione([Annulla]))
  } else {
    stack(dir: ttb, spacing: 7pt,
      azione([Modifica appuntamento]), azione([Indicazioni], primaria: false),
      text(size: 9pt)[Annulla appuntamento])
  }
]
#let esempio-priorita() = confronto("priorita",
  [Due versioni simulate di un appuntamento. Il compito è spostare la visita: a. tre azioni con identica enfasi; b. modifica, indicazioni e annullamento ricevono pesi differenti. «Annulla» resta leggibile e disponibile.], [
    #grid(columns: 1, row-gutter: 14pt,
      [*a · Enfasi concorrenti*#v(6pt)#appuntamento(competizione: true)],
      [*b · Una priorità esplicita*#v(6pt)#appuntamento()])
  ], colonne: 1)
