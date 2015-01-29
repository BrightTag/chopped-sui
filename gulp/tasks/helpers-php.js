'use strict';

var config       = require('../config'),
    handleErrors = require('../util/errors'),
    fs           = require('fs'),
    gulp         = require('gulp'),
    hogan        = require('gulp-hogan'),
    replace      = require('gulp-replace'),
    rename       = require('gulp-rename'),
    files        = fs.readdirSync(config.helpers.components),
    hoganData    = { components: [] };

files.forEach(function(file){
  if (!/^\./.test(file)) {
    hoganData.components.push({
      'file': file,
      'dir': file,
      'name': file.replace(/-([a-z])/g, function (full, uppercase) {
        return uppercase.toUpperCase();
      })
    });
  }
});

gulp.task('helpers:php', function () {

  return gulp.src(config.components.php.src)
    .pipe(hogan(hoganData))
    .pipe(rename('chop-suey.php'))
    .pipe(gulp.dest(config.components.php.dest));

});
