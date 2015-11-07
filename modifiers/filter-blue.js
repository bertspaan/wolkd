module.exports =  {
  title: 'Filter blue',
  type: 'rgb',
  getPixel: function(rgb, value) {
    return [rgb[0] * (1 - value), rgb[1] * (1 - value), rgb[2]];
  }
};
