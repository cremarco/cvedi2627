// Prova di trasposizione delle pagine Figma 360, 361 e 413.
// Testi e stili sono dati separati; le illustrazioni restano asset originali.
// Le coordinate riproducono questa composizione: non è un template a flusso libero.
#let pagine = json("testo-stili.json")
#let accento = rgb("#AFC7E8")
#set document(title: "Tipografia — prova di pagine complesse", author: "CVeDI")
#set page(width: 481.89pt, height: 680.315pt, margin: 0pt)
#set text(font: "DM Sans 9pt", lang: "it", fill: rgb("#2E3138"), top-edge: 0.9em, bottom-edge: 0.1em)
#set par(leading: 0pt, spacing: 0pt, justify: false)

#let colore(c) = rgb(c.r * 100%, c.g * 100%, c.b * 100%)
#let peso(stile) = {
  if stile.contains("Black") { 900 }
  else if stile.contains("ExtraBold") { 800 }
  else if stile.contains("SemiBold") { 600 }
  else if stile.contains("Bold") { 700 }
  else if stile.contains("Medium") { 500 }
  else if stile.contains("Light") { 300 }
  else { 400 }
}

// La posizione è relativa alla pagina, in punti di stampa.
#let colloca(x, y, contenuto) = place(top + left, dx: x * 1pt, dy: y * 1pt, contenuto)
#let illustrazione(file, x, y, w, h) = colloca(x, y,
  image(path("/assets/archivio/typst/figure/" + file),
    width: w * 1pt, height: h * 1pt, fit: "contain"))

#let testo(n) = {
  let allineamento = if n.align == "CENTER" { center } else if n.align == "RIGHT" { right } else { left }
  colloca(n.x, n.y, block(width: n.w * 1pt)[
    #set align(allineamento)
    #set text(size: n.runs.first().z * 1pt)
    #set par(leading: (n.lh.at("value", default: 14) - n.runs.first().z) * 1pt)
    #for r in n.runs {
      let parte = text(
        font: if r.f == "DM Sans" { "DM Sans 9pt" } else { r.f },
        size: r.z * 1pt,
        weight: peso(r.s),
        style: if r.s.contains("Italic") { "italic" } else { "normal" },
        fill: colore(r.c),
        r.t,
      )
      if r.at("u", default: none) != none { link(r.u, parte) } else { parte }
    }
  ])
}

#for (i, pagina) in pagine.enumerate() {
  if i > 0 { pagebreak() }
  // Una pagina contenitore ritaglia anche le immagini che arrivano al vivo.
  block(width: 481.89pt, height: 680.315pt, clip: true)[
    #let folio-x = if i == 0 { 42.52 } else { 407.371 }
    #colloca(folio-x, 639.465, rect(width: 32pt, height: 22pt, fill: accento, stroke: none))
    #if i == 0 {
      illustrazione("anatomia-tipografica-quote.svg", 42.52, 412, 388.35, 181.23)
    } else if i == 1 {
      illustrazione("anatomia-tipografica-dettagli.svg", 51.02, 412, 388.35, 181.23)
    } else {
      illustrazione("langosteria-cba-editoriale.png", -238, 0, 476, 359.098)
      colloca(192.195, 420, box(width: 106pt, height: 106pt, radius: 53pt, clip: true)[
        #image(path("/assets/archivio/typst/figure/langosteria-cba-monogramma.png"),
          width: 106pt, height: 106pt)
      ])
      illustrazione("langosteria-cba-logotipo.png", 252.28, 552, 187.09, 23.193)
    }
    #for n in pagina.nodes { testo(n) }
  ]
}
