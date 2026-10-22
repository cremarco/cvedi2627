(() => {
  const root = document.documentElement;
  const opening = document.querySelector('.course-opening');
  const scene = document.querySelector('.metro-scene svg');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let finished = false;
  let inView = true;
  function sync() {
    const stopped = document.hidden || !inView;
    root.dataset.motion = finished || reduced.matches ? 'static' : stopped ? 'paused' : 'running';
  }
  function sizeJourneys() {
    const bounds = scene.getBoundingClientRect();
    const scale = Math.max(bounds.width / 1741, bounds.height / 903);
    scene.querySelectorAll('.metro-packet').forEach(packet => {
      // Equal distance takes equal time, even when the map is cropped on phone.
      packet.style.setProperty('--route-duration', `${packet.getTotalLength() * scale / 75}s`);
    });
  }
  let hovered = null;
  function syncRoute() {
    const focused = document.activeElement?.closest('a[data-route-family]');
    const family = hovered?.dataset.routeFamily || focused?.dataset.routeFamily;
    if (family) root.dataset.routeFamily = family;
    else delete root.dataset.routeFamily;
  }
  document.querySelectorAll('a[data-route-family]').forEach(link => {
    link.addEventListener('pointerenter', () => { hovered = link; syncRoute(); });
    link.addEventListener('pointerleave', () => { hovered = null; syncRoute(); });
    link.addEventListener('focus', syncRoute);
    link.addEventListener('blur', syncRoute);
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }).observe(opening);
  }
  if ('ResizeObserver' in window) new ResizeObserver(sizeJourneys).observe(scene);
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sizeJourneys();
  sync();
  // A short entrance needs no persistent pause control or continuing loop.
  window.setTimeout(() => { finished = true; sync(); }, 4500);
})();
