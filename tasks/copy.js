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
            src: [examplesRestServices, "style.json", "img/krankenhaus.png"],
            dest: "examples-" + config.pkg.version + "/lgv-config"
        },{
            expand: true,
            cwd: config.destDir.prod,
            src: ["**", "!index.html", "!config.js", "!config.json", "!verkehrsfunctions.js"],
            dest: "examples"
        }, {
            expand: true,
            cwd: config.lgvconfig.src + "/",
            src: [examplesRestServices, "style.json",
             "img/krankenhaus.png", "img/bikeandride.png", "img/pur.png", "img/bur_schloss.png"],
            dest: "examples" + "/lgv-config"
        }/*,
        {
            src: "doc/**",
            dest: "examples-" + config.pkg.version + "/"
        }*/]
    },
    examplesInternetServices: {
        files: [{
            expand: true,
            cwd: config.lgvconfig.src + "/",
            src: [examplesServices],
            dest: "examples-" + config.pkg.version + "/lgv-config"
        },{
            expand: true,
            cwd: config.lgvconfig.src + "/",
            src: [examplesServices],
            dest: "examples" + "/lgv-config"
        }],
        options: {
            process: function (content, srcpath) {
                    var internetJSON = JSON.parse(content);

                    internetJsonIds = _.pluck(internetJSON, "id");
                return content;
            }
        }
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

                    content = checkEntryForInternet(content);
                    content = JSON.stringify(content, null, 4);
                }
                return content;
            }
        }
    }
};
function checkEntryForInternet (content) {
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
            var objFound = deleteObjById(newContent, newContent.Themenconfig, attr, id);
            newContent = objFound.content;
        });
        content = clean(newContent, newContent.Themenconfig, attr).content;
    }

    return content;
}
/*
*löscht aus der json alle objekte mit leeren Arrays
 */
function clean (content, json, attr) {
    var returnObj = {
        emptyArray: false,
        content: content
    };
    _.each(_.keys(json), function (key) {
        if (_.isArray(json[key])) {
            if (json[key].length === 0) {
                json = _.without(json, json[key]);
                returnObj = {
                    emptyArray: true,
                    content: content
                };
            }
            else {
                _.each(json[key], function (arrayitem) {
                    returnObj = clean(content, arrayitem, attr);
                    if (returnObj.emptyArray) {
                        json[key] = _.without(json[key], arrayitem);
                    }
                });
            }
        }
        else if (_.isObject(json[key])) {
            clean(content, json[key], attr);
        }
    });
    return returnObj;
}
function matchesInternetJson (id) {
    var isMatch = true;

    if (!_.contains(internetJsonIds, id)) {
        isMatch = false;
    }
    return isMatch;
}
// recursiv
function deleteObjById (content, json, attr, nonInternetId) {
    if (_.has(json, attr)) {
        if (_.isArray(json[attr]) && isArrayOfStrings(json[attr]) && _.indexOf(json[attr], nonInternetId) > -1) {
            json[attr] = _.without(json[attr], nonInternetId);
        }
        // gruppenlayer
        else if (_.isArray(json[attr]) && isArrayOfObjects(json[attr]) && _.find(json[attr], {id: nonInternetId})) {
           json[attr] = _.without(json[attr], _.find(json[attr], {id: nonInternetId}));
        }
        return {
            found: true,
            content: content
        };
    }

    _.each(_.keys(json), function (key) {
        var returnObj;

        if (_.isArray(json[key])) {
            _.each(json[key], function (arrayitem) {
                returnObj = deleteObjById(content, arrayitem, attr, nonInternetId);
                if (returnObj.found && arrayitem[attr] === nonInternetId) {
                    json[key] = _.without(json[key], arrayitem);
                }
            });
        }
        else if (_.isObject(json[key])) {
            returnObj = deleteObjById(content, json[key], attr, nonInternetId);
        }
    });
    return {
            found: false,
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
        if (_.isArray(json[key])) {
            _.each(json[key], function (arrayitem) {
               findObjWithAttr(foundObjects, arrayitem, attr);
            });
        }
        else if (_.isObject(json[key])) {
            findObjWithAttr(foundObjects, json[key], attr);
        }
    });
}
