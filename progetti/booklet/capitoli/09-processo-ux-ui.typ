// Chapter 09: complete editable prose shared by the volume and standalone target.
#import "../template/layout.typ": booklet, chapter, website-note
#import "../template/plan.typ": chapter-parameters
#import "../template/figures.typ": image-figure, image-crop
#import "../template/editorial.typ": caption-content
#import "../template/exercises.typ": exercise
#import "../assets/diagrams/ux-process-examples.typ": (
  process-map, brief-record, objective-record, evidence-record, viola-profile,
  journey-example, flow-example, requirements-record, sitemap-example,
  wireframe-progression, prototype-states, test-plan, iteration-record, learning-loop,
)

#let content = [
== Un processo per prendere decisioni

Scegliere colori, caratteri e immagini richiede di sapere che cosa deve permettere di fare il prodotto. Una schermata può apparire ordinata e risultare inadatta al problema: mostra informazioni non pertinenti, richiede un dato che la persona non possiede oppure propone un servizio che non è disponibile nel suo contesto. Il processo di progettazione dell’esperienza collega la comprensione di queste condizioni alla costruzione e alla verifica delle soluzioni.

Il lavoro sulla User Experience, abbreviata in *UX*, riguarda l’esperienza complessiva del prodotto o del servizio. La User Interface, o *UI*, è l’insieme dei mezzi con cui la persona impartisce comandi e riceve risposte. Le due prospettive si incontrano quando un bisogno diventa un percorso utilizzabile: le informazioni da trovare, le azioni disponibili, le parole dei comandi e gli esiti riconoscibili devono collaborare.

Questo capitolo segue le quattordici attività presentate da _Matteo di Pascale_ nel capitolo «Il processo UX completo» del _Manuale di sopravvivenza per UX designer_ @uxDiPascale.#website-note([Scheda editoriale del volume, prima edizione 2019.], "https://www.hoepli.it/libro/manuale-di-sopravvivenza-per-ux-designer/9788820389192.html") Le attività sono raccolte in cinque nuclei: impostare il progetto, comprendere persone e problemi, organizzare l’esperienza, strutturare il prodotto, provare e affinare la soluzione. Il raggruppamento aiuta a leggere le relazioni, mantenendo riconoscibili i quattordici passaggi della fonte.

La @fig-ux-processo offre una vista complessiva. Ogni attività affronta una domanda, impiega strumenti appropriati e produce qualcosa che permette una decisione: un brief, una sintesi delle evidenze, un percorso, una struttura, un prototipo. Il valore del documento dipende da ciò che rende comprensibile e verificabile, oltre che dalla qualità della sua rappresentazione.

Un criterio accompagna tutto il percorso: quale decisione possiamo prendere con le informazioni disponibili e che cosa dobbiamo ancora verificare? La risposta orienta il livello di dettaglio dei materiali e il confronto fra le persone coinvolte. Il registro delle revisioni conserva questo legame.

#figure(process-map(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Quattordici attività raccolte in cinque nuclei. I numeri identificano i passaggi descritti da _Di Pascale_; i ritorni possono riaprire sia il problema sia la soluzione. @uxDiPascale]),
) <fig-ux-processo>

=== Iterazione e responsabilità

L’autore presenta il percorso come un canovaccio adattabile @uxDiPascale. Le attività possono sovrapporsi, cambiare ordine ed essere ripetute. Un test può mostrare che la difficoltà attribuita a un pulsante nasce da una condizione del servizio; un’intervista può suggerire di modificare la domanda iniziale. Tornare su una decisione significa usare ciò che si è appreso per correggere il progetto.

La progettazione centrata sull’essere umano accompagna il ciclo di vita dei sistemi interattivi, secondo l’ambito della norma ISO 9241-210:2019 @uxIso210.#website-note([ISO 9241-210:2019, principi e attività di progettazione centrata sull’essere umano.], "https://www.iso.org/standard/77520.html") Il coinvolgimento delle persone e la valutazione delle soluzioni attraversano quindi il lavoro. Le quattordici attività sono una lettura operativa del processo, distinta dall’articolazione dello standard.

Le responsabilità non coincidono necessariamente con altrettante figure professionali. Ricercatori, progettisti dell’interazione, visual designer, responsabili del prodotto e sviluppatori possono contribuire alle stesse decisioni da prospettive diverse. Occorre rendere esplicito chi raccoglie un’informazione, chi la interpreta, chi decide e chi dovrà realizzare o mantenere la soluzione. La collaborazione diventa più concreta quando le persone discutono lo stesso problema attraverso materiali condivisi.

=== Il caso dei fisioterapisti

Nel caso narrativo del libro, _Carlo_ e _Giovanni_ chiedono un’app che metta in contatto fisioterapisti e clienti. Il progetto cambia significato a seconda che debba sostenere un centro esistente oppure mettere in relazione professionisti indipendenti e persone che cercano una visita. _Viola_, trentacinquenne che lavora fino a tardi, ha bisogno di una visita a domicilio dopo le 20 @uxDiPascale.

Seguiremo questo caso per osservare come una richiesta si trasformi in domande, requisiti e proposte. I documenti e le schermate costruiti per gli esempi sviluppano ipotesi del caso: nomi dei campi, costi, date, disponibilità ed esiti delle prove sono simulati. Servono a rendere discutibili le scelte; la loro presenza non attesta una ricerca realmente svolta o un servizio disponibile.

== Impostare il progetto

Le prime tre attività riguardano la richiesta e il contesto in cui prende forma. Prima di disegnare l’app occorre comprendere gli interlocutori, gli obiettivi e le alternative già disponibili. Il risultato è un punto di partenza condiviso, nel quale fatti, aspettative e ipotesi restano distinguibili.

=== Intervista agli stakeholder e brief

Il primo passaggio è il confronto con gli *stakeholder*: persone e organizzazioni che possono influenzare il progetto o esserne interessate. Il committente è uno degli interlocutori; chi gestisce le prenotazioni, chi offre la prestazione e chi risponde alle richieste di assistenza può conoscere altri vincoli. Intervistare questi soggetti permette di ricostruire il problema da prospettive diverse @uxDiPascale.

