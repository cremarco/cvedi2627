---
theme: default
title: Comunicazione visiva e design delle interfacce · CVeDI 2026/27
routerMode: hash
author: Marco Cremaschi
lang: it
htmlAttrs:
  lang: it
aspectRatio: 16/9
canvasWidth: 1280
colorSchema: light
transition: fade
comark: true
fonts:
  provider: none
export:
  perSlide: true
layout: default
class: cover-slide course-section
lesson: apertura
routeAlias: apertura
---

<ClosingMetro original />

# Comunicazione visiva e design delle interfacce

<div class="cover-meta">CVeDI · 8 CFU · A.A. 2026/27</div>
<div class="cover-people">
  <span>Marco Cremaschi<br><small>marco.cremaschi@unimib.it</small></span>
  <span>Elia Guarnieri<br><small>elia.guarnieri@unimib.it</small></span>
  <span>Andrea Primo Pierotti<br><small>andrea.pierotti@unimib.it</small></span>
</div>

---
layout: default
class: renewal-slide course-section
lesson: apertura
footer: "Un nuovo percorso"
---

# Il corso si rinnova.

<div class="renewal-layout">
  <div class="renewal-copy">
    <p>Per l’A.A. <strong>2026/27</strong> stiamo rinnovando il corso per offrirvi <strong>contenuti il più possibile aggiornati</strong>.</p>
    <p><strong>Slide e materiale bibliografico sono completamente nuovi</strong> e in corso di aggiornamento.</p>
  </div>
  <RenewalMetro />
</div>
<div role="note" class="alert renewal-feedback">
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 5h20a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H13l-7 5v-5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"/><path d="M10 12h12M10 17h8"/></svg>
  <div>
    <h2>Ci aiutate a migliorare?</h2>
    <p>Potrebbero esserci errori, refusi o passaggi poco chiari. Vi chiediamo di <strong>segnalarceli nel forum del corso</strong>. Grazie per il vostro aiuto!</p>
  </div>
</div>

---
layout: default
class: index-slide course-section reading-slide
lesson: apertura
footer: "Lezioni"
---

# Indice delle lezioni

<div class="index-grid" aria-label="Capitoli delle lezioni">
  <button type="button" class="btn btn-lg index-button index-course" @click="$nav.go('presentazione-corso')"><span class="index-chapter-number">01</span><span>Il corso</span></button>
  <button type="button" class="btn btn-lg index-button index-chapter-1" @click="$nav.go('introduzione-teorica')"><span class="index-chapter-number">02</span><span>Introduzione a UX e UI</span></button>
  <button v-if="false" type="button" class="btn btn-lg index-button index-chapter-2" @click="$nav.go('storia-design')"><span class="index-chapter-number">03</span><span>Storia del design</span></button>
  <button v-if="false" type="button" class="btn btn-lg index-button index-chapter-3" disabled><span class="index-chapter-number">04</span><span>Il processo UX attraverso il Design Thinking</span></button>
  <button v-if="false" type="button" class="btn btn-lg index-button index-chapter-4" disabled><span class="index-chapter-number">05</span><span>La metodologia Lean UX</span></button>
  <button v-if="false" type="button" class="btn btn-lg index-button index-chapter-5" disabled><span class="index-chapter-number">06</span><span>Conclusioni</span></button>
</div>
<p class="aside"><SlideAction to="brief-progetto" :show-arrow="false">Brief di progetto · WHAT IF? 2050</SlideAction></p>

---
layout: default
class: content-slide shortcuts-slide course-section reading-slide
lesson: apertura
footer: "Navigazione"
---

# Navigare con la tastiera

