'use strict';

var config = require('../config'),
    gulp   = require('gulp');

gulp.task('module', [
  'module:css',
  'module:js'
]);
