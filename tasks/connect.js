/**
 * Server config
 */
'use strict';

module.exports = {
    test: {
        options: {
            port: 8001
        }
    },

    server: {
        options: {
            port: 9001,
            open: {
                target: 'http://localhost:9001/test/visual'
            },
            keepalive: true,
            livereload: true,
            middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
        },
        proxies: [
                {
                    context: '/geofos',
                    host: 'geofos.fhhnet.stadt.hamburg.de',
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        //'^/geofos' : '' //not needed here for some reason @TODO check again
                    }
                },
                {
                    context: '/lgvfds01',
                    host: 'lgvfds01.fhhnet.stadt.hamburg.de',
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        '^/lgvfds01' : ''
                    }
                },
                {
                    context: '/wsca0620',
                    host: 'wsca0620.fhhnet.stadt.hamburg.de',
                    port: 80,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    rewrite: {
                        '^/wsca0620' : ''
                    }
                }
            ]
    }
};
