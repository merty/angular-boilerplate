(function () {
  'use strict';

  angular.module('app.home').config(HomeRoute);

  HomeRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

  function HomeRoute($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      controller: 'Home',
      controllerAs: 'vm',
      templateUrl: 'app/modules/home/home.html',
      url: '/'
    });
  }
})();
