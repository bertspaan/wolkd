var argv = require('minimist')(process.argv.slice(2));

var util = require('util');
var NanoTimer = require('nanotimer');
var config = require('./config');

var screen = require('./lib/screen')

var beat = 60 / config.bpm * 1000;

var rgb = {
  gray: function(value) {
    return [value, value, value];
  },
  black: [0, 0, 0],
  white: [255, 255, 255],
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255]
};

// Load mapping
var mapping = require(util.format('./%s/%s', 'mappings', 'kamer.json'));

var animations = {
	functions: require('./animations/functions')
}

var name = argv.anim || 'nederland'

var t = 0;
function update()
{
	for (var i = 0; i < config.pixels && i < mapping.length; i++)
	{
		var ledPos = mapping[i];
		var rgb = animations.functions[name](t, i, ledPos[0], ledPos[1]);
		screen.setPixel(i, rgb);
	}

	screen.update();
	t += 1;
}

var timer = new NanoTimer();
timer.setInterval(update, '', Math.round(1000 / config.framerate) + 'm');