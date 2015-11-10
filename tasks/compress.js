'use strict';

var config = require('../config.default');

module.exports = {
    examples: {
        options: {
        archive: 'examples.zip'
        },
        files: [{
            expand : true,
            cwd: "examples/",
            src: "**"
        }]
    }
};
