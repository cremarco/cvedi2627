// Consigli utili, tavole470–486: testo continuo e riferimenti automatici.
// I campioni sono separati dalla prosa; le continuazioni Figma sono ricongiunte.
// Il titolo usa per ora il ruolo ordinario: la variante locale è ancora in valutazione.
#import "../../template/stile.typ": sito
#import "../../template/editoriale.typ": nota-compatta
#import "consigli-campioni.typ": prenotazione, ruoli, larghezza, corsivo, ortotipografia, enfasi, collegamenti, fallback, interlinea, esercizio

== Consigli utili

=== Cominciare dalle parole che saranno davvero lette

La scelta di un carattere diventa più affidabile quando parte dal contenuto effettivo.

Un alfabetiere e una bella parola mostrano alcune qualità del disegno, ma non anticipano tutto ciò che accadrà in una pagina. Prepara un campione con i testi del progetto: un titolo che possa andare a capo, due paragrafi consecutivi e i nomi, le date, gli importi, i codici o i termini tecnici realmente previsti. Il campione della @fig-tipo-347 riunisce questi elementi @t06-lowvision2016.#sito([W3C (2016), Low Vision Requirements, Working Draft.], "https://www.w3.org/TR/low-vision-needs/")

Il campione va letto alla *dimensione d’impiego*. Ingrandirlo serve poi a capire i dettagli, ma non sostituisce questa prova. Annota un problema osservabile: «la I, la l e l’1 si confondono in questo codice», «perdo l’inizio della riga successiva» oppure «non ritrovo la scadenza». Queste indicazioni aiutano a cercare una soluzione; «il font non funziona» lascia aperte troppe interpretazioni. Il campione illustrato simula una prenotazione: nel progetto va sostituito con il contenuto effettivo.

Anche gli strumenti di ricerca e abbinamento, come i cataloghi delle fonderie o i generatori di coppie tipografiche, sono utili soprattutto per restringere il campo. La popolarità di un carattere su altri siti non dimostra che sia adatto al testo che stiamo progettando. Un confronto fra famiglie deve quindi essere riportato ai requisiti del progetto, senza trasformare una raccomandazione automatica in una decisione finale.

Il primo esito del lavoro non è necessariamente un nome definitivo. Può essere una breve lista di alternative che possiedono i segni, gli stili e le prestazioni richieste. Da quella lista si passa alla prova: una scelta grafica diventa argomentabile quando possiamo spiegare *quale problema risolve* e quali compromessi comporta.

#prenotazione()

=== Abbinare le famiglie e definirne i ruoli

Una famiglia ben articolata può sostenere molti compiti senza richiedere continui cambiamenti di carattere.

Prima di aggiungere un’altra famiglia, conviene verificare se pesi, corsivi, larghezze e funzioni già disponibili sono sufficienti. Il vantaggio non è la riduzione numerica in sé: è la possibilità di mantenere un rapporto riconoscibile fra le parti del testo e di controllare più facilmente il risultato @t06-carbon2026.#sito([IBM (2026), Carbon: Typography.], "https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets")

La prudente indicazione di lavorare con poche famiglie non coincide con una legge che vieta di superare il numero tre. Un progetto editoriale può usare una voce per la lettura e un’altra per titoli o citazioni; un repertorio multilingue può richiedere integrazioni ulteriori. L’importante è *assegnare una ragione a ciascuna presenza* e applicarla con coerenza. Se due caratteri cambiano continuamente ruolo, il lettore deve ricostruire ogni volta il criterio. La @fig-tipo-348 rende visibili tre ruoli nella stessa famiglia.

Negli abbinamenti va osservata anche la convivenza materiale. Due font allo stesso corpo possono mostrare altezze apparenti diverse; un corsivo può sembrare più sottile del testo vicino; le cifre possono creare una tessitura incompatibile con il paragrafo. Prima di scegliere sulla base di una somiglianza o di un contrasto interessante, bisogna comporre almeno alcune righe in cui le famiglie si incontrano.

È utile inoltre definire stili di testo ripetibili, invece di correggere ogni occorrenza separatamente. Il sistema può fissare corpo, peso e interlinea per una funzione e prevedere eccezioni motivate per casi speciali. Carbon, per esempio, documenta ruoli e misure del proprio sistema: è un caso di applicazione, non una scala universale. Definire gli stili permette di introdurre differenze intenzionali e riconoscere un cambiamento dovuto a un errore di applicazione @t06-carbon2026.#sito([IBM (2026), ruoli e stili di testo.], "https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets")

