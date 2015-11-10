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
                dest: './client/public/js/libs.min.js'
            }
        },

        jshint: {
            options: {
                expr: true
            },
            build: ['Grunfile.js', 'client/js/**/*.js', 'server/**/*.js']
        },

        jade: {
            compile: {
                options: {
                    data: {
                        debug: true
                    }
                },
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: './client/views',
                        src: ['**/*.jade'],
                        dest: './client/public/views',
                        ext: '.html'
                    }
                ]
            }
        },

        uglify: {
            build: {
                options: {
                    banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                    sourceMap: true
                },
                files: {
                    'client/public/js/main.min.js': ['client/js/app.js', 'client/js/**/*.js']
                }
            }

        },

        less: {
            build: {
                files: {
                    'client/public/css/main.min.css': "client/less/build.less"
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
                dest: 'client/public/img'
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
            jade: {
                files: ['client/views/**/*.jade'],
                tasks: ['jade']
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
grunt.loadNpmTasks('grunt-contrib-jade');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-newer');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['jshint', 'uglify', 'jade', 'less', 'concat', 'imagemin']);

};
