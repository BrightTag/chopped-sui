(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (window) {
  'use strict';

  var
    registerComponent    = require('./methods/register-component.src.js'),
    registeredComponents = require('./methods/registered-components.src.js'),
    initializeComponent  = require('./methods/initialize-component.src.js'),
    ChopSuey;

  // ChopSuey namespace
  ChopSuey = {
    registeredComponents: registeredComponents,
    initializeComponent : initializeComponent,
    registerComponent   : registerComponent
  };

  window.ChopSuey = ChopSuey;
}(window));

},{"./methods/initialize-component.src.js":11,"./methods/register-component.src.js":13,"./methods/registered-components.src.js":14}],2:[function(require,module,exports){
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

},{"./component/component-build.src.js":3,"./component/component-did-build.src.js":4,"./component/component-did-enhance.src.js":5,"./component/component-enhance.src.js":6,"./component/component-will-build.src.js":7,"./component/component-will-enhance.src.js":8}],3:[function(require,module,exports){
/**
 * adds HTML for JS enhancement
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function () {
  'use strict';

  return true;
};

},{}],4:[function(require,module,exports){
/**
 * emits a [component]DidBuild event
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var didBuildEvent = new window.CustomEvent(
    this.componentType + 'DidBuild',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(didBuildEvent);

  return true;
};

},{}],5:[function(require,module,exports){
/**
 * emit a [component]DidEnhance event
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var didEnhanceEvent = new window.CustomEvent(
    this.componentType + 'DidEnhance',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(didEnhanceEvent);

  return true;
};

},{}],6:[function(require,module,exports){
/**
 * adds enhanced behaviors
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function () {
  'use strict';

  return true;
};

},{}],7:[function(require,module,exports){
/**
 * emits a [component]WillBuild event
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var willBuildEvent = new window.CustomEvent(
    this.componentType + 'WillBuild',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(willBuildEvent);

  return true;
};

},{}],8:[function(require,module,exports){
/**
 * emit a [component]WillEnhance event
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var willEnhanceEvent = new window.CustomEvent(
    this.componentType + 'WillEnhance',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(willEnhanceEvent);

  return true;
};

},{}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
var
  initializeThisComponent = require('./initialize-this-component.src.js'),
  registeredComponents    = require('./constants/registered-components.src.js');

/**
 * Initialize all components of a type if it's registered
 * @param  {String}  componentType - type of component
 * @return {Boolean}               - success
 */
module.exports = function (componentType) {
  'use strict';

  var components, i, len;

  // the component must be registered
  if (!registeredComponents[componentType]) {
    return false;
  } else {

    // find each component of this type that needs to be enhanced
    components = document.querySelectorAll(
      '.' + registeredComponents[componentType].componentClass + '--unenhanced'
    );

    //
    for (i = 0, len = components.length; i < len; i += 1) {
      initializeThisComponent(components[i], componentType);
    }
  }

  return true;
};

},{"./constants/registered-components.src.js":9,"./initialize-this-component.src.js":12}],11:[function(require,module,exports){
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
        args.component,
        args.componentType,
        args.image
      );
    }

  // initialize the component
  } else {
    return initializeThisComponent(
      args.component,
      args.componentType,
      args.image
    );
  }
};

},{"./initialize-all-of-type.src.js":10,"./initialize-this-component.src.js":12}],12:[function(require,module,exports){
var registeredComponents = require('./constants/registered-components.src.js');

/**
 * Initialize a component if its type is registered
 * @param  {DOM Element} component     - outermose element of a component
 * @param  {String}      componentType - type of component
 * @param  {DOM Element} image         - trailing image element
 * @return {Boolean}                   - success
 */
module.exports = function (component, componentType, image) {
  'use strict';

  var
    componentClass,
    componentClasses,
    componentTest,
    componentUnenhanced,
    componentBuilt;

  // the component must be registered
  if (!registeredComponents[componentType]) {
    return false;
  }

  componentClasses = component.className;
  componentClass = registeredComponents[componentType]
    .componentClass;
  componentTest = new RegExp(
    '(^| )' + componentClass + '( |$)'
  );
  componentUnenhanced = new RegExp(
    '(^| )' + componentClass + '--unenhanced( |$)'
  );
  componentBuilt = new RegExp(
    '(^| )' + componentClass + '--built( |$)'
  );

  if (!componentTest.test(componentClasses)) {
    return false;

  // only enhance unenhanced components
  } else if (componentUnenhanced.test(componentClasses)) {
    componentClasses = componentClasses.replace(componentUnenhanced, ' ');

    // only build unbuilt components
    if (!componentBuilt.test(componentClasses)) {

      registeredComponents[componentType].willBuild(component);
      registeredComponents[componentType].build(component, componentType);
      registeredComponents[componentType].didBuild(component);

      componentClasses += ' ' + componentClass + '--built';
    }
    component.className = componentClasses;

    registeredComponents[componentType].willEnhance(component);
    registeredComponents[componentType].enhance(component);

    // timeout required for css animation support
    setTimeout(function () {
      var className = component.className;
      className = className.replace(componentBuilt, ' ');
      className += ' ' + componentClass + '--enhanced';
      component.className = className;
      registeredComponents[componentType].didEnhance(component);
    }, 100);
  }

  // get those nasty self-initializing image tags out of there
  if (image) {
    image.parentElement.removeChild(image);
  }

  return true;
};

},{"./constants/registered-components.src.js":9}],13:[function(require,module,exports){
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

},{"./component.src.js":2,"./constants/registered-components.src.js":9,"./initialize-component.src.js":11}],14:[function(require,module,exports){
var registeredComponents = require('./constants/registered-components.src.js');

/**
 * dictionary of known widget types
 * @type {Object}
 */
module.exports = function () {
  'use strict';

  return registeredComponents;
};

},{"./constants/registered-components.src.js":9}]},{},[1])