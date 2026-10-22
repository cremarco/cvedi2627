// Due aperture in cui il titolo e il numero dimostrano il tema del capitolo.
// Il testo arriva dal chiamante: cambiando titolo o numero si aggiorna il PDF.
#let apertura-lettere-griglia(tema, numero, titolo) = {
  assert(tema in (11, 12), message: "Questa variante copre i temi originali 11–12.")
  // Le due cifre del nuovo numero mantengono i pesi e i moduli approvati.
  let cifre = ("0" + str(numero)).clusters()
  if tema == 11 {
    // Tipografia: titolo arioso e due pesi della stessa famiglia nel numero.
    // La grande lettera sullo sfondo è il contorno autentico di Sora Bold.
    show heading.where(level: 1): it => block(above: 0pt, below: 0pt)[
      #text(size: 38pt, weight: 400, tracking: 2.2pt, upper(it.body))
    ]
    heading(level: 1, titolo)
    v(1fr)
    align(right)[
      #set par(leading: 0pt)
      #text(size: 180pt, weight: 400, cifre.at(0))#h(8pt)#text(size: 180pt, weight: 800, cifre.at(1))
    ]
    v(22mm)
  } else {
    // Griglia: il titolo occupa un campo stretto, le cifre due moduli uguali.
    // Righe, colonne e allineamenti sono elementi Typst, non testo nell'SVG.
    show heading.where(level: 1): it => block(width: 170pt, above: 0pt, below: 0pt)[
      #text(size: 47pt, weight: 700, it.body)
    ]
    pad(left: 12mm)[#heading(level: 1, titolo)]
    v(1fr)
    grid(columns: (1fr, 1fr), gutter: 5mm, align: center + bottom,
      text(size: 192pt, weight: 700, cifre.at(0)),
      text(size: 192pt, weight: 700, cifre.at(1)))
    v(26mm)
  }
}
