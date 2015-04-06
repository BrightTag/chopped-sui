// EventListener | CC0 | github.com/jonathantneal/EventListener

!this.addEventListener && this.attachEvent && (function (window, document) {
  var registry = [];

  // add
  function addEventListener(type, listener) {
    var target = this;

    registry.unshift({
      __listener: function (event) {
        event.currentTarget = target;
        event.pageX = event.clientX + document.documentElement.scrollLeft;
        event.pageY = event.clientY + document.documentElement.scrollTop;
        event.preventDefault = function () { event.returnValue = false };
        event.relatedTarget = event.fromElement || null;
        event.stopPropagation = function () { event.cancelBubble = true };
        event.relatedTarget = event.fromElement || null;
        event.target = event.srcElement || target;
        event.timeStamp = +new Date;

        listener.call(target, event);
      },
      listener: listener,
      target: target,
      type: type
    });

    target.attachEvent("on" + type, registry[0].__listener);
  }

  // remove
  function removeEventListener(type, listener) {
    for (var index = 0, length = registry.length; index < length; ++index) {
      if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
        return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
      }
    }
  }

  // dispatch
  function dispatchEvent(eventObject) {
    try {
      return this.fireEvent("on" + eventObject.type, eventObject);
    } catch (error) {
      for (var index = 0, length = registry.length; index < length; ++index) {
        if (registry[index].target == this && registry[index].type == eventObject.type) {
          registry[index].__listener.call(this, eventObject);
        }
      }
    }
  }

  // custom
  function CustomEvent(type, canBubble, cancelable, detail) {
    var event = document.createEventObject(), key;

    event.type = type;
    event.returnValue = !cancelable;
    event.cancelBubble = !canBubble;

    for (key in detail) {
      event[key] = detail[key];
    }

    return event;
  }

  function _patchNode(node) {
    if (node.dispatchEvent) {
      return;
    }

    node.addEventListener = addEventListener;
    node.removeEventListener = removeEventListener;
    node.dispatchEvent = dispatchEvent;

    var appendChild = node.appendChild, createElement = node.createElement, insertBefore = node.insertBefore;

    if (appendChild) {
      node.appendChild = function (node) {
        var returnValue = appendChild(node);

        _patchNodeList(node.all);

        return returnValue;
      };
    }

    if (createElement) {
      node.createElement = function (nodeName) {
        var returnValue = createElement(nodeName);

        _patchNodeList(node.all);

        return returnValue;
      };
    }

    if (insertBefore) {
      node.insertBefore = function (node, referenceElement) {
        var returnValue = insertBefore(node, referenceElement);

        _patchNodeList(node.all);

        return returnValue;
      };
    }

    if ("innerHTML" in node) {
      node.attachEvent("onpropertychange", function (event) {
        if (event.propertyName != "innerHTML") return;

        _patchNodeList(node.all);
      });
    }
  }

  function _patchNodeList(nodeList) {
    for (var i = 0, node; node = nodeList[i]; ++i) {
      _patchNode(node);
    }
  }

  document.attachEvent("onreadystatechange", function (event) {
    if (document.readyState == "complete") {
      _patchNodeList(document.all);

      // ready
      document.dispatchEvent(new CustomEvent("DOMContentLoaded", false, false));
    }
  });

  _patchNode(window);
  _patchNode(document);

  _patchNodeList(document.all);

  window.CustomEvent = CustomEvent;
})(this, document);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (window) {
  'use strict';

  var
    registerComponent    = require('./methods/register-component.src.js'),
    registeredComponents = require('./methods/registered-components.src.js'),
    ChopSuey;

  // ChopSuey namespace
  ChopSuey = {
    registeredComponents: registeredComponents,
    registerComponent   : registerComponent
  };

  window.ChopSuey = ChopSuey;
}(window));

},{"./methods/component.src.js":2,"./methods/register-component.src.js":18,"./methods/registered-components.src.js":19}],2:[function(require,module,exports){
var
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

/**
 * Class representing a registered component
 * @param {Object} args           - args
 *        {String} componentType  - type of component
 *        {String} componentClass - CSS class of component
*/
module.exports = Component;

},{"./component/component-build.src.js":3,"./component/component-destroy-by-element.src.js":4,"./component/component-destroy-by-type.src.js":5,"./component/component-destroy.src.js":6,"./component/component-did-build.src.js":7,"./component/component-did-destroy.src.js":8,"./component/component-did-enhance.src.js":9,"./component/component-enhance.src.js":10,"./component/component-initialize-by-element.src.js":11,"./component/component-initialize-by-type.src.js":12,"./component/component-initialize.src.js":13,"./component/component-will-build.src.js":14,"./component/component-will-destroy.src.js":15,"./component/component-will-enhance.src.js":16}],3:[function(require,module,exports){
/**
 * adds HTML for JS enhancement
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  if (!component) {
    return false;
  }

  return true;
};

},{}],4:[function(require,module,exports){
var registeredComponents = require('../constants/registered-components.src.js');

/**
 * Destroy a component if its type is registered
 * @param  {DOM Element} component     - outermost element of a component
 * @param  {String}      componentType - type of component
 * @return {Boolean}                   - success
 */
module.exports = function (componentType, component) {
  'use strict';

  var
    componentClass,
    componentClasses,
    componentTest,
    componentEnhanced;

  // can't destroy an unregistered component or not an element
  if (!registeredComponents[componentType]) {
    return false;
  }

  // state tests based on classes
  componentClasses = component.className;
  componentClass = registeredComponents[componentType]
    .componentClass;
  componentTest = new RegExp(
    '(^| )' + componentClass + '( |$)'
  );
  componentEnhanced = new RegExp(
    '(^| )' + componentClass + '--enhanced( |$)'
  );

  // don't destroy a component that doesn't have its class
  if (!componentTest.test(componentClasses)) {
    return false;
  }

  // set the classes once as we incur a redraw
  component.className = componentClasses;

  // broadcast willDestroy event, destroy, then broadcast didDestroy event
  registeredComponents[componentType].willDestroy(component);
  registeredComponents[componentType].enhance(component, 'unenhance');
  componentClasses = componentClasses.replace(componentEnhanced, ' ');
  componentClasses += ' ' + componentClass + '--unenhanced';
  if (component.parentElement) {
    component.parentElement.removeChild(component);
  }
  component.className = componentClasses;
  registeredComponents[componentType].didDestroy(component);

  return true;
};

},{"../constants/registered-components.src.js":17}],5:[function(require,module,exports){
var
  destroyByElement     = require('./component-destroy-by-element.src.js'),
  registeredComponents = require('../constants/registered-components.src.js');

/**
 * Destroy all components of a type if it's registered
 * @param  {String}  componentType - type of component
 * @return {Boolean}               - success
 */
module.exports = function (componentType) {
  'use strict';

  var
    components,
    i,
    len;

  // can't destroy an unregistered component
  if (!registeredComponents[componentType]) {
    return false;
  }

  // find and destroy enhanced components of this type
  components = document.querySelectorAll(
    '.' + registeredComponents[componentType].componentClass
  );
  for (i = 0, len = components.length; i < len; i += 1) {
    destroyByElement(componentType, components[i]);
  }

  return true;
};

},{"../constants/registered-components.src.js":17,"./component-destroy-by-element.src.js":4}],6:[function(require,module,exports){
var
  destroyByType    = require('./component-destroy-by-type.src.js'),
  destroyByElement = require('./component-destroy-by-element.src.js');

/**
 * destroys an instance or all instances of a component
 * @param  {DOM Element} component - outermost element of a component
 * @return {Boolean}               - success
 */
module.exports = function (component) {
  'use strict';

  // no component - destroy by type
  if (!component) {
    return destroyByType(this.componentType);

  // bad component
  } else if (!component.tagName) {
    return false;

  // destroy one component
  } else {

    return destroyByElement(
      this.componentType,
      component
    );
  }

};

},{"./component-destroy-by-element.src.js":4,"./component-destroy-by-type.src.js":5}],7:[function(require,module,exports){
/**
 * emits a [component]DidBuild event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var didBuildEvent;

  if (!component) {
    return false;
  }

  didBuildEvent = new window.CustomEvent(
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

},{}],8:[function(require,module,exports){
/**
 * emits a [component]DidDestroy event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var didDestroyEvent;

  if (!component) {
    return false;
  }

  didDestroyEvent = new window.CustomEvent(
    this.componentType + 'DidDestroy',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(didDestroyEvent);

  return true;
};

},{}],9:[function(require,module,exports){
/**
 * emit a [component]DidEnhance event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var didEnhanceEvent;

  if (!component) {
    return false;
  }

  didEnhanceEvent = new window.CustomEvent(
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

},{}],10:[function(require,module,exports){
/**
 * adds enhanced behaviors
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  if (!component) {
    return false;
  }

  return true;
};

},{}],11:[function(require,module,exports){
var registeredComponents = require('../constants/registered-components.src.js');

/**
 * Initialize a component if its type is registered
 * @param  {DOM Element} component     - outermost element of a component
 * @param  {String}      componentType - type of component
 * @param  {DOM Element} image         - trailing image element
 * @return {Boolean}                   - success
 */
module.exports = function (componentType, component, image) {
  'use strict';

  var
    componentClass,
    componentClasses,
    componentTest,
    componentUnenhanced,
    componentBuilt;

  // can't initialize an unregistered component
  if (!registeredComponents[componentType]) {
    return false;
  }

  // state tests based on classes
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

  // don't initialize a component that doesn't have its class
  if (!componentTest.test(componentClasses)) {
    return false;
  }

  // only enhance unenhanced components
  if (componentUnenhanced.test(componentClasses)) {
    componentClasses = componentClasses.replace(componentUnenhanced, ' ');

    // only build unbuilt components
    if (!componentBuilt.test(componentClasses)) {

      // broadcast willBuild event, build, then broadcast didBuild event
      registeredComponents[componentType].willBuild(component);
      registeredComponents[componentType].build(component, componentType);
      registeredComponents[componentType].didBuild(component);

      componentClasses += ' ' + componentClass + '--built';
    }

    // set the classes once as we incur a redraw
    component.className = componentClasses;

    // broadcast willEnhance event, enhance, then broadcast didEnhance event
    registeredComponents[componentType].willEnhance(component);
    registeredComponents[componentType].enhance(component);
    componentClasses = componentClasses.replace(componentBuilt, ' ');
    componentClasses += ' ' + componentClass + '--enhanced';

    // timeout allows CSS animations to fire
    setTimeout(function () {
      component.className = componentClasses;
      registeredComponents[componentType].didEnhance(component);
    }, 100);
  }

  // remove initializer images from the markup after initialization
  if (image) {
    image.parentElement.removeChild(image);
  }

  return true;
};

},{"../constants/registered-components.src.js":17}],12:[function(require,module,exports){
var
  initializeByElement   = require('./component-initialize-by-element.src.js'),
  registeredComponents  = require('../constants/registered-components.src.js');

/**
 * Initialize all components of a type if it's registered
 * @param  {String}  componentType - type of component
 * @return {Boolean}               - success
 */
module.exports = function (componentType) {
  'use strict';

  var
    components,
    i,
    len;

  // can't initialize an unregistered component
  if (!registeredComponents[componentType]) {
    return false;
  }

  // find and enhance unenhanced components of this type
  components = document.querySelectorAll(
    '.' + registeredComponents[componentType].componentClass + '--unenhanced'
  );
  for (i = 0, len = components.length; i < len; i += 1) {
    initializeByElement(componentType, components[i]);
  }

  return true;
};

},{"../constants/registered-components.src.js":17,"./component-initialize-by-element.src.js":11}],13:[function(require,module,exports){
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

},{"./component-initialize-by-element.src.js":11,"./component-initialize-by-type.src.js":12}],14:[function(require,module,exports){
/**
 * emits a [component]WillBuild event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var willBuildEvent;

  if (!component) {
    return false;
  }

  willBuildEvent = new window.CustomEvent(
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

},{}],15:[function(require,module,exports){
/**
 * emits a [component]WillDestroy event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var willDestroyEvent;

  if (!component) {
    return false;
  }

  willDestroyEvent = new window.CustomEvent(
    this.componentType + 'WillDestroy',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(willDestroyEvent);

  return true;
};

},{}],16:[function(require,module,exports){
/**
 * emit a [component]WillEnhance event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var willEnhanceEvent;

  if (!component) {
    return false;
  }

  willEnhanceEvent = new window.CustomEvent(
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

},{}],17:[function(require,module,exports){
var registeredComponents = {};

module.exports = registeredComponents;

},{}],18:[function(require,module,exports){
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

},{"./component.src.js":2,"./constants/registered-components.src.js":17}],19:[function(require,module,exports){
var registeredComponents = require('./constants/registered-components.src.js');

/**
 * dictionary of known widget types
 * @type {Object}
 */
module.exports = function (componentName) {
  'use strict';

  if (componentName) {
    return registeredComponents[componentName];
  } else {
    return registeredComponents;
  }

};

},{"./constants/registered-components.src.js":17}]},{},[1])
/*!
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// A wrapper for compatibility with Mustache.js, quirks and all



var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};
        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
          }
        }
        template = createSpecializedPartial(template, partial.subs, partial.partials,
          this.stackSubs, this.stackPartials, partials.stackText);
      }
      this.partials[symbol].instance = template;

      return template;
    },

    // tries to find a partial in the current scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);
          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);
        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: function(s) { this.buf += s; },

    fl: function() { var r = this.buf; this.buf = ''; return r; },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }

  };

  //Find a key in an object
  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && typeof scope == 'object') {

      if (scope[key] !== undefined) {
        val = scope[key];

      // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {};  //hehe. substext.
    partial.buf = '';

    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;
    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }
    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;
    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }
    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);



(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      rLineSep = /\u2028/,
      rParagraphSep = /\u2029/;

  Hogan.tags = {
    '#': 1, '^': 2, '<': 3, '$': 4,
    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
    '{': 10, '&': 11, '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({tag: '_t', text: new String(buf)});
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[delimiters.length - 1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  // the tags allowed inside super templates
  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;

    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];
    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }
    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];
    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }
    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function(codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
  }

  var serialNo = 0;
  Hogan.generate = function(tree, text, options) {
    serialNo = 0;
    var context = { code: '', subs: {}, partials: {} };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  }

  Hogan.wrapMain = function(code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  }

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function(codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  }

  Hogan.makePartials = function(codeObj) {
    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }
    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r')
            .replace(rLineSep, '\\u2028')
            .replace(rParagraphSep, '\\u2029');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function(nodelist, context) {
    var func;
    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }
    return context;
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  }

  Hogan.cache = {};

  Hogan.cacheKey = function(text, options) {
    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
  }

  Hogan.compile = function(text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      var partials = template.partials;
      for (var name in partials) {
        delete partials[name].instance;
      }
      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  }
})(typeof exports !== 'undefined' ? exports : Hogan);


var Mustache = (function (Hogan) {

  // Mustache.js has non-spec partial context behavior
  function mustachePartial(name, context, partials, indent) {
    var partialScope = this.f(name, context, partials, 0);
    var cx = context;
    if (partialScope) {
      cx = cx.concat(partialScope);
    }

    return Hogan.Template.prototype.rp.call(this, name, cx, partials, indent);
  }

  var HoganTemplateWrapper = function(renderFunc, text, compiler){
    this.rp = mustachePartial;
    Hogan.Template.call(this, renderFunc, text, compiler);
  };
  HoganTemplateWrapper.prototype = Hogan.Template.prototype;

  // Add a wrapper for Hogan's generate method. Mustache and Hogan keep
  // separate caches, and Mustache returns wrapped templates.
  var wrapper;
  var HoganWrapper = function(){
    this.cache = {};
    this.generate = function(code, text, options) {
      return new HoganTemplateWrapper(new Function('c', 'p', 'i', code), text, wrapper);
    }
  };
  HoganWrapper.prototype = Hogan;
  wrapper = new HoganWrapper();

  return {
    to_html: function(text, data, partials, sendFun) {
      var template = wrapper.compile(text);
      var result = template.render(data, partials);
      if (!sendFun) {
        return result;
      }

      sendFun(result);
    }
  }

})(Hogan);
