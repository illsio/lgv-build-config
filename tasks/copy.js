/**
 * Copy files
 */
'use strict';

var config = require('../config.default');

var grunt = process.grunt;
var path = grunt.option('path') || "portale/master";
var env = grunt.option("env") || "fhhnet";

module.exports = {
    dist: {
        files: [
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
                cwd: config.lgvconfig.src + '/',
                src: ['**'],
                dest: config.lgvconfig.dest + '/'
            }
        ]
    },
    distPortal: {
        files: [
            // index.html + config.js from specified path
            {
                expand: true,
                src: [path + "/config.js", path + "/index.html"],
                dest: config.destDir.prod,
                flatten:true
            }
        ],
        options: {
            process: function(content, srcpath) {
                // config.js
                if (srcpath.indexOf("config.js") > -1) {

                    // ersetzt "../components/lgv-config" mit "/lgv-config"
                    content = content.replace(/\.\.\/components\/lgv\-config/g, "/lgv-config");

                    // ersetze -fhhnet. mit -internet.
                    if (env && env === "internet") {
                        content = content.replace(/-fhhnet./g, "-internet.");
                    }
                    return content;
                }

                // index.html: ersetzt "../.." mit ""
                if (srcpath.indexOf("index.html") > -1) {
                    return content.replace(/\.\.\/\.\.\//g, "");
                }
                return content;
            }
        }
    },
    examples: {
        files: [{
            cwd: config.destDir.prod,
            src: ['**'],
            expand: true,
            dest: "examples"
        }, {
            expand: true,
            cwd: config.lgvconfig.src + '/',
            src: ["*services-"+ env +".json", "style.json", "tree-config/masterTree.json", "img/krankenhaus.png"],
            dest: "examples/lgv-config"
        }]},
    examplesPortal: {
        files: [
        {
            src: ["portale/simple/config.js", "portale/simple/index.html"],
            dest: "examples/"
        },
        {
            src: ["portale/masterTree/config.js", "portale/masterTree/index.html"],
            dest: "examples/portale/tree/",
            flatten: true,
            expand: true
        }
        ],
        options: {
            process: function(content, srcpath) {
                // config.js: ersetzt "../components/lgv-config" mit "lgv-config"
                if (srcpath.indexOf("config.js") > -1) {
                    content = content.replace(/\.\.\/components\/lgv\-config/g, "../lgv-config");
                    // ersetze -fhhnet. mit -internet.
                    if (env && env === "internet") {
                        content = content.replace(/-fhhnet./g, "-internet.");
                    }

                    return content;
                }
                return content;
            }
        }
    }};
