const elements = document.querySelectorAll('.countdown')
const TIME_UNITS = ['D', 'H', 'M', 'S']
const COUNT_INTERVALS = {}

// Initialize countdown elements
function initializeCountdowns () {
  if (elements.length === 0) return

  elements.forEach(element => {
    const items = createCountdownItems()
    const finalMessage = element.innerHTML
    const finalDate = new Date(element.dataset.countdown).getTime()
    element.innerHTML = ''
    element.classList.add('countdown-started')

    if (countdownIsFinished(finalDate)) {
      element.innerHTML = finalMessage
      return
    }

    items.forEach(item => element.appendChild(item))

    COUNT_INTERVALS[element] = setInterval(() => {
      updateCountdowns(element, finalDate, finalMessage)
    }, 1000)
  })
}

// Create countdown items
// @return {Array}
function createCountdownItems () {
  return TIME_UNITS.map(createCountdownItem)
}

// Create countdown item
// @param {String} unit - Time unit
// @return {HTMLElement}
function createCountdownItem (unit) {
  const item = document.createElement('div')
  item.classList.add('countdown-value')
  item.innerHTML = `
    <span class="countdown-number">00</span>
    <span class="countdown-name">${unit}</span>
  `
  return item
}

// Check if countdown is finished
// @param {Number} finalTime - Final time in ISO format
// @return {Boolean}
function countdownIsFinished (finalTime) {
  return finalTime < Date.now()
}

// Update countdown display
// @param {HTMLElement} element - Countdown element
// @param {Number} finalTime - Final time in ISO format
// @param {String} finalMessage - Final message to display
// @return {Void}
function updateCountdowns (element, finalTime, finalMessage) {
  const currentTime = Date.now()
  const distance = finalTime - currentTime

  if (distance <= 0) {
    clearInterval(COUNT_INTERVALS[element])
    element.innerHTML = finalMessage
    return
  }

  const timeValues = calculateTimeValues(distance)
  const countdownItems = element.querySelectorAll('.countdown-value')

  countdownItems.forEach((item, index) => {
    const timeValue = timeValues[TIME_UNITS[index].toLowerCase()]
    const value = padNumber(timeValue)
    item.querySelector('.countdown-number').textContent = value
  })
}

// Calculate time values from distance
// @param {Number} distance - Time distance
// @return {Object}
function calculateTimeValues (distance) {
  return {
    d: Math.floor(distance / (1000 * 60 * 60 * 24)),
    h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((distance % (1000 * 60)) / 1000)
  }
}

// Pad number with leading zeros
// @param {Number} number - Number to pad
// @return {String}
function padNumber (number) {
  return String(number).padStart(2, '0')
}

// Initialize countdowns
initializeCountdowns()
