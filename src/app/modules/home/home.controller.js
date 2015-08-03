(function () {
  'use strict';

  angular.module('app.home').controller('Home', HomeController);

  function HomeController() {
    var vm = this;
    vm.heading = 'Hello World!';
    vm.getHeading = function () {
      return vm.heading;
    };
  }
})();
