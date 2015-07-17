var Color = require("color");

module.exports =  {
  title: 'Sinus',
  length: 4,
  type: 'continuous',
  getPixel: function(beat, t, i, x, y) {
    var a = t % 100 / 100 * Math.PI * 2;
    var v = (Math.cos(a) + 1) / 2;
    var g = Math.round(v * 255);
    return [g, g, g];
  }
};
