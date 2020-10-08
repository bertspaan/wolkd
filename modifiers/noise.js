const Color = require('color')

const max = 1

module.exports = {
  title: 'Noise',
  type: 'rgb',
  getPixel: (rgb, value) => {
    const color = Color().rgb(rgb)
    const rand = (Math.random() * (value) * (max * 2) - max) * (color.lightness() / 100)
    if (rand > 0) {
      color.lighten(rand)
    } else {
      color.darken(Math.abs(rand))
    }

    return color.rgb().array()
  }
}
