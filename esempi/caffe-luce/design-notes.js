/* A non-modal teaching layer, independent of the visual world's layout. */
(function () {
  'use strict';
  const cafe = document.getElementById('cafe');
  const notes = document.getElementById('design-notes');
  if (!cafe || !notes) return;
  const summary = notes.querySelector('summary');
  const closeButton = notes.querySelector('.design-notes-close');
  const title = notes.querySelector('#design-notes-title');
  const years = notes.querySelector('.design-notes-years');
  const intro = notes.querySelector('.design-notes-intro');
  const features = notes.querySelector('.design-notes-features');
  const reference = notes.querySelector('.design-notes-reference');
  const content = window.CAFFE_STYLE_NOTES_DATA || {};
  const styles = window.CAFFE_STYLES || [];

  function close() {
    const returnFocus = notes.contains(document.activeElement);
    notes.open = false;
    if (returnFocus) summary.focus({ preventScroll: true });
  }
  function update() {
    const style = styles.find(function (entry) { return entry.id === cafe.dataset.style; });
    const description = style && content[style.id];
    if (!description) return;
    notes.dataset.style = style.id;
    title.textContent = style.label;
    years.textContent = style.years + ' · periodo di riferimento';
    intro.textContent = description.intro;
    features.replaceChildren();
    description.features.forEach(function (feature) {
      const item = document.createElement('div');
      const label = document.createElement('dt'); label.textContent = feature.label;
      const text = document.createElement('dd'); text.textContent = feature.text;
      item.append(label, text); features.append(item);
    });
    const source = style.sources.find(function (entry) { return !entry.url.includes('figma.com'); }) || style.sources[0];
    reference.hidden = !source;
    if (source) { reference.href = source.url; reference.textContent = 'Approfondisci · ' + source.label; }
    summary.setAttribute('aria-label', 'Caratteristiche del design: ' + style.label);
  }
  closeButton.hidden = false;
  closeButton.addEventListener('click', close);
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' || !notes.open || document.querySelector('dialog[open]')) return;
    try { if (event.target.matches('select:open')) return; } catch (reason) { /* Older engines may not implement :open. */ }
    event.preventDefault(); close();
  });
  document.addEventListener('click', function (event) {
    if (!notes.open || notes.contains(event.target) || event.target.closest('.style-control')) return;
    close();
  });
  new MutationObserver(update).observe(cafe, { attributes: true, attributeFilter: ['data-style'] });
  update();
})();
