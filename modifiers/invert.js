module.exports =  {
  title: 'Invert',
  getPixel: function(rgb, value) {
    return rgb.map(function(c) {
      return (255 * value) - c;
    });
  }
};
