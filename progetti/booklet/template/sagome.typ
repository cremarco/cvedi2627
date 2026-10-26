// Flusso locale attorno a un'immagine trasparente.
// Il resto del capitolo continua con l'impaginazione nativa di Typst.
// Non modifica Meander e non ripete figure o pagine.
#import "@preview/meander:0.4.4" as meander
#import "geometria.typ": rispetto-sagoma, minimo-testo
#import "editoriale.typ": didascalia as stampa-didascalia, contenuto-didascalia
#import "profili.typ": fasce-profilo, fascia-a-quota
#import "note.typ": richiamo-sagomato, voci-sagoma, richiamo-nota as richiamo-ordinario

// file è un path() costruito nel file chiamante; profilo è json(path(...)).
// id è anche l'etichetta nativa della figura: id: "fig-duomo" abilita @fig-duomo.
// Deve identificare questa figura, anche quando lo stesso asset è riusato.
// width indica la larghezza richiesta della sola immagine. In una colonna
// stretta viene limitata per lasciare almeno 108 pt di testo e 8 pt di rispetto.
#let sagoma(
  id: none,
  file: none,
  profilo: none,
  width: 90pt,
  lato: right,
  didascalia: none,
  diritti: none,
  alt: none,
  numerata: true,
  corpo,
) = context {
  assert(id != none and type(id) == str and id != "",
    message: "Assegnare alla sagoma un id univoco e leggibile.")
  assert(file != none, message: "Indicare il path() dell'immagine trasparente.")
  assert(lato in (left, center, right), message: "Il lato della sagoma deve essere left, center oppure right.")
  assert(width > 0pt, message: "La larghezza della sagoma deve essere positiva.")
  assert(numerata or (didascalia == none and diritti == none),
    message: "Il capolettera non usa didascalia o progressivo di figura.")
  let fasce = fasce-profilo(profilo)

  let rispetto = rispetto-sagoma
  let resto = state("booklet-sagoma-" + id, none)

  block(breakable: false, spacing: 0pt)[
  #show footnote: nota => richiamo-sagomato(nota, id)
  #layout(spazio => {
    let spazio-testo = if lato == center { 2 * (minimo-testo + rispetto) } else { minimo-testo + rispetto }
    let larghezza = calc.min(width, spazio.width - spazio-testo)
    assert(larghezza > 0pt,
      message: "La gabbia è troppo stretta per testo e sagoma: usare una gabbia più ampia.")
    let visuale = image(file, width: larghezza, alt: alt)
    let altezza-immagine = measure(visuale).height
    let offset = if lato == right { spazio.width - larghezza }
      else if lato == center { (spazio.width - larghezza) / 2 }
      else { 0pt }

    // Figure e label sono native: numerazione, stile della caption e richiami
    // provengono dal template del libro. Il corpo del paragrafo resta fuori.
    // La didascalia segue il paragrafo, così non ne interrompe una frase.
    let contenuto = box(width: spazio.width, height: altezza-immagine)[
      #place(top + lato, visuale)
    ]
    let figura = box(width: spazio.width, height: altezza-immagine,
      if numerata {
        [#figure(contenuto, kind: image, caption: none, placement: none)#label(id)]
      } else {
        [#metadata((id: id, lettera: alt)) <booklet-capolettera>#contenuto]
      })
    let altezza-figura = measure(figura).height

    // Un ostacolo sagomato segue il profilo dell'alpha. Il rispetto è aggiunto in punti dopo
    // la trasformazione del contorno, quindi resta 8 pt a qualunque scala.
    let contorno = meander.contour.horiz(div: fasce.len(), y => {
      let quota = y * altezza-figura
      if quota >= altezza-immagine {
        (0, 1)
      } else {
        let fascia = fascia-a-quota(fasce, quota / altezza-immagine)
        if fascia == none {
          // Rettangolo nullo fuori dalla gabbia: nessun ostacolo in questa fascia.
          (2, 2)
        } else {
          // Occupa anche lo spazio tra sagoma e bordo a cui è ancorata:
          // altrimenti nascerebbero strette fessure di testo dentro la figura.
          if lato == right {
            ((offset + fascia.at(0) * larghezza) / spazio.width, 1)
          } else if lato == left {
            (0, (offset + fascia.at(1) * larghezza) / spazio.width)
          } else {
            // A gabbia intera il testo può scorrere sui due lati. La limitazione
            // iniziale della larghezza lascia almeno 108 pt a ciascuno.
            ((offset + fascia.at(0) * larghezza) / spazio.width,
             (offset + fascia.at(1) * larghezza) / spazio.width)
          }
        }
      }
    }) + meander.contour.margin(rispetto)

    // Solo il tratto alto quanto la figura viene tenuto insieme. Se non entra
    // nel fondo della colonna, Typst lo porta alla colonna successiva.
    // L'overflow NON è dentro questo blocco e può occupare quante pagine servono.
      meander.reflow({
        import meander: *
        // Il box comprende l'intera colonna: il contorno non va normalizzato
        // sulla sola larghezza del bitmap, anche quando manca la didascalia.
        placed(top + left, boundary: ((bbox => {
          bbox.width = spazio.width
          bbox.height = altezza-immagine
          (bbox,)
        }),) + contorno, figura)
        if lato == center {
          // Due contenitori concatenati mantengono l'ordine di lettura:
          // tutta la zona sinistra, poi tutta la destra della figura centrale.
          container(width: 50%, height: altezza-figura + rispetto, margin: 0pt)
          container(align: right, width: 50%, height: altezza-figura + rispetto, margin: 0pt)
        } else {
          container(height: altezza-figura + rispetto, margin: 0pt)
        }
        // Meander taglia fra parole intere quando restituisce l'overflow.
        // Typst può sillabare dentro i frammenti, anche in grassetto. Il taglio
        // fra parole limita però le opportunità rispetto a un paragrafo nativo:
        // con giustezze strette possono restare spazi ampi nel giustificato.
        // Le due impostazioni evitano metà parola prima e dopo la didascalia.
        // Il capolettera ammette la sillabazione anche nel taglio fra regioni:
        // conserva spazi regolari nelle prime righe strette della parola iniziale.
        content(corpo, hyphenate: not numerata,
          transform: testo => text(hyphenate: true, testo))
        opt.overflow.state(resto)
      })
  })
  // Il contenitore nativo tiene le voci sulla pagina della regione. L'overlay
  // resta fuori da reflow: le misure del testo vedono soltanto i richiami.
  #place(top + left, box(width: 0pt, height: 0pt, voci-sagoma(id)))
  ]

  // Riprende il normale flusso del documento, comprese le note al piede.
  // Nessuna riga è precomposta; nessuna quantità di pagine è stabilita qui.
  context {
    let seguito = resto.get()
    if seguito != none {
      show footnote: richiamo-ordinario
      seguito.styled
    }
  }
  // Il capitolo passa il solo paragrafo associato alla sagoma: il resto resta
  // fuori dalla funzione. Numero e link derivano dalla figura nativa già creata.
  if didascalia != none or diritti != none {
    block(above: 8pt, below: 10pt, breakable: false,
      stampa-didascalia(contenuto-didascalia(didascalia, diritti: diritti),
        prefisso: ref(label(id))))
  }
}

// Un'iniziale illustrata sostituisce una lettera del testo, senza aggiungere
// una figura numerata. L'alternativa testuale conserva la lettera nella lettura.
#let capolettera(id: none, file: none, profilo: none, width: 64pt,
  lettera: "N", corpo) = sagoma(id: id, file: file, profilo: profilo,
  width: width, lato: left, alt: lettera, numerata: false, corpo)
