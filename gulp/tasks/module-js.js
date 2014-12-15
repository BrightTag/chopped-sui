'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    replace      = require('gulp-replace'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify');

gulp.task('module:js', ['module:templates'], function () {

  return gulp.src(config.js.src)
    .pipe(concat('modules.js'))
    // .pipe(replace(config.templates.pattern, function(s, filename) {
    //   return fs.readFileSync('src/modules/' + filename + '.min.js', 'utf8');
    // }))
    // .on('error', handleErrors)
    .pipe(gulp.dest(config.js.dest))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.js.dest));

});
