(function () {
  'use strict';

  let cafe;
  const own = [];
  const supported = ['flat', 'material', 'material2', 'material3', 'neumo', 'glass', 'liquid'];
  // Original TTC pictograms: geometric filled silhouettes, never emoji or raster icons.
  const paths = {
    coffee: 'M4 5h13v8a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V5Zm13 1h2a3 3 0 1 1 0 6h-2v-2h2a1 1 0 1 0 0-2h-2V6ZM3 21h16v2H3z',
    time: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 4v5.6l4 2.4-1 1.7-5-3V6h2Z',
    chat: 'M3 3h18v14H9l-6 5V3Zm4 4v2h10V7H7Zm0 4v2h7v-2H7Z',
    menu: 'M5 2h14v20H5V2Zm3 4v2h8V6H8Zm0 5v2h8v-2H8Zm0 5v2h5v-2H8Z',
    locale: 'M12 2 2 10v12h8v-8h4v8h8V10L12 2Zm-6 9h3v3H6v-3Zm9 0h3v3h-3v-3Z',
    contact: 'M12 2a8 8 0 0 0-8 8c0 6 8 13 8 13s8-7 8-13a8 8 0 0 0-8-8Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z',
    home: 'M3 10 12 2l9 8v12h-7v-7h-4v7H3V10Z',
    arrow: 'm14 4 8 8-8 8-2-2 5-5H2v-2h15l-5-5 2-2Z',
  };

  function icon(kind, extra) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', 'materials-icon ' + (extra || ''));
    svg.dataset.materialsOwned = 'true';
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', paths[kind] || paths.coffee);
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('fill-rule', 'evenodd');
    svg.appendChild(path);
    own.push(svg);
    return svg;
  }

  function clean() {
    own.splice(0).forEach(function (element) { element.remove(); });
  }

  function decorateNavigation(style) {
    if (style.id === 'material') return;
    cafe.querySelectorAll('.cafe-nav a').forEach(function (link) {
      const href = link.getAttribute('href');
      const kind = href.indexOf('locale.html') === 0 ? 'locale' : href.indexOf('contatti.html') === 0 ? 'contact' : 'menu';
      link.prepend(icon(kind));
    });
  }

  function floatingAction(style) {
    if (!['material', 'material2', 'material3'].includes(style.id)) return;
    const row = document.createElement('div');
    row.className = 'materials-action-row';
    row.dataset.materialsOwned = 'true';
    const fab = document.createElement('a');
    fab.className = 'btn materials-fab';
    fab.dataset.materialsOwned = 'true';
    const isMenu = cafe.dataset.page === 'menu';
    const target = isMenu ? 'contatti.html' : 'menu.html';
    fab.href = target + '?stile=' + encodeURIComponent(style.id);
    const label = isMenu ? 'Organizza la tua visita' : 'Esplora il menu';
    fab.setAttribute('aria-label', label);
    fab.appendChild(icon(isMenu ? 'contact' : 'coffee'));
    if (style.id !== 'material') {
      const text = document.createElement('span');
      text.textContent = isMenu ? 'Visita il TTC' : 'Il menu';
      fab.appendChild(text);
    }
    row.appendChild(fab);
    cafe.insertBefore(row, cafe.querySelector('.cafe-footer'));
    own.push(fab);
    own.push(row);
  }

  window.CAFFE_MATERIALS = {
    init: function (element) { cafe = element; },
    activate: function (style) {
      if (!cafe) return;
      clean();
      if (!supported.includes(style.id)) return;
      decorateNavigation(style);
      if (['flat', 'material2', 'material3', 'neumo'].includes(style.id)) {
        cafe.querySelectorAll('.cafe-values > div').forEach(function (value, i) {
          value.prepend(icon(['time', 'coffee', 'chat'][i], 'materials-value-icon'));
        });
      }
      cafe.querySelectorAll('.cafe-cta').forEach(function (link) {
        link.appendChild(icon('arrow', 'materials-action-icon'));
      });
      floatingAction(style);
    },
  };
})();
