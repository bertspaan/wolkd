var Color = require('color');

module.exports =  {
  title: 'Color: red',
  getPixel: function(rgb, value) {
    var color = Color().rgb(rgb);
    color.red(value * 255);
    return color.rgbArray();
  }
};
