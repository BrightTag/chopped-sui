'use strict';

var config         = require('../config'),
    handleErrors   = require('../util/errors'),
    gulp           = require('gulp'),
    concat       = require('gulp-concat'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('test', function () {
  return gulp
  .src('test/runner.html')
  .pipe(mochaPhantomJS());
});

gulp.task('library:test-build', function () {

  return gulp.src(config.library.test.src)
    .pipe(concat('library-test.js'))
    .pipe(gulp.dest(config.library.test.dest));

});

gulp.task('library:test', ['library:test-build'], function () {
  return gulp
    .src('test/index.html')
    .pipe(mochaPhantomJS());
});
