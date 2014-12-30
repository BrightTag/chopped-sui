var
  build       = require('./component-build'),
  didBuild    = require('./component-did-build'),
  willBuild   = require('./component-will-build'),
  enhance     = require('./component-enhance'),
  didEnhance  = require('./component-did-enhance'),
  willEnhance = require('./component-will-enhance'),
  Component   = function (args) {
    this.componentType  = args.componentType  || '';
    this.componentClass = args.componentClass || '';
  };

Component.prototype.build = build;
Component.prototype.didBuild = didBuild;
Component.prototype.willBuild = willBuild;
Component.prototype.enhance = enhance;
Component.prototype.didEnhance = didEnhance;
Component.prototype.willEnhance = willEnhance;

/**
 * Class representing a registered component
 * @param {Object} args           - args
 *        {String} componentType  - type of component
 *        {String} componentClass - CSS class of component
*/
module.exports = Component;
