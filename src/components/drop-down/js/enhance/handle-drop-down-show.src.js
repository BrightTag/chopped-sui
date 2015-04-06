var
  menuHiddenClass    = require('./constants/menu-hidden-class.src.js'),
  triggerActiveClass = require('./constants/trigger-active-class.src.js');

module.exports = function (e) {
  'use strict';

  var
    component,
    trigger,
    menu,
    dropDownWillShowEvent,
    dropDownDidShowEvent,
    menuClassName,
    triggerClassName;

  e.stopPropagation();

  component = this;
  trigger   = component.querySelectorAll('.drop-down__trigger')[0];
  menu      = component.querySelectorAll('.drop-down__menu')[0];

  dropDownWillShowEvent = new window.CustomEvent(
    'dropDownWillShow',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(dropDownWillShowEvent);
  document.body.dispatchEvent(dropDownWillShowEvent);

  menuClassName    = menu.className;
  triggerClassName = trigger.className;

  menuClassName    = menuClassName.replace(menuHiddenClass, ' ');
  triggerClassName = triggerClassName.replace(triggerActiveClass, ' ') +
    ' drop-down__trigger--active';

  menu.className    = menuClassName;
  trigger.className = triggerClassName;

  dropDownDidShowEvent = new window.CustomEvent(
    'dropDownDidShow',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );

  // document.body.addEventListener(
  //   'dropDownWillShow',
  //   hideOnOtherDropDownShow,
  //   false
  // );

  menu.scrollTop = 1;
  menu.scrollTop = 0;

  trigger.focus();

  component.dispatchEvent(dropDownDidShowEvent);
};
