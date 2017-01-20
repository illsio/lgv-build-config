'use strict';

var config = require('../config.default');

module.exports = {
    postcss: {
        options: {
             processors: [
                 require('postcss-prefix-selector')({prefix: '.lgv-container'})
             ]
        },
        src: 'css/style.css',
        dest: 'css/style2.css'

    }
};
