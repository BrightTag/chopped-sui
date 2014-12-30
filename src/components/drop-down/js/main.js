(function (ChoppedSUI) {
  'use strict';

  var
    buildDropDown   = require('./build-drop-down'),
    enhanceDropDown = require('./enhance-drop-down');

  ChoppedSUI.registerComponent({
    componentType : 'dropDown',
    componentClass: 'drop-down',
    build         : buildDropDown,
    enhance       : enhanceDropDown
  });

}(window.ChoppedSUI));
