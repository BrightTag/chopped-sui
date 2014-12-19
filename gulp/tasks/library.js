'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    replace      = require('gulp-replace'),
    uglify       = require('gulp-uglify');

gulp.task('library', [
  'library:js'
]);

gulp.task('library:js', function () {

  return gulp.src([
      // @todo use bower for managing client dependencies
      'lib/EventListener.js', //https://github.com/jonathantneal/EventListener/blob/master/EventListener.js
      'src/library/*.js',
      'node_modules/gulp-hogan-compile/node_modules/hogan.js/dist/hogan-3.0.2.mustache.js'
    ])
    .pipe(concat('signal-ui.js'))
    .pipe(replace(/root\.Handlebars/g, 'root.SignalUI.Handlebars'))
    .pipe(gulp.dest('dist/library'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(gulp.dest('dist/library'));

});
