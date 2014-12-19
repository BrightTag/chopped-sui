    SignalUI.templates = {};
    SignalUI.templates['drop-down-menu'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<ul class=\"drop-down__menu drop-down__menu--hidden");if(t.s(t.f("flushDirection",c,p,1),c,p,0,69,111,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu--flush-");t.b(t.v(t.f("flushDirection",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);if(t.s(t.f("menuItems",c,p,1),c,p,0,148,480,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		<li class=\"drop-down__menu-option");if(t.s(t.f("isCurrent",c,p,1),c,p,0,198,293,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu-option--current");if(t.s(t.f("hideCurrent",c,p,1),c,p,0,246,277,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu-option--hidden");});c.pop();}});c.pop();}t.b("\"><a ");if(t.s(t.f("menuItemId",c,p,1),c,p,0,327,347,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("id=\"");t.b(t.v(t.f("menuItemId",c,p,0)));t.b("\" ");});c.pop();}t.b("tabindex=\"-1\" href=\"");t.b(t.v(t.f("link",c,p,0)));if(!t.s(t.f("link",c,p,1),c,p,1,0,0,"")){t.b("javascript:;");};t.b("\" class=\"drop-down__menu-option-trigger\">");t.b(t.v(t.f("text",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}t.b("</ul>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    SignalUI.templates['drop-down-sizer'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<ul class=\"drop-down__sizer");if(t.s(t.f("flushDirection",c,p,1),c,p,0,46,88,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu--flush-");t.b(t.v(t.f("flushDirection",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);if(t.s(t.f("menuItems",c,p,1),c,p,0,126,357,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"drop-down__menu-option");if(t.s(t.f("isCurrent",c,p,1),c,p,0,178,273,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu-option--current");if(t.s(t.f("hideCurrent",c,p,1),c,p,0,226,257,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu-option--hidden");});c.pop();}});c.pop();}t.b("\"><span class=\"drop-down__menu-option-trigger\">");t.b(t.v(t.f("text",c,p,0)));t.b("</span></li>");t.b("\n" + i);});c.pop();}t.b("</ul>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    SignalUI.templates['drop-down-trigger'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<button ");if(t.s(t.f("triggerId",c,p,1),c,p,0,22,41,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("id=\"");t.b(t.v(t.f("triggerId",c,p,0)));t.b("\" ");});c.pop();}t.b("class=\"drop-down__trigger");if(t.s(t.f("fixedTrigger",c,p,1),c,p,0,97,123,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__trigger--fixed");});c.pop();}if(t.s(t.f("flushDirection",c,p,1),c,p,0,159,198,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__trigger--");t.b(t.v(t.f("flushDirection",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);t.b("	");t.b(t.v(t.f("text",c,p,0)));t.b("\n" + i);t.b("</button>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    SignalUI.templates['drop-down'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<");if(t.s(t.f("select",c,p,1),c,p,0,12,15,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("div");});c.pop();}if(!t.s(t.f("select",c,p,1),c,p,1,0,0,"")){t.b("nav");};if(t.s(t.f("id",c,p,1),c,p,0,58,70,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");});c.pop();}t.b(" class=\"drop-down drop-down--unenhanced");if(t.s(t.f("build",c,p,1),c,p,0,126,143,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down--built");});c.pop();}if(t.s(t.f("class",c,p,1),c,p,0,163,173,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.f("class",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);if(t.s(t.f("select",c,p,1),c,p,0,199,705,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <select class=\"drop-down__select");if(t.s(t.f("hideCurrent",c,p,1),c,p,0,252,284,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__select--hide-current");});c.pop();}if(t.s(t.f("build",c,p,1),c,p,0,310,336,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__select--hidden");});c.pop();}t.b("\" id=\"");t.b(t.v(t.f("selectId",c,p,0)));t.b("\" name=\"");t.b(t.v(t.f("selectName",c,p,0)));t.b("\">");t.b("\n" + i);if(t.s(t.f("menuItems",c,p,1),c,p,0,409,503,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <option value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\"");if(t.s(t.f("isCurrent",c,p,1),c,p,0,455,464,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" selected");});c.pop();}t.b(">");t.b(t.v(t.f("text",c,p,0)));t.b("</option>");t.b("\n" + i);});c.pop();}t.b("    </select>");t.b("\n" + i);if(t.s(t.f("build",c,p,1),c,p,0,546,692,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<drop-down-sizer0",c,p,"      "));if(t.s(t.f("menuItems",c,p,1),c,p,0,595,646,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("isCurrent",c,p,1),c,p,0,609,632,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<drop-down-trigger1",c,p,""));});c.pop();}});c.pop();}t.b(t.rp("<drop-down-menu2",c,p,"      "));});c.pop();}});c.pop();}if(t.s(t.f("menu",c,p,1),c,p,0,728,898,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("build",c,p,1),c,p,0,743,860,"{{ }}")){t.rs(c,p,function(c,p,t){if(!t.s(t.f("flushDirection",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<drop-down-sizer3",c,p,"        "));};t.b(t.rp("<drop-down-trigger4",c,p,"      "));});c.pop();}t.b(t.rp("<drop-down-menu5",c,p,"    "));});c.pop();}t.b("</");if(t.s(t.f("select",c,p,1),c,p,0,921,924,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("div");});c.pop();}if(!t.s(t.f("select",c,p,1),c,p,1,0,0,"")){t.b("nav");};t.b(">");t.b("\n" + i);t.b("<script id=\"drop-down-");t.b(t.v(t.f("uniqueIdentifier",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  SignalUI.initializeComponent({ scriptId: '");t.b(t.v(t.f("uniqueIdentifier",c,p,0)));t.b("', componentType: 'drop-down' });");t.b("\n" + i);t.b("</script>");t.b("\n");return t.fl(); },partials: {"<drop-down-sizer0":{name:"drop-down-sizer", partials: {}, subs: {  }},"<drop-down-trigger1":{name:"drop-down-trigger", partials: {}, subs: {  }},"<drop-down-menu2":{name:"drop-down-menu", partials: {}, subs: {  }},"<drop-down-sizer3":{name:"drop-down-sizer", partials: {}, subs: {  }},"<drop-down-trigger4":{name:"drop-down-trigger", partials: {}, subs: {  }},"<drop-down-menu5":{name:"drop-down-menu", partials: {}, subs: {  }}}, subs: {  }});
(function (SignalUI) {

  'use strict';

  var
    // no g flag for testing
    currentOptionHidden = /(^| )drop-down__select--hide-current( |$)/,
    menuFlushBoth       = /(^| )drop-down__menu--flush-both( |$)/,
    menuFlush           = /(^| )drop-down__menu--flush-(\S+)( |$)/,
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

      currentIsHidden = currentOptionHidden.test(className),

      menuData = {
        hideCurrent: currentIsHidden,
        menuItems: []
      },
      triggerData = {},
      template    = '',

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
        text     : menuOption.innerHTML,
        isCurrent: menuOption.selected
      });
      if (menuOption.selected) {
        selectedOption = menuOption.innerHTML;
      }
    }

    // build trigger data
    triggerData.text = selectedOption;

    // generate HTML
    template += SignalUI.templates['drop-down-sizer'].render(menuData);
    template += SignalUI.templates['drop-down-trigger'].render(triggerData);
    template += SignalUI.templates['drop-down-menu'].render(menuData);

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
        menuItems: []
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

    menuFlushDirection = menu.className.match(menuFlush).length ?
        menu.className.match(menuFlush)[2] : '';

    if (menuFlushDirection) {
      menuData.flushDirection = menuFlushDirection;
    }

    // make sure the menu is hidden
    menu.className += ' drop-down__menu--hidden';

    // build a trigger if it doesn't exist
    if (!trigger) {

      // build trigger data
      triggerData = {
        text        :  menu.getAttribute('drop-down-trigger-text') || 'Menu',
        fixedTrigger: true
      };

      if (menuFlushDirection) {
        triggerData.flushDirection = menuFlushDirection;
      }

      // generate HTML
      template += SignalUI.templates['drop-down-trigger'].render(triggerData);
    }

    if (menuFlushBoth.test(menu.className)) {

      template += SignalUI.templates['drop-down-sizer'].render(menuData);

    }

    if (template) {

      // append new HTML
      nodeBuilder           = document.createElement('div');
      nodeBuilder.innerHTML = template;
      nodes                 = nodeBuilder.children;
      while (nodes.length) {
        component.insertBefore(nodes[0], menu);
      }

    }
  }

  // add HTML for existing markup
  function buildDropDown(component) {
    var
      // potentially existing elements
      select  = component.querySelectorAll('.drop-down__select')[0],
      trigger = component.querySelectorAll('.drop-down__trigger')[0],
      menu    = component.querySelectorAll('.drop-down__menu')[0];

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
    componentType : 'dropDown',
    componentClass: 'drop-down',
    build         : buildDropDown,
    enhance       : enhanceDropDown
  });

}(window.SignalUI));

(function (SignalUI) {

  'use strict';

  function hasClass(e,cls) {
    return e.className.match(('(\\s^|)'+cls+'(\\s|)'));
  }

  function addClass(e,cls) {
    if(!hasClass(e,cls)) {
      e.className += ' ' + cls;
    }
  }

  function removeAllSiblingActiveClasses(e,cls) {
    var children = e.children;
    for (var i = 0; i < children.length; i +=1) {

      var child = children[i];
      if (hasClass(child, cls)) {
        var reg = new RegExp('(\\s^|\\s)'+cls+'(\\s|)', 'g');
        child.className=child.className.replace(reg,'');
      }
    }
  }

  function toggleActiveClass (component) {
  	var activeClassName = 'active';

    component.addEventListener('click', function(e) {
      // e = e || window.event;
      var 
        tab = e.target.parentElement,
        parentNode = tab.parentElement;

      if(hasClass(tab, 'nav-tab') && !hasClass(tab, 'nav-tab '+activeClassName)){
        removeAllSiblingActiveClasses(parentNode, activeClassName);
        addClass(tab, activeClassName);
      }
    });
  }

  SignalUI.registerComponent({

    componentType: 'tabs',

    componentClass: 'tabs',

    build: function () {},

    enhance: toggleActiveClass

  });

}(window.SignalUI));
