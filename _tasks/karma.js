/**
 * Configuration for Karma test-runner
 */
'use strict';

module.exports = {
    options: {
        configFile: 'components/grunt-config/karma.conf.js',

        proxies: {
            '/base': 'http://localhost:8001'
        },
        singleRun: true
    },

    // Good to use while development since it keeps karma running
    dev: {
        options: {
            browsers: ['PhantomJS'],
            singleRun: false
        }
    },

    // Testing in all browsers
    test: {
        options: {
            browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS']
        }
    },

    // Testing in IE
    'test-ie': {
        options: {
            browsers: ['IE']
        }
    },

    unit: {
        options: {
            browsers: ['PhantomJS']
        }
    },

    desktop: {
        options: {
            browsers: ['Chrome']
        }
    },

    jenkins: {
        options: {
            reporters: ['dots', 'junit', 'coverage'],
            junitReporter: {
                outputFile: 'test/junit/test-results.xml'
            },
            browsers: ['PhantomJS']
        }
    }
};
