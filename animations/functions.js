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
		var pRed = (t % framerate / framerate) * 2 * Math.PI;
    var pBlue = ((t + framerate / 2) % framerate / framerate) * 2 * Math.PI;
    var iRed = (Math.sin(pRed) + 1) / 2;
    var iBlue = (Math.sin(pBlue) + 1) / 2;

    return [Math.max(y - iRed, 0) * 255, 0, Math.max((1 - y) - iBlue, 0) * 255];
	},

	alternate: function(t, i, x, y) {
		var a = (t % 20) - 10 > 0;

    if (i % 2 == 0) {
      return a ? rgb.white : rgb.black;
    } else {
      return !a ? rgb.white : rgb.black;
    }
	},

	lighthouse: function(t, i, x, y)
	{
		var dx = x - 0.5;
		var dy = y - 0.5;

		var k = Math.abs(Math.sin((t/16)))
		var a = Math.atan2(dy, dx) / Math.PI;
		var rad = (a + (t/32)) % 1;
		// var v = (rad < .15) ? 255 : 0;
		var v = Math.pow(rad, 3) * (k > 0.8 ? 255 : 0);

		return [v, v, v]
	},

	rgbtest: function(t, i, x, y) {
		x += (t/32);
		y += (t/33);

		x %= 1;
		y %= 1;

		return [x * 255, y * 255, 255 * (x + y) / 2];
	},

	ding1: function(t, i, x, y) {
	  var dx = x - 0.5;
	  var dy = y - 0.5;

	  // 0 .. 2*PI
	  var rad = Math.abs(Math.atan2(dy, dx) / Math.PI);
	  var v = (rad + (t/32)) % 1;
	  return [v*255,v*255,v*255];
	}
}