Il *brief* raccoglie la richiesta e le condizioni del lavoro. Dovrebbe chiarire quale situazione si vuole cambiare, per chi, con quali risorse e in quale orizzonte temporale. Include gli elementi già stabiliti e quelli negoziabili. «Serve un’app» è ancora una proposta di soluzione: il confronto deve far emergere quale risultato giustifichi il suo sviluppo.

Per _Carlo_ e _Giovanni_ le domande riguardano, per esempio, il funzionamento del servizio. Chi verifica le disponibilità? Quali professionisti possono accettare visite? Come si delimita l’area coperta? Chi interviene se una richiesta non trova risposta? Le risposte cambiano contenuti, flussi e responsabilità dell’interfaccia. Un calendario apparentemente semplice può dipendere da un’organizzazione che deve ancora essere definita.

La @fig-ux-brief separa la richiesta da ciò che rimane da chiarire e da verificare. Durante l’intervista conviene chiedere esempi recenti, documenti esistenti e casi problematici. Se i due committenti descrivono prodotti diversi, occorre rendere visibile il disaccordo prima che diventi una schermata incoerente.

#figure(brief-record(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Un brief iniziale del caso simulato. La richiesta viene accompagnata da domande sul servizio e sulle ipotesi da verificare.]),
) <fig-ux-brief>

La sintesi dell’incontro può essere breve, purché permetta di riconoscere obiettivi, interlocutori, vincoli, responsabilità e questioni aperte. Le decisioni si confermano con chi ne è responsabile. Le convinzioni sul comportamento degli utenti diventano domande di ricerca: l’accordo del committente, da solo, non dimostra che una persona abbia quel bisogno.

=== Analisi degli obiettivi di business

Il secondo passaggio esamina il risultato atteso dal committente e la sua fattibilità @uxDiPascale. Aumentare le prenotazioni di un centro e creare un mercato di prestazioni a domicilio richiedono scelte diverse. Nel primo caso può essere prioritario rendere più semplice un rapporto già esistente; nel secondo occorre comprendere come domanda e offerta possano incontrarsi.

Gli *obiettivi di business* descrivono il cambiamento rilevante per l’organizzazione. «Realizzare cinque schermate» indica una consegna, mentre «ridurre le prenotazioni abbandonate» indica un risultato da osservare. Il numero di schermate può essere necessario per pianificare il lavoro; non permette di sapere se il servizio è migliorato.

La formulazione SMART aiuta a discutere obiettivi specifici, misurabili, raggiungibili, pertinenti e collocati nel tempo. Occorre esplicitare come sarà osservato il cambiamento e con quali dati si potrà confrontarlo. Se non esiste una misura iniziale, la prima attività può essere proprio raccoglierla, senza inventare una percentuale di partenza.

La @fig-ux-obiettivi propone un obiettivo circoscritto alla prova di un percorso. Per il caso dei fisioterapisti possiamo osservare se la persona trova una disponibilità compatibile, comprende il costo e arriva alla conferma senza aiuto. Un esito nel prototipo aiuta a valutare quel percorso; il successo economico del servizio richiede altre evidenze, come disponibilità dei professionisti, domanda e sostenibilità dell’organizzazione.

#figure(objective-record(), kind: image, placement: top, scope: "column",
  caption: caption-content([Da un obiettivo generico a una domanda osservabile. L’esempio riguarda un ciclo di prova del prototipo e non stabilisce una soglia universale di successo.]),
) <fig-ux-obiettivi>

Gli obiettivi devono poter essere discussi anche quando entrano in tensione. Richiedere la creazione di un account prima di mostrare gli orari può favorire una misura interna e ostacolare la scelta di chi vuole prima capire se il servizio sia adatto. Rendere esplicita questa tensione permette di confrontare alternative e verificare le conseguenze della decisione.

=== Analisi dei competitor

Il terzo passaggio osserva le alternative che affrontano lo stesso bisogno @uxDiPascale. L’analisi dei *competitor* esamina servizi concorrenti; il termine *benchmark* può comprendere anche riferimenti esterni al settore. Una soluzione di prenotazione per un’attività diversa può suggerire un modo di rappresentare gli orari, purché si comprendano le differenze del contesto.

Nel caso dei fisioterapisti le alternative includono piattaforme digitali, siti di studi professionali e prenotazioni telefoniche. Per alcune persone il contatto con un professionista conosciuto può essere più rilevante di un’app concorrente. Limitarsi ai prodotti con un’interfaccia simile rischia di escludere il modo in cui il bisogno viene già soddisfatto.

Conviene definire prima gli aspetti da confrontare: persone servite, copertura, informazioni disponibili, modalità di scelta, chiarezza del costo, modifica dell’appuntamento e assistenza. Si segue lo stesso compito in ciascuna alternativa e si annotano passaggi, vincoli e domande. Le schermate aiutano a documentare ciò che si è osservato, con data e condizioni della consultazione.

Un catalogo di colori e pulsanti dice poco sulle ragioni delle scelte. È più utile annotare che un servizio mostra la copertura prima di richiedere dati personali oppure che distingue una richiesta in attesa da una visita confermata. Queste osservazioni diventano ipotesi trasferibili al proprio progetto, da verificare con le persone interessate.

L’analisi non dimostra automaticamente che una soluzione funzioni bene: la diffusione di un’interfaccia e la sua qualità d’uso sono informazioni differenti. Il risultato del confronto dovrebbe rendere visibili opportunità, limiti e interrogativi. Copiare un percorso senza conoscerne le condizioni può trasferire anche i suoi problemi.

== Comprendere persone e problemi

Le attività successive portano il progetto dalla visione del committente alle condizioni d’uso. La definizione iniziale del problema orienta la ricerca; la ricerca può modificarla. Le personas sintetizzano ciò che è rilevante per decidere, mantenendo riconoscibile il legame con le evidenze.

=== Definizione dei problemi

Il quarto passaggio chiede quale problema si possa affrontare con il prodotto @uxDiPascale. «I siti concorrenti sono poco belli» è un giudizio che non identifica ancora un ostacolo per una persona. Una formulazione più utile descrive chi incontra una difficoltà, in quale situazione e con quali conseguenze.

