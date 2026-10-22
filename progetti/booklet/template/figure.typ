// Figure ordinarie e inserti documentari mobili: la prosa scorre fra i fogli.
// Il formato a pagina intera resta distinto dalla posizione nel volume.
#import "editoriale.typ": didascalia as disegna-didascalia, contenuto-didascalia
#import "pagine.typ": tavola-mobile, pagina-al-vivo
#import "geometria.typ": altezza-gabbia, spazio-note, distacco-note

// Figura mobile ordinaria. placement e scope passano direttamente a Typst:
// top + "parent" usa tutta la gabbia senza imporre una pagina alla prosa.
// Senza opzioni eredita lo stile: auto nel corpo, none nelle tavole composte.
#let immagine(file, didascalia, diritti: none, alt: none, width: 100%,
  ..posizione) = figure(
  image(file, width: width, alt: alt), ..posizione,
  caption: contenuto-didascalia(didascalia, diritti: diritti),
)

// Documento mobile a gabbia intera. La variante intera riserva una tavola
// nel flusso del corpo: la didascalia è misurata nello stesso stile della stampa.
// Rapporto, allineamento e riserva sono scelte dell'inserto, non della prosa.
// La riserva di 9 pt dei documenti e quella di 12 pt della mappa WCAG sono
// intenzionalmente distinte: non equivalgono al solo gap nativo della figura.
#let documento-mobile(file, didascalia, diritti: none, alt: none,
  altezza: 250pt, rapporto: 1, intera: false,
  allineamento: bottom + left, riserva: 9pt) = figure(
  layout(spazio => context {
    if intera {
      let prova-didascalia = disegna-didascalia(
        contenuto-didascalia(didascalia, diritti: diritti),
        prefisso: [Figura #counter(figure.where(kind: image)).display(figure.numbering)])
      let altezza-didascalia = measure(prova-didascalia, width: spazio.width).height
      let altezza-visuale = altezza-gabbia - spazio-note - distacco-note - altezza-didascalia - riserva
      block(width: spazio.width, height: altezza-visuale, above: 0pt, below: 0pt)[
        #align(allineamento,
          image(file, width: calc.min(spazio.width, altezza-visuale * rapporto), alt: alt))
      ]
    } else {
      let larghezza = calc.min(spazio.width, altezza * rapporto)
      image(file, width: larghezza, alt: alt)
    }
  }),
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: contenuto-didascalia(didascalia, diritti: diritti),
)

// La miniatura identifica l'immagine senza creare un secondo progressivo.
// Il folio è letto dalla sua posizione visiva: non coincide necessariamente
// con la pagina fisica del PDF, né con il foglio successivo alla didascalia.
#let didascalia-separata(file, didascalia, etichetta, alt: none, diritti: none) = block(
  breakable: false, above: 8pt, below: 10pt,
)[
  #set text(size: 9pt, weight: 300, variations: (opsz: 9))
  #set par(justify: false, leading: 1.8pt, spacing: 0pt)
  #grid(columns: (18mm, 1fr), column-gutter: 3mm, align: top,
    link(etichetta, image(file, width: 18mm, alt: alt)),
    [
      #text(weight: 500, variations: (opsz: 14))[
        #ref(etichetta)#linebreak()
        #context {
          let figura = query(etichetta).first()
          let ancore = query(selector(<booklet-figure-anchor>)
            .and(metadata.where(value: figura.location())))
          let destinazione = if ancore.len() > 0 { ancore.first().location() }
            else { figura.location() }
          let numero = counter(page).at(destinazione).first()
          let folio = if numero < 10 { "00" + str(numero) }
            else if numero < 100 { "0" + str(numero) } else { str(numero) }
          link(destinazione, box[#metadata((figura: etichetta,
            destinazione: destinazione, folio: numero))<booklet-didascalia-separata>Immagine a p. #folio])
        }
      ]
      #v(3pt)
      #contenuto-didascalia(didascalia, diritti: diritti)
    ],
  )
]

// Schermata a pieno formato. Il viewport ha il rapporto del foglio: nessun
// ritaglio e nessuna deformazione. Miniatura e rimando restano nella prosa.
#let schermata(file, didascalia, etichetta, alt) = {
  // none permette due schermate consecutive spiegate insieme prima della coppia.
  if didascalia != none {
    didascalia-separata(file, didascalia, etichetta, alt: alt)
  }
  pagina-al-vivo[
    #figure(
      image(file, width: 100%, height: 100%, fit: "contain", alt: alt),
      caption: none, placement: none,
    )
    #etichetta
  ]
}

#let figura-pagina(id: none, file: none, didascalia: [], diritti: none, alt: none) = {
  assert(type(id) == str and id != "", message: "Assegnare un id univoco alla figura.")
  // Questi inserti non contengono note: recuperano la gabbia ordinaria del foglio.
  // Richiami bibliografici e URL di consultazione restano nella prosa precedente.
  tavola-mobile[
    #layout(spazio => context {
      let contenuto = contenuto-didascalia(didascalia, diritti: diritti)
      // Si misura soltanto la didascalia per ricavare lo spazio dell'immagine.
      // Numero e composizione finale rimangono quelli della figura nativa.
      let numero = counter(figure.where(kind: image)).get().first() + 1
      let misura-didascalia = block(width: spazio.width,
        disegna-didascalia(contenuto, prefisso: [Figura #numbering(figure.numbering, numero)]))
      // gap è uno stile contestuale di figure: anche le varianti locali devono
      // sottrarre lo stesso distacco che la figura finale userà effettivamente.
      let altezza = spazio.height - measure(misura-didascalia).height - figure.gap
      assert(altezza > 100pt, message: "La didascalia è troppo lunga per l'inserto.")
      [#metadata(id) <booklet-figura-pagina>]
      [#figure(image(file, width: spazio.width, height: altezza,
        fit: "contain", alt: alt), caption: contenuto, kind: image)#label(id)]
    })
  ]
}
