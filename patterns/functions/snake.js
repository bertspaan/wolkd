var rgb = require('../../lib/color-utils').rgb;

module.exports = {
  title: 'Slang',
  length: 4,
  type: 'discrete',
  getPixel: function(beat, t, i) {
    if (Math.abs((t % 100) - i) < 5) {
      return rgb.white;
    } else {
      return rgb.black;
    }
  }
};
