/**
 * Server config
 */
'use strict';

var config = require('../config.default');

module.exports = [{
    options: {},
    files: [{
        expand: true,
        src: config.css.files,
        dest: config.css.dest
    }]
}];
