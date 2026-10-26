// Capitolo 02: unico testo per volume e compilazione autonoma.
#import "../template/layout.typ": booklet, chapter, website-note
#import "../template/plan.typ": chapter-parameters
#import "../template/figures.typ": image-figure
#import "../template/editorial.typ": compact-note

#let content = [
// Ordine editoriale del capitolo; le varianti restano nei rispettivi ambiti locali.

#[


== Ricercare persone e contesti

#strong[La ricerca dà un punto di partenza alle decisioni di progetto: capire le persone, i loro obiettivi e le condizioni in cui useranno il servizio.]

Si parte da domande sui bisogni e si lavora sul campo, osservando attività reali e ascoltando chi usa, o potrebbe usare, il servizio. Si raccolgono comportamenti, difficoltà e contesti d’uso; il campione considera capacità e familiarità digitale diverse, per rendere visibili condizioni che il gruppo di progetto potrebbe trascurare.

Le osservazioni, cioè ciò che si vede e si sente, restano distinte dalle interpretazioni. Le assunzioni diventano domande da verificare e il problema si aggiorna quando emergono nuove evidenze. Differenze culturali e barriere di accesso sono parte di questa ricerca: aiutano a precisare per chi e in quali situazioni una proposta deve funzionare.


=== Intervistare e osservare

L’intervista aiuta a comprendere ciò che le persone raccontano; l’osservazione mostra come svolgono un’attività nel proprio contesto. Le due prospettive si completano. Parti da una domanda di ricerca e da episodi concreti, usando domande aperte e neutrali. Evita di chiedere soltanto se un’idea piace o se qualcuno pensa che la userebbe..#footnote[User research community, interviste e osservazione contestuale. #linebreak()#text(size: 7pt)[#link("https://www.gov.uk/service-manual/user-research/using-in-depth-interviews")]#linebreak()#text(size: 7pt)[#link("https://www.gov.uk/service-manual/user-research/contextual-research-and-observation")]]

#strong[Intervista]

Episodi, motivazioni e difficoltà raccontate. Usa domande aperte e neutrali; chiedi esempi concreti.

#strong[Osservazione]

Azioni, strumenti, interruzioni e contesto. Osserva il processo reale, quando possibile e con consenso.

#strong[Una domanda di ricerca]

Come viene controllata e modificata la data dell’appuntamento?

Per iniziare l’intervista: «Raccontami l’ultima volta che hai dovuto spostare un appuntamento». È una proposta di domanda, non una risposta raccolta.

Prepara una traccia, ma lascia spazio a temi inattesi. Separa azioni osservate e racconti. Le risposte orientano ciò che vale la pena approfondire: non confermano automaticamente la soluzione immaginata.

#emph[Caso didattico. Dati e situazioni simulati.]


=== Dalle osservazioni alle evidenze

Un’evidenza deve essere rintracciabile: conserva il compito, il contesto e ciò che la persona ha fatto o detto. Un’interpretazione spiega un possibile significato; un’ipotesi suggerisce cosa verificare. Tenere distinti questi livelli rende più chiaro il passaggio dalla ricerca alle scelte progettuali.#website-note([User research community, analisi della ricerca.], "https://www.gov.uk/service-manual/user-research/analyse-a-research-session")

+ #strong[Comportamento simulato]

  #emph[Sara] torna al calendario prima della conferma.

+ #strong[Interpretazione possibile]

  Potrebbe voler ricontrollare data e orario; potrebbero esserci altre ragioni.

+ #strong[Ipotesi progettuale]

  Un riepilogo potrebbe facilitare il controllo. È una soluzione da esplorare.

In uno studio reale, confronta episodi di più partecipanti e conserva anche i casi contrari. Collega ogni sintesi alle note originali. Un singolo episodio non dimostra quanto un problema sia diffuso; il successivo ciclo di ricerca deve poter mettere in discussione l’interpretazione.

#emph[Caso didattico. Dati e situazioni simulati.]

]
#[
#import "../assets/diagrams/cultural-indices.typ": cultural-chart, dimension-data, chart-geometry


== Leggere il contesto culturale

Nel 1980 #emph[Geert Hofstede] pubblicò #emph[Culture’s Consequences], presentando quattro dimensioni per confrontare i valori culturali tra Paesi: distanza dal potere (PDI), individualismo/collettivismo (IDV), mascolinità/femminilità (MAS, da Masculinity) e avversione all’incertezza (UAI).

L’orientamento a lungo termine (LTO) fu aggiunto con #emph[Michael Bond] nel 1988/1991; indulgenza/restrizione (IVR), con #emph[Michael Minkov] nel 2010. Gli schemi usano indici relativi di The Culture Factor, verificati il 25 ottobre 2026: dati aggregati, non percentuali né profili individuali. IDV e LTO sono stati aggiornati nel 2023; le rilevazioni provengono da anni diversi. @hofstede2011-cultures. #compact-note([_Hofstede_, 2011; The Culture Factor, dati e FAQ; The Culture Factor, PDI], ("https://doi.org/10.9707/2307-0919.1014", "https://www.theculturefactor.com/country-comparison-tool", "https://www.theculturefactor.com/frequently-asked-questions",), tag: ("https://doi.org/10.9707/2307-0919.1014", "https://www.theculturefactor.com/country-comparison-tool", "https://www.theculturefactor.com/frequently-asked-questions",)) <nota-url-02-3>

Una differenza visiva tra siti è un’osservazione; la sua spiegazione culturale resta un’ipotesi. @brewer2014-ecological.#website-note([_Brewer_ e _Venaik_, 2014.], "https://doi.org/10.1177/0170840613517602")


=== Distanza dal potere · PDI

La distanza dal potere (PDI, Power Distance Index) descrive quanto i membri meno potenti di istituzioni e organizzazioni si aspettano e accettano una distribuzione diseguale del potere. Nel confronto tra società, punteggi alti indicano maggiore accettazione delle gerarchie; punteggi bassi, una maggiore aspettativa di rapporti paritari e consultazione.

Per il design, il tema diventa una domanda: come viene riconosciuta l’autorevolezza di un servizio? Ruoli, competenze, fonti e tono possono essere esplorati con gli utenti. Il punteggio nazionale non stabilisce quanta guida serva né quanto debba essere libera la navigazione. @hofstede2011-cultures.

Le condizioni di confronto dei campioni richiedono cautela anche quando si usa il Values Survey Module @hofstede-minkov2013-vsm.#website-note([_Hofstede_ e _Minkov_, 2013, manuale VSM.], "https://geerthofstede.com/wp-content/uploads/2016/07/Manual-VSM-2013.pdf")

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

#image-figure(path("/progetti/booklet/assets/dimensioni-culturali-orange-300/originali/pdi.png"),
  [Distanza dal potere · PDI],
  format: "una-colonna",
  id: "fig-ricerca-pdi-metafora",
  alt: "Figure sullo stesso piano e su livelli diversi evocano parità e gerarchia. La metafora visualizza i poli PDI, senza descrivere il comportamento dei singoli utenti.",
  height: 110mm,
  aspect-ratio: (1086, 1448).at(0) / (1086, 1448).at(1),
)

Quanto viene accettata una distribuzione diseguale del potere? Un indice basso segnala aspettative più paritarie; uno alto, maggiore accettazione delle gerarchie (@fig-ricerca-pdi-dati).

Nella ricerca UX, verifica quali ruoli, competenze e segnali rendono autorevole il servizio per i suoi pubblici. #compact-note([_Hofstede_, 2011; The Culture Factor, dati e FAQ; The Culture Factor, PDI], ("https://doi.org/10.9707/2307-0919.1014", "https://www.theculturefactor.com/country-comparison-tool", "https://www.theculturefactor.com/frequently-asked-questions",), tag: ("https://doi.org/10.9707/2307-0919.1014", "https://www.theculturefactor.com/country-comparison-tool", "https://www.theculturefactor.com/frequently-asked-questions",)) <nota-ricerca-pdi-locale>

#figure([
  #metadata((
    valori: dimension-data.find(d => d.code == "PDI").data.map(a => (paese: a.italianName, iso: a.iso, punteggio: a.score)),
    "asse": ("minimo": 0, "massimo": 100),
    "destinazioni": dimension-data.find(d => d.code == "PDI").data.map(a => (chart-geometry.asse-x
      + chart-geometry.asse-larghezza * a.score / 100)),
  )) <booklet-grafico-culturale>
  #cultural-chart(dimension-data.find(d => d.code == "PDI").data)
],
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [Le posizioni sull’asse confrontano indici nazionali di accettazione delle gerarchie. Distanze e punteggi sono relativi, non percentuali: suggeriscono domande sull’autorevolezza dei servizi, da verificare con persone e contesti specifici. #v(4pt)#text(size: 8pt, style: "italic", [Dati: The Culture Factor. Bandiere: flag-icons, MIT.])],
) <fig-ricerca-pdi-dati>

#block(sticky: true)[#strong[Università Statale di Mosca]]

