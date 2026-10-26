// Documento rettangolare unico sul dorso: nessun profilo alpha e nessun
// motore di testo sagomato. Le due pagine mostrano lo stesso asset integro.
#import "geometria.typ": (pagina-larghezza, margine-superiore,
  fondo-gabbia, margine-sinistro, gabbia)
#import "pagine.typ": pagina-documentaria
#import "editoriale.typ": didascalia as stampa-didascalia, contenuto-didascalia

// Le quote descrivono soltanto l'immagine. I due testi restano nativi e la
// quota comune cresce quando uno dei due richiede più spazio del previsto.
// dimensioni conserva il rapporto del file esportato, senza deformarlo.
#let documentario-doppia(id: none, file: none, dimensioni: none,
  didascalia: [], diritti: none, alt: none,
  sinistra: [], destra: [], quota-minima: 240pt) = {
  assert(type(id) == str and id != "", message: "La doppia richiede un id univoco.")
  assert(file != none and type(dimensioni) == array and dimensioni.len() == 2,
    message: "La doppia richiede un asset e le sue due dimensioni originali.")
  assert(dimensioni.all(n => n > 0), message: "Le dimensioni della doppia devono essere positive.")
  // Il salto di pagina scarica già gli eventuali float. Un place.flush()
  // separato occuperebbe il foglio ancora vuoto fra due doppie consecutive.
  pagebreak(to: "even", weak: true)
  context {
    let larghezza = 2 * pagina-larghezza
    let altezza = larghezza * dimensioni.at(1) / dimensioni.at(0)
    let testi = (sinistra, destra)
    let altezze-testi = testi.map(testo => measure(block(width: gabbia, testo)).height)
    let quota = calc.max(quota-minima, margine-superiore + calc.max(..altezze-testi) + 16pt)
    let contenuto-caption = contenuto-didascalia(didascalia, diritti: diritti)
    let numero = counter(figure.where(kind: image)).get().first() + 1
    let prova-caption = stampa-didascalia(contenuto-caption,
      prefisso: [Figura #numbering(figure.numbering, numero)])
    let altezza-caption = measure(prova-caption, width: gabbia).height
    let quota-caption = quota + altezza + 12pt
    assert(quota-caption + altezza-caption <= fondo-gabbia,
      message: "Testo e didascalia non lasciano spazio alla figura sulla doppia pagina.")
    for lato in range(2) {
      pagina-documentaria[
        #block(width: 100%, height: 100%, above: 0pt, below: 0pt)[
          #testi.at(lato)
          #context {
            let pagina = here().page()
            assert(calc.even(pagina) == (lato == 0),
              message: "La doppia deve avere pagina pari a sinistra e dispari a destra.")
            let sinistra-pagina = margine-sinistro(pagina)
            // Il dorso ritaglia la stessa immagine a scala identica sui due
            // fogli: nessuna metà ricampionata o asset duplicato.
            place(top + left, dx: -sinistra-pagina - lato * pagina-larghezza,
              dy: quota - margine-superiore,
              box(width: larghezza, height: altezza)[
                #set align(left)
                #set block(spacing: 0pt)
                #if lato == 0 {
                  [#figure(image(file, width: larghezza, alt: alt),
                    kind: image, caption: none, placement: none)#label(id)]
                } else {
                  image(file, width: larghezza,
                    alt: "Continuazione della stessa figura sulla pagina destra.")
                }
              ])
            place(top + left, dy: quota-caption - margine-superiore,
              block(width: gabbia, above: 0pt, below: 0pt)[
                #if lato == 0 {
                  stampa-didascalia(contenuto-caption, prefisso: ref(label(id)))
                } else {
                  stampa-didascalia([#ref(label(id)) · continua dalla pagina a fronte])
                }
              ])
            [#metadata((id: id, lato: lato, pagine: 2, pagina: pagina,
              x: -lato * pagina-larghezza, y: quota,
              larghezza: larghezza, altezza: altezza,
              scala: larghezza / (dimensioni.at(0) * 1pt),
              dimensioni-fonte: dimensioni)) <booklet-documento-doppio>]
          }
        ]
      ]
    }
  }
}
