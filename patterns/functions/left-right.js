var rgb = require('../../lib/color-utils').rgb;

module.exports =  {
  title: 'Links! Rechts!',
  length: 2,
  type: 'discrete',
  getPixel: function(t, i, x, y) {
    var front = Math.round(t / 4) % 2 == 0;

    if (x <= 0.5) {
      return front ? rgb.black : rgb.white;
    } else {
      return front ? rgb.white : rgb.black;
    }
  }
};
