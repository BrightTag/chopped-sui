/**
 * emit a [component]DidEnhance event
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

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
