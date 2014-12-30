var menuHidden = require('./menu-hidden');

// toggle menu visibility on trigger click
module.exports = function (component, trigger, menu) {
  'use strict';

  function handleTriggerClick(e) {
    var
      dropDownShowEvent,
      dropDownHideEvent;

    e.stopPropagation();
    e.preventDefault();

    if (menuHidden.test(menu.className)) {
      dropDownShowEvent = new window.CustomEvent(
        'dropDownShow'
      );
      component.dispatchEvent(dropDownShowEvent);
    } else {
      dropDownHideEvent = new window.CustomEvent(
        'dropDownHide'
      );
      component.dispatchEvent(dropDownHideEvent);
    }

    return false;
  }

  trigger.addEventListener('click', handleTriggerClick, false);
};