#ruoli()

=== Far entrare il testo senza schiacciare le lettere

Quando una frase non entra, la prima tentazione può essere ridurre orizzontalmente il testo fino a occupare lo spazio disponibile. La trasformazione geometrica modifica però insieme proporzioni, spessori e vuoti. Una O diventa più stretta senza che i suoi tratti vengano compensati; le grazie e le curve seguono la stessa deformazione. La parola può sembrare adattata al contenitore, ma il suo disegno non è più quello progettato.

Il confronto fra @fig-tipo-349 e @fig-tipo-350 mostra un’alternativa reale: usare un asse di larghezza del font, identificato dal tag wdth. Una variante condensed o un asse di larghezza appartengono a un progetto che coordina le forme lungo la variazione. Il valore wdth 75 identifica una posizione nell’asse: non impone che ogni parola sia larga esattamente il 75% della versione normale. La disponibilità va verificata nel file; il nome «condensed» non autorizza a produrre una variante artificiale @t06-wdth2021.#nota-compatta([Microsoft (2021), asse wdth. Roboto Serif: originali e licenza.], ("https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_wdth", "https://github.com/google/fonts/tree/main/ofl/robotoserif"))

Lo stesso controllo riguarda grassetto, corsivo e maiuscoletto. Uno stile disegnato, anche un obliquo progettato, è diverso da una simulazione del software. Un corsivo autentico può cambiare la struttura di a, f e g; un maiuscoletto progettato conserva spessori e proporzioni che le maiuscole ridotte possono perdere. Sul web, verifica che gli stili e le funzioni richiesti siano anche distribuiti e dichiarati correttamente: se mancano, il browser può sostituirli o simularli. Durante la prova, disattivare le simulazioni aiuta a riconoscere le varianti mancanti @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: simulazioni.], "https://www.w3.org/TR/css-fonts-4/") La @fig-tipo-350a confronta un corsivo autentico con un tondo inclinato.

Se la famiglia non offre ciò che serve, si può modificare il corpo, rivedere la formulazione, accettare un ritorno a capo oppure scegliere un’altra famiglia. La soluzione va decisa in rapporto al testo. La capienza di una riga è un vincolo reale, ma non dovrebbe essere risolta distruggendo proprio le qualità del carattere che avevano motivato la scelta @t06-eb-garamond.#sito([EB Garamond: famiglia e stili originali.], "https://github.com/google/fonts/tree/main/ofl/ebgaramond")

#larghezza()

#corsivo()

=== La revisione ortotipografica

Un buon carattere non può correggere da solo una lettera sbagliata. Anche in maiuscolo, le vocali mantengono l’accento richiesto: È, CITTÀ e PERCHÉ non vanno sostituite con lettere seguite dall’apostrofo. Controlla l’accento di ogni parola: È e CAFFÈ hanno la è grave; PERCHÉ e VENTITRÉ la é acuta. La revisione del testo precede il giudizio sulla resa del font, perché una sostituzione impropria cambia il contenuto oltre alla sua forma @t06-crusca2002.#sito([Accademia della Crusca (2002), accenti.], "https://accademiadellacrusca.it/it/consulenza/vademecum-sullaccento-quando-indicarlo-e-dove-pronunciarlo/34") @t06-marzullo2003.#sito([Mara Marzullo (2003), accenti e apostrofi.], "https://accademiadellacrusca.it/it/consulenza/guida-alluso-di-accenti-e-apostrofi-nellitaliano/100")

Nel testo composto, l’apostrofo tipografico ’ è distinto dal segno diritto usato in molti formati informatici. Le virgolette possono seguire una convenzione editoriale italiana, come «queste», con una coppia diversa per le citazioni interne. Scegli un criterio e applicalo all’intero lavoro. Uno stesso carattere può avere più usi: ’ può essere apostrofo o virgoletta di chiusura; la funzione dipende dal contesto. Non confonderlo con la virgoletta di apertura ‘ o con il simbolo di misura ′ @t06-unicode17.#nota-compatta([Unicode 17, capitolo6: segni e punteggiatura. Unicode, General Punctuation.], ("https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-6/", "https://www.unicode.org/charts/PDF/U2000.pdf"))

