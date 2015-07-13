var os = require('os');
var express = require('express');
var config = require('../config');
var app = express();
var WebSocketServer = require('ws').Server;

module.exports.start = function(callback) {
  var wss = new WebSocketServer({
    port: config.websocket.port
  });

  app.use(express.static('public'));

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      var event = JSON.parse(data);
      callback(event);
    });
  });

  app.get('/config', function(req, res) {
    var hostname = os.hostname();
    // Check if hostname is IP or name
    if (!hostname.indexOf('.') > -1) {
      hostname += '.local';
    }
    res.send({
      hostname: hostname,
      websocket: config.websocket
    });
  });

  var server = app.listen(config.http.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('wolkd started!');
  });
}
