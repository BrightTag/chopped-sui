var
  destroyByType    = require('./component-destroy-by-type.src.js'),
  destroyByElement = require('./component-destroy-by-element.src.js');

/**
 * destroys an instance or all instances of a component
 * @param  {DOM Element} component - outermost element of a component
 * @return {Boolean}               - success
 */
module.exports = function (component) {
  'use strict';

  // no component - destroy by type
  if (!component) {
    return destroyByType(this.componentType);

  // bad component
  } else if (!component.tagName) {
    return false;

  // destroy one component
  } else {

    return destroyByElement(
      this.componentType,
      component
    );
  }

};
