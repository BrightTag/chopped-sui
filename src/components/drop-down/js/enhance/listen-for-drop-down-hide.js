var
  menuHiddenClass    = require('./constants/menu-hidden-class'),
  triggerActiveClass = require('./constants/trigger-active-class');

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
        }
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
        }
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
