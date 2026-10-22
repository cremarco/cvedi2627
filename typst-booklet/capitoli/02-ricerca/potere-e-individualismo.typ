#import "../../template/stile.typ": sito
#import "componenti.typ": tavola-intera, documento, grafico, dati-dimensioni


== Leggere il contesto culturale

Nel 1980 #emph[Geert Hofstede] pubblicò #emph[Culture’s Consequences], presentando quattro dimensioni per confrontare i valori culturali tra Paesi: distanza dal potere (PDI), individualismo/collettivismo (IDV), mascolinità/femminilità (MAS, da Masculinity) e avversione all’incertezza (UAI).

L’orientamento a lungo termine (LTO) fu aggiunto con #emph[Michael Bond] nel 1988/1991; indulgenza/restrizione (IVR), con #emph[Michael Minkov] nel 2010. Gli schemi usano indici relativi di The Culture Factor, consultati il 9 ottobre 2026: dati aggregati, non percentuali né profili individuali. IDV e LTO sono stati aggiornati nel 2023; le rilevazioni provengono da anni diversi . @hofstede2011-cultures @tcf-sd-country-comparison @tcf-sd-faq. #footnote[Hofstede, 2011; The Culture Factor, dati e FAQ, consultati il 9 ottobre 2026. #linebreak()#text(size: 7pt)[#link("https://doi.org/10.9707/2307-0919.1014")]#linebreak()#text(size: 7pt)[#link("https://www.theculturefactor.com/country-comparison-tool")]]

Una differenza visiva tra siti è un’osservazione; la sua spiegazione culturale resta un’ipotesi. @brewer2014-ecological.#sito([Brewer e Venaik, 2014.], "https://doi.org/10.1177/0170840613517602")

#place.flush()

=== Distanza dal potere · PDI

La distanza dal potere (PDI, Power Distance Index) descrive quanto i membri meno potenti di istituzioni e organizzazioni si aspettano e accettano una distribuzione diseguale del potere. Nel confronto tra società, punteggi alti indicano maggiore accettazione delle gerarchie; punteggi bassi, una maggiore aspettativa di rapporti paritari e consultazione.

Per il design, il tema diventa una domanda: come viene riconosciuta l’autorevolezza di un servizio? Ruoli, competenze, fonti e tono possono essere esplorati con gli utenti. Il punteggio nazionale non stabilisce quanta guida serva né quanto debba essere libera la navigazione. @hofstede2011-cultures.

Le condizioni di confronto dei campioni richiedono cautela anche quando si usa il Values Survey Module @hofstede-minkov2013-vsm.#sito([Hofstede e Minkov, 2013, manuale VSM.], "https://geerthofstede.com/wp-content/uploads/2016/07/Manual-VSM-2013.pdf")

*Alta distanza dal potere*

Ipotesi per la ricerca:

- Quali ruoli e competenze rendono credibile il servizio?
- Come viene interpretato un tono istituzionale?
- È utile esplicitare chi decide e chi risponde delle informazioni?

*Bassa distanza dal potere*

Ipotesi per la ricerca:

- Come viene accolto un tono diretto?
- Quali occasioni di confronto con il servizio sono utili?
- Come rendere visibili le ragioni di una decisione e le possibilità di discuterla?

La metafora nella @fig-ricerca-pdi-metafora mette a confronto i due poli: Relazioni più paritarie e Gerarchie più accettate.

#tavola-intera(path("/assets/images/figure/ricerca/pdi-metafora.png"), [Figure sullo stesso piano e su livelli diversi evocano parità e gerarchia. La metafora visualizza i poli PDI, senza descrivere il comportamento dei singoli utenti.], <fig-ricerca-pdi-metafora>, "Figure sullo stesso piano e su livelli diversi evocano parità e gerarchia. La metafora visualizza i poli PDI, senza descrivere il comportamento dei singoli utenti.")

Quanto viene accettata una distribuzione diseguale del potere? Un indice basso segnala aspettative più paritarie; uno alto, maggiore accettazione delle gerarchie (@fig-ricerca-pdi-dati).

Nella ricerca UX, verifica quali ruoli, competenze e segnali rendono autorevole il servizio per i suoi pubblici. #sito([The Culture Factor, PDI; dati consultati il 9 ottobre 2026.], "https://www.theculturefactor.com/country-comparison-tool")

#grafico(dati-dimensioni.find(d => d.code == "PDI").data, [Le posizioni sull’asse confrontano indici nazionali di accettazione delle gerarchie. Distanze e punteggi sono relativi, non percentuali: suggeriscono domande sull’autorevolezza dei servizi, da verificare con persone e contesti specifici.]) <fig-ricerca-pdi-dati>

