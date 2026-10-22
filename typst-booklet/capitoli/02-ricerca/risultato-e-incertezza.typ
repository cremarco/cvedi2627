#import "../../template/stile.typ": sito
#import "componenti.typ": tavola-intera, documento, grafico, dati-dimensioni


=== Motivazione al risultato e al successo · MAS

La sigla MAS (masculinity) riprende il nome storico della dimensione «mascolinità/femminilità». The Culture Factor la chiama oggi «motivazione al risultato e al successo», mantenendone punteggi e significato. Il confronto riguarda il peso di competizione, risultati e successo materiale rispetto a cooperazione, cura e qualità della vita.

Il nome storico riflette la terminologia di Hofstede. L’indice descrive valori a livello sociale; non misura il genere o le emozioni dei singoli utenti. Per il design suggerisce domande su come vengono interpretati messaggi di prestazione, riconoscimento, relazioni e benessere condiviso. @hofstede2011-cultures.

*Competizione e risultati*

Ipotesi per la ricerca:

- Quali traguardi ricevono riconoscimento?
- Come vengono raccontate prestazioni e successo?
- Il confronto tra risultati è utile nel compito e per il pubblico del servizio?

*Cooperazione e qualità della vita*

Ipotesi per la ricerca:

- Quali relazioni sostiene il servizio?
- Come vengono rappresentati cura e cooperazione?
- Quali aspetti del benessere condiviso contano per le persone coinvolte?

La metafora nella @fig-ricerca-mas-metafora mette a confronto i due poli: Cooperazione e qualità della vita e Competizione e riconoscimento del successo.

#tavola-intera(path("/assets/images/figure/ricerca/mas-metafora.png"), [Il ponte costruito insieme e le salite parallele rappresentano cooperazione e riconoscimento dei risultati. Sono metafore del MAS, non ruoli legati al genere delle persone.], <fig-ricerca-mas-metafora>, "Il ponte costruito insieme e le salite parallele rappresentano cooperazione e riconoscimento dei risultati. Sono metafore del MAS, non ruoli legati al genere delle persone.")

Quali valori ricevono riconoscimento: cooperazione e qualità della vita, oppure competizione e successo? MAS (masculinity) è il nome storico della dimensione; The Culture Factor usa oggi «motivazione al risultato e al successo» (@fig-ricerca-mas-dati).

Nella ricerca UX, verifica quali valori esprimono messaggi e immagini e come vengono interpretati dalle persone coinvolte. #sito([The Culture Factor, MAS; dati consultati il 9 ottobre 2026.], "https://www.theculturefactor.com/country-comparison-tool")

#grafico(dati-dimensioni.find(d => d.code == "MAS").data, [L’asse confronta il peso relativo di cooperazione e qualità della vita rispetto a competizione e successo. I punteggi aiutano a formulare domande sui valori comunicati, senza descrivere genere o personalità.]) <fig-ricerca-mas-dati>

#block(sticky: true)[#strong[Governo giapponese]]

Nella schermata del sito web del governo giapponese, notizie e anteprime presentano obiettivi raggiunti, investimenti e contributi del Paese a temi globali.

Per discutere il MAS, osserviamo quali valori emergono e chiediamoci quale spazio ricevano anche sostenibilità e qualità della vita. La funzione del sito e il pubblico previsto sono centrali: la promozione di un Paese può spiegare l’enfasi sui suoi successi. Il confronto richiede contenuti e periodi di pubblicazione comparabili (@fig-ricerca-c03-019-01).

#documento(path("/assets/images/figure/ricerca/c03-019-01.jpeg"), [Notizie e anteprime raccontano contributi, attività e temi del Paese. Il MAS invita a confrontare riconoscimento dei risultati e qualità della vita, considerando anche finalità editoriali, destinatari e periodo della pagina.
Homepage del sito del governo giapponese · screenshot storico.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Notizie e anteprime raccontano contributi, attività e temi del Paese. Il MAS invita a confrontare riconoscimento dei risultati e qualità della vita, considerando anche finalità editoriali, destinatari e periodo della pagina.\nHomepage del sito del governo giapponese · screenshot storico.", altezza: 285pt, rapporto: 1.00263852) <fig-ricerca-c03-019-01>

