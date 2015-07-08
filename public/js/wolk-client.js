var host = 'wolk.local';
var ws = new WebSocket('ws://' + host + ':8080');
var framerate = 15;

function wolkSend(event, data) {
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

