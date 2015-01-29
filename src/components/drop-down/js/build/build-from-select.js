var currentOptionHidden = require('./constants/current-option-hidden');

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