#block(sticky: true)[#strong[Governo svedese]]

Nella schermata del sito del governo svedese, la notizia iniziale riguarda la comunità LGBTQ+; altre immagini mostrano relazioni tra generazioni e attività di sostegno reciproco. Cura e benessere collettivo sono temi utili per discutere il polo della cooperazione e della qualità della vita del MAS.

La selezione editoriale documenta però ciò che questa pagina sceglie di mostrare. Per interpretarla insieme all’esempio giapponese vanno considerati finalità, destinatari e momento della pubblicazione, oltre ai valori evocati dalle immagini (@fig-ricerca-c03-020-01).

#documento(path("/assets/images/figure/ricerca/c03-020-01.jpeg"), [Diritti LGBTQ+ e immagini di cura rendono visibili temi di benessere condiviso. Nel MAS sono spunti sul polo della cooperazione; una selezione editoriale non descrive tutti i valori della società.
Homepage del sito del governo svedese · screenshot storico.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Diritti LGBTQ+ e immagini di cura rendono visibili temi di benessere condiviso. Nel MAS sono spunti sul polo della cooperazione; una selezione editoriale non descrive tutti i valori della società.\nHomepage del sito del governo svedese · screenshot storico.", altezza: 285pt, rapporto: 0.66901408) <fig-ricerca-c03-020-01>

#block(sticky: true)[#strong[Documenti e confronti]]

Il documento norvegese conserva un terzo contesto, distinto dal governo svedese. Non è una nuova versione della stessa pagina.

La @fig-ricerca-online-giappone-20261009 mostra Giappone. Prima schermata del sito ufficiale · 9 ottobre 2026. #sito([Giappone; consultazione del sito documentata il 9 ottobre 2026.], "https://www.japan.go.jp/")

#documento(path("/assets/images/figure/ricerca/online-giappone-20261009.jpg"), [Prima schermata del sito ufficiale · 9 ottobre 2026.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.", altezza: 245pt, rapporto: 1.77777778) <fig-ricerca-online-giappone-20261009>

La @fig-ricerca-online-svezia-20261009 mostra Svezia. Prima schermata del sito ufficiale · 9 ottobre 2026. #sito([Svezia; consultazione del sito documentata il 9 ottobre 2026.], "https://www.government.se/")

#documento(path("/assets/images/figure/ricerca/online-svezia-20261009.jpg"), [Prima schermata del sito ufficiale · 9 ottobre 2026.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.", altezza: 245pt, rapporto: 1.77777778) <fig-ricerca-online-svezia-20261009>

La @fig-ricerca-hofstede-giappone-2024 mostra Giappone · temi istituzionali. Temi istituzionali e notizie nella schermata.

#documento(path("/assets/images/figure/ricerca/hofstede-giappone-2024.jpg"), [Temi istituzionali e notizie nella schermata. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Temi istituzionali e notizie nella schermata. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 1.04192872) <fig-ricerca-hofstede-giappone-2024>

La @fig-ricerca-hofstede-norvegia-2024 mostra Norvegia · documento storico. Altro Paese: messaggi di governo e relazioni sociali.

#documento(path("/assets/images/figure/ricerca/hofstede-norvegia-2024.jpg"), [Altro Paese: messaggi di governo e relazioni sociali. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Altro Paese: messaggi di governo e relazioni sociali. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 1.63043478) <fig-ricerca-hofstede-norvegia-2024>

#place.flush()

=== Avversione all’incertezza · UAI

L’avversione all’incertezza (UAI, Uncertainty Avoidance Index) indica quanto, in una società, le situazioni ambigue o sconosciute sono vissute come una minaccia. Punteggi alti segnalano un maggiore disagio verso l’ambiguità; punteggi bassi, una maggiore tolleranza. L’indice descrive una tendenza collettiva: non misura l’avversione al rischio, la creatività o il rispetto delle regole delle singole persone.

