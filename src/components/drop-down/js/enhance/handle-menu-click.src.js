var optionTriggerClass = require('./constants/option-trigger-class.src.js');

// select current option when clicked
module.exports = function (e) {
  'use strict';

  var
    menu,
    component,
    dropDownSelectEvent;

  // send select event but allow click for navigation
  if (e.target.tagName === 'A'
    && optionTriggerClass.test(e.target.className)) {

    e.stopPropagation();

    menu      = this;
    component = menu.parentElement;

    dropDownSelectEvent = new window.CustomEvent(
      'dropDownSelect',
      {
        'detail': {
          'select': e.target
        },
        'bubbles': true
      }
    );
    component.dispatchEvent(dropDownSelectEvent);
  }
};
