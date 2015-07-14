var value = 10;

module.exports = function(rgb) {
  return rgb.map(function(c) {
    var rand = Math.round(Math.random() * value * 2);
    return Math.max(Math.min(c - value + rand, 255), 0);
  });
};
