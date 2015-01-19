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
        tasks: ['jshint:all', 'mochaTest:dist', 'browserify:dist', 'copy:base']
      }
    },
    browserify: {
      options: {
        browserifyOptions: {
          standalone: "ReliefwebWidgets"
        }
      },
      dist: {
        src: './src/reliefweb-widgets.js',
        dest: './dist/reliefweb-widgets.js'
      }
    },
    connect: {
      watch: {
        options: {
          base: 'example',
          port: 9000,
          open: true
        }
      },
      standalone: {
        options: {
          base: 'example',
          port: 9000,
          open: true,
          keepalive: true
        }
      }
    },
    copy: {
      base: {
        files: [
          {
            expand: true,
            src: 'dist/*',
            dest: 'example'
          },
          {
            expand: true,
            src: 'bower_components/**',
            dest: 'example'
          }
        ]
      }
    },
  });

  grunt.registerTask('default', ['connect:watch', 'watch:dist']);
  grunt.registerTask('test', ['mochaTest:dist']);
  grunt.registerTask('lint', ['jshint:all']);
  grunt.registerTask('build', ['browserify:dist']);
  grunt.registerTask('serve', ['copy:base', 'connect:standalone']);
};
