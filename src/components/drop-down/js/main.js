(function (ChopSuey) {
  'use strict';

  var
    buildDropDown   = require('./build-drop-down'),
    enhanceDropDown = require('./enhance-drop-down');

  ChopSuey.registerComponent({
    componentType : 'dropDown',
    componentClass: 'drop-down',
    build         : buildDropDown,
    enhance       : enhanceDropDown
  });

}(window.ChopSuey));
