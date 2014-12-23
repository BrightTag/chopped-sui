(function (window) {
  'use strict';

  var
    Component,
    ChoppedSUI,
    initializeAllOfType,
    initializeThisComponent;

  /**
   * Initialize a component if its type is registered
   * @param  {DOM Element} component     - outermose element of a component
   * @param  {String}      componentType - type of component
   * @param  {DOM Element} image         - trailing image element
   * @return {Boolean}                   - success
   */
  initializeThisComponent = function (component, componentType, image) {
    var
      componentClass,
      componentClasses,
      componentUnenhanced,
      componentBuilt;

    // the component must be registered
    if (ChoppedSUI.registeredComponents[componentType]) {
      componentClasses = component.className;
      componentClass = ChoppedSUI.registeredComponents[componentType]
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

          ChoppedSUI.registeredComponents[componentType].willBuild(component);
          ChoppedSUI.registeredComponents[componentType].build(component, componentType);
          ChoppedSUI.registeredComponents[componentType].didBuild(component);

          componentClasses += ' ' + componentClass + '--built';
        }
        component.className = componentClasses;

        ChoppedSUI.registeredComponents[componentType].willEnhance(component);
        ChoppedSUI.registeredComponents[componentType].enhance(component);

        // timeout required for css animation support
        setTimeout(function () {
          var className = component.className;
          className = className.replace(componentBuilt, ' ');
          className += ' ' + componentClass + '--enhanced';
          component.className = className;
          ChoppedSUI.registeredComponents[componentType].didEnhance(component);
        }, 100);
      }
    }

    // get those nasty self-initializing image tags out of there
    if (image) {
      image.parentElement.removeChild(image);
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
    if (ChoppedSUI.registeredComponents[componentType]) {

      // find each component of this type that needs to be enhanced
      components = document.querySelectorAll(
        '.' +
          window.ChoppedSUI.registeredComponents[componentType].componentClass +
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

  // ChoppedSUI namespace
  ChoppedSUI = {

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

      // no component and no image tag means we want to initialize all
      // components of this type
      if (!args.component && !args.image) {
        initializeAllOfType(args.componentType);
        return;
      }

      if (!args.component) {
        args.component = args.image.previousSibling;
      }

      initializeThisComponent(args.component, args.componentType, args.image);

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

      ChoppedSUI.registeredComponents[args.componentType] = new Component(args);

      if (args.build) {
        ChoppedSUI.registeredComponents[args.componentType].build = args.build;
      }

      if (args.enhance) {
        ChoppedSUI.registeredComponents[args.componentType].enhance =
          args.enhance;
      }

      ChoppedSUI.initializeComponent({
        componentType: args.componentType
      });
    }
  };

  window.ChoppedSUI = ChoppedSUI;
}(window));
