var beamAngle = 45;

module.exports =  {
  title: 'Vuurtoren',
  length: 4,
  type: 'continuous',
  getPixel: function(beat, t, i, x, y) {
    var nt = t * 10 % 720;

    if (nt <= 360) {
      var dx = 0.5 - x;
      var dy = 0.5 - y;

      var pixelAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 180;
      var lighthouseAngle = (t * 10 % 360);
      var dAngle = Math.abs(pixelAngle - lighthouseAngle) % 360;
      var r = dAngle > 180 ? 360 - dAngle : dAngle;

      if (r > beamAngle) {
        return [0, 0, 0];
      } else {
        var v = (Math.cos(dAngle / beamAngle * Math.PI) + 1) / 2;
        return [Math.round(255 * v), Math.round(255 * v), Math.round(255 * v)];
      }
    } else {
      return [0, 0, 0];
    }
  }
};