<p class="lead">Usa queste <strong>scorciatoie</strong> per navigare nella presentazione.</p>
<div class="cvedi-grid two">
  <section aria-labelledby="navigation-keys">
    <h2 id="navigation-keys">Avanti e indietro</h2>
    <table class="table shortcut-table"><tbody>
      <tr><th scope="row">Passo successivo</th><td><kbd class="kbd kbd-lg" aria-label="Freccia destra">→</kbd> <span>oppure</span> <kbd class="kbd kbd-lg">Spazio</kbd></td></tr>
      <tr><th scope="row">Passo precedente</th><td><kbd class="kbd kbd-lg" aria-label="Freccia sinistra">←</kbd> <span>oppure</span> <kbd class="kbd kbd-lg">Shift</kbd> + <kbd class="kbd kbd-lg">Spazio</kbd></td></tr>
      <tr><th scope="row">Slide successiva</th><td><kbd class="kbd kbd-lg">Shift</kbd> + <kbd class="kbd kbd-lg" aria-label="Freccia destra">→</kbd> <span>oppure</span> <kbd class="kbd kbd-lg" aria-label="Freccia giù">↓</kbd></td></tr>
      <tr><th scope="row">Slide precedente</th><td><kbd class="kbd kbd-lg">Shift</kbd> + <kbd class="kbd kbd-lg" aria-label="Freccia sinistra">←</kbd> <span>oppure</span> <kbd class="kbd kbd-lg" aria-label="Freccia su">↑</kbd></td></tr>
    </tbody></table>
    <p class="shortcut-note">Un passo avanza <strong>anche le animazioni</strong>. <kbd class="kbd kbd-sm">PgDn</kbd> e <kbd class="kbd kbd-sm">PgUp</kbd> sono alternative per avanti e indietro.</p>
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
lesson: apertura
---

# Come partecipare?

<p class="lead">Un corso fatto di lezioni, esercitazioni, workshop e confronto in aula.</p>

---
layout: default
class: question-slide course-section
lesson: apertura
---

# In una parola, come descriveresti l’ultimo semestre?

<p class="lead">Condividi la tua risposta con la classe.</p>

---
layout: default
class: chapter-slide course-section
routeAlias: presentazione-corso
---

<ChapterMetro section="course" />

# Il corso

<p>Obiettivi, metodo e calendario</p>

---
layout: default
class: content-slide objectives-slide course-section reading-slide
footer: "Il percorso"
---

# Gli obiettivi del corso

<p class="lead">Conoscere gli aspetti teorici e progettuali del <strong>design delle interfacce</strong>, con attenzione alla comunicazione visiva, all’interazione e all’<strong>esperienza delle persone</strong>.</p>
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
class: list-slide dense-slide course-section reading-slide
footer: "Programma"
---

# Lezioni teoriche

<div class="speaker">
  <p><span class="speaker-role">Prof.</span> <span class="speaker-name">Marco Cremaschi</span></p>
</div>
<ul class="cvedi-list" role="list">
  <li><span>Introduzione alla progettazione di <strong>ecosistemi digitali complessi</strong></span></li>
  <li><span>Definizione di un <strong>concept</strong></span></li>
  <li><span>Teoria della <strong>Gestalt</strong></span></li>
  <li><span>La <strong>griglia</strong> e lo spazio <strong>responsive</strong></span></li>
  <li><span><strong>Tipografia</strong> digitale</span></li>
  <li><span>Progettare con il <strong>colore</strong></span></li>
  <li><span>Il linguaggio delle <strong>immagini</strong></span></li>
  <li><span><strong>Interazione</strong>, <strong>usabilità</strong> e interfaccia utente</span></li>
  <li><span>Interfacce dei <strong>giochi</strong></span></li>
  <li><span><strong>Ecosystem design</strong></span></li>
</ul>

---
layout: default
class: list-slide dense-slide exercises-slide course-section reading-slide
footer: "Laboratorio"
---

# Esercitazioni

<div class="speaker">
  <p><span class="speaker-role">Prof.</span> <span class="speaker-name">Elia Guarnieri</span></p>
  <SyllabusSticker />
