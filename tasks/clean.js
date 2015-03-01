/**
 * Server config
 */
'use strict';

var config = require('../config.default');

module.exports = {
    dev: [
        config.destDir.dev
    ],
    prod: [
        config.destDir.prod,
        config.tempDir
    ]
};
