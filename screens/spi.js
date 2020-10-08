require('dotenv').config()

const SPI = require('spi')
const config = require(process.env.WOLKD_CONFIG)

const spi = new SPI.Spi(config.spi.device, {
  mode: SPI.MODE.MODE_0, // always set mode as the first option
  chipSelect: SPI.CS.none // 'none', 'high' - defaults to low
}, (s) => s.open())

// Contains three byte for each pixel (one per color): first blue, then red, then green!
var buffer = Buffer.alloc(config.pixels * 3)

exports.setPixel = function (pixel, r, g, b) {
  const s = pixel * 3
  buffer[s] = b
  buffer[s + 1] = r
  buffer[s + 2] = g
}

exports.update = function update () {
  spi.write(buffer, () => {})
}