Nel caso narrativo, _Viola_ cerca una visita compatibile con l’orario di lavoro. Il problema potrebbe essere la difficoltà di trovare un professionista disponibile a domicilio la sera. È ancora un’ipotesi: la ricerca dovrà chiarire come le persone cercano, quali alternative incontrano e perché alcune non risultano praticabili.

La formulazione va distinta dalla soluzione. «Serve un filtro dopo le 20» descrive una possibile risposta; «è difficile capire quali visite siano compatibili con la fine della giornata lavorativa» descrive l’ostacolo da indagare. Il filtro può rivelarsi utile, ma anche una disponibilità esposta direttamente o una diversa organizzazione del servizio potrebbero affrontare il problema.

Un problema troppo ampio rende difficile scegliere che cosa osservare. «Migliorare la salute delle persone» non indica un compito sufficientemente circoscritto per la prova di un’app. Un problema troppo ristretto può invece nascondere le cause: «ingrandire il pulsante» non spiega perché la persona non proceda. La formulazione deve permettere di esplorare alternative e di riconoscere un eventuale cambiamento.

Quando emergono problemi differenti, si registrano separatamente. Una persona può non trovare un orario; un’altra può non comprendere il costo; un’altra ancora può non fidarsi del servizio. Le conseguenze sul progetto non sono identiche. La priorità dipende dalla rilevanza del bisogno, dalla gravità dell’ostacolo e dalle possibilità di intervento, da discutere insieme alle evidenze disponibili.

=== User research

Il quinto passaggio raccoglie informazioni sulle persone, sui loro comportamenti e sui contesti @uxDiPascale. La *user research*, o ricerca con gli utenti, parte da domande che possono cambiare una decisione. «Come hai prenotato l’ultima visita?» permette di ricostruire un’esperienza; «Useresti la nostra app?» raccoglie una previsione e può favorire una risposta compiacente.

Si sceglie il metodo in relazione alla domanda. Un’intervista permette di approfondire episodi, motivazioni e difficoltà; l’osservazione aiuta a vedere ciò che accade nel contesto; un questionario raccoglie risposte comparabili a domande definite. Questi metodi producono informazioni diverse. Un insieme di risposte a scelta multipla non ricostruisce da solo le ragioni di un comportamento.

Le indicazioni del GOV.UK Service Manual invitano a preparare una traccia e a favorire racconti concreti con domande aperte e neutrali.#website-note([GOV.UK Service Manual, preparazione e conduzione delle interviste in profondità.], "https://www.gov.uk/service-manual/user-research/using-in-depth-interviews") Per il servizio dei fisioterapisti possiamo chiedere come sia stata cercata l’ultima disponibilità, quali informazioni siano mancate e che cosa abbia fatto cambiare scelta. La traccia orienta l’incontro lasciando spazio a elementi non previsti.

La selezione delle persone deve essere coerente con il bisogno e con il contesto. Coinvolgere soltanto colleghi che conoscono il progetto può lasciare invisibili difficoltà importanti. Occorre considerare anche chi usa strumenti assistivi, chi ha poca familiarità con il servizio e chi dipende dall’aiuto di un’altra persona. La pianificazione esplicita gruppi, domande e attività, aggiornandosi quando emergono nuove conoscenze.#website-note([GOV.UK Service Manual, pianificazione della ricerca e individuazione dei gruppi da coinvolgere.], "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service")

Durante la raccolta si separano parole e azioni osservate dalle interpretazioni del gruppo. «La persona ha cercato l’orario nella scheda del professionista» è un’osservazione; «non capisce i calendari» è un’interpretazione molto più ampia. Il registro della @fig-ux-evidenze mostra come una spiegazione provvisoria possa diventare una decisione da provare, senza assumere che sia già corretta.

#figure(evidence-record(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Osservazione, interpretazione, decisione e nuova domanda nel caso simulato. La distinzione permette di conservare anche spiegazioni alternative.]),
) <fig-ux-evidenze>

Le persone devono sapere che cosa accadrà e come saranno usate le informazioni raccolte. Si concordano le modalità di partecipazione e di eventuale registrazione, limitando i dati a quelli necessari alla ricerca. Appunti e materiali vanno organizzati in modo che il gruppo possa ritrovare l’episodio dal quale deriva una conclusione.

La sintesi cerca ricorrenze e differenze: quali bisogni sono condivisi, quali riguardano una condizione specifica, quali ipotesi iniziali sono state contraddette? Le evidenze possono richiedere di rivedere il problema o gli obiettivi. Il numero di documenti prodotti non sostituisce questo passaggio interpretativo.

=== User personas

Il sesto passaggio costruisce rappresentazioni sintetiche delle persone per cui si progetta @uxDiPascale. Una *persona* è un profilo fittizio che rende riconoscibili caratteristiche pertinenti di un gruppo di utenti. Per sostenere decisioni attendibili, bisogni, comportamenti e condizioni d’uso devono derivare dalla ricerca; dettagli inventati possono rendere la scheda vivace senza renderla più utile @uxDykes.

Nel caso del libro, _Viola_ rende concreto il bisogno di una visita serale a domicilio. Il dato significativo per la decisione è il rapporto fra orario, luogo e possibilità di scegliere. L’età, da sola, non permette di dedurre abilità digitali, disponibilità economica o preferenze visive. Il profilo della @fig-ux-viola esplicita il vincolo del compito e le domande ancora aperte.

#figure(viola-profile(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Il profilo narrativo di _Viola_ e le sue implicazioni progettuali. La scheda sviluppa il caso di _Di Pascale_; non rappresenta una persona reclutata o un segmento validato. @uxDiPascale]),
) <fig-ux-viola>

Una scheda può includere obiettivi, comportamenti ricorrenti, ostacoli, strumenti usati e condizioni nelle quali il servizio viene incontrato. La selezione delle informazioni dipende dal progetto. Un elemento biografico merita spazio quando aiuta a capire una scelta o a ricordare un bisogno pertinente @uxDykes.#website-note([Taylor Dykes, definizione e uso delle personas nella progettazione.], "https://www.nngroup.com/articles/persona/")

