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
    examplesServices = "services-internet.json";
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

            // node_modules:requirejs
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
            },
            {
                expand: true,
                src: path + "/myJsons/*.json",
                dest: config.destDir.prod + "/myJsons/",
                flatten: true
            }
        ],
        options: {
            process: function (content, srcpath) {
                // config.js
                if (srcpath.indexOf("config.js") > -1) {

                    // ersetzt "../node_modules/lgv-config" mit "/lgv-config"
                    content = content.replace(/\.\.\/node_modules\/lgv\-config/g, "/lgv-config");

                    // ersetzt "../portal*/*/" mit "../" --> Pfad f�r customModules
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
        },{
            expand: true,
            cwd: config.destDir.prod,
            src: ["**", "!index.html", "!config.js", "!config.json", "!verkehrsfunctions.js"],
            dest: "examples"
        }, {
            expand: true,
            cwd: config.lgvconfig.src + "/",
            src: [examplesRestServices, examplesServices, "style.json",
             "img/krankenhaus.png", "img/bikeandride.png", "img/pur.png", "img/bur_schloss.png"],
            dest: "examples" + "/lgv-config"
        }/*,
        {
            src: "doc/**",
            dest: "examples-" + config.pkg.version + "/"
        }*/]
    },
    examplesPortal: {
        files: [{
            src: [
                "portal/master/config.js",
                "portal/master/config.json",
                "portal/master/index.html",
                "portal/masterTree/config.js",
                "portal/masterTree/config.json",
                "portal/masterTree/index.html"
            ],
            dest: "examples-" + config.pkg.version + "/"
        },{
            src: [
                "portal/master/config.js",
                "portal/master/config.json",
                "portal/master/index.html",
                "portal/masterTree/config.js",
                "portal/masterTree/config.json",
                "portal/masterTree/index.html"
            ],
            dest: "examples" + "/"
        }],
        options: {
            process: function (content, srcpath) {
                // config.js: ersetzt "../node_modules/lgv-config" mit "lgv-config"
                if (srcpath.indexOf("config.js") > -1) {
                    content = content.replace(/\.\.\/node_modules\/lgv\-config/g, "../lgv-config");
                    // ersetze -fhhnet. mit -internet.
                    if (env && env === "internet") {
                        content = content.replace(/rest-services-fhhnet.json/g, examplesRestServices);
                        content = content.replace(/services-fhhnet.json/g, examplesServices);
                    }
                }
                if (srcpath.indexOf("config.json") > -1) {
                    // routing entfernen
                    content = JSON.parse(content);
                    delete content.Portalconfig.menu.tools.children.routing;
                    content = JSON.stringify(content, null, 4);
                }
                return content;
            }
        }
    }
};
