var rgb = require('../../lib/color-utils').rgb;

module.exports = {
  title: 'Snake!',
  length: 4,
  type: 'discrete',
  getPixel: function(t, i, x, y) {
    if (Math.abs((t % 100) - i) < 5) {
      return [0, 255, 0
    ]//rgb.white;
    } else {
      return rgb.black;
    }
  }
};
