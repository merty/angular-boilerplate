'use strict';

module.exports = function (config) {

  var gulpConfig = require('./gulp.conf.json');

  config.set({
    autoWatch: true,
    browsers: ['PhantomJS'],
    colors: true,
    exclude: [],
    files: [
      gulpConfig.path.build + gulpConfig.js.vendor.bundle,
      gulpConfig.path.build + gulpConfig.test.vendor.bundle,
      gulpConfig.path.build + gulpConfig.js.bundle,
      gulpConfig.path.build + gulpConfig.html.bundle,
      gulpConfig.path.app + gulpConfig.test.specs
    ],
    frameworks: ['mocha', 'chai'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {},
    reporters: ['progress'],
    singleRun: false
  });
};
