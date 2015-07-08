var util = require('util');
var NanoTimer = require('nanotimer');
var config = require('./config');
var argv = require('minimist')(process.argv.slice(2));

try {
  var SPI = require('spi');
} catch(e) {
  console.log('SPI package not found. Running in debug mode. Run `npm install spi`, or keep debugging!')
  var colors = require('ansi-256-colors');
}

var beat = 60 / config.bpm * 1000;

var rgb = {
  color: function(value) {
    return [value, value, value];
  },
  black: [0, 0, 0],
  white: [255, 255, 255],
  red: [255, 0, 0],
  green: [0, 255, 0],
  bluee: [0, 0, 255]
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

function main(){
  var timer = new NanoTimer();
  timer.setInterval(update, '', Math.round(1000 / config.framerate) + 'm');
}

// Contains three byte for each pixel (one per color): first blue, then red, then green!
var buffer = new Buffer(config.pixels * 3);

var setPixel = function(buffer, pixel, r, g, b) {
  buffer[pixel * 3] = b;
  buffer[pixel * 3 + 1] = r;
  buffer[pixel * 3 + 2] = g;
}


var t = 0;
function update(){


  for (var i = 0; i < config.pixels && i < mapping.length; i++) {
    var ledPos = mapping[i];
    var rgb = animations.functions.nederland(t, i, ledPos[0], ledPos[1]);

    setPixel(buffer, i, rgb[0], rgb[1], rgb[2]);
  }

  for (var c = 0; c < buffer.length / 3; c++) {
    var b = buffer[c * 3];
    var r = buffer[c * 3 + 1];
    var g = buffer[c * 3 + 2];

    process.stdout.write(colors.bg.getRgb(Math.round(r / 51), Math.round(g / 51), Math.round(b / 51)) + ' ');
  }
  process.stdout.write(colors.reset + '\r');

  t += 1;
}

main();
