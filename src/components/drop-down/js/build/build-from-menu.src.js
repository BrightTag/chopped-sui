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
