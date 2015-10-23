module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            js_client: {
                src: [
                    './bower_components/angular/angular.min.js',
                    './bower_components/jquery/dist/jquery.min.js'
                ],
                dest: './client/dist/js/libs.min.js'
            }
        },

        jshint: {
            build: ['Grunfile.js', 'client/js/**/*.js', 'server/**/*.js']
        },

        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },

            build: {
                files: {
                    'client/dist/js/main.min.js': 'client/js/**/*.js'
                }
            }
        },

        less: {
            build: {
                files: {
                    'client/dist/css/main.min.css': "client/less/build.less"
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
                tasks: ['jshint', 'uglify', 'concat:js_client']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'uglify', 'less', 'concat']);

};
