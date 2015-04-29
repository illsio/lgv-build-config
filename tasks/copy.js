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
        cwd: 'css/woffs',
        src: ['**'],
        dest: 'dist/<%= pkg.version %>/css/woffs'
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
            //replace 'layerConf: *' with 'layerConf: services.json'
            process: function(content, srcpath) {
                content = content.replace(/(?:layerConf)(?:.*)/g, "layerConf: '/lgv-config/services-fhhnet.json',");
                content = content.replace(/(?:styleConf)(?:.*)/g, "styleConf: '/lgv-config/style.json',");
                content = content.replace(/(?:categoryConf)(?:.*)/g, "categoryConf: '/lgv-config/category.json',");
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
            //replace '../..' with ''
            process: function(content, srcpath) {
                return content.replace(/(?:\.\.\/\.\.\/)/g, "");

            },
        }
    }
];