Nella schermata dell’Università Statale di Mosca, i menu organizzano l’accesso alle informazioni e le fotografie danno rilievo agli edifici dell’ateneo. Possiamo leggere questi elementi come una presentazione dell’istituzione e della sua identità.

Il confronto apre una domanda sul PDI: quali segnali fanno riconoscere l’autorevolezza dell’università ai diversi pubblici? Il punto di vista fotografico e i colori, da soli, non misurano l’accettazione delle gerarchie né spiegano come le persone usino il sito (@fig-ricerca-c03-011-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-011-01.jpeg"),
  [La fotografia dell’edificio e i menu presentano l’università come istituzione riconoscibile. Per il PDI, chiediamoci quali segnali rendano autorevole il servizio; il punto di vista fotografico non misura l’accettazione delle gerarchie.
Homepage dell’Università Statale di Mosca · screenshot storico.],
  format: "due-colonne",
  rights: none,
  alt: "La fotografia dell’edificio e i menu presentano l’università come istituzione riconoscibile. Per il PDI, chiediamoci quali segnali rendano autorevole il servizio; il punto di vista fotografico non misura l’accettazione delle gerarchie.\nHomepage dell’Università Statale di Mosca · screenshot storico.",
  height: 285pt,
  aspect-ratio: 1.00263852,
  constrain: false,
  id: "fig-ricerca-c03-011-01",
)

#block(sticky: true)[#strong[Università di Amsterdam]]

Nella schermata dell’Università di Amsterdam, fotografie e notizie danno spazio a persone, giovani e attività dell’ateneo. Rispetto all’esempio precedente, cambia il modo di raccontare l’università: dagli edifici alle esperienze di chi la vive.

È uno spunto per indagare quali immagini e voci rendano il servizio riconoscibile e credibile. Per confrontare i due siti occorre considerare anche destinatari e scopi delle pagine: più persone nelle immagini non dimostrano minore PDI o maggiore libertà di navigazione (@fig-ricerca-c03-012-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-012-01.jpeg"),
  [La pagina mette in evidenza temi, ricerca e percorsi dell’università. Nel confronto sul PDI, osserviamo come costruisce credibilità e vicinanza ai suoi pubblici; la composizione non dimostra rapporti sociali più paritari.
Homepage dell’Università di Amsterdam · screenshot storico.],
  format: "due-colonne",
  rights: none,
  alt: "La pagina mette in evidenza temi, ricerca e percorsi dell’università. Nel confronto sul PDI, osserviamo come costruisce credibilità e vicinanza ai suoi pubblici; la composizione non dimostra rapporti sociali più paritari.\nHomepage dell’Università di Amsterdam · screenshot storico.",
  height: 285pt,
  aspect-ratio: 1.00263852,
  constrain: false,
  id: "fig-ricerca-c03-012-01",
)

#block(sticky: true)[#strong[Documenti e confronti]]

La @fig-ricerca-online-mosca-20261009 mostra Mosca. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([Mosca.], "https://msu.ru/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mosca-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mosca-20261009",
)

La @fig-ricerca-online-amsterdam-20261009 mostra Amsterdam. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([Amsterdam.], "https://www.uva.nl/en?cb")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-amsterdam-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-amsterdam-20261009",
)

La @fig-ricerca-hofstede-mosca-2024 mostra Mosca · percorsi informativi. Colonne, notizie e riferimenti istituzionali.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-mosca-2024.jpg"),
  [Colonne, notizie e riferimenti istituzionali. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Colonne, notizie e riferimenti istituzionali. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 1.88956127,
  constrain: false,
  id: "fig-ricerca-hofstede-mosca-2024",
)

La @fig-ricerca-hofstede-amsterdam-2024 mostra Amsterdam · comunità universitaria. Le persone occupano la prima schermata.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-amsterdam-2024.jpg"),
  [Le persone occupano la prima schermata. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Le persone occupano la prima schermata. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.45290323,
  constrain: false,
  id: "fig-ricerca-hofstede-amsterdam-2024",
)

La @fig-ricerca-hofstede-amsterdam-masterweek-2024 mostra Amsterdam · incontri e orientamento. La sezione Masterweek invita a conoscere persone e percorsi.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-amsterdam-masterweek-2024.jpg"),
  [La sezione Masterweek invita a conoscere persone e percorsi. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "La sezione Masterweek invita a conoscere persone e percorsi. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 4.02356021,
  constrain: false,
  id: "fig-ricerca-hofstede-amsterdam-masterweek-2024",
)


=== Individualismo e collettivismo · IDV

L’individualismo (IDV, Individualism Index) descrive il rapporto tra la persona e i gruppi a cui appartiene. Nel modello di _Hofstede_, punteggi alti indicano legami sociali meno vincolanti e maggiore responsabilità verso sé stessi e la famiglia più vicina; punteggi bassi danno più peso ad appartenenze durature, lealtà e obblighi reciproci.

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

#image-figure(path("/progetti/booklet/assets/dimensioni-culturali-orange-300/originali/idv.png"),
  [Individualismo e collettivismo · IDV],
  format: "una-colonna",
  id: "fig-ricerca-idv-metafora",
  alt: "Il gruppo e i percorsi separati evocano legami collettivi e autonomia. Le due metà illustrano i poli IDV; non stabiliscono come ogni persona prende decisioni.",
  height: 110mm,
  aspect-ratio: (1086, 1448).at(0) / (1086, 1448).at(1),
)

Quanto sono vincolanti i legami con i gruppi? Il polo collettivistico valorizza appartenenza e obblighi reciproci; quello individualistico, autonomia e legami meno vincolanti (@fig-ricerca-idv-dati).

Nella ricerca UX, esplora chi partecipa alle decisioni e quali responsabilità personali o condivise emergono nel servizio. #website-note([The Culture Factor, IDV.], "https://www.theculturefactor.com/country-comparison-tool")

#figure([
  #metadata((
    valori: dimension-data.find(d => d.code == "IDV").data.map(a => (paese: a.italianName, iso: a.iso, punteggio: a.score)),
    "asse": ("minimo": 0, "massimo": 100),
    "destinazioni": dimension-data.find(d => d.code == "IDV").data.map(a => (chart-geometry.asse-x
      + chart-geometry.asse-larghezza * a.score / 100)),
  )) <booklet-grafico-culturale>
  #cultural-chart(dimension-data.find(d => d.code == "IDV").data)
],
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [L’asse confronta indici nazionali di autonomia e legami con il gruppo. Le differenze orientano domande su decisioni personali e responsabilità condivise; non misurano egoismo, privacy o preferenze di ogni utente. #v(4pt)#text(size: 8pt, style: "italic", [Dati: The Culture Factor. Bandiere: flag-icons, MIT.])],
) <fig-ricerca-idv-dati>

#block(sticky: true)[#strong[Greyhound]]

La schermata di Greyhound mette in primo piano la ricerca di un viaggio. L’accesso al profilo, il recupero della prenotazione, la ricerca della fermata e il tracciamento del bus affiancano l’invito a scaricare l’app tramite codice QR.

Sono funzioni legate a compiti personali del viaggiatore. Offrono un caso per chiedersi chi organizza il viaggio e quali decisioni condivide con altre persone. La loro presenza non dimostra un orientamento individualistico del pubblico: conta anche la natura del servizio (@fig-ricerca-c03-015-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-015-01.jpeg"),
  [Ricerca del viaggio, prenotazione e app organizzano compiti del viaggiatore. L’IDV suggerisce di indagare chi decide e con chi condivide il viaggio; queste funzioni dipendono anche dalla natura del servizio.
Homepage di Greyhound: ricerca del viaggio e servizi per l’utente · screenshot storico.],
  format: "due-colonne",
  rights: none,
  alt: "Ricerca del viaggio, prenotazione e app organizzano compiti del viaggiatore. L’IDV suggerisce di indagare chi decide e con chi condivide il viaggio; queste funzioni dipendono anche dalla natura del servizio.\nHomepage di Greyhound: ricerca del viaggio e servizi per l’utente · screenshot storico.",
  height: 285pt,
  aspect-ratio: 1.19496855,
  constrain: false,
  id: "fig-ricerca-c03-015-01",
)

#block(sticky: true)[#strong[Kowloon Motor Bus]]

Nella schermata di Kowloon Motor Bus, a Hong Kong, compaiono il viaggio con animali domestici, una fotografia dello staff, assistenza e contatti telefonici. L’acquisto del biglietto resta tra le azioni principali.

Questi elementi permettono di discutere come un servizio rappresenti clienti, personale e relazioni di supporto. Per interpretarli occorre conoscere destinatari e obiettivi della comunicazione: una fotografia di gruppo o l’uso del plurale non bastano a dimostrare valori collettivistici degli utenti (@fig-ricerca-c03-016-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-016-01.jpeg"),
  [Il banner per animali, la fotografia dello staff e i contatti affiancano il viaggio. Per l’IDV, esploriamo quali relazioni sostiene il servizio; fotografie di gruppo e plurali non provano valori collettivistici.
Homepage di Kowloon Motor Bus: informazioni e servizi alla comunità · screenshot storico.],
  format: "due-colonne",
  rights: none,
  alt: "Il banner per animali, la fotografia dello staff e i contatti affiancano il viaggio. Per l’IDV, esploriamo quali relazioni sostiene il servizio; fotografie di gruppo e plurali non provano valori collettivistici.\nHomepage di Kowloon Motor Bus: informazioni e servizi alla comunità · screenshot storico.",
  height: 285pt,
  aspect-ratio: 1.39705882,
  constrain: false,
  id: "fig-ricerca-c03-016-01",
)

