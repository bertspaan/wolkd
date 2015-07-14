var fs = require('fs');
var path = require('path');
var _ = require('highland');

module.exports = function(callback) {
  var baseDir = __dirname + '/../modifiers/';
  var readdir = _.wrapCallback(fs.readdir);

  _(readdir(baseDir))
    .series()
    .flatten()
    .filter(function(filename) {
      return path.extname(filename) === '.js';
    })
    .map(function(filename) {
      return {
        name: filename.replace('.js', ''),
        modifier: require('../modifiers/' + filename)
      };
    })
    .filter(function(m) {
      return m.modifier.getPixel;
    })
    .toArray(function(array) {
      var modifiers = {};
      array.forEach(function(m) {
        modifiers[m.name] = m.modifier;
        modifiers[m.name].value = 0;
      });
      callback(modifiers);
    });
};
