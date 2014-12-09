'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically. Manually load grunt-contrib-jasmine, because it
  // doesn't like being loaded this way for some reason.
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-contrib-*', '!grunt-contrib-jasmine']});
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    jasmine: {
      default: {
        src: 'src/*.js',
        options: {
          specs: 'spec/*.spec.js',
          vendor: [
            'bower_components/d3/d3.js',
            'bower_components/moment/moment.js',
            'bower_components/handlebars/handlebars.js',
            'bower_components/lodash/dist/lodash.js',
            'lib/reliefweb/node_modules/superagent/superagent.js',
            'lib/reliefweb/lib/reliefweb.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['serve']);
};
