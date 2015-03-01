/**
 * Require JS configuration
 */
'use strict';

var config = require('../config.default');


module.exports = {
    compile: {
        options: {
            baseUrl: config.js.baseUrl,
            removeCombined: true,
            findNestedDependencies: true,
            useStrict: false,
            dir: 'temp',
            modules: [{
              name: 'main'
            }],
            preserveLicenseComments: false
        }
    }
};
