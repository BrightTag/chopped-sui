/**
 * emits a [component]DidBuild event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var didBuildEvent;

  if (!component) {
    return false;
  }

  didBuildEvent = new window.CustomEvent(
    this.componentType + 'DidBuild',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(didBuildEvent);

  return true;
};
