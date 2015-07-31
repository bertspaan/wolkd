var Color = require('color');

module.exports =  {
  title: 'Rainbow 1',
  getPixel: function(beat, t) {
    var color = Color().rgb(255, 0, 0).hue(t % 360);
    return color.rgbArray();
  }
};
