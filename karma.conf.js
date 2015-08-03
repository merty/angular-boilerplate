module.exports = function (config) {
  config.set({
    basePath: './src/',
    frameworks: ['mocha', 'chai'],
    files: [
      'assets/vendor/angular/angular.js',
      'assets/vendor/angular-route/angular-route.js',
      'assets/vendor/angular-sanitize/angular-sanitize.js',
      'assets/vendor/angular-mocks/angular-mocks.js',
      'app/components/*.directive.js',
      'app/services/*.service.js',
      'app/core/core.module.js',
      'app/core/core.config.js',
      'app/core/core.route.js',
      'app/modules/**/*.module.js',
      'app/modules/**/*.config.js',
      'app/modules/**/*.route.js',
      'app/modules/**/*.controller.js',
      'app/modules/**/*.spec.js',
      'app/app.module.js',
      'app/app.config.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
