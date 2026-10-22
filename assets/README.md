# Asset CVeDI

Questa cartella conserva gli originali, le fonti e i dati condivisi fra booklet e slide. Il sistema editoriale del booklet è descritto in [DESIGN.md](../DESIGN.md).

Il perimetro corrente del booklet comprende sette capitoli: **01 Storia, 02 Ricerca, 03 Accessibilità, 04 Gestalt, 05 Colore, 06 Tipografia e 07 La griglia**. Il Processo UX è escluso; il suo Double Diamond è conservato in archivio. La scelta precedente fra NN/g e Stanford è annullata e non richiede una nuova decisione. L’inventario condiviso conserva anche gli altri asset già presenti, indipendentemente dalle lezioni attualmente impaginate.

## Asset attivi

| Cartella | Contenuto e registro |
| --- | --- |
| [images/aperture/](images/aperture/) | Dodici aperture SVG flat condivise; colori, ruoli e provenienza nel [manifest](images/aperture/manifest.json). Titoli e numeri restano testo Typst. |
| [images/figure/](images/figure/) | Immagini canoniche delle raccolte tematiche. I manifest nelle singole cartelle conservano fonti, attribuzioni e hash; il [manifest generale delle immagini](images/manifest.json) descrive il proprio sottoinsieme storico e non costituisce un inventario completo. |
| [images/figure/caffe-ttc/](images/figure/caffe-ttc/) | Sedici screenshot reali Home Caffè TTC: 15 desktop e Adattabile anche mobile, tutti in rapporto 17:24. Il [manifest della raccolta](images/figure/caffe-ttc/manifest.json) conserva query, data, viewport, scala e hash; il [registro del browser](images/figure/caffe-ttc/catture-browser.json) documenta cattura e verifica visiva. |
| [images/figure/griglia/](images/figure/griglia/) | Il [manifest](images/figure/griglia/manifest.json) associa le 42 figure Figma correnti (39 diagrammi SVG e tre originali documentari) e otto figure della sezione Griglia del PDF di dicembre 2024, con provenienza e hash. Le opere già canoniche restano nei rispettivi percorsi. |
| [fonts/editoriali/](fonts/editoriali/) | Sora, DM Sans e DM Sans corsivo; Noto Sans JP completa i caratteri giapponesi e Noto Sans SC quelli cinesi assenti anche nel font JP, senza cambiare i font editoriali. File originali, licenze OFL e provenienza nel [manifest dei font](fonts/editoriali/manifest.json). |
| [dati/sagome/](dati/sagome/) | Profili alpha derivati dalle immagini trasparenti, con hash, dimensioni e fasce del contorno. Sono dati delle figure, indipendenti dalle righe del testo. |
| [dati/figure/tipografia/](dati/figure/tipografia/) | Testi e stili originali dei campioni nativi, condivisibili senza incorporare l’impaginazione del booklet. |
| [dati/figure/griglia/](dati/figure/griglia/) | Didascalie, diritti, testi alternativi e identificatori delle 50 figure del capitolo, comprese le otto integrazioni storiche. Il progressivo stampato è generato dal capitolo Typst. |
| [dati/fonti/tipografia/](dati/fonti/tipografia/) | Registro dei testi e collegamenti delle dodici tavole bibliografiche Figma491–502. Conserva la provenienza originale, distinta dalle fonti APA verificate e dalle note del testo corrente. |

Per un nuovo riferimento Typst, con la radice del repository impostata tramite `--root`:

```typst
#image(path("/assets/images/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg"))
```

Nelle slide, lo stesso asset è disponibile al nuovo URL:

```text
/images/shared/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg
```

Questi esempi guidano i nuovi inserimenti. Gli URL già usati dalle slide restano conservati nei riferimenti esistenti.

`pnpm prepare:assets` genera copie identiche byte per byte agli originali in [public/images/shared/](../public/images/shared/), cartella ignorata da Git. Modificare gli originali attivi e rigenerare il mirror; il controllo è `node scripts/build/shared-assets.mjs --check` dalla radice del repository.

