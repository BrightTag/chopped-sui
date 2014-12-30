/* jslint node: true */
/* global describe, it, expect */

'use strict';

var choppedSUI = require('../chopped-sui.js');

describe('#window.ChoppedSUI', function () {
  it('is an object', function () {
    expect(window.ChoppedSUI).toEqual(jasmine.any(Object));
  });
});
