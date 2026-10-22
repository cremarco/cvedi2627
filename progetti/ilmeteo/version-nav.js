/* Local version comparison. Links remain usable without script or storage. */
(() => {
  const storageKey = 'ilmeteo-version-navigation';
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let incoming;
  try {
    incoming = JSON.parse(sessionStorage.getItem(storageKey));
    sessionStorage.removeItem(storageKey);
  } catch { /* Storage is optional, including file://. */ }
  const validIncoming = incoming?.url === location.href && Date.now() - incoming.time < 10000;
  if (validIncoming && !reduced()) document.documentElement.dataset.versionDirection = incoming.version;
  let switching = false;
  addEventListener('pageswap', event => {
    if (!switching || reduced()) event.viewTransition?.skipTransition();
  });
  addEventListener('pagereveal', event => {
    if (!validIncoming || reduced()) event.viewTransition?.skipTransition();
  });
  addEventListener('pageshow', () => { switching = false; });
  addEventListener('DOMContentLoaded', () => {
    // A short reveal preserves the same direction where cross-document transitions are unavailable.
    if (validIncoming && !reduced() && !('onpagereveal' in window)) {
      document.body.animate([
        {clipPath: incoming.version === 'redesign' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'},
        {clipPath: 'inset(0)'}
      ], {duration:450, easing:'cubic-bezier(.16,1,.3,1)'});
    }
    document.querySelector('[data-version-switch]')?.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.currentTarget;
      try { sessionStorage.setItem(storageKey, JSON.stringify({url:link.href, version:link.dataset.versionSwitch, time:Date.now()})); } catch {}
      switching = true;
      document.documentElement.dataset.versionDirection = link.dataset.versionSwitch;
    });
  });
})();
