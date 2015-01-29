/**
 * emit a [component]WillEnhance event
 * @param  {DOM Element} component - outermose element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

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
