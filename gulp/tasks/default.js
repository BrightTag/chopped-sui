'use strict';

var gulp        = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function(callback) {

  callback = callback || function() {};

  runSequence(
    'clean',
    'lint',
    'library',
    'components',
    'demo',
    'clean:src',
    callback
  );

});
