module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';\n'
            },
            js_client: {
                src: [
                './bower_components/lodash/lodash.min.js',
                './bower_components/angular/angular.min.js',
                './bower_components/angular-route/angular-route.min.js',
                './bower_components/jquery/dist/jquery.min.js',
                './bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
                './bower_components/angular-google-maps/dist/angular-google-maps.min.js',
                ],
                dest: './client/dist/js/libs.min.js'
            }
        },

        jshint: {
            options: {
                expr: true
            },
            build: ['Grunfile.js', 'client/js/**/*.js', 'server/**/*.js']
        },

        uglify: {
            build: {
                options: {
                    banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                    sourceMap: true
                },
                files: {
                    'client/dist/js/main.min.js': ['client/js/app.js', 'client/js/**/*.js']
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

        imagemin: {
            dynamic: {                         
              files: 
              [{
                expand: true,                  
                cwd: 'client/img',                   
                src: ['**/*.{png,jpg,gif,svg}'],   
                dest: 'client/dist/img'                 
            }]}
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
            },
            imagemin: {
                files: ['client/img/**/*'],
                tasks: ['imagemin']
            }
        }
    });

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-newer');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['jshint', 'uglify', 'less', 'concat', 'imagemin']);

};
