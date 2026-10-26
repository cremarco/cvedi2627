// Campionario dei capitoli attivi: numero e titolo arrivano dal piano.
// Fondi e quote provengono dalla serie SVG approvata, condivisa con il volume.
#import "../template/stile.typ": booklet, colore-capitolo
#import "../template/aperture/apertura.typ": apertura
#import "../template/piano.typ": piano, dati-capitolo
#show: booklet

#set document(title: "CVeDI · Aperture dei capitoli")
#assert(piano.len() > 0, message: "Il campionario richiede almeno un capitolo nel piano.")

// Il ciclo riguarda soltanto i dati delle copertine; la prosa dei capitoli
// resta nei file capitoli/*.typ e non viene suddivisa dal codice.
#for capitolo in piano {
  let dati = dati-capitolo(capitolo)
  colore-capitolo.update(dati.accento)
  // L'apertura incrementa il contatore nativo del titolo di capitolo.
  counter(heading).update((capitolo.numero - 1, 0, 0))
  apertura(numero: capitolo.numero, titolo: dati.titolo,
    composizione: dati.composizione, visuale: dati.visuale)
}
