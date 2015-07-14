var fs = require('fs');
var path = require('path');
var _ = require('highland');

var dirs = [
  'frames',
  'functions'
];

module.exports = function(callback) {
  var baseDir = __dirname + '/../patterns/';
  var readdir = _.wrapCallback(function(dir, callback) {
    fs.readdir(baseDir + dir, function(err, files) {
      callback(err, {
        dir: dir,
        files: files
      });
    });
  });

  _(dirs)
    .map(readdir)
    .series()
    .map(function(dirFiles) {
      return dirFiles.files.map(function(file) {
        return {
          dir: dirFiles.dir,
          file: file
        };
      });
    })
    .flatten()
    .filter(function(dirFile) {
      return path.extname(dirFile.file) === '.js';
    })
    .map(function(dirFile) {
      var filename = '../patterns/' + dirFile.dir + '/' + dirFile.file;
      return {
        name: dirFile.file.replace('.js', ''),
        pattern: require(filename)
      };
    })
    .toArray(function(array) {
      var patterns = {};
      array.forEach(function(pattern) {
        patterns[pattern.name] = pattern.pattern;
        patterns[pattern.name].value = 0;
      });
      callback(patterns);
    });
}




//
// module.exports = {
// // alle functies hebben
// //   - length
// //   - getFrame
// //   - frames [], buffer
// //
// //   - type: discrete, smooth
//

//
//   sine: {
//     length: 2,
//     type: 'continuous',
//     getFrame: function(t, i, x, y) {
//       var p = t % 100 / 100;
//       var r = Math.cos(((x + y / 2) + p)* Math.PI * 2) * 128 + 128;
//       return [r, 0, 0];
//     }
//   },
//

//
//   // sine: function(t, i, x, y) {
//   //   var p = t % 100 / 100;
//   //   var r = Math.cos(((x + y / 2) + p)* Math.PI * 2) * 128 + 128;
//   //   return [r, 0, 0];
//   // },
//   //
//   // test: function(t, i, x, y) {
//   //   return [(t * 5) % 255, 0, 0]
//   //   // if (y < 0.5) {
//   //   //   return [255, 0,0];
//   //   // } else {
//   //   //   return [0,255,0];
//   //   // }
//   // },
//   //
//   //
//   // nederland: function(t, i, x, y) {
//   //   if (y < .33) {
//   //     return rgb.red;
//   //   } else if (y < .66) {
//   //     return rgb.white;
//   //   } else {
//   //     return rgb.blue;
//   //   }
//   // },
//   //
//   // blink: function(t, i, x, y) {
//   //   var k = t % 4;
//   //   return rgb.gray((k < 2) ? 255 : 0);
//   // },
//   //
//   //
//   //
//   // lighthouse: function(t, i, x, y)
//   // {
//   //   var dx = x - 0.5;
//   //   var dy = y - 0.5;
//   //
//   //   var k = Math.abs(Math.sin((t/16)))
//   //   var a = Math.atan2(dy, dx) / Math.PI;
//   //   var rad = (a + (t/32)) % 1;
//   //   // var v = (rad < .15) ? 255 : 0;
//   //   var v = Math.pow(rad, 3) * (k > 0.8 ? 255 : 0);
//   //
//   //   return [v, v, v]
//   // },
//   //
//   // rgbtest: function(t, i, x, y) {
//   //   x += (t/32);
//   //   y += (t/33);
//   //
//   //   x %= 1;
//   //   y %= 1;
//   //
//   //   return [x * 255, y * 255, 255 * (x + y) / 2];
//   // },
//   //
//   // ding1: function(t, i, x, y) {
//   //   var dx = x - 0.5;
//   //   var dy = y - 0.5;
//   //
//   //   // 0 .. 2*PI
//   //   var rad = Math.abs(Math.atan2(dy, dx) / Math.PI);
//   //   var v = (rad + (t/32)) % 1;
//   //   return [v*255,v*255,v*255];
//   // }
// }