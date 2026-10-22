// Ruoli granulari riusati nella stampa e nelle prove di ingombro.
// Il contenuto rimane nativo: enfasi, link e contatori appartengono al chiamante.
#let distacco-didascalia = 8pt

// Appunti e bibliografia condividono il titolo senza introdurre un heading
// nell'indice dei contenuti né un nuovo contatore di sezione.
#let titolo-apparato(corpo) = text(font: "Sora", size: 20pt, weight: 800, corpo)

#let testo-diritti(corpo) = block(above: 0pt, below: 0pt)[
  #set text(size: 8pt, style: "italic", weight: 400, variations: (opsz: 9))
  #set par(justify: false, leading: 2pt, spacing: 0pt)
  // Il ruolo è già corsivo: emph non deve riportare i nomi in tondo.
  #show emph: it => text(style: "italic", it.body)
  #corpo
]

#let contenuto-didascalia(testo, diritti: none) = [
  #testo
  #if diritti != none {
    v(4pt)
    testo-diritti(diritti)
  }
]

#let didascalia(corpo, prefisso: none) = block(width: 100%)[
  #set align(left)
  #set text(size: 9pt, weight: 300, variations: (opsz: 9))
  #set par(justify: false, leading: 1.8pt, spacing: 0pt)
  #if prefisso != none { [
    #text(weight: 500, variations: (opsz: 14))[#prefisso —] #corpo
  ] } else { corpo }
]

#let sottotitolo-lettura(corpo) = block(above: 10pt, below: 4pt, sticky: true)[
  #set par(leading: 2pt)
  #text(weight: 900, size: 14pt, variations: (opsz: 14), corpo)
]

// Ingrandimento non numerato: campioni storici e dettagli di figure conservano
// lo stesso ritmo. Il chiamante prepara il testo e gli eventuali rimandi nativi.
#let dettaglio-editoriale(titolo: [], didascalia: [], corpo) = block(breakable: false)[
  #set par(justify: false, leading: 2pt, spacing: 4pt)
  #text(size: 10pt, weight: 500)[#titolo]
  #v(4pt)
  #align(center, corpo)
  #v(4pt)
  #text(size: 9pt, weight: 300)[#didascalia]
]

// La variante compatta mantiene etichette brevi e più URL nella stessa nota.
#let nota-compatta(testo, url, etichetta: none) = {
  let urls = if type(url) == array { url } else { (url,) }
  let etichette = if etichetta == none { urls }
    else if type(etichetta) == array { etichetta } else { (etichetta,) }
  assert(urls.len() > 0 and urls.len() == etichette.len(),
    message: "Ogni URL della nota compatta richiede la propria etichetta.")
  footnote[
    #set text(font: "DM Sans 9pt", size: 7.5pt, weight: 400,
      style: "normal", variations: (opsz: 9))
    #testo — #for (indice, destinazione) in urls.enumerate() {
      if indice > 0 { [; ] }
      text(size: 7pt, link(destinazione, etichette.at(indice)))
    }
  ]
}
