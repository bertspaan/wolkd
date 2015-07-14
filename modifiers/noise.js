var Color = require('color');

var max = 255;

module.exports =  {
  title: 'Noise',
  getPixel: function(rgb, value) {
    var color = Color().rgb(rgb);
    var rand = Math.random() * value * 2 - 1;
    if (rand > 0) {
      color.lighten(rand);
    } else {
      color.darken(rand);
    }
    return color.rgbArray();
  }
};
