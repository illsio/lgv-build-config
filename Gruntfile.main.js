/**
 * General Grunt setup: A sample
 */
'use strict';

var deepExtend = require('deep-extend');

/**
 * Load configuration files for Grunt (Tasks)
 * @param  {string} path    Path to folder with tasks
 * @return {object}         All options
 */
var loadTaskConfig = function (path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', { cwd: path }).forEach(function (option) {
        key = option.replace(/\.js$/, '');
        object[key] = require('../../' + path + '/' + option);
    });

    return object;
};


/*
 * Call Grunt configuration
 */
module.exports = function (grunt) {

    // Measure time of grunt tasks
    require('time-grunt')(grunt);

    // Make Grunt accessible everwhere
    process.grunt = grunt;

    var config = deepExtend({
        pkg: require('./package')
    }, loadTaskConfig('components/build-config/tasks'));

    // Load project configuration
    grunt.initConfig(config);

    // Load all npm tasks through jit-grunt (fetches all tasks from node_modules
    // folder and custom extend object here)
    require('jit-grunt')(grunt);

    /**
     * Development
     */

    // Application server for local development
    grunt.registerTask('server', ['connect:server', 'watch']);

    // A task for development
    grunt.registerTask('dev', [
        // 'jshint',
        // 'jscs',
        // 'scsslint',
        // 'autoprefixer'
        'server'
    ]);

    // A task for generating production code
    grunt.registerTask('build', [
        'clean',
        // 'jshint',
        // 'jscs',
        // 'scsslint',
        // 'autoprefixer'
        'requirejs:compile',
        'cssmin',
        'copy'
    ]);

    // Testing tasks
    grunt.registerTask('test:unit', ['karma']);
    grunt.registerTask('test:visual', ['connect:test', 'phantomcss']);

    // Default Task
    grunt.registerTask('default', ['dev']);
};
