---
theme: default
title: Comunicazione visiva e design delle interfacce · CVeDI 2026/27
routerMode: hash
author: Marco Cremaschi
aspectRatio: 16/9
canvasWidth: 1280
colorSchema: light
transition: fade
mdc: true
layout: default
class: cover-slide course-section
---

# Comunicazione visiva e design delle interfacce

<div class="cover-meta">CVeDI · 8 CFU · A.A. 2026/27</div>
<div class="cover-people">
  <span>Marco Cremaschi<br><small>marco.cremaschi@unimib.it</small></span>
  <span>Elia Guarnieri<br><small>elia.guarnieri@unimib.it</small></span>
  <span>Andrea Primo Pierotti<br><small>andrea.pierotti@unimib.it</small></span>
</div>

---
layout: default
class: index-slide course-section
footer: "Lezioni"
---

# Indice delle lezioni

<div class="index-grid" aria-label="Capitoli delle lezioni">
  <button type="button" class="btn btn-lg index-button index-chapter-1" @click="$nav.go(4)"><span class="index-chapter-number">01</span><span>Introduzione</span></button>
  <button type="button" class="btn btn-lg index-button index-chapter-2" disabled><span class="index-chapter-number">02</span><span>Storia del graphic design e delle interfacce</span></button>
  <button type="button" class="btn btn-lg index-button index-chapter-3" disabled><span class="index-chapter-number">03</span><span>Il processo UX attraverso il Design Thinking</span></button>
  <button type="button" class="btn btn-lg index-button index-chapter-4" disabled><span class="index-chapter-number">04</span><span>La metodologia Lean UX</span></button>
  <button type="button" class="btn btn-lg index-button index-chapter-5" disabled><span class="index-chapter-number">05</span><span>Conclusioni</span></button>
</div>

---
layout: default
class: content-slide shortcuts-slide course-section
footer: "Navigazione"
---

# Navigare con la tastiera

