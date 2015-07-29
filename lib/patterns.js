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
    .filter(function(m) {
      return m.pattern.getPixel || m.pattern.frames;
    })
    .toArray(function(array) {
      var patterns = {};
      array.forEach(function(p) {
        patterns[p.name] = p.pattern;
        patterns[p.name].value = 0;
      });
      callback(patterns);
    });
};
