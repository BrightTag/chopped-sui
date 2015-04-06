var
  /* expose */
  initializeByType    = require('./component/component-initialize-by-type.src.js'),
  initializeByElement = require('./component/component-initialize-by-element.src.js'),
  destroyByType       = require('./component/component-destroy-by-type.src.js'),
  destroyByElement    = require('./component/component-destroy-by-element.src.js'),
  /* end-expose */
  build       = require('./component/component-build.src.js'),
  didBuild    = require('./component/component-did-build.src.js'),
  willBuild   = require('./component/component-will-build.src.js'),
  destroy     = require('./component/component-destroy.src.js'),
  didDestroy  = require('./component/component-did-destroy.src.js'),
  willDestroy = require('./component/component-will-destroy.src.js'),
  enhance     = require('./component/component-enhance.src.js'),
  didEnhance  = require('./component/component-did-enhance.src.js'),
  willEnhance = require('./component/component-will-enhance.src.js'),
  initialize  = require('./component/component-initialize.src.js'),
  Component   = function (args) {
    var args = args && typeof(args) === 'object' ? args : {};

    this.componentType  = args.componentType  || 'component';
    this.componentClass = args.componentClass || 'component';
  };

Component.prototype.build = build;
Component.prototype.didBuild = didBuild;
Component.prototype.willBuild = willBuild;
Component.prototype.destroy = destroy;
Component.prototype.didDestroy = didDestroy;
Component.prototype.willDestroy = willDestroy;
Component.prototype.enhance = enhance;
Component.prototype.didEnhance = didEnhance;
Component.prototype.willEnhance = willEnhance;
Component.prototype.initialize = initialize;
/* expose */
Component.prototype._initializeByType    = initializeByType;
Component.prototype._initializeByElement = initializeByElement;
Component.prototype._destroyByType       = destroyByType;
Component.prototype._destroyByElement    = destroyByElement;
/* end-expose */

/**
 * Class representing a registered component
 * @param {Object} args           - args
 *        {String} componentType  - type of component
 *        {String} componentClass - CSS class of component
*/
module.exports = Component;