#block(sticky: true)[#strong[Documenti e confronti]]

La @fig-ricerca-online-greyhound-20261009 mostra Greyhound. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([Greyhound.], "https://www.greyhound.com/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-greyhound-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-greyhound-20261009",
)

La @fig-ricerca-online-kmb-20261009 mostra KMB. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([KMB.], "https://www.kmb.hk/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-kmb-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-kmb-20261009",
)

La @fig-ricerca-hofstede-greyhound-2024 mostra Greyhound · ricerca del viaggio. La ricerca del viaggio è l’azione principale.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-greyhound-2024.jpg"),
  [La ricerca del viaggio è l’azione principale. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "La ricerca del viaggio è l’azione principale. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.04772234,
  constrain: false,
  id: "fig-ricerca-hofstede-greyhound-2024",
)

La @fig-ricerca-hofstede-greyhound-road-rewards-2024 mostra Greyhound · il profilo personale. Accesso e vantaggi del programma Road Rewards.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-greyhound-road-rewards-2024.jpg"),
  [Accesso e vantaggi del programma Road Rewards. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Accesso e vantaggi del programma Road Rewards. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.83664459,
  constrain: false,
  id: "fig-ricerca-hofstede-greyhound-road-rewards-2024",
)

La @fig-ricerca-hofstede-kmb-2024 mostra KMB · servizi ai passeggeri. Staff e servizio di trasporto nel messaggio di apertura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-kmb-2024.jpg"),
  [Staff e servizio di trasporto nel messaggio di apertura. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Staff e servizio di trasporto nel messaggio di apertura. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.07751092,
  constrain: false,
  id: "fig-ricerca-hofstede-kmb-2024",
)

La @fig-ricerca-hofstede-kmb-assistenza-2024 mostra KMB · assistenza ai viaggiatori. Persone e supporto al cliente nella sezione Passenger Information.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-kmb-assistenza-2024.jpg"),
  [Persone e supporto al cliente nella sezione Passenger Information. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Persone e supporto al cliente nella sezione Passenger Information. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 3.7015873,
  constrain: false,
  id: "fig-ricerca-hofstede-kmb-assistenza-2024",
)

]
#[
#import "../assets/diagrams/cultural-indices.typ": cultural-chart, dimension-data, chart-geometry


=== Motivazione al risultato e al successo · MAS

La sigla MAS (masculinity) riprende il nome storico della dimensione «mascolinità/femminilità». The Culture Factor la chiama oggi «motivazione al risultato e al successo», mantenendone punteggi e significato. Il confronto riguarda il peso di competizione, risultati e successo materiale rispetto a cooperazione, cura e qualità della vita.

Il nome storico riflette la terminologia di _Hofstede_. L’indice descrive valori a livello sociale; non misura il genere o le emozioni dei singoli utenti. Per il design suggerisce domande su come vengono interpretati messaggi di prestazione, riconoscimento, relazioni e benessere condiviso. @hofstede2011-cultures.

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

#image-figure(path("/progetti/booklet/assets/dimensioni-culturali-orange-300/originali/mas.png"),
  [Motivazione al risultato e al successo · MAS],
  format: "una-colonna",
  id: "fig-ricerca-mas-metafora",
  alt: "Il ponte costruito insieme e le salite parallele rappresentano cooperazione e riconoscimento dei risultati. Sono metafore del MAS, non ruoli legati al genere delle persone.",
  height: 110mm,
  aspect-ratio: (1086, 1448).at(0) / (1086, 1448).at(1),
)

Quali valori ricevono riconoscimento: cooperazione e qualità della vita, oppure competizione e successo? MAS (masculinity) è il nome storico della dimensione; The Culture Factor usa oggi «motivazione al risultato e al successo» (@fig-ricerca-mas-dati).

Nella ricerca UX, verifica quali valori esprimono messaggi e immagini e come vengono interpretati dalle persone coinvolte. #website-note([The Culture Factor, MAS.], "https://www.theculturefactor.com/country-comparison-tool")

#figure([
  #metadata((
    valori: dimension-data.find(d => d.code == "MAS").data.map(a => (paese: a.italianName, iso: a.iso, punteggio: a.score)),
    "asse": ("minimo": 0, "massimo": 100),
    "destinazioni": dimension-data.find(d => d.code == "MAS").data.map(a => (chart-geometry.asse-x
      + chart-geometry.asse-larghezza * a.score / 100)),
  )) <booklet-grafico-culturale>
  #cultural-chart(dimension-data.find(d => d.code == "MAS").data)
],
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [L’asse confronta il peso relativo di cooperazione e qualità della vita rispetto a competizione e successo. I punteggi aiutano a formulare domande sui valori comunicati, senza descrivere genere o personalità. #v(4pt)#text(size: 8pt, style: "italic", [Dati: The Culture Factor. Bandiere: flag-icons, MIT.])],
) <fig-ricerca-mas-dati>

#block(sticky: true)[#strong[Governo giapponese]]

Nella schermata del sito web del governo giapponese, notizie e anteprime presentano obiettivi raggiunti, investimenti e contributi del Paese a temi globali.

Per discutere il MAS, osserviamo quali valori emergono e chiediamoci quale spazio ricevano anche sostenibilità e qualità della vita. La funzione del sito e il pubblico previsto sono centrali: la promozione di un Paese può spiegare l’enfasi sui suoi successi. Il confronto richiede contenuti e periodi di pubblicazione comparabili (@fig-ricerca-c03-019-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-019-01.jpeg"),
  [Notizie e anteprime raccontano contributi, attività e temi del Paese. Il MAS invita a confrontare riconoscimento dei risultati e qualità della vita, considerando anche finalità editoriali, destinatari e periodo della pagina.
Homepage del sito del governo giapponese · screenshot storico.],
  format: "due-colonne",
  rights: none,
  alt: "Notizie e anteprime raccontano contributi, attività e temi del Paese. Il MAS invita a confrontare riconoscimento dei risultati e qualità della vita, considerando anche finalità editoriali, destinatari e periodo della pagina.\nHomepage del sito del governo giapponese · screenshot storico.",
  height: 285pt,
  aspect-ratio: 1.00263852,
  constrain: false,
  id: "fig-ricerca-c03-019-01",
)

#block(sticky: true)[#strong[Governo svedese]]

Nella schermata del sito del governo svedese, la notizia iniziale riguarda la comunità LGBTQ+; altre immagini mostrano relazioni tra generazioni e attività di sostegno reciproco. Cura e benessere collettivo sono temi utili per discutere il polo della cooperazione e della qualità della vita del MAS.

La selezione editoriale documenta però ciò che questa pagina sceglie di mostrare. Per interpretarla insieme all’esempio giapponese vanno considerati finalità, destinatari e momento della pubblicazione, oltre ai valori evocati dalle immagini (@fig-ricerca-c03-020-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-020-01.jpeg"),
  [Diritti LGBTQ+ e immagini di cura rendono visibili temi di benessere condiviso. Nel MAS sono spunti sul polo della cooperazione; una selezione editoriale non descrive tutti i valori della società.
Homepage del sito del governo svedese · screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-020-01",
  rights: none,
  alt: "Diritti LGBTQ+ e immagini di cura rendono visibili temi di benessere condiviso. Nel MAS sono spunti sul polo della cooperazione; una selezione editoriale non descrive tutti i valori della società.\nHomepage del sito del governo svedese · screenshot storico.",
  aspect-ratio: 1140 / 1704,
  height: 110mm,
)

#block(sticky: true)[#strong[Documenti e confronti]]

Il documento norvegese conserva un terzo contesto, distinto dal governo svedese. Non è una nuova versione della stessa pagina.

La @fig-ricerca-online-giappone-20261009 mostra Giappone. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([Giappone.], "https://www.japan.go.jp/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-giappone-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-giappone-20261009",
)

La @fig-ricerca-online-svezia-20261009 mostra Svezia. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([Svezia.], "https://www.government.se/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-svezia-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-svezia-20261009",
)

La @fig-ricerca-hofstede-giappone-2024 mostra Giappone · temi istituzionali. Temi istituzionali e notizie nella schermata.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-giappone-2024.jpg"),
  [Temi istituzionali e notizie nella schermata. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Temi istituzionali e notizie nella schermata. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 1.04192872,
  constrain: false,
  id: "fig-ricerca-hofstede-giappone-2024",
)

La @fig-ricerca-hofstede-norvegia-2024 mostra Norvegia · documento storico. Altro Paese: messaggi di governo e relazioni sociali.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-norvegia-2024.jpg"),
  [Altro Paese: messaggi di governo e relazioni sociali. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Altro Paese: messaggi di governo e relazioni sociali. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 1.63043478,
  constrain: false,
  id: "fig-ricerca-hofstede-norvegia-2024",
)


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

#image-figure(path("/progetti/booklet/assets/dimensioni-culturali-orange-300/originali/uai.png"),
  [Avversione all’incertezza · UAI],
  format: "una-colonna",
  id: "fig-ricerca-uai-metafora",
  alt: "Percorsi aperti e riferimenti ripetuti evocano tolleranza dell’ambiguità e ricerca di prevedibilità. La metafora riguarda UAI: non contrappone creatività a obbedienza né misura il rischio.",
  height: 110mm,
  aspect-ratio: (1086, 1448).at(0) / (1086, 1448).at(1),
)

