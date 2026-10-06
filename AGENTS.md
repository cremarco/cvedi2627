# Lavorare su CVeDI

## Prima delle modifiche

Leggere `DESIGN.md` e `PRODUCT.md` prima di creare o modificare slide, componenti, immagini o stili. `DESIGN.md` è il riferimento unico del sistema grafico. Le istruzioni esplicite dell’utente hanno precedenza; un cambiamento intenzionale del sistema aggiorna anche il documento.

## Vincoli

- Conservare contenuti e attribuzioni salvo richiesta esplicita di revisione.
- Riutilizzare Slidev, daisyUI, componenti e token esistenti; mantenere la separazione fra contenuti, dati e presentazione.
- Titoli ordinari nella posizione comune e corpo centrato; copertine metro originali e palette del set.
- Non aggiungere note del relatore né riattivare presenter, terza lezione o voci future dell’indice senza richiesta.
- Immagini senza cornici; esempi didattici attraverso immagini e ingrandimento condiviso.
- Conservare originali, fonti e licenze degli asset attivi. Non modificare i file CSS compilati manualmente.

## Verifica e documentazione

Per nuove slide eseguire `pnpm check:source` e `pnpm build`; scegliere i controlli browser pertinenti fra `check`, `check:layout`, `check:motion`, `check:progress` e `check:typography`. Verificare i nuovi layout su desktop, viewport stretto e stampa, con un’anteprima isolata dalle schede dell’utente.

Aggiornare i conteggi strutturali solo per inserimenti intenzionali, conservando le verifiche di contenuto, asset e accessibilità. Tenere rapporti e screenshot in `reports/` o in una cartella temporanea, senza ricreare documentazione cronologica duplicata.
