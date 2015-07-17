var Color = require("color")

module.exports =  {
  title: 'Regenboog 2',
  length: 4,
  type: 'continuous',
  getPixel: function(beat, t, i, x, y) {
    var color = Color().rgb(255, 0, 0).hue(Math.round(t + y * 180) % 360);
    return color.rgbArray();
  }
};
