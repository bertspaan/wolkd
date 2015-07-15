var config = require(process.env.WOLKD_CONFIG);
var colors = require('ansi-256-colors');

var buffer = new Buffer(config.pixels * 3);

exports.setPixel = function(pixel, r, g, b) {
	var s = pixel * 3;
	buffer[s] = r;
	buffer[s + 1] = g;
	buffer[s + 2] = b;
}

exports.update = function() {
	for (var c = 0; c < config.pixels * 3; c += 3) {
		var r = Math.round(buffer[c] / 51);
		var g = Math.round(buffer[c + 1] / 51);
		var b = Math.round(buffer[c + 2] / 51);
		process.stdout.write(colors.bg.getRgb(r, g, b) + ' ');
	}

	// don't carriage return when `--trace` is passed
  // if(argv.trace)
  // return process.stdout.write(colors.reset + '\n');
  // else
	process.stdout.write(colors.reset + '\r');
}
