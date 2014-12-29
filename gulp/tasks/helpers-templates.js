'use strict';

var config = require('../config'),
    gulp   = require('gulp'),
    rename = require('gulp-rename');

gulp.task('helpers:templates', function () {

  return gulp.src(config.components.templates.src)
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace(/\/templates/, '');
    }))
    .pipe(gulp.dest(config.components.templates.dest));

});
