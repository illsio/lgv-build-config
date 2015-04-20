/**
 * Copy files
 */
'use strict';

var config = require('../config.default');

var grunt = process.grunt;
var path = grunt.option('path') || 'portale/master';
console.log(path);

module.exports = [

    // images
    {
        expand: true,
        src: [config.img.src + '**'],
        dest: config.destDir.prod
    },

    // fonts
    {
        expand: true,
        cwd: config.fonts.src,
        src: ['**'],
        dest: config.fonts.dest
    },

    // components:requirejs
    {
        src: [config.requirejs],
        dest: config.destDir.prod
    },

    // global config files
    {
        expand: true,
        src: [config.config.src + '**'],
        dest: config.destDir.prod
    },

    //config.js from specified path
    {
        expand: true,
        src: [path + '/config.js'],
        flatten: true,
        dest: config.destDir.prod
    },

    //index.html from specified path
    {
        expand: true,
        src: [path + '/index.html'],
        flatten: true,
        dest: config.destDir.prod,
        options: {
            //replace '../..' with ''
            process: function (content, srcpath) {
                return content.replace(/(?:\.\.\/\.\.\/)/g,"");

      },
    }
    }
];
