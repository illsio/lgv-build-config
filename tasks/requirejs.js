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
            out: config.js.dest + "main.js",
            preserveLicenseComments: false,
            removeCombined: true,
            useStrict: false,
            paths: {
                openlayers: "../_libs/openlayers/js/ol.amd",
                jquery: "../components/jquery/dist/jquery",
                jqueryui: "../components/jquery-ui/ui",
                underscore: "../components/underscore/underscore",
                backbone: "../components/backbone/backbone",
                text: "../components/requirejs-text/text",
                bootstrap: "../components/bootstrap/dist/js/bootstrap",
                proj4: "../components/proj4/dist/proj4",
                eventbus: "EventBus",
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
