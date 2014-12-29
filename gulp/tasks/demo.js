'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename');

gulp.task('demo', [
  'demo:html',
  'demo:css',
  'demo:js'
]);

gulp.task('demo:js', function() {

  return gulp.src(config.demo.js.src)
    .pipe(gulp.dest(config.demo.js.dest))

});

gulp.task('demo:css', function() {

  return gulp.src(config.demo.css.src)
    .pipe(gulp.dest(config.demo.css.dest))

});

gulp.task('demo:html', function() {

  return gulp.src(config.demo.html.src)
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.demo.html.dest))

})
