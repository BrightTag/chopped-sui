'use strict';

var config = {

  root: 'src',

  css: {

    src: 'src/components/**/*.scss',
    dest: 'dist/css'

  },

  js: {

    src: [
      'src/components/templates.js',
      'src/components/**/js/*.js'
    ],

    dest: 'dist/js'

  },

  library: {

    build: {

      src: 'src/library/main.js',
      dest: 'dist/js'

    },

    src: [
      // @todo use bower for managing client dependencies
      'gulp/resources/EventListener.js', //https://github.com/jonathantneal/EventListener/blob/master/EventListener.js
      'dist/js/library-build.js',
      'node_modules/gulp-hogan-compile/node_modules/hogan.js/dist/hogan-3.0.2.mustache.js'
    ],

    dest: 'dist/js'

  },

  helpers: {

    components: 'src/components'

  },

  components: {

    src: [
      'dist/js/templates-build.js',
      'dist/js/components-build.js'
    ],
    dest: 'dist/js',

    lint: {
      src: 'src/components/**/*.js'
    },

    build: {
      src: 'src/components/*/js/main.js'
    },

    php: {
      src: 'gulp/resources/php-helper.mustache',
      dest: 'dist/helpers/php/'
    },

    templates: {
      src: 'src/components/**/*.mustache',
      dest: 'dist/helpers/templates/'
    }

  },

  templates: {

    src: 'src/components/**/*.mustache',
    dest: 'dist/js',
    pattern: /'TEMPLATE:([^']+)'/g

  },

  autoPrefixer: [
    'last 2 version',
    'safari 5',
    'ie 8',
    'ie 9',
    'opera 12.1',
    'ios 6',
    'android 4'
  ],

  dist: {

    root: 'dist',

    css: {
      src : 'components/**/*.scss',
      dest: 'build/css'
    },

    js: {
      src : 'components/**/*.js',
      dest: 'build/js'
    },

  },

  demo: {

    serverport: '3002',
    root: 'demo',

    html: {
      src : 'gulp/resources/demo.html',
      dest: 'demo'
    },

    js: {
      src : 'dist/js/*.js',
      dest: 'demo/js'
    },

    css: {
      src : 'dist/css/*.css',
      dest: 'demo/css'
    }

  }

}

module.exports = config;
