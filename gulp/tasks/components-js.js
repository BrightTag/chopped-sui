'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    stripCode    = require('gulp-strip-code'),
    uglify       = require('gulp-uglify');

gulp.task('components:js', ['components:build', 'components:templates'], function () {

  return gulp.src(config.components.src)
    .pipe(concat('components.js'))
    .pipe(gulp.dest(config.components.test.dest))
    .pipe(stripCode({
      start_comment: "expose",
      end_comment: "end-expose"
    }))
    .pipe(gulp.dest(config.js.dest))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.js.dest));

});
