var grunt = process.grunt;
/**
 * Server config
 */
"use strict";

module.exports = {
    test: {
        options: {
            port: 8001,
            keepalive: true,
            protocol: "https",
            key: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.key'),
            cert: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.crt'),
            ca: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/ca.crt'),
            middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
                options.base = [options.base];
            }

            // Setup the proxy
            var middlewares = [require("grunt-connect-proxy/lib/utils").proxyRequest];

            // Serve static files.
            options.base.forEach(function (base) {
                middlewares.push(connect.static(base));
            });

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];

            middlewares.push(connect.directory(directory));

            return middlewares;
        }

        }
    },

    server: {
        options: {
            port: 9001,
            open: {
                target: "https://localhost:9001/"
            },
            // keepalive: true,
            livereload: true,
            protocol: "https",
            key: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.key'),
            cert: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/server.crt'),
            ca: grunt.file.read('node_modules/grunt-contrib-connect/tasks/certs/ca.crt'),
            middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require("grunt-connect-proxy/lib/utils").proxyRequest];

                        // Serve static files.
                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];

                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
        },
        proxies: grunt.file.readJSON('node_modules/lgv-config/proxy-conf.json')
    }
};
