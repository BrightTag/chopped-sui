(function (window) {
  'use strict';

  var
    Component,
    SignalUI,
    initializeAllOfType,
    initializeThisComponent;

  /**
   * [initializeThisComponent description]
   * @param  {[type]} component     [description]
   * @param  {[type]} componentType [description]
   * @param  {[type]} script     [description]
   * @return {[type]}            [description]
   */
  initializeThisComponent = function (component, componentType, script) {
    var
      componentClass,
      componentClasses,
      componentUnenhanced,
      componentBuilt;

    // the component must be registered
    if (SignalUI.registeredComponents[componentType]) {
      componentClasses = component.className;
      componentClass = SignalUI.registeredComponents[componentType]
        .componentClass;
      componentUnenhanced = new RegExp(
        '(^| )' + componentClass + '--unenhanced( |$)',
        'g'
      );
      componentBuilt = new RegExp(
        '(^| )' + componentClass + '--built( |$)',
        'g'
      );

      // only enhance unenhanced components
      if (componentUnenhanced.test(componentClasses)) {
        componentClasses = componentClasses.replace(componentUnenhanced, ' ');

        // only build unbuilt components
        if (!componentBuilt.test(componentClasses)) {

          SignalUI.registeredComponents[componentType].willBuild(component);
          SignalUI.registeredComponents[componentType].build(component, componentType);
          SignalUI.registeredComponents[componentType].didBuild(component);

          componentClasses += ' ' + componentClass + '--built';
        }
        component.className = componentClasses;

        SignalUI.registeredComponents[componentType].willEnhance(component);
        SignalUI.registeredComponents[componentType].enhance(component);

        // timeout required for css animation support
        setTimeout(function () {
          var className = component.className;
          className = className.replace(componentBuilt, ' ');
          className += ' ' + componentClass + '--enhanced';
          component.className = className;
          SignalUI.registeredComponents[componentType].didEnhance(component);
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
   * @param  {[type]} componentType [description]
   * @return {[type]}            [description]
   */
  initializeAllOfType = function (componentType) {
    var components, i, len;

    // the component must be registered
    if (SignalUI.registeredComponents[componentType]) {

      // find each component of this type that needs to be enhanced
      components = document.querySelectorAll(
        '.' +
          window.SignalUI.registeredComponents[componentType].componentClass +
          '--unenhanced'
      );

      //
      for (i = 0, len = components.length; i < len; i += 1) {

        initializeThisComponent(components[i], componentType);

      }
    }
  };

  /**
   * [Component description]
   * @param {[type]} args [description]
   */
  Component = function (args) {
    this.componentType  = args.componentType  || '';
    this.componentClass = args.componentClass || '';
    this.templates   = args.templates   || {};
  };

  /**
   * [willBuild description]
   * @param  {[type]} component [description]
   * @return {[type]}        [description]
   */
  Component.prototype.willBuild = function (component) {
    var willBuildEvent = new window.CustomEvent(
      this.componentType + 'WillBuild',
      {
        'detail': {
          'component': component
        }
      }
    );
    component.dispatchEvent(willBuildEvent);
    return true;
  };

  /**
   * [didBuild description]
   * @param  {[type]} component [description]
   * @return {[type]}        [description]
   */
  Component.prototype.didBuild = function (component) {
    var didBuildEvent = new window.CustomEvent(
      this.componentType + 'DidBuild',
      {
        'detail': {
          'component': component
        }
      }
    );
    component.dispatchEvent(didBuildEvent);
    return true;
  };

  /**
   * [willEnhance description]
   * @param  {[type]} component [description]
   * @return {[type]}        [description]
   */
  Component.prototype.willEnhance = function (component) {
    var willEnhanceEvent = new window.CustomEvent(
      this.componentType + 'WillEnhance',
      {
        'detail': {
          'component': component
        }
      }
    );
    component.dispatchEvent(willEnhanceEvent);
    return true;
  };

  /**
   * [didEnhance description]
   * @param  {[type]} component [description]
   * @return {[type]}        [description]
   */
  Component.prototype.didEnhance = function (component) {
    var didEnhanceEvent = new window.CustomEvent(
      this.componentType + 'DidEnhance',
      {
        'detail': {
          'component': component
        }
      }
    );
    component.dispatchEvent(didEnhanceEvent);
    return true;
  };

  /**
   * [build description]
   * @param  {[type]} component     [description]
   * @param  {[type]} componentType [description]
   * @return {[type]}            [description]
   */
  Component.prototype.build = function () {
    return true;
  };

  /**
   * [enhance description]
   * @param  {[type]} component [description]
   * @return {[type]}        [description]
   */
  Component.prototype.enhance = function () {
    return true;
  };

  // SignalUI namespace
  SignalUI = {

    /**
     * [registeredComponents description]
     * @type {Object}
     */
    registeredComponents: {},

    /**
     * [initializeComponent description]
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    initializeComponent: function (args) {

      // without a component type there is no way to look up the component
      if (!args.componentType) {
        return;
      }

      // no component and no script tag means we want to initialize all
      // components of this type
      if (!args.component && !args.scriptId) {
        initializeAllOfType(args.componentType);
        return;
      }

      if (!args.component) {
        args.script = document.getElementById(args.scriptId);
        args.component = args.script.previousSibling;
      }
    },

    /**
     * [registerComponent description]
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    registerComponent: function (args) {

      if (!args.componentClass || !args.componentType) {
        return;
      }

      SignalUI.registeredComponents[args.componentType] = new Component(args);

      if (args.build) {
        SignalUI.registeredComponents[args.componentType].build = args.build;
      }

      if (args.enhance) {
        SignalUI.registeredComponents[args.componentType].enhance =
          args.enhance;
      }

      SignalUI.initializeComponent({
        componentType: args.componentType
      });
    }
  };

  window.SignalUI = SignalUI;
}(window));
