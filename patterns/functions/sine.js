module.exports =  {
  title: 'Sine',
  length: 4,
  type: 'continuous',
  getPixel: function(beat, t) {
    var a = t % 100 / 100 * Math.PI * 2;
    var v = (Math.cos(a) + 1) / 2;
    var g = Math.round(v * 255);
    return [g, g, g];
  }
};
