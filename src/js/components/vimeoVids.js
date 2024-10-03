import {
  createThumbnail,
  createArrayIds,
  createEmbed
} from '../utils'

const elements = document.querySelectorAll('.vimeo')
const SVG_PLAY = '<svg class="vimeo-play" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>'

async function getVimeoThumbnail (id) {
  return fetch(`https://vimeo.com/api/v2/video/${id}.json`)
    .then(response => response.json())
    .then(data => data[0].thumbnail_large)
    .catch(error => console.error(error))
}

// Initialize Vimeo videos
function initializeVimeoVids () {
  elements.forEach(async element => {
    const ids = createArrayIds(element)
    const $fragment = document.createDocumentFragment()

    for (const id of ids) {
      const $div = document.createElement('div')
      const imageUrl = await getVimeoThumbnail(id)
      const $img = createThumbnail(imageUrl, 'vimeo-thumbnail')

      $div.classList.add('vimeo-item')
      $div.innerHTML = SVG_PLAY
      $div.appendChild($img)

      $div.addEventListener('click', () => {
        $div.innerHTML = ''
        $div.appendChild(createEmbed({
          url: `https://player.vimeo.com/video/${id}?autoplay=1`,
          params: {
            allowfullscreen: '1',
            class: 'vimeo-embed',
            allow: 'autoplay; fullscreen; picture-in-picture'
          }
        }))
      })

      $fragment.appendChild($div)
    }

    element.innerHTML = ''
    element.appendChild($fragment)
    element.classList.add('vimeo-started')
  })
}

initializeVimeoVids()
