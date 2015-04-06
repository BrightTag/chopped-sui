var menuHidden = require('./constants/menu-hidden.src.js');

// toggle menu visibility on trigger click
module.exports = function (e) {
  'use strict';

  var
    trigger,
    component,
    menu,
    dropDownShowEvent,
    dropDownHideEvent;

  e.stopPropagation();
  e.preventDefault();

  trigger   = this;
  component = trigger.parentElement;
  menu      = component.querySelectorAll('.drop-down__menu')[0];

  if (menuHidden.test(menu.className)) {
    dropDownShowEvent = new window.CustomEvent(
      'dropDownShow',
      {
        'bubbles': true
      }
    );
    component.dispatchEvent(dropDownShowEvent);
  } else {
    dropDownHideEvent = new window.CustomEvent(
      'dropDownHide',
      {
        'bubbles': true
      }
    );
    component.dispatchEvent(dropDownHideEvent);
  }

  return false;
};
