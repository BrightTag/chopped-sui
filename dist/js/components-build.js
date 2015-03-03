(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO: use vars to require stuff in /enhance

// TODO: behaviors that are enhanced
module.exports = function enhanceDropDown(component) {
  'use strict';

  // enhance some stuff
  component;

  return true;
};

},{}],2:[function(require,module,exports){
(function (ChopSuey) {
  'use strict';

  var
    enhance = require('./enhance.src.js');

  ChopSuey.registerComponent({
    componentType : 'accordion',
    componentClass: 'accordion',
    enhance       : enhance
  });

}(window.ChopSuey));

},{"./enhance.src.js":1}],3:[function(require,module,exports){
var
  buildFromMenu   = require('./build/build-from-menu.src.js'),
  buildFromSelect = require('./build/build-from-select.src.js');

// add HTML for existing markup
module.exports = function (component) {
  'use strict';

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
};

},{"./build/build-from-menu.src.js":4,"./build/build-from-select.src.js":5}],4:[function(require,module,exports){
var
  menuFlush     = require('./constants/menu-flush.src.js'),
  menuFlushBoth = require('./constants/menu-flush-both.src.js');

// add trigger for existing menu
module.exports = function (component, menu, trigger) {
  'use strict';

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
    template += window.ChopSuey.templates['drop-down-trigger'].render(triggerData);
  }

  if (menuFlushBoth.test(menu.className)) {

    template += window.ChopSuey.templates['drop-down-sizer'].render(menuData);

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
};

},{"./constants/menu-flush-both.src.js":7,"./constants/menu-flush.src.js":8}],5:[function(require,module,exports){
var currentOptionHidden = require('./constants/current-option-hidden.src.js');

// Add menu and trigger for existing select
module.exports = function (component, select) {
  'use strict';

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
  template += window.ChopSuey.templates['drop-down-sizer'].render(menuData);
  template += window.ChopSuey.templates['drop-down-trigger'].render(triggerData);
  template += window.ChopSuey.templates['drop-down-menu'].render(menuData);

  // append new HTML
  nodeBuilder = document.createElement('div');
  nodeBuilder.innerHTML = template;
  nodes = nodeBuilder.children;
  while (nodes.length) {
    component.appendChild(nodes[0]);
  }
};

},{"./constants/current-option-hidden.src.js":6}],6:[function(require,module,exports){
var currentOptionHidden = /(^| )drop-down__select--hide-current( |$)/;

module.exports = currentOptionHidden;

},{}],7:[function(require,module,exports){
var menuFlushBoth = /(^| )drop-down__menu--flush-both( |$)/;

module.exports = menuFlushBoth;

},{}],8:[function(require,module,exports){
var menuFlush = /(^| )drop-down__menu--flush-(\S+)( |$)/;

module.exports = menuFlush;

},{}],9:[function(require,module,exports){
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

},{"./enhance/enhance-component-keyup.src.js":17,"./enhance/enhance-menu-click.src.js":18,"./enhance/enhance-trigger-click.src.js":19,"./enhance/listen-for-drop-down-hide.src.js":20,"./enhance/listen-for-drop-down-select.src.js":21,"./enhance/listen-for-drop-down-show.src.js":22}],10:[function(require,module,exports){
var menuHiddenClass = /(^| )drop-down__menu--hidden( |$)/g;

module.exports = menuHiddenClass;

},{}],11:[function(require,module,exports){
var menuHidden = /(^| )drop-down__menu--hidden( |$)/;

module.exports = menuHidden;

},{}],12:[function(require,module,exports){
var optionCurrentClass = /(^| )drop-down__menu-option--current( |$)/g;

module.exports = optionCurrentClass;

},{}],13:[function(require,module,exports){
var optionHiddenClass = /(^| )drop-down__menu-option--hidden( |$)/g;

module.exports = optionHiddenClass;

},{}],14:[function(require,module,exports){
var optionHidden = /(^| )drop-down__menu-option--hidden( |$)/;

module.exports = optionHidden;

},{}],15:[function(require,module,exports){
var triggerActiveClass = /(^| )drop-down__trigger--active( |$)/g;

module.exports = triggerActiveClass;

},{}],16:[function(require,module,exports){
var triggerFixed = /(^| )drop-down__trigger--fixed( |$)/;

module.exports = triggerFixed;

},{}],17:[function(require,module,exports){
var
  menuHidden   = require('./constants/menu-hidden.src.js'),
  optionHidden = require('./constants/option-hidden.src.js');

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
          'dropDownShow',
          {
            'bubbles': true
          }
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
  }

  component.addEventListener('keyup', handleComponentKeyup, false);
};

},{"./constants/menu-hidden.src.js":11,"./constants/option-hidden.src.js":14}],18:[function(require,module,exports){
// select current option when clicked
module.exports = function (component, menu) {
  'use strict';

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
          },
          'bubbles': true
        }
      );
      component.dispatchEvent(dropDownSelectEvent);
    }
  }

  menu.addEventListener('click', handleMenuClick, false);
};

},{}],19:[function(require,module,exports){
var menuHidden = require('./constants/menu-hidden.src.js');

// toggle menu visibility on trigger click
module.exports = function (component, trigger, menu) {
  'use strict';

  function handleTriggerClick(e) {
    var
      dropDownShowEvent,
      dropDownHideEvent;

    e.stopPropagation();
    e.preventDefault();

    if (menuHidden.test(menu.className)) {
      dropDownShowEvent = new window.CustomEvent(
        'dropDownShow',
        {
          'bubbles': true
        }
      );
      component.dispatchEvent(dropDownShowEvent);
    } else {
      dropDownHideEvent = new window.CustomEvent(
        'dropDownHide',
        {
          'bubbles': true
        }
      );
      component.dispatchEvent(dropDownHideEvent);
    }

    return false;
  }

  trigger.addEventListener('click', handleTriggerClick, false);
};

},{"./constants/menu-hidden.src.js":11}],20:[function(require,module,exports){
var
  menuHiddenClass    = require('./constants/menu-hidden-class.src.js'),
  triggerActiveClass = require('./constants/trigger-active-class.src.js');

module.exports = function (component, trigger, menu, hideOnOtherDropDownShow) {
  'use strict';

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
        },
        'bubbles': true
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
        },
        'bubbles': true
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
};

},{"./constants/menu-hidden-class.src.js":10,"./constants/trigger-active-class.src.js":15}],21:[function(require,module,exports){
var
  triggerFixed       = require('./constants/trigger-fixed.src.js'),
  optionCurrentClass = require('./constants/option-current-class.src.js'),
  optionHiddenClass  = require('./constants/option-hidden-class.src.js');

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
        },
        'bubbles': true
      }
    );

    trigger.focus();

    dropDownDidSelectEvent = new window.CustomEvent(
      'dropDownDidSelect',
      {
        'detail': {
          'component': e.detail.component,
          'selected' : e.detail.select
        },
        'bubbles': true
      }
    );
    component.dispatchEvent(dropDownDidSelectEvent);

    component.dispatchEvent(dropDownHideEvent);
  }

  component.addEventListener('dropDownSelect', handleDropDownSelect, false);
};

},{"./constants/option-current-class.src.js":12,"./constants/option-hidden-class.src.js":13,"./constants/trigger-fixed.src.js":16}],22:[function(require,module,exports){
var
  menuHiddenClass    = require('./constants/menu-hidden-class.src.js'),
  triggerActiveClass = require('./constants/trigger-active-class.src.js');

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
        },
        'bubbles': true
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
        },
        'bubbles': true
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

},{"./constants/menu-hidden-class.src.js":10,"./constants/trigger-active-class.src.js":15}],23:[function(require,module,exports){
(function (ChopSuey) {
  'use strict';

  var
    build   = require('./build.src.js'),
    enhance = require('./enhance.src.js');

  ChopSuey.registerComponent({
    componentType : 'dropDown',
    componentClass: 'drop-down',
    build         : build,
    enhance       : enhance
  });

}(window.ChopSuey));

},{"./build.src.js":3,"./enhance.src.js":9}],24:[function(require,module,exports){
(function (ChopSuey) {
  'use strict';

  require('./drop-down/js/main.src.js');
  require('./accordion/js/main.src.js');

}(window.ChopSuey));

},{"./accordion/js/main.src.js":2,"./drop-down/js/main.src.js":23}]},{},[24])