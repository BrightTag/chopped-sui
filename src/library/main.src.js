(function (window) {
  'use strict';

  var
    registerComponent    = require('./methods/register-component.src.js'),
    registeredComponents = require('./methods/registered-components.src.js'),
    initializeComponent  = require('./methods/initialize-component.src.js'),
    ChopSuey;

  // ChopSuey namespace
  ChopSuey = {
    registeredComponents: registeredComponents,
    initializeComponent : initializeComponent,
    registerComponent   : registerComponent
  };

  window.ChopSuey = ChopSuey;
}(window));
