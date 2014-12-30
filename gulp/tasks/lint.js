'use strict';

var config        = require('../config'),
    handleErrors  = require('../util/errors'),
    fs            = require('fs'),
    gulp          = require('gulp'),
    jshint        = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    concat        = require('gulp-concat'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify');

gulp.task('lint', [
  'lint:js'
]);

gulp.task('lint:js', function () {

  return gulp.src(config.js.src)
    .pipe(jshint({ 'browserify': true }))
    .pipe(jshint.reporter(jshintStylish))
    .pipe(jshint.reporter('fail'))
    .on('error', handleErrors);

});
