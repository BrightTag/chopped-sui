// select current option when clicked
module.exports = function (component, menu) {
  'use strict';

  function handleMenuClick(e) {
    var dropDownSelectEvent;

    e.stopPropagation();

    // send select event but allow click for navigation
    if (e.target.tagName === 'A') {
      dropDownSelectEvent = new window.CustomEvent(
        'dropDownSelect',
        {
          'detail': {
            'select': e.target
          }
        }
      );
      component.dispatchEvent(dropDownSelectEvent);
    }
  }

  menu.addEventListener('click', handleMenuClick, false);
};