</div>
<ul class="cvedi-list" role="list">
  <li><span>Ripasso <strong>HTML e CSS3</strong></span></li>
  <li><span>Implementazione di <strong>interfacce responsive</strong></span></li>
  <li><span><s class="syllabus-retired">Analisi e utilizzo del framework <strong>Bootstrap</strong></s></span></li>
  <li><span>Nuovi elementi in <strong>HTML5 e CSS3</strong></span></li>
  <li><span>Cenni di <strong>Git</strong></span></li>
  <li><span>Cenni di <strong>JavaScript</strong> per i componenti di <s class="syllabus-retired">Bootstrap</s></span></li>
</ul>
<p class="aside">Per esercitarsi in autonomia: <a href="https://www.freecodecamp.org/">FreeCodeCamp</a>.</p>

---
layout: default
class: content-slide course-section reading-slide
footer: "Organizzazione"
---

# Giorni e orari

<p class="lead">La prima parte del corso è dedicata alle <strong>lezioni teoriche</strong>. Segue un passaggio progressivo alle <strong>esercitazioni di laboratorio</strong>.</p>
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
<p class="aside">Per il dettaglio e gli incontri annullati, fa fede il <a class="link" href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRnM2YmuwqR8WHqOp5zsFHXeRO6rGPtxPfaN7KKizmut85tqad7lYvu2jVv1w2HMmcQOgNwNk-2Bh6G/pubhtml?gid=0&amp;single=true" target="_blank" rel="noreferrer">calendario 2026/27</a>.</p>

---
layout: default
class: calendar-slide course-section reading-slide
footer: "2026/27"
---

# Calendario · settembre e ottobre

<CourseCalendar period="septemberOctober" />

---
layout: default
class: calendar-slide course-section reading-slide
footer: "2026/27"
---

# Calendario · ottobre e novembre

<CourseCalendar period="octoberNovember" />

---
layout: default
class: calendar-slide course-section reading-slide
footer: "2026/27"
---

# Calendario · novembre e gennaio

<CourseCalendar period="novemberJanuary" />
<p class="calendar-note">Ore previste: <strong>35 di lezione</strong> e <strong>36 di esercitazione</strong>, secondo il calendario del corso.</p>

---
layout: default
class: question-slide course-section
footer: "Il corso"
---

# Domande?

---
layout: default
class: content-slide materials-slide course-section reading-slide
footer: "Informazioni"
---

# Slide e video

<div class="cvedi-grid three">
  <CvediCard title="Materiali" illustration="/images/flat/lesson-theory.svg">
    <p>Le slide saranno caricate <strong>dopo ogni lezione o esercitazione</strong>. In linea di massima non verranno pubblicate in anticipo.</p>
  </CvediCard>
  <CvediCard title="Partecipazione" illustration="/images/flat/lesson-seminars.svg">
    <p>Il corso prevede <strong>workshop</strong>, <strong>lavoro di gruppo</strong>, interventi degli studenti e altre attività in aula.</p>
  </CvediCard>
  <CvediCard title="Registrazioni" illustration="/images/flat/recording-off.svg">
    <p>Per motivi di privacy <strong>non è possibile</strong> effettuare registrazioni.<sup>*</sup></p>
    <p class="card-note">* Saranno rese disponibili alcune registrazioni, alle condizioni che verranno comunicate dal docente.</p>
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
class: exam-slide exam-section reading-slide
footer: "Valutazione"
---

# Tre parti dell’esame

<div class="cvedi-grid three">
  <CvediCard title="Progetto o approfondimento" illustration="/images/flat/lesson-workshops.svg" illustration-variant="roomy">
    <p><strong>Progetto di gruppo</strong> secondo il brief, con attività metaprogettuali, oppure <strong>approfondimento individuale</strong>. Massimo <strong>31 punti</strong> (30 e lode).</p>
  </CvediCard>
  <CvediCard title="Esame scritto" illustration="/images/flat/document.svg" illustration-variant="roomy">
    <p><strong>16 domande chiuse</strong> (1 punto ciascuna) e <strong>3 aperte</strong> (5 punti ciascuna). Argomenti delle lezioni, delle esercitazioni e della bibliografia. <strong>75 minuti</strong>; massimo <strong>31 punti</strong>.</p>
  </CvediCard>
  <CvediCard title="Esame orale" illustration="/images/flat/lesson-seminars.svg" illustration-variant="roomy">
    <p>Domande sulla <strong>bibliografia teorica</strong> ed eventuale discussione del progetto, se richiesta. Massimo <strong>31 punti</strong>.</p>
  </CvediCard>
