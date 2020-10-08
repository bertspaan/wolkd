const Color = require('color')

module.exports = {
  title: 'Rainbow 1',
  getPixel: (beat, t) => {
    const color = Color().rgb(255, 0, 0).hue(t % 360)
    return color.rgb().array()
  }
}
