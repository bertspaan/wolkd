var host;
var port;
var ws;

d3.json('config', function(config) {
  hostname = config.hostname;
  port = config.websocket.port;
  ws = new ReconnectingWebSocket('ws://' + hostname + ':' + port);
})

function wolkSend(event, data) {
  if (ws) {
    try {
      ws.send(JSON.stringify(
        {
          event: event,
          data: data
        }
      ));
    } catch(e) {
      console.log(e);
    }
  }
}
