'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    csso         = require('gulp-csso');

gulp.task('components:css', [
  'components:css:min'
]);

gulp.task('components:css:compile', function () {

  return gulp.src( config.css.src )
    .pipe(sass({
      bundleExec: true,
      style: 'expanded',
      'sourcemap=none': true,
      quiet: true
    }))
    .on('error', handleErrors)
    .pipe(concat('components.css'))
    .pipe(gulp.dest(config.css.dest))

});

gulp.task('components:css:prefix', ['components:css:compile'], function () {

  return gulp.src(config.css.dest +'/**/*.css')
    .pipe(autoPrefixer(config.autoPrefixer))
    .on('error', handleErrors)

});

gulp.task('components:css:min', ['components:css:prefix'], function () {

  return gulp.src(config.css.dest +'/**/*.css')
    .pipe(csso())
    .on('error', handleErrors)
    .pipe(rename({
      suffix: '.min'
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.css.dest));

});
