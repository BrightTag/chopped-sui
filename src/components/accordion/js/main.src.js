(function (ChopSuey) {
  'use strict';

  var
    enhance = require('./enhance.src.js');

  ChopSuey.registerComponent({
    componentType : 'accordion',
    componentClass: 'accordion',
    enhance       : enhance
  });

}(window.ChopSuey));
