var
  handleTriggerClick     = require('./enhance/handle-trigger-click.src.js'),
  handleComponentBlur    = require('./enhance/handle-component-blur.src.js'),
  handleComponentKeydown = require('./enhance/handle-component-keydown.src.js'),
  handleComponentKeyup   = require('./enhance/handle-component-keyup.src.js'),
  handleMenuClick        = require('./enhance/handle-menu-click.src.js'),
  handleDropDownShow     = require('./enhance/handle-drop-down-show.src.js'),
  handleDropDownHide     = require('./enhance/handle-drop-down-hide.src.js'),
  handleDropDownSelect   = require('./enhance/handle-drop-down-select.src.js'),
  isDropDown             = require('./constants/is-drop-down.src.js'),
  isEnhancedDropDown     = require('./constants/is-enhanced-drop-down.src.js');

// open/close menu and change selected option on arrows
module.exports = function (component, unenhance) {
  'use strict';

  var
    trigger,
    menu,
    componentClasses,
    addOrRemove = unenhance ? 'removeEventListener' : 'addEventListener';

  // fail fast with no DOM lookups
  if (!component || !(componentClasses = component.className)) {
    return false;
  }

  // fail fast if component is not a dropDown
  if (!isDropDown.test(componentClasses)) {
    return false;
  }

  // return without work if dropDown is already enhanced
  if (!unenhance && isEnhancedDropDown.test(componentClasses)) {
    return true;
  }

  // potentially existing elements
  trigger = component.querySelectorAll('.drop-down__trigger')[0];
  menu    = component.querySelectorAll('.drop-down__menu')[0];

  // bad base component or template data issue
  if (!trigger || !menu) {
    return false;
  }

  // convert user interactions into API events
  component[addOrRemove]('keydown', handleComponentKeydown, false);
  component[addOrRemove]('keyup', handleComponentKeyup, false);
  menu[addOrRemove]('click', handleMenuClick, false);
  trigger[addOrRemove]('click', handleTriggerClick, false);

  // listen for API events and react accordingly
  component[addOrRemove]('dropDownHide', handleDropDownHide, false);
  component[addOrRemove]('dropDownSelect', handleDropDownSelect, false);
  component[addOrRemove]('dropDownShow', handleDropDownShow, false);
  component[addOrRemove]('blur', handleComponentBlur, true);

  return true;
};
