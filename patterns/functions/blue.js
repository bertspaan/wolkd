module.exports =  {
  title: 'Single color: blue',
  length: 1,
  type: 'continuous',
  getFrame: function(t, i, x, y) {
    return [255, 0, 0];
  }
};