Nei campioni, il trattino collega «tecnico-scientifico», la lineetta esprime l’intervallo «10–12» e il meno indica «−5». Sono caratteri distinti, anche quando il font li disegna in modo simile. La lineetta può anche delimitare un inciso, secondo la convenzione editoriale scelta. Controlla le sostituzioni automatiche: codice, URL, indirizzi e dati strutturati devono conservare i caratteri richiesti dal formato. La @fig-tipo-351 mette a confronto segni con funzioni diverse.

Fra numero e unità, uno spazio non separabile può evitare che «10 kg» si divida a fine riga. Usalo solo nei gruppi che devono restare insieme e controlla che possano andare a capo senza uscire dal contenitore. Verifica anche che il font contenga *tutti i segni necessari*: un accento, un simbolo valutario o una parentesi provenienti da un font di riserva involontario possono interrompere la continuità visiva del testo. Correggere questi casi fa parte della revisione, prima della consegna @t06-uax14-2026.#nota-compatta([Leroy (2026), UAX 14: spazi non separabili. Unicode, Mathematical Operators: segno meno.], ("https://www.unicode.org/reports/tr14/#GL", "https://www.unicode.org/charts/PDF/U2200.pdf"))

#ortotipografia()

=== Dare enfasi senza alzare sempre la voce

Il maiuscolo può essere efficace in un titolo breve, in una sigla o in una convenzione editoriale precisa.

Estenderlo a un lungo testo cambia profilo e ingombro delle parole e può rendere la lettura più impegnativa. L’effetto dipende anche dal corpo e dalle esigenze del lettore: va osservato su un intero passaggio, non soltanto su un’etichetta di due parole @t06-arditi2007.#sito([Arditi e Cho (2007): corpo e condizioni visive.], "https://pmc.ncbi.nlm.nih.gov/articles/PMC2016788/") Le indicazioni di una guida come GOV.UK esprimono anche convenzioni del servizio e non costituiscono divieti universali @t06-govuk-style.#sito([Government Digital Service, capitalisation.], "https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/#capitalisation")

Anche grassetto e corsivo funzionano meglio quando hanno *un compito definito*. Se quasi tutto il testo è marcato come importante, l’enfasi perde capacità di distinguere. Un peso molto scuro può chiudere alcuni spazi interni in piccolo; un corsivo usato per molte righe può assumere una voce diversa dal corpo. Non significa che queste scelte siano sbagliate in assoluto: richiedono una prova nell’estensione e nella misura previste.

Prima di aumentare il peso, decidi quale informazione debba essere ritrovata. Nel campione la domanda è: «Fino a che ora resta valida la prenotazione?». Confronta il paragrafo tutto in grassetto con quello che marca solo «fino alle 18»: osserva quale differenza segnala la scadenza. Per un compito diverso potrebbe servire un’altra enfasi. Nella @fig-tipo-352 cambia soltanto l’estensione del grassetto.

Nel testo continuo, convenzioni stabili aiutano il lettore a riconoscere i segnali: una citazione, un titolo d’opera o un richiamo non dovrebbero cambiare trattamento senza ragione. L’enfasi può essere sobria oppure intensa, purché conservi la possibilità di leggere il contenuto e distinguere ciò che conta. Se le marcature non aiutano il compito previsto, riducile o cambia quali parole metti in evidenza @t06-carbon2026.#sito([IBM (2026), stili tipografici.], "https://www.carbondesignsystem.com/building-blocks/foundations/typography/type-sets")

#enfasi()

=== Contrasto e riconoscibilità dei link

La scelta del font perde efficacia se le lettere si distinguono a fatica dallo sfondo.

Un testo sottile e molto chiaro può sembrare delicato nel campione ingrandito e diventare poco leggibile al corpo d’uso. Il controllo deve riguardare la *combinazione effettiva*: testo su carta bianca, sopra una fotografia o entro una superficie colorata non pongono la stessa condizione. Se l’immagine varia sotto le parole, il contrasto va valutato nelle zone che esse attraversano.

Per il testo web ordinario, WCAG 1.4.3, livello AA, richiede almeno 4,5:1 fra testo e sfondo; per il testo grande, almeno 3:1. Grande significa almeno 18 punti, oppure 14 punti in grassetto, con le equivalenze previste per altre scritture. Il valore calcolato deve raggiungere la soglia prima dell’arrotondamento. Il rapporto è una verifica necessaria nei casi a cui si applica, ma non esaurisce la qualità della resa: corpo minuto e tratti fragili restano problemi da osservare @t06-wcag2024.#sito([W3C (2024), WCAG 1.4.3 (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")

