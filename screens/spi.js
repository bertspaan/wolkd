require('dotenv').config()

const spi = require('spi-device')
const config = require(process.env.WOLKD_CONFIG)

const device = spi.open(config.spi.bus, config.spi.device, (err) => {
  if (err) {
    console.error(err)
  }
})

// Contains three byte for each pixel (one per color): first blue, then red, then green!
const buffer = Buffer.alloc(config.pixels * 3)

exports.setPixel = function (pixel, r, g, b) {
  const s = pixel * 3
  buffer[s] = b
  buffer[s + 1] = r
  buffer[s + 2] = g
}

exports.update = function update () {
  const message = [{
    sendBuffer: buffer,
    byteLength: config.pixels * 3,
    speedHz: config.spi.hz
  }]

  device.transfer(message, () => {})
}
