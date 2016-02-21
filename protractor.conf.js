'use strict';

var phantomjs = require('phantomjs-prebuilt');

exports.config = {
  baseUrl: 'http://localhost:8000/',
  capabilities: {
    'browserName': 'phantomjs'
  },
  framework: 'mocha',
  mochaOpts: {
    reporter: 'spec',
    slow: 3000
  },
  phantomjs: {
    binary: {
      path: phantomjs.path
    }
  },
  specs: [
    './tests/e2e/*.js'
  ]
};
