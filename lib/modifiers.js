const fs = require('fs')
const path = require('path')
const H = require('highland')

module.exports = function (callback) {
  const baseDir = path.join(__dirname, '..', 'modifiers')
  const readdir = H.wrapCallback(fs.readdir)

  H(readdir(baseDir))
    .series()
    .flatten()
    .filter((filename) => path.extname(filename) === '.js')
    .map((filename) => ({
      name: filename.replace('.js', ''),
      modifier: require(path.join(__dirname, '..', 'modifiers', filename))
    }))
    .filter((m) => m.modifier.getPixel)
    .toArray((array) => {
      const modifiers = {}
      array.forEach((m) => {
        modifiers[m.name] = m.modifier
        modifiers[m.name].value = 0
      })

      callback(modifiers)
    })
}
