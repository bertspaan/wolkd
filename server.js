var os = require('os');
var express = require('express');
var config = require('./config');
var app = express();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
  port: config.websocket.port
});

app.use(express.static('public'));

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    var message = JSON.parse(data);
    console.log(message)
  });
});

app.get('/config', function(req, res) {
  res.send({
    hostname: os.hostname(),
    websocket: config.websocket
  });
});

var server = app.listen(config.http.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('wolkd started!');
});