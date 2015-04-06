var
  initializeByType    = require('./component-initialize-by-type.src.js'),
  initializeByElement = require('./component-initialize-by-element.src.js');

/**
 * initializes an instance or all instances of a component
 * @param  {DOM Element} component - outermost element of a component
 * @return {Boolean}               - success
 */
module.exports = function (component) {
  'use strict';

  var image;

  // no component/image initializer - initialize by type
  if (!component) {
    return initializeByType(this.componentType);

  // bad component
  } else if (!component.tagName) {
    return false;

  // initialize one component
  } else {

    // no component - find the component from the initializer
    if (component.tagName === 'IMG') {
      image = component;
      component = image.previousSibling;
    }

    // no component could be found
    if (!component) {
      return false;
    }

    if (image) {
      return initializeByElement(
        this.componentType,
        component,
        image
      );
    } else {
      return initializeByElement(
        this.componentType,
        component
      );
    }
  }

};
