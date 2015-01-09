'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-contrib-*', 'grunt-mocha-test', 'grunt-browserify']});

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
        src: ['spec/*.js', 'spec/**/*.js']
      }
    },
    watch: {
      dist: {
        files: ['src/*.js', 'src/**/*.js'],
        tasks: ['jshint:all', 'mochaTest:dist', 'browserify:dist']
      }
    },
    browserify: {
      options: {},
      dist: {
        src: './src/**/*.js',
        dest: './dist/reliefweb-widgets.js'
      }
    }
  });

  grunt.registerTask('default', ['watch:dist']);
  grunt.registerTask('test', ['mochaTest:dist']);
  grunt.registerTask('lint', ['jshint:all']);
  grunt.registerTask('build', ['browserify:dist']);
};
