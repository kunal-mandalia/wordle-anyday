wordleAnyday = window.wordleAnyday || {}

wordleAnyday.getDateInput = function () {
  return document.getElementById('game-date')
}

wordleAnyday.setInitialDate = function () {
  var input = wordleAnyday.getDateInput()
  var gd = wordleAnyday.getGameDate()
  input.valueAsDate = new Date(gd)
}

wordleAnyday.changeDate = function () {
  var input = wordleAnyday.getDateInput()
  var newDate = input.value
  document.cookie = 'gamedate=' + newDate
  window.localStorage.clear()
  window.location.reload()
}

wordleAnyday.getUserDefinedGameDate = function () {
  var gd = document.cookie.split(';').find((x) => x.includes('gamedate'))
  if (gd) {
    return gd.split('=')[1]
  }
  return null
}

wordleAnyday.getGameDate = function () {
  var ugd = wordleAnyday.getUserDefinedGameDate()
  if (ugd) {
    var d = new Date(ugd)
    return Date.parse(d)
  }
  return Date.parse(new Date())
}

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start))
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0
  date.setHours(hour)
  return date
}

wordleAnyday.pickRandomDate = function () {
  var start = new Date('2021-10-01')
  var end = new Date()
  var date = new Date(+start + Math.random() * (end - start))
  var input = wordleAnyday.getDateInput()
  input.valueAsDate = new Date(date)
  wordleAnyday.changeDate()
}

wordleAnyday.afterward = function () {
  // run after next tick (or after js files are loaded)
  window.setTimeout(afterLoad, 10)
  function afterLoad() {
    try {
      // hide helper popup
      var gameApp = document.querySelector('body > game-app')
      if (!gameApp) {
        return wordleAnyday.afterward()
      }

      var closeIcon = gameApp.shadowRoot
        .querySelector('#game > game-modal')
        .shadowRoot.querySelector('div > div > div > game-icon')

      if (!closeIcon) {
        wordleAnyday.afterward()
      } else {
        closeIcon.click()
      }
    } catch (e) {
      console.error(e)
    }
  }
}

wordleAnyday.main = function () {
  wordleAnyday.setInitialDate()
  wordleAnyday.afterward()
}

wordleAnyday.main()
