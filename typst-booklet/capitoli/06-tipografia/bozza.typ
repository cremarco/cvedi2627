// Montaggio del capitolo: i paragrafi restano nei file tematici sottostanti.
// Preordine nativo necessario alla compatibilità APA di Typst 0.15.1.
#import "../../bibliografia/06-tipografia-gruppi.typ": preordine-fonti
#for chiave in preordine-fonti [#cite(chiave, form: none)

]

#include "storia-iniziale.typ"
#include "manuzio.typ"
#include "firenze-e-settecento.typ"
#include "documenti-settecento.typ"
#include "legno-e-manifesti.typ"
#include "linotype-e-morris.typ"
#include "avanguardie-e-digitale.typ"
#include "anatomia.typ"
#include "font.typ"
#include "classificazioni.typ"
#include "relazioni.typ"
#include "esempi.typ"
#include "leggibilita.typ"
#include "consigli.typ"
#include "web.typ"
