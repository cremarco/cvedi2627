/* Home-only controls. Keep data/asset catalogs independent from presentation.
 * No captured-page initialization, network calls or native inline handlers.
 */
(() => {
  const notice = document.querySelector('#snapshot-unavailable');
  const noticeDescription = notice?.querySelector('p');
  const defaultNotice = noticeDescription?.textContent;
  const unavailable = message => {
    if (!notice || notice.open) return;
    noticeDescription.textContent = message || defaultNotice;
    notice.showModal();
  };
  document.documentElement.dataset.capture = 'offline';
  document.documentElement.dataset.captureReady = 'true';

  // Leave supplied ad artwork and world search fully visible with the fixed action.
  const reportFab = document.querySelector('#weather-report-fab');
  const reportLink = reportFab?.querySelector('a');
  if (reportFab && reportLink) {
    const name = reportLink.textContent.replace(/\s+/g, ' ').trim();
    reportLink.setAttribute('aria-label', name);
    reportLink.title = name;
    const advertisements = [...document.querySelectorAll('.home-ad__link')];
    const worldDiscovery = [...document.querySelectorAll('.world-discovery')];
    let fullWidth = reportLink.getBoundingClientRect().width;
    const clearAdArtwork = () => {
      const rect = reportLink.getBoundingClientRect();
      if (!reportFab.hasAttribute('data-clear-ad') && !reportFab.hasAttribute('data-clear-world')) fullWidth = rect.width;
      const left = rect.right - fullWidth;
      const overlaps = elements => elements.some(element => {
        const box = element.getBoundingClientRect();
        return box.width && box.height && box.left < rect.right && box.right > left && box.top < rect.bottom && box.bottom > rect.top;
      });
      reportFab.toggleAttribute('data-clear-ad', overlaps(advertisements));
      reportFab.toggleAttribute('data-clear-world', overlaps(worldDiscovery));
    };
    const schedule = window.ILMETEO_UI.scheduleFrame(clearAdArtwork);
    addEventListener('scroll', schedule, {passive:true});
    addEventListener('resize', schedule, {passive:true});
    document.fonts.ready.then(schedule);
    schedule();
  }

  // Every acquired summary stays in HTML for no-script reading and printing.
  const summaries = document.querySelector('[data-summary-tabs]');
  const summaryTabs = [...(summaries?.querySelectorAll('a[href^="#summary-panel-"]') || [])];
  const summaryPanels = [...document.querySelectorAll('[data-summary-panel]')];
  if (summaryTabs.length === summaryPanels.length && summaryTabs.length) {
    summaries.setAttribute('role', 'tablist');
    summaries.setAttribute('aria-label', 'Date delle previsioni sintetiche');
    summaryTabs.forEach((tab, index) => {
      tab.setAttribute('aria-controls', summaryPanels[index].id);
      summaryPanels[index].setAttribute('role', 'tabpanel');
      summaryPanels[index].setAttribute('aria-labelledby', tab.id);
      summaryPanels[index].tabIndex = 0;
    });
    window.ILMETEO_UI.tabs(summaries, summaryTabs, {
      select(index) { summaryPanels.forEach((panel, position) => { panel.hidden = position !== index; }); },
    });
  }

  // Delegation also supports links added by future home components.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-live-href]');
    if (!link) return;
    event.preventDefault();
    const locality = link.closest('#city_list');
    unavailable(locality ? `Le previsioni per ${link.textContent.trim()} non sono state acquisite. La copia comprende Milano, Home e Meteo domani.` : undefined);
  });

  const form = document.querySelector('form.search_bar');
  const input = form?.querySelector('input');
  const results = form?.querySelector('.search_bar__dropdown');
  const listButton = form?.querySelector('#search-button-elenco');
  const status = form?.querySelector('#locality-status');
  function setResults(open) {
    if (!results) return;
    results.hidden = !open;
    results.style.display = open ? 'block' : 'none';
    input.setAttribute('aria-expanded', String(open));
    listButton.setAttribute('aria-expanded', String(open));
  }
  if (form && input && results) {
    const cityList = results.querySelector('#city_list');
    const entries = [...cityList.querySelectorAll('li:has(a)')];
    const normalize = value => value.trim().toLocaleLowerCase('it');
    const setStatus = message => {
      status.textContent = message;
      status.hidden = !message;
    };
    function filterResults() {
      const query = normalize(input.value);
      let count = 0;
      entries.forEach(item => {
        item.hidden = !normalize(item.textContent).includes(query);
        if (!item.hidden) count++;
      });
      cityList.querySelectorAll('ul').forEach(group => {
        group.hidden = ![...group.querySelectorAll('li:has(a)')].some(item => !item.hidden);
      });
      [...cityList.children].forEach(column => {
        column.hidden = ![...column.querySelectorAll('ul')].some(group => !group.hidden);
      });
      cityList.hidden = !count;
      setStatus(count ? '' : 'Nessuna località trovata nell’elenco. Nella copia puoi consultare Milano.');
      return count;
    }
    listButton.setAttribute('aria-controls', results.id);
    listButton.setAttribute('aria-expanded', 'false');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const query = normalize(input.value);
      const count = filterResults();
      if (query === 'milano') location.href = 'milano.html';
      else if (!query) {
        setStatus('Scrivi una località. Nella copia puoi consultare Milano.');
        setResults(true);
        input.focus();
      } else if (!count) setResults(true);
      else {
        const exact = entries.find(item => normalize(item.textContent) === query);
        if (exact) unavailable(`Le previsioni per ${exact.textContent.trim()} non sono state acquisite. La copia comprende Milano, Home e Meteo domani.`);
        else {
          setStatus('Scegli una località dall’elenco. Nella copia puoi consultare Milano.');
          setResults(true);
        }
      }
    });
    listButton.addEventListener('click', () => {
      const open = results.hidden;
      filterResults();
      setResults(open);
    });
    input.addEventListener('input', () => {
      filterResults();
      setResults(Boolean(normalize(input.value)));
    });
  }
  const navigation = document.querySelector('.main_menu__list');
  const menus = [...(navigation?.querySelectorAll(':scope > li > details') || [])];
  const placeMenu = menu => {
    const rect = menu.querySelector('summary').getBoundingClientRect();
    const width = Math.min(300, innerWidth - 16);
    menu.style.setProperty('--nav-menu-top', `${rect.bottom + 4}px`);
    menu.style.setProperty('--nav-menu-left', `${Math.max(8, Math.min(rect.left, innerWidth - width - 8))}px`);
  };
  menus.forEach(menu => menu.addEventListener('toggle', () => {
    if (!menu.open) return;
    menus.forEach(other => { if (other !== menu) other.open = false; });
    placeMenu(menu);
  }));
  const placeOpenMenus = () => menus.filter(menu => menu.open).forEach(placeMenu);
  navigation?.addEventListener('scroll', placeOpenMenus, {passive: true});
  addEventListener('resize', placeOpenMenus, {passive: true});
  addEventListener('scroll', placeOpenMenus, {passive: true});
  const sideMenu = document.querySelector('.side_menu');
  document.addEventListener('click', event => {
    if (!event.target.closest('.search_bar')) setResults(false);
    if (!event.target.closest('.side_menu, .main_menu__list__item--hamburger')) sideMenu?.classList.remove('side_menu--visible');
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    setResults(false);
    sideMenu?.classList.remove('side_menu--visible');
    document.querySelectorAll('.main_menu details[open]').forEach(item => { item.open = false; });
  });
})();
