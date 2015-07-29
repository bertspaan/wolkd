var rgb = require('../../lib/color-utils').rgb;

module.exports =  {
  title: 'Flip-flop',
  length: 2,
  type: 'discrete',
  getPixel: function(beat, t, i) {
    var a = (beat % 2) === 0;

    if (Math.round(i / 10) % 2 === 0) {
      return a ? rgb.white : rgb.black;
    } else {
      return !a ? rgb.white : rgb.black;
    }
  }
};
