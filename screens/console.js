require('dotenv').config()

const config = require(process.env.WOLKD_CONFIG)
const colors = require('ansi-256-colors')

const buffer = Buffer.alloc(config.pixels * 3)

exports.setPixel = function (pixel, r, g, b) {
  // console.log(pixel, r, g, b)
  const s = pixel * 3
  buffer[s] = r
  buffer[s + 1] = g
  buffer[s + 2] = b
}

exports.update = function () {
  for (let c = 0; c < config.pixels * 3; c += 3) {
    const r = Math.round(buffer[c] / 51)
    const g = Math.round(buffer[c + 1] / 51)
    const b = Math.round(buffer[c + 2] / 51)

    // console.log(r, g, b)
    process.stdout.write(colors.bg.getRgb(r, g, b) + ' ')
  }

  // TODO: make sending carriage return optional!
  process.stdout.write(colors.reset + '\r')
}
