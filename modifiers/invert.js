module.exports = {
  title: 'Invert',
  type: 'rgb',
  getPixel: function (rgb, value) {
    return rgb.map(function (c) {
      return (255 * value) - c
    })
  }
}
