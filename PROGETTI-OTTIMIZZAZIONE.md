# Ottimizzazione dei progetti CVeDI

## Risultato

- Siti: **76** (69 già presenti e 7 nuovi per l’a.a. 2025/2026).
- Dimensione attuale della cartella `progetti`: **1,192.5 MiB**.
- I 69 siti iniziali: **4,185.4 MiB → 1,067.4 MiB** (**74.5%** in meno).
- I 7 nuovi siti: **circa 807 MiB → 125.0 MiB** (**circa 84.5%** in meno).
- Cartelle rinominate con il nome del sito: **33**.
- Le 76 anteprime della galleria occupano **3.3 MiB** (WebP da 800 px). Le sette nuove anteprime sono presenti anche nella presentazione Slidev.
- Immagini delle pagine convertite a WebP solo quando il file risultava più leggero; dimensioni in pixel conservate.
- Immagini incorporate negli SVG ottimizzate mantenendo il tracciato vettoriale.
- Video compressi in MP4 H.264 mantenendo risoluzione e durata.
- Rimossi PDF non collegati, file di sviluppo, mappe sorgente, duplicati verificati e altri asset inutilizzati.

## Nuovi progetti e compressioni aggiuntive (30 settembre 2026)

- Applicate ai sette nuovi siti la conversione delle immagini, l’ottimizzazione dei font, la minificazione e la rimozione dei file non utilizzati. Le tre GIF di Riff sono ora WebP animati, con la stessa durata e lo stesso ciclo.
- La quota principale della riduzione dei nuovi progetti viene dalla rimozione delle cronologie `.git` (**612.2 MiB**); anche immagini, font, video e librerie sono stati alleggeriti.
- I siti precedenti sono stati ridotti di altri **30.6 MiB**, ricodificando 9 video dalle sorgenti originali, convertendo senza perdita 7 PNG e rimuovendo dipendenze di sviluppo inutilizzate.
- Rinominate `minecraft` in `dinecraft` e `project-x` in `mise-en-thropic`.
- Verificate **891 pagine HTML**, tutte con HTTP 200. Le **65 pagine dei nuovi siti** non generano richieste locali HTTP 404. Il controllo delle ancore non rileva errori di maiuscole/minuscole né frammenti mancanti; restano i 6 riferimenti ai 2 PDF assenti di Tu con noi già segnalati.
- Le 76 anteprime e i collegamenti della galleria sono validi; il filtro 2025/2026 mostra 7 siti. Build della presentazione completata e mosaico verificato con 76 progetti nel ciclo.
- Dettagli, limiti dei controlli e dimensioni dei nuovi siti: [`reports/progetti-extra-2026-09-30/RISULTATI.md`](reports/progetti-extra-2026-09-30/RISULTATI.md).

## Seconda passata (30 settembre 2026)

- Ulteriore riduzione: **1,484.0 MiB → 1,099.1 MiB** (**25.9%** in meno rispetto alla prima passata).
- Rimossi **544 media** senza riferimenti nei siti (**329.9 MiB**), dopo il controllo dei percorsi, degli script dinamici e delle pagine nel browser.
- Ottimizzati senza perdita **177 JPEG** (**3.9 MiB**) e convertiti **10 PNG** in WebP senza perdita (**2.3 MiB**).
- Ricodificate **30 immagini** con una soglia prudente di somiglianza (**14.5 MiB**); dimensioni in pixel e trasparenza conservate.
- Ricodificati **10 video H.264** (**24.7 MiB**); audio, dimensioni, frequenza dei fotogrammi e durata conservati. Somiglianza SSIM minima: **0.985**.
- Rimossi **65 font** non richiamati (**4.6 MiB**) e convertiti **47 font** usati in WOFF2 (**2.2 MiB**); glifi e assi variabili verificati.
- Minificati senza trasformazioni funzionali **349 file HTML/CSS/JS** (**2.9 MiB**).
- I **26 PDF collegati** sono stati conservati: le ricodifiche provate non hanno superato le verifiche di resa o struttura.
- I dettagli dei file modificati sono in [`reports/progetti-2026-09-30/`](reports/progetti-2026-09-30/).

