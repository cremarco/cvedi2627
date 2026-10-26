// Sistema editoriale del booklet. Contenuti e fonti restano nei rispettivi file.
// Le aperture usano SVG condivisi; il testo usa il flusso nativo del documento.
#import "aperture/apertura.typ": apertura
#import "note.typ": richiamo-nota
#import "geometria.typ": (inchiostro, pagina-larghezza, pagina-altezza, margini,
  intercolonna, discesa-folio, margine-inferiore-corpo, discesa-folio-corpo)
#import "editoriale.typ": didascalia as disegna-didascalia, distacco-didascalia, folio-arabo
// Queste importazioni mantengono l’API storica usata dai capitoli.
#import "figure.typ": immagine, schermata
#import "pagine.typ": appunti, pagine-al-vivo-mobili
#import "bibliografia.typ": pagina-bibliografia
#import "palette.typ": accento-preliminari, accento-capitolo
#import "esercizi.typ": sfondo-esercizi, esercizi-pagina, tinte-esercizio
#let colore-capitolo = state("colore-capitolo", accento-preliminari)

// Gli elenchi conservano voci e numerazione native; cambia soltanto il segno.
#let elenchi(accento: accento-preliminari, corpo) = {
  set list(marker: box(baseline: (at: bottom, shift: -0.05em),
    square(size: 0.4em, fill: accento, stroke: none)))
  set enum(numbering: (..numeri) => context {
    let em = (1em).to-absolute()
    let cifra = text(size: 0.8em, weight: 600, fill: inchiostro,
      numeri.pos().map(str).join("."))
    // Il quadrato si allarga solo quando servono più cifre o livelli completi.
    box(width: calc.max(1.2 * em, measure(cifra).width + 0.3 * em), height: 1.2em,
      baseline: (at: bottom, shift: 0.35em), fill: accento, stroke: none,
      inset: 0pt, align(center + horizon, cifra))
  })
  corpo
}

// Misure del testo discorsivo. Il preset approvato è 11/13,5 pt;
// l'input della CLI conserva il confronto con la composizione precedente.
#let varianti-lettura = (
  "12-14": (corpo: 12pt, interlinea: 14pt),
  "11-13.5": (corpo: 11pt, interlinea: 13.5pt),
)
#let variante-lettura = sys.inputs.at("lettura", default: "11-13.5")
#assert(variante-lettura in varianti-lettura,
  message: "La lettura accetta soltanto 11-13.5 oppure 12-14.")
#let misure-lettura = varianti-lettura.at(variante-lettura)

// I rimandi autore–anno restano leggibili senza prevalere sulla prosa.
// La misura relativa mantiene il rapporto anche nelle didascalie.
#let scala-citazioni = 10 / 11
#let colore-citazioni = rgb("626872")

// Il folio è condiviso dalle pagine ordinarie e dalla prova delle note a tutta gabbia.
#let folio(romano: false) = context {
  if here().page() in pagine-al-vivo-mobili() { return }
  let lato = if calc.odd(counter(page).get().first()) { right } else { left }
  let numero = counter(page).get().first()
  let cifre = if romano { numbering("i", numero) }
    else { folio-arabo(numero) }
  let esercizi = esercizi-pagina(here().page())
  let fondo = if esercizi.len() == 0 { colore-capitolo.get() }
    else { tinte-esercizio(esercizi.first().value.accento).fondo }
  align(lato, rect(width: 32pt, height: 22pt, fill: fondo,
    stroke: none, inset: 4pt)[
    #set text(size: 12pt, weight: 500, variations: (opsz: 14))
    #set par(leading: 2pt)
    #align(center + horizon, cifre)
  ])
}

