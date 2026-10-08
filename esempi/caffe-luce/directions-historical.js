(function () {
  'use strict';
  let cafe;
  let activeStyle;
  let previousDetails = [];
  let previousFilter;
  const additions = [];
  const asset = 'assets/redesign/historical/';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }
  function register(element, style, parent, before) {
    element.dataset.historicalStyle = style;
    element.hidden = true;
    additions.push(element);
    parent.insertBefore(element, before || null);
    return element;
  }
  function gif(file, label, className) {
    const image = node('img', className);
    image.dataset.motionGif = file;
    image.alt = label;
    image.width = file === 'coffee-steam' ? 104 : 54;
    image.height = file === 'coffee-steam' ? 58 : 24;
    return image;
  }
  function updateMotion() {
    if (!cafe) return;
    cafe.querySelectorAll('[data-motion-gif]').forEach(function (image) {
      if (cafe.dataset.style !== 'html') {
        image.removeAttribute('src');
        return;
      }
      const file = image.dataset.motionGif;
      image.src = asset + (motion.matches ? (file === 'coffee-steam' ? 'coffee-still.png' : 'new-still.png') : file + '.gif');
    });
  }
  function pageLink(label, target, style) {
    const link = node('a', '', label);
    link.href = target + '?stile=' + style;
    return link;
  }
  function init(root) {
    if (cafe) return;
    cafe = root;
    const header = cafe.querySelector('.cafe-header');
    const footer = cafe.querySelector('.cafe-footer');

    const welcome = node('div', 'hist-web-welcome');
    welcome.append(gif('coffee-steam', 'Una tazzina di caffè con il vapore animato.', 'hist-coffee-gif'));
    const greeting = node('p', '', 'Benvenuti nel sito del Caffè TTC!');
    const links = node('p', 'hist-web-directory');
    links.append(pageLink('Il nostro menu', 'menu.html', 'html'), document.createTextNode(' | '), pageLink('Dove siamo', 'contatti.html', 'html'), document.createTextNode(' | '));
    const mail = node('a', '', 'Scriveteci');
    mail.href = 'mailto:' + (window.CAFFE_CONTENT?.email || 'ciao@caffettc.example');
    links.append(mail);
    const copy = node('div', 'hist-welcome-copy');
    copy.append(greeting, links);
    welcome.append(copy, gif('new', 'NEW, decorazione animata in stile primo web.', 'hist-new-gif'));
    register(welcome, 'html', cafe, header.nextSibling);

    const webStamp = node('div', 'hist-web-stamp');
    webStamp.append(node('span', 'hist-html-badge', 'TTC · HTML'), node('span', '', 'Tempo. Tazza. Conversazione.'));
    register(webStamp, 'html', footer);

    const titlebar = node('div', 'hist-xp-titlebar');
    titlebar.setAttribute('aria-hidden', 'true');
    titlebar.append(node('span', 'hist-xp-app-icon', 'TTC'), node('span', 'hist-xp-window-name', 'Caffè TTC — Web Explorer'));
    const controls = node('span', 'hist-xp-window-controls');
    ['minimize', 'maximize', 'close'].forEach(function (kind) { controls.append(node('i', 'hist-xp-' + kind)); });
    titlebar.append(controls);
    register(titlebar, 'web2', cafe, header);
    const toolbar = node('div', 'hist-xp-menubar');
    toolbar.setAttribute('aria-hidden', 'true');
    toolbar.append(node('span', '', 'File'), node('span', '', 'Modifica'), node('span', '', 'Visualizza'), node('span', '', 'Preferiti'), node('span', '', 'Strumenti'));
    register(toolbar, 'web2', cafe, header);
    const portal = node('div', 'hist-portal-strip');
    const daily = node('div', 'hist-portal-daily');
    daily.append(node('strong', '', 'La pausa comincia qui'), node('span', '', 'Caffè, colazione e due parole al banco.'));
    portal.append(daily, pageLink('Guarda il menu completo', 'menu.html', 'web2'), pageLink('Orari e contatti', 'contatti.html', 'web2'));
    register(portal, 'web2', cafe, header.nextSibling);

    cafe.querySelectorAll('.cafe-nav a').forEach(function (link, index) {
      const icon = node('span', 'hist-ios-icon hist-ios-icon-' + (index + 1));
      icon.setAttribute('aria-hidden', 'true');
      register(icon, 'scheu', link, link.firstChild);
    });
    const opener = node('a', 'btn hist-menu-open', 'Apri il menu');
    opener.href = '#historical-menu-pages';
    const menu = cafe.querySelector('.menu-page-products');
    const intro = cafe.querySelector('.page-intro');
    if (menu && intro) {
      menu.id = 'historical-menu-pages';
      register(opener, 'scheu', intro);
      const ribbon = node('span', 'hist-menu-ribbon');
      ribbon.setAttribute('aria-hidden', 'true');
      register(ribbon, 'scheu', intro);
    }
    const objects = node('div', 'hist-counter-objects');
    objects.setAttribute('aria-hidden', 'true');
    const coffeeIcon = node('span', 'hist-ios-object hist-ios-object-coffee');
    const pastryIcon = node('span', 'hist-ios-object hist-ios-object-pastry');
    objects.append(coffeeIcon, pastryIcon);
    register(objects, 'scheu', cafe, footer);
    const textMail = node('p', 'hist-text-mail');
    const email = window.CAFFE_CONTENT?.email || 'ciao@caffettc.example';
    const emailLink = node('a', '', 'Scrivi a ' + email);
    emailLink.href = 'mailto:' + email;
    textMail.append(emailLink);
    const contact = cafe.querySelector('.contact-message');
    if (contact) register(textMail, 'text', contact);
    motion.addEventListener('change', updateMotion);
  }
  function activate(style) {
    if (!cafe) return Promise.resolve();
    const id = typeof style === 'string' ? style : style.id;
    if (activeStyle === 'text' && id !== 'text') {
      previousDetails.forEach(function (entry) { entry.element.open = entry.open; });
      previousDetails = [];
      if (previousFilter) previousFilter.click();
      previousFilter = undefined;
    }
    additions.forEach(function (element) { element.hidden = element.dataset.historicalStyle !== id; });
    if (id === 'text' && activeStyle !== 'text') {
      previousDetails = Array.from(cafe.querySelectorAll('.visit-directions')).map(function (element) { return { element: element, open: element.open }; });
      previousFilter = cafe.querySelector('.menu-filter[aria-pressed="true"]');
      const all = cafe.querySelector('.menu-filter[data-category="all"]');
      if (all) all.click();
      cafe.querySelectorAll('.visit-directions').forEach(function (details) { details.open = true; });
    }
    activeStyle = id;
    updateMotion();
    return Promise.resolve();
  }
  window.CAFFE_HISTORICAL = { init: init, activate: activate };
})();
