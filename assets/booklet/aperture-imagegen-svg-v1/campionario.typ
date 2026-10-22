// Campione autonomo: usa i fondi SVG e compone titolo/numero come testo Typst.
// Titoli dal piano unico; quote e salti di riga dai dati della ricostruzione.
#let composizioni = json("composizioni.json")
#let piano = json("../../../typst-booklet/piano.json").capitoli
#let sx = 170mm / composizioni.tela.at(0)
#let sy = 240mm / composizioni.tela.at(1)
#set document(title: "CVeDI · Aperture SVG dai concept", author: "Marco Cremaschi")
#set page(width: 170mm, height: 240mm, margin: 0pt)
#set text(font: "Sora", weight: 700, fill: rgb("2E3138"),
  top-edge: 0pt, bottom-edge: 0pt, hyphenate: false)
#set par(justify: false, leading: 0pt, spacing: 0pt)

#for c in composizioni.capitoli {
  let capitolo = piano.find(p => p.numero == c.numero)
  let parole = capitolo.titolo.split(" ")
  let righe = (
    parole.slice(0, c.a_capo_dopo).join(" "),
    parole.slice(c.a_capo_dopo).join(" "),
  )
  page(background: image("disegni/" + c.nome + ".svg",
    width: 100%, height: 100%, fit: "stretch"))[
    #for (i, riga) in righe.enumerate() {
      place(top + left, dx: c.titolo.x * sx,
        dy: (c.titolo.y + i * c.titolo.interlinea) * sy,
        text(size: c.titolo.at("corpi_righe", default: (c.titolo.corpo, c.titolo.corpo)).at(i) * sx,
          tracking: c.titolo.spaziatura * sx, riga))
    }
    #place(top + left, dx: c.codice.x * sx, dy: c.codice.y * sy,
      text(size: c.codice.corpo * sx, tracking: c.codice.spaziatura * sx,
        fill: rgb(c.codice.at("colore", default: "#2E3138")), capitolo.codice))
  ]
}