// Applica formato, font, giustificazione, numerazione e apparati al documento.
// corpo è il contenuto di main.typ; la funzione restituisce il libro impaginato.
#let booklet(corpo) = {
  set document(
    title: "Comunicazione visiva e design delle interfacce · Campione Typst",
    author: ("Marco Cremaschi", "Elia Guarnieri", "Andrea Primo Pierotti"),
  )
  // Noto Sans JP completa i caratteri giapponesi, come 浮世絵 nel glossario.
  // Noto Sans SC completa i segni cinesi assenti nel font JP, come 劳 in 麦当劳.
  // Il testo latino continua a usare DM Sans e i titoli Sora.
  set text(font: ("DM Sans 9pt", "Noto Sans JP", "Noto Sans SC"), size: 12pt, fill: inchiostro,
    lang: "it", region: "IT", hyphenate: true, weight: 400,
    // In Typst il bordo sotto la baseline è negativo: 0,9em − (−0,1em)
    // occupano un corpo intero. Con leading 2pt il corpo 12 ha interlinea 14.
    variations: (opsz: 18), top-edge: 0.9em, bottom-edge: -0.1em)
  set par(justify: true, leading: 2pt, spacing: 10pt, first-line-indent: 0pt)
  // Font matematico distribuito con Typst, disponibile anche senza font di sistema.
  show math.equation: set text(font: "New Computer Modern Math", weight: 400)
  // Consuma strong: lasciarlo nel wrapper aggiungerebbe ancora il suo peso.
  show strong: it => text(weight: 700, variations: (opsz: 14), it.body)
  set page(width: pagina-larghezza, height: pagina-altezza, binding: left,
    margin: margini(), columns: 2, footer-descent: discesa-folio,
    footer: folio(), background: context {
      if here().page() not in pagine-al-vivo-mobili() { sfondo-esercizi() }
    })
  set columns(gutter: intercolonna)
  set heading(numbering: "1.1.1.")

  // Sezioni e sottoparagrafi proseguono nel flusso delle due colonne.
  // Il titolo resta legato al primo passaggio, senza lasciare una colonna vuota.
  show heading.where(level: 2): it => {
    block(above: 18pt, below: 14pt, sticky: true)[
      #set text(font: "Sora", size: 20pt, weight: 800, hyphenate: false)
      #set par(justify: false, leading: 0pt)
      #context text(fill: colore-capitolo.get(), counter(heading).display("1.1."))
      #v(6pt)
      #it.body
    ]
  }
  show heading.where(level: 3): it => block(above: 14pt, below: 4pt, sticky: true)[
    #set text(size: 14pt, weight: 900, variations: (opsz: 14), hyphenate: false)
    #set par(justify: false, leading: 0pt)
    #context counter(heading).display("1.1.1.")
    #h(3pt)#it.body
  ]

  // Misure confermate dall'utente in risposta al commento Figma #427.
  // La misura è centralizzata qui e vale per tutti i capitoli Typst.
  show footnote.entry: set text(size: 7.5pt, variations: (opsz: 9))
  show footnote.entry: set par(justify: false, leading: 1.5pt, spacing: 3pt)
  // Ogni nota conserva insieme descrizione e URL, anche a fine colonna.
  show footnote.entry: it => block(breakable: false, it)
  set footnote.entry(separator: line(length: 30%, stroke: 0.4pt + inchiostro),
    clearance: 8pt, gap: 4pt)
  set cite(style: "apa")
  show cite: set text(size: scala-citazioni * 1em, fill: colore-citazioni)
  // Le figure ordinarie lasciano proseguire il testo nello spazio disponibile.
  // I contenitori di composizioni fisse impostano placement: none localmente.
  set figure(gap: distacco-didascalia, supplement: [Figura], placement: auto)
  show figure.caption: it => disegna-didascalia(it.body,
    prefisso: [#it.supplement #context it.counter.display(it.numbering)])

  // Typst #4359: una figura mobile conserva il punto d'inserimento logico.
  // Anche i pannelli dentro una tavola mobile ricevono un'ancora visiva:
  // placement: none descrive il pannello, non il movimento del contenitore.
  show figure: fig => {
    // I testi costruiti negli esempi conservano la propria scala didattica
    // anche quando si prova un corpo diverso nella prosa circostante.
    show image: visuale => [#metadata(fig.location()) <booklet-figure-anchor>#visuale]
    // I confronti costruiti soltanto con testo e glifi non contengono image.
    // La seconda ancora è usata solo se manca quella della visuale.
    show block: blocco => [#metadata(fig.location()) <booklet-figure-block-anchor>#blocco]
    if variante-lettura == "11-13.5" {
      set text(size: 12pt)
      set par(leading: 2pt)
      fig
    } else { fig }
  }
  // I richiami usano la posizione visiva, ma contatore e supplemento nativi.
  show ref.where(form: "normal"): it => {
    let fig = it.element
    if fig == none or fig.func() != figure { return it }
    // Le figure prive di immagini, come alcuni campioni testuali, conservano
    // la destinazione nativa quando non hanno un'ancora visiva.
    context {
      let ancore = query(selector(<booklet-figure-anchor>)
        .and(metadata.where(value: fig.location())))
      if ancore.len() == 0 {
        ancore = query(selector(<booklet-figure-block-anchor>)
          .and(metadata.where(value: fig.location())))
      }
      if ancore.len() == 0 or fig.numbering == none { return it }
      let supplemento = if it.supplement == auto { fig.supplement }
        else if type(it.supplement) == function { (it.supplement)(fig) }
        else { it.supplement }
      let numero = fig.counter.display(fig.numbering, at: fig.location())
      link(ancore.first().location(),
        if supplemento == none or supplemento == [] { numero }
        else { [#supplemento~#numero] })
    }
  }
  corpo
}

// Crea una nota sitografica nativa: etichetta leggibile e URL cliccabile.
// Il riferimento bibliografico completo appartiene invece al file .bib.
#let sito(titolo, url) = footnote[
  #set text(size: 7.5pt, variations: (opsz: 9))
  #titolo #linebreak()
  #text(size: 7pt)[#link(url)]
]

// Apertura e chiusura del capitolo. numero conserva l'ordine del piano editoriale.
// visuale è il fondo SVG senza testo; composizione contiene le quote approvate.
// fonti è il path() del .bib o .yml di questo capitolo; corpo è prosa continua.
#let capitolo(numero: 1, titolo: [], composizione: none, accento: accento-capitolo(1),
  visuale: none, fonti: none, gruppi-fonti: none, corpo) = {
  show: elenchi.with(accento: accento)
  // Il prefisso appartiene al capitolo anche quando un richiamo è altrove.
  // Il progressivo rimane il contatore nativo, azzerato prima del corpo.
  set figure(numbering: n => str(numero) + "." + str(n))
  colore-capitolo.update(accento)
  // Il numero editoriale parte da 01; il titolo resta un heading nativo.
  counter(heading).update((numero - 1, 0, 0))
  apertura(numero: numero, titolo: titolo, composizione: composizione,
    visuale: visuale)
  // I contatori ripartono per capitolo; indice e richiami restano automatici.
  counter(heading).update((numero, 0, 0))
  counter(figure.where(kind: image)).update(0)
  counter(footnote).update(0)
  // Fascia di 35 mm confermata dall'utente sotto entrambe le colonne.
  // Il gruppo locale applica la gabbia solo al corpo, non ad aperture e bibliografia.
  {
    set text(size: misure-lettura.corpo)
    set par(leading: misure-lettura.interlinea - misure-lettura.corpo)
    set page(margin: margini(bottom: margine-inferiore-corpo),
      footer-descent: discesa-folio-corpo)
    // L'apparato originale di colonna non deve essere duplicato.
    show footnote.entry: none
    set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
    show footnote: richiamo-nota
    corpo
  }
  if fonti != none {
    pagina-bibliografia(fonti, gruppi: gruppi-fonti)
  }
  appunti()
}

