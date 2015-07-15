var radius = 0.5;

module.exports =  {
  title: 'Mouse',
  type: 'position',
  published: false,
  getPixel: function(t, i, x, y, rgb, value, data) {
    var dx = x - data.x;
    var dy = y - data.y;
    var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (d > radius) {
      return [0, 0, 0];
    } else {
      var v = (Math.cos(d / radius * Math.PI) + 1) / 2;
      // console.log(v)
      return [Math.round(rgb[0] * v), Math.round(rgb[1] * v), Math.round(rgb[2] * v)];
    }
  }
};
