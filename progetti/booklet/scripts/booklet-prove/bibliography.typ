// Dati fittizi di regressione, distinti dalle fonti dei capitoli.
#import "/progetti/booklet/template/layout.typ": booklet
#import "/progetti/booklet/template/bibliography.typ": apa-bibliography
#show: booklet
#set page(columns: 1, footer: none)

Senza data A @apa-a.

Senza data B @apa-b.

Solo anno @apa-anno.

Data completa @apa-completa.

#apa-bibliography(path("/progetti/booklet/scripts/booklet-prove/bibliografia.bib"))
