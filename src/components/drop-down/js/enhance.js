var
  enhanceTriggerClick     = require('./enhance/enhance-trigger-click'),
  enhanceComponentKeyup   = require('./enhance/enhance-component-keyup'),
  enhanceMenuClick        = require('./enhance/enhance-menu-click'),
  listenForDropDownShow   = require('./enhance/listen-for-drop-down-show'),
  listenForDropDownHide   = require('./enhance/listen-for-drop-down-hide'),
  listenForDropDownSelect = require('./enhance/listen-for-drop-down-select');

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
          'dropDownHide'
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
