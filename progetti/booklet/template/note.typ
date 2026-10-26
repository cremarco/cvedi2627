// Note a tutta gabbia, con due colonne native e una fascia inferiore riservata.
// Nessuna riga della prosa viene misurata o posizionata da questo componente.
#import "geometria.typ": (spazio-note, distacco-note, gabbia, colonna, intercolonna,
  fondo-gabbia, margine-sinistro, inchiostro)
#let larghezza-note = gabbia
#let distacco-voci = 3.5pt
#let testa-note = 4.4pt

// Stampa e stima della caption al vivo condividono lo stesso ingombro.
// Il controllo di capienza resta al chiamante: una stima può essere limitata.
#let ingombro-note(altezze) = if altezze.len() == 0 { 0pt } else {
  testa-note + altezze.sum() + distacco-voci * (altezze.len() - 1)
}

// I richiami ripetuti usano il corpo della nota originale: il numero e i link
// devono essere gli stessi anche nelle misure delle regioni Meander.
#let nota-originale(nota) = {
  let originale = nota
  let visitate = ()
  while type(originale.body) == label {
    assert(originale.body not in visitate, message: "Riferimento circolare fra note ripetute.")
    visitate.push(originale.body)
    let originali = query(originale.body)
    assert(originali.len() == 1 and originali.first().func() == footnote,
      message: "Il richiamo ripetuto deve identificare una sola nota originale: " + repr(originale.body))
    originale = originali.first()
  }
  originale
}

#let numero-nota(nota) = numbering(nota.numbering,
  ..counter(footnote).at(nota.location()))

#let disegna-richiamo(nota, destinazione) = {
  sym.wj
  super(link(destinazione, numero-nota(nota)))
}

// Il richiamo misurato da Meander usa un'etichetta indipendente dalla posizione
// dell'ancora. Il contatore riparte per capitolo: la coppia capitolo/nota rimane
// univoca anche quando il testo viene restituito nell'overflow.
#let etichetta-nota(nota) = {
  let capitolo = counter(heading).at(nota.location()).first()
  label("booklet-nota-" + str(capitolo) + "-"
    + str(counter(footnote).at(nota.location()).first()))
}

// Le misure di Meander vedono solo il richiamo. La voce è composta dalla
// regione esterna, con la stessa etichetta usata dal flusso ordinario.
#let richiamo-solo(nota) = context {
  let originale = nota-originale(nota)
  disegna-richiamo(originale, etichetta-nota(originale))
}

// Il marker identifica la nota effettivamente rimasta nella regione sagomata.
// Le copie misurate da Meander non dispongono alcuna voce nella fascia note.
#let richiamo-sagomato(nota, regione) = context {
  [#metadata((regione: regione, origine: nota.location()))<booklet-richiamo-sagomato>]
  richiamo-solo(nota)
}

// Misura e stampa condividono esattamente font, interlinea e giustezza.
#let stile-voce(larghezza, corpo) = block(width: larghezza, above: 0pt, below: 0pt)[
  #set text(font: ("DM Sans 9pt", "Noto Sans JP", "Noto Sans SC"), size: 7.5pt,
    weight: 400, style: "normal", variations: (opsz: 9), fill: inchiostro)
  // I rimandi bibliografici nelle note conservano il ruolo dell'apparato.
  #show cite: set text(size: 7.5pt, fill: inchiostro)
  #set par(justify: false, leading: 1.5pt, spacing: 3pt, first-line-indent: 0pt)
  #corpo
]

// La misura usa solo il disegno del numero e del corpo. Non crea una seconda
// footnote.entry da riconciliare con la voce reale durante l'introspezione.
#let altezza-voce(nota, larghezza: larghezza-note) = measure(
  stile-voce(larghezza)[
    #super(numero-nota(nota))#h(0.2em)#nota.body
  ], width: larghezza).height

// La stampa conserva il ruolo nativo Note e i collegamenti di andata e ritorno.
// Il corpo resta nel documento, accanto al richiamo, anche per gli screen reader.
#let voce-nota(nota, larghezza: larghezza-note) = stile-voce(larghezza)[
  #metadata(nota.location()) <booklet-note-entry>
  #metadata(nota.location())#etichetta-nota(nota)
  // L'elemento nativo assegna alla voce anche il ruolo Note nel PDF accessibile.
  // La regola locale conserva esattamente il disegno approvato di numero e testo.
  #show footnote.entry: voce => [
    #link(nota.location(), super(numero-nota(nota)))#h(0.2em)#nota.body
  ]
  #footnote.entry(nota)
]

// Un indice condiviso raccoglie le note originali una sola volta per stato del
// documento. Le voci ripetute mantengono i link senza creare copie nell'apparato.
#let indice-note() = {
  let pagine = (:)
  for nota in query(footnote) {
    if type(nota.body) != label {
      let pagina = str(nota.location().page())
      pagine.insert(pagina, pagine.at(pagina, default: ()) + (nota,))
    }
  }
  pagine
}

