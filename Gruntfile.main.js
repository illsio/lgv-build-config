/**
 * General Grunt setup: A sample
 */
"use strict";

var deepExtend = require("deep-extend");

/**
 * Load configuration files for Grunt (Tasks)
 * @param  {string} path    Path to folder with tasks
 * @return {object}         All options
 */
var loadTaskConfig = function (path) {
    var glob = require("glob");
    var object = {};
    var key;

    glob.sync("*", { cwd: path }).forEach(function (option) {
        key = option.replace(/\.js$/, "");
        object[key] = require("../../" + path + "/" + option);
    });

    return object;
};


/*
 * Call Grunt configuration
 */
module.exports = function (grunt) {

    // Measure time of grunt tasks
    require("time-grunt")(grunt);

    // Make Grunt accessible everwhere
    process.grunt = grunt;

    var config = deepExtend({
        pkg: require("../../package")
    }, loadTaskConfig("components/build-config/tasks"));

    // Load project configuration
    grunt.initConfig(config);

    // Load all npm tasks through jit-grunt (fetches all tasks from node_modules
    // folder and custom extend object here)
    require("jit-grunt")(grunt, {
        configureProxies: "grunt-connect-proxy"
    });

    /**
     * Development
     */

    // Application server for local development
    grunt.registerTask("server", ["configureProxies:server", "connect:server", "watch"]);

    // A task for development
    grunt.registerTask("dev", [
        // "jshint",
        // "jscs",
        "server"
    ]);

    // A task for generating production code
    grunt.registerTask("build", [
        "clean:dist",
        "gitinfo",
        // "jshint",
        // "jscs",
        "requirejs:compile",
        "cssmin",
        "copy:dist",
        "copy:distPortal"
    ]);

    // a task for copying files for examples
    grunt.registerTask("copyExamples", [
        "clean:examples",
        "copy:examples",
        "copy:examplesPortal",
        "compress:examples"
    ]);

    // a task for generating examples
    grunt.registerTask("buildExamples", [
        "build",
        "copyExamples"
    ]);

    // jsdoc Task
    grunt.registerTask("doc", ["jsdoc"]);

    // Default Task
    grunt.registerTask("default", ["dev"]);
};
