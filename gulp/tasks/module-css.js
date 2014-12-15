'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    csso         = require('gulp-csso');

gulp.task('module:css', [
  'module:css:min'
]);

gulp.task('module:css:compile', function () {

  return gulp.src( config.css.src )
    .pipe(sass({
      bundleExec: true,
      style: 'expanded',
      'sourcemap=none': true
    }))
    .on('error', handleErrors)
    .pipe(concat('modules.css'))
    .pipe(gulp.dest(config.css.dest))

});

gulp.task('module:css:prefix', ['module:css:compile'], function () {

  return gulp.src(config.css.dest +'/**/*.css')
    .pipe(autoPrefixer(config.autoPrefixer))
    .on('error', handleErrors)

});

gulp.task('module:css:min', ['module:css:prefix'], function () {

  return gulp.src(config.css.dest +'/**/*.css')
    .pipe(csso())
    .on('error', handleErrors)
    .pipe(rename({
      suffix: '.min'
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.css.dest));

});
