/**
 * Configuration for Karma test-runner
 */
'use strict';

module.exports = {
    options: {
        configFile: 'components/build-config/karma.conf.js',

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
    }
};
