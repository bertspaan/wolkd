var Color = require('color');

module.exports =  {
  title: 'Alleen rood',
  type: 'rgb',
  getPixel: function(rgb, value) {
    return [rgb[0], rgb[1] * (1 - value), rgb[2] * (1 - value)];
  }
};
