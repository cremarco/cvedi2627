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
  // Literal runtime paths are also the publication dependency graph.
  const brandAssets = {
    essential: 'assets/brand/imagegen-v1/essential.webp',
    classic: 'assets/brand/imagegen-v1/classic.webp',
    chrome: 'assets/brand/imagegen-v1/chrome.webp',
    glass: 'assets/brand/imagegen-v1/glass.webp',
    pop: 'assets/brand/imagegen-v1/pop.webp',
    pixel: 'assets/brand/imagegen-v1/pixel.webp'
  };
  function brandSource(style) {
    if (['text', 'html'].includes(style.id)) return null;
    const family = { scheu: 'classic', web2: 'chrome', y2k: 'chrome', glass: 'glass', liquid: 'glass', neumo: 'glass', spaziale: 'glass', max: 'pop', neo: 'pop', pixel: 'pixel' }[style.id] || 'essential';
    return brandAssets[family];
  }
  function loadBrand(style) {
    const source = brandSource(style);
    // The one-color essential also serves print and forced-colors mode.
    return source ? Promise.all([...new Set([source, brandAssets.essential])].map(function (path) { return loadImage(new Image(), path); })) : Promise.resolve();
  }
  let current;
  let currentStylesheet = document.getElementById('cafe-stylesheet');
  let revision = 0;
  const future = window.CAFFE_FUTURE;
  const transitions = window.CAFFE_TRANSITIONS;
  const directions = [window.CAFFE_HISTORICAL, window.CAFFE_MATERIALS, window.CAFFE_EXPRESSIVE, window.CAFFE_SCENARIOS].filter(Boolean);

  function pictureSource(frame) {
    const picture = current.pictures && current.pictures[frame.dataset.picture];
    if (picture) return { ...picture, region: picture.region || [0, 0, picture.width, picture.height] };
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
      option.textContent = style.years + ' · ' + style.label;
      optgroup.appendChild(option);
    });
    if (optgroup.children.length) select.appendChild(optgroup);
  });

  function positionPictures() {
    if (!current || !current.image) return;
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
  directions.forEach(function (direction) { direction.init(cafe); });

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

  function loadStylesheet(style) {
    if (currentStylesheet.dataset.style === style.id && currentStylesheet.sheet) {
      return Promise.resolve(currentStylesheet);
    }
    return new Promise(function (resolve, reject) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles/' + style.id + '.css';
      link.dataset.style = style.id;
      link.media = 'not all';
      link.addEventListener('load', function () { resolve(link); }, { once: true });
      link.addEventListener('error', function () {
        link.remove();
        reject(new Error('Stylesheet unavailable: ' + link.href));
      }, { once: true });
      document.head.appendChild(link);
    });
  }

  async function prepareStylePictures(style, stylesheet) {
    const sources = new Set();
    const logo = brandSource(style);
    if (logo) { sources.add(logo); sources.add(brandAssets.essential); }
    if (!['text', 'scene', 'conversation'].includes(style.presentation) && style.image) sources.add(style.image.src);
    if (style.pictures) Object.values(style.pictures).forEach(function (picture) { sources.add(picture.src); });
    if (style.presentation === 'scene' && style.scene) sources.add(style.scene.src);
    if (style.presentation === 'conversation' && window.CAFFE_IMAGES?.material) sources.add(window.CAFFE_IMAGES.material.src);
    try {
      function backgrounds(rules) {
        Array.from(rules).forEach(function (rule) {
          if (rule.cssRules) backgrounds(rule.cssRules);
          if (!rule.style) return;
          for (const match of rule.style.cssText.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
            const source = match[1].trim();
            if (source.includes('/assets/brand/imagegen-v1/')) continue;
            if (/\.(png|webp|jpe?g|gif|avif)([?#]|$)/i.test(source)) sources.add(new URL(source, stylesheet.href).href);
          }
        });
      }
      backgrounds(stylesheet.sheet.cssRules);
    } catch (reason) { /* Some file:// browsers restrict CSS rule inspection. */ }
    await Promise.all(Array.from(sources).map(function (source) { return loadImage(new Image(), source); }));
  }

  async function changeStyle(id) {
    const style = styles.find(function (entry) { return entry.id === id; }) || styles.find(function (entry) { return entry.id === 'flat'; }) || styles[0];
    const activeRevision = ++revision;
    const animate = Boolean(current && current.id !== style.id);
    if (transitions) transitions.cancelStyle();
    select.value = style.id;
    cafe.dataset.ready = 'false';
    cafe.setAttribute('aria-busy', 'true');
    error.hidden = true;

    let stylesheet;
    try {
      stylesheet = await loadStylesheet(style);
      if (activeRevision !== revision) {
        if (stylesheet !== currentStylesheet) stylesheet.remove();
        return;
      }
      if (animate) await prepareStylePictures(style, stylesheet);
      if (activeRevision !== revision) {
        if (stylesheet !== currentStylesheet) stylesheet.remove();
        return;
      }
      const update = async function () {
        if (activeRevision !== revision) return;
        if (stylesheet !== currentStylesheet) {
          stylesheet.media = 'all';
          currentStylesheet.remove();
          stylesheet.id = 'cafe-stylesheet';
          currentStylesheet = stylesheet;
        }
        current = style;
        cafe.dataset.style = style.id;
        cafe.dataset.future = style.group === 'atlante' ? 'false' : 'true';
        cafe.dataset.presentation = style.presentation || 'site';
        document.documentElement.dataset.style = style.id;
        document.body.dataset.style = style.id;
        const layout = style.layout === 'legacy' ? 'legacy' : 'responsive';
        cafe.dataset.layout = layout;
        document.documentElement.dataset.layout = layout;
        document.body.dataset.layout = layout;
        preserveStyleInLinks(style.id);
        const futureReady = future ? future.activate(style) : Promise.resolve();
        const directionReady = directions.map(function (direction) { return direction.activate(style); });
        positionPictures();
        const wantPictures = !['text', 'scene', 'conversation'].includes(style.presentation) && (!future || future.wantsImages(style));
        if (!wantPictures) frames.forEach(function (frame) { frame.querySelector('img').removeAttribute('src'); });
        const imagePromises = (wantPictures ? [loadCurrentPictures(), futureReady] : [futureReady]).concat(directionReady, loadBrand(style));
        const fontPromises = document.fonts ? [cafe, select, document.getElementById('cafe-title')].map(function (element) {
          const computed = getComputedStyle(element);
          const font = [computed.fontStyle, computed.fontWeight, computed.fontSize, computed.fontFamily].join(' ');
          return document.fonts.load(font, element.textContent);
        }) : [];
        await Promise.all(imagePromises.concat(fontPromises));
        if (document.fonts) await document.fonts.ready;
        if (activeRevision !== revision) return;
        positionPictures();
        await Promise.all(directions.map(function (direction) { return direction.afterReady ? direction.afterReady(style) : undefined; }));
        if (activeRevision !== revision) return;
        cafe.dataset.ready = 'true';
      };
      if (transitions) await transitions.styleChange(update, function () { return activeRevision === revision; }, animate);
      else await update();
    } catch (reason) {
      if (stylesheet && stylesheet !== currentStylesheet) stylesheet.remove();
      if (activeRevision !== revision) return;
      if (transitions) transitions.cancelStyle();
      cafe.dataset.ready = 'error';
      select.value = current ? current.id : currentStylesheet.dataset.style;
      error.textContent = 'Una risorsa dello stile non è disponibile. Controlla che le cartelle styles e assets siano accanto alla pagina, oppure scegli un altro stile.';
      error.hidden = false;
    } finally {
      if (activeRevision === revision) {
        cafe.setAttribute('aria-busy', 'false');
        if (transitions) transitions.arrivalReady();
      }
    }
  }

  select.addEventListener('change', function () { changeStyle(select.value); });
  window.addEventListener('popstate', function () { changeStyle(styleFromUrl()); });
  changeStyle(styleFromUrl());
})();
