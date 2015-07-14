module.exports =  {
  title: 'Single color: red',
  length: 1,
  type: 'continuous',
  getFrame: function(t, i, x, y) {
    return [0, 0, 255];
  }
};
