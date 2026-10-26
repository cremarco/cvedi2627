// Campionario dei capitoli attivi: numero e titolo arrivano dal piano.
// Fondi e quote provengono dalla serie SVG approvata, condivisa con il volume.
#import "../template/layout.typ": booklet, chapter-color, chapter-opening
#import "../template/plan.typ": plan, chapter-options
#show: booklet

#set document(title: "CVeDI · Aperture dei capitoli")
#assert(plan.len() > 0, message: "Il campionario richiede almeno un capitolo nel piano.")

// Il ciclo riguarda soltanto i dati delle copertine; la prosa dei capitoli
// resta nei file capitoli/*.typ e non viene suddivisa dal codice.
#for chapter in plan {
  let data = chapter-options(chapter)
  chapter-color.update(data.accent)
  // L'apertura incrementa il contatore nativo del titolo di capitolo.
  counter(heading).update((chapter.numero - 1, 0, 0))
  chapter-opening(number: chapter.numero, title: data.title,
    composition: data.composition, visual: data.visual)
}
