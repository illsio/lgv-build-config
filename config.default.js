/**
 * Grunt configuration
 */
"use strict";

var pkg = require("../../package");
var grunt = process.grunt;
var name = grunt.option("name") || "master";

module.exports = {
    pkg: pkg,
    // A banner for distributed files (name, version, license, date)
    banner: "/*! " + pkg.name + " - v" + pkg.version + " - " +
        "<%= grunt.template.today('yyyy-mm-dd') %>, git rev: <%= gitinfo.local.branch.current.shortSHA %> on <%= gitinfo.local.branch.current.name %>*/",

    destDir: {
        prod: "dist/<%= pkg.version %>/" + name + "/",
        temp: "dist/<%= pkg.version %>/"
    },

    requirejs: "components/requirejs/require.js",

    // All files that should be checked with JSHint
    jsHintFiles: [
        "Gruntfile.js",
        "*.js",
        "components/build-config/tasks/**/*.js",
        "js/**/*.js",
        "portale/**/config.js",
        "modules/**/*.js"
    ],

    // Path to JSCS configuration file
    jscsConfig: ".jscsrc",

    // JavaScript files
    js: {
        files: [
            "js/**/*.js"
        ],
        dest: "dist/<%= pkg.version %>/" + name + "/js/"
    },

    // CSS files
    css: {
        files: [
            "css/style.css"
        ],
        dest: "dist/<%= pkg.version %>/" + name + "/"
    },

    // woff files
    woffs: {
        src: "css/woffs",
        dest: "dist/<%= pkg.version %>/" + name + "/css/woffs"
    },

    cssOutput: {
        prod: [{
            expand: true,
            cwd: "dist/<%= pkg.version %>/" + name + "/",
            src: ["*.min.css"],
            dest: "dist/<%= pkg.version %>/" + name + "/"
        }],

        dev: [{
            expand: true,
            cwd: "css/",
            src: ["*.min.css"],
            dest: "css/"
        }],

        files: "**/*.css",
        watchFiles: ["css/*.css", "modules/**/*.css"]
    },

    // Images
    img: {
        src: "img/"
    },

    // Fonts
    fonts: {
        src: "components/bootstrap/dist/fonts",
        dest: "dist/<%= pkg.version %>/" + name + "/fonts"
    },

    // shared Config-files for master
    lgvconfig: {
        src: "components/lgv-config",
        dest: "lgv-config"
    }
};