`pnpm check:booklet` verifica hash dei font e delle licenze, corrispondenza dei profili alpha alle immagini e palette delle aperture. Genera inoltre l’indice corrente dei manifest di immagini, font e dati in `reports/typst-booklet/check/manifest-assets.json`. L’indice elenca i registri disponibili; le attribuzioni restano nei manifest originali. Ambiente e comandi sono descritti nella [guida Typst](../typst-booklet/README.md#aprire-e-compilare).

Le schermate TTC sono copie dei PNG approvati, senza ritaglio o ricompressione. I sorgenti del sito, i font, le fotografie/illustrazioni e il marchio restano in [esempi/caffe-luce/](../esempi/caffe-luce/): il nome storico della cartella non cambia il nome del bar. Il [registro delle sorgenti](images/figure/caffe-ttc/sorgenti.json) ne conserva percorsi e hash, senza duplicare i binari. I registri delle licenze e della provenienza sono richiamati dal manifest; non viene assegnata una nuova licenza all’intera schermata. Il caso è fittizio e gli screenshot non sono documenti storici.

## Archivio delle prove Typst

[archivio/typst/](archivio/typst/) conserva le prove storiche e non viene pubblicato nel mirror condiviso. Il suo [manifest](archivio/typst/manifest.json) collega originali, fonti e copie già presenti fra gli asset canonici.

| Cartella | Contenuto |
| --- | --- |
| [copertine/collage/](archivio/typst/copertine/collage/) | Tre PNG delle proposte scartate; il manifest registra tutte le dodici proposte, comprese quelle mai copiate nel repository. |
| [copertine/svg-v1/](archivio/typst/copertine/svg-v1/) | Dodici SVG precedenti alle aperture attive. |
| [figure/](archivio/typst/figure/) | Sei immagini delle prove: due SVG, tre PNG e il precedente WebP delle *Forchette parlanti* di Munari, conservati con le provenienze; Caffè Luce aggiunge 15 visuali precedenti e Processo UX un SVG, per 22 immagini d’archivio complessive. |
| [figure/caffe-luce/](archivio/typst/figure/caffe-luce/) | Quattordici PNG e un SVG precedenti, sostituiti dalle schermate reali TTC. Il [manifest](archivio/typst/figure/caffe-luce/manifest.json) conserva le registrazioni complete precedenti, inclusi prompt, attribuzioni, riferimenti Figma e la mappa delle sostituzioni. |
| [figure/processo-ux/](archivio/typst/figure/processo-ux/) | Il [Double Diamond con quattro fasi e iterazione](archivio/typst/figure/processo-ux/double-diamond-quattro-fasi-iterazione.svg), escluso dal perimetro corrente e conservato senza modifiche. Il [manifest](archivio/typst/figure/processo-ux/manifest.json) mantiene il record completo, la fonte Design Council, CC BY 4.0 e l’adattamento dichiarato; originale e fonti storiche restano nei percorsi documentati. |
| [dati/](archivio/typst/dati/) | Il [profilo sperimentale del Duomo](archivio/typst/dati/duomo-profilo-sperimentale.json) a 44 fasce, distinto dal profilo attivo. |

I testi e gli stili dello snapshot Figma sono conservati nei [dati della demo](../typst-booklet/esperimenti/pagine-figma/testo-stili.json), insieme al relativo sorgente Typst.

Il WebP di Munari conserva la versione precedente senza sostituirla con il JPEG corrente. Il manifest dell’archivio collega entrambe le versioni; il JPEG attivo corrisponde all’originale presente nella fonte Figma corrente.

## Materiali di provenienza

[booklet/](booklet/) e le altre cartelle tematiche conservano sorgenti grafici, esportazioni Figma, materiali delle slide e fonti storiche. I loro manifest specifici documentano revisioni, attribuzioni e licenze.

Per riutilizzare un elemento, consultare prima il relativo registro e verificare se esiste già una copia canonica. Importare soltanto i materiali necessari al contenuto corrente, conservando originali e attribuzioni; evitare importazioni in blocco e nuove copie dello stesso asset.
