module.exports = function(config, animator, patterns, modifiers) {
  var timeout;

  function update() {
    var patternNames = Object.keys(patterns);
    patternNames.forEach(function(patternName) {
      animator.setPattern(patternName, 0);
    });

    var patternCount = Math.round(Math.random() * 2) + 1;
    var chosenPatterns = patternNames;

    while(chosenPatterns.length != patternCount) {
      chosenPatterns.splice(Math.round(Math.random() * (chosenPatterns.length - 1)), 1);
    }

    chosenPatterns.forEach(function(patternName, i) {
      var value = (patternCount - i / patternCount) + Math.random() * 0.4 - 0.2;
      value = Math.min(Math.max(value, 0), 1);
      animator.setPattern(patternName, value);
    });

    animator.setModifier('hue', Math.random());
    animator.setModifier('noise', Math.random());
  }

  function reset() {
    if (timeout) {
      clearInterval(timeout);
    }

    timeout = setInterval(function() {
      update();
    }, config.autopilot.timeout);
  }

  reset();
  update();

  return {
    reset: reset
  };
};
