this.SignalUI=this.SignalUI||{},this.SignalUI.templates=this.SignalUI.templates||{},this.SignalUI.templates["drop-down-menu"]=SignalUI.Handlebars.template({1:function(){return" drop-down__menu--flush-right"},3:function(){return" drop-down__menu--flush-left"},5:function(n,l,e,t){var i,s,a,r="function",u=l.helperMissing,o=l.blockHelperMissing,h=this.escapeExpression,p='		<li class="drop-down__menu-option';return s=null!=(s=l.isCurrent||(null!=n?n.isCurrent:n))?s:u,a={name:"isCurrent",hash:{},fn:this.program(6,t),inverse:this.noop,data:t},i=typeof s===r?s.call(n,a):s,l.isCurrent||(i=o.call(n,i,a)),null!=i&&(p+=i),p+'"><a tabindex="-1" href="javascript:;" class="drop-down__menu-option-trigger">'+h((s=null!=(s=l.text||(null!=n?n.text:n))?s:u,typeof s===r?s.call(n,{name:"text",hash:{},data:t}):s))+"</a></li>\n"},6:function(n,l,e,t){var i,s,a,r="function",u=l.helperMissing,o=l.blockHelperMissing,h=" drop-down__menu-option--current";return s=null!=(s=l.isHidden||(null!=n?n.isHidden:n))?s:u,a={name:"isHidden",hash:{},fn:this.program(7,t),inverse:this.noop,data:t},i=typeof s===r?s.call(n,a):s,l.isHidden||(i=o.call(n,i,a)),null!=i&&(h+=i),h},7:function(){return" drop-down__menu-option--hidden"},compiler:[6,">= 2.0.0-beta.1"],main:function(n,l,e,t){var i,s,a,r="function",u=l.helperMissing,o=l.blockHelperMissing,h='<ul class="drop-down__menu drop-down__menu--hidden';return s=null!=(s=l.flushRight||(null!=n?n.flushRight:n))?s:u,a={name:"flushRight",hash:{},fn:this.program(1,t),inverse:this.noop,data:t},i=typeof s===r?s.call(n,a):s,l.flushRight||(i=o.call(n,i,a)),null!=i&&(h+=i),s=null!=(s=l.flushLeft||(null!=n?n.flushLeft:n))?s:u,a={name:"flushLeft",hash:{},fn:this.program(3,t),inverse:this.noop,data:t},i=typeof s===r?s.call(n,a):s,l.flushLeft||(i=o.call(n,i,a)),null!=i&&(h+=i),h+='">\n',s=null!=(s=l.menuItems||(null!=n?n.menuItems:n))?s:u,a={name:"menuItems",hash:{},fn:this.program(5,t),inverse:this.noop,data:t},i=typeof s===r?s.call(n,a):s,l.menuItems||(i=o.call(n,i,a)),null!=i&&(h+=i),h+"</ul>\n"},useData:!0});
this.SignalUI.templates["drop-down-trigger"]=SignalUI.Handlebars.template({1:function(){return" drop-down__trigger--fixed"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,r,i,n){var t,l,a,g="function",o=r.helperMissing,s=r.blockHelperMissing,d=this.escapeExpression,p='<button class="drop-down__trigger';return l=null!=(l=r.fixedTrigger||(null!=e?e.fixedTrigger:e))?l:o,a={name:"fixedTrigger",hash:{},fn:this.program(1,n),inverse:this.noop,data:n},t=typeof l===g?l.call(e,a):l,r.fixedTrigger||(t=s.call(e,t,a)),null!=t&&(p+=t),p+'">\n	'+d((l=null!=(l=r.triggerText||(null!=e?e.triggerText:e))?l:o,typeof l===g?l.call(e,{name:"triggerText",hash:{},data:n}):l))+"\n</button>"},useData:!0});
(function (SignalUI) {

  'use strict';

  var
    // no g flag for testing
    currentOptionHidden = /(^| )drop-down__select--hide-current( |$)/,
    menuFlush           = /(^| )drop-down__menu--flush-/,
    menuFlushRight      = /(^| )drop-down__menu--flush-right( |$)/,
    menuFlushLeft       = /(^| )drop-down__menu--flush-left( |$)/,
    menuHidden          = /(^| )drop-down__menu--hidden( |$)/,
    optionHidden        = /(^| )drop-down__menu-option--hidden( |$)/,
    triggerFixed        = /(^| )drop-down__trigger--fixed( |$)/,

    // g flag for replacing
    menuHiddenClass     = /(^| )drop-down__menu--hidden( |$)/g,
    optionHiddenClass   = /(^| )drop-down__menu-option--hidden( |$)/g,
    optionCurrentClass  = /(^| )drop-down__menu-option--current( |$)/g,
    triggerActiveClass  = /(^| )drop-down__trigger--active( |$)/g;

  // Add menu and trigger for existing select
  function buildFromSelect(widget, select) {
    var
      className = select.className,

      currentIsHidden  = currentOptionHidden.test(className),
      menuIsFlushRight = menuFlushRight.test(className),
      menuIsFlushLeft  = menuFlushLeft.test(className),

      menuData = {
        menuItems      : [],
        flushRight     : menuIsFlushRight,
        flushLeft      : menuIsFlushLeft
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

    window.console.log(menuData);

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
    template += SignalUI.templates['drop-down-trigger'](triggerData);
    template += SignalUI.templates['drop-down-menu'](menuData);

    // append new HTML
    nodeBuilder = document.createElement('div');
    nodeBuilder.innerHTML = template;
    nodes = nodeBuilder.children;
    while (nodes.length) {
      widget.appendChild(nodes[0]);
    }
  }

  // add trigger for existing menu
  function buildFromMenu(widget, menu, trigger) {
    var
      triggerData,
      template,

      menuOptions,
      i,
      len,

      nodeBuilder,
      nodes;

    // make sure menu items can't be tab-targeted
    menuOptions = menu.children;
    for (i = 0, len = menuOptions.length; i < len; i += 1) {
      menuOptions[i].children[0].tabIndex = -1;
    }

    // make sure the menu is hidden
    menu.className += ' drop-down__menu--hidden';

    // build a trigger if it doesn't exist
    if (!trigger) {

      // build trigger data
      triggerData = {
        triggerText:  menu.getAttribute('drop-down-trigger-text') || 'Menu',
        fixedTrigger: true
      };

      // generate HTML
      template = SignalUI.templates['drop-down-trigger'](triggerData);

      // append new HTML
      nodeBuilder = document.createElement('div');
      nodeBuilder.innerHTML = template;
      nodes = nodeBuilder.children;
      while (nodes.length) {
        widget.insertBefore(nodes[0], menu);
      }
    }
  }

  // add HTML for existing markup
  function buildDropDown(widget) {
    var
      // potentially existing elements
      select = widget.querySelectorAll('.drop-down__select')[0],
      trigger = widget.querySelectorAll('.drop-down__trigger')[0],
      menu = widget.querySelectorAll('.drop-down__menu')[0];

    if (select) {
      buildFromSelect(widget, select);
    } else if (menu) {
      buildFromMenu(widget, menu, trigger);
    }

    return true;
  }

  // resize trigger based on menu size
  function adjustTriggerWidth(widget, menu) {
    var
      menuWidth   = menu.clientWidth,
      widgetWidth = widget.clientWidth;

    if ((menuWidth > widgetWidth) && !menuFlush.test(menu.className)) {
      widget.style.width = menuWidth + 'px';
    }
  }

  // toggle menu visibility on trigger click
  function enhanceTriggerClick(widget, trigger, menu) {
    trigger.addEventListener('click', function (e) {
      var
        dropDownShowEvent,
        dropDownHideEvent;

      e.preventDefault();

      if (menuHidden.test(menu.className)) {
        dropDownShowEvent = new window.CustomEvent(
          'dropDownShow'
        );
        widget.dispatchEvent(dropDownShowEvent);
      } else {
        dropDownHideEvent = new window.CustomEvent(
          'dropDownHide'
        );
        widget.dispatchEvent(dropDownHideEvent);
      }

      return false;
    }, true);
  }

  // open/close menu and change selected option on arrows
  function enhanceWidgetKeyup(widget, trigger, menu) {
    widget.addEventListener('keyup', function (e) {
      var
        dropDownShowEvent,
        dropDownHideEvent,
        nextNode;

      if (menuHidden.test(menu.className)) {

        // space = enter on menu item
        if (e.keyCode === 32 && e.target.tagName === 'A') {
          e.target.click();

        // down/forward arrow = open closed menu
        } else if (e.keyCode === 39 || e.keyCode === 40) {
          dropDownShowEvent = new window.CustomEvent(
            'dropDownShow'
          );
          widget.dispatchEvent(dropDownShowEvent);
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
            widget.dispatchEvent(dropDownHideEvent);

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
    }, true);
  }

  // select current option when clicked
  function enhanceMenuClick(widget, menu) {
    menu.addEventListener('click', function (e) {
      var dropDownSelectEvent;

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
        widget.dispatchEvent(dropDownSelectEvent);
      }
    }, true);
  }

  function listenForShow(widget, trigger, menu, hideOnOtherDropDownShow) {
    widget.addEventListener('dropDownShow', function () {
      var
        dropDownWillShowEvent,
        dropDownDidShowEvent,
        menuClassName,
        triggerClassName;

      dropDownWillShowEvent = new window.CustomEvent(
        'dropDownWillShow',
        {
          'detail': {
            'widget': widget
          }
        }
      );
      widget.dispatchEvent(dropDownWillShowEvent);
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
            'widget': widget
          }
        }
      );

      document.body.addEventListener(
        'dropDownWillShow',
        hideOnOtherDropDownShow,
        true
      );

      menu.scrollTop = 1;
      menu.scrollTop = 0;

      trigger.focus();

      widget.dispatchEvent(dropDownDidShowEvent);
    }, true);
  }

  function listenForHide(widget, trigger, menu, hideOnOtherDropDownShow) {
    widget.addEventListener('dropDownHide', function () {
      var
        dropDownWillHideEvent,
        dropDownDidHideEvent,
        menuClassName,
        triggerClassName;

      dropDownWillHideEvent = new window.CustomEvent(
        'dropDownWillHide',
        {
          'detail': {
            'widget': widget
          }
        }
      );
      widget.dispatchEvent(dropDownWillHideEvent);

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
            'widget': widget
          }
        }
      );

      document.body.removeEventListener(
        'dropDownWillShow',
        hideOnOtherDropDownShow,
        true
      );

      widget.dispatchEvent(dropDownDidHideEvent);
    }, true);
  }

  function listenForSelect(widget, trigger, menu) {
    widget.addEventListener('dropDownSelect', function (e) {
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
        currentIsHidden = widget.querySelectorAll('.drop-down__menu-option--hidden').length;

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

        select = widget.querySelectorAll('.drop-down__select')[0];
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
            'widget': widget
          }
        }
      );

      trigger.focus();

      dropDownDidSelectEvent = new window.CustomEvent(
        'dropDownDidSelect',
        {
          'detail': {
            'widget': e.detail.widget,
            'selected': e.detail.select
          }
        }
      );
      widget.dispatchEvent(dropDownDidSelectEvent);

      widget.dispatchEvent(dropDownHideEvent);
    }, true);
  }

  function enhanceDropDown(widget) {
    var
      trigger = widget.querySelectorAll('.drop-down__trigger')[0],
      menu    = widget.querySelectorAll('.drop-down__menu')[0],

      hideOnOtherDropDownShow = function(e) {
        var dropDownHideEvent;

        if (e.detail.widget !== widget) {
          dropDownHideEvent = new window.CustomEvent(
            'dropDownHide'
          );
          widget.dispatchEvent(dropDownHideEvent);
        }
      };

    adjustTriggerWidth(widget, menu);

    enhanceTriggerClick(widget, trigger, menu);
    enhanceWidgetKeyup(widget, trigger, menu);
    enhanceMenuClick(widget, menu);

    listenForShow(widget, trigger, menu, hideOnOtherDropDownShow);
    listenForHide(widget, trigger, menu, hideOnOtherDropDownShow);
    listenForSelect(widget, trigger, menu);

    return true;
  }

  SignalUI.registerWidget({

    widgetType: 'dropDown',

    widgetClass: 'drop-down',

    build: buildDropDown,

    enhance: enhanceDropDown

  });

}(window.SignalUI));
