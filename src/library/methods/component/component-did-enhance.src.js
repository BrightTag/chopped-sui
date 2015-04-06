/**
 * emit a [component]DidEnhance event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var didEnhanceEvent;

  if (!component) {
    return false;
  }

  didEnhanceEvent = new window.CustomEvent(
    this.componentType + 'DidEnhance',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(didEnhanceEvent);

  return true;
};
