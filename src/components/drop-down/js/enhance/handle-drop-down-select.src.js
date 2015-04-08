var
  triggerFixed       = require('./constants/trigger-fixed.src.js'),
  optionCurrentClass = require('./constants/option-current-class.src.js'),
  optionHiddenClass  = require('./constants/option-hidden-class.src.js');

module.exports = function (e) {
  var
    component,
    trigger,
    menu,
    selected,
    dropDownWillSelectEvent,
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
    currentIsHidden;

  e.stopPropagation();

  component       = this;
  trigger         = component.querySelectorAll('.drop-down__trigger')[0];
  menu            = component.querySelectorAll('.drop-down__menu')[0];
  currentIsHidden = component.querySelectorAll('.drop-down__menu-option--hidden').length;
  selected        = e.detail.select;

  dropDownWillSelectEvent = new window.CustomEvent(
    'dropDownWillSelect',
    {
      'bubbles': true,
      'detail': {
        'selected' : e.detail.select
      }
    }
  );
  component.dispatchEvent(dropDownWillSelectEvent);

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
      'bubbles': true
    }
  );

  trigger.focus();

  dropDownDidSelectEvent = new window.CustomEvent(
    'dropDownDidSelect',
    {
      'bubbles': true,
      'detail': {
        'selected' : e.detail.select
      }
    }
  );
  component.dispatchEvent(dropDownDidSelectEvent);

  component.dispatchEvent(dropDownHideEvent);
};
