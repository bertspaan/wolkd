const Color = require('color')

module.exports = {
  title: 'Hue',
  type: 'rgb',
  getPixel: (rgb, value) => {
    var color = Color().rgb(rgb)
    color.rotate(value * 360)
    return color.rgb().array()
  }
}
