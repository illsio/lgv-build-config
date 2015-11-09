/**
 * Server config
 */
'use strict';

var config = require('../config.default');

module.exports = {
    dist: [
        config.destDir.prod,
        config.destDir.temp,
        config.lgvconfig.dest
    ],
    examples: ["examples"]
};