Nella @fig-ux-persona-documento, la scheda di _Claudia_ collega l’acquisto di biglietti ferroviari al suo lavoro di assistente d’ufficio: deve gestire prenotazioni per gruppi di persone. Il rapporto fra attività, bisogno e difficoltà è più utile della sola descrizione anagrafica. La figura permette di osservare la forma del documento; la sua grafica non certifica come siano stati raccolti i dati.

#image-figure(path("/progetti/booklet/assets/processo-ux-ui/persona-corunga.png"),
  [Scheda persona di _Claudia_, assistente d’ufficio che acquista biglietti per gruppi. Aspirazioni, attività, bisogni e frustrazioni rendono leggibili aspetti del compito. Il documento conserva i testi originali.],
  format: "due-colonne", id: "fig-ux-persona-documento",
  rights: [_Iulian Corunga_.],
  alt: "Scheda persona con fotografia di Claudia e campi in inglese su aspirazioni, occupazione, caratteristiche, bisogni e frustrazioni nell’acquisto di biglietti ferroviari.",
  height: 110mm,
)

Le personas aiutano a confrontare decisioni: la proposta sostiene il bisogno descritto? Quale informazione manca? Un nuovo gruppo richiede un percorso diverso? Devono poter essere aggiornate quando cambiano le conoscenze. Le schede ipotetiche restano etichettate come tali finché le loro assunzioni non vengono verificate.

== Organizzare l’esperienza

Con una conoscenza più precisa delle persone, il progetto può mettere in relazione azioni, contenuti e vincoli. Le attività sette e otto trasformano quanto emerso in percorsi e requisiti condivisi. La rappresentazione serve a discutere che cosa debba accadere, anche prima che ogni schermata sia definita.

=== Customer journey e user flow

Il settimo passaggio comprende strumenti che osservano l’esperienza a scale differenti @uxDiPascale. La *customer journey*, o viaggio dell’utente, segue il percorso di una persona verso un obiettivo. Può attraversare più canali e comprendere momenti che precedono e seguono l’uso dell’interfaccia. Azioni, pensieri, emozioni e opportunità vengono messi in relazione con fasi significative @uxGibbons.

Per _Viola_, il viaggio può iniziare quando cerca un professionista, continuare nel confronto delle alternative e arrivare alla visita e al contatto successivo. Una ricerca sul telefono, una telefonata e una conferma ricevuta per messaggio appartengono allo stesso percorso. La @fig-ux-journey ne propone una porzione ipotetica, utile per discutere dove siano necessarie informazioni o risposte.

#figure(journey-example(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Una porzione della journey ipotetica di _Viola_. Fasi, azioni, punti di contatto e domande restano distinguibili; le opportunità sono proposte da verificare.]),
) <fig-ux-journey>

Una mappa dovrebbe chiarire attore, scenario e obiettivo. La stessa organizzazione può sostenere viaggi diversi per chi prenota e per chi offre una prestazione. Le emozioni riportate devono essere collegate a dati o dichiarate come ipotesi: una curva disegnata non è una misurazione psicologica @uxGibbons.#website-note([Sarah Gibbons, componenti e impieghi delle journey map.], "https://www.nngroup.com/articles/journey-mapping-101/")

Lo *user flow* entra invece nella sequenza di azioni necessarie a un compito. Rappresenta punti d’ingresso, scelte, condizioni, passaggi ed esiti. Per prenotare una visita si può partire dalla ricerca, impostare zona e giorno, verificare la disponibilità, scegliere, rileggere e confermare. I rami alternativi sono necessari quanto il percorso che va a buon fine.

Nella @fig-ux-flow la mancanza di disponibilità permette di rivedere i criteri. Un errore nei dati richiede un percorso di correzione. Disegnare soltanto la sequenza ideale nasconderebbe questi momenti, che possono richiedere contenuti e controlli specifici. La rappresentazione va letta insieme alle condizioni del servizio: il sistema deve sapere se un orario sia ancora disponibile e quale esito possa comunicare.

#figure(flow-example(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Schema del compito di prenotazione. I ritorni indicano possibilità di recupero nel caso simulato, oltre alla prosecuzione verso il riepilogo.]),
) <fig-ux-flow>

Journey e flow si completano. La prima aiuta a individuare un ostacolo fra canali, per esempio una conferma non riconosciuta; il secondo permette di esaminare che cosa accada durante la prenotazione. La struttura delle pagine sarà affrontata con l’architettura dell’informazione. Separare questi punti di vista rende più precisa la discussione e aiuta a scegliere quale rappresentazione usare.

=== Business Requirements Document

L’ottavo passaggio raccoglie e condivide quanto il prodotto deve permettere di fare @uxDiPascale. Il *Business Requirements Document*, abbreviato in *BRD*, è un documento dei requisiti che mette in relazione problema, obiettivi, persone, funzioni e vincoli. La sua estensione dipende dal progetto: deve essere abbastanza chiaro da sostenere un accordo, un confronto e le decisioni successive.

Nel caso dei fisioterapisti, «permettere di cercare una visita a domicilio in una fascia oraria» esprime una capacità richiesta al servizio. Il requisito deve poi chiarire condizioni e conseguenze: la disponibilità si riferisce all’indirizzo selezionato? Il costo comprende lo spostamento? La persona invia una richiesta oppure ottiene subito una conferma? Domande non risolte in questa fase riappariranno nel calendario, nel riepilogo o nei messaggi.

La @fig-ux-requisiti collega un bisogno a un requisito e a un criterio osservabile. Il criterio aiuta a verificare una parte del comportamento: il riepilogo deve conservare giorno, orario e domicilio scelti. Da solo non garantisce l’intera qualità dell’esperienza, ma rende discutibile un’aspettativa concreta.

#figure(requirements-record(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Un requisito del caso simulato, con condizioni, criterio, priorità e domanda ancora aperta. Il documento rende esplicito che cosa debba essere verificato.]),
) <fig-ux-requisiti>

