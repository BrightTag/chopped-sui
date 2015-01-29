(function (window) {

  'use strict';

  var
    registerComponent    = require('./register-component'),
    registeredComponents = require('./registered-components'),
    initializeComponent  = require('./initialize-component'),
    ChopSuey;

  // ChopSuey namespace
  ChopSuey = {

    registeredComponents: registeredComponents,
    initializeComponent : initializeComponent,
    registerComponent   : registerComponent
  };

  window.ChopSuey = ChopSuey;

}(window));
