var
  initializeAllOfType     = require('./initialize-all-of-type.src.js'),
  initializeThisComponent = require('./initialize-this-component.src.js');

/**
 * initializes an instance or all instances of a component
 * @param  {Object}  args - args
 * @return {Boolean}      - success
 */
module.exports = function (args) {
  'use strict';

  // without args or a componentType, there is nothing to initialize
  if (!args || !args.componentType) {
    return false;

  // no component and no image tag means we want to initialize all
  // components of this type
  } else if (!args.component && !args.image) {
    return initializeAllOfType(args.componentType);

  // find the component from the image element and initialize it
  } else if (!args.component) {
    args.component = args.image.previousSibling;

    if (!args.component) {
      return false;
    } else {
      return initializeThisComponent(
        args.componentType,
        args.component,
        args.image
      );
    }

  // initialize the component
  } else {
    return initializeThisComponent(
      args.componentType,
      args.component,
      args.image
    );
  }
};
