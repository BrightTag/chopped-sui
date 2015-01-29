(function (ChopSuey) {
  'use strict';

  var
    build   = require('./build'),
    enhance = require('./enhance');

  ChopSuey.registerComponent({
    componentType : 'dropDown',
    componentClass: 'drop-down',
    build         : build,
    enhance       : enhance
  });

}(window.ChopSuey));
