/**
 * Run tasks whenever watched files change
 * https://github.com/gruntjs/grunt-contrib-watch
 */

 'use strict';

 var config = require('../config.default');

module.exports = {
    // Changelog
    majorupdate: {
     options: {
       logArguments: [
         '--pretty=%h %s',
          '--merges'
       ],
       fileHeader: '# Changelog LGV Master-Portal <%= pkg.version %>',
       featureRegex: /^(.*)add (.*)$/gim,
       fixRegex: /^(.*)\bfix (.*)$/gim,
       partials: {
         features: 'NEU:\n\n{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n'
       },
       dest: 'CHANGELOG.md',
       insertType: 'prepend'
     }
   },
    minorupdate: {
     options: {
       logArguments: [
         '--pretty=%h %s',
          '--merges'
       ],
       fileHeader: '# Changelog LGV Master-Portal <%= pkg.version %>',
       featureRegex: /^(.*)add (.*)$/gim,
       fixRegex: /^(.*)\bhotfix (.*)$/gim,
       partials: {
         features: 'NEU:\n\n{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n'
       },
       dest: 'CHANGELOG.md',
       insertType: 'prepend'
     }
   },

};