#block(sticky: true)[#strong[Università Statale di Mosca]]

Nella schermata dell’Università Statale di Mosca, i menu organizzano l’accesso alle informazioni e le fotografie danno rilievo agli edifici dell’ateneo. Possiamo leggere questi elementi come una presentazione dell’istituzione e della sua identità.

Il confronto apre una domanda sul PDI: quali segnali fanno riconoscere l’autorevolezza dell’università ai diversi pubblici? Il punto di vista fotografico e i colori, da soli, non misurano l’accettazione delle gerarchie né spiegano come le persone usino il sito (@fig-ricerca-c03-011-01).

#documento(path("/assets/images/figure/ricerca/c03-011-01.jpeg"), [La fotografia dell’edificio e i menu presentano l’università come istituzione riconoscibile. Per il PDI, chiediamoci quali segnali rendano autorevole il servizio; il punto di vista fotografico non misura l’accettazione delle gerarchie.
Homepage dell’Università Statale di Mosca · screenshot storico.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "La fotografia dell’edificio e i menu presentano l’università come istituzione riconoscibile. Per il PDI, chiediamoci quali segnali rendano autorevole il servizio; il punto di vista fotografico non misura l’accettazione delle gerarchie.\nHomepage dell’Università Statale di Mosca · screenshot storico.", altezza: 285pt, rapporto: 1.00263852) <fig-ricerca-c03-011-01>

#block(sticky: true)[#strong[Università di Amsterdam]]

Nella schermata dell’Università di Amsterdam, fotografie e notizie danno spazio a persone, giovani e attività dell’ateneo. Rispetto all’esempio precedente, cambia il modo di raccontare l’università: dagli edifici alle esperienze di chi la vive.

È uno spunto per indagare quali immagini e voci rendano il servizio riconoscibile e credibile. Per confrontare i due siti occorre considerare anche destinatari e scopi delle pagine: più persone nelle immagini non dimostrano minore PDI o maggiore libertà di navigazione (@fig-ricerca-c03-012-01).

#documento(path("/assets/images/figure/ricerca/c03-012-01.jpeg"), [La pagina mette in evidenza temi, ricerca e percorsi dell’università. Nel confronto sul PDI, osserviamo come costruisce credibilità e vicinanza ai suoi pubblici; la composizione non dimostra rapporti sociali più paritari.
Homepage dell’Università di Amsterdam · screenshot storico.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "La pagina mette in evidenza temi, ricerca e percorsi dell’università. Nel confronto sul PDI, osserviamo come costruisce credibilità e vicinanza ai suoi pubblici; la composizione non dimostra rapporti sociali più paritari.\nHomepage dell’Università di Amsterdam · screenshot storico.", altezza: 285pt, rapporto: 1.00263852) <fig-ricerca-c03-012-01>

#block(sticky: true)[#strong[Documenti e confronti]]

La @fig-ricerca-online-mosca-20261009 mostra Mosca. Prima schermata del sito ufficiale · 9 ottobre 2026. #sito([Mosca; consultazione del sito documentata il 9 ottobre 2026.], "https://msu.ru/")

#documento(path("/assets/images/figure/ricerca/online-mosca-20261009.jpg"), [Prima schermata del sito ufficiale · 9 ottobre 2026.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.", altezza: 245pt, rapporto: 1.77777778) <fig-ricerca-online-mosca-20261009>

La @fig-ricerca-online-amsterdam-20261009 mostra Amsterdam. Prima schermata del sito ufficiale · 9 ottobre 2026. #sito([Amsterdam; consultazione del sito documentata il 9 ottobre 2026.], "https://www.uva.nl/en?cb")

#documento(path("/assets/images/figure/ricerca/online-amsterdam-20261009.jpg"), [Prima schermata del sito ufficiale · 9 ottobre 2026.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.", altezza: 245pt, rapporto: 1.77777778) <fig-ricerca-online-amsterdam-20261009>

La @fig-ricerca-hofstede-mosca-2024 mostra Mosca · percorsi informativi. Colonne, notizie e riferimenti istituzionali.

#documento(path("/assets/images/figure/ricerca/hofstede-mosca-2024.jpg"), [Colonne, notizie e riferimenti istituzionali. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Colonne, notizie e riferimenti istituzionali. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 1.88956127) <fig-ricerca-hofstede-mosca-2024>

La @fig-ricerca-hofstede-amsterdam-2024 mostra Amsterdam · comunità universitaria. Le persone occupano la prima schermata.

#documento(path("/assets/images/figure/ricerca/hofstede-amsterdam-2024.jpg"), [Le persone occupano la prima schermata. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Le persone occupano la prima schermata. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 2.45290323) <fig-ricerca-hofstede-amsterdam-2024>

