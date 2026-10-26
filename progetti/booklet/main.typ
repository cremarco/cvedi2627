// Volume entry point: complete chapter content stays in capitoli/.
#import "template/layout.typ": booklet, chapter
#import "template/plan.typ": resolve-chapter, chapter-options
#import "capitoli/00-frontespizio-indice.typ" as front-matter
#show: booklet

#front-matter.content

#counter(page).update(1)
#set page(numbering: "1")

// Import content without applying the standalone chapter entry style twice.
#let include-chapter(number) = {
  let entry = resolve-chapter(number)
  import entry.file as source
  chapter(..chapter-options(entry), source.content)
}

// Uncomment only the chapters to include in the volume.
// #include-chapter(1) // Storia del design visivo
// #include-chapter(2) // Ricerca, persone e culture
// #include-chapter(3) // Accessibilità e inclusione
// #include-chapter(4) // Percezione e Gestalt
// #include-chapter(5) // Colore e significato
// #include-chapter(6) // Tipografia e lettura
// #include-chapter(7) // Griglie e layout
#include-chapter(8) // Composizione e gerarchia visiva
