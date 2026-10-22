// Composizioni native dei temi originali 1–6, indipendenti dal nuovo numero.
// Il chiamante prepara pagina, sfondo SVG, colore del folio e una gabbia
// di circa 137 × 205 mm: block(width: 100%, height: 100%)[...].
// Qui cambiano soltanto posizione, corpo e peso di titolo e numero.
// Nessun titolo è riscritto: la stessa funzione accetta stringhe o contenuto.
#import "../geometria.typ": inchiostro

// Un solo heading visibile conserva titolo, indice e segnalibro nativi.
// La regola locale modifica la presentazione di it.body, non il suo contenuto.
#let titolo-primi(titolo, corpo: 47pt, peso: 700, larghezza: 100%, allineamento: left) = {
  show heading.where(level: 1): it => block(width: larghezza, above: 0pt, below: 0pt)[
    #set align(allineamento)
    #set text(font: "Sora", size: corpo, weight: peso, fill: inchiostro,
      hyphenate: false, top-edge: 0.9em, bottom-edge: 0.1em)
    #set par(justify: false, leading: -5pt, spacing: 0pt)
    #it.body
  ]
  heading(level: 1, titolo)
}

// Tutte le aperture attive mostrano due cifre, da 01 a 06.
// Tutte le cifre derivano dal numero passato: non ci sono numeri duplicati a mano.
#let numero-primi(numero, corpo: 200pt, peso: 700, spaziatura: 0pt) = {
  let codice = "0" + str(numero)
  text(font: "Sora", size: corpo, weight: peso, fill: inchiostro,
    tracking: spaziatura, top-edge: 0.9em, bottom-edge: 0.1em, codice)
}

// Introduzione: due segni essenziali e separati. Il numero apre in alto
// a destra; il titolo chiude la pagina a sinistra, con molto spazio fra i due.
#let introduzione-primi(numero, titolo) = [
  #align(right)[#numero-primi(numero, corpo: 220pt)]
  #v(1fr)
  #titolo-primi(titolo, corpo: 48pt)
  #v(15mm)
]

// Storia: due livelli sfalsati, come una stratificazione. Titolo raccolto
// in alto a destra e codice cronologico più leggero in basso a sinistra.
#let storia-primi(numero, titolo) = [
  #v(4mm)
  #align(right)[#titolo-primi(titolo, corpo: 44pt, larghezza: 82%)]
  #v(1fr)
  #numero-primi(numero, corpo: 146pt, peso: 400, spaziatura: 6pt)
  #v(15mm)
]

// Processo UX: due colonne con tempi diversi. Il numero parte prima,
// mentre il titolo scende nella seconda colonna e conserva tutte le parole.
#let processo-primi(numero, titolo) = [
  #v(1fr)
  #grid(columns: (38%, 1fr), column-gutter: 8mm,
    [#numero-primi(numero, corpo: 104pt, peso: 800)],
    [
      #v(44mm)
      #titolo-primi(titolo, corpo: 36pt)
    ],
  )
  #v(1fr)
]

// Ricerca: simmetria e punti di vista. Titolo e numero condividono l'asse
// centrale ma restano distanti; il titolo lungo usa tutta la giustezza.
#let ricerca-primi(numero, titolo) = [
  #v(20mm)
  #titolo-primi(titolo, corpo: 41pt, peso: 600, allineamento: center)
  #v(1fr)
  #align(center)[#numero-primi(numero, corpo: 150pt, peso: 500)]
  #v(18mm)
]

// Accessibilità: apertura e lettura immediata. Il titolo mantiene una riga
// ampia e il nome completo; il numero è distante e lascia libero l'ingresso.
#let accessibilita-primi(numero, titolo) = [
  #v(1fr)
  #titolo-primi(titolo, corpo: 47pt)
  #v(16mm)
  #align(right)[#numero-primi(numero, corpo: 180pt, peso: 500)]
  #v(6mm)
]

// Define: convergenza verso un fuoco unico. Numero e titolo formano un gruppo
// centrale compatto; il titolo è più marcato e ha una giustezza raccolta.
#let define-primi(numero, titolo) = [
  #v(1fr)
  #align(center)[#numero-primi(numero, corpo: 210pt)]
  #v(5mm)
  #align(center)[#titolo-primi(titolo, corpo: 52pt, peso: 800,
    larghezza: 70%, allineamento: center)]
  #v(1fr)
]

// API pubblica: restituisce solo il contenuto della gabbia del wrapper.
// Sfondo e pagina restano responsabilità del template comune.
#let apertura-primi(tema, numero, titolo) = {
  assert(type(tema) == int and tema >= 1 and tema <= 6,
    message: "apertura-primi gestisce soltanto i temi originali da 1 a 6.")
  set text(font: "Sora", fill: inchiostro, hyphenate: false)
  set par(justify: false, spacing: 0pt)

  if tema == 1 { introduzione-primi(numero, titolo) }
  else if tema == 2 { storia-primi(numero, titolo) }
  else if tema == 3 { processo-primi(numero, titolo) }
  else if tema == 4 { ricerca-primi(numero, titolo) }
  else if tema == 5 { accessibilita-primi(numero, titolo) }
  else { define-primi(numero, titolo) }
}