Dentro un paragrafo, la sottolineatura offre un segnale riconoscibile anche senza distinguere le tinte. Se si sceglie di ometterla, non basta un blu diverso: la tecnica W3C G183 usa almeno 3:1 fra collegamento e testo circostante. È un confronto distinto da quello fra testo e sfondo, che per il testo web ordinario deve comunque raggiungere 4,5:1. La sottolineatura va collocata con attenzione, così da non confondersi con i discendenti delle lettere. La @fig-tipo-353 mostra due modi di segnalare il medesimo collegamento @t06-w3c-g183.#nota-compatta([W3C, tecnica G183: contrasto fra link e testo circostante. W3C, Understanding Use of Color, 1.4.1 (A).], ("https://www.w3.org/WAI/WCAG22/Techniques/general/G183", "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"))

Scegli parole che facciano capire che cosa si troverà seguendo il collegamento. Quando serve il contesto, deve essere associato al link anche nella struttura della pagina, per esempio nello stesso paragrafo. Un’etichetta comprensibile da sola rimane una scelta utile quando possibile @t06-wcag2024.#sito([W3C, Link Purpose (In Context), 2.4.4 (A).], "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html")

Anche per le evidenziazioni conviene mantenere una *convenzione stabile* e non moltiplicare sottolineature decorative che sembrino collegamenti. Qui interessa la distinzione visibile fra testo ordinario e testo marcato; le modalità di attivazione e gli altri aspetti dell’interazione vengono affrontati nelle sezioni dedicate. La tipografia contribuisce offrendo un segnale riconoscibile prima ancora che il lettore decida di usarlo.

#collegamenti()

=== Verificare caricamento e fallback

Il carattere previsto dal progetto può non essere disponibile quando si apre una pagina web.

Il browser può mostrare un *font di riserva* mentre scarica il webfont oppure mantenerlo se il file non arriva. Il descrittore CSS font-display regola l’attesa e la possibilità di sostituzione, non la velocità del download. Con swap il font può sostituire il fallback anche se arriva tardi; con fallback e optional questa possibilità è limitata. La scelta va osservata sia quando il testo compare sia quando il font cambia @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: font-display.], "https://www.w3.org/TR/css-fonts-4/") @t06-font-best2022.#sito([Hempenius e Pollard (2022), Best practices for fonts.], "https://web.dev/articles/font-best-practices")

Nel browser, svuota la cache e ricarica la pagina rallentando o bloccando il webfont. Controlla che il font di riserva sia disponibile e che titoli, pulsanti e contenuti successivi si ricompongano senza tagli. Ripeti la prova con il font principale caricato. La sequenza dei font di riserva termina con una famiglia generica: il file installato sul computer del progettista potrebbe mancare sul dispositivo del lettore.

Le proporzioni del fallback possono *cambiare i ritorni a capo* e l’ingombro della pagina. Lettere più larghe allungano un titolo; un’altezza apparente diversa può far sembrare il corpo più piccolo o più grande. Nel CSS, size-adjust può avvicinare la scala e ascent-override, descent-override e line-gap-override possono avvicinare le metriche verticali. I valori si misurano per la coppia scelta e si provano nel browser: non eliminano automaticamente ogni differenza di impaginazione. La @fig-tipo-354 conserva contenuto e larghezza e cambia la famiglia @t06-argyle2021.#sito([Adam Argyle (2021), size-adjust.], "https://web.dev/articles/css-size-adjust")

Distribuisci gli stili e i repertori necessari, conservando anche i segni dei contenuti futuri prevedibili e le funzioni tipografiche richieste. Togliere accenti o simboli per ridurre i file può provocare sostituzioni nelle parole. Un font variabile riunisce più varianti, ma non è sempre più leggero di un singolo stile statico: confronta formati, repertori e stili che il progetto consegnerà davvero.

