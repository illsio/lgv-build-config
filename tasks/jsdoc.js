/**
 * jsdoc config
 */
"use strict";

module.exports = {
        dist: {
            src: ["portale/master/config.js"],
            options: {
                destination: "doc",
                template: "node_modules/jaguarjs-jsdoc",
                 configure: "node_modules/jaguarjs-jsdoc/conf.json"
            }
        }
    };
