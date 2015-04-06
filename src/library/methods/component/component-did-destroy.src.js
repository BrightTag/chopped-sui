/**
 * emits a [component]DidDestroy event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var didDestroyEvent;

  if (!component) {
    return false;
  }

  didDestroyEvent = new window.CustomEvent(
    this.componentType + 'DidDestroy',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(didDestroyEvent);

  return true;
};
