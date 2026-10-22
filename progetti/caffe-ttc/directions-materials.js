(function () {
  'use strict';

  let cafe;
  const own = [];
  const teardown = [];
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
    teardown.splice(0).forEach(function (dispose) { dispose(); });
    own.splice(0).forEach(function (element) { element.remove(); });
  }

  function liquidOptics(style) {
    const lens = window.CAFFE_LIQUID_GLASS;
    if (style.id !== 'liquid' || !lens) return;
    teardown.push(lens.injectLiquidGlassFilter({ scales: [-58, -56, -54], saturate: 1.08 }));

    // A native select keeps its semantics; its separate glass shell owns optics.
    const select = cafe.querySelector('#style-select');
    const shell = document.createElement('div');
    shell.className = 'liquid-select-lens';
    select.before(shell);
    shell.appendChild(select);
    teardown.push(function () { shell.replaceWith(select); });

    const hero = cafe.querySelector('.cafe-hero,.page-intro');
    const mirrors = [];
    const surfaces = cafe.querySelectorAll('.cafe-nav,.liquid-select-lens,.cafe-cta,.menu-filter');
    surfaces.forEach(function (surface) {
      surface.classList.add('liquid-glass');
      teardown.push(function () { surface.classList.remove('liquid-glass', 'liquid-mirrored'); });
      Array.from(surface.childNodes).filter(function (node) {
        return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
      }).forEach(function (text) {
        const label = document.createElement('span');
        label.className = 'liquid-glass-label';
        text.before(label);
        label.appendChild(text);
        teardown.push(function () { label.replaceWith(text); });
      });
      if (!surface.closest('.cafe-header,.cafe-hero')) return;
      surface.classList.add('liquid-mirrored');
      const scene = document.createElement('span');
      scene.className = 'liquid-glass-scene';
      scene.setAttribute('aria-hidden', 'true');
      surface.prepend(scene);
      mirrors.push({ surface, scene });
      own.push(scene);
    });

    let frame = 0;
    function sync() {
      frame = 0;
      const background = hero.getBoundingClientRect();
      const scale = Math.max(background.width / 1672, background.height / 941);
      const width = 1672 * scale, height = 941 * scale;
      const photoX = background.left + (background.width - width) / 2;
      const photoY = background.top + (background.height - height) / 2;
      mirrors.forEach(function ({ surface, scene }) {
        const box = surface.getBoundingClientRect();
        // Sample a 24px buffer around the lens, keeping the filtered area small.
        scene.style.backgroundSize = 'auto,' + width + 'px ' + height + 'px';
        scene.style.backgroundPosition = '0 0,' + (photoX - box.left + 24) + 'px ' + (photoY - box.top + 24) + 'px';
      });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(hero);
    mirrors.forEach(function ({ surface }) { observer.observe(surface); });
    window.addEventListener('resize', schedule, { passive: true });
    sync();
    teardown.push(function () {
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    });
  }

  // Light follows deliberate pointer movement on the small control plane only.
  function liquidLight(style) {
    const reduceEffects = window.matchMedia('(prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active)');
    if (style.id !== 'liquid' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
        reduceEffects.matches) return;
    cafe.querySelectorAll('.cafe-nav,.cafe-cta,.menu-filter').forEach(function (control) {
      let frame = 0;
      let x = 25;
      let y = 0;
      function move(event) {
        if (reduceEffects.matches) { reset(); return; }
        const bounds = control.getBoundingClientRect();
        x = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
        y = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
        if (frame) return;
        frame = requestAnimationFrame(function () {
          if (reduceEffects.matches) { reset(); return; }
          control.style.setProperty('--liquid-light-x', x.toFixed(1) + '%');
          control.style.setProperty('--liquid-light-y', y.toFixed(1) + '%');
          frame = 0;
        });
      }
      function reset() {
        cancelAnimationFrame(frame);
        frame = 0;
        control.style.removeProperty('--liquid-light-x');
        control.style.removeProperty('--liquid-light-y');
      }
      control.addEventListener('pointermove', move, { passive: true });
      control.addEventListener('pointerleave', reset);
      reduceEffects.addEventListener('change', reset);
      teardown.push(function () {
        control.removeEventListener('pointermove', move);
        control.removeEventListener('pointerleave', reset);
        reduceEffects.removeEventListener('change', reset);
        reset();
      });
    });
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
      liquidOptics(style);
      liquidLight(style);
    },
  };
})();
