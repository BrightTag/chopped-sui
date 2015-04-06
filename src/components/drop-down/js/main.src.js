(function (ChopSuey) {
  'use strict';

  var
    /* expose */
    handleComponentKeydown = require('./enhance/handle-component-keydown.src.js'),
    /* end-expose */
    build     = require('./build.src.js'),
    enhance   = require('./enhance.src.js');

  ChopSuey.registerComponent({
    componentType : 'dropDown',
    componentClass: 'drop-down',
    build         : build,
    enhance       : enhance
  });
  /* expose */
  ChopSuey._private = ChopSuey._private || {};
  ChopSuey._private.Dropdown = {
    handleComponentKeydown: handleComponentKeydown
  };
  /* end-expose */

}(window.ChopSuey));