Quanto le situazioni ambigue o sconosciute generano disagio? Un indice basso indica maggiore tolleranza dell’ambiguità; uno alto, maggiore bisogno di prevedibilità. Non misura l’avversione al rischio (@fig-ricerca-uai-dati).

Nella ricerca UX, osserva quali passaggi risultano ambigui e quali informazioni consentono di capire condizioni, conseguenze e azioni successive. #website-note([The Culture Factor, UAI.], "https://www.theculturefactor.com/country-comparison-tool")

#figure([
  #metadata((
    valori: dimension-data.find(d => d.code == "UAI").data.map(a => (paese: a.italianName, iso: a.iso, punteggio: a.score)),
    "asse": ("minimo": 0, "massimo": 100),
    "destinazioni": dimension-data.find(d => d.code == "UAI").data.map(a => (chart-geometry.asse-x
      + chart-geometry.asse-larghezza * a.score / 100)),
  )) <booklet-grafico-culturale>
  #cultural-chart(dimension-data.find(d => d.code == "UAI").data)
],
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [Le posizioni confrontano il disagio collettivo verso situazioni ambigue. I punteggi suggeriscono verifiche su familiarità e prevedibilità del servizio; non indicano percentuali di utenti né propensione individuale al rischio. #v(4pt)#text(size: 8pt, style: "italic", [Dati: The Culture Factor. Bandiere: flag-icons, MIT.])],
) <fig-ricerca-uai-dati>

#block(sticky: true)[#strong[KFC Bielorussia]]

Nella schermata di KFC in Bielorussia, prezzi e percentuali di sconto compaiono in una struttura regolare; il menu dei prodotti è disponibile nella stessa pagina. Sono informazioni che possono sostenere il confronto tra offerte.

Per discutere lo UAI possiamo chiedere quali dubbi restino prima dell’acquisto e se questi contenuti aiutino a risolverli. Promozioni e organizzazione del menu dipendono anche da obiettivi commerciali: la schermata, da sola, non rivela il disagio degli utenti verso l’ambiguità (@fig-ricerca-c03-023-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-023-01.jpeg"),
  [Prezzi, sconto e categorie permettono di confrontare l’offerta nella pagina. Per lo UAI, verifichiamo quali dubbi risolvono e quali restano; la struttura regolare non dimostra il bisogno di prevedibilità degli utenti.
Homepage di KFC in Bielorussia · screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-023-01",
  rights: none,
  alt: "Prezzi, sconto e categorie permettono di confrontare l’offerta nella pagina. Per lo UAI, verifichiamo quali dubbi risolvono e quali restano; la struttura regolare non dimostra il bisogno di prevedibilità degli utenti.\nHomepage di KFC in Bielorussia · screenshot storico.",
  aspect-ratio: 1140 / 1344,
  height: 110mm,
)

#block(sticky: true)[#strong[KFC Danimarca]]

Nella schermata di KFC in Danimarca, lo slogan, la fotografia del prodotto e il prezzo «49» danno rilievo a una promozione. Seguono sezioni per ordinare online e per le opportunità di lavoro.

Il confronto sullo UAI invita a verificare quali informazioni rendano l’offerta comprensibile e quali dubbi restino prima della scelta. La campagna e il compito incidono sulle informazioni necessarie: una fotografia ampia o la quantità di contenuti non misurano il disagio verso l’ambiguità del pubblico (@fig-ricerca-c03-024-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-024-01.jpeg"),
  [La fotografia principale, lo slogan e il prezzo concentrano l’attenzione sull’offerta. Lo UAI suggerisce di chiedere quali informazioni servano prima della scelta; pochi contenuti non dimostrano maggiore tolleranza dell’ambiguità.
Homepage di KFC in Danimarca · screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-024-01",
  rights: none,
  alt: "La fotografia principale, lo slogan e il prezzo concentrano l’attenzione sull’offerta. Lo UAI suggerisce di chiedere quali informazioni servano prima della scelta; pochi contenuti non dimostrano maggiore tolleranza dell’ambiguità.\nHomepage di KFC in Danimarca · screenshot storico.",
  aspect-ratio: 1140 / 1164,
  height: 110mm,
)

#block(sticky: true)[#strong[Documenti e confronti]]

I documenti KFC della Russia e della Bielorussia sono distinti: confrontare prezzi, punti e informazioni senza confondere i mercati.

La @fig-ricerca-online-kfc-bielorussia-20261009 mostra KFC Bielorussia. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([KFC Bielorussia.], "https://kfc.by/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-kfc-bielorussia-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-kfc-bielorussia-20261009",
)

La @fig-ricerca-online-kfc-danimarca-20261009 mostra KFC Danimarca. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([KFC Danimarca.], "https://kfc.dk/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-kfc-danimarca-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-kfc-danimarca-20261009",
)

La @fig-ricerca-hofstede-kfc-russia-2024 mostra KFC Russia · documento storico. Altro mercato: menu, offerte e prezzi nello screenshot.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-kfc-russia-2024.jpg"),
  [Altro mercato: menu, offerte e prezzi nello screenshot. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Altro mercato: menu, offerte e prezzi nello screenshot. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 1.82950423,
  constrain: false,
  id: "fig-ricerca-hofstede-kfc-russia-2024",
)

La @fig-ricerca-hofstede-kfc-russia-punti-2024 mostra KFC Russia · punti e prezzi. Dettaglio del programma fedeltà e dei prezzi in punti.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-kfc-russia-punti-2024.jpg"),
  [Dettaglio del programma fedeltà e dei prezzi in punti. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Dettaglio del programma fedeltà e dei prezzi in punti. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 1.97105263,
  constrain: false,
  id: "fig-ricerca-hofstede-kfc-russia-punti-2024",
)

La @fig-ricerca-hofstede-kfc-danimarca-2024 mostra KFC Danimarca · menu e offerte. La fotografia del prodotto e il messaggio guidano la prima schermata.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-kfc-danimarca-2024.jpg"),
  [La fotografia del prodotto e il messaggio guidano la prima schermata. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "La fotografia del prodotto e il messaggio guidano la prima schermata. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.0673913,
  constrain: false,
  id: "fig-ricerca-hofstede-kfc-danimarca-2024",
)

]
#[
#import "../assets/diagrams/cultural-indices.typ": cultural-chart, dimension-data, chart-geometry


=== Orientamento a lungo termine · LTO

L’orientamento a lungo termine (LTO, Long-Term Orientation Index) confronta il peso dato alla preparazione del futuro con quello attribuito a tradizioni e obblighi legati al presente e al passato. Nel modello, il polo a lungo termine valorizza adattamento, perseveranza e parsimonia; quello a breve termine richiama continuità con le tradizioni, reputazione e adempimento degli obblighi sociali.

Per il design può suggerire domande su come le persone valutano continuità e cambiamento nel tempo. Non misura una preferenza per sconti o acquisti immediati: contano anche risorse disponibili, necessità e caratteristiche del servizio. @hofstede2011-cultures.

*Orientamento a lungo termine*

Ipotesi per la ricerca:

- Quali obiettivi richiedono continuità e perseveranza?
- Come vengono valutati benefici e impegni futuri?
- Quali informazioni aiutano a capire progressi e cambiamenti nel tempo?

*Orientamento a breve termine*

Ipotesi per la ricerca:

- Quali tradizioni orientano le aspettative?
- Come vengono interpretati impegni e responsabilità presenti?
- Quali continuità con le pratiche abituali contano nell’uso del servizio?

La metafora nella @fig-ricerca-lto-metafora mette a confronto i due poli: Continuità con norme e tradizioni e Adattamento e preparazione del futuro.

#image-figure(path("/progetti/booklet/assets/dimensioni-culturali-orange-300/originali/lto.png"),
  [Orientamento a lungo termine · LTO],
  format: "una-colonna",
  id: "fig-ricerca-lto-metafora",
  alt: "Radici e germogli suggeriscono continuità con le tradizioni e adattamento al futuro. Le due metà illustrano LTO, senza ridurlo alla durata di un acquisto.",
  height: 110mm,
  aspect-ratio: (1086, 1448).at(0) / (1086, 1448).at(1),
)

