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