// La stessa composizione serve al flusso ordinario e alle regioni sagomate.
// Misure e offset vengono riusati da tutte le note della pagina e giustezza.
#let composizione-note(pagina, larghezza: larghezza-note) = {
  let note = indice-note().at(str(pagina), default: ())
  let altezze = note.map(n => altezza-voce(n, larghezza: larghezza))
  // Il distacco conserva cinque note da due righe nella fascia approvata,
  // mantenendo l'interlinea effettiva di 9 pt e senza ridurre il corpo.
  let totale = ingombro-note(altezze)
  assert(totale <= spazio-note,
    message: "Le note della pagina " + str(pagina)
      + " superano la fascia riservata (" + repr(totale) + ").")
  let offset = ()
  let precedente = 0pt
  for (indice, altezza) in altezze.enumerate() {
    offset.push(precedente + if indice == 0 { 0pt } else { testa-note })
    precedente += altezza + distacco-voci
  }
  (note: note, altezze: altezze, offset: offset, totale: totale, gap: distacco-voci)
}

#let pagine-note-esterne() = query(<booklet-note-esterne>).map(m => m.location().page())

#let separatore-note(larghezza) = [
  #rect(width: 0.3 * larghezza, height: 0.4pt, fill: inchiostro, stroke: none)
  #v(4pt, weak: false)
]

// Lo stesso posizionamento serve al flusso ordinario e alle note rimaste nelle
// sagome locali. Il secondo caso lo invoca soltanto fuori dalle misure Meander.
#let colloca-voce(nota) = {
  let origine = nota.location()
  // La box vuota non interrompe il paragrafo. place non riserva altro spazio:
  // la fascia è già sottratta alla gabbia nel solo corpo dei capitoli.
  box(width: 0pt, height: 0pt)[#context {
    let posizione = here().position()
    let pagina = origine.page()
    // Solo le pagine marcate dal componente usano la colonna esterna.
    let esterne = pagina in pagine-note-esterne()
    let larghezza = if esterne { colonna } else { larghezza-note }
    let composizione = composizione-note(pagina, larghezza: larghezza)
    let note = composizione.note
    let indice = note.position(n => n.location() == origine)
    let x = margine-sinistro(pagina) + if esterne and calc.odd(pagina) { colonna + intercolonna } else { 0pt }
    let didascalie = query(<booklet-didascalia-al-piede>)
      .filter(m => m.location().page() == pagina)
    let riserva-didascalia = if didascalie.len() == 0 { 0pt }
      else { didascalie.first().value.altezza + distacco-note }
    let y = (fondo-gabbia - riserva-didascalia
      - composizione.totale + composizione.offset.at(indice))
    // Le coordinate dipendono dalla pagina reale e dalle sole note misurate.
    // Ogni voce compare nella fascia, conservando il punto logico nel suo paragrafo.
    place(top + left, dx: x - posizione.x, dy: y - posizione.y)[
      #block(width: larghezza, above: 0pt, below: 0pt)[
        #if indice == 0 {
          if didascalie.len() == 0 { separatore-note(larghezza) }
            else { v(testa-note, weak: false) }
        }
        #metadata((pagina: pagina, note: note.len(), indice: indice,
          origine: origine, altezza_voce: composizione.altezze.at(indice),
          larghezza: larghezza, altezza: composizione.totale, spazio: spazio-note)) <booklet-note-region>
        #voce-nota(nota, larghezza: larghezza)
      ]
    ]
  }]
}

// I marker dell'overflow tornano ordinari e non appartengono a questa query.
// La ricerca delle note native evita voci duplicate per richiami ripetuti.
#let voci-sagoma(regione) = context {
  let origini = query(<booklet-richiamo-sagomato>)
    .filter(m => m.value.regione == regione).map(m => m.value.origine)
  for nota in query(footnote) {
    if type(nota.body) != label and nota.location() in origini {
      colloca-voce(nota)
    }
  }
}

// Le identità e il contatore rimangono quelli di footnote.
// Un riferimento ripetuto collega la stessa voce senza stamparla due volte.
#let richiamo-nota(nota) = context {
  let ripetuta = type(nota.body) == label
  let originale = nota-originale(nota)
  let origine = originale.location()
  // Il selettore individua direttamente la voce, senza filtrare tutte le ancore.
  let ancore = query(selector(<booklet-note-entry>).and(metadata.where(value: origine)))
  let destinazione = if ancore.len() == 0 { origine } else { ancore.first().location() }
  disegna-richiamo(originale, destinazione)
  // Il richiamo e l'ancora vuota appartengono alla stessa riga: se il numero
  // chiude la colonna, la voce deve restare sulla pagina di quel richiamo.
  if not ripetuta { sym.wj; colloca-voce(nota) }
}