La @fig-ricerca-hofstede-amsterdam-masterweek-2024 mostra Amsterdam · incontri e orientamento. La sezione Masterweek invita a conoscere persone e percorsi.

#documento(path("/assets/images/figure/ricerca/hofstede-amsterdam-masterweek-2024.jpg"), [La sezione Masterweek invita a conoscere persone e percorsi. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "La sezione Masterweek invita a conoscere persone e percorsi. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 4.02356021) <fig-ricerca-hofstede-amsterdam-masterweek-2024>

#place.flush()

=== Individualismo e collettivismo · IDV

L’individualismo (IDV, Individualism Index) descrive il rapporto tra la persona e i gruppi a cui appartiene. Nel modello di Hofstede, punteggi alti indicano legami sociali meno vincolanti e maggiore responsabilità verso sé stessi e la famiglia più vicina; punteggi bassi danno più peso ad appartenenze durature, lealtà e obblighi reciproci.

Per il design può essere utile esplorare come le persone collegano obiettivi personali, decisioni condivise e relazioni. L’indice nazionale non misura egoismo, bisogno di personalizzazione o attenzione alla privacy: la condivisione dei dati richiede domande specifiche sul servizio e sul contesto. @hofstede2011-cultures.

*Individualismo*

Ipotesi per la ricerca:

- Quali obiettivi personali guidano la scelta?
- Come viene raccontato un risultato individuale?
- Quali decisioni la persona vuole gestire direttamente e quali preferisce condividere?

*Collettivismo*

Ipotesi per la ricerca:

- Quali gruppi contano nell’uso del servizio?
- Chi partecipa alla scelta e con quali responsabilità?
- Come vengono riconosciuti un risultato condiviso e gli impegni verso altre persone?

La metafora nella @fig-ricerca-idv-metafora mette a confronto i due poli: Appartenenza e lealtà al gruppo e Autonomia e legami meno vincolanti.

#tavola-intera(path("/assets/images/figure/ricerca/idv-metafora.png"), [Il gruppo e i percorsi separati evocano legami collettivi e autonomia. Le due metà illustrano i poli IDV; non stabiliscono come ogni persona prende decisioni.], <fig-ricerca-idv-metafora>, "Il gruppo e i percorsi separati evocano legami collettivi e autonomia. Le due metà illustrano i poli IDV; non stabiliscono come ogni persona prende decisioni.")

Quanto sono vincolanti i legami con i gruppi? Il polo collettivistico valorizza appartenenza e obblighi reciproci; quello individualistico, autonomia e legami meno vincolanti (@fig-ricerca-idv-dati).

Nella ricerca UX, esplora chi partecipa alle decisioni e quali responsabilità personali o condivise emergono nel servizio. #sito([The Culture Factor, IDV; dati consultati il 9 ottobre 2026.], "https://www.theculturefactor.com/country-comparison-tool")

#grafico(dati-dimensioni.find(d => d.code == "IDV").data, [L’asse confronta indici nazionali di autonomia e legami con il gruppo. Le differenze orientano domande su decisioni personali e responsabilità condivise; non misurano egoismo, privacy o preferenze di ogni utente.]) <fig-ricerca-idv-dati>

#block(sticky: true)[#strong[Greyhound]]

La schermata di Greyhound mette in primo piano la ricerca di un viaggio. L’accesso al profilo, il recupero della prenotazione, la ricerca della fermata e il tracciamento del bus affiancano l’invito a scaricare l’app tramite codice QR.

Sono funzioni legate a compiti personali del viaggiatore. Offrono un caso per chiedersi chi organizza il viaggio e quali decisioni condivide con altre persone. La loro presenza non dimostra un orientamento individualistico del pubblico: conta anche la natura del servizio (@fig-ricerca-c03-015-01).

#documento(path("/assets/images/figure/ricerca/c03-015-01.jpeg"), [Ricerca del viaggio, prenotazione e app organizzano compiti del viaggiatore. L’IDV suggerisce di indagare chi decide e con chi condivide il viaggio; queste funzioni dipendono anche dalla natura del servizio.
Homepage di Greyhound: ricerca del viaggio e servizi per l’utente · screenshot storico.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Ricerca del viaggio, prenotazione e app organizzano compiti del viaggiatore. L’IDV suggerisce di indagare chi decide e con chi condivide il viaggio; queste funzioni dipendono anche dalla natura del servizio.\nHomepage di Greyhound: ricerca del viaggio e servizi per l’utente · screenshot storico.", altezza: 285pt, rapporto: 1.19496855) <fig-ricerca-c03-015-01>

