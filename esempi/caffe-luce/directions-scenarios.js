(function () {
  'use strict';
  const content = window.CAFFE_CONTENT;
  const euro = function (price) { return price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }); };
  let cafe, stage, revision = 0, timer, continuation, paused = false, floatingCleanup;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function link(file, text) {
    const element = node('a', 'conversation-link', text);
    element.href = file + '?stile=generativa';
    return element;
  }
  function stop() {
    revision++;
    clearTimeout(timer);
    continuation = undefined;
    paused = false;
    if (floatingCleanup) floatingCleanup();
    floatingCleanup = undefined;
    if (stage) stage.remove();
    stage = undefined;
    cafe.querySelectorAll('.holo-controls, .holo-motion-control, .holo-replay-control, .holo-orbit, .holo-scan').forEach(function (element) { element.remove(); });
    cafe.querySelectorAll('.holo-text').forEach(function (element) {
      element.classList.remove('holo-text');
      delete element.dataset.holoInview;
    });
    delete cafe.dataset.floatPaused;
    delete cafe.dataset.holoVisible;
    cafe.classList.remove('holo-projecting');
    cafe.style.removeProperty('--holo-pointer-x');
    cafe.style.removeProperty('--holo-pointer-y');
  }
  function schedule(action, delay, token) {
    continuation = function () {
      if (token !== revision) return;
      if (paused) { continuation = action; return; }
      action();
    };
    timer = setTimeout(continuation, delay);
  }
  function photo(slot, alt) {
    const frame = node('div', 'conversation-photo cafe-picture');
    const image = node('img');
    const source = window.CAFFE_IMAGES.material;
    const region = source.regions[slot];
    for (const pair of [['crop-x',region[0]],['crop-y',region[1]],['crop-width',region[2]],['crop-height',region[3]],['source-width',source.width],['source-height',source.height]]) frame.style.setProperty('--' + pair[0], pair[1]);
    image.src = source.src;
    image.alt = alt;
    frame.append(image);
    return frame;
  }
  function hours() {
    const block = node('section', 'generated-hours');
    block.append(node('h3', '', 'Quando passare'));
    const list = node('dl', 'generated-hours-list');
    content.hours.forEach(function (row) {
      const item = node('div'); item.append(node('dt', '', row.days), node('dd', '', row.time)); list.append(item);
    });
    block.append(list);
    return block;
  }
  function hero() {
    const block = node('section', 'generated-hero');
    block.append(photo('hero', 'Una colazione al Caffè TTC'), node('h2', '', 'Un buon caffè. Un po’ di tempo.'), node('p', '', content.tagline));
    return block;
  }
  function menu() {
    const block = node('section', 'generated-menu');
    block.append(node('h2', '', 'Il menu del TTC'));
    const filters = node('div', 'generated-menu-filters');
    filters.setAttribute('role', 'group'); filters.setAttribute('aria-label', 'Categorie del menu generato');
    const list = node('div', 'generated-menu-list');
    const buttons = [];
    function show(id) {
      list.replaceChildren();
      content.menu.filter(function (category) { return id === 'all' || category.id === id; }).forEach(function (category) {
        const section = node('section', 'generated-menu-category'); section.dataset.category = category.id;
        section.append(node('h3', '', category.name));
        const items = node('dl');
        category.items.forEach(function (item) { const row = node('div'); const title = node('dt'); title.append(node('span', '', item.name), node('span', 'generated-price', euro(item.price))); row.append(title, node('dd', '', item.detail)); items.append(row); });
        section.append(items); list.append(section);
      });
      buttons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.category === id)); });
    }
    [{ id:'all', name:'Tutto' }].concat(content.menu).forEach(function (category) {
      const button = node('button', 'btn', category.name); button.type = 'button'; button.dataset.category = category.id;
      button.addEventListener('click', function () { show(category.id); }); buttons.push(button); filters.append(button);
    });
    show('all'); block.append(filters, list); return block;
  }
  function highlights() {
    const block = node('section', 'generated-highlights');
    content.highlights.forEach(function (item) { const card = node('article'); card.append(photo(item.id, item.title + ' al Caffè TTC'), node('h3', '', item.title), node('p', '', item.story), node('strong', '', item.price)); block.append(card); });
    return block;
  }
  function locale() {
    const block = node('section', 'generated-locale');
    block.append(photo('locale', 'L’interno del Caffè TTC, con tavoli e bancone'), node('h2', '', 'Il tuo posto, in mezzo alla giornata.'), node('p', '', 'Legno, luce e il rumore delle tazzine. Un tavolo per leggere, uno per incontrarsi, un banco per chi passa soltanto un momento.'));
    return block;
  }
  function contact() {
    const block = node('section', 'generated-contact');
    block.append(node('h2', '', 'Ci vediamo al TTC.'), node('p', '', content.address + ' · ' + content.city));
    const email = node('a', '', content.email); email.href = 'mailto:' + content.email;
    block.append(email, hours()); return block;
  }
  function choices() {
    const block = node('nav', 'generated-navigation'); block.setAttribute('aria-label', 'Esplora la pagina creata');
    block.append(link('index.html','Home'), link('menu.html','Menu'), link('locale.html','Il locale'), link('contatti.html','Contatti'));
    return block;
  }
  function conversation() {
    stage = node('section', 'scenario-stage conversation-stage');
    const intro = node('header', 'conversation-intro');
    intro.append(node('h1', '', 'La tua pausa prende forma.'), node('p', '', 'Una richiesta. Una pagina che si costruisce davanti a te.'));
    const body = node('div', 'conversation-body');
    const chat = node('div', 'conversation-chat');
    const log = node('ol', 'conversation-log'); log.setAttribute('aria-live', 'polite'); log.setAttribute('aria-label', 'Conversazione che costruisce la pagina');
    const toolbar = node('div', 'conversation-toolbar');
    const pause = node('button', 'btn conversation-pause', 'Metti in pausa'); pause.type = 'button';
    const finish = node('button', 'btn conversation-finish', 'Mostra tutto'); finish.type = 'button';
    const replay = node('button', 'btn conversation-replay', 'Ricomincia'); replay.type = 'button';
    const status = node('p', 'conversation-status', 'La pagina sta prendendo forma…'); status.setAttribute('role','status');
    toolbar.append(pause,finish,replay); chat.append(log,toolbar,status);
    const preview = node('div', 'conversation-preview');
    const identity = node('header', 'generated-identity', content.brand); preview.append(identity);
    body.append(chat,preview); stage.append(intro,body,node('p','scenario-disclosure',content.demo)); cafe.append(stage);
    const scripts = {
      home:[['Vorrei una colazione al TTC.','Partiamo da una buona tazza.',hero],['Aggiungi qualcosa dal forno e un tè.','Tre modi di fare una pausa.',highlights],['E dimmi quando posso passare.','Ecco indirizzo e orari.',contact]],
      menu:[['Mostrami il menu completo del TTC.','Organizzo il listino per categorie.',menu],['Voglio scegliere cosa vedere.','I filtri funzionano: puoi esplorare ogni categoria.',choices],['Aggiungi anche gli orari.','Una pausa quando vuoi.',hours]],
      locale:[['Vorrei vedere com’è il locale.','Entra: legno, luce e una tazza alla volta.',locale],['Che cosa posso prendere?','Ecco tre proposte per la tua pausa.',highlights],['Come ci arrivo?','Ti lascio indirizzo e orari.',contact]],
      contatti:[['Dove trovo il Caffè TTC?','Ti preparo la scheda con i contatti.',contact],['Fammi vedere il bar.','Un piccolo posto nel ritmo del quartiere.',locale],['Posso aprire anche il menu?','Scegli la tua prossima pausa.',choices]]
    };
    const steps = scripts[cafe.dataset.page] || scripts.home;
    let index = 0, token = revision;
    function complete() { stage.dataset.complete = 'true'; status.textContent = 'La pagina è pronta. Esplora i contenuti che hai creato.'; pause.disabled = true; finish.disabled = true; }
    function addStep(step, animate) {
      const message = node('li', 'conversation-message conversation-user'); const text = node('p', '', animate ? '' : step[0]); message.setAttribute('aria-label',step[0]); if(animate)text.setAttribute('aria-hidden','true'); message.append(text); log.append(message);
      function response() {
        const answer = node('li','conversation-message conversation-assistant'); answer.append(node('p','',step[1])); log.append(answer);
        const component = step[2](); component.classList.add('generated-piece'); component.dataset.generated = '';
        preview.append(component); log.scrollTop = log.scrollHeight;
        index++; if(index === steps.length) complete(); else if(animate) schedule(next,1600,token);
      }
      if (!animate) { response(); return; }
      let position = 0;
      function type() { if(token!==revision)return; text.textContent=step[0].slice(0,++position); if(position<step[0].length)schedule(type,24,token); else schedule(response,650,token); }
      type();
    }
    function next() { if(token !== revision || index>=steps.length)return; addStep(steps[index],true); }
    function all() {
      clearTimeout(timer); continuation=undefined; token=++revision; paused=false; stage.dataset.paused='false';
      log.replaceChildren(); preview.replaceChildren(identity); index=0; steps.forEach(function(step){addStep(step,false);}); complete();
    }
    finish.addEventListener('click',all);
    pause.addEventListener('click',function(){paused=!paused;stage.dataset.paused=String(paused);pause.textContent=paused?'Riprendi':'Metti in pausa';if(paused)clearTimeout(timer);if(!paused&&continuation){const action=continuation;continuation=undefined;action();}});
    replay.addEventListener('click',function(){clearTimeout(timer);token=++revision;continuation=undefined;paused=false;stage.dataset.paused='false';index=0;log.replaceChildren();preview.replaceChildren(identity);stage.dataset.complete='false';pause.disabled=false;finish.disabled=false;pause.textContent='Metti in pausa';status.textContent='La pagina sta prendendo forma…';if(reduced.matches)all();else next();});
    if(reduced.matches)all();else next();
  }
  function floating() {
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let motionPaused = false, frame = 0, launchFrame = 0, pointerX = 0, pointerY = 0;
    const activeRevision = revision;
    const projector = window.CAFFE_HOLOGRAM?.create(cafe);
    const textProjection = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { entry.target.dataset.holoInview = String(entry.isIntersecting); });
    }, { threshold: .12 });
    cafe.querySelectorAll('.hero-copy, .feature-copy, .cafe-values > div, .visit-summary > div, .locale-story > div, .contact-information, .contact-message > div, .menu-note, .section-heading, .menu-list').forEach(function (element) {
      element.classList.add('holo-text');
      textProjection.observe(element);
    });
    const imagesReady = [];
    const style = window.CAFFE_STYLES.find(function (entry) { return entry.id === 'olografica'; });
    cafe.querySelectorAll('.cafe-picture[data-picture]').forEach(function (picture) {
      const source = style.pictures?.[picture.dataset.picture];
      if (!source) return;
      const scan = node('span', 'holo-scan');
      scan.setAttribute('aria-hidden', 'true');
      const image = node('img'); image.alt = ''; image.src = source.src;
      scan.append(image); picture.append(scan);
      if (image.decode) imagesReady.push(image.decode());
    });
    function replay() {
      if (activeRevision !== revision || cafe.dataset.style !== 'olografica' || motionPaused || reduced.matches) return;
      cancelAnimationFrame(launchFrame);
      cafe.classList.remove('holo-projecting');
      launchFrame = requestAnimationFrame(function () {
        void cafe.offsetWidth;
        cafe.classList.add('holo-projecting');
        projector?.replay();
      });
    }
    const replayControl = node('button', 'btn holo-replay-control', 'Riproietta');
    replayControl.type = 'button';
    replayControl.addEventListener('click', replay, options);
    const toolbar = node('div', 'holo-controls');
    toolbar.append(replayControl);
    cafe.querySelector('.cafe-header').append(toolbar);
    const projectionArea = cafe.querySelector('.cafe-hero') || cafe;
    const visibility = new IntersectionObserver(function (entries) {
      cafe.dataset.holoVisible = String(entries[0].isIntersecting && !document.hidden);
    }, { threshold: 0 });
    visibility.observe(projectionArea);
    const printDetails = new Map();
    function preparePrint() {
      cafe.querySelectorAll('details').forEach(function (detail) { printDetails.set(detail, detail.open); detail.open = true; });
      projector?.setPaused(true);
    }
    function restorePrint() {
      printDetails.forEach(function (open, detail) { detail.open = open; }); printDetails.clear();
      projector?.setPaused(motionPaused);
    }
    window.addEventListener('beforeprint', preparePrint, options);
    window.addEventListener('afterprint', restorePrint, options);
    function resetPointer() {
      cancelAnimationFrame(frame);
      frame = 0;
      pointerX = 0;
      pointerY = 0;
      cafe.style.setProperty('--holo-pointer-x', '0px');
      cafe.style.setProperty('--holo-pointer-y', '0px');
    }
    function updatePointer(event) {
      if (motionPaused || reduced.matches || !finePointer.matches || event.pointerType === 'touch') return;
      pointerX = Math.max(-16, Math.min(16, (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 32));
      pointerY = Math.max(-16, Math.min(16, (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 32));
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        cafe.style.setProperty('--holo-pointer-x', pointerX.toFixed(2) + 'px');
        cafe.style.setProperty('--holo-pointer-y', pointerY.toFixed(2) + 'px');
      });
    }
    const control = node('button', 'btn holo-motion-control', 'Ferma il movimento');
    control.type = 'button';
    control.setAttribute('aria-pressed', 'false');
    control.addEventListener('click', function () {
      motionPaused = !motionPaused;
      cafe.dataset.floatPaused = String(motionPaused);
      control.setAttribute('aria-pressed', String(motionPaused));
      control.textContent = motionPaused ? 'Riattiva il movimento' : 'Ferma il movimento';
      replayControl.disabled = motionPaused;
      projector?.setPaused(motionPaused);
      resetPointer();
    }, options);
    toolbar.append(control);
    window.addEventListener('pointermove', updatePointer, { passive: true, signal: listeners.signal });
    document.documentElement.addEventListener('pointerleave', resetPointer, options);
    window.addEventListener('blur', resetPointer, options);
    window.addEventListener('beforeprint', resetPointer, options);
    document.addEventListener('visibilitychange', function () { resetPointer(); cafe.dataset.holoVisible = String(!document.hidden && projectionArea.getBoundingClientRect().bottom > 0 && projectionArea.getBoundingClientRect().top < innerHeight); }, options);
    reduced.addEventListener('change', resetPointer, options);
    finePointer.addEventListener('change', resetPointer, options);
    floatingCleanup = function () {
      listeners.abort();
      cancelAnimationFrame(launchFrame);
      visibility.disconnect();
      textProjection.disconnect();
      restorePrint();
      projector?.destroy();
      resetPointer();
    };
    cafe.dataset.floatPaused = 'false';
    resetPointer();
    if (cafe.dataset.page !== 'home') return Promise.all(imagesReady).then(replay);
    const orbit = node('div', 'holo-orbit');
    orbit.setAttribute('aria-hidden', 'true');
    const image = node('img');
    image.alt = '';
    image.decoding = 'async';
    image.src = 'assets/redesign/holographic/croissant.webp';
    orbit.append(image);
    cafe.querySelector('.cafe-hero').append(orbit);
    imagesReady.push(image.decode ? image.decode() : new Promise(function (resolve, reject) {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', reject, { once: true });
      if (image.complete && image.naturalWidth) resolve();
    }));
    return Promise.all(imagesReady).then(replay);
  }
  function activate(style) {
    stop();
    if(style.id==='generativa'){conversation();return;}
    if(style.id==='adattabile')return;
    if(style.id==='olografica')return floating();
    if(style.id!=='spaziale')return;
    stage=node('section','scenario-stage ar-stage');stage.setAttribute('aria-label','Il sito Caffè TTC visto in realtà aumentata');
    const image=node('img','ar-site-image');image.alt=style.scene.alt;image.width=style.scene.width;image.height=style.scene.height;image.src=style.scene.src;stage.append(image);cafe.append(stage);
    return image.decode ? image.decode() : undefined;
  }
  window.CAFFE_SCENARIOS={init:function(root){cafe=root;window.addEventListener('beforeprint',function(){if(cafe.dataset.style==='generativa')cafe.querySelector('.conversation-finish')?.click();});reduced.addEventListener('change',function(){if(reduced.matches&&cafe.dataset.style==='generativa')cafe.querySelector('.conversation-finish')?.click();});},activate:activate};
})();
