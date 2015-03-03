var
  enhanceTriggerClick     = require('./enhance/enhance-trigger-click.src.js'),
  enhanceComponentKeyup   = require('./enhance/enhance-component-keyup.src.js'),
  enhanceMenuClick        = require('./enhance/enhance-menu-click.src.js'),
  listenForDropDownShow   = require('./enhance/listen-for-drop-down-show.src.js'),
  listenForDropDownHide   = require('./enhance/listen-for-drop-down-hide.src.js'),
  listenForDropDownSelect = require('./enhance/listen-for-drop-down-select.src.js');

// open/close menu and change selected option on arrows
module.exports = function enhanceDropDown(component) {
  'use strict';

  var
    trigger = component.querySelectorAll('.drop-down__trigger')[0],
    menu    = component.querySelectorAll('.drop-down__menu')[0],

    hideOnOtherDropDownShow = function(e) {
      var dropDownHideEvent;

      e.stopPropagation();

      if (e.detail.component !== component) {
        dropDownHideEvent = new window.CustomEvent(
          'dropDownHide',
          {
            'bubbles': true
          }
        );
        component.dispatchEvent(dropDownHideEvent);
      }
    };

  enhanceTriggerClick(component, trigger, menu);
  enhanceComponentKeyup(component, trigger, menu);
  enhanceMenuClick(component, menu);

  listenForDropDownShow(component, trigger, menu, hideOnOtherDropDownShow);
  listenForDropDownHide(component, trigger, menu, hideOnOtherDropDownShow);
  listenForDropDownSelect(component, trigger, menu);

  return true;
};
