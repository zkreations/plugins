(function () {
  'use strict';

  // load script
  // @param {string} src - script source
  // @param {string} type - script type
  // @returns {Promise} - script loaded
  const loadScript = src => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });

  // Set attributes
  // @param {HTMLElement} element - element
  // @param {Object} attributes - attributes
  // @returns {void}
  const setAttributes = (element, attributes) => {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  };

  // Create thumbnail
  // @param {string} imageUrl - image url
  // @param {string} className - image class
  // @returns {HTMLImageElement} - image element
  function createThumbnail(imageUrl, className) {
    const $img = document.createElement('img');
    $img.classList.add(className);
    $img.src = imageUrl;
    $img.alt = 'thumbnail';
    $img.loading = 'lazy';
    return $img;
  }

  // Create array of ids
  // @param {HTMLElement} element - textarea element
  // @returns {Array} - array of ids
  function createArrayIds(element) {
    const ids = element.innerHTML.split('\n').map(id => id.trim()).filter(id => id !== '');
    return ids;
  }

  // Create embed
  // @param {string} url - url
  // @param {Object} params - attributes
  // @returns {HTMLIFrameElement} - iframe element
  function createEmbed({
    url,
    params = {}
  }) {
    const $iframe = document.createElement('iframe');
    $iframe.src = url;
    $iframe.frameborder = 0;
    setAttributes($iframe, params);
    return $iframe;
  }

  const element = document.getElementById('gTranslate');

  // Callback for Google Translate script
  // eslint-disable-next-line no-unused-vars
  function gtInit() {
    // eslint-disable-next-line no-new, no-undef
    new google.translate.TranslateElement({
      autoDisplay: 'true',
      pageLanguage: element.dataset.lang || document.documentElement.lang || 'en',
      includedLanguages: element.dataset.languages || '',
      // eslint-disable-next-line no-undef
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
    }, 'gTranslate');
  }
  function initializeTranslate() {
    if (!element) return;
    window.gtInit = gtInit;
    loadScript('https://translate.google.com/translate_a/element.js?cb=gtInit');
  }

  // Initialize Google Translate
  initializeTranslate();

  const elements$2 = document.querySelectorAll('.countdown');
  const TIME_UNITS = ['D', 'H', 'M', 'S'];
  const COUNT_INTERVALS = {};

  // Initialize countdown elements
  function initializeCountdowns() {
    if (elements$2.length === 0) return;
    elements$2.forEach(element => {
      const items = createCountdownItems();
      const finalMessage = element.innerHTML;
      const finalDate = new Date(element.dataset.countdown).getTime();
      element.innerHTML = '';
      element.classList.add('countdown-started');
      if (countdownIsFinished(finalDate)) {
        element.innerHTML = finalMessage;
        return;
      }
      items.forEach(item => element.appendChild(item));
      COUNT_INTERVALS[element] = setInterval(() => {
        updateCountdowns(element, finalDate, finalMessage);
      }, 1000);
    });
  }

  // Create countdown items
  // @return {Array}
  function createCountdownItems() {
    return TIME_UNITS.map(createCountdownItem);
  }

  // Create countdown item
  // @param {String} unit - Time unit
  // @return {HTMLElement}
  function createCountdownItem(unit) {
    const item = document.createElement('div');
    item.classList.add('countdown-value');
    item.innerHTML = `
    <span class="countdown-number">00</span>
    <span class="countdown-name">${unit}</span>
  `;
    return item;
  }

  // Check if countdown is finished
  // @param {Number} finalTime - Final time in ISO format
  // @return {Boolean}
  function countdownIsFinished(finalTime) {
    return finalTime < Date.now();
  }

  // Update countdown display
  // @param {HTMLElement} element - Countdown element
  // @param {Number} finalTime - Final time in ISO format
  // @param {String} finalMessage - Final message to display
  // @return {Void}
  function updateCountdowns(element, finalTime, finalMessage) {
    const currentTime = Date.now();
    const distance = finalTime - currentTime;
    if (distance <= 0) {
      clearInterval(COUNT_INTERVALS[element]);
      element.innerHTML = finalMessage;
      return;
    }
    const timeValues = calculateTimeValues(distance);
    const countdownItems = element.querySelectorAll('.countdown-value');
    countdownItems.forEach((item, index) => {
      const timeValue = timeValues[TIME_UNITS[index].toLowerCase()];
      const value = padNumber(timeValue);
      item.querySelector('.countdown-number').textContent = value;
    });
  }

  // Calculate time values from distance
  // @param {Number} distance - Time distance
  // @return {Object}
  function calculateTimeValues(distance) {
    return {
      d: Math.floor(distance / (1000 * 60 * 60 * 24)),
      h: Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
      m: Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
      s: Math.floor(distance % (1000 * 60) / 1000)
    };
  }

  // Pad number with leading zeros
  // @param {Number} number - Number to pad
  // @return {String}
  function padNumber(number) {
    return String(number).padStart(2, '0');
  }

  // Initialize countdowns
  initializeCountdowns();

  const elements$1 = document.querySelectorAll('.ytube');
  const SVG_PLAY$1 = '<svg class="ytube-play" viewBox="0 0 24 24"><path d="m7 3 14 9-14 9z"></path></svg>';

  // Initialize Youtube videos
  function initializeYoutubeVids() {
    elements$1.forEach(element => {
      const ids = createArrayIds(element);
      const $fragment = document.createDocumentFragment();
      ids.forEach(id => {
        const $div = document.createElement('div');
        const imageUrl = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
        const $img = createThumbnail(imageUrl, 'ytube-thumbnail');
        $div.classList.add('ytube-item');
        $div.innerHTML = SVG_PLAY$1;
        $div.appendChild($img);
        $div.addEventListener('click', () => {
          $div.innerHTML = '';
          $div.appendChild(createEmbed({
            url: `https://www.youtube.com/embed/${id}?autoplay=1`,
            params: {
              allowfullscreen: '1',
              class: 'ytube-embed'
            }
          }));
        });
        $fragment.appendChild($div);
      });
      element.innerHTML = '';
      element.appendChild($fragment);
      element.classList.add('ytube-started');
    });
  }
  initializeYoutubeVids();

  const elements = document.querySelectorAll('.vimeo');
  const SVG_PLAY = '<svg class="vimeo-play" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>';
  async function getVimeoThumbnail(id) {
    return fetch(`https://vimeo.com/api/v2/video/${id}.json`).then(response => response.json()).then(data => data[0].thumbnail_large).catch(error => console.error(error));
  }

  // Initialize Vimeo videos
  function initializeVimeoVids() {
    elements.forEach(async element => {
      const ids = createArrayIds(element);
      const $fragment = document.createDocumentFragment();
      for (const id of ids) {
        const $div = document.createElement('div');
        const imageUrl = await getVimeoThumbnail(id);
        const $img = createThumbnail(imageUrl, 'vimeo-thumbnail');
        $div.classList.add('vimeo-item');
        $div.innerHTML = SVG_PLAY;
        $div.appendChild($img);
        $div.addEventListener('click', () => {
          $div.innerHTML = '';
          $div.appendChild(createEmbed({
            url: `https://player.vimeo.com/video/${id}?autoplay=1`,
            params: {
              allowfullscreen: '1',
              class: 'vimeo-embed',
              allow: 'autoplay; fullscreen; picture-in-picture'
            }
          }));
        });
        $fragment.appendChild($div);
      }
      element.innerHTML = '';
      element.appendChild($fragment);
      element.classList.add('vimeo-started');
    });
  }
  initializeVimeoVids();

})();
