/**
 * Grunt configuration
 */
'use strict';

var pkg = require('../../package');
var grunt = process.grunt;

module.exports = {
    pkg: pkg,

    // A banner for distributed files (name, version, license, date)
    banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',

    destDir: {
        prod: 'dist/<%= pkg.version %>/'
    },

    requirejs: 'components/requirejs/require.js',

    // All files that should be checked with JSHint
    jsHintFiles: [
        'Gruntfile.js',
        '*.js',
        'tasks/**/*.js',
        'js/**/*.js',
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
        dest: 'dist/<%= pkg.version %>/js/'
    },

    // JavaScript files
    css: {
        files: [
            'css/style.css'
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
        src: 'img/'
    },

    // Fonts
    fonts: {
        src: 'components/bootstrap/dist/fonts',
        dest: 'dist/<%= pkg.version %>/fonts'
    },

    // Tests
    tests: {
        src: 'test/**/*spec.js',
        config: 'test/test-main.js',
    }
};
