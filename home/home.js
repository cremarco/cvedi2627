(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.motion-toggle');
  const label = toggle.querySelector('span');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  function sync() {
    const stopped = paused || reduced.matches || document.hidden;
    root.dataset.motion = reduced.matches ? 'static' : stopped ? 'paused' : 'running';
    toggle.hidden = reduced.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    label.textContent = paused ? 'Riprendi le tracce' : 'Ferma le tracce';
  }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
})();
