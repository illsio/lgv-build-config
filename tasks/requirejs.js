/**
 * Require JS configuration
 */
'use strict';

var config = require('../config.default');


module.exports = {
    compile: {
        options: {
            findNestedDependencies: true,
            mainConfigFile: 'js/main.js',
            name: 'main',
            optimize: 'uglify2',
            out: config.js.dest + 'main.js',
            preserveLicenseComments: false,
            removeCombined: true,
            useStrict: false,
        }
    }
};
