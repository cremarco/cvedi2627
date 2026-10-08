(function () {
  'use strict';

  const PRODUCT_SOURCES = {
    coffee: 'assets/redesign/holographic/coffee.webp',
    croissant: 'assets/redesign/holographic/croissant.webp',
    tea: 'assets/redesign/holographic/tea.webp'
  };
  const euro = function (price) { return price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }); };
  let instance = 0;

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function button(className, text) {
    const element = node('button', 'btn ' + className, text);
    element.type = 'button';
    return element;
  }

  function zoomIcon(plus) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', 'ar-icon');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', plus ? 'M4 10h12M10 4v12' : 'M4 10h12');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.8');
    path.setAttribute('stroke-linecap', 'round');
    svg.append(path);
    return svg;
  }

  function create(cafe, style) {
    const content = window.CAFFE_CONTENT;
    const atlas = window.CAFFE_IMAGES.material;
    const controller = new AbortController();
    const signal = controller.signal;
    const prefix = 'ar-' + (++instance) + '-';
    const state = { yaw: -5, pitch: 0, x: 0, y: 0, scale: 1 };
    const tabs = [
      { id: 'menu', label: 'Menu' },
      { id: 'locale', label: 'Il locale' },
      { id: 'orari', label: 'Orari' },
      { id: 'contatti', label: 'Contatti' }
    ];
    const initialTab = ['locale', 'contatti'].includes(cafe.dataset.page) ? cafe.dataset.page : 'menu';
    let selectedTab = initialTab;
    let selectedCategory = 'all';
    let placement = null;
    let pointer = null;
    let destroyed = false;

    const stage = node('section', 'scenario-stage ar-stage');
    stage.setAttribute('aria-label', 'Caffè TTC nello spazio: simulazione AR');
    const environment = node('img', 'ar-environment');
    environment.src = style.scene.src;
    environment.alt = style.scene.alt || 'Una strada cittadina, ambiente della simulazione AR.';
    environment.width = style.scene.width;
    environment.height = style.scene.height;
    environment.draggable = false;
    environment.decoding = 'async';

    const topbar = node('div', 'ar-topbar');
    const status = node('p', 'ar-status', 'Simulazione AR');
    const hint = node('p', 'ar-hint', 'Trascina lo sfondo o usa le frecce per guardarti intorno.');
    hint.id = prefix + 'instructions';
    topbar.append(status, hint);

    const viewport = node('div', 'ar-viewport');
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Scena AR interattiva');
    viewport.setAttribute('aria-describedby', hint.id);
    const lookSurface = node('div', 'ar-look-surface');
    lookSurface.setAttribute('aria-hidden', 'true');
    const world = node('div', 'ar-world');
    const panel = node('section', 'ar-panel');
    panel.setAttribute('aria-labelledby', 'ar-title');
    const brand = node('header', 'ar-brand');
    const title = node('h1', 'ar-title', content.brand);
    title.id = 'ar-title';
    title.tabIndex = -1;
    brand.append(title, node('p', 'ar-tagline', content.tagline));
    const tablist = node('div', 'tabs ar-tabs');
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-label', 'Esplora il Caffè TTC');
    const panelBody = node('div', 'ar-panel-body');
    const tabButtons = new Map();
    const tabPanels = new Map();

    function listen(target, type, handler, options) {
      target.addEventListener(type, handler, Object.assign({}, options, { signal: signal }));
    }

    function hours(className) {
      const list = node('dl', 'ar-hours ' + (className || ''));
      content.hours.forEach(function (row) {
        const item = node('div', 'ar-hours-row');
        item.append(node('dt', '', row.days), node('dd', '', row.time));
        list.append(item);
      });
      return list;
    }

    function localePhoto() {
      const frame = node('div', 'ar-locale-picture cafe-picture');
      const region = atlas.regions.locale;
      [['crop-x', region[0]], ['crop-y', region[1]], ['crop-width', region[2]], ['crop-height', region[3]], ['source-width', atlas.width], ['source-height', atlas.height]].forEach(function (pair) {
        frame.style.setProperty('--' + pair[0], pair[1]);
      });
      const image = node('img');
      image.src = atlas.src;
      image.alt = 'L’interno del Caffè TTC con bancone in legno, tavoli e pareti verde petrolio.';
      image.decoding = 'async';
      image.draggable = false;
      frame.append(image);
      return frame;
    }

    tabs.forEach(function (tab) {
      const tabButton = button('tab ar-tab', tab.label);
      tabButton.id = prefix + 'tab-' + tab.id;
      tabButton.dataset.tab = tab.id;
      tabButton.setAttribute('role', 'tab');
      tabButton.setAttribute('aria-controls', prefix + 'panel-' + tab.id);
      const tabPanel = node('section', 'ar-tab-content ar-content-' + tab.id);
      tabPanel.id = prefix + 'panel-' + tab.id;
      tabPanel.setAttribute('role', 'tabpanel');
      tabPanel.setAttribute('aria-labelledby', tabButton.id);
      tabPanel.tabIndex = 0;
      tabButtons.set(tab.id, tabButton);
      tabPanels.set(tab.id, tabPanel);
      tablist.append(tabButton);
      panelBody.append(tabPanel);
      listen(tabButton, 'click', function () { showTab(tab.id); });
      listen(tabButton, 'keydown', function (event) {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const current = tabs.findIndex(function (entry) { return entry.id === tab.id; });
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        showTab(tabs[next].id);
        tabButtons.get(tabs[next].id).focus();
      });
    });

    const menu = tabPanels.get('menu');
    menu.append(node('h2', '', 'Il menu del TTC'));
    const filter = node('div', 'ar-menu-filter');
    const filterLabel = node('label', '', 'Categoria');
    const categorySelect = node('select', 'select ar-category-select');
    categorySelect.id = prefix + 'category';
    filterLabel.htmlFor = categorySelect.id;
    [{ id: 'all', name: 'Tutto il menu' }].concat(content.menu).forEach(function (category) {
      const option = node('option', '', category.name);
      option.value = category.id;
      categorySelect.append(option);
    });
    filter.append(filterLabel, categorySelect);
    menu.append(filter);
    const menuList = node('div', 'ar-menu-list');
    const menuCategories = [];
    content.menu.forEach(function (category) {
      const section = node('section', 'ar-menu-category');
      section.dataset.category = category.id;
      section.append(node('h3', '', category.name), node('p', 'ar-menu-intro', category.intro));
      const list = node('dl', 'ar-menu-items');
      category.items.forEach(function (item) {
        const row = node('div', 'ar-menu-item');
        const name = node('dt');
        name.append(node('span', 'ar-menu-name', item.name), node('span', 'ar-menu-price', euro(item.price)));
        row.append(name, node('dd', 'ar-menu-description', item.detail));
        list.append(row);
      });
      section.append(list);
      menuCategories.push(section);
      menuList.append(section);
    });
    menu.append(menuList);

    const locale = tabPanels.get('locale');
    locale.append(node('h2', '', 'Il locale. Il tuo tempo.'), localePhoto(),
      node('p', '', 'Un bar di quartiere, con un posto per ogni pausa.'),
      node('p', '', 'Tre parole che dicono come ci piace stare al bar. Il caffè apre la giornata, il tavolo invita a fermarsi, una conversazione la rende un po’ diversa.'),
      node('p', '', 'Al TTC convivono il ritmo veloce del banco e quello più tranquillo dei tavoli. Non serve un’occasione: basta avere voglia di una pausa.'),
      node('h3', '', 'Dal banco al tavolo.'),
      node('p', '', 'Al mattino si incontrano le colazioni; più tardi arrivano i caffè dopo pranzo, i tè, i quaderni aperti e gli incontri rimandati.'),
      node('p', '', 'Ci trovi in centro. L’ingresso, i tavoli vicino alla vetrina e il bancone fanno parte dello stesso piccolo spazio.'));
    const opening = tabPanels.get('orari');
    opening.append(node('h2', '', 'Quando passare'), hours(), node('p', 'ar-address', content.address + ' · ' + content.city));
    const contacts = tabPanels.get('contatti');
    const email = node('a', 'ar-email', content.email);
    email.href = 'mailto:' + content.email;
    contacts.append(node('h2', '', 'Ci vediamo al TTC.'), node('p', 'ar-address', content.address), node('p', '', content.city), email, node('h3', '', 'Quando passare'), hours());

    function showTab(id) {
      if (!tabPanels.has(id)) return;
      selectedTab = id;
      stage.dataset.tab = id;
      tabButtons.forEach(function (tabButton, key) {
        const active = id === key;
        tabButton.setAttribute('aria-selected', String(active));
        tabButton.tabIndex = active ? 0 : -1;
        tabButton.classList.toggle('tab-active', active);
        tabPanels.get(key).hidden = !active;
      });
      panelBody.scrollTop = 0;
    }

    function filterMenu(id) {
      selectedCategory = id;
      categorySelect.value = id;
      menuCategories.forEach(function (section) { section.hidden = id !== 'all' && section.dataset.category !== id; });
    }
    listen(categorySelect, 'change', function () { filterMenu(categorySelect.value); });
    panel.append(brand, tablist, panelBody);

    const product = node('section', 'ar-product');
    product.setAttribute('aria-label', 'Prodotto nello spazio');
    const productImage = node('img', 'ar-product-image');
    productImage.width = 1100;
    productImage.height = 1100;
    productImage.decoding = 'async';
    productImage.draggable = false;
    const productCopy = node('div', 'ar-product-copy');
    productCopy.setAttribute('aria-live', 'polite');
    productCopy.setAttribute('aria-atomic', 'true');
    const productName = node('h2', 'ar-product-name');
    const productPrice = node('p', 'ar-product-price');
    const productDescription = node('p', 'ar-product-description');
    productCopy.append(productName, productPrice, productDescription);
    const productPicker = node('div', 'ar-product-picker');
    productPicker.setAttribute('role', 'group');
    productPicker.setAttribute('aria-label', 'Scegli il prodotto da vedere nello spazio');
    const products = [
      { id: 'coffee', label: 'Cappuccino', name: 'Cappuccino TTC' },
      { id: 'croissant', label: 'Croissant', name: 'Croissant al burro' },
      { id: 'tea', label: 'Tè', name: 'Tè e infusi' }
    ];
    const productButtons = new Map();
    products.forEach(function (entry) {
      entry.item = content.menu.find(function (category) { return category.id === entry.id; }).items.find(function (item) { return item.name === entry.name; });
      const choice = button('ar-product-choice', entry.label);
      choice.dataset.product = entry.id;
      choice.setAttribute('aria-pressed', 'false');
      productButtons.set(entry.id, choice);
      productPicker.append(choice);
      listen(choice, 'click', function () { showProduct(entry.id); });
    });

    function showProduct(id) {
      const entry = products.find(function (candidate) { return candidate.id === id; });
      product.dataset.product = id;
      productImage.src = PRODUCT_SOURCES[id];
      productImage.alt = entry.item.name + ', rappresentazione fotografica nello spazio.';
      productName.textContent = entry.item.name;
      productPrice.textContent = euro(entry.item.price);
      productDescription.textContent = entry.item.detail;
      productButtons.forEach(function (choice, key) { choice.setAttribute('aria-pressed', String(key === id)); });
    }
    product.append(productImage, productCopy, productPicker);
    const anchor = node('div', 'ar-anchor');
    anchor.setAttribute('aria-hidden', 'true');
    world.append(panel, product, anchor);
    viewport.append(lookSurface, world);

    const toolbar = node('div', 'ar-toolbar');
    toolbar.setAttribute('role', 'group');
    toolbar.setAttribute('aria-label', 'Controlli della scena AR');
    const place = button('ar-place', 'Sposta');
    place.setAttribute('aria-pressed', 'false');
    const zoom = node('div', 'ar-zoom');
    zoom.setAttribute('role', 'group');
    zoom.setAttribute('aria-label', 'Distanza dei contenuti');
    const zoomOut = button('ar-zoom-out');
    zoomOut.setAttribute('aria-label', 'Allontana i contenuti');
    zoomOut.append(zoomIcon(false));
    const zoomValue = node('span', 'ar-zoom-value', '100%');
    zoomValue.setAttribute('aria-label', 'Dimensione dei contenuti');
    const zoomIn = button('ar-zoom-in');
    zoomIn.setAttribute('aria-label', 'Avvicina i contenuti');
    zoomIn.append(zoomIcon(true));
    zoom.append(zoomOut, zoomValue, zoomIn);
    const reset = button('ar-reset', 'Reimposta');
    const feedback = node('p', 'ar-feedback', 'Esplora il menu e scegli un prodotto.');
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    toolbar.append(place, zoom, reset, feedback);
    const disclosure = node('p', 'ar-disclosure', content.demo);
    stage.append(environment, topbar, viewport, toolbar, disclosure);
    cafe.append(stage);

    const skipLink = document.querySelector('.skip-link');
    const previousSkipTarget = skipLink && skipLink.getAttribute('href');
    if (skipLink) skipLink.setAttribute('href', '#ar-title');

    function limits() {
      const narrow = window.innerWidth <= 1200;
      return { x: narrow ? 16 : 80, y: narrow ? 16 : 48, yaw: narrow ? 5 : 12, pitch: narrow ? 3 : 7, minScale: 0.8, maxScale: narrow ? 1 : 1.15 };
    }
    function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
    function update() {
      const bounds = limits();
      state.x = clamp(state.x, -bounds.x, bounds.x);
      state.y = clamp(state.y, -bounds.y, bounds.y);
      state.yaw = clamp(state.yaw, -bounds.yaw, bounds.yaw);
      state.pitch = clamp(state.pitch, -bounds.pitch, bounds.pitch);
      state.scale = clamp(state.scale, bounds.minScale, bounds.maxScale);
      stage.style.setProperty('--ar-yaw', state.yaw.toFixed(2) + 'deg');
      stage.style.setProperty('--ar-pitch', state.pitch.toFixed(2) + 'deg');
      stage.style.setProperty('--ar-background-x', (state.yaw * 1.5).toFixed(2) + 'px');
      stage.style.setProperty('--ar-background-y', (state.pitch * 1.5).toFixed(2) + 'px');
      stage.style.setProperty('--ar-offset-x', state.x.toFixed(2) + 'px');
      stage.style.setProperty('--ar-offset-y', state.y.toFixed(2) + 'px');
      stage.style.setProperty('--ar-scale', state.scale.toFixed(2));
      zoomValue.textContent = Math.round(state.scale * 100) + '%';
      zoomOut.disabled = state.scale <= bounds.minScale + 0.001;
      zoomIn.disabled = state.scale >= bounds.maxScale - 0.001;
    }

    function finishPlacement(cancel) {
      if (!placement) return;
      if (cancel) { state.x = placement.x; state.y = placement.y; }
      placement = null;
      stage.classList.remove('is-placing');
      place.textContent = 'Sposta';
      place.setAttribute('aria-pressed', 'false');
      hint.textContent = 'Trascina lo sfondo o usa le frecce per guardarti intorno.';
      feedback.textContent = cancel ? 'Spostamento annullato.' : 'Posizione confermata.';
      update();
    }
    listen(place, 'click', function () {
      if (placement) { finishPlacement(false); return; }
      placement = { x: state.x, y: state.y };
      stage.classList.add('is-placing');
      place.textContent = 'Conferma posizione';
      place.setAttribute('aria-pressed', 'true');
      hint.textContent = 'Tocca lo sfondo o usa le frecce. Invio conferma, Esc annulla.';
      feedback.textContent = 'Scegli dove appoggiare i contenuti nella scena.';
      viewport.focus({ preventScroll: true });
    });
    function setZoom(delta) {
      state.scale = Math.round((state.scale + delta) * 100) / 100;
      update();
      feedback.textContent = 'Dimensione dei contenuti: ' + zoomValue.textContent + '.';
    }
    listen(zoomOut, 'click', function () { setZoom(-0.05); });
    listen(zoomIn, 'click', function () { setZoom(0.05); });
    listen(reset, 'click', function () {
      finishPlacement(false);
      Object.assign(state, { yaw: -5, pitch: 0, x: 0, y: 0, scale: 1 });
      showTab(initialTab);
      filterMenu('all');
      showProduct('coffee');
      update();
      feedback.textContent = 'Scena e contenuti riportati allo stato iniziale.';
    });

    function exposed(target) {
      return target instanceof Element && !target.closest('.ar-panel, .ar-product');
    }
    function positionAt(clientX, clientY) {
      const rectangle = viewport.getBoundingClientRect();
      state.x = (clientX - rectangle.left - rectangle.width / 2) * 0.35;
      state.y = (clientY - rectangle.top - rectangle.height / 2) * 0.2;
      update();
    }
    listen(viewport, 'pointerdown', function (event) {
      if (!event.isPrimary || event.button !== 0 || !exposed(event.target)) return;
      event.preventDefault();
      viewport.focus({ preventScroll: true });
      if (placement) {
        positionAt(event.clientX, event.clientY);
        feedback.textContent = 'Posizione aggiornata. Conferma oppure premi Esc per annullare.';
        return;
      }
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw: state.yaw, pitch: state.pitch };
      viewport.setPointerCapture(event.pointerId);
      stage.classList.add('is-dragging');
    });
    listen(viewport, 'pointermove', function (event) {
      if (!pointer || pointer.id !== event.pointerId) return;
      state.yaw = pointer.yaw + (event.clientX - pointer.x) * 0.045;
      state.pitch = pointer.pitch - (event.clientY - pointer.y) * 0.025;
      update();
    });
    function releasePointer(event) {
      if (!pointer || (event && event.pointerId !== pointer.id)) return;
      const id = pointer.id;
      pointer = null;
      stage.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(id)) viewport.releasePointerCapture(id);
    }
    listen(viewport, 'pointerup', releasePointer);
    listen(viewport, 'pointercancel', releasePointer);
    listen(viewport, 'lostpointercapture', releasePointer);
    listen(window, 'blur', function () { releasePointer(); });
    listen(stage, 'keydown', function (event) {
      if (event.key === 'Escape' && placement) {
        event.preventDefault();
        finishPlacement(true);
        place.focus({ preventScroll: true });
        return;
      }
      if (event.target !== viewport) return;
      if (event.key === 'Enter' && placement) {
        event.preventDefault();
        finishPlacement(false);
        place.focus({ preventScroll: true });
        return;
      }
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const horizontal = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
      const vertical = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;
      if (placement) { state.x += horizontal * 8; state.y += vertical * 8; }
      else { state.yaw += horizontal * 1.5; state.pitch -= vertical; }
      update();
    });
    listen(window, 'resize', update);

    let printState;
    listen(window, 'beforeprint', function () {
      printState = { tab: selectedTab, category: selectedCategory };
      tabPanels.forEach(function (tabPanel) { tabPanel.hidden = false; });
      menuCategories.forEach(function (section) { section.hidden = false; });
    });
    listen(window, 'afterprint', function () {
      if (!printState) return;
      showTab(printState.tab);
      filterMenu(printState.category);
      printState = undefined;
    });
    showTab(initialTab);
    showProduct('coffee');
    update();

    function preload(source) {
      return new Promise(function (resolve, reject) {
        const image = new Image();
        let settled = false;
        function finish(error) {
          if (settled) return;
          settled = true;
          image.removeEventListener('load', loaded);
          image.removeEventListener('error', failed);
          signal.removeEventListener('abort', aborted);
          if (error) reject(error); else resolve();
        }
        function loaded() {
          if (image.decode) image.decode().then(function () { finish(); }, failed);
          else finish();
        }
        function failed() { finish(new Error('Immagine AR non disponibile: ' + source)); }
        function aborted() { finish(); }
        image.addEventListener('load', loaded, { once: true, signal: signal });
        image.addEventListener('error', failed, { once: true, signal: signal });
        signal.addEventListener('abort', aborted, { once: true });
        image.src = source;
        if (image.complete) { if (image.naturalWidth) loaded(); else failed(); }
      });
    }
    const ready = Promise.all([style.scene.src, atlas.src].concat(Object.values(PRODUCT_SOURCES)).map(preload)).then(function () {
      if (!destroyed) stage.dataset.ready = 'true';
      return stage;
    });

    return {
      stage: stage,
      ready: ready,
      destroy: function () {
        if (destroyed) return;
        destroyed = true;
        releasePointer();
        controller.abort();
        if (skipLink && skipLink.getAttribute('href') === '#ar-title') {
          if (previousSkipTarget === null) skipLink.removeAttribute('href');
          else skipLink.setAttribute('href', previousSkipTarget);
        }
        stage.remove();
      }
    };
  }

  window.CAFFE_AR = { create: create };
})();
