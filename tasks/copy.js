/**
 * Copy files
 */
'use strict';

var config = require('../config.default');

module.exports = [

    // images
    {expand: true, src: [config.img.src + '**'], dest: config.destDir.prod},

    // fonts
    {expand: true, cwd: config.fonts.src, src: ['**'], dest: config.fonts.dest},

    // components:requirejs
    {src: [config.requirejs], dest: config.destDir.prod}
];
