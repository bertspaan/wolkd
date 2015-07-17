module.exports =  {
  title: 'Eén kleur',
  length: 4,
  type: 'continuous',
  getPixel: function(beat, t, i, x, y) {
    return [255, 0, 0];
  }
};
