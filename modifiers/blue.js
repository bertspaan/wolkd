var Color = require('color');

module.exports =  {
  title: 'Color: blue',
  getPixel: function(rgb, value) {
    var color = Color().rgb(rgb);
    color.blue(value * 255);
    return color.rgbArray();
  }
};
