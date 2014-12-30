'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    browserify   = require('gulp-browserify'),
    rename       = require('gulp-rename');

gulp.task('library:build', function () {

  return gulp.src(config.library.build.src)
    .pipe(browserify())
    .on('error', handleErrors)
    .pipe(rename('library-build.js'))
    .pipe(gulp.dest(config.library.build.dest));

});
