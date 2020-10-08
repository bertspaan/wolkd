module.exports = {
  title: 'Strobe',
  getPixel: function (beat, t) {
    var on = (t % 2) === 0
    return on ? [255, 255, 255] : [0, 0, 0]
  }
}
