module.exports =  {
  title: 'Wave',
  length: 4,
  type: 'continuous',
  getFrame: function(t, i, x, y) {
    return [0, 0, 255];
  }
};