È utile distinguere ciò che è necessario per il primo percorso da ciò che può essere sviluppato dopo. La priorità deve avere una ragione: senza la copertura del domicilio non si può valutare una visita pertinente; una funzione di suggerimento può invece essere rinviata. La discussione considera valore per le persone, obiettivi dell’organizzazione, dipendenze e risorse.

Il documento include anche esclusioni e assunzioni. Se la prima versione non gestisce pagamenti, il prototipo non deve dare l’impressione che una transazione sia stata eseguita. Se l’aggiornamento delle disponibilità è ancora un’ipotesi tecnica, va segnalato a chi progetta e sviluppa. Data, versione e responsabilità delle decisioni aiutano il gruppo a capire quale accordo sia attuale.

Un requisito può cambiare quando una prova mostra un bisogno diverso o una dipendenza non considerata. La revisione conserva il motivo del cambiamento e ne valuta le conseguenze su struttura, flussi e interfaccia. L’allineamento non consiste nel rendere immutabile un documento, ma nel rendere comprensibile la decisione corrente.

== Strutturare il prodotto

Le attività nove e dieci trasformano contenuti e percorsi in una struttura navigabile e in schermate da discutere. La prima organizza le relazioni fra informazioni e funzioni; la seconda affronta la loro disposizione concreta. Le conoscenze su griglie e gerarchia diventano qui strumenti per sostenere un compito.

=== Architettura dell’informazione

Il nono passaggio definisce il modo in cui i contenuti vengono organizzati e denominati @uxDiPascale. L’*architettura dell’informazione* rende riconoscibili gruppi, relazioni e possibilità di accesso. Una struttura coerente aiuta a trovare ciò che serve e a capire dove ci si trovi nel prodotto.

La *sitemap*, o mappa del sito, rappresenta la gerarchia delle pagine o delle aree. Nel servizio simulato possiamo distinguere informazioni sulle prestazioni, ricerca delle disponibilità e gestione delle visite. La @fig-ux-sitemap mostra una proposta iniziale: consente di discutere dove collocare una funzione e quali contenuti debbano essere vicini.

#figure(sitemap-example(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Ipotesi di architettura del servizio. I collegamenti indicano raggruppamenti e relazioni, mentre il flow della @fig-ux-flow descrive azioni e condizioni di un compito.]),
) <fig-ux-sitemap>

La sitemap non descrive necessariamente il menu completo e non equivale allo user flow. La pagina di riepilogo appartiene a una struttura, ma viene raggiunta attraverso azioni e condizioni specifiche. La stessa informazione può essere accessibile da percorsi diversi senza dover essere duplicata come contenuto indipendente.

Anche le etichette fanno parte della progettazione. «Le mie visite» può essere più vicino al linguaggio delle persone di una categoria interna all’organizzazione; la sua comprensibilità va comunque verificata nel contesto. Raggruppamenti che sembrano evidenti a chi gestisce il servizio possono risultare poco riconoscibili a chi lo usa per la prima volta.

Per esplorare una struttura si possono proporre attività di raggruppamento dei contenuti, come il *card sorting*, oppure compiti di ricerca dentro un’alberatura testuale, come il *tree testing*. Questi metodi affrontano domande sull’organizzazione e sulla reperibilità, diverse dalla valutazione di una schermata completa. Il criterio di scelta resta quale incertezza occorra ridurre.

La struttura viene discussa con chi produce e mantiene i contenuti e confrontata con i compiti prioritari. Quando cambia un requisito, occorre verificare se sia sufficiente modificare una pagina o se debba essere rivisto il raggruppamento. Un nuovo disegno del menu non risolve automaticamente una classificazione ambigua.

=== Wireframing

Il decimo passaggio definisce la struttura delle schermate @uxDiPascale. Un *wireframe* mostra aree, contenuti, gerarchie e controlli senza richiedere la finitura visiva definitiva. Può essere disegnato a mano o costruito con strumenti digitali. La scelta del mezzo dipende dalla precisione necessaria alla discussione e alla prova.

Si parte dal compito e dai contenuti disponibili. Per selezionare una visita servono informazioni sul servizio, disponibilità, condizioni e azioni. Una griglia offre riferimenti di allineamento; la gerarchia distingue ciò che identifica la pagina, ciò che permette di confrontare e ciò che consente di procedere. Il wireframe diventa più utile quando contiene etichette e dati plausibili, capaci di far emergere limiti di spazio o ambiguità.

La @fig-ux-wireframe-documento mostra la ricostruzione di una funzione dell’app ferroviaria NS, realizzata da _Jolanda Dekker_ nel 2019 @uxDekker. Le schermate disegnate a mano e le frecce descrivono i passaggi per aggiungere un preferito. Si tratta di un’analisi di una funzione esistente, non di una proposta per il suo progetto originario. Le annotazioni permettono di discutere disposizione e collegamenti separatamente dalla finitura visiva.

#image-figure(path("/progetti/booklet/assets/processo-ux-ui/originali/wireframe-carta.jpg"),
  [Ricostruzione del 2019 delle schermate NS per aggiungere un preferito. Osservare alternative, voci selezionate e ritorno alla schermata iniziale. @uxDekker#website-note([Jolanda Dekker, analisi della funzione e disegni originali.], "https://medium.com/@jolandatdekker/wireframing-ns-less-is-more-the-art-of-leaving-out-4077fd9174c0")],
  format: "due-colonne", id: "fig-ux-wireframe-documento",
  rights: [_Jolanda Dekker_.],
  alt: "Wireframe disegnati a mano per la funzione di aggiunta dei preferiti: schermate del viaggio, ricerca di un indirizzo, selezione, nome e salvataggio, collegate da frecce.",
  height: 105mm,
)

Nel caso di _Viola_, la progressione della @fig-ux-wireframe-ui parte dalle aree e aggiunge contenuti e azione. La terza versione introduce la UI; il confronto mantiene riconoscibili le informazioni centrali. Non si tratta di livelli obbligatori da attraversare uno dopo l’altro: possiamo aumentare il dettaglio soltanto dove serve a rispondere a una domanda.

