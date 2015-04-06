(function (window) {
  'use strict';

  var
    /* expose */
    Component = require('./methods/component.src.js'),
    /* end-expose */
    registerComponent    = require('./methods/register-component.src.js'),
    registeredComponents = require('./methods/registered-components.src.js'),
    ChopSuey;

  // ChopSuey namespace
  ChopSuey = {
    /* expose */
    _Component: Component,
    /* end-expose */
    registeredComponents: registeredComponents,
    registerComponent   : registerComponent
  };

  window.ChopSuey = ChopSuey;
}(window));
