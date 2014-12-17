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
      'node_modules/ie8/build/ie8.js',
      'src/library/*.js',
      'node_modules/gulp-handlebars/node_modules/handlebars/dist/handlebars.runtime.js'
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
