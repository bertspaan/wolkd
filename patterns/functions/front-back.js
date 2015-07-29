var rgb = require('../../lib/color-utils').rgb;

module.exports =  {
  title: 'Voor! Achter!',
  length: 2,
  type: 'discrete',
  getPixel: function(beat, t, i, x, y) {
    var front = (beat % 2) === 0;

    if (y <= 0.5) {
      return front ? rgb.black : rgb.white;
    } else {
      return front ? rgb.white : rgb.black;
    }
  }
};
