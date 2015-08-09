(function () {
  'use strict';

  angular.module('app.core').config(CoreRoute);

  CoreRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

  function CoreRoute($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }
})();
