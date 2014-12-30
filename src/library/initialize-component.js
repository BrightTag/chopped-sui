var
  initializeAllOfType     = require('./initialize-all-of-type'),
  initializeThisComponent = require('./initialize-this-component');

/**
 * initializes an instance or all instances of a component
 * @param  {Object}  args - args
 * @return {Boolean}      - success
 */
module.exports = function (args) {
  'use strict';

  // without a component type there is no way to look up the component
  if (!args.componentType) {
    return;
  }

  // no component and no image tag means we want to initialize all
  // components of this type
  if (!args.component && !args.image) {
    initializeAllOfType(args.componentType);
    return;
  }

  if (!args.component) {
    args.component = args.image.previousSibling;
  }

  initializeThisComponent(args.component, args.componentType, args.image);

  return true;
};
