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
    }
};