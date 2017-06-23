'use strict';

var config = require('../config.default');

module.exports = {
    examples: {
        options: {
        archive: "examples"+ ".zip"
        },
        files: [{
            expand : true,
            cwd: "examples" + "/",
            src: "**"
        }]
    },
    examplesVersion: {
        options: {
        archive: "examples-" + config.pkg.version + ".zip"
        },
        files: [{
            expand : true,
            cwd: "examples-" + config.pkg.version + "/",
            src: "**"
        }]
    }
};
