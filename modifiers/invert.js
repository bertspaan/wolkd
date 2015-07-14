module.exports = function(rgb) {
  return rgb.map(function(c) {
    return 255 - c;
  });
};
