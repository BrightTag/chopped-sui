/* jslint node: true */
/* global describe, it, expect */

'use strict';

var chopSuey = require('../chop-suey.js');

describe('#window.ChopSuey', function () {
  it('is an object', function () {
    expect(window.ChopSuey).toEqual(jasmine.any(Object));
  });
});