</div>

---
layout: default
class: split-slide exam-section reading-slide
footer: "Organizzazione"
---

# Individuale e di gruppo

<div class="cvedi-grid two">
  <CvediCard title="Il gruppo" illustration="/images/flat/people.svg" illustration-variant="roomy">
    <p>Il progetto è valutato <strong>per gruppo</strong>. I gruppi sono composti da <strong>6 persone</strong> con competenze eterogenee; eventuali deroghe si discutono con il docente.</p>
  </CvediCard>
  <CvediCard title="La persona" illustration="/images/flat/person.svg" illustration-variant="roomy">
    <p>Scritto e orale sono <strong>individuali</strong>. I membri dello stesso gruppo possono iscriversi ad <strong>appelli diversi</strong>. Un’insufficienza nello scritto o nell’orale <strong>non richiede un nuovo progetto o approfondimento</strong>.</p>
  </CvediCard>
</div>
<p class="aside">Il voto del progetto viene comunicato <strong>prima dell’orale</strong>.</p>

---
layout: default
class: content-slide project-section reading-slide
footer: "Percorso di gruppo"
---

# Progetto

<p class="lead">Attività di gruppo: <strong>6 studenti</strong>, salvo eventuali adattamenti in base agli iscritti.</p>
<div class="cvedi-grid two">
  <CvediCard title="Obiettivo · WHAT IF?" illustration="/images/flat/idea.svg" illustration-variant="roomy">
    <p>Inventare un <strong>servizio del 2050</strong> basato sulle potenzialità future dell’AI e progettare il <strong>sito web responsive</strong> dell’organizzazione che lo offre.</p>
  </CvediCard>
  <CvediCard title="Scadenze" illustration="/images/flat/calendar.svg" illustration-variant="roomy">
    <p>Le scadenze saranno confermate per il 2026/27. La consegna finale è prevista <strong>una settimana prima dell’appello scritto</strong>.</p>
  </CvediCard>
</div>
<p class="aside"><SlideAction to="brief-progetto">Apri il brief di progetto</SlideAction></p>

---
layout: default
class: process-slide project-section
footer: "Percorso di gruppo"
---

# Progetto: fasi

<ProcessTimeline :steps="['Progetto di gruppo', 'Presentazioni e consegne in itinere', 'Discussione durante i workshop', 'Consegna finale']" />

---
layout: default
class: content-slide project-section reading-slide
footer: "Consegne"
---

# Progetto: consegna e scadenze

<p class="lead">Il form di consegna e le scadenze dei singoli appelli saranno <strong>pubblicati durante il corso</strong>.</p>
<div class="cvedi-grid two">
  <CvediCard title="Form di consegna" illustration="/images/flat/delivery.svg" illustration-variant="roomy">
    <p>Il collegamento verrà comunicato dal docente e <strong>inserito in questa presentazione</strong>.</p>
  </CvediCard>
  <CvediCard title="Appelli" illustration="/images/flat/calendar.svg" illustration-variant="roomy">
    <p>1 · 2 · 3 · 4 · 5 · 6</p>
    <p>Scadenze in aggiornamento.</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide project-section reading-slide
footer: "Percorso individuale"
---

# Approfondimento

<div class="cvedi-grid three">
  <CvediCard title="01 · Valutazione" illustration="/images/flat/document.svg" illustration-variant="roomy">
    <p>La valutazione dell’approfondimento è <strong>individuale</strong>.</p>
  </CvediCard>
  <CvediCard title="02 · Accesso all’orale" illustration="/images/flat/lesson-seminars.svg" illustration-variant="roomy">
    <p>La consegna preventiva dell’approfondimento <strong>non è richiesta</strong> per sostenere l’orale.</p>
  </CvediCard>
  <CvediCard title="03 · Migliorie" illustration="/images/flat/sliders.svg" illustration-variant="roomy">
    <p>È possibile apportare migliorie all’approfondimento.</p>
  </CvediCard>
