'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    replace      = require('gulp-replace'),
    rename       = require('gulp-rename'),
    hogan        = require('gulp-hogan-compile');

gulp.task('components:templates:dist', function () {
  return gulp.src(config.templates.src)
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace(/\/templates/, '');
    }))
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('components:templates', ['components:build', 'components:templates:dist'], function () {

  return gulp.src(config.templates.src)
    .pipe(hogan('templates-build.js', {
      wrapper: false
    }))
    .pipe(replace(/var templates = \{\};/g, 'ChopSuey.templates = {};'))
    .pipe(replace(/templates\['[^\/]+\/templates\//g, 'ChopSuey.templates[\''))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.templates.dest));

});
