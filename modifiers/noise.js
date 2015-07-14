var max = 255;

module.exports =  {
  title: 'Noise',
  getPixel: function(rgb, value) {
    return rgb.map(function(c) {
      var rand = Math.round(Math.random() * (max * value) * 2);
      return Math.max(Math.min(c - (max * value) + rand, 255), 0);
    });
  }
};
