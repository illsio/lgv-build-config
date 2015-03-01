/**
 * Copy files
 */
'use strict';

var config = require('../config.default');

module.exports = {
    dev: {
        img: {
            files: [{
                expand: true,
                src: [config.img.src],
                dest: config.destDir.dev
            }]
        },
        templates: {
            files: [{
                expand: true,
                src: [config.templates.src],
                dest: config.destDir.dev
            }]
        }
    },
    prod: {
        img: {
            files: [{
                expand: true,
                src: [config.img.src],
                dest: config.destDir.prod
            }]
        },
        templates: {
            files: [{
                expand: true,
                src: [config.templates.src],
                dest: config.destDir.prod
            }]
        }
    }
};
