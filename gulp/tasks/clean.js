'use strict';

var config = require('../config'),
    gulp   = require('gulp'),
    del    = require('del');

gulp.task('clean', [
  'clean:demo',
  'clean:dist',
  'clean:build'
]);

gulp.task('clean:demo', function(callback) {

  del([
    config.demo.js.dest,
    config.demo.css.dest
  ], callback);

});

gulp.task('clean:dist', function(callback) {

  del([
    config.dist.root
  ], callback);

});

gulp.task('clean:build', function(callback) {

  del([
    'dist/js/*build.js',
    'demo/js/*build.js'
  ], callback);

});
