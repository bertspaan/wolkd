module.exports =  {
  title: 'Filter green',
  type: 'rgb',
  getPixel: function(rgb, value) {
    return [rgb[0] * (1 - value), rgb[1], rgb[2] * (1 - value)];  }
};
