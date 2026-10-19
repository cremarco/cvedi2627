# Lavorare su CVeDI

## Prima delle modifiche

Leggere `PRODUCT.md` prima di creare o modificare contenuti, componenti, immagini o stili. Per il booklet leggere anche `DESIGN.md`: è il contratto editoriale esclusivo del booklet, non delle slide o del sito. Le istruzioni esplicite dell’utente hanno precedenza; un cambiamento intenzionale del sistema del booklet aggiorna anche il documento.

Per scrivere o impaginare i prossimi capitoli del booklet, applicare anche la sezione «Regole editoriali per i prossimi capitoli» di `DESIGN.md`, ricavata dai commenti Figma. Verificare insieme prosa, esempi, didascalie, fonti, ordine delle colonne e doppie pagine; una correzione ricorrente richiede un controllo dell’intero capitolo.

## Vincoli

- Conservare contenuti e attribuzioni salvo richiesta esplicita di revisione.
- Per le slide riutilizzare Slidev, daisyUI, componenti e token esistenti; nel booklet usare i componenti Figma del sistema editoriale. Mantenere la separazione fra contenuti, dati e presentazione.
- Per le slide: titoli ordinari nella posizione comune e corpo centrato; copertine metro originali e palette del set.
- Nel deck Slidev non aggiungere note del relatore né riattivare presenter, terza lezione o voci future dell’indice senza richiesta.
- Immagini senza cornici; nelle slide presentare gli esempi didattici attraverso immagini e ingrandimento condiviso.
- Conservare originali, fonti e licenze degli asset attivi. Non modificare i file CSS compilati manualmente.

## Verifica e documentazione

Per nuove slide eseguire `pnpm check:source` e `pnpm build`; scegliere i controlli browser pertinenti fra `check`, `check:layout`, `check:motion`, `check:progress` e `check:typography`. Verificare i nuovi layout su desktop, viewport stretto e stampa, con un’anteprima isolata dalle schede dell’utente.

Aggiornare i conteggi strutturali solo per inserimenti intenzionali, conservando le verifiche di contenuto, asset e accessibilità. Tenere rapporti e screenshot in `reports/` o in una cartella temporanea, senza ricreare documentazione cronologica duplicata.
