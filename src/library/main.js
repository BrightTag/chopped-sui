(function (window) {

  'use strict';

  var
    registerComponent    = require('./register-component'),
    registeredComponents = require('./registered-components'),
    initializeComponent  = require('./initialize-component'),
    ChoppedSUI;

  // ChoppedSUI namespace
  ChoppedSUI = {

    registeredComponents: registeredComponents,
    initializeComponent : initializeComponent,
    registerComponent   : registerComponent
  };

  window.ChoppedSUI = ChoppedSUI;

}(window));
