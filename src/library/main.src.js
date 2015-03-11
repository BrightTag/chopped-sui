(function (window) {
  'use strict';

  var
    /* expose */
    Component               = require('./methods/component.src.js'),
    initializeAllOfType     = require('./methods/initialize-all-of-type.src.js'),
    initializeThisComponent = require('./methods/initialize-this-component.src.js'),
    /* end-expose */
    registerComponent    = require('./methods/register-component.src.js'),
    registeredComponents = require('./methods/registered-components.src.js'),
    initializeComponent  = require('./methods/initialize-component.src.js'),
    ChopSuey;

  // ChopSuey namespace
  ChopSuey = {
    /* expose */
    _private: {
      Component              : Component,
      initializeAllOfType    : initializeAllOfType,
      initializeThisComponent: initializeThisComponent
    },
    /* end-expose */
    registeredComponents: registeredComponents,
    initializeComponent : initializeComponent,
    registerComponent   : registerComponent
  };

  window.ChopSuey = ChopSuey;
}(window));
