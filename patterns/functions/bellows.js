module.exports = {
  title: 'Bellows',
  getPixel: function (beat, t, i, x, y) {
    var dy = Math.abs(0.5 - y)
    var a = t % 100 / 100 * Math.PI * 2
    var v = (Math.cos(a) + 1) / 4
    var g = Math.round((v / dy) * 255)
    return [g, g, g]
  }
}
