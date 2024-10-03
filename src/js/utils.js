// load script
// @param {string} src - script source
// @param {string} type - script type
// @returns {Promise} - script loaded
export const loadScript = (src) => new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) {
    resolve()
    return
  }

  const script = document.createElement('script')
  script.src = src
  script.onload = resolve
  script.onerror = reject
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})

// Set attributes
// @param {HTMLElement} element - element
// @param {Object} attributes - attributes
// @returns {void}
export const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create thumbnail
// @param {string} imageUrl - image url
// @param {string} className - image class
// @returns {HTMLImageElement} - image element
export function createThumbnail (imageUrl, className) {
  const $img = document.createElement('img')

  $img.classList.add(className)
  $img.src = imageUrl
  $img.alt = 'thumbnail'
  $img.loading = 'lazy'

  return $img
}

// Create array of ids
// @param {HTMLElement} element - textarea element
// @returns {Array} - array of ids
export function createArrayIds (element) {
  const ids = element.innerHTML.split('\n')
    .map(id => id.trim())
    .filter(id => id !== '')

  return ids
}

// Create embed
// @param {string} url - url
// @param {Object} params - attributes
// @returns {HTMLIFrameElement} - iframe element
export function createEmbed ({ url, params = {} }) {
  const $iframe = document.createElement('iframe')

  $iframe.src = url
  $iframe.frameborder = 0

  setAttributes($iframe, params)

  return $iframe
}
