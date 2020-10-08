const Color = require('color')

module.exports = {
  title: 'Rainbow 2',
  getPixel: (beat, t, i, x, y) => {
    const color = Color().rgb(255, 0, 0).hue(Math.round(t + y * 180) % 360)
    return color.rgb().array()
  }
}
