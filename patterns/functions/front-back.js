module.exports =  {
  title: 'Front! Back!',
  length: 2,
  type: 'discrete',
  getPixel: function(beat, t, i, x, y) {
    var front = (beat % 2) === 0;

    if (y <= 0.5) {
      return front ? [0, 0, 0] : [255, 255, 255];
    } else {
      return front ? [255, 255, 255] : [0, 0, 0];
    }
  }
};
