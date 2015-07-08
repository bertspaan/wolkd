var SPI = require('spi');

var numPixels = 100;
var buffer = new Buffer(numPixels * 3);

var setColor = function(pixel, r, g, b) {
  buffer[pixel * 3] = b;
  buffer[pixel * 3 + 1] = r;
  buffer[pixel * 3 + 2] = g;
}

var spi = new SPI.Spi('/dev/spidev0.0', {
    'mode': SPI.MODE['MODE_0'],  // always set mode as the first option
    'chipSelect': SPI.CS['none'] // 'none', 'high' - defaults to low
  }, function(s){s.open();});

function update() {
  spi.write(buffer, function(device) {
  });
}

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    var data = JSON.parse(message);

    if (data.length === 1) {
      var color = data[0];
      for (var i = 0; i < numPixels; i++) {
        setColor(i, color[0], color[1], color[2]);
      }
    } else {
      //console.log(data[0][0])
      for (var i = 0; i < numPixels && i < data.length; i++) {
        var color = data[i];
        setColor(i, color[0], color[1], color[2]);
      }
    }

    update();
  });

});