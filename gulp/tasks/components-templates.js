'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    replace      = require('gulp-replace'),
    hogan        = require('gulp-hogan-compile');

gulp.task('components:templates', ['components:build'], function () {

  return gulp.src(config.templates.src)
    .pipe(hogan('templates-build.js', {
      wrapper: false
    }))
    .pipe(replace(/var templates = \{\};/g, 'ChoppedSUI.templates = {};'))
    .pipe(replace(/templates\['[^\/]+\/templates\//g, 'ChoppedSUI.templates[\''))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.templates.dest));

});
