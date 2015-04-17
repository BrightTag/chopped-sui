    ChopSuey.templates = {};
    ChopSuey.templates['accordion'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div");if(t.s(t.f("id",c,p,1),c,p,0,11,23,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");});c.pop();}t.b(" class=\"accordion drop-down--accordion");if(t.s(t.f("build",c,p,1),c,p,0,78,95,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down--built");});c.pop();}if(t.s(t.f("class",c,p,1),c,p,0,115,125,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.f("class",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);t.b("  TODO: YOUR TEMPLATE");t.b("\n" + i);t.b("</div><img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"ChopSuey.initializeComponent({image:this,componentType:'accordion'});\" />");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    ChopSuey.templates['drop-down-menu'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<ul class=\"drop-down__menu drop-down__menu--hidden");if(t.s(t.f("flushDirection",c,p,1),c,p,0,69,111,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu--flush-");t.b(t.v(t.f("flushDirection",c,p,0)));});c.pop();}t.b("\" drop-down-trigger-text=\"\">");t.b("\n" + i);if(t.s(t.f("menuItems",c,p,1),c,p,0,174,506,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		<li class=\"drop-down__menu-option");if(t.s(t.f("isCurrent",c,p,1),c,p,0,224,319,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu-option--current");if(t.s(t.f("hideCurrent",c,p,1),c,p,0,272,303,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu-option--hidden");});c.pop();}});c.pop();}t.b("\"><a ");if(t.s(t.f("menuItemId",c,p,1),c,p,0,353,373,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("id=\"");t.b(t.v(t.f("menuItemId",c,p,0)));t.b("\" ");});c.pop();}t.b("tabindex=\"-1\" href=\"");t.b(t.v(t.f("link",c,p,0)));if(!t.s(t.f("link",c,p,1),c,p,1,0,0,"")){t.b("javascript:;");};t.b("\" class=\"drop-down__menu-option-trigger\">");t.b(t.v(t.f("text",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}t.b("</ul>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    ChopSuey.templates['drop-down-sizer'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<ul class=\"drop-down__sizer");if(t.s(t.f("flushDirection",c,p,1),c,p,0,46,88,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu--flush-");t.b(t.v(t.f("flushDirection",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);if(t.s(t.f("menuItems",c,p,1),c,p,0,126,357,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"drop-down__menu-option");if(t.s(t.f("isCurrent",c,p,1),c,p,0,178,273,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu-option--current");if(t.s(t.f("hideCurrent",c,p,1),c,p,0,226,257,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__menu-option--hidden");});c.pop();}});c.pop();}t.b("\"><span class=\"drop-down__menu-option-trigger\">");t.b(t.v(t.f("text",c,p,0)));t.b("</span></li>");t.b("\n" + i);});c.pop();}t.b("  <li class=\"drop-down__menu-option\"><span class=\"drop-down__menu-option-trigger\">");t.b(t.v(t.f("text",c,p,0)));if(!t.s(t.f("text",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("triggerText",c,p,0)));};t.b("</span></li>");t.b("\n" + i);t.b("</ul>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    ChopSuey.templates['drop-down-trigger'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<button ");if(t.s(t.f("triggerId",c,p,1),c,p,0,22,41,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("id=\"");t.b(t.v(t.f("triggerId",c,p,0)));t.b("\" ");});c.pop();}t.b("class=\"drop-down__trigger");if(t.s(t.f("fixedTrigger",c,p,1),c,p,0,97,123,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__trigger--fixed");});c.pop();}if(t.s(t.f("flushDirection",c,p,1),c,p,0,159,198,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__trigger--");t.b(t.v(t.f("flushDirection",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);t.b("	");t.b(t.v(t.f("text",c,p,0)));if(!t.s(t.f("text",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("triggerText",c,p,0)));};t.b("\n" + i);t.b("</button>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
    ChopSuey.templates['drop-down'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<");if(t.s(t.f("select",c,p,1),c,p,0,12,15,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("div");});c.pop();}if(!t.s(t.f("select",c,p,1),c,p,1,0,0,"")){t.b("nav");};if(t.s(t.f("id",c,p,1),c,p,0,58,70,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");});c.pop();}t.b(" class=\"drop-down drop-down--unenhanced");if(t.s(t.f("build",c,p,1),c,p,0,126,143,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down--built");});c.pop();}if(t.s(t.f("class",c,p,1),c,p,0,163,173,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.f("class",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);if(t.s(t.f("select",c,p,1),c,p,0,199,705,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <select class=\"drop-down__select");if(t.s(t.f("hideCurrent",c,p,1),c,p,0,252,284,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__select--hide-current");});c.pop();}if(t.s(t.f("build",c,p,1),c,p,0,310,336,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" drop-down__select--hidden");});c.pop();}t.b("\" id=\"");t.b(t.v(t.f("selectId",c,p,0)));t.b("\" name=\"");t.b(t.v(t.f("selectName",c,p,0)));t.b("\">");t.b("\n" + i);if(t.s(t.f("menuItems",c,p,1),c,p,0,409,503,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <option value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\"");if(t.s(t.f("isCurrent",c,p,1),c,p,0,455,464,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" selected");});c.pop();}t.b(">");t.b(t.v(t.f("text",c,p,0)));t.b("</option>");t.b("\n" + i);});c.pop();}t.b("    </select>");t.b("\n" + i);if(t.s(t.f("build",c,p,1),c,p,0,546,692,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<drop-down-sizer0",c,p,"      "));if(t.s(t.f("menuItems",c,p,1),c,p,0,595,646,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("isCurrent",c,p,1),c,p,0,609,632,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<drop-down-trigger1",c,p,""));});c.pop();}});c.pop();}t.b(t.rp("<drop-down-menu2",c,p,"      "));});c.pop();}});c.pop();}if(t.s(t.f("menu",c,p,1),c,p,0,728,898,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("build",c,p,1),c,p,0,743,860,"{{ }}")){t.rs(c,p,function(c,p,t){if(!t.s(t.f("flushDirection",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<drop-down-sizer3",c,p,"        "));};t.b(t.rp("<drop-down-trigger4",c,p,"      "));});c.pop();}t.b(t.rp("<drop-down-menu5",c,p,"    "));});c.pop();}t.b("</");if(t.s(t.f("select",c,p,1),c,p,0,921,924,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("div");});c.pop();}if(!t.s(t.f("select",c,p,1),c,p,1,0,0,"")){t.b("nav");};t.b("><img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"(function(i){var c;if(c=ChopSuey.registeredComponents()['dropDown']){c.initialize(i)}}(this));\" />");t.b("\n");return t.fl(); },partials: {"<drop-down-sizer0":{name:"drop-down-sizer", partials: {}, subs: {  }},"<drop-down-trigger1":{name:"drop-down-trigger", partials: {}, subs: {  }},"<drop-down-menu2":{name:"drop-down-menu", partials: {}, subs: {  }},"<drop-down-sizer3":{name:"drop-down-sizer", partials: {}, subs: {  }},"<drop-down-trigger4":{name:"drop-down-trigger", partials: {}, subs: {  }},"<drop-down-menu5":{name:"drop-down-menu", partials: {}, subs: {  }}}, subs: {  }});
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
  buildFromMenu      = require('./build/build-from-menu.src.js'),
  buildFromSelect    = require('./build/build-from-select.src.js'),
  isDropDown         = require('./constants/is-drop-down.src.js'),
  isEnhancedDropDown = require('./constants/is-enhanced-drop-down.src.js'),
  isBuiltDropDown    = require('./constants/is-built-drop-down.src.js');

// add HTML for existing markup
module.exports = function (component) {
  'use strict';

  var
    select,
    trigger,
    menu,
    componentClasses;

  // fail fast with no DOM lookups
  if (!component || !(componentClasses = component.className)) {
    return false;
  }

  // fail fast if component is not a dropDown
  if (!isDropDown.test(componentClasses)) {
    return false;
  }

  // return without work if dropDown is already enhanced
  if (isEnhancedDropDown.test(componentClasses)) {
    return true;
  }

  // return without work if dropDown is already built
  if (isBuiltDropDown.test(componentClasses)) {
    return true;
  }

  // potentially existing elements
  select  = component.querySelectorAll('.drop-down__select')[0];
  trigger = component.querySelectorAll('.drop-down__trigger')[0];
  menu    = component.querySelectorAll('.drop-down__menu')[0];

  // bad base component or template data issue
  if (!select && !menu) {
    return false;
  }

  // enhance from the element provided
  if (select) {
    buildFromSelect(component, select);
  } else {
    buildFromMenu(component, menu, trigger);
  }

  return true;
};

},{"./build/build-from-menu.src.js":4,"./build/build-from-select.src.js":5,"./constants/is-built-drop-down.src.js":9,"./constants/is-drop-down.src.js":10,"./constants/is-enhanced-drop-down.src.js":11}],4:[function(require,module,exports){
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

  menuFlushDirection = '';
  if (menu && menu.className) {
    menuFlushDirection = menuFlush.test(menu.className) ?
      menu.className.match(menuFlush)[2] : '';
  }

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
var isBuiltDropDown = /(^| )drop-down--built( |$)/;

module.exports = isBuiltDropDown;

},{}],10:[function(require,module,exports){
var isDropDown = /(^| )drop-down( |$)/;

module.exports = isDropDown;

},{}],11:[function(require,module,exports){
var isEnhancedDropDown = /(^| )drop-down--enhanced( |$)/;

module.exports = isEnhancedDropDown;

},{}],12:[function(require,module,exports){
var
  handleTriggerClick     = require('./enhance/handle-trigger-click.src.js'),
  handleComponentBlur    = require('./enhance/handle-component-blur.src.js'),
  handleComponentKeydown = require('./enhance/handle-component-keydown.src.js'),
  handleComponentKeyup   = require('./enhance/handle-component-keyup.src.js'),
  handleMenuClick        = require('./enhance/handle-menu-click.src.js'),
  handleDropDownShow     = require('./enhance/handle-drop-down-show.src.js'),
  handleDropDownHide     = require('./enhance/handle-drop-down-hide.src.js'),
  handleDropDownSelect   = require('./enhance/handle-drop-down-select.src.js'),
  isDropDown             = require('./constants/is-drop-down.src.js'),
  isEnhancedDropDown     = require('./constants/is-enhanced-drop-down.src.js');

// open/close menu and change selected option on arrows
module.exports = function (component, unenhance) {
  'use strict';

  var
    trigger,
    menu,
    componentClasses,
    addOrRemove = unenhance ? 'removeEventListener' : 'addEventListener';

  // fail fast with no DOM lookups
  if (!component || !(componentClasses = component.className)) {
    return false;
  }

  // fail fast if component is not a dropDown
  if (!isDropDown.test(componentClasses)) {
    return false;
  }

  // return without work if dropDown is already enhanced
  if (!unenhance && isEnhancedDropDown.test(componentClasses)) {
    return true;
  }

  // potentially existing elements
  trigger = component.querySelectorAll('.drop-down__trigger')[0];
  menu    = component.querySelectorAll('.drop-down__menu')[0];

  // bad base component or template data issue
  if (!trigger || !menu) {
    return false;
  }

  // convert user interactions into API events
  component[addOrRemove]('keydown', handleComponentKeydown, false);
  component[addOrRemove]('keyup', handleComponentKeyup, false);
  menu[addOrRemove]('click', handleMenuClick, false);
  trigger[addOrRemove]('click', handleTriggerClick, false);

  // listen for API events and react accordingly
  component[addOrRemove]('dropDownHide', handleDropDownHide, false);
  component[addOrRemove]('dropDownSelect', handleDropDownSelect, false);
  component[addOrRemove]('dropDownShow', handleDropDownShow, false);
  component[addOrRemove]('blur', handleComponentBlur, true);

  return true;
};

},{"./constants/is-drop-down.src.js":10,"./constants/is-enhanced-drop-down.src.js":11,"./enhance/handle-component-blur.src.js":21,"./enhance/handle-component-keydown.src.js":22,"./enhance/handle-component-keyup.src.js":23,"./enhance/handle-drop-down-hide.src.js":24,"./enhance/handle-drop-down-select.src.js":25,"./enhance/handle-drop-down-show.src.js":26,"./enhance/handle-menu-click.src.js":27,"./enhance/handle-trigger-click.src.js":28}],13:[function(require,module,exports){
var menuHiddenClass = /(^| )drop-down__menu--hidden( |$)/g;

module.exports = menuHiddenClass;

},{}],14:[function(require,module,exports){
var menuHidden = /(^| )drop-down__menu--hidden( |$)/;

module.exports = menuHidden;

},{}],15:[function(require,module,exports){
var optionCurrentClass = /(^| )drop-down__menu-option--current( |$)/g;

module.exports = optionCurrentClass;

},{}],16:[function(require,module,exports){
var optionHiddenClass = /(^| )drop-down__menu-option--hidden( |$)/g;

module.exports = optionHiddenClass;

},{}],17:[function(require,module,exports){
var optionHidden = /(^| )drop-down__menu-option--hidden( |$)/;

module.exports = optionHidden;

},{}],18:[function(require,module,exports){
var optionTriggerClass = /(^| )drop-down__menu-option-trigger( |$)/;

module.exports = optionTriggerClass;

},{}],19:[function(require,module,exports){
var triggerActiveClass = /(^| )drop-down__trigger--active( |$)/g;

module.exports = triggerActiveClass;

},{}],20:[function(require,module,exports){
var triggerFixed = /(^| )drop-down__trigger--fixed( |$)/;

module.exports = triggerFixed;

},{}],21:[function(require,module,exports){
// prevent document scroll on arrow navigation
module.exports = function (e) {
  var component = this;

  window.setTimeout(function () {
    var
      newFocus = document.activeElement,
      focussedDropDown,
      dropDownHideEvent;

    if (/(^| )drop-down__trigger( |$)/.test(newFocus.className)) {
      focussedDropDown = newFocus.parentElement;
    } else if (/(^| )drop-down__menu-option-trigger( |$)/.test(newFocus.className)) {
      focussedDropDown = newFocus.parentElement.parentElement.parentElement;
    }

    if (focussedDropDown !== component) {
      dropDownHideEvent = new window.CustomEvent(
        'dropDownHide',
        {
          'bubbles': true
        }
      );
      component.dispatchEvent(dropDownHideEvent);
    }
  }, 50);
};

},{}],22:[function(require,module,exports){
// prevent document scroll on arrow navigation
module.exports = function (e) {
  'use strict';

  // all arrows
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    e.preventDefault();
    return false;
  }

  return true;
};

},{}],23:[function(require,module,exports){
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

},{"./constants/menu-hidden.src.js":14,"./constants/option-hidden.src.js":17,"./constants/option-trigger-class.src.js":18}],24:[function(require,module,exports){
var
  menuHiddenClass    = require('./constants/menu-hidden-class.src.js'),
  triggerActiveClass = require('./constants/trigger-active-class.src.js');

module.exports = function (e) {
  'use strict';

  var
    component,
    trigger,
    menu,
    dropDownWillHideEvent,
    dropDownDidHideEvent,
    menuClassName,
    triggerClassName;

  e.stopPropagation();

  component = this;
  trigger   = component.querySelectorAll('.drop-down__trigger')[0];
  menu      = component.querySelectorAll('.drop-down__menu')[0];

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

  // document.body.removeEventListener(
  //   'dropDownWillShow',
  //   hideOnOtherDropDownShow,
  //   true
  // );

  component.dispatchEvent(dropDownDidHideEvent);
};

},{"./constants/menu-hidden-class.src.js":13,"./constants/trigger-active-class.src.js":19}],25:[function(require,module,exports){
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

},{"./constants/option-current-class.src.js":15,"./constants/option-hidden-class.src.js":16,"./constants/trigger-fixed.src.js":20}],26:[function(require,module,exports){
var
  menuHiddenClass    = require('./constants/menu-hidden-class.src.js'),
  triggerActiveClass = require('./constants/trigger-active-class.src.js');

module.exports = function (e) {
  'use strict';

  var
    component,
    trigger,
    menu,
    dropDownWillShowEvent,
    dropDownDidShowEvent,
    menuClassName,
    triggerClassName;

  e.stopPropagation();

  component = this;
  trigger   = component.querySelectorAll('.drop-down__trigger')[0];
  menu      = component.querySelectorAll('.drop-down__menu')[0];

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

  // document.body.addEventListener(
  //   'dropDownWillShow',
  //   hideOnOtherDropDownShow,
  //   false
  // );

  menu.scrollTop = 1;
  menu.scrollTop = 0;

  trigger.focus();

  component.dispatchEvent(dropDownDidShowEvent);
};

},{"./constants/menu-hidden-class.src.js":13,"./constants/trigger-active-class.src.js":19}],27:[function(require,module,exports){
var optionTriggerClass = require('./constants/option-trigger-class.src.js');

// select current option when clicked
module.exports = function (e) {
  'use strict';

  var
    menu,
    component,
    dropDownSelectEvent;

  // send select event but allow click for navigation
  if (e.target.tagName === 'A'
    && optionTriggerClass.test(e.target.className)) {

    e.stopPropagation();

    menu      = this;
    component = menu.parentElement;

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
};

},{"./constants/option-trigger-class.src.js":18}],28:[function(require,module,exports){
var menuHidden = require('./constants/menu-hidden.src.js');

// toggle menu visibility on trigger click
module.exports = function (e) {
  'use strict';

  var
    trigger,
    component,
    menu,
    dropDownShowEvent,
    dropDownHideEvent;

  e.stopPropagation();
  e.preventDefault();

  trigger   = this;
  component = trigger.parentElement;
  menu      = component.querySelectorAll('.drop-down__menu')[0];

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
};

},{"./constants/menu-hidden.src.js":14}],29:[function(require,module,exports){
(function (ChopSuey) {
  'use strict';

  var
    build     = require('./build.src.js'),
    enhance   = require('./enhance.src.js');

  ChopSuey.registerComponent({
    componentType : 'dropDown',
    componentClass: 'drop-down',
    build         : build,
    enhance       : enhance
  });

}(window.ChopSuey));

},{"./build.src.js":3,"./enhance.src.js":12,"./enhance/handle-component-keydown.src.js":22}],30:[function(require,module,exports){
(function (ChopSuey) {
  'use strict';

  require('./drop-down/js/main.src.js');
  require('./accordion/js/main.src.js');

}(window.ChopSuey));

},{"./accordion/js/main.src.js":2,"./drop-down/js/main.src.js":29}]},{},[30])