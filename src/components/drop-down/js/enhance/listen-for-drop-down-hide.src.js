var
  menuHiddenClass    = require('./constants/menu-hidden-class.src.js'),
  triggerActiveClass = require('./constants/trigger-active-class.src.js');

module.exports = function (component, trigger, menu, hideOnOtherDropDownShow) {
  'use strict';

  function handleDropDownHide(e) {
    var
      dropDownWillHideEvent,
      dropDownDidHideEvent,
      menuClassName,
      triggerClassName;

    e.stopPropagation();

    dropDownWillHideEvent = new window.CustomEvent(
      'dropDownWillHide',
      {
        'detail': {
          'component': component
        },
        'bubbles': true
      }
    );
    component.dispatchEvent(dropDownWillHideEvent);

    menuClassName    = menu.className;
    triggerClassName = trigger.className;

    menuClassName    = menuClassName.replace(menuHiddenClass, ' ');
    menuClassName    += ' drop-down__menu--hidden';
    triggerClassName = triggerClassName.replace(triggerActiveClass, ' ');

    menu.className    = menuClassName;
    trigger.className = triggerClassName;

    dropDownDidHideEvent = new window.CustomEvent(
      'dropDownDidHide',
      {
        'detail': {
          'component': component
        },
        'bubbles': true
      }
    );

    document.body.removeEventListener(
      'dropDownWillShow',
      hideOnOtherDropDownShow,
      true
    );

    component.dispatchEvent(dropDownDidHideEvent);
  }

  component.addEventListener('dropDownHide', handleDropDownHide, false);
};
