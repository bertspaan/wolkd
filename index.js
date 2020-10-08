require('dotenv').config()

// TODO: use yargs
var minimist = require('minimist')
var config = require(process.env.WOLKD_CONFIG || die('Please specify path to config file in WOLKD_CONFIG environment variable'))
var server = require('./lib/server')
var animate = require('./lib/animate')

var patternReader = require('./lib/patterns')
var modifierReader = require('./lib/modifiers')

function die (message) {
  console.error(message)
  process.exit(1)
}

var argv = minimist(process.argv.slice(2), {
  boolean: [
    'autopilot'
  ],
  default: {
    screen: config.screen || 'spi',
    mapping: config.mapping,
    autopilot: (config.autopilot && config.autopilot.enabled)
  }
})

var screen = require('./lib/screen')(config, argv.screen)
var mapping = require(`./mappings/${argv.mapping}.json`)
var autopilotEnabled = argv.autopilot

patternReader(function (patterns) {
  modifierReader(function (modifiers) {
    var animator = animate(config, mapping, screen, patterns, modifiers)
    var searchlightTimeout

    var autopilot
    if (autopilotEnabled) {
      autopilot = require('./lib/autopilot')(config, animator, patterns)
    }

    server.start(config, patterns, modifiers, function (e) {
      if (e.event === 'pattern' || e.event === 'modifier') {
        if (autopilot) {
          autopilot.reset()
        }
      }

      if (e.event === 'pattern') {
        animator.setPattern(e.data.name, e.data.value)
      } else if (e.event === 'modifier') {
        animator.setModifier(e.data.name, e.data.value)
      } else if (e.event === 'bpm') {
        animator.setBpm(e.data.bpm, e.data.startMs)
      } else if (e.event === 'searchlight') {
        if (searchlightTimeout) {
          clearTimeout(searchlightTimeout)
        }

        searchlightTimeout = setTimeout(function () {
          animator.setModifier('searchlight', 0, e.data)
        }, 2000)

        animator.setModifier('searchlight', 1, e.data)
      }
    })
  })
})
