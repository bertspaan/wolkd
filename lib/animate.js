var util = require('util');

module.exports = function(config, mapping, screen, animations, program) {

  var t = 0;
  function update() {
  	for (var i = 0; i < config.pixels && i < mapping.length; i++) {
      var pixelPos = mapping[i];

      var rgb = program
        .filter(function (animation) {
          return animation.value;
        })
        .map(function(animation) {
          var func = animations.functions[animation.name];
          var rgb = func.getFrame(t, i, pixelPos[0], pixelPos[1]);
          return [
            Math.round(rgb[0] * animation.value),
            Math.round(rgb[1] * animation.value),
            Math.round(rgb[2] * animation.value)
          ];
        })
        .reduce(function(rgb1, rgb2) {
          return [
            Math.min(rgb1[0] + rgb2[0], 255),
            Math.min(rgb1[1] + rgb2[1], 255),
            Math.min(rgb1[2] + rgb2[2], 255)

            // (rgb1[0] + rgb2[0]) / 2,
            // (rgb1[1] + rgb2[1]) / 2,
            // (rgb1[2] + rgb2[2]) / 2,
          ];
        });

        screen.setPixel(i, rgb);





      // _(program)
      //   .filter(function (animation) {
      //     return animation.value;
      //   })
      //   .map(function(animation) {
      //     var func = animations.functions[animation.name];
      //     var rgb = func.getFrame(t, i, pixelPos[0], pixelPos[1]);
      //     return [rgb[0] * animation.value, rgb[1] * animation.value, rgb[2] * animation.value];
      //   })
      //   .reduce1(function(rgb1, rgb2) {
      //     return [
      //       Math.min(rgb1[0] + rgb2[0], 255),
      //       Math.min(rgb1[1] + rgb2[1], 255),
      //       Math.min(rgb1[2] + rgb2[2], 255)
      //
      //       // (rgb1[0] + rgb2[0]) / 2,
      //       // (rgb1[1] + rgb2[1]) / 2,
      //       // (rgb1[2] + rgb2[2]) / 2,
      //     ];
      //   })
      //   .each(function (rgb) {
      //     screen.setPixel(i, rgb);
      //   });
  	}

    screen.update();
  	t += 1;
  }

  setInterval(update, Math.round(1000 / config.framerate));

  return {
    remove: function(name) {
      program.forEach(function(item, i) {
        if (item.name === name) {
          program.splice(i, 1);
        }
      });
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

