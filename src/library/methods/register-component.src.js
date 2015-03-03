var
  Component            = require('./component.src.js'),
  initializeComponent  = require('./initialize-component.src.js'),
  registeredComponents = require('./constants/registered-components.src.js');

/**
 * [registerComponent description]
 * @param  {Object} args  - args
 * @return {Boolean}      - success
 */
module.exports = function (args) {

  if (!args.componentClass || !args.componentType) {
    return false;
  }

  registeredComponents[args.componentType] = new Component(args);

  if (args.build) {
    registeredComponents[args.componentType].build = args.build;
  }

  if (args.enhance) {
    registeredComponents[args.componentType].enhance =
      args.enhance;
  }

  initializeComponent({
    componentType: args.componentType
  });
};
