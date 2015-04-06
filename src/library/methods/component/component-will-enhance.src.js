/**
 * emit a [component]WillEnhance event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var willEnhanceEvent;

  if (!component) {
    return false;
  }

  willEnhanceEvent = new window.CustomEvent(
    this.componentType + 'WillEnhance',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(willEnhanceEvent);

  return true;
};