Quale peso hanno tradizioni e norme rispetto ad adattamento e preparazione del futuro? Il polo a lungo termine valorizza pragmatismo, perseveranza e parsimonia (@fig-ricerca-lto-dati).

Nella ricerca UX, esplora come le persone valutano benefici futuri, impegni presenti e cambiamenti nelle pratiche del servizio. #website-note([The Culture Factor, LTO.], "https://www.theculturefactor.com/country-comparison-tool")

#figure([
  #metadata((
    valori: dimension-data.find(d => d.code == "LTO").data.map(a => (paese: a.italianName, iso: a.iso, punteggio: a.score)),
    "asse": ("minimo": 0, "massimo": 100),
    "destinazioni": dimension-data.find(d => d.code == "LTO").data.map(a => (chart-geometry.asse-x
      + chart-geometry.asse-larghezza * a.score / 100)),
  )) <booklet-grafico-culturale>
  #cultural-chart(dimension-data.find(d => d.code == "LTO").data)
],
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [L’asse confronta continuità con norme e tradizioni con adattamento e preparazione del futuro. I punteggi suggeriscono domande su impegni e cambiamento nel tempo; non prescrivono sconti, pulsanti o acquisti immediati. #v(4pt)#text(size: 8pt, style: "italic", [Dati: The Culture Factor. Bandiere: flag-icons, MIT.])],
) <fig-ricerca-lto-dati>

#block(sticky: true)[#strong[Kinder Cina]]

Lo screenshot del sito Kinder per il mercato cinese apre con una scena di gioco fra un adulto e un bambino. Seguono tre schede illustrate e una sezione che presenta diversi prodotti del marchio.

Nel confronto sul LTO, queste scelte editoriali suggeriscono domande: quali aspetti della crescita e del benessere vengono percepiti? Quali impegni presenti o futuri sono esplicitamente comprensibili? Per rispondere servono anche il testo tradotto correttamente e la ricerca con il pubblico previsto (@fig-ricerca-c03-027-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-027-01.jpeg"),
  [La scena di gioco, le schede illustrate e i prodotti collegano la marca alla vita quotidiana. Per il LTO, verifichiamo quali temi di crescita e continuità siano effettivamente compresi.
Homepage di Kinder per il mercato cinese. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-027-01",
  rights: none,
  alt: "La scena di gioco, le schede illustrate e i prodotti collegano la marca alla vita quotidiana. Per il LTO, verifichiamo quali temi di crescita e continuità siano effettivamente compresi.\nHomepage di Kinder per il mercato cinese. Screenshot storico.",
  aspect-ratio: 1140 / 1542,
  height: 110mm,
)

#block(sticky: true)[#strong[Kinder Stati Uniti]]

La schermata di Kinder per il mercato statunitense privilegia prodotti e promozioni.

Nella versione mostrata, l’homepage presenta l'arrivo di un nuovo prodotto sul mercato americano e le notizie sottostanti focalizzano la propria attenzione sui prodotti dell'azienda. Più sotto, dove nel sito cinese c'era una sezione dedicata allo sport per bambini, l'azienda presenta la collaborazione per le proprie sorpresine con la celebre serie «Stranger Things» (@fig-ricerca-c03-028-01).

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-028-01.jpeg"),
  [Nuovi prodotti e collaborazione con Stranger Things danno rilievo alle campagne. Nel confronto sul LTO, esploriamo come vengono valutati novità e benefici nel tempo; una promozione non prova preferenze per risultati immediati.
Homepage di Kinder per il mercato statunitense. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-028-01",
  rights: none,
  alt: "Nuovi prodotti e collaborazione con Stranger Things danno rilievo alle campagne. Nel confronto sul LTO, esploriamo come vengono valutati novità e benefici nel tempo; una promozione non prova preferenze per risultati immediati.\nHomepage di Kinder per il mercato statunitense. Screenshot storico.",
  aspect-ratio: 1140 / 1542,
  height: 110mm,
)

#block(sticky: true)[#strong[Documenti e confronti]]

La @fig-ricerca-online-kinder-cina-20261009 mostra Kinder Cina. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([Kinder Cina.], "https://www.ferrero-kinder.cn/cn/zh/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-kinder-cina-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-kinder-cina-20261009",
)

La @fig-ricerca-online-kinder-usa-20261009 mostra Kinder USA. Prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([Kinder USA.], "https://www.kinder.com/us/en/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-kinder-usa-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-kinder-usa-20261009",
)

La @fig-ricerca-hofstede-kinder-cina-2024 mostra Kinder Cina · bambini e relazioni. Famiglia e bambini: il messaggio della prima schermata.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-kinder-cina-2024.jpg"),
  [Famiglia e bambini: il messaggio della prima schermata. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Famiglia e bambini: il messaggio della prima schermata. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.17737003,
  constrain: false,
  id: "fig-ricerca-hofstede-kinder-cina-2024",
)

La @fig-ricerca-hofstede-kinder-cina-crescita-2024 mostra Kinder Cina · storie di crescita. Relazioni, sport e attività dei bambini nei contenuti del sito.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-kinder-cina-crescita-2024.jpg"),
  [Relazioni, sport e attività dei bambini nei contenuti del sito. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Relazioni, sport e attività dei bambini nei contenuti del sito. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.14067278,
  constrain: false,
  id: "fig-ricerca-hofstede-kinder-cina-crescita-2024",
)

La @fig-ricerca-hofstede-kinder-usa-2024 mostra Kinder USA · novità e prodotti. La novità Kinder Bueno Mini guida il messaggio.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-kinder-usa-2024.jpg"),
  [La novità Kinder Bueno Mini guida il messaggio. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "La novità Kinder Bueno Mini guida il messaggio. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.10690423,
  constrain: false,
  id: "fig-ricerca-hofstede-kinder-usa-2024",
)


=== Indulgenza e restrizione · IVR

Quanto spazio viene riconosciuto al godersi la vita? La restrizione enfatizza il controllo attraverso norme sociali; l’indulgenza ammette una gratificazione relativamente libera (@fig-ricerca-ivr-dati). @hofstede2011-cultures.

La metafora nella @fig-ricerca-ivr-metafora mette a confronto i due poli: Controllo mediante norme sociali e Gratificazione relativamente libera.

#image-figure(path("/progetti/booklet/assets/dimensioni-culturali-orange-300/originali/ivr.png"),
  [Indulgenza e restrizione · IVR],
  format: "una-colonna",
  id: "fig-ricerca-ivr-metafora",
  alt: "Forme regolari e petali che si aprono evocano norme sociali e gratificazione relativamente libera. I poli IVR non sono giudizi morali né misure dell’autocontrollo individuale.",
  height: 110mm,
  aspect-ratio: (1086, 1448).at(0) / (1086, 1448).at(1),
)

Nella ricerca UX, verifica quali attività e messaggi risultano appropriati nel contesto d’uso e quali vincoli sociali incidono sul servizio. #website-note([The Culture Factor, IVR.], "https://www.theculturefactor.com/country-comparison-tool")

#figure([
  #metadata((
    valori: dimension-data.find(d => d.code == "IVR").data.map(a => (paese: a.italianName, iso: a.iso, punteggio: a.score)),
    "asse": ("minimo": 0, "massimo": 100),
    "destinazioni": dimension-data.find(d => d.code == "IVR").data.map(a => (chart-geometry.asse-x
      + chart-geometry.asse-larghezza * a.score / 100)),
  )) <booklet-grafico-culturale>
  #cultural-chart(dimension-data.find(d => d.code == "IVR").data)
],
  kind: image, supplement: [Figura], placement: top, scope: "parent",
  caption: [Le posizioni confrontano controllo tramite norme sociali e gratificazione relativamente libera. I punteggi aprono domande su aspettative e vincoli nel contesto d’uso, senza misurare felicità o desideri delle singole persone. #v(4pt)#text(size: 8pt, style: "italic", [Dati: The Culture Factor. Bandiere: flag-icons, MIT.])],
) <fig-ricerca-ivr-dati>

#block(sticky: true)[#strong[Documenti e confronti]]

Le pagine slovena e slovacca di McDonald’s sono usate qui come esercizio interpretativo: osservare i temi evocati non permette di calcolare un indice IVR. I medesimi documenti saranno ripresi nel caso di localizzazione, con una domanda diversa.

La @fig-ricerca-c03-036-02 mostra IVR · osservare svago e piaceri. Esercizio: quali messaggi riguardano svago e gratificazione? Lo screenshot non misura IVR.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-036-02.jpeg"),
  [Esercizio: quali messaggi riguardano svago e gratificazione? Lo screenshot non misura IVR.],
  format: "due-colonne",
  id: "fig-ricerca-c03-036-02",
  rights: none,
  alt: "Esercizio: quali messaggi riguardano svago e gratificazione? Lo screenshot non misura IVR.",
  aspect-ratio: 1140 / 1590,
  height: 110mm,
)

