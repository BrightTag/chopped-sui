var
  Component            = require('./component.src.js'),
  registeredComponents = require('./constants/registered-components.src.js');

/**
 * [registerComponent description]
 * @param  {Object} args  - args
 * @return {Boolean}      - success
 */
module.exports = function (args) {

  if (!args || !args.componentClass || !args.componentType) {
    return false;
  }

  registeredComponents[args.componentType] = new Component(args);

  if (args.build) {
    registeredComponents[args.componentType].build = args.build;
  }

  if (args.destroy) {
    registeredComponents[args.componentType].destroy = args.destroy;
  }

  if (args.enhance) {
    registeredComponents[args.componentType].enhance = args.enhance;
  }

  registeredComponents[args.componentType].initialize();

  return true;
};
