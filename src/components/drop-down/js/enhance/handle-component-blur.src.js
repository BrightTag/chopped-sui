// hide open drop-down on tab/blur
module.exports = function (e) {
  var component = this;

  window.setTimeout(function () {
    var
      newFocus = document.activeElement,
      focussedDropDown,
      dropDownHideEvent;

    if (/(^| )drop-down__trigger( |$)/.test(newFocus.className)) {
      focussedDropDown = newFocus.parentElement;
    } else if (/(^| )drop-down__menu-option-trigger( |$)/.test(newFocus.className)) {
      focussedDropDown = newFocus.parentElement.parentElement.parentElement;
    }

    if (focussedDropDown !== component) {
      dropDownHideEvent = new window.CustomEvent(
        'dropDownHide',
        {
          'bubbles': true
        }
      );
      component.dispatchEvent(dropDownHideEvent);
    }
  }, 50);
};
