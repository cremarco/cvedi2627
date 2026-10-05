# Controllo dei collegamenti — 1 ottobre 2026

Archivio: **76 siti, 890 pagine HTML**. Controllo dei percorsi nella struttura pubblicata su GitHub Pages, apertura di tutte le pagine nel browser e prova della navigazione iniziale di ogni sito.

## Risultati

- 14.078 collegamenti HTML e 370 destinazioni letterali in JavaScript/onclick analizzate.
- 14.448 collegamenti del DOM analizzati dopo il caricamento degli script; verificate anche le ancore generate dinamicamente.
- **0 destinazioni interne mancanti**, differenze di maiuscole/minuscole o frammenti inesistenti nel controllo finale. I pulsanti di chiusura delle finestre Leaflet sono azioni, non destinazioni.
- 219 file corretti in 38 siti, più il gestore comune degli avvisi. Aspetto e contenuti originali conservati.
- 265 indirizzi esterni iniziali controllati. Le risposte 404 sospette sono state ricontrollate con GET: alcuni server rispondono diversamente a HEAD.

## Correzioni principali

| Sito | Correzioni |
| --- | --- |
| Eden Leaf | Prenota mobile e desktop dalle tre pagine dei piatti; inizializzazioni dei menu e del carosello. |
| AstroMed | Menu laterali e profili; caricamento dei moduli di prenotazione; percorsi dei dati dei reparti; pulsanti nelle pagine senza i rispettivi elementi. |
| Nexus | ADD apre checkin2; pulsanti e tastiere inizializzati nelle pagine pertinenti; un destinatario inesistente non nasconde tutte le sezioni. |
| Mise-en-Thropic | Menu e script di lingua/form/calendario non interrotti da elementi assenti. |
| AetherCraft Creations | Varianti dei prodotti collegate alle immagini ottimizzate esistenti; email coerenti con i contatti mostrati. |
| La Pecora Nera | Rimossi segmenti doppi nei percorsi della pagina Cosmesi. |
| Retropolis | Voci dei quartieri collegate alle rispettive sezioni; dettaglio non realizzato segnalato chiaramente. |
| Ostasia | Tutte le voci del footer collegate alle rispettive pagine. |
| PlastEat | Tre schede della homepage, logo, utilizzo, valori e contatti collegati alle destinazioni corrette. |
| Cinergy, Ch4nge, SeaLife | Collegamenti del logo alla homepage; SeaLife: blog e contatti di collaborazione. |
| Rockstad | Gestione corretta dei tre pulsanti/modal di prenotazione. |
| L’Aliante, Utopia, SOS Villaggi, PinchPym | Ordine delle dipendenze JavaScript e inizializzazione dopo jQuery; eliminato script Maps inutilizzato con chiave segnaposto. |
| BicoccaBottom, Greenway, Undergrowing, EcoCity, Rooting for Nature, SeaLife | Guardie negli script condivisi per evitare errori che interrompono i controlli. |
| Xylos | Ritorno dalla mappa valido anche su Pages; riepiloghi accessibili senza una prenotazione precedentemente salvata. |
| Afrika Twende | I collegamenti alla posizione aprono Google Maps; conservate le mappe incorporate. |
| Vari siti | Aggiornate destinazioni ufficiali Altromercato, Virgin Galactic e Tu con noi; telefono Elysium attivato. |

## Verifiche funzionali

Prova dei collegamenti dalla pagina iniziale dei 76 siti. Cinergy effettua un redirect verso pages/; AstroVeggie e Nexus hanno un ingresso al tocco; Magrathea apre gli orari da un controllo grafico.

Verificati inoltre: selezione di una prestazione → scelta del medico in AstroMed; Informazioni → Cardiologia con i dati del reparto; ingresso → dimensione → check-in → ADD in Nexus; menu hamburger → Prenota in Mise-en-Thropic; pagina Gemme di Zenith → Prenota desktop in Eden Leaf.

## Contenuti e funzioni mancanti negli originali

Alcuni collegamenti non possono essere ripristinati senza il documento, la pagina o il servizio originale. Il controllo non li considera collegamenti funzionanti:

- **Tu con noi:** il bilancio 2019 non era presente nei file consegnati. Il PDF del progetto Casa sulla Collina è stato sostituito dal collegamento alla pagina ufficiale che descrive il progetto: https://www.tuconnoi.org/la-casa-sulla-collina-la-casa-sulla-collina.
- **Retropolis:** mancavano le cinque pagine di dettaglio di Gioia, Tristezza, Paura, Sorpresa e Disgusto. ENTRA mostra un avviso; le voci del menu aprono le descrizioni disponibili.
- **EcoCity:** due eventi aggiuntivi, mostrati in entrambe le versioni del carosello, non hanno pagine di dettaglio nel progetto. Mostrano un avviso.
- Alcune risorse esterne confermate come rimosse (Oceanus su Google Play, documenti APRI, bollettino I fiori del bene, vecchi profili social e altri collegamenti) mostrano un avviso. La destinazione originale è conservata nell’attributo data-original-href per un eventuale ripristino.
- Restano controlli di prototipo senza una destinazione realizzata: per esempio pagine di altri prodotti Socks Fusion, eventi aggiuntivi ReUse/TavolaRasa, altri articoli Rooting for Nature/SeaLife, profili e social di organizzazioni immaginarie, informative legali, traduzioni e invii di form senza un servizio sul server. Non sono stati collegati a contenuti diversi da quelli indicati.
- Risposte 403/429/999, richiesta di login, timeout e blocchi automatici di siti esterni non provano che il collegamento sia inesistente; tali indirizzi sono conservati.
- La demo non collegata Retropolis/library/Image_Accordions manca della libreria Swiper. Questo residuo della consegna non è usato dalla navigazione del sito.

