var rgb = require('../../lib/color-utils').rgb;

module.exports =  {
  title: 'Lighthouse',
  length: 4,
  type: 'discrete',
  getFrame: function(t, i, x, y) {
    var dx = x - 0.5;
    var dy = y - 0.5;

    var k = Math.abs(Math.sin((t/16)))
    var a = Math.atan2(dy, dx) / Math.PI;
    var rad = (a + (t/32)) % 1;
    // var v = (rad < .15) ? 255 : 0;
    var v = Math.pow(rad, 3) * (k > 0.8 ? 255 : 0);

    return [v, v, v]
  }
}
