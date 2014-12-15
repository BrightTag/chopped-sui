var
  del              = require('del'),
  exec             = require('child_process').exec,
  fs               = require('fs'),
  gulp             = require('gulp'),
  gulpautoprefixer = require('gulp-autoprefixer'),
  gulpbrowserfy    = require('gulp-browserify'),
  gulpconcat       = require('gulp-concat')
  gulpdeclare      = require('gulp-declare'),
  gulphandlebars   = require('gulp-handlebars'),
  gulpjade         = require('gulp-jade'),
  gulpjshint       = require('gulp-jshint'),
  gulpminifycss    = require('gulp-minify-css'),
  gulpnotify       = require('gulp-notify'),
  gulprename       = require('gulp-rename'),
  gulpreplace      = require('gulp-replace'),
  gulprubysass     = require('gulp-ruby-sass'),
  gulpuglify       = require('gulp-uglify'),
  gulpwrap         = require('gulp-wrap'),
  jade             = require('jade'),
  jshintstylish    = require('jshint-stylish'),
  runsequence      = require('run-sequence');

gulp.task('module-css', function () {
  return gulp.src('src/modules/**/*.scss')
    .pipe(gulprubysass({
      bundleExec: true,
      style: 'expanded',
      'sourcemap=none': true
    }))
    .on('error', gulpnotify.onError(function (error) {
      return '\n\n✗ Module CSS - SASS Error\n  ' + error.message + '\n';
    }))
    .pipe(gulpautoprefixer(
      'last 2 version',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ))
    .on('error', gulpnotify.onError(function (error) {
      return '\n\n✗ Module CSS - Autoprefixer Error\n  ' + error.message + '\n';
    }))
    .pipe(gulpconcat('modules.css'))
    .pipe(gulp.dest('dist/modules/css'))
    .pipe(gulprename({
      suffix: '.min'
    }))
    .pipe(gulpminifycss())
    .on('error', gulpnotify.onError(function (error) {
      return '\n\n✗ Module CSS - Minify CSS Error\n  ' + error.message + '\n';
    }))
    .pipe(gulp.dest('dist/modules/css'));
});

gulp.task('module-js', function () {
  return gulp.src(['src/modules/templates.js',
                   'src/modules/**/js/*.js'])
    .pipe(gulpconcat('modules.js'))
    // .pipe(gulpreplace(/'TEMPLATE:([^']+)'/g, function(s, filename) {
    //   return fs.readFileSync('src/modules/' + filename + '.min.js', 'utf8');
    // }))
    // .on('error', gulpnotify.onError(function (error) {
    //   return '\n\n✗ Module JS - Template Replace Error\n  ' + error.message + '\n';
    // }))
    .pipe(gulp.dest('dist/modules/js'))
    .pipe(gulprename({
      suffix: '.min'
    }))
    .pipe(gulpuglify())
    .on('error', gulpnotify.onError(function (error) {
      return '\n\n✗ Module JS - Uglify Error\n  ' + error.message + '\n';
    }))
    .pipe(gulp.dest('dist/modules/js'));
});

gulp.task('module-templates', function () {
   return gulp.src('src/modules/**/*.mustache')
    .pipe(gulphandlebars())
    .pipe(gulpwrap('Handlebars.template(<%= contents %>)'))
    .pipe(gulpdeclare({
      namespace: 'SignalUI.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(gulpconcat('templates.js'))
    .pipe(gulp.dest('src/modules/'));
});

gulp.task('lint-js', function () {
  return gulp.src('src/**/*.js')
    .pipe(gulpjshint({
      'browser'  : true,
      'camelcase': true,
      'curly'    : true,
      'eqeqeq'   : true,
      'eqnull'   : true,
      'es3'      : true,
      'expr'     : true,
      'forin'    : true,
      'freeze'   : true,
      'immed'    : true,
      'indent'   : 2,
      'latedef'  : true,
      'newcap'   : true,
      'noarg'    : true,
      'noempty'  : true,
      'nonbsp'   : true,
      'nonew'    : true,
      'onevar'   : true,
      'plusplus' : true,
      'quotmark' : 'single',
      'strict'   : true,
      'trailing' : true,
      'undef'    : true,
      'unused'   : true
    }))
    .pipe(gulpjshint.reporter(jshintstylish))
    .pipe(gulpjshint.reporter('fail'))
    .on('error', gulpnotify.onError(function (error) {
      return '\n\n✗ Lint JS - JSHint Failed\n';
    }));
});

gulp.task('library-js', function () {
  return gulp.src([
      'lib/handlebars.runtime-v2.0.0.js',
      'src/library/*.js'
    ])
    .pipe(gulpconcat('signal-ui.js'))
    .pipe(gulp.dest('dist/library'))
    .pipe(gulprename({
      suffix: '.min'
    }))
    .pipe(gulpuglify())
    .on('error', gulpnotify.onError(function (error) {
      return '\n\n✗ Library JS - Uglify Error\n  ' + error.message + '\n';
    }))
    .pipe(gulp.dest('dist/library'));
});

gulp.task('demo-library-js', function() {
  return gulp.src('dist/library/signal-ui.js')
    .pipe(gulp.dest('demo/js'))
});

gulp.task('demo-module-js', function() {
  return gulp.src('dist/modules/js/modules.js')
    .pipe(gulp.dest('demo/js'))
});

gulp.task('demo-module-css', function() {
  return gulp.src('dist/modules/css/modules.css')
    .pipe(gulp.dest('demo/css'))
});

gulp.task('clean-all', function(cb) {
  del([
    'demo/js',
    'demo/css',
    'dist',
    'dist/modules/css',
    'dist/modules/js',
    'src/modules/**/templates/*.js',
    'src/modules/templates.js'
  ], cb);
});

gulp.task('clean-build', function(cb) {
  del([
    'src/modules/**/templates/*.js',
    'src/modules/templates.js'
  ], cb);
});

gulp.task('local-demo', function (callback) {
  exec('node_modules/.bin/http-server demo');
  console.log('Serving Signal UI Component Demo at http://localhost:8080/');
});

gulp.task('default', function () {
  runsequence(
    'clean-all',
    'lint-js',
    'module-templates',
    [
      'module-css',
      'module-js',
      'library-js'
    ],
    [
      'demo-module-css',
      'demo-module-js',
      'demo-library-js'
    ],
    'clean-build'
  )
});