Nella progettazione offre uno spunto per indagare quanto contino familiarità, prevedibilità e interpretazione di elementi nuovi. La ricerca deve però distinguere queste aspettative dagli effetti di esperienza, compito e posta in gioco. Alcune soluzioni, come prezzi chiari, feedback tempestivi e possibilità di recuperare dagli errori, sono utili a pubblici diversi. @hofstede2011-cultures.

*Alta avversione all’incertezza*

Ipotesi per la ricerca:

- Quali passaggi risultano ambigui?
- Etichette e riferimenti sono familiari?
- Quali informazioni servono per capire condizioni, conseguenze e passo successivo di un’azione?

*Bassa avversione all’incertezza*

Ipotesi per la ricerca:

- Come vengono interpretati elementi nuovi?
- Quali percorsi di esplorazione risultano utili?
- Quando la varietà facilita la scoperta e quando ostacola il compito da svolgere?

La metafora nella @fig-ricerca-uai-metafora mette a confronto i due poli: Tolleranza dell’ambiguità e Disagio verso l’ambiguità.

#tavola-intera(path("/assets/images/figure/ricerca/uai-metafora.png"), [Percorsi aperti e riferimenti ripetuti evocano tolleranza dell’ambiguità e ricerca di prevedibilità. La metafora riguarda UAI: non contrappone creatività a obbedienza né misura il rischio.], <fig-ricerca-uai-metafora>, "Percorsi aperti e riferimenti ripetuti evocano tolleranza dell’ambiguità e ricerca di prevedibilità. La metafora riguarda UAI: non contrappone creatività a obbedienza né misura il rischio.")

Quanto le situazioni ambigue o sconosciute generano disagio? Un indice basso indica maggiore tolleranza dell’ambiguità; uno alto, maggiore bisogno di prevedibilità. Non misura l’avversione al rischio (@fig-ricerca-uai-dati).

Nella ricerca UX, osserva quali passaggi risultano ambigui e quali informazioni consentono di capire condizioni, conseguenze e azioni successive. #sito([The Culture Factor, UAI; dati consultati il 9 ottobre 2026.], "https://www.theculturefactor.com/country-comparison-tool")

#grafico(dati-dimensioni.find(d => d.code == "UAI").data, [Le posizioni confrontano il disagio collettivo verso situazioni ambigue. I punteggi suggeriscono verifiche su familiarità e prevedibilità del servizio; non indicano percentuali di utenti né propensione individuale al rischio.]) <fig-ricerca-uai-dati>

#block(sticky: true)[#strong[KFC Bielorussia]]

Nella schermata di KFC in Bielorussia, prezzi e percentuali di sconto compaiono in una struttura regolare; il menu dei prodotti è disponibile nella stessa pagina. Sono informazioni che possono sostenere il confronto tra offerte.

Per discutere lo UAI possiamo chiedere quali dubbi restino prima dell’acquisto e se questi contenuti aiutino a risolverli. Promozioni e organizzazione del menu dipendono anche da obiettivi commerciali: la schermata, da sola, non rivela il disagio degli utenti verso l’ambiguità (@fig-ricerca-c03-023-01).

#documento(path("/assets/images/figure/ricerca/c03-023-01.jpeg"), [Prezzi, sconto e categorie permettono di confrontare l’offerta nella pagina. Per lo UAI, verifichiamo quali dubbi risolvono e quali restano; la struttura regolare non dimostra il bisogno di prevedibilità degli utenti.
Homepage di KFC in Bielorussia · screenshot storico.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prezzi, sconto e categorie permettono di confrontare l’offerta nella pagina. Per lo UAI, verifichiamo quali dubbi risolvono e quali restano; la struttura regolare non dimostra il bisogno di prevedibilità degli utenti.\nHomepage di KFC in Bielorussia · screenshot storico.", altezza: 285pt, rapporto: 0.84821429) <fig-ricerca-c03-023-01>

#block(sticky: true)[#strong[KFC Danimarca]]

Nella schermata di KFC in Danimarca, lo slogan, la fotografia del prodotto e il prezzo «49» danno rilievo a una promozione. Seguono sezioni per ordinare online e per le opportunità di lavoro.

