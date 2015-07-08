
var rgb = {
  gray: function(value) {
    return [value, value, value];
  },
  black: [0, 0, 0],
  white: [255, 255, 255],
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255]
};


module.exports = {

	snake: function(t, i, x, y) {
	  if (Math.abs((t % 100) - i) < 5) {
	    return rgb.white;
	  } else {
	    return rgb.black;
	  }
	},

	sine: function(t, i, x, y) {
	  var p = t % 100 / 100;
	  var r = Math.cos(((x + y / 2) + p)* Math.PI * 2) * 128 + 128;
	  return [r, 0, 0];
	},

	test: function(t, i, x, y) {
	  return [(t * 5) % 255, 0, 0]
	  // if (y < 0.5) {
	  //   return [255, 0,0];
	  // } else {
	  //   return [0,255,0];
	  // }
	},


	nederland: function(t, i, x, y) {
	  if (x < .33) {
	    return [174, 28, 40];
	  } else if (x < .66) {
	    return [255,255,255];
	  } else {
	    return [33,70,139];
	  }
	},

	blink: function(t, i, x, y) {
		var k = t % 4;
		return rgb.gray((k < 2) ? 255 : 0);
	},

	police: function(t, i, x, y) {
    // niet framerate maar police.length * framerate of zo!
    var framerate = 64;
		var p = (t % framerate / framerate) * 2 * Math.PI;
    var i = (Math.sin(p) + 1) / 2;

    return [Math.abs(x - p) * 255, 0, 0];
	},

	lighthouse: function(t, i, x, y) {
	  var dx = x - 0.5;
	  var dy = y - 0.5;

	  var rad = Math.atan2(dy, dx);
	  var deg = rad * (180 / Math.PI);

	  var lightAngle = 23;

	  var value = deg - lightAngle + t % 360;
	  if (value < 0) {
	    return rgb.black;
	  } else {
	    return rgb.gray(255 / lightAngle * value);
	  }

	}

}