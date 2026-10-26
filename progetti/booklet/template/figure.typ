// Figure ordinarie e inserti documentari mobili: la prosa scorre fra i fogli.
// Il formato a pagina intera resta distinto dalla posizione nel volume.
#import "editoriale.typ": didascalia as disegna-didascalia, contenuto-didascalia, folio-arabo
#import "pagine.typ": tavola-mobile, pagina-al-vivo-mobile
#import "geometria.typ": (altezza-corpo, spazio-note, distacco-note, gabbia,
  pagina-larghezza, pagina-altezza, fondo-gabbia, inchiostro, colonna)
#import "note.typ": richiamo-solo

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
// La riserva dei documenti non equivale al solo gap nativo della figura.
#let documento-mobile(file, didascalia, diritti: none, alt: none,
  altezza: 250pt, rapporto: 1, intera: false,
  allineamento: bottom + left, riserva: 9pt, colonne: 2, limita: false,
  etichetta: none) = {
  assert(colonne in (1, 2), message: "Le figure nel testo usano una o due colonne.")
  if limita {
    context {
      let larghezza-gabbia = if colonne == 1 { colonna } else { gabbia }
      let precedente = counter(figure.where(kind: image)).get().first()
      let cap = contenuto-didascalia(didascalia, diritti: diritti)
      let prova-didascalia = block(width: larghezza-gabbia)[
        #show footnote: richiamo-solo
        #disegna-didascalia(cap,
          prefisso: [Figura #numbering(figure.numbering, precedente + 1)])
      ]
      let altezza-didascalia = measure(prova-didascalia, width: larghezza-gabbia).height
      let limite = calc.min(altezza, altezza-corpo - altezza-didascalia - riserva)
      assert(limite > 0pt, message: "La didascalia non lascia spazio alla visuale.")
      let larghezza = calc.min(larghezza-gabbia, limite * rapporto)
      let altezza-naturale = larghezza / rapporto
      let totale = altezza-naturale + altezza-didascalia + 8pt
      let insieme = block(width: larghezza-gabbia, height: totale,
        above: 0pt, below: 0pt, breakable: false)[
        #metadata((figura: etichetta, colonne: colonne,
          larghezza: larghezza, altezza-visuale: altezza-naturale,
          altezza-totale: totale,
          fondo-corpo: fondo-gabbia - spazio-note - distacco-note)) <booklet-figura-nel-testo>
        #set figure(gap: 8pt)
        #figure(
          block(width: larghezza-gabbia, height: altezza-naturale,
            above: 0pt, below: 0pt, breakable: false)[
            #align(center, image(file, width: larghezza,
              height: altezza-naturale, alt: alt))
          ],
          kind: image, supplement: [Figura], placement: none, caption: cap,
        )
        #if etichetta != none { etichetta }
      ]
      if colonne == 1 {
        // Il vero blocco nel flusso rimuove lo slot residuo lasciato da un
        // precedente float parent; il blocco seguente passa intero alla colonna.
        block(width: 0pt, height: 1pt, above: 0pt, below: 0pt)[
          #rect(width: 0pt, height: 1pt, fill: none, stroke: none)
        ]
        insieme
      } else {
        place(top, scope: "parent", float: true, clearance: 8pt, insieme)
      }
    }
  } else {
    figure(
      layout(spazio => context {
        if intera {
          let prova-didascalia = disegna-didascalia(
            contenuto-didascalia(didascalia, diritti: diritti),
            prefisso: [Figura #counter(figure.where(kind: image)).display(figure.numbering)])
          let altezza-didascalia = measure(prova-didascalia, width: spazio.width).height
          let altezza-visuale = altezza-corpo - altezza-didascalia - riserva
          block(width: spazio.width, height: altezza-visuale, above: 0pt, below: 0pt)[
            #align(allineamento,
              image(file, width: calc.min(spazio.width, altezza-visuale * rapporto), alt: alt))
          ]
        } else {
          let larghezza = calc.min(spazio.width, altezza * rapporto)
          image(file, width: larghezza, alt: alt)
        }
      }),
      kind: image, supplement: [Figura], placement: top,
      scope: if colonne == 1 { "column" } else { "parent" },
      caption: contenuto-didascalia(didascalia, diritti: diritti),
    )
  }
}

