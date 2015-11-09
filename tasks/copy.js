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
                flatten: true
            }
        ],
        options: {
            process: function(content, srcpath) {
                // config.js
                if (srcpath.indexOf("config.js") > -1) {

                    // ersetzt "../components/lgv-config" mit "/lgv-config"
                    content = content.replace(/\.\.\/components\/lgv\-config/g, "/lgv-config");

                    // ersetze -fhhnet. mit -internet. und einige hard-coded geofos-urls mit geodienste-urls
                    if (env && env === "internet") {
                        content = content.replace(/-fhhnet./g, "-internet.");
                        content = content.replace(/geofos\/fachdaten_public\/services\/wfs_hh_bebauungsplaene/g, "geodienste-hamburg/HH_WFS_Bebauungsplaene");
                        content = content.replace(/geofos\/dog_hh\/services\/wfs/g, "geodienste-hamburg/HH_WFS_DOG");
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
            expand: true,
            cwd: config.destDir.prod,
            src: ["**", "!index.html", "!config.js"],
            dest: "examples"
        }, {
            expand: true,
            cwd: config.lgvconfig.src + '/',
            src: ["*services-" + env + ".json", "style.json", "tree-config/simpleTree.json", "img/krankenhaus.png"],
            dest: "examples/lgv-config"
        }]
    },
    examplesPortal: {
        files: [{
            src: [
                "portale/simple/config.js",
                "portale/simple/index.html",
                "portale/simpleTree/config.js",
                "portale/simpleTree/index.html"
            ],
            dest: "examples/"
        }],
        options: {
            process: function(content, srcpath) {
                // config.js: ersetzt "../components/lgv-config" mit "lgv-config"
                if (srcpath.indexOf("config.js") > -1) {
                    content = content.replace(/\.\.\/components\/lgv\-config/g, "../lgv-config");
                    // ersetze -fhhnet. mit -internet. und einige hard-coded geofos-urls mit geodienste-urls
                    if (env && env === "internet") {
                        content = content.replace(/-fhhnet./g, "-internet.");
                        content = content.replace(/geofos\/fachdaten_public\/services\/wfs_hh_bebauungsplaene/g, "geodienste-hamburg/HH_WFS_Bebauungsplaene");
                        content = content.replace(/geofos\/dog_hh\/services\/wfs/g, "geodienste-hamburg/HH_WFS_DOG");
                    }

                    return content;
                }
                return content;
            }
        }
    }
};
