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
                    // ["Portalconfig"]["menu"]["tools"]["children"]["routing"]
                    delete content["Portalconfig"]["menu"]["tools"]["children"]["routing"];

                    content = checkEntryForInternet(content);
                    // deleteNonInternetIds(content, content, "id");
                    content = JSON.stringify(content, null, 4);
                }
                return content;
            }
        }
    }
};
function checkEntryForInternet (content) {
    // console.log(config.pkg.version);
    var attr = "id",
        foundObjects = [], // objekte mit attribut id
        layerIds = [], // ids der attribute (string, kann auch array[string] und array[{}] sein)
        plainLayerIds = [], // nur ids (arrays wurden aufgedröselt)
        nonInternetIds = []; //ids die nicht in der internetjson sind

    findObjWithAttr(foundObjects, content.Themenconfig, attr);
    layerIds = _.pluck(foundObjects, attr);
    plainLayerIds = getPlainLayerIds(layerIds);

    _.each(plainLayerIds, function (layerId) {
        if (!matchesInternetJson(layerId)) {
            nonInternetIds.push(layerId);
        }
    });
    if (nonInternetIds.length > 0) {
        var newContent = content;

        _.each(nonInternetIds, function (id) {
            var objFound = deleteObjById(newContent, newContent.Themenconfig, attr, id, ["Themenconfig"]);
            newContent = objFound.content;
        });
    }

    return content;
}
function matchesInternetJson(id) {
    var isMatch = true;

    if (!_.contains(internetJsonIds, id)) {
        isMatch = false;
    }
    return isMatch;
}
// recursiv
function deleteObjById (content, json, attr, nonInternetId, jsonpath) {
    if (_.has(json, attr)) {
        if (_.isArray(json[attr]) && isArrayOfStrings(json[attr]) && _.indexOf(json[attr], nonInternetId) > -1) {
            json[attr] = _.without(json[attr], nonInternetId);
        }
        else if (_.isArray(json[attr]) && isArrayOfObjects(json[attr]) && _.find(json[attr]), {id: nonInternetId}) {
           console.log(nonInternetId);
           console.log(json[attr]);
            // _.each(json[attr], function (id) {
            //     if (id[attr] === id) {
            //         // console.log(id[attr]);
            //     }
            // });
        }
        return {
            found: true,
            path: jsonpath,
            content: content
        };
    }

    _.each(_.keys(json), function (key, index) {
        var returnObj;
        // console.log(key);
        if (_.isArray(json[key])) {
            jsonpath.push(key);
            _.each(json[key], function (arrayitem, index) {
                if (index > 0) {
                    jsonpath = _.without(jsonpath, _.last(jsonpath));
                }
                jsonpath.push(index);
                // console.log(jsonpath);
                returnObj = deleteObjById(content, arrayitem, attr, nonInternetId, jsonpath);
                if (returnObj.found && arrayitem[attr] === nonInternetId) {
                    json[key] = _.without(json[key], arrayitem);
                }
                jsonpath = returnObj.path;

            });
        }
        else if (_.isObject(json[key])) {
            jsonpath.push(key);

            returnObj = deleteObjById(content, json[key], attr, nonInternetId, jsonpath);
            jsonpath = returnObj.path;
        }
        // if (index === _.keys(json).length - 1 && !objectFound) {
        if (index === _.keys(json).length - 1) {
            // console.log(123);
            // jsonpath = _.without(jsonpath, _.last(jsonpath));
            jsonpath = ["Themenconfig"];
        }
    });
    return {
            found: false,
            path: jsonpath,
            content: content
        };
}

function getPlainLayerIds (layerIds) {
    var plainLayerIds = [];

     _.each(layerIds, function (layerId) {
        if (_.isString(layerId)) {
            plainLayerIds.push(layerId);
        }
        else if (isArrayOfStrings(layerId)) {
            _.each(layerId, function (layerIdFromArray) {
                plainLayerIds.push(layerIdFromArray);
            });
        }
    });
     return plainLayerIds;
}

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

function findObjWithAttr (foundObjects, json, attr) {
    if (_.has(json, attr)) {
        foundObjects.push(json);
    }
    _.each(_.keys(json), function (key) {
        if (_.isObject(json[key])) {
            // console.log(typeof json[key]);
            findObjWithAttr(foundObjects, json[key], attr);
        }
        else if (_.isArray(json[key])) {
            _.each(json[key], function (arrayitem) {
               findObjWithAttr(foundObjects, arrayitem, attr);
            });
        }
    });
}