</div>

<!--
Indicazioni della sorgente segnalate “in aggiornamento”.
-->

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
class: content-slide project-section reading-slide
footer: "Percorso individuale"
---

# Approfondimento: attività

<div class="cvedi-grid two">
  <CvediCard title="Obiettivo" illustration="/images/flat/document.svg" illustration-variant="roomy">
    <p>Stendere un documento che <strong>analizzi in dettaglio</strong> un argomento scelto.</p>
  </CvediCard>
  <CvediCard title="Consegna" illustration="/images/flat/delivery.svg" illustration-variant="roomy">
    <p>Prevista <strong>due settimane prima dell’appello scritto</strong>. Brief e richiesta dell’argomento sono <strong>in aggiornamento</strong> per il 2026/27.</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide project-section
footer: "Valutazione"
---

# Approfondimento

<p class="lead">Il voto dell’approfondimento deriva da <strong>un’unica valutazione</strong> della <strong>consegna finale</strong>.</p>

---
layout: default
class: list-slide dense-slide project-section reading-slide
footer: "Temi possibili"
---

# Approfondimenti: esempi

<p class="lead">Nuovi temi o approfondimenti dei contenuti del corso.</p>

<ul class="cvedi-list" role="list">
  <li><span><strong>Storia del design</strong>: continuità e cambiamenti nelle UI contemporanee</span></li>
  <li><span><strong>Design interculturale</strong>: simboli e convenzioni a confronto</span></li>
  <li><span><strong>Gestalt e gerarchia visiva</strong> nelle interfacce ricche di informazioni</span></li>
  <li><span><strong>Colore e tipografia</strong> per accessibilità e leggibilità</span></li>
  <li><span><strong>Griglie responsive</strong>: coerenza tra dispositivi ed ecosistemi</span></li>
  <li><span><strong>UI dei videogiochi</strong>: elementi diegetici e non diegetici a confronto</span></li>
  <li><span><strong>Test di usabilità</strong>: confronto tra metodi, risultati e limiti</span></li>
  <li><span><strong>Design Thinking e Lean UX</strong>: MVP, iterazioni e apprendimento</span></li>
</ul>

<!--
Proposte di approfondimento derivate dai capitoli del Manuale_booklet:
C02 — Storia del graphic design e delle interfacce;
C03 — Empathize, percezione e linguaggio visivo, composizione e gerarchia,
colore, tipografia, griglie e responsive, videogiochi, test e usabilità;
C04 — Integrazione di Design Thinking, Lean e UX, MVP e cicli iterativi.
Fonte: https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=198-1687
-->

---
layout: default
class: content-slide project-section reading-slide
footer: "Consegne"
---

# Approfondimento: consegna

<p class="lead">Il form di consegna e le scadenze dei singoli appelli saranno <strong>pubblicati durante il corso</strong>.</p>
<div class="cvedi-grid two">
  <CvediCard title="Form di consegna" illustration="/images/flat/delivery.svg" illustration-variant="roomy">
    <p>Il collegamento verrà comunicato dal docente e <strong>inserito in questa presentazione</strong>.</p>
  </CvediCard>
  <CvediCard title="Appelli" illustration="/images/flat/calendar.svg" illustration-variant="roomy">
    <p>1 · 2 · 3 · 4 · 5 · 6</p>
    <p>Scadenze in aggiornamento.</p>
  </CvediCard>
</div>

---
layout: default
class: content-slide exam-section reading-slide
footer: "Esame"
---

# Esame scritto in presenza

