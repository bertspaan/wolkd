var host = 'wolk.local';
var ws = new WebSocket('ws://' + host + ':8080');
var framerate = 15;

function wolkSend(action, id, data) {
  try {
    ws.send(JSON.stringify(
      {
        action: action,
        id: id,
        data: data
      }
    ));
  } catch(e) {
  }
}

