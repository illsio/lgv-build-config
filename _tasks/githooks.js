/**
 * Commit hooks to run for better system checks
 */
'use strict';

module.exports = {
    all: {
      'pre-commit': 'jshint jscs scsslint'
    }
};
