var Color = require('color');

module.exports =  {
  title: 'Alleen blauw',
  type: 'rgb',
  getPixel: function(rgb, value) {
    return [rgb[0] * (1 - value), rgb[1] * (1 - value), rgb[2]];
  }
};
