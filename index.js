var minimist = require('minimist');
var util = require('util');
var config = require('./config');
var server = require('./lib/server');
var animate = require('./lib/animate');

var patternReader = require('./lib/patterns');
var modifierReader = require('./lib/modifiers');

var argv = minimist(process.argv.slice(2), {
  default: {
    screen: config.screen || 'spi',
    mapping: config.mapping
  }
});

var screen = require('./lib/screen')(argv.screen);
var mapping = require(util.format('./mappings/%s.json', config.mapping));

var beat = 60 / config.bpm * 1000;

patternReader(function(patterns) {
  modifierReader(function(modifiers) {
    var animator = animate(config, mapping, screen, patterns, modifiers);

    server.start(patterns, modifiers, function(e) {
      if (e.event === 'pattern') {
        animator.setPattern(e.data.name, e.data.value);
      } else if (e.event === 'modifier') {
        animator.setModifier(e.data.name, e.data.value);
      } else if (e.event === 'bpm') {
        console.log(e)
      } else if (e.event === 'mouse') {
        console.log(e)
      }
    })
  });
});
