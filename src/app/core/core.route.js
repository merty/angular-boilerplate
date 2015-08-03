(function () {
  'use strict';

  angular.module('app.core').config(CoreRoute);

  CoreRoute.$inject = ['$routeProvider'];

  function CoreRoute($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }
})();
