/**
 * Run tasks whenever watched files change
 * https://github.com/gruntjs/grunt-contrib-watch
 */
module.exports = {
    css: {
        files: [
            "modules/**/*.css"
        ],
       tasks: ["less"]
    },

    less: {
        files: [
            "css/style.less"
        ],
        options: {
            tasks: "less",
            livereload: true
        }
    },

    js: {
        files: [
            "Gruntfile.js",
            "components/build-config/tasks/**/*.js",
            "js/*.js",
            "portale/**/config.js",
            "portale/**/config.json",
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
