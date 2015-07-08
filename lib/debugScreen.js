var config = require('../config.json');
var colors = require('ansi-256-colors');

var buffer = new Buffer(config.pixels * 3);

exports.setPixel = function(pixel, r, g, b)
{
	var s = pixel * 3;
	buffer[s] = r;
	buffer[s + 1] = g;
	buffer[s + 2] = b;
}

exports.update = function()
{
	for (var c = 0; c < config.pixels * 3; c += 3) {
		var R = Math.round(buffer[c] / 51);
		var G = Math.round(buffer[c + 1] / 51);
		var B = Math.round(buffer[c + 2] / 51);
		process.stdout.write(colors.bg.getRgb(R, G, B) + ' ');
	}
		

	process.stdout.write(colors.reset + '\r');
}