'use strict';

var config = require('../config'),
    gulp   = require('gulp');

gulp.task('components', [
  'components:css',
  'components:templates',
  'components:build',
  'components:js'
]);
