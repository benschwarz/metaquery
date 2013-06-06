module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    min: {
      dist: {
        src: ['metaquery.js'],
        dest: 'metaquery.min.js'
      },

      distjq: {
        src: ['metaquery.jquery.js'],
        dest: 'metaquery.jquery.min.js'
      }
    },
    qunit: {
      all: ['test/*.html']
    },
    lint: {
      files: ['metaquery.js, metaquery.jquery.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'jshint test'
    },
    jshint: {
      all: ['Gruntfile.js', 'metaquery.js', 'metaquery.jquery.js']
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', ['qunit', 'jshint', 'min']);

  grunt.registerTask('travis', 'lint qunit');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