<p class="lead">Le scorciatoie funzionano anche quando i comandi sullo schermo sono nascosti.</p>
<div class="cvedi-grid two">
  <section aria-labelledby="navigation-keys">
    <h2 id="navigation-keys">Avanti e indietro</h2>
    <table class="table shortcut-table"><tbody>
      <tr><th scope="row">Passo successivo</th><td><kbd class="kbd kbd-lg" aria-label="Freccia destra">→</kbd> <span>oppure</span> <kbd class="kbd kbd-lg">Spazio</kbd></td></tr>
      <tr><th scope="row">Passo precedente</th><td><kbd class="kbd kbd-lg" aria-label="Freccia sinistra">←</kbd> <span>oppure</span> <kbd class="kbd kbd-lg">Shift</kbd> + <kbd class="kbd kbd-lg">Spazio</kbd></td></tr>
      <tr><th scope="row">Slide successiva</th><td><kbd class="kbd kbd-lg">Shift</kbd> + <kbd class="kbd kbd-lg" aria-label="Freccia destra">→</kbd> <span>oppure</span> <kbd class="kbd kbd-lg" aria-label="Freccia giù">↓</kbd></td></tr>
      <tr><th scope="row">Slide precedente</th><td><kbd class="kbd kbd-lg">Shift</kbd> + <kbd class="kbd kbd-lg" aria-label="Freccia sinistra">←</kbd> <span>oppure</span> <kbd class="kbd kbd-lg" aria-label="Freccia su">↑</kbd></td></tr>
    </tbody></table>
    <p class="shortcut-note">Un passo avanza anche le animazioni. <kbd class="kbd kbd-sm">PgDn</kbd> e <kbd class="kbd kbd-sm">PgUp</kbd> sono alternative per avanti e indietro.</p>
  </section>
  <section aria-labelledby="exploration-keys">
    <h2 id="exploration-keys">Esplorare le slide</h2>
    <table class="table shortcut-table"><tbody>
      <tr><th scope="row">Aprire la panoramica</th><td><kbd class="kbd kbd-lg">O</kbd> <span>oppure</span> <kbd class="kbd kbd-lg">`</kbd></td></tr>
      <tr><th scope="row">Scegliere nella panoramica</th><td><kbd class="kbd kbd-lg" aria-label="Frecce direzionali">← ↑ ↓ →</kbd> <span>poi</span> <kbd class="kbd kbd-lg">Invio</kbd></td></tr>
      <tr><th scope="row">Andare a una slide</th><td><kbd class="kbd kbd-lg">G</kbd></td></tr>
      <tr><th scope="row">Schermo intero</th><td><kbd class="kbd kbd-lg">F</kbd></td></tr>
      <tr><th scope="row">Chiudere panoramica o salto</th><td><kbd class="kbd kbd-lg">Esc</kbd></td></tr>
    </tbody></table>
  </section>
</div>

---
layout: default
class: question-slide course-section
footer: "Per iniziare"
---

# Come partecipare?

<p class="lead">Un corso fatto di lezioni, esercitazioni, workshop e confronto in aula.</p>

---
layout: default
class: question-slide course-section
---

# In una parola, come descriveresti l’ultimo semestre?

<p class="lead">Condividi la tua risposta con la classe.</p>

---
layout: default
class: chapter-slide course-section
---

<ChapterMetro section="course" />

# Il corso

<p>Obiettivi, metodo e calendario</p>

---
layout: default
class: content-slide objectives-slide course-section
footer: "Il percorso"
---

# Gli obiettivi del corso

<p class="lead">Conoscere gli aspetti teorici e progettuali del design delle interfacce, con attenzione alle dimensioni visive, di interazione, comunicazione ed esperienza delle persone.</p>
<div class="cvedi-grid four">
  <CvediCard title="01 · Lezioni teoriche" illustration="/images/flat/lesson-theory.svg">
    <p>Fondamenti e metodi.</p>
  </CvediCard>
  <CvediCard title="02 · Seminari" illustration="/images/flat/lesson-seminars.svg">
    <p>Contributi e casi studio.</p>
  </CvediCard>
  <CvediCard title="03 · Workshop" illustration="/images/flat/lesson-workshops.svg">
    <p>Revisioni progettuali.</p>
  </CvediCard>
  <CvediCard title="04 · Esercitazioni" illustration="/images/flat/lesson-exercises.svg">
    <p>Laboratorio informatico.</p>
  </CvediCard>
</div>

---
layout: default
class: list-slide dense-slide course-section
footer: "Programma"
---

# Lezioni teoriche

<div class="speaker">
  <div class="avatar avatar-placeholder" aria-hidden="true">
    <div class="speaker-initials"><span>MC</span></div>
  </div>
  <p><span class="speaker-role">Prof.</span> <span class="speaker-name">Marco Cremaschi</span></p>
</div>
<ul class="cvedi-list" role="list">
  <li>Introduzione alla progettazione di ecosistemi digitali complessi</li>
  <li>Definizione di un concept</li>
  <li>Teoria della Gestalt</li>
  <li>La griglia e lo spazio responsive</li>
  <li>Tipografia digitale</li>
  <li>Progettare con il colore</li>
  <li>Il linguaggio delle immagini</li>
  <li>Interazione, usabilità e interfaccia utente</li>
  <li>Interfacce dei giochi</li>
  <li>Ecosystem design</li>
</ul>

---
layout: default
class: list-slide dense-slide course-section
footer: "Laboratorio"
---

# Esercitazioni

<div class="speaker">
  <div class="avatar avatar-placeholder" aria-hidden="true">
    <div class="speaker-initials"><span>EG</span></div>
  </div>
  <p><span class="speaker-role">Prof.</span> <span class="speaker-name">Elia Guarnieri</span></p>
</div>
<ul class="cvedi-list" role="list">
  <li>Ripasso HTML e CSS3</li>
  <li>Implementazione di interfacce responsive</li>
  <li>Analisi e utilizzo del framework Bootstrap</li>
  <li>Nuovi elementi in HTML5 e CSS3</li>
  <li>Cenni di Search Engine Optimization</li>
  <li>Cenni di JavaScript per i componenti di Bootstrap</li>
</ul>
<p class="aside">Per esercitarsi in autonomia: <a href="https://www.freecodecamp.org/">FreeCodeCamp</a>.</p>

---
layout: default
class: content-slide course-section
footer: "Organizzazione"
---

# Giorni e orari

<p class="lead">La prima parte del corso è dedicata alle lezioni teoriche. Segue un passaggio progressivo alle esercitazioni di laboratorio.</p>
<div class="stats stats-horizontal cvedi-stats">
  <div class="stat">
    <div class="stat-title">Martedì</div>
    <div class="stat-value">15:30–18:30</div>
  </div>
  <div class="stat">
    <div class="stat-title">Giovedì</div>
    <div class="stat-value">16:30–18:30</div>
  </div>
  <div class="stat">
    <div class="stat-title">Venerdì</div>
    <div class="stat-value">13:30–16:30</div>
  </div>
</div>
<p class="aside">Per il dettaglio e gli incontri annullati, fa fede il calendario 2026/27 nelle slide seguenti.</p>

---
layout: default
class: calendar-slide course-section
footer: "2026/27"
---

# Calendario · settembre e ottobre

<CourseCalendar period="septemberOctober" />

---
layout: default
class: calendar-slide course-section
footer: "2026/27"
---

# Calendario · ottobre e novembre

<CourseCalendar period="octoberNovember" />

---
layout: default
class: calendar-slide course-section
footer: "2026/27"
---

# Calendario · novembre e gennaio

<CourseCalendar period="novemberJanuary" />
<p class="calendar-note">Ore previste: 35 di lezione e 36 di esercitazione, secondo il calendario del corso.</p>

---
layout: default
class: question-slide course-section
footer: "Il corso"
---

# Domande?

---
layout: default
class: content-slide materials-slide course-section
footer: "Informazioni"
---

# Slide e video

<div class="cvedi-grid three">
  <CvediCard title="Materiali" illustration="/images/flat/lesson-theory.svg">
    <p>Le slide saranno caricate dopo ogni lezione o esercitazione. In linea di massima non verranno pubblicate in anticipo.</p>
  </CvediCard>
  <CvediCard title="Partecipazione" illustration="/images/flat/lesson-seminars.svg">
    <p>Il corso prevede workshop, lavoro di gruppo, interventi degli studenti e altre attività in aula.</p>
  </CvediCard>
  <CvediCard title="Registrazioni" illustration="/images/flat/recording-off.svg">
    <p>Per motivi di privacy non è possibile effettuare registrazioni.</p>
  </CvediCard>
</div>

---
layout: default
class: question-slide course-section
footer: "Prima dell’esame"
---

# Domande?

---
layout: default
class: chapter-slide exam-section
---

<ChapterMetro section="exam" />

# Modalità d’esame

<p>Progetto o approfondimento · scritto · orale</p>

---
layout: default
class: exam-slide exam-section
footer: "Valutazione"
---

# Tre parti dell’esame

<div class="cvedi-grid three">
  <CvediCard title="Progetto o approfondimento" illustration="/images/flat/lesson-workshops.svg" illustration-variant="roomy">
    <p>Progetto di gruppo secondo il brief, con attività metaprogettuali, oppure approfondimento individuale. Massimo 31 punti (30 e lode).</p>
  </CvediCard>
  <CvediCard title="Esame scritto" illustration="/images/flat/document.svg" illustration-variant="roomy">
    <p>16 domande chiuse (1 punto ciascuna) e 3 aperte (5 punti ciascuna). Argomenti delle lezioni, delle esercitazioni e della bibliografia. 75 minuti; massimo 31 punti.</p>
  </CvediCard>
  <CvediCard title="Esame orale" illustration="/images/flat/lesson-seminars.svg" illustration-variant="roomy">
    <p>Discussione sul voto del progetto e domande sulla bibliografia teorica. Massimo 31 punti.</p>
  </CvediCard>
</div>

---
layout: default
class: split-slide exam-section
footer: "Organizzazione"
---

# Individuale e di gruppo

<div class="cvedi-grid two">
  <CvediCard title="Il gruppo" illustration="/images/flat/people.svg" illustration-variant="roomy">
    <p>Il progetto è valutato per gruppo. I gruppi sono composti da 6 persone con competenze eterogenee; eventuali deroghe si discutono con il docente.</p>
  </CvediCard>
  <CvediCard title="La persona" illustration="/images/flat/person.svg" illustration-variant="roomy">
    <p>Scritto e orale sono individuali. I membri dello stesso gruppo possono iscriversi ad appelli diversi. Un’insufficienza nello scritto o nell’orale non richiede un nuovo progetto o approfondimento.</p>
  </CvediCard>
</div>
<p class="aside">Il voto del progetto viene comunicato prima dell’orale.</p>

---
layout: default
class: content-slide project-section
footer: "Percorso di gruppo"
---

# Progetto

<p class="lead">Attività di gruppo: 6 studenti, salvo eventuali adattamenti in base agli iscritti.</p>
<div class="cvedi-grid two">
  <CvediCard title="Obiettivo · WHAT IF?" illustration="/images/flat/idea.svg" illustration-variant="roomy">
    <p>Inventare un servizio del 2050 basato sulle potenzialità future dell’AI e progettare il sito web responsive dell’organizzazione che lo offre.</p>
  </CvediCard>
  <CvediCard title="Scadenze" illustration="/images/flat/calendar.svg" illustration-variant="roomy">
    <p>Le scadenze saranno confermate per il 2026/27. La consegna finale è prevista una settimana prima dell’appello scritto.</p>
  </CvediCard>
</div>
<p class="aside">Ogni gruppo inventa nome e identità della propria organizzazione.</p>

---
layout: default
class: process-slide project-section
footer: "Percorso di gruppo"
---

# Progetto: fasi

<ProcessTimeline :steps="['Progetto di gruppo', 'Presentazioni e consegne in itinere', 'Discussione durante i workshop', 'Consegna finale']" />

---
layout: default
class: content-slide project-section
footer: "Consegne"
---

# Progetto: consegna e scadenze

<p class="lead">Il form di consegna e le scadenze dei singoli appelli saranno pubblicati durante il corso.</p>
<div class="cvedi-grid two">
  <CvediCard title="Form di consegna" illustration="/images/flat/delivery.svg" illustration-variant="roomy">
    <p>Il collegamento verrà comunicato dal docente.</p>
  </CvediCard>
  <CvediCard title="Appelli" illustration="/images/flat/calendar.svg" illustration-variant="roomy">
    <p>1 · 2 · 3 · 4 · 5 · 6</p>
    <p>Scadenze in aggiornamento.</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide project-section nextme-slide nextme-intro
footer: "WHAT IF? · Il brief"
---

# WHAT IF?

<div class="nextme-layout">
  <div class="nextme-copy">
    <p class="nextme-subtitle">Progettare i servizi del futuro con l’intelligenza artificiale</p>
    <p>Siamo nel <strong>2050</strong>. L’evoluzione dell’AI apre nuove possibilità per imparare, creare, lavorare, comunicare e interagire con il mondo.</p>
    <p>Inventate un’organizzazione che offra <strong>soluzioni, prodotti, servizi o esperienze innovative</strong> basati su queste possibilità.</p>
    <p>Individuate un bisogno delle persone e progettate un’offerta originale, utile e comprensibile.</p>
  </div>
  <NextMeIllustration src="/images/generated/next-me/next-me-2050-v2.webp" />
</div>
<p class="aside nextme-statement">Realizzate il sito web responsive attraverso cui le persone scoprono, scelgono e utilizzano la vostra offerta.</p>

<!--
WHAT IF? è il titolo del progetto didattico: ogni gruppo inventa il nome e l’identità della propria organizzazione.
L’ambientazione futura lascia spazio alla fantasia. Le proposte devono avere una logica comprensibile, destinatari riconoscibili e un’utilità concreta.
Definite quali capacità dell’AI rendono possibile l’offerta, come funziona e quale ruolo hanno le persone.
Il progetto riguarda il concept, la comunicazione visiva, l’esperienza delle persone e la realizzazione del sito web.
-->

---
layout: default
class: content-slide project-section nextme-slide nextme-concept
footer: "WHAT IF? · Il concept"
---

# Dal bisogno al concept

<p class="lead">Collegate persone, capacità dell’AI e valore del servizio.</p>
<div class="nextme-layout">
  <dl class="nextme-definition-list">
    <div><dt>Destinatari</dt><dd>Definite persone, bisogno e contesto d’uso.</dd></div>
    <div><dt>Offerta</dt><dd>Una soluzione principale, con servizi o varianti coerenti.</dd></div>
    <div><dt>Ruolo dell’AI</dt><dd>Spiegate quale capacità rende possibile la vostra offerta.</dd></div>
    <div><dt>Evoluzione</dt><dd>Distinguete ciò che esiste oggi da ciò che ipotizzate per il 2050.</dd></div>
    <div><dt>Scelte dell’utente</dt><dd>Chiarite cosa decide, fornisce, delega e può modificare.</dd></div>
  </dl>
  <NextMeIllustration src="/images/generated/next-me/next-me-concept-v2.webp" />
</div>

---
layout: default
class: content-slide project-section nextme-directions
footer: "WHAT IF? · Direzioni da esplorare"
---

# Potenzialità dell’AI

<p class="lead">Sei direzioni per immaginare la vostra offerta.</p>
<div class="cvedi-grid three">
  <CvediCard title="Personalizzazione" illustration="/images/flat/sliders.svg" illustration-variant="compact">
    <p>Servizi che si adattano a esigenze, conoscenze, preferenze e contesto.</p>
  </CvediCard>
  <CvediCard title="Collaborazione" illustration="/images/flat/people.svg" illustration-variant="compact">
    <p>Persone e AI progettano, ricercano e creano insieme.</p>
  </CvediCard>
  <CvediCard title="Multimodalità" illustration="/images/flat/multimodal.svg" illustration-variant="compact">
    <p>Linguaggio, immagini, suoni, movimento e dati ambientali dialogano.</p>
  </CvediCard>
  <CvediCard title="Simulazione" illustration="/images/flat/simulation.svg" illustration-variant="compact">
    <p>Ambienti generati per imparare, sperimentare e prepararsi a situazioni nuove.</p>
  </CvediCard>
  <CvediCard title="Autonomia" illustration="/images/flat/check.svg" illustration-variant="compact">
    <p>Attività articolate coordinate con livelli di delega scelti dall’utente.</p>
  </CvediCard>
  <CvediCard title="Mondo fisico" illustration="/images/flat/devices.svg" illustration-variant="compact">
    <p>AI, oggetti, spazi e robotica si collegano in nuovi servizi.</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide project-section
footer: "WHAT IF? · Fondare l’ipotesi"
---

# Dal presente al 2050

<p class="lead">La fantasia si appoggia a una logica comprensibile e a fonti verificabili.</p>
<div class="cvedi-grid three">
  <CvediCard title="Capacità emergente" illustration="/images/flat/search.svg" illustration-variant="roomy">
    <p>Documentate una capacità disponibile o in sperimentazione e citate le fonti.</p>
  </CvediCard>
  <CvediCard title="Evoluzione ipotizzata" illustration="/images/flat/idea.svg" illustration-variant="roomy">
    <p>Descrivete quale ulteriore capacità assumete disponibile nel 2050 e perché è plausibile.</p>
  </CvediCard>
  <CvediCard title="Nuovo valore" illustration="/images/flat/check.svg" illustration-variant="roomy">
    <p>Spiegate il bisogno affrontato e come l’evoluzione dell’AI cambia l’esperienza delle persone.</p>
  </CvediCard>
</div>
<p class="aside">Riferimenti per partire: <a class="link" href="https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/" target="_blank" rel="noreferrer">Genie · ambienti interattivi</a> e <a class="link" href="https://deepmind.google/blog/co-scientist-a-multi-agent-ai-partner-to-accelerate-research/" target="_blank" rel="noreferrer">Co-Scientist · collaborazione nella ricerca</a>.</p>

<!--
Le capacità future sono ipotesi progettuali, non previsioni certe. I riferimenti documentano direzioni di ricerca già emergenti: generazione di ambienti interattivi e collaborazione fra AI e ricercatori nella formulazione di ipotesi.
Ogni gruppo esplicita il passaggio dalla capacità attuale all’evoluzione ipotizzata e all’offerta proposta.
-->

---
layout: default
class: content-slide project-section
footer: "WHAT IF? · Spunti"
---

# Spunti per partire

<div class="cvedi-grid two">
  <CvediCard title="Professioni da provare" illustration="/images/flat/person.svg" illustration-variant="compact">
    <p>Un’agenzia di esperienze personalizzate per esplorare una giornata in professioni future.</p>
  </CvediCard>
  <CvediCard title="Oggetti che evolvono" illustration="/images/flat/sliders.svg" illustration-variant="compact">
    <p>Un atelier di oggetti capaci di adattarsi nel tempo alle esigenze del proprietario.</p>
  </CvediCard>
  <CvediCard title="Ambienti narrativi" illustration="/images/flat/simulation.svg" illustration-variant="compact">
    <p>Uno studio di luoghi e storie su misura, in cui le persone partecipano e cambiano l’esperienza.</p>
  </CvediCard>
  <CvediCard title="Ecosistemi domestici" illustration="/images/flat/plant.svg" illustration-variant="compact">
    <p>Un servizio che coordina piante, spazi e risorse per creare piccoli ecosistemi.</p>
  </CvediCard>
</div>
<p class="aside">Usate questi esempi come stimoli e sviluppate una proposta originale.</p>

---
layout: default
class: content-slide project-section nextme-slide nextme-website
footer: "WHAT IF? · Il sito web"
---

# Dal concept al sito web

<p class="lead">Un sito dove il servizio si capisce e si sceglie.</p>
<div class="nextme-layout">
  <dl class="nextme-definition-list">
    <div><dt>Identità</dt><dd>Homepage, organizzazione, persone e contatti.</dd></div>
    <div><dt>Offerta</dt><dd>Catalogo e schede dettagliate dei servizi.</dd></div>
    <div><dt>Funzionamento</dt><dd>Come si usa il servizio e quale contributo dà l’AI.</dd></div>
    <div><dt>Accesso al servizio</dt><dd>Richiesta, personalizzazione, prenotazione o attivazione.</dd></div>
  </dl>
  <NextMeIllustration src="/images/generated/next-me/next-me-web-v2.webp" />
</div>

---
layout: default
class: content-slide project-section
footer: "WHAT IF? · Funzionalità"
---

# Un percorso completo

<p class="lead">Accompagnate le persone dalla scoperta all’attivazione.</p>

<div class="cvedi-grid three">
  <CvediCard title="Scoprire" illustration="/images/flat/search.svg" illustration-variant="roomy">
    <ul class="cvedi-list" role="list">
      <li>Esplorare l’offerta e trovare un servizio pertinente.</li>
      <li>Capire benefici, requisiti e condizioni.</li>
      <li>Confrontare le opzioni quando serve.</li>
    </ul>
  </CvediCard>
  <CvediCard title="Personalizzare" illustration="/images/flat/sliders.svg" illustration-variant="roomy">
    <ul class="cvedi-list" role="list">
      <li>Esprimere esigenze e preferenze.</li>
      <li>Scegliere opzioni e livello di delega all’AI.</li>
      <li>Capire quali dati fornire e quale risultato aspettarsi.</li>
    </ul>
  </CvediCard>
  <CvediCard title="Attivare" illustration="/images/flat/check.svg" illustration-variant="roomy">
    <ul class="cvedi-list" role="list">
      <li>Completare una richiesta o prenotazione.</li>
      <li>Verificare il riepilogo e ricevere una conferma.</li>
      <li>Correggere errori e modificare le proprie scelte.</li>
    </ul>
  </CvediCard>
</div>

---
layout: default
class: list-slide project-section
footer: "WHAT IF? · Requisiti"
---

# Progetto: requisiti

<div class="cvedi-grid three">
  <CvediCard title="Accessibilità" illustration="/images/flat/accessibility.svg" illustration-variant="roomy">
    <ul class="cvedi-list" role="list">
      <li>Conformità WCAG 2.2 AA</li>
      <li>Contrasto elevato, font scalabili, focus visibile</li>
      <li>Etichette ARIA e navigazione da tastiera</li>
    </ul>
  </CvediCard>
  <CvediCard title="Responsive e contenuti" illustration="/images/flat/devices.svg" illustration-variant="roomy">
    <ul class="cvedi-list" role="list">
      <li>Desktop, tablet e smartphone</li>
      <li>Contenuti solo in italiano, con terminologia coerente</li>
      <li>URL leggibili e metadati della pagina</li>
    </ul>
  </CvediCard>
  <CvediCard title="Fiducia e controllo" illustration="/images/flat/shield.svg" illustration-variant="roomy">
    <ul class="cvedi-list" role="list">
      <li>Spiegare il contributo dell’AI</li>
      <li>Chiarire dati richiesti e livelli di delega</li>
      <li>Consentire modifiche e recupero dagli errori</li>
    </ul>
  </CvediCard>
</div>
<p class="aside">I comportamenti dell’AI e le disponibilità possono essere simulati. La valutazione riguarda concept, comunicazione visiva e usabilità del sito.</p>

---
layout: default
class: content-slide project-section
footer: "Percorso individuale"
---

# Approfondimento

<div class="cvedi-grid three">
  <CvediCard title="01 · Valutazione" illustration="/images/flat/document.svg" illustration-variant="roomy">
    <p>La valutazione dell’approfondimento è individuale.</p>
  </CvediCard>
  <CvediCard title="02 · Accesso all’orale" illustration="/images/flat/lesson-seminars.svg" illustration-variant="roomy">
    <p>La consegna dell’approfondimento non è obbligatoria per sostenere l’orale.</p>
  </CvediCard>
  <CvediCard title="03 · Migliorie" illustration="/images/flat/sliders.svg" illustration-variant="roomy">
    <p>È possibile apportare migliorie all’approfondimento.</p>
  </CvediCard>
</div>
<p class="aside">Indicazioni della sorgente segnalate “in aggiornamento”.</p>

---
layout: default
class: process-slide project-section
footer: "Percorso individuale"
---

# Approfondimento: fasi

<ProcessTimeline label="Fasi dell’approfondimento" :steps="['Scelta dell’argomento', 'Ricerca e analisi delle fonti', 'Stesura del documento', 'Consegna finale']" />

<!--
Le quattro tappe riassumono il lavoro individuale per analizzare in dettaglio un argomento e presentarlo in un documento.
-->

---
layout: default
class: content-slide project-section
footer: "Percorso individuale"
---

# Approfondimento: attività

<div class="cvedi-grid two">
  <CvediCard title="Obiettivo" illustration="/images/flat/document.svg" illustration-variant="roomy">
    <p>Stendere un documento che analizzi in dettaglio un argomento scelto.</p>
  </CvediCard>
  <CvediCard title="Consegna" illustration="/images/flat/delivery.svg" illustration-variant="roomy">
    <p>Prevista due settimane prima dell’appello scritto. Brief e richiesta dell’argomento sono in aggiornamento per il 2026/27.</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide project-section
footer: "Valutazione"
---

# Approfondimento

<p class="lead">Il voto dell’approfondimento deriva da un’unica valutazione della consegna finale.</p>

---
layout: default
class: list-slide dense-slide project-section
footer: "Temi possibili"
---

# Approfondimenti: esempi

<ul class="cvedi-list" role="list">
  <li>Analisi comparativa e critica degli stili del web design</li>
  <li>Differenze tra siti in contesti culturali diversi</li>
  <li>Storia del graphic design</li>
  <li>Nuove tendenze nel web design</li>
  <li>Interfacce per app, smartwatch, realtà aumentata e virtuale</li>
  <li>Accessibilità nel web design</li>
  <li>Inclusività nel web design</li>
  <li>Scelte tipografiche in relazione al contesto</li>
</ul>

---
layout: default
class: content-slide project-section
footer: "Consegne"
---

# Approfondimento: consegna

<p class="lead">Il form di consegna e le scadenze dei singoli appelli saranno pubblicati durante il corso.</p>
<div class="cvedi-grid two">
  <CvediCard title="Form di consegna" illustration="/images/flat/delivery.svg" illustration-variant="roomy">
    <p>Il collegamento verrà comunicato dal docente.</p>
  </CvediCard>
  <CvediCard title="Appelli" illustration="/images/flat/calendar.svg" illustration-variant="roomy">
    <p>1 · 2 · 3 · 4 · 5 · 6</p>
    <p>Scadenze in aggiornamento.</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide exam-section
footer: "Esame"
---

# Esame scritto in presenza

<div class="cvedi-grid two">
  <CvediCard title="Struttura" illustration="/images/flat/document.svg" illustration-variant="roomy">
    <p>16 domande chiuse da 1 punto e 3 domande aperte da 5 punti. Argomenti delle lezioni, delle esercitazioni e della bibliografia teorica.</p>
  </CvediCard>
  <CvediCard title="Durata e sede" illustration="/images/flat/clock.svg" illustration-variant="roomy">
    <p>75 minuti. L’esame si svolge nei laboratori informatici tramite la piattaforma Esami-Online.</p>
  </CvediCard>
</div>
<p class="aside">Punteggio massimo: 31 (30 e lode).</p>

---
layout: default
class: content-slide exam-section
footer: "Esame"
---

# Esame orale

<p class="lead">Domande sulla bibliografia teorica. Punteggio massimo: 31 (30 e lode).</p>
<CvediCard title="Eventuale discussione del progetto" illustration="/images/flat/lesson-seminars.svg" illustration-variant="roomy">
  <p>Se emergono criticità o servono chiarimenti specifici, potrà essere richiesta una discussione sul progetto. Sarà comunicata con preavviso e fissata per consentire la presenza di tutto il gruppo.</p>
</CvediCard>

---
layout: default
class: book-slide exam-section
footer: "Letture"
---

# Bibliografia

<div class="book-layout"><img src="/images/source/slide-36-1.png" alt="Copertina del materiale Comunicazione visiva e design delle interfacce" />
<CvediCard title="Comunicazione visiva e design delle interfacce">
  <p>Materiale teorico del corso e approfondimenti.</p>
  <p>Marco Cremaschi et al.</p>
  <span class="badge badge-primary">In riscrittura</span>
</CvediCard>
</div>

---
layout: default
class: content-slide exam-section
footer: "Esame"
---

# Regole · 1–3

<div class="cvedi-grid three">
  <CvediCard title="01 · Progetto">
    <p>Non è obbligatorio consegnare il progetto o approfondimento per sostenere scritto e orale.</p>
  </CvediCard>
  <CvediCard title="02 · Scritto">
    <p>Il voto può essere rifiutato entro 24 ore dalla pubblicazione, tramite apposito form. Una volta accettato, non può più essere rifiutato.</p>
  </CvediCard>
  <CvediCard title="03 · Orale">
    <p>Per sostenere l’orale è obbligatorio aver superato lo scritto.</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide exam-section
footer: "Esame"
---

# Regole · 4–5

<div class="cvedi-grid two">
  <CvediCard title="04 · Appelli">
    <p>Scritto e orale sono individuali; membri dello stesso gruppo possono iscriversi ad appelli differenti.</p>
  </CvediCard>
  <CvediCard title="05 · Discussione">
    <p>Se richiesta una discussione del progetto, è necessaria la partecipazione di tutto il gruppo, anche in forma mista tra presenza e remoto.</p>
  </CvediCard>
</div>

---
layout: default
class: formula-slide exam-section
footer: "Esame"
---

# Votazione

<p class="lead">Per superare l’esame serve una votazione sufficiente in tutte e tre le parti.</p>
<div class="cvedi-grid two">
  <CvediCard title="Primo punteggio">
    <p class="formula">(scritto + progetto / approfondimento) ÷ 2</p>
  </CvediCard>
  <CvediCard title="Voto finale">
    <p class="formula">(primo punteggio + orale) ÷ 2</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide exam-section
footer: "Appelli"
---

# Date d’esame

<p class="lead">Le date degli appelli 2026/27 saranno confermate dall’ateneo.</p>
<div class="cvedi-grid two">
  <CvediCard title="Appello I">
    <p>Data dello scritto e dell’orale da pubblicare.</p>
  </CvediCard>
  <CvediCard title="Appello II">
    <p>Data dello scritto e dell’orale da pubblicare.</p>
  </CvediCard>
</div>
<p class="aside">Le date 2024 presenti nella sorgente sono state rimosse perché non valide per il nuovo anno accademico.</p>

---
layout: default
class: grade-slide history-section
footer: "Dati storici · progetto e approfondimento"
---

# Progetti e approfondimenti

<GradeDistribution category="project" />
<p class="grade-note">Questa categoria unisce progetti e approfondimenti, come nei registri del corso. Un voto per matricola in ogni registro; i valori sopra 30 sono nella fascia “30 o più”.</p>

---
layout: default
class: grade-slide history-section
footer: "Dati storici · orale"
---

# Valutazioni orali

<GradeDistribution category="oral" />
<p class="grade-note">Le valutazioni con mezzi punti sono assegnate alla fascia corrispondente. Un voto per matricola in ogni registro; i valori sopra 30 sono nella fascia “30 o più”.</p>

---
layout: default
class: grade-slide history-section
footer: "Dati storici · scritto"
---

# Prove scritte

<GradeDistribution category="written" />
<p class="grade-note">Per il 2022/23 è considerato l’ultimo voto numerico disponibile tra gli appelli; assenze e ritiri sono esclusi. Un voto per matricola in ogni registro; i valori sopra 30 sono nella fascia “30 o più”.</p>

---
layout: default
class: grade-slide history-section
footer: "Dati storici · voto finale"
---

# Voto finale

<GradeDistribution category="final" />
<p class="grade-note">Sono inclusi solo i voti finali; la distribuzione non rappresenta il tasso di superamento dell’esame. Un voto per matricola in ogni registro; i valori sopra 30 sono nella fascia “30 o più”.</p>

---
layout: default
class: grade-slide history-section
footer: "Dati storici · voto finale"
---

# Voti finali: sei anni a confronto

<p class="grade-intro">Quota percentuale di voti finali per fascia, calcolata separatamente per ogni anno.</p>
<GradeYearTable />
<p class="grade-note">Sotto ogni anno è indicato il numero di voti analizzati. Il registro 2025/26 è fotografato al 29 settembre 2026; i registri possono includere esami di studenti iscritti in anni precedenti.</p>

---
layout: default
class: question-slide exam-section
footer: "Valutazione"
---

# Domande?

---
layout: default
class: chapter-slide archive-section
---

<ChapterMetro section="archive" />

# Archivio progetti

<p>Esplora il lavoro degli anni precedenti</p>

---
layout: default
class: archive-wall-slide archive-section
---

# Archivio progetti

<ProjectGallery />
<div class="project-gallery-linkbar">
  <a class="link" href="../project/" target="_blank" rel="noreferrer">Archivio completo dei progetti</a>
</div>

---
layout: default
class: question-slide archive-section
footer: "Confronto"
---

# Argomenti da approfondire?

---
layout: default
class: content-slide archive-section
footer: "Comunicazioni"
---

# Contatti

<p class="lead">Utilizzate il forum della piattaforma del corso: le risposte a quesiti di interesse comune possono essere utili a tutta la classe.</p>
<CvediCard title="Docenti" illustration="/images/flat/people.svg" illustration-variant="roomy">
  <p>Marco Cremaschi · Elia Guarnieri · Andrea Primo Pierotti</p>
</CvediCard>

---
layout: default
class: closing-slide archive-section
---

<ClosingMetro />

# Domande?

<p>Comunicazione visiva e design delle interfacce · 2026/27</p>
