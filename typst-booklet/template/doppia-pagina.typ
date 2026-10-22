// Sagoma unica sul dorso di due pagine, con prosa continua e Meander ufficiale.
// Le quote descrivono la figura e la gabbia, mai le singole righe del testo.
#import "@preview/meander:0.4.4" as meander
#import "note.typ": voce-nota, composizione-note, separatore-note, richiamo-solo, richiamo-nota as richiamo-ordinario
#import "geometria.typ": (pagina-larghezza, pagina-altezza, margine-interno, margine-esterno,
  margine-superiore, margine-inferiore, margine-sinistro, spazio-note, distacco-note,
  rispetto-sagoma, minimo-testo, colonna, intercolonna, gabbia)
#import "editoriale.typ": didascalia as stampa-didascalia
#import "profili.typ": fasce-profilo, fascia-a-quota, bordo-alpha-sinistro

// id identifica la figura e le sue note: usare un nome univoco nel volume.
// Il capitolo passa paragrafi normali; le quote riguardano solo figura e gabbia.
#let sagoma-regionale(
  id: none,
  file: none,
  profilo: none,
  larghezza: none,
  // Le quote sono esplicite: sul foglio singolo l'origine parte dalla gabbia;
  // sulla coppia parte dal bordo esterno del foglio sinistro.
  inizio-immagine: none,
  fondo-immagine: pagina-altezza,
  note-esterne: false,
  // Una sagoma su un solo foglio riusa lo stesso flusso nelle due colonne.
  // In questo caso inizio-immagine è relativo alla gabbia, non al dorso.
  pagine: 2,
  didascalia: none,
  alt: none,
  corpo,
) = {
  assert(type(id) == str and id != "",
    message: "Assegnare alla figura sul dorso un id univoco e leggibile.")
  assert(file != none, message: "Indicare il path() dell’immagine trasparente.")
  let fasce = fasce-profilo(profilo)
  assert(type(larghezza) == length and larghezza > 0pt,
    message: "Specificare una larghezza positiva per la regione sagomata.")
  assert(type(inizio-immagine) == length,
    message: "Specificare l’origine orizzontale dell’immagine sagomata.")
  assert(pagine in (1, 2), message: "La regione sagomata può occupare uno o due fogli.")
  let rispetto = rispetto-sagoma
  let minimo = minimo-testo
  let larghezza-pagina = pagina-larghezza
  let alto = margine-superiore
  let basso = pagina-altezza - margine-inferiore - spazio-note - distacco-note
  let altezza-corpo = basso - alto
  let altezza-immagine = larghezza * profilo.altezza_px / profilo.larghezza_px
  let origine-immagine = inizio-immagine
  let resto = state("booklet-doppia-resto-" + id, none)

  // Un solo salto strutturale assicura SX pari e DX dispari.
  // Non decide dove termina alcun paragrafo.
  if pagine == 2 { pagebreak(to: "even", weak: true) }
  else { pagebreak(weak: true) }

  // Costruire i dati prima dello show locale evita che l'overflow ne catturi
  // il richiamo ridotto. Le misure vedono solo i marker; le voci restano esterne.
  let regioni = {
    import meander: *
    for lato in range(pagine) {
      if lato == 1 { pagebreak() }
      let margine = if lato == 0 { margine-esterno } else { margine-interno }
      let origine-pagina = lato * larghezza-pagina
      // Nel foglio singolo il sistema locale parte dalla gabbia nativa:
      // i margini speculari sono già applicati da page().
      let origine-gabbia = if pagine == 1 { 0pt } else { origine-pagina + margine }
      let x-immagine = origine-immagine - origine-gabbia
      let y-immagine = fondo-immagine - alto - altezza-immagine
      let colonne = (
        (origine-gabbia, origine-gabbia + colonna),
        (origine-gabbia + colonna + intercolonna, origine-gabbia + gabbia),
      )

      // L’alpha resta alla stessa scala sulle due pagine. Il rispetto in punti
      // viene aggiunto dopo la scala; non si riduce se cambia la larghezza.
      // Chiudere un residuo inferiore a 108 pt evita strette fessure di testo.
      let contorno = contour.horiz(div: fasce.len(), y => {
        let fascia = fascia-a-quota(fasce, y)
        if fascia == none {
          // Il punto nullo deve restare oltre l'intera doppia pagina anche
          // per immagini strette: due larghezze dell'immagine non bastano.
          let fuori = (2 * larghezza-pagina + larghezza - origine-immagine) / larghezza
          return (fuori, fuori)
        }
        let sx = origine-immagine + fascia.at(0) * larghezza - rispetto
        let dx = origine-immagine + fascia.at(1) * larghezza + rispetto
        for (inizio, fine) in colonne {
          if dx > inizio and sx < fine {
            if sx > inizio and sx - inizio < minimo { sx = inizio }
            if dx < fine and fine - dx < minimo { dx = fine }
          }
        }
        ((sx - origine-immagine) / larghezza,
          (dx - origine-immagine) / larghezza)
      }) + contour.margin(y: rispetto)

      // La box ha le dimensioni dell’intera illustrazione, anche quando oltrepassa
      // il dorso. Meander normalizza il contorno su questo box, non sulla gabbia.
      // La figura nativa SX può così conservare numero e richiamo senza centrare
      // un’immagine più larga della sua misura apparente.
      let visuale = box(width: larghezza, height: altezza-immagine)[
        #set align(left)
        #if lato == 0 { [
          #figure(image(file, width: larghezza, alt: alt), caption: none, kind: image, placement: none)
          #label(id)
        ] } else {
          image(file, width: larghezza,
            alt: "Continuazione della stessa figura sulla pagina destra.")
        }
      ]
      // Il bordo fisico di ciascuna pagina mostra la rispettiva metà della
      // stessa immagine: niente nuovi asset ritagliati o ricompressi.
      placed(top + left, dx: x-immagine, dy: y-immagine,
        boundary: ((bbox => {
          // measure(..., width: gabbia) restituisce 388 pt anche per la visuale
          // che oltrepassa la pagina. La trasformazione pubblica del boundary
          // ripristina la misura reale prima di normalizzare le fasce alpha.
          bbox.width = larghezza
          bbox.height = altezza-immagine
          (bbox,)
        }),) + contorno, visuale)
      placed(top + left, boundary: contour.phantom(), [
        #if note-esterne { [#metadata(true) <booklet-note-esterne>] }
        #context {
          let sx = if pagine == 1 { margine-sinistro(here().page()) } else { margine }
          [#metadata((id: id, lato: lato, pagine: pagine, x: x-immagine + sx, y: y-immagine + alto,
            larghezza: larghezza, altezza: altezza-immagine)) <booklet-sagoma-doppia>]
        }
      ])

      // Una sola didascalia comune, nella colonna esterna SX, sopra le note.
      if lato == 0 and didascalia != none {
        placed(bottom + left, boundary: contour.margin(rispetto),
          block(width: colonna, above: 0pt, below: 0pt,
            stampa-didascalia(didascalia, prefisso: ref(label(id)))))
      }
      container(width: colonna, height: altezza-corpo, margin: 0pt)
      container(align: right, width: colonna, height: altezza-corpo, margin: 0pt)
      // La regione indipendente ha dimensioni nulle durante le misure.
      // Solo il suo contesto reale dispone le voci della pagina effettiva.
      placed(top + left, boundary: contour.phantom(), box(width: 0pt, height: 0pt)[
        #context {
          let pagina = here().page()
          let larghezza-voci = if note-esterne { colonna } else { gabbia }
          let composizione = composizione-note(pagina, larghezza: larghezza-voci)
          let note = composizione.note
          if note.len() > 0 {
            // Il Duomo usa l'eccezione delle colonne esterne. Le altre sagome
            // si fermano sopra la fascia e mantengono note a tutta gabbia.
            let totale = composizione.totale
            place(top + left, dx: if note-esterne and calc.odd(pagina) { colonna + intercolonna } else { 0pt },
              dy: pagina-altezza - margine-inferiore - margine-superiore - totale,
              block(width: larghezza-voci, height: totale, above: 0pt, below: 0pt)[
                #separatore-note(larghezza-voci)
                #for (indice, nota) in note.enumerate() {
                  [#metadata((pagina: pagina, note: note.len(), indice: indice,
                    larghezza: larghezza-voci, altezza: totale, spazio: spazio-note)) <booklet-note-region>]
                  voce-nota(nota, larghezza: larghezza-voci)
                  if indice + 1 < note.len() { v(composizione.gap, weak: false) }
                }
              ])
          }
        }
      ])
    }
    // Un solo corpo di testo serve tutte e quattro le colonne in successione.
    content(corpo, hyphenate: false,
      transform: testo => text(hyphenate: true, testo))
    opt.overflow.state(resto)
  }
  page(columns: 1, {
    show footnote: richiamo-solo
    meander.reflow(regioni)
  })

  // Finita la doppia pagina, riprende il flusso nativo senza un limite di fogli.
  context {
    let seguito = resto.get()
    if seguito != none {
      show footnote: richiamo-ordinario
      seguito.styled
    }
  }
}

