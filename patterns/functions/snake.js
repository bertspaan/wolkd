module.exports = {
  title: 'Snake',
  length: 4,
  type: 'discrete',
  getPixel: function(beat, t, i) {
    if (Math.abs((t % 100) - i) < 5) {
      return [255, 255, 255];
    } else {
      return [0, 0, 0];
    }
  }
};
