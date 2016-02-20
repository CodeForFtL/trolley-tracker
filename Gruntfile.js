'use strict';
/**
 * @link https://github.com/jsoverson/grunt-env
 * @link https://github.com/pghalliday/grunt-mocha-test
 * @link https://github.com/gruntjs/grunt-contrib-watch
 * @link https://github.com/stephenplusplus/grunt-wiredep
 */

module.exports = function(grunt) {
    grunt.initConfig({
        env: {
            test: {
                NODE_ENV: 'test',
                PORT: 9000
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: ['mocha.conf.js'],
                    timeout: 5000, // Set default mocha spec timeout
                    clearRequireCache: true // "'mocha' loads your test using require resulting in them being added to the require cache"
                },
                src: ['server/**/*.spec.js']
            }
        },
        watch: {
            js: {
                options: {
                    spawn: false,
                },
                files: '**/*.js',
                tasks: ['test']
            },
            wiredep: {
                files: ['client/bower_components/**'],
                tasks: ['wiredep']
            }
        },
        wiredep: {
            src: {
                src: ['client/index.html'],
                exclude: ['client/bower_components/angular-mocks/']
            }
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('test', ['env:test', 'mochaTest']);
};