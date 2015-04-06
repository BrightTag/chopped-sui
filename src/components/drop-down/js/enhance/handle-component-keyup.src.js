var
  menuHidden         = require('./constants/menu-hidden.src.js'),
  optionHidden       = require('./constants/option-hidden.src.js'),
  optionTriggerClass = require('./constants/option-trigger-class.src.js');

// open/close menu and change selected option on arrows
module.exports = function (e) {
  'use strict';

  var
    component,
    trigger,
    menu,
    dropDownShowEvent,
    dropDownHideEvent,
    dropDownSelectEvent,
    nextNode;

  e.stopPropagation();

  component = this;
  trigger   = component.querySelectorAll('.drop-down__trigger')[0];
  menu      = component.querySelectorAll('.drop-down__menu')[0];

  if (menuHidden.test(menu.className)) {

    if (e.keyCode === 39 || e.keyCode === 40) {
      dropDownShowEvent = new window.CustomEvent(
        'dropDownShow',
        {
          'bubbles': true
        }
      );
      component.dispatchEvent(dropDownShowEvent);
    }

  } else {

    // space on menu item
    if (e.keyCode === 32 && e.target.tagName === 'A'
      && optionTriggerClass.test(e.target.className)) {
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

    // up/back arrow
    } else if (e.keyCode === 37 || e.keyCode === 38) {

      // close on trigger
      if (e.target.tagName === 'BUTTON') {
        dropDownHideEvent = new window.CustomEvent(
          'dropDownHide',
          {
            'bubbles': true
          }
        );
        component.dispatchEvent(dropDownHideEvent);

      // focus on previous menu item or trigger if at top
      } else {
        nextNode = e.target.parentElement.previousSibling;
        if (nextNode && optionHidden.test(nextNode.className)) {
          nextNode = nextNode.previousSibling;
        }
        while (nextNode && nextNode.nodeType !== 1) {
          nextNode = nextNode.previousSibling;
          if (nextNode && optionHidden.test(nextNode.className)) {
            nextNode = nextNode.previousSibling;
          }
        }
        if (nextNode) {
          nextNode.children[0].focus();
        } else {
          trigger.focus();
        }
      }

    // down/forward arrow = next menu option
    } else if (e.keyCode === 39 || e.keyCode === 40) {
      if (e.target.tagName === 'BUTTON') {
        nextNode = menu.children[0];
      } else {
        nextNode = e.target.parentElement.nextSibling;
      }
      if (nextNode && optionHidden.test(nextNode.className)) {
        nextNode = nextNode.nextSibling;
      }
      while (nextNode && nextNode.nodeType !== 1) {
        nextNode = nextNode.nextSibling;
        if (nextNode && optionHidden.test(nextNode.className)) {
          nextNode = nextNode.nextSibling;
        }
      }
      if (nextNode) {
        nextNode.children[0].focus();
      }
    }
  }
};
