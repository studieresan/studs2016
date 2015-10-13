module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
     build: ['Grunfile.js', 'client/js/**/*.js', 'server/**/*.js']
   },

   uglify: {
    options: {
      banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
    },

    build: {
      files: {
        'client/js/main.min.js': 'client/js/**/*.js'
      }
    }
  },

  less: {
    build: {
      files: {
        'client/css/main.css': "client/less/**/*.less"
      }
    }
  },

  watch: {
    less: {
      files: ['client/less/**/*.less'],
      tasks: ['less']
    },
    js_server: {
      files: ['server/**/*.js'],
      tasks: ['jshint']
    },
    js_client: {
      files: ['client/js/**/*.js'],
      tasks: ['jshint', 'uglify']
    }
  }
});

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'less']); 
};