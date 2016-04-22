/**
 * Run tasks whenever watched files change
 * https://github.com/gruntjs/grunt-contrib-watch
 */

 'use strict';

 var config = require('../config.default');

module.exports = {
    // Changelog
      lgvmaster: {
        options: {
          logArguments: [
            '--pretty=* %h - %ad: %s',
            '--no-merges',
            '--date=short'
          ],
          featureRegex: /^(.*)add (.*)$/gim,
          fixRegex: /^(.*)fix (.*)$/gim,
          dest: 'release-notes.md',
          insertType: 'prepend'
        }
      }

};
