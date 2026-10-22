// Contratto comune delle sagome: coordinate alpha normalizzate, senza rispetto.
// Il distacco dal testo viene applicato dai componenti dopo la scala in punti.
// La verifica Python riconcilia anche hash e pixel con l'originale; questi controlli
// proteggono invece l'anteprima Typst, che può essere aperta senza il runner.
#let fasce-profilo(profilo) = {
  assert(type(profilo) == dictionary
    and profilo.at("schema", default: none) == "cvedi-alpha-profile/v1",
    message: "Generare il profilo con scripts/contorni.py e caricarlo con json(path(...)).")
  for chiave in ("larghezza_px", "altezza_px") {
    let valore = profilo.at(chiave, default: none)
    assert(type(valore) == int and valore > 0,
      message: "Il profilo alpha richiede dimensioni intere positive: " + chiave + ".")
  }
  let fasce = profilo.at("fasce", default: none)
  assert(type(fasce) == array and fasce.len() >= 8
    and fasce.len() <= calc.min(512, profilo.altezza_px),
    message: "Il profilo alpha richiede da 8 a 512 fasce, non più delle righe dell'immagine.")
  for fascia in fasce {
    assert(fascia == none or (type(fascia) == array and fascia.len() == 2
      and fascia.all(v => type(v) in (int, float))
      and 0 <= fascia.first() and fascia.first() < fascia.last() and fascia.last() <= 1),
      message: "Ogni fascia alpha deve essere none oppure un intervallo crescente fra 0 e 1.")
  }
  assert(fasce.any(f => f != none), message: "Il profilo alpha non contiene pixel visibili.")
  fasce
}

// I contorni Meander possono interrogare anche l'estremo inferiore y = 1.
// In quel caso appartiene ancora all'ultima fascia, senza uscire dall'array.
#let fascia-a-quota(fasce, y) = fasce.at(
  calc.min(fasce.len() - 1, int(calc.floor(y * fasce.len()))))

#let bordo-alpha-sinistro(fasce) = calc.min(
  ..fasce.filter(f => f != none).map(f => f.first()))
