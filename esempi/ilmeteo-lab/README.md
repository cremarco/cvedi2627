# iLMeteo · versione precedente e redesign

Il redesign attivo è la versione costruita dall’utente sulla copia originale. Il redesign precedente è stato rimosso dal percorso attivo e dai generatori; rimane recuperabile nella storia Git. La copia di lavoro è stata consolidata in questa cartella.

- Ingresso: `index.html` → `redesign/index.html`.
- Redesign: `redesign/index.html`, `milano.html`, `domani.html`.
- Versione precedente: le stesse pagine in `originale/`.
- Pubblicazione: `/ilmeteo/` nella build Pages; la home del corso collega il redesign.

Il pulsante laterale conserva il passaggio animato bidirezionale. Dati acquisiti l’8 ottobre 2026 per Home/Italia e il 9 ottobre per Milano. Nessun aggiornamento meteo live. Il radar del redesign usa un segnaposto illustrativo richiesto dall’utente; gli originali, le fonti, le attribuzioni e le licenze restano conservati.

## Modifica e build

Modificare gli HTML in `redesign/`, l’overlay `redesign/style.source.css` e le migliorie in `redesign/app.js`. Riutilizzare i controlli congelati condivisi. Non modificare CSS compilati né le acquisizioni grezze per cambiare il redesign.

```sh
pnpm build:ilmeteo
node esempi/ilmeteo-lab/scripts/serve.mjs
```

Il server è su `127.0.0.1:4187`; `ILMETEO_PORT` cambia la porta. La stessa lista dei file pubblici è usata dal server, da Vite e dalla build Pages. Acquisizioni grezze e script di sviluppo non vengono pubblicati.

## Verifica

```sh
node --test scripts/check/ilmeteo-publication.test.mjs
node esempi/ilmeteo-lab/scripts/check-navigation.mjs
pnpm build:pages
pnpm check:home
```

La verifica del confronto copre sei pagine su desktop e viewport stretti, passaggi nei due sensi, tastiera, stampa, movimento ridotto e assenza di JavaScript. Le prove correnti sono in `reports/ilmeteo-lab/`; le analisi storiche in `ANALISI.md` conservano il riferimento alla versione precedente. I sorgenti e manifest delle acquisizioni restano in `sources/`, `data/` e `assets/`; logo, prompt e licenze in `assets/brand/` e `assets/fonts/`, provenienza del segnaposto in `assets/placeholder-manifest.json`.
