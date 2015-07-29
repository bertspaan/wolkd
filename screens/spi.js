var SPI = require('spi');
var config = require(process.env.WOLKD_CONFIG);

var spi = new SPI.Spi(config.spi.device, {
	mode: SPI.MODE.MODE_0, // always set mode as the first option
	chipSelect: SPI.CS.none // 'none', 'high' - defaults to low
}, function(s) {
	s.open();
});

// Contains three byte for each pixel (one per color): first blue, then red, then green!
var buffer = new Buffer(config.pixels * 3);

exports.setPixel = function(pixel, r, g, b) {
	var s = pixel * 3;
	buffer[s] = b;
	buffer[s + 1] = r;
	buffer[s + 2] = g;
};

exports.update = function update() {
  spi.write(buffer, function() {
  });
};
