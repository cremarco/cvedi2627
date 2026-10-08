(function () {
  'use strict';

  const cafe = document.getElementById('cafe');
  const select = document.getElementById('style-select');
  const error = document.getElementById('load-error');
  const frames = Array.from(cafe.querySelectorAll('.cafe-picture'));
  const styles = Array.isArray(window.CAFFE_STYLES) ? window.CAFFE_STYLES : [];
  const pageLinks = Array.from(cafe.querySelectorAll('a[href]')).filter(function (link) {
    return /^(index|menu|locale|contatti)\.html([?#]|$)/.test(link.getAttribute('href'));
  }).map(function (link) {
    return { element: link, target: link.getAttribute('href') };
  });
  const groups = [
    ['atlante', 'Atlante · storia del web'],
    ['booklet', 'Scenari futuri · interpretazioni'],
    ['sperimentale', 'Scenari futuri · esperimenti']
  ];
  let current;
  let revision = 0;
  const future = window.CAFFE_FUTURE;

  function pictureSource(frame) {
    if (current.scene && frame.classList.contains('hero-picture')) {
      return { src: current.scene.src, width: current.scene.width, height: current.scene.height, region: [0, 0, current.scene.width, current.scene.height], alt: current.scene.alt };
    }
    return { src: current.image.src, width: current.image.width, height: current.image.height, region: current.image.regions[frame.dataset.picture] || current.image.regions.hero };
  }

  if (!styles.length) {
    select.disabled = true;
    error.textContent = 'Gli stili non sono stati caricati. Conserva stili.js accanto alla pagina, poi riaprila.';
    error.hidden = false;
    cafe.dataset.ready = 'error';
    return;
  }

  select.replaceChildren();
  groups.forEach(function (group) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group[1];
    styles.filter(function (style) { return style.group === group[0]; }).forEach(function (style) {
      const option = document.createElement('option');
      option.value = style.id;
      option.textContent = style.label;
      optgroup.appendChild(option);
    });
    if (optgroup.children.length) select.appendChild(optgroup);
  });

  function positionPictures() {
    if (!current) return;
    frames.forEach(function (frame) {
      const image = frame.querySelector('img');
      const source = pictureSource(frame);
      const region = source.region;
      if (!region) return;
      frame.style.setProperty('--crop-x', region[0]);
      frame.style.setProperty('--crop-y', region[1]);
      frame.style.setProperty('--crop-width', region[2]);
      frame.style.setProperty('--crop-height', region[3]);
      frame.style.setProperty('--source-width', source.width);
      frame.style.setProperty('--source-height', source.height);
      image.dataset.crop = region.join(',');
      if (!image.dataset.originalAlt) image.dataset.originalAlt = image.alt;
      image.alt = source.alt || image.dataset.originalAlt;
    });
  }

  async function loadCurrentPictures() {
    const sourceStyle = current;
    await Promise.all(frames.map(function (frame) { return loadImage(frame.querySelector('img'), pictureSource(frame).src); }));
    if (current === sourceStyle) positionPictures();
  }

  if (future) future.init(cafe, loadCurrentPictures);

  function loadImage(image, source) {
    return new Promise(function (resolve, reject) {
      function finish() {
        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);
      }
      function onLoad() {
        finish();
        if (image.decode) image.decode().then(resolve, reject);
        else resolve();
      }
      function onError() {
        finish();
        reject(new Error('Image unavailable: ' + source));
      }
      image.addEventListener('load', onLoad);
      image.addEventListener('error', onError);
      image.src = source;
      if (image.complete && image.naturalWidth) onLoad();
    });
  }

  function styleFromUrl() {
    const requested = new URL(window.location.href).searchParams.get('stile');
    return styles.some(function (style) { return style.id === requested; }) ? requested : 'flat';
  }

  function preserveStyleInLinks(id) {
    pageLinks.forEach(function (link) {
      const target = new URL(link.target, window.location.href);
      target.searchParams.set('stile', id);
      const fileName = target.pathname.substring(target.pathname.lastIndexOf('/') + 1);
      link.element.setAttribute('href', fileName + target.search + target.hash);
    });
    const page = new URL(window.location.href);
    page.searchParams.set('stile', id);
    try {
      window.history.replaceState(window.history.state, '', page.href);
    } catch (reason) {
      // Some file:// browsers restrict history changes; the page links still preserve the selection.
    }
  }

  async function changeStyle(id) {
    const style = styles.find(function (entry) { return entry.id === id; }) || styles.find(function (entry) { return entry.id === 'flat'; }) || styles[0];
    const activeRevision = ++revision;
    current = style;
    select.value = style.id;
    cafe.dataset.style = style.id;
    cafe.dataset.future = style.group === 'atlante' ? 'false' : 'true';
    document.documentElement.dataset.style = style.id;
    document.body.dataset.style = style.id;
    const layout = style.layout === 'legacy' ? 'legacy' : 'responsive';
    cafe.dataset.layout = layout;
    document.documentElement.dataset.layout = layout;
    document.body.dataset.layout = layout;
    preserveStyleInLinks(style.id);
    const futureReady = future ? future.activate(style) : Promise.resolve();
    cafe.dataset.ready = 'false';
    cafe.setAttribute('aria-busy', 'true');
    error.hidden = true;
    positionPictures();

    try {
      const wantPictures = !future || future.wantsImages(style);
      if (!wantPictures) frames.forEach(function (frame) { frame.querySelector('img').removeAttribute('src'); });
      const imagePromises = wantPictures ? [loadCurrentPictures(), futureReady] : [futureReady];
      const fontPromises = document.fonts ? [cafe, select, document.getElementById('cafe-title')].map(function (element) {
        const computed = getComputedStyle(element);
        const font = [computed.fontStyle, computed.fontWeight, computed.fontSize, computed.fontFamily].join(' ');
        return document.fonts.load(font, element.textContent);
      }) : [];
      await Promise.all(imagePromises.concat(fontPromises));
      if (document.fonts) await document.fonts.ready;
      if (activeRevision !== revision) return;
      positionPictures();
      cafe.dataset.ready = 'true';
    } catch (reason) {
      if (activeRevision !== revision) return;
      cafe.dataset.ready = 'error';
      error.textContent = 'Una risorsa dello stile non è disponibile. Controlla che la cartella assets sia accanto alla pagina, oppure scegli un altro stile.';
      error.hidden = false;
    } finally {
      if (activeRevision === revision) cafe.setAttribute('aria-busy', 'false');
    }
  }

  select.addEventListener('change', function () { changeStyle(select.value); });
  window.addEventListener('popstate', function () { changeStyle(styleFromUrl()); });
  changeStyle(styleFromUrl());
})();
