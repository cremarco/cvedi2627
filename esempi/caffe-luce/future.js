/* Le sei direzioni sono scenari nel browser, con contenuti del bar invariati.
 * Nessuna richiesta AI, dato commerciale aggiunto o misurazione energetica.
 */
(function () {
  'use strict';

  const FUTURES = new Set(['adattabile']);
  const STORAGE_KEY = 'caffe-luce-future-v2';
  const CONTENT = window.CAFFE_CONTENT;
  const PRODUCTS = CONTENT.highlights.map(function (product) { return { id: product.id, name: product.title, detail: product.detail }; });
  const READINGS = [
    { id: 'vicino', label: 'Da vicino', size: 16, weight: 400 },
    { id: 'comoda', label: 'Comoda', size: 20, weight: 500 },
    { id: 'lontano', label: 'Da lontano', size: 24, weight: 650 }
  ];
  let preferences = readPreferences();
  let cafe;
  let loadPictures;
  let section;
  let heading;
  let description;
  let controls;
  let result;
  let status;
  let activeStyle;
  let activation = 0;

  function readPreferences() {
    try {
      const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
      return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
    } catch (reason) {
      return {};
    }
  }

  function savePreference(key, value) {
    preferences[key] = value;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (reason) {
      // Il sito funziona anche quando il browser limita lo storage di file://.
    }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function idOf(style) {
    return typeof style === 'string' ? style : style && style.id;
  }

  function validProduct(value, fallback) {
    return PRODUCTS.some(function (product) { return product.id === value; }) || (value === 'hours' && ['locale', 'contatti'].includes(cafe.dataset.page)) ? value : fallback;
  }

  function announce(text) {
    status.textContent = text;
  }

  function titledOutput(title, detail, className) {
    const output = element('div', className || 'future-selection-output');
    output.append(element('h3', 'future-output-title', title), element('p', 'future-output-description', detail));
    return output;
  }

  function pageLink(file, text, hash) {
    const link = element('a', 'future-link', text);
    link.href = file + '?stile=' + encodeURIComponent(activeStyle.id) + (hash || '');
    return link;
  }

  function choiceGroup(label, choices, current, onChange) {
    const group = element('div', 'future-choice-group');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', label);
    const buttons = choices.map(function (choice) {
      const button = element('button', 'btn future-choice', choice.label);
      button.type = 'button';
      button.dataset.value = choice.id;
      button.setAttribute('aria-pressed', String(choice.id === current));
      button.addEventListener('click', function () {
        buttons.forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
        onChange(choice.id);
      });
      group.append(button);
      return button;
    });
    return group;
  }

  function productChoices() {
    const choices = PRODUCTS.map(function (product) { return { id: product.id, label: product.name }; });
    if (['locale', 'contatti'].includes(cafe.dataset.page)) choices.push({ id: 'hours', label: 'Orari' });
    return choices;
  }

  function selectionOutput(selection) {
    if (selection === 'hours') {
      const output = titledOutput('Quando passare', CONTENT.hours.map(function (row) { return row.short + ' · ' + row.time; }).join(' / '), 'future-selection-output future-hours-output');
      output.append(element('p', 'future-output-description', CONTENT.address + ' · ' + CONTENT.city));
      return output;
    }
    const product = PRODUCTS.find(function (item) { return item.id === selection; }) || PRODUCTS[0];
    const output = titledOutput(product.name, product.detail);
    output.dataset.product = product.id;
    output.append(pageLink('menu.html', 'Vedi il menu'));
    return output;
  }

  function updateSelectedProducts(selection) {
    const names = { coffee: 'Caffè', croissant: 'Croissant', tea: 'Tè' };
    cafe.querySelectorAll('.menu-item').forEach(function (item) {
      item.dataset.futureSelected = String(item.dataset.product === selection);
    });
  }

  function init(root, picturesCallback) {
    cafe = root;
    loadPictures = picturesCallback;
    if (section) return;
    section = element('section', 'future-experience');
    section.hidden = true;
    section.setAttribute('aria-labelledby', 'future-title');
    const intro = element('div', 'future-intro');
    heading = element('h2', 'future-heading');
    heading.id = 'future-title';
    description = element('p', 'future-description');
    controls = element('div', 'future-controls');
    result = element('div', 'future-result');
    status = element('p', 'future-status');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    intro.append(heading, description);
    section.append(intro, controls, result, status);
    cafe.querySelector('.cafe-header').insertAdjacentElement('afterend', section);
  }

  function applyReading(reading, width, mode) {
    cafe.style.setProperty('--reading-scale', reading.size / 18);
    cafe.style.setProperty('--reading-size', reading.size);
    cafe.style.setProperty('--reading-width', width);
    cafe.style.setProperty('--reading-weight', reading.weight);
    cafe.style.setProperty('--reading-opsz', reading.size);
    cafe.dataset.reading = reading.id;
    cafe.dataset.readingMode = mode;
  }

  function adaptable() {
    heading.textContent = 'Un carattere. Più modi di leggere.';
    description.textContent = 'Scegli una distanza o regola dimensione, peso e larghezza. Il confronto cambia subito; la pagina segue la tua lettura.';
    const profile = READINGS.find(function (item) { return item.id === preferences.reading; }) || READINGS[1];
    function validNumber(value, min, max, step, fallback) {
      const number = Number(value);
      return Number.isInteger(number) && number >= min && number <= max && (number - min) % step === 0 ? number : fallback;
    }
    const reading = {
      id: profile.id,
      size: validNumber(preferences.readingSize, 16, 26, 1, profile.size),
      weight: validNumber(preferences.readingWeight, 350, 750, 25, profile.weight)
    };
    if (preferences.reading === 'custom' || reading.size !== profile.size || reading.weight !== profile.weight) reading.id = 'custom';
    let width = validNumber(preferences.readingWidth, 75, 125, 1, 100);
    let mode = preferences.readingMode === 'text' ? 'text' : 'full';
    const fields = [];
    const modes = [];
    const comparison = element('div', 'reading-comparison');
    let liveSettings;
    ['base', 'live'].forEach(function (side) {
      const panel = element('section', 'reading-' + side);
      const settings = element('p', 'reading-settings', side === 'base' ? '18 px · peso 400 · larghezza 100%' : '');
      panel.append(
        element('h3', '', side === 'base' ? 'Riferimento' : 'La tua lettura'),
        element('p', 'reading-sample', 'Un buon caffè. Un po’ di tempo.'),
        element('p', 'reading-detail', 'Al banco se vai di fretta. Al tavolo se hai voglia di fermarti.'),
        settings
      );
      if (side === 'live') liveSettings = settings;
      comparison.append(panel);
    });
    result.append(comparison, element('p', 'reading-optical-note', 'Roboto Flex: il disegno delle lettere segue anche la loro dimensione.'));

    function persist() {
      Object.assign(preferences, {
        reading: reading.id,
        readingSize: reading.size,
        readingWeight: reading.weight,
        readingWidth: width,
        readingMode: mode
      });
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      } catch (reason) {
        // Le regolazioni restano disponibili anche senza sessionStorage.
      }
    }
    function sync() {
      applyReading(reading, width, mode);
      presets.querySelectorAll('button').forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.value === reading.id));
      });
      fields.forEach(function (field) {
        const value = field.key === 'width' ? width : reading[field.key];
        field.slider.value = String(value);
        field.output.textContent = field.display(value);
        field.slider.setAttribute('aria-valuetext', field.spoken(value));
      });
      modes.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.mode === mode)); });
      liveSettings.textContent = reading.size + ' px · peso ' + reading.weight + ' · larghezza ' + width + '%';
      persist();
    }

    const presets = element('div', 'reading-presets');
    presets.append(element('p', 'reading-control-label', 'Distanza di lettura'));
    presets.append(choiceGroup('Distanza di lettura', READINGS.map(function (item) {
      return { id: item.id, label: item.label };
    }), reading.id, function (id) {
      const selected = READINGS.find(function (item) { return item.id === id; });
      Object.assign(reading, { id: selected.id, size: selected.size, weight: selected.weight });
      sync();
      announce(selected.label + ': ' + reading.size + ' pixel, peso ' + reading.weight + ', larghezza ' + width + ' per cento.');
    }));
    controls.append(presets);

    const adjustments = element('div', 'reading-adjustments');
    [
      { key: 'size', id: 'future-reading-size', className: 'reading-size-range', label: 'Dimensione del testo', min: 16, max: 26, step: 1, display: function (value) { return value + ' px'; }, spoken: function (value) { return value + ' pixel'; } },
      { key: 'weight', id: 'future-reading-weight', className: 'reading-weight-range', label: 'Peso del carattere', min: 350, max: 750, step: 25, display: function (value) { return String(value); }, spoken: function (value) { return 'peso ' + value; } },
      { key: 'width', id: 'future-reading-width', className: 'future-reading-range', label: 'Larghezza delle lettere', min: 75, max: 125, step: 1, display: function (value) { return value + '%'; }, spoken: function (value) { return value + ' per cento'; } }
    ].forEach(function (config) {
      const field = element('div', 'future-range-field');
      const label = element('label', 'future-field-label', config.label);
      label.htmlFor = config.id;
      const output = element('output', 'future-range-value');
      output.setAttribute('for', config.id);
      const slider = element('input', 'range ' + config.className);
      slider.id = config.id;
      slider.type = 'range';
      slider.min = String(config.min);
      slider.max = String(config.max);
      slider.step = String(config.step);
      slider.addEventListener('input', function () {
        if (config.key === 'width') width = Number(slider.value);
        else {
          reading[config.key] = Number(slider.value);
          reading.id = 'custom';
        }
        sync();
      });
      slider.addEventListener('change', function () { announce(config.label + ': ' + config.spoken(Number(slider.value)) + '.'); });
      const limits = element('small', 'reading-range-limits');
      limits.setAttribute('aria-hidden', 'true');
      limits.append(element('span', '', config.display(config.min)), element('span', '', config.display(config.max)));
      field.append(label, output, slider, limits);
      fields.push({ key: config.key, slider: slider, output: output, display: config.display, spoken: config.spoken });
      adjustments.append(field);
    });
    controls.append(adjustments);

    const modeControl = element('div', 'reading-mode-control');
    modeControl.setAttribute('role', 'group');
    modeControl.setAttribute('aria-label', 'Composizione della lettura');
    [{ id: 'full', label: 'Sito completo' }, { id: 'text', label: 'Testo in primo piano' }].forEach(function (choice) {
      const button = element('button', 'btn', choice.label);
      button.type = 'button';
      button.dataset.mode = choice.id;
      button.addEventListener('click', function () {
        mode = choice.id;
        sync();
        announce(choice.id === 'text' ? 'Testo in primo piano: le immagini sono nascoste.' : 'Sito completo: testo e immagini sono visibili.');
      });
      modes.push(button);
      modeControl.append(button);
    });
    const reset = element('button', 'btn reading-reset', 'Ripristina');
    reset.type = 'button';
    reset.addEventListener('click', function () {
      Object.assign(reading, { id: READINGS[1].id, size: READINGS[1].size, weight: READINGS[1].weight });
      width = 100;
      mode = 'full';
      sync();
      announce('Lettura ripristinata: 20 pixel, peso 500, larghezza 100 per cento. Sito completo.');
    });
    modeControl.append(reset);
    controls.append(modeControl);
    sync();
    announce('La tua preferenza di lettura si conserva fra le pagine.');
  }

  function spatial() {
    heading.textContent = 'Il menu nello spazio';
    description.textContent = 'Scegli un soggetto e portalo in primo piano. Il tavolo resta sul piano di fondo.';
    let selected = validProduct(preferences.spatialProduct, ['locale', 'contatti'].includes(cafe.dataset.page) ? 'hours' : 'coffee');
    let depth = preferences.spatialDepth === 'near' ? 'near' : 'overview';
    cafe.dataset.activeProduct = selected;
    cafe.dataset.depth = depth;
    function show() {
      updateSelectedProducts(selected);
      result.replaceChildren(selectionOutput(selected));
      announce(depth === 'near' ? 'Il dettaglio è sul piano vicino; la scena rimane sul fondo.' : 'Panoramica: scena e dettaglio sono visibili insieme.');
    }
    controls.append(choiceGroup('Soggetto nello spazio', productChoices(), selected, function (id) {
      selected = id;
      cafe.dataset.activeProduct = id;
      savePreference('spatialProduct', id);
      show();
    }), choiceGroup('Piano di lettura', [{ id: 'overview', label: 'Panoramica' }, { id: 'near', label: 'In primo piano' }], depth, function (id) {
      depth = id;
      cafe.dataset.depth = id;
      savePreference('spatialDepth', id);
      show();
    }));
    controls.append(element('p', 'future-disclosure', 'Scenario spaziale dimostrativo nel browser.'));
    show();
  }

  function normalize(text) {
    return text.toLocaleLowerCase('it').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  const MENU_ALIASES = {
    coffee: /caffe|espresso|cappuccin/,
    croissant: /croissant|cornett|dolc|chocolat|cannella|crostat|girell|\bforno\b/,
    tea: /\bte\b|\btea\b|matcha|spremut|limonat|infus/,
    salato: /salat|toast|focacc|yogurt/
  };

  function compose(prompt) {
    const text = normalize(prompt);
    const words = ' ' + text.replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
    const wantsDrinks = /\bbevand[ae]\b|\bbere\b/.test(text);
    const selected = CONTENT.menu.filter(function (product) {
      const names = [product.name].concat(product.items.map(function (recipe) { return recipe.name; }));
      const named = names.some(function (name) {
        const phrase = normalize(name).replace(/[^a-z0-9]+/g, ' ').trim();
        return words.includes(' ' + phrase + ' ');
      });
      const aliases = MENU_ALIASES[product.id];
      return named || (aliases && aliases.test(text)) || (wantsDrinks && ['coffee', 'tea'].includes(product.id));
    });
    const wantsMenu = selected.length > 0 || /menu|prodott|colazion/.test(text);
    const wantsHours = /orar|apert|quando|visita|lunedi|martedi|mercoledi|giovedi|venerdi|sabato|domenica/.test(text);
    const wantsPlace = /locale|dove|centro|incontr|pausa/.test(text);
    result.replaceChildren();
    if (!text || (!wantsMenu && !wantsHours && !wantsPlace)) {
      const message = text ? 'Puoi chiedere i prodotti del menu, gli orari o il locale. Scegli un esempio qui sopra e riprova.' : 'Scrivi che cosa vuoi vedere oppure scegli uno degli esempi.';
      result.append(titledOutput('Da che cosa cominciamo?', message, 'future-empty-output'));
      announce(message);
      return;
    }
    if (wantsMenu) {
      const menu = element('div', 'future-composed-menu');
      menu.append(element('h3', 'future-output-title', selected.length ? 'La tua selezione' : 'Il nostro menu'));
      const list = element('ul', 'future-product-list');
      (selected.length ? selected : CONTENT.menu).forEach(function (product) {
        const item = element('li', 'future-composed-product');
        const label = PRODUCTS.find(function (highlight) { return highlight.id === product.id; });
        item.append(element('strong', 'future-product-name', label ? label.name : 'Salato'));
        const recipes = element('dl', 'future-recipe-list');
        product.items.forEach(function (recipe) {
          const row = element('div', 'future-recipe');
          row.append(element('dt', '', recipe.name), element('dd', 'future-recipe-price', new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(recipe.price)));
          recipes.append(row);
        });
        item.append(recipes);
        list.append(item);
      });
      menu.append(list, pageLink('menu.html', 'Apri il menu completo'));
      result.append(menu);
    }
    if (wantsHours) {
      const hours = element('div', 'future-composed-hours');
      hours.append(element('h3', 'future-output-title', 'Quando passare'));
      const week = element('ul', 'future-hours');
      CONTENT.week.forEach(function (day) {
        const item = element('li');
        item.append(element('strong', '', day.day), element('span', '', day.time));
        week.append(item);
      });
      hours.append(week, pageLink('contatti.html', 'Vedi i contatti'));
      result.append(hours);
    }
    if (wantsPlace) {
      const place = titledOutput('Il tuo posto al TTC', CONTENT.address + ' · ' + CONTENT.city, 'future-composed-place');
      place.append(element('p', 'future-output-description', CONTENT.tagline), pageLink('locale.html', 'Guarda il locale'));
      result.append(place);
    }
    announce('Ho composto questa vista con i contenuti di Caffè TTC.');
  }

  function generative() {
    heading.textContent = 'Componi la tua pausa';
    description.textContent = 'Chiedi i prodotti, gli orari o il locale: la risposta prende la forma del tuo compito.';
    const form = element('form', 'future-prompt-form');
    const label = element('label', 'future-field-label', 'Che cosa vuoi vedere?');
    label.htmlFor = 'future-prompt';
    const input = element('input', 'input future-prompt');
    input.id = 'future-prompt';
    input.name = 'richiesta';
    input.type = 'text';
    input.maxLength = 200;
    input.autocomplete = 'off';
    input.placeholder = 'Per esempio: caffè e croissant';
    const submit = element('button', 'btn future-submit', 'Componi');
    submit.type = 'submit';
    const suggestions = element('div', 'future-suggestions');
    suggestions.setAttribute('role', 'group');
    suggestions.setAttribute('aria-label', 'Richieste di esempio');
    [{ label: 'Guarda i prodotti', text: 'Mostra il menu' }, { label: 'Vedi gli orari', text: 'Mostra gli orari' }, { label: 'Scopri il locale', text: 'Mostra il locale' }].forEach(function (suggestion) {
      const button = element('button', 'btn future-choice', suggestion.label);
      button.type = 'button';
      button.addEventListener('click', function () {
        input.value = suggestion.text;
        savePreference('generativePrompt', input.value);
        compose(input.value);
      });
      suggestions.append(button);
    });
    const field = element('div', 'future-prompt-field');
    field.append(label, input);
    form.append(field, submit);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      savePreference('generativePrompt', input.value);
      compose(input.value);
    });
    controls.append(form, suggestions);
    if (cafe.dataset.page === 'menu') {
      const products = element('div', 'future-product-requests');
      products.setAttribute('role', 'group');
      products.setAttribute('aria-label', 'Componi la vista di un prodotto');
      PRODUCTS.forEach(function (product) {
        const button = element('button', 'btn future-choice', product.name);
        button.type = 'button';
        button.addEventListener('click', function () {
          input.value = 'Mostra ' + product.name;
          savePreference('generativePrompt', input.value);
          compose(input.value);
        });
        products.append(button);
      });
      controls.append(products);
    }
    controls.append(element('p', 'future-disclosure', 'Composizione dimostrativa nel browser: usa solo i contenuti del sito.'));
    const defaults = { home: 'Mostra il menu', menu: 'Mostra caffè e croissant', locale: 'Mostra il locale e gli orari', contatti: 'Mostra il locale e gli orari' };
    input.value = typeof preferences.generativePrompt === 'string' ? preferences.generativePrompt.slice(0, 200) : defaults[cafe.dataset.page] || defaults.home;
    compose(input.value);
  }

  function resources() {
    heading.textContent = 'Prima il menu. Poi le immagini.';
    description.textContent = 'Prodotti e orari si leggono subito. Le illustrazioni si caricano solo quando le chiedi.';
    const loaded = preferences.resourceImages === true;
    const bytes = activeStyle.image.bytes || 113298;
    cafe.dataset.images = loaded ? 'loaded' : 'deferred';
    const button = element('button', 'btn future-load-images', loaded ? 'Immagini caricate' : 'Mostra le immagini · ' + (bytes / 1000).toLocaleString('it-IT', { maximumFractionDigits: 1 }) + ' kB');
    button.type = 'button';
    button.disabled = loaded;
    const disclosure = element('p', 'future-disclosure', bytes.toLocaleString('it-IT') + ' byte per il file locale delle illustrazioni, condiviso fra tutti i soggetti.');
    controls.append(button, disclosure);
    result.append(titledOutput('Caffè · Croissant · Tè', 'Espresso e cappuccino · Ogni mattina · Una selezione di aromi', 'future-resource-summary'));
    announce(loaded ? 'Le illustrazioni sono attive. La tua scelta si conserva fra le pagine.' : 'Vista essenziale: le illustrazioni non vengono caricate.');
    const requestActivation = activation;
    button.addEventListener('click', async function () {
      button.disabled = true;
      button.textContent = 'Caricamento delle immagini…';
      announce('Caricamento delle illustrazioni locali.');
      try {
        await loadPictures();
        savePreference('resourceImages', true);
        if (requestActivation !== activation) return;
        cafe.dataset.images = 'loaded';
        button.textContent = 'Immagini caricate';
        announce('Illustrazioni caricate. Peso del file locale: ' + bytes.toLocaleString('it-IT') + ' byte.');
      } catch (reason) {
        if (requestActivation !== activation) return;
        button.disabled = false;
        button.textContent = 'Riprova a caricare le immagini';
        announce('Le immagini non sono disponibili. Conserva la cartella assets accanto alle pagine e riprova.');
      }
    });
  }

  function organic() {
    heading.textContent = 'Una scelta prende forma';
    description.textContent = 'Scegli un soggetto: la superficie cresce verso la tua selezione e ne apre il dettaglio.';
    let selected = validProduct(preferences.organicProduct, ['locale', 'contatti'].includes(cafe.dataset.page) ? 'hours' : 'coffee');
    function show() {
      cafe.dataset.organicFocus = selected;
      cafe.style.setProperty('--organic-focus-index', selected === 'hours' ? 3 : PRODUCTS.findIndex(function (product) { return product.id === selected; }));
      updateSelectedProducts(selected);
      result.replaceChildren(selectionOutput(selected));
      announce('Il dettaglio della tua selezione è aperto; la superficie si è assestata.');
    }
    controls.append(choiceGroup('Soggetto della forma', productChoices(), selected, function (id) {
      selected = id;
      savePreference('organicProduct', id);
      show();
    }));
    controls.append(element('p', 'future-disclosure', 'Scenario organico originale nel browser.'));
    show();
  }

  function holographic() {
    heading.textContent = 'Il menu prende luce';
    description.textContent = 'Scegli il contenuto da proiettare sul tavolo e cambia il punto di vista.';
    let selected = validProduct(preferences.projectionProduct, ['locale', 'contatti'].includes(cafe.dataset.page) ? 'hours' : 'coffee');
    let view = preferences.projectionView === 'side' ? 'side' : 'front';
    cafe.dataset.projectionView = view;
    function show() {
      cafe.dataset.projectionProduct = selected;
      updateSelectedProducts(selected);
      result.replaceChildren(selectionOutput(selected));
      announce(view === 'side' ? 'Vista laterale della proiezione: il dettaglio resta leggibile.' : 'Vista frontale della proiezione.');
    }
    controls.append(choiceGroup('Contenuto della proiezione', productChoices(), selected, function (id) {
      selected = id;
      savePreference('projectionProduct', id);
      show();
    }), choiceGroup('Punto di vista', [{ id: 'front', label: 'Vista frontale' }, { id: 'side', label: 'Vista laterale' }], view, function (id) {
      view = id;
      cafe.dataset.projectionView = id;
      savePreference('projectionView', id);
      show();
    }));
    const launch = element('button', 'btn future-project-launch', 'Proietta il sito');
    launch.type = 'button';
    launch.dataset.projectionOpen = '';
    controls.append(launch, element('p', 'future-disclosure', 'Proiezione dimostrativa nel browser: è una scena su schermo.'));
    show();
  }

  function addMenuScene(style) {
    if (!['menu', 'contatti'].includes(cafe.dataset.page) || !style.scene || !['spaziale', 'olografica'].includes(style.id)) return Promise.resolve();
    const figure = element('figure', 'future-scene');
    const image = element('img');
    image.src = style.scene.src;
    image.alt = style.scene.alt;
    image.width = style.scene.width;
    image.height = style.scene.height;
    image.decoding = 'async';
    figure.append(image);
    section.append(figure);
    return image.decode ? image.decode() : new Promise(function (resolve, reject) {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', reject, { once: true });
      if (image.complete && image.naturalWidth) resolve();
    });
  }

  function activate(style) {
    if (!section) return Promise.resolve();
    activation += 1;
    const id = idOf(style);
    section.hidden = !FUTURES.has(id);
    cafe.querySelectorAll('.menu-item').forEach(function (item) { delete item.dataset.futureSelected; });
    section.querySelectorAll('.future-scene').forEach(function (scene) { scene.remove(); });
    if (!FUTURES.has(id)) {
      delete cafe.dataset.reading;
      delete cafe.dataset.readingMode;
      ['scale', 'size', 'weight', 'width', 'opsz'].forEach(function (axis) { cafe.style.removeProperty('--reading-' + axis); });
      return Promise.resolve();
    }
    activeStyle = typeof style === 'string' ? { id: style } : style;
    section.dataset.future = id;
    controls.replaceChildren();
    result.replaceChildren();
    status.textContent = '';
    ({ adattabile: adaptable, spaziale: spatial, generativa: generative, risorse: resources, organica: organic, olografica: holographic })[id]();
    return addMenuScene(activeStyle);
  }

  function wantsImages(style) {
    return idOf(style) !== 'risorse' || preferences.resourceImages === true;
  }

  window.CAFFE_FUTURE = { init: init, activate: activate, wantsImages: wantsImages };
})();
