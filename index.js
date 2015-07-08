var util = require('util');
var NanoTimer = require('nanotimer');
var config = require('./config');
var argv = require('minimist')(process.argv.slice(2));

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
  functions: {
    snake: function(t, i, x, y) {
      if (Math.abs((t % 100) - i) < 5) {
        return rgb.white;
      } else {
        return rgb.black;
      }
    },

    sine: function(t, i, x, y) {
      var p = t % 100 / 100;
      var r = Math.cos(((x + y / 2) + p)* Math.PI * 2) * 128 + 128;
      return [r, 0, 0];
    },

    test: function(t, i, x, y) {
      return [(t * 5) % 255, 0, 0]
      // if (y < 0.5) {
      //   return [255, 0,0];
      // } else {
      //   return [0,255,0];
      // }
    },


    nederland: function(t, i, x, y) {
      if (x < .33) {
        return [174, 28, 40];
      } else if (x < .66) {
        return [255,255,255];
      } else {
        return [33,70,139];
      }
    },

    lighthouse: function(t, i, x, y) {
      var dx = x - 0.5;
      var dy = y - 0.5;

      var rad = Math.atan2(dy, dx);
      var deg = rad * (180 / Math.PI);

      var lightAngle = 23;

      var value = deg - lightAngle + t % 360;
      if (value < 0) {
        return rgb.black;
      } else {
        return rgb.color(255 / lightAngle * value);
      }

    }
  }
}

var t = 0;
function update()
{
	for (var i = 0; i < config.pixels && i < mapping.length; i++)
	{
		var ledPos = mapping[i];
		var rgb = animations.functions.nederland(t, i, ledPos[0], ledPos[1]);
		screen.setPixel(i, rgb);
	}

	screen.update();
	t += 1;
}

var timer = new NanoTimer();
timer.setInterval(update, '', Math.round(1000 / config.framerate) + 'm');