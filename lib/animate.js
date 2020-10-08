module.exports = function (config, mapping, screen, patterns, modifiers) {
  var bpm = config.bpm
  var framesPerBeat = config.framesPerBeat
  var beatMs = 60 / bpm * 1000
  var msPerFrame = beatMs / framesPerBeat

  var t = 0
  var beat = 0
  var firstMs = new Date().getTime()

  function pixelColor (i) {
    var coordinates = mapping[i]

    var frames = Object.keys(patterns)
      .map(function (name) {
        return patterns[name]
      })
      .filter(function (animation) {
        return animation.value
      })
      .map(function (pattern) {
        var rgb
        if (pattern.getPixel) {
          rgb = pattern.getPixel(beat, t, i, coordinates[0], coordinates[1])
        } else if (pattern.frames) {
          // either t or beat, depending on continuous/perBeat
          var frame = t % pattern.frames.length
          rgb = pattern.frames[frame][i]
        } else {
          rgb = [0, 0, 0]
        }

        return [
          Math.round(rgb[0] * pattern.value),
          Math.round(rgb[1] * pattern.value),
          Math.round(rgb[2] * pattern.value)
        ]
      })

    if (frames.length) {
      var rgb = frames.reduce(function (rgb1, rgb2) {
        return [
          Math.min(rgb1[0] + rgb2[0], 255),
          Math.min(rgb1[1] + rgb2[1], 255),
          Math.min(rgb1[2] + rgb2[2], 255)
        ]
      })

      Object.keys(modifiers)
        .map(function (name) {
          return modifiers[name]
        })
        .filter(function (modifier) {
          return modifier.value
        }).forEach(function (modifier) {
          if (modifier.type === 'rgb') {
            rgb = modifier.getPixel(rgb, modifier.value, modifier.data)
          } else if (modifier.type === 'position') {
            rgb = modifier.getPixel(beat, t, i, coordinates[0], coordinates[1], rgb, modifier.value, modifier.data)
          }
        })

      return rgb
    } else {
      return [0, 0, 0]
    }
  }

  function frame () {
    var currentMs = new Date().getTime()

    for (var i = 0; i < config.pixels && i < mapping.length; i++) {
      var rgb = pixelColor(i)
      screen.setPixel(i, rgb)
    }

    screen.update()

    var timeout = -1
    while (timeout < 0) {
      timeout = ((t + 1) * msPerFrame + firstMs) - currentMs
      t += 1
    }

    beat = Math.floor(t / framesPerBeat)

    setTimeout(frame, timeout)
  }

  frame()

  return {
    setPattern: function (name, value) {
      patterns[name].value = value
    },

    setModifier: function (name, value, data) {
      modifiers[name].value = value
      modifiers[name].data = data
    },

    setBpm: function (bpm, startMs) {
      var beatMs = 60 / bpm * 1000

      t = 0
      beat = 0
      msPerFrame = beatMs / framesPerBeat
      firstMs = startMs
    }
  }
}
