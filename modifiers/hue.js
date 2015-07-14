var color = require('onecolor');

module.exports =  {
  title: 'Hue',
  getPixel: function(rgb, value) {
    var color = one.color(rgb);
    color = color.hue(value, true);
    return [color.red(), color, green(), color.blue()];
  }
};



