(function (window) {

  'use strict';

  var
    registerComponent    = require('./methods/register-component'),
    registeredComponents = require('./methods/registered-components'),
    initializeComponent  = require('./methods/initialize-component'),
    ChopSuey;

  // ChopSuey namespace
  ChopSuey = {

    registeredComponents: registeredComponents,
    initializeComponent : initializeComponent,
    registerComponent   : registerComponent
  };

  window.ChopSuey = ChopSuey;

}(window));
