var fs = require('fs');
var path = require('path');
var lwip = require('lwip');
var _ = require('highland');
var screen = require('./lib/screen')

var mapping = require('./mappings/kamer.json');

var dir = './animations/gif/' + process.argv[2] + '/';

var i = 0;
var framerate = 18;

var width = 20;
var height = width;

var readDir = _.wrapCallback(fs.readdir);
var openImage = _.wrapCallback(lwip.open)
var resizeImage = _.wrapCallback(function(image, callback) {
  image.resize(width, height, callback);
});

readDir(dir)
  .flatten()
  .filter(function(filename) {
    return path.extname(filename) === '.png';
  })
  .map(function(filename) {
    return dir + filename;
  })
  .map(openImage)
  .series()
  .map(resizeImage)
  .series()
  .map(function(image) {
    var frame = [];
    mapping.forEach(function(led) {
      var p = image.getPixel(Math.round(led[0] * width), Math.round(led[1] * height));
      frame.push([p.r, p.g, p.b]);
    });
    return frame;
  })
  .toArray(function(frames) {
    startAnimation(frames);
  })

function startAnimation(frames) {
  var i = 0;
  (function() {
    if (frames[i]) {
      frames[i].forEach(function(pixel, i) {
        screen.setPixel(i, pixel);
      });
      screen.update();
  	}

    i += 1;
    if (i >= frames.length) {
      i = 0;
    }

    setTimeout(arguments.callee, 1000 / framerate);
  })();
}


