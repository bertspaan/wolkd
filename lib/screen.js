module.exports = function(config, screen) {
  var screen;

  try {
    screen = require('../screens/' + screen);
  } catch(e) {
    console.log('SPI package not found. Running in debug mode. Run `npm install spi`, or keep debugging!')
    screen = require('../screens/console');
  }

  return {
    setPixel: function(pixel, r, g, b) {
      if (g == undefined && b == undefined && Array.isArray(r)) {
        g = r[1];
        b = r[2];
        r = r[0];
      }

      // Make sure r,g,b always between 0 and 255
      var r = Math.max(0, Math.min(255, r));
      var g = Math.max(0, Math.min(255, g));
      var b = Math.max(0, Math.min(255, b));

      // pixels just wrap around
      var p = pixel % config.pixels;

      return screen.setPixel(p, r, g, b);
    },
    update: screen.update
  }
};

// try {
//    s = require('./spiScreen');
// } catch(e) {
//   console.log('SPI package not found. Running in debug mode. Run `npm install spi`, or keep debugging!')
//   console.error(e)
// }
//
// exports.setPixel = function(pixel, r, g, b)
// {
//   // handigheidje
//   if(g == undefined && b == undefined && Array.isArray(r))
//   {
//     g = r[1];
//     b = r[2];
//     r = r[0];
//   }
//
//   // make sure r,g,b always between 0 and 255
//   var r = Math.max(0, Math.min(255, r))
//   var g = Math.max(0, Math.min(255, g))
//   var b = Math.max(0, Math.min(255, b))
//
//   // pixels just wrap around
//   var p = pixel % config.pixels;
//
//   return s.setPixel(p, r, g, b);
// }
//
// exports.update = s.update.bind(s);
