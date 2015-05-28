/**
 * Copy files
 */
'use strict';

var config = require('../config.default');

var grunt = process.grunt;
var path = grunt.option('path') || 'portale/master';

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

    // woffs
    {
       expand: true,
        cwd: config.woffs.src,
        src: ['**'],
        dest: config.woffs.dest
    },

    // components:requirejs
    {
        src: [config.requirejs],
        dest: config.destDir.prod
    },

    // shared Config-files for master
    {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [config.lgvconfig.src + '/**'],
        dest: config.lgvconfig.dest
    },

    //config.js from specified path
    {
        expand: true,
        src: [path + '/config.js'],
        flatten: true,
        dest: config.destDir.prod,
        options: {
            // ersetzt in config.js: "../components/lgv-config" mit "/lgv-config"
            process: function(content, srcpath) {
                content = content.replace(/(?:\.\.\/components\/lgv\-config)/g, "/lgv-config");
                return content;
            }
        }
    },

    //index.html from specified path
    {
        expand: true,
        src: [path + '/index.html'],
        flatten: true,
        dest: config.destDir.prod,
        options: {
            //ersetzt in index.html: "../.." mit ""
            process: function(content, srcpath) {
                return content.replace(/(?:\.\.\/\.\.\/)/g, "");

            },
        }
    }
];
