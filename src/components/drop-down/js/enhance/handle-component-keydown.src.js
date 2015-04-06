// prevent document scroll on arrow navigation
module.exports = function (e) {
  'use strict';

  // all arrows
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    e.preventDefault();
    return false;
  }

  return true;
};
