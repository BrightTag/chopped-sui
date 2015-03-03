var
  build       = require('./component/component-build.src.js'),
  didBuild    = require('./component/component-did-build.src.js'),
  willBuild   = require('./component/component-will-build.src.js'),
  enhance     = require('./component/component-enhance.src.js'),
  didEnhance  = require('./component/component-did-enhance.src.js'),
  willEnhance = require('./component/component-will-enhance.src.js'),
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
