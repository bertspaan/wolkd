var Color = require('color');

module.exports =  {
  title: 'Hue',
  getPixel: function(rgb, value) {
    var color = Color().rgb(rgb);
    color = color.rotate(value * 360 - 180);
    return color.rgbArray();
  }
};
