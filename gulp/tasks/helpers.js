'use strict';

var config = require('../config'),
    gulp   = require('gulp');

gulp.task('helpers', [
  'helpers:templates',
  'helpers:php'
]);
