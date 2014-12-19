(function (window) {
  'use strict';

  var
    Component,
    SignalUI,
    initializeAllOfType,
    initializeThisComponent;

  /**
   * Initialize a component if its type is registered
   * @param  {DOM Element} component     - outermose element of a component
   * @param  {String}      componentType - type of component
   * @param  {DOM Element} script        - trailing script element
   * @return {Boolean}                   - success
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

    return true;
  };

  /**
   * Initialize all components of a type if it's registered
   * @param  {String}  componentType - type of component
   * @return {Boolean}               - success
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
   * Class representing a registered component
   * @param {Object} args           - args
   *        {String} componentType  - type of component
   *        {String} componentClass - CSS class of component
   */
  Component = function (args) {
    this.componentType  = args.componentType  || '';
    this.componentClass = args.componentClass || '';
  };

  /**
   * emits a [component]WillBuild event
   * @param  {DOM Element} component - outermose element of a component
   * @return {[Boolean]}             - success
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
   * emits a [component]DidBuild event
   * @param  {DOM Element} component - outermose element of a component
   * @return {[Boolean]}             - success
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
   * emit a [component]WillEnhance event
   * @param  {DOM Element} component - outermose element of a component
   * @return {[Boolean]}             - success
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
   * emit a [component]DidEnhance event
   * @param  {DOM Element} component - outermose element of a component
   * @return {[Boolean]}             - success
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
   * adds HTML for JS enhancement
   * @param  {DOM Element} component - outermose element of a component
   * @return {[Boolean]}             - success
   */
  Component.prototype.build = function () {
    return true;
  };

  /**
   * adds enhanced behaviors
   * @param  {DOM Element} component - outermose element of a component
   * @return {[Boolean]}             - success
   */
  Component.prototype.enhance = function () {
    return true;
  };

  // SignalUI namespace
  SignalUI = {

    /**
     * dictionary of known widget types
     * @type {Object}
     */
    registeredComponents: {},

    /**
     * [initializeComponent description]
     * @param  {Object}  args - args
     * @return {Boolean}      - success
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

      return true;
    },

    /**
     * [registerComponent description]
     * @param  {Object} args  - args
     * @return {Boolean}      - success
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
