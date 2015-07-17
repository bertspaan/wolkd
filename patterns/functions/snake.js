var rgb = require('../../lib/color-utils').rgb;

module.exports = {
  title: 'Slang',
  length: 4,
  type: 'discrete',
  getPixel: function(beat, t, i, x, y) {
    if (Math.abs((t % 100) - i) < 5) {
      return rgb.white;
    } else {
      return rgb.black;
    }
  }
};
