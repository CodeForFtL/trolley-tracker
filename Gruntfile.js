'use strict';
/**
 * @link https://github.com/jsoverson/grunt-env
 * @link https://github.com/pghalliday/grunt-mocha-test
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['env:test', 'mochaTest']);
};