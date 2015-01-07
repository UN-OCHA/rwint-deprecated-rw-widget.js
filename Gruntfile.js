'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-contrib-*', 'grunt-mocha-test', 'grunt-watchify']});

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/**/*.js',
        '!src/components/heatmap/heatmap.js' // Ignoring until we refactor to use widgets library
      ]
    },
    mochaTest: {
      dist: {
        src: ['spec/*.js']
      }
    },
    watch: {
      dist: {
        files: './dist/reliefweb-widgets.js',
        tasks: ['jshint:all']
      },
      myhint: {
        files: ['src/*.js'],
        tasks: ['jshint:all']
      }
    },
    watchify: {
      dist: {
        src: './src/**/*.js',
        dest: './dist/reliefweb-widgets.js'
      }
    }
  });

  grunt.registerTask('test', ['mochaTest:dist']);
  grunt.registerTask('default', ['watchify:dist', 'watch:dist']);
};