La @fig-ricerca-c03-036-01 mostra IVR · osservare regole e condizioni. Esercizio: quali condizioni regolano le offerte? Non bastano a dimostrare restrizione culturale.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-036-01.jpeg"),
  [Esercizio: quali condizioni regolano le offerte? Non bastano a dimostrare restrizione culturale. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-036-01",
  rights: none,
  alt: "Esercizio: quali condizioni regolano le offerte? Non bastano a dimostrare restrizione culturale. Screenshot storico.",
  aspect-ratio: 1140 / 1338,
  height: 110mm,
)

]
#[


== Identità e adattamento nei mercati

McDonald’s è qui un buon esempio di attenzione al contesto: le pagine locali mantengono la stessa identità, ma adattano lingua, campagne, offerta e accessi al servizio. Gli screenshot storici rendono visibili scelte diverse per pubblici e occasioni d’uso differenti.

Il valore del caso è questa combinazione di continuità e adattamento. I modelli culturali offrono una chiave di lettura, mentre l’efficacia delle singole scelte va verificata con gli utenti (@fig-ricerca-c03-029-01). @brewer2014-ecological.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-029-01.jpeg"),
  [Gli archi e il giallo mantengono riconoscibile McDonald’s. Le pagine successive mostrano come questa identità comune accompagni messaggi, offerte e servizi adattati ai diversi mercati. Screenshot storico.],
  format: "una-colonna",
  rights: [Marchio McDonald’s: McDonald’s Corporation.],
  alt: "Gli archi e il giallo mantengono riconoscibile McDonald’s. Le pagine successive mostrano come questa identità comune accompagni messaggi, offerte e servizi adattati ai diversi mercati. Screenshot storico.",
  width: 90pt * 0.75468829,
  placement: top,
  scope: "column",
  id: "fig-ricerca-c03-029-01",
)


=== Cina e Paesi Bassi

Il confronto tra le #strong[homepage di McDonald’s nei diversi Paesi] parte dal modo in cui il brand presenta la propria offerta e organizza i percorsi di navigazione. Nella versione cinese, la homepage riunisce numerose campagne e promozioni in una composizione molto ricca; quella olandese presenta invece in modo più distinto #strong[promozioni, servizi e contenuti dedicati alla relazione con il cliente]. Si tratta di un esempio concreto di #strong[adattamento editoriale e progettuale] ai diversi contesti locali. La #strong[PDI (Power Distance Index)] può aiutare a formulare domande sul rapporto tra autorevolezza, fiducia e autonomia, ma non permette di interpretare direttamente la densità della pagina come una misura delle gerarchie sociali di un Paese.

Nello screenshot del sito cinese, prodotti, campagne, app e informazioni dell’azienda convivono in un mosaico. Lingua e temi dei riquadri costruiscono una pagina locale; gli archi, il giallo e il sistema di accessi mantengono riconoscibile la marca.

L’esempio positivo mostra come #strong[l’offerta possa essere adattata al mercato locale] e presentata in modo efficiente. Per valutarne l’efficacia, osserviamo i #strong[percorsi di navigazione] e verifichiamo quanto aiutino le persone a trovare facilmente ciò che cercano (@fig-ricerca-figma-mcd-174).

La @fig-ricerca-figma-mcd-174 conserva la pagina completa a cui si riferisce questa lettura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/figma-mcd-174.png"),
  [Campagne, prodotti, app e informazioni aziendali occupano riquadri distinti del mosaico cinese. L’identità comune della marca sostiene contenuti locali; il layout non misura la PDI degli utenti. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Campagne, prodotti, app e informazioni aziendali occupano riquadri distinti del mosaico cinese. L’identità comune della marca sostiene contenuti locali; il layout non misura la PDI degli utenti. Documento storico; data della cattura non attestata.",
  height: 330pt,
  aspect-ratio: 1.00954198,
  constrain: false,
  id: "fig-ricerca-figma-mcd-174",
)

La #strong[homepage olandese] organizza in sezioni distinte contenuti e servizi come #strong[Happy Meal, app, McCafé, consegna e feedback]. Testi e immagini accompagnano azioni e informazioni facilmente riconoscibili, mentre la struttura della pagina è diversa da quella, più ricca e articolata, della homepage cinese. Un buon adattamento consiste nel #strong[dare una forma adeguata al contesto locale], mantenendo riconoscibili la marca e i suoi servizi. Il confronto tra le due homepage permette di riflettere su aspetti come #strong[fiducia e autonomia durante la navigazione], senza però attribuire a tutto il pubblico di un Paese un unico modo di rapportarsi all’autorità (@fig-ricerca-figma-mcd-175).

La @fig-ricerca-figma-mcd-175 conserva la pagina completa a cui si riferisce questa lettura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/figma-mcd-175.png"),
  [Happy Meal, app, McCafé, consegna e feedback hanno spazi e azioni distinti. La homepage olandese mantiene l’identità McDonald’s e adatta il percorso editoriale ai contenuti del servizio locale. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  id: "fig-ricerca-figma-mcd-175",
  rights: none,
  alt: "Happy Meal, app, McCafé, consegna e feedback hanno spazi e azioni distinti. La homepage olandese mantiene l’identità McDonald’s e adatta il percorso editoriale ai contenuti del servizio locale. Documento storico; data della cattura non attestata.",
  aspect-ratio: 1056 / 1274,
  height: 110mm,
)

Nella @fig-ricerca-online-mcd-cina-20261009 osserviamo McDonald’s · Cina: prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([McDonald’s · Cina.], "https://www.mcdonalds.com.cn/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-cina-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mcd-cina-20261009",
)

Nella @fig-ricerca-c03-032-01 osserviamo McDonald’s · Cina: iniziative e contenuti aziendali nella griglia della homepage.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-032-01.jpeg"),
  [Iniziative e contenuti aziendali nella griglia della homepage. Screenshot storico.],
  format: "due-colonne",
  rights: none,
  alt: "Iniziative e contenuti aziendali nella griglia della homepage. Screenshot storico.",
  height: 285pt,
  aspect-ratio: 1.09510086,
  constrain: false,
  id: "fig-ricerca-c03-032-01",
)

Nella @fig-ricerca-online-mcd-paesi-bassi-20261009 osserviamo McDonald’s · Paesi Bassi: prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([McDonald’s · Paesi Bassi.], "https://www.mcdonalds.com/nl/nl-nl.html")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-paesi-bassi-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mcd-paesi-bassi-20261009",
)

Nella @fig-ricerca-c03-032-02 osserviamo McDonald’s · Paesi Bassi: servizi, prodotti e percorsi di approfondimento.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-032-02.jpeg"),
  [Servizi, prodotti e percorsi di approfondimento. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-032-02",
  rights: none,
  alt: "Servizi, prodotti e percorsi di approfondimento. Screenshot storico.",
  aspect-ratio: 1140 / 2166,
  height: 110mm,
)

Nella @fig-ricerca-hofstede-mcd-cina-2024 osserviamo McDonald’s Cina: confronta campagne, contenuti e servizi.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-mcd-cina-2024.jpg"),
  [Confronta campagne, contenuti e servizi. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Confronta campagne, contenuti e servizi. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 1.91793313,
  constrain: false,
  id: "fig-ricerca-hofstede-mcd-cina-2024",
)

Nella @fig-ricerca-hofstede-mcd-paesi-bassi-2024 osserviamo McDonald’s Paesi Bassi: confronta campagne, contenuti e servizi.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-mcd-paesi-bassi-2024.jpg"),
  [Confronta campagne, contenuti e servizi. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Confronta campagne, contenuti e servizi. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.14893617,
  constrain: false,
  id: "fig-ricerca-hofstede-mcd-paesi-bassi-2024",
)


=== Italia, Stati Uniti e Turchia

Stati Uniti e Turchia mostrano come una marca possa cambiare gli accenti della comunicazione. Premi e vantaggi personali sono centrali nello screenshot del sito statunitense; ricorrenza nazionale, offerte per la famiglia e canali social lo sono invece in quello del sito turco.

L’#strong[IDV] aiuta a riflettere sul rapporto tra #strong[individuo e gruppo]. Tuttavia, le campagne pubblicitarie vanno considerate come #strong[scelte progettuali legate a uno specifico contesto] e non possono essere utilizzate per misurare il livello di individualismo dei singoli utenti (@fig-ricerca-figma-mcd-176).

La #strong[homepage statunitense] mette in primo piano il panino #strong[McRib] e collega la promozione ai servizi digitali di McDonald’s. Sezioni come #strong[My Rewards], «Earn Points», «Order in the App», «Order McDelivery Now» e «Get App Deals» associano il prodotto a #strong[premi, ordinazione e vantaggi riservati agli utenti dell’app]. La pagina costruisce quindi il percorso intorno a #strong[benefici concreti per il cliente], integrando promozione e servizi. È un esempio di localizzazione efficace del percorso: per valutarne l’efficacia, possiamo osservare #strong[chi prende le decisioni di acquisto e in che modo vengono utilizzati questi incentivi].

