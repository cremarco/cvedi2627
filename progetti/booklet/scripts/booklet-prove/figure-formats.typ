// Each figure declares its type in executable chapter-style source.
#import "/progetti/booklet/template/layout.typ": booklet
#import "/progetti/booklet/template/geometry.typ": page-margins, body-bottom-margin
#import "/progetti/booklet/template/figures.typ": image-figure
#show: booklet
#set page(margin: page-margins(bottom: body-bottom-margin))
#let file = path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg")

I richiami conservano contatori e destinazioni:
@prova-colonna; @prova-gabbia; @prova-pagina; @prova-vivo.

#image-figure(file, [Immagine su una colonna.], format: "una-colonna",
  id: "prova-colonna", height: 70mm, alt: "Campione su una colonna.",
  rights: [Diritti della prova.])
#image-figure(file, [Immagine sulle due colonne.], format: "due-colonne",
  id: "prova-gabbia", height: 70mm, alt: "Campione su due colonne.")
#image-figure(file, [Immagine su un foglio dedicato con margini.], format: "tutta-pagina",
  id: "prova-pagina", alt: "Campione a tutta pagina.")
#image-figure(file, [Immagine fino ai quattro bordi.], format: "al-vivo",
  id: "prova-vivo", alt: "Campione al vivo.")

#for n in range(12) {
  [Passaggio #n. La prosa segue il proprio ordine nelle colonne native.
  L’immagine, la didascalia e i diritti restano uniti e conservano il progressivo.]
  parbreak()
}
