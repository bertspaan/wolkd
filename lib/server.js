var express = require('express')
var app = express()
var WebSocketServer = require('ws').Server

module.exports.start = function (config, patterns, modifiers, callback) {
  var wss = new WebSocketServer({
    port: config.websocket.port
  })

  app.use(express.static('public'))

  wss.on('connection', function connection (ws) {
    ws.on('message', function incoming (data) {
      var event = JSON.parse(data)
      callback(event)
    })
  })

  app.get('/config', function (req, res) {
    res.send({
      hostname: config.hostname,
      websocket: config.websocket
    })
  })

  app.get('/patterns', function (req, res) {
    var result = Object.keys(patterns)
      .map(function (name) {
        return {
          name: name,
          title: patterns[name].title,
          value: patterns[name].value
        }
      })
      .sort(function (a, b) {
        return a.title > b.title
      })

    res.send(result)
  })

  app.get('/modifiers', function (req, res) {
    var result = Object.keys(modifiers)
      .filter(function (name) {
        return modifiers[name].published === undefined || modifiers[name].published === true
      })
      .map(function (name) {
        return {
          name: name,
          title: modifiers[name].title,
          value: modifiers[name].value
        }
      })
      .sort(function (a, b) {
        return a.title > b.title
      })

    res.send(result)
  })

  app.listen(config.http.port, function () {
    console.log(`wolkd started on port ${config.http.port}!`)
  })
}
