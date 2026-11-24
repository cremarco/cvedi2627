import { introFragments, introCommands } from './tailwind-intro.mjs'

export const themeTitle = 'Temi con Tailwind CSS'
export const themeSlug = 'temi-tailwind-css'
export const themeRevision = 'tailwind-theme-2026-11'

const colorSpec = 'https://www.w3.org/TR/css-color-4/'
export const themeSources = {
  variables: ['MDN · dichiarare le custom properties', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties#declaring_custom_properties'],
  fallback: ['MDN · valori non validi nelle custom properties', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties#invalid_custom_properties'],
  color: ['MDN · notazioni colore in CSS', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value'],
  displayGamut: ['MDN · gamut', 'https://developer.mozilla.org/en-US/docs/Glossary/Gamut'],
  hsl: ['MDN · luminosità in HSL', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hsl'],
  perceptualLightness: ['MDN · oklch()', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch'],
  lightnessScale: ['MDN · variare la chiarezza in OKLCH', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch#adjusting_the_brightness_of_a_color'],
  oklch: ['W3C · Oklab e OKLCH', `${colorSpec}#ok-lab`],
  arbitrary: ['Tailwind · valori arbitrari', 'https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values'],
  arbitraryProperties: ['Tailwind · proprietà arbitrarie', 'https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties'],
  customCSS: ['Tailwind · usare CSS personalizzato', 'https://tailwindcss.com/docs/adding-custom-styles#using-custom-css'],
  customUtilities: ['Tailwind · creare utility', 'https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities'],
  preflight: ['Tailwind · Preflight', 'https://tailwindcss.com/docs/preflight'],
  cssLayer: ['MDN · @layer', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer'],
  cascadeLayers: ['MDN · ordine dei layer', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers#determining_the_precedence_based_on_the_order_of_layers'],
  theme: ['Tailwind · variabili del tema', 'https://tailwindcss.com/docs/theme'],
  namespaces: ['Tailwind · namespace del tema', 'https://tailwindcss.com/docs/theme#theme-variable-namespaces'],
  inline: ['Tailwind · riferimenti ad altre variabili', 'https://tailwindcss.com/docs/theme#referencing-other-variables'],
  cli: ['Tailwind · CLI', 'https://tailwindcss.com/docs/installation/tailwind-cli'],
  tokens: ['Adobe Spectrum · design token', 'https://spectrum.adobe.com/page/design-tokens/'],
}

const spacingHTML = `<p class="paragraph">Default spacing</p>
<div class="parent">
  <p class="paragraph">Compact spacing</p>
</div>`
const spacingCSS = `:root {
  --section-space: 2rem;
}
.parent {
  --section-space: 1rem;
}
.paragraph {
  padding-block: var(--section-space);
}`
const fallbackHTML = `<p class="paragraph">Default</p>
<p class="paragraph compact">Compact</p>
<p class="paragraph invalid">Invalid</p>`
const fallbackCSS = `.paragraph {
  padding-block: 3rem;
  padding-block: var(--local-space, 2rem);
}
.compact {
  --local-space: 1rem;
}
.invalid {
  --local-space: red;
}`

const blue = 'oklch(49.931% 0.09866 250.433)'
const p3 = ['rgb(0 255 0)', 'color(display-p3 0 1 0)']
const hsl = ['hsl(60 100% 50%)', 'hsl(240 100% 50%)']
const backgroundRule = (name, color) => `.${name} {\n  background: ${color};\n}`
function colorPairs(samples) {
  const pairs = samples.map(([name, label, color]) => {
    const source = backgroundRule(name, color)
    const result = `<style>${source}</style><div class="demo-color-swatch"><span>${label}</span><span class="${name}" aria-hidden="true"></span></div>`
    return { source, result }
  })
  return { pairs }
}
function swatches(classes, labels, colors) {
  const source = classes.map((name, index) => backgroundRule(name, colors[index])).join('\n\n')
  const cells = classes.map((name, index) => `<div><span class="${name}"></span><p>${labels[index]}</p></div>`)
  return { source, result: `<style>${source}</style><div class="demo-swatches">${cells.join('')}</div>`, wideCode: true }
}

const arbitraryExamples = `<article class="bg-[#336699]">
  Open Workshop
</article>

<article class="bg-[oklch(55%_0.11_250)]">
  Open Workshop
</article>

<article class="[--card-bg:#336699]
  bg-(--card-bg)">
  Open Workshop
</article>`
const directTheme = `@theme {
  --color-brand: ${blue};
  --radius-card: 0.875rem;
}`
export const baseTheme = `:root {
  --blue-200: oklch(82% 0.08 250);
  --blue-300: oklch(75% 0.10 250);
  --blue-700: oklch(55% 0.11 250);
  --blue-800: oklch(47% 0.11 250);

  --ui-surface: white;
  --ui-ink: #182433;
  --ui-action: var(--blue-700);
  --ui-on-action: white;
  --ui-action-hover: var(--blue-800);
}`
const roleUtilities = `@theme inline {
  --color-surface: var(--ui-surface);
  --color-ink: var(--ui-ink);
  --color-action: var(--ui-action);
  --color-on-action: var(--ui-on-action);
  --color-action-hover: var(--ui-action-hover);
}`
const openingCard = introFragments.first
  .replace('Laboratorio aperto', 'Open Workshop')
  .replace('Giovedì, ore 14', 'Thursday at 2 pm')
export const dark = `[data-theme="dark"] {
  --ui-surface: #182433;
  --ui-ink: white;
  --ui-action: var(--blue-300);
  --ui-on-action: #182433;
  --ui-action-hover: var(--blue-200);
}`
const themeCard = `<article class="rounded-card p-3
  bg-surface text-ink">
  <h2>Open Workshop</h2>
  <p id="sessions">Thursday at 2 pm</p>
  <a href="#sessions" class="mt-2 py-2
    inline-block rounded-md bg-action px-3
    text-on-action hover:bg-action-hover
    outline-action outline-offset-2
    focus-visible:outline-2">
    View sessions</a>
</article>`

const componentLayer = `@layer components {
  .workshop-card {
    background-color: var(--color-brand);
    color: white;
    padding: 1rem;
    border-radius: 1rem;
  }
}`

export const themeExampleStyles = `@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities) source(none);
@source "./progetti/slide/data/esercitazioni/tailwind-theme.mjs";

${[directTheme, baseTheme, roleUtilities, dark].join('\n\n')}`

export const themeExamples = {
  opening: { source: openingCard, result: openingCard },
  notations: colorPairs([
    ['hex', 'HEX', '#336699'],
    ['rgb', 'RGB', 'rgb(51 102 153)'],
    ['hsl', 'HSL', 'hsl(210 50% 40%)'],
    ['oklch', 'OKLCH', blue],
  ]),
  gamut: swatches(['srgb', 'p3'], ['sRGB green', 'Display P3 green'], p3),
  hsl: swatches(['yellow', 'blue'], ['Yellow · L = 50%', 'Blue · L = 50%'], hsl),
  scale: colorPairs([43, 53, 63, 73].map((lightness, index) => [
    `tone-${index + 1}`, `L = ${lightness}%`, `oklch(${lightness}% 0.12 250)`,
  ])),
  card: {
    source: `<div>
  <article class="bg-surface text-ink">
    <!-- ... -->
  </article>
</div>

<div data-theme="dark">
  <article class="bg-surface text-ink">
    <!-- ... -->
  </article>
</div>`,
    result: `<div class="demo-cards">
      <section aria-label="Light theme"><p class="native-label">Light</p>${themeCard}</section>
      <section aria-label="Dark theme"><p class="native-label">Dark</p><div data-theme="dark">${themeCard.replace('id="sessions"', 'id="sessions-dark"').replace('#sessions', '#sessions-dark')}</div></section>
    </div>`,
  },
  'layer-priority': {
    source: componentLayer,
    result: `<style>${componentLayer}</style>
      <div class="grid w-full gap-3">
        <section><p class="native-label">Component default</p>
          <article class="workshop-card">Open Workshop</article></section>
        <section><p class="native-label">With rounded-none</p>
          <article class="workshop-card rounded-none">Open Workshop</article></section>
      </div>`,
  },
}

const paragraph = (text, bullet = false) => ({
  text: text.replaceAll('`', ''),
  runs: text.split(/(`[^`]+`)/g).filter(Boolean).map(run => run.startsWith('`')
    ? { text: run.slice(1, -1), mono: true }
    : { text: run }),
  bullet,
})
const copy = (...paragraphs) => ({ kind: 'text', paragraphs: paragraphs.map(text => paragraph(text)) })
const fallbackExplanation = copy(
  'Il fallback di `var()` si usa se manca un valore da sostituire. Per una variabile non registrata succede se è assente, è impostata a `initial` o è coinvolta in un ciclo.',
  '«Default» usa il fallback di `2rem`. «Compact» usa il valore di `1rem`.',
  'In «Invalid» `var()` restituisce `red`, un valore inadatto a `padding-block`. L’errore emerge dopo la cascata.',
  'Il browser ignora il fallback di `2rem` e il valore precedente di `3rem`. Usa `initial` (`0`) per `padding-block`, oppure `inherit` per una proprietà ereditabile.',
)
for (const run of fallbackExplanation.paragraphs.at(-1).runs) run.bold = true
const list = (...items) => ({ kind: 'text', paragraphs: items.map(text => paragraph(text, true)) })
const code = text => ({ kind: 'code', text })
const oklchSyntax = [
  { text: 'oklch(' },
  { text: '55%', label: 'L' },
  { text: ' ' },
  { text: '0.11', label: 'C' },
  { text: ' ' },
  { text: '250', label: 'H' },
  { text: ')' },
]
const source = id => ({ id, title: themeSources[id][0], url: themeSources[id][1] })
const slide = (title, blocks, keys, kind = 'content', showSources = true) => ({ title, kind, blocks, sources: keys.map(source), showSources })
const reading = (title, paragraphs, ...keys) => slide(title, [copy(...paragraphs)], keys)
const preview = id => ({
  kind: 'native', example: `tailwind-theme:${id}`,
  ...(id === 'card' ? { caption: 'Il tema Dark è applicato al contenitore della seconda scheda.', showHint: false } : { caption: '' }),
})
const example = (title, id, explanation, ...keys) => slide(title, [copy(explanation), preview(id)], keys)
const divider = (title, ...keys) => slide(title, [], keys, 'divider', false)
const syntax = (title, text, snippet, ...keys) => slide(title, [copy(text), code(snippet)], keys)
const table = (rows, widths, codeColumns = []) => ({ kind: 'table', rows, widths, codeColumns })
const displayedSourceURLs = new Set()

export const themeSlides = [
  slide(themeTitle, [], [], 'cover'),
  slide(themeTitle, [list(
    'Custom properties CSS', 'Il colore in CSS', 'Layer CSS', 'Il tema',
  )], ['theme'], 'content', false),
  slide('La scheda del laboratorio', [copy(
    'La classe `bg-emerald-50` sceglie un colore della palette di Tailwind.',
    'Ma se noi volessimo un colore che non è presente nella palette di Tailwind?',
  ), preview('opening')], ['theme'], 'content', false),
  divider('Custom properties CSS', 'variables'),
  { ...slide('Dichiarare e usare una variabile', [copy(
    'Il nome di una custom property inizia con due trattini. Qui `--section-space` vale `2rem`. La dichiarazione in `:root` rende quel valore disponibile in tutta la pagina.',
    'Il nome della variabile si passa a `var()`. La regola `.section` legge il valore.',
  ), code(`:root {
  --section-space: 2rem;
}

.section {
  padding-block: var(--section-space);
}`)], ['variables']), layout: 'columns' },
  { ...slide('Ereditarietà delle custom properties', [copy(
    'Il paragrafo annidato è figlio di `.parent`. Il genitore imposta la variabile a `1rem` e il figlio eredita quel valore.',
    'Il paragrafo esterno eredita `2rem` da `:root`. La regola `.paragraph` è la stessa e `var()` legge il valore disponibile su ciascun elemento.',
    'Se il figlio dichiara un valore proprio, usa quello.',
  ), { kind: 'code-group', fileHeaders: true, files: [
    { label: 'index.html', text: spacingHTML },
    { label: 'styles.css', text: spacingCSS },
  ] }], ['variables']), layout: 'columns' },
  { ...slide('Valore di fallback', [fallbackExplanation, { kind: 'code-group', fileHeaders: true, files: [
    { label: 'index.html', text: fallbackHTML },
    { label: 'styles.css', text: fallbackCSS },
  ] }], ['fallback']), layout: 'columns' },
  divider('Il colore in CSS', 'oklch'),
  example('Notazioni colore', 'notations', 'HEX e RGB scrivono gli stessi canali sRGB. HSL esprime quel blu con tinta, saturazione e luminosità. Il valore OKLCH è arrotondato.', 'color'),
  slide('sRGB e Display P3', [copy(
    'Il gamut è l’insieme dei colori che uno schermo può riprodurre. Display P3 comprende tutti i colori di sRGB e si estende oltre, per esempio verso verdi più saturi.',
    'Il verde Display P3 dell’esempio è fuori dal gamut sRGB. Uno schermo limitato a sRGB lo mostra con un colore approssimato, che può sembrare uguale all’altro verde. Uno schermo che copre Display P3 può mostrare la differenza.',
  ), preview('gamut')], ['displayGamut']),
  slide('La luminosità in HSL', [copy(
    'In HSL, `L` è la media tra il canale RGB più alto e quello più basso. Nel giallo e nel blu puri questi estremi sono `100%` e `0%`, quindi in entrambi i casi `L = 50%`.',
  ), preview('hsl')], ['hsl']),
  { ...slide('Leggere OKLCH', [copy(
    'Il giallo appare più chiaro del blu perché contiene rosso e verde, a cui l’occhio è più sensibile. OKLCH, derivato da Oklab, rappresenta questa differenza in `L`, che vale circa `97%` per il giallo e `45%` per il blu.',
    '`L` indica la chiarezza percepita, `C` la distanza da un grigio di pari chiarezza (croma) e `H` l’angolo della tinta.',
    'OKLCH descrive anche colori oltre sRGB. La resa dipende dal gamut dello schermo.',
  ), { kind: 'annotated-code', text: oklchSyntax.map(segment => segment.text).join(''), segments: oklchSyntax }], ['perceptualLightness']), layout: 'columns' },
  example('Una scala con passi di chiarezza', 'scale', 'La chiarezza `L` aumenta di 10 punti alla volta, con croma e tinta fissi. Per scrivere gli stessi colori in HEX serve ricalcolare i canali sRGB di ogni campione.', 'lightnessScale'),
  divider('Layer CSS', 'cssLayer'),
  slide('A cosa servono i layer CSS', [copy(
    'I layer raggruppano le regole CSS. Si possono separare, per esempio, il reset iniziale, gli stili dei componenti e le utility.',
    'Con `@layer` si stabilisce quali gruppi hanno la precedenza. Questo aiuta a integrare librerie e CSS del progetto senza dover aumentare la specificità dei selettori a ogni conflitto.',
  ), code('@layer reset, components, utilities;')], ['cssLayer']),
  slide('I layer CSS in Tailwind', [copy('L’import di Tailwind dichiara i layer in quest’ordine. Fra dichiarazioni normali della stessa origine, il layer successivo ha la precedenza.'), table([
    ['Layer', 'Che cosa contiene'],
    ['theme', 'Variabili del tema, come colori, font e spaziature'],
    ['base', 'Preflight e stili predefiniti degli elementi HTML'],
    ['components', 'Classi riusabili che possono essere modificate dalle utility'],
    ['utilities', 'Regole per le utility, come p-4 e rounded-none'],
  ], [26, 74], [0])], ['customCSS', 'preflight']),
  syntax('Stili di base per gli elementi HTML', 'Con `@layer base` si definisce lo stile predefinito di un elemento HTML in tutto il sito.', `@layer base {
  h1 {
    color: var(--color-emerald-700);
  }
}`, 'customCSS'),
  slide('L’ordine dei layer', [copy(
    'L’ordine si fissa quando i layer vengono dichiarati per la prima volta. Per dichiarazioni normali della stessa origine, il layer dichiarato dopo ha la precedenza, anche se il suo selettore è meno specifico.',
    'Tailwind dichiara `utilities` dopo `components`. Quando la scheda ha entrambe le classi, `rounded-none` imposta il raggio al posto di `workshop-card`.',
  ), preview('layer-priority')], ['customCSS', 'cascadeLayers']),
  { ...slide('CSS fuori dai layer', [copy(
    'Quando due dichiarazioni normali della stessa origine impostano la stessa proprietà sullo stesso elemento, quella fuori dai layer ha la precedenza. Il browser confronta i layer prima della specificità.',
    'Nell’esempio, un pulsante con `rounded-none` mantiene il raggio di `8px` perché la regola `button` è fuori dai layer.',
  ), code(`button {
  border-radius: 8px;
}

@layer utilities {
  .rounded-none {
    border-radius: 0;
  }
}`)], ['customCSS', 'cascadeLayers']), layout: 'columns' },
  { ...slide('Creare una utility con @utility', [
    copy('Tailwind inserisce le classi definite con `@utility` nel layer `utilities`. Si possono usare da sole o con varianti come `hover:` e `md:`. Nell’esempio, `md:reading-width` limita la larghezza del testo al breakpoint `md` e oltre.'),
    { kind: 'code-group', fileHeaders: true, files: [
      { label: 'CSS · input.css', text: `@import "tailwindcss";

@utility reading-width {
  max-inline-size: 65ch;
}` },
      { label: 'HTML · index.html', text: `<p class="md:reading-width">
  Find your next workshop.
</p>` },
    ] },
  ], ['customUtilities']), layout: 'code-columns' },
  divider('Il tema', 'theme'),
  { ...slide('Valori personalizzati nelle utility', [copy(
    'Per usare un colore fuori dalla palette, una possibilità è passarlo direttamente all’utility tra parentesi quadre, come in `bg-[#336699]`.',
    'Una funzione CSS può stare dentro le stesse parentesi. In `oklch()`, gli underscore rappresentano gli spazi fra gli argomenti.',
    '`[--card-bg:#336699]` dichiara una custom property sulla scheda. `bg-(--card-bg)` la legge ed equivale a `bg-[var(--card-bg)]`.',
  ), code(arbitraryExamples)], ['arbitrary', 'arbitraryProperties']), layout: 'columns' },
  reading('Il tema in Tailwind CSS', [
    'Il tema raccoglie valori riusabili come colori, font e raggi degli angoli. Tailwind include un tema predefinito che fornisce valori a classi come `bg-emerald-50`.',
    'Se il colore della scheda serve in più punti, si può aggiungere al tema con `@theme` e dargli un nome. Il colore diventa così disponibile nelle utility del progetto.',
  ], 'theme'),
  reading('I namespace di @theme', [
    'Una custom property dichiarata in `:root` si può leggere con `var()`. Le variabili dichiarate in `@theme`, al livello principale del foglio, definiscono anche quali utility Tailwind può generare.',
    'Il namespace è il prefisso della variabile. Per colori e raggi indica la famiglia di utility, mentre la parte restante del nome identifica il valore da usare.',
    'In `--color-brand`, il prefisso `--color-` rende `brand` disponibile per sfondi, testi e bordi (`bg-brand`, `text-brand`, `border-brand`). Con `--radius-card`, il prefisso `--radius-` rende disponibile `rounded-card`.',
  ], 'theme', 'namespaces'),
  { ...slide('Definire e usare le utility del tema', [
    copy('Dopo l’import di Tailwind, `@theme` definisce un colore e un raggio. Nell’HTML, `bg-brand` applica il colore allo sfondo e `rounded-card` imposta il raggio degli angoli.'),
    { kind: 'code-group', fileHeaders: true, files: [
      { label: 'CSS · input.css', text: `@import "tailwindcss";\n\n${directTheme}` },
      { label: 'HTML · index.html', text: `<article class="rounded-card p-4\n  bg-brand text-white">\n  Open Workshop\n</article>` },
    ] },
  ], ['theme', 'namespaces']), layout: 'code-columns-wide-first' },
  { ...slide('Dalla palette alle utility', [
    copy('La palette e i ruoli si definiscono in `:root`. Con `@theme inline`, le variabili dei ruoli si collegano al namespace `--color-` e diventano disponibili nelle utility di Tailwind.'),
    { kind: 'code-group', fileHeaders: true, files: [
      { label: 'CSS · palette and roles', text: baseTheme },
      { label: 'CSS · theme utilities', text: roleUtilities },
    ] },
  ], ['tokens', 'inline']), layout: 'code-columns' },
  { ...slide('Il tema Dark', [
    copy('Il selettore `[data-theme="dark"]` assegna i valori del tema Dark al contenitore. La scheda al suo interno li eredita e le utility `bg-surface` e `text-ink` li usano per lo sfondo e il testo.'),
    { kind: 'code-group', fileHeaders: true, files: [
      { label: 'CSS · input.css', text: dark },
      { label: 'HTML · index.html', text: `<div data-theme="dark">
  <article class="bg-surface text-ink">
    <h2>Open Workshop</h2>
  </article>
</div>` },
    ] },
  ], ['variables', 'inline']), layout: 'code-columns' },
  example('Due temi, le stesse classi', 'card', 'Le due schede usano `bg-surface` e `text-ink`. Il primo contenitore eredita i valori da `:root`. Sul secondo, `data-theme="dark"` ridefinisce i valori che la scheda eredita.', 'inline'),
  slide('Esercizio', [copy('Riprendi il layout finale della quinta esercitazione. Usa le due tavole successive per conservare contenuti, proporzioni e ordine delle regioni da mobile a desktop.'), list(
    'Scrivi il tema in `input.css`',
    'Nel tema associa i colori OKLCH a ruoli come `--ui-surface`, `--ui-ink` e `--ui-action`',
    'Collega le variabili a `@theme inline` e usa le utility corrispondenti nei punti in cui quei ruoli ricorrono',
    'Definisci la variante Dark cambiando i valori dei ruoli. Applicala con `data-theme="dark"` sul contenitore e mantieni le utility di layout della quinta esercitazione',
  ), { kind: 'code-group', files: [{ label: 'Ricorda di lanciare il comando', text: introCommands.watch }] }], ['theme', 'inline', 'cli'], 'content', false),
  { ...slide('Layout di riferimento · desktop', [{
    kind: 'figure', src: '/images/esercitazioni/responsive-layout-desktop-en.svg',
    alt: 'Tavola desktop con testata, due voci laterali, tre regioni numerate e un’immagine.',
    caption: 'Conserva le proporzioni della tavola. La linea tratteggiata indica il limite della viewport.',
  }], ['theme'], 'content', false), layout: 'figure' },
  { ...slide('Layout di riferimento · mobile', [{
    kind: 'figure', src: '/images/esercitazioni/responsive-layout-mobile-en.svg',
    alt: 'Tavola mobile con testata, due voci, immagine e regioni da 1 a 3 in sequenza.',
    caption: 'La parte destra della tavola prosegue il flusso della parte sinistra.', showDialogTitle: false,
  }], ['theme'], 'content', false), layout: 'figure' },
  slide('Fine esercitazione 06', [], ['theme'], 'closing', false),
].map((entry, index) => {
  const sources = entry.showSources === false ? entry.sources : entry.sources.map(source => {
    if (displayedSourceURLs.has(source.url)) return { ...source, visible: false }
    displayedSourceURLs.add(source.url)
    return source
  })
  return { ...entry, sources, number: index + 1, sourceSlide: null, sourceKind: 'official-docs', revision: themeRevision, part: 1, parts: 1 }
})
