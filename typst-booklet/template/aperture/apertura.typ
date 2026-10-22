// Apertura attiva: fondo SVG senza testo, titolo e numero Typst modificabili.
// Quote condivise con i sette esecutivi SVG approvati, su tela 1055 × 1491.
#import "../geometria.typ": inchiostro, pagina-larghezza, pagina-altezza

#let apertura(numero: 1, titolo: "", composizione: none, visuale: none) = {
  assert(type(numero) == int and numero >= 1,
    message: "Indicare un numero di capitolo intero positivo.")
  assert(type(titolo) == str and titolo.len() > 0,
    message: "Il titolo completo deve provenire dal piano editoriale.")
  assert(composizione != none and composizione.numero == numero,
    message: "Indicare la composizione approvata per questo capitolo.")
  assert(visuale != none, message: "Indicare il fondo SVG senza testi editoriali.")
  let sx = pagina-larghezza / composizione.tela.at(0)
  let sy = pagina-altezza / composizione.tela.at(1)
  let t = composizione.titolo
  let n = composizione.codice
  let parole = titolo.split(" ")
  let salto = composizione.a_capo_dopo
  let righe = (parole.slice(0, salto).join(" "), parole.slice(salto).join(" "))

  // La sola apertura usa coordinate dell'intero foglio e omette il folio.
  // Il corpo successivo conserva gabbia speculare, colonne e numerazione.
  page(columns: 1, margin: 0pt, header: none, footer: none,
    background: image(visuale, width: 100%, height: 100%, fit: "stretch"))[
    #set text(font: "Sora", weight: 700, fill: inchiostro,
      hyphenate: false, top-edge: 0pt, bottom-edge: 0pt)
    #set par(justify: false, leading: 0pt, spacing: 0pt)
    #set heading(numbering: n => if n < 10 { "0" + str(n) } else { str(n) })
    // Un solo heading mantiene il titolo continuo nell'indice e nei segnalibri.
    // La regola locale ne dispone le due righe, ancora come testo nativo.
    #show heading.where(level: 1): it => {
      for (i, riga) in righe.enumerate() {
        place(top + left, dx: t.x * sx, dy: (t.y + i * t.interlinea) * sy,
          text(size: t.at("corpi_righe", default: (t.corpo, t.corpo)).at(i) * sx,
            tracking: t.spaziatura * sx, riga))
      }
    }
    #metadata((numero: numero, titolo: titolo, serie: composizione.nome)) <booklet-apertura>
    #heading(level: 1, titolo)
    #place(top + left, dx: n.x * sx, dy: n.y * sy,
      text(size: n.corpo * sx, tracking: n.spaziatura * sx,
        fill: rgb(n.at("colore", default: "#2E3138")),
        if numero < 10 { "0" + str(numero) } else { str(numero) }))
  ]
}
