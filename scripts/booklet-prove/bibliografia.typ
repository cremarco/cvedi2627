// Dati fittizi di regressione, distinti dalle fonti dei capitoli.
#import "/typst-booklet/template/stile.typ": booklet
#import "/typst-booklet/template/bibliografia.typ": bibliografia-apa
#show: booklet
#set page(columns: 1, footer: none)

Senza data A @apa-a.

Senza data B @apa-b.

Solo anno @apa-anno.

Data completa @apa-completa.

#bibliografia-apa(path("/scripts/booklet-prove/bibliografia.bib"))
