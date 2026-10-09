# iLMeteo · Assessment A indipendente

Assessment A svolta come sub-agent di design, senza eseguire, leggere o ricevere risultati del detector o dell'Assessment B. La valutazione è stata formata prima della sintesi. Durante il coordinamento della viewport ho comunicato a B un solo rilievo già concluso sul layout mobile di Domani: questa comunicazione limita l'isolamento in uscita, ma nessun risultato di B ha influenzato A. Il coordinatore deve mantenere questa nota di provenienza nella sintesi.

## Perimetro, modalità ed evidenze

Tre superfici canoniche: [Home](https://www.ilmeteo.it/), [Bologna](https://www.ilmeteo.it/meteo/bologna), [Meteo domani nazionale](https://www.ilmeteo.it/portale/meteo-domani). Modalità primaria **Operate** per cercare una località, leggere una previsione e scegliere un giorno; modalità **Read** per bollettini e notizie. Il materiale locale è un esercizio CVeDI, non un servizio meteo aggiornato.

Ispezione browser in una scheda IAB nascosta creata dall'agente, con screenshot a 1280 × 720 e un'unica sessione a 390 × 844, poi viewport ripristinata. Nessuna scheda dell'utente è stata usata. Sono stati letti `DESIGN.md`, `PRODUCT.md`, Impeccable e il riferimento critique; il launcher context era già stato eseguito dal coordinatore nella stessa sessione. Non ho modificato prodotto, asset o CSS.

Il corpus acquisito è `esempi/ilmeteo-lab/sources/{home,bologna,domani}.html`, con manifest e `data/capture.json`. La copia è etichettata **8 ottobre 2026 · copia didattica congelata**; il manifest registra acquisizione alle 18:04 UTC. I valori live letti poco dopo non coincidono sempre con quelli acquisiti: Bologna catturata riporta aggiornamento 19:59 e attendibilità 50%; la lettura live mostrava 20:04 e attendibilità 89%. Questi sono cambiamenti di edizione, non errori della copia né numeri da mescolare nel redesign. Domani mostra aggiornamento 08/10/26 17.39 e prossimo aggiornamento 20.25; la Home ha timestamp editoriale diverso dal radar.

Screenshot di A, formato JPEG verificato:

- `source/assessment-a-home-desktop.jpg` e `source/assessment-a-home-mobile.jpg`.
- `source/assessment-a-bologna-desktop.jpg`, `source/assessment-a-bologna-hourly.jpg`, `source/assessment-a-bologna-mobile.jpg`.
- `source/assessment-a-domani-desktop.jpg`, `source/assessment-a-domani-map.jpg`, `source/assessment-a-domani-mobile.jpg`, `source/assessment-a-domani-mobile-body.jpg`.
- `source/assessment-a-originale-{home,bologna,domani}-desktop.jpg` documentano le tre copie locali dopo conferma final-ready.

**Verifica delle copie locali:** dopo la conferma final-ready ho ricaricato Bologna e aperto tutte le pagine su `http://127.0.0.1:4187/originale/` a1280×720. La geometria desktop conserva il contenitore, lo slot superiore, il marchio, le barre e le strutture dati acquisite. Bologna mostra aggiornamento19:59, calendario con attendibilità50%/49%,14righe DOM di tabella e solo i due script locali `snapshot-data.js`/`snapshot.js`; nessuna immagine Bologna punta a un'origine esterna nella lettura DOM. Domani ha bodyclass`sito-standard`, titolo9ottobre e8mappe di fascia. Home ha titolo/aggiornamento19:56,74immagini DOM e28tile radar locali. Pubblicità dinamica, social/account e video non sono identici alla sessione live: rimangono slot bianchi e alcune funzioni risultano disattivate, coerentemente con il perimetro offline dichiarato nel corpus. Il label di edizione congelata è presente nei dati/manifest, ma non è apparso nel testo delle tre pagine originali durante la lettura DOM: il contenitore didattico deve rendere questa informazione visibile senza alterare la fonte conservata.

Questa verifica conferma presenza e resa iniziale desktop, non equivalenza pixel-per-pixel o funzionalità completa della shim. **Ancora non verificati da A sulla versione finale offline:** mobile dopo final-ready, stampa, interazioni della shim e navigazione con tecnologie assistive. La sessione live mobile già conclusa sostiene i rilievi sul sito di fonte; non viene spacciata per test mobile della copia finale. Scheda di A chiusa e viewport ripristinata alla fine.

Le osservazioni **O** sono direttamente viste nel browser o nei sorgenti acquisiti. Le raccomandazioni **R** sono proposte di design. Le ipotesi **H** richiedono test con persone. Il browser mobile impiega una viewport stretta, non dimostra tutti i comportamenti di un telefono reale o di ogni user-agent. Non sono stati testati account, pagamenti, consensi, invio di segnalazioni, permessi di posizione, notifiche o servizi terzi. Non sono stati effettuati test con screen reader, misure di performance in rete lenta o verifica completa della stampa; questi ambiti hanno criteri di accettazione, non risultati inventati.

## Verdetto di specificità

**Contenuto fortemente specifico, composizione moderatamente specifica, priorità del compito debole.** Logo giallo/arancio, blu meteo, pittogrammi del tempo, Italia cartografica e numeri orari rendono immediatamente riconoscibile un prodotto meteorologico italiano. Le tre pagine appartengono allo stesso marchio e non sembrano un template SaaS intercambiabile. La struttura editoriale, però, potrebbe appartenere a molti portali di notizie: masthead pubblicitario, caroselli, social e video governano lo spazio più della decisione meteo. La densità deriva da un patrimonio informativo vero; la ricchezza merita una struttura più chiara, non la cancellazione.

Una direzione credibile è un **bollettino consultabile**: luogo e data dominanti, condizioni e finestre orarie prima dei contenuti editoriali, mappa come prova leggibile, linguaggio rassicurante ma preciso. L'identità iLMeteo può vivere nel marchio conservato, nel blu funzionale e nei simboli originali, con l'arancio riservato allo stato selezionato; il colore di rischio deve seguire una legenda separata.

## Punti di forza da conservare

1. **Accesso locale riconoscibile.** La ricerca è grande e persistente; digitando Bologna con eventi di tastiera compaiono cinque suggerimenti con provincia, compreso Bologna Borgo Panigale. Recenti e preferiti sono acceleratori utili. Il campo ha nome accessibile `Cerca località`.
2. **Ricchezza del dato con attribuzione.** Bologna distingue ultima rilevazione e previsione, dispone di dati orari, minime/massime, vento e raffiche, aria, sole/luna, UV, medie climatiche e autore meteorologo. Il corpus contiene anche la spiegazione dell'attendibilità 50%, che dichiara incertezza su localizzazione, intensità e tempistica. Domani separa tre macroaree e fasi della giornata. Non occorre inventare nuovi valori per migliorare il sito.
3. **Convenzioni del dominio già presenti.** Date/giorni, unità °C e km/h, icone meteo e macroaree aiutano il riconoscimento. Le barre di sezione e la tinta dell'ultima rilevazione sono una base utile per distinguere tipi di contenuto.

## Cinque priorità

| Priorità | Rilievo osservato | Conseguenza e intervento |
|---|---|---|
| P1 | La zona superiore desktop è dominata da uno slot vuoto o da una pubblicità; titolo/previsione iniziano intorno a y=509. Banner pubblicitari al piede coprono contenuti. | La risposta al compito arriva tardi e viene coperta. Mettere luogo/data/sintesi prima degli slot, riservare spazio pubblicitario dichiarato e impedire sovrapposizioni. |
| P1 | A 390 px Domani ha documento largo 644 px: mappa principale 425 px, coppie di mappe da 315 px affiancate. Timestamp sovrapposto al titolo nella prima vista; H1 nascosto. | Parte della mappa e delle precipitazioni resta fuori vista. Impilare figure, scalare senza ritagliare, separare metadati e titolo, mantenere H1 accessibile. |
| P1 | La tabella Bologna ha 14 colonne nel sorgente, icone CSS prive di testo equivalente, switch °C/°F e km/h/nodi implementati come span. Il menu hamburger non appare come controllo nella snapshot DOM/AX. | Comprensione e operabilità dipendono dalla vista e dal puntatore. Usare controlli nativi, nomi/stati accessibili, descrizioni testuali delle condizioni e semantica della tabella. |
| P1 | Ricerca live con `zzzzcitta` produce un link **Not Found** verso `/meteo/++Not+Found?`. | L'errore viene presentato come destinazione, in inglese. Mostrare messaggio italiano non cliccabile, conservare query e offrire correzione/ripartenza. |
| P1 | Numeri senza contesto vicino: 49–50% nei giorni, attendibilità accanto al voto 4.9/5, ore `24`, `1`, `2`; campo Bologna rimane visibile nella pagina nazionale. | È facile confondere attendibilità con probabilità di pioggia, rating con qualità del modello e oggi con il giorno seguente. Etichettare misura e ambito, separare osservazioni/previsioni/opinioni, rendere esplicita la data dopo mezzanotte. |

Non è stato osservato un P0 che impedisca ogni percorso principale sul sito live. Alcuni compiti sono completabili attraverso ricerca e link; la valutazione riguarda lo sforzo, la comprensibilità e i percorsi alternativi.

## Nielsen: punteggi 0–4

Questi sono giudizi euristici sul corpus e sulle sessioni osservate, non un test statistico, una certificazione WCAG o una misura di accuratezza delle previsioni. 0 = assenza/inadeguatezza critica, 4 = eccellenza dimostrata. Tutte le euristiche sono applicabili ai compiti di ricerca e consultazione; non occorre forzare casi di undo su operazioni distruttive che qui non esistono.

| Euristica | Home | Bologna | Domani nazionale | Motivazione |
|---|---:|---:|---:|---|
| 1. Visibilità dello stato | 2 | 3 | 3 | Aggiornamenti e selezioni esistono. Home combina timestamp editoriali e radar; caricamento iniziale della mappa apparso come spazio bianco. Domani dichiara prossimo aggiornamento ma metadati troppo piccoli e sovrapposti su mobile. |
| 2. Corrispondenza con il mondo reale | 2 | 2 | 3 | Il linguaggio del bollettino è italiano e leggibile. `SSW`, `UR%`, `Tperc`, simboli non spiegati, ore dopo mezzanotte e percentuali ambigue chiedono conoscenza del dominio. |
| 3. Controllo e libertà | 2 | 2 | 2 | Home/logo, link dei giorni e normale navigazione browser forniscono uscita. Menu custom, mappe e pannelli richiedono verifica di Escape/focus; non è stato dimostrato un percorso uniforme di reset. |
| 4. Coerenza e standard | 2 | 2 | 2 | Shell e marca comuni; linguaggi di selezione blu/arancio/grigio, `Generale`/`Oggi`, icon-only mobile, link usati per cambiare viste e campo luogo nazionale generano divergenze. |
| 5. Prevenzione degli errori | 1 | 1 | 1 | Suggerimenti con provincia aiutano, ma un risultato invalido rimane cliccabile. Etichette incomplete di ambito, percentuali e data possono produrre una lettura errata prima di qualunque errore tecnico. |
| 6. Riconoscimento anziché memoria | 2 | 2 | 2 | Ricerca, giorni e regioni sono visibili; recente Bologna è reperibile. Le sei icone mobile della Home perdono etichette, i dati avanzati usano abbreviazioni e i minuti/periodi della mappa richiedono interpretazione. |
| 7. Flessibilità ed efficienza | 2 | 3 | 2 | Recenti/preferiti, ricerca, tabella oraria, 1h/3h, PDF/modello e dati avanzati offrono scorciatoie. La scoperta e la tastiera delle opzioni custom richiedono verifica; la ricchezza deve restare secondaria al percorso semplice. |
| 8. Estetica e minimalismo | 1 | 1 | 1 | Pubblicità, caroselli, ripetizioni editoriali, social e video competono con la risposta. La quantità di dati è utile, ma poco graduata; a Bologna nove o più misure appaiono nello stesso livello. |
| 9. Riconoscere e recuperare dagli errori | 1 | 1 | 1 | Il caso senza risultati espone `Not Found` come link. Nessuna indicazione utile osservata per mappa inizialmente bianca o servizio assente. Il backend non è stato stressato. |
| 10. Aiuto e documentazione | 1 | 2 | 1 | Footer con contatti/accessibilità, alcune spiegazioni di attendibilità e titoli tooltip. Mancano aiuti contestuali immediati per unità/abbreviazioni/legende; aiuto, allerta e precisione non sono uno stesso concetto. |
| **Totale** | **16/40** | **19/40** | **18/40** | Fascia Impeccable: **Poor**, revisione importante. L'accesso ai contenuti esiste, ma qualità del percorso e accessibilità sono disomogenee. |

## Carico cognitivo

Il carico intrinseco è distinguere luogo, data, fascia oraria e variabili meteorologiche. Il redesign deve organizzarlo, senza ridurre una previsione a un'icona. Il carico estraneo deriva soprattutto da pubblicità, duplicazioni, etichette assenti e gerarchie concorrenti. Il carico utile può essere sostenuto da legenda, stesse unità e stessi ordinamenti nelle tre pagine.

| Checklist Impeccable | Home | Bologna | Domani | Evidenza |
|---|---|---|---|---|
| Focus singolo | Fallisce | Fallisce | Fallisce | Forecast e contenuto promozionale/editoriale competono per la prima vista. |
| Chunking ≤4 | Fallisce | Fallisce | Fallisce | Navigazione, dimensioni della tabella o serie di mappe superano gruppi piccoli; le tre macroaree di Domani sono invece un buon gruppo. |
| Raggruppamento | Passa | Passa | Passa | Barre blu, sezioni e distinzione dell'ultima rilevazione aiutano. |
| Gerarchia visiva | Fallisce | Fallisce | Fallisce | Spazio above-the-fold non assegnato al compito; titolo e aggiornamento troppo simili o compressi. |
| Una decisione alla volta | Fallisce | Fallisce | Fallisce | Scelta del luogo/giorno compete con news; lettura del dato con modello/voto/servizi; Domani con più mappe e ads. |
| Scelte minime | Fallisce | Fallisce | Fallisce | Più di quattro opzioni in diversi punti; vedere conteggi sotto. |
| Memoria fra schermate | Passa | Passa | Passa | Luogo, giorno e dati principali sono reperibili nella pagina. Esistono ambiguità locali di ambito/data, non obbligo dimostrato di memorizzare una schermata precedente. |
| Disclosure progressivo | Fallisce | Passa | Fallisce | Bologna ha `Altri dati` e selettore del modello. Home e Domani mantengono molte famiglie allo stesso livello; nascondere etichette non è disclosure utile. |
| **Fallimenti** | **6/8** | **5/8** | **6/8** | **Carico alto** secondo la checklist. |

Conteggi distinguono opzioni visibili in una vista, serie intera e numero di dati: non sono un conteggio cieco di tutti i link del documento. La soglia quattro è un segnale da investigare, non una legge che obbliga a nascondere i sette giorni: una serie cronologica stabile può ridurre la memoria più di un menu.

| Punto di decisione | Conteggio osservato | Lettura progettuale |
|---|---|---|
| Navigazione desktop comune | 11 elementi: Menu + Home, Previsioni, Situazione, Radar, Mappe, Neve, Venti e Mari, Utilità, Accedi, Contatti | Mescola compiti, contenuti, utilità e account. Portare le tre destinazioni dell'esercizio in un gruppo principale e il resto in navigazione secondaria dichiarata. |
| Header sociale desktop | 7 link social/account + preferito | Non sono necessarie sette uscite vicino al campo ricerca. Spostare i social in footer conservandone fonte/destinazione. |
| Directory aperta della ricerca | Nord 9, Centro 6, Sud/Isole 6, Europa 5, Mondo 5; Recenti separato | Raggruppamento geografico utile ma molto denso; preferire ricerca e recenti prima della directory completa. |
| Ricerca `Bologna` | 5 suggerimenti + Bologna nei recenti | Province e corrispondenza in grassetto riducono ambiguità. Non tagliare il risultato Borgo Panigale per raggiungere arbitrariamente quattro. |
| Giorni nazionali Home/Domani | Serie di 9; screenshot desktop circa 6 e mobile 3 interi + successivo parziale | Lo scorrimento è suggerito da freccia, ma la serie dev'essere raggiungibile anche da tastiera e il selezionato sempre visibile. |
| Tipi mappa Home | 6: Tempo, Precipitazioni, Neve, Temperature, Venti-Mari, Radar | Desktop testo; mobile sei icone. Raggruppare/rendere etichette visibili, non moltiplicare icone senza nome. |
| Giorni Bologna | Desktop 9: giornaliero + 7 giorni + intervallo; mobile 8 visibili (7 giorni + intervallo) | Selezione cronologica confrontabile è utile; min/max e attendibilità richiedono etichette. |
| Tabella Bologna | 14 colonne di sorgente, incluse una colonna freccia senza nome; desktop ordinario 9 colonne etichettate + freccia; mobile 7 etichettate + freccia | Sono variabili da leggere, non 14 azioni. Impostare una vista essenziale Ora/Tempo/Temperatura/Precipitazioni/Vento e dettaglio della riga accessibile. |
| Scorciatoie sotto tabella Bologna | 5: modelli, domani, dopodomani, 3 giorni, 15 giorni | Duplicano parte della selezione giorno; unirle con una gerarchia, mantenendo funzione e destinazione. |
| Macroaree nazionali | 3 | Struttura efficace da preservare. |
| Mappe nazionali per fascia | 4 fasce, ciascuna due mappe (tempo e precipitazioni) | Otto figure non hanno tutte lo stesso valore immediato. Offrire una scelta Tempo/Precipitazioni e quattro fasce, preservando tutte le figure. |
| Aree regionali nella mappa | 20 aree cliccabili | La posizione geografica aiuta il riconoscimento; serve alternativa testuale invece di trattarle come un menu di venti opzioni. |
| Notizie Home | 8 Meteo + 8 Extra nel corpus; carosello iniziale riutilizza notizie | Conservare le 16 notizie e le attribuzioni, con sezioni ordinate e una sola promozione primaria del contenuto. |

## Viaggio emotivo

| Fase | Esperienza osservabile | Possibile effetto emotivo (H) | Risposta progettuale (R) |
|---|---|---|---|
| Arrivo | Ricerca evidente, ma grandi slot e titoli di maltempo occupano attenzione. | Riconoscimento del marchio, poi fretta e allarme prima di aver definito luogo/data. | Far vedere subito il compito, mantenendo allerta ufficiale separata e localizzata, con validità e fonte. |
| Selezione locale | Bologna genera suggerimenti con provincia; il campo si porta sulle altre pagine. | Sollievo quando la città è riconosciuta; dubbio se `Bologna` in header significa che anche la mappa nazionale è locale. | Esplicitare `Italia · Domani` o `Bologna · Oggi`, mantenendo ricerca come azione globale. |
| Lettura rapida | Icona, min/max e orari danno risposta, ma simboli e percentuali chiedono decodifica. | Sensazione di completezza unita a falsa sicurezza o confusione. | Sintesi in linguaggio ordinario, dato osservato/previsione distinti, unità e attendibilità sempre nominate. |
| Approfondimento | Tabelle dense, tre macroaree, molte mappe; mobile taglia parte delle figure. | Fatica; percezione di aver perso un pezzo importante. | Dati essenziali prima; dettagli disponibili nello stesso contesto; zoom condiviso e descrizione testuale. |
| Errore/attesa | `Not Found` sembra un risultato; una mappa inizialmente bianca non comunica caricamento. | Dubbio sulle proprie azioni e sul funzionamento del sito. | Messaggio italiano, query conservata, azione di recupero e stato di caricamento/fallimento esplicito. |
| Fine | Voto, condivisione, Google/social, video e promozioni chiudono la pagina. | La memoria finale del servizio rischia di essere promozionale anziché rassicurante. | Chiudere il compito con data di edizione e prossima azione pertinente; contenuti editoriali/social restano successivi. |

Per la regola peak-end, il picco desiderato è una risposta locale immediata e comprensibile; la fine desiderata è sapere quale data e quali limiti sostengono quella risposta. Non si deve promettere certezza meteorologica per ottenere rassicurazione. Gli effetti emotivi descritti sono ipotesi da testare, non emozioni misurate.

## Matrice completa di miglioramento e accettazione

### Comune alle tre pagine

| Area | Evidenza/limite | Intervento | Priorità | Criterio di accettazione |
|---|---|---|---|---|
| Identità | Marchio originale, blu, arancio e simboli riconoscibili; layout da portale generalista. | Conservare asset del marchio e icone originali; creare una grammatica coerente di bollettino. | P2 | Il logo originale e la fonte rimangono presenti; stato selezionato, avviso e link hanno ruoli cromatici distinti e documentati. |
| IA | Navigazione desktop di 11 elementi, utilità e account mescolati. | Tre percorsi didattici espliciti Home/Bologna/Italia domani; altri servizi in una sezione secondaria con disponibilità dichiarata. | P1 | Tutte le tre pagine si raggiungono in un passaggio da ogni pagina; pagina corrente indicata testualmente e con `aria-current`. |
| Ricerca | Campo con nome accessibile, recenti e suggerimenti; assenza risultati in inglese come link. | Ricerca locale con suggerimenti disponibili e limiti del corpus; stato vuoto, ricerca non disponibile e nessun risultato distinti. | P1 | Query conservata; zero risultati non produce link fittizio; Enter, frecce ed Escape funzionano; conteggio/stato annunciato. |
| Ambito e tempo | Timestamp diversi per previsione, rilevazione, editoriale e radar. | Metadati collegati al proprio blocco; giorno assoluto, anno e fuso dichiarati dove utili; banner stabile di edizione congelata. | P1 | Il titolo identifica Italia/Bologna e la data; data acquisizione non è mostrata come aggiornamento live; nessun timestamp radar/editoriale sostituisce quello della previsione. |
| Gerarchia | Previsione sotto slot pubblicitario desktop; molte barre/titoli concorrenti. | Primo schermo dedicato a luogo, data, sintesi e accesso agli orari/mappe. | P1 | A 1280×720 e 390×844 sono visibili luogo/ambito, data di edizione e risposta principale senza scorrere oltre pubblicità. |
| Pubblicità/fiducia | Slot grandi, banner sticky sovrapposti e raccomandazioni commerciali con stile editoriale. | Slot delimitati, etichetta `Pubblicità`, nessuna sovrapposizione; nella copia solo spazio/nota offline per servizi remoti. | P1 | Nessun contenuto o controllo può essere coperto da uno slot; messaggi promozionali distinguibili dalle notizie; copia locale non simula inserzionisti live. |
| Tipografia | Font condensato per quasi tutto; dati piccoli, testo su immagine e timestamp minuti. | Corpo più leggibile, cifre tabulari, gerarchia di titoli; font condensato eventualmente limitato alla marca/titoli. | P1 | Corpo ordinario almeno 16px, line-height circa 1.45–1.6; metadati leggibili; numeri allineati; titoli notizie senza ellissi indispensabili a capire il contenuto. |
| Colore | Minime blu/massime rosse, attendibilità colorata, differenti selezioni e rischio. | Accompagnare colore con etichetta; separare temperatura, stato e pericolo. | P1 | Min/Max e attendibilità hanno nomi visibili; contrasto del testo ≥4.5:1 e controlli/grafica significativa ≥3:1; nessuna misura richiede solo il colore. |
| Tastiera | Hamburger custom assente nella snapshot come controllo; span di switch; mappe. | Button/link nativi, ordine focus logico, skip link e focus visibile. | P1 | Percorso Home→Bologna→Domani e apertura/chiusura di dettagli/zoom interamente da tastiera; nessun focus perso; Escape richiude e restituisce il focus al trigger. |
| Semantica | Home/Domani perdono H1 nella vista mobile; icone CSS prive di nome. | Un H1 visibile/leggibile per pagina, landmark e gerarchia valida; testo per condizioni. | P1 | Screen reader può individuare titolo, navigazione e main; condizioni leggibili senza sprite/CSS; nessun heading usato per un paragrafo intero. |
| Touch/responsive | Preferito 24px; menu 35×30, 1h/3h circa 27px; diverse azioni alte 29–34px. | Target progettuali almeno 44px, spazio tra azioni, header meno denso. | P1 | Controlli primari ≥44×44px o area cliccabile equivalente; layout senza overflow dell'intera pagina a 320/390px e 200% zoom. |
| Motion | Radar live riproduce sequenza; caroselli e video presenti. | Niente autoplay nella copia; pausa/controllo chiari, movimento ridotto. | P2 | `prefers-reduced-motion` elimina transizioni non essenziali; ogni animazione continua ha pausa; nessuna mappa congelata sembra in riproduzione live. |
| Stati | Account, video, posizione e servizi remoti esclusi offline. | Funzioni locali reali e limiti espliciti prima dell'azione; errori di asset conservano testo. | P1 | Nessun controllo promette invio/accesso/posizione remota inesistente; stato indisponibile nominato; loader termina in contenuto o errore utile. |
| Locale/unità | Italiano con `Not Found`, abbreviazioni inglesi dei venti, punto decimale. | Copy UI italiano, unità sempre esplicite, formattazione italiana coerente; originali/dati preservati. | P2 | `21,1 °C`, `8 km/h`, `25 km/h raffiche` coerenti; eventuali conversioni testate e reversibili; unità non cambiate con sola tinta. |
| Conservazione | Molte notizie, dati, immagini e link; attività di redesign non autorizza nuove previsioni. | Contenuto separato dalla presentazione, mappa di provenienza e indice dei contenuti. | P1 | Tutti i testi, valori, autori, immagini attive e attribuzioni del corpus reperibili; eventuale sintesi è derivata e rimanda al testo integrale; nessuna licenza inventata. |
| Stampa | Non verificata in A. | Foglio di stampa per titolo, edizione, testi, tabelle e mappe senza UI promozionale. | P2 | Anteprima stampa senza tagli di colonne/figure; intestazioni di tabella ripetute, date/unità presenti, colori non unica chiave. |
| Performance | Ads/scripts terzi e video influenzano live; nessuna misura quantitativa eseguita. | Asset locali ottimizzati preservando originali, lazy-load below-fold, dimensioni riservate. | P2 | Nessuna richiesta di rete necessaria alla copia; testo utile disponibile prima di mappe; immagini hanno dimensioni; misurare LCP/CLS in ambiente dichiarato senza chiamare l'audit una misura live. |

### Home

| Area | Evidenza | Intervento | Priorità | Criterio di accettazione |
|---|---|---|---|---|
| Primo compito | Ricerca ampia ma primo contenuto meteo arriva dopo ads/news. | Ricerca nel titolo funzionale, accesso chiaro a Bologna e al bollettino nazionale. | P1 | Entro la prima vista si capisce dove cercare la città e dove leggere Italia domani; test utente identifica prima azione entro 5s. |
| Sintesi nazionale | Un lungo paragrafo è H3; mescola venerdì, weekend e settimana successiva. | Conservare testo integrale, fornire indice/riassunto per periodo usando solo fatti del corpus. | P1 | Ogni sintesi espone periodo e area; testo integrale rimane presente; nessuna inferenza meteo presentata come nuovo fatto. |
| Mappa/radar | Sei famiglie; mobile icone sole; radar ha passato/futuro e timestamp. | Etichette visibili, legenda, scelta mappa limitata alle risorse realmente acquisite; radar statico dichiarato. | P1 | Tipo e istante della mappa leggibili; chi non interpreta la figura ha una spiegazione; versione congelata non cambia timestamp o simula dati futuri. |
| Caricamento | Primo screenshot mobile mostra area mappa bianca; poi radar caricato. | Placeholder con titolo/stato, dimensione stabile e fallback testuale. | P2 | Un asset lento o fallito non lascia un vuoto senza spiegazione; testo e percorso locale disponibili subito. |
| News Meteo/Extra | 16 articoli, alcuni ripetuti nel carosello; immagini con alt `Immagine carosello N`. | Gerarchia editoriale secondaria, titoli integrali, timestamp e categorie chiari; evitare ripetizioni della stessa azione nel focus. | P2 | Tutti i 16 articoli e fonte/tempo conservati; immagini decorative con alt vuoto o descrizioni pertinenti; articolo accessibile dal titolo senza annuncio duplicato della stessa frase. |
| Allerte | Bollettino Protezione Civile fra le notizie, con arancio/giallo riferiti a regioni. | Posizione riconoscibile dell'allerta ufficiale con fonte, regioni e validità riportate dal corpus. | P1 | Non si attribuisce l'allerta a Bologna né a una nuova data; l'indicazione non si confonde con un titolo commerciale. |
| Europa/mondo | Due moduli ricerca e mappe aggiuntive; non nel perimetro delle tre copie. | Conservare contenuti ma dichiarare il percorso esterno/non acquisito; evitare form locale finto. | P2 | Attivazione comunica disponibilità reale e destinazione; nessun risultato inventato; fonte accessibile con scelta esplicita. |

### Bologna

| Area | Evidenza | Intervento | Priorità | Criterio di accettazione |
|---|---|---|---|---|
| Panoramica locale | Il titolo è corretto ma valori principali sparsi fra giorni, tabella e testo. | Sintesi di Bologna oggi con min/max, condizioni e attendibilità della stessa edizione, seguita da orari. | P1 | Il lettore può riportare luogo, giorno, min/max e limiti senza interpretare la tabella; valori confrontati con dati acquisiti. |
| Data/orari | Sequenza 20,21,22,23,24,1,2 senza data riga; ultima rilevazione prima degli orari. | Specificare osservazione e previsione, etichettare passaggio a venerdì 9; rappresentazione 00:00 derivata da `24` documentata. | P1 | Nessuna riga 1/2 viene attribuita a giovedì; formato orario coerente; dato originale e normalizzazione rintracciabili. |
| Vista essenziale | Molte colonne, nove misure desktop più freccia; mobile caratteri molto piccoli. | Cinque colonne essenziali e dettaglio completo della riga; mantenere tutti i parametri. | P1 | 390px leggibili senza comprimere il testo sotto la soglia; ora e condizioni sempre presenti; pannello dettaglio conserva grandine, T percepita, pressione, UR, visibilità, aria, UV e quota neve. |
| Semantica tabella | `th` esistono, senza scope; header malformato recuperato dal browser; CSS sprite senza testo. | Caption, thead/tr/th con scope; label delle condizioni e vento testuale; niente righe cliccabili senza button. | P1 | Screen reader annuncia ora+nome colonna+valore; HTML valido; icona sole/nuvole non è l'unica risposta alla colonna Tempo. |
| Vento/precipitazioni | `SSW 825` nella mera estrazione text; visivamente abbreviazione e raffica ravvicinate. | Separare direzione, velocità e raffica; legenda delle frecce; quantità/probabilità solo quando esistenti. | P1 | `Sud-sud-ovest · 8 km/h · raffiche 25 km/h`; nessuna percentuale attendibilità reinterpretata come pioggia; `pioggia debole` preservato. |
| Attendibilità e rating | Snapshot 50%, giorni 49–50%, widget accanto a voto4.9/5; spiegazione meteorologo sotto tabella. | Portare spiegazione vicino al dato e distinguere qualità della previsione da voto utenti. | P1 | Etichetta `Attendibilità della previsione`, testo originale di incertezza reperibile subito, voto utenti nominato; non sostituire50% con89% live. |
| Dati ambientali | Aria/pollini, UV, sole, energia, precipitazioni, medie e ieri ricchi ma dispersi. | Sezioni secondarie per ambiente, sole/luna, storico; valori e unità completi. | P2 | Tutti i dati restano disponibili; NO2/PM10 non leggibili come temperatura; UV spiegato senza aggiungere indicazioni sanitarie non verificate. |
| Controlli avanzati | Modello, PDF, evento, 1h/3h, radar, segnalazione. | Funzioni effettive del laboratorio nominate; selettori e dettagli accessibili; PDF solo se realmente generato. | P1 | Ogni controllo produce un cambiamento verificabile o una spiegazione di indisponibilità; nessuna segnalazione fittizia; nessun invio remoto. |
| Luogo alternativo | Regione/provincia/comune più ricerca globale. | Un solo percorso di cambio località prominente; selettori archivio secondari e limiti del corpus. | P2 | Utente non deve scegliere tre select per aprire Bologna; elenco non offre città senza copie come se complete. |
| Fonte/autore | Mattia Gussoni e fotografia, dettagli comuni e storici. | Conservare fonte/autore presso il testo, differenziare dati geografici da previsione. | P2 | Autore, attribuzione e dati originali invariati; abitanti/CAP/coordinate non sono presentati come aggiornamento live. |

### Domani nazionale

| Area | Evidenza | Intervento | Priorità | Criterio di accettazione |
|---|---|---|---|---|
| Ambito | Header conserva Bologna; titolo Domani ripetuto; mobile H1 nascosto. | Titolo unico `Italia · Venerdì 9 ottobre 2026`; ricerca separata e navigazione giorni coerente. | P1 | Ambito Italia non richiede deduzione dalla mappa; un H1 in tutte le viewport; link locale Bologna distinto dal bollettino. |
| Aggiornamento | `17.39 / Prossimo20.25` vicino al titolo e sovrapposto a390px. | Riga metadati autonoma; copia congelata esplicita, prossimo aggiornamento descritto come dato di fonte dell'edizione. | P1 | Nessuna sovrapposizione; almeno16px o dimensione metadato accessibile; non si promette un aggiornamento alle20:25 nella copia. |
| Mappa principale | 425px fissi; moltissimi pittogrammi; tabella abbreviata dei capoluoghi nell'immagine. | Figura responsiva, zoom condiviso, legenda e testo alternativo di sintesi. | P1 | Tutta la figura è visibile a320/390px; zoom accessibile e richiudibile; testo sintetico copre il significato principale; nessuna mappa senza data/ambito. |
| Temperature | Valori min/max incorporati nella raster con sigle cittadine. | Esplicitare legenda min/max e città; preservare raster, eventuale tabella trascritta soltanto da valori verificati. | P1 | Legenda non dipende dal rosso/blu; nessun numero OCR incerto presentato come dato; immagine originale ingrandibile. |
| Tre macroaree | Nord, Centro/Sardegna, Sud/Sicilia con condizioni, venti/mari e massime. | Titoli e paragrafi leggibili, indice a tre sezioni; riquadro/righe tematiche solo da testo originale. | P2 | Tre sezioni direttamente raggiungibili; testo integrale conservato; differenze regionali non appiattite in una previsione unica. |
| Otto mappe di fascia | Due immagini315px affiancate per quattro periodi; doc644px su390. | Scelta Tempo/Precipitazioni, fasce con orario completo; in assenza di JS tutte le figure impilate. | P1 | Zero overflow globale; ogni combinazione ha immagine originale, titolo e orario; JS disattivato non elimina contenuti. |
| Confine giorno | Notte è `meteo dopodomani, ore2–5`, pur dentro Domani. | Data esplicita sabato10 accanto alla fascia notte; nessun cambio di significato. | P1 | Utente identifica la notte successiva come10 ottobre e non come9; etichetta originale ancora reperibile. |
| Imagemap/regioni | Venti aree regionali; una parte usa javascript:pr. | Alternativa testuale con link veri o indicazione non acquisito; zoom non usa regione come unica azione. | P2 | Tastiera raggiunge le regioni senza coordinate; destinazioni non disponibili offline dichiarate; nessun javascript link rotto. |
| Lettura/chiusura | Approfondimento, regioni e mappe seguiti da condivisione/promozioni. | Chiusura con fonte/edizione e percorso a Bologna/Home, poi eventuale editoriale. | P2 | Finita la lettura l'utente sa quale giorno ha letto e quale passo fare; attribuzione integra e nessuna CTA sociale più prominente del ritorno al compito. |

## Persona red flags

**Jordan, prima visita:** `49%` sotto Ven9 sembra probabilità di pioggia; `Generale` non spiega se si tratta dell'Italia o della località; le sei icone della Home mobile chiedono riconoscimento senza legenda. Da testare se luogo/data vengono compresi prima della scelta di un giorno.

**Sam, tastiera/screen reader/ingrandimento:** hamburger custom non è esposto come controllo nella snapshot; switch span e righe interattive possono non essere raggiungibili; condizioni del tempo come sprite non vengono annunciate; mobile Domani ha H1 nascosto e overflow644px. Una checklist visuale non sostituisce la prova con tecnologie assistive.

**Casey, mobile distratto:** menu e preferito piccoli; calendario Bologna stretto ma denso; alla prima apertura Home la mappa può essere bianca; in Domani la seconda figura è fuori schermo. Un'interruzione può far perdere quale orario/date si stava confrontando. Stato di query/giorno e selezione devono essere conservati localmente senza fingere nuovi dati live.

**Alex, utente esperto:** modello, unità, 1h/3h, storico e aria sono vantaggi veri; rimuoverli per ottenere una schermata pulita sarebbe una regressione. Il percorso avanzato deve avere una posizione stabile, accesso da tastiera e dati completi.

## Osservazioni minori e test necessari

- Testo su foto/news troncato, molti titoli in maiuscolo e font condensato riducono la differenziazione tra titolo, metadato e corpo. Non cambiare i titoli factual/editoriali nella sola operazione grafica.
- Numeri min/max senza testo, vento con abbreviazioni cardinali inglesi, `°C gradi`, `Tperc`, `Wh/mq` e quote chiedono armonizzazione della presentazione. Il raw source resta fonte; la formattazione leggibile può essere derivata.
- Le didascalie `Immagine carosello1` o `Webcam immagine1` descrivono la posizione dell'asset più che il contenuto. Per articolo con titolo vicino un alt vuoto può evitare ripetizioni; per una mappa occorre descrivere il dato o rimandare al testo equivalente.
- Footer e articolo mostrano fonte societaria/autori: aumentare la leggibilità di questi elementi preserva la fiducia meglio di aggiungere un badge generico di credibilità.

Test di accettazione con persone, ancora **H**: (1) trovare Bologna e riferire oggi/max/vento; (2) spiegare49–50% senza chiamarla probabilità di pioggia; (3) leggere Italia domani e identificare l'area più interessata dal corpus; (4) distinguere la notte di sabato10 dalla giornata di venerdì9; (5) cercare una città assente e recuperare; (6) completare gli stessi compiti con tastiera,200%zoom e viewport stretta. Confrontare originali e redesign sugli stessi dati e scenario, misurando completamento, tempo, errori di luogo/data e comprensione; la bellezza da sola non dimostra miglioramento.

Domande di ricerca da verificare nel laboratorio: gli studenti riconoscono il significato dell'attendibilità? Quanta informazione della tabella serve davvero alla loro decisione? La mappa anticipa o ritarda la comprensione rispetto al testo delle tre macroaree? Un calendario di sette giorni leggibile aiuta più di un menu ridotto? Pubblicità e titoli di maltempo modificano la fiducia nella previsione anche quando i valori rimangono identici?

Questions skipped: richiesta autorizzata di analisi completa e costruzione delle copie, senza necessità di interrogare l'utente; domande di ricerca registrate per il successivo esercizio, non usate per bloccare il lavoro.
