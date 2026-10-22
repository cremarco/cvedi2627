# Struttura del progetto

Il repository contiene cinque progetti con strumenti e risorse proprie. Tutti i comandi `pnpm` si eseguono dalla radice, usando un unico `package.json` e un unico lockfile.

```text
progetti/
├── home/                 # Ingresso del corso, metro e navigazione
│   └── scripts/          # Build e controlli della home
├── slide/                # Presentazioni ed esercitazioni Slidev
│   ├── slides.md
│   ├── lezioni/
│   ├── esercitazioni/
│   ├── components/       # Componenti Vue, layout e interazioni
│   ├── data/             # Registri e specifiche didattiche
│   ├── styles/           # Tema, strutture e CSS compilato
│   ├── public/           # Risorse web e mirror generati
│   ├── assets/           # Originali e risorse esclusive
│   ├── docs/
│   ├── scripts/
│   └── dist/             # Build generata
├── booklet/              # Volume e capitoli Typst
│   ├── DESIGN.md         # Contratto editoriale esclusivo
│   ├── main.typ
│   ├── piano.json
│   ├── capitoli/
│   ├── template/
│   ├── bibliografia/
│   ├── anteprime/
│   ├── esperimenti/
│   ├── assets/           # Aperture, prove e archivio esclusivi
│   ├── scripts/
│   └── build/            # PDF e anteprime generati
├── caffe-ttc/            # Quattro pagine e 21 stili del sito
│   ├── assets/
│   ├── styles/
│   └── scripts/
└── ilmeteo/              # Sito acquisito e versione riprogettata
    ├── originale/
    ├── redesign/
    ├── assets/
    ├── data/
    ├── sources/
    ├── archive/
    └── scripts/
risorse-condivise/
├── immagini/             # Figure canoniche e manifest
├── font/                 # Font originali, licenze e provenienza
├── dati/                 # Contorni, didascalie e registri comuni
├── metro/                # Tracciati condivisi da home e slide
├── stili/tokens.css      # Token cromatici comuni
└── fonti/                # Sorgenti riutilizzate e importazioni
materiali/                # Materiali didattici e fonti storiche
scripts/                  # Preparazione e controlli trasversali
├── build/                # Asset comuni, Pages e indicizzazione
├── check/                # Controlli trasversali
├── lib/                  # Utilità usate da più progetti
└── optimize/             # Strumenti comuni per le immagini
docs/                     # Guide generali del repository
reports/                  # Rapporti ed evidenze di verifica
_site/                    # Pubblicazione complessiva generata
```

## Dove modificare i file

Contenuti, dati e presentazione rimangono distinti dentro ogni progetto. Le esercitazioni condividono l’infrastruttura Slidev; Caffè TTC e iLMeteo sono siti autonomi. Gli originali esclusivi e i relativi manifest stanno in `assets/` nel rispettivo progetto. Una risorsa riutilizzata si conserva in `risorse-condivise/`, insieme a fonti, licenze e attribuzioni. I font specifici dei siti restano nei siti.

La sorgente dei token comuni a home e slide è `risorse-condivise/stili/tokens.css`; componenti e regole di impaginazione appartengono ai rispettivi progetti. Non modificare a mano i CSS compilati. Il [catalogo delle risorse comuni](../risorse-condivise/README.md) documenta immagini, font, dati e fonti. Per le slide leggere il [contratto visivo](../progetti/slide/docs/slidev/design.md) e la [guida dei set](../progetti/slide/docs/design-slidev.md); per il booklet leggere il [contratto editoriale](../progetti/booklet/DESIGN.md).

`materiali/` conserva i documenti didattici e le fonti storiche. Gli archivi dei singoli progetti mantengono versioni precedenti, prompt e prove che documentano le scelte: l’assenza di un riferimento nel prodotto pubblicato non li rende eliminabili. Le esportazioni Figma uniche di Ricerca e Accessibilità sono conservate in `risorse-condivise/fonti/esportazioni-figma/ricerca-accessibilita/`, con il registro di ricollocazione e gli hash; non sono più temporanei.

## Comandi e output

