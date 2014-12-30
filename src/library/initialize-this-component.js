var registeredComponents = require('./registered-components');

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
    componentUnenhanced,
    componentBuilt;

  // the component must be registered
  if (registeredComponents[componentType]) {
    componentClasses = component.className;
    componentClass = registeredComponents[componentType]
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
  }

  // get those nasty self-initializing image tags out of there
  if (image) {
    image.parentElement.removeChild(image);
  }

  return true;
};
