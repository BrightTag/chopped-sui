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