// La quota completa del float tiene insieme immagine naturale e caption nativa.
// La misura della sola caption non genera nuove voci di nota.
#let figura-nel-testo(id: none, file: none, didascalia: [], diritti: none,
  alt: none, rapporto: 1, colonne: 2, altezza: 110mm) = {
  assert(type(id) == str and id != "", message: "Assegnare un id univoco alla figura.")
  assert(rapporto > 0, message: "Il rapporto naturale deve essere positivo.")
  documento-mobile(file, didascalia, diritti: diritti, alt: alt,
    altezza: altezza, rapporto: rapporto, colonne: colonne, limita: true,
    etichetta: label(id))
}

// La miniatura identifica l'immagine senza creare un secondo progressivo.
// Il folio è letto dalla sua posizione visiva: non coincide necessariamente
// con la pagina fisica del PDF, né con il foglio successivo alla didascalia.
#let didascalia-separata(file, didascalia, etichetta, alt: none, diritti: none,
  rapporto: 17 / 24) = block(
  breakable: false, above: 0pt, below: 0pt,
)[
  #set text(size: 9pt, weight: 300, variations: (opsz: 9))
  #set par(justify: false, leading: 1.8pt, spacing: 0pt)
  #layout(spazio => context {
    let testo = [
      #text(weight: 500, variations: (opsz: 14))[
        #ref(etichetta)
      ]
      #linebreak()
      #contenuto-didascalia(didascalia, diritti: diritti)
      #v(3pt)
      #text(weight: 500, variations: (opsz: 14))[
        #context {
          let figura = query(etichetta).first()
          let ancore = query(selector(<booklet-figure-anchor>)
            .and(metadata.where(value: figura.location())))
          let destinazione = if ancore.len() > 0 { ancore.first().location() }
            else { figura.location() }
          let numero = counter(page).at(destinazione).first()
          let folio = folio-arabo(numero)
          link(destinazione, box[#metadata((figura: etichetta,
            destinazione: destinazione, folio: numero))<booklet-didascalia-separata>Nella pagina successiva · p. #folio →])
        }
      ]
    ]
    // La larghezza della miniatura dipende dall'altezza del testo, che a sua
    // volta dipende dalla giustezza restante. Partendo dalla giustezza massima,
    // la misura cresce soltanto fino alla stessa composizione di righe.
    let altezza = 0pt
    let larghezza-testo = spazio.width - 3mm
    let convergente = false
    let misura = { show footnote: richiamo-solo; testo }
    for _ in range(12) {
      larghezza-testo = spazio.width - 3mm - altezza * rapporto
      assert(larghezza-testo > spazio.width / 2,
        message: "Didascalia al vivo troppo lunga per la miniatura proporzionale.")
      let nuova = measure(misura, width: larghezza-testo).height
      if calc.abs(nuova - altezza) < 0.01pt { convergente = true; break }
      altezza = nuova
    }
    let larghezza = altezza * rapporto
    assert(convergente and calc.abs(measure(misura, width: larghezza-testo).height - altezza) < 0.01pt,
      message: "La misura della didascalia al vivo non converge.")
    // Il divisorio distingue il gruppo dalle eventuali note che lo precedono.
    [#metadata((figura: etichetta, larghezza: spazio.width,
      spessore: 0.4pt, distacco: 8pt))<booklet-divisorio-didascalia>]
    rect(width: spazio.width, height: 0.4pt,
      fill: inchiostro, stroke: none)
    v(8pt, weak: false)
    grid(columns: (larghezza, larghezza-testo), column-gutter: 3mm, align: top,
      block(width: larghezza, height: altezza, above: 0pt, below: 0pt)[
        #metadata((figura: etichetta, larghezza: larghezza, altezza: altezza))
          <booklet-miniatura-didascalia>
        #link(etichetta, image(file, width: larghezza, height: altezza, alt: alt))
      ],
      block(width: larghezza-testo, height: altezza, above: 0pt, below: 0pt)[
        #metadata((figura: etichetta, larghezza: larghezza-testo, altezza: altezza))
          <booklet-testo-didascalia>
        #testo
      ],
    )
  })
]

