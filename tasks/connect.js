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
            livereload: true
        }
    }
};
