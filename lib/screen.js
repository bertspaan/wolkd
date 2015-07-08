var config = require('../config.json')
var s = require('./debugScreen');

try {
	 s = require('./SPIScreen');
} catch(e) {
	console.log('SPI package not found. Running in debug mode. Run `npm install spi`, or keep debugging!')	
}

exports.setPixel = function(pixel, r, g, b)
{
	// handigheidje
	if(g == undefined && b == undefined && Array.isArray(r))
	{
		g = r[1];
		b = r[2];
		r = r[0];
	}

	// make sure r,g,b always between 0 and 255
	var r = Math.max(0, Math.min(255, r))
	var g = Math.max(0, Math.min(255, g))
	var b = Math.max(0, Math.min(255, b))
	
	// pixels just wrap around
	var p = pixel % config.pixels;

	return s.setPixel(p, r, g, b);
}

exports.update = s.update.bind(s);