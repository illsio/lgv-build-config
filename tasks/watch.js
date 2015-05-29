/**
 * Watching for changes
 */
'use strict';

var config = require('../config.default');

// Watch is only present in components
module.exports = {
    css: {
        files: config.cssOutput.watchFiles,
        options: {
            livereload: true
        }
    },

    js: {
        files: config.jsHintFiles,
        options: {
            livereload: true
        }
    }
};