#figure(wireframe-progression(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Tre livelli del medesimo esempio simulato: a. aree della schermata; b. contenuti e comando; c. proposta di UI. Data, durata e costo sono ipotetici.]),
) <fig-ux-wireframe-ui>

Il wireframe deve contemplare anche contenuti lunghi, assenza di risultati, possibilità di correzione e condizioni d’uso pertinenti. Una schermata con soli rettangoli vuoti può discutere la distribuzione delle masse, ma non permette di valutare se la persona comprenda un’etichetta. La fedeltà va scelta rispetto alla prova, non alla presunta inferiorità di una rappresentazione semplice.

Prima di rifinire il disegno si controlla che il percorso conservi le informazioni necessarie. _Viola_ deve poter riconoscere il domicilio e l’orario prima di confermare. Se un ritorno alla ricerca cancella tutte le scelte, il problema riguarda il funzionamento del compito oltre che la disposizione degli elementi.

== Provare e affinare la soluzione

Le quattro attività successive rendono la proposta utilizzabile in una prova, ne osservano gli effetti, introducono revisioni e sviluppano l’interfaccia. La verifica può riaprire una decisione di qualsiasi parte del percorso. Il gruppo deve conservare il legame fra domanda, versione provata, osservazione e scelta successiva.

=== Prototipo a bassa fedeltà e test di usabilità

L’undicesimo passaggio collega prototipazione e osservazione dell’uso @uxDiPascale. Un *prototipo* è una rappresentazione che permette di esplorare aspetti del prodotto. Può consistere in fogli sostituiti dal facilitatore, schermate collegate, elementi interattivi o una versione parziale del servizio. La sua utilità dipende da ciò che permette di imparare.

Un wireframe e un prototipo rispondono a esigenze differenti: il primo descrive una struttura, il secondo permette di simulare un comportamento. Un prototipo può usare wireframe poco rifiniti oppure una UI dettagliata. Fedeltà visiva e funzionamento sono dimensioni distinte: un’immagine molto realistica può non reagire a nessuna azione, mentre una simulazione essenziale può permettere una sequenza completa.

Si definisce prima la domanda. Se vogliamo capire se _Viola_ trovi una disponibilità serale, devono funzionare le parti necessarie a cercare e confrontare gli orari. Non occorre costruire ogni sezione del servizio. Se la domanda riguarda un errore o una conferma, quel ramo deve poter essere raggiunto e compreso.

Nel test di usabilità una persona prova a svolgere un compito e un ricercatore ne osserva il comportamento @uxMoran. Tre elementi centrali sono partecipante, compito e facilitazione. La @fig-ux-test raccoglie una possibile preparazione: la consegna chiarisce il risultato da raggiungere e le osservazioni riguardano ciò che accade durante il tentativo.

#figure(test-plan(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Preparazione di una prova sul percorso simulato. La domanda orienta partecipante, compito, osservazioni e modalità di facilitazione.]),
) <fig-ux-test>

«Trova una visita a domicilio dopo le 20 e prova a prenotarla» propone un obiettivo. «Premi il pulsante in basso e scegli il terzo orario» suggerisce invece il percorso. Una consegna che indica le azioni può nascondere le difficoltà che vorremmo osservare. Il GOV.UK Service Manual raccomanda compiti realistici, pertinenti e privi di suggerimenti sulla risposta.#website-note([GOV.UK Service Manual, preparazione dei compiti e conduzione dei test moderati.], "https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing")

Il facilitatore presenta la prova, mette la persona a proprio agio e osserva senza trasformare ogni esitazione in un aiuto. Se interviene, l’intervento va registrato: completare con assistenza e completare autonomamente sono esiti differenti. L’osservatore annota percorso, parole, ostacoli e risultato, conservando la versione del prototipo e il compito proposto.

Chiedere di pensare ad alta voce può aiutare a comprendere dubbi e interpretazioni, ma i commenti non esauriscono l’osservazione. La persona può dichiarare che una schermata sia chiara e incontrare poi difficoltà nel suo uso. Il comportamento, le spiegazioni e l’esito vanno considerati insieme @uxMoran.#website-note([Kate Moran, elementi e finalità dei test di usabilità.], "https://www.nngroup.com/articles/usability-testing-101/")

Il numero dei partecipanti dipende dalla domanda, dai gruppi e dal metodo. L’esempio del libro, nel quale quattro persone su cinque non trovano il comando di prenotazione, mostra un problema del caso narrativo @uxDiPascale. Non stabilisce quanti partecipanti servano per ogni studio o quale percentuale si possa generalizzare a una popolazione.

Prima di coinvolgere le persone si prova il protocollo: i collegamenti necessari funzionano? La consegna è comprensibile? Il prototipo consente il recupero previsto? Una limitazione della simulazione può essere scambiata per un problema del prodotto. Annotarla permette di interpretare la prova e di decidere che cosa debba essere verificato di nuovo.

=== Iterazioni sui prototipi

Il dodicesimo passaggio traduce quanto osservato in una revisione da sottoporre a nuova prova @uxDiPascale. Il *debriefing* è il momento in cui il gruppo confronta gli episodi e concorda priorità e passi successivi. La discussione parte da ciò che è accaduto, mantenendo separata la descrizione dalla spiegazione.

Nel caso simulato della @fig-ux-iterazione, una persona legge la scheda ma non avvia la prenotazione. L’etichetta del comando potrebbe essere poco chiara; potrebbero però mancare informazioni necessarie alla scelta oppure la persona potrebbe interpretare diversamente il servizio. Ingrandire il pulsante senza considerare queste alternative rischia di modificare il segnale sbagliato.

#figure(iteration-record(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Un registro di revisione nel caso simulato. Il comportamento osservato sostiene una domanda; la spiegazione e il miglioramento atteso restano da mettere alla prova.]),
) <fig-ux-iterazione>

Le priorità considerano quali obiettivi vengono bloccati, quali conseguenze produce l’errore e quali persone possono incontrarlo. La frequenza è un’informazione utile, ma un problema raro può avere conseguenze importanti. Con pochi partecipanti conviene descrivere gli episodi e i limiti dell’osservazione, evitando percentuali presentate come stime generali.

