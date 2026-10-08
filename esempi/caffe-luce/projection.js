(function () {
  'use strict';
  const cafe = document.getElementById('cafe');
  const data = window.CAFFE_CONTENT;
  if (!cafe || !data) return;
  const make = function (tag, classes, text) {
    const node = document.createElement(tag);
    if (classes) node.className = classes;
    if (text != null) node.textContent = text;
    return node;
  };
  const dialog = make('dialog', 'projection-dialog');
  dialog.setAttribute('aria-labelledby', 'projection-title');
  dialog.dataset.view = 'front';
  const scene = make('img', 'projection-scene');
  scene.alt = '';
  scene.decoding = 'async';
  // The image is requested only on the explicit projection action.
  const sceneSource = 'assets/futuri/scene/olografica-v2.webp';
  const toolbar = make('div', 'projection-toolbar');
  const title = make('h2', '', 'Caffè TTC · proiezione');
  title.id = 'projection-title';
  const view = make('button', 'btn projection-view', 'Vista laterale');
  view.type = 'button';
  view.setAttribute('aria-pressed', 'false');
  const close = make('button', 'btn projection-close', 'Torna al sito');
  close.type = 'button';
  toolbar.append(title, view, close);
  const plane = make('section', 'projection-plane');
  const identity = make('div', 'projection-identity');
  const navigation = make('nav', 'projection-nav');
  navigation.setAttribute('aria-label', 'Pagine nella proiezione');
  const content = make('div', 'projection-content');
  const status = make('p', 'projection-status');
  status.setAttribute('role', 'status');
  const disclosure = make('p', 'projection-disclosure', 'Scenario olografico simulato nel browser. Il proiettore e i contenuti sospesi appartengono a una scena immaginaria.');
  plane.append(identity, navigation, content);
  dialog.append(scene, toolbar, plane, status, disclosure);
  document.body.append(dialog);
  let trigger;
  let activePage = 'home';
  const pages = [{ id: 'home', label: 'Home' }, { id: 'menu', label: 'Menu' }, { id: 'locale', label: 'Il locale' }, { id: 'contatti', label: 'Contatti' }];
  function hours() {
    const list = make('dl', 'projection-hours');
    data.hours.forEach(function (row) {
      const item = make('div');
      item.append(make('dt', '', row.days), make('dd', '', row.time));
      list.append(item);
    });
    return list;
  }
  function heading(text, lead) {
    content.append(make('h3', '', text), make('p', 'projection-lead', lead));
  }
  function productPicture(slot) {
    const style = window.CAFFE_STYLES.find(function (entry) { return entry.id === 'olografica'; });
    const frame = make('div', 'cafe-picture projection-product');
    const region = style.image.regions[slot];
    const image = make('img');
    image.src = style.image.src;
    image.alt = '';
    image.decoding = 'async';
    ['crop-x','crop-y','crop-width','crop-height'].forEach(function (property, i) { frame.style.setProperty('--' + property, region[i]); });
    frame.style.setProperty('--source-width', style.image.width);
    frame.style.setProperty('--source-height', style.image.height);
    frame.append(image);
    return frame;
  }
  function showPage(id) {
    activePage = id;
    navigation.querySelectorAll('button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.page === id));
    });
    content.replaceChildren();
    if (id === 'home') {
      heading('Un buon caffè. Un po’ di tempo.', 'Tempo. Tazza. Conversazione.');
      const highlights = make('div', 'projection-highlights');
      data.highlights.forEach(function (item) {
        const card = make('article');
        card.append(productPicture(item.id), make('h4', '', item.title), make('p', '', item.detail), make('p', 'projection-price', item.price));
        highlights.append(card);
      });
      content.append(highlights, make('p', '', 'La colazione, una pausa al banco, il tavolo su cui restare. Benvenuto al Caffè TTC.'));
    } else if (id === 'menu') {
      heading('Il menu del TTC.', 'Caffetteria, forno e qualcosa di buono per restare.');
      const menu = make('div', 'projection-menu');
      data.menu.forEach(function (category) {
        const block = make('section');
        block.append(make('h4', '', category.name));
        const list = make('dl');
        category.items.forEach(function (item) {
          const row = make('div');
          const term = make('dt');
          term.append(make('span', '', item.name), make('span', 'projection-price', new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(item.price)));
          row.append(term, make('dd', '', item.detail));
          list.append(row);
        });
        block.append(list);
        menu.append(block);
      });
      content.append(menu, make('p', '', 'Per ingredienti e allergeni, chiedi al banco prima di scegliere. Prezzi dimostrativi.'));
    } else if (id === 'locale') {
      heading('Il locale. Il tuo tempo.', 'Un bar di quartiere, con un posto per ogni pausa.');
      content.append(make('p', '', 'Legno, luce e il rumore delle tazzine. Un tavolo per leggere, uno per incontrarsi, un banco per chi passa soltanto un momento.'), make('p', '', 'Al TTC convivono il ritmo veloce del banco e quello più tranquillo dei tavoli.'), make('h4', '', 'Ci trovi qui'), make('p', '', data.address + ' · ' + data.city), hours());
    } else {
      heading('Passa. Oppure scrivici.', data.address + ' · ' + data.city);
      content.append(hours());
      const email = make('a', '', data.email);
      email.href = 'mailto:' + data.email;
      const form = make('a', 'btn projection-form-link', 'Prepara un messaggio');
      form.href = 'contatti.html?stile=olografica#contact-form';
      content.append(email, form, make('p', '', data.demo));
    }
    content.scrollTop = 0;
    status.textContent = 'Proiezione aperta: ' + pages.find(function (page) { return page.id === id; }).label + '.';
  }
  pages.forEach(function (page) {
    const button = make('button', 'btn', page.label);
    button.type = 'button';
    button.dataset.page = page.id;
    button.addEventListener('click', function () { showPage(page.id); });
    navigation.append(button);
  });
  view.addEventListener('click', function () {
    const side = dialog.dataset.view !== 'side';
    dialog.dataset.view = side ? 'side' : 'front';
    view.setAttribute('aria-pressed', String(side));
    view.textContent = side ? 'Vista frontale' : 'Vista laterale';
    status.textContent = side ? 'Proiezione inclinata: vista laterale.' : 'Proiezione allineata: vista frontale.';
  });
  close.addEventListener('click', function () { delete document.body.dataset.projection; dialog.close(); });
  dialog.addEventListener('cancel', function () { delete document.body.dataset.projection; });
  dialog.addEventListener('close', function () {
    delete document.body.dataset.projection;
    if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
  });
  document.addEventListener('click', function (event) {
    const button = event.target.closest('[data-projection-open]');
    if (!button || cafe.dataset.style !== 'olografica') return;
    trigger = button;
    const brand = cafe.querySelector('.cafe-brand');
    identity.replaceChildren();
    if (brand) Array.from(brand.childNodes).forEach(function (node) { identity.append(node.cloneNode(true)); });
    identity.querySelectorAll('[id]').forEach(function (node) { node.removeAttribute('id'); });
    scene.src = sceneSource;
    showPage(cafe.dataset.page || activePage);
    document.body.dataset.projection = 'open';
    dialog.showModal();
    close.focus({ preventScroll: true });
  });
})();
