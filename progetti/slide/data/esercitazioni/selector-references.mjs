const mdn = name => `https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/${name}`

/** Use the same identity, example and characteristics layout as the HTML tags. */
export const basicSelectors = {
  kind: 'tag-reference', arrangement: 'grid', items: [
    { tags: ['h1, p, a'], title: 'Tipo e lista', url: mdn('Type_selectors'),
      example: 'h1, p, a { font-size: 2em; }',
      traits: ['La regola si applica a tutti gli elementi <h1>, <p> e <a>. La virgola raggruppa i selettori.'] },
    { tags: ['.classe1'], title: 'Classe', url: mdn('Class_selectors'),
      example: '.classe1 { ... }',
      traits: ['La regola si applica agli elementi con `class="classe1"`.'] },
    { tags: ['#identificatore1'], title: 'ID', url: mdn('ID_selectors'),
      example: '#identificatore1 { ... }',
      traits: ['La regola si applica all’elemento con `id="identificatore1"`.'] },
    { tags: ['h1#identificatore2'], title: 'Tipo e ID', url: mdn('ID_selectors'),
      example: 'h1#identificatore2 { ... }',
      traits: ['La regola si applica all’elemento <h1> con `id="identificatore2"`.'] },
  ],
}

const reference = (selector, title, page, example, ...traits) => ({ tags: [selector], title, url: mdn(page), example, traits })

/** Each original context becomes one page; repeated figure summaries are folded in. */
export const selectorContexts = {
  58: { kind: 'tag-reference', arrangement: 'grid', items: [
    reference('#contenitore p', 'Discendente', 'Descendant_combinator', '#contenitore p { color: white; }',
      'Seleziona gli elementi <p> discendenti dell’antenato con `id="contenitore"`, a qualsiasi livello.'),
    reference('#box > p', 'Figlio diretto', 'Child_combinator', '#box > p { color: white; }',
      'Seleziona gli elementi <p> figli diretti dell’elemento padre con `id="box"`.'),
  ] },
  59: { kind: 'tag-reference', arrangement: 'grid', items: [
    reference('h1 + h2', 'Fratello adiacente', 'Next-sibling_combinator', 'h1 + h2 { color: white; }',
      'Seleziona l’elemento <h2> immediatamente dopo un <h1>, con lo stesso elemento padre.'),
    reference('h1 ~ h2', 'Fratelli successivi', 'Subsequent-sibling_combinator', 'h1 ~ h2 { color: white; }',
      'Seleziona tutti gli elementi <h2> dopo un <h1>, con lo stesso elemento padre, anche se non sono adiacenti.'),
  ] },
  60: { kind: 'tag-reference', arrangement: 'rows', items: [
    reference('p:first-child', 'Primo figlio', ':first-child', 'p:first-child { color: white; }',
      'Seleziona un <p> se è il primo figlio del proprio elemento padre.'),
    reference('p:nth-child(2)', 'Posizione tra i figli', ':nth-child', 'p:nth-child(2) { color: black; }',
      'Seleziona un <p> se è il secondo figlio. `:nth-child(n)` conta tutti gli elementi fratelli.'),
    reference(':not(p)', 'Esclusione', ':not', ':not(p) { color: white; }',
      'Seleziona gli elementi che non sono <p>. `:not(selector)` esclude il selettore indicato.'),
  ] },
  61: { kind: 'tag-reference', arrangement: 'rows', items: [
    reference('p::first-letter', 'Prima lettera', '::first-letter', 'p::first-letter { color: white; }',
      'Formatta la prima lettera dei paragrafi <p>.'),
    reference('p::after', 'Contenuto dopo', '::after', 'p::after {\n  content: "contenuto"; color: white;\n}',
      'Genera il testo “contenuto” dopo il contenuto di ogni <p>, con `color: white`.'),
    reference('p::before', 'Contenuto prima', '::before', 'p::before {\n  content: "contenuto"; color: white;\n}',
      'Genera il testo “contenuto” prima del contenuto di ogni <p>, con `color: white`.'),
  ] },
  62: { kind: 'tag-reference', arrangement: 'grid', items: [
    reference('a[rel]', 'Presenza', 'Attribute_selectors', 'a[rel] { background-color: yellow; }',
      'Seleziona gli <a> con l’attributo `rel`, indipendentemente dal suo valore.'),
    reference('a[rel=nofollow]', 'Valore esatto', 'Attribute_selectors', 'a[rel=nofollow] { background-color: red; }',
      'Seleziona gli <a> con `rel="nofollow"`: il valore deve coincidere esattamente.'),
    reference('a[title~=notizie]', 'Parola', 'Attribute_selectors', 'a[title~=notizie] { color: white; }',
      'Seleziona gli <a> il cui `title` contiene la parola “notizie”, come <a title="Ultime notizie">.'),
    reference('a[rel*=no]', 'Sottostringa', 'Attribute_selectors', 'a[rel*=no] { color: white; }',
      'Seleziona gli <a> il cui `rel` contiene la stringa “no”, come `rel="nofollow"` o `rel="noreferrer"`.'),
  ] },
  63: { kind: 'tag-reference', items: [
    reference('p, div, a.class1', 'Lista di selettori', 'Selector_list', 'p, div, a.class1 {\n  background-color: yellow;\n}',
      'La regola si applica a tutti i <p>, a tutti i <div> e agli <a> con `class="class1"`.',
      'La virgola raggruppa selettori. Lo spazio indica invece una relazione di discendenza.'),
  ] },
  64: { kind: 'tag-reference', items: [{
    tags: ['/* … */'], title: 'Commento CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Comments',
    example: '/*Commento nei CSS*/\n\n/*Ad esempio, posso utilizzarlo per segnalare che qui iniziano i css del menù*/\n\n/*MENU*/',
    traits: ['Delimita un commento con `/*` e `*/`.', 'Può spiegare il codice o segnalare l’inizio di una sezione, come il menù.'],
  }] },
}
