var Color = require('color');

module.exports =  {
  title: 'Hue',
  getPixel: function(rgb, value) {
    var color = Color().rgb(rgb);
    color.rotate(value * 360);
    return color.rgbArray();
  }
};
