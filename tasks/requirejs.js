/**
 * Require JS configuration
 */
'use strict';

var config = require('../config.default');


module.exports = {
    compile: {
        options: {
            mainConfigFile: config.js.config,
            baseUrl: './js',
            removeCombined: true,
            findNestedDependencies: true,
            useStrict: true,
            dir: 'temp',

            modules: ['main'],

            // Do not preserve license comments when working with source maps, incompatible.
            preserveLicenseComments: false
        }
    }
};