// Caption e immagine sono float consecutivi: il seguito della prosa completa
// la pagina precedente. La caption termina al margine inferiore ordinario;
// le note si dispongono sopra nella fascia ordinaria da 35 mm. Il float
// aggiunge alla riserva soltanto caption e distacco, senza interrogare la pagina.
#let didascalia-al-piede(file, didascalia, etichetta, alt: none, diritti: none,
  rapporto: 17 / 24) = {
  [#metadata(etichetta) <booklet-al-vivo-flusso>]
  place(bottom, scope: "parent", float: true, clearance: 0pt)[
    #layout(spazio => context {
      let dida = block(width: gabbia, above: 0pt, below: 0pt)[
        #didascalia-separata(file, didascalia, etichetta, alt: alt, diritti: diritti,
          rapporto: rapporto)
      ]
      // La sola misura vede i richiami, senza collocare voci di nota di prova.
      let misura = { show footnote: richiamo-solo; dida }
      let altezza = measure(misura, width: gabbia).height
      // Le note successive possono raggiungere il foglio della caption mentre
      // gli inserti restano in coda. La fascia piena da 35 mm resta quindi
      // riservata anche qui: contare le sole note fra due marker sottostima
      // l'apparato e rende instabili le sequenze di molte immagini consecutive.
      // Si aggiungono soltanto caption e distacco alla riserva ordinaria.
      let riserva = altezza + distacco-note
      block(width: gabbia, height: riserva, above: 0pt, below: 0pt)[
        #let fondo = fondo-gabbia
        // Il float è al piede della regione corrente. Ricavare la sua quota
        // dai margini evita un secondo ciclo di posizioni per le note interne
        // alla caption, anche nelle lunghe sequenze di schermate consecutive.
        #let fondo-regione = pagina-altezza - page.margin.bottom
        #place(top + left, dy: fondo - altezza - fondo-regione + riserva)[
            #block(width: gabbia, height: altezza, above: 0pt, below: 0pt)[
              #metadata((figura: etichetta, altezza: altezza, fondo: fondo,
                riserva: riserva,
                fondo_corpo: fondo - spazio-note - distacco-note - riserva))
                <booklet-didascalia-al-piede>
              #dida
            ]
        ]
      ]
    })
  ]
}

// Il rapporto serve soltanto al rifilo del fondo esterno delle immagini
// selezionate. Spostamento e scala sono uniformi: nessuna deformazione.
// Le schermate TTC hanno già il rapporto del foglio e rimangono integre.
#let schermata(file, didascalia, etichetta, alt, diritti: none,
  rapporto: 17 / 24, ancoraggio: (0.5, 0.5), rifilo: true) = {
  // none permette due schermate consecutive spiegate insieme prima della coppia.
  if didascalia != none {
    didascalia-al-piede(file, didascalia, etichetta, alt: alt, diritti: diritti,
      rapporto: rapporto)
  }
  pagina-al-vivo-mobile[
    #metadata((figura: etichetta, rapporto: rapporto, ancoraggio: ancoraggio,
      rifilo: rifilo))
      <booklet-figura-al-vivo>
    // L'ancora apre il foglio, non l'angolo dell'originale eventualmente rifilato.
    #context [#metadata(query(etichetta).first().location()) <booklet-figure-anchor>]
    #figure(
      block(width: pagina-larghezza, height: pagina-altezza, clip: true)[
        // I documenti con testi al bordo restano interi sul foglio dedicato:
        // il bianco residuo appartiene alla pagina, senza margini laterali aggiunti.
        #let larghezza = if rifilo {
          calc.max(pagina-larghezza, pagina-altezza * rapporto)
        } else {
          calc.min(pagina-larghezza, pagina-altezza * rapporto)
        }
        #let altezza = larghezza / rapporto
        // Entrambe le quote impediscono al fit implicito di ricentrare il rifilo.
        #place(top + left,
          dx: (pagina-larghezza - larghezza) * ancoraggio.at(0),
          dy: (pagina-altezza - altezza) * ancoraggio.at(1),
          image(file, width: larghezza, height: altezza, alt: alt))
      ],
      caption: none, placement: none,
    )
    #etichetta
  ]
}

#let figura-al-vivo(id: none, file: none, didascalia: [], diritti: none,
  alt: none, rapporto: 17 / 24, ancoraggio: (0.5, 0.5), rifilo: true) = {
  assert(type(id) == str and id != "", message: "Assegnare un id univoco alla figura al vivo.")
  schermata(file, didascalia, label(id), alt, diritti: diritti,
    rapporto: rapporto, ancoraggio: ancoraggio, rifilo: rifilo)
}

#let figura-pagina(id: none, file: none, didascalia: [], diritti: none, alt: none,
  rapporto: none) = {
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
      let visuale = if rapporto == none {
        image(file, width: spazio.width, height: altezza, fit: "contain", alt: alt)
      } else {
        // Il formato resta intero; l'immagine naturale termina accanto alla
        // didascalia invece di centrare il bianco dentro un frame più alto.
        block(width: spazio.width, height: altezza)[
          #align(bottom + center,
            image(file, width: calc.min(spazio.width, altezza * rapporto), alt: alt))
        ]
      }
      [#figure(visuale, caption: contenuto, kind: image)#label(id)]
    })
  ]
}
