const Color = require('color')

module.exports = {
  title: 'Fill blue',
  type: 'rgb',
  getPixel: (rgb, value) => {
    let color = Color().rgb(rgb)
    color.blue(value * 255)
    return color.rgb().array()
  }
}