| Ambito | Comandi dalla radice | Risultato |
| --- | --- | --- |
| Slide | `pnpm dev --port 3035` | Indice e lezioni autonome locali, avviate su richiesta |
| Slide complete | `pnpm dev:full --port 3035` | Percorso completo per verifiche ed esportazione |
| Build slide | `pnpm build` | Presentazioni pubblicabili e Caffè TTC in `progetti/slide/dist/` |
| Home | `pnpm css:home` | CSS compilato in `progetti/home/home.css` |
| Caffè TTC | `pnpm build:caffe-ttc` | Pagine, dati e stili compilati dentro il progetto |
| iLMeteo | `pnpm build:ilmeteo` | Stili, mappe e navigazione dentro il progetto |
| Booklet | `pnpm build:booklet` | Volume in `progetti/booklet/build/` |
| Verifica booklet | `pnpm check:booklet` | Controlli CLI e rapporti in `reports/typst-booklet/check/` |
| Ispezione booklet | `pnpm preview:booklet --pages 8-9` | PNG delle pagine fisiche richieste dal PDF già compilato |
| Risorse comuni | `pnpm prepare:assets` | Mirror delle immagini e copie audio approvate in `progetti/slide/public/` |
| Pubblicazione | `pnpm build:pages` | Home, slide ed esempi in `_site/` |
| Pulizia simulata | `pnpm clean --dry-run` | Elenco degli output e delle cache rigenerabili, senza cancellazione |

Gli strumenti specifici risiedono in `progetti/NOME/scripts/`; i comandi del `package.json` li richiamano dalla radice. `scripts/build/pages.mjs` assembla i risultati, `scripts/build/shared-assets.mjs` prepara le risorse comuni e `scripts/lib/` ospita le utilità condivise. Il [catalogo degli strumenti](../scripts/README.md) descrive controlli e generatori.

Gli output generati si distinguono dagli originali: `progetti/slide/dist/`, `progetti/slide/.slidev/`, `progetti/booklet/build/`, i mirror di `progetti/slide/public/` e `_site/` sono riproducibili con i comandi indicati. Alcuni file compilati dei siti sono versionati e richiesti per l’uso autonomo: rigenerarli tramite gli script, conservando sorgenti e licenze. Dipendenze e strumenti locali non sono asset didattici.

## Rapporti e pulizia

Il [rapporto sui file non utilizzati](../reports/riorganizzazione/verifica-file-inutilizzati.md) separa output rigenerabili, originali da conservare e possibili consolidamenti. Mantiene le misure iniziali e i vecchi percorsi dichiarati come snapshot; la relativa tabella di ricollocazione indica quelli attuali. I duplicati byte per byte possono avere ruoli distinti nella provenienza o nella pubblicazione.

`pnpm clean --dry-run` permette di esaminare il piano corrente. La pulizia conserva integralmente `reports/`, allegati, revisioni `.impeccable` e prove del booklet in `progetti/booklet/build/verifiche/`, anche se non richiamati. Elimina soltanto destinazioni generate note, mirror web, PDF ordinari di volume e capitoli e cache tecniche; le cartelle vuote dei sorgenti e i collegamenti simbolici restano intatti. Con un’anteprima attiva usare `--keep-dev`. Non usare la pulizia per eliminare originali o archivi soltanto perché esclusi dal percorso pubblicato.

## Percorsi pubblici e PDF

La struttura locale mantiene gli URL pubblici: home alla radice `/cvedi2627/`, slide in `slides/`, Caffè TTC in `web-design-examples/` e iLMeteo in `ilmeteo/`. L’archivio degli studenti resta nel [repository autonomo](https://github.com/cremarco/cvedi-progetti).

I PDF del booklet si compilano e verificano esclusivamente tramite CLI e si consultano in un lettore esterno. In Codex aprire soltanto i PNG esplicitamente richiesti, prodotti da `pnpm preview:booklet --pages 8-9`, al massimo otto pagine per volta e lato lungo massimo 1600 px, in `progetti/booklet/build/anteprime-ispezione/`. Non aprire o allegare i PDF, non creare collegamenti cliccabili ai PDF e non aggirare il hook di protezione. Le regole complete sono in [AGENTS.md](../AGENTS.md).
