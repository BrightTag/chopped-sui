/**
 * emits a [component]WillDestroy event
 * @param  {DOM Element} component - outermost element of a component
 * @return {[Boolean]}             - success
 */
module.exports = function (component) {
  'use strict';

  var willDestroyEvent;

  if (!component) {
    return false;
  }

  willDestroyEvent = new window.CustomEvent(
    this.componentType + 'WillDestroy',
    {
      'detail': {
        'component': component
      },
      'bubbles': true
    }
  );
  component.dispatchEvent(willDestroyEvent);

  return true;
};
