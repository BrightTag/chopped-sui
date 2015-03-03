var
  buildFromMenu   = require('./build/build-from-menu.src.js'),
  buildFromSelect = require('./build/build-from-select.src.js');

// add HTML for existing markup
module.exports = function (component) {
  'use strict';

  var
    // potentially existing elements
    select  = component.querySelectorAll('.drop-down__select')[0],
    trigger = component.querySelectorAll('.drop-down__trigger')[0],
    menu    = component.querySelectorAll('.drop-down__menu')[0];

  if (select) {
    buildFromSelect(component, select);
  } else if (menu) {
    buildFromMenu(component, menu, trigger);
  }

  return true;
};
