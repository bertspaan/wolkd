var minimist = require('minimist');
var util = require('util');
var config = require('./config');
var server = require('./lib/server');
var animate = require('./lib/animate');

var argv = minimist(process.argv.slice(2), {
  default: {
    screen: config.screen || 'spi',
    mapping: config.mapping
  }
});

var screen = require('./lib/screen')(argv.screen);
var mapping = require(util.format('./mappings/%s.json', config.mapping));

var animations = {
	functions: require('./animations/functions')
}

var beat = 60 / config.bpm * 1000;

var animation = animate(config, mapping, screen, animations, [
  {
    name: 'snake',
    value: 1
  },
  {
    name: 'sine',
    value: 0.8
  },
  {
    name: 'police',
    value: 0.4
  },
  {
    name: 'alternate',
    value: 0.8
  }
]);

server.start(function(event) {
  animation.remove('alternate');
  animation.remove('snake');
})
