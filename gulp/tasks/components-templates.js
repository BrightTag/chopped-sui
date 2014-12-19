'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    replace      = require('gulp-replace'),
    hogan        = require('gulp-hogan-compile');

gulp.task('components:templates', function () {

  return gulp.src(config.templates.src)
    .pipe(hogan('templates.js', {
      wrapper: false
    }))
    .pipe(replace(/var templates = \{\};/g, 'SignalUI.templates = {};'))
    .pipe(replace(/templates\['[^\/]+\/templates\//g, 'SignalUI.templates[\''))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.templates.dest));

});
