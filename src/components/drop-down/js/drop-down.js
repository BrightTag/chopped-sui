(function (SignalUI) {

  'use strict';

  var
    // no g flag for testing
    currentOptionHidden = /(^| )drop-down__select--hide-current( |$)/,
    menuFlushBoth       = /(^| )drop-down__menu--flush-both/,
    menuFlushLeft       = /(^| )drop-down__menu--flush-left/,
    menuFlushRight      = /(^| )drop-down__menu--flush-right/,
    menuHidden          = /(^| )drop-down__menu--hidden( |$)/,
    optionHidden        = /(^| )drop-down__menu-option--hidden( |$)/,
    triggerFixed        = /(^| )drop-down__trigger--fixed( |$)/,

    // g flag for replacing
    menuHiddenClass     = /(^| )drop-down__menu--hidden( |$)/g,
    optionHiddenClass   = /(^| )drop-down__menu-option--hidden( |$)/g,
    optionCurrentClass  = /(^| )drop-down__menu-option--current( |$)/g,
    triggerActiveClass  = /(^| )drop-down__trigger--active( |$)/g;

  // Add menu and trigger for existing select
  function buildFromSelect(component, select) {
    var
      className = select.className,

      currentIsHidden  = currentOptionHidden.test(className),

      menuData = {
        menuItems      : []
      },
      triggerData = {},
      template = '',

      menuOptions,
      menuOption,
      selectedOption,
      i,
      len,

      nodeBuilder,
      nodes;

    // hide select
    select.className += ' drop-down__select--hidden';

    // build menu data
    menuOptions = select.children;
    for (i = 0, len = menuOptions.length; i < len; i += 1) {
      menuOption = menuOptions[i];
      menuData.menuItems.push({
        text: menuOption.innerHTML,
        isCurrent: menuOption.selected,
        isHidden: menuOption.selected && currentIsHidden
      });
      if (menuOption.selected) {
        selectedOption = menuOption.innerHTML;
      }
    }

    // build trigger data
    triggerData.triggerText = selectedOption;

    // generate HTML
    template += SignalUI.templates['drop-down-sizer'](menuData);
    template += SignalUI.templates['drop-down-trigger'](triggerData);
    template += SignalUI.templates['drop-down-menu'](menuData);

    // append new HTML
    nodeBuilder = document.createElement('div');
    nodeBuilder.innerHTML = template;
    nodes = nodeBuilder.children;
    while (nodes.length) {
      component.appendChild(nodes[0]);
    }
  }

  // add trigger for existing menu
  function buildFromMenu(component, menu, trigger) {
    var
      menuData = {
        menuItems      : []
      },
      triggerData,
      template = '',

      menuOptions,
      menuOption,
      menuFlushDirection,
      i,
      len,

      nodeBuilder,
      nodes;

    // make sure menu items can't be tab-targeted
    menuOptions = menu.children;
    for (i = 0, len = menuOptions.length; i < len; i += 1) {
      menuOption = menuOptions[i].children[0];
      menuOption.tabIndex = -1;
      menuData.menuItems.push({
        text: menuOption.innerHTML
      });
    }

    menuFlushDirection =
      menuFlushLeft.test(menu.className) ? 'left' :
      menuFlushRight.test(menu.className) ? 'right' :
      menuFlushBoth.test(menu.className) ? 'both' :
      '';

    if (menuFlushDirection) {
      menuData.flush = menuFlushDirection;
    }

    // make sure the menu is hidden
    menu.className += ' drop-down__menu--hidden';

    // build a trigger if it doesn't exist
    if (!trigger) {

      window.console.log(menuFlushDirection);

      // build trigger data
      triggerData = {
        triggerText:  menu.getAttribute('drop-down-trigger-text') || 'Menu',
        fixedTrigger: true
      };

      if (menuFlushDirection) {
        triggerData.flushDirection = menuFlushDirection;
      }

      window.console.log(triggerData);

      // generate HTML
      template += SignalUI.templates['drop-down-trigger'](triggerData);
    }

    if (menuFlushBoth.test(menu.className)) {

      template += SignalUI.templates['drop-down-sizer'](menuData);

    }

    if (template) {

      // append new HTML
      nodeBuilder = document.createElement('div');
      nodeBuilder.innerHTML = template;
      nodes = nodeBuilder.children;
      while (nodes.length) {
        component.insertBefore(nodes[0], menu);
      }

    }
  }

  // add HTML for existing markup
  function buildDropDown(component) {
    var
      // potentially existing elements
      select = component.querySelectorAll('.drop-down__select')[0],
      trigger = component.querySelectorAll('.drop-down__trigger')[0],
      menu = component.querySelectorAll('.drop-down__menu')[0];

    if (select) {
      buildFromSelect(component, select);
    } else if (menu) {
      buildFromMenu(component, menu, trigger);
    }

    return true;
  }

  // toggle menu visibility on trigger click
  function enhanceTriggerClick(component, trigger, menu) {
    function handleTriggerClick(e) {
      var
        dropDownShowEvent,
        dropDownHideEvent;

      e.stopPropagation();
      e.preventDefault();

      if (menuHidden.test(menu.className)) {
        dropDownShowEvent = new window.CustomEvent(
          'dropDownShow'
        );
        component.dispatchEvent(dropDownShowEvent);
      } else {
        dropDownHideEvent = new window.CustomEvent(
          'dropDownHide'
        );
        component.dispatchEvent(dropDownHideEvent);
      }

      return false;
    }

    trigger.addEventListener('click', handleTriggerClick, false);
  }

  // open/close menu and change selected option on arrows
  function enhanceComponentKeyup(component, trigger, menu) {
    function handleMenuKeyup(e) {
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

    component.addEventListener('keyup', handleMenuKeyup, false);
  }

  // select current option when clicked
  function enhanceMenuClick(component, menu) {
    function handleMenuClick(e) {
      var dropDownSelectEvent;

      e.stopPropagation();

      // send select event but allow click for navigation
      if (e.target.tagName === 'A') {
        dropDownSelectEvent = new window.CustomEvent(
          'dropDownSelect',
          {
            'detail': {
              'select': e.target
            }
          }
        );
        component.dispatchEvent(dropDownSelectEvent);
      }
    }

    menu.addEventListener('click', handleMenuClick, false);
  }

  function listenForShow(component, trigger, menu, hideOnOtherDropDownShow) {
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

      menuClassName = menu.className;
      triggerClassName = trigger.className;

      menuClassName = menuClassName.replace(menuHiddenClass, ' ');
      triggerClassName = triggerClassName.replace(triggerActiveClass, ' ') +
        ' drop-down__trigger--active';

      menu.className = menuClassName;
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
  }

  function listenForHide(component, trigger, menu, hideOnOtherDropDownShow) {
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

      menuClassName = menu.className;
      triggerClassName = trigger.className;

      menuClassName = menuClassName.replace(menuHiddenClass, ' ');
      menuClassName += ' drop-down__menu--hidden';
      triggerClassName = triggerClassName.replace(triggerActiveClass, ' ');

      menu.className = menuClassName;
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
  }

  function listenForSelect(component, trigger, menu) {
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
          menuOption = menuOptions[i];
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
          selectedIndex = -1;
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
            'selected': e.detail.select
          }
        }
      );
      component.dispatchEvent(dropDownDidSelectEvent);

      component.dispatchEvent(dropDownHideEvent);
    }

    component.addEventListener('dropDownSelect', handleDropDownSelect, false);
  }

  function enhanceDropDown(component) {
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

    listenForShow(component, trigger, menu, hideOnOtherDropDownShow);
    listenForHide(component, trigger, menu, hideOnOtherDropDownShow);
    listenForSelect(component, trigger, menu);

    return true;
  }

  SignalUI.registerComponent({

    componentType: 'dropDown',

    componentClass: 'drop-down',

    build: buildDropDown,

    enhance: enhanceDropDown

  });

}(window.SignalUI));
