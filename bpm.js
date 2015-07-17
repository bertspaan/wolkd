var bpm = 120;
var framesPerBeat = 16;
var beat = 60 / bpm * 1000;
var firstMs = new Date().getTime();
var msPerFrame = beat / framesPerBeat;

var i = 0;

function frame() {
  var currentMs = new Date().getTime();

  for (var j = 0; j < 1000; j++) {
    var r= Math.cos(3) * Math.cos(3);
  }

  var timeout = -1;
  while(timeout < 0) {
    timeout = ((i + 1) * msPerFrame + firstMs) - currentMs;
    i += 1;
  }

  if (i % framesPerBeat === 0) {
    console.log('Beat!', i, timeout)
  }

  setTimeout(frame, timeout);
}

frame();

