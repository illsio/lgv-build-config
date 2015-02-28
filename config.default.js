/**
 * Grunt configuration
 */
'use strict';

var pkg = require('../../package');
var xtend = require('xtend');
var customConfig = {};
var grunt = process.grunt;

if (grunt.file.exists('config.js')) {
    customConfig = require('../../config');
}

module.exports = xtend({
    pkg: pkg,

    // A banner for distributed files (name, version, license, date)
    banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',

    destDir: 'dist/',

    tempDir: 'temp/',

    requirejs: '../components/requirejs/require',

    // All files that should be checked with JSHint
    jsHintFiles: [
        'Gruntfile.js',
        '*.js',
        'modules/**/*.js',
        'js/*.js',
        'test/*.js',
        'test/specs/**/*.js'
    ],

    // Path to JSCS configuration file
    jscsConfig: '.jscsrc',

    // HTML Files for visual tests
    html: {
        files: [
            'templates/*.html',
            'test/**/*.html'
        ],
    },

    // JavaScript files
    js: {
        files: [
            'js/**/*.js'
        ],
        config: 'js/config.js',
        dest: 'dist/<%= pkg.version %>/',
        temp: 'temp/'
    },

    // JavaScript files
    css: {
        files: [
            'css/**/*.css'
        ],
        dest: 'dist/<%= pkg.version %>/'
    },

    cssOutput: {
        prod: [{
            expand: true,
            cwd: 'dist/<%= pkg.version %>/',
            src: ['*.min.css'],
            dest: 'dist/<%= pkg.version %>/'
        }],

        dev: [{
            expand: true,
            cwd: 'css/',
            src: ['*.min.css'],
            dest: 'css/'
        }],

        files: '**/*.css',
        watchFiles: ['css/*.css']
    },

    // Images
    img: {
        src: 'img/**',
        dest: 'dist/<%= pkg.version %>/'
    },

    // Templates
    templates: {
        src: 'templates/**',
        dest: 'temp/'
    },

    // Tests
    tests: {
        src: 'test/**/*spec.js',
        config: 'test/test-main.js',
    }
}, customConfig);
