/* Frozen local controls for the original iLMeteo page capture.
 * It never requests forecasts, tiles, ads, analytics or geolocation remotely.
 * Original content, DOM and CSS are retained; only existing controls are wired.
 */
(() => {
  const one = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const unavailable = () => window.alert('Questa destinazione o funzione non è stata acquisita. La copia locale comprende Home, Milano e Meteo domani. Home e Italia sono acquisite l’8 ottobre; Milano il 9 ottobre 2026.');
  const page = document.querySelector('script[data-page]')?.dataset.page;
  document.documentElement.dataset.capture = 'offline';
  // The source fills this span at runtime. Freeze it to the acquired edition.
  if (one('#year')) one('#year').textContent = '2026';
  // Equivalent to the original initMainMenu/activateItem on page load.
  all('.main_menu__list__item').forEach(item => item.classList.remove('selected'));
  one('.main_menu__list__item--' + (page === 'home' ? 'home' : 'previsioni'))?.classList.add('selected');

  all('a[data-live-href], area[data-live-href]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    unavailable();
  }));
  all('form.search_bar').forEach(form => {
    const search = form.querySelector('input[type=text]');
    const submit = event => {
      event.preventDefault();
      if (search.value.trim().toLocaleLowerCase('it') === 'milano') location.href = 'milano.html';
      else unavailable();
    };
    form.addEventListener('submit', submit);
    form.querySelector('.search_bar__button_cerca')?.addEventListener('click', submit);
    form.querySelector('#search-button-elenco')?.addEventListener('click', () => {
      const dropdown = form.querySelector('.search_bar__dropdown');
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    search.addEventListener('input', () => {
      const dropdown = form.querySelector('.search_bar__dropdown');
      dropdown.style.display = search.value.trim() ? 'block' : 'none';
      all('.search_bar__dropdown a').forEach(link => {
        const matches = link.textContent.toLocaleLowerCase('it').includes(search.value.toLocaleLowerCase('it'));
        link.parentElement.style.display = matches ? '' : 'none';
      });
    });
  });
  one('.main_menu__list__item--hamburger > div')?.addEventListener('click', () => {
    const menu = one('.side_menu');
    menu.classList.remove('hidden');
    menu.classList.toggle('side_menu--visible');
  });
  document.addEventListener('click', event => {
    const menu = one('.side_menu');
    if (!event.target.closest('.side_menu, .main_menu__list__item--hamburger')) menu?.classList.remove('side_menu--visible');
    if (!event.target.closest('.search_bar')) all('.search_bar__dropdown').forEach(item => item.style.display = 'none');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      one('.side_menu')?.classList.remove('side_menu--visible');
      all('.search_bar__dropdown').forEach(item => item.style.display = 'none');
    }
  });
  all('.home_carousel__list__controller, .news_carousel__controls__item a').forEach(control => control.addEventListener('click', event => {
    event.preventDefault();
    const list = control.closest('.home_carousel, .news_carousel')?.querySelector('ul:not(.news_carousel__controls)');
    if (!list?.children.length) return;
    if (control.closest('[class*="--prev"]')) list.prepend(list.lastElementChild);
    else list.append(list.firstElementChild);
  }));
  all('select').forEach(select => {
    select.dataset.initialValue = select.value;
    select.addEventListener('change', () => {
      if (select.id === 'edit-lid' && select.options[select.selectedIndex].textContent.trim() === 'Milano') location.href = 'milano.html';
      else { select.value = select.dataset.initialValue; unavailable(); }
    });
  });

  // The original hourly table already contains both 1h and 3h data, including
  // the original hidden rows; use these exact rows rather than interpolating.
  for (const hours of [1, 3]) one('#time-lapse-button-' + hours)?.addEventListener('click', () => {
    all('.forecast_1h, .forecast_3h').forEach(row => {
      const show = row.classList.contains('forecast_' + hours + 'h');
      row.classList.toggle('hidden', !show);
      row.style.display = show ? '' : 'none';
    });
    all('.forecast_gadgets2__time_lapse__button').forEach(button => button.classList.toggle('forecast_gadgets2__time_lapse__button--active', button.id.endsWith('-' + hours)));
  });
  const splitNumber = text => {
    const match = text.trim().match(/^([+-]?\d+(?:[.,]\d+)?)(.*)$/);
    return match ? {value:Number(match[1].replace(',', '.')),suffix:match[2]} : null;
  };
  const rounded = (value, precision) => {
    const fixed = value.toFixed(precision);
    return Number.isInteger(value) || Number(fixed) % 1 === 0 ? value.toFixed(0) : fixed;
  };
  const temperatureFields = all('.temp_cf, .tperc_cf');
  temperatureFields.forEach(element => {
    element.dataset.celsius = element.textContent;
    // The source updateAllTempCF initializer reveals these spans on load.
    // Keeping its source display:none without initialization loses the values.
    element.style.removeProperty('display');
    if (getComputedStyle(element).display === 'none') element.style.display = element.tagName === 'SPAN' ? 'inline' : 'block';
  });
  const dayTemperatureFields = all('.forecast_day_selector__list__item__link__values__lower, .forecast_day_selector__list__item__link__values__higher');
  dayTemperatureFields.forEach(element => element.dataset.celsius = element.textContent);
  const temperatureHeadingText = [];
  all('.descrih').forEach(element => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) temperatureHeadingText.push({node, source:node.data});
  });
  all('.switch_cf.c').forEach(element => element.classList.add('active'));
  all('.switch_cf').forEach(control => control.addEventListener('click', () => {
    const fahrenheit = control.classList.contains('f');
    all('.switch_cf').forEach(item => item.classList.toggle('active', item.classList.contains(fahrenheit ? 'f' : 'c')));
    temperatureFields.forEach(element => {
      const parts = splitNumber(element.dataset.celsius);
      if (!parts) return;
      const suffix = parts.suffix.replace('C', 'F');
      const tableSuffix = element.closest('.weather_table, .data-table-meteo') ? '°F' : '';
      element.textContent = fahrenheit ? rounded(parts.value * 1.8 + 32, 1) + suffix + tableSuffix : element.dataset.celsius;
    });
    dayTemperatureFields.forEach(element => {
      const parts = splitNumber(element.dataset.celsius);
      if (parts) element.textContent = fahrenheit ? rounded(parts.value * 1.8 + 32, 0) + parts.suffix.replace('C','F') : element.dataset.celsius;
    });
    temperatureHeadingText.forEach(({node, source}) => node.data = fahrenheit ? source.replace(/^0°C/g,'32°F').replace(/\(°C\)/g,'(°F)') : source);
  }));
  all('.wind_kmkn').forEach(element => element.dataset.kmh = element.textContent);
  const windSuffixNodes = [];
  all('.switch_kmkn.km').forEach(element => element.classList.add('active'));
  all('.wind_sep_kmkn').forEach(element => element.classList.add('max'));
  all('.switch_kmkn').forEach(control => control.addEventListener('click', () => {
    const knots = control.classList.contains('kn');
    all('.switch_kmkn').forEach(item => item.classList.toggle('active', item.classList.contains(knots ? 'kn' : 'km')));
    all('.wind_kmkn').forEach(element => {
      const parts = splitNumber(element.dataset.kmh);
      if (parts) element.textContent = knots ? rounded(parts.value / 1.852, 0) + parts.suffix.replace('km/h','nodi') : element.dataset.kmh;
    });
    windSuffixNodes.splice(0).forEach(node => node.remove());
    if (knots) all('.weather_table .descri .wind_kmkn, .weather_table td > abbr > .wind_kmkn').forEach(element => {
      if (element.matches('td > abbr > .wind_kmkn') && element.closest('td').querySelector('.descri .wind_kmkn')) return;
      const suffix = document.createTextNode(' kn');
      element.after(suffix); windSuffixNodes.push(suffix);
    });
    all('.wind_sep_kmkn').forEach(element => element.classList.toggle('max', !knots));
  }));
  one('.forecast_gadgets2__more_data__button')?.addEventListener('click', () => {
    one('.weather_table')?.classList.toggle('more_data');
    one('.forecast_gadgets2__more_data')?.classList.toggle('active');
  });
  // Reproduce the source's native forecast-dialog opening and closing. The
  // archived markup already holds every value; no remote forecast is fetched.
  all('.forecast-dialog-open').forEach(row => row.addEventListener('click', () => {
    const dialog = document.getElementById('dialog-dettaglio-' + row.dataset.dialogid);
    if (dialog) dialog.showModal();
    else console.warn('Il collegamento della fonte non identifica un pannello acquisito per questa riga.', row.dataset.dialogid);
  }));
  all('.meteo-dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog')?.close()));
  one('.forecast_gadgets2__bulletin__menu')?.addEventListener('click', () => {
    const menu = one('.forecast_gadgets2__bulletin__list');
    if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
  all('.weather_informations--collapse .weather_informations__box__title').forEach(control => control.addEventListener('click', () => control.parentElement.classList.toggle('weather_informations--collapse--opened')));
  all('.forecast_gadgets2__365days__button, #apri-mappa-radar-amp').forEach(control => control.addEventListener('click', unavailable));
  all('[data-snapshot-map] .leaflet-control a:not(.leaflet-control-attribution a)').forEach(control => {
    control.setAttribute('aria-disabled', 'true');
    control.title = 'Mappa acquisita: questo controllo live è disattivato nella copia locale';
    control.addEventListener('click', event => { event.preventDefault(); unavailable(); });
  });
  all('[data-snapshot-map] input').forEach(control => { control.disabled = true; });

  if (page === 'domani') {
    // Materialize the original inline script's mobile map initializer: its img
    // has no src in the raw response, even though the image itself is public.
    const mobileMap = one('.daily_forecast__map_container img');
    if (mobileMap && window.ILMETEO_SNAPSHOT?.mobileTomorrowMap) {
      const width = innerWidth >= 450 ? 425 : 315;
      mobileMap.src = window.ILMETEO_SNAPSHOT.mobileTomorrowMap;
      mobileMap.style.width = width + 'px';
      mobileMap.style.height = (width === 425 ? 460 : 340) + 'px';
      mobileMap.setAttribute('usemap', width === 425 ? '#mappa-italia-big' : '#ita');
      mobileMap.parentElement.style.maxWidth = width + 'px';
      if (innerWidth <= 1024) all('.daily_forecast__general, .daily_forecast__general__time').forEach(element => element.style.maxWidth = width + 'px');
    }
    let part = 'g';
    let kind = 'n';
    const update = () => {
      const source = part === 'g' ? one('#bigmap_image') : one('#daily_map_' + part + (kind === 'p' ? 'p' : ''));
      const destination = one('.daily_forecast__map_container img');
      if (!source?.getAttribute('src')) { unavailable(); return; }
      if (destination) destination.src = source.src;
      all('.daily_forecast__general__time__item').forEach(item => item.classList.toggle('daily_forecast__general__time__item--active', item.id.endsWith('_' + part)));
      all('.daily_forecast__general__menu__item').forEach(item => item.classList.toggle('daily_forecast__general__menu__item--active', item.id.endsWith('_' + kind)));
      all('.daily_forecast__general__time__item').filter(item => item.id.endsWith('_g')).forEach(item => item.style.display = kind === 'p' ? 'none' : '');
      all('.daily_forecast__maps__maps').forEach(maps => [...maps.children].forEach((image, index) => image.style.display = kind === 'p' ? (index === 1 ? '' : 'none') : ''));
    };
    all('[id^=daily_forecast_general_time_] a').forEach(control => control.addEventListener('click', event => { event.preventDefault(); part = control.parentElement.id.split('_').pop(); update(); }));
    all('[id^=daily_forecast_general_menu_] a').forEach(control => control.addEventListener('click', event => { event.preventDefault(); kind = control.parentElement.id.split('_').pop(); if (kind === 'p' && part === 'g') part = 'm'; update(); }));
  }

  if (page === 'home') {
    let kind = '9';
    let part = '2';
    const maps = window.ILMETEO_SNAPSHOT?.maps || {};
    const show = () => {
      const url = maps[kind + ':' + part];
      if (kind !== '9' && !url) { unavailable(); return; }
      all('#bigmap-container > div').forEach(div => div.style.display = 'none');
      if (kind === '9') {
        const radar = one('#bigmap-div10');
        if (radar) radar.style.display = '';
      } else {
        const div = one('#bigmap-div' + (kind === '1' || kind === '4' ? '1' : kind === '3' ? '3' : '0'));
        if (div) { div.style.display = ''; div.querySelector('img').src = url; }
      }
      all('[id^=bigmap-type-]').forEach(item => item.classList.toggle('block_weather_prevision__forecast_maps__map__forecast_menu__item--active', item.id.endsWith('-' + kind)));
      all('[id^=bigmap-part-]').forEach(item => item.classList.toggle('block_weather_prevision__forecast_maps__map__forecast_time__item--active', item.id.endsWith('-' + part)));
      one('.block_weather_prevision__forecast_maps__map__forecast_time').style.display = kind === '9' ? 'none' : '';
      one('#bigmap-part-0').style.display = kind === '1' || kind === '4' ? 'none' : '';
    };
    all('[id^=bigmap-type-] a').forEach(control => control.addEventListener('click', event => {
      event.preventDefault(); kind = control.parentElement.id.split('-').pop();
      if ((kind === '1' || kind === '4') && part === '0') part = '1';
      show();
    }));
    all('[id^=bigmap-part-] a').forEach(control => control.addEventListener('click', event => { event.preventDefault(); part = control.parentElement.id.split('-').pop(); show(); }));
    show();
  }
  document.documentElement.dataset.captureReady = 'true';
})();
