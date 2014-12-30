'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    browserify   = require('gulp-browserify'),
    replace      = require('gulp-replace'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    transform    = require('vinyl-transform');

gulp.task('components:js', ['components:build', 'components:templates'], function () {

  return gulp.src(config.components.src)
    .pipe(concat('components.js'))
    .pipe(gulp.dest(config.js.dest))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.js.dest));

});
