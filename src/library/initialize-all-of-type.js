var
  initializeThisComponent = require('./initialize-this-component'),
  registeredComponents    = require('./registered-components');

/**
 * Initialize all components of a type if it's registered
 * @param  {String}  componentType - type of component
 * @return {Boolean}               - success
 */
module.exports = function (componentType) {
  'use strict';

  var components, i, len;

  // the component must be registered
  if (registeredComponents[componentType]) {

    // find each component of this type that needs to be enhanced
    components = document.querySelectorAll(
      '.' + registeredComponents[componentType].componentClass + '--unenhanced'
    );

    //
    for (i = 0, len = components.length; i < len; i += 1) {

      initializeThisComponent(components[i], componentType);

    }
  }
};
