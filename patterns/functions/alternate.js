module.exports =  {
  title: 'Flip-flop',
  length: 2,
  type: 'discrete',
  getPixel: function(beat, t, i) {
    var a = (beat % 2) === 0;

    if (Math.round(i / 10) % 2 === 0) {
      return a ? [255, 255, 255] : [0, 0, 0];
    } else {
      return !a ? [255, 255, 255] : [0, 0, 0];
    }
  }
};
