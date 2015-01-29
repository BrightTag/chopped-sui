var
  menuHiddenClass    = require('./constants/menu-hidden-class'),
  triggerActiveClass = require('./constants/trigger-active-class');

module.exports = function (component, trigger, menu, hideOnOtherDropDownShow) {
  'use strict';

  function handleDropDownShow(e) {
    var
      dropDownWillShowEvent,
      dropDownDidShowEvent,
      menuClassName,
      triggerClassName;

    e.stopPropagation();

    dropDownWillShowEvent = new window.CustomEvent(
      'dropDownWillShow',
      {
        'detail': {
          'component': component
        }
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
        }
      }
    );

    document.body.addEventListener(
      'dropDownWillShow',
      hideOnOtherDropDownShow,
      false
    );

    menu.scrollTop = 1;
    menu.scrollTop = 0;

    trigger.focus();

    component.dispatchEvent(dropDownDidShowEvent);
  }

  component.addEventListener('dropDownShow', handleDropDownShow, false);
};
