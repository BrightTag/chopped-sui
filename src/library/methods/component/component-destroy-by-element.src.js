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
