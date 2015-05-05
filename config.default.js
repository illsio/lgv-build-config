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
        'components/build-config/tasks/**/*.js',
        'js/**/*.js'
    ],

    // Path to JSCS configuration file
    jscsConfig: '.jscsrc',

    // JavaScript files
    js: {
        files: [
            'js/**/*.js'
        ],
        dest: 'dist/<%= pkg.version %>/js/'
    },

    // CSS files
    css: {
        files: [
            'css/style.css'
        ],
        dest: 'dist/<%= pkg.version %>/'
    },

    // woff files
    woffs: {
        src: 'css/woffs',
        dest: 'dist/<%= pkg.version %>/css/woffs'
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

    // shared Config-files for master
    lgvconfig: {
        src: 'components/lgv-config',
        dest: 'lgv-config'
    }
};
