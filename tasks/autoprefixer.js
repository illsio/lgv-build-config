/**
 * Autoprefixer
 * Takes care of vendor prefixes by parsing css files
 */
'use strict';

var config = require('../config.default');

module.exports = {
    options: {
        browsers: ['last 5 version', 'Android 2.3', 'ie > 7']
    },
    dev: {
        files: config.cssOutput.dev
    }
};
