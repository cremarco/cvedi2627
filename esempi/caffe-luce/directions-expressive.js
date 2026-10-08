/* Style-owned expressive layers. Product copy and navigation stay in the generated page. */
(function () {
  'use strict';
  let cafe;
  let paused = false;
  const cup = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M6 10H24V22H21V25H9V22H6Z M24 12H29V20H24 M4 28H26V30H4Z" fill="currentColor"/><path class="pixel-steam" d="M10 2H13V7H10Z M18 1H21V6H18Z" fill="currentColor"/></svg>';
  const star = '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 0L59 29 79 10 75 36 100 28 80 49 100 62 73 66 80 92 58 77 50 100 42 77 20 92 27 66 0 62 20 49 0 28 25 36 21 10 41 29Z" fill="currentColor"/></svg>';

  function create(tag, classes, text) {
    const node = document.createElement(tag);
    node.className = classes;
    node.dataset.expressiveCreated = 'true';
    if (text) node.textContent = text;
    return node;
  }
  function decorative(classes, text) {
    const node = create('div', classes, text);
    node.setAttribute('aria-hidden', 'true');
    return node;
  }
  function ribbon(classes, words) {
    const node = decorative(classes);
    const track = document.createElement('div');
    track.className = 'expressive-ribbon-track';
    for (let i = 0; i < 4; i += 1) {
      const run = document.createElement('span');
      run.textContent = words;
      track.appendChild(run);
    }
    node.appendChild(track);
    return node;
  }
  function motionControl() {
    const button = create('button', 'btn expressive-motion-toggle');
    button.type = 'button';
    function render() {
      cafe.dataset.expressiveMotion = paused ? 'paused' : 'playing';
      button.textContent = paused ? 'Riavvia le animazioni' : 'Ferma le animazioni';
      button.setAttribute('aria-pressed', String(paused));
    }
    button.addEventListener('click', function () { paused = !paused; render(); });
    render();
    cafe.querySelector('.cafe-header').after(button);
  }
  function maximalism() {
    motionControl();
    const head = cafe.querySelector('.cafe-header');
    head.after(ribbon('max-ribbon max-ribbon-top', 'TEMPO / TAZZA / CONVERSAZIONE / CAFFÈ TTC / '));
    cafe.querySelectorAll('.cafe-hero, .page-intro').forEach(function (hero) {
      const stickers = decorative('max-sticker-field');
      ['TTC', 'PAUSA', 'CIAO', 'CAFFÈ'].forEach(function (word, index) {
        const sticker = document.createElement('span');
        sticker.className = 'max-sticker max-sticker-' + index;
        const graphic = document.createElement('span');
        graphic.className = 'max-star';
        graphic.innerHTML = star;
        const label = document.createElement('span');
        label.className = 'max-sticker-word';
        label.textContent = word;
        sticker.append(graphic, label);
        stickers.appendChild(sticker);
      });
      hero.appendChild(stickers);
    });
    cafe.querySelectorAll('.cafe-menu, .locale-story, .contact-layout').forEach(function (section, index) {
      const strip = ribbon('max-ribbon max-ribbon-middle', index % 2 ? 'UN BUON CAFFÈ / UN PO’ DI TEMPO / ' : 'TAZZA / TEMPO / TTC / CONVERSAZIONE / ');
      section.after(strip);
    });
    const collage = decorative('max-word-collage');
    ['TEMPO', 'TAZZA', 'CONVERSAZIONE', 'TTC', 'CAFFÈ', 'PAUSA', 'TEMPO', 'TAZZA', 'TTC'].forEach(function (word, index) {
      const label = document.createElement('span');
      label.textContent = word;
      label.className = 'max-collage-word max-collage-word-' + (index % 5);
      collage.appendChild(label);
    });
    cafe.querySelector('.cafe-footer').before(collage);
  }
  function neobrutalism() {
    const pattern = decorative('neo-pattern-band');
    pattern.innerHTML = '<span></span><span></span><span></span><span></span>';
    cafe.querySelector('.cafe-header').after(pattern);
    cafe.querySelectorAll('.cafe-values, .locale-story, .menu-note, .contact-message').forEach(function (section) {
      const mark = decorative('neo-print-mark');
      mark.innerHTML = star;
      section.appendChild(mark);
    });
  }
  function pixel() {
    motionControl();
    const hud = decorative('pixel-hud');
    const names = ['TEMPO', 'TAZZA', 'CONVERSAZIONE'];
    names.forEach(function (name) {
      const item = document.createElement('span');
      item.innerHTML = cup;
      item.appendChild(document.createTextNode(name));
      hud.appendChild(item);
    });
    cafe.querySelector('.cafe-header').after(hud);
    cafe.querySelectorAll('.hero-copy, .page-intro').forEach(function (hero) {
      const trail = decorative('pixel-cup-parade');
      for (let i = 0; i < 5; i += 1) {
        const icon = document.createElement('span');
        icon.innerHTML = cup;
        trail.appendChild(icon);
      }
      hero.appendChild(trail);
    });
  }
  function y2k() {
    const strip = decorative('y2k-status-strip');
    strip.innerHTML = '<span class="y2k-pulse-dots"><i></i><i></i><i></i></span><span>TTC / TEMPO. TAZZA. CONVERSAZIONE.</span><span class="y2k-barcode"></span>';
    cafe.querySelector('.cafe-header').after(strip);
    const hero = cafe.querySelector('.cafe-hero, .page-intro');
    if (hero) {
      const orbit = decorative('y2k-orbit');
      orbit.innerHTML = '<span></span><span></span><span></span>';
      hero.appendChild(orbit);
    }
  }
  window.CAFFE_EXPRESSIVE = {
    init: function (root) { cafe = root; },
    activate: function (style) {
      if (!cafe) return;
      cafe.querySelectorAll('[data-expressive-created]').forEach(function (node) { node.remove(); });
      delete cafe.dataset.expressiveMotion;
      if (style.id === 'max') maximalism();
      if (style.id === 'neo') neobrutalism();
      if (style.id === 'pixel') pixel();
      if (style.id === 'y2k') y2k();
    }
  };
})();
