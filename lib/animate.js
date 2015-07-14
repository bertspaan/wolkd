var util = require('util');

module.exports = function(config, mapping, screen, patterns, modifiers) {

  var t = 0;
  function update() {
  	for (var i = 0; i < config.pixels && i < mapping.length; i++) {
      var pixelPos = mapping[i];

      var frames = Object.keys(patterns)
        .map(function(name) {
          return patterns[name];
        })
        .filter(function (animation) {
          return animation.value;
        })
        .map(function(pattern) {
          var rgb;
          if (pattern.getPixel) {
            var rgb = pattern.getPixel(t, i, pixelPos[0], pixelPos[1]);
          } else if (pattern.frames) {
            rgb = pattern.frames[t % pattern.frames.length][i];
          } else {
            rgb = [0, 0, 0];
          }

          return [
            Math.round(rgb[0] * pattern.value),
            Math.round(rgb[1] * pattern.value),
            Math.round(rgb[2] * pattern.value)
          ];
        })

        if (frames.length) {
          var rgb = frames.reduce(function(rgb1, rgb2) {
            return [
              Math.min(rgb1[0] + rgb2[0], 255),
              Math.min(rgb1[1] + rgb2[1], 255),
              Math.min(rgb1[2] + rgb2[2], 255)

              // (rgb1[0] + rgb2[0]) / 2,
              // (rgb1[1] + rgb2[1]) / 2,
              // (rgb1[2] + rgb2[2]) / 2,
            ];
          });

          Object.keys(modifiers)
            .map(function(name) {
              return modifiers[name];
            })
            .filter(function (modifier) {
              return modifier.value;
            }).forEach(function(modifier) {
              rgb = modifier.getPixel(rgb, modifier.value);
            });

          screen.setPixel(i, rgb);
        } else {
          screen.setPixel(i, [0, 0, 0]);
        }
  	}

    screen.update();
  	t += 1;
  }

  setInterval(update, Math.round(1000 / config.framerate));

  return {
    setPattern: function(name, value) {
      patterns[name].value = value;
    },

    setModifier: function(name, value) {
      modifiers[name].value = value;
    }
  };
};









//
//
//
//
// var oldMs = new Date().getTime() - beat;
// function func() {
//   var ms = new Date().getTime();
//   var duration = ms - oldMs;
//   oldMs = ms;
//
//   var inMs;
//
//   if(duration <= beat)
//     inMs = beat - duration;
//   else
//     inMs = (beat * Math.ceil(duration / beat)) - duration;
//
//
//   console.log(duration, inMs, Math.ceil(duration / beat))
//
//   setTimeout(func, inMs);
//
//
// }
//
// func();
//
//
// //
// // var time = process.hrtime();
// // // [ 1800216, 25 ]
// //
// // setTimeout(function() {
// //   var diff = process.hrtime(time);
// //   // [ 1, 552 ]
// //
// //   console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
// //   // benchmark took 1000000527 nanoseconds
// // }, 1000);
//

