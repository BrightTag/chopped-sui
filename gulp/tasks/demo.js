'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    concat       = require('gulp-concat');

gulp.task('demo', [
  'demo:css',
  'demo:js:library',
  'demo:js:module'
]);

gulp.task('demo:js:library', function() {

  return gulp.src('dist/library/signal-ui.js')
    .pipe(gulp.dest('demo/js'))

});

gulp.task('demo:js:module', function() {

  return gulp.src('dist/modules/js/modules.js')
    .pipe(gulp.dest('demo/js'))

});

gulp.task('demo:css', function() {

  return gulp.src('dist/modules/css/modules.css')
    .pipe(gulp.dest('demo/css'))

});
