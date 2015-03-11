'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    stripCode     = require('gulp-strip-code'),
    uglify       = require('gulp-uglify');

gulp.task('library:js', ['library:build'], function () {

  return gulp.src(config.library.src)
    .pipe(concat('chop-suey.js'))
    .pipe(gulp.dest(config.library.test.dest))
    .pipe(stripCode({
      start_comment: "expose",
      end_comment: "end-expose"
    }))
    .pipe(gulp.dest(config.library.dest))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.library.dest));

});
