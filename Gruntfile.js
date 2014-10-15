/*global module */
module.exports = function(grunt) {

    // 'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: '*',
                    base: '.',
                    open: true,
                    // keepalive: true, // Should be disabled when 'watch' is connected
                    // livereload: true // Not needed when defined in watch task
                }
            }
        },

        watch: {
            options: {
                livereload: true,
                reload: true
            },
            html: {
                files: ['**/*.html']
            },
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['sass:development']
            },
            js: {
                files: ['javascript/**']
            },
        },

        sass: {
            development: {
                options: {
                    sourcemap: false
                },
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            },
            // 'banner' and 'sourcemap' cannot run together
            // run as `grunt sass:production`
            production: {
                options: {
                    banner: '/*! <%= pkg.name %> v.<%= pkg.version %> by <%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n',
                },
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },

        clean: {
            css: ['css']
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc',
            },
            src: 'css/**/*.css'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            src: 'javascript/**/*.js' // without .js folders are counted too
        },

        /*
            Not discussed during workshop
            This example copies the entire "javascript" directory to
            a new created folder "dest"
        */
        copy: {
            main: {
                expand: true,
                cwd: 'javascript/',
                src: '**',
                dest: 'dest/',
                flatten: true,
                filter: 'isFile',
                // mode: 0777
            },
        },

    });

    /* Load tasks*/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /* Registered tasks */
    // The default task can be called from command line by just `grunt`.
    // In this case it calls the next task, so it's the same as calling `grunt test`.
    grunt.registerTask('default', ['test']);

    // Run `grunt test` to activate the tasks that run tests on your site
    grunt.registerTask('test', ['clean', 'sass:development', 'csslint', 'jshint']);

    // Run `grunt serve` to start a local web server
    grunt.registerTask('serve', ['clean', 'sass:development', 'connect', 'watch']);
};
