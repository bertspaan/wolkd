var Color = require('color')

module.exports = {
  title: 'Fill green',
  type: 'rgb',
  getPixel: (rgb, value) => {
    let color = Color().rgb(rgb)
    color = color.green(value * 255)
    return color.rgb().array()
  }
}
