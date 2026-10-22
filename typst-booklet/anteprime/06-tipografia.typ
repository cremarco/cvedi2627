// Anteprima isolata dello stesso capitolo incluso nel volume.
#import "../template/stile.typ": booklet, capitolo
#import "../template/piano.typ": parametri-capitolo
#show: booklet
#capitolo(..parametri-capitolo(6))[
  #include "../capitoli/06-tipografia.typ"
]