// Preset editoriale del Duomo, distinto dal motore generico. La composizione
// conserva scala, posizione al vivo inferiore ed eccezione delle note esterne.
#let preset-duomo = (
  larghezza: 476pt, inizio-immagine: 86mm, fondo-immagine: pagina-altezza,
  note-esterne: true,
  alt: "Illustrazione del Duomo di Firenze, figura unica sulle due pagine.",
)
#let sagoma-duomo(..argomenti) = sagoma-regionale(
  ..(preset-duomo + argomenti.named()), ..argomenti.pos())

// Nome breve per il caso a un solo foglio: stessi apparati e stesso overflow.
#let sagoma-pagina(al-vivo-sinistro: false, partenza: auto, ..argomenti) = {
  assert(partenza in (auto, "even", "odd"),
    message: "La sagoma singola può iniziare su una pagina automatica, pari o dispari.")
  if partenza != auto { pagebreak(to: partenza, weak: true) }
  if al-vivo-sinistro {
    let dati = argomenti.named()
    let bordo-alpha = bordo-alpha-sinistro(fasce-profilo(dati.profilo))
    let compone(margine) = sagoma-regionale(pagine: 1, note-esterne: false,
      ..(dati + (inizio-immagine: -margine - bordo-alpha * dati.larghezza)), ..argomenti.pos())
    if partenza == auto {
      pagebreak(weak: true)
      context compone(margine-sinistro(here().page()))
    } else {
      // Il lato editoriale esplicito determina il margine prima delle misure.
      // La figura tocca il bordo esterno con il primo pixel, senza tagliare l’asset.
      compone(if partenza == "even" { margine-esterno } else { margine-interno })
    }
  } else {
    sagoma-regionale(pagine: 1, note-esterne: false, ..argomenti)
  }
}
