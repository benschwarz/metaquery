module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    qunit: {
      all: ['test/*.html']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'jshint test'
    },
    jshint: {
      all: ['Gruntfile.js', 'metaquery.js']
    },
    uglify: {
      options: {
        report: 'gzip'
      },
      std: {
        files: {
          'metaquery.min.js' : 'metaquery.js',
          'metaquery-images.min.js' : 'metaquery-images.js'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);

  grunt.registerTask('travis', ['jshint', 'qunit']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
