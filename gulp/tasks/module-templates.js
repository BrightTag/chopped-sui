'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    hbs          = require('gulp-handlebars'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    replace      = require('gulp-replace'),
    uglify       = require('gulp-uglify'),
    wrap         = require('gulp-wrap'),
    declare      = require('gulp-declare');

gulp.task('module:templates', function () {

  return gulp.src(config.templates.src)
    .pipe(hbs())
    .on('error', handleErrors)
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'SignalUI.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(replace(/Handlebars/g, 'SignalUI.Handlebars'))
    .pipe(gulp.dest(config.templates.dest))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(config.templates.dest));

});
