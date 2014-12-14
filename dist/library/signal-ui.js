!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
(function (window) {
  'use strict';

  var
    Widget,
    SignalUI,
    initializeAllOfType,
    initializeThisWidget;

  /**
   * [initializeThisWidget description]
   * @param  {[type]} widget     [description]
   * @param  {[type]} widgetType [description]
   * @param  {[type]} script     [description]
   * @return {[type]}            [description]
   */
  initializeThisWidget = function (widget, widgetType, script) {
    var
      widgetClass,
      widgetClasses,
      widgetUnenhanced,
      widgetBuilt;

    // the widget must be registered
    if (SignalUI.registeredWidgets[widgetType]) {
      widgetClasses = widget.className;
      widgetClass = SignalUI.registeredWidgets[widgetType].widgetClass;
      widgetUnenhanced = new RegExp(
        '(^| )' + widgetClass + '--unenhanced( |$)',
        'g'
      );
      widgetBuilt = new RegExp(
        '(^| )' + widgetClass + '--built( |$)',
        'g'
      );

      // only enhance unenhanced widgets
      if (widgetUnenhanced.test(widgetClasses)) {
        widgetClasses = widgetClasses.replace(widgetUnenhanced, ' ');

        // only build unbuilt widgets
        if (!widgetBuilt.test(widgetClasses)) {

          SignalUI.registeredWidgets[widgetType].willBuild(widget);
          SignalUI.registeredWidgets[widgetType].build(widget, widgetType);
          SignalUI.registeredWidgets[widgetType].didBuild(widget);

          widgetClasses += ' ' + widgetClass + '--built';
        }
        widget.className = widgetClasses;

        SignalUI.registeredWidgets[widgetType].willEnhance(widget);
        SignalUI.registeredWidgets[widgetType].enhance(widget);

        // timeout required for css animation support
        setTimeout(function () {
          var className = widget.className;
          className = className.replace(widgetBuilt, ' ');
          className += ' ' + widgetClass + '--enhanced';
          widget.className = className;
          SignalUI.registeredWidgets[widgetType].didEnhance(widget);
        }, 100);
      }
    }

    // get those nasty self-initializing script tags out of there
    if (script) {
      script.parentElement.removeChild(script);
    }
  };

  /**
   * [initializeAllOfType description]
   * @param  {[type]} widgetType [description]
   * @return {[type]}            [description]
   */
  initializeAllOfType = function (widgetType) {
    var widgets, i, len;

    // the widget must be registered
    if (SignalUI.registeredWidgets[widgetType]) {

      // find each widget of this type that needs to be enhanced
      widgets = document.querySelectorAll(
        '.' +
          window.SignalUI.registeredWidgets[widgetType].widgetClass +
          '--unenhanced'
      );

      //
      for (i = 0, len = widgets.length; i < len; i += 1) {

        initializeThisWidget(widgets[i], widgetType);

      }
    }
  };

  /**
   * [Widget description]
   * @param {[type]} args [description]
   */
  Widget = function (args) {
    this.widgetType  = args.widgetType  || '';
    this.widgetClass = args.widgetClass || '';
    this.templates   = args.templates   || {};
  };

  /**
   * [willBuild description]
   * @param  {[type]} widget [description]
   * @return {[type]}        [description]
   */
  Widget.prototype.willBuild = function (widget) {
    var willBuildEvent = new window.CustomEvent(
      this.widgetType + 'WillBuild',
      {
        'detail': {
          'widget': widget
        }
      }
    );
    widget.dispatchEvent(willBuildEvent);
    return true;
  };

  /**
   * [didBuild description]
   * @param  {[type]} widget [description]
   * @return {[type]}        [description]
   */
  Widget.prototype.didBuild = function (widget) {
    var didBuildEvent = new window.CustomEvent(
      this.widgetType + 'DidBuild',
      {
        'detail': {
          'widget': widget
        }
      }
    );
    widget.dispatchEvent(didBuildEvent);
    return true;
  };

  /**
   * [willEnhance description]
   * @param  {[type]} widget [description]
   * @return {[type]}        [description]
   */
  Widget.prototype.willEnhance = function (widget) {
    var willEnhanceEvent = new window.CustomEvent(
      this.widgetType + 'WillEnhance',
      {
        'detail': {
          'widget': widget
        }
      }
    );
    widget.dispatchEvent(willEnhanceEvent);
    return true;
  };

  /**
   * [didEnhance description]
   * @param  {[type]} widget [description]
   * @return {[type]}        [description]
   */
  Widget.prototype.didEnhance = function (widget) {
    var didEnhanceEvent = new window.CustomEvent(
      this.widgetType + 'DidEnhance',
      {
        'detail': {
          'widget': widget
        }
      }
    );
    widget.dispatchEvent(didEnhanceEvent);
    return true;
  };

  /**
   * [build description]
   * @param  {[type]} widget     [description]
   * @param  {[type]} widgetType [description]
   * @return {[type]}            [description]
   */
  Widget.prototype.build = function () {
    return true;
  };

  /**
   * [enhance description]
   * @param  {[type]} widget [description]
   * @return {[type]}        [description]
   */
  Widget.prototype.enhance = function () {
    return true;
  };

  // SignalUI namespace
  SignalUI = {

    /**
     * [registeredWidgets description]
     * @type {Object}
     */
    registeredWidgets: {},

    /**
     * [initializeWidget description]
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    initializeWidget: function (args) {

      // without a widget type there is no way to look up the widget
      if (!args.widgetType) {
        return;
      }

      // no widget and no script tag means we want to initialize all
      // widgets of this type
      if (!args.widget && !args.scriptId) {
        initializeAllOfType(args.widgetType);
        return;
      }

      if (!args.widget) {
        args.script = document.getElementById(args.scriptId);
        args.widget = args.script.previousSibling;
      }
    },

    /**
     * [registerWidget description]
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    registerWidget: function (args) {

      if (!args.widgetClass || !args.widgetType) {
        return;
      }

      SignalUI.registeredWidgets[args.widgetType] = new Widget(args);

      if (args.build) {
        SignalUI.registeredWidgets[args.widgetType].build = args.build;
      }

      if (args.enhance) {
        SignalUI.registeredWidgets[args.widgetType].enhance = args.enhance;
      }

      SignalUI.initializeWidget({
        widgetType: args.widgetType
      });
    }
  };

  window.SignalUI = SignalUI;
}(window));
