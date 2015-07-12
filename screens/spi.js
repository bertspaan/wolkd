var SPI = require('spi');
var config = require('../config.json')

var spi = new SPI.Spi(config.spi.device, {
	mode: SPI.MODE['MODE_0'], // always set mode as the first option
	chipSelect: SPI.CS['none'] // 'none', 'high' - defaults to low
}, function(s) {
	s.open();
});

// Contains three byte for each pixel (one per color): first blue, then red, then green!
var buffer = new Buffer(config.pixels * 3);

<<<<<<< HEAD:screens/spi.js
exports.setPixel = function(pixel, r, g, b) {
=======
exports.setPixel = function(pixel, r, g, b)
{
>>>>>>> 93afe951a1f446657de2240e43651b99edbbcd4c:lib/spiScreen.js
	var s = pixel * 3;
	buffer[s] = b;
	buffer[s + 1] = r;
	buffer[s + 2] = g;
}

exports.update = function update() {
  spi.write(buffer, function(device) {
  });
}
