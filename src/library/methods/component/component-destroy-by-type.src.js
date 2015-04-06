var
  destroyByElement     = require('./component-destroy-by-element.src.js'),
  registeredComponents = require('../constants/registered-components.src.js');

/**
 * Destroy all components of a type if it's registered
 * @param  {String}  componentType - type of component
 * @return {Boolean}               - success
 */
module.exports = function (componentType) {
  'use strict';

  var
    components,
    i,
    len;

  // can't destroy an unregistered component
  if (!registeredComponents[componentType]) {
    return false;
  }

  // find and destroy enhanced components of this type
  components = document.querySelectorAll(
    '.' + registeredComponents[componentType].componentClass
  );
  for (i = 0, len = components.length; i < len; i += 1) {
    destroyByElement(componentType, components[i]);
  }

  return true;
};
