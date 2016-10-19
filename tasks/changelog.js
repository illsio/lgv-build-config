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
         '--pretty=%h %s',
         '--merges'
       ],
       fileHeader: '# Changelog LGV Master-Portal <%= pkg.version %>',
       featureRegex: /^(.*)add (.*)$/gim,
       fixRegex: /^(.*)fix (.*)$/gim,
       partials: {
         features: 'NEU:\n\n{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n'
       },
       dest: 'CHANGELOG.md',
       insertType: 'prepend'
     }
   }
};
