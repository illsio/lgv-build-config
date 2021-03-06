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
                app: "app",
                backbone: "../node_modules/backbone/backbone",
                "backbone.radio": "../node_modules/backbone.radio/build/backbone.radio.min",
                bootstrap: "../node_modules/bootstrap/js",
                "bootstrap-select": "../node_modules/bootstrap-select/dist/js/bootstrap-select.min",
                "bootstrap-toggle": "../node_modules/bootstrap-toggle/js/bootstrap-toggle.min",
                collections: "collections",
                colorpicker: "../node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min",
                config: "empty:",
                d3: "../node_modules/d3/build/d3.min",
                geoapi: "GeoAPI",
                jquery: "../node_modules/jquery/dist/jquery.min",
                jqueryui: "../node_modules/jquery-ui/ui",
                models: "models",
                modules: "../modules",
                moment: "../node_modules/moment/min/moment.min",
                openlayers: "../node_modules/openlayers/dist/ol",
                proj4: "../node_modules/proj4/dist/proj4",
                slider: "../node_modules/bootstrap-slider/dist/bootstrap-slider.min",
                templates: "../templates",
                text: "../node_modules/requirejs-text/text",
                underscore: "../node_modules/underscore/underscore-min",
                "underscore.string": "../node_modules/underscore.string/dist/underscore.string.min",
                views: "views",
                videojs: "../node_modules/video.js/dist/video.min",
                videojsflash: "../node_modules/videojs-flash/dist/videojs-flash.min",
                highcharts: "../node_modules/highcharts/highcharts"
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
                },
                highcharts: {
                    deps: ["jquery"]
                }
            },
            map: {
                "videojsflash": {
                    "video.js": "videojs"
                }
            }
        }
    }
};
