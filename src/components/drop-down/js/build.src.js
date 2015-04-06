var
  buildFromMenu      = require('./build/build-from-menu.src.js'),
  buildFromSelect    = require('./build/build-from-select.src.js'),
  isDropDown         = require('./constants/is-drop-down.src.js'),
  isEnhancedDropDown = require('./constants/is-enhanced-drop-down.src.js'),
  isBuiltDropDown    = require('./constants/is-built-drop-down.src.js');

// add HTML for existing markup
module.exports = function (component) {
  'use strict';

  var
    select,
    trigger,
    menu,
    componentClasses;

  // fail fast with no DOM lookups
  if (!component || !(componentClasses = component.className)) {
    return false;
  }

  // fail fast if component is not a dropDown
  if (!isDropDown.test(componentClasses)) {
    return false;
  }

  // return without work if dropDown is already enhanced
  if (isEnhancedDropDown.test(componentClasses)) {
    return true;
  }

  // return without work if dropDown is already built
  if (isBuiltDropDown.test(componentClasses)) {
    return true;
  }

  // potentially existing elements
  select  = component.querySelectorAll('.drop-down__select')[0];
  trigger = component.querySelectorAll('.drop-down__trigger')[0];
  menu    = component.querySelectorAll('.drop-down__menu')[0];

  // bad base component or template data issue
  if (!select && !menu) {
    return false;
  }

  // enhance from the element provided
  if (select) {
    buildFromSelect(component, select);
  } else {
    buildFromMenu(component, menu, trigger);
  }

  return true;
};
