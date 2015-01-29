/**
 * emits a [component]DidBuild event
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

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
