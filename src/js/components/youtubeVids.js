import {
  createThumbnail,
  createArrayIds,
  createEmbed
} from '../utils'

const elements = document.querySelectorAll('.ytube')
const SVG_PLAY = '<svg class="ytube-play" viewBox="0 0 24 24"><path d="m7 3 14 9-14 9z"></path></svg>'

// Initialize Youtube videos
function initializeYoutubeVids () {
  elements.forEach(element => {
    const ids = createArrayIds(element)
    const $fragment = document.createDocumentFragment()

    ids.forEach(id => {
      const $div = document.createElement('div')
      const imageUrl = `https://img.youtube.com/vi/${id}/mqdefault.jpg`
      const $img = createThumbnail(imageUrl, 'ytube-thumbnail')

      $div.classList.add('ytube-item')
      $div.innerHTML = SVG_PLAY

      $div.appendChild($img)
      $div.addEventListener('click', () => {
        $div.innerHTML = ''
        $div.appendChild(createEmbed({
          url: `https://www.youtube.com/embed/${id}?autoplay=1`,
          params: { allowfullscreen: '1', class: 'ytube-embed' }
        }))
      })

      $fragment.appendChild($div)
    })

    element.innerHTML = ''
    element.appendChild($fragment)
    element.classList.add('ytube-started')
  })
}

initializeYoutubeVids()
