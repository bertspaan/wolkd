module.exports = {
  title: 'Filter red',
  type: 'rgb',
  getPixel: function (rgb, value) {
    return [rgb[0], rgb[1] * (1 - value), rgb[2] * (1 - value)]
  }
}