Controlla anche la licenza: usare un font sul computer o incorporarlo in un documento non implica automaticamente il diritto di distribuirlo con un’applicazione o servirlo dal sito. DM Sans e Sora, per esempio, sono distribuiti con la SIL Open Font License, che permette l’uso come webfont rispettandone le condizioni. La FAQ Microsoft riguarda invece i font forniti con Windows. Identifica file e versione e conserva la licenza applicabile: le condizioni di un font non si trasferiscono a un altro @t06-ofl2007.#sito([SIL International, OFL FAQ: uso web.], "https://openfontlicense.org/ofl-faq/#2-using-ofl-fonts-for-webpages-and-online-webfont-services") @t06-font-redistribution.#sito([Microsoft, Font redistribution FAQ.], "https://learn.microsoft.com/en-us/typography/fonts/font-faq")

#fallback()

=== Confrontare una scelta alla volta

Una pagina ordinata può contenere un carattere mancante, una parola divisa male, un corsivo simulato o una riga che scompare quando il testo aumenta.

La revisione parte dalle condizioni che il lettore incontrerà e dai passaggi più impegnativi. Prima di cambiare una misura, formula il problema che la modifica dovrebbe risolvere.

Per confrontare due interlinee mantieni testo, font, corpo e larghezza uguali. Leggi l’intero paragrafo e segna dove perdi l’inizio della riga successiva, ripeti una riga o salti una parola. Se una variante riduce questi problemi senza crearne altri nel formato finale, conserva la modifica e ricontrolla la pagina. Cambiare una scelta alla volta aiuta a diagnosticare il problema; corpo, riga e interlinea vanno poi osservati insieme. Nella @fig-tipo-355 cambia soltanto l’interlinea.

Confrontare due famiglie allo stesso corpo mostra che cosa accade sostituendo il font nelle misure già impostate. Per confrontarle a una scala simile, dichiara come le hai pareggiate, per esempio attraverso l’altezza della x: non diventano identiche per proporzioni e spazi. Registra font, versione, peso, corpo e larghezza. Se il font dispone di un asse ottico opsz, annotane anche l’impostazione: modifica il disegno senza cambiare il corpo nominale ed è distinto dalla correzione della presenza apparente fra famiglie @t06-opsz2024.#sito([Microsoft (2024), asse opsz.], "https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_opsz")

Con altre persone, definisci prima il compito: copiare un codice, trovare una scadenza o leggere e spiegare un passaggio. Annota errori, esitazioni e risultato; se cronometri la lettura, controlla anche la comprensione. Alterna l’ordine dei campioni e, quando il testo già letto faciliterebbe la risposta, usa brani equivalenti. Chiedere quale campione piace raccoglie invece una preferenza. Riporta che cosa hai osservato e con chi: una prova esplorativa non stabilisce una classifica generale dei font @t06-arditi2005.#sito([Arditi e Cho (2005), confronti controllati.], "https://pmc.ncbi.nlm.nih.gov/articles/PMC4612630/") @t06-wallace2022.#sito([Wallace et al. (2022), Towards Individuated Reading Experiences.], "https://jdobr.es/pdf/Wallace-etal-2022-Font-Individuals.pdf")

Su carta controlla una stampa o una prova affidabile alla dimensione finale. Sul web verifica il testo al 200% senza perdita di contenuti o funzioni. Per la normale lettura verticale, controlla anche la ricomposizione a una larghezza equivalente a 320 pixel CSS: il testo ordinario deve potersi leggere senza scorrere in entrambe le direzioni. Le parti che richiedono una disposizione bidimensionale, come alcune tabelle, seguono le eccezioni del criterio @t06-wcag2024.#nota-compatta([W3C, Understanding Resize Text, 1.4.4 (AA). W3C, Understanding Reflow, 1.4.10 (AA).], ("https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html", "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html"))

La verifica finale comprende anche condizioni combinate. Per WCAG 1.4.12, sul web applica insieme interlinea ad almeno 1,5 volte il corpo, spazio dopo i paragrafi ad almeno 2 volte il corpo, spaziatura delle lettere ad almeno 0,12 _em_ e delle parole ad almeno 0,16 _em_, senza cambiare altre proprietà. Controlla che contenuti e funzioni restino disponibili. Questi valori verificano l’adattabilità nelle tecnologie pertinenti, come HTML e CSS: non sono impostazioni grafiche obbligatorie e non si applicano allo stesso modo al PDF di stampa @t06-wcag2024.#sito([W3C, Understanding Text Spacing, 1.4.12 (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html")

#interlinea()

#esercizio()

