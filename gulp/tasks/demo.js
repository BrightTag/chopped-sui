'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    concat       = require('gulp-concat');

gulp.task('demo', [
  'demo:css',
  'demo:js:library',
  'demo:js:components'
]);

gulp.task('demo:js:library', function() {

  return gulp.src('dist/library/signal-ui.js')
    .pipe(gulp.dest('demo/js'))

});

gulp.task('demo:js:components', function() {

  return gulp.src('dist/components/js/components.js')
    .pipe(gulp.dest('demo/js'))

});

gulp.task('demo:css', function() {

  return gulp.src('dist/components/css/components.css')
    .pipe(gulp.dest('demo/css'))

});