<div class="cvedi-grid two written-exam-cards">
  <CvediCard title="Struttura" illustration="/images/flat/document.svg" illustration-variant="roomy">
    <p><strong>16 domande chiuse</strong> da 1 punto ciascuna e <strong>3 domande aperte</strong> da 5 punti ciascuna. Argomenti delle lezioni, delle esercitazioni e della bibliografia teorica.</p>
  </CvediCard>
  <CvediCard title="Durata e sede" illustration="/images/flat/clock.svg" illustration-variant="roomy">
    <p><strong>75 minuti</strong>. L’esame si svolge nei laboratori informatici tramite la piattaforma <strong>Esami-Online</strong>.</p>
  </CvediCard>
</div>
<p class="aside">Punteggio massimo: <strong>31 (30 e lode)</strong>.</p>

---
layout: default
class: content-slide exam-section reading-slide
footer: "Esame"
---

# Esame orale

<p class="lead">Domande sulla <strong>bibliografia teorica</strong>.</p>
<CvediCard title="Eventuale discussione del progetto" illustration="/images/flat/lesson-seminars.svg" illustration-variant="roomy">
  <p>Se emergono criticità (o servono chiarimenti specifici), potrà essere richiesta <strong>dal gruppo o dai docenti</strong> una discussione sul progetto. Sarà comunicata <strong>con preavviso</strong> e fissata per consentire la presenza di <strong>tutto il gruppo</strong>.</p>
</CvediCard>
<p class="aside">Punteggio massimo: <strong>31 (30 e lode)</strong>.</p>

---
layout: default
class: book-slide exam-section reading-slide
footer: "Letture"
---

# Bibliografia

<div class="book-layout booklet-cover-layout">
<BookletPreview />
<CvediCard title="Comunicazione visiva e design delle interfacce">
  <p>Materiale teorico del corso e approfondimenti.</p>
  <p>Marco Cremaschi et al.</p>
  <span class="badge badge-primary">In riscrittura</span>
</CvediCard>
</div>

---
layout: default
class: content-slide exam-section reading-slide
footer: "Esame"
---

# Regole d’esame

<div class="cvedi-grid rules-grid">
  <CvediCard title="01 · Progetto">
    <p><strong>Non è necessario aver consegnato</strong> il progetto o l’approfondimento per sostenere scritto e orale.</p>
  </CvediCard>
  <CvediCard title="02 · Scritto">
    <p>Il voto può essere rifiutato <strong>entro 24 ore</strong> dalla pubblicazione, tramite apposito form. Una volta accettato, <strong>non può più essere rifiutato</strong>.</p>
  </CvediCard>
  <CvediCard title="03 · Orale">
    <p>Per sostenere l’orale è obbligatorio <strong>aver superato lo scritto</strong>.</p>
  </CvediCard>
  <CvediCard title="04 · Appelli">
    <p>Scritto e orale sono <strong>individuali</strong>; membri dello stesso gruppo possono iscriversi ad <strong>appelli differenti</strong>.</p>
  </CvediCard>
  <CvediCard title="05 · Discussione">
    <p>Se è richiesta una discussione del progetto, deve partecipare <strong>tutto il gruppo</strong>, anche in forma mista tra presenza e remoto.</p>
  </CvediCard>
</div>

---
layout: default
class: formula-slide exam-section reading-slide
footer: "Esame"
---

# Votazione

<p class="lead">Per completare l’esame è necessaria una <strong>votazione sufficiente</strong> in <strong>tutte e tre le parti</strong>.</p>
<div class="cvedi-grid formula-flow">
  <CvediCard title="1 · Punteggio intermedio">
    <div class="grade-fraction" role="math" aria-label="Punteggio intermedio uguale alla somma del voto dello scritto e del voto del progetto, oppure dell’approfondimento, divisa per due.">
      <div class="grade-numerator" aria-hidden="true"><span>Scritto</span><span>+</span><span class="grade-term">Progetto<span class="grade-alternative">oppure approfondimento</span></span></div>
      <div class="grade-denominator" aria-hidden="true">2</div>
    </div>
  </CvediCard>
  <svg class="formula-connector" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M4 20H34M24 10L34 20L24 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
  <CvediCard title="2 · Voto finale">
    <div class="grade-fraction" role="math" aria-label="Voto finale uguale alla somma del punteggio intermedio e del voto dell’orale, divisa per due.">
      <div class="grade-numerator" aria-hidden="true"><span>Punteggio intermedio</span><span>+</span><span>Orale</span></div>
      <div class="grade-denominator" aria-hidden="true">2</div>
    </div>
  </CvediCard>
