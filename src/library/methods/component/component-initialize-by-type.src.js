var
  initializeByElement   = require('./component-initialize-by-element.src.js'),
  registeredComponents  = require('../constants/registered-components.src.js');

/**
 * Initialize all components of a type if it's registered
 * @param  {String}  componentType - type of component
 * @return {Boolean}               - success
 */
module.exports = function (componentType) {
  'use strict';

  var
    components,
    i,
    len;

  // can't initialize an unregistered component
  if (!registeredComponents[componentType]) {
    return false;
  }

  // find and enhance unenhanced components of this type
  components = document.querySelectorAll(
    '.' + registeredComponents[componentType].componentClass + '--unenhanced'
  );
  for (i = 0, len = components.length; i < len; i += 1) {
    initializeByElement(componentType, components[i]);
  }

  return true;
};
