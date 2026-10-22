(function () {
  'use strict';
  const cafe = document.getElementById('cafe');
  const filters = Array.from(cafe.querySelectorAll('.menu-filter'));
  const categories = Array.from(cafe.querySelectorAll('.menu-category'));
  const status = cafe.querySelector('.menu-filter-status');
  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      const chosen = button.dataset.category;
      filters.forEach(function (filter) { filter.setAttribute('aria-pressed', String(filter === button)); });
      categories.forEach(function (category) { category.hidden = chosen !== 'all' && category.dataset.product !== chosen; });
      if (status) status.textContent = chosen === 'all' ? 'Tutte le categorie del menu.' : button.textContent + ': categoria aperta.';
    });
  });
  const form = document.getElementById('contact-form');
  if (form) {
    let draftURL;
    let draftReady = false;
    const result = document.getElementById('contact-result');
    const nameField = form.elements.namedItem('nome');
    const messageField = form.elements.namedItem('messaggio');
    [nameField, messageField].forEach(function (field) { field.addEventListener('input', function () { field.setCustomValidity(''); }); });
    function invalidateDraft() {
      if (!draftReady) return;
      draftReady = false;
      URL.revokeObjectURL(draftURL);
      draftURL = undefined;
      const notice = document.createElement('p');
      notice.textContent = 'Hai modificato il messaggio. Premi «Prepara il messaggio» per aggiornare la bozza.';
      result.replaceChildren(notice);
    }
    form.addEventListener('input', invalidateDraft);
    form.addEventListener('change', invalidateDraft);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      nameField.setCustomValidity(nameField.value.trim() ? '' : 'Scrivi il tuo nome.');
      messageField.setCustomValidity(messageField.value.trim().length >= 10 ? '' : 'Scrivi un messaggio di almeno dieci caratteri.');
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const message = 'Da: ' + values.get('nome').trim() + ' <' + values.get('email').trim() + '>\n\n' + values.get('messaggio').trim();
      const subject = values.get('argomento');
      const text = document.createElement('p');
      text.textContent = 'La bozza è pronta. Puoi salvarla o aprirla nella tua posta; il sito non ha inviato il messaggio.';
      const download = document.createElement('a');
      if (draftURL) URL.revokeObjectURL(draftURL);
      draftURL = URL.createObjectURL(new Blob([subject + '\n\n' + message], { type: 'text/plain;charset=utf-8' }));
      download.href = draftURL;
      download.download = 'messaggio-caffe-ttc.txt';
      download.textContent = 'Salva la bozza';
      download.className = 'btn draft-action';
      const email = document.createElement('a');
      email.href = 'mailto:' + window.CAFFE_CONTENT.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);
      email.textContent = 'Apri nella tua posta';
      email.className = 'btn draft-action';
      result.replaceChildren(text, download, email);
      draftReady = true;
    });
  }
})();
