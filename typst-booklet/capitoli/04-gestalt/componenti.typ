// Tavole dei principi percettivi: ogni pannello conserva figura, numero e diritti propri.
// Il contenitore comune regola la scala senza aggiungere un secondo contatore.
#import "../../template/editoriale.typ": contenuto-didascalia, didascalia as componi-didascalia

// Prosa corrente Figma, riletta il 21 ottobre 2026. Flusso continuo; riferimenti nativi.
// Le tavole Gestalt avevano margini: nessuna visuale viene portata al vivo.
// Il contenitore mobile non è una figura e non incrementa il contatore.
#import "../../template/geometria.typ": spazio-note, distacco-note, gabbia, altezza-gabbia
#let tavola-gestalt(elementi, note: []) = {
  place.flush()
  let altezza = altezza-gabbia - spazio-note - distacco-note - 1pt
  let larghezza = gabbia
  place(top, scope: "parent", float: true, clearance: 0pt)[
    #layout(spazio => context {
      let caption(elemento) = contenuto-didascalia(elemento.didascalia,
        diritti: elemento.diritti)
      // La tavola non incrementa il contatore: ogni pannello è una figura nativa.
      // Il numero misurato segue lo stesso ordine logico, anche quando il float si sposta.
      let precedente = counter(figure.where(kind: image)).get().first()
      let didascalie = elementi.enumerate().map(((indice, elemento)) => measure(
        componi-didascalia(caption(elemento),
          prefisso: [Figura #numbering(figure.numbering, precedente + indice + 1)]),
        width: larghezza).height)
      let intervallo = 14pt
      let ha-note = note != []
      let altezza-note = if ha-note { 20pt } else { 0pt }
      let area-visuale = (altezza - didascalie.sum()
        - 8pt * elementi.len() - intervallo * (elementi.len() - 1) - altezza-note)
      let massima-larghezza = calc.max(..elementi.map(e => e.larghezza-fonte))
      let somma-altezze = elementi.map(e => e.larghezza-fonte / e.rapporto).sum()
      let scala = calc.min(larghezza / massima-larghezza, area-visuale / somma-altezze)
      assert(scala > 0pt, message: "La tavola Gestalt non lascia spazio alle immagini.")
      let pannelli = elementi.map(elemento => [
        #figure(
          align(center, image(elemento.file,
            width: elemento.larghezza-fonte * scala, alt: elemento.alt)),
          kind: image, supplement: [Figura], placement: none,
          caption: caption(elemento),
        )#elemento.etichetta
      ])
      block(width: larghezza, height: altezza, above: 0pt, below: 0pt)[
        #set block(spacing: 0pt)
        #align(horizon + center)[
          #stack(dir: ttb, spacing: intervallo, ..pannelli)
          #if ha-note {
            v(6pt)
            block(height: 14pt, above: 0pt, below: 0pt)[
              #set text(size: 12pt, weight: 400, style: "normal", variations: (opsz: 18))
              #set par(justify: false, leading: 2pt, spacing: 0pt)
              #note
            ]
          }
        ]
      ]
    })
  ]
}
