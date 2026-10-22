// Estratto del capitolo Griglia corrente; non importa la vecchia impostazione metro.
// I paragrafi restano testo nativo; la figura documentaria è un asset condiviso.
#import path("/typst-booklet/template/stile.typ"): sito, immagine

== Dallo spazio alla struttura

Un titolo, una fotografia e un testo occupano lo stesso foglio, ma non hanno lo stesso compito. Per comporli bisogna decidere dove inizia la lettura, quali elementi appartengono allo stesso gruppo e dove lasciare una pausa.

La griglia rende esplicite queste relazioni. Stabilisce riferimenti comuni ai quali agganciare contenuti diversi: margini, allineamenti, intervalli, colonne e quote orizzontali.

=== Griglia, layout e gerarchia

La griglia descrive possibilità di collocazione; il layout è la disposizione concreta di una pagina. Una struttura a sei colonne può accogliere un’immagine larga tre colonne oppure una figura larga quattro. Non impone che ogni elemento occupi una singola cella.

La gerarchia stabilisce invece le priorità fra i contenuti. Dimensione, peso, posizione, contrasto e distanza contribuiscono a distinguere un titolo da una nota. Un allineamento perfetto non risolve una pagina in cui tutti i contenuti chiedono la stessa attenzione.

=== Un sistema per contenuti diversi

// Questo raccordo cita la fonte primaria verificata del sistema Unigrid.
Il sistema Unigrid del National Park Service organizza brochure dedicate a luoghi diversi attraverso una struttura comune. Il progetto di _Massimo Vignelli_ e _Vincent Gleason_, avviato nel 1977, viene applicato alla prima brochure nel 1978 @nps2023. La @fig-unigrid mostra il documento dedicato al Clara Barton National Historic Site.#sito([National Park Service, «A Brief History of the Unigrid».], "https://www.nps.gov/subjects/hfc/a-brief-history-of-the-unigrid.htm")

#immagine(path("/assets/images/figure/griglia/unigrid-clara-barton-brochure.jpg"),
  [Brochure Unigrid del Clara Barton National Historic Site, 1978.],
  diritti: [Immagine: National Park Service, Harpers Ferry Center.],
  alt: "Brochure del Clara Barton National Historic Site, sistema Unigrid.") <fig-unigrid>