## Verifiche

- Nella seconda passata, tutte le **829 pagine HTML** allora presenti nell'archivio rispondevano con HTTP 200; nessuna nuova richiesta locale 404 rispetto alla copia precedente.
- Confrontate visivamente le **69 pagine iniziali** e la galleria con la copia precedente; non sono emerse differenze di layout.
- Tutti i **6.351 raster** e i **2.809 SVG** rimasti sono decodificabili. Corretto un GIF trasparente di un pixel già troncato nell'archivio.
- Tutti i **14 video** e i **26 PDF** sono leggibili; per i 10 video ricodificati sono stati confrontati durata, risoluzione, fotogrammi e tracce audio.
- Il controllo statico dei collegamenti non mostra nuove risorse mancanti effettive rispetto alla copia precedente.

## Verifica dei link (30 settembre 2026)

I collegamenti sono stati ricontrollati e corretti nei 69 siti. Dopo la rimozione di 3 pagine dimostrative non collegate, le 826 pagine HTML rimaste rispondono con HTTP 200. Il controllo dettagliato, i collegamenti ancora da recuperare e la copia delle versioni precedenti dei file modificati sono in [`reports/link-check-2026-09-30/`](reports/link-check-2026-09-30/).

## Dimensioni per sito

| Anno | Sito | Prima (MiB) | Prima passata (MiB) | Attuale (MiB) | Riduzione totale | Cartella |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 2020-2021 | A.P.R.I. Onlus | 11.7 | 4.0 | 4.0 | 66% | `/a.a.2020_2021/a-p-r-i-onlus/` |
| 2020-2021 | Afrika Twende | 74.1 | 25.4 | 23.3 | 69% | `/a.a.2020_2021/afrika-twende/` |
| 2020-2021 | Api & Bio | 17.4 | 9.7 | 9.7 | 44% | `/a.a.2020_2021/api-bio/` |
| 2020-2021 | Arcobaleno | 12.2 | 4.8 | 4.7 | 61% | `/a.a.2020_2021/arcobaleno/` |
| 2020-2021 | Comitato per il parco regionale della Brughiera | 36.3 | 19.9 | 19.4 | 47% | `/a.a.2020_2021/comitato-per-il-parco-regionale-della-brughiera/` |
| 2020-2021 | Dimensione Animale Bergamo | 29.4 | 14.6 | 12.6 | 57% | `/a.a.2020_2021/dimensione-animale-bergamo/` |
| 2020-2021 | I colori di Matteo | 4.5 | 1.9 | 1.9 | 57% | `/a.a.2020_2021/i-colori-di-matteo/` |
| 2020-2021 | I fiori del bene | 77.8 | 25.3 | 8.1 | 90% | `/a.a.2020_2021/i-fiori-del-bene/` |
| 2020-2021 | Il labirinto | 5.6 | 4.3 | 3.6 | 36% | `/a.a.2020_2021/il-labirinto/` |
| 2020-2021 | L'Aliante | 33.2 | 9.4 | 9.3 | 72% | `/a.a.2020_2021/l-aliante/` |
| 2020-2021 | La Pecora nera | 39.2 | 15.7 | 14.5 | 63% | `/a.a.2020_2021/la-pecora-nera/` |
| 2020-2021 | Oceanus | 30.4 | 22.4 | 22.0 | 28% | `/a.a.2020_2021/oceanus/` |
| 2020-2021 | Osservatorio astronomico | 19.0 | 9.9 | 9.3 | 51% | `/a.a.2020_2021/osservatorio-astronomico/` |
| 2020-2021 | Protetto | 16.9 | 7.0 | 5.1 | 70% | `/a.a.2020_2021/protetto/` |
| 2020-2021 | SDEA ONLUS | 13.9 | 4.8 | 4.6 | 67% | `/a.a.2020_2021/sdea-onlus/` |
| 2020-2021 | SOS Villaggi dei bambini Saronno | 30.3 | 12.9 | 12.3 | 60% | `/a.a.2020_2021/sos-villaggi-dei-bambini-saronno/` |
| 2020-2021 | Tu con noi | 1.0 | 0.1 | 0.1 | 87% | `/a.a.2020_2021/tu-con-noi/` |
| 2021-2022 | Akawa Project | 36.2 | 13.2 | 13.1 | 64% | `/a.a.2021_2022/Akawa_Project/` |
| 2021-2022 | Aquaria | 41.6 | 5.8 | 5.8 | 86% | `/a.a.2021_2022/Aquaria/` |
| 2021-2022 | Artiestad | 115.5 | 23.6 | 11.4 | 90% | `/a.a.2021_2022/artiestad/` |
| 2021-2022 | Astrea | 20.2 | 11.5 | 10.5 | 48% | `/a.a.2021_2022/Astrea/` |
| 2021-2022 | BAHARI | 46.4 | 18.2 | 16.6 | 64% | `/a.a.2021_2022/BAHARI/` |
| 2021-2022 | Kalypso | 164.5 | 53.9 | 40.8 | 75% | `/a.a.2021_2022/Kalypso/` |
| 2021-2022 | Komorebi | 41.5 | 33.6 | 31.5 | 24% | `/a.a.2021_2022/Komorebi/` |
| 2021-2022 | May Von Bay | 336.1 | 105.2 | 92.3 | 73% | `/a.a.2021_2022/may-von-bay/` |
| 2021-2022 | Oak City | 59.1 | 25.8 | 6.5 | 89% | `/a.a.2021_2022/oak-city/` |
| 2021-2022 | Oasis | 10.7 | 3.4 | 3.4 | 69% | `/a.a.2021_2022/Oasis/` |
| 2021-2022 | Onrail Express | 21.7 | 8.7 | 6.8 | 69% | `/a.a.2021_2022/onrail-express/` |
| 2021-2022 | Ostasia | 59.8 | 30.4 | 20.8 | 65% | `/a.a.2021_2022/Ostasia/` |
| 2021-2022 | Retropolis | 19.7 | 6.4 | 4.8 | 76% | `/a.a.2021_2022/Retropolis/` |
| 2021-2022 | Rockstad | 37.5 | 15.1 | 7.7 | 79% | `/a.a.2021_2022/Rockstad/` |
| 2021-2022 | Rudbeckia | 19.7 | 3.6 | 3.4 | 83% | `/a.a.2021_2022/rudbeckia/` |
| 2021-2022 | The Amazonia Project | 52.2 | 19.6 | 15.5 | 70% | `/a.a.2021_2022/The_Amazonia_Project/` |
| 2021-2022 | Unicity | 43.0 | 6.9 | 6.6 | 85% | `/a.a.2021_2022/unicity/` |
| 2021-2022 | Utopia | 242.8 | 27.8 | 22.0 | 91% | `/a.a.2021_2022/Utopia/` |
| 2021-2022 | VeniceBric | 44.5 | 20.9 | 20.2 | 55% | `/a.a.2021_2022/VeniceBric/` |
| 2021-2022 | Vice City | 29.2 | 22.7 | 20.5 | 30% | `/a.a.2021_2022/vice-city/` |
| 2021-2022 | Wreck City | 65.9 | 17.9 | 17.9 | 73% | `/a.a.2021_2022/Wreck_City/` |
| 2022-2023 | BicoccaBottom | 6.8 | 3.0 | 2.8 | 59% | `/a.a.2022_2023/BicoccaBottom/` |
| 2022-2023 | Ch4nge | 234.0 | 64.5 | 32.2 | 86% | `/a.a.2022_2023/Ch4nge/` |
| 2022-2023 | Cinergy | 104.6 | 31.3 | 23.6 | 77% | `/a.a.2022_2023/Cinergy/` |
| 2022-2023 | EcoCity | 71.5 | 49.3 | 34.0 | 52% | `/a.a.2022_2023/EcoCity/` |
| 2022-2023 | Elysium | 24.6 | 10.5 | 9.9 | 60% | `/a.a.2022_2023/Elysium/` |
| 2022-2023 | Fisherbot | 75.5 | 24.2 | 19.6 | 74% | `/a.a.2022_2023/Fisherbot/` |
| 2022-2023 | Fridge for nature | 16.0 | 9.5 | 9.5 | 41% | `/a.a.2022_2023/Fridge_for_nature/` |
| 2022-2023 | Goodrive | 60.1 | 15.6 | 7.3 | 88% | `/a.a.2022_2023/Goodrive/` |
| 2022-2023 | Greenway | 39.9 | 12.9 | 5.0 | 87% | `/a.a.2022_2023/Greenway/` |
| 2022-2023 | iFarm | 17.8 | 10.3 | 10.3 | 42% | `/a.a.2022_2023/iFarm/` |
| 2022-2023 | NETtuNO | 64.7 | 17.7 | 5.2 | 92% | `/a.a.2022_2023/nettuno/` |
| 2022-2023 | PinchPym | 13.2 | 6.0 | 6.0 | 55% | `/a.a.2022_2023/PinchPym/` |
| 2022-2023 | PlastEat | 425.7 | 141.9 | 106.3 | 75% | `/a.a.2022_2023/PlastEat/` |
| 2022-2023 | ReUse | 14.8 | 9.1 | 6.8 | 54% | `/a.a.2022_2023/ReUse/` |
| 2022-2023 | Rooting For Nature | 40.3 | 17.5 | 13.2 | 67% | `/a.a.2022_2023/rooting-for-nature/` |
| 2022-2023 | Sealife | 45.1 | 13.7 | 10.9 | 76% | `/a.a.2022_2023/sealife/` |
| 2022-2023 | SustAnimals | 89.1 | 19.6 | 6.9 | 92% | `/a.a.2022_2023/SustAnimals/` |
| 2022-2023 | TavolaRasa | 33.7 | 12.9 | 11.7 | 65% | `/a.a.2022_2023/TavolaRasa/` |
| 2022-2023 | Undergrowing | 63.3 | 40.3 | 24.6 | 61% | `/a.a.2022_2023/Undergrowing/` |
| 2023-2024 | AetherCraft Creations | 29.1 | 14.7 | 14.7 | 50% | `/a.a.2023_2024/aethercraft-creations/` |
| 2023-2024 | Crypto Zoology Unlimited | 48.7 | 19.5 | 16.4 | 66% | `/a.a.2023_2024/crypto-zoology-unlimited/` |
| 2023-2024 | Gemtopia | 55.1 | 13.6 | 10.3 | 81% | `/a.a.2023_2024/gemtopia/` |
| 2023-2024 | Serenity Dream Travels | 78.1 | 10.6 | 8.7 | 89% | `/a.a.2023_2024/serenity-dream-travels/` |
| 2023-2024 | Socks Fusion Innovations | 207.4 | 83.7 | 44.6 | 79% | `/a.a.2023_2024/socks-fusion-innovations/` |
| 2024-2025 | AstroMed | 7.0 | 2.7 | 1.7 | 76% | `/a.a.2024_2025/AstroMed/` |
| 2024-2025 | AstroVeggie | 24.0 | 7.4 | 3.7 | 85% | `/a.a.2024_2025/AstroVeggie/` |
| 2024-2025 | Nexus | 2.7 | 0.5 | 0.5 | 82% | `/a.a.2024_2025/nexus/` |
| 2024-2025 | Progetto CVeDI-consegna | 63.9 | 32.7 | 25.6 | 60% | `/a.a.2024_2025/Progetto_CVeDI-consegna/` |
| 2024-2025 | Temporal-Paws | 94.4 | 37.9 | 3.3 | 96% | `/a.a.2024_2025/Temporal-Paws/` |
| 2024-2025 | Totem Magrathea | 51.2 | 23.7 | 18.5 | 64% | `/a.a.2024_2025/Totem_Magrathea/` |
| 2024-2025 | Xylos | 122.0 | 60.7 | 31.3 | 74% | `/a.a.2024_2025/Xylos/` |

