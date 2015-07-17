var minimist = require('minimist');
var util = require('util');
var config = require(process.env.WOLKD_CONFIG);
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

var screen = require('./lib/screen')(config, argv.screen);
var mapping = require(util.format('./mappings/%s.json', argv.mapping));

var beat = 60 / config.bpm * 1000;

patternReader(function(patterns) {
  modifierReader(function(modifiers) {
    var animator = animate(config, mapping, screen, patterns, modifiers);
    var searchlightTimeout;

    var autopilot;
    if (config.autopilot.enabled) {
      autopilot = require('./lib/autopilot')(config, animator, patterns, modifiers);
    }

    server.start(config, patterns, modifiers, function(e) {
      if (autopilot) {
        autopilot.reset();
      }

      if (e.event === 'pattern') {
        animator.setPattern(e.data.name, e.data.value);
      } else if (e.event === 'modifier') {
        animator.setModifier(e.data.name, e.data.value);
      } else if (e.event === 'bpm') {
        console.log(e)
      } else if (e.event === 'searchlight') {
        if (searchlightTimeout) {
          clearTimeout(searchlightTimeout);
        }

        searchlightTimeout = setTimeout(function() {
          animator.setModifier('searchlight', 0, e.data);
        }, 10000);

        animator.setModifier('searchlight', 1, e.data);
      }
    })
  });
});
