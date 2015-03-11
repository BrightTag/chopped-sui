'use strict';

var config         = require('../config'),
    handleErrors   = require('../util/errors'),
    gulp           = require('gulp'),
    concat       = require('gulp-concat'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('components:test-build', function () {

  return gulp.src(config.components.test.src)
    .pipe(concat('components-test.js'))
    .pipe(gulp.dest(config.components.test.dest));

});

gulp.task('library:test-build', function () {

  return gulp.src(config.library.test.src)
    .pipe(concat('library-test.js'))
    .pipe(gulp.dest(config.library.test.dest));

});

gulp.task('test', ['library:test-build', 'components:test-build'], function () {
  return gulp.src('test/index.html')
    .pipe(mochaPhantomJS());
});
