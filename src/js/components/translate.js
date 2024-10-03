import { loadScript } from '../utils'

const element = document.getElementById('gTranslate')

// Callback for Google Translate script
// eslint-disable-next-line no-unused-vars
function gtInit () {
  // eslint-disable-next-line no-new, no-undef
  new google.translate.TranslateElement({
    autoDisplay: 'true',
    pageLanguage: element.dataset.lang || document.documentElement.lang || 'en',
    includedLanguages: element.dataset.languages || '',
    // eslint-disable-next-line no-undef
    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
  }, 'gTranslate')
}

function initializeTranslate () {
  if (!element) return

  window.gtInit = gtInit
  loadScript('https://translate.google.com/translate_a/element.js?cb=gtInit')
}

// Initialize Google Translate
initializeTranslate()
