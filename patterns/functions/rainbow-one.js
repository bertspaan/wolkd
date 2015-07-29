var Color = require("color");

module.exports =  {
  title: 'Regenboog 1',
  length: 4,
  type: 'continuous',
  getPixel: function(beat, t) {
    var color = Color().rgb(255, 0, 0).hue(t % 360);
    return color.rgbArray();
  }
};
