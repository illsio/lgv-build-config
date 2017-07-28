/**
 * Require JS configuration
 */

var config = require("../config.default");

module.exports = {
    compile: {
        options: {
            findNestedDependencies: true,

            // mainConfigFile: "js/main.js",
            baseUrl: "js/",
            name: "main",
            optimize: "uglify2",
            uglify2: {
                output: {
                    preamble: config.banner
                }
            },
            out: config.js.dest + "main.js",
            preserveLicenseComments: false,
            removeCombined: true,
            useStrict: false,
            paths: {
                openlayers: "../node_modules/openlayers/dist/ol",
                jquery: "../node_modules/jquery/dist/jquery.min",
                jqueryui: "../node_modules/jquery-ui/ui",
                underscore: "../node_modules/underscore/underscore-min",
                "underscore.string": "../node_modules/underscore.string/dist/underscore.string.min",
                backbone: "../node_modules/backbone/backbone",
                "backbone.radio": "../node_modules/backbone.radio/build/backbone.radio.min",
                text: "../node_modules/requirejs-text/text",
                bootstrap: "../node_modules/bootstrap/js",
                colorpicker: "../node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min",
                proj4: "../node_modules/proj4/dist/proj4",
                videojs: "../node_modules/video.js/dist/video",
                moment: "../node_modules/moment/min/moment.min",
                geoapi: "GeoAPI",
                views: "views",
                models: "models",
                collections: "collections",
                config: "empty:",
                app: "app",
                templates: "../templates",
                modules: "../modules"
            },
            shim: {
                bootstrap: {
                    deps: ["jquery"]
                },
                "bootstrap/popover": {
                    deps: ["bootstrap/tooltip"]
                },
                openlayers: {
                    exports: "ol"
                }
            }
        }
    }
};
