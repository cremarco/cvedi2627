// L'apparato resta nativo: Typst genera testi APA, ordinamento e collegamenti.
// gruppi è facoltativo e serve solo ai capitoli con molte coorti autore–anno.
// Hayagriva 0.10.1, incluso in Typst 0.15.1, disambigua al massimo tre coorti
// per bibliografia: https://github.com/typst/hayagriva/issues/507
// I gruppi sono intervalli alfabetici contigui, stampati senza altri titoli.
// Ogni intervallo attuale contiene anche opere datate già citate nel capitolo:
// una lista interamente senza date incontra inoltre il difetto #530.
// Non aggiungere opere o date fittizie per aggirare i difetti del motore.
#import "editoriale.typ": titolo-apparato

// Valida la partizione prima di costruire i selettori. Una chiave ripetuta
// verrebbe assegnata silenziosamente alla prima bibliografia compatibile;
// un intervallo vuoto produrrebbe invece target: none, non ammesso da Typst.
#let valida-gruppi(gruppi) = {
  assert(type(gruppi) == array and gruppi.len() > 0,
    message: "La bibliografia suddivisa richiede almeno un gruppo di chiavi.")
  let chiavi = ()
  for gruppo in gruppi {
    assert(type(gruppo) == array and gruppo.len() > 0,
      message: "Ogni gruppo bibliografico richiede almeno una chiave.")
    for chiave in gruppo {
      assert(type(chiave) == label,
        message: "I gruppi bibliografici contengono soltanto etichette di citazione.")
      assert(not (chiave in chiavi),
        message: "Chiave bibliografica ripetuta nei gruppi: " + repr(chiave))
      chiavi.push(chiave)
    }
  }
}

#let bibliografia-apa(fonti, gruppi: none) = {
  if gruppi != none { valida-gruppi(gruppi) }
  // Il motore aggiunge una virgola a certe date con il solo anno (difetto #246).
  // La regola documentata di Typst corregge soltanto quella punteggiatura
  // nell'apparato: non aggiunge giorno/mese e non riscrive i dati delle fonti.
  show regex("\\([0-9]{4}[a-z]*,\\)"): it => it.text.replace(",)", ")")
  // Una bibliografia editoriale può essere composta da più parti native.
  // Il controllo verifica entrambi i conteggi, senza scambiarli per capitoli.
  [#metadata((parti: if gruppi == none { 1 } else { gruppi.len() })) <booklet-bibliografia>]
  if gruppi == none {
    bibliography(fonti, title: none, style: "apa")
  } else {
    for gruppo in gruppi {
      // Ogni citazione appartiene a un solo intervallo. I file di fonti
      // restano quelli originali: nessun autore, data o titolo è riscritto.
      let bersaglio = gruppo.map(k => selector(cite.where(key: k)))
        .fold(none, (a, b) => if a == none { b } else { a.or(b) })
      bibliography(fonti, title: none, style: "apa", group: none,
        target: bersaglio)
    }
  }
}

// L'apparato usa tutta la gabbia ordinaria, fuori dalla fascia delle note.
// Typst mantiene l'ordinamento APA e assegna ogni citazione alla sua fonte.
#let pagina-bibliografia(fonti, gruppi: none) = page(columns: 1)[
  #set text(size: 8pt, weight: 400, variations: (opsz: 9))
  #set par(justify: false, leading: 2pt, spacing: 8pt)
  #titolo-apparato[Bibliografia]
  #v(18pt)
  #bibliografia-apa(fonti, gruppi: gruppi)
]
