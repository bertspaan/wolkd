module.exports = {
  title: 'Police',
  getPixel: function (beat, t, i, x, y) {
    var framerate = 64
    var pRed = (t % framerate / framerate) * 2 * Math.PI
    var pBlue = ((t + framerate / 2) % framerate / framerate) * 2 * Math.PI
    var iRed = (Math.sin(pRed) + 1) / 2
    var iBlue = (Math.sin(pBlue) + 1) / 2
    return [Math.max(y - iRed, 0) * 255, 0, Math.max((1 - y) - iBlue, 0) * 255]
  }
}
