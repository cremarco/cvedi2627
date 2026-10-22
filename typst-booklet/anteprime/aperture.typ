// Campionario delle sei lezioni: numero e titolo arrivano dal piano attivo.
// Grafica, colore e composizione conservano il tema originale già approvato.
#import "../template/stile.typ": booklet, colore-capitolo
#import "../template/aperture/apertura.typ": apertura
#import "../template/piano.typ": piano, dati-capitolo
#show: booklet

#set document(title: "CVeDI · Proposta di aperture SVG")
#assert(piano.len() == 6, message: "Il campionario richiede le sei lezioni del piano.")

// Il ciclo riguarda soltanto i dati delle copertine; la prosa dei capitoli
// resta nei file capitoli/*.typ e non viene suddivisa dal codice.
#for capitolo in piano {
  let dati = dati-capitolo(capitolo)
  colore-capitolo.update(dati.accento)
  // L'apertura incrementa il contatore nativo del titolo di capitolo.
  counter(heading).update((capitolo.numero - 1, 0, 0))
  apertura(numero: capitolo.numero, tema: capitolo.apertura_originale,
    titolo: dati.titolo, accento: dati.accento, visuale: dati.visuale)
}
