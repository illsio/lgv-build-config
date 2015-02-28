/**
 * JSHint taks configuration
 */
'use strict';

var config = require('../config.default');

module.exports = {
    all: config.jsHintFiles,
    options: {
        jshintrc: '.jshintrc'
    }
};