Una decisione di revisione conserva il collegamento con l’episodio: versione provata, punto del percorso, osservazione, ipotesi, modifica e nuova domanda. Questo registro aiuta a spiegare perché una scelta sia cambiata e impedisce che la stessa discussione ricominci senza le informazioni precedenti.

La nuova versione viene confrontata con un compito coerente con la domanda. Se cambiamo contemporaneamente etichetta, posizione, contenuto e percorso, può essere più difficile capire quali modifiche abbiano inciso sul risultato. A volte una revisione ampia è necessaria; in quel caso si dichiara il suo ambito e si osserva nuovamente il percorso complessivo.

Iterare può significare anche abbandonare una soluzione. Se emerge che la visita serale non può essere confermata automaticamente, occorre ripensare il servizio e le promesse dell’interfaccia. Un messaggio più chiaro aiuta a descrivere la condizione, ma non crea una disponibilità che l’organizzazione non può offrire.

=== User Interface e mockup

Il tredicesimo passaggio sviluppa la presentazione dell’interfaccia e le sue scelte visive @uxDiPascale. Il *mockup* è una rappresentazione dell’aspetto della schermata: mostra contenuti, immagini, colori, tipografia e componenti con un dettaglio sufficiente a discuterne la resa. Può essere statico; quando viene collegato ad altre schermate può contribuire a un prototipo.

Nel percorso descritto dal libro, la UI segue una prima verifica della struttura. Il suo sviluppo può comunque accompagnare altre attività: una prova di etichette, contrasto o dimensioni può essere necessaria prima che tutti i flussi siano consolidati. La collocazione del passaggio aiuta a leggere il caso, senza imporre che le decisioni visive inizino tutte nello stesso momento.

La griglia stabilisce riferimenti; la tipografia distingue ruoli; colore e immagini sostengono significati e priorità; la composizione coordina queste relazioni. Nel caso di _Viola_, giorno, orario, domicilio e costo devono restare riconoscibili mentre il comando propone l’azione successiva. Un trattamento espressivo può contribuire all’identità del servizio, purché non ostacoli la lettura e l’uso.

Il confronto documentario della @fig-ux-mockup-documento mostra la testata di una pagina immobiliare in wireframe e nella proposta visiva. Titolo e comando mantengono una relazione riconoscibile; fotografia, marchio, colori e trattamento tipografico precisano il carattere della pagina. La somiglianza della struttura permette di discutere ciò che cambia, senza dedurne l’esito di una prova con utenti.

#figure(
  image-crop(path("/progetti/booklet/assets/processo-ux-ui/originali/wireframe-mockup.png"),
    width: 137mm, height: 78pt,
    source-width: 137mm, source-height: 137mm * 1590 / 1726,
    alt: "Dettaglio della testata del confronto WCC Properties: wireframe a sinistra e UI con fotografia di una casa, marchio e comando a destra."),
  kind: image, placement: top, scope: "parent",
  caption: caption-content([Dettaglio superiore del confronto fra wireframe e mockup di WCC Properties. Il ritaglio mantiene entrambe le versioni e permette di osservare la traduzione della struttura in scelte visive. @uxSauers#website-note([Evan Sauers, confronto originale pubblicato da JH Specialty nel 2022.], "https://www.jhspecialty.com/blog/wireframes")], rights: [JH Specialty.]),
) <fig-ux-mockup-documento>

La UI comprende anche il comportamento dei componenti e i messaggi che accompagnano le azioni. Occorre progettare selezione, attesa, errore, indisponibilità e conferma. Nella @fig-ux-stati, la perdita di un orario non cancella i dati inseriti e propone un passo successivo; l’esito positivo distingue chiaramente una visita confermata da una semplice richiesta inviata.

#figure(prototype-states(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Stati del percorso simulato: a. disponibilità da scegliere; b. orario non più disponibile e recupero; c. conferma. I messaggi descrivono conseguenze differenti.]),
) <fig-ux-stati>

La coerenza dei componenti permette di trasferire ciò che la persona ha appreso da una parte all’altra del prodotto. Le convenzioni riguardano etichette, segnali di stato, spaziatura e comportamento, oltre alla somiglianza grafica. Un colore non dovrebbe essere l’unico mezzo per comunicare una condizione; la verifica comprende anche struttura, parole e possibilità di interazione.

Il mockup deve essere confrontato con contenuti realistici e nelle dimensioni d’uso. Un nome lungo, una traduzione, l’ingrandimento del testo o una modalità di accesso diversa possono mettere in crisi una composizione che funzionava nel campione iniziale. Il risultato è un sistema di scelte da realizzare e provare, capace di adattarsi alle condizioni previste.

=== Nuova verifica della soluzione

Il quattordicesimo passaggio sottopone a prova la versione che integra struttura, interazione e UI @uxDiPascale. L’espressione «test finale» identifica un momento del progetto; non garantisce che siano stati trovati tutti i problemi o che il prodotto non richieda più revisioni. La domanda riguarda ciò che la versione consente di comprendere e di fare.

La prova riprende i compiti prioritari e considera gli stati che potrebbero interromperli. Per _Viola_ occorre trovare una visita pertinente, verificare informazioni e condizioni, confermare e riconoscere l’esito. Si controlla anche che una modifica introdotta per risolvere un problema non ne abbia creato un altro: un comando più evidente può far procedere troppo presto se le condizioni sono diventate meno leggibili.

La valutazione con le persone e i controlli di accessibilità affrontano aspetti complementari. Coinvolgere persone con disabilità permette di osservare barriere concrete; il loro completamento di alcuni compiti non dimostra da solo la conformità dell’intero prodotto ai requisiti applicabili. Il W3C raccomanda di combinare valutazione con utenti e verifica rispetto agli standard.#website-note([W3C WAI, coinvolgimento delle persone nella valutazione dell’accessibilità e integrazione con gli standard.], "https://www.w3.org/WAI/test-evaluate/involving-users/")

Il resoconto identifica versione, compiti, partecipanti, condizioni, esiti e limiti. Indica quali problemi sono stati affrontati, quali restano aperti e che cosa debba essere verificato durante lo sviluppo. Un’approvazione interna o una preferenza estetica non sostituiscono queste informazioni.

