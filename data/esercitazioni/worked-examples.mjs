// Original worked examples: one small change, a visible result, a guided task.
// Each entry is inserted after its concept, followed by its runnable HTML.
export const workedExamples = [
  {
    id: 'spacingCompare', module: 5, after: 'Spazio: padding, margini e gap',
    title: 'Padding e gap', sources: ['spacing', 'gap'],
    observe: 'p-* separa il contenuto dal bordo; gap-* separa i figli.',
    task: 'Porta soltanto gap-2 a gap-6: che cosa cambia?',
    html: `<div class="grid items-start gap-6 sm:grid-cols-2">
  <section class="grid gap-2 bg-base-200 p-2">
    <p class="bg-base-100 p-2">p-2 · gap-2</p>
    <p class="bg-base-100 p-2">Secondo elemento</p>
  </section>
  <section class="grid gap-6 bg-base-200 p-6">
    <p class="bg-base-100 p-2">p-6 · gap-6</p>
    <p class="bg-base-100 p-2">Secondo elemento</p>
  </section>
</div>`,
  },
  {
    id: 'alignmentCompare', module: 5, after: 'Risultato: una riga flessibile',
    title: 'Distribuire lo spazio', sources: ['justify', 'flex'],
    observe: 'Gli elementi sono uguali; cambia la distribuzione dello spazio libero.',
    task: 'Sostituisci justify-center con justify-end.',
    html: `<div class="grid gap-6">
  <div class="flex flex-wrap justify-center gap-3 bg-base-200 p-4">
    <span>justify-center</span><span>14:00</span>
  </div>
  <div class="flex flex-wrap justify-between gap-3 bg-base-200 p-4">
    <span>justify-between</span><span>14:00</span>
  </div>
</div>`,
  },
  {
    id: 'wrappingItems', module: 5, after: 'Risultato: una riga flessibile',
    title: 'Far andare a capo', sources: ['wrap', 'flex'],
    observe: 'flex-wrap crea una nuova riga quando le basi dei tre elementi non entrano.',
    task: 'Togli flex-wrap e confronta le larghezze degli elementi.',
    html: `<div class="mx-auto flex max-w-xl flex-wrap gap-4 bg-base-200 p-4">
  <p class="basis-64 grow bg-base-100 p-4">Analisi</p>
  <p class="basis-64 grow bg-base-100 p-4">Prototipo</p>
  <p class="basis-64 grow bg-base-100 p-4">Verifica</p>
</div>`,
  },
  {
    id: 'gridSpans', module: 5, after: 'Risultato: struttura in colonne',
    title: 'Occupare più colonne', sources: ['grid', 'span'],
    observe: 'Grid crea tre colonne; col-span-2 assegna due colonne al contenuto.',
    task: 'Cambia col-span-2 in col-span-1 e osserva lo spazio libero.',
    html: `<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
  <header class="bg-base-200 p-4 sm:col-span-3">Laboratorio</header>
  <aside class="bg-base-200 p-4">Materiali</aside>
  <section class="bg-base-300 p-4 sm:col-span-2">Contenuto principale</section>
  <footer class="bg-base-200 p-4 sm:col-span-3">Contatti</footer>
</div>`,
  },
  {
    id: 'responsiveVisibility', module: 5, after: 'Risultato: viewport ampio e stretto',
    title: 'Cambiare con il viewport', sources: ['responsive', 'display'], comparison: true,
    observe: 'Sotto md compare il messaggio compatto; da md compaiono i dettagli.',
    task: 'Usa lg: al posto di md: e osserva il viewport da 780px.',
    html: `<section class="grid gap-4 bg-base-200 p-4">
  <h2 class="text-xl font-bold">Prossimo laboratorio</h2>
  <p>Giovedì, ore 14</p>
  <p class="md:hidden">Apri il programma per i dettagli.</p>
  <p class="hidden md:block">Aula 12 · porta computer e prototipo.</p>
</section>`,
  },
  {
    id: 'typeHierarchy', module: 5, after: 'Titolo e paragrafo',
    title: 'Costruire la gerarchia', sources: ['utilities'],
    observe: 'La seconda versione distingue titolo, testo e distanza fra i blocchi.',
    task: 'Togli font-bold: il titolo resta riconoscibile?',
    html: `<div class="grid gap-6 sm:grid-cols-2">
  <section class="bg-base-200 p-4">
    <h2 class="text-base font-normal">Materiali del laboratorio</h2>
    <p class="text-base">Leggi il brief e prepara una domanda.</p>
  </section>
  <section class="bg-base-200 p-4">
    <h2 class="text-2xl font-bold leading-tight">Materiali del laboratorio</h2>
    <p class="mt-4 text-base leading-relaxed">Leggi il brief e prepara una domanda.</p>
  </section>
</div>`,
  },
  {
    id: 'actionAndLink', module: 6, after: 'Le classi non cambiano la semantica',
    title: 'Azione o destinazione?', sources: ['button'],
    observe: 'Il button aggiorna lo stato; il link raggiunge il programma nello stesso documento.',
    task: 'Prova entrambi con Tab e Invio.',
    html: `<div class="grid gap-4">
  <div class="flex flex-wrap gap-4">
    <button type="button" class="btn btn-primary"
      onclick="document.getElementById('esito').textContent='Bozza salvata (demo).';">
      Salva la bozza
    </button>
    <a class="btn btn-outline" href="#programma">Vai al programma</a>
  </div>
  <output id="esito" role="status" aria-live="polite"></output>
  <h2 id="programma" class="text-xl font-bold">Programma: analisi e prototipo</h2>
</div>`,
  },
  {
    id: 'buttonEmphasis', module: 6, after: 'Button: risultato',
    title: 'Dare priorità a un’azione', sources: ['button'],
    observe: 'La base btn è comune; le varianti cambiano l’enfasi visiva.',
    task: 'Aggiungi btn-sm a tutti e confronta dimensione e priorità.',
    html: `<div class="flex flex-wrap items-center gap-4">
  <button type="button" class="btn btn-primary">Primario</button>
  <button type="button" class="btn btn-outline">Contorno</button>
  <button type="button" class="btn btn-ghost">Discreto</button>
  <button type="button" class="btn" disabled>Non disponibile</button>
</div>`,
  },
  {
    id: 'messageStates', module: 6, after: 'Alert: risultato',
    title: 'Spiegare tre stati', sources: ['alert', 'colors'],
    observe: 'Ogni messaggio nomina l’esito e l’eventuale passo successivo.',
    task: 'Leggi soltanto le parole: capisci lo stato senza il colore?',
    html: `<div class="grid gap-4">
  <div class="alert alert-info"><span>Informazione: il laboratorio inizia alle 14.</span></div>
  <div class="alert alert-warning"><span>Attenzione: restano due posti disponibili.</span></div>
  <div class="alert alert-success"><span>Conferma: il tuo posto è prenotato.</span></div>
</div>`,
  },
  {
    id: 'fieldHelp', module: 6, after: 'Form: risultato',
    title: 'Aiutare prima dell’errore', sources: ['input', 'validation'],
    observe: 'L’etichetta identifica il campo; aria-describedby collega l’aiuto.',
    task: 'Inserisci un indirizzo e verifica che il suggerimento resti visibile.',
    html: `<div class="grid max-w-xl gap-3">
  <label for="email-aiuto">Email per i materiali</label>
  <input id="email-aiuto" type="email" name="email"
    class="input w-full" autocomplete="email"
    aria-describedby="aiuto-email" placeholder="nome@esempio.it">
  <p id="aiuto-email">Usa un indirizzo che puoi consultare durante il corso.</p>
</div>`,
  },
  {
    id: 'exclusiveChoices', module: 6, after: 'Scelte: risultato',
    title: 'Una scelta o più scelte?', sources: ['fieldset', 'radio', 'checkbox'],
    observe: 'I radio con lo stesso name sono esclusivi; le checkbox sono indipendenti.',
    task: 'Cambia turno, poi seleziona entrambi i materiali.',
    html: `<div class="grid gap-6 sm:grid-cols-2">
  <fieldset class="fieldset text-base">
    <legend class="fieldset-legend text-base">Un solo turno</legend>
    <label><input type="radio" name="turno" class="radio" checked> Mattina</label>
    <label><input type="radio" name="turno" class="radio"> Pomeriggio</label>
  </fieldset>
  <fieldset class="fieldset text-base">
    <legend class="fieldset-legend text-base">Materiali desiderati</legend>
    <label><input type="checkbox" class="checkbox"> Slide</label>
    <label><input type="checkbox" class="checkbox"> Esercizi</label>
  </fieldset>
</div>`,
  },
  {
    id: 'tableStatuses', module: 6, after: 'Table: risultato',
    title: 'Leggere dati e stati', sources: ['table', 'badge'],
    observe: 'Le intestazioni spiegano le colonne; il badge aggiunge uno stato scritto.',
    task: 'Aggiungi una riga “Venerdì” con stato “In attesa”.',
    html: `<table class="table">
  <caption>Disponibilità dei laboratori</caption>
  <thead><tr><th scope="col">Giorno</th><th scope="col">Stato</th></tr></thead>
  <tbody>
    <tr><th scope="row">Mercoledì</th>
      <td><span class="badge badge-lg">Disponibile</span></td></tr>
    <tr><th scope="row">Giovedì</th>
      <td><span class="badge badge-lg badge-outline">Completo</span></td></tr>
  </tbody>
</table>`,
  },
  {
    id: 'faqChoices', module: 6, after: 'Disclosure: risultato aperto',
    title: 'Aprire solo ciò che serve', sources: ['collapse'],
    observe: 'Ogni summary apre la propria risposta e mantiene l’ordine del documento.',
    task: 'Apri entrambe le risposte con la tastiera, poi richiudile.',
    html: `<div class="grid gap-4 sm:grid-cols-2">
  <details class="collapse collapse-arrow bg-base-200">
    <summary class="collapse-title font-semibold">Che cosa porto?</summary>
    <div class="collapse-content"><p>Computer e prototipo da verificare.</p></div>
  </details>
  <details class="collapse collapse-arrow bg-base-200">
    <summary class="collapse-title font-semibold">Come consegno?</summary>
    <div class="collapse-content"><p>Carica HTML e CSS nella cartella del gruppo.</p></div>
  </details>
</div>`,
  },
  {
    id: 'composedEvent', module: 6, after: 'Risultato: due card in griglia',
    title: 'Comporre i componenti', sources: ['card', 'badge', 'button'],
    observe: 'Card raggruppa, badge comunica lo stato e il link indica la destinazione.',
    task: 'Passa da “Disponibile” a “Completo” e adatta l’azione.',
    html: `<article class="card card-border max-w-2xl bg-base-100">
  <div class="card-body">
    <span class="badge badge-lg badge-outline">Disponibile</span>
    <h2 class="card-title">Laboratorio di interfacce</h2>
    <p>Giovedì, ore 14 · analisi del prototipo in piccoli gruppi.</p>
    <div class="card-actions justify-end">
      <a class="btn btn-primary" href="#dettagli">Leggi i dettagli</a>
    </div>
    <p id="dettagli">Porta il prototipo e una domanda da verificare.</p>
  </div>
</article>`,
  },
  {
    id: 'inheritedSpacing', module: 7, after: 'Lo scope segue la struttura',
    title: 'Ereditare un valore', sources: ['variables'],
    observe: 'Il primo riquadro eredita 1.5rem; il secondo ridefinisce la variabile a 0.5rem.',
    task: 'Togli la ridefinizione locale e confronta i due spazi.',
    html: `<style>.spazio { padding: var(--spazio); }</style>
<div class="grid gap-6 sm:grid-cols-2" style="--spazio:1.5rem">
  <article class="spazio bg-base-200">
    <h2 class="text-xl font-bold">Valore ereditato</h2>
    <p>--spazio: 1.5rem</p>
  </article>
  <article class="spazio bg-base-200" style="--spazio:0.5rem">
    <h2 class="text-xl font-bold">Valore locale</h2>
    <p>--spazio: 0.5rem</p>
  </article>
</div>`,
  },
  {
    id: 'fallbackColor', module: 7, after: 'Un fallback per un valore assente',
    title: 'Usare un valore di riserva', sources: ['variables'],
    observe: 'Senza --superficie viene usato base-200; il secondo riquadro ha un valore locale.',
    task: 'Elimina --superficie dal secondo riquadro: quale fondo compare?',
    html: `<style>
  .campione { background: var(--superficie, var(--color-base-200)); }
</style>
<div class="grid gap-6 sm:grid-cols-2">
  <p class="campione p-6">Variabile assente: entra il fallback.</p>
  <p class="campione p-6" style="--superficie:var(--color-base-300)">
    Variabile presente: viene usato il valore locale.
  </p>
</div>`,
  },
  {
    id: 'semanticThemes', module: 7, after: 'Il tema daisyUI è un insieme di ruoli',
    title: 'Ruoli e colori fissi', sources: ['colors', 'themes'],
    observe: 'Le superfici base-* seguono il tema; bg-white e text-black restano uguali.',
    task: 'Sostituisci i colori fissi con bg-base-200 e text-base-content.',
    html: `<div class="grid gap-4 sm:grid-cols-2">
  <section data-theme="light" class="grid gap-4 bg-base-100 p-4">
    <p class="bg-base-200 p-4 text-base-content">Ruoli · tema chiaro</p>
    <p class="bg-white p-4 text-black">Colori fissi · bianco e nero</p>
  </section>
  <section data-theme="dark" class="grid gap-4 bg-base-100 p-4">
    <p class="bg-base-200 p-4 text-base-content">Ruoli · tema scuro</p>
    <p class="bg-white p-4 text-black">Colori fissi · bianco e nero</p>
  </section>
</div>`,
  },
  {
    id: 'themeSwitch', module: 7, after: 'Un controllo per il tema scuro',
    title: 'Provare il cambio di tema', sources: ['controller', 'colors'],
    observe: 'Il controllo cambia le variabili lette da superficie, testo e pulsante.',
    task: 'Seleziona e deseleziona “Tema scuro”: i contenuti cambiano?',
    html: `<div class="grid gap-6 rounded-box bg-base-200 p-6 text-base-content">
  <label class="flex items-center gap-3">
    <input type="checkbox" value="dark" class="checkbox theme-controller">
    Tema scuro
  </label>
  <h2 class="text-xl font-bold">Lo stesso laboratorio</h2>
  <p>Contenuto e azioni mantengono il proprio significato.</p>
  <button type="button" class="btn btn-primary w-fit">Iscriviti</button>
</div>`,
  },
  {
    id: 'radiusCompare', module: 7, after: 'Personalizzare la geometria',
    title: 'Cambiare la geometria', sources: ['themes', 'card'],
    observe: 'La struttura card è identica; --radius-box cambia gli angoli del contenitore.',
    task: 'Prova 0.5rem al posto di 1rem.',
    html: `<div class="grid gap-6 sm:grid-cols-2">
  <article class="card card-border bg-base-100" style="--radius-box:0rem">
    <div class="card-body"><h2 class="card-title">Raggio: 0rem</h2>
      <p>Contenuto e gerarchia restano gli stessi.</p></div>
  </article>
  <article class="card card-border bg-base-100" style="--radius-box:1rem">
    <div class="card-body"><h2 class="card-title">Raggio: 1rem</h2>
      <p>Contenuto e gerarchia restano gli stessi.</p></div>
  </article>
</div>`,
  },
]
