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
