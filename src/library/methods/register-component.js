var
  Component            = require('./component'),
  initializeComponent  = require('./initialize-component'),
  registeredComponents = require('./registered-components');

/**
 * [registerComponent description]
 * @param  {Object} args  - args
 * @return {Boolean}      - success
 */
module.exports = function (args) {

  if (!args.componentClass || !args.componentType) {
    return;
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
