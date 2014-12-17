'use strict';

var config = require('../config'),
    gulp   = require('gulp');

gulp.task('watch', function() {

  gulp.watch('src/components/**/*.scss', ['component:css']);
  gulp.watch(['src/components/templates.js', 'src/components/**/js/*.js'], ['components:js']);
  gulp.watch('src/components/**/*.mustache', ['component:templates']);
  gulp.watch('src/**/*.js', ['lint:js']);
  gulp.watch('node_components/gulp-handlebars/node_components/handlebars/dist/handlebars.runtime.js', ['library:js']);
  gulp.watch('src/library/*.js', ['library:js']);
  gulp.watch('dist/library/signal-ui.js', ['demo:js:library']);
  gulp.watch('dist/components/js/components.js', ['demo:js:components']);
  gulp.watch('dist/components/css/components.css', ['demo:css']);

});
