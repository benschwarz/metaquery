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
      all: ['metaquery.js', 'metaquery.jquery.js'],
      options: {
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "boss": true,
        "eqnull": true,
        "globals": {
          "jQuery": true,
          "document": true
        }
      }
    },
    uglify: {
      options: {
        report: 'gzip'
      },
      std: {
        files: {
          'metaquery.min.js' : 'metaquery.js',
          'metaquery.jquery.min.js' : 'metaquery.jquery.js'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);

  grunt.registerTask('travis', ['jshint', 'qunit']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
