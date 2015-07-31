module.exports =  {
  title: 'Left! Right!',
  getPixel: function(beat, t, i, x) {
    var front = Math.round(beat) % 2 === 0;

    if (x <= 0.5) {
      return front ? [0, 0, 0] : [255, 255, 255];
    } else {
      return front ? [255, 255, 255] : [0, 0, 0];
    }
  }
};
