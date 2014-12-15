'use strict';

var config = require('../config'),
    gulp   = require('gulp');

gulp.task('watch', function() {

  gulp.watch('src/modules/**/*.scss', ['module:css']);
  gulp.watch(['src/modules/templates.js', 'src/modules/**/js/*.js'], ['module:js']);
  gulp.watch('src/modules/**/*.mustache', ['module:templates']);
  gulp.watch('src/**/*.js', ['lint:js']);
  gulp.watch('node_modules/gulp-handlebars/node_modules/handlebars/dist/handlebars.runtime.js', ['library:js']);
  gulp.watch('src/library/*.js', ['library:js']);
  gulp.watch('dist/library/signal-ui.js', ['demo:js:library']);
  gulp.watch('dist/modules/js/modules.js', ['demo:js:module']);
  gulp.watch('dist/modules/css/modules.css', ['demo:css']);

});
