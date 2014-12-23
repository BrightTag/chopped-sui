'use strict';

var config = {

  root: 'src',

  css: {
    src: 'src/components/**/*.scss',
    dest: 'dist/components/css'
  },

  js: {
    src: [
      'src/components/templates.js',
      'src/components/**/js/*.js'
    ],
    dest: 'dist/components/js'
  },

  components: {
    src: 'src/components/',
    dest: 'src/components/',
    php: {
      src: 'gulp/resources/php-helper.mustache',
      dest: 'dist/helpers/php/'
    }
  },

  templates: {
    src: 'src/components/**/*.mustache',
    dest: 'src/components/',
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

    js: {
      src: '',
      dest: 'demo/js'
    },

    css: {
      src: '',
      dest: 'demo/css'
    }

  }

}

module.exports = config;