#block(sticky: true)[#strong[Kowloon Motor Bus]]

Nella schermata di Kowloon Motor Bus, a Hong Kong, compaiono il viaggio con animali domestici, una fotografia dello staff, assistenza e contatti telefonici. L’acquisto del biglietto resta tra le azioni principali.

Questi elementi permettono di discutere come un servizio rappresenti clienti, personale e relazioni di supporto. Per interpretarli occorre conoscere destinatari e obiettivi della comunicazione: una fotografia di gruppo o l’uso del plurale non bastano a dimostrare valori collettivistici degli utenti (@fig-ricerca-c03-016-01).

#documento(path("/assets/images/figure/ricerca/c03-016-01.jpeg"), [Il banner per animali, la fotografia dello staff e i contatti affiancano il viaggio. Per l’IDV, esploriamo quali relazioni sostiene il servizio; fotografie di gruppo e plurali non provano valori collettivistici.
Homepage di Kowloon Motor Bus: informazioni e servizi alla comunità · screenshot storico.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Il banner per animali, la fotografia dello staff e i contatti affiancano il viaggio. Per l’IDV, esploriamo quali relazioni sostiene il servizio; fotografie di gruppo e plurali non provano valori collettivistici.\nHomepage di Kowloon Motor Bus: informazioni e servizi alla comunità · screenshot storico.", altezza: 285pt, rapporto: 1.39705882) <fig-ricerca-c03-016-01>

#block(sticky: true)[#strong[Documenti e confronti]]

La @fig-ricerca-online-greyhound-20261009 mostra Greyhound. Prima schermata del sito ufficiale · 9 ottobre 2026. #sito([Greyhound; consultazione del sito documentata il 9 ottobre 2026.], "https://www.greyhound.com/")

#documento(path("/assets/images/figure/ricerca/online-greyhound-20261009.jpg"), [Prima schermata del sito ufficiale · 9 ottobre 2026.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.", altezza: 245pt, rapporto: 1.77777778) <fig-ricerca-online-greyhound-20261009>

La @fig-ricerca-online-kmb-20261009 mostra KMB. Prima schermata del sito ufficiale · 9 ottobre 2026. #sito([KMB; consultazione del sito documentata il 9 ottobre 2026.], "https://www.kmb.hk/")

#documento(path("/assets/images/figure/ricerca/online-kmb-20261009.jpg"), [Prima schermata del sito ufficiale · 9 ottobre 2026.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.", altezza: 245pt, rapporto: 1.77777778) <fig-ricerca-online-kmb-20261009>

La @fig-ricerca-hofstede-greyhound-2024 mostra Greyhound · ricerca del viaggio. La ricerca del viaggio è l’azione principale.

#documento(path("/assets/images/figure/ricerca/hofstede-greyhound-2024.jpg"), [La ricerca del viaggio è l’azione principale. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "La ricerca del viaggio è l’azione principale. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 2.04772234) <fig-ricerca-hofstede-greyhound-2024>

La @fig-ricerca-hofstede-greyhound-road-rewards-2024 mostra Greyhound · il profilo personale. Accesso e vantaggi del programma Road Rewards.

#documento(path("/assets/images/figure/ricerca/hofstede-greyhound-road-rewards-2024.jpg"), [Accesso e vantaggi del programma Road Rewards. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Accesso e vantaggi del programma Road Rewards. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 2.83664459) <fig-ricerca-hofstede-greyhound-road-rewards-2024>

La @fig-ricerca-hofstede-kmb-2024 mostra KMB · servizi ai passeggeri. Staff e servizio di trasporto nel messaggio di apertura.

#documento(path("/assets/images/figure/ricerca/hofstede-kmb-2024.jpg"), [Staff e servizio di trasporto nel messaggio di apertura. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Staff e servizio di trasporto nel messaggio di apertura. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 2.07751092) <fig-ricerca-hofstede-kmb-2024>

La @fig-ricerca-hofstede-kmb-assistenza-2024 mostra KMB · assistenza ai viaggiatori. Persone e supporto al cliente nella sezione Passenger Information.

#documento(path("/assets/images/figure/ricerca/hofstede-kmb-assistenza-2024.jpg"), [Persone e supporto al cliente nella sezione Passenger Information. Documento storico; data della cattura non attestata.], diritti: [Sito, marchi e immagini: rispettivi titolari.], alt: "Persone e supporto al cliente nella sezione Passenger Information. Documento storico; data della cattura non attestata.", altezza: 285pt, rapporto: 3.7015873) <fig-ricerca-hofstede-kmb-assistenza-2024>

#place.flush()
