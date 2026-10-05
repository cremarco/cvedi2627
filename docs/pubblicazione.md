# Pubblicazione e compressione · 30 settembre 2026

- Archivio: 76 siti e 76 anteprime.
- Archivio prima di questa passata: **1250.40 MB**.
- Archivio dopo questa passata: **952.86 MB** (−23.8%).
- Pacchetto pubblicato, presentazione e PDF inclusi: **968.98 MB** (968,979,321 byte).
- Build: `pnpm build:pages`; pubblicazione automatica tramite GitHub Actions.

## Interventi

Ricodifica delle fotografie in WebP/AVIF, riduzione delle immagini sovradimensionate fino a 1920 pixel sul lato lungo, compressione senza perdita di 1166 PNG, ottimizzazione delle immagini incorporate negli SVG e di 235 SVG con confronto dei pixel renderizzati. Mappe, diagrammi, panorami stretti e animazioni mantengono la risoluzione fornita. Conservati i profili colore delle immagini con gamut ampio.

Per le fotografie, ogni candidato viene confrontato sia alla risoluzione finale sia a 1280 pixel: accettazione con PSNR ≥43 dB nella vista ridotta, oppure SSIM ≥0,995 e PSNR ≥28 dB; la qualità alla risoluzione finale deve superare la soglia della singola passata (36–38 dB). Queste ricodifiche sono con perdita: le immagini non sono byte o pixel identiche agli originali. Le anteprime della galleria sono conservate byte per byte.

Minificati HTML, CSS e JavaScript senza rinominare variabili né comprimere la logica JavaScript. Conservata la struttura originale di una pagina con markup ambiguo. Eliminati 172 file non utilizzati, verificando anche gli usi dinamici dei siti interessati.

## Archivio per anno

| Anno | Siti | Prima, MB | Dopo, MB |
| --- | ---: | ---: | ---: |
| a.a.2020_2021 | 17 | 172.42 | 143.71 |
| a.a.2021_2022 | 21 | 396.18 | 269.13 |
| a.a.2022_2023 | 19 | 362.76 | 274.93 |
| a.a.2023_2024 | 5 | 99.17 | 70.73 |
| a.a.2024_2025 | 7 | 88.75 | 72.56 |
| a.a.2025_2026 | 7 | 131.08 | 121.77 |

## Controlli

- 152 richieste HTTP riuscite: pagina iniziale e screenshot di tutti i 76 siti.
- 20.773 riferimenti HTML/CSS esaminati: nessuna nuova risorsa mancante rispetto al pacchetto iniziale.
- 10.505 collegamenti locali esaminati: nessuna differenza di maiuscole/minuscole e nessun frammento mancante.
- Corretti 85 collegamenti di Aroma ed Eden Leaf che puntavano alla radice del dominio.
- Verificate nel browser le sette home nuove: immagini visibili caricate e video di DISH-KI e Riff riproducibili.
- Verificata la presentazione nel percorso `/cvedi2627/slides/`, comprese le anteprime e il collegamento all’archivio.

Restano sei collegamenti a due PDF storici di “Tu con noi” che erano già assenti dal materiale originale: `Tu-con-noi-bilancio-2019.pdf` e `La-casa-sulla-collina-presentazione.pdf`. Anche altri riferimenti a risorse già assenti negli elaborati di partenza non possono essere ricostruiti dai file disponibili.

I dettagli dei confronti e le copie di recupero sono conservati localmente in `reports/pages-2026-09-30/` e `/tmp/cvedi-pages-before-compression`, esclusi dalla pubblicazione.

## Correzioni dell’archivio · 2 ottobre 2026

Dopo la verifica delle 890 pagine dei 76 progetti sono stati corretti percorsi di immagini, font e sfondi, icone mancanti, gallerie dinamiche e contenuti fuori margine. Le 122 pagine segnalate per larghezza rientrano ora nel proprio viewport. Il logo di Oceanus è ridimensionato; la mascotte di AstroVeggie non blocca più la scelta dell’ordine. I sei totem superano 12 verifiche su desktop e telefono, con controllo aggiuntivo dell’adattamento su tablet.

31 foto e un video senza originale disponibile sono indicati esplicitamente nei rispettivi riquadri. I partner e il logo assenti di Tu con noi sono rappresentati con i loro nomi. Le mappe non disponibili di Cinergy offrono un collegamento alla posizione dell’evento. Il visualizzatore 360° conserva la modalità Basic e l’attribuzione del produttore; le sue due richieste facoltative della licenza commerciale sono registrate separatamente nel test.

Build finale: **966.03 MB**. Rapporto locale in `reports/browser-fixes-2026-10-02/`; verifica riproducibile con `PROJECTS_ALL=1 node scripts/check/projects.mjs`.
