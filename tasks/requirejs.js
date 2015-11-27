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
                openlayers: "../components/ol3-bower/ol",
                jquery: "../components/jquery/dist/jquery.min",
                jqueryui: "../components/jquery-ui/ui",
                underscore: "../components/underscore/underscore-min",
                backbone: "../components/backbone/backbone",
                backboneradio: "../components/backbone.radio/build/backbone.radio.min",
                text: "../components/requirejs-text/text",
                bootstrap: "../components/bootstrap/js",
                proj4: "../components/proj4/dist/proj4",
                videojs: "../components/video.js/dist/video-js/video",
                moment: "../components/moment/min/moment.min",
                eventbus: "EventBus",
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
