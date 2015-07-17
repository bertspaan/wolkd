var rgb = require('../../lib/color-utils').rgb;

module.exports =  {
  title: 'Stroboscoop',
  length: 2,
  type: 'discrete',
  getPixel: function(beat, t, i, x, y) {
    var on = (t % 2) == 0;
    return on ? rgb.white : rgb.black;
  }
};
