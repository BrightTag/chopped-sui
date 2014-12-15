'use strict';

var config  = require('../config'),
    gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('start:demo', function (callback) {

  connect.server({
    root: config.demo.root,
    port: config.demo.serverport
  });

});
