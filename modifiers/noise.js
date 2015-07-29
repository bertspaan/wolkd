var Color = require('color');

var max = 1;

module.exports =  {
  title: 'Noise',
  type: 'rgb',
  getPixel: function(rgb, value) {
    var color = Color().rgb(rgb);
    var rand = (Math.random() * (value) * (max * 2) - max) * (color.lightness() / 100);
    if (rand > 0) {
      color.lighten(rand);
    } else {
      color.darken(Math.abs(rand));
    }

    return color.rgbArray();
  }
};
