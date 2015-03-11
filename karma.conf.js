/**
 * Default configuration for Karma
 */
'use strict';

var projectConfig = require('./config.default');

module.exports = function (config) {

    var karmaFiles = [
        {
            pattern: 'components/**/*.js',
            included: false
        }, {
            pattern: 'templates/**/*',
            included: false
        }, {
            pattern: 'test/visual/**/*.{html,css,jpg,png}',
            included: false
        }, {
            pattern: 'test/fixtures/*.html',
            included: false
        }, {
            pattern: 'test/test-config/*.js',
            included: false
        }, {
            pattern: projectConfig.tests.src,
            included: false
        }, projectConfig.tests.config
    ];

    var i = 0;

    // All JS files
    for (; i < projectConfig.js.files.length; i++) {
        karmaFiles.push({
            pattern: projectConfig.js.files[i],
            included: false
        });
    }

    config.set({
        basePath: '../../',

        singleRun: true,
        colors: true,
        captureTimeout: 7000,

        frameworks: ['jasmine', 'requirejs'],
        reporters: ['progress', 'coverage'],

        plugins: [
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-firefox-launcher',
            //'karma-ie-launcher',
            'karma-jasmine',
            //'karma-junit-reporter',
            'karma-phantomjs-launcher',
            'karma-requirejs',
            'karma-safari-launcher'
        ],

        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: projectConfig.tests.coverage,
                subdir: function (browser) {
                    return browser.toLowerCase().split(/[ /-]/)[0];
                }
            }, {
                type: 'text-summary',
                dir: projectConfig.tests.coverage,
                subdir: function (browser) {
                    return browser.toLowerCase().split(/[ /-]/)[0];
                }
            }, {
                type: 'cobertura',
                dir: projectConfig.tests.coverage,
                subdir: function (browser) {
                    return browser.toLowerCase().split(/[ /-]/)[0];
                }
            }]
        },

        logLevel: config.LOG_INFO,

        // List of files to load in the browser
        files: karmaFiles
    });
};
