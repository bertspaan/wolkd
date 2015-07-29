module.exports = function(config, screen) {
  try {
    screen = require('../screens/' + screen);
  } catch (e) {
    console.log('SPI package not found. Running in debug mode. Run `npm install spi`, or keep debugging!');
    screen = require('../screens/console');
  }

  return {
    setPixel: function(pixel, r, g, b) {
      if (g === undefined && b === undefined && Array.isArray(r)) {
        g = r[1];
        b = r[2];
        r = r[0];
      }

      // Make sure r, g, b always between 0 and 255
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));

      // pixels just wrap around
      var p = pixel % config.pixels;

      return screen.setPixel(p, r, g, b);
    },

    update: screen.update
  };
};
