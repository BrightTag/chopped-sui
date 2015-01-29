var
  menuHidden   = require('./constants/menu-hidden'),
  optionHidden = require('./constants/option-hidden');

// open/close menu and change selected option on arrows
module.exports = function (component, trigger, menu) {
  'use strict';

  function handleComponentKeyup(e) {
    var
      dropDownShowEvent,
      dropDownHideEvent,
      nextNode;

    e.stopPropagation();

    if (menuHidden.test(menu.className)) {

      // space = enter on menu item
      if (e.keyCode === 32 && e.target.tagName === 'A') {
        e.target.click();

      // down/forward arrow = open closed menu
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        dropDownShowEvent = new window.CustomEvent(
          'dropDownShow'
        );
        component.dispatchEvent(dropDownShowEvent);
      }

    } else {

      // space = enter on menu item
      if (e.keyCode === 32 && e.target.tagName === 'A') {
        e.target.click();

      // up/back arrow
      } else if (e.keyCode === 37 || e.keyCode === 38) {

        // close on trigger
        if (e.target.tagName === 'BUTTON') {
          dropDownHideEvent = new window.CustomEvent(
            'dropDownHide'
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
  }

  component.addEventListener('keyup', handleComponentKeyup, false);
};
