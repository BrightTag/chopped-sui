'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify');

gulp.task('library', [
  'library:js'
]);

gulp.task('library:js', function () {

  return gulp.src([
      // @todo use bower for managing client dependencies
      'node_modules/gulp-handlebars/node_modules/handlebars/dist/handlebars.runtime.js',
      'src/library/*.js'
    ])
    .pipe(concat('signal-ui.js'))
    .pipe(gulp.dest('dist/library'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(gulp.dest('dist/library'));

});
