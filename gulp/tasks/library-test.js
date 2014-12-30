'use strict';

var config       = require('../config'),
    gulp         = require('gulp'),
    jasmine      = require('gulp-jasmine');

gulp.task('library:test', function () {

  return gulp.src('src/library/spec/*.js')
    .pipe(jasmine());

});