</div>

---
layout: default
class: content-slide exam-section reading-slide
footer: "Appelli"
---

# Date d’esame

<p class="lead">Le date degli appelli 2026/27 <strong>saranno confermate</strong> dall’ateneo.</p>
<div class="cvedi-grid two">
  <CvediCard title="Appello I">
    <p>Data dello scritto e dell’orale da pubblicare.</p>
  </CvediCard>
  <CvediCard title="Appello II">
    <p>Data dello scritto e dell’orale da pubblicare.</p>
  </CvediCard>
</div>

---
layout: default
class: grade-slide history-section reading-slide
footer: "Dati storici · progetto e approfondimento"
---

# Progetti e approfondimenti

<GradeDistribution category="project" />

<!--
Nota metodologica: questa categoria unisce progetti e approfondimenti, come nei registri del corso.
Un voto per matricola in ogni registro; i valori sopra 30 sono nella fascia “30 o più”.
-->

---
layout: default
class: grade-slide history-section reading-slide
footer: "Dati storici · orale"
---

# Valutazioni orali

<GradeDistribution category="oral" />

<!--
Nota metodologica: le valutazioni con mezzi punti sono assegnate alla fascia corrispondente.
Un voto per matricola in ogni registro; i valori sopra 30 sono nella fascia “30 o più”.
-->

---
layout: default
class: grade-slide history-section reading-slide
footer: "Dati storici · scritto"
---

# Prove scritte

<GradeDistribution category="written" />

<!--
Nota metodologica: per il 2022/23 è considerato l’ultimo voto numerico disponibile tra gli appelli.
Assenze e ritiri sono esclusi. Un voto per matricola in ogni registro;
i valori sopra 30 sono nella fascia “30 o più”.
-->

---
layout: default
class: grade-slide history-section reading-slide
footer: "Dati storici · voto finale"
---

# Voto finale

<GradeDistribution category="final" />
<p class="grade-note">La distribuzione dei voti <strong>non indica il tasso di superamento</strong> dell’esame.</p>

<!--
Nota metodologica: sono inclusi solo i voti finali. Un voto per matricola in ogni registro;
i valori sopra 30 sono nella fascia “30 o più”.
-->

---
layout: default
class: grade-slide history-section reading-slide
footer: "Dati storici · voto finale"
---

# Voti finali: sei anni a confronto

<p class="grade-intro">Distribuzione percentuale dei voti finali per <strong>anno accademico</strong>.</p>
<GradeYearTable />

<!--
Nota metodologica: le percentuali sono calcolate separatamente per ogni anno.
Il registro 2025/26 è fotografato al 29 settembre 2026;
i registri possono includere esami di studenti iscritti in anni precedenti.
-->

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

---
layout: default
class: question-slide archive-section
footer: "Confronto"
---

# Argomenti da approfondire?

---
layout: default
class: content-slide archive-section reading-slide
footer: "Comunicazioni"
---

# Contatti

<p class="lead">Utilizzate il <strong>forum della piattaforma del corso</strong>: le risposte a quesiti di interesse comune possono essere utili a tutta la classe.</p>
<CvediCard title="Docenti" illustration="/images/flat/people.svg" illustration-variant="roomy">
  <p>Marco Cremaschi · Elia Guarnieri · Andrea Primo Pierotti</p>
</CvediCard>

---
layout: default
src: ./lezioni/00-brief-progetto.md
---

---
layout: default
src: ./lezioni/01-introduzione.md
---

---
layout: default
src: ./lezioni/03-storia-design.md
disabled: true
---

---
layout: default
class: closing-slide archive-section
---

<ClosingMetro />

# Domande?

<p>Comunicazione visiva e design delle interfacce · 2026/27</p>