La consegna può includere componenti, stati, testi, regole di comportamento, risorse e criteri di accettazione. Per ogni parte deve essere chiaro che cosa sia definitivo, che cosa sia ancora un’ipotesi e chi debba prendere una decisione. Il confronto con chi sviluppa permette di individuare dipendenze e limiti tecnici prima che si traducano in comportamenti inattesi.

== Dal progetto al servizio

Le quattordici attività aiutano a seguire il passaggio dal brief alla verifica, ma la vita del servizio continua. L’implementazione traduce le scelte in un sistema funzionante; il rilascio introduce contenuti e condizioni che una simulazione può rappresentare soltanto in parte. La conoscenza raccolta deve rimanere disponibile a chi osserva e migliora il prodotto.

=== Conservare ciò che si è appreso

Un prototipo conserva alcune relazioni fra elementi, ma può non rappresentare tempi di risposta, dati reali o disponibilità variabili. Durante lo sviluppo occorre verificare che struttura, testi e stati corrispondano alle decisioni condivise. Le differenze vengono discusse in relazione al compito e ai requisiti, registrando eventuali revisioni.

Il passaggio fra progettazione e sviluppo è più chiaro quando i materiali mostrano sia l’aspetto sia il comportamento. Una schermata di conferma deve precisare quando appare, quali informazioni contiene e quali azioni rende disponibili. Un componente di errore deve spiegare quale condizione lo attivi e come la persona possa proseguire.

Nel servizio dei fisioterapisti, una disponibilità rimossa nel momento della conferma è una condizione da gestire. Il prototipo può mostrarne l’esito previsto; l’implementazione deve poi verificare come dati e tempi reali producano quel comportamento. La progettazione resta coinvolta nel confronto fra promessa del servizio e risposta effettiva.

Conservare le ragioni di una decisione aiuta anche le revisioni successive. Un cambiamento di personale non dovrebbe far perdere il motivo per cui un’informazione viene mostrata prima di un’altra. Il registro delle prove e delle questioni aperte sostiene questa continuità meglio di una raccolta di sole schermate definitive.

=== Iterazione e Lean UX

Il processo può essere organizzato in cicli brevi nei quali si esplicita un’ipotesi, si prepara una prova e si decide in base a ciò che si apprende. Nel _Lean UX Canvas_, _Jeff Gothelf_ collega il problema di business alle assunzioni, alle ipotesi e agli esperimenti che permettono di affrontare le incertezze più rilevanti @uxGothelf.#website-note([Jeff Gothelf, presentazione del Lean UX Canvas e del collegamento fra ipotesi ed esperimenti.], "https://jeffgothelf.com/blog/the-lean-ux-canvas/")

La @fig-ux-ciclo sintetizza questa relazione. Per il caso di _Viola_, un’ipotesi può riguardare la visibilità degli orari serali; la prova può coinvolgere solo il percorso necessario a osservare quella scelta. Il risultato deve poter modificare la decisione, compresa la possibilità di rivedere l’ipotesi iniziale.

#figure(learning-loop(), kind: image, placement: top, scope: "parent",
  caption: caption-content([Ipotesi, prova e apprendimento in un ciclo di revisione. La visualizzazione sintetizza il rapporto fra domanda, esperimento e decisione, senza prescrivere una durata o un numero di iterazioni.]),
) <fig-ux-ciclo>

Una raccolta di documenti può essere utile al gruppo, ma non dimostra che il bisogno sia stato soddisfatto. Dopo il rilascio si possono osservare richieste di assistenza, interruzioni dei percorsi ed esiti dei compiti. Questi segnali aiutano a formulare nuove domande; per comprenderne le cause può essere necessario tornare alla ricerca con le persone.

La collaborazione rende possibile intervenire. Chi gestisce il servizio conosce condizioni che potrebbero non essere visibili nei dati dell’interfaccia; chi sviluppa può individuare una dipendenza; chi progetta può mettere in relazione il problema con una scelta di contenuto o di interazione. Il ciclo collega queste conoscenze a una decisione verificabile.

=== Scegliere il lavoro necessario

Adattare il processo significa valutare quali incertezze affrontare, con quali strumenti e in quale ordine. Un servizio esistente può richiedere prima l’osservazione del percorso attuale; una proposta nuova può richiedere di comprendere se il problema individuato esista. La stessa sequenza di documenti non risponde automaticamente a entrambe le situazioni.

Il livello di dettaglio deve permettere una decisione. Un disegno essenziale può essere sufficiente a confrontare due percorsi; una domanda sul messaggio di conferma richiede invece parole precise e uno stato raggiungibile. Tempo e risorse orientano la scelta del lavoro, mantenendo esplicito ciò che la prova permette e ciò che lascia aperto.

La domanda iniziale ritorna così alla fine del capitolo: che cosa abbiamo imparato sulle persone, sul servizio e sulla soluzione? Il processo UX e UI rende queste conoscenze utilizzabili. Il suo risultato comprende il prodotto e la capacità del gruppo di motivare, verificare e rivedere le proprie scelte.

#exercise(id: "processo-ux-ui", title: [Dal bisogno alla prossima prova])[
Scegli un compito di un servizio: prenotare, modificare un appuntamento o trovare un’informazione. Descrivi chi lo affronta, in quale situazione e quale risultato vuole ottenere. Separa ciò che sai dalle ipotesi e formula una domanda che potrebbe cambiare il progetto.

Prepara soltanto i materiali necessari a rispondere: una traccia di ricerca, una porzione di journey, un flow o un prototipo. Collega ogni scelta al bisogno e indica quale osservazione potrebbe contraddirla. Per una prova di usabilità, scrivi una consegna che esprima l’obiettivo senza suggerire il percorso.

Conserva versione, osservazioni, interpretazioni e decisione successiva. Spiega quale attività dei quattordici passaggi debba essere ripresa e perché. L’esercizio si conclude con una nuova domanda o una revisione motivata, oltre che con la rappresentazione della soluzione.
]
]

#show: booklet
#chapter(..chapter-parameters(9), content)