Il confronto sullo UAI invita a verificare quali informazioni rendano l’offerta comprensibile e quali dubbi restino prima della scelta. La campagna e il compito incidono sulle informazioni necessarie: una fotografia ampia o la quantità di contenuti non misurano il disagio verso l’ambiguità del pubblico (@fig-ricerca-c03-024-01).

#documento(path("/assets/images/figure/ricerca/c03-024-01.jpeg"), [La fotografia principale, lo slogan e il prezzo concentrano l’attenzione sull’offerta. Lo UAI suggerisce di chiedere quali informazioni servano prima della scelta; pochi contenuti non dimostrano maggiore tolleranza dell’ambiguità.
Homepage di KFC in Danimarca · screenshot storico.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "La fotografia principale, lo slogan e il prezzo concentrano l’attenzione sull’offerta. Lo UAI suggerisce di chiedere quali informazioni servano prima della scelta; pochi contenuti non dimostrano maggiore tolleranza dell’ambiguità.\nHomepage di KFC in Danimarca · screenshot storico.", altezza: 285pt, rapporto: 0.97938144) <fig-ricerca-c03-024-01>

#block(sticky: true)[#strong[Documenti e confronti]]

I documenti KFC della Russia e della Bielorussia sono distinti: confrontare prezzi, punti e informazioni senza confondere i mercati.

La @fig-ricerca-online-kfc-bielorussia-20261009 mostra KFC Bielorussia. Prima schermata del sito ufficiale · 9 ottobre 2026. #sito([KFC Bielorussia; consultazione del sito documentata il 9 ottobre 2026.], "https://kfc.by/")

#documento(path("/assets/images/figure/ricerca/online-kfc-bielorussia-20261009.jpg"), [Prima schermata del sito ufficiale · 9 ottobre 2026.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.", altezza: 245pt, rapporto: 1.77777778) <fig-ricerca-online-kfc-bielorussia-20261009>

La @fig-ricerca-online-kfc-danimarca-20261009 mostra KFC Danimarca. Prima schermata del sito ufficiale · 9 ottobre 2026. #sito([KFC Danimarca; consultazione del sito documentata il 9 ottobre 2026.], "https://kfc.dk/")

#documento(path("/assets/images/figure/ricerca/online-kfc-danimarca-20261009.jpg"), [Prima schermata del sito ufficiale · 9 ottobre 2026.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.", altezza: 245pt, rapporto: 1.77777778) <fig-ricerca-online-kfc-danimarca-20261009>

La @fig-ricerca-hofstede-kfc-russia-2024 mostra KFC Russia · documento storico. Altro mercato: menu, offerte e prezzi nello screenshot.

#documento(path("/assets/images/figure/ricerca/hofstede-kfc-russia-2024.jpg"), [Altro mercato: menu, offerte e prezzi nello screenshot. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Altro mercato: menu, offerte e prezzi nello screenshot. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 1.82950423) <fig-ricerca-hofstede-kfc-russia-2024>

La @fig-ricerca-hofstede-kfc-russia-punti-2024 mostra KFC Russia · punti e prezzi. Dettaglio del programma fedeltà e dei prezzi in punti.

#documento(path("/assets/images/figure/ricerca/hofstede-kfc-russia-punti-2024.jpg"), [Dettaglio del programma fedeltà e dei prezzi in punti. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Dettaglio del programma fedeltà e dei prezzi in punti. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 1.97105263) <fig-ricerca-hofstede-kfc-russia-punti-2024>

La @fig-ricerca-hofstede-kfc-danimarca-2024 mostra KFC Danimarca · menu e offerte. La fotografia del prodotto e il messaggio guidano la prima schermata.

#documento(path("/assets/images/figure/ricerca/hofstede-kfc-danimarca-2024.jpg"), [La fotografia del prodotto e il messaggio guidano la prima schermata. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "La fotografia del prodotto e il messaggio guidano la prima schermata. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 2.0673913) <fig-ricerca-hofstede-kfc-danimarca-2024>

#place.flush()
