const Color = require('color')

module.exports = {
  title: 'Fill red',
  type: 'rgb',
  getPixel: (rgb, value) => {
    const color = Color().rgb(rgb)
    color.red(value * 255)
    return color.rgb().array()
  }
}
