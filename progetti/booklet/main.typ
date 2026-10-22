// Ingresso del volume: i testi completi restano nei singoli file di capitoli/.
#import "template/stile.typ": booklet, capitolo
#import "template/piano.typ": piano, dati-capitolo
#import "capitoli/00-frontespizio-indice.typ" as preliminari
#show: booklet

#preliminari.testo

#counter(page).update(1)
#set page(numbering: "1")

// Importare il testo evita di ripetere lo stile dell’ingresso autonomo.
#for voce in piano {
  if voce.file != none {
    import voce.file as sorgente
    capitolo(..dati-capitolo(voce), sorgente.testo)
  }
}