La @fig-ricerca-figma-mcd-176 conserva la pagina completa a cui si riferisce questa lettura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/figma-mcd-176.png"),
  [McRib, «My rewards» e i pulsanti per punti, app e consegna collegano il prodotto a vantaggi e azioni concrete. La pagina statunitense adatta il messaggio commerciale e gli accessi al servizio. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "McRib, «My rewards» e i pulsanti per punti, app e consegna collegano il prodotto a vantaggi e azioni concrete. La pagina statunitense adatta il messaggio commerciale e gli accessi al servizio. Documento storico; data della cattura non attestata.",
  height: 330pt,
  aspect-ratio: 1.27864583,
  id: "fig-ricerca-figma-mcd-176",
  constrain: true,
)

La #strong[homepage turca] dedica il banner principale al #strong[centenario della Repubblica], seguito da contenuti dedicati ai prodotti, all’Happy Meal, alla promozione dell’app e ai canali social. Una ricorrenza significativa per il mercato locale entra così nella comunicazione di McDonald’s, pur mantenendo riconoscibile l’identità della marca presente anche nelle altre versioni. È un esempio di #strong[adattamento dei messaggi al contesto culturale e alle occasioni locali]. La campagna, però, non può essere interpretata come un’espressione dei valori di tutte le persone del Paese: rappresenta una scelta comunicativa concreta, che va analizzata considerando #strong[il pubblico a cui si rivolge e il periodo in cui è stata realizzata (@fig-ricerca-figma-mcd-177)].

La @fig-ricerca-figma-mcd-177 conserva la pagina completa a cui si riferisce questa lettura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/figma-mcd-177.png"),
  [Il banner del centenario della Repubblica, Happy Meal, app e social combinano ricorrenza locale e servizi della marca. L’adattamento culturale è visibile nel messaggio della campagna. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Il banner del centenario della Repubblica, Happy Meal, app e social combinano ricorrenza locale e servizi della marca. L’adattamento culturale è visibile nel messaggio della campagna. Documento storico; data della cattura non attestata.",
  height: 330pt,
  aspect-ratio: 1.13652275,
  constrain: false,
  id: "fig-ricerca-figma-mcd-177",
)

L’Italia è un ulteriore mercato: lo screenshot italiano e il documento statunitense non sono intercambiabili. Lingua, campagne e servizi vanno osservati nella versione effettivamente riprodotta.

Nella @fig-ricerca-online-mcd-italia-20261009 osserviamo McDonald’s · Italia: prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([McDonald’s · Italia.], "https://www.mcdonalds.it/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-italia-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mcd-italia-20261009",
)

Nella @fig-ricerca-c03-034-01 osserviamo McDonald’s · Italia: comodità, prodotti e servizi rivolti alla persona.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-034-01.png"),
  [Comodità, prodotti e servizi rivolti alla persona. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-034-01",
  rights: none,
  alt: "Comodità, prodotti e servizi rivolti alla persona. Screenshot storico.",
  aspect-ratio: 1010 / 1274,
  height: 110mm,
)

Nella @fig-ricerca-online-mcd-turchia-20261009 osserviamo McDonald’s · Turchia: prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([McDonald’s · Turchia.], "https://www.mcdonalds.com.tr/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-turchia-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mcd-turchia-20261009",
)

Nella @fig-ricerca-c03-034-02 osserviamo McDonald’s · Turchia: ricette locali, promozioni e partecipazione.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-034-02.jpeg"),
  [Ricette locali, promozioni e partecipazione. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-034-02",
  rights: none,
  alt: "Ricette locali, promozioni e partecipazione. Screenshot storico.",
  aspect-ratio: 1140 / 1215,
  height: 110mm,
)

Nella @fig-ricerca-hofstede-mcd-usa-2024 osserviamo McDonald’s Stati Uniti: servizi e contenuti della homepage.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-mcd-usa-2024.jpg"),
  [McRib, «My rewards» e i pulsanti per punti, app e consegna collegano il prodotto a vantaggi e azioni concrete. La pagina statunitense adatta il messaggio commerciale e gli accessi al servizio. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "McRib, «My rewards» e i pulsanti per punti, app e consegna collegano il prodotto a vantaggi e azioni concrete. La pagina statunitense adatta il messaggio commerciale e gli accessi al servizio. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 1.27837051,
  constrain: false,
  id: "fig-ricerca-hofstede-mcd-usa-2024",
)

Nella @fig-ricerca-hofstede-mcd-turchia-2024 osserviamo McDonald’s Turchia: confronta campagne, contenuti e servizi.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-mcd-turchia-2024.jpg"),
  [Il banner del centenario della Repubblica, Happy Meal, app e social combinano ricorrenza locale e servizi della marca. L’adattamento culturale è visibile nel messaggio della campagna. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Il banner del centenario della Repubblica, Happy Meal, app e social combinano ricorrenza locale e servizi della marca. L’adattamento culturale è visibile nel messaggio della campagna. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.14156627,
  constrain: false,
  id: "fig-ricerca-hofstede-mcd-turchia-2024",
)


=== Slovacchia e Slovenia

Le versioni slovacca e slovena affiancano ai prodotti temi e toni differenti. In Slovacchia emergono sostegno alle famiglie e responsabilità sulle materie prime; in Slovenia, relazioni, piaceri quotidiani e dialogo con il cliente.

MAS permette di discutere risultati, cura e qualità della vita. Il buon esempio sta nell’adattare i messaggi locali, senza dedurre dal punteggio nazionale il genere o la personalità degli utenti (@fig-ricerca-figma-mcd-178).

Nello screenshot del sito slovacco, McHappy Day racconta il sostegno alle famiglie con bambini in cura lontano da casa. La sezione sulle materie prime affianca al prodotto la responsabilità dell’azienda.

La pagina locale non si limita a un’offerta da acquistare: presenta anche relazione con il territorio e cura. Questi contenuti mostrano come la stessa identità possa accogliere valori e impegni diversi, da verificare rispetto a ciò che conta per il pubblico.

La @fig-ricerca-figma-mcd-178 conserva la pagina completa a cui si riferisce questa lettura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/figma-mcd-178.png"),
  [Prodotti, McHappy Day e responsabilità sulle materie prime convivono nella pagina slovacca. Il messaggio locale affianca offerta commerciale, sostegno alle famiglie e cura. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Prodotti, McHappy Day e responsabilità sulle materie prime convivono nella pagina slovacca. Il messaggio locale affianca offerta commerciale, sostegno alle famiglie e cura. Documento storico; data della cattura non attestata.",
  height: 330pt,
  aspect-ratio: 1.51285714,
  id: "fig-ricerca-figma-mcd-178",
  constrain: true,
)

Nella #strong[homepage slovena], i personaggi #strong[_Don Juan_ e _Doña Sofia_], il cuore accanto ai due hamburger e il donut della campagna «Dolce novembre» contribuiscono a creare un #strong[tono più personale e relazionale]. Anche messaggi come «Buongiorno, buona giornata!» e l’invito a lasciare un feedback rafforzano questo approccio alla comunicazione. Si tratta di un esempio positivo di adattamento: #strong[cambia il modo di comunicare con il cliente, mentre l’identità della marca rimane riconoscibile]. Il confronto con il caso slovacco permette di osservare differenze nei temi e nel tono della comunicazione, ma, anche qui, non dimostra che tutti gli utenti di un Paese condividano gli stessi valori o comportamenti (@fig-ricerca-figma-mcd-179).

La @fig-ricerca-figma-mcd-179 conserva la pagina completa a cui si riferisce questa lettura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/figma-mcd-179.png"),
  [Cuore, saluti quotidiani, donut e richiesta d’opinione danno alla pagina slovena un tono relazionale. La marca adatta i messaggi locali, oltre a tradurre le etichette. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  id: "fig-ricerca-figma-mcd-179",
  rights: none,
  alt: "Cuore, saluti quotidiani, donut e richiesta d’opinione danno alla pagina slovena un tono relazionale. La marca adatta i messaggi locali, oltre a tradurre le etichette. Documento storico; data della cattura non attestata.",
  aspect-ratio: 977 / 1088,
  height: 110mm,
)

Nella @fig-ricerca-online-mcd-slovacchia-20261009 osserviamo McDonald’s · Slovacchia: prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([McDonald’s · Slovacchia.], "https://www.mcdonalds.sk/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-slovacchia-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mcd-slovacchia-20261009",
)

La @fig-ricerca-c03-036-01 riprende il documento già osservato: qui il confronto riguarda la localizzazione dei messaggi.

Nella @fig-ricerca-online-mcd-slovenia-20261009 osserviamo McDonald’s · Slovenia: prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([McDonald’s · Slovenia.], "https://www.mcdonalds.si/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-slovenia-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mcd-slovenia-20261009",
)

La @fig-ricerca-c03-036-02 riprende il documento già osservato: qui il confronto riguarda la localizzazione dei messaggi.

Nella @fig-ricerca-hofstede-mcd-slovacchia-2024 osserviamo McDonald’s Slovacchia: confronta campagne, contenuti e servizi.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-mcd-slovacchia-2024.jpg"),
  [Prodotti, McHappy Day e responsabilità sulle materie prime convivono nella pagina slovacca. Il messaggio locale affianca offerta commerciale, sostegno alle famiglie e cura. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Prodotti, McHappy Day e responsabilità sulle materie prime convivono nella pagina slovacca. Il messaggio locale affianca offerta commerciale, sostegno alle famiglie e cura. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 1.51434426,
  constrain: false,
  id: "fig-ricerca-hofstede-mcd-slovacchia-2024",
)

