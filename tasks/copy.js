/**
 * Copy files
 */
"use strict";

var config = require("../config.default"),
    grunt = process.grunt,
    path = grunt.option("path") || "portale/master",
    env = "fhhnet",
    examplesRestServices = "rest-services-fhhnet.json",
    examplesServices = "services-fhhnet.json";

if (grunt.option("env") === "internet") {
    env = "internet";
    examplesRestServices = "rest-services-internet.json";
    examplesServices = "services-internet-webatlas.json";
}

module.exports = {
    dist: {
        files: [
            // images
            {
                src: [config.img.src + "**"],
                dest: config.destDir.prod
            },

            // fonts
            {
                expand: true,
                cwd: config.fonts.src,
                src: ["**"],
                dest: config.fonts.dest
            },

            // woffs
            {
                expand: true,
                cwd: config.woffs.src,
                src: ["**"],
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
                cwd: config.lgvconfig.src + "/",
                src: ["**"],
                dest: config.lgvconfig.dest + "/"
            }
        ]
    },
    distPortal: {
        files: [
            // index.html + config.js from specified path
            {
                expand: true,
                src: [path + "/*.js", path + "/index.html", path + "/*.php", path + "/*.json"],
                dest: config.destDir.prod,
                flatten: true
            }
        ],
        options: {
            process: function (content, srcpath) {
                // config.js
                if (srcpath.indexOf("config.js") > -1) {

                    // ersetzt "../components/lgv-config" mit "/lgv-config"
                    content = content.replace(/\.\.\/components\/lgv\-config/g, "/lgv-config");

                    // ersetzt "../portal*/*/" mit "../" --> Pfad für customModules
                    content = content.replace(/\.\.\/portal.*\/.*\//g, "../");
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
            expand: true,
            cwd: config.destDir.prod,
            src: ["**", "!index.html", "!config.js", "!config.json", "!verkehrsfunctions.js"],
            dest: "examples-" + config.pkg.version
        }, {
            expand: true,
            cwd: config.lgvconfig.src + "/",
            src: [examplesRestServices, examplesServices, "style.json", "img/krankenhaus.png"],
            dest: "examples-" + config.pkg.version + "/lgv-config"
        }/*,
        {
            src: "doc/**",
            dest: "examples-" + config.pkg.version + "/"
        }*/]
    },
    examplesPortal: {
        files: [{
            src: [
                "portale/simple/config.js",
                "portale/simple/config.json",
                "portale/simple/index.html",
                "portale/simpleTree/config.js",
                "portale/simpleTree/config.json",
                "portale/simpleTree/index.html"
            ],
            dest: "examples-" + config.pkg.version + "/"
        }],
        options: {
            process: function (content, srcpath) {
                // config.js: ersetzt "../components/lgv-config" mit "lgv-config"
                if (srcpath.indexOf("config.js") > -1) {
                    content = content.replace(/\.\.\/components\/lgv\-config/g, "../lgv-config");
                    // ersetze -fhhnet. mit -internet.
                    if (env && env === "internet") {
                        content = content.replace(/rest-services-fhhnet.json/g, examplesRestServices);
                        content = content.replace(/services-fhhnet.json/g, examplesServices);
                    }

                    return content;
                }
                return content;
            }
        }
    }
};
