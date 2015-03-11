var registeredComponents = require('./constants/registered-components.src.js');

/**
 * dictionary of known widget types
 * @type {Object}
 */
module.exports = function (componentName) {
  'use strict';

  if (componentName) {
    return registeredComponents[componentName];
  } else {
    return registeredComponents;
  }

};