Un href con # può essere un menu, un tab, una finestra, uno slider, un comando per tornare in cima o una voce della pagina corrente. I 1.579 segnaposto residui sono stati inventariati, non trattati indistintamente come errori di percorso.

## Copertura per sito

| Anno | Sito | Pagine HTML | File corretti |
| --- | --- | ---: | ---: |
| 2020-2021 | Osservatorio astronomico | 12 | 6 |
| 2020-2021 | I fiori del bene | 13 | 1 |
| 2020-2021 | Oceanus | 9 | 9 |
| 2020-2021 | Il labirinto | 13 | 0 |
| 2020-2021 | Afrika Twende | 24 | 24 |
| 2020-2021 | A.P.R.I. Onlus | 44 | 6 |
| 2020-2021 | Arcobaleno | 8 | 0 |
| 2020-2021 | La Pecora nera | 14 | 6 |
| 2020-2021 | Dimensione Animale Bergamo | 7 | 0 |
| 2020-2021 | L'Aliante | 7 | 7 |
| 2020-2021 | Comitato per il parco regionale della Brughiera | 11 | 0 |
| 2020-2021 | Tu con noi | 5 | 5 |
| 2020-2021 | Protetto | 9 | 0 |
| 2020-2021 | I colori di Matteo | 7 | 0 |
| 2020-2021 | SDEA ONLUS | 10 | 10 |
| 2020-2021 | Api & Bio | 13 | 13 |
| 2020-2021 | SOS Villaggi dei bambini Saronno | 19 | 7 |
| 2021-2022 | Akawa Project | 9 | 0 |
| 2021-2022 | May Von Bay | 9 | 0 |
| 2021-2022 | Aquaria | 9 | 0 |
| 2021-2022 | Astrea | 9 | 1 |
| 2021-2022 | BAHARI | 10 | 0 |
| 2021-2022 | Unicity | 9 | 0 |
| 2021-2022 | Artiestad | 9 | 0 |
| 2021-2022 | Kalypso | 7 | 0 |
| 2021-2022 | Komorebi | 9 | 0 |
| 2021-2022 | Oasis | 9 | 0 |
| 2021-2022 | Ostasia | 9 | 9 |
| 2021-2022 | Retropolis | 12 | 9 |
| 2021-2022 | Rockstad | 9 | 1 |
| 2021-2022 | Onrail Express | 9 | 0 |
| 2021-2022 | The Amazonia Project | 10 | 0 |
| 2021-2022 | Utopia | 9 | 9 |
| 2021-2022 | VeniceBric | 9 | 0 |
| 2021-2022 | Rudbeckia | 9 | 0 |
| 2021-2022 | Vice City | 8 | 0 |
| 2021-2022 | Wreck City | 9 | 0 |
| 2021-2022 | Oak City | 10 | 1 |
| 2022-2023 | BicoccaBottom | 9 | 3 |
| 2022-2023 | Ch4nge | 9 | 9 |
| 2022-2023 | Cinergy | 11 | 9 |
| 2022-2023 | EcoCity | 13 | 2 |
| 2022-2023 | Elysium | 9 | 9 |
| 2022-2023 | Fisherbot | 10 | 0 |
| 2022-2023 | Fridge for nature | 9 | 0 |
| 2022-2023 | Goodrive | 10 | 1 |
| 2022-2023 | Greenway | 10 | 1 |
| 2022-2023 | NETtuNO | 10 | 2 |
| 2022-2023 | PinchPym | 9 | 4 |
| 2022-2023 | PlastEat | 10 | 10 |
| 2022-2023 | ReUse | 9 | 0 |
| 2022-2023 | Rooting For Nature | 9 | 2 |
| 2022-2023 | Sealife | 9 | 10 |
| 2022-2023 | SustAnimals | 15 | 1 |
| 2022-2023 | TavolaRasa | 10 | 0 |
| 2022-2023 | Undergrowing | 12 | 1 |
| 2022-2023 | iFarm | 13 | 0 |
| 2023-2024 | AetherCraft Creations | 8 | 4 |
| 2023-2024 | Gemtopia | 6 | 0 |
| 2023-2024 | Crypto Zoology Unlimited | 15 | 1 |
| 2023-2024 | Serenity Dream Travels | 10 | 0 |
| 2023-2024 | Socks Fusion Innovations | 11 | 0 |
| 2024-2025 | AstroMed | 17 | 16 |
| 2024-2025 | AstroVeggie | 30 | 0 |
| 2024-2025 | Progetto CVeDI-consegna | 18 | 0 |
| 2024-2025 | Temporal-Paws | 9 | 0 |
| 2024-2025 | Totem Magrathea | 22 | 0 |
| 2024-2025 | Xylos | 60 | 3 |
| 2024-2025 | Nexus | 6 | 2 |
| 2025-2026 | Aroma | 9 | 0 |
| 2025-2026 | DineCraft | 9 | 0 |
| 2025-2026 | DISH-KI | 9 | 0 |
| 2025-2026 | Eden Leaf | 9 | 4 |
| 2025-2026 | Krusty Krab | 10 | 0 |
| 2025-2026 | Mise-en-Thropic | 9 | 1 |
| 2025-2026 | Riff | 10 | 0 |

## Ripetere il controllo

Dopo la build, con Python 3 e BeautifulSoup installato:

```sh
pnpm run build:pages
python3 scripts/check/navigation.py
```

Il parametro `--runtime` accetta l’inventario JSON dei collegamenti/ID catturato nel browser e include i menu e le ancore creati da JavaScript. Il controllo statico non sostituisce le prove dei clic o la verifica delle risorse esterne.

Gli inventari completi e le prove di questa verifica si trovano localmente in `reports/links-2026-10-01/` (esclusi dalla pubblicazione).
