/**
 * Build for header script
 */
'use strict';

var config = require('../config.default');

var headerHelper = {};
headerHelper[config.js.headerDest] = config.js.headerFiles;

module.exports = {
    header: {
        files: headerHelper
    }
};
