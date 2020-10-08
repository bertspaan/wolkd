module.exports = function (config, animator, patterns) {
  var timeout

  function resetTimeout (ms) {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(function () {
      update()
    }, ms)
  }

  function update () {
    var patternNames = Object.keys(patterns)
    patternNames.forEach(function (patternName) {
      animator.setPattern(patternName, 0)
    })

    var patternCount = Math.round(Math.random() * 2) + 1
    var chosenPatterns = patternNames

    while (chosenPatterns.length !== patternCount) {
      chosenPatterns.splice(Math.round(Math.random() * (chosenPatterns.length - 1)), 1)
    }

    chosenPatterns.forEach(function (patternName, i) {
      var value = (patternCount - i / patternCount) + Math.random() * 0.4 - 0.2
      value = Math.min(Math.max(value, 0), 1)
      animator.setPattern(patternName, value)
    })

    animator.setModifier('hue', Math.random())
    animator.setModifier('noise', Math.random() * 0.2)

    resetTimeout(config.autopilot.patternTimeout)
  }

  function reset () {
    resetTimeout(config.autopilot.inputTimeout)
  }

  reset()
  update()

  return {
    reset: reset
  }
}
