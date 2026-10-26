// Confronto di lettura sui contenuti originali di Tipografia, senza copiarli.
// I due preset si selezionano con --input lettura=12-14 oppure 11-13.5.
#import "../template/layout.typ": booklet, chapter
#import "../template/plan.typ": chapter-parameters
#import "../template/pages.typ": document-plate
#import "../template/geometry.typ": column-width
#import "../capitoli/06-tipografia.typ" as tipografia

// Il capitolo conserva ambiti ricchi annidati: il preordine APA precede i
// blocchi Storia dei caratteri, Manuzio/Griffo, Duomo e documenti di Bodoni.
// Il controllo esplicito interrompe la prova se il sorgente cambia struttura,
// invece di selezionare silenziosamente un argomento o un frammento diverso.
#assert(tipografia.content.has("children") and tipografia.content.children.len() == 5,
  message: "La struttura di Tipografia è cambiata: verificare l'estratto di lettura.")
#let sequenza = tipografia.content.children.at(3)
#assert(sequenza.has("children") and sequenza.children.len() >= 13,
  message: "I blocchi iniziali di Tipografia non sono disponibili per la prova.")
#let groups = sequenza.children
#for (index, attesi) in ((4, 68), (6, 190), (8, 113), (10, 24), (12, 24)) {
  let group = groups.at(index)
  assert(group.has("children") and group.children.len() == attesi,
    message: "È cambiato il blocco " + str(index)
      + " di Tipografia: aggiornare la selezione della prova.")
}
// Il passaggio su Jenson anticipa due figure delle sezioni successive.
// Si riusano gli elementi originali come supporto in coda, con le medesime
// etichette, didascalie e attribuzioni, senza importare la prosa successiva.
#let supporti = ((16, <fig-tipo-morris-caratteri>), (22, <fig-tipo-278a>)).map(
  ((index, id)) => {
    let group = groups.at(index)
    assert(group.has("children"),
      message: "Il gruppo della figura di supporto è cambiato.")
    let candidate = group.children.filter(item => item.func() == figure
      and item.has("label") and item.label == id)
    assert(candidate.len() == 1,
      message: "La figura di supporto " + repr(id) + " deve essere unica.")
    candidate.first()
  })
#let estratto = [
  #groups.slice(0, 13).join()
  #document-plate[
    #align(center, block(width: column-width)[
      #supporti.at(0)
      #v(18pt)
      #supporti.at(1)
    ])
  ]
]

#show: booklet
#chapter(..chapter-parameters(6), estratto)
