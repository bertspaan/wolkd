var Color = require('color');

module.exports =  {
  title: 'Rainbow 2',
  getPixel: function(beat, t, i, x, y) {
    var color = Color().rgb(255, 0, 0).hue(Math.round(t + y * 180) % 360);
    return color.rgbArray();
  }
};
