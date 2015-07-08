var express = require('express');
var app = express();

// Should be merged with index.js!
// And index should also start webserver

app.use(express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('wolkd started!');
});