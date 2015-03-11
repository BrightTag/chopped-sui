var registeredComponents = require('./constants/registered-components.src.js');

/**
 * Initialize a component if its type is registered
 * @param  {DOM Element} component     - outermose element of a component
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
