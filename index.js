var argv = require('minimist')(process.argv.slice(2));

var util = require('util');
var config = require('./config');

var screen = require('./lib/screen')

var beat = 60 / config.bpm * 1000;

// current time in ms since starting
var time_ms = function() {
	var t = process.hrtime;
	return (t[0] * 1e9 + t[1]) / 1e6;
}

// Load mapping
var mapping = require(util.format('./%s/%s', 'mappings', 'kamer.json'));

var animations = {
	functions: require('./animations/functions')
}

// show all anims
if(argv.anims)
{
	console.log(Object.keys(animations.functions).join('\n'));
	process.exit(-1);
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

setInterval(update, Math.round(1000 / config.framerate));
