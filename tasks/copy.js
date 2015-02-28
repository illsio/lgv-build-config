/**
 * Copy files
 */
'use strict';

var config = require('../config.default');

module.exports = {
    img: {
        files: [{
            expand: true,
            src: [config.img.src],
            dest: config.img.dest
        }]
    },
    templates: {
        files: [{
            expand: true,
            src: [config.templates.src],
            dest: config.templates.dest
        }]
    }
};
