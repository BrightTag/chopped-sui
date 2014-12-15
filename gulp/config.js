'use strict';

var config = {

  root: 'src',

  css: {
    src: 'src/modules/**/*.scss',
    dest: 'dist/modules/css'
  },

  js: {
    src: [
      'src/modules/templates.js',
      'src/modules/**/js/*.js'
    ],
    dest: 'dist/modules/js'
  },

  templates: {
    src: 'src/modules/**/*.mustache',
    dest: 'src/modules/',
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
