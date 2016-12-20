/**
 * Run tasks whenever watched files change
 * https://github.com/gruntjs/grunt-contrib-watch
 */
module.exports = {
    css: {
        files: [
            "css/*.css",
            "modules/**/*.css"
        ],
        options: {
            livereload: true
        }
    },

    less: {
        files: [
            "css/*.less",
            "modules/**/*.less"
        ],
        tasks: "less"
    },

    js: {
        files: [
            "Gruntfile.js",
            "components/build-config/tasks/**/*.js",
            "js/*.js",
            "portal/**/config.js",
            "portal/**/config.json",
            "portalconfigs/**/config.js",
            "portalconfigs/**/config.json",
            "portalconfigs/master-based-app/modules/**/*.js",
            "portalconfigs/master-based-app/app/**/*.js",
            "modules/**/*.js"
        ],
        options: {
            livereload: true
        }
    },

    html: {
        files: [
            "modules/**/*.html",
            "portale/**/index.html"
        ],
        options: {
            livereload: true
        }
    }
};
