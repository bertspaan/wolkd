module.exports =  {
  title: 'Single color: green',
  length: 4,
  type: 'continuous',
  getFrame: function(t, i, x, y) {
    return [0, 255, 0];
  }
};
