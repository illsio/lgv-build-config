/**
 * Copy files
 */
"use strict";

var config = require("../config.default"),
    _ = require("underscore"),
    $ = require("jquery"),
    grunt = process.grunt,
    path = grunt.option("path") || "portale/master",
    env = "fhhnet",
    examplesRestServices = "rest-services-internet.json",
    examplesServices = "services-internet.json",
    internetJsonIds = [];

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
        }*/],
        options: {
            process: function (content, srcpath) {
                if (srcpath.indexOf("services-internet.json") > -1) {
                    var internetJSON = JSON.parse(content);

                    internetJsonIds = _.pluck(internetJSON, "id");
                }
            }
        }
    },
    examplesPortal: {
        files: [{
            src: [
                // "portal/master/config.js",
                // "portal/master/config.json",
                // "portal/master/index.html",
                // "portal/masterTree/config.js",
                // "portal/masterTree/config.json",
                // "portal/masterTree/index.html"
            ],
            dest: "examples-" + config.pkg.version + "/"
        },{
            src: [
                // "portal/master/config.js",
                "portal/master/config.json"
                // "portal/master/index.html",
                // "portal/masterTree/config.js",
                // "portal/masterTree/config.json",
                // "portal/masterTree/index.html"
            ],
            dest: "examples" + "/"
        }],
        options: {
            process: function (content, srcpath) {
                // config.js: ersetzt "../node_modules/lgv-config" mit "lgv-config"
                if (srcpath.indexOf("config.js") > -1) {
                    content = content.replace(/\.\.\/node_modules\/lgv\-config/g, "../lgv-config");
                    // ersetze -fhhnet. mit -internet.
                    content = content.replace(/rest-services-fhhnet.json/g, examplesRestServices);
                    if (content.indexOf("services-fhhnet.json") !== -1) {
                        content = content.replace(/services-fhhnet.json/g, examplesServices);
                    }
                    else {
                        content = content.replace(/services-fhhnet-ALL.json/g, examplesServices);
                    }
                }
                if (srcpath.indexOf("config.json") > -1) {
                    // routing entfernen
                    content = JSON.parse(content);
                    delete content.Portalconfig.menu.tools.children.routing;
                    // content = checkEntryForInternet(content);
                    content = deleteNonInternetIds(content, "id");
                    content = JSON.stringify(content, null, 4);
                }
                return content;
            }
        }
    }
};
// function checkEntryForInternet (content) {
//     // console.log(config.pkg.version);
//     var attr = "id",
//         foundObjects = [],
//         layerIds = [],
//         plainLayerIds = [];

//     findObjWithAttr(foundObjects, content.Themenconfig, attr);
//     layerIds = _.pluck(foundObjects, attr);
//     plainLayerIds = getPlainLayerIds(layerIds);

//     _.each(plainLayerIds, function (layerId) {
//         if (!_.contains(internetJsonIds, layerId)) {
//             // TODO: layer aus config werfen
//         }
//     });

//     return content;
// }
function matchesInternetJson(id) {
    if (!_.contains(internetJsonIds, id)) {
        console.log(id);
    }
}
function deleteNonInternetIds (json, attr) {
    if (_.has(json, attr)) {
        // id: array of strings
        if (_.isArray(json[attr]) && isArrayOfStrings(json[attr])) {
            _.each(json[attr], function (id) {
                matchesInternetJson(id);
            });
        }
        // id: array of objects
        else if (_.isArray(json[attr]) && isArrayOfObjects(json[attr])) {
            _.each(json[attr], function (id) {
                matchesInternetJson(id[attr]);
            });
        }

        else {
            matchesInternetJson(json[attr]);
        }
    }
    _.each(_.keys(json), function (key) {
        if (_.isObject(json[key])) {
            // console.log(typeof json[key]);
            deleteNonInternetIds(json[key], attr);
        }
        else if (_.isArray(json[key])) {
            _.each(json[key], function (arrayitem) {
               deleteNonInternetIds(arrayitem, attr);
            });
        }
    });
    return json;
}

// function getPlainLayerIds (layerIds) {
//     var plainLayerIds = [];

//      _.each(layerIds, function (layerId) {
//         if (_.isString(layerId)) {
//             plainLayerIds.push(layerId);
//         }
//         else if (isArrayOfStrings(layerId)) {
//             _.each(layerId, function (layerIdFromArray) {
//                 plainLayerIds.push(layerIdFromArray);
//             });
//         }
//     });
//      return plainLayerIds;
// }

function isArrayOfStrings (array) {
    var isArrayOfStrings = true;

    _.each(array, function (arrayitem) {
        if (!_.isString(arrayitem)) {
            isArrayOfStrings = false;
        }
    });

    return isArrayOfStrings;
}
function isArrayOfObjects (array) {
    var isArrayOfObjects = true;

    _.each(array, function (arrayitem) {
        if (!_.isObject(arrayitem)) {
            isArrayOfObjects = false;
        }
    });

    return isArrayOfObjects;
}

// function findObjWithAttr (foundObjects, json, attr) {
//     if (_.has(json, attr)) {
//         foundObjects.push(json);
//         if (!_.contains(internetJsonIds, json[attr])) {
//             // TODO: layer aus config werfen
//             json = removeIdFromConfig(json, json[attr]);
//         }
//     }
//     _.each(_.keys(json), function (key) {
//         if (_.isObject(json[key])) {
//             // console.log(typeof json[key]);
//             findObjWithAttr(foundObjects, json[key], attr);
//         }
//         else if (_.isArray(json[key])) {
//             _.each(json[key], function (arrayitem) {
//                findObjWithAttr(foundObjects, arrayitem, attr);
//             });
//         }
//     });
// }
