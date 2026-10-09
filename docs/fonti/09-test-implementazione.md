# Lezione 09 · Test e implementazione

Fonte: Booklet CVeDI · C03 Processo UX, pagine Figma [C03.12 · Test e usabilità](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC?node-id=2613-1119) e [C03.13 · Implementazione](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC?node-id=2613-1120). Tavole 235–260; contenuti visibili estratti il 7 ottobre 2026.

Numerazione delle fonti: le tabelle conservano gli ordinali dello snapshot storico del 7 ottobre 2026 (260 tavole). Il capitolo Figma corrente conta 289 tavole, con 10 tavole di apertura e 59 nella sezione culturale. Le sei aperture delle dimensioni separano i due poli con immagini concettuali; ciascuna è seguita da una tavola distinta con il grafico nativo e i dati The Culture Factor consultati il 9 ottobre 2026. Le tavole teoriche occupano ora le posizioni 11–47, seguite dalla tavola ponte 48; i casi completi McDonald’s 49–64 e Alibaba 65–69 conservano testi e immagini delle pagine PDF 172–187 dell’edizione 2024. Le posizioni correnti delle fonti teoriche sono registrate in figmaPages.sourceOrdinalMap e la mappa dei casi in currentIntegralCaseRevision, nel registro assets/booklet/capitolo-3/testo-figma-aggiornato.json. Agli ordinali storici 41–260 si aggiunge 29; nelle tavole precedenti lo spostamento è progressivo per le sei inserzioni e va letto nella mappa. Le tabelle delle slide, i minuti, i conteggi e lo snapshot storico non sono rinumerati dalla revisione Figma.

38 slide, 120 minuti. Testi adattati per la presentazione; esempi, qualificazioni e figure conservano il riferimento al booklet. Le attività sono adattamenti didattici.

| Slide | Titolo | Tavole C03 | Minuti |
| --- | --- | --- | --- |
| 1 | Test e implementazione | 235 | 0.5 |
| 2 | Dall’uso al miglioramento | 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260 | 0.5 |
| 3 | Cosa impareremo | 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260 | 3 |
| 4 | Usabilità nel contesto | 235 | 3 |
| 5 | Osservare risultati e comportamenti | 236 | 3 |
| 6 | Testare lungo il processo | 236, 237 | 2 |
| 7 | Valutazione euristica e test con utenti | 238 | 3 |
| 8 | Quattro scelte indipendenti | 238 | 3.5 |
| 9 | Focus group e test di usabilità | 239 | 3 |
| 10 | Il team conosce troppo il proprio prodotto | 239, 240 | 2.5 |
| 11 | Il modello operativo di Steve Krug | 241, 242 | 2.5 |
| 12 | Quanti partecipanti servono? | 243 | 2.5 |
| 13 | Reclutare persone pertinenti | 244 | 2.5 |
| 14 | Preparare un contesto adeguato | 245 | 2.5 |
| 15 | Il ruolo del facilitatore | 245 | 2.5 |
| 16 | Il ruolo degli osservatori | 246 | 2.5 |
| 17 | Che cosa testare e quando | 247 | 2.5 |
| 18 | Una consegna orientata al compito | 248 | 2.5 |
| 19 | Verificare il protocollo | 248 | 2.5 |
| 20 | Una sessione, passo per passo | 249, 250 | 3.5 |
| 21 | Tre problemi da riconoscere | 251 | 2.5 |
| 22 | Il piano di un test | 252 | 3.5 |
| 23 | Preparare un test sul prototipo | 244, 245, 246, 247, 248, 249, 250, 251, 252 | 10 |
| 24 | Osservare una sessione didattica | 245, 246, 247, 248, 249, 250, 251, 252 | 12 |
| 25 | Dal test alle decisioni | 253 | 2.5 |
| 26 | Dare priorità con criteri chiari | 253, 254 | 2.5 |
| 27 | Fatto, interpretazione e decisione | 253 | 2.5 |
| 28 | Debriefing e prossimo ciclo | 253, 254 | 8 |
| 29 | Test da remoto | 255 | 2.5 |
| 30 | Card sorting e tree testing | 256 | 2.5 |
| 31 | Metodi diversi, domande diverse | 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256 | 3.5 |
| 32 | Implementare continua il progetto | 257, 258 | 2 |
| 33 | Verifiche durante lo sviluppo | 259 | 2.5 |
| 34 | Sviluppo e sicurezza nel ciclo di vita | 259, 260 | 3.5 |
| 35 | Misurare e migliorare dopo il rilascio | 259 | 2.5 |
| 36 | Documentare la consegna | 258, 259, 260 | 2.5 |
| 37 | Il percorso resta aperto | 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260 | 2.5 |
| 38 | Un prossimo passo per il progetto | 253, 254, 255, 256, 257, 258, 259, 260 | 2.5 |

## Crediti e riferimenti nel booklet

Gli originali delle figure, le fonti e le codifiche sono registrati in `assets/booklet/capitolo-3/slide-assets.json`. I materiali di terzi conservano i rispettivi diritti.

- Tavola 249: Approfondimento

- Tavola 249: Approfondimento: Chiara Gallo, 2024–2025. Verifica: GOV.UK Service Manual, test moderati e consenso informato.

- Tavola 253: Approfondimenti: Chiara Gallo, 2024–2025; Chiara Bianchimani, 2023–2024. Verifica: GOV.UK, Analyse a research session; Nielsen, Severity Ratings (1994).

- Tavola 256: Approfondimento: Giulia Pisanu, A.A. 2021–2022 (frontespizio). Verifica: NN/g, Card Sorting vs. Tree Testing; Tree Testing.

Riferimenti collegati dalla fonte:

- [Riferimento originale](https://www.gov.uk/service-manual/user-research/analyse-a-research-session)
- [Riferimento originale](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing)
- [Riferimento originale](https://www.nngroup.com/articles/card-sorting-tree-testing-differences/)

Verifica dei riferimenti: [ISO 9241-210:2019](https://www.iso.org/standard/77520.html) e [NIST · SSDF](https://csrc.nist.gov/projects/ssdf), consultati il 7 ottobre 2026.
