var grunt = process.grunt;
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
            livereload: {
                key: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.key'),
                cert: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.crt')
            }
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
            "node_modules/build-config/tasks/**/*.js",
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
            livereload: {
                key: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.key'),
                cert: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.crt')
            }
        }
    },

    html: {
        files: [
            "modules/**/*.html",
            "portale/**/index.html"
        ],
        options: {
            livereload: {
                key: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.key'),
                cert: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.crt')
            }
        }
    }
};
