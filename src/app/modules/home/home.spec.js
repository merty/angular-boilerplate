describe('HomeController', function () {
  'use strict';

  beforeEach(module('app'));

  describe('getHeading()', function () {
    it('should get heading message correctly', inject(function ($controller) {
      var homeController = $controller('Home');
      homeController.heading = 'Hello World!';
      homeController.getHeading().should.equal('Hello World!');
    }));
  });
});
