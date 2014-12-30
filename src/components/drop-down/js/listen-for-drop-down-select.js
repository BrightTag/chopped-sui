var
  triggerFixed       = require('./trigger-fixed'),
  optionCurrentClass = require('./option-current-class'),
  optionHiddenClass  = require('./option-hidden-class');

module.exports = function (component, trigger, menu) {
  'use strict';

  function handleDropDownSelect(e) {
    var
      selected = e.detail.select,
      dropDownDidSelectEvent,
      dropDownHideEvent,
      menuOptions,
      i,
      len,
      menuOption,
      optionClassName,
      select,
      selectedIndex,
      previousOption,
      currentIsHidden = component.querySelectorAll('.drop-down__menu-option--hidden').length;

    e.stopPropagation();

    if (!triggerFixed.test(trigger.className)) {
      trigger.innerHTML = selected.innerHTML;

      menuOptions = menu.children;

      for (i = 0, len = menuOptions.length; i < len; i += 1) {
        menuOption      = menuOptions[i];
        optionClassName = menuOption.className;
        optionClassName = optionClassName.replace(optionCurrentClass, ' ');
        optionClassName = optionClassName.replace(optionHiddenClass, ' ');
        if (menuOption.children[0] === selected) {
          optionClassName += ' drop-down__menu-option--current';
          if (currentIsHidden) {
            optionClassName += ' drop-down__menu-option--hidden';
          }
        }
        menuOption.className = optionClassName;
      }

      select = component.querySelectorAll('.drop-down__select')[0];
      if (select) {
        selectedIndex  = -1;
        previousOption = selected.parentElement.previousSibling;
        while (previousOption) {
          if (previousOption.nodeType !== 1) {
            selectedIndex += 1;
          }
          previousOption = previousOption.previousSibling;
        }
        select.selectedIndex = selectedIndex;
      }

    }

    dropDownHideEvent = new window.CustomEvent(
      'dropDownHide',
      {
        'detail': {
          'component': component
        }
      }
    );

    trigger.focus();

    dropDownDidSelectEvent = new window.CustomEvent(
      'dropDownDidSelect',
      {
        'detail': {
          'component': e.detail.component,
          'selected' : e.detail.select
        }
      }
    );
    component.dispatchEvent(dropDownDidSelectEvent);

    component.dispatchEvent(dropDownHideEvent);
  }

  component.addEventListener('dropDownSelect', handleDropDownSelect, false);
};