Nella @fig-ricerca-hofstede-mcd-slovenia-2024 osserviamo McDonald’s Slovenia: confronta campagne, contenuti e servizi.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-mcd-slovenia-2024.jpg"),
  [Cuore, saluti quotidiani, donut e richiesta d’opinione danno alla pagina slovena un tono relazionale. La marca adatta i messaggi locali, oltre a tradurre le etichette. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Cuore, saluti quotidiani, donut e richiesta d’opinione danno alla pagina slovena un tono relazionale. La marca adatta i messaggi locali, oltre a tradurre le etichette. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.18253968,
  constrain: false,
  id: "fig-ricerca-hofstede-mcd-slovenia-2024",
)


=== Giappone e India

La #strong[homepage indiana] presenta in primo piano una promozione, accompagnata da una scheda del prodotto con le relative informazioni sugli ingredienti. Il #strong[linguaggio visivo] contribuisce a caratterizzare la campagna, mentre le informazioni sul prodotto rimangono parte integrante dell’offerta. La documentazione storica descrive inoltre elementi interattivi, come un #strong[cursore McFlurry], una barra di caricamento a forma di patatine e alcune animazioni, che non possono però essere verificati attraverso una semplice immagine statica. È un buon esempio di come #strong[identità della marca, messaggi promozionali e contenuti locali] possano essere integrati nella stessa esperienza. Per valutarne l’efficacia è necessario osservare come le persone utilizzano concretamente la pagina e svolgono i propri compiti, senza dedurre dal solo design quanto ogni utente sia più o meno a proprio agio di fronte all’incertezza (@fig-ricerca-figma-mcd-181).

La @fig-ricerca-figma-mcd-181 conserva la pagina completa a cui si riferisce questa lettura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/figma-mcd-181.png"),
  [Promozione iniziale e scheda del panino combinano un linguaggio di campagna con informazioni sugli ingredienti. Lo screenshot mostra il contenuto locale; le animazioni sono descritte nella fonte del caso. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Promozione iniziale e scheda del panino combinano un linguaggio di campagna con informazioni sugli ingredienti. Lo screenshot mostra il contenuto locale; le animazioni sono descritte nella fonte del caso. Documento storico; data della cattura non attestata.",
  height: 330pt,
  aspect-ratio: 1.02054795,
  constrain: false,
  id: "fig-ricerca-figma-mcd-181",
)

Il documento giapponese presenta un mercato distinto da quello indiano. Il confronto osserva prezzi, promozioni e informazioni; queste scelte commerciali non misurano da sole l’avversione all’incertezza dei singoli utenti.

Nella @fig-ricerca-online-mcd-giappone-20261009 osserviamo McDonald’s · Giappone: prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([McDonald’s · Giappone.], "https://www.mcdonalds.co.jp/")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-giappone-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mcd-giappone-20261009",
)

Nella @fig-ricerca-c03-038-01 osserviamo McDonald’s · Giappone: prezzi, prodotti e condizioni della promozione.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-038-01.png"),
  [Prezzi, prodotti e condizioni della promozione. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-038-01",
  rights: none,
  alt: "Prezzi, prodotti e condizioni della promozione. Screenshot storico.",
  aspect-ratio: 718 / 1098,
  height: 110mm,
)

Nella @fig-ricerca-online-mcd-india-20261009 osserviamo McDonald’s · India occidentale: sito ufficiale dell’India occidentale e meridionale · screenshot del 9 ottobre 2026. #website-note([McDonald’s · India occidentale.], "https://www.mcdonaldsindia.com/home.html")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-india-20261009.jpg"),
  [Sito ufficiale dell’India occidentale e meridionale · screenshot del 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Sito ufficiale dell’India occidentale e meridionale · screenshot del 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.04402516,
  constrain: false,
  id: "fig-ricerca-online-mcd-india-20261009",
)

Nella @fig-ricerca-c03-038-02 osserviamo McDonald’s · India occidentale: immagini, novità e promozioni.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-038-02.jpeg"),
  [Immagini, novità e promozioni. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-038-02",
  rights: none,
  alt: "Immagini, novità e promozioni. Screenshot storico.",
  aspect-ratio: 1140 / 1338,
  height: 110mm,
)

Nella @fig-ricerca-hofstede-mcd-india-2024 osserviamo McDonald’s India: confronta campagne, contenuti e servizi.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/hofstede-mcd-india-2024.jpg"),
  [Promozione iniziale e scheda del panino combinano un linguaggio di campagna con informazioni sugli ingredienti. Lo screenshot mostra il contenuto locale; le animazioni sono descritte nella fonte del caso. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  rights: none,
  alt: "Promozione iniziale e scheda del panino combinano un linguaggio di campagna con informazioni sugli ingredienti. Lo screenshot mostra il contenuto locale; le animazioni sono descritte nella fonte del caso. Documento storico; data della cattura non attestata.",
  height: 285pt,
  aspect-ratio: 2.18181818,
  constrain: false,
  id: "fig-ricerca-hofstede-mcd-india-2024",
)


=== Cina e Australia

La #strong[homepage cinese] affianca prodotti, campagne, contenuti dedicati a #strong[McCafé], servizi dell’app e informazioni sull’#strong[origine delle materie prime]. La pagina presenta così l’offerta insieme a temi legati alla qualità dei prodotti e alle attività dell’azienda. Si tratta di un adattamento positivo perché #strong[amplia e modifica i contenuti comunicati dalla marca in funzione del contesto locale], mantenendone al tempo stesso riconoscibile l’identità. La prospettiva dell’#strong[LTO] può aiutare a discutere il valore attribuito alla continuità e ai benefici nel tempo, ma la selezione dei contenuti della homepage non permette di stabilire quale sia l’orientamento temporale dei singoli utenti (@fig-ricerca-figma-mcd-183).

La @fig-ricerca-figma-mcd-183 conserva la pagina completa a cui si riferisce questa lettura.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/figma-mcd-183.png"),
  [Prodotti, McCafé, app e informazioni sulle materie prime occupano riquadri del mosaico. La pagina cinese adatta i contenuti locali, mantenendo un’identità visiva comune. Documento storico; data della cattura non attestata.],
  format: "due-colonne",
  id: "fig-ricerca-figma-mcd-183",
  rights: none,
  alt: "Prodotti, McCafé, app e informazioni sulle materie prime occupano riquadri del mosaico. La pagina cinese adatta i contenuti locali, mantenendo un’identità visiva comune. Documento storico; data della cattura non attestata.",
  aspect-ratio: 1035 / 1289,
  height: 110mm,
)

L’Australia completa il confronto fra mercati. La cattura del 9 ottobre 2026 e lo screenshot storico restano documenti distinti; né la presenza di offerte né la durata di una campagna consentono di attribuire ai visitatori un orientamento temporale.

La @fig-ricerca-online-mcd-cina-20261009 riprende il documento già osservato: qui il confronto riguarda la localizzazione dei messaggi.

Il mosaico cinese già osservato nella @fig-ricerca-c03-032-01 torna pertinente alla domanda sui temi di continuità: non è una nuova cattura.

Nella @fig-ricerca-online-mcd-australia-20261009 osserviamo McDonald’s · Australia: prima schermata del sito ufficiale · 9 ottobre 2026. #website-note([McDonald’s · Australia.], "https://www.mcdonalds.com/au/en-au.html")

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/online-mcd-australia-20261009.jpg"),
  [Prima schermata del sito ufficiale · 9 ottobre 2026.],
  format: "due-colonne",
  rights: none,
  alt: "Prima schermata del sito ufficiale · 9 ottobre 2026.",
  height: 245pt,
  aspect-ratio: 1.77777778,
  constrain: false,
  id: "fig-ricerca-online-mcd-australia-20261009",
)

Nella @fig-ricerca-c03-040-02 osserviamo McDonald’s · Australia: offerte, ordine e possibilità d’acquisto.

#image-figure(path("/risorse-condivise/immagini/figure/ricerca/c03-040-02.png"),
  [Offerte, ordine e possibilità d’acquisto. Screenshot storico.],
  format: "due-colonne",
  id: "fig-ricerca-c03-040-02",
  rights: none,
  alt: "Offerte, ordine e possibilità d’acquisto. Screenshot storico.",
  aspect-ratio: 914 / 1116,
  height: 110mm,
)

Una lettura utile conserva insieme ciò che è osservabile e ciò che resta da verificare. Le differenze fra pagine diventano domande su obiettivi, contesto, contenuti e condizioni d’uso. Interviste e osservazioni permettono poi di tornare a quelle domande con evidenze legate alle persone e al servizio.


]
]

// La compilazione diretta applica lo stesso sistema editoriale del volume.
#show: booklet
#chapter(..chapter-parameters(2), content)
