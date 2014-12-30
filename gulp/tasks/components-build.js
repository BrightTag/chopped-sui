'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    browserify   = require('gulp-browserify'),
    concat       = require('gulp-concat');

gulp.task('components:build', function () {

  return gulp.src(config.components.build.src)
    .pipe(browserify())
    .on('error', handleErrors)
    .pipe(concat('components-build.js'))
    .pipe(gulp.dest(config.js.dest));

});
