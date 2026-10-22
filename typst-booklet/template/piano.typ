// Unico resolver dei metadati editoriali per volume e anteprime.
#let dati-piano = json(path("/typst-booklet/piano.json"))
#let piano = dati-piano.capitoli
#let base-aperture = "/" + dati-piano.aperture
#let grafiche = json(path(base-aperture + "/manifest.json")).capitoli
#let composizioni-aperture = json(path(base-aperture + "/composizioni.json"))
#import "palette.typ": accento-capitolo
// Tipografia conserva un’unica bibliografia visibile, in quattro intervalli
// nativi per la disambiguazione APA; le fonti restano nei file del piano.
#import "../bibliografia/06-tipografia-gruppi.typ": gruppi-fonti as gruppi-tipografia

#let percorso-fonte(fonte) = if type(fonte) == str {
  path(if fonte.starts-with("/") { fonte } else { "/typst-booklet/" + fonte })
} else { fonte }

#let risolvi-capitolo(numero) = {
  let voce = piano.find(c => c.numero == numero)
  assert(voce != none, message: "Il capitolo " + str(numero) + " manca nel piano.")
  voce
}

#let dati-capitolo(voce, fonti: none) = {
  let grafica = grafiche.find(g => g.numero == voce.numero)
  assert(grafica != none,
    message: "La grafica del capitolo " + voce.codice + " manca nel manifest.")
  let composizione = composizioni-aperture.capitoli.find(c => c.numero == voce.numero)
  assert(composizione != none,
    message: "La composizione del capitolo " + voce.codice + " manca nei dati.")
  composizione.insert("tela", composizioni-aperture.tela)
  let sorgenti = if fonti == none { voce.fonti } else { fonti }
  let percorsi = if sorgenti == none { none }
    else if type(sorgenti) == array { sorgenti.map(percorso-fonte) }
    else { percorso-fonte(sorgenti) }
  let accento = accento-capitolo(voce.numero)
  (numero: voce.numero, titolo: voce.titolo, composizione: composizione,
    accento: accento, visuale: path(base-aperture + "/" + grafica.disegno), fonti: percorsi,
    gruppi-fonti: if voce.numero == 6 { gruppi-tipografia } else { none })
}

#let parametri-capitolo(numero, fonti: none) = dati-capitolo(
  risolvi-capitolo(numero), fonti: fonti)

// Lo stato visibile deriva dagli stessi dati che governano l'assemblaggio.
#let stato-volume() = {
  let completi = piano.filter(c => c.stato == "completo")
  let estratti = piano.filter(c => c.stato == "estratto")
  let revisione = piano.filter(c => c.stato == "in-revisione")
  let preparazione = piano.filter(c => c.file == none)
  if completi.len() == piano.len() { return [Edizione completa.] }
  let voci = ()
  if completi.len() > 0 {
    let consecutivi = completi.last().numero - completi.first().numero + 1 == completi.len()
    let codici = if completi.len() > 1 and consecutivi {
      completi.first().codice + "–" + completi.last().codice
    } else { completi.map(c => c.codice).join(", ") }
    voci.push([capitoli #codici completi])
  }
  for voce in estratti { voci.push([un estratto di #voce.titolo]) }
  for voce in revisione { voci.push([#voce.titolo in revisione]) }
  for voce in preparazione { voci.push([#voce.titolo in preparazione]) }
  [Edizione in preparazione: #voci.join([ e ]).]
}

#let avviso-importazione() = {
  let incompleti = piano.filter(c => c.stato in ("estratto", "in-preparazione"))
  let revisione = piano.filter(c => c.stato == "in-revisione")
  let avvisi = ()
  if incompleti.len() > 0 {
    let titoli = incompleti.map(c => c.titolo).join(", ", last: " e ")
    avvisi.push([L’importazione completa di #titoli è in preparazione.])
  }
  if revisione.len() > 0 {
    let titoli = revisione.map(c => c.titolo).join(", ", last: " e ")
    avvisi.push([La revisione editoriale di #titoli è in corso.])
  }
  avvisi.join([ ])
}
