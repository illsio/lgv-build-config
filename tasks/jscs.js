/**
 * JS code style checker
 */
'use strict';

var config = require('../config.default');

module.exports = {
    src: config.jsHintFiles,
    options: {
        config: config.jscsConfig
    }
};
