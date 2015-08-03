(function () {
  'use strict';

  angular.module('app.home').config(HomeRoute);

  HomeRoute.$inject = ['$routeProvider'];

  function HomeRoute($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/modules/home/home.html',
      controller: 'Home',
      controllerAs: 'vm',
      title: 'Home'
    });
  }
})();
