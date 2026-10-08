/* Shared motion controller. Loaded in the head so an arriving page is covered
 * before its first paint; app.js reveals it only after its own resources settle. */
(function () {
  'use strict';
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const print = window.matchMedia('print');
  const storageKey = 'caffe-ttc-page-transition';
  const wait = function (ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); };
  let active, sequence = 0, arrivalTimer, navigationTimer, navigating = false;

  function canAnimate() { return !reduced.matches && !print.matches && !document.hidden; }
  function clearCover() {
    clearTimeout(arrivalTimer);
    delete root.dataset.cafeNavigation;
    root.style.removeProperty('--cafe-transition-color');
  }
  function cancelStyle() {
    sequence++;
    if (active) active.skipTransition();
    active = undefined;
    delete root.dataset.cafeMotion;
    if (root.dataset.cafeNavigation === 'style-cover' || root.dataset.cafeNavigation === 'style-reveal') clearCover();
  }
  function colorOfStyle() { return getComputedStyle(root).getPropertyValue('--cafe-primary').trim() || '#1648ac'; }
  function arrivalReady() {
    if (root.dataset.cafeNavigation !== 'arriving') return;
    if (!canAnimate()) { clearCover(); return; }
    root.dataset.cafeNavigation = 'revealing';
    arrivalTimer = setTimeout(clearCover, 460);
  }

  // A handoff exists only after a link changes style, and expires quickly.
  // Reload, direct URLs and restricted storage retain ordinary page behaviour.
  try {
    const handoff = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    sessionStorage.removeItem(storageKey);
    const here = new URL(location.href); here.hash = '';
    if (handoff && typeof handoff.fromStyle === 'string' && typeof handoff.toStyle === 'string'
      && handoff.fromStyle !== handoff.toStyle && handoff.to === here.href
      && Date.now() - handoff.created < 10000 && canAnimate()) {
      if (CSS.supports('color', handoff.color)) root.style.setProperty('--cafe-transition-color', handoff.color);
      root.dataset.cafeNavigation = 'arriving';
      arrivalTimer = setTimeout(clearCover, 6000);
    }
  } catch (reason) { /* file:// or privacy settings may restrict sessionStorage. */ }

  async function styleChange(update, isCurrent, animate) {
    const token = sequence;
    if (!animate || !canAnimate()) { if (isCurrent()) await update(); return; }
    if (typeof document.startViewTransition === 'function') {
      root.dataset.cafeMotion = 'style';
      let transition;
      try {
        transition = document.startViewTransition(async function () {
          if (isCurrent()) await update();
        });
      } catch (reason) { delete root.dataset.cafeMotion; }
      if (transition) {
        active = transition;
        transition.ready.catch(function () {});
        const finish = function () {
          if (active !== transition) return;
          active = undefined;
          delete root.dataset.cafeMotion;
        };
        transition.finished.then(finish, finish);
        await transition.updateCallbackDone;
        return;
      }
    }
    // Equivalent reveal when View Transitions is unavailable, without cloning
    // forms, replacing the document, or changing focus and draft state.
    root.style.setProperty('--cafe-transition-color', colorOfStyle());
    root.dataset.cafeNavigation = 'style-cover';
    await wait(160);
    if (!isCurrent()) return;
    if (token !== sequence) { await update(); return; }
    try {
      await update();
      if (token !== sequence) return;
      root.dataset.cafeNavigation = 'style-reveal';
      arrivalTimer = setTimeout(clearCover, 460);
    } catch (reason) { clearCover(); throw reason; }
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !canAnimate()) return;
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || link.target && link.target !== '_self') return;
    const target = new URL(link.href, location.href), here = new URL(location.href);
    const folder = here.pathname.slice(0, here.pathname.lastIndexOf('/') + 1);
    if (target.origin !== here.origin || target.pathname.slice(0, target.pathname.lastIndexOf('/') + 1) !== folder || !/\/(index|menu|locale|contatti)\.html$/.test(target.pathname)) return;
    if (target.pathname === here.pathname && target.search === here.search) return;
    const styles = window.CAFFE_STYLES;
    if (!Array.isArray(styles) || !styles.length) return;
    const requested = target.searchParams.get('stile');
    const toStyle = styles.some(function (style) { return style.id === requested; }) ? requested : 'flat';
    const fromStyle = root.dataset.style;
    // Ordinary navigation within the current visual world stays native.
    if (fromStyle === toStyle) return;
    if (navigating) { event.preventDefault(); return; }
    const color = colorOfStyle(), destination = new URL(target.href); destination.hash = '';
    try { sessionStorage.setItem(storageKey, JSON.stringify({ to: destination.href, fromStyle: fromStyle, toStyle: toStyle, color: color, created: Date.now() })); }
    catch (reason) { return; }
    event.preventDefault();
    cancelStyle();
    navigating = true;
    root.style.setProperty('--cafe-transition-color', color);
    root.dataset.cafeNavigation = 'leaving';
    navigationTimer = setTimeout(function () { location.assign(target.href); }, 160);
  });
  window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    clearTimeout(navigationTimer);
    navigating = false;
    cancelStyle(); clearCover();
  });
  function reduceMotion() { if (canAnimate()) return; cancelStyle(); clearCover(); }
  reduced.addEventListener('change', reduceMotion);
  window.addEventListener('beforeprint', function () { cancelStyle(); clearCover(); });
  window.CAFFE_TRANSITIONS = { cancelStyle: cancelStyle, styleChange: styleChange, arrivalReady: arrivalReady };
})();
