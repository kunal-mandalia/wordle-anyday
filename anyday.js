wordleAnyday = window.wordleAnyday || {}

wordleAnyday.getDateInput = function () {
  return document.getElementById('game-date')
}

wordleAnyday.setInitialDate = function () {
  var input = wordleAnyday.getDateInput()
  var gd = wordleAnyday.getGameDate()
  input.valueAsDate = new Date(gd)
}

wordleAnyday.changeDate = function (evt) {
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

wordleAnyday.main = function () {
  wordleAnyday.setInitialDate()
}

wordleAnyday.main()
