(function (ChopSuey) {
  'use strict';

  var
    build   = require('./build.src.js'),
    enhance = require('./enhance.src.js');

  ChopSuey.registerComponent({
    componentType : 'dropDown',
    componentClass: 'drop-down',
    build         : build,
    enhance       : enhance
  });

}(window.ChopSuey));
