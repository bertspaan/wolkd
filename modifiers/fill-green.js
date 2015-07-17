var Color = require('color');

module.exports =  {
  title: 'Alles groen',
  type: 'rgb',
  getPixel: function(rgb, value) {
    var color = Color().rgb(rgb);
    color = color.green(value * 255);
    return color.rgbArray();
  }
};