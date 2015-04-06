'use strict';

var config         = require('../config'),
    handleErrors   = require('../util/errors'),
    gulp           = require('gulp'),
    concat       = require('gulp-concat'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('components:test-js', function () {

  return gulp.src(config.components.test.js.src)
    .pipe(concat('components-test.js'))
    .pipe(gulp.dest(config.components.test.js.dest));

});

gulp.task('components:test-css', function () {

  return gulp.src(config.components.test.css.src)
    .pipe(concat('components-test.css'))
    .pipe(gulp.dest(config.components.test.css.dest));

});

gulp.task('library:test-js', function () {

  return gulp.src(config.library.test.src)
    .pipe(concat('library-test.js'))
    .pipe(gulp.dest(config.library.test.dest));

});

gulp.task('test', ['library:test-js', 'components:test-js', 'components:test-css'], function () {
  return gulp.src('test/index.html')
    .pipe(mochaPhantomJS({
      useColors: true
    }));
});