## Cartelle rinominate

- `/a.a.2020_2021/2M&3C/` → `/a.a.2020_2021/osservatorio-astronomico/`
- `/a.a.2020_2021/3MCN/` → `/a.a.2020_2021/i-fiori-del-bene/`
- `/a.a.2020_2021/B52/` → `/a.a.2020_2021/oceanus/`
- `/a.a.2020_2021/Camea/` → `/a.a.2020_2021/il-labirinto/`
- `/a.a.2020_2021/E.T.TC/` → `/a.a.2020_2021/afrika-twende/`
- `/a.a.2020_2021/FIVEGUYS/` → `/a.a.2020_2021/a-p-r-i-onlus/`
- `/a.a.2020_2021/FRESS/` → `/a.a.2020_2021/arcobaleno/`
- `/a.a.2020_2021/FirstChild/` → `/a.a.2020_2021/la-pecora-nera/`
- `/a.a.2020_2021/Hufflepuff/` → `/a.a.2020_2021/dimensione-animale-bergamo/`
- `/a.a.2020_2021/Kinder_Pingui/` → `/a.a.2020_2021/l-aliante/`
- `/a.a.2020_2021/MAGAJ/` → `/a.a.2020_2021/comitato-per-il-parco-regionale-della-brughiera/`
- `/a.a.2020_2021/Piplup/` → `/a.a.2020_2021/tu-con-noi/`
- `/a.a.2020_2021/RAMSD/` → `/a.a.2020_2021/protetto/`
- `/a.a.2020_2021/SharingIsCaring/` → `/a.a.2020_2021/i-colori-di-matteo/`
- `/a.a.2020_2021/Takete/` → `/a.a.2020_2021/sdea-onlus/`
- `/a.a.2020_2021/The_Bicocca_Academy/` → `/a.a.2020_2021/api-bio/`
- `/a.a.2020_2021/Webheroes/` → `/a.a.2020_2021/sos-villaggi-dei-bambini-saronno/`
- `/a.a.2021_2022/Aliens/` → `/a.a.2021_2022/may-von-bay/`
- `/a.a.2021_2022/IGOR/` → `/a.a.2021_2022/unicity/`
- `/a.a.2021_2022/I_Dada/` → `/a.a.2021_2022/artiestad/`
- `/a.a.2021_2022/Sei_Personaggi_in_cerca_di_un_sito/` → `/a.a.2021_2022/onrail-express/`
- `/a.a.2021_2022/WhyNot/` → `/a.a.2021_2022/rudbeckia/`
- `/a.a.2021_2022/Width100/` → `/a.a.2021_2022/vice-city/`
- `/a.a.2022_2023/Ocean/` → `/a.a.2022_2023/nettuno/`
- `/a.a.2022_2023/RootingForNature/` → `/a.a.2022_2023/rooting-for-nature/`
- `/a.a.2022_2023/Sixblueguys/` → `/a.a.2022_2023/sealife/`
- `/a.a.2023_2024/Future-team/` → `/a.a.2023_2024/aethercraft-creations/`
- `/a.a.2023_2024/i-sovrascrittori/` → `/a.a.2023_2024/crypto-zoology-unlimited/`
- `/a.a.2023_2024/SerenityDreamTravels/` → `/a.a.2023_2024/serenity-dream-travels/`
- `/a.a.2023_2024/SocksF/` → `/a.a.2023_2024/socks-fusion-innovations/`
- `/a.a.2024_2025/cvedi-no-mans-sky/` → `/a.a.2024_2025/nexus/`

- `/a.a.2025_2026/minecraft/` → `/a.a.2025_2026/dinecraft/`
- `/a.a.2025_2026/project-x/` → `/a.a.2025_2026/mise-en-thropic/`